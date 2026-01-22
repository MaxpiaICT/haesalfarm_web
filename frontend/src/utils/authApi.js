// src/utils/authApi.js - API 기반 인증 함수

import { post, get, put, del } from './api.js'

const AUTH_TOKEN_KEY = 'auth_token'
const USER_KEY = 'haesal_user'

// 토큰 저장
const saveToken = (token) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token)
}

// 토큰 제거
const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

// 사용자 정보 저장
const saveUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

// 이메일 인증 코드 발송
export async function sendVerificationCode(email) {
  try {
    const response = await post('/auth/send-verification-code', { email })
    return response
  } catch (error) {
    throw error
  }
}

// 이메일 인증 코드 검증
export async function verifyEmailCode(email, code) {
  try {
    const response = await post('/auth/verify-email-code', { email, code })
    return response
  } catch (error) {
    throw error
  }
}

// 회원가입
export async function signup({ username, name, email, password, verificationCode }) {
  try {
    const response = await post('/auth/signup', {
      username,
      name,
      email,
      password,
      verificationCode,
    })

    saveToken(response.token)
    saveUser(response.user)
    return response.user
  } catch (error) {
    throw error
  }
}

// 로그인
export async function login({ username, password }) {
  try {
    const response = await post('/auth/login', {
      username,
      password,
    })

    saveToken(response.token)
    saveUser(response.user)
    return response.user
  } catch (error) {
    throw error
  }
}

// 현재 사용자 정보 조회
export async function getCurrentUser() {
  try {
    // 먼저 로컬 스토리지에서 확인
    const cachedUser = localStorage.getItem(USER_KEY)
    if (cachedUser) {
      try {
        return JSON.parse(cachedUser)
      } catch {
        // JSON 파싱 실패 시 서버에서 가져오기
      }
    }

    // 서버에서 사용자 정보 가져오기
    const user = await get('/auth/me')
    saveUser(user)
    return user
  } catch (error) {
    // 토큰이 없거나 만료된 경우
    removeToken()
    return null
  }
}

// 로그아웃
export function logout() {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/39db32e4-d4a7-4209-ba06-4c9e4293ad71',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'authApi.js:logout',message:'logout called',data:{hasToken:!!localStorage.getItem(AUTH_TOKEN_KEY),hasUser:!!localStorage.getItem(USER_KEY)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  removeToken()
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/39db32e4-d4a7-4209-ba06-4c9e4293ad71',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'authApi.js:logout',message:'removeToken called',data:{hasToken:!!localStorage.getItem(AUTH_TOKEN_KEY),hasUser:!!localStorage.getItem(USER_KEY)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
}

// 로그인 상태 확인
export function isLoggedIn() {
  return !!localStorage.getItem(AUTH_TOKEN_KEY)
}

// 관리자 권한 체크
export function isAdmin() {
  const user = getCurrentUserSync()
  return user?.role === 'admin' || user?.username === 'haesalfarm'
}

// 동기적으로 사용자 정보 가져오기 (캐시된 값)
export function getCurrentUserSync() {
  try {
    const userStr = localStorage.getItem(USER_KEY)
    return userStr ? JSON.parse(userStr) : null
  } catch {
    return null
  }
}

// 비밀번호 찾기
export async function findPassword({ username, email }) {
  const response = await post('/auth/forgot-password', {
    username,
    email,
  })
  return response.tempPassword
}

// 비밀번호 변경
export async function changePassword({ oldPassword, newPassword }) {
  await put('/auth/change-password', {
    oldPassword,
    newPassword,
  })
}

// 모든 사용자 조회 (관리자용)
export async function getAllUsers() {
  return await get('/auth/users')
}

// 사용자 삭제 (관리자용)
export async function deleteUser(userId) {
  await del(`/auth/users/${userId}`)
}

