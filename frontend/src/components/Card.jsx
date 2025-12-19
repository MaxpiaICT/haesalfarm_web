// src/components/Card.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Card({ title, cta = '자세히 보기', className = '' }) {
  const navigate = useNavigate()

  const go = () => {
    if (title.includes('하우스')) navigate('/construction')
    else if (title.includes('팜')) navigate('/farm')
    else if (title.includes('농자재')) navigate('/materials')
  }

  return (
    <article
      className={`home-card3 ${className}`}
      onClick={go}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && go()}
    >
      {/* 배경 이미지 */}
      <div className="home-card3-bg" />
      <div className="home-card3-overlay" />

      {/* 타이틀(상단) */}
      <div className="home-card3-title">
        {title.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            <br />
          </span>
        ))}
      </div>

      {/* 하단 흰색 바 */}
      <div className="home-card3-bottom" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="home-card3-cta" onClick={go}>
          <span>{cta}</span>
          <span className="home-card3-arrow">→</span>
        </button>
      </div>
    </article>
  )
}
