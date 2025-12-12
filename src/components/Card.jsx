import React from 'react'

export default function Card({title, cta, className=''}){
  return (
    <article className={`card ${className}`}> 
      <div className="card-bg" />
      <div className="card-body">
        <h3>{title.split('\n').map((line,i)=>(<span key={i}>{line}<br/></span>))}</h3>
        <button className="card-btn">{cta} →</button>
      </div>
    </article>
  )
}
