# 햇살농업건설 백엔드 서버

## 설치 및 실행

### 1. 의존성 설치
```bash
cd server
npm install
```

### 2. 환경 변수 설정
`.env.example` 파일을 복사하여 `.env` 파일을 생성하고 필요한 값들을 설정하세요.

```bash
cp .env.example .env
```

### 3. MongoDB 설치 및 실행
MongoDB가 설치되어 있어야 합니다.

**Windows:**
- MongoDB Community Server 다운로드: https://www.mongodb.com/try/download/community
- 설치 후 MongoDB 서비스가 자동으로 실행됩니다.

**또는 MongoDB Atlas (클라우드) 사용:**
- https://www.mongodb.com/cloud/atlas 에서 무료 계정 생성
- 클러스터 생성 후 연결 문자열을 `.env`의 `MONGODB_URI`에 설정

### 4. 관리자 계정 초기화
```bash
node scripts/initAdmin.js
```

### 5. 서버 실행

**개발 모드 (자동 재시작):**
```bash
npm run dev
```

**프로덕션 모드:**
```bash
npm start
```

서버는 기본적으로 `http://localhost:3001`에서 실행됩니다.

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
- `PUT /api/inquiries/:inquiryId/status` - 문의 상태 변경 (관리자만)
- `DELETE /api/inquiries/:inquiryId` - 문의 삭제 (인증 필요)

## 환경 변수

- `PORT`: 서버 포트 (기본값: 3001)
- `MONGODB_URI`: MongoDB 연결 문자열
- `JWT_SECRET`: JWT 토큰 시크릿 키
- `ADMIN_USERNAME`: 관리자 아이디
- `ADMIN_PASSWORD`: 관리자 비밀번호
- `ADMIN_EMAIL`: 관리자 이메일

