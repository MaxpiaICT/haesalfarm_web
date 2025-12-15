// src/components/Farm/FarmHero.jsx
import React from 'react'
import './FarmHero.css'

export default function FarmHero() {
  return (
    <section className="farm-hero">
      <div className="farm-hero-bg" />
      <div className="farm-hero-overlay" />

      <div className="farm-hero-content">
        <h1>PAM 아파트 수경재배 키트</h1>
        <p className="farm-hero-sub">
          집에서도 신선한 채소를 키우세요!
        </p>

        <a className="farm-hero-cta" href="tel:010-6471-9948">
          ☎ 상담 / 견적 요청
        </a>
      </div>
    </section>
  )
}
