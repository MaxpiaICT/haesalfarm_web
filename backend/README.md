# 햇살농업건설 백엔드 서버

Node.js + Express + MongoDB 백엔드 서버입니다.

## 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
PORT=3001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/haesalfarm?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ADMIN_USERNAME=haesalfarm
ADMIN_PASSWORD=farm9948!!
ADMIN_EMAIL=admin@haesalfarm.com
```

### 3. 관리자 계정 초기화
```bash
node scripts/initAdmin.js
```

### 4. 서버 실행

**개발 모드 (자동 재시작):**
```bash
npm run dev
```

**프로덕션 모드:**
```bash
npm start
```

서버는 `http://localhost:3001`에서 실행됩니다.

## API 엔드포인트

### 인증 API (`/api/auth`)
- `POST /api/auth/signup` - 회원가입
- `POST /api/auth/login` - 로그인
- `GET /api/auth/me` - 현재 사용자 정보 (인증 필요)
- `POST /api/auth/forgot-password` - 비밀번호 찾기
- `PUT /api/auth/change-password` - 비밀번호 변경 (인증 필요)
- `GET /api/auth/users` - 모든 사용자 조회 (관리자만)
- `DELETE /api/auth/users/:userId` - 사용자 삭제 (관리자만)

### 문의 API (`/api/inquiries`)
- `POST /api/inquiries` - 문의 생성
- `GET /api/inquiries/my` - 내 문의 조회 (인증 필요)
- `GET /api/inquiries/all` - 모든 문의 조회 (관리자만)
- `PUT /api/inquiries/:inquiryId/answer` - 문의 답변 추가/수정 (관리자만)
- `PUT /api/inquiries/:inquiryId/status` - 문의 상태 변경 (관리자만)
- `DELETE /api/inquiries/:inquiryId` - 문의 삭제 (인증 필요)

## MongoDB 설정

자세한 내용은 [MONGODB_INSTALL.md](./MONGODB_INSTALL.md)를 참고하세요.
