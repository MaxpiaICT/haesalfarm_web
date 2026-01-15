// src/utils/api.js

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

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
  fetch('http://127.0.0.1:7242/ingest/39db32e4-d4a7-4209-ba06-4c9e4293ad71',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api.js:apiRequest',message:'API request',data:{endpoint,method:options.method||'GET',hasToken:!!token},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion

  try {
    const fullUrl = `${API_BASE_URL}${endpoint}`
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/39db32e4-d4a7-4209-ba06-4c9e4293ad71',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api.js:apiRequest',message:'Full URL',data:{fullUrl},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    const response = await fetch(fullUrl, config)
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/39db32e4-d4a7-4209-ba06-4c9e4293ad71',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api.js:apiRequest',message:'Response status',data:{status:response.status,statusText:response.statusText,url:response.url},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    const data = await response.json()

    if (!response.ok) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/39db32e4-d4a7-4209-ba06-4c9e4293ad71',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api.js:apiRequest',message:'Response error',data:{error:data.error,status:response.status},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      throw new Error(data.error || '요청에 실패했습니다.')
    }

    return data
  } catch (error) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/39db32e4-d4a7-4209-ba06-4c9e4293ad71',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api.js:apiRequest',message:'Catch error',data:{errorMessage:error.message,errorName:error.name},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
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

