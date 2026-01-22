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

// Mongoose 버퍼링 설정 - 연결이 완료될 때까지 쿼리 대기
mongoose.set('bufferCommands', true) // 버퍼링 활성화

mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 30000, // 30초 타임아웃
    socketTimeoutMS: 45000,
    connectTimeoutMS: 30000,
    retryWrites: true,
    w: 'majority',
    bufferCommands: true, // 연결 완료까지 쿼리 버퍼링
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
    
    // 30초 후 자동 재연결 시도
    setTimeout(() => {
      console.log('🔄 MongoDB 자동 재연결 시도...')
      reconnectMongoDB()
    }, 30000)
  })

// MongoDB 연결 끊김 감지 및 자동 재연결
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB 연결이 끊어졌습니다. 재연결을 시도합니다...')
  setTimeout(() => {
    reconnectMongoDB()
  }, 5000)
})

// MongoDB 연결 상태 확인 미들웨어
const checkMongoConnection = (req, res, next) => {
  // #region agent log
  const readyState = mongoose.connection.readyState
  fetch('http://127.0.0.1:7242/ingest/39db32e4-d4a7-4209-ba06-4c9e4293ad71', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      location: 'server.js:checkMongoConnection',
      message: '연결 상태 확인',
      data: {
        readyState,
        path: req.path,
        method: req.method,
      },
      timestamp: Date.now(),
      sessionId: 'debug-session',
      runId: 'mongodb-connection-check',
      hypothesisId: 'D',
    }),
  }).catch(() => {})
  // #endregion

  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (mongoose.connection.readyState === 0) {
    // #region agent log
    console.error('[MongoDB] 연결되지 않음 - 재연결 시도')
    fetch('http://127.0.0.1:7242/ingest/39db32e4-d4a7-4209-ba06-4c9e4293ad71', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location: 'server.js:checkMongoConnection',
        message: '연결되지 않음',
        data: { readyState: 0 },
        timestamp: Date.now(),
        sessionId: 'debug-session',
        runId: 'mongodb-connection-check',
        hypothesisId: 'D',
      }),
    }).catch(() => {})
    // #endregion

    return res.status(503).json({
      error: '데이터베이스 연결이 없습니다. 잠시 후 다시 시도해주세요.',
      mongodbStatus: 'disconnected',
    })
  }

  if (mongoose.connection.readyState === 2) {
    // 연결 중이면 잠시 대기
    return res.status(503).json({
      error: '데이터베이스 연결 중입니다. 잠시 후 다시 시도해주세요.',
      mongodbStatus: 'connecting',
    })
  }

  next()
}

// 라우트 (MongoDB 연결 확인 미들웨어 적용)
app.use('/api/auth', checkMongoConnection, authRoutes)
app.use('/api/inquiries', checkMongoConnection, inquiryRoutes)

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

// MongoDB 재연결 함수
const reconnectMongoDB = async () => {
  // #region agent log
  console.log('[MongoDB] 재연결 시도')
  fetch('http://127.0.0.1:7242/ingest/39db32e4-d4a7-4209-ba06-4c9e4293ad71', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      location: 'server.js:reconnectMongoDB',
      message: '재연결 시도',
      data: { timestamp: Date.now() },
      timestamp: Date.now(),
      sessionId: 'debug-session',
      runId: 'mongodb-reconnect',
      hypothesisId: 'C',
    }),
  }).catch(() => {})
  // #endregion

  try {
    // 기존 연결이 있으면 끊기
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect()
    }

    // 재연결
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      retryWrites: true,
      w: 'majority',
    })

    // #region agent log
    console.log('[MongoDB] 재연결 성공')
    fetch('http://127.0.0.1:7242/ingest/39db32e4-d4a7-4209-ba06-4c9e4293ad71', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location: 'server.js:reconnectMongoDB',
        message: '재연결 성공',
        data: { connected: true },
        timestamp: Date.now(),
        sessionId: 'debug-session',
        runId: 'mongodb-reconnect',
        hypothesisId: 'C',
      }),
    }).catch(() => {})
    // #endregion

    console.log('✅ MongoDB 재연결 성공')
    return { success: true, message: 'MongoDB 재연결 성공' }
  } catch (error) {
    // #region agent log
    console.error('[MongoDB] 재연결 실패:', error.message)
    fetch('http://127.0.0.1:7242/ingest/39db32e4-d4a7-4209-ba06-4c9e4293ad71', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location: 'server.js:reconnectMongoDB',
        message: '재연결 실패',
        data: {
          errorMessage: error.message,
          errorName: error.name,
        },
        timestamp: Date.now(),
        sessionId: 'debug-session',
        runId: 'mongodb-reconnect',
        hypothesisId: 'C',
      }),
    }).catch(() => {})
    // #endregion

    console.error('❌ MongoDB 재연결 실패:', error.message)
    return { success: false, message: error.message }
  }
}

// MongoDB 재연결 엔드포인트
app.post('/api/mongodb/reconnect', async (req, res) => {
  const result = await reconnectMongoDB()
  res.json(result)
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

