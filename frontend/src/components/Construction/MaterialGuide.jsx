import { useState } from 'react'
import './MaterialGuide.css'
import DesignConsiderations from './DesignConsiderations'

// 부자재 항목 데이터
const auxiliaryMaterials = [
  {
    id: 1,
    title: '결속부품(클램프/볼트/브라켓)',
    image: '/assets/f_1.jpg',
    role: '프레임 접합부 고정(흔들림·이탈 방지)',
    goodSpec: [
      '내식성 재질(아연도금/스테인리스)',
      '+ 풀림방지 + 밀착도 높은 클램프',
    ],
    problems: [
      '볼트 풀림/녹→ 흔들림 증가',
      '→ 비닐 찢김·국부 파손',
    ],
  },
  {
    id: 2,
    title: '레일(필름 고정 채널/필름락)',
    image: '/assets/p_6.jpg',
    role: '필름을 균일 고정(들뜸 방지) → 비닐 수명 좌우',
    goodSpec: [
      '두께·강성 충분 + 와이어/스프링 탄성 유지',
      '+ 모서리 마감 양호',
    ],
    problems: [
      '레일 휨/날카로움/늘어짐',
      '→ 필름 빠짐·찢김·소음',
    ],
  },
  {
    id: 3,
    title: '방풍끈/밴드/보강 로프',
    image: '/assets/p_5.jpg',
    role: '펄럭임·진동 감소 → 찢김/이탈 예방',
    goodSpec: [
      'UV/내후성 + 고정 튼튼 ',
      '+ 마찰부 보호 + 배치 적절',
    ],
    problems: [
      '늘어짐/끊김 → 필름 손상 가속',
    
    ],
  },
  {
    id: 4,
    title: '도어/환기창 자재(개폐부)',
    image: '/assets/p_7.jpg',
    role: '업성 + 환기/온습도 관리 핵심(고장 잦은 구간) ',
    goodSpec: [
      '뒤틀림 적은 프레임 +',
      '레일/힌지 내구성 + 실링(틈막이) 우수',
    ],
    problems: [
      '문 처짐/개폐 불량 →',
      '바람 유입·열손실·병해 위험',
    ],
  },
  {
    id: 5,
    title: '배수 자재(홈통/배수로/경사)',
    image: '/assets/p_8.jpg',
    role: '물고임 방지 → 침하·부식 예방(폭우지역 필수)',
    goodSpec: [
      '집수→배출→',
      '유도 흐름 확보 + 막힘 방지 + 청소 용이',
    ],
    problems: [
      '물고임/습기 상시 →',
      '기초 침하·프레임 변형·부식',
    ],
  },
]

export default function MaterialGuide() {
  const [currentAuxIndex, setCurrentAuxIndex] = useState(0)

  const nextAux = () => {
    setCurrentAuxIndex((prev) => (prev + 1) % auxiliaryMaterials.length)
  }

  const prevAux = () => {
    setCurrentAuxIndex((prev) => (prev - 1 + auxiliaryMaterials.length) % auxiliaryMaterials.length)
  }

  const goToAux = (index) => {
    setCurrentAuxIndex(index)
  }

  return (
    <div className="material-guide">
      <h3 className="material-guide-title">하우스 자재 선택 가이드</h3>
      
      <div className="material-guide-grid">
        {/* 프레임(골조) */}
        <div className="material-column">
          <div className="material-header">프레임(골조)</div>
          
          <div className="material-item">
            <div className="material-item-image">
              <div className="material-item-header">아연강관(용융아연도금)</div>
              <img src="/assets/p_1.jpg" alt="아연강관" />
            </div>
            <ul className="material-features">
              <li>
                <img src="/assets/check_icon.svg" alt="check" className="check-icon" />
                <span>가장 보편적</span>
              </li>
              <li>
                <img src="/assets/check_icon.svg" alt="check" className="check-icon" />
                <span>내식성·가성비 우수</span>
              </li>
              <li>
                <img src="/assets/check_icon.svg" alt="check" className="check-icon" />
                <span>유지관리 쉬움</span>
              </li>
            </ul>
          </div>

          <div className="material-item">
            <div className="material-item-image">
              <div className="material-item-header">알루미늄</div>
              <img src="/assets/p_2.jpg" alt="알루미늄" />
            </div>
            <ul className="material-features">
              <li>
                <img src="/assets/check_icon.svg" alt="check" className="check-icon" />
                <span>가볍고 녹 거의 없음</span>
              </li>
              <li>
                <img src="/assets/check_icon.svg" alt="check" className="check-icon" />
                <span>외관 깔끔 / 비용 증가</span>
              </li>
            </ul>
            <p className="material-recommendation">
              예산·유지관리 기준이면 아연강관, 외관·경량이면 알루미늄
            </p>
          </div>
        </div>

        {/* 피복재(외피) */}
        <div className="material-column">
          <div className="material-header">피복재(외피)</div>
          
          <div className="material-item">
            <div className="material-item-image">
              <div className="material-item-header">PE 필름(농업용 필름)</div>
              <img src="/assets/p_3.jpg" alt="PE 필름" />
            </div>
            <ul className="material-features">
              <li>
                <img src="/assets/check_icon.svg" alt="check" className="check-icon" />
                <span>초기비용↓/교체 쉬움</span>
              </li>
            </ul>
            <div className="material-options">
              <strong>옵션:</strong> 보온·차광·산광(빛 확산)·방적(물방울)
            </div>
          </div>

          <div className="material-item">
            <div className="material-item-image">
              <div className="material-item-header">폴리카보네이트(PC 판넬)</div>
              <img src="/assets/p_4.jpg" alt="폴리카보네이트" />
            </div>
            <ul className="material-features">
              <li>
                <img src="/assets/check_icon.svg" alt="check" className="check-icon" />
                <span>강도↑/반영구적</span>
              </li>
              <li>
                <img src="/assets/check_icon.svg" alt="check" className="check-icon" />
                <span>외관·단열 안정적</span>
              </li>
            </ul>
            <p className="material-note">
              정밀 시공 + 열팽창 고려 필수
            </p>
          </div>
        </div>

        {/* 부자재(품질 차이 포인트) */}
        <div className="material-column">
          <div className="material-header">부자재(품질 차이 포인트)</div>
          
          <p className="material-intro">
            하우스 내구성은 골조보다<br />
            부자재 디테일에서 크게 갈립니다.
          </p>

          {/* 슬라이더 컨테이너 */}
          <div className="auxiliary-slider">
            <button className="slider-btn slider-btn-prev" onClick={prevAux} aria-label="이전">
              ‹
            </button>
            
            <div className="slider-content">
              <div 
                className="slider-track" 
                style={{ transform: `translateX(-${currentAuxIndex * 100}%)` }}
              >
                {auxiliaryMaterials.map((material) => (
                  <div key={material.id} className="slider-slide">
                    <div className="material-item">
                      <div className="material-item-image">
                        <div className="material-item-header">{material.title}</div>
                        <img src={material.image} alt={material.title} />
                      </div>
                      
                      <div className="material-detail">
                        <strong>역할:</strong> {material.role}
                      </div>
                      
                      <div className="material-spec">
                        <strong>좋은 사양:</strong>
                        <ul>
                          {material.goodSpec.map((spec, idx) => (
                            <li key={idx}>{spec}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="material-problem">
                        <strong>저가 문제:</strong>
                        <ul>
                          {material.problems.map((problem, idx) => (
                            <li key={idx}>{problem}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button className="slider-btn slider-btn-next" onClick={nextAux} aria-label="다음">
              ›
            </button>
          </div>

          {/* 페이지네이션 인디케이터 */}
          <div className="slider-indicators">
            {auxiliaryMaterials.map((_, index) => (
              <button
                key={index}
                className={`indicator-dot ${index === currentAuxIndex ? 'active' : ''}`}
                onClick={() => goToAux(index)}
                aria-label={`${index + 1}번 항목으로 이동`}
              />
            ))}
          </div>

          <p className="slider-hint">
            버튼 누르면 다음 자재를 볼 수 있어요 →
          </p>
        </div>
      </div>

      <DesignConsiderations />
    </div>
  )
}
