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

  return (
    <div className="mypage-page">
      <div className="mypage">
        <div className="mypage-head">
          <div>
            <h2 className="mypage-title">마이페이지</h2>
            <p className="mypage-sub">내 계정 정보를 확인할 수 있어요.</p>
          </div>

          <div className="mypage-actions">
            <button className="mypage-btn ghost" onClick={() => nav('/')}>홈</button>
            <button className="mypage-btn primary" onClick={onLogout}>로그아웃</button>
          </div>
        </div>

        <div className="mypage-grid single">
          <section className="mypage-card">
            <div className="card-inner">
              <h3 className="mypage-card-title">
                <span className="dot" />
                내 정보
              </h3>

              <div className="profile-row">
                <div className="profile-avatar">{(user?.name || 'U').slice(0, 1)}</div>
                <div className="profile-meta">
                  <p className="profile-name">{user?.name || '-'}</p>
                  <p className="profile-email">{user?.email || '-'}</p>

                  <div className="profile-badges">
                    <span className="badge green">로그인됨</span>
                    <span className="badge">일반회원</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 16 }}>
                <button className="mypage-logout" onClick={onLogout}>로그아웃</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
