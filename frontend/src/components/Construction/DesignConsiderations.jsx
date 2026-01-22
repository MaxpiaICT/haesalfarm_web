import './DesignConsiderations.css'
import Advantages from './Advantages'

const considerations = [
  {
    id: 1,
    title: '토양·지반 안정성',
    description: [
      '점토/모래/성토 여부에 따라 기초 방식이 달라집니다.',
      '침하·배수 불량 시 문틀 틀어짐 / 필름 파손이 자주 발생합니다.',
    ],
    image: '/assets/w_1.jpg',
  },
  {
    id: 2,
    title: '기후 조건(바람·눈·태풍)',
    description: [
      '지역별 풍속·적설을 기준으로 프레임 간격 / 보강재/브레이싱(대각 보강)을 설계합니다.',
    ],
    image: '/assets/w_2.jpg',
  },
  {
    id: 3,
    title: '재배 방식(작물/운영)',
    description: [
      '토경·수경·육묘·엽채·과채에 따라 높이/환기/차광/보온/작업 동선이 완전히 달라집니다.',
    ],
    image: '/assets/w_3.jpg',
  },
  {
    id: 4,
    title: '환기·온도·습도 관리',
    description: [
      '측창·천창·도어 위치를 먼저 설계하고, 필요 시 환풍기·순환팬 옵션을 추가합니다.',
      '곰팡이/병해 예방은 결국 환기 설계가 핵심입니다.',
    ],
    image: '/assets/w_4.jpg',
  },
  {
    id: 5,
    title: '확장·유지보수',
    description: [
      '추후 연동 확장 가능 여부(모듈 연결) 확인',
      '필름 교체/부품 교환이 쉬운 구조인지 고려합니다.',
    ],
    image: '/assets/w_5.jpg',
  },
]

export default function DesignConsiderations() {
  return (
    <div className="design-considerations">
      <h3 className="design-considerations-title">설계시 고려 요소</h3>
      
      <p className="design-considerations-intro">
        하우스 설계 체크포인트<br />
        "현장 조건 → 구조 설계 → 환기/운영 → 유지보수" 순서로 잡으면 하자와 유지비가 크게 줄어듭니다.
      </p>

      <div className="considerations-list">
        {considerations.map((item) => (
          <div key={item.id} className="consideration-item">
            <div className="consideration-image-wrapper">
              <div className="consideration-number">{item.id}</div>
              <div className="consideration-image">
                <img src={item.image} alt={item.title} />
              </div>
            </div>
            <div className="consideration-content">
              <div className="consideration-divider"></div>
              <h4 className="consideration-title">{item.title}</h4>
              <div className="consideration-description">
                {item.description.map((line, index) => (
                  <p key={index} className="consideration-description-line">
                    {line}
                  </p>
                ))}
              </div>
              <div className="consideration-divider"></div>
            </div>
          </div>
        ))}
      </div>

      <Advantages />
    </div>
  )
}
