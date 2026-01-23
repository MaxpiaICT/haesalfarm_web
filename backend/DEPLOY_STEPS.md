# Fly.io 배포 단계별 가이드

## ✅ 준비 완료된 파일
- ✅ `Dockerfile` - Docker 이미지 빌드 파일
- ✅ `fly.toml` - Fly.io 앱 설정 파일
- ✅ `.dockerignore` - Docker 빌드 제외 파일
- ✅ `FLYIO_DEPLOY.md` - 상세 배포 가이드

## 🚀 배포 단계

### 1단계: Fly.io CLI 설치

**Windows PowerShell (관리자 권한):**
```powershell
iwr https://fly.io/install.ps1 -useb | iex
```

설치 후 PowerShell을 재시작하세요.

### 2단계: Fly.io 로그인

```powershell
fly auth login
```

브라우저가 열리면 Fly.io 계정으로 로그인하세요.
(계정이 없으면 https://fly.io 에서 가입)

### 3단계: backend 폴더로 이동

```powershell
cd backend
```

### 4단계: Fly.io 앱 생성 및 배포

```powershell
fly launch
```

질문에 답변:
- **App name**: `haesalfarm-backend` (또는 원하는 이름)
- **Region**: `nrt` (도쿄) - 한국에서 가장 가까운 리전
- **Postgres**: `n` (MongoDB Atlas 사용)
- **Redis**: `n` (불필요)
- **Dockerfile**: `y` (이미 생성됨)

### 5단계: 환경 변수 설정

```powershell
fly secrets set MONGODB_URI="mongodb+srv://maxpiaictntec_db_user:UyjFpzYPjWy3djme@haesalfarm.grpmle4.mongodb.net/haesalfarm?retryWrites=true&w=majority"
```

```powershell
fly secrets set JWT_SECRET="657f0cdb952e5f760c86a16bf1e14c025620d9d2ca87eb766fb52891dcf717c1"
```

```powershell
fly secrets set EMAIL_USER="haesalfarm@naver.com"
```

```powershell
fly secrets set EMAIL_PASSWORD="T368G78JBHES"
```

```powershell
fly secrets set ADMIN_USERNAME="haesalfarm"
```

```powershell
fly secrets set ADMIN_PASSWORD="farm9948!!"
```

```powershell
fly secrets set ADMIN_EMAIL="admin@haesalfarm.com"
```

### 6단계: 배포 실행

```powershell
fly deploy
```

### 7단계: 배포 확인

```powershell
fly status
```

```powershell
fly logs
```

### 8단계: 배포 URL 확인

```powershell
fly info
```

또는 브라우저에서:
```
https://haesalfarm-backend.fly.dev/api/health
```

### 9단계: 프론트엔드 환경 변수 업데이트

Vercel 대시보드 → 프로젝트 → Settings → Environment Variables에서:

```
VITE_API_URL=https://haesalfarm-backend.fly.dev/api
```

(실제 Fly.io 배포 URL 사용)

## 📝 유용한 명령어

### 로그 확인
```powershell
fly logs
```

### 앱 정보
```powershell
fly info
```

### 환경 변수 확인
```powershell
fly secrets list
```

### 앱 재시작
```powershell
fly apps restart haesalfarm-backend
```

## ❗ 문제 해결

### CLI 설치 실패
- PowerShell을 관리자 권한으로 실행
- 실행 정책 확인: `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`

### 배포 실패
- `fly logs`로 에러 확인
- 환경 변수 확인: `fly secrets list`

### MongoDB 연결 실패
- MongoDB Atlas Network Access에서 0.0.0.0/0 허용 확인
