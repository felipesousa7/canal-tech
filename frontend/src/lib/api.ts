import { Article, ApiResponse } from '@/types/article';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  // Buscar todos os artigos
  async getArticles(): Promise<ApiResponse<Article[]>> {
    return this.request<ApiResponse<Article[]>>('/articles');
  }

  // Buscar artigo por ID
  async getArticleById(id: number): Promise<ApiResponse<Article>> {
    return this.request<ApiResponse<Article>>(`/articles/${id}`);
  }

  // Buscar artigo por slug
  async getArticleBySlug(slug: string): Promise<ApiResponse<Article>> {
    return this.request<ApiResponse<Article>>(`/articles/slug/${slug}`);
  }

  // Criar novo artigo
  async createArticle(
    articleData: Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'publishedAt'>,
  ): Promise<ApiResponse<Article>> {
    return this.request<ApiResponse<Article>>('/articles', {
      method: 'POST',
      body: JSON.stringify(articleData),
    });
  }

  // Atualizar artigo
  async updateArticle(id: number, articleData: Partial<Article>): Promise<ApiResponse<Article>> {
    return this.request<ApiResponse<Article>>(`/articles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(articleData),
    });
  }

  // Deletar artigo
  async deleteArticle(id: number): Promise<ApiResponse<Article>> {
    return this.request<ApiResponse<Article>>(`/articles/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();
