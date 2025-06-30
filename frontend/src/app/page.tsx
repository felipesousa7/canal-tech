import { Metadata } from 'next';
import { HomePageClient } from '@/components/home';
import { apiClient } from '@/lib/api';

// Gerar metadados dinâmicos para SEO da página inicial
export async function generateMetadata(): Promise<Metadata> {
  try {
    // Buscar artigos para gerar keywords dinâmicas
    const response = await apiClient.getArticles();

    let keywords = [
      'tecnologia',
      'notícias',
      'inteligência artificial',
      'startups',
      'programação',
      'inovação',
      'digital',
      'IA',
      'tech',
    ];

    if (response.success && response.data && response.data.length > 0) {
      // Extrair tags dos artigos mais recentes para keywords dinâmicas
      const recentArticles = response.data.slice(0, 5);
      const articleTags = recentArticles
        .map((article) => article.tags.split(',').map((tag) => tag.trim()))
        .flat()
        .filter((tag, index, arr) => arr.indexOf(tag) === index); // Remove duplicatas

      keywords = [...keywords, ...articleTags.slice(0, 10)]; // Limita a 10 tags
    }

    const description =
      response.success && response.data && response.data.length > 0
        ? `Portal de notícias sobre tecnologia com ${response.data.length} artigos sobre inovação, IA, startups e programação. Fique por dentro das últimas novidades em tecnologia.`
        : 'Portal de notícias sobre tecnologia, inovação e tendências do mundo digital. Fique por dentro das últimas novidades em inteligência artificial, startups, programação e inovação digital.';

    return {
      title: 'Canal Tech - Portal de Notícias de Tecnologia',
      description,
      keywords,
      openGraph: {
        title: 'Canal Tech - Portal de Notícias de Tecnologia',
        description,
        type: 'website',
        url: 'http://localhost:3000',
        siteName: 'Canal Tech',
        images: [
          {
            url: 'http://localhost:3000/og-image.jpg',
            width: 1200,
            height: 630,
            alt: 'Canal Tech - Portal de Notícias de Tecnologia',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Canal Tech - Portal de Notícias de Tecnologia',
        description,
        images: ['http://localhost:3000/og-image.jpg'],
      },
      alternates: {
        canonical: 'http://localhost:3000',
      },
    };
  } catch (error) {
    // Fallback para metadados estáticos em caso de erro
    return {
      title: 'Canal Tech - Portal de Notícias de Tecnologia',
      description: 'Portal de notícias sobre tecnologia, inovação e tendências do mundo digital.',
      keywords: [
        'tecnologia',
        'notícias',
        'inteligência artificial',
        'startups',
        'programação',
        'inovação',
        'digital',
        'IA',
        'tech',
      ],
    };
  }
}

export default function HomePage() {
  return <HomePageClient />;
}
