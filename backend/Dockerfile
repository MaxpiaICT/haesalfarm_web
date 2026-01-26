# 1. 환경 일관성을 위해 slim 버전을 권장합니다.
FROM node:18-slim

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. 의존성 파일 복사 및 설치
# 빌드 시간을 줄이기 위해 소스 복사 전에 실행합니다.
COPY package*.json ./
RUN npm install --production

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