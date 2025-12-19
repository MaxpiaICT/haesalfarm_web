// src/utils/inquiries.js
// API 모드와 로컬 스토리지 모드 지원

import * as inquiriesApi from './inquiriesApi.js'

// 환경 변수로 모드 선택 (기본값: API 모드)
const USE_API = import.meta.env.VITE_USE_LOCAL_STORAGE !== 'true'

// 로컬 스토리지 모드 (기존 코드)
const INQUIRIES_KEY = 'haesal_inquiries'

function readInquiries() {
  try {
    return JSON.parse(localStorage.getItem(INQUIRIES_KEY) || '[]')
  } catch {
    return []
  }
}

function writeInquiries(inquiries) {
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries))
}

/**
 * 문의 등록
 * @param {Object} inquiryData - { name, phone, email, affiliation, content, userId }
 */
export async function createInquiry({ name, phone, email, affiliation, content, userId }) {
  if (USE_API) {
    return await inquiriesApi.createInquiry({ name, phone, email, affiliation, content, userId })
  }

  // 로컬 스토리지 모드
  if (!name || !phone || !content) {
    throw new Error('필수 항목(이름/상호명, 연락처, 문의 사항)을 입력해주세요.')
  }

  const inquiries = readInquiries()
  const newInquiry = {
    id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()),
    userId: userId || null, // 로그인한 사용자 ID
    name: name.trim(),
    phone: phone.trim(),
    email: (email || '').trim(),
    affiliation: (affiliation || '').trim(),
    content: content.trim(),
    status: '대기중', // 대기중, 처리중, 완료
    createdAt: new Date().toISOString(),
  }

  inquiries.push(newInquiry)
  writeInquiries(inquiries)
  return newInquiry
}

/**
 * 사용자 ID로 문의 목록 조회
 * @param {string} userId - 사용자 ID (로컬 모드용, API 모드에서는 사용 안 함)
 */
export async function getUserInquiries(userId) {
  if (USE_API) {
    return await inquiriesApi.getUserInquiries()
  }

  // 로컬 스토리지 모드
  if (!userId) return []
  const inquiries = readInquiries()
  return inquiries
    .filter((inq) => inq.userId === userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // 최신순
}

/**
 * 모든 문의 조회 (관리자용)
 */
export async function getAllInquiries() {
  if (USE_API) {
    return await inquiriesApi.getAllInquiries()
  }
  return readInquiries().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

/**
 * 문의 삭제
 * @param {string} inquiryId - 문의 ID
 * @param {string} userId - 사용자 ID (본인 확인용, 로컬 모드용)
 * @param {boolean} isAdmin - 관리자 여부 (로컬 모드용)
 */
export async function deleteInquiry(inquiryId, userId, isAdmin = false) {
  if (USE_API) {
    return await inquiriesApi.deleteInquiry(inquiryId)
  }

  // 로컬 스토리지 모드
  const inquiries = readInquiries()
  const index = inquiries.findIndex((inq) => inq.id === inquiryId)
  
  if (index === -1) {
    throw new Error('문의를 찾을 수 없습니다.')
  }

  // 관리자가 아니면 본인 확인
  if (!isAdmin && inquiries[index].userId !== userId) {
    throw new Error('본인의 문의만 삭제할 수 있습니다.')
  }

  inquiries.splice(index, 1)
  writeInquiries(inquiries)
  return true
}

/**
 * 문의 상태 변경 (관리자용)
 * @param {string} inquiryId - 문의 ID
 * @param {string} status - 새 상태 ('대기중', '처리중', '완료')
 */
export async function updateInquiryStatus(inquiryId, status) {
  if (USE_API) {
    return await inquiriesApi.updateInquiryStatus(inquiryId, status)
  }

  // 로컬 스토리지 모드
  const validStatuses = ['대기중', '처리중', '완료']
  if (!validStatuses.includes(status)) {
    throw new Error('유효하지 않은 상태입니다.')
  }

  const inquiries = readInquiries()
  const index = inquiries.findIndex((inq) => inq.id === inquiryId)
  
  if (index === -1) {
    throw new Error('문의를 찾을 수 없습니다.')
  }

  inquiries[index].status = status
  writeInquiries(inquiries)
  return inquiries[index]
}

/**
 * 문의 답변 추가/수정 (관리자용)
 * @param {string} inquiryId - 문의 ID
 * @param {string} answer - 답변 내용
 */
export async function updateInquiryAnswer(inquiryId, answer) {
  if (USE_API) {
    return await inquiriesApi.updateInquiryAnswer(inquiryId, answer)
  }

  // 로컬 스토리지 모드
  const inquiries = readInquiries()
  const index = inquiries.findIndex((inq) => inq.id === inquiryId)
  
  if (index === -1) {
    throw new Error('문의를 찾을 수 없습니다.')
  }

  inquiries[index].answer = answer
  inquiries[index].answeredAt = new Date().toISOString()
  writeInquiries(inquiries)
  return inquiries[index]
}

