import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { findPassword } from '../utils/auth'
import './ForgotPassword.css'

export default function ForgotPassword() {
  const nav = useNavigate()
  const [form, setForm] = useState({ username: '', email: '' })
  const [err, setErr] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [tempPassword, setTempPassword] = useState(null)

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErr('')
    setTempPassword(null)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setErr('')
    setTempPassword(null)

    try {
      setSubmitting(true)
      const password = await findPassword({
        username: form.username.trim(),
        email: form.email.trim(),
      })
      setTempPassword(password)
    } catch (e2) {
      setErr(e2?.message || '비밀번호 찾기에 실패했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-hero">
        <p className="forgot-password-hero-text">
          비밀번호를 잊으셨나요? 아이디와 이메일을 입력해주세요.
        </p>
      </div>

      <div className="forgot-password-wrap">
        <h2 className="forgot-password-title">비밀번호 찾기</h2>

        {tempPassword ? (
          <div className="forgot-password-result">
            <div className="result-success">
              <h3>임시 비밀번호가 발급되었습니다.</h3>
              <div className="temp-password-box">
                <label className="temp-password-label">임시 비밀번호:</label>
                <div className="temp-password-value">{tempPassword}</div>
                <button
                  className="temp-password-copy-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(tempPassword)
                    alert('임시 비밀번호가 복사되었습니다.')
                  }}
                  type="button"
                >
                  복사하기
                </button>
              </div>
              <p className="result-warning">
                ⚠️ 보안을 위해 로그인 후 반드시 비밀번호를 변경해주세요.
              </p>
              <div className="result-actions">
                <Link className="result-btn primary" to="/login">
                  로그인하기
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <form className="forgot-password-card" onSubmit={onSubmit}>
            <label className="forgot-password-label">
              아이디
              <input
                className="forgot-password-input"
                name="username"
                value={form.username}
                onChange={onChange}
                placeholder="아이디를 입력하세요"
                required
                autoComplete="username"
              />
            </label>

            <label className="forgot-password-label">
              이메일
              <input
                className="forgot-password-input"
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="가입 시 등록한 이메일을 입력하세요"
                required
                autoComplete="email"
              />
            </label>

            {err && <p className="forgot-password-error">{err}</p>}

            <button
              className="forgot-password-btn"
              type="submit"
              disabled={submitting}
            >
              {submitting ? '처리 중...' : '임시 비밀번호 발급'}
            </button>
          </form>
        )}

        <div className="forgot-password-links">
          <Link to="/login">로그인으로 돌아가기</Link>
          <Link to="/signup">회원가입</Link>
        </div>
      </div>
    </div>
  )
}

