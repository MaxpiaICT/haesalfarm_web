import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App'
import Home from './pages/Home'
import Farm from './pages/Farm'
import Materials from './pages/Materials'
import Detail from './pages/Detail'
import Construction from './components/Construction/Construction'

import Support from './pages/Support'
import Login from './pages/Login'
import Signup from './pages/Signup'
import MyPage from './pages/MyPage'
import Company from './pages/Company' // ✅ 회사소개 추가

import ProtectedRoute from './components/ProtectedRoute'

import './index.css'

const root = createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="construction" element={<Construction />} />
        <Route path="farm" element={<Farm />} />
        <Route path="materials" element={<Materials />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path="support" element={<Support />} />

        {/* ✅ 회사소개 */}
        <Route path="company" element={<Company />} />

        {/* ✅ 로그인/회원가입 (경로 소문자 권장) */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        {/* ✅ 마이페이지(보호 라우트) - 중복 제거 */}
        <Route
          path="mypage"
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
)
