# Fly.io 배포를 위한 Dockerfile
FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci --only=production

# 소스 코드 복사
COPY . .

# 포트 노출 (Fly.io는 PORT 환경 변수 사용)
EXPOSE 3001

# 서버 시작
CMD ["node", "server.js"]
