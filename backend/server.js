import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import inquiryRoutes from './routes/inquiries.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// 미들웨어
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// MongoDB 연결
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/haesalfarm')
  .then(() => {
    console.log('✅ MongoDB 연결 성공')
  })
  .catch((err) => {
    console.error('❌ MongoDB 연결 실패:', err.message)
  })

// 라우트
app.use('/api/auth', authRoutes)
app.use('/api/inquiries', inquiryRoutes)

// 헬스 체크
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

// 404 핸들러
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' })
})

// 에러 핸들러
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  })
})

app.listen(PORT, () => {
  console.log(`🚀 서버가 포트 ${PORT}에서 실행 중입니다.`)
  console.log(`📍 API 주소: http://localhost:${PORT}/api`)
})

