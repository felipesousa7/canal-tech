import { Request, Response, NextFunction } from 'express';

// Cache simples em memória
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

export const articlesCacheMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.method === 'GET') {
    const cacheKey = req.originalUrl;
    const cached = cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      res.json(cached.data);
      return;
    }

    // Intercepta a resposta para cachear
    const originalJson = res.json;
    res.json = function (data: unknown) {
      cache.set(cacheKey, {
        data,
        timestamp: Date.now(),
      });
      return originalJson.call(this, data);
    };
  }
  next();
};
