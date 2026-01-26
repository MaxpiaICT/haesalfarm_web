import React from 'react'
import { Link } from 'react-router-dom'
import './Company.css'

function SectionTitle({ children }) {
  return (
    <div className="sec-title">
      <span className="sec-title__line" />
      <h2 className="sec-title__text">{children}</h2>
      <span className="sec-title__line" />
    </div>
  )
}

export default function Company() {
  return (
    <main className="company2">
      {/* HERO */}
      <section className="hero2">
        <div className="hero2__overlay" />
        <div className="hero2__inner">
          <h1 className="hero2__title">도시·농촌 어디서든, 수경재배부터 농사하우스 시공까지</h1>
          <p className="hero2__desc">
            아파트·베란다 소형 키트부터 하우스 제작/자재/시공 솔루션을 제공합니다.
          </p>
          <Link to="/support" className="hero2__btn">
            문의하기
          </Link>
        </div>
      </section>

      {/* ABOUT */}
      <section className="wrap2">
        <div className="about2">
          <h2 className="about2__title">우리는 이런 일을 합니다.</h2>
          <p className="about2__desc">
            저희는 도시형 수경재배/시설 시공/농자재 영역에서 고객의 공간 조건과 목적에 맞는 솔루션을 제안합니다.
            <br />
            제품 구매부터 설치, 운영까지 한 번에 연결되는 경험을 만드는 것을 목표로 합니다.
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section className="wrap2">
        <SectionTitle>우리가 중요하게 생각하는 것</SectionTitle>

        <div className="grid4">
          <article className="valueCard v1">
            <h3>안전한 구조</h3>
            <p>오래 쓰는 내구성과 관리 편의성을 기준으로 설계합니다.</p>
          </article>
          <article className="valueCard v2">
            <h3>공간 최적화</h3>
            <p>아파트 환경에 맞는 효율적인 구성으로 제안합니다.</p>
          </article>
          <article className="valueCard v3">
            <h3>쉬운 운영</h3>
            <p>초보자도 실패 확률을 낮추는 가이드 중심으로 안내합니다.</p>
          </article>
          <article className="valueCard v4">
            <h3>정직한 상담</h3>
            <p>목적·예산·일정 기준으로 현실적인 대안을 드립니다.</p>
          </article>
        </div>
      </section>

      {/* SERVICES */}
      <section className="wrap2">
        <SectionTitle>서비스</SectionTitle>

        <div className="grid3">
          <article className="svcCard s1">
            <h3 className="svcCard__title">시공/설치 상담</h3>
            <div className="flow">
              <div className="pill">공간 조건 확인</div>
              <div className="arrow">▼</div>
              <div className="pill">구조/자재 제안</div>
              <div className="arrow">▼</div>
              <div className="pill">일정/견적 안내</div>
            </div>
          </article>

          <article className="svcCard s2">
            <h3 className="svcCard__title">수경재배 키트 판매</h3>
            <div className="flow">
              <div className="pill">가정용 중심 구성</div>
              <div className="arrow">▼</div>
              <div className="pill">운영 난이도별 추천</div>
              <div className="arrow">▼</div>
              <div className="pill">소모품 안내</div>
            </div>
          </article>

          <article className="svcCard s3">
            <h3 className="svcCard__title">농자재 구매</h3>
            <div className="flow">
              <div className="pill">필요 품목·수량 기반 견적</div>
              <div className="arrow">▼</div>
              <div className="pill">대체 제품 추천</div>
              <div className="arrow">▼</div>
              <div className="pill">재고 확인</div>
            </div>
          </article>
        </div>
      </section>

      {/* PROCESS */}
      <section className="wrap2">
        <SectionTitle>진행 방식</SectionTitle>

        <div className="processGrid2">
          {/* 1 */}
          <div className="pCard2">
            <img className="pIcon" src="/assets/icon_1.svg" alt="" />
            <div className="pTitle2">문의 접수</div>
            <div className="pDesc2">폼 / 전화 / 카톡 등</div>
          </div>
          <div className="pArrow2" aria-hidden="true">➜</div>

          {/* 2 */}
          <div className="pCard2">
            <img className="pIcon" src="/assets/icon_2.svg" alt="" />
            <div className="pTitle2">목적 확인</div>
            <div className="pDesc2">재배 목적, 공간 크기, 예산</div>
          </div>
          <div className="pArrow2" aria-hidden="true">➜</div>

          {/* 3 */}
          <div className="pCard2">
            <img className="pIcon" src="/assets/icon_3.svg" alt="" />
            <div className="pTitle2">제안/견적</div>
            <div className="pDesc2">구성, 납기, 비용 안내</div>
          </div>

          {/* ✅ 3→4 화살표는 모바일에서만 필요 (웹에서는 줄 깨짐 방지) */}
          <div className="pArrow2 pArrow2--mOnly" aria-hidden="true">➜</div>

          {/* 4 */}
          <div className="pCard2">
            <img className="pIcon" src="/assets/icon_4.svg" alt="" />
            <div className="pTitle2">결제/일정 확정</div>
            <div className="pDesc2">설치/배송 일정 확정</div>
          </div>
          <div className="pArrow2" aria-hidden="true">➜</div>

          {/* 5 */}
          <div className="pCard2">
            <img className="pIcon" src="/assets/icon_5.svg" alt="" />
            <div className="pTitle2">설치/배송 진행</div>
            <div className="pDesc2">설치 또는 제품 배송 진행</div>
          </div>
          <div className="pArrow2" aria-hidden="true">➜</div>

          {/* 6 */}
          <div className="pCard2">
            <img className="pIcon" src="/assets/icon_6.svg" alt="" />
            <div className="pTitle2">사후 안내 확정</div>
            <div className="pDesc2">
              운영 가이드 제공<br />/ 소모품 안내
            </div>
          </div>
        </div>
      </section>

      {/* TRUST (배경 이미지 섹션) */}
      <section className="trustBg">
        <div className="trustBg__overlay" />
        <div className="trustBg__inner">
          <h2 className="trustBg__title">신뢰를 만드는 기준</h2>
          <p className="trustBg__desc">상담 시 체크리스트 기반으로 확인합니다.</p>
          <p className="trustBg__desc">제품 구성/호환성을 명확히 안내합니다.</p>
          <p className="trustBg__desc">가능 범위 내 운영 가이드 및 사후 안내를 제공합니다.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="wrap2 cta2">
        <h2 className="cta2__title">공간에 맞는 구성으로 안내드릴게요</h2>
        <p className="cta2__desc">
          원하시는 목적과 공간을 남겨주시면 가장 효율적인 구성으로 제안드립니다.
        </p>
        <Link to="/support" className="cta2__btn">
          1:1 문의하기
        </Link>
      </section>
    </main>
  )
}
