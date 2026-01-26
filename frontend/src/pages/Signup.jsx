import React, { useMemo, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signup } from '../utils/auth'
import PolicyModal from '../components/PolicyModal'
import './Signup.css'

export default function Signup() {
  const nav = useNavigate()

  const [form, setForm] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    password2: '',
    agree: false,
  })
  const [err, setErr] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [policyModalOpen, setPolicyModalOpen] = useState(false)
  const [policyTab, setPolicyTab] = useState('privacy')

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }))
  }

  const validate = useMemo(() => {
    const errors = {}
    if (!form.username.trim()) errors.username = '아이디를 입력해주세요.'
    else if (form.username.trim().length < 4) errors.username = '아이디는 4자 이상으로 입력해주세요.'

    if (!form.name.trim()) errors.name = '이름을 입력해주세요.'

    if (!form.email.trim()) errors.email = '이메일을 입력해주세요.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      errors.email = '이메일 형식이 올바르지 않습니다.'

    if (!form.password) errors.password = '비밀번호를 입력해주세요.'
    else if (form.password.length < 8) errors.password = '비밀번호는 8자 이상으로 입력해주세요.'

    if (!form.password2) errors.password2 = '비밀번호 확인을 입력해주세요.'
    else if (form.password !== form.password2) errors.password2 = '비밀번호가 일치하지 않습니다.'

    if (!form.agree) errors.agree = '약관 동의가 필요합니다.'

    return { ok: Object.keys(errors).length === 0, errors }
  }, [form])

  const onSubmit = async (e) => {
    e.preventDefault()
    setErr('')
    if (!validate.ok) {
      setErr('입력값을 확인해주세요.')
      return
    }

    try {
      setSubmitting(true)
      await signup({
        username: form.username,
        name: form.name,
        email: form.email,
        password: form.password,
      })
      nav('/mypage')
    } catch (e2) {
      setErr(e2?.message || '회원가입에 실패했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  const openPolicyModal = (tab = 'privacy') => {
    setPolicyTab(tab)
    setPolicyModalOpen(true)
  }

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2 className="signup-title">회원가입</h2>
        <p className="signup-sub">아이디로 로그인할 수 있어요.</p>

        {err && <div className="signup-alert">{err}</div>}

        <form className="signup-form" onSubmit={onSubmit}>
          <div className="signup-grid">
            <div className="field">
              <label htmlFor="signup-username">아이디 *</label>
              <input 
                id="signup-username"
                name="username" 
                value={form.username} 
                onChange={onChange} 
                placeholder="4자 이상"
                autoComplete="username"
              />
              {validate.errors.username && <p className="error">{validate.errors.username}</p>}
            </div>

            <div className="field">
              <label htmlFor="signup-name">이름 *</label>
              <input 
                id="signup-name"
                name="name" 
                value={form.name} 
                onChange={onChange} 
                placeholder="이름"
                autoComplete="name"
              />
              {validate.errors.name && <p className="error">{validate.errors.name}</p>}
            </div>

            <div className="field full">
              <label htmlFor="signup-email">이메일 *</label>
              <input
                id="signup-email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="example@domain.com"
                autoComplete="email"
              />
              {validate.errors.email && <p className="error">{validate.errors.email}</p>}
            </div>

            <div className="field">
              <label htmlFor="signup-password">비밀번호 *</label>
              <input 
                id="signup-password"
                type="password" 
                name="password" 
                value={form.password} 
                onChange={onChange} 
                placeholder="8자 이상"
                autoComplete="new-password"
              />
              {validate.errors.password && <p className="error">{validate.errors.password}</p>}
            </div>

            <div className="field">
              <label htmlFor="signup-password2">비밀번호 확인 *</label>
              <input 
                id="signup-password2"
                type="password" 
                name="password2" 
                value={form.password2} 
                onChange={onChange} 
                placeholder="다시 입력"
                autoComplete="new-password"
              />
              {validate.errors.password2 && <p className="error">{validate.errors.password2}</p>}
            </div>

            <div className="agree full">
              <label className="agree-row">
                <input type="checkbox" name="agree" checked={form.agree} onChange={onChange} />
                <span>
                  (필수){' '}
                  <button
                    type="button"
                    className="policy-link"
                    onClick={(e) => {
                      e.preventDefault()
                      openPolicyModal('privacy')
                    }}
                  >
                    개인정보 처리방침
                  </button>
                  {' 및 '}
                  <button
                    type="button"
                    className="policy-link"
                    onClick={(e) => {
                      e.preventDefault()
                      openPolicyModal('terms')
                    }}
                  >
                    이용약관
                  </button>
                  {' 동의'}
                </span>
              </label>
              {validate.errors.agree && <p className="error">{validate.errors.agree}</p>}
            </div>
          </div>

          <button className="signup-btn" type="submit" disabled={!validate.ok || submitting}>
            {submitting ? '가입 처리중...' : '가입하기'}
          </button>

          <p className="signup-foot">
            이미 계정이 있나요? <Link to="/Login">로그인</Link>
          </p>
        </form>
      </div>

      <PolicyModal
        open={policyModalOpen}
        initialTab={policyTab}
        onClose={() => setPolicyModalOpen(false)}
      />
    </div>
  )
}
