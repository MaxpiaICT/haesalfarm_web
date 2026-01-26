import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, logout, getAllUsers, deleteUser, isAdmin } from '../utils/auth'
import { getAllInquiries, deleteInquiry, updateInquiryStatus } from '../utils/inquiries'
import './Admin.css'

export default function Admin() {
  const nav = useNavigate()
  const [activeTab, setActiveTab] = useState('inquiries') // 'inquiries' | 'users'
  const [inquiries, setInquiries] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isAdmin()) {
      nav('/')
      return
    }
    loadData()
  }, [activeTab, nav])

  const loadData = async () => {
    setLoading(true)
    try {
      if (activeTab === 'inquiries') {
        const data = await getAllInquiries()
        setInquiries(data)
      } else {
        const data = await getAllUsers()
        setUsers(data)
      }
    } catch (error) {
      alert(error.message || '데이터를 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (inquiryId, newStatus) => {
    try {
      await updateInquiryStatus(inquiryId, newStatus)
      const data = await getAllInquiries()
      setInquiries(data)
      alert('상태가 변경되었습니다.')
    } catch (error) {
      alert(error.message || '상태 변경에 실패했습니다.')
    }
  }

  const handleDeleteInquiry = async (inquiryId) => {
    if (!window.confirm('정말 이 문의를 삭제하시겠습니까?')) return
    
    try {
      await deleteInquiry(inquiryId, null, true)
      const data = await getAllInquiries()
      setInquiries(data)
      alert('문의가 삭제되었습니다.')
    } catch (error) {
      alert(error.message || '삭제에 실패했습니다.')
    }
  }

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('정말 이 사용자를 삭제하시겠습니까?')) return
    
    try {
      await deleteUser(userId)
      const data = await getAllUsers()
      setUsers(data)
      alert('사용자가 삭제되었습니다.')
    } catch (error) {
      alert(error.message || '삭제에 실패했습니다.')
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
  }

  const onLogout = () => {
    logout()
    nav('/')
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1 className="admin-title">관리자 페이지</h1>
        <button className="admin-logout-btn" onClick={onLogout}>
          로그아웃
        </button>
      </header>

      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === 'inquiries' ? 'active' : ''}`}
          onClick={() => setActiveTab('inquiries')}
          type="button"
        >
          문의 관리
        </button>
        <button
          className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
          type="button"
        >
          회원 관리
        </button>
      </div>

      <main className="admin-body">
        {loading ? (
          <div className="admin-loading">로딩 중...</div>
        ) : (
          <>
            {activeTab === 'inquiries' && (
              <div className="admin-section">
                <h2 className="admin-section-title">문의 접수 관리</h2>
                {inquiries.length === 0 ? (
                  <div className="admin-empty">등록된 문의가 없습니다.</div>
                ) : (
                  <div className="admin-inquiry-list">
                    {inquiries.map((inquiry) => (
                      <div key={inquiry.id} className="admin-inquiry-item">
                        <div className="admin-inquiry-header">
                          <div className="admin-inquiry-meta">
                            <span className="admin-inquiry-date">{formatDate(inquiry.createdAt)}</span>
                            <select
                              className={`admin-status-select status-${inquiry.status}`}
                              value={inquiry.status}
                              onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                            >
                              <option value="대기중">대기중</option>
                              <option value="처리중">처리중</option>
                              <option value="완료">완료</option>
                            </select>
                          </div>
                          <button
                            className="admin-delete-btn"
                            onClick={() => handleDeleteInquiry(inquiry.id)}
                            type="button"
                            aria-label="삭제"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="admin-inquiry-content">
                          <div className="admin-inquiry-field">
                            <span className="admin-inquiry-label">이름/상호명:</span>
                            <span className="admin-inquiry-value">{inquiry.name}</span>
                          </div>
                          <div className="admin-inquiry-field">
                            <span className="admin-inquiry-label">연락처:</span>
                            <span className="admin-inquiry-value">{inquiry.phone}</span>
                          </div>
                          {inquiry.email && (
                            <div className="admin-inquiry-field">
                              <span className="admin-inquiry-label">이메일:</span>
                              <span className="admin-inquiry-value">{inquiry.email}</span>
                            </div>
                          )}
                          {inquiry.affiliation && (
                            <div className="admin-inquiry-field">
                              <span className="admin-inquiry-label">소속:</span>
                              <span className="admin-inquiry-value">{inquiry.affiliation}</span>
                            </div>
                          )}
                          {inquiry.userId && (
                            <div className="admin-inquiry-field">
                              <span className="admin-inquiry-label">회원 ID:</span>
                              <span className="admin-inquiry-value">{inquiry.userId}</span>
                            </div>
                          )}
                          <div className="admin-inquiry-field full">
                            <span className="admin-inquiry-label">문의 사항:</span>
                            <div className="admin-inquiry-text">{inquiry.content}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'users' && (
              <div className="admin-section">
                <h2 className="admin-section-title">회원 관리</h2>
                {users.length === 0 ? (
                  <div className="admin-empty">등록된 회원이 없습니다.</div>
                ) : (
                  <div className="admin-user-list">
                    <table className="admin-user-table">
                      <thead>
                        <tr>
                          <th>아이디</th>
                          <th>이름</th>
                          <th>이메일</th>
                          <th>권한</th>
                          <th>가입일</th>
                          <th>작업</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.name}</td>
                            <td>{user.email || '-'}</td>
                            <td>
                              <span className={`admin-role-badge ${user.role === 'admin' ? 'admin' : 'user'}`}>
                                {user.role === 'admin' ? '관리자' : '일반'}
                              </span>
                            </td>
                            <td>{formatDate(user.createdAt)}</td>
                            <td>
                              {user.role !== 'admin' && user.username !== 'admin' && (
                                <button
                                  className="admin-user-delete-btn"
                                  onClick={() => handleDeleteUser(user.id)}
                                  type="button"
                                >
                                  삭제
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}

