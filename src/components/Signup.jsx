Signup.jsximport React, { useMemo, useState } from 'react'
import './Support.css'

export default function Support() {
  const [tab, setTab] = useState('inquiry') // 'faq' | 'inquiry'

  const faqs = useMemo(
    () => [
      { q: '시공 문의는 어떻게 하나요?', a: '전화 또는 1:1 문의로 연락주시면 상담 후 일정/견적 안내드립니다.' },
      { q: '수경재배 키트는 배송되나요?', a: '지역/제품 구성에 따라 배송 가능 여부가 달라질 수 있어요. 1:1 문의로 확인해 주세요.' },
      { q: '농자재 구매만도 가능한가요?', a: '가능합니다. 필요한 품목과 수량을 남겨주시면 안내드릴게요.' },
    ],
    []
  )

  const onSubmit = (e) => {
    e.preventDefault()
    // ✅ 아직 DB/서버 없으면 여기서 alert만
    alert('문의가 접수되었습니다! (현재는 테스트 상태)')
  }

  return (
    <div className="support-page">
      {/* 상단 배너 */}
      <section className="support-hero">
        <h1 className="support-title">고객센터</h1>

        <a className="support-call" href="tel:01064719948">
          전화문의 : 010 - 6471 - 9948
        </a>
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
                <label className="label">이름/상호명*</label>
                <input className="input" required placeholder="" />
              </div>

              <div className="field">
                <label className="label">연락처*</label>
                <input className="input" required placeholder="" />
              </div>

              <div className="field">
                <label className="label">이메일</label>
                <input className="input" type="email" placeholder="" />
              </div>

              <div className="field">
                <label className="label">소속</label>
                <input className="input" placeholder="" />
              </div>

              <div className="field full">
                <label className="label">문의 사항*</label>
                <textarea className="textarea" required placeholder="" />
              </div>
            </div>

            <button className="submit" type="submit">
              문의하기
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
