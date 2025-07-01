# Dockerfile para o Backend (Node.js/Express)
FROM node:20-alpine

WORKDIR /app

# Instalar dependências do sistema
RUN apk add --no-cache openssl libc6-compat

# Copiar arquivos de configuração
COPY package*.json ./
COPY tsconfig.json ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY prisma ./prisma
COPY src ./src
COPY docker-entrypoint.sh ./

# Fazer o build
RUN npm run build

# Tornar o entrypoint executável
RUN chmod +x docker-entrypoint.sh

EXPOSE 3001

CMD ["./docker-entrypoint.sh"] 