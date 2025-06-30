import { ArticleRepository } from '../repositories/ArticleRepository';
import { ArticleDTO } from '../dtos/ArticleDTO';
import {
  CreateArticleData,
  UpdateArticleData,
  ArticleResponse,
} from '../types/article';
import {
  NotFoundError,
  ValidationError,
  ConflictError,
  InternalServerError,
} from '../types/errors';

export class ArticleService {
  private articleRepository: ArticleRepository;

  constructor() {
    this.articleRepository = new ArticleRepository();
  }

  async getAllArticles(): Promise<ArticleResponse[]> {
    try {
      const articles = await this.articleRepository.findAll();
      return ArticleDTO.toResponseList(articles);
    } catch (error) {
      throw new InternalServerError(
        `Erro ao buscar artigos: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
      );
    }
  }

  async getArticleById(id: number): Promise<ArticleResponse> {
    try {
      const article = await this.articleRepository.findById(id);

      if (!article) {
        throw new NotFoundError('Artigo não encontrado');
      }

      return ArticleDTO.toResponse(article);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InternalServerError(
        `Erro ao buscar artigo: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
      );
    }
  }

  async getArticleBySlug(slug: string): Promise<ArticleResponse> {
    try {
      const article = await this.articleRepository.findBySlug(slug);

      if (!article) {
        throw new NotFoundError('Artigo não encontrado');
      }

      return ArticleDTO.toResponse(article);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InternalServerError(
        `Erro ao buscar artigo por slug: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
      );
    }
  }

  async createArticle(
    articleData: Partial<CreateArticleData>
  ): Promise<ArticleResponse> {
    try {
      // Validação dos dados
      const validation = ArticleDTO.validateCreate(articleData);
      if (!validation.isValid) {
        throw new ValidationError(
          `Dados inválidos: ${validation.errors.join(', ')}`
        );
      }

      // Verifica se já existe um artigo com o mesmo slug
      const existingArticle = await this.articleRepository.findBySlug(
        articleData.slug!
      );
      if (existingArticle) {
        throw new ConflictError('Já existe um artigo com este slug');
      }

      // Converte dados para o formato do banco
      const articleToCreate = ArticleDTO.toCreate(articleData);

      // Cria o artigo
      const createdArticle =
        await this.articleRepository.create(articleToCreate);

      return ArticleDTO.toResponse(createdArticle);
    } catch (error) {
      if (error instanceof ValidationError || error instanceof ConflictError) {
        throw error;
      }
      throw new InternalServerError(
        `Erro ao criar artigo: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
      );
    }
  }

  async updateArticle(
    id: number,
    articleData: Partial<UpdateArticleData>
  ): Promise<ArticleResponse> {
    try {
      // Verifica se o artigo existe
      const existingArticle = await this.articleRepository.findById(id);
      if (!existingArticle) {
        throw new NotFoundError('Artigo não encontrado');
      }

      // Se está tentando atualizar o slug, verifica se já existe
      if (articleData.slug && articleData.slug !== existingArticle.slug) {
        const articleWithSlug = await this.articleRepository.findBySlug(
          articleData.slug
        );
        if (articleWithSlug) {
          throw new ConflictError('Já existe um artigo com este slug');
        }
      }

      // Converte dados para o formato do banco
      const articleToUpdate = ArticleDTO.toUpdate(articleData);

      // Atualiza o artigo
      const updatedArticle = await this.articleRepository.update(
        id,
        articleToUpdate
      );

      return ArticleDTO.toResponse(updatedArticle);
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof ConflictError) {
        throw error;
      }
      throw new InternalServerError(
        `Erro ao atualizar artigo: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
      );
    }
  }

  async deleteArticle(id: number): Promise<{ message: string }> {
    try {
      // Verifica se o artigo existe
      const existingArticle = await this.articleRepository.findById(id);
      if (!existingArticle) {
        throw new NotFoundError('Artigo não encontrado');
      }

      // Deleta o artigo
      await this.articleRepository.delete(id);

      return { message: 'Artigo deletado com sucesso' };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InternalServerError(
        `Erro ao deletar artigo: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
      );
    }
  }

  async disconnect(): Promise<void> {
    await this.articleRepository.disconnect();
  }
}
