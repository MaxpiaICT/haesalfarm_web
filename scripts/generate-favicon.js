const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const pngToIco = require('png-to-ico')

async function generate() {
  const root = path.resolve(__dirname, '..')
  const svgPath = path.join(root, 'public', 'assets', 'logo.svg')
  const outDir = path.join(root, 'public')
  const sizes = [16, 24, 32, 48, 64]

  if (!fs.existsSync(svgPath)) {
    console.error('logo.svg not found at', svgPath)
    process.exit(1)
  }

  try {
    // create temporary pngs
    const pngPaths = []
    for (const size of sizes) {
      const out = path.join(outDir, `favicon-${size}.png`)
      await sharp(svgPath)
        .resize(size, size, { fit: 'contain' })
        .png()
        .toFile(out)
      pngPaths.push(out)
    }

    // convert to ico (png-to-ico expects buffers or paths)
    const pngToIcoFunc = pngToIco && (pngToIco.default || pngToIco)
    if (typeof pngToIcoFunc !== 'function') {
      throw new Error('png-to-ico export not a function')
    }
    const icoBuffer = await pngToIcoFunc(pngPaths)
    const icoPath = path.join(outDir, 'favicon.ico')
    fs.writeFileSync(icoPath, icoBuffer)
    console.log('favicon.ico written to', icoPath)

    // cleanup temp pngs
    for (const p of pngPaths) {
      try { fs.unlinkSync(p) } catch (e) {}
    }
  } catch (err) {
    console.error('Error generating favicon:', err)
    process.exit(1)
  }
}

generate()
