# 1. Node.js 22.13.1 빌더 이미지 사용
FROM node:22.13.1-alpine AS builder

# 2. 작업 디렉토리 생성
WORKDIR /app

# 2. 패키지 파일 복사 및 의존성 설치
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# 3. 소스 코드 복사
COPY . .

# 4. 빌드
RUN pnpm build

# 5. 실제 실행 환경
FROM node:22.13.1-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# 빌드 결과와 필요한 파일만 복사
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["pnpm", "start"]