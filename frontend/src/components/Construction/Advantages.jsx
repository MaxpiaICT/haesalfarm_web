import './Advantages.css'

const advantages = [
  {
    id: 1,
    title: '내구성',
    subtitle: '부식에 강한 자재 + 구조 보강 설계',
    description: '습기·비·농약 환경에서도 변형/녹을 최소화해 오래 안정적으로 사용합니다.',
    color: 'light-green',
  },
  {
    id: 2,
    title: '유지보수 편의',
    subtitle: '교체가 쉬운 구조 설계',
    description: '필름·부자재를 빠르게 교환할 수 있어 관리 시간과 유지비를 줄입니다.',
    color: 'light-blue',
  },
  {
    id: 3,
    title: '확장성',
    subtitle: '단동 → 연동 확장 가능',
    description: '운영 규모에 맞춰 동(하우스) 연결, 출입구·환기창 추가 등 유연하게 대응합니다',
    color: 'light-pink',
  },
  {
    id: 4,
    title: '재배 효율',
    subtitle: '차광·산광·보온 옵션으로 환경 최적화',
    description: '계절/작물에 맞춘 조건으로 생육 편차를 줄이고 수확 안정성과 품질을 높입니다.',
    color: 'light-purple',
  },
  {
    id: 5,
    title: '비용 최적화',
    subtitle: "목적/예산에 맞춰 '필수만' 구성",
    description: '우선순위를 정해 단계적으로 추가할 수 있어 과투자 없이 효율적으로 구축합니다.',
    color: 'light-yellow',
  },
]

export default function Advantages() {
  return (
    <div className="advantages">
      <h3 className="advantages-title">하우스 설계·자재 선택의 장점</h3>
      
      <div className="advantages-grid">
        {advantages.map((advantage) => (
          <div key={advantage.id} className={`advantage-box advantage-${advantage.color}`}>
            <h4 className="advantage-heading">{advantage.id}. {advantage.title}</h4>
            <p className="advantage-subtitle">{advantage.subtitle}</p>
            <p className="advantage-description">{advantage.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}



