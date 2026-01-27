import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Products | Buy from Africa',
  description: 'Discover authentic African products from verified vendors across the continent.',
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Products Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">African Products</h1>
              <p className="mt-2 text-xl text-yellow-100">
                Authentic goods sourced directly from African vendors
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <Link
                href="/browse"
                className="bg-white hover:bg-gray-50 text-yellow-600 px-6 py-3 rounded-lg font-medium transition flex items-center shadow-md"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Browse All Products
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Breadcrumb - This will be visible on all product pages */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center text-sm text-gray-600" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-yellow-600 transition">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <Link href="/browse" className="hover:text-yellow-600 transition">
              Products
            </Link>
            {/* Additional breadcrumb items will be handled by individual product pages */}
          </nav>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      
      {/* Related Products Section - This will appear on all product pages */}
      <section className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Explore Popular Categories</h2>
            <Link 
              href="/browse" 
              className="text-yellow-600 hover:text-yellow-700 font-medium flex items-center"
            >
              View All Categories <ChevronRight className="ml-1 h-5 w-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Textiles & Clothing', slug: 'textiles' },
              { name: 'Arts & Crafts', slug: 'crafts' },
              { name: 'Food & Agriculture', slug: 'food' },
              { name: 'Jewelry & Accessories', slug: 'jewelry' },
            ].map((category, index) => (
              <Link
                key={index}
                href={`/category/${category.slug}`}
                className="bg-yellow-50 hover:bg-yellow-100 p-4 rounded-lg transition text-center"
              >
                <span className="text-gray-900 font-medium">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter CTA - Reused across product pages */}
      <section className="bg-yellow-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-xl font-bold text-gray-900">Stay Updated on New Products</h3>
              <p className="text-gray-700 mt-1">
                Subscribe to receive notifications about new African products and special offers
              </p>
            </div>
            <div className="w-full md:w-auto">
              <form className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full sm:w-64"
                />
                <button
                  type="submit"
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
