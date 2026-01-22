import React, { useMemo, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signup, sendVerificationCode, verifyEmailCode } from '../utils/auth'
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
    verificationCode: '',
    agree: false,
  })
  const [err, setErr] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [policyModalOpen, setPolicyModalOpen] = useState(false)
  const [policyTab, setPolicyTab] = useState('privacy') // 'privacy' or 'terms'
  const [emailVerified, setEmailVerified] = useState(false)
  const [sendingCode, setSendingCode] = useState(false)
  const [verifyingCode, setVerifyingCode] = useState(false)
  const [codeSent, setCodeSent] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }))
    // 이메일이 변경되면 인증 상태 초기화
    if (name === 'email') {
      setEmailVerified(false)
      setCodeSent(false)
      setForm((p) => ({ ...p, verificationCode: '' }))
    }
  }

  // 카운트다운 타이머
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  // 인증 코드 발송
  const handleSendCode = async () => {
    if (!form.email.trim()) {
      setErr('이메일을 입력해주세요.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email.trim())) {
      setErr('올바른 이메일 형식이 아닙니다.')
      return
    }

    try {
      setSendingCode(true)
      setErr('')
      await sendVerificationCode(form.email.trim())
      setCodeSent(true)
      setCountdown(180) // 3분 (180초)
      setErr('')
    } catch (e) {
      setErr(e?.message || '인증 코드 발송에 실패했습니다.')
    } finally {
      setSendingCode(false)
    }
  }

  // 인증 코드 검증
  const handleVerifyCode = async () => {
    if (!form.verificationCode.trim()) {
      setErr('인증 코드를 입력해주세요.')
      return
    }

    try {
      setVerifyingCode(true)
      setErr('')
      await verifyEmailCode(form.email.trim(), form.verificationCode.trim())
      setEmailVerified(true)
      setErr('')
    } catch (e) {
      setErr(e?.message || '인증 코드가 올바르지 않습니다.')
    } finally {
      setVerifyingCode(false)
    }
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

    if (form.email.trim() && !emailVerified) {
      errors.emailVerified = '이메일 인증이 필요합니다.'
    }

    if (!form.agree) errors.agree = '약관 동의가 필요합니다.'

    return { ok: Object.keys(errors).length === 0, errors }
  }, [form, emailVerified])

  const onSubmit = async (e) => {
    e.preventDefault()
    setErr('')
    if (!validate.ok) {
      setErr('입력값을 확인해주세요.')
      return
    }

    try {
      setSubmitting(true)
      // #region agent log
      console.log('[Signup] Starting signup', { username: form.username, name: form.name, email: form.email })
      // #endregion
      await signup({
        username: form.username,
        name: form.name,
        email: form.email,
        password: form.password,
        verificationCode: form.verificationCode,
      })
      // #region agent log
      console.log('[Signup] Success')
      // #endregion
      nav('/mypage')
    } catch (e2) {
      // #region agent log
      console.error('[Signup] Error', { error: e2?.message, stack: e2?.stack })
      // #endregion
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
              <label>아이디 *</label>
              <input name="username" value={form.username} onChange={onChange} placeholder="4자 이상" />
              {validate.errors.username && <p className="error">{validate.errors.username}</p>}
            </div>

            <div className="field">
              <label>이름 *</label>
              <input name="name" value={form.name} onChange={onChange} placeholder="이름" />
              {validate.errors.name && <p className="error">{validate.errors.name}</p>}
            </div>

            <div className="field full">
              <label>이메일 *</label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <input
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="example@domain.com"
                  style={{ flex: 1 }}
                  disabled={emailVerified}
                />
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={sendingCode || countdown > 0 || emailVerified || !form.email.trim()}
                  style={{
                    padding: '8px 16px',
                    whiteSpace: 'nowrap',
                    cursor: sendingCode || countdown > 0 || emailVerified || !form.email.trim() ? 'not-allowed' : 'pointer',
                    opacity: sendingCode || countdown > 0 || emailVerified || !form.email.trim() ? 0.6 : 1,
                  }}
                >
                  {sendingCode ? '발송중...' : countdown > 0 ? `${Math.floor(countdown / 60)}:${String(countdown % 60).padStart(2, '0')}` : '인증코드 발송'}
                </button>
              </div>
              {validate.errors.email && <p className="error">{validate.errors.email}</p>}
              {codeSent && !emailVerified && (
                <div className="field full" style={{ marginTop: '8px' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <input
                      name="verificationCode"
                      value={form.verificationCode}
                      onChange={onChange}
                      placeholder="인증 코드 6자리"
                      style={{ flex: 1 }}
                      maxLength={6}
                    />
                    <button
                      type="button"
                      onClick={handleVerifyCode}
                      disabled={verifyingCode || emailVerified || !form.verificationCode.trim()}
                      style={{
                        padding: '8px 16px',
                        whiteSpace: 'nowrap',
                        cursor: verifyingCode || emailVerified || !form.verificationCode.trim() ? 'not-allowed' : 'pointer',
                        opacity: verifyingCode || emailVerified || !form.verificationCode.trim() ? 0.6 : 1,
                      }}
                    >
                      {verifyingCode ? '확인중...' : emailVerified ? '인증완료' : '인증확인'}
                    </button>
                  </div>
                  {emailVerified && (
                    <p style={{ color: '#2c5530', fontSize: '14px', marginTop: '4px' }}>✓ 이메일 인증이 완료되었습니다.</p>
                  )}
                  {validate.errors.emailVerified && <p className="error">{validate.errors.emailVerified}</p>}
                </div>
              )}
            </div>

            <div className="field">
              <label>비밀번호 *</label>
              <input type="password" name="password" value={form.password} onChange={onChange} placeholder="8자 이상" />
              {validate.errors.password && <p className="error">{validate.errors.password}</p>}
            </div>

            <div className="field">
              <label>비밀번호 확인 *</label>
              <input type="password" name="password2" value={form.password2} onChange={onChange} placeholder="다시 입력" />
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
