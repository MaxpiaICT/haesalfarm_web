// src/utils/api.js

// 모바일 접근을 위해 현재 호스트의 IP 주소를 자동 감지
const getApiBaseUrl = () => {
  // 환경 변수가 설정되어 있으면 사용 (배포 환경에서는 필수)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }
  
  // 배포 환경(PROD)에서 환경 변수가 없는 경우
  if (import.meta.env.PROD) {
    // 배포 환경에서는 현재 호스트를 기반으로 API URL 생성
    // 예: https://haesalfarm.com -> https://haesalfarm.com/api 또는 백엔드 서버 URL
    const hostname = window.location.hostname
    const protocol = window.location.protocol
    
    // 같은 도메인에서 API를 제공하는 경우
    // 또는 별도의 백엔드 서버가 있는 경우 여기에 설정
    // 예: Railway, Render, Heroku 등의 백엔드 URL
    console.warn('⚠️ VITE_API_URL 환경 변수가 설정되지 않았습니다. 현재 호스트를 사용합니다.')
    
    // 같은 도메인에서 API를 제공하는 경우 (예: /api 경로)
    // 또는 백엔드 서버가 별도로 있는 경우 해당 URL을 반환
    // 기본적으로는 같은 도메인의 /api 경로를 사용
    return `${protocol}//${hostname}/api`
  }
  
  // 개발 환경에서만 자동 감지 사용
  if (import.meta.env.DEV) {
    const hostname = window.location.hostname
    // localhost가 아닌 경우 (모바일에서 접근 시) 현재 호스트 사용
    // 단, PC에서 접근할 때는 localhost를 사용하여 로컬 네트워크 권한 팝업 방지
    if (hostname !== 'localhost' && hostname !== '127.0.0.1' && hostname.match(/^\d+\.\d+\.\d+\.\d+$/)) {
      // IP 주소 형식인 경우에만 (모바일 접근) 현재 호스트 사용
      return `http://${hostname}:3001/api`
    }
  }
  
  // 개발 환경 기본값: localhost (PC에서 접근 시)
  return 'http://localhost:3001/api'
}

const API_BASE_URL = getApiBaseUrl()

// #region agent log
console.log('[API Config]', { API_BASE_URL, hostname: window.location.hostname, isDev: import.meta.env.DEV, isProd: import.meta.env.PROD, envUrl: import.meta.env.VITE_API_URL })
// #endregion

// 디버그 로깅 활성화 여부 (개발 환경에서만)
const DEBUG_LOGGING_ENABLED = import.meta.env.DEV && import.meta.env.VITE_DEBUG_LOGGING !== 'false'

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

  // #region agent log
  if (DEBUG_LOGGING_ENABLED) {
    fetch('http://127.0.0.1:7242/ingest/39db32e4-d4a7-4209-ba06-4c9e4293ad71',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api.js:apiRequest',message:'API request',data:{endpoint,method:options.method||'GET',hasToken:!!token},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  }
  // #endregion

  try {
    const fullUrl = `${API_BASE_URL}${endpoint}`
    // #region agent log
    console.log('[API Request]', { endpoint, fullUrl, API_BASE_URL, method: options.method || 'GET', hostname: window.location.hostname, isDev: import.meta.env.DEV, isProd: import.meta.env.PROD })
    if (DEBUG_LOGGING_ENABLED) {
      fetch('http://127.0.0.1:7242/ingest/39db32e4-d4a7-4209-ba06-4c9e4293ad71',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api.js:apiRequest',message:'Full URL',data:{fullUrl,API_BASE_URL,endpoint,method:options.method||'GET',hostname:window.location.hostname,isDev:import.meta.env.DEV,isProd:import.meta.env.PROD},timestamp:Date.now(),sessionId:'debug-session',runId:'mobile-signup',hypothesisId:'A'})}).catch(()=>{});
    }
    // #endregion
    
    // #region agent log
    console.log('[API Request] Attempting fetch', { fullUrl, config: { method: config.method, headers: config.headers } })
    // #endregion
    
    const response = await fetch(fullUrl, config)
    // #region agent log
    if (DEBUG_LOGGING_ENABLED) {
      fetch('http://127.0.0.1:7242/ingest/39db32e4-d4a7-4209-ba06-4c9e4293ad71',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api.js:apiRequest',message:'Response status',data:{status:response.status,statusText:response.statusText,url:response.url,contentType:response.headers.get('content-type')},timestamp:Date.now(),sessionId:'debug-session',runId:'login-error',hypothesisId:'A'})}).catch(()=>{});
    }
    // #endregion
    
    // 응답 본문 확인
    const contentType = response.headers.get('content-type')
    const text = await response.text()
    
    // #region agent log
    console.log('[API Response]', { 
      status: response.status, 
      contentType, 
      textLength: text.length,
      textPreview: text.substring(0, 200),
      endpoint,
      fullUrl 
    })
    if (DEBUG_LOGGING_ENABLED) {
      fetch('http://127.0.0.1:7242/ingest/39db32e4-d4a7-4209-ba06-4c9e4293ad71',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api.js:apiRequest',message:'Response body',data:{status:response.status,contentType,textLength:text.length,textPreview:text.substring(0,200),endpoint,fullUrl},timestamp:Date.now(),sessionId:'debug-session',runId:'login-error',hypothesisId:'A'})}).catch(()=>{});
    }
    // #endregion
    
    // 빈 응답 처리
    if (!text || text.trim().length === 0) {
      // #region agent log
      console.error('[API Error] Empty response', { endpoint, fullUrl, status: response.status })
      if (DEBUG_LOGGING_ENABLED) {
        fetch('http://127.0.0.1:7242/ingest/39db32e4-d4a7-4209-ba06-4c9e4293ad71',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api.js:apiRequest',message:'Empty response',data:{endpoint,fullUrl,status:response.status},timestamp:Date.now(),sessionId:'debug-session',runId:'login-error',hypothesisId:'B'})}).catch(()=>{});
      }
      // #endregion
      
      if (!response.ok) {
        throw new Error(`서버 오류 (${response.status}): 응답이 비어있습니다.`)
      }
      // 성공 응답이지만 본문이 없는 경우
      return {}
    }
    
    // JSON 파싱 시도
    let data
    try {
      data = JSON.parse(text)
    } catch (parseError) {
      // #region agent log
      console.error('[API Error] JSON parse failed', { 
        endpoint, 
        fullUrl, 
        status: response.status,
        contentType,
        textPreview: text.substring(0, 200),
        parseError: parseError.message 
      })
      if (DEBUG_LOGGING_ENABLED) {
        fetch('http://127.0.0.1:7242/ingest/39db32e4-d4a7-4209-ba06-4c9e4293ad71',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api.js:apiRequest',message:'JSON parse failed',data:{endpoint,fullUrl,status:response.status,contentType,textPreview:text.substring(0,200),parseError:parseError.message},timestamp:Date.now(),sessionId:'debug-session',runId:'login-error',hypothesisId:'C'})}).catch(()=>{});
      }
      // #endregion
      
      // HTML 오류 페이지인 경우
      if (contentType && contentType.includes('text/html')) {
        throw new Error(`서버 오류 (${response.status}): HTML 오류 페이지가 반환되었습니다.`)
      }
      
      throw new Error(`서버 응답을 파싱할 수 없습니다: ${parseError.message}`)
    }

    if (!response.ok) {
      // #region agent log
      if (DEBUG_LOGGING_ENABLED) {
        fetch('http://127.0.0.1:7242/ingest/39db32e4-d4a7-4209-ba06-4c9e4293ad71',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api.js:apiRequest',message:'Response error',data:{error:data.error,status:response.status},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      }
      // #endregion
      throw new Error(data.error || '요청에 실패했습니다.')
    }

    return data
  } catch (error) {
    // #region agent log
    const errorDetails = {
      endpoint,
      fullUrl: `${API_BASE_URL}${endpoint}`,
      API_BASE_URL,
      error: error.message,
      errorName: error.name,
      stack: error.stack,
      hostname: window.location.hostname,
      isDev: import.meta.env.DEV,
      isProd: import.meta.env.PROD,
      userAgent: navigator.userAgent,
    }
    console.error('[API Error]', errorDetails)
    if (DEBUG_LOGGING_ENABLED) {
      fetch('http://127.0.0.1:7242/ingest/39db32e4-d4a7-4209-ba06-4c9e4293ad71',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api.js:apiRequest',message:'Catch error',data:errorDetails,timestamp:Date.now(),sessionId:'debug-session',runId:'mobile-signup',hypothesisId:'A'})}).catch(()=>{});
    }
    // #endregion
    
    // 네트워크 오류인 경우 더 명확한 메시지 제공
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(`서버에 연결할 수 없습니다. (${API_BASE_URL})`)
    }
    
    if (error.message) {
      throw error
    }
    throw new Error('네트워크 오류가 발생했습니다.')
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

