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
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/39db32e4-d4a7-4209-ba06-4c9e4293ad71',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'inquiriesApi.js:35',message:'updateInquiryAnswer called',data:{inquiryId,answerLength:answer?.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  const response = await put(`/inquiries/${inquiryId}/answer`, { answer })
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/39db32e4-d4a7-4209-ba06-4c9e4293ad71',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'inquiriesApi.js:37',message:'updateInquiryAnswer response',data:{success:!!response},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  return response.inquiry
}

// 문의 삭제
export async function deleteInquiry(inquiryId) {
  await del(`/inquiries/${inquiryId}`)
}

