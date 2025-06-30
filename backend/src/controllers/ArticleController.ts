import { Request, Response } from 'express';
import { ArticleService } from '../services/ArticleService';
import {
  CreateArticleData,
  UpdateArticleData,
  ApiResponse,
  ArticleResponse,
} from '../types/article';
import { asyncHandler } from '../middlewares/errorHandler';
import { ValidationError } from '../types/errors';

export class ArticleController {
  private articleService: ArticleService;

  constructor() {
    this.articleService = new ArticleService();
  }

  getAllArticles = asyncHandler(async (_req: Request, res: Response) => {
    const articles = await this.articleService.getAllArticles();

    const response: ApiResponse<ArticleResponse[]> = {
      success: true,
      data: articles,
      message: 'Artigos recuperados com sucesso',
    };

    res.status(200).json(response);
  });

  getArticleById = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params['id'] || '0');
    if (isNaN(id)) {
      throw new ValidationError('ID deve ser um número válido');
    }

    const article = await this.articleService.getArticleById(id);

    const response: ApiResponse<ArticleResponse> = {
      success: true,
      data: article,
      message: 'Artigo recuperado com sucesso',
    };

    res.status(200).json(response);
  });

  getArticleBySlug = asyncHandler(async (req: Request, res: Response) => {
    const slug = req.params['slug'];
    if (!slug) {
      throw new ValidationError('Slug é obrigatório');
    }

    const article = await this.articleService.getArticleBySlug(slug);

    const response: ApiResponse<ArticleResponse> = {
      success: true,
      data: article,
      message: 'Artigo recuperado com sucesso',
    };

    res.status(200).json(response);
  });

  createArticle = asyncHandler(async (req: Request, res: Response) => {
    const articleData: Partial<CreateArticleData> = req.body;
    const createdArticle = await this.articleService.createArticle(articleData);

    const response: ApiResponse<ArticleResponse> = {
      success: true,
      data: createdArticle,
      message: 'Artigo criado com sucesso',
    };

    res.status(201).json(response);
  });

  updateArticle = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params['id'] || '0');
    if (isNaN(id)) {
      throw new ValidationError('ID deve ser um número válido');
    }

    const articleData: Partial<UpdateArticleData> = req.body;
    const updatedArticle = await this.articleService.updateArticle(
      id,
      articleData
    );

    const response: ApiResponse<ArticleResponse> = {
      success: true,
      data: updatedArticle,
      message: 'Artigo atualizado com sucesso',
    };

    res.status(200).json(response);
  });

  deleteArticle = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params['id'] || '0');
    if (isNaN(id)) {
      throw new ValidationError('ID deve ser um número válido');
    }

    const result = await this.articleService.deleteArticle(id);

    const response: ApiResponse<{ message: string }> = {
      success: true,
      data: result,
      message: 'Artigo deletado com sucesso',
    };

    res.status(200).json(response);
  });

  async disconnect(): Promise<void> {
    await this.articleService.disconnect();
  }
}
