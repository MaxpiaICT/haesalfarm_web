import React, { useEffect, useRef, useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const authRef = useRef(null)

  const closeAll = () => {
    setMenuOpen(false)
    setAuthOpen(false)
  }

  const handleComingSoon = () => {
    alert('🚧 업데이트 중입니다!\n조금만 기다려 주세요.')
    closeAll()
  }

  // ✅ 드롭다운 바깥 클릭 시 닫기
  useEffect(() => {
    const onDown = (e) => {
      if (!authRef.current) return
      if (!authRef.current.contains(e.target)) setAuthOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  return (
    <div className="site-root">
      <ScrollToTop />

      <header className="site-header">
        {/* 모바일 햄버거 */}
        <button
          className="hamburger-btn"
          onClick={() => {
            setMenuOpen(true)
            setAuthOpen(false)
          }}
          aria-label="메뉴 열기"
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>

        {/* 로고 */}
        <Link to="/" className="header-logo" onClick={closeAll}>
          <img src="/assets/logo.svg" alt="햇살농업건설" className="logo-img" />
        </Link>

        {/* 데스크톱 네비 */}
        <nav className="main-nav">
          <div className="nav-center">
            <Link to="/construction" onClick={() => setAuthOpen(false)}>
              하우스 시공
            </Link>
            <Link to="/farm" onClick={() => setAuthOpen(false)}>
              팜
            </Link>
            <Link to="/materials" onClick={() => setAuthOpen(false)}>
              농자재
            </Link>
          </div>

          <div className="nav-right">
            {/* 회사소개 */}
            <button className="header-btn" onClick={handleComingSoon}>
              회사소개
            </button>

            {/* 고객센터 */}
            <Link className="header-btn" to="/support" onClick={() => setAuthOpen(false)}>
              고객센터
            </Link>

            {/* 로그인/회원가입 드롭다운 */}
            <div className="auth-dropdown" ref={authRef}>
              <button
                type="button"
                className={`header-btn auth-trigger ${authOpen ? 'open' : ''}`}
                onClick={() => setAuthOpen((v) => !v)}
              >
                로그인/회원가입 <span className="auth-caret">▾</span>
              </button>

              {authOpen && (
                <div className="auth-menu">
                  <Link className="auth-item" to="/login" onClick={() => setAuthOpen(false)}>
                    로그인
                  </Link>
                  <Link className="auth-item" to="/signup" onClick={() => setAuthOpen(false)}>
                    회원가입
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* 모바일 메뉴 */}
      {menuOpen && (
        <>
          <button className="mobile-overlay" onClick={closeAll} aria-label="메뉴 닫기" />

          <aside className="mobile-drawer open">
            <div className="mobile-drawer-top">
              <span className="mobile-drawer-title">메뉴</span>
              <button className="mobile-close" onClick={closeAll}>
                ✕
              </button>
            </div>

            <nav className="mobile-links">
              <Link to="/construction" onClick={closeAll}>
                하우스 시공
              </Link>
              <Link to="/farm" onClick={closeAll}>
                팜
              </Link>
              <Link to="/materials" onClick={closeAll}>
                농자재
              </Link>

              <button onClick={handleComingSoon}>회사소개</button>

              <Link to="/support" onClick={closeAll}>
                고객센터
              </Link>

              <Link to="/login" onClick={closeAll}>
                로그인
              </Link>
              <Link to="/signup" onClick={closeAll}>
                회원가입
              </Link>
            </nav>
          </aside>
        </>
      )}

      <Outlet />
      <Footer />
    </div>
  )
}
