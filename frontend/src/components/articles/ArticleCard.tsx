import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types/article';
import { Button } from '@/components/ui/Button';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatTags = (tags: string) => {
    return tags.split(',').slice(0, 3).join(', ');
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={article.featuredImage}
          alt={article.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>

      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span>{article.author}</span>
          <span className="mx-2">•</span>
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
          <Link href={`/articles/${article.slug}`} className="block">
            {article.title}
          </Link>
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>

        {article.tags && (
          <div className="mb-4">
            <span className="text-xs text-gray-500">Tags: {formatTags(article.tags)}</span>
          </div>
        )}

        <Link href={`/articles/${article.slug}`}>
          <Button variant="outline" size="sm" className="w-full">
            Ler mais
          </Button>
        </Link>
      </div>
    </article>
  );
};
