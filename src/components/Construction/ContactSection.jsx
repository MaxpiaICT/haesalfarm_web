import './ContactSection.css'


export default function ContactSection() {
  return (
    <section className="contact" id="contact">
      <h2>상담문의</h2>

      <a href="tel:010-6471-9948" className="contact-call">
        📞 전화상담
      </a>

      <form className="contact-form">
        <div className="form-row">
          <div>
            <label>이름/상호명*</label>
            <input />
          </div>
          <div>
            <label>연락처*</label>
            <input />
          </div>
        </div>

        <div className="form-row">
          <div>
            <label>이메일</label>
            <input />
          </div>
          <div>
            <label>소속</label>
            <input />
          </div>
        </div>

        <div>
          <label>문의 사항*</label>
          <textarea rows={6} />
        </div>

        <button type="submit" className="submit-btn">
          문의하기
        </button>
      </form>
    </section>
  )
}
