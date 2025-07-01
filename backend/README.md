# Canal Tech - Backend

API REST para o portal de notícias Canal Tech.

## 🚀 Como rodar

### Desenvolvimento Local
```bash
# Instalar dependências
npm install

# Configurar banco
npx prisma migrate dev
npx prisma db seed

# Rodar servidor
npm run dev
```

### Com Docker
```bash
docker compose up backend
```

Servidor: `http://localhost:3001`

## 🧪 Testes

```bash
npm test
```

## 📊 Endpoints

- `GET /api/articles` - Listar artigos
- `GET /api/articles/:id` - Buscar por ID
- `GET /api/articles/slug/:slug` - Buscar por slug
- `POST /api/articles` - Criar artigo
- `PUT /api/articles/:id` - Atualizar artigo
- `DELETE /api/articles/:id` - Deletar artigo
- `GET /health` - Status da API

## 🛠️ Tecnologias

- Node.js + Express
- TypeScript
- Prisma + SQLite
- Jest 