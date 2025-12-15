import './HeroSection.css'

export default function HeroSection() {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero2">
      <div className="hero2-overlay" />
      <div className="hero2-content">
        <h1>농사용 하우스 시공</h1>
        <p>당신의 농장, 저희가 설계합니다.</p>

        <div className="hero-buttons">
          <button
            className="primary"
            onClick={() => scrollTo('contact')}
          >
            📞 상담 / 견적 요청
          </button>

          <button
            className="secondary"
            onClick={() => scrollTo('process')}
          >
            시공 사례 보기
          </button>
        </div>
      </div>
    </section>
  )
}
