import React, { useEffect, useMemo, useState } from 'react'
import './PolicyModal.css'

export default function PolicyModal({ open, initialTab = 'privacy', onClose }) {
  const [tab, setTab] = useState(initialTab)

  useEffect(() => {
    if (open) setTab(initialTab)
  }, [open, initialTab])

  // ESC 닫기 + 스크롤 잠금
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  const company = useMemo(
    () => ({
      name: '(주)햇살농업 건설',
      ceo: '샹탄소수미따',
      bizNo: '885-86-01928',
      onlineSalesNo: '추후 도입 시 본 방침/사이트를 통해 고지',
      phone: '010-6471-9948',
      email: '추후 도입 시 본 방침을 통해 고지',
      address: '경기도 광주시 퇴촌면 광동로 21, 4층',
      effectiveDate: '2025.12.19',
    }),
    []
  )

  if (!open) return null

  const stop = (e) => e.stopPropagation()

  return (
    <div className="policy-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="policy-modal" onClick={stop}>
        <div className="policy-topbar">
          <div className="policy-tabs" role="tablist" aria-label="정책 탭">
            <button
              type="button"
              className={`policy-tab ${tab === 'privacy' ? 'is-active' : ''}`}
              onClick={() => setTab('privacy')}
              role="tab"
              aria-selected={tab === 'privacy'}
            >
              개인정보처리방침
            </button>
            <button
              type="button"
              className={`policy-tab ${tab === 'terms' ? 'is-active' : ''}`}
              onClick={() => setTab('terms')}
              role="tab"
              aria-selected={tab === 'terms'}
            >
              이용약관
            </button>
          </div>

          <button type="button" className="policy-close" onClick={onClose} aria-label="닫기">
            ✕
          </button>
        </div>

        <div className="policy-body">
          {tab === 'privacy' ? (
            <article className="policy-article">
              <h2 className="policy-title">개인정보처리방침</h2>
              <p className="policy-lead">
                {company.name}(이하 “회사”)는 「개인정보 보호법」 등 관련 법령을 준수하며, 이용자의
                개인정보를 보호하고 권익을 보호하기 위해 다음과 같이 개인정보처리방침을 수립·공개합니다.
              </p>

              <h3>1. 개인정보의 처리 목적</h3>
              <ul>
                <li>회원 가입 및 관리(본인 식별, 회원제 서비스 제공, 부정 이용 방지, 공지 전달)</li>
                <li>재화/서비스 제공(자재 판매, 시공 상담·견적, 계약 진행, 고객 문의 응대, A/S 처리)</li>
                <li>분쟁 대응 및 민원 처리</li>
              </ul>

              <h3>2. 처리하는 개인정보 항목</h3>
              <h4>(1) 회원가입/관리</h4>
              <ul>
                <li>
                  <b>필수</b>: 아이디(이메일 또는 휴대폰번호 중 택1), 비밀번호, 이름(또는 닉네임),
                  휴대폰번호
                </li>
                <li>
                  <b>선택</b>: 프로필 정보(선택 입력 시)
                </li>
              </ul>

              <h4>(2) 주문/배송(자재 판매 서비스 제공 시)</h4>
              <ul>
                <li>주문자 정보: 이름, 휴대폰번호, 이메일(있는 경우)</li>
                <li>배송 정보: 수령인 이름, 주소, 연락처</li>
                <li>결제 정보: 결제수단 식별정보, 결제 승인/거래번호 등(결제 서비스 도입 시)</li>
              </ul>

              <h4>(3) 시공 상담/견적/계약</h4>
              <ul>
                <li>이름, 연락처, 시공(현장) 주소, 상담 내용(요청사항/일정/견적 관련 정보)</li>
              </ul>

              <h4>(4) 고객문의/A/S</h4>
              <ul>
                <li>이름, 연락처, 주문/시공 관련 정보, 문의 내용, 처리 이력</li>
              </ul>

              <h4>(5) 자동 수집 항목</h4>
              <ul>
                <li>IP주소, 쿠키, 접속기록, 기기정보, 이용기록 등이 자동 생성·수집될 수 있습니다.</li>
              </ul>

              <h3>3. 개인정보의 보유 및 이용기간</h3>
              <p>
                회사는 원칙적으로 개인정보 처리 목적이 달성되면 지체 없이 파기합니다. 단, 관계 법령에 따라
                일정 기간 보관이 필요한 경우 해당 기간 동안 보관할 수 있습니다.
              </p>
              <ul>
                <li>회원가입 정보: 회원 탈퇴 시까지(단, 분쟁 대응/부정이용 방지 등 필요 시 최소 기간 보관 가능)</li>
                <li>계약/대금결제/공급 관련 기록: 관계 법령에 따른 기간</li>
                <li>소비자 불만/분쟁처리 기록: 관계 법령에 따른 기간</li>
              </ul>

              <h3>4. 개인정보의 제3자 제공</h3>
              <p>
                회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 이용자의 동의가 있거나
                법령에 근거가 있는 경우에 한하여 제공할 수 있습니다.
              </p>

              <h3>5. 개인정보 처리의 위탁</h3>
              <p>
                회사는 원칙적으로 개인정보 처리업무를 외부에 위탁하지 않습니다. 향후 결제(PG), 배송, 호스팅/서버 등
                외부 업체를 이용하여 위탁이 발생하는 경우, 수탁사/위탁업무 내용을 사전에 고지하거나 본 방침에 반영하여 공개합니다.
              </p>
              <ul>
                <li>결제(PG)사: {company.email /* 문구 재활용 방지용 아래에서 별도 출력 */}</li>
              </ul>
              <div className="policy-note">
                <div>결제(PG)사: 추후 도입 시 본 방침을 통해 고지</div>
                <div>배송사: 추후 도입 시 본 방침을 통해 고지</div>
                <div>호스팅/서버: 추후 도입 시 본 방침을 통해 고지</div>
              </div>

              <h3>6. 정보주체의 권리·의무 및 행사 방법</h3>
              <p>
                이용자는 개인정보 열람, 정정, 삭제, 처리정지, 동의 철회를 요구할 수 있습니다. 아래 연락처로 문의하시면
                확인 후 조치하겠습니다.
              </p>

              <h3>7. 개인정보의 파기</h3>
              <ul>
                <li>전자적 파일: 복구 불가능한 방법으로 삭제</li>
                <li>종이 문서: 분쇄 또는 소각</li>
              </ul>

              <h3>8. 개인정보의 안전성 확보조치</h3>
              <ul>
                <li>접근권한 관리 및 내부 관리계획 수립</li>
                <li>중요정보 보호조치(암호화 등)</li>
                <li>보안프로그램 설치 및 점검</li>
                <li>접속기록 보관 및 위·변조 방지</li>
              </ul>

              <h3>9. 개인정보 보호책임자 및 연락처</h3>
              <ul>
                <li>회사명: {company.name}</li>
                <li>대표자/개인정보 보호책임자(겸임): {company.ceo}</li>
                <li>고객센터: {company.phone}</li>
                <li>주소: {company.address}</li>
                <li>이메일: {company.email}</li>
              </ul>

              <h3>10. 시행일</h3>
              <p>본 개인정보처리방침은 {company.effectiveDate}부터 적용됩니다.</p>
            </article>
          ) : (
            <article className="policy-article">
              <h2 className="policy-title">이용약관</h2>
              <p className="policy-lead">
                본 약관은 {company.name}(이하 “회사”)이 제공하는 웹사이트 및 관련 서비스(회원서비스, 자재 판매,
                하우스 시공 상담/계약 등)의 이용과 관련하여 회사와 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>

              <h3>제1조(회사 정보)</h3>
              <ul>
                <li>회사명: {company.name}</li>
                <li>대표자: {company.ceo}</li>
                <li>사업자등록번호: {company.bizNo}</li>
                <li>통신판매업 신고번호: {company.onlineSalesNo}</li>
                <li>주소: {company.address}</li>
                <li>고객센터: {company.phone}</li>
              </ul>

              <h3>제2조(용어의 정의)</h3>
              <ul>
                <li>“회원”이란 본 약관에 동의하고 회원가입을 완료한 자를 말합니다.</li>
                <li>“자재 판매”란 회사가 웹사이트를 통해 재화(자재 등)를 판매/공급하는 서비스를 말합니다.</li>
                <li>“시공서비스”란 하우스 시공, 설치, 방문 시공 등 용역 제공을 말합니다.</li>
              </ul>

              <h3>제3조(약관의 효력 및 변경)</h3>
              <p>회사는 관련 법령을 위배하지 않는 범위에서 약관을 변경할 수 있으며, 변경 시 적용일 및 변경 내용을 공지합니다.</p>

              <h3>제4조(회원가입 및 계정관리)</h3>
              <ul>
                <li>회원가입은 이용자가 약관 및 개인정보처리방침에 동의하고 필요한 정보를 입력하여 신청하면 회사가 승인함으로써 성립합니다.</li>
                <li>회원은 아이디/비밀번호 관리 책임이 있으며, 제3자에게 공유해서는 안 됩니다.</li>
              </ul>

              <h3>제5조(서비스 제공 및 변경)</h3>
              <p>회사는 서비스의 내용, 운영상/기술상 필요에 따라 서비스를 변경할 수 있으며, 중요한 변경은 사전 공지합니다.</p>

              <h3>제6조(자재 판매: 주문·결제·배송)</h3>
              <ul>
                <li>주문: 이용자는 웹사이트에서 상품 선택 후 주문할 수 있습니다.</li>
                <li>결제: 결제(PG) 서비스 도입 시 결제수단/환불규정은 결제 화면 및 안내에 따릅니다.</li>
                <li>배송: 배송사 도입 시 배송 정책(지역/기간/비용)은 상품 상세 또는 공지로 안내합니다.</li>
              </ul>
              <div className="policy-note">
                <div>결제(PG)사: 추후 도입 시 본 약관/사이트를 통해 고지</div>
                <div>배송사: 추후 도입 시 본 약관/사이트를 통해 고지</div>
              </div>

              <h3>제7조(자재 판매: 청약철회·반품·환불)</h3>
              <p>
                반품/교환/환불 조건은 관련 법령 및 상품별 안내(상품 상세페이지/공지)에 따릅니다.
                사용/훼손 등으로 상품 가치가 현저히 감소한 경우 등에는 교환/반품이 제한될 수 있습니다.
              </p>

              <h3>제8조(시공서비스: 상담·계약·변경·취소)</h3>
              <ul>
                <li>시공서비스는 상담/현장 확인/견적 안내 후, 일정·금액·범위가 확정되고 이용자가 동의하면 계약이 성립합니다.</li>
                <li>시공 일정 변경/취소 및 환불 기준은 견적서/계약서 또는 별도 고지 정책에 따릅니다.</li>
                <li>시공 취소 기준(착수 전/후 환불 규칙): 추후 도입 시 본 약관/사이트를 통해 고지</li>
              </ul>

              <h3>제9조(A/S 및 하자 처리)</h3>
              <p>A/S 기준, 범위, 기간은 시공/제품의 특성과 계약 내용에 따라 달라질 수 있으며, 회사는 합리적인 기준으로 안내합니다.</p>

              <h3>제10조(이용자의 금지행위)</h3>
              <ul>
                <li>타인의 개인정보/계정 도용</li>
                <li>서비스 운영을 방해하는 행위(해킹, 악성코드, 트래픽 공격 등)</li>
                <li>불법/부정한 목적의 이용</li>
                <li>회사/제3자의 지식재산권 침해</li>
              </ul>

              <h3>제11조(책임 제한)</h3>
              <p>회사는 천재지변, 불가항력, 이용자 귀책 사유로 인해 발생한 손해에 대해서는 관련 법령이 허용하는 범위 내에서 책임을 제한할 수 있습니다.</p>

              <h3>제12조(분쟁 해결 및 관할)</h3>
              <p>서비스 이용과 관련한 분쟁은 상호 협의로 해결하며, 협의가 어려운 경우 대한민국 법령에 따라 관할 법원에서 해결합니다.</p>

              <h3>부칙</h3>
              <p>본 약관은 {company.effectiveDate}부터 적용됩니다.</p>
            </article>
          )}
        </div>
      </div>
    </div>
  )
}
