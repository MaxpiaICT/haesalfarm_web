import './ProcessSection.css'

const steps = [
  '상담 및 현장 조사',
  '설계 및 설계안 제시',
  '자재 선정 / 구매',
  '기초 공사 및 구조물 시공',
  '피복 / 덮개 설치',
  '내부 설비 (환기·난방·관수)',
  '최종 점검 & 납품',
  '사후관리 & A/S',
]

export default function ProcessSection() {
  return (
    <section className="process" id="process">
      <h2>시공 프로세스 / 단계 설명</h2>

      <div className="process-grid">
        {steps.map((step, i) => (
          <div key={i} className="process-box">
            {step}
          </div>
        ))}
      </div>
    </section>
  )
}
