import React, { useState } from 'react'
import './FarmKitSection.css'

export default function FarmKitSection() {
  const [activeTab, setActiveTab] = useState('about')

  const kitItems = [
    {
      title: '본체 프레임',
      desc: '견고하고 세련된 디자인의 알루미늄 프레임. 2단 높이 조절, 물탱크 포함',
      img: '/assets/1-1.png', // ✅ 너 이미지 경로로 교체
    },
    {
      title: 'LED 조명',
      desc: '식물 성장에 최적화된 고효율 LED 조명',
      img: '/assets/1-2.png',
    },
    {
      title: '영양수',
      desc: '필수 영양소가 포함된 전용 배양액',
      img: '/assets/1-3.png',
    },
    {
      title: '종자 키트',
      desc: '치커리, 상추, 케일, 허브 등 다양한 구성',
      img: '/assets/1-4.png',
    },
  ]

  const steps = [
    { num: 1, title: '조립', desc: '프레임과 받침대를 조립해요.\n특별한 도구가 필요하지 않아요.' },
    { num: 2, title: '물 채우기', desc: '본체에 물을 채우고 영양수를\n적정 비율로 섞어주세요.' },
    { num: 3, title: '씨앗 삽입', desc: '제공된 종자 키트의 씨앗을\n삽입하고 LED 조명을 켜주세요.' },
    { num: 4, title: '관리', desc: '정기적으로 물을 보충하고\nLED 조명 시간을 설정해요.' },
  ]

  return (
    <section className="farm-kit-section">
      {/* ================= 탭 영역 ================= */}
      <div className="farm-kit-tabs">
        <button
          className={`tab ${activeTab === 'video' ? 'active' : ''}`}
          onClick={() => setActiveTab('video')}
        >
          설명 영상
        </button>

        <button
          className={`tab ${activeTab === 'store' ? 'active' : ''}`}
          onClick={() => setActiveTab('store')}
        >
          store
        </button>

        <button
          className={`tab ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          수경재배 키트란?
        </button>
      </div>

      {/* ================= 1. VIDEO ================= */}
      {activeTab === 'video' && (
        <div className="farm-kit-video">
          <div className="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/영상ID"
              title="수경재배 키트 설명 영상"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* ================= 2. STORE ================= */}
      {activeTab === 'store' && (
        <div className="farm-kit-card">
          <div className="farm-kit-bg" />
          <div className="farm-kit-content">
            <h3>
              맞춤제작<br />키트
            </h3>

            <div className="farm-kit-icon">
              <img src="/assets/kit.svg" alt="맞춤제작 키트" />
            </div>

            <a href="tel:01064719948" className="farm-kit-cta">
              상담 바로가기
            </a>
          </div>
        </div>
      )}

      {/* ================= 3. ABOUT (UI 변경) ================= */}
      {activeTab === 'about' && (
        <div className="farm-kit-about">
          {/* 제품 구성 */}
          <div className="kit-head">
            <h4 className="kit-title">제품구성</h4>
            <span className="kit-line" />
          </div>

          <div className="kit-grid">
            {kitItems.map((it, idx) => (
              <article key={idx} className="kit-item">
                <div className="kit-thumb">
                  <img src={it.img} alt={it.title} />
                </div>

                <div className="kit-body">
                  <h5 className="kit-item-title">{it.title}</h5>
                  <p className="kit-item-desc">{it.desc}</p>
                </div>
              </article>
            ))}
          </div>

          {/* 사용 방법 */}
          <div className="kit-head mt">
            <h4 className="kit-title">사용방법</h4>
            <span className="kit-line" />
          </div>

          <div className="steps-row">
            {steps.map((s) => (
              <article key={s.num} className="step-card">
                <div className="step-num">{s.num}</div>
                <h5 className="step-title">{s.title}</h5>
                <p className="step-desc">{s.desc}</p>
              </article>
            ))}
          </div>

        
        </div>
      )}
    </section>
  )
}
