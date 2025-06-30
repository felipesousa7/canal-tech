'use client';

import { useArticles } from '@/hooks/useArticles';
import { ArticleList } from '@/components/articles/ArticleList';

export function HomePageClient() {
  const { articles, loading, error } = useArticles();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Canal Tech</h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            As últimas notícias e tendências em tecnologia
          </p>
          <p className="text-lg text-blue-200 max-w-3xl mx-auto">
            Fique por dentro das novidades em inteligência artificial, startups, programação e
            inovação digital.
          </p>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Últimas Notícias</h2>
            <p className="text-gray-600">Descubra as principais novidades do mundo da tecnologia</p>
          </div>

          <ArticleList articles={articles} loading={loading} error={error} />
        </div>
      </section>
    </div>
  );
}
