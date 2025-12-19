# 햇살농업건설 웹사이트

프론트엔드와 백엔드가 분리된 풀스택 웹 애플리케이션입니다.

## 프로젝트 구조

```
haesalfarm_web/
├── frontend/          # React 프론트엔드 (Vite)
│   ├── src/          # 소스 코드
│   ├── public/       # 정적 파일
│   └── package.json  # 프론트엔드 의존성
├── backend/           # Node.js 백엔드 (Express + MongoDB)
│   ├── routes/       # API 라우트
│   ├── models/       # MongoDB 모델
│   ├── middleware/   # Express 미들웨어
│   └── package.json  # 백엔드 의존성
├── README.md          # 프로젝트 개요
└── PROJECT_STRUCTURE.md # 상세 구조 설명
```

## 빠른 시작

### 백엔드 실행

```bash
cd backend
npm install
# .env 파일 생성 및 설정 (backend/.env)
npm run dev
```

백엔드 서버는 `http://localhost:3001`에서 실행됩니다.

### 프론트엔드 실행

```bash
cd frontend
npm install
# .env 파일 생성 및 설정 (frontend/.env)
npm run dev
```

프론트엔드는 `http://localhost:5173`에서 실행됩니다.

## 환경 변수 설정

### 백엔드 (backend/.env)
```env
PORT=3001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/haesalfarm?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ADMIN_USERNAME=haesalfarm
ADMIN_PASSWORD=farm9948!!
ADMIN_EMAIL=admin@haesalfarm.com
```

### 프론트엔드 (frontend/.env)
```env
VITE_API_URL=http://localhost:3001/api
VITE_USE_LOCAL_STORAGE=false
```

## 상세 문서

- 프로젝트 구조: [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
- 백엔드 설정: [backend/README.md](./backend/README.md)
- MongoDB 설치: [backend/MONGODB_INSTALL.md](./backend/MONGODB_INSTALL.md)

## 기술 스택

### 프론트엔드
- React 18
- Vite
- React Router DOM
- Tailwind CSS

### 백엔드
- Node.js
- Express
- MongoDB (Mongoose)
- JWT 인증
- bcryptjs
