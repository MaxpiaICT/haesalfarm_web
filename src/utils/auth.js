// src/utils/auth.js

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

export function signup({ username, name, email, password }) {
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

export function login({ username, password }) {
  const u = (username || '').trim()
  if (!u || !password) throw new Error('아이디와 비밀번호를 입력해주세요.')

  const users = readUsers()
  const found = users.find((x) => (x.username || '').toLowerCase() === u.toLowerCase())

  if (!found) throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.')
  if (found.password !== password) throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.')

  localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser(found)))
  return safeUser(found)
}

export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
  } catch {
    return null
  }
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
}

export function isLoggedIn() {
  return !!getCurrentUser()
}



