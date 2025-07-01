# Dockerfile para o Frontend (Next.js)
FROM node:20-alpine

WORKDIR /app

# Copiar arquivos de configuração
COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.* ./
COPY postcss.config.* ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY public ./public
COPY src ./src

# Fazer o build
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"] 