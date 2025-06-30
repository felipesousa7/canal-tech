import { MetadataRoute } from 'next';
import { apiClient } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Buscar todos os artigos
    const response = await apiClient.getArticles();

    if (!response.success || !response.data) {
      return [
        {
          url: 'http://localhost:3000',
          lastModified: new Date(),
          changeFrequency: 'daily',
          priority: 1,
        },
      ];
    }

    const articles = response.data;
    const baseUrl = 'http://localhost:3000';

    // URLs estáticas
    const staticUrls = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
      },
    ];

    // URLs dos artigos
    const articleUrls = articles.map((article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    return [...staticUrls, ...articleUrls];
  } catch (error) {
    // Fallback em caso de erro
    return [
      {
        url: 'http://localhost:3000',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
    ];
  }
}
