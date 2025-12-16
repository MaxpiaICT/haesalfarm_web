import React from 'react'
import './MaterialsGrid.css'

const items = [
  {
    title: '고급 비료 20kg',
    // price: '50,000원',
    img: '/assets/materials/imges_1.jpg',
    category: '비료',
  },
  {
    title: '프리미엄 종자 50L',
    // price: '30,000원',
    img: '/assets/materials/imges_2.jpg',
    category: '종자',
  },
  {
    title: '자동 관수 시스템',
    // price: '150,000원',
    img: '/assets/materials/imges_3.png',
    category: '관수자재',
  },
  {
    title: '비닐하우스 필름',
    // price: '80,000원',
    img: '/assets/materials/imges_4.png',
    category: '비닐/차광',
  },
  {
    title: '병해충 방제제',
    // price: '25,000원',
    img: '/assets/materials/imges_5.jpg',
    category: '병해충 관리',
  },
  {
    title: '액체 비료 1L',
    // price: '15,000원',
    img: '/assets/materials/imges_6.png',
    category: '비료',
  },
]


export default function MaterialsGrid({ activeCategory }) {
  const filtered =
    activeCategory === '전체'
      ? items
      : items.filter(i => i.category === activeCategory)

  return (
    <section className="materials-grid">
      {filtered.map((item, i) => (
        <article key={i} className="materials-card">
          <div
            className="materials-card-bg"
            style={{ backgroundImage: `url(${item.img})` }}
          />
          <div className="materials-card-overlay" />

          <div className="materials-card-body">
            <h3>{item.title}</h3>
            <strong>{item.price}</strong>
            <button>문의하기</button>
          </div>
        </article>
      ))}
    </section>
  )
}
