import nodemailer from 'nodemailer'

// 네이버 SMTP 설정
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.naver.com',
    port: 587, // STARTTLS 사용 (465 대신 587 사용)
    secure: false, // 587 포트는 false (STARTTLS 사용)
    requireTLS: true, // TLS 필수
    auth: {
      user: process.env.EMAIL_USER, // 네이버 이메일 주소
      pass: process.env.EMAIL_PASSWORD, // 네이버 앱 비밀번호
    },
    tls: {
      rejectUnauthorized: false, // 인증서 검증 완화 (필요시)
    },
  })
}

// 이메일 인증 코드 발송
export const sendVerificationCode = async (email, code) => {
  try {
    const transporter = createTransporter()

    const mailOptions = {
      from: `"햇살농업건설" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '[햇살농업건설] 이메일 인증 코드',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2c5530; margin-bottom: 20px;">이메일 인증</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            안녕하세요, 햇살농업건설입니다.
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            회원가입을 위한 이메일 인증 코드입니다.
          </p>
          <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; text-align: center; border-radius: 8px;">
            <p style="font-size: 14px; color: #666; margin-bottom: 10px;">인증 코드</p>
            <p style="font-size: 32px; font-weight: bold; color: #2c5530; letter-spacing: 4px; margin: 0;">
              ${code}
            </p>
          </div>
          <p style="font-size: 14px; color: #999; margin-top: 20px;">
            이 코드는 10분간 유효합니다.<br/>
            본인이 요청하지 않은 경우 이 이메일을 무시하셔도 됩니다.
          </p>
        </div>
      `,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('이메일 발송 성공:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('이메일 발송 실패:', error)
    throw new Error('이메일 발송에 실패했습니다.')
  }
}

// 임시 비밀번호 발송
export const sendTempPassword = async (email, tempPassword) => {
  try {
    const transporter = createTransporter()

    const mailOptions = {
      from: `"햇살농업건설" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '[햇살농업건설] 임시 비밀번호',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2c5530; margin-bottom: 20px;">임시 비밀번호 발급</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            안녕하세요, 햇살농업건설입니다.
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            요청하신 임시 비밀번호입니다. 로그인 후 비밀번호를 변경해주세요.
          </p>
          <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; text-align: center; border-radius: 8px;">
            <p style="font-size: 14px; color: #666; margin-bottom: 10px;">임시 비밀번호</p>
            <p style="font-size: 24px; font-weight: bold; color: #2c5530; letter-spacing: 2px; margin: 0;">
              ${tempPassword}
            </p>
          </div>
          <p style="font-size: 14px; color: #999; margin-top: 20px;">
            보안을 위해 로그인 후 즉시 비밀번호를 변경해주세요.
          </p>
        </div>
      `,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('임시 비밀번호 이메일 발송 성공:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('임시 비밀번호 이메일 발송 실패:', error)
    throw new Error('이메일 발송에 실패했습니다.')
  }
}
