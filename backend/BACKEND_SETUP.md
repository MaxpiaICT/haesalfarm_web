# 백엔드 서버 설정 가이드

## 1. 백엔드 서버 설치 및 실행

### 1단계: 백엔드 의존성 설치
```bash
cd server
npm install
```

### 2단계: 환경 변수 설정
`server` 폴더에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# 서버 포트
PORT=3001

# MongoDB 연결 문자열
# 로컬 MongoDB 사용 시:
MONGODB_URI=mongodb://localhost:27017/haesalfarm

# 또는 MongoDB Atlas (클라우드) 사용 시:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/haesalfarm

# JWT 시크릿 키 (실제 사용 시 강력한 랜덤 문자열로 변경)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# 관리자 계정 정보
ADMIN_USERNAME=haesalfarm
ADMIN_PASSWORD=farm9948!!
ADMIN_EMAIL=admin@haesalfarm.com

# 네이버 이메일 설정 (이메일 인증 기능 사용 시 필수)
EMAIL_USER=your-email@naver.com
EMAIL_PASSWORD=your-app-password-16-digits
```

**이메일 설정 참고:**
- 네이버 앱 비밀번호 생성 방법은 `EMAIL_SETUP.md` 파일을 참고하세요.
- `EMAIL_PASSWORD`는 네이버 일반 비밀번호가 아닌 **앱 비밀번호**입니다.

### 3단계: MongoDB 설치 및 실행

**옵션 1: 로컬 MongoDB 설치**
- Windows: https://www.mongodb.com/try/download/community 에서 다운로드
- 설치 후 MongoDB 서비스가 자동으로 실행됩니다.

**옵션 2: MongoDB Atlas (클라우드, 무료)**
- https://www.mongodb.com/cloud/atlas 에서 무료 계정 생성
- 클러스터 생성 후 연결 문자열을 `.env`의 `MONGODB_URI`에 설정

### 4단계: 관리자 계정 초기화
```bash
cd server
node scripts/initAdmin.js
```

### 5단계: 서버 실행

**개발 모드 (자동 재시작):**
```bash
cd server
npm run dev
```

**프로덕션 모드:**
```bash
cd server
npm start
```

서버가 `http://localhost:3001`에서 실행됩니다.

## 2. 프론트엔드 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# API 서버 URL
VITE_API_URL=http://localhost:3001/api

# 로컬 스토리지 모드 사용 여부 (true: 로컬, false: API)
VITE_USE_LOCAL_STORAGE=false
```

## 3. 프론트엔드 실행

```bash
npm run dev
```

## 4. 테스트

1. 백엔드 서버가 실행 중인지 확인: `http://localhost:3001/api/health`
2. 프론트엔드에서 회원가입 테스트
3. 관리자 계정으로 로그인 테스트 (haesalfarm / farm9948!!)

## 문제 해결

### MongoDB 연결 오류
- MongoDB가 실행 중인지 확인
- `.env` 파일의 `MONGODB_URI`가 올바른지 확인

### CORS 오류
- 백엔드 서버의 `server.js`에서 CORS 설정 확인
- 프론트엔드와 백엔드 포트가 다른지 확인

### API 연결 실패
- 백엔드 서버가 실행 중인지 확인
- 프론트엔드 `.env` 파일의 `VITE_API_URL` 확인
- 브라우저 개발자 도구의 Network 탭에서 요청 확인

