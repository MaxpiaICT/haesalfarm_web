import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({ error: '인증 토큰이 필요합니다.' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
    const user = await User.findById(decoded.userId)
    
    if (!user) {
      return res.status(401).json({ error: '사용자를 찾을 수 없습니다.' })
    }

    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ error: '유효하지 않은 토큰입니다.' })
  }
}

export const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: '관리자 권한이 필요합니다.' })
  }
  next()
}

