import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { getCurrentUser, getCurrentUserSync, isAdmin } from '../utils/auth'

export default function AdminRoute({ children }) {
  const [user, setUser] = useState(getCurrentUserSync())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
      setLoading(false)
    }
    checkAuth()
  }, [])

  if (loading) {
    return <div>로딩 중...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!isAdmin()) {
    return <Navigate to="/" replace />
  }

  return children
}

