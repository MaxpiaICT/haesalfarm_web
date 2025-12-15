import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="site-root">
      <header className="site-header">
        <div className="flex items-center gap-4">
          {/* 로고 클릭 시 홈 */}
          <Link to="/">
            <img
              src="/assets/logo.svg"
              alt="햇살농업건설"
              className="logo-img"
            />
          </Link>
        </div>

        <nav className="main-nav">
          <Link to="/construction" className="px-3">
            하우스 시공
          </Link>
          <Link to="/farm" className="px-3">
            팜
          </Link>
          <Link to="/materials" className="px-3">
            농자재
          </Link>
          <Link to="/about" className="px-3">
            회사소개
          </Link>
          <Link to="/login" className="px-3">
            로그인/회원가입
          </Link>
        </nav>
      </header>

      {/* 여기서 페이지가 바뀜 */}
      <Outlet />

      <Footer />
    </div>
  )
}
