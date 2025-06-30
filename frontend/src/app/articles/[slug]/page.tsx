import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { apiClient } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

// Gerar metadados dinâmicos para SEO
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const response = await apiClient.getArticleBySlug(slug);

    if (!response.success || !response.data) {
      return {
        title: 'Artigo não encontrado',
        description: 'O artigo que você está procurando não existe.',
      };
    }

    const article = response.data;

    return {
      title: article.title,
      description: article.excerpt,
      keywords: article.tags.split(',').map((tag) => tag.trim()),
      authors: [{ name: article.author }],
      openGraph: {
        title: article.title,
        description: article.excerpt,
        type: 'article',
        url: `http://localhost:3000/articles/${article.slug}`,
        images: [
          {
            url: article.featuredImage,
            width: 1200,
            height: 630,
            alt: article.title,
          },
        ],
        authors: [article.author],
        publishedTime: article.publishedAt,
        modifiedTime: article.updatedAt,
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.excerpt,
        images: [article.featuredImage],
      },
    };
  } catch (error) {
    return {
      title: 'Erro ao carregar artigo',
      description: 'Ocorreu um erro ao carregar o artigo.',
    };
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  try {
    const { slug } = await params;
    const response = await apiClient.getArticleBySlug(slug);

    if (!response.success || !response.data) {
      notFound();
    }

    const article = response.data;

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    };

    const formatTags = (tags: string) => {
      return tags.split(',').map((tag) => tag.trim());
    };

    // Dados estruturados Schema.org
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.excerpt,
      image: article.featuredImage,
      author: {
        '@type': 'Person',
        name: article.author,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Canal Tech',
        logo: {
          '@type': 'ImageObject',
          url: 'http://localhost:3000/logo.png',
        },
      },
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `http://localhost:3000/articles/${article.slug}`,
      },
      keywords: article.tags,
      articleSection: 'Tecnologia',
    };

    return (
      <>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <div className="min-h-screen bg-gray-50">
          <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
                ← Voltar para a página inicial
              </Link>
            </nav>

            {/* Article Header */}
            <header className="mb-8">
              <div className="mb-4">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span>{article.author}</span>
                  <span className="mx-2">•</span>
                  <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {article.title}
              </h1>

              <p className="text-xl text-gray-600 mb-6 leading-relaxed">{article.excerpt}</p>
            </header>

            {/* Featured Image */}
            <div className="relative h-96 md:h-[500px] mb-8 rounded-lg overflow-hidden">
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                {article.content}
              </div>
            </div>

            {/* Tags */}
            {article.tags && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {formatTags(article.tags).map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Back to Home */}
            <div className="mt-12 pt-8 border-t border-gray-200 text-center">
              <Link href="/">
                <Button variant="outline" size="lg">
                  Ver mais artigos
                </Button>
              </Link>
            </div>
          </article>
        </div>
      </>
    );
  } catch (error) {
    notFound();
  }
}
