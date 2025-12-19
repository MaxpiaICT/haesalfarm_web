// 이메일 발송 유틸리티
import nodemailer from 'nodemailer'

// 이메일 전송기 생성
const createTransporter = () => {
  // 네이버 메일 SMTP 설정
  return nodemailer.createTransport({
    host: 'smtp.naver.com',
    port: 465,
    secure: true, // SSL 사용
    auth: {
      user: process.env.EMAIL_USER, // 네이버 메일 주소
      pass: process.env.EMAIL_PASSWORD, // 네이버 메일 비밀번호 또는 메일 전용 비밀번호
    },
  })
}

/**
 * 임시 비밀번호 이메일 발송
 * @param {string} to - 수신자 이메일 주소
 * @param {string} username - 사용자 아이디
 * @param {string} tempPassword - 임시 비밀번호
 */
export async function sendTempPasswordEmail(to, username, tempPassword) {
  try {
    // 이메일 발송이 설정되지 않은 경우
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn('⚠️ 이메일 설정이 없어 이메일을 발송하지 않습니다.')
      return { sent: false, message: '이메일 설정이 필요합니다.' }
    }

    const transporter = createTransporter()

    const mailOptions = {
      from: `"햇살농업건설" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: '[햇살농업건설] 임시 비밀번호 발급',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2c3e50;">임시 비밀번호가 발급되었습니다</h2>
          
          <p>안녕하세요, <strong>${username}</strong>님.</p>
          
          <p>요청하신 임시 비밀번호가 발급되었습니다.</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #666;">임시 비밀번호:</p>
            <p style="margin: 10px 0 0 0; font-size: 24px; font-weight: bold; color: #2c3e50; letter-spacing: 2px;">
              ${tempPassword}
            </p>
          </div>
          
          <p style="color: #e74c3c; font-weight: bold;">
            ⚠️ 보안을 위해 로그인 후 반드시 비밀번호를 변경해주세요.
          </p>
          
          <p style="margin-top: 30px; color: #666; font-size: 12px;">
            이 이메일은 자동으로 발송된 메일입니다.<br>
            문의사항이 있으시면 고객센터로 연락해주세요.
          </p>
        </div>
      `,
      text: `
임시 비밀번호가 발급되었습니다

안녕하세요, ${username}님.

요청하신 임시 비밀번호가 발급되었습니다.

임시 비밀번호: ${tempPassword}

⚠️ 보안을 위해 로그인 후 반드시 비밀번호를 변경해주세요.

이 이메일은 자동으로 발송된 메일입니다.
문의사항이 있으시면 고객센터로 연락해주세요.
      `,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('✅ 이메일 발송 성공:', info.messageId)
    return { sent: true, messageId: info.messageId }
  } catch (error) {
    console.error('❌ 이메일 발송 실패:', error)
    throw new Error('이메일 발송에 실패했습니다.')
  }
}

