import React from 'react'
import { useParams, Link } from 'react-router-dom'

export default function Detail(){
  const { id } = useParams()
  return (
    <div style={{padding:40}}>
      <h2>상세 페이지: {id}</h2>
      <p>여기에 제품/서비스 상세 내용을 넣어주세요.</p>
      <p><Link to="/">홈으로 돌아가기</Link></p>
    </div>
  )
}
