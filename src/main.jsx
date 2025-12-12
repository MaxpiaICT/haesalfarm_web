import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Detail from './pages/Detail'
import './index.css'

const root = createRoot(document.getElementById('root'))

root.render(
	<BrowserRouter basename={''}>
		<Routes>
			<Route path="/" element={<App />}>
				<Route index element={<Home />} />
				<Route path="detail/:id" element={<Detail />} />
			</Route>
		</Routes>
	</BrowserRouter>
)
