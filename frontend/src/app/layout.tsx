import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { title } from 'process';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Canal Tech - Portal de Notícias de Tecnologia',
    template: '%s | Canal Tech',
  },
  description:
    'Portal de notícias sobre tecnologia, inovação e tendências do mundo digital. Fique por dentro das últimas novidades em tecnologia.',
  keywords: ['tecnologia', 'inovação', 'notícias', 'digital', 'startup', 'IA', 'programação'],
  authors: [{ name: 'Canal Tech' }],
  creator: 'Canal Tech',
  publisher: 'Canal Tech',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('http://localhost:3000'),
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'http://localhost:3000',
    title: 'Canal Tech - Portal de Notícias de Tecnologia',
    description: 'Portal de notícias sobre tecnologia, inovação e tendências do mundo digital.',
    siteName: 'Canal Tech',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Canal Tech - Portal de Notícias de Tecnologia',
    description: 'Portal de notícias sobre tecnologia, inovação e tendências do mundo digital.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
