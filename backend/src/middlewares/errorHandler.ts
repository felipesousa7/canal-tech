import { Request, Response, NextFunction } from 'express';
import { AppError, InternalServerError } from '../types/errors';
import { ApiResponse } from '../types/article';

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('Erro capturado pelo middleware:', error);

  let appError: AppError;

  // Se já é um AppError, usa ele
  if (error instanceof AppError) {
    appError = error;
  } else {
    // Se não é um AppError, converte para InternalServerError
    appError = new InternalServerError(error.message);
  }

  const response: ApiResponse<never> = {
    success: false,
    error: appError.message,
    message: appError.message,
  };

  res.status(appError.statusCode).json(response);
}

// Middleware para rotas não encontradas (404)
export function notFoundHandler(req: Request, res: Response): void {
  const response: ApiResponse<never> = {
    success: false,
    error: 'Rota não encontrada',
    message: `A rota ${req.originalUrl} não existe`,
  };

  res.status(404).json(response);
}

// Middleware para capturar erros assíncronos
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
