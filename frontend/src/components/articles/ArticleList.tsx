import React from 'react';
import { Article } from '@/types/article';
import { ArticleCard } from './ArticleCard';
import { ArticleListSkeleton } from '@/components/ui/Loading';

interface ArticleListProps {
  articles: Article[];
  loading?: boolean;
  error?: string | null;
}

export const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  loading = false,
  error = null,
}) => {
  if (loading) {
    return <ArticleListSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg font-medium mb-2">Erro ao carregar artigos</div>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-600 text-lg font-medium mb-2">Nenhum artigo encontrado</div>
        <p className="text-gray-500">Não há artigos disponíveis no momento.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};
