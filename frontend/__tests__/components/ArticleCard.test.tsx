import React from 'react';
import { render, screen } from '@testing-library/react';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { Article } from '@/types/article';

const mockArticle: Article = {
  id: 1,
  title: 'Teste de Artigo',
  content: 'Conteúdo de teste do artigo',
  excerpt: 'Resumo do artigo de teste',
  author: 'João Silva',
  publishedAt: '2024-01-15T10:00:00.000Z',
  slug: 'teste-artigo',
  createdAt: '2024-01-15T10:00:00.000Z',
  updatedAt: '2024-01-15T10:00:00.000Z',
  featuredImage: 'https://example.com/image.jpg',
  tags: 'tecnologia,teste,artigo',
};

describe('ArticleCard', () => {
  it('renders article information correctly', () => {
    render(<ArticleCard article={mockArticle} />);

    // Verifica se o título está sendo renderizado
    expect(screen.getByText('Teste de Artigo')).toBeInTheDocument();

    // Verifica se o resumo está sendo renderizado
    expect(screen.getByText('Resumo do artigo de teste')).toBeInTheDocument();

    // Verifica se o autor está sendo renderizado
    expect(screen.getByText('João Silva')).toBeInTheDocument();

    // Verifica se a data está sendo renderizada (formato brasileiro)
    expect(screen.getByText('15/01/2024')).toBeInTheDocument();

    // Verifica se o botão "Ler mais" está presente
    expect(screen.getByText('Ler mais')).toBeInTheDocument();
  });

  it('renders article image with correct alt text', () => {
    render(<ArticleCard article={mockArticle} />);

    const image = screen.getByAltText('Teste de Artigo');
    expect(image).toBeInTheDocument();
  });

  it('renders link to article detail page', () => {
    render(<ArticleCard article={mockArticle} />);

    const link = screen.getByRole('link', { name: /Teste de Artigo/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/articles/teste-artigo');
  });

  it('handles article without tags gracefully', () => {
    const articleWithoutTags = {
      ...mockArticle,
      tags: '',
    };

    render(<ArticleCard article={articleWithoutTags} />);

    // Verifica se o componente ainda renderiza sem tags
    expect(screen.getByText('Teste de Artigo')).toBeInTheDocument();
    expect(screen.getByText('Resumo do artigo de teste')).toBeInTheDocument();
  });
});
