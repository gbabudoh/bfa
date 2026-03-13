import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categories | Buy from Africa',
  description: 'Browse products by category from verified African vendors.',
};

export default async function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations('CategoryPage');

  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Category Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{t('sectionTitle')}</h1>
              <p className="mt-2 text-xl text-yellow-100">
                {t('sectionSubtitle')}
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <Link
                href="/browse"
                className="bg-white hover:bg-gray-50 text-yellow-600 px-6 py-3 rounded-lg font-medium transition flex items-center shadow-md"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                {t('browseAll')}
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center text-sm text-gray-600" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-yellow-600 transition">
              {t('home')}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <Link href="/browse" className="hover:text-yellow-600 transition">
              {t('browse')}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <span className="text-gray-900">{t('category')}</span>
          </nav>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
