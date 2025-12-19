import React, { useEffect, useRef, useState } from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { getCurrentUser, getCurrentUserSync, logout, isAdmin } from './utils/auth' // ✅ 추가

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [user, setUser] = useState(getCurrentUserSync()) // ✅ 로그인 상태 (동기 버전)
  const authRef = useRef(null)

  const nav = useNavigate()
  const location = useLocation()

  // ✅ 라우트 이동/로그인 직후 상태 반영
  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    }
    loadUser()
  }, [location.pathname])

  // 로그아웃 이벤트 리스너 (다른 탭에서 로그아웃 시 동기화)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'auth_token' || e.key === 'haesal_user' || e.key === 'haesal_session') {
        const currentUser = getCurrentUserSync()
        setUser(currentUser)
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // ✅ 드롭다운 바깥 클릭하면 닫기
  useEffect(() => {
    const onDown = (e) => {
      if (!authRef.current) return
      if (!authRef.current.contains(e.target)) setAuthOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  const onLogout = () => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/39db32e4-d4a7-4209-ba06-4c9e4293ad71',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.jsx:onLogout',message:'onLogout called',data:{currentUser:!!user},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    logout()
    setUser(null)
    setAuthOpen(false)
    setMenuOpen(false)
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/39db32e4-d4a7-4209-ba06-4c9e4293ad71',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.jsx:onLogout',message:'after logout',data:{hasToken:!!localStorage.getItem('auth_token'),hasUser:!!localStorage.getItem('haesal_user'),hasSession:!!localStorage.getItem('haesal_session')},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    nav('/', { replace: true })
    // 페이지 강제 새로고침으로 상태 완전 초기화
    setTimeout(() => {
      window.location.reload()
    }, 100)
  }

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
        <Link
          to="/"
          className="header-logo"
          onClick={() => {
            setMenuOpen(false)
            setAuthOpen(false)
          }}
        >
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

            {/* ✅ 회사소개 추가 */}
            <Link
              to="/company"
              onClick={() => {
                setAuthOpen(false)
                setMenuOpen(false)
              }}
            >
              회사소개
            </Link>
          </div>

          <div className="nav-right">
            <Link className="header-btn" to="/support" onClick={() => setAuthOpen(false)}>
              고객센터
            </Link>

            {/* ✅ 로그인 상태면: 마이페이지/로그아웃 */}
            {user ? (
              <>
                <Link className="header-btn" to="/mypage" onClick={() => setAuthOpen(false)}>
                  {isAdmin() ? '관리자 페이지' : '마이페이지'}
                </Link>
                <button className="header-btn" onClick={onLogout}>
                  로그아웃
                </button>
              </>
            ) : (
              /* ✅ 비로그인: 로그인/회원가입 드롭다운 */
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
            )}
          </div>
        </nav>
      </header>

      {/* 모바일 메뉴 */}
      {menuOpen && (
        <>
          <button
            className="mobile-overlay"
            onClick={() => setMenuOpen(false)}
            aria-label="메뉴 닫기"
          />

          <aside className="mobile-drawer open">
            <div className="mobile-drawer-top">
              <span className="mobile-drawer-title">메뉴</span>
              <button className="mobile-close" onClick={() => setMenuOpen(false)}>
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

              {/* ✅ 회사소개 추가 */}
              <Link to="/company" onClick={() => setMenuOpen(false)}>
                회사소개
              </Link>

              <Link to="/support" onClick={() => setMenuOpen(false)}>
                고객센터
              </Link>

              {/* ✅ 모바일도 로그인 상태 분기 */}
              {user ? (
                <>
                  <Link to="/mypage" onClick={() => setMenuOpen(false)}>
                    {isAdmin() ? '관리자 페이지' : '마이페이지'}
                  </Link>
                  <button onClick={onLogout}>로그아웃</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    로그인
                  </Link>
                  <Link to="/signup" onClick={() => setMenuOpen(false)}>
                    회원가입
                  </Link>
                </>
              )}
            </nav>
          </aside>
        </>
      )}

      <Outlet />
      <Footer />
    </div>
  )
}
