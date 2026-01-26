import React, { useState } from 'react'
import PolicyModal from './PolicyModal' // 경로는 Footer.jsx 위치에 맞게 조정하세요 (예: ../PolicyModal)

export default function Footer() {
  const [policyOpen, setPolicyOpen] = useState(false)
  const [initialTab, setInitialTab] = useState('privacy') // 'privacy' | 'terms'

  const openPrivacy = (e) => {
    e.preventDefault()
    setInitialTab('privacy')
    setPolicyOpen(true)
  }

  const openTerms = (e) => {
    e.preventDefault()
    setInitialTab('terms')
    setPolicyOpen(true)
  }

  return (
    <footer className="site-footer-custom">
      <div className="footer-inner">
        {/* 1. 로고 */}
        <div className="footer-col footer-logo-col">
          <img src="/assets/logo.svg" alt="햇살농업건설" className="footer-logo" />
        </div>

        {/* 2. 위치 및 연락처 */}
        <div className="footer-col">
          <div className="footer-title">위치 및 연락처</div>
          <div className="footer-item">경기도 광주시 퇴촌면 광동로 21, 4층</div>
          <div className="footer-item">✉ haesalfarm@naver.com</div>
          <div className="footer-item">전화번호:031-767-7677</div>
          <div className="footer-item">팩스:031-761-7677</div>
        </div>

        {/* 3. 서비스 */}
        <div className="footer-col">
          <div className="footer-title">서비스</div>
          <div className="footer-item">비닐하우스</div>
          <div className="footer-item">팜</div>
          <div className="footer-item">농자재</div>
        </div>

        {/* 4. 회사 */}
        <div className="footer-col">
          <div className="footer-title">회사</div>
          <div className="footer-item">회사 소개</div>
          <div className="footer-item"></div>
        </div>

        {/* 5. 정책 및 사업자 정보 */}
        <div className="footer-col footer-policy-col">
          <div className="footer-item">
            <a className="footer-link" href="/privacy" onClick={openPrivacy}>
              [개인정보처리방침]
            </a>{' '}
            |{' '}
            <a className="footer-link" href="/terms" onClick={openTerms}>
              [이용약관]
            </a>
          </div>
          <div className="footer-item">(주)햇살농업건설 | 대표이사 샹탄소수미따</div>
          <div className="footer-item">사업자번호: 885-86-01928</div>
        </div>
      </div>

      <div className="footer-bottom">© 2025 (주)햇살농업건설. All rights reserved.</div>

      {/* 정책 모달 */}
      <PolicyModal
        open={policyOpen}
        initialTab={initialTab}
        onClose={() => setPolicyOpen(false)}
      />
    </footer>
  )
}
