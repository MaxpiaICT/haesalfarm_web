import React from 'react'
import Hero from '../components/Hero'
import Card from '../components/Card'

export default function Home(){
  const cards = [
    {title: '농사용\n하우스 시공', cta: '자세히 보기'},
    {title: '팜\n수경재배키트', cta: '자세히 보기'},
    {title: '농자재', cta: '자세히 보기'}
  ]

  return (
    <>
      <Hero />
      <main className="cards-wrap">
        {cards.map((c, i)=> (
          <Card key={i} title={c.title} cta={c.cta} className={`card-${i+1}`} />
        ))}
      </main>
    </>
  )
}
