import { useState, useEffect } from 'react';
import { Article } from '@/types/article';
import { apiClient } from '@/lib/api';

export const useArticle = (slug: string) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) {
        setError('Slug é obrigatório');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await apiClient.getArticleBySlug(slug);

        if (response.success) {
          setArticle(response.data);
        } else {
          setError(response.error || 'Artigo não encontrado');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  return { article, loading, error };
};
