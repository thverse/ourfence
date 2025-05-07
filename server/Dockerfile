# 1. Node.js 22.13.1 빌더 이미지 사용
FROM node:22.13.1-alpine AS builder

WORKDIR /app

# 2. 패키지 파일 복사 및 의존성 설치
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# 3. 소스 코드 복사
COPY . .

# 4. Prisma generate 및 NestJS 빌드
RUN pnpm prisma generate && pnpm build


# 5. 런타임 이미지를 별도로 생성 (더 가볍게)
FROM node:22.13.1-alpine AS runner

WORKDIR /app

# 6. 런타임 실행에 필요한 최소 파일만 복사
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

# 7. production 의존성만 설치
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# 8. 포트 설정
EXPOSE 4000

# 9. 실행 명령어
CMD ["pnpm", "start:prod"]
