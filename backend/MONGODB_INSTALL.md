# MongoDB 설치 가이드 (Windows)

## 방법 1: MongoDB Community Server 설치 (로컬)

### 1단계: MongoDB 다운로드
1. https://www.mongodb.com/try/download/community 접속
2. **Version**: 최신 버전 선택 (예: 7.0)
3. **Platform**: Windows
4. **Package**: MSI
5. **Download** 버튼 클릭

### 2단계: MongoDB 설치
1. 다운로드한 `.msi` 파일 실행
2. **Complete** 설치 선택 (권장)
3. **Install MongoDB as a Service** 체크 (자동 시작)
4. **Service Name**: MongoDB (기본값)
5. **Data Directory**: `C:\Program Files\MongoDB\Server\7.0\data` (기본값)
6. **Log Directory**: `C:\Program Files\MongoDB\Server\7.0\log` (기본값)
7. **Install MongoDB Compass** 체크 해제 (선택사항)
8. **Install** 클릭

### 3단계: 설치 확인
PowerShell 또는 명령 프롬프트에서:
```powershell
mongod --version
```

서비스가 실행 중인지 확인:
```powershell
Get-Service MongoDB
```

### 4단계: MongoDB 서비스 시작 (필요시)
```powershell
# 관리자 권한으로 실행
Start-Service MongoDB
```

### 5단계: 연결 테스트
PowerShell에서:
```powershell
mongosh
```

또는:
```powershell
mongo
```

연결되면 MongoDB 셸이 열립니다.

---

## 방법 2: MongoDB Atlas 사용 (클라우드, 무료)

### 1단계: 계정 생성
1. https://www.mongodb.com/cloud/atlas 접속
2. **Try Free** 클릭
3. 이메일로 계정 생성

### 2단계: 클러스터 생성
1. **Build a Database** 클릭
2. **Shared (Free)** 선택
3. **Cloud Provider**: AWS (기본값)
4. **Region**: 가장 가까운 지역 선택 (예: `ap-northeast-2` - 서울)
5. **Cluster Name**: `haesalfarm` (원하는 이름)
6. **Create** 클릭

### 3단계: 데이터베이스 사용자 생성
1. **Database Access** 메뉴 클릭
2. **Add New Database User** 클릭
3. **Authentication Method**: Password
4. **Username**: `haesalfarm` (원하는 사용자명)
5. **Password**: 강력한 비밀번호 입력 (저장해두세요!)
6. **Database User Privileges**: Atlas admin
7. **Add User** 클릭

### 4단계: 네트워크 접근 설정
1. **Network Access** 메뉴 클릭
2. **Add IP Address** 클릭
3. **Allow Access from Anywhere** 클릭 (또는 현재 IP 주소 입력)
4. **Confirm** 클릭

### 5단계: 연결 문자열 가져오기
1. **Database** 메뉴로 돌아가기
2. **Connect** 버튼 클릭
3. **Connect your application** 선택
4. **Driver**: Node.js
5. **Version**: 5.5 or later
6. 연결 문자열 복사 (예: `mongodb+srv://haesalfarm:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)

### 6단계: 백엔드 서버 설정
`server/.env` 파일에서:
```env
MONGODB_URI=mongodb+srv://haesalfarm:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/haesalfarm?retryWrites=true&w=majority
```
`YOUR_PASSWORD`를 실제 비밀번호로 변경하고, `<password>` 부분도 실제 비밀번호로 변경하세요.

---

## 설치 후 백엔드 서버 설정

### 로컬 MongoDB 사용 시
`server/.env` 파일:
```env
MONGODB_URI=mongodb://localhost:27017/haesalfarm
```

### MongoDB Atlas 사용 시
`server/.env` 파일:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/haesalfarm?retryWrites=true&w=majority
```

---

## 문제 해결

### MongoDB 서비스가 시작되지 않는 경우
```powershell
# 관리자 권한으로 PowerShell 실행 후
Start-Service MongoDB

# 또는 서비스 재시작
Restart-Service MongoDB
```

### 포트 27017이 이미 사용 중인 경우
다른 프로그램이 MongoDB 포트를 사용하고 있을 수 있습니다. 포트 확인:
```powershell
netstat -ano | findstr :27017
```

### MongoDB Atlas 연결 오류
- 방화벽 설정 확인 (Network Access에서 IP 추가)
- 연결 문자열의 비밀번호가 올바른지 확인
- 클러스터가 실행 중인지 확인 (Atlas 대시보드에서 확인)

---

## 다음 단계

MongoDB 설치가 완료되면:

1. `server/.env` 파일에 올바른 `MONGODB_URI` 설정
2. 백엔드 서버 실행:
   ```bash
   cd server
   npm install
   node scripts/initAdmin.js
   npm run dev
   ```
3. 프론트엔드 실행:
   ```bash
   npm run dev
   ```

