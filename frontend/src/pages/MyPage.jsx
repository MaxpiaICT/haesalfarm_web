import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, getCurrentUserSync, logout, isAdmin, getAllUsers, deleteUser } from '../utils/auth'
import { getUserInquiries, deleteInquiry, getAllInquiries, updateInquiryStatus, updateInquiryAnswer } from '../utils/inquiries'
import './MyPage.css'
import './Admin.css'

export default function MyPage() {
  const nav = useNavigate()
  const [user, setUser] = useState(getCurrentUserSync())
  const admin = isAdmin()
  
  // 관리자용 상태
  const [adminTab, setAdminTab] = useState('inquiries') // 'inquiries' | 'users'
  const [adminInquiries, setAdminInquiries] = useState([])
  const [adminUsers, setAdminUsers] = useState([])
  const [adminLoading, setAdminLoading] = useState(false)
  const [editingAnswer, setEditingAnswer] = useState(null) // 답변 편집 중인 문의 ID
  const [answerText, setAnswerText] = useState('') // 답변 입력 텍스트
  
  // 일반 사용자용 상태
  const [activeTab, setActiveTab] = useState('info') // 'info' | 'inquiries'
  const [inquiries, setInquiries] = useState([])

  const userId = user?.username || user?.id || user?.userId || '-'
  const userName = user?.name || user?.username || '-'
  const userEmail = user?.email || '-'

  // 사용자 정보 로드
  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    }
    loadUser()
  }, [])

  // 관리자 데이터 로드
  useEffect(() => {
    const loadAdminData = async () => {
      if (admin && adminTab === 'inquiries') {
        setAdminLoading(true)
        try {
          const data = await getAllInquiries()
          setAdminInquiries(data)
        } catch (error) {
          alert(error.message || '데이터를 불러오는데 실패했습니다.')
        } finally {
          setAdminLoading(false)
        }
      } else if (admin && adminTab === 'users') {
        setAdminLoading(true)
        try {
          const data = await getAllUsers()
          setAdminUsers(data)
        } catch (error) {
          alert(error.message || '데이터를 불러오는데 실패했습니다.')
        } finally {
          setAdminLoading(false)
        }
      }
    }
    loadAdminData()
  }, [admin, adminTab])

  // 일반 사용자 문의 목록 로드
  useEffect(() => {
    const loadUserInquiries = async () => {
      if (!admin && user && activeTab === 'inquiries') {
        try {
          const data = await getUserInquiries(user._id || user.id || user.username)
          setInquiries(data)
        } catch (error) {
          console.error('문의 목록 로드 실패:', error)
        }
      }
    }
    loadUserInquiries()
  }, [admin, user, activeTab])

  const onLogout = () => {
    logout()
    // 페이지 새로고침하여 상태 초기화
    window.location.href = '/'
  }

  const onChangePassword = () => {
    nav('/change-password')
  }

  const handleDeleteInquiry = async (inquiryId) => {
    if (!window.confirm('정말 이 문의를 삭제하시겠습니까?')) return
    
    try {
      await deleteInquiry(inquiryId, user?._id || user?.id || user?.username, false)
      setInquiries((prev) => prev.filter((inq) => (inq._id || inq.id) !== inquiryId))
      alert('문의가 삭제되었습니다.')
    } catch (error) {
      alert(error.message || '삭제에 실패했습니다.')
    }
  }

  // 관리자용 함수들
  const handleAdminStatusChange = async (inquiryId, newStatus) => {
    try {
      await updateInquiryStatus(inquiryId, newStatus)
      const data = await getAllInquiries()
      setAdminInquiries(data)
      alert('상태가 변경되었습니다.')
    } catch (error) {
      alert(error.message || '상태 변경에 실패했습니다.')
    }
  }

  const handleAdminDeleteInquiry = async (inquiryId) => {
    if (!window.confirm('정말 이 문의를 삭제하시겠습니까?')) return
    
    try {
      await deleteInquiry(inquiryId, null, true)
      const data = await getAllInquiries()
      setAdminInquiries(data)
      alert('문의가 삭제되었습니다.')
    } catch (error) {
      alert(error.message || '삭제에 실패했습니다.')
    }
  }

  const handleAdminDeleteUser = async (userId) => {
    if (!window.confirm('정말 이 사용자를 삭제하시겠습니까?')) return
    
    try {
      await deleteUser(userId)
      const data = await getAllUsers()
      setAdminUsers(data)
      alert('사용자가 삭제되었습니다.')
    } catch (error) {
      alert(error.message || '삭제에 실패했습니다.')
    }
  }

  // 답변 편집 시작
  const handleStartAnswer = (inquiry) => {
    setEditingAnswer(inquiry._id || inquiry.id)
    setAnswerText(inquiry.answer || '')
  }

  // 답변 저장
  const handleSaveAnswer = async (inquiryId) => {
    if (!answerText.trim()) {
      alert('답변 내용을 입력해주세요.')
      return
    }

    try {
      await updateInquiryAnswer(inquiryId, answerText.trim())
      const data = await getAllInquiries()
      setAdminInquiries(data)
      setEditingAnswer(null)
      setAnswerText('')
      alert('답변이 저장되었습니다.')
    } catch (error) {
      alert(error.message || '답변 저장에 실패했습니다.')
    }
  }

  // 답변 취소
  const handleCancelAnswer = () => {
    setEditingAnswer(null)
    setAnswerText('')
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
  }

  const formatDateTime = (dateString) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
  }

  // 관리자면 관리자 페이지 렌더링
  if (admin) {
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
            className={`admin-tab ${adminTab === 'inquiries' ? 'active' : ''}`}
            onClick={() => setAdminTab('inquiries')}
            type="button"
          >
            문의 관리
          </button>
          <button
            className={`admin-tab ${adminTab === 'users' ? 'active' : ''}`}
            onClick={() => setAdminTab('users')}
            type="button"
          >
            회원 관리
          </button>
        </div>

        <main className="admin-body">
          {adminLoading ? (
            <div className="admin-loading">로딩 중...</div>
          ) : (
            <>
              {adminTab === 'inquiries' && (
                <div className="admin-section">
                  <h2 className="admin-section-title">문의 접수 관리</h2>
                  {adminInquiries.length === 0 ? (
                    <div className="admin-empty">등록된 문의가 없습니다.</div>
                  ) : (
                    <div className="admin-inquiry-list">
                      {adminInquiries.map((inquiry) => {
                        const inquiryId = inquiry._id || inquiry.id
                        return (
                        <div key={inquiryId} className="admin-inquiry-item">
                          <div className="admin-inquiry-header">
                            <div className="admin-inquiry-meta">
                              <span className="admin-inquiry-date">{formatDateTime(inquiry.createdAt)}</span>
                              <select
                                className={`admin-status-select status-${inquiry.status}`}
                                value={inquiry.status}
                                onChange={(e) => handleAdminStatusChange(inquiryId, e.target.value)}
                              >
                                <option value="대기중">대기중</option>
                                <option value="처리중">처리중</option>
                                <option value="완료">완료</option>
                              </select>
                            </div>
                            <button
                              className="admin-delete-btn"
                              onClick={() => handleAdminDeleteInquiry(inquiryId)}
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
                                <span className="admin-inquiry-value">
                                  {typeof inquiry.userId === 'object' 
                                    ? (inquiry.userId.username || inquiry.userId._id || inquiry.userId.id || '-')
                                    : inquiry.userId}
                                </span>
                              </div>
                            )}
                            <div className="admin-inquiry-field full">
                              <span className="admin-inquiry-label">문의 사항:</span>
                              <div className="admin-inquiry-text">{inquiry.content}</div>
                            </div>
                            
                            {/* 답변 섹션 */}
                            <div className="admin-inquiry-answer-section">
                              <div className="admin-inquiry-field full">
                                <span className="admin-inquiry-label">답변:</span>
                                {editingAnswer === inquiryId ? (
                                  <div className="admin-answer-edit">
                                    <textarea
                                      className="admin-answer-textarea"
                                      value={answerText}
                                      onChange={(e) => setAnswerText(e.target.value)}
                                      placeholder="답변을 입력하세요..."
                                      rows={4}
                                    />
                                    <div className="admin-answer-actions">
                                      <button
                                        className="admin-answer-save-btn"
                                        onClick={() => handleSaveAnswer(inquiryId)}
                                        type="button"
                                      >
                                        저장
                                      </button>
                                      <button
                                        className="admin-answer-cancel-btn"
                                        onClick={handleCancelAnswer}
                                        type="button"
                                      >
                                        취소
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="admin-answer-display">
                                    {inquiry.answer ? (
                                      <>
                                        <div className="admin-answer-text">{inquiry.answer}</div>
                                        {inquiry.answeredAt && (
                                          <div className="admin-answer-meta">
                                            답변일: {formatDateTime(inquiry.answeredAt)}
                                            {inquiry.answeredBy && typeof inquiry.answeredBy === 'object' && (
                                              <span> | 답변자: {inquiry.answeredBy.name || inquiry.answeredBy.username}</span>
                                            )}
                                          </div>
                                        )}
                                        <button
                                          className="admin-answer-edit-btn"
                                          onClick={() => handleStartAnswer(inquiry)}
                                          type="button"
                                        >
                                          수정
                                        </button>
                                      </>
                                    ) : (
                                      <button
                                        className="admin-answer-add-btn"
                                        onClick={() => handleStartAnswer(inquiry)}
                                        type="button"
                                      >
                                        답변 작성
                                      </button>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}

              {adminTab === 'users' && (
                <div className="admin-section">
                  <h2 className="admin-section-title">회원 관리</h2>
                  {adminUsers.length === 0 ? (
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
                          {adminUsers.map((u) => (
                            <tr key={u._id || u.id}>
                              <td>{u.username}</td>
                              <td>{u.name}</td>
                              <td>{u.email || '-'}</td>
                              <td>
                                <span className={`admin-role-badge ${u.role === 'admin' ? 'admin' : 'user'}`}>
                                  {u.role === 'admin' ? '관리자' : '일반'}
                                </span>
                              </td>
                              <td>{formatDateTime(u.createdAt)}</td>
                              <td>
                                {u.role !== 'admin' && u.username !== 'haesalfarm' && u.username !== 'admin' && (
                                  <button
                                    className="admin-user-delete-btn"
                                    onClick={() => handleAdminDeleteUser(u._id || u.id)}
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

  // 일반 사용자면 기존 마이페이지 렌더링
  return (
    <div className="mypage-ui">
      <header className="mypage-topbar">
        <h1 className="mypage-topbar-title">마이페이지</h1>
      </header>

      <main className="mypage-body">
        {/* 탭 */}
        <div className="mypage-tabs">
          <button
            className={`mypage-tab ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => setActiveTab('info')}
            type="button"
          >
            회원정보
          </button>
          <button
            className={`mypage-tab ${activeTab === 'inquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('inquiries')}
            type="button"
          >
            내 문의
          </button>
        </div>

        <section className="mypage-card2">
          {activeTab === 'info' && (
            <>
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
            </>
          )}

          {activeTab === 'inquiries' && (
            <>
              <h2 className="mypage-section-title">내 문의</h2>
              
              {inquiries.length === 0 ? (
                <div className="inquiry-empty">
                  <p>등록된 문의가 없습니다.</p>
                  <button
                    className="inquiry-new-btn"
                    onClick={() => nav('/support')}
                    type="button"
                  >
                    문의하기
                  </button>
                </div>
              ) : (
                <div className="inquiry-list">
                  {inquiries.map((inquiry) => {
                    const inquiryId = inquiry._id || inquiry.id
                    return (
                    <div key={inquiryId} className="inquiry-item">
                      <div className="inquiry-header">
                        <div className="inquiry-meta">
                          <span className="inquiry-date">{formatDate(inquiry.createdAt)}</span>
                          <span className={`inquiry-status status-${inquiry.status}`}>
                            {inquiry.status}
                          </span>
                        </div>
                        <button
                          className="inquiry-delete-btn"
                          onClick={() => handleDeleteInquiry(inquiryId)}
                          type="button"
                          aria-label="삭제"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="inquiry-content">
                        <div className="inquiry-field">
                          <span className="inquiry-label">이름/상호명:</span>
                          <span className="inquiry-value">{inquiry.name}</span>
                        </div>
                        <div className="inquiry-field">
                          <span className="inquiry-label">연락처:</span>
                          <span className="inquiry-value">{inquiry.phone}</span>
                        </div>
                        {inquiry.email && (
                          <div className="inquiry-field">
                            <span className="inquiry-label">이메일:</span>
                            <span className="inquiry-value">{inquiry.email}</span>
                          </div>
                        )}
                        {inquiry.affiliation && (
                          <div className="inquiry-field">
                            <span className="inquiry-label">소속:</span>
                            <span className="inquiry-value">{inquiry.affiliation}</span>
                          </div>
                        )}
                        <div className="inquiry-field full">
                          <span className="inquiry-label">문의 사항:</span>
                          <div className="inquiry-text">{inquiry.content}</div>
                        </div>
                      </div>
                    </div>
                    )
                  })}
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  )
}
