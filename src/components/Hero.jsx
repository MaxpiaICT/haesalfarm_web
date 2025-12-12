import React from 'react'

export default function Hero(){
  const bgUrl = "/assets/bg.jpg"
  return (
    <section className="hero">
      <div className="hero-bg" style={{backgroundImage: `url(${bgUrl})`}} />
      <div className="hero-overlay"/>
      <div className="hero-content">
        <h1>스마트 농업 솔루션의 모든 것</h1>
        <p className="hero-sub">하우스 시공 · 수경재배 키트 · 농자재까지 원스톱 서비스</p>
        <a className="hero-cta" href="tel:000-000-000" aria-label="전화 문의 000-000-000">
          <svg className="hero-cta-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12 1.05.37 2.06.73 3.03a2 2 0 0 1-.45 2L8.91 11.09a16 16 0 0 0 6 6l1.34-1.34a2 2 0 0 1 2-.45c.97.36 1.98.61 3.03.73A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>문의 하기 000-000-000</span>
        </a>
      </div>
    </section>
  )
}
