import mongoose from 'mongoose'

const emailVerificationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    code: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expireAfterSeconds: 0 }, // 만료 시 자동 삭제
    },
  },
  {
    timestamps: true,
  }
)

// 인덱스: 이메일과 코드로 빠른 검색
emailVerificationSchema.index({ email: 1, code: 1 })

export default mongoose.model('EmailVerification', emailVerificationSchema)
