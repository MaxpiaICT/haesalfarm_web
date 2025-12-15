import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Card({ title, cta, className = '' }) {
  const navigate = useNavigate()

  const handleClick = () => {
    // 농사용 하우스 시공 카드만 이동
    if (title.includes('하우스')) {
      navigate('/construction')
    }
  }

  return (
    <article
      className={`card ${className}`}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-bg" />
      <div className="card-body">
        <h3>
          {title.split('\n').map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </h3>
        <button className="card-btn">
          {cta} →
        </button>
      </div>
    </article>
  )
}
