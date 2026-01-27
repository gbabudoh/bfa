"use client";

import React from 'react';
import { 
  RefreshCw, 
  ArrowUpRight, 
  TrendingUp, 
  Plus, 
  ArrowRightLeft
} from 'lucide-react';

interface CurrencyCardProps {
  code: string;
  name: string;
  rate: number;
  change: number;
  symbol: string;
}

const CurrencyCard = ({ code, name, rate, change, symbol }: CurrencyCardProps) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-700 font-bold shadow-inner">
          {symbol}
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-900">{code}</h3>
          <p className="text-xs text-gray-500 font-medium">{name}</p>
        </div>
      </div>
      <div className={`text-[10px] font-bold p-1 rounded ${change > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
        {change > 0 ? '+' : ''}{change}%
      </div>
    </div>
    <div className="flex items-end justify-between mt-6">
      <div>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest text-[9px]">Exchange Rate (1 USD)</p>
        <p className="text-xl font-bold text-gray-900 mt-1">{rate.toLocaleString()}</p>
      </div>
      <button className="p-2 bg-gray-50 text-gray-400 hover:bg-yellow-50 hover:text-yellow-600 rounded-xl transition-all">
        <RefreshCw size={16} />
      </button>
    </div>
  </div>
);

export default function AdminCurrenciesPage() {
  const currencies = [
    { code: 'NGN', name: 'Nigerian Naira', rate: 1450.00, change: 1.2, symbol: '₦' },
    { code: 'KES', name: 'Kenyan Shilling', rate: 132.50, change: -0.5, symbol: 'KSh' },
    { code: 'ZAR', name: 'S. African Rand', rate: 18.90, change: 0.8, symbol: 'R' },
    { code: 'GHS', name: 'Ghanaian Cedi', rate: 12.10, change: 0.2, symbol: 'GH₵' },
    { code: 'EGP', name: 'Egyptian Pound', rate: 48.30, change: -1.4, symbol: 'E£' },
    { code: 'ETB', name: 'Ethiopian Birr', rate: 56.50, change: 0.0, symbol: 'Br' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Currency & Exchange Controls</h1>
          <p className="text-gray-500 mt-1">Manage all African currencies and international trade exchange rates.</p>
        </div>
        <div className="flex space-x-3">
           <button className="flex items-center space-x-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold transition-all hover:bg-gray-50">
             <RefreshCw size={20} className="text-gray-400" />
             <span>Update All Rates</span>
           </button>
           <button className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md active:scale-95">
             <Plus size={20} />
             <span>Add Currency</span>
           </button>
        </div>
      </div>

      {/* Hero Widget */}
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-center overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 -mr-20 -mt-20 rounded-full blur-3xl"></div>
        <div className="relative z-10 w-full md:w-2/3">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg backdrop-blur-md">
               <TrendingUp size={24} />
            </div>
            <h2 className="text-xl font-bold">Regional Market Overview</h2>
          </div>
          <p className="text-white opacity-80 mb-6 max-w-lg">
            Intra-African trade volume is currently estimated in USD. Market dynamics show increased stability in West-African hubs this quarter.
          </p>
          <div className="flex space-x-8">
            <div>
              <p className="text-xs font-bold opacity-60 uppercase tracking-widest">Active Currencies</p>
              <p className="text-2xl font-bold mt-1">42 <span className="text-sm opacity-60 font-medium">BFA Recognized</span></p>
            </div>
            <div className="w-px h-12 bg-white opacity-20"></div>
            <div>
              <p className="text-xs font-bold opacity-60 uppercase tracking-widest">Avg Vol (Daily)</p>
              <p className="text-2xl font-bold mt-1">$45.2K <span className="text-green-400 text-sm font-bold flex items-center inline"><ArrowUpRight size={14} className="ml-1" /> +5%</span></p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-auto mt-8 md:mt-0 relative z-10">
           <div className="bg-white bg-opacity-10 backdrop-blur-xl border border-white border-opacity-20 rounded-2xl p-6 shadow-2xl">
             <div className="flex items-center space-x-4 mb-4">
                <ArrowRightLeft size={20} className="text-yellow-400" />
                <span className="font-bold">Quick Convert</span>
             </div>
             <div className="space-y-4">
               <div className="flex items-center bg-white bg-opacity-10 rounded-xl p-3">
                 <span className="font-bold text-sm mr-2 w-8">USD</span>
                 <input type="number" defaultValue="1" className="bg-transparent text-white font-bold outline-none w-24 text-right" />
               </div>
               <div className="flex items-center bg-white bg-opacity-10 rounded-xl p-3">
                 <span className="font-bold text-sm mr-2 w-8 text-yellow-500">NGN</span>
                 <input type="number" defaultValue="1450" className="bg-transparent text-yellow-500 font-bold outline-none w-24 text-right" />
               </div>
             </div>
           </div>
        </div>
      </div>

      {/* Grid of Currencies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currencies.map((curr) => (
          <CurrencyCard key={curr.code} {...curr} />
        ))}
        <button className="h-full border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-8 text-gray-400 hover:border-yellow-400 hover:text-yellow-600 transition-all group">
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-yellow-50 transition-colors">
            <Plus size={24} />
          </div>
          <span className="font-bold text-sm uppercase tracking-widest">Track More</span>
        </button>
      </div>
    </div>
  );
}
