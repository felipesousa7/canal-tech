import {
  Article,
  CreateArticleData,
  UpdateArticleData,
  ArticleResponse,
  ValidationResult,
} from '../types/article';

export class ArticleDTO {
  static toResponse(article: Article): ArticleResponse {
    const response: ArticleResponse = {
      id: article.id,
      title: article.title,
      content: article.content,
      excerpt: article.excerpt,
      author: article.author,
      publishedAt: article.publishedAt,
      slug: article.slug,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
    };

    if (article.featuredImage !== undefined) {
      response.featuredImage = article.featuredImage;
    }
    if (article.tags !== undefined) {
      response.tags = article.tags;
    }

    return response;
  }

  static toResponseList(articles: Article[]): ArticleResponse[] {
    return articles.map(article => this.toResponse(article));
  }

  static toCreate(articleData: Partial<CreateArticleData>): CreateArticleData {
    const createData: CreateArticleData = {
      title: articleData.title!,
      content: articleData.content!,
      excerpt: articleData.excerpt!,
      author: articleData.author!,
      slug: articleData.slug!,
      publishedAt: articleData.publishedAt || new Date(),
    };

    if (articleData.featuredImage !== undefined) {
      createData.featuredImage = articleData.featuredImage;
    }
    if (articleData.tags !== undefined) {
      createData.tags = articleData.tags;
    }

    return createData;
  }

  static toUpdate(articleData: Partial<UpdateArticleData>): UpdateArticleData {
    const updateData: UpdateArticleData = {};

    if (articleData.title !== undefined) updateData.title = articleData.title;
    if (articleData.content !== undefined)
      updateData.content = articleData.content;
    if (articleData.excerpt !== undefined)
      updateData.excerpt = articleData.excerpt;
    if (articleData.author !== undefined)
      updateData.author = articleData.author;
    if (articleData.slug !== undefined) updateData.slug = articleData.slug;
    if (articleData.featuredImage !== undefined)
      updateData.featuredImage = articleData.featuredImage;
    if (articleData.tags !== undefined) updateData.tags = articleData.tags;
    if (articleData.publishedAt !== undefined)
      updateData.publishedAt = articleData.publishedAt;

    return updateData;
  }

  static validateCreate(
    articleData: Partial<CreateArticleData>
  ): ValidationResult {
    const errors: string[] = [];

    if (!articleData.title) errors.push('Título é obrigatório');
    if (!articleData.content) errors.push('Conteúdo é obrigatório');
    if (!articleData.excerpt) errors.push('Resumo é obrigatório');
    if (!articleData.author) errors.push('Autor é obrigatório');
    if (!articleData.slug) errors.push('Slug é obrigatório');

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
