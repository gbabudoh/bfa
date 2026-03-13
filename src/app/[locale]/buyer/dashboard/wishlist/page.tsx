"use client";

import React from "react";
import { 
  BookmarkIcon, 
  Trash2, 
  ShoppingBag, 
  ArrowLeft, 
  Sparkles
} from "lucide-react";
import Link from "next/link";

const wishlistItems = [
  {
    id: 1,
    name: "Royal Benin Bronze Plaque",
    price: 3200.00,
    status: "Rare Find",
    image: "https://images.unsplash.com/photo-1554188248-986adbb73be4?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    id: 2,
    name: "Luxury Safari Leather Boots",
    price: 450.00,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=200&h=200",
  }
];

export default function WishlistPage() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <Link href="/buyer/dashboard" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-yellow-600 transition-colors uppercase tracking-widest mb-4">
            <ArrowLeft className="w-3 h-3" /> Back to Overview
          </Link>
          <h1 className="text-4xl font-black text-slate-900 tracking-tightest leading-none">Your Wishlist</h1>
          <p className="text-slate-500 text-sm mt-3 font-medium">Curate your dream collection of African luxury</p>
        </div>
        
        <div className="flex items-center gap-4">
           <button className="px-6 py-3 rounded-full bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest hover:bg-yellow-500 transition-all shadow-lg active:scale-95">
              Share List
           </button>
        </div>
      </div>

      {/* ── Wishlist List ── */}
      <div className="space-y-4">
        {wishlistItems.map((item) => (
          <div key={item.id} className="group p-6 rounded-[2.5rem] bg-white/60 border border-white backdrop-blur-xl shadow-xl hover:shadow-2xl hover:translate-x-2 transition-all duration-500">
            <div className="flex items-center gap-8">
              {/* Image */}
              <div className="relative h-24 w-24 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200 shadow-inner group-hover:scale-110 transition-transform duration-500">
                 <div className="absolute inset-0 flex items-center justify-center">
                    <BookmarkIcon className="w-8 h-8 text-slate-200 opacity-30" />
                 </div>
              </div>

              {/* Details */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                   <Sparkles className="w-3 h-3 text-yellow-500" />
                   <span className="text-[9px] font-black uppercase text-yellow-600 tracking-widest">{item.status}</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 leading-tight uppercase tracking-tight">{item.name}</h3>
                <p className="text-2xl font-black text-slate-900 tracking-tightest mt-1">${item.price.toFixed(2)}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                 <button className="p-4 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-rose-500 transition-all shadow-sm active:scale-90">
                    <Trash2 className="w-5 h-5" />
                 </button>
                 <button className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-yellow-500 text-white font-black text-xs uppercase tracking-widest hover:bg-yellow-600 transition-all shadow-lg shadow-yellow-500/20 active:scale-95">
                    <ShoppingBag className="w-4 h-4" /> Move to Cart
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Recommendation Banner ── */}
      <div className="p-10 rounded-[3rem] bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden group shadow-2xl">
         <div className="relative z-10 max-w-xl">
            <h3 className="text-2xl font-black text-white tracking-tight mb-4 uppercase">Unlock Exclusive Access</h3>
            <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">Items in your wishlist are monitored for price drops and restock alerts. Get notified before everyone else.</p>
            <button className="px-8 py-4 rounded-full bg-yellow-500 text-white font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-yellow-500/20">
               Enable Alerts
            </button>
         </div>
         <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-yellow-500/10 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000"></div>
         <div className="absolute bottom-[-10%] left-[40%] w-48 h-48 bg-blue-500/5 rounded-full blur-[80px]"></div>
      </div>
    </div>
  );
}
