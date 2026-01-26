import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, changePassword, logout } from '../utils/auth'
import './ChangePassword.css'

export default function ChangePassword() {
  const nav = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [err, setErr] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        nav('/login')
        return
      }
      setUser(currentUser)
      setLoading(false)
    }
    loadUser()
  }, [nav])

  if (loading) {
    return <div>로딩 중...</div>
  }

  if (!user) {
    return null
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErr('')
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setErr('')

    // 유효성 검사
    if (!form.oldPassword) {
      setErr('현재 비밀번호를 입력해주세요.')
      return
    }

    if (!form.newPassword || form.newPassword.length < 8) {
      setErr('새 비밀번호는 8자 이상으로 입력해주세요.')
      return
    }

    if (form.newPassword !== form.confirmPassword) {
      setErr('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.')
      return
    }

    if (form.oldPassword === form.newPassword) {
      setErr('새 비밀번호는 현재 비밀번호와 다르게 설정해주세요.')
      return
    }

    try {
      setSubmitting(true)
      await changePassword({
        userId: user.id || user.username,
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      })
      alert('비밀번호가 변경되었습니다. 다시 로그인해주세요.')
      logout()
      nav('/login')
    } catch (e2) {
      setErr(e2?.message || '비밀번호 변경에 실패했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="change-password-page">
      <div className="change-password-hero">
        <p className="change-password-hero-text">
          보안을 위해 정기적으로 비밀번호를 변경해주세요.
        </p>
      </div>

      <div className="change-password-wrap">
        <h2 className="change-password-title">비밀번호 변경</h2>

        <form className="change-password-card" onSubmit={onSubmit}>
          <label className="change-password-label">
            현재 비밀번호
            <input
              className="change-password-input"
              type="password"
              name="oldPassword"
              value={form.oldPassword}
              onChange={onChange}
              placeholder="현재 비밀번호를 입력하세요"
              required
              autoComplete="current-password"
            />
          </label>

          <label className="change-password-label">
            새 비밀번호
            <input
              className="change-password-input"
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={onChange}
              placeholder="8자 이상 입력하세요"
              required
              autoComplete="new-password"
            />
          </label>

          <label className="change-password-label">
            새 비밀번호 확인
            <input
              className="change-password-input"
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={onChange}
              placeholder="새 비밀번호를 다시 입력하세요"
              required
              autoComplete="new-password"
            />
          </label>

          {err && <p className="change-password-error">{err}</p>}

          <div className="change-password-actions">
            <button
              className="change-password-btn"
              type="submit"
              disabled={submitting}
            >
              {submitting ? '변경 중...' : '비밀번호 변경'}
            </button>
            <button
              className="change-password-cancel-btn"
              type="button"
              onClick={() => nav('/mypage')}
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

