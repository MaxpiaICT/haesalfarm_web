import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, logout } from '../utils/auth'
import './MyPage.css'

export default function MyPage() {
  const nav = useNavigate()
  const user = getCurrentUser()

  const onLogout = () => {
    logout()
    nav('/')
  }

  const onChangePassword = () => {
    // 라우트가 있으면 이쪽으로 연결하세요.
    // 예: nav('/change-password')
    nav('/change-password')
  }

  const userId = user?.username || user?.id || user?.userId || '-'
  const userName = user?.name || user?.username || '-'
  const userEmail = user?.email || '-'

  return (
    <div className="mypage-ui">
      <header className="mypage-topbar">
        <h1 className="mypage-topbar-title">마이페이지</h1>
      </header>

      <main className="mypage-body">
        <section className="mypage-card2">
          <h2 className="mypage-section-title">회원정보</h2>

          <div className="mypage-info">
            <div className="info-item">
              <div className="info-label">아이디</div>
              <div className="info-value">{userId}</div>
            </div>

            <div className="info-item">
              <div className="info-label">이름</div>
              <div className="info-value">{userName}</div>
            </div>

            <div className="info-item">
              <div className="info-label">비밀번호</div>
              <div className="info-value pw-line">
                <div className="pw-mock">**************</div>
                <button className="pw-change-btn" type="button" onClick={onChangePassword}>
                  변경하기
                </button>
              </div>
            </div>

            <div className="info-item">
              <div className="info-label">이메일 주소</div>
              <div className="info-value">{userEmail}</div>
            </div>
          </div>

          <div className="mypage-footer">
            <button className="logout-btn2" onClick={onLogout}>
              로그아웃
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
