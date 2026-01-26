# 프로젝트 구조

## 디렉토리 구조

```
haesalfarm_web/
├── frontend/              # React 프론트엔드
│   ├── src/              # 소스 코드
│   │   ├── components/   # React 컴포넌트
│   │   ├── pages/        # 페이지 컴포넌트
│   │   └── utils/        # 유틸리티 함수
│   ├── public/           # 정적 파일
│   ├── package.json      # 프론트엔드 의존성
│   └── vite.config.js    # Vite 설정
│
├── backend/              # Node.js 백엔드
│   ├── routes/           # API 라우트
│   ├── models/          # MongoDB 모델
│   ├── middleware/       # Express 미들웨어
│   ├── scripts/         # 유틸리티 스크립트
│   ├── server.js        # 서버 진입점
│   ├── package.json     # 백엔드 의존성
│   └── .env             # 환경 변수 (생성 필요)
│
├── README.md            # 프로젝트 개요
└── .gitignore           # Git 제외 파일
```

## 실행 방법

### 백엔드 실행
```bash
cd backend
npm install
# .env 파일 생성 및 설정
npm run dev
```

### 프론트엔드 실행
```bash
cd frontend
npm install
# .env 파일 생성 및 설정
npm run dev
```

## 환경 변수

### 백엔드 (backend/.env)
```env
PORT=3001
MONGODB_URI=mongodb+srv://...
JWT_SECRET=...
ADMIN_USERNAME=haesalfarm
ADMIN_PASSWORD=farm9948!!
ADMIN_EMAIL=admin@haesalfarm.com
```

### 프론트엔드 (frontend/.env)
```env
VITE_API_URL=http://localhost:3001/api
VITE_USE_LOCAL_STORAGE=false
```



