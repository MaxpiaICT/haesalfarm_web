// src/utils/auth.js
// API 모드와 로컬 스토리지 모드 지원

import * as authApi from './authApi.js'

// 환경 변수로 모드 선택 (기본값: API 모드)
const USE_API = import.meta.env.VITE_USE_LOCAL_STORAGE !== 'true'

// 로컬 스토리지 모드 (기존 코드)
const USERS_KEY = 'haesal_users'
const SESSION_KEY = 'haesal_session'

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  } catch {
    return []
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function safeUser(u) {
  if (!u) return null
  const { password, ...rest } = u
  return rest
}

// 이메일 인증 코드 발송
export async function sendVerificationCode(email) {
  if (USE_API) {
    return await authApi.sendVerificationCode(email)
  }
  // 로컬 스토리지 모드에서는 검증 없이 성공 처리
  return { message: '인증 코드가 발송되었습니다. (로컬 모드)' }
}

// 이메일 인증 코드 검증
export async function verifyEmailCode(email, code) {
  if (USE_API) {
    return await authApi.verifyEmailCode(email, code)
  }
  // 로컬 스토리지 모드에서는 검증 없이 성공 처리
  return { message: '이메일 인증이 완료되었습니다. (로컬 모드)' }
}

export async function signup({ username, name, email, password }) {
  if (USE_API) {
    return await authApi.signup({ username, name, email, password })
  }

  // 로컬 스토리지 모드
  const u = (username || '').trim()
  const n = (name || '').trim()
  const e = (email || '').trim().toLowerCase()

  if (!u || !n || !password) {
    throw new Error('필수 항목(아이디/이름/비밀번호)을 입력해주세요.')
  }
  if (u.length < 4) throw new Error('아이디는 4자 이상으로 입력해주세요.')
  if (password.length < 8) throw new Error('비밀번호는 8자 이상으로 입력해주세요.')

  const users = readUsers()

  const dupId = users.some((x) => (x.username || '').toLowerCase() === u.toLowerCase())
  if (dupId) throw new Error('이미 사용 중인 아이디입니다.')

  if (e) {
    const dupEmail = users.some((x) => (x.email || '').toLowerCase() === e)
    if (dupEmail) throw new Error('이미 가입된 이메일입니다.')
  }

  const newUser = {
    id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()),
    username: u,
    name: n,
    email: e, // 선택
    password, // ⚠️ 테스트용(실서비스는 해시 필요)
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  writeUsers(users)

  // 가입 즉시 로그인 상태로
  localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser(newUser)))
  return safeUser(newUser)
}

export async function login({ username, password }) {
  if (USE_API) {
    return await authApi.login({ username, password })
  }

  // 로컬 스토리지 모드
  const u = (username || '').trim()
  if (!u || !password) throw new Error('아이디와 비밀번호를 입력해주세요.')

  const users = readUsers()
  const found = users.find((x) => (x.username || '').toLowerCase() === u.toLowerCase())

  if (!found) throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.')
  if (found.password !== password) throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.')

  localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser(found)))
  return safeUser(found)
}

export async function getCurrentUser() {
  if (USE_API) {
    return await authApi.getCurrentUser()
  }

  // 로컬 스토리지 모드
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
  } catch {
    return null
  }
}

// 동기 버전 (캐시된 값 사용)
export function getCurrentUserSync() {
  if (USE_API) {
    return authApi.getCurrentUserSync()
  }

  // 로컬 스토리지 모드
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
  } catch {
    return null
  }
}

export function logout() {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/39db32e4-d4a7-4209-ba06-4c9e4293ad71',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'auth.js:logout',message:'logout called',data:{useApi:USE_API},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  if (USE_API) {
    authApi.logout()
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/39db32e4-d4a7-4209-ba06-4c9e4293ad71',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'auth.js:logout',message:'authApi.logout called',data:{hasToken:!!localStorage.getItem('auth_token'),hasUser:!!localStorage.getItem('haesal_user')},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    return
  }
  localStorage.removeItem(SESSION_KEY)
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/39db32e4-d4a7-4209-ba06-4c9e4293ad71',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'auth.js:logout',message:'localStorage cleared',data:{hasSession:!!localStorage.getItem(SESSION_KEY)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
}

export function isLoggedIn() {
  if (USE_API) {
    return authApi.isLoggedIn()
  }
  return !!getCurrentUserSync()
}

/**
 * 관리자 권한 체크
 */
export function isAdmin() {
  if (USE_API) {
    return authApi.isAdmin()
  }
  const user = getCurrentUserSync()
  return user?.role === 'admin' || user?.username === 'haesalfarm' || user?.username === 'admin'
}

/**
 * 기본 관리자 계정 생성 및 업데이트 (항상 실행)
 */
export function initAdminAccount() {
  const users = readUsers()
  
  // haesalfarm 계정 찾기
  let haesalfarmIndex = users.findIndex((u) => u.username === 'haesalfarm')
  
  // 기존 admin 계정 찾기 (haesalfarm이 없을 경우)
  let adminIndex = haesalfarmIndex === -1 ? users.findIndex((u) => u.username === 'admin') : -1
  
  if (haesalfarmIndex !== -1) {
    // haesalfarm 계정이 이미 있으면 비밀번호와 정보 강제 업데이트
    users[haesalfarmIndex] = {
      ...users[haesalfarmIndex],
      username: 'haesalfarm',
      password: 'farm9948!!',
      name: '관리자',
      email: 'admin@haesalfarm.com',
      role: 'admin',
    }
    writeUsers(users)
    console.log('관리자 계정 정보가 업데이트되었습니다. 아이디: haesalfarm, 비밀번호: farm9948!!')
  } else if (adminIndex !== -1) {
    // 기존 admin 계정을 haesalfarm으로 변경
    users[adminIndex] = {
      ...users[adminIndex],
      username: 'haesalfarm',
      password: 'farm9948!!',
      name: '관리자',
      email: 'admin@haesalfarm.com',
      role: 'admin',
    }
    writeUsers(users)
    console.log('기존 관리자 계정이 haesalfarm으로 변경되었습니다. 비밀번호: farm9948!!')
  } else {
    // 새 관리자 계정 생성
    const adminUser = {
      id: crypto?.randomUUID ? crypto.randomUUID() : 'admin-' + Date.now(),
      username: 'haesalfarm',
      name: '관리자',
      email: 'admin@haesalfarm.com',
      password: 'farm9948!!',
      role: 'admin',
      createdAt: new Date().toISOString(),
    }
    users.push(adminUser)
    writeUsers(users)
    console.log('기본 관리자 계정이 생성되었습니다. 아이디: haesalfarm, 비밀번호: farm9948!!')
  }
}

/**
 * 모든 사용자 조회 (관리자용)
 */
export async function getAllUsers() {
  if (USE_API) {
    return await authApi.getAllUsers()
  }
  return readUsers()
    .map((u) => safeUser(u))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

/**
 * 사용자 삭제 (관리자용)
 */
export async function deleteUser(userId) {
  if (USE_API) {
    return await authApi.deleteUser(userId)
  }
  
  if (!isAdmin()) {
    throw new Error('관리자만 사용자를 삭제할 수 있습니다.')
  }
  
  const users = readUsers()
  const index = users.findIndex((u) => u.id === userId || u.username === userId)
  
  if (index === -1) {
    throw new Error('사용자를 찾을 수 없습니다.')
  }
  
  // 관리자 계정은 삭제 불가
  if (users[index].role === 'admin' || users[index].username === 'admin' || users[index].username === 'haesalfarm') {
    throw new Error('관리자 계정은 삭제할 수 없습니다.')
  }
  
  users.splice(index, 1)
  writeUsers(users)
  return true
}

/**
 * 임시 비밀번호 생성
 */
function generateTempPassword() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
  let password = ''
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

/**
 * 비밀번호 찾기 (아이디 + 이메일로 사용자 확인 후 임시 비밀번호 생성)
 * @param {string} username - 아이디
 * @param {string} email - 이메일
 * @returns {string} 임시 비밀번호
 */
export async function findPassword({ username, email }) {
  if (USE_API) {
    return await authApi.findPassword({ username, email })
  }

  // 로컬 스토리지 모드
  const u = (username || '').trim()
  const e = (email || '').trim().toLowerCase()

  if (!u || !e) {
    throw new Error('아이디와 이메일을 모두 입력해주세요.')
  }

  const users = readUsers()
  const found = users.find(
    (x) =>
      (x.username || '').toLowerCase() === u.toLowerCase() &&
      (x.email || '').toLowerCase() === e.toLowerCase()
  )

  if (!found) {
    throw new Error('아이디와 이메일이 일치하는 계정을 찾을 수 없습니다.')
  }

  // 임시 비밀번호 생성
  const tempPassword = generateTempPassword()
  
  // 비밀번호 업데이트
  found.password = tempPassword
  writeUsers(users)

  return tempPassword
}

/**
 * 비밀번호 변경 (로그인 후)
 * @param {string} userId - 사용자 ID 또는 username
 * @param {string} oldPassword - 현재 비밀번호
 * @param {string} newPassword - 새 비밀번호
 */
export async function changePassword({ userId, oldPassword, newPassword }) {
  if (USE_API) {
    return await authApi.changePassword({ oldPassword, newPassword })
  }

  // 로컬 스토리지 모드
  if (!newPassword || newPassword.length < 8) {
    throw new Error('새 비밀번호는 8자 이상으로 입력해주세요.')
  }

  const users = readUsers()
  const user = users.find((u) => u.id === userId || u.username === userId)

  if (!user) {
    throw new Error('사용자를 찾을 수 없습니다.')
  }

  // 현재 비밀번호 확인
  if (oldPassword && user.password !== oldPassword) {
    throw new Error('현재 비밀번호가 올바르지 않습니다.')
  }

  // 비밀번호 변경
  user.password = newPassword
  writeUsers(users)

  return true
}

// 앱 시작 시 기본 관리자 계정 생성 (로컬 스토리지 모드에서만)
if (typeof window !== 'undefined' && !USE_API) {
  initAdminAccount()
}



