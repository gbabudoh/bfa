"use client";

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Package,
  MoreVertical,
  ArrowUpRight,
  Archive,
  Trash2,
  ShieldAlert,
  ShieldOff,
  Eye,
  LayoutGrid,
  List
} from 'lucide-react';
import Image from 'next/image';

interface Product {
  id: number | string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  status: string;
}

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
}

const ProductCard = ({ product, viewMode }: ProductCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm group hover:shadow-md transition-all flex items-center p-3 gap-4">
        <div className="h-16 w-16 relative flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden">
          <Image 
            src={product.image} 
            alt={product.name} 
            fill 
            style={{objectFit: 'cover'}}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-bold text-gray-900 truncate">{product.name}</h3>
            <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest ${
              product.status === 'LOW_STOCK' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-400'
            }`}>
              {product.status.replace('_', ' ')}
            </span>
          </div>
          <p className="text-[10px] font-bold text-yellow-600 uppercase tracking-widest leading-none mt-0.5">{product.category}</p>
        </div>
        <div className="text-right px-4 hidden sm:block">
          <p className="text-sm font-black text-gray-900">${product.price}</p>
          <p className="text-[10px] font-bold text-gray-400">Stock: {product.stock}</p>
        </div>
        <div className="relative">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-gray-50 p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
          >
            <MoreVertical size={18} className="cursor-pointer" />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-100 rounded-xl shadow-xl py-1 z-10 animate-in fade-in zoom-in-95">
                <button className="flex items-center w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 font-bold cursor-pointer">
                    <Eye size={12} className="mr-2 text-indigo-500 cursor-pointer" /> Monitor & Review
                </button>
                <button className="flex items-center w-full px-3 py-1.5 text-xs text-amber-600 hover:bg-amber-50 font-bold cursor-pointer border-t border-gray-50 mt-1 pt-1.5">
                    <ShieldAlert size={12} className="mr-2 cursor-pointer" /> Suspend
                </button>
                <button className="flex items-center w-full px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 font-bold cursor-pointer">
                    <ShieldOff size={12} className="mr-2 cursor-pointer" /> Terminate
                </button>
                <div className="h-px bg-gray-100 my-1"></div>
                <button className="flex items-center w-full px-3 py-1.5 text-xs text-red-700 hover:bg-red-100 font-bold cursor-pointer">
                    <Trash2 size={12} className="mr-2 cursor-pointer" /> Delete
                </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-all">
      <div className="aspect-square relative bg-gray-50 overflow-hidden">
        <Image 
          src={product.image} 
          alt={product.name} 
          fill 
          style={{objectFit: 'cover'}}
          className="group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2">
            <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm text-gray-600 hover:bg-white transition-colors cursor-pointer"
            >
                <MoreVertical size={16} className="cursor-pointer" />
            </button>
            {isMenuOpen && (
                <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-100 rounded-xl shadow-xl py-1 z-10 animate-in fade-in zoom-in-95">
                    <button className="flex items-center w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 font-bold cursor-pointer">
                        <Eye size={12} className="mr-2 text-indigo-500 cursor-pointer" /> Monitor & Review
                    </button>
                    <button className="flex items-center w-full px-3 py-1.5 text-xs text-amber-600 hover:bg-amber-50 font-bold cursor-pointer border-t border-gray-50 mt-1 pt-1.5">
                        <ShieldAlert size={12} className="mr-2 cursor-pointer" /> Suspend Product
                    </button>
                    <button className="flex items-center w-full px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 font-bold cursor-pointer">
                        <ShieldOff size={12} className="mr-2 cursor-pointer" /> Terminate Link
                    </button>
                    <div className="h-px bg-gray-100 my-1"></div>
                    <button className="flex items-center w-full px-3 py-1.5 text-xs text-red-700 hover:bg-red-100 font-bold cursor-pointer">
                        <Trash2 size={12} className="mr-2 cursor-pointer" /> Delete Entry
                    </button>
                </div>
            )}
        </div>
        {product.status === 'LOW_STOCK' && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded tracking-widest uppercase">
                Low Stock
            </div>
        )}
      </div>
      <div className="p-4 space-y-2">
        <p className="text-[10px] font-bold text-yellow-600 uppercase tracking-widest">{product.category}</p>
        <h3 className="text-sm font-bold text-gray-900 truncate">{product.name}</h3>
        <div className="flex justify-between items-center pt-2">
            <p className="text-sm font-black text-gray-900">${product.price}</p>
            <p className="text-[10px] font-bold text-gray-400">Stock: {product.stock}</p>
        </div>
      </div>
    </div>
  );
};

export default function AdminProductsPage() {
  const [activeTab, setActiveTab ] = useState('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const mockProducts = [
    { id: 1, name: 'Handwoven Zulu Basket', category: 'Arts & Crafts', price: 45.00, stock: 12, image: '/images/products/placeholder.jpg', status: 'ACTIVE' },
    { id: 2, name: 'Ethiopian Coffee Beans', category: 'Food & Agriculture', price: 22.50, stock: 4, image: '/images/products/placeholder.jpg', status: 'LOW_STOCK' },
    { id: 3, name: 'Egyptian Cotton Towels', category: 'Textiles', price: 35.00, stock: 85, image: '/images/products/placeholder.jpg', status: 'ACTIVE' },
    { id: 4, name: 'Moroccan Leather Bag', category: 'Fashion', price: 120.00, stock: 8, image: '/images/products/placeholder.jpg', status: 'ACTIVE' },
    { id: 5, name: 'Nigerian Bronze Statue', category: 'Arts & Crafts', price: 210.00, stock: 2, image: '/images/products/placeholder.jpg', status: 'LOW_STOCK' },
    { id: 6, name: 'Senegalese Shea Butter', category: 'Beauty', price: 18.00, stock: 154, image: '/images/products/placeholder.jpg', status: 'ACTIVE' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Global Catalog</h1>
          <p className="text-gray-500 mt-1 font-medium italic">Monitor and curate products across all vendor shops.</p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total SKU</p>
                  <p className="text-xl font-bold text-gray-900">8,492</p>
              </div>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg cursor-pointer">
                  <Package size={20} className="cursor-pointer" />
              </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Low Stock Alerts</p>
                  <p className="text-xl font-bold text-red-600">42</p>
              </div>
              <div className="p-2 bg-red-50 text-red-600 rounded-lg cursor-pointer">
                  <Archive size={20} className="cursor-pointer" />
              </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Top Category</p>
                  <p className="text-xl font-bold text-gray-900">Textiles</p>
              </div>
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-black cursor-pointer">
                  <ArrowUpRight size={20} className="cursor-pointer" />
              </div>
          </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex space-x-1 p-1 bg-gray-50 rounded-xl w-full md:w-auto">
          {['ALL', 'ACTIVE', 'LOW_STOCK', 'ARCHIVED'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-[10px] font-black tracking-widest uppercase rounded-lg transition-all cursor-pointer ${
                activeTab === tab 
                  ? 'bg-white text-yellow-600 shadow-sm' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto px-4">
          <div className="flex items-center bg-gray-50 p-1 rounded-xl border border-gray-100">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${viewMode === 'grid' ? 'bg-white text-yellow-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${viewMode === 'list' ? 'bg-white text-yellow-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List size={18} />
            </button>
          </div>
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 cursor-pointer" size={18} />
            <input 
              type="text" 
              placeholder="Search catalog..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white transition-all outline-none"
            />
          </div>
          <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer">
            <Filter size={20} className="cursor-pointer" />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
        : "flex flex-col gap-3"
      }>
          {mockProducts.map(product => (
              <ProductCard key={product.id} product={product} viewMode={viewMode} />
          ))}
      </div>
      
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex justify-center">
          <button className="text-sm font-bold text-gray-500 hover:text-yellow-600 transition-colors cursor-pointer">Load More Products</button>
      </div>
    </div>
  );
}
