import React, { useState } from 'react'
import './FarmKitSection.css'

export default function FarmKitSection() {
  const [activeTab, setActiveTab] = useState('about') // 초기값은 'about'으로 설정

  return (
    <section className="farm-kit-section">
      {/* 탭 영역 (항상 노출) */}
      <div className="farm-kit-tabs">
        <button
          className={`tab ${activeTab === 'store' ? 'active' : ''}`}
          onClick={() => setActiveTab('store')}
        >
          <img src="/assets/icons/store.svg" alt="" />
          <span>store</span>
        </button>

        <button
          className={`tab ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          수경재배 키트란?
        </button>
      </div>

      {/* ================= 탭 콘텐츠 ================= */}

      {/* 1. STORE (맞춤제작 키트) */}
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

            <a href="tel:010-6471-9948" className="farm-kit-cta">
              상담 바로가기
            </a>
          </div>
        </div>
      )}

      {/* 2. ABOUT (수경재배 키트란?) - 이미지 UI 반영 */}
      {activeTab === 'about' && (
        <div className="farm-kit-about">
          
          {/* 제품 구성 */}
          <h4 className="about-title">제품구성</h4>
          <div className="about-grid light">
            <div className="about-card">
              <strong>본체 프레임</strong>
              <p>견고하고 세련된 디자인의 알루미늄 프레임. 2단 높이 조절이 가능하고, 물탱크를 포함하고 있습니다.</p>
            </div>
            <div className="about-card">
              <strong>LED 조명</strong>
              <p>식물 성장에 최적화된 높은 수준, 에너지 효율적인 조명 스펙을 갖추었습니다.</p>
            </div>
            <div className="about-card">
              <strong>영양수</strong>
              <p>식물이 자라는데 필요한 모든 영양소가 함유된 전용 배양액입니다.</p>
            </div>
            <div className="about-card">
              <strong>종자 키트</strong>
              <p>다양한 종류의 종자키트(치커리, 상추, 케일, 쌈채, 허브 등)로 원하는 식물을 재배할 수 있습니다.</p>
            </div>
          </div>

          {/* 사용 방법 */}
          <h4 className="about-title">사용 방법</h4>
          <div className="about-grid green">
            <div className="about-step">
              <span>1</span>
              <p>조립</p>
            </div>
            <div className="about-step">
              <span>2</span>
              <p>물 채우기</p>
            </div>
            <div className="about-step">
              <span>3</span>
              <p>씨앗 삽입</p>
            </div>
            <div className="about-step">
              <span>4</span>
              <p>관리</p>
            </div>
          </div>

          {/* 차별점 */}
          <h4 className="about-title">수경재배 키트만의 차별점</h4>
          <div className="about-grid green small">
            <div className="about-feature">물 관리 간편</div>
            <div className="about-feature">청결한 재배</div>
            <div className="about-feature">계절 무관 재배</div>
            <div className="about-feature">인테리어 효과</div>
          </div>
        </div>
      )}
    </section>
  )
}