import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Vercel 배포는 루트 경로 사용
  base: '/',
  plugins: [react()],
})
