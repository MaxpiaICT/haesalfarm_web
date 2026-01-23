
# 1. alpine 대신 일반 slim 버전을 사용하면 환경 차이로 인한 실행 에러를 줄일 수 있습니다.
FROM node:18-slim

WORKDIR /app

# 2. 패키지 파일 복사

# 1. 환경 일관성을 위해 slim 버전을 권장합니다.
FROM node:18-slim

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. 의존성 파일 복사 및 설치
# 빌드 시간을 줄이기 위해 소스 복사 전에 실행합니다.

COPY package*.json ./
RUN npm install --production

 
# 3. 중요: 배포 환경에서는 ci가 좋지만, 만약 lock 파일과 package.json이 
# 조금이라도 다르면 설치에 실패합니다. 일단 npm install로 시도해보세요.
RUN npm install --production

# 4. 소스 복사 (이때 .dockerignore에 의해 server.js가 제외되지 않았는지 확인 필수)
COPY . .

# 5. 실행 명령 확인 (파일 이름이 정확히 server.js가 맞는지 다시 확인하세요)

# 4. 소스 코드 전체 복사 
# 이 단계에서 server.js가 /app 폴더 바로 아래에 복사됩니다.
COPY . .

# 5. 파일 위치 확인용 로그 (배포 로그에서 확인 가능)
RUN ls -al /app

# 6. 포트 및 실행 설정
ENV PORT=3001
EXPOSE 3001

# 7. 서버 시작

CMD ["node", "server.js"]