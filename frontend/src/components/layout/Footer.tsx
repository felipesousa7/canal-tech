import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-blue-400 mb-4">Canal Tech</h3>
            <p className="text-gray-300 text-sm">
              Portal de notícias sobre tecnologia, inovação e tendências do mundo digital.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Links Úteis</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Artigos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <p className="text-gray-300 text-sm mt-2">Email: felipesousa6907@gmail.com</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2025 Canal Tech.</p>
          <p className="text-gray-500 text-xs mt-2">
            Desenvolvido com Next.js, TypeScript e Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};
