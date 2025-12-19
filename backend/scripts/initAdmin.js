import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/User.js'

dotenv.config()

const initAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/haesalfarm')
    console.log('✅ MongoDB 연결 성공')

    const adminUsername = process.env.ADMIN_USERNAME || 'haesalfarm'
    const adminPassword = process.env.ADMIN_PASSWORD || 'farm9948!!'
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@haesalfarm.com'

    // 기존 관리자 계정 확인
    let admin = await User.findOne({
      $or: [{ username: adminUsername }, { role: 'admin' }],
    })

    if (admin) {
      // 기존 계정 업데이트
      admin.username = adminUsername
      admin.password = adminPassword
      admin.email = adminEmail
      admin.role = 'admin'
      admin.name = '관리자'
      await admin.save()
      console.log('✅ 관리자 계정이 업데이트되었습니다.')
    } else {
      // 새 관리자 계정 생성
      admin = new User({
        username: adminUsername,
        password: adminPassword,
        email: adminEmail,
        name: '관리자',
        role: 'admin',
      })
      await admin.save()
      console.log('✅ 관리자 계정이 생성되었습니다.')
    }

    console.log(`아이디: ${adminUsername}`)
    console.log(`비밀번호: ${adminPassword}`)

    await mongoose.connection.close()
    process.exit(0)
  } catch (error) {
    console.error('❌ 오류:', error)
    process.exit(1)
  }
}

initAdmin()

