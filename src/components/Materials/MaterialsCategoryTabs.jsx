import React from 'react'
import './MaterialsCategoryTabs.css'

export default function MaterialsCategoryTabs({
  activeCategory,
  onChange,
}) {
  const categories = [
    '전체',
    '비료',
    '종자',
    '관수자재',
    '비닐/차광',
    '병해충 관리',
  ]

  return (
    <div className="materials-tabs">
      {categories.map(c => (
        <button
          key={c}
          className={`materials-tab ${activeCategory === c ? 'active' : ''}`}
          onClick={() => onChange(c)}
        >
          {c}
        </button>
      ))}
    </div>
  )
}
