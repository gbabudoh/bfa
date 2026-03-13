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
  Eye,
  LayoutGrid,
  List,
  ChevronRight,
  RefreshCcw,
  DollarSign,
  Box,
  TrendingUp,
  AlertTriangle,
  Layers,
  Edit2,
  Plus
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
      <div className="bg-white rounded-[1.75rem] border border-gray-100 shadow-sm group hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center p-4 gap-6">
        <div className="h-20 w-20 relative flex-shrink-0 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100/50 shadow-inner group-hover:scale-105 transition-transform duration-500">
          <Image 
            src={product.image} 
            alt={product.name} 
            fill 
            style={{objectFit: 'cover'}}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1.5">
            <h3 className="text-sm font-black text-gray-900 truncate uppercase tracking-tight leading-none">{product.name}</h3>
            {product.status === 'LOW_STOCK' ? (
              <span className="text-[8px] font-black px-2 py-0.5 rounded-lg bg-red-100 text-red-600 border border-red-200 uppercase tracking-widest animate-pulse">
                Depleting Assets
              </span>
            ) : (
              <span className="text-[8px] font-black px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-600 border border-emerald-200 uppercase tracking-widest">
                Active SKU
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100/50">{product.category}</span>
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">SKU-{product.id}</span>
          </div>
        </div>
        <div className="text-right px-6 hidden sm:block border-l border-gray-50">
          <p className="text-base font-black text-gray-900 flex items-center justify-end">
            <DollarSign size={14} className="text-emerald-500 -mr-0.5" />
            {product.price.toFixed(2)}
          </p>
          <div className="flex items-center justify-end gap-1.5 mt-1">
            <Box size={10} className="text-gray-400" />
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.stock} units</p>
          </div>
        </div>
        <div className="relative">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className="text-gray-300 hover:text-gray-900 p-3 rounded-2xl hover:bg-gray-100 transition-all cursor-pointer group/btn"
          >
            <MoreVertical size={20} className="group-hover/btn:rotate-90 transition-transform duration-300" />
          </button>
          {isMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)}></div>
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-[1.75rem] shadow-2xl py-3 z-50 animate-in fade-in zoom-in-95 duration-200 overflow-hidden text-left">
                <div className="px-5 py-3 border-b border-gray-50 mb-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">SKU Analytics</p>
                </div>
                <button className="flex items-center w-full px-5 py-3 text-xs font-black text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors uppercase tracking-widest group/item">
                  <Eye size={16} className="mr-3 text-indigo-400 group-hover/item:text-indigo-600 transition-colors" /> Inventory Dossier
                </button>
                <button className="flex items-center w-full px-5 py-3 text-xs font-black text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors uppercase tracking-widest group/item">
                  <Edit2 size={16} className="mr-3 text-yellow-400 group-hover/item:text-yellow-600 transition-colors" /> Adjust Specs
                </button>
                <div className="h-px bg-gray-100/50 mx-5 my-2"></div>
                <button className="flex items-center w-full px-5 py-3 text-xs font-black text-red-600 hover:bg-red-50 transition-colors uppercase tracking-widest group/item">
                  <Trash2 size={16} className="mr-3 group-hover/item:-translate-y-0.5 transition-transform" /> Excise SKU
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col card-3d">
      <div className="aspect-[16/10] relative bg-gray-50 overflow-hidden">
        <Image 
          src={product.image} 
          alt={product.name} 
          fill 
          style={{objectFit: 'cover'}}
          className="group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-3 right-3 z-10">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className="bg-white/70 backdrop-blur-xl p-2 rounded-xl shadow-lg border border-white/40 text-gray-700 hover:bg-white hover:scale-110 transition-all cursor-pointer group/btn"
          >
            <MoreVertical size={16} className="group-hover/btn:rotate-90 transition-transform duration-300" />
          </button>
          {isMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)}></div>
              <div className="absolute right-0 mt-2 w-52 bg-white/95 backdrop-blur-2xl border border-white/40 rounded-[1.75rem] shadow-2xl py-3 z-50 animate-in fade-in zoom-in-95 duration-200 overflow-hidden text-left">
                <button className="flex items-center w-full px-5 py-3 text-[10px] font-black text-gray-600 hover:bg-gray-50 transition-colors uppercase tracking-widest">
                  <Eye size={14} className="mr-3 text-indigo-400" /> View Specs
                </button>
                <button className="flex items-center w-full px-5 py-3 text-[10px] font-black text-red-600 hover:bg-red-50 transition-colors uppercase tracking-widest">
                  <Trash2 size={14} className="mr-3" /> Excise
                </button>
              </div>
            </>
          )}
        </div>
        {product.status === 'LOW_STOCK' && (
          <div className="absolute top-3 left-3 bg-red-500/90 backdrop-blur-md text-white text-[8px] font-black px-2 py-1 rounded-lg tracking-widest uppercase border border-white/20 shadow-xl animate-pulse">
            Depleting
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col justify-between flex-1 gap-2.5">
        <div>
          <div className="flex justify-between items-start mb-2">
            <span className="text-[8px] font-black text-amber-600 uppercase tracking-[0.2em] bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100/50">{product.category}</span>
            <div className="flex items-center text-[9px] text-gray-400 font-bold uppercase tracking-tighter">
              {product.stock} units
            </div>
          </div>
          <h3 className="text-sm font-black text-gray-900 group-hover:text-amber-600 transition-colors uppercase tracking-tight leading-snug mb-1">{product.name}</h3>
          <p className="text-[9px] text-gray-400 font-bold tracking-tight uppercase">SKU: {product.id}</p>
        </div>
        <div className="flex justify-between items-center pt-3.5 border-t border-gray-50">
          <p className="text-lg font-black text-gray-900 flex items-center leading-none">
            <DollarSign size={16} className="text-emerald-500" />
            {product.price.toFixed(2)}
          </p>
          <button className="flex items-center gap-1.5 p-2 bg-gray-50 rounded-xl text-gray-400 hover:bg-slate-900 hover:text-white transition-all cursor-pointer shadow-inner group/arrow">
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AdminProductsPage() {
  const [activeTab, setActiveTab ] = useState('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isSyncing, setIsSyncing] = useState(false);

  const mockProducts = [
    { id: 'SKU-001', name: 'Handwoven Zulu Basket', category: 'Arts & Crafts', price: 45.00, stock: 12, image: '/images/products/placeholder.jpg', status: 'ACTIVE' },
    { id: 'SKU-002', name: 'Ethiopian Coffee Beans', category: 'Food & Agriculture', price: 22.50, stock: 4, image: '/images/products/placeholder.jpg', status: 'LOW_STOCK' },
    { id: 'SKU-003', name: 'Egyptian Cotton Towels', category: 'Textiles', price: 35.00, stock: 85, image: '/images/products/placeholder.jpg', status: 'ACTIVE' },
    { id: 'SKU-004', name: 'Moroccan Leather Bag', category: 'Fashion', price: 120.00, stock: 8, image: '/images/products/placeholder.jpg', status: 'ACTIVE' },
    { id: 'SKU-005', name: 'Nigerian Bronze Statue', category: 'Arts & Crafts', price: 210.00, stock: 2, image: '/images/products/placeholder.jpg', status: 'LOW_STOCK' },
    { id: 'SKU-006', name: 'Senegalese Shea Butter', category: 'Beauty', price: 18.00, stock: 154, image: '/images/products/placeholder.jpg', status: 'ACTIVE' },
  ];

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-12">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 bg-white p-8 lg:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] -mr-40 -mt-40"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl mb-6 border border-amber-100/50">
            Global Inventory Ledger
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter leading-tight uppercase">
            Product <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-500 tracking-tighter">Catalog</span>
          </h1>
          <p className="mt-6 text-gray-500 text-base font-medium leading-relaxed max-w-xl">
            Curate the ecosystem catalog, monitor SKU performance, and audit stock levels across all integrated vendor outlets.
          </p>
        </div>
        
        <div className="relative z-10 w-full lg:w-auto flex flex-col sm:flex-row gap-4">
          <button 
            onClick={handleSync}
            className="flex items-center justify-center space-x-3 bg-gray-900 hover:bg-slate-800 text-white px-8 py-4.5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-900/10 active:scale-95 cursor-pointer group"
          >
            <RefreshCcw size={18} className={`group-hover:rotate-180 transition-transform duration-700 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>Sync Catalog</span>
          </button>
          <button className="flex items-center justify-center space-x-3 bg-white border-2 border-slate-900 text-slate-900 px-8 py-4.5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all hover:bg-slate-50 cursor-pointer">
            <Plus size={18} />
            <span>New SKU</span>
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group">
            <div className="flex justify-between items-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                <Package size={20} />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black tracking-wider bg-blue-50 text-blue-600">
                <TrendingUp size={14} />
                +14%
              </div>
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Active Inventory</p>
            <h3 className="text-3xl font-black text-gray-900 mt-2 tracking-tight">8,492 <span className="text-xs text-gray-400 font-bold uppercase tracking-widest ml-1">SKU</span></h3>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group">
            <div className="flex justify-between items-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                <Archive size={20} />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black tracking-wider bg-red-50 text-red-600 animate-pulse">
                <AlertTriangle size={14} />
                Critical
              </div>
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Low Stock Flags</p>
            <h3 className="text-3xl font-black text-rose-600 mt-2 tracking-tight">42</h3>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group text-left">
            <div className="flex justify-between items-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                <Layers size={20} />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black tracking-wider bg-indigo-50 text-indigo-600">
                Premium
              </div>
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Dominant Domain</p>
            <h3 className="text-3xl font-black text-gray-900 mt-2 tracking-tight uppercase">Textiles</h3>
          </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/40 p-3 rounded-[2rem] shadow-sm flex flex-col xl:flex-row justify-between items-stretch gap-4 sticky top-24 z-30">
        <div className="flex p-1 bg-gray-100/50 backdrop-blur-md rounded-[1.5rem] overflow-x-auto no-scrollbar">
          {['ALL', 'ACTIVE', 'LOW_STOCK', 'ARCHIVED'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-8 py-4 text-[10px] font-black tracking-[0.3em] rounded-2xl transition-all cursor-pointer uppercase ${
                activeTab === tab 
                  ? 'bg-white text-amber-600 shadow-lg shadow-amber-200/50 border border-amber-50/50' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-white/20'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 px-2">
          <div className="flex items-center bg-gray-100/50 backdrop-blur-md p-1.5 rounded-2xl border border-gray-100 shadow-inner">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-xl transition-all cursor-pointer ${viewMode === 'grid' ? 'bg-white text-slate-900 shadow-md border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <LayoutGrid size={20} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-xl transition-all cursor-pointer ${viewMode === 'list' ? 'bg-white text-slate-900 shadow-md border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List size={20} />
            </button>
          </div>
          
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Query catalog registry by SKU name, ID or tags..."
              className="w-full pl-14 pr-6 py-4.5 bg-white/50 border border-white/60 rounded-2xl text-[13px] font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:bg-white focus:border-amber-500/20 transition-all placeholder:text-gray-400 placeholder:font-medium placeholder:italic shadow-inner"
            />
          </div>
          <button className="p-4.5 text-gray-500 bg-white/50 border border-white/60 hover:bg-white rounded-2xl transition-all cursor-pointer shadow-sm group">
            <Filter size={20} className="group-hover:scale-90 transition-transform" />
          </button>
        </div>
      </div>

      {/* Product List */}
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10"
        : "flex flex-col gap-6"
      }>
          {mockProducts.map(product => (
              <ProductCard key={product.id} product={product} viewMode={viewMode} />
          ))}
      </div>
      
      {/* Pagination Container */}
      <div className="bg-white/40 backdrop-blur-md p-4 rounded-[2.5rem] border border-white/60 flex flex-col items-center gap-6 shadow-sm">
          <button className="px-12 py-5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-800 hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95 shadow-xl shadow-slate-900/20 cursor-pointer group">
            Extend Registry View <ChevronRight size={14} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">
            Page <span className="text-gray-900 font-black">01</span> of <span className="text-gray-900 font-black">154</span>
          </p>
      </div>
    </div>
  );
}
