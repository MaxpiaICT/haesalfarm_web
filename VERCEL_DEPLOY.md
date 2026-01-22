# Vercel 배포 가이드

## Vercel 프로젝트 설정

프로젝트 구조가 변경되어 `frontend` 폴더로 이동했으므로, Vercel 대시보드에서 다음 설정을 변경해야 합니다:

### 방법 1: Root Directory 설정 (권장)

1. Vercel 대시보드 → 프로젝트 설정 → General
2. **Root Directory**를 `frontend`로 설정
3. 저장

이렇게 하면 Vercel이 `frontend` 폴더를 프로젝트 루트로 인식합니다.

### 방법 2: vercel.json 사용 (현재 설정)

루트에 `vercel.json` 파일이 생성되어 있습니다. 이 파일은:
- 빌드 명령어: `cd frontend && npm install && npm run build`
- 출력 디렉토리: `frontend/dist`
- 설치 명령어: `cd frontend && npm install`

## 환경 변수 설정

Vercel 대시보드 → Settings → Environment Variables에서 다음 변수를 설정하세요:

```
VITE_API_URL=https://haesalfarm-backend.fly.dev/api
VITE_USE_LOCAL_STORAGE=false
```

**중요**: 환경 변수 설정 후 반드시 **재배포**해야 빌드 시점에 환경 변수가 주입됩니다.

## 배포 후 확인

배포가 완료되면:
1. Vercel에서 제공하는 URL로 접속
2. 브라우저 개발자 도구에서 콘솔 오류 확인
3. API 연결 확인



