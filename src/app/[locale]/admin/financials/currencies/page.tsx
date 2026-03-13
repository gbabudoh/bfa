"use client";

import React, { useState } from 'react';
import { 
  RefreshCw, 
  ArrowUpRight, 
  TrendingUp, 
  Plus, 
  ArrowRightLeft,
  Globe,
  Clock,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface CurrencyCardProps {
  code: string;
  name: string;
  rate: number;
  change: number;
  symbol: string;
}

const CurrencyCard = ({ code, name, rate, change, symbol }: CurrencyCardProps) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden cursor-pointer">
    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full -mr-12 -mt-12 blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
    <div className="flex justify-between items-start mb-8 relative z-10">
      <div className="flex items-center space-x-5">
        <div className="h-16 w-16 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl flex items-center justify-center text-amber-700 font-black text-xl shadow-inner group-hover:scale-110 transition-transform duration-500 border border-amber-200/50">
          {symbol}
        </div>
        <div>
          <h3 className="text-lg font-black text-gray-900 tracking-tight">{code}</h3>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">{name}</p>
        </div>
      </div>
      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest ${
        change > 0 ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
        change < 0 ? 'bg-rose-50 text-rose-600 border border-rose-100' : 
        'bg-gray-50 text-gray-400 border border-gray-100'
      }`}>
        {change > 0 && <TrendingUp size={12} />}
        {change > 0 ? '+' : ''}{change}%
      </div>
    </div>
    
    <div className="space-y-6 relative z-10">
      <div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 italic">Exchange Liquidity (1 USD)</p>
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-black text-gray-900 tracking-tighter">{rate.toLocaleString()}</p>
          <span className="text-[10px] font-black text-gray-400 uppercase">{code}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
        <div className="flex items-center gap-2 text-gray-300">
           <Clock size={14} />
           <span className="text-[9px] font-black uppercase tracking-widest">Live Sync: Active</span>
        </div>
        <button className="w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-400 hover:bg-amber-600 hover:text-white rounded-xl transition-all duration-300 cursor-pointer shadow-sm active:scale-90 group/btn">
          <RefreshCw size={18} className="group-hover/btn:rotate-180 transition-transform duration-500" />
        </button>
      </div>
    </div>
  </div>
);

export default function AdminCurrenciesPage() {
  const [conversionAmount, setConversionAmount] = useState(1);
  const currencies = [
    { code: 'NGN', name: 'Nigerian Naira', rate: 1450.00, change: 1.2, symbol: '₦' },
    { code: 'KES', name: 'Kenyan Shilling', rate: 132.50, change: -0.5, symbol: 'KSh' },
    { code: 'ZAR', name: 'S. African Rand', rate: 18.90, change: 0.8, symbol: 'R' },
    { code: 'GHS', name: 'Ghanaian Cedi', rate: 12.10, change: 0.2, symbol: 'GH₵' },
    { code: 'EGP', name: 'Egyptian Pound', rate: 48.30, change: -1.4, symbol: 'E£' },
    { code: 'ETB', name: 'Ethiopian Birr', rate: 56.50, change: 0.0, symbol: 'Br' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8 bg-white p-10 xl:p-14 rounded-[3.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[140px] -mr-80 -mt-80"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl mb-8 border border-amber-200/50">
            <Globe size={14} className="animate-pulse" />
            Global Treasury Sync
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter leading-tight uppercase">
            Treasury <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 tracking-tighter italic">Oversight</span>
          </h1>
          <p className="mt-8 text-gray-500 text-base font-medium leading-relaxed italic max-w-xl">
             Managing multi-currency liquidity bridges and auditing real-time exchange dynamics across the continental commerce ecosystem.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-10">
            <button className="flex items-center space-x-3 bg-white border border-gray-200 text-gray-900 px-8 py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] transition-all hover:bg-gray-50 hover:shadow-xl active:scale-95 cursor-pointer group">
              <RefreshCw size={18} className="text-amber-500 group-hover:rotate-180 transition-transform duration-700" />
              <span>Force Global Sync</span>
            </button>
            <button className="flex items-center space-x-3 bg-gray-900 hover:bg-slate-800 text-white px-8 py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] transition-all shadow-2xl shadow-slate-900/20 active:scale-95 cursor-pointer group">
              <Plus size={18} className="text-amber-500 group-hover:rotate-90 transition-transform" />
              <span>Onboard Currency</span>
            </button>
          </div>
        </div>

        {/* Improved Conversion Widget */}
        <div className="w-full xl:w-[450px] relative z-10">
           <div className="bg-gray-900 rounded-[3rem] p-10 shadow-3xl relative border border-gray-800 group overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.15),transparent)] pointer-events-none"></div>
             <div className="flex items-center justify-between mb-10">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-center text-amber-500 border border-white/10">
                    <ArrowRightLeft size={24} />
                  </div>
                  <span className="font-black text-white text-[10px] uppercase tracking-[0.3em]">Conversion Pulse</span>
                </div>
                <div className="px-3 py-1 bg-amber-500/10 rounded-lg text-amber-500 text-[9px] font-black uppercase tracking-widest border border-amber-500/20">
                   Real-Time
                </div>
             </div>
             
             <div className="space-y-6">
               <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5 transition-all focus-within:border-amber-500/50 group/input cursor-text">
                 <div className="flex justify-between items-center mb-2">
                   <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Base Asset</span>
                   <ShieldCheck size={12} className="text-amber-500/50" />
                 </div>
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-gray-900 font-black text-xs">$</div>
                     <span className="font-black text-white tracking-widest">USD</span>
                   </div>
                   <input 
                     type="number" 
                     value={conversionAmount}
                     onChange={(e) => setConversionAmount(Number(e.target.value))}
                     className="bg-transparent text-white font-black text-2xl outline-none w-32 text-right tracking-tighter" 
                   />
                 </div>
               </div>

               <div className="flex justify-center -my-3 relative z-10">
                  <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center text-white shadow-2xl border-2 border-gray-900 hover:scale-110 transition-transform cursor-pointer">
                    <Zap size={18} fill="currentColor" />
                  </div>
               </div>

               <div className="p-6 bg-amber-500/5 rounded-[2rem] border border-amber-500/10 transition-all hover:border-amber-500/30 group/input cursor-pointer">
                 <div className="flex justify-between items-center mb-2">
                   <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">Target Liquidity</span>
                   <ArrowUpRight size={12} className="text-amber-500" />
                 </div>
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-500 font-black text-xs">₦</div>
                     <span className="font-black text-amber-500 tracking-widest">NGN</span>
                   </div>
                   <p className="text-amber-500 font-black text-2xl tracking-tighter">{(conversionAmount * 1450).toLocaleString()}</p>
                 </div>
               </div>
             </div>
             
             <div className="mt-8 flex items-center justify-center">
               <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest italic flex items-center gap-2">
                 <ShieldCheck size={12} />
                 Verified Institutional Rate Data
               </p>
             </div>
           </div>
        </div>
      </div>

      <div className="space-y-10">
        <div className="flex justify-between items-center px-6">
          <h2 className="text-sm font-black text-gray-900 uppercase tracking-[0.4em] flex items-center gap-4">
            <div className="w-1.5 h-8 bg-amber-500 rounded-full"></div>
            Continental Asset List
          </h2>
          <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-3 bg-gray-50 px-5 py-2 rounded-full border border-gray-100 italic">
            <Clock size={12} className="text-amber-500" />
            Next Re-valuation in 42m
          </div>
        </div>

        {/* Grid of Currencies */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currencies.map((curr) => (
            <CurrencyCard key={curr.code} {...curr} />
          ))}
          <button className="h-full min-h-[300px] border-4 border-dashed border-gray-100 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-gray-300 hover:border-amber-400 hover:text-amber-600 transition-all duration-500 group cursor-pointer bg-white/30 hover:bg-amber-50/30">
            <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center mb-6 group-hover:bg-amber-100 group-hover:scale-110 transition-all duration-500 shadow-inner group-hover:shadow-amber-200/50">
              <Plus size={32} className="group-hover:rotate-90 transition-transform duration-500" />
            </div>
            <span className="font-black text-xs uppercase tracking-[0.3em] group-hover:tracking-[0.4em] transition-all">Onboard Asset</span>
            <p className="text-[9px] font-black text-gray-400 mt-4 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Registry Tier 2 Approval Required</p>
          </button>
        </div>
      </div>

      {/* Analytics Insight Component */}
      <div className="bg-gray-900 rounded-[3.5rem] p-12 lg:p-16 relative overflow-hidden border border-gray-800 shadow-3xl">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.1),transparent)] pointer-events-none"></div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
            <div>
               <div className="inline-flex items-center gap-3 px-5 py-2 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-[1.5rem] mb-8 border border-indigo-500/20">
                 <ShieldCheck size={14} />
                 Trade Compliance Matrix
               </div>
               <h3 className="text-3xl font-black text-white tracking-tighter uppercase mb-6 leading-tight">
                 Regional <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">Forensics</span>
               </h3>
               <p className="text-gray-500 text-sm font-medium leading-relaxed italic mb-10">
                 Platform-wide intra-African trade volume is currently anchored to USD liquidity. Automated re-valuation protocols are maintaining exchange stability within institutional tolerance bands.
               </p>
               <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2 italic">Institutional Reach</p>
                    <p className="text-2xl font-black text-white">42 Currencies</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2 italic">Network Volatility</p>
                    <p className="text-2xl font-black text-white">0.42% <span className="text-xs text-emerald-400">LOW</span></p>
                  </div>
               </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/5 p-10 shadow-2xl">
               <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-8 flex justify-between">
                 Market Liquidity
                 <TrendingUp size={14} className="text-amber-500" />
               </h4>
               <div className="space-y-8">
                  {[
                    { label: 'West African Hubs', value: '82%', color: 'from-amber-500 to-orange-400' },
                    { label: 'East African Nodes', value: '74%', color: 'from-indigo-500 to-purple-400' },
                    { label: 'Southern Corridors', value: '91%', color: 'from-emerald-500 to-teal-400' }
                  ].map((row, idx) => (
                    <div key={idx} className="space-y-3">
                       <div className="flex justify-between items-end">
                         <span className="text-[10px] font-black text-white uppercase tracking-widest">{row.label}</span>
                         <span className="text-xs font-black text-white">{row.value}</span>
                       </div>
                       <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                          <div className={`h-full bg-gradient-to-r ${row.color} rounded-full transition-all duration-1000 shadow-lg shadow-black/20`} style={{width: row.value}}></div>
                       </div>
                    </div>
                  ))}
               </div>
               <button className="w-full mt-10 py-5 bg-white text-gray-900 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-2xl">
                 Download Treasury Report
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
