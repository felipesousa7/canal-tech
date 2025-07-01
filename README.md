# Canal Tech - Portal de Notícias

Portal de notícias sobre tecnologia desenvolvido com Next.js, TypeScript e Node.js, focado em performance, SEO e boas práticas de desenvolvimento.

## 🚀 Funcionalidades

- **Listagem de artigos** com design responsivo
- **Página de detalhe** com SEO dinâmico
- **API REST** completa com cache
- **Testes unitários** com Jest + Testing Library
- **SEO otimizado** com metatags e Open Graph
- **Performance** otimizada com Core Web Vitals

## 🛠️ Tecnologias

### Frontend
- **Next.js 14** com App Router
- **TypeScript** para type safety
- **Tailwind CSS** para estilização
- **Jest + Testing Library** para testes

### Backend
- **Node.js** com Express
- **TypeScript** para type safety
- **Prisma ORM** com SQLite
- **Cache em memória** para performance

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Docker e Docker Compose (opcional)

## 🚀 Como rodar

### Opção 1: Desenvolvimento Local

#### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd canal-tech
```

#### 2. Backend
```bash
cd backend
npm install
npm run dev
```

O backend estará rodando em `http://localhost:3001`

#### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

O frontend estará rodando em `http://localhost:3000`

### Opção 2: Docker (Recomendado)

Para rodar o projeto completo usando Docker:

```bash
docker compose up
```

Isso irá iniciar tanto o frontend (porta 3000) quanto o backend (porta 3001) em containers Docker.

Para rodar apenas um serviço específico:

```bash
# Apenas o frontend
docker compose up frontend

# Apenas o backend
docker compose up backend
```

## 🧪 Testes Unitários

#### Backend
```bash
cd backend
npm test
```

#### Frontend
```bash
cd frontend
npm test
```

## 📊 API Endpoints

### Artigos
- `GET /api/articles` - Listar todos os artigos
- `GET /api/articles/:id` - Buscar artigo por ID
- `GET /api/articles/slug/:slug` - Buscar artigo por slug
- `POST /api/articles` - Criar novo artigo
- `PUT /api/articles/:id` - Atualizar artigo
- `DELETE /api/articles/:id` - Deletar artigo

### Health Check
- `GET /health` - Status da API


## 🎯 Funcionalidades Implementadas

### ✅ Requisitos Obrigatórios
- [x] Next.js com App Router
- [x] Tailwind CSS
- [x] Componentização e reuso
- [x] SEO técnico (metatags, Open Graph)
- [x] Core Web Vitals otimizados
- [x] Testes unitários (Jest + Testing Library)
- [x] API REST com Node.js + Express
- [x] Endpoints `/articles` e `/articles/:id`
- [x] Banco SQLite com Prisma
- [x] Cache simples em memória
- [x] Listagem de artigos
- [x] Página de detalhe do artigo
- [x] Responsividade (mobile first)
- [x] Imagens otimizadas


## 🔍 SEO

- Metatags dinâmicas por página
- Open Graph para redes sociais
- Twitter Cards
- URLs amigáveis (slug)
- Imagens otimizadas
- Estrutura semântica HTML

## 🚀 Performance

- Imagens otimizadas com Next.js Image
- Lazy loading de componentes
- Cache em memória no backend
- Bundle splitting automático
- CSS otimizado com Tailwind

## 👨‍💻 Autor

**Felipe Sousa** - Desenvolvedor Full Stack