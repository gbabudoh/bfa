"use client";

import React from 'react';
import { 
  MessageSquare
} from 'lucide-react';

export default function VendorMessagesPage() {
  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-black text-[#D9A606] uppercase tracking-[0.4em] italic">Communications Hub</span>
      </div>
      <h1 className="text-4xl font-black text-zinc-900 tracking-tighter">Signal <span className="text-zinc-400">Locked.</span></h1>
      
      <div className="mt-8 p-12 rounded-[3rem] bg-white/70 border border-white/50 backdrop-blur-xl transition-all duration-700 hover:bg-white shadow-[0_20px_40px_rgba(0,0,0,0.02)] min-h-[500px] flex flex-col items-center justify-center text-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D9A606]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        <div className="p-8 rounded-[2rem] bg-gray-50 border border-gray-100 mb-8 rotate-[-3deg] group-hover:rotate-0 transition-transform duration-700">
           <div className="w-16 h-16 text-[#D9A606] opacity-40">
             <MessageSquare className="w-full h-full" strokeWidth={1} />
           </div>
        </div>
        <p className="text-2xl font-black text-zinc-900 mb-3 tracking-tighter">Encrypted Channel Active.</p>
        <p className="text-sm text-zinc-500 max-w-sm font-medium leading-relaxed">Your secure communication network is online. Connection requests from global partners will manifest here.</p>
        <div className="mt-10 flex gap-4">
           <button className="px-10 py-4 rounded-2xl bg-[#D9A606] text-[11px] font-black text-white hover:scale-105 transition-all uppercase tracking-widest shadow-lg shadow-[#D9A606]/20">
              Open Directory
           </button>
           <button className="px-10 py-4 rounded-2xl bg-white border border-gray-200 text-[11px] font-black text-zinc-500 hover:text-zinc-900 hover:border-[#D9A606] transition-all uppercase tracking-widest">
              Archived Logs
           </button>
        </div>
      </div>
    </div>
  );
}
