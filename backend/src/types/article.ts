export interface Article {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: Date;
  slug: string;
  featuredImage?: string;
  tags?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateArticleData {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  slug: string;
  featuredImage?: string;
  tags?: string;
  publishedAt?: Date;
}

export interface UpdateArticleData {
  title?: string;
  content?: string;
  excerpt?: string;
  author?: string;
  slug?: string;
  featuredImage?: string;
  tags?: string;
  publishedAt?: Date;
}

export interface ArticleResponse {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: Date;
  slug: string;
  featuredImage?: string;
  tags?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  error?: string;
}
