import React, { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUserSync } from '../utils/auth'
import { createInquiry } from '../utils/inquiries'
import './Support.css'

export default function Support() {
  const nav = useNavigate()
  const [tab, setTab] = useState('inquiry') // 'faq' | 'inquiry'
  const [user, setUser] = useState(getCurrentUserSync())
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    affiliation: '',
    content: '',
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const loadUser = async () => {
      const { getCurrentUser } = await import('../utils/auth')
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    }
    loadUser()
  }, [])

  const faqs = useMemo(
    () => [
      { q: '시공 문의는 어떻게 하나요?', a: '전화 또는 1:1 문의로 연락주시면 상담 후 일정/견적 안내드립니다.' },
      { q: '수경재배 키트는 배송되나요?', a: '지역/제품 구성에 따라 배송 가능 여부가 달라질 수 있어요. 1:1 문의로 확인해 주세요.' },
      { q: '농자재 구매만도 가능한가요?', a: '가능합니다. 필요한 품목과 수량을 남겨주시면 안내드릴게요.' },
    ],
    []
  )

  const onChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setSubmitting(true)
      await createInquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        affiliation: formData.affiliation,
        content: formData.content,
        userId: user?.id || user?.username || null,
      })
      
      alert('문의가 접수되었습니다! 마이페이지에서 확인 할 수 있습니다.')
      setFormData({ name: '', phone: '', email: '', affiliation: '', content: '' })
      nav('/', { replace: true })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      alert(error.message || '문의 접수에 실패했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="support-page">
      {/* 상단 배너 */}
      <section className="support-hero">
        <h1 className="support-title">고객센터</h1>

        <a className="support-call" href="tel:01064719948">
          전화문의 : 010 - 6471 - 9948
        </a>
        
        <div className="support-email">
          이메일 : haesalfarm@naver.com
        </div>
      </section>

      {/* 탭 */}
      <div className="support-tabs">
        <button
          className={`support-tab ${tab === 'faq' ? 'active' : ''}`}
          onClick={() => setTab('faq')}
          type="button"
        >
          자주 묻는 질문(FAQ)
        </button>

        <button
          className={`support-tab ${tab === 'inquiry' ? 'active' : ''}`}
          onClick={() => setTab('inquiry')}
          type="button"
        >
          1:1 문의
        </button>
      </div>

      <div className="support-body">
        {/* FAQ */}
        {tab === 'faq' && (
          <div className="faq-wrap">
            {faqs.map((f, idx) => (
              <details className="faq-item" key={idx}>
                <summary className="faq-q">{f.q}</summary>
                <div className="faq-a">{f.a}</div>
              </details>
            ))}
          </div>
        )}

        {/* 1:1 문의 */}
        {tab === 'inquiry' && (
          <form className="inquiry-form" onSubmit={onSubmit}>
            <div className="inquiry-grid">
              <div className="field">
                <label htmlFor="support-name" className="label">이름/상호명*</label>
                <input
                  id="support-name"
                  autoComplete="name"
                  className="input"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  required
                  placeholder=""
                />
              </div>

              <div className="field">
                <label htmlFor="support-phone" className="label">연락처*</label>
                <input
                  id="support-phone"
                  autoComplete="tel"
                  className="input"
                  name="phone"
                  value={formData.phone}
                  onChange={onChange}
                  required
                  placeholder=""
                />
              </div>

              <div className="field">
                <label htmlFor="support-email" className="label">이메일</label>
                <input
                  id="support-email"
                  autoComplete="email"
                  className="input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                  placeholder=""
                />
              </div>

              <div className="field">
                <label htmlFor="support-affiliation" className="label">소속</label>
                <input
                  id="support-affiliation"
                  autoComplete="organization"
                  className="input"
                  name="affiliation"
                  value={formData.affiliation}
                  onChange={onChange}
                  placeholder=""
                />
              </div>

              <div className="field full">
                <label htmlFor="support-content" className="label">문의 사항*</label>
                <textarea
                  id="support-content"
                  className="textarea"
                  name="content"
                  value={formData.content}
                  onChange={onChange}
                  required
                  placeholder=""
                />
              </div>
            </div>

            <button className="submit" type="submit" disabled={submitting}>
              {submitting ? '처리 중...' : '문의하기'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
