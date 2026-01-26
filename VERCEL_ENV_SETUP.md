# Vercel 환경 변수 설정 가이드

## Fly.io 백엔드 URL 설정

### 1. Vercel 대시보드 접속
- https://vercel.com/dashboard

### 2. 프로젝트 선택
- "haesalfarm-web" 프로젝트 클릭

### 3. Settings → Environment Variables
- 좌측 메뉴에서 "Settings" 클릭
- "Environment Variables" 섹션 클릭

### 4. 환경 변수 추가/수정

**변수 이름:**
```
VITE_API_URL
```

**값:**
```
https://haesalfarm-backend.fly.dev/api
```

**환경:**
- Production ✅
- Preview ✅
- Development ✅ (선택사항)

### 5. 저장
- "Save" 버튼 클릭

### 6. 재배포
- 자동 배포: GitHub에 푸시하면 자동 배포
- 수동 배포: Deployments 탭 → "Redeploy" 클릭

## 확인

배포 후 브라우저 콘솔에서 확인:
```javascript
console.log(import.meta.env.VITE_API_URL)
// 예상 출력: https://haesalfarm-backend.fly.dev/api
```

## 현재 상태

- ✅ 프론트엔드 코드 업데이트 완료 (기본값을 Fly.io로 변경)
- ⏳ Vercel 환경 변수 설정 필요
- ⏳ 프론트엔드 재배포 필요
