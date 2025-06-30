import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import articlesRoutes from './routes/articles';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';
import { articlesCacheMiddleware } from './middlewares/cacheMiddleware';

dotenv.config();

const app = express();
const PORT = process.env['PORT'] || 3001;

// Middlewares de segurança
app.use(helmet());

// Middleware de CORS
app.use(
  cors({
    origin: process.env['FRONTEND_URL'] || 'http://localhost:3000',
    credentials: true,
  })
);

// Middleware de logging
app.use(morgan('combined'));

// Middleware para parsing de JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware de cache para artigos
app.use('/api/articles', articlesCacheMiddleware);

// Rotas da API
app.use('/api/articles', articlesRoutes);

// Rota de health check
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env['NODE_ENV'] || 'development',
  });
});

// Rota raiz
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'API do Portal Canal Tech',
    version: '1.0.0',
    endpoints: {
      articles: '/api/articles',
      health: '/health',
    },
  });
});

// Middleware para rotas não encontradas
app.use('*', notFoundHandler);

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

// Função para iniciar o servidor
function startServer() {
  const server = app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📖 API disponível em: http://localhost:${PORT}`);
    console.log(`🏥 Health check: http://localhost:${PORT}/health`);
    console.log(`📰 Artigos: http://localhost:${PORT}/api/articles`);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('🛑 Recebido SIGTERM, encerrando servidor...');
    server.close(() => {
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('🛑 Recebido SIGINT, encerrando servidor...');
    server.close(() => {
      process.exit(0);
    });
  });

  return server;
}

// Inicialização do servidor apenas se executado diretamente
if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export default app;
