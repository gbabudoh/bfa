"use client";

import React from 'react';
import ProductCard from './ProductCard';

interface Vendor {
  id: string;
  storeName: string;
  isVerified: boolean;
  location: string | null;
  businessType: string | null;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  wholesalePrice: number | null;
  minWholesaleQty: number | null;
  isWholesale: boolean;
  isRetail: boolean;
  images: string[];
  category: string;
  stock: number;
  currency: string;
  vendor: Vendor;
}

interface ProductGridProps {
  products: Product[];
  viewMode?: 'grid' | 'list';
  isLoading?: boolean;
}

export default function ProductGrid({ products, viewMode = 'grid', isLoading = false }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-2xl h-80 animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
        <div className="bg-yellow-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-500">Try adjusting your filters or browse other categories.</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} viewMode={viewMode} />
      ))}
    </div>
  );
}
