# Railway 백엔드 서버 배포 가이드

Railway를 사용하여 백엔드 서버를 배포하는 방법입니다.

## 1단계: Railway 계정 생성 및 프로젝트 생성

1. https://railway.app 접속
2. GitHub 계정으로 로그인
3. "New Project" 클릭
4. "Deploy from GitHub repo" 선택
5. 저장소 선택 (haesalfarm_web)

## 2단계: 서비스 추가

1. 프로젝트에서 "+ New" 클릭
2. "GitHub Repo" 선택
3. 저장소 선택
4. **중요**: Root Directory를 `backend`로 설정
5. "Deploy" 클릭

## 3단계: 환경 변수 설정

Railway 대시보드 → 서비스 → Variables 탭에서 다음 환경 변수를 추가하세요:

```env
PORT=3001
MONGODB_URI=mongodb+srv://maxpiaictntec_db_user:Z3LNFlejPCP43R7X@haesalfarm.grpmle4.mongodb.net/haesalfarm?retryWrites=true&w=majority
JWT_SECRET=657f0cdb952e5f760c86a16bf1e14c025620d9d2ca87eb766fb52891dcf717c1
ADMIN_USERNAME=haesalfarm
ADMIN_PASSWORD=farm9948!!
ADMIN_EMAIL=admin@haesalfarm.com
EMAIL_USER=haesalfarm@naver.com
EMAIL_PASSWORD=farm9948!!
```

**중요 사항:**
- `MONGODB_URI`: MongoDB Atlas 연결 문자열 (이미 사용 중인 값 사용)
- `JWT_SECRET`: 프로덕션에서는 강력한 랜덤 문자열로 변경 권장
- `EMAIL_USER`, `EMAIL_PASSWORD`: 네이버 메일 설정

## 4단계: 배포 확인

1. Railway 대시보드에서 배포 상태 확인
2. 배포가 완료되면 "Settings" → "Domains"에서 생성된 URL 확인
   - 예: `https://your-app-name.up.railway.app`
3. 브라우저에서 `https://your-app-name.up.railway.app/api/health` 접속
4. `{"status":"ok","message":"Server is running"}` 응답 확인

## 5단계: 프론트엔드 환경 변수 업데이트

Vercel 대시보드 → 프로젝트 → Settings → Environment Variables에서:

```
VITE_API_URL=https://haesalfarmweb-production.up.railway.app/api
```

(실제 Railway 배포 URL 사용)

## 6단계: MongoDB Atlas 네트워크 접근 설정

Railway 서버에서 MongoDB Atlas에 접근하려면:

1. MongoDB Atlas 대시보드 접속
2. Network Access → Add IP Address
3. "Allow Access from Anywhere" 선택 (0.0.0.0/0)
   - 또는 Railway 서버의 IP 주소 추가

## 문제 해결

### 배포 실패 시
- Railway 로그 확인: 서비스 → Deployments → 로그 확인
- 환경 변수가 올바르게 설정되었는지 확인
- MongoDB 연결 문자열이 올바른지 확인

### MongoDB 연결 실패 시
- MongoDB Atlas의 Network Access 설정 확인
- 연결 문자열에 사용자 이름과 비밀번호가 올바른지 확인

### 포트 오류 시
- Railway는 자동으로 PORT 환경 변수를 설정합니다
- `process.env.PORT`를 사용하도록 코드가 작성되어 있으므로 문제없습니다

## 참고사항

- Railway 무료 티어: 월 $5 크레딧 제공
- 자동 배포: GitHub에 푸시하면 자동으로 재배포됩니다
- 로그 확인: Railway 대시보드에서 실시간 로그 확인 가능

