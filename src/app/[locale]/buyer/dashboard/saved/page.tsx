"use client";

import React from "react";
import { 
  Heart, 
  Search, 
  Trash2, 
  ShoppingBag, 
  ArrowLeft, 
  Star,
  ExternalLink,
  Tag
} from "lucide-react";
import Link from "next/link";

const savedItems = [
  {
    id: 1,
    name: "Handcrafted Masai Shield",
    price: 120.00,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1510257321689-ba302ca2da2e?auto=format&fit=crop&q=80&w=200&h=200",
    category: "Artifacts"
  },
  {
    id: 2,
    name: "Pure Egyptian Cotton Sheets",
    price: 85.50,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=200&h=200",
    category: "Textiles"
  },
  {
    id: 3,
    name: "Premium Ethiopian Coffee",
    price: 45.00,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=200&h=200",
    category: "Groceries"
  }
];

export default function SavedItemsPage() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <Link href="/buyer/dashboard" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-yellow-600 transition-colors uppercase tracking-widest mb-4">
            <ArrowLeft className="w-3 h-3" /> Back to Overview
          </Link>
          <h1 className="text-4xl font-black text-slate-900 tracking-tightest leading-none">Saved Items</h1>
          <p className="text-slate-500 text-sm mt-3 font-medium">Items you&apos;ve bookmarked for later purchase</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search saved items..." 
            className="bg-white/60 border border-slate-200 rounded-full py-3 pl-11 pr-6 w-[300px] text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:bg-white transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* ── Saved Items Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedItems.map((item) => (
          <div key={item.id} className="group relative p-6 rounded-[2.5rem] bg-white/60 border border-white backdrop-blur-xl shadow-xl hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-500 overflow-hidden">
            {/* Action Buttons Overlay */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <button className="p-3 rounded-2xl bg-white border border-slate-100 shadow-lg text-slate-400 hover:text-rose-500 hover:rotate-12 transition-all active:scale-90">
                <Trash2 className="w-4 h-4" />
              </button>
              <button className="p-3 rounded-2xl bg-white border border-slate-100 shadow-lg text-slate-400 hover:text-yellow-500 hover:-rotate-12 transition-all active:scale-90">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            {/* Thumbnail */}
            <div className="relative h-60 w-full rounded-2xl bg-slate-100 overflow-hidden mb-6 border border-slate-200 shadow-inner group-hover:scale-[1.02] transition-transform duration-700">
               <div className="absolute inset-0 flex items-center justify-center">
                  <Heart className="w-12 h-12 text-slate-200 group-hover:scale-110 transition-transform duration-500 opacity-20" />
               </div>
               {/* Image placeholder */}
               <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent"></div>
               <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-white/40 text-[10px] font-black text-slate-900 uppercase tracking-widest shadow-sm">
                 <Tag className="w-3 h-3 inline-block mr-1 opacity-50" /> {item.category}
               </div>
            </div>

            {/* Details */}
            <div className="space-y-4 px-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-black text-slate-900 leading-tight uppercase tracking-tight">{item.name}</h3>
                  <div className="flex items-center gap-1 mt-1 text-yellow-500">
                    <Star className="w-3 h-3 fill-yellow-500" />
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{item.rating} • Verified Product</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <p className="text-2xl font-black text-slate-900 tracking-tightest">${item.price.toFixed(2)}</p>
                <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-500 text-white font-black text-[10px] uppercase tracking-widest hover:bg-yellow-600 transition-all shadow-lg active:scale-95">
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </button>
              </div>
            </div>
            
            {/* Background Accent */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>
          </div>
        ))}

        {/* Add Suggestion Widget */}
        <div className="p-8 rounded-[2.5rem] bg-white/40 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-white/60 hover:border-yellow-500/50 transition-all duration-500">
           <div className="w-16 h-16 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform shadow-sm">
             <Heart className="w-8 h-8 text-slate-300 group-hover:text-rose-400 group-hover:fill-rose-400 transition-colors" />
           </div>
           <h3 className="text-lg font-black text-slate-400 uppercase tracking-tight group-hover:text-slate-900 transition-colors">Continue Shopping</h3>
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 px-10">Add more items to your list to compare prices and shipping.</p>
           <Link href="/products" className="mt-8 px-6 py-3 rounded-full border border-slate-200 text-slate-500 font-extrabold text-[10px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
             Browse Categories
           </Link>
        </div>
      </div>
    </div>
  );
}
