import { PrismaClient } from '@prisma/client';
import {
  Article,
  CreateArticleData,
  UpdateArticleData,
} from '../types/article';

export class ArticleRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  private mapPrismaArticleToArticle(prismaArticle: any): Article {
    return {
      ...prismaArticle,
      featuredImage: prismaArticle.featuredImage || undefined,
      tags: prismaArticle.tags || undefined,
      publishedAt: new Date(prismaArticle.publishedAt),
      createdAt: new Date(prismaArticle.createdAt),
      updatedAt: new Date(prismaArticle.updatedAt),
    };
  }

  async findAll(): Promise<Article[]> {
    try {
      const articles = await this.prisma.article.findMany({
        orderBy: {
          publishedAt: 'desc',
        },
      });

      return articles.map((article: any) => this.mapPrismaArticleToArticle(article));
    } catch (error) {
      throw new Error(
        `Erro ao buscar artigos: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
      );
    }
  }

  async findById(id: number): Promise<Article | null> {
    try {
      const article = await this.prisma.article.findUnique({
        where: { id },
      });

      if (!article) {
        return null;
      }

      return this.mapPrismaArticleToArticle(article);
    } catch (error) {
      throw new Error(
        `Erro ao buscar artigo por ID: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
      );
    }
  }

  async findBySlug(slug: string): Promise<Article | null> {
    try {
      const article = await this.prisma.article.findUnique({
        where: { slug },
      });

      if (!article) {
        return null;
      }

      return this.mapPrismaArticleToArticle(article);
    } catch (error) {
      throw new Error(
        `Erro ao buscar artigo por slug: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
      );
    }
  }

  async create(articleData: CreateArticleData): Promise<Article> {
    try {
      const article = await this.prisma.article.create({
        data: {
          ...articleData,
          publishedAt: articleData.publishedAt || new Date(),
        },
      });

      return this.mapPrismaArticleToArticle(article);
    } catch (error) {
      throw new Error(
        `Erro ao criar artigo: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
      );
    }
  }

  async update(id: number, articleData: UpdateArticleData): Promise<Article> {
    try {
      const article = await this.prisma.article.update({
        where: { id },
        data: articleData,
      });

      return this.mapPrismaArticleToArticle(article);
    } catch (error) {
      throw new Error(
        `Erro ao atualizar artigo: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
      );
    }
  }

  async delete(id: number): Promise<Article> {
    try {
      const article = await this.prisma.article.delete({
        where: { id },
      });

      return this.mapPrismaArticleToArticle(article);
    } catch (error) {
      throw new Error(
        `Erro ao deletar artigo: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
      );
    }
  }

  async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }
}
