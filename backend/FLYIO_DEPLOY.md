# Fly.io 백엔드 서버 배포 가이드

Fly.io를 사용하여 백엔드 서버를 배포하는 방법입니다.

## 1단계: Fly.io 계정 생성 및 CLI 설치

### 1. Fly.io 계정 생성
1. https://fly.io 접속
2. GitHub 계정으로 로그인 (또는 이메일로 가입)

### 2. Fly.io CLI 설치

**Windows (PowerShell):**
```powershell
iwr https://fly.io/install.ps1 -useb | iex
```

**macOS/Linux:**
```bash
curl -L https://fly.io/install.sh | sh
```

### 3. CLI 로그인
```bash
fly auth login
```
브라우저가 열리면 Fly.io 계정으로 로그인

## 2단계: 프로젝트 초기화

### 1. backend 폴더로 이동
```bash
cd backend
```

### 2. Fly.io 앱 생성
```bash
fly launch
```

질문에 답변:
- **App name**: `haesalfarm-backend` (또는 원하는 이름)
- **Region**: `nrt` (도쿄) - 한국에서 가장 가까운 리전 (서울 리전은 없음)
- **Postgres/Redis**: `n` (MongoDB Atlas 사용하므로 불필요)
- **Dockerfile**: `y` (이미 생성됨)

## 3단계: 환경 변수 설정

### 1. 환경 변수 추가
```bash
fly secrets set MONGODB_URI="mongodb+srv://maxpiaictntec_db_user:Z3LNFlejPCP43R7X@haesalfarm.grpmle4.mongodb.net/haesalfarm?retryWrites=true&w=majority"
```

```bash
fly secrets set JWT_SECRET="657f0cdb952e5f760c86a16bf1e14c025620d9d2ca87eb766fb52891dcf717c1"
```

```bash
fly secrets set EMAIL_USER="haesalfarm@naver.com"
```

```bash
fly secrets set EMAIL_PASSWORD="T368G78JBHES"
```

```bash
fly secrets set ADMIN_USERNAME="haesalfarm"
```

```bash
fly secrets set ADMIN_PASSWORD="farm9948!!"
```

```bash
fly secrets set ADMIN_EMAIL="admin@haesalfarm.com"
```

### 2. 환경 변수 확인
```bash
fly secrets list
```

## 4단계: 배포

### 1. 배포 실행
```bash
fly deploy
```

### 2. 배포 상태 확인
```bash
fly status
```

### 3. 로그 확인
```bash
fly logs
```

## 5단계: 배포 URL 확인

### 1. 앱 URL 확인
```bash
fly open
```
또는
```bash
fly info
```

배포된 URL 예시: `https://haesalfarm-backend.fly.dev`

### 2. 헬스 체크
브라우저에서 접속:
```
https://your-app-name.fly.dev/api/health
```

응답 예시:
```json
{
  "status": "ok",
  "message": "Server is running",
  "mongodb": {
    "status": "connected",
    "readyState": 1
  }
}
```

## 6단계: 프론트엔드 환경 변수 업데이트

Vercel 대시보드 → 프로젝트 → Settings → Environment Variables에서:

```
VITE_API_URL=https://haesalfarm-backend.fly.dev/api
```

(실제 Fly.io 배포 URL 사용)

## 7단계: MongoDB Atlas 네트워크 접근 설정

Fly.io 서버에서 MongoDB Atlas에 접근하려면:

1. MongoDB Atlas → Network Access
2. "Add IP Address" 클릭
3. "Allow Access from Anywhere" 선택 (0.0.0.0/0)
   - 또는 Fly.io IP 주소 확인 후 추가

## 유용한 명령어

### 앱 정보 확인
```bash
fly info
```

### 로그 실시간 확인
```bash
fly logs
```

### SSH 접속
```bash
fly ssh console
```

### 환경 변수 확인
```bash
fly secrets list
```

### 환경 변수 삭제
```bash
fly secrets unset VARIABLE_NAME
```

### 앱 재시작
```bash
fly apps restart haesalfarm-backend
```

### 앱 삭제
```bash
fly apps destroy haesalfarm-backend
```

## 문제 해결

### 배포 실패
- `fly logs`로 에러 확인
- Dockerfile 확인
- 환경 변수 확인 (`fly secrets list`)

### MongoDB 연결 실패
- MongoDB Atlas Network Access에서 0.0.0.0/0 허용 확인
- MONGODB_URI 환경 변수 확인

### 이메일 발송 실패
- EMAIL_USER, EMAIL_PASSWORD 환경 변수 확인
- 네이버 앱 비밀번호가 올바른지 확인

## 비용

- **무료 플랜**: 3개의 공유 CPU VM, 3GB 스토리지, 160GB 아웃바운드 데이터
- **항상 실행**: 무료 플랜에서도 서버가 sleep 상태로 전환되지 않음
- **사용량 초과 시**: 자동으로 유료 플랜으로 전환되지 않음 (알림만 표시)

## 참고

- Fly.io 문서: https://fly.io/docs/
- 지원: https://community.fly.io/
