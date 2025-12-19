import './StructureSection.css'

const items = [
  {
    title: '하우스 구조 개요',
    desc:
      '기초, 기둥, 아치, 보 구조 설명\n' +
      '기초 / pillars / trusses / purlins / glazing',
  },
  {
    title: '자재 설명 & 선택지',
    desc:
      '프레임: 아연강관, 알루미늄\n' +
      '피복재: PE 필름, 폴리카보네이트',
  },
  {
    title: '설계 시 고려 요소',
    desc:
      '토양·지반 안정성\n' +
      '기후·풍속·적설\n' +
      '재배 방식',
  },
  {
    title: '장점',
    desc:
      '내구성\n' +
      '유지보수 편의\n' +
      '확장성\n' +
      '차광/보온/통풍 성능',
  },
]

export default function StructureSection() {
  return (
    <section className="structure">
      <h2>농사용 하우스 구조 & 자재 설명</h2>
      <p className="structure-sub">
        기초부터 피복재까지, 재배 환경에 맞는 구조와 자재를 설계합니다.
      </p>

      <div className="structure-grid">
        {items.map((item, i) => (
          <div key={i} className="structure-card">
            <h3>{item.title}</h3>
            <p>
              {item.desc.split('\n').map((line, idx) => (
                <span key={idx}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
