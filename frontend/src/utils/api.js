// src/utils/api.js

// API 기본 URL 가져오기
const getApiBaseUrl = () => {
  // 환경 변수가 설정되어 있으면 사용 (필수)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }

  // VITE_API_URL이 없으면 에러
  const errorMsg = 'VITE_API_URL 환경 변수가 설정되지 않았습니다. frontend/.env 파일 또는 배포 환경 변수를 확인하세요.'
  console.error('❌', errorMsg)
  throw new Error(errorMsg)
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
