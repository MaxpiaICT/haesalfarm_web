import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { authenticate, isAdmin } from '../middleware/auth.js'
import crypto from 'crypto'
import { sendTempPasswordEmail } from '../utils/email.js'

const router = express.Router()

// JWT 토큰 생성
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '7d',
  })
}

// 회원가입
router.post('/signup', async (req, res) => {
  try {
    const { username, name, email, password } = req.body

    if (!username || !name || !password) {
      return res.status(400).json({ error: '필수 항목(아이디/이름/비밀번호)을 입력해주세요.' })
    }

    if (username.length < 4) {
      return res.status(400).json({ error: '아이디는 4자 이상으로 입력해주세요.' })
    }

    if (password.length < 8) {
      return res.status(400).json({ error: '비밀번호는 8자 이상으로 입력해주세요.' })
    }

    // 중복 체크
    const existingUser = await User.findOne({
      $or: [
        { username: username.toLowerCase() },
        ...(email ? [{ email: email.toLowerCase() }] : []),
      ],
    })

    if (existingUser) {
      if (existingUser.username === username.toLowerCase()) {
        return res.status(400).json({ error: '이미 사용 중인 아이디입니다.' })
      }
      if (email && existingUser.email === email.toLowerCase()) {
        return res.status(400).json({ error: '이미 가입된 이메일입니다.' })
      }
    }

    const user = new User({
      username: username.toLowerCase(),
      name,
      email: email?.toLowerCase() || '',
      password,
    })

    await user.save()

    const token = generateToken(user._id)

    res.status(201).json({
      message: '회원가입이 완료되었습니다.',
      token,
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Signup error:', error)
    if (error.code === 11000) {
      return res.status(400).json({ error: '이미 사용 중인 아이디 또는 이메일입니다.' })
    }
    res.status(500).json({ error: '회원가입에 실패했습니다.' })
  }
})

// 로그인
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: '아이디와 비밀번호를 입력해주세요.' })
    }

    const user = await User.findOne({ username: username.toLowerCase() })

    if (!user) {
      return res.status(401).json({ error: '아이디 또는 비밀번호가 올바르지 않습니다.' })
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(401).json({ error: '아이디 또는 비밀번호가 올바르지 않습니다.' })
    }

    const token = generateToken(user._id)

    res.json({
      message: '로그인 성공',
      token,
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: '로그인에 실패했습니다.' })
  }
})

// 현재 사용자 정보 조회
router.get('/me', authenticate, async (req, res) => {
  res.json({
    id: req.user._id,
    username: req.user.username,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  })
})

// 비밀번호 찾기 (임시 비밀번호 생성)
router.post('/forgot-password', async (req, res) => {
  try {
    const { username, email } = req.body

    if (!username || !email) {
      return res.status(400).json({ error: '아이디와 이메일을 모두 입력해주세요.' })
    }

    const user = await User.findOne({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
    })

    if (!user) {
      return res.status(404).json({ error: '아이디와 이메일이 일치하는 계정을 찾을 수 없습니다.' })
    }

    // 임시 비밀번호 생성
    const tempPassword = crypto.randomBytes(8).toString('hex')
    
    // 비밀번호 해싱
    const bcrypt = await import('bcryptjs')
    const hashedPassword = await bcrypt.default.hash(tempPassword, 10)
    user.password = hashedPassword
    await user.save()

    // 이메일 발송 시도
    let emailSent = false
    try {
      const emailResult = await sendTempPasswordEmail(user.email, user.username, tempPassword)
      emailSent = emailResult.sent
    } catch (emailError) {
      console.error('이메일 발송 오류:', emailError)
      // 이메일 발송 실패해도 임시 비밀번호는 생성되었으므로 계속 진행
    }

    // 이메일 발송 성공 여부와 함께 응답
    res.json({
      message: emailSent
        ? '임시 비밀번호가 이메일로 발송되었습니다.'
        : '임시 비밀번호가 생성되었습니다. 이메일 설정이 필요합니다.',
      tempPassword: emailSent ? undefined : tempPassword, // 이메일 발송 성공 시 프론트엔드에 비밀번호 전달하지 않음
      emailSent,
    })
  } catch (error) {
    console.error('Forgot password error:', error)
    res.status(500).json({ error: '비밀번호 찾기에 실패했습니다.' })
  }
})

// 비밀번호 변경
router.put('/change-password', authenticate, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body

    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({ error: '새 비밀번호는 8자 이상으로 입력해주세요.' })
    }

    const user = await User.findById(req.user._id)

    if (oldPassword) {
      const isMatch = await user.comparePassword(oldPassword)
      if (!isMatch) {
        return res.status(400).json({ error: '현재 비밀번호가 올바르지 않습니다.' })
      }
    }

    user.password = newPassword
    await user.save()

    res.json({ message: '비밀번호가 변경되었습니다.' })
  } catch (error) {
    console.error('Change password error:', error)
    res.status(500).json({ error: '비밀번호 변경에 실패했습니다.' })
  }
})

// 모든 사용자 조회 (관리자용)
router.get('/users', authenticate, isAdmin, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 })
    res.json(users)
  } catch (error) {
    console.error('Get users error:', error)
    res.status(500).json({ error: '사용자 목록을 불러오는데 실패했습니다.' })
  }
})

// 사용자 삭제 (관리자용)
router.delete('/users/:userId', authenticate, isAdmin, async (req, res) => {
  try {
    const { userId } = req.params

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' })
    }

    if (user.role === 'admin') {
      return res.status(403).json({ error: '관리자 계정은 삭제할 수 없습니다.' })
    }

    await User.findByIdAndDelete(userId)

    res.json({ message: '사용자가 삭제되었습니다.' })
  } catch (error) {
    console.error('Delete user error:', error)
    res.status(500).json({ error: '사용자 삭제에 실패했습니다.' })
  }
})

export default router

