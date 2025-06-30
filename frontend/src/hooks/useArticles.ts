import { useState, useEffect } from 'react';
import { Article } from '@/types/article';
import { apiClient } from '@/lib/api';

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient.getArticles();

        if (response.success) {
          setArticles(response.data);
        } else {
          setError(response.error || 'Erro ao carregar artigos');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return { articles, loading, error };
};
