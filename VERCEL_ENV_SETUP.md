# Vercel 환경 변수 설정 (프론트+백엔드 한 프로젝트)

Vercel 대시보드 → **Settings** → **Environment Variables**에서 아래 변수들을 설정하세요.

---

## 백엔드–Vercel 연동

- **`api/[...path].js`**가 `/api/*` 요청을 `backend/server.js`(Express)로 넘깁니다.  
- **`vercel.json`** rewrites는 **`/api`로 시작하는 경로를 제외**하고 SPA용 `/index.html`로 보냅니다.  
- **VITE_API_URL=/api**를 Vercel에 설정해야, 배포된 프론트가 같은 도메인의 `/api`를 호출해 이 서버리스와 연결됩니다.

---

## 1. 프론트엔드

### VITE_API_URL

| 용도 | 값 | 비고 |
|------|-----|------|
| **같은 Vercel 도메인에서 API 사용** | `/api` | 권장. 상대 경로로 `/api/*` 호출 |
| Fly.io 등 별도 백엔드 사용 | `https://haesalfarm-backend.fly.dev/api` | 예시 |

- Production / Preview (필요 시 Development)에 동일하게 두면 됩니다.

---

## 2. 백엔드 (API 서버리스)

`backend/server.js`, `backend/db.js`, `backend/routes`, `backend/utils/email.js` 등에서 사용합니다.

| 변수 | 필수 | 설명 | 예시 |
|------|------|------|------|
| `MONGODB_URI` | ✅ | MongoDB 연결 문자열 | `mongodb+srv://user:pass@cluster.mongodb.net/haesalfarm?retryWrites=true&w=majority` |
| `JWT_SECRET` | ✅ | JWT 서명용 시크릿 | 32자 이상 랜덤 문자열 |
| `EMAIL_USER` | ✅* | 발신 이메일 주소 | `haesalfarm@naver.com` |
| `EMAIL_PASSWORD` | ✅* | 해당 계정의 앱 비밀번호 | 네이버/구글 앱 비밀번호 |

\* 이메일 발송(인증, 문의 등)을 쓰는 경우 필수. 쓰지 않으면 해당 기능만 실패합니다.

- `PORT`: Vercel이 자동으로 넣어 주므로 설정하지 않아도 됩니다.

---

## 3. 적용·재배포

- **Save** 후 배포가 자동으로 일어나지 않을 수 있으므로,  
  **Deployments** → 최신 배포 → **Redeploy** 로 한 번 다시 배포하는 것을 권장합니다.

---

## 4. 확인

- 브라우저 콘솔: `import.meta.env.VITE_API_URL` → `/api` 또는 설정한 URL
- API: `https://<프로젝트>.vercel.app/api/health` → `status: "ok"`, `mongodb.status` 확인
