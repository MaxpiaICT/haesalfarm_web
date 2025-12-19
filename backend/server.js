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
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/haesalfarm'

// #region agent log
console.log('[MongoDB] 연결 시도 시작', {
  hasUri: !!MONGODB_URI,
  uriLength: MONGODB_URI?.length,
  uriPrefix: MONGODB_URI?.substring(0, 20) + '...',
  timestamp: Date.now(),
})
fetch('http://127.0.0.1:7242/ingest/39db32e4-d4a7-4209-ba06-4c9e4293ad71', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    location: 'server.js:MongoDB 연결',
    message: '연결 시도 시작',
    data: {
      hasUri: !!MONGODB_URI,
      uriLength: MONGODB_URI?.length,
      uriPrefix: MONGODB_URI?.substring(0, 30),
    },
    timestamp: Date.now(),
    sessionId: 'debug-session',
    runId: 'mongodb-connection',
    hypothesisId: 'B',
  }),
}).catch(() => {})
// #endregion

mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 30000, // 30초 타임아웃
    socketTimeoutMS: 45000,
    connectTimeoutMS: 30000,
    retryWrites: true,
    w: 'majority',
  })
  .then(() => {
    // #region agent log
    console.log('[MongoDB] 연결 성공')
    fetch('http://127.0.0.1:7242/ingest/39db32e4-d4a7-4209-ba06-4c9e4293ad71', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location: 'server.js:MongoDB 연결',
        message: '연결 성공',
        data: { connected: true },
        timestamp: Date.now(),
        sessionId: 'debug-session',
        runId: 'mongodb-connection',
        hypothesisId: 'B',
      }),
    }).catch(() => {})
    // #endregion
    console.log('✅ MongoDB 연결 성공')
  })
  .catch((err) => {
    // #region agent log
    console.error('[MongoDB] 연결 실패 상세:', {
      message: err.message,
      name: err.name,
      code: err.code,
      stack: err.stack?.substring(0, 200),
    })
    fetch('http://127.0.0.1:7242/ingest/39db32e4-d4a7-4209-ba06-4c9e4293ad71', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location: 'server.js:MongoDB 연결',
        message: '연결 실패',
        data: {
          errorMessage: err.message,
          errorName: err.name,
          errorCode: err.code,
        },
        timestamp: Date.now(),
        sessionId: 'debug-session',
        runId: 'mongodb-connection',
        hypothesisId: 'A',
      }),
    }).catch(() => {})
    // #endregion
    console.error('❌ MongoDB 연결 실패:', err.message)
    console.error('연결 문자열 확인:', MONGODB_URI ? '설정됨' : '설정되지 않음')
  })

// 라우트
app.use('/api/auth', authRoutes)
app.use('/api/inquiries', inquiryRoutes)

// 헬스 체크
app.get('/api/health', (req, res) => {
  const mongoStatus = mongoose.connection.readyState
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  const statusMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  }
  res.json({
    status: 'ok',
    message: 'Server is running',
    mongodb: {
      status: statusMap[mongoStatus] || 'unknown',
      readyState: mongoStatus,
    },
  })
})

// Railway 서버의 외부 IP 확인 (MongoDB Atlas 화이트리스트용)
app.get('/api/ip', async (req, res) => {
  try {
    // 외부 서비스를 통해 IP 확인
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    res.json({ 
      ip: data.ip,
      message: 'MongoDB Atlas Network Access에 이 IP를 추가하세요',
      cidr: `${data.ip}/32`,
      note: '또는 0.0.0.0/0 (모든 IP 허용)을 사용하는 것을 권장합니다'
    })
  } catch (error) {
    res.json({ 
      error: 'IP 확인 실패',
      message: '0.0.0.0/0 (모든 IP 허용)을 사용하는 것을 권장합니다'
    })
  }
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

