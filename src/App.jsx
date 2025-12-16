import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import Footer from './components/Footer'

export default function App() {

  const handleComingSoon = () => {
    alert('🚧 업데이트 중입니다!\n조금만 기다려 주세요.')
  }

  return (
    <div className="site-root">
      <header className="site-header">
        <div className="flex items-center gap-4">
          <Link to="/">
            <img
              src="/assets/logo.svg"
              alt="햇살농업건설"
              className="logo-img"
            />
          </Link>
        </div>

        <nav className="main-nav">
  {/* 🔹 가운데 메뉴 */}
  <div className="nav-center">
    <Link to="/construction">하우스 시공</Link>
    <Link to="/farm">팜</Link>
    <Link to="/materials">농자재</Link>
  </div>

  {/* 🔹 오른쪽 메뉴 */}
  <div className="nav-right">
    <button
      type="button"
      className="header-btn"
      onClick={handleComingSoon}
    >
      회사소개
    </button>

    <button
      type="button"
      className="header-btn"
      onClick={handleComingSoon}
    >
      로그인/회원가입
    </button>
  </div>
</nav>

      </header>

      {/* 👇 여기서 페이지가 교체됨 */}
      <Outlet />

      <Footer />
    </div>
  )
}
