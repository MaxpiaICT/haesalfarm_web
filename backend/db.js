import 'dotenv/config'
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/haesalfarm'

// 서버리스(Vercel)에서 연결 재사용
let cached = global.__mongoose
if (!cached) global.__mongoose = cached = { conn: null, promise: null }

export async function connectDb() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      bufferCommands: true,
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}
