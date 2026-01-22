// src/utils/api.js

// 모바일 접근을 위해 현재 호스트의 IP 주소를 자동 감지
const getApiBaseUrl = () => {
  // 환경 변수가 설정되어 있으면 사용 (배포 환경에서는 필수)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }

  // 배포 환경(PROD)에서 환경 변수가 없는 경우
  if (import.meta.env.PROD) {
    // Fly.io 백엔드 URL을 기본값으로 사용
    const flyBackendUrl = 'https://haesalfarm-backend.fly.dev/api'

    console.warn('⚠️ VITE_API_URL 환경 변수가 설정되지 않았습니다. Fly.io 백엔드를 사용합니다.')
    console.warn('💡 배포 환경 변수에 VITE_API_URL을 설정하는 것을 권장합니다.')

    return flyBackendUrl
  }

  // 개발 환경에서만 자동 감지 사용
  if (import.meta.env.DEV) {
    const hostname = window.location.hostname

    // IP 주소 형식인 경우에만 (모바일 접근) 현재 호스트 사용
    if (
      hostname !== 'localhost' &&
      hostname !== '127.0.0.1' &&
      hostname.match(/^\d+\.\d+\.\d+\.\d+$/)
    ) {
      return `http://${hostname}:3001/api`
    }
  }

  // 개발 환경 기본값: localhost (PC에서 접근 시)
  return 'http://localhost:3001/api'
}

const API_BASE_URL = getApiBaseUrl()

// 디버그 로깅 활성화 여부 (개발 환경에서만)
const DEBUG_LOGGING_ENABLED =
  import.meta.env.DEV && import.meta.env.VITE_DEBUG_LOGGING !== 'false'

// 토큰 가져오기
const getToken = () => {
  return localStorage.getItem('auth_token')
}

// API 요청 헬퍼
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken()

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  }

  const fullUrl = `${API_BASE_URL}${endpoint}`

  if (DEBUG_LOGGING_ENABLED) {
    console.log('[API Request]', {
      fullUrl,
      endpoint,
      method: options.method || 'GET',
      hasToken: !!token,
    })
  }

  try {
    const response = await fetch(fullUrl, config)

    let data = null
    const contentType = response.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      data = await response.json()
    } else {
      // JSON이 아닌 응답도 안전하게 처리
      const text = await response.text()
      data = { message: text }
    }

    if (!response.ok) {
      throw new Error(data?.error || data?.message || '요청에 실패했습니다.')
    }

    return data
  } catch (error) {
    if (DEBUG_LOGGING_ENABLED) {
      console.error('[API Error]', error)
    }
    throw error?.message ? error : new Error('네트워크 오류가 발생했습니다.')
  }
}

// GET 요청
export const get = (endpoint, options) => {
  return apiRequest(endpoint, { method: 'GET', ...options })
}

// POST 요청
export const post = (endpoint, data, options) => {
  return apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
  })
}

// PUT 요청
export const put = (endpoint, data, options) => {
  return apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
    ...options,
  })
}

// DELETE 요청
export const del = (endpoint, options) => {
  return apiRequest(endpoint, { method: 'DELETE', ...options })
}
