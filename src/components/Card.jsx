// src/components/Card.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Card({ title, cta, className = '' }) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (title.includes('하우스')) {
      navigate('/construction')
    } else if (title.includes('팜')) {
      navigate('/farm')
    } else if (title.includes('농자재')) {
      navigate('/materials')   // ✅ 추가
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
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </h3>
        <button className="card-btn">
          {cta} →
        </button>
      </div>
    </article>
  )
}
