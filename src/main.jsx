import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App'
import Home from './pages/Home'
import Farm from './pages/Farm'
import Materials from './pages/Materials'
import Detail from './pages/Detail'
import Construction from './components/Construction/Construction'

import './index.css'

const root = createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="construction" element={<Construction />} />
        <Route path="farm" element={<Farm />} />
        <Route path="materials" element={<Materials />} /> {/* ✅ 추가 */}
        <Route path="detail/:id" element={<Detail />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
