import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // ⚠️ GitHub 저장소 이름과 정확히 일치시켜야 합니다.
  base: '/haesalfarm_1211/',
  plugins: [react()],
})
