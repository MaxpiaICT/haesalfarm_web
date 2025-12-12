import React from 'react'
import { Outlet } from 'react-router-dom'

import Footer from './components/Footer'

export default function App(){
  const cards = [
    {title: '농사용\n하우스 시공', cta: '자세히 보기'},
    {title: '팜\n수경재배키트', cta: '자세히 보기'},
    {title: '농자재', cta: '자세히 보기'}
  ]

  return (
    <div className="site-root">
      <header className="site-header">
        <div className="flex items-center gap-4">
          <img src="/assets/logo.svg" alt="햇살농업건설" className="logo-img" />
        </div>
        <nav className="main-nav">
          <a className="px-3">하우스 시공</a>
          <a className="px-3">팜</a>
          <a className="px-3">농자재</a>
          <a className="px-3">회사소개</a>
          <a className="px-3">로그인/회원가입</a>
        </nav>
      </header>

      <Outlet />

      <Footer />
    </div>
  )
}
