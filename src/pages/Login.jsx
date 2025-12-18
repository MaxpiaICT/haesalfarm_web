import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../utils/auth'
import './login.css'

export default function Login() {
  const nav = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [err, setErr] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    setErr('')

    try {
      setSubmitting(true)
      login({ username: form.username, password: form.password })
      nav('/mypage')
    } catch (e2) {
      setErr(e2?.message || '로그인에 실패했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="login-page">
      {/* 배너 */}
      <div className="login-hero" />

      <div className="login-wrap">
        <h2 className="login-title">로그인</h2>

        <form className="login-card" onSubmit={onSubmit}>
          <label className="login-label">
            아이디
            <input
              className="login-input"
              name="username"
              value={form.username}
              onChange={onChange}
              placeholder="아이디를 입력하세요"
              autoComplete="username"
            />
          </label>

          <label className="login-label">
            비밀번호
            <input
              className="login-input"
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="비밀번호"
              autoComplete="current-password"
            />
          </label>

          {err && <p className="login-error">{err}</p>}

          <button className="login-btn" type="submit" disabled={submitting}>
            {submitting ? '로그인 중...' : '로그인하기'}
          </button>
        </form>

        <p className="login-join-text">아직 회원이 아니신가요?</p>
        <Link className="login-join-btn" to="/signup">회원가입</Link>
      </div>
    </div>
  )
}
