import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AuthSelect() {
  const [value, setValue] = useState('login')
  const navigate = useNavigate()

  const go = () => {
    navigate(value === 'signup' ? '/signup' : '/login')
  }

  return (
    <div className="auth-page">
      <h1 className="auth-title">계정</h1>

      <div className="auth-form">
        <label className="auth-label">
          이동할 페이지 선택
          <select
            className="auth-select"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          >
            <option value="login">로그인</option>
            <option value="signup">회원가입</option>
          </select>
        </label>

        <button className="auth-submit" type="button" onClick={go}>
          이동하기
        </button>
      </div>
    </div>
  )
}
