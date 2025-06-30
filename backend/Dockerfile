# Dockerfile para o Backend (Node.js/Express)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma
COPY src ./src
RUN npm install --frozen-lockfile || npm install
RUN npm install --save-dev @types/node ts-node
RUN npm run build
RUN ls -la dist/

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache openssl libc6-compat
RUN npm install -g ts-node
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh
RUN ls -la dist/
EXPOSE 3001
CMD ["/bin/sh", "./docker-entrypoint.sh"] 