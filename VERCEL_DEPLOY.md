# Vercel 배포 가이드 (프론트+백엔드 한 프로젝트)

프론트엔드와 백엔드 API를 **한 Vercel 프로젝트**에서 함께 배포합니다.
- **프론트**: `frontend/` 빌드 → `frontend/dist` 정적 배포
- **백엔드**: `api/[...path].js`가 `/api/*` 요청을 Express(`backend/server.js`)로 전달 (서버리스)

---

## 1. 배포 브랜치

- **프로덕션 배포**: `main` 브랜치만 사용
- 설정: Vercel 대시보드 → **Settings** → **Git** → **Production Branch** = `main`
- `dev` 등 다른 브랜치 푸시 시에는 Preview 배포만 됩니다.

---

## 2. 프로젝트 루트

- **Root Directory**는 **비워 두세요** (기본값 = 저장소 루트)
- `api/`, `frontend/`, `backend/`가 같은 레포 루트에 있어야 합니다.  
  (예전처럼 `frontend`만 루트로 두지 마세요.)

---

## 3. vercel.json (루트)

| 항목 | 값 | 설명 |
|------|-----|------|
| `installCommand` | `npm run install:all` | 루트·frontend·backend 모두 `npm install` |
| `buildCommand` | `cd frontend && npm run build` | 프론트 빌드 |
| `outputDirectory` | `frontend/dist` | 정적 파일 경로 |
| `rewrites` | `(.*) → /index.html` | SPA 폴백 (`/api/*`는 API 라우트가 우선 처리) |

`/api/*` 요청은 `api/[...path].js` 서버리스 함수로 가며, Express 앱(`backend/server.js`)이 처리합니다.

---

## 4. 환경 변수 (Vercel)

Vercel 대시보드 → **Settings** → **Environment Variables**에 아래를 넣습니다.

### 프론트엔드 (같은 도메인 사용 시)

| 이름 | 값 | 환경 |
|------|-----|------|
| `VITE_API_URL` | `/api` | Production, Preview (필요 시 Development) |

> 같은 Vercel 도메인에서 API를 쓰므로 `https://...` 없이 `/api`만 넣으면 됩니다.  
> 다른 백엔드(Fly.io 등)를 쓰면 `https://haesalfarm-backend.fly.dev/api`처럼 전체 URL을 넣으세요.

### 백엔드 (API / DB / 메일)

| 이름 | 값 | 환경 |
|------|-----|------|
| `MONGODB_URI` | `mongodb+srv://...` (Atlas 등) | Production, Preview |
| `JWT_SECRET` | 랜덤한 긴 문자열 | Production, Preview |
| `EMAIL_USER` | 발신용 이메일 (예: 네이버) | Production, Preview |
| `EMAIL_PASSWORD` | 해당 메일의 앱 비밀번호 | Production, Preview |

- `PORT`: Vercel이 설정하므로 별도 입력 불필요  
- 상세: `VERCEL_ENV_SETUP.md` 참고

---

## 5. 배포 후 확인

1. **프론트**: Vercel URL(`https://xxx.vercel.app`) 접속 → 페이지·라우팅 정상 여부
2. **API**:  
   - `https://xxx.vercel.app/api/health` → `{ "status": "ok", "mongodb": { ... } }`  
   - 로그인·문의 등 실제 API 호출 동작 확인

---

## 6. 로컬 개발

- **프론트만**: `cd frontend && npm run dev`  
  - `VITE_API_URL` 없으면 기본값(Fly.io 등) 사용
- **프론트 + 백엔드**: 루트에서 `npm run dev`  
  - 로컬 백 사용 시 `frontend/.env`: `VITE_API_URL=http://localhost:3001/api`
