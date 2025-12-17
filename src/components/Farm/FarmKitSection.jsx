import React, { useState } from 'react'
import './FarmKitSection.css'

export default function FarmKitSection() {
  const [activeTab, setActiveTab] = useState('about')

  const kitItems = [
    {
      title: '본체 프레임',
      desc: '견고하고 세련된 디자인의 알루미늄 프레임. 2단 높이 조절, 물탱크 포함',
      img: '/assets/1-1.png',
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

  // ✅ (추가) 사용방법 아래에 넣을 “장점 4카드”
  const benefits = [
    {
      title: '물 관리 간편',
      desc:
        '초보자도 성공하는 자동 물 순환 시스템\n' +
        '일주일 한 번 물 보충이면 끝! 일정 간격으로 영양분과\n' +
        '물을 순환시켜 식물이 최적의 환경에서 자라요.',
      icon: '💧',
    },
    {
      title: '청결한 재배',
      desc:
        '아파트 실내에 최적화된 흙 없는 클린 재배\n' +
        '흙이 없어 벌레·먼지 걱정이 적고, 깔끔하고 위생적인\n' +
        '실내 환경에서 신선한 채소를 수확해요.',
      icon: '🫧',
    },
    {
      title: '계절 무관',
      desc:
        '365일 내내 신선함을 만드는 사계절 스마트팜\n' +
        '온도/빛/영양 공급을 안정적으로 유지해 사계절 내내\n' +
        '꾸준한 수확이 가능해요.',
      icon: '❄️',
    },
    {
      title: '인테리어 효과',
      desc:
        '모던 디자인으로 완성하는 플랜테리어\n' +
        '어디에 두어도 잘 어울리는 세련된 디자인으로 공간을\n' +
        '더욱 감각적으로 만들어줘요.',
      icon: '🪴',
    },
  ]

  // ✅ (추가) 3개 가로 배너(강조 포인트)
  const highlights = [
    {
      title: '최대 5배 빠른 성장 속도',
      desc:
        '물에서 직접 영양분을 흡수하는 수경재배 원리로,\n' +
        '토양 재배 대비 더 빠르게 성장할 수 있어요.',
      tone: 'tone-1', // CSS에서 색/배경 구분용
    },
    {
      title: '자동 타이머 LED 시스템',
      desc:
        '식물이 좋아하는 빛 파장을 자동 타이머로 정확히 공급!\n' +
        '사용자가 매번 시간을 맞출 필요 없이 관리가 편해져요.',
      tone: 'tone-2',
    },
    {
      title: '물 절약 90%',
      desc:
        '물이 재순환되는 폐쇄형 시스템으로 일반 농사 대비\n' +
        '물 소비량을 크게 줄이는 친환경 재배 방식이에요.',
      tone: 'tone-3',
    },
  ]

  // ✅ (추가) “누가 사용하면 좋을까요?” 4카드
  const personas = [
    {
      title: '처음 해보는 초보자\n주부·가구원!',
      desc: '복잡한 관리 없이도\n쉽게 재배 성공을 경험하고 싶은 분.',
      img: '/assets/a_1.png', // 없으면 지워도 됨
    },
    {
      title: '아이를 키우는 가정',
      desc: '아이들에게 자연 학습 기회를 제공하고,\n안전한 채소를 먹이고 싶은 분.',
      img: '/assets/a_2.jpg',
    },
    {
      title: '바쁜 맞벌이 부부\n/싱글족',
      desc: '신선한 채소를 꾸준히\n간편하게 수확하고 싶은 분.',
      img: '/assets/a_3.jpg',
    },
    {
      title: '깨끗한 환경을\n선호하는 분',
      desc: '흙·벌레 없는 깔끔한 실내 재배를\n원하는 아파트 거주자.',
      img: '/assets/a_4.png',
    },
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

      {/* ================= 3. ABOUT ================= */}
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
                <p className="step-desc" style={{ whiteSpace: 'pre-line' }}>
                  {s.desc}
                </p>
              </article>
            ))}
          </div>

         {/* ✅ (추가) 사용방법 바로 밑 UI */}
<div className="benefits-section">
  <div className="benefits-wrap">
    <p className="benefits-kicker">흙 먼지, 벌레 걱정 끝! 365일 푸른 식탁을 완성하는</p>
    <h3 className="benefits-head">스마트 수경재배 키트</h3>
    <p className="benefits-sub">
      삭막한 아파트 실내를 생기 넘치는 나만의 스마트팜으로 바꿔보세요.<br />
      복잡한 관리 없이, 누구나 쉽게 신선한 채소를 수확할 수 있어요.
    </p>

    <div className="benefits-grid">
      {benefits.map((b, idx) => (
        <article key={idx} className="benefit-card">
          <div className="benefit-icon">{b.icon}</div>
          <h4 className="benefit-title">{b.title}</h4>
          <p className="benefit-desc" style={{ whiteSpace: 'pre-line' }}>{b.desc}</p>
        </article>
      ))}
    </div>

    <h3 className="highlights-head">물 사용량은 낮추고, 수확 속도는 높이다!</h3>

    <div className="highlights-col">
      {highlights.map((h, idx) => (
        <article key={idx} className={`highlight-bar ${h.tone}`}>
          <h4 className="highlight-title">{h.title}</h4>
          <p className="highlight-desc" style={{ whiteSpace: 'pre-line' }}>{h.desc}</p>
        </article>
      ))}
    </div>

    <h3 className="persona-head">누가 사용하면 좋을까요?</h3>

    <div className="persona-grid">
      {personas.map((p, idx) => (
        <article key={idx} className="persona-card">
          <div className="persona-bg" style={p.img ? { backgroundImage: `url(${p.img})` } : undefined} />
          <div className="persona-overlay" />
          <div className="persona-body">
            <h4 className="persona-title" style={{ whiteSpace: 'pre-line' }}>{p.title}</h4>
            <p className="persona-desc" style={{ whiteSpace: 'pre-line' }}>{p.desc}</p>
          </div>
        </article>
      ))}
    </div>
  </div>
</div>

        </div>
      )}
    </section>
  )
}
