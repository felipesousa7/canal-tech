export interface Article {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  featuredImage: string;
  tags: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  error?: string;
}

export interface CreateArticleData {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  slug: string;
  tags: string;
  featuredImage?: string;
}
