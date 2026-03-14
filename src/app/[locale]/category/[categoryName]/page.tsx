import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import ProductGrid from '@/components/products/ProductGrid';
import Link from 'next/link';
import { ChevronRight, LayoutGrid, List } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

interface CategoryPageProps {
  params: {
    categoryName: string;
  };
  searchParams: {
    view?: 'grid' | 'list';
  };
}

interface MiniCategory {
  id: string;
  name: string;
  slug: string;
}

interface FullCategory extends MiniCategory {
  parent?: MiniCategory | null;
  subcategories: MiniCategory[];
}

type PrismaWithCategory = typeof prisma & {
  category: {
    findUnique: (args: unknown) => Promise<unknown>;
  };
};

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { categoryName } = params;
  const viewMode = searchParams.view || 'grid';
  const ct = await getTranslations('Categories');
  const tCat = await getTranslations('CategoryPage');

  // Fetch category by slug using type assertion to avoid Prisma sync delays
  const category = await (prisma as unknown as PrismaWithCategory).category.findUnique({
    where: { slug: categoryName },
    include: {
      subcategories: true,
      parent: true
    }
  }) as FullCategory | null;

  if (!category) {
    notFound();
  }

  // Fetch products for this category
  // If it's a parent category, we might want to fetch products from its subcategories too
  // Since Product.category is a string, we match by name (case-insensitive)
  const categoryNames = [category.name, ...category.subcategories.map((sub: MiniCategory) => sub.name)];
  
  const products = await prisma.product.findMany({
    where: {
      category: {
        in: categoryNames,
        mode: 'insensitive' as const
      }
    },
    include: {
      vendor: {
        select: {
          id: true,
          storeName: true,
          isVerified: true,
          location: true,
          businessType: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 40
  });

  return (
    <div className="min-h-screen bg-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Support */}
        <nav className="flex items-center text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-yellow-600 transition font-medium">{tCat('home')}</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/browse" className="hover:text-yellow-600 transition font-medium">{tCat('breadcrumb')}</Link>
          {category.parent && (
            <>
              <ChevronRight className="h-4 w-4 mx-2" />
              <Link href={`/category/${category.parent.slug}`} className="hover:text-yellow-600 transition font-medium">
                {ct.has(category.parent.slug) ? ct(category.parent.slug) : category.parent.name}
              </Link>
            </>
          )}
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900 font-bold">{ct.has(category.slug) ? ct(category.slug) : category.name}</span>
        </nav>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              {ct.has(category.slug) ? ct(category.slug) : category.name}
            </h1>
            <p className="mt-2 text-gray-600 text-lg font-medium">
              {tCat('description', { category: ct.has(category.slug) ? ct(category.slug) : category.name })}
            </p>
          </div>
          
          <div className="flex items-center bg-white rounded-xl p-1 shadow-sm border border-gray-100">
             <Link 
               href={`/category/${categoryName}?view=grid`}
               className={`p-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-yellow-101 text-yellow-700 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
             >
               <LayoutGrid className="h-5 w-5" />
             </Link>
             <Link 
               href={`/category/${categoryName}?view=list`}
               className={`p-2 rounded-lg transition ${viewMode === 'list' ? 'bg-yellow-101 text-yellow-700 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
             >
               <List className="h-5 w-5" />
             </Link>
          </div>
        </div>

        {/* Subcategories Quick Access */}
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-12">
            {category.subcategories.map((sub: MiniCategory) => (
              <Link 
                key={sub.id}
                href={`/category/${sub.slug}`}
                className="bg-white hover:bg-yellow-50 border border-gray-100 px-4 py-2 rounded-full text-sm font-bold text-gray-700 transition shadow-sm hover:shadow-md"
              >
                {ct.has(sub.slug) ? ct(sub.slug) : sub.name}
              </Link>
            ))}
          </div>
        )}

        <div className="relative">
          <ProductGrid products={products} viewMode={viewMode} />
        </div>
      </div>
    </div>
  );
}
