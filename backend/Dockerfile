# 1. alpine 대신 일반 slim 버전을 사용하면 환경 차이로 인한 실행 에러를 줄일 수 있습니다.
FROM node:18-slim

WORKDIR /app

# 2. 패키지 파일 복사
COPY package*.json ./

# 3. 중요: 배포 환경에서는 ci가 좋지만, 만약 lock 파일과 package.json이 
# 조금이라도 다르면 설치에 실패합니다. 일단 npm install로 시도해보세요.
RUN npm install --production

# 4. 소스 복사 (이때 .dockerignore에 의해 server.js가 제외되지 않았는지 확인 필수)
COPY . .

# 5. 실행 명령 확인 (파일 이름이 정확히 server.js가 맞는지 다시 확인하세요)
CMD ["node", "server.js"]