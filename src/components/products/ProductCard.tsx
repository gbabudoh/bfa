"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Heart, Shield, MapPin, Star, Store } from 'lucide-react';

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

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export default function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  if (viewMode === 'list') {
    return (
      <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 active:scale-[0.995]">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-64 h-64 bg-gray-100 relative shrink-0">
            <div className="absolute inset-0 bg-yellow-200 flex items-center justify-center text-yellow-300">
               <ShoppingBag className="h-16 w-16 opacity-20" />
            </div>
            {product.images && product.images[0] && (
              <div className="absolute inset-0">
                 <Image 
                  src={product.images[0]} 
                  alt={product.name} 
                  fill
                  sizes="(max-width: 768px) 100vw, 256px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.isWholesale && (
                <span className="bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  Wholesale
                </span>
              )}
              {product.stock <= 0 && (
                <span className="bg-red-600/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  Out of Stock
                </span>
              )}
            </div>
          </div>
          
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                 <div>
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-[10px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-sm mb-2">
                      {product.category}
                    </span>
                    <h3 className="text-2xl font-black text-gray-900 group-hover:text-yellow-600 transition-colors">
                      {product.name}
                    </h3>
                 </div>
                 <button className="text-gray-300 hover:text-red-500 transition-colors cursor-pointer">
                    <Heart className="h-7 w-7" />
                 </button>
              </div>
              
              <div className="flex items-center space-x-3 mb-4">
                <Link href={`/vendors/${product.vendor.id}`} className="flex items-center text-sm font-bold text-gray-600 hover:text-yellow-600 transition">
                  {product.vendor.isVerified ? <Star className="h-4 w-4 text-yellow-500 mr-1.5" /> : <Store className="h-4 w-4 text-gray-400 mr-1.5" />}
                  {product.vendor.storeName}
                </Link>
                <span className="text-gray-300">•</span>
                <span className="text-sm font-medium text-gray-500 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {product.vendor.location}
                </span>
              </div>
              
              <p className="text-gray-600 line-clamp-2 mb-6">
                {product.description}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-t border-gray-50 pt-6">
              <div className="space-y-1">
                {product.isRetail && (
                  <div className="flex items-baseline">
                    <span className="text-2xl font-black text-gray-900">{product.currency} {product.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-400 font-medium ml-2">/ unit</span>
                  </div>
                )}
                {product.isWholesale && product.wholesalePrice && (
                  <div className="text-sm font-medium text-gray-500 bg-blue-50 border border-blue-100 rounded-lg px-3 py-1 inline-block">
                    <span className="font-bold text-blue-700">Bulk Price:</span> {product.currency} {product.wholesalePrice.toLocaleString()} 
                    <span className="ml-2 opacity-60">(min. {product.minWholesaleQty} units)</span>
                  </div>
                )}
              </div>
              
              <Link 
                href={`/products/${product.id}`}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-xl font-bold transition flex items-center justify-center cursor-pointer shadow-lg shadow-yellow-100 active:scale-95"
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                View Details & Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full active:scale-[0.99]">
      <Link href={`/products/${product.id}`} className="block flex-1">
        <div className="h-52 bg-gray-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-yellow-100 flex items-center justify-center text-yellow-300">
             <ShoppingBag className="h-12 w-12 opacity-20" />
          </div>
          
          {product.images && product.images[0] && (
            <div className="absolute inset-0">
               <Image 
                src={product.images[0]} 
                alt={product.name} 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          )}
          
          {/* Status Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isWholesale && (
              <span className="bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                Wholesale
              </span>
            )}
            {product.stock <= 0 && (
              <span className="bg-red-600/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                Out of Stock
              </span>
            )}
          </div>
          
          <button className="absolute top-3 right-3 bg-white/80 hover:bg-white backdrop-blur-md p-1.5 rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm cursor-pointer z-10">
            <Heart className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-5 flex-1 flex flex-col">
          <div className="mb-2">
            <span className="inline-block bg-yellow-100 text-yellow-800 text-[10px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-sm mb-2">
              {product.category}
            </span>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-yellow-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </div>
          
          <div className="mt-auto pt-4">
            <div className="flex flex-col gap-1 mb-4">
              {product.isRetail && (
                <div className="flex items-baseline">
                  <span className="text-xl font-black text-gray-900">{product.currency} {product.price.toLocaleString()}</span>
                  <span className="text-xs text-gray-400 font-medium ml-1.5">/unit</span>
                </div>
              )}
              {product.isWholesale && product.wholesalePrice && (
                <div className="flex items-center text-xs text-gray-500">
                  <span className="font-bold text-blue-600 mr-1.5">Bulk:</span>
                  <span>{product.currency} {product.wholesalePrice.toLocaleString()} (min. {product.minWholesaleQty})</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between text-xs pt-3 border-t border-gray-50">
              <div className="flex items-center text-gray-600 font-medium">
                <MapPin className="h-3.5 w-3.5 text-gray-400 mr-1" />
                {product.vendor?.location?.split(',')[0]}
              </div>
              <div className="flex items-center">
                 {product.vendor?.isVerified && (
                   <div className="flex items-center bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-[10px] font-bold">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                   </div>
                 )}
              </div>
            </div>
          </div>
        </div>
      </Link>
      
      <div className="p-4 bg-gray-50/50 flex gap-2">
        <Link 
          href={`/products/${product.id}`}
          className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-xl text-xs font-bold transition flex items-center justify-center cursor-pointer shadow-md shadow-yellow-100"
        >
          <ShoppingBag className="h-3.5 w-3.5 mr-1.5" />
          View Details
        </Link>
      </div>
    </div>
  );
}
