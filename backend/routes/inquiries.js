import express from 'express'
import Inquiry from '../models/Inquiry.js'
import { authenticate, isAdmin } from '../middleware/auth.js'

const router = express.Router()

// 문의 생성
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, affiliation, content, userId } = req.body

    if (!name || !phone || !content) {
      return res.status(400).json({
        error: '필수 항목(이름/상호명, 연락처, 문의 사항)을 입력해주세요.',
      })
    }

    const inquiry = new Inquiry({
      userId: userId || null,
      name,
      phone,
      email: email || '',
      affiliation: affiliation || '',
      content,
      status: '대기중',
    })

    await inquiry.save()

    res.status(201).json({
      message: '문의가 접수되었습니다.',
      inquiry,
    })
  } catch (error) {
    console.error('Create inquiry error:', error)
    res.status(500).json({ error: '문의 접수에 실패했습니다.' })
  }
})

// 사용자별 문의 조회
router.get('/my', authenticate, async (req, res) => {
  try {
    const inquiries = await Inquiry.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .populate('userId', 'username name')

    res.json(inquiries)
  } catch (error) {
    console.error('Get user inquiries error:', error)
    res.status(500).json({ error: '문의 목록을 불러오는데 실패했습니다.' })
  }
})

// 모든 문의 조회 (관리자용)
router.get('/all', authenticate, isAdmin, async (req, res) => {
  try {
    const inquiries = await Inquiry.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'username name')
      .populate('answeredBy', 'username name')

    res.json(inquiries)
  } catch (error) {
    console.error('Get all inquiries error:', error)
    res.status(500).json({ error: '문의 목록을 불러오는데 실패했습니다.' })
  }
})

// 문의 답변 추가/수정 (관리자용) - status보다 먼저 정의해야 함
router.put('/:inquiryId/answer', authenticate, isAdmin, async (req, res) => {
  try {
    const { inquiryId } = req.params
    const { answer } = req.body

    if (!answer || answer.trim().length === 0) {
      return res.status(400).json({ error: '답변 내용을 입력해주세요.' })
    }

    const inquiry = await Inquiry.findByIdAndUpdate(
      inquiryId,
      {
        answer: answer.trim(),
        answeredBy: req.user._id,
        answeredAt: new Date(),
      },
      { new: true }
    ).populate('answeredBy', 'username name')

    if (!inquiry) {
      return res.status(404).json({ error: '문의를 찾을 수 없습니다.' })
    }

    res.json({ message: '답변이 저장되었습니다.', inquiry })
  } catch (error) {
    console.error('Update inquiry answer error:', error)
    res.status(500).json({ error: '답변 저장에 실패했습니다.' })
  }
})

// 문의 상태 변경 (관리자용)
router.put('/:inquiryId/status', authenticate, isAdmin, async (req, res) => {
  try {
    const { inquiryId } = req.params
    const { status } = req.body

    const validStatuses = ['대기중', '처리중', '완료']
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: '유효하지 않은 상태입니다.' })
    }

    const inquiry = await Inquiry.findByIdAndUpdate(
      inquiryId,
      { status },
      { new: true }
    )

    if (!inquiry) {
      return res.status(404).json({ error: '문의를 찾을 수 없습니다.' })
    }

    res.json({ message: '상태가 변경되었습니다.', inquiry })
  } catch (error) {
    console.error('Update inquiry status error:', error)
    res.status(500).json({ error: '상태 변경에 실패했습니다.' })
  }
})

// 문의 삭제
router.delete('/:inquiryId', authenticate, async (req, res) => {
  try {
    const { inquiryId } = req.params

    const inquiry = await Inquiry.findById(inquiryId)

    if (!inquiry) {
      return res.status(404).json({ error: '문의를 찾을 수 없습니다.' })
    }

    // 관리자가 아니면 본인 문의만 삭제 가능
    if (req.user.role !== 'admin') {
      if (!inquiry.userId || inquiry.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: '본인의 문의만 삭제할 수 있습니다.' })
      }
    }

    await Inquiry.findByIdAndDelete(inquiryId)

    res.json({ message: '문의가 삭제되었습니다.' })
  } catch (error) {
    console.error('Delete inquiry error:', error)
    res.status(500).json({ error: '문의 삭제에 실패했습니다.' })
  }
})

export default router

