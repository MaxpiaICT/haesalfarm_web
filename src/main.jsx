import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App'
import Home from './pages/Home'
import Farm from './pages/Farm'
import Materials from './pages/Materials'
import Detail from './pages/Detail'
import Construction from './components/Construction/Construction'

// ✅ 추가
import Support from './pages/Support' // ✅ 추가
import Login from './pages/Login'
import Signup from './pages/Signup'
import MyPage from './pages/MyPage'

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

        {/* ✅ 로그인/회원가입 */}
       <Route path="Login" element={<Login />} />
  <Route path="Signup" element={<Signup />} />
  <Route path="mypage" element={<MyPage />} />

        {/* ✅ 마이페이지(보호 라우트) */}
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
