import mongoose from 'mongoose'

const inquirySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      default: '',
    },
    affiliation: {
      type: String,
      trim: true,
      default: '',
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['대기중', '처리중', '완료'],
      default: '대기중',
    },
    answer: {
      type: String,
      trim: true,
      default: '',
    },
    answeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    answeredAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

// 인덱스 추가 (조회 성능 향상)
inquirySchema.index({ userId: 1, createdAt: -1 })
inquirySchema.index({ status: 1, createdAt: -1 })

export default mongoose.model('Inquiry', inquirySchema)

