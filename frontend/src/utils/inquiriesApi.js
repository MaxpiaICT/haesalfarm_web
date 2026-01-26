// src/utils/inquiriesApi.js - API 기반 문의 함수

import { post, get, put, del } from './api.js'

// 문의 생성
export async function createInquiry({ name, phone, email, affiliation, content, userId }) {
  const response = await post('/inquiries', {
    name,
    phone,
    email,
    affiliation,
    content,
    userId,
  })
  return response.inquiry
}

// 사용자별 문의 조회
export async function getUserInquiries() {
  return await get('/inquiries/my')
}

// 모든 문의 조회 (관리자용)
export async function getAllInquiries() {
  return await get('/inquiries/all')
}

// 문의 상태 변경 (관리자용)
export async function updateInquiryStatus(inquiryId, status) {
  const response = await put(`/inquiries/${inquiryId}/status`, { status })
  return response.inquiry
}

// 문의 답변 추가/수정 (관리자용)
export async function updateInquiryAnswer(inquiryId, answer) {
  const response = await put(`/inquiries/${inquiryId}/answer`, { answer })
  return response.inquiry
}

// 문의 삭제
export async function deleteInquiry(inquiryId) {
  await del(`/inquiries/${inquiryId}`)
}

