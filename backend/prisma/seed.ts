import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

interface ArticleSeedData {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  slug: string;
  featuredImage: string;
  tags: string;
}

async function main(): Promise<void> {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Lê os dados mockados
  const articlesData: ArticleSeedData[] = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'articles.json'), 'utf8')
  );

  // Limpa a tabela antes de inserir
  await prisma.article.deleteMany({});
  console.log('🗑️  Tabela de artigos limpa');

  // Insere os artigos
  for (const articleData of articlesData) {
    const article = await prisma.article.create({
      data: {
        title: articleData.title,
        content: articleData.content,
        excerpt: articleData.excerpt,
        author: articleData.author,
        slug: articleData.slug,
        featuredImage: articleData.featuredImage,
        tags: articleData.tags,
        publishedAt: new Date(),
      },
    });
    console.log(`✅ Artigo criado: ${article.title}`);
  }

  console.log('🎉 Seed concluído com sucesso!');
}

main()
  .catch(e => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
