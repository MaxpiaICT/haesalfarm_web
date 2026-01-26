import React from 'react'
import './MaterialsGrid.css'

const items = [
  { title: '고급 비료 20kg', img: '/assets/materials/imges_1.jpg', category: '비료' },
  { title: '프리미엄 종자 50L', img: '/assets/materials/imges_2.jpg', category: '종자' },
  { title: '자동 관수 시스템', img: '/assets/materials/imges_3.png', category: '관수자재' },
  { title: '비닐하우스 필름', img: '/assets/materials/imges_4.png', category: '비닐/차광' },
  { title: '병해충 방제제', img: '/assets/materials/imges_5.jpg', category: '병해충 관리' },
  { title: '액체 비료 1L', img: '/assets/materials/imges_6.png', category: '비료' },
]

const PHONE = '010-6471-9948'
const TEL = '01064719948' // tel 링크용(하이픈 제거)

export default function MaterialsGrid({ activeCategory = '전체' }) {
  const filtered =
    activeCategory === '전체' ? items : items.filter(i => i.category === activeCategory)

  return (
    <section className="materials-grid">
      {filtered.map((item, i) => (
        <article key={i} className="materials-card">
          <div className="materials-thumb">
            <img src={item.img} alt={item.title} loading="lazy" />
          </div>

          <div className="materials-body">
            <h3 className="materials-title">{item.title}</h3>

            <a className="materials-call-btn" href={`tel:${TEL}`} aria-label={`${PHONE}로 전화 문의`}>
              <span className="materials-call-icon">📞</span>
              문의하기
            </a>
          </div>
        </article>
      ))}
    </section>
  )
}
