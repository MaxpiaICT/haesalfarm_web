import React, { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop' // ✅ 사용됨

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleComingSoon = () => {
    alert('🚧 업데이트 중입니다!\n조금만 기다려 주세요.')
    setMenuOpen(false)
  }

  return (
    <div className="site-root">
      {/* ✅ 페이지 이동 시 항상 상단으로 */}
      <ScrollToTop />

      <header className="site-header">
        {/* 🔹 모바일 햄버거 (CSS에서 모바일만 노출) */}
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(true)}
          aria-label="메뉴 열기"
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>

        {/* 🔹 로고 (모바일 중앙 / PC 좌측) */}
        <Link to="/" className="header-logo" onClick={() => setMenuOpen(false)}>
          <img
            src="/assets/logo.svg"
            alt="햇살농업건설"
            className="logo-img"
          />
        </Link>

        {/* 🔹 데스크톱 네비게이션 */}
        <nav className="main-nav">
          <div className="nav-center">
            <Link to="/construction">하우스 시공</Link>
            <Link to="/farm">팜</Link>
            <Link to="/materials">농자재</Link>
          </div>

          <div className="nav-right">
            <button className="header-btn" onClick={handleComingSoon}>
              회사소개
            </button>
            <button className="header-btn" onClick={handleComingSoon}>
              로그인/회원가입
            </button>
          </div>
        </nav>
      </header>

      {/* ================= 모바일 메뉴 ================= */}
      {menuOpen && (
        <>
          {/* 오버레이 */}
          <button
            className="mobile-overlay"
            onClick={() => setMenuOpen(false)}
            aria-label="메뉴 닫기"
          />

          {/* 드로어 */}
          <aside className="mobile-drawer open">
            <div className="mobile-drawer-top">
              <span className="mobile-drawer-title">메뉴</span>
              <button
                className="mobile-close"
                onClick={() => setMenuOpen(false)}
              >
                ✕
              </button>
            </div>

            <nav className="mobile-links">
              <Link to="/construction" onClick={() => setMenuOpen(false)}>
                하우스 시공
              </Link>
              <Link to="/farm" onClick={() => setMenuOpen(false)}>
                팜
              </Link>
              <Link to="/materials" onClick={() => setMenuOpen(false)}>
                농자재
              </Link>

              <button onClick={handleComingSoon}>회사소개</button>
              <button onClick={handleComingSoon}>로그인 / 회원가입</button>
            </nav>
          </aside>
        </>
      )}

      {/* 페이지 컨텐츠 */}
      <Outlet />

      <Footer />
    </div>
  )
}
