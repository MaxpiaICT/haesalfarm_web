import './StructureSection.css'

export default function StructureSection() {
  return (
    <section className="structure">
      <div className="structure-hero-text-container">
        <h2>농사용 하우스 구조</h2>
        <p className="structure-sub">
          기초부터 피복재까지, 재배 환경에 맞는 구조와 자재를 설계합니다.
        </p>
      </div>
      <div className="structure-hero">
        <img src="/assets/imges_1223.png" alt="농사용 하우스 구조" className="structure-hero-img" />
      </div>
    </section>
  )
}
