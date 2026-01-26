import { connectDb } from '../backend/db.js'
import { app } from '../backend/server.js'

/**
 * Vercel 서버리스: /api/* 요청을 Express 앱으로 전달
 * (프론트/백 같은 도메인이면 VITE_API_URL=/api 로 설정)
 */
export default async function handler(req, res) {
  await connectDb()
  return app(req, res)
}
