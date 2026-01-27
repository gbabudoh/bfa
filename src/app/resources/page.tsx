"use client";

import React, { useState } from 'react';
import { 
  Calculator, 
  Globe2, 
  Ship, 
  Scale, 
  ArrowRightLeft, 
  TrendingUp,
  Info,
  ShieldAlert,
  FileText,
  Map,
  Truck
} from 'lucide-react';
import { motion } from 'framer-motion';

// Mock Exchange Rates (Fixed for demonstration)
const exchangeRates: Record<string, number> = {
  "USD": 1.0,
  "EUR": 0.92,
  "GBP": 0.78,
  "CNY": 7.23,
  "NGN": 1500,
  "ZAR": 18.5,
  "KES": 130,
  "GHS": 14.5,
  "EGP": 48.0,
  "ETB": 57.0,
};

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵" },
  { code: "EGP", name: "Egyptian Pound", symbol: "£" },
  { code: "ETB", name: "Ethiopian Birr", symbol: "Br" },
];

const tradeRegions = [
  {
    name: "AfCFTA",
    fullName: "African Continental Free Trade Area",
    description: "The world's largest free trade area, aiming to eliminate 90% of tariffs on goods across Africa.",
    keyBenefit: "Single market access to 1.3 billion people.",
    members: 54
  },
  {
    name: "ECOWAS",
    fullName: "Economic Community of West African States",
    description: "Promoting economic integration across 15 West African countries through common markets.",
    keyBenefit: "Free movement of goods and people in the region.",
    members: 15
  },
  {
    name: "EAC",
    fullName: "East African Community",
    description: "Deepening cooperation among East African states with a shared Customs Union.",
    keyBenefit: "Unified Single Customs Territory.",
    members: 8
  },
  {
    name: "SADC",
    fullName: "Southern African Development Community",
    description: "Regional integration for socioeconomic development and security in Southern Africa.",
    keyBenefit: "Regional infrastructure and stability focus.",
    members: 16
  }
];

export default function ResourcesPage() {
  const [fromAmount, setFromAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("NGN");

  const convert = () => {
    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];
    return ((fromAmount / fromRate) * toRate).toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-900 py-24 px-4 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-yellow-500/10 skew-x-12 translate-x-32" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
              Trade <span className="text-yellow-500 italic">Resources</span>
            </h1>
            <p className="text-xl text-gray-400 font-medium leading-relaxed">
              Equipping African businesses with real-time currency data, regulatory intelligence, and logistics guides to dominate global trade.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Currency Converter Tool */}
      <section className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-gray-100">
          <div className="flex items-center mb-10">
            <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center mr-4">
              <Calculator className="w-6 h-6 text-yellow-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Currency Intelligence</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Converter Form */}
            <div className="lg:col-span-2 bg-gray-50 rounded-3xl p-8 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">You Convert</label>
                  <div className="flex bg-white rounded-2xl border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-yellow-500 transition-all">
                    <input 
                      type="number" 
                      value={fromAmount}
                      onChange={(e) => setFromAmount(Number(e.target.value))}
                      className="w-full px-6 py-4 outline-none font-bold text-lg"
                    />
                    <select 
                      value={fromCurrency}
                      onChange={(e) => setFromCurrency(e.target.value)}
                      className="bg-gray-100 px-4 py-4 font-black text-sm outline-none border-l border-gray-200"
                    >
                      {currencies.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
                    </select>
                  </div>
                </div>

                <div className="flex justify-center md:pb-3">
                  <div className="bg-yellow-500 text-black p-3 rounded-full shadow-lg">
                    <ArrowRightLeft className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">You Receive</label>
                  <div className="flex bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <div className="w-full px-6 py-4 font-black text-2xl text-yellow-600">
                      {convert()}
                    </div>
                    <select 
                      value={toCurrency}
                      onChange={(e) => setToCurrency(e.target.value)}
                      className="bg-gray-100 px-4 py-4 font-black text-sm outline-none border-l border-gray-200"
                    >
                      {currencies.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <Info className="w-3 h-3 mr-2" />
                Live market rates provided for informational purposes only.
              </div>
            </div>

            {/* Quick Rates Panel */}
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-3xl p-6 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <TrendingUp className="w-20 h-20" />
                </div>
                <h3 className="text-lg font-black mb-6 flex items-center">
                  Live Rates <span className="ml-2 px-2 py-0.5 bg-green-500 text-[8px] rounded uppercase">Updated</span>
                </h3>
                <div className="space-y-4">
                  {currencies.slice(4, 8).map(c => (
                    <div key={c.code} className="flex justify-between items-center border-b border-white/10 pb-2">
                      <div className="flex items-center">
                        <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs font-black mr-3">{c.code}</span>
                        <span className="text-xs font-bold text-gray-400">{c.name}</span>
                      </div>
                      <span className="text-sm font-black">{(exchangeRates[c.code] / exchangeRates["USD"]).toFixed(2)} / USD</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trade Regions Section */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4">Major Trade Regions</h2>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto">Understanding the regional blocs driving economic integration and tariff reduction across the continent.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tradeRegions.map((region) => (
            <div key={region.name} className="group bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:bg-yellow-500 transition-all duration-500">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <Map className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-1 group-hover:text-black">{region.name}</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-yellow-900 mb-4">{region.fullName}</p>
              <p className="text-sm text-gray-500 group-hover:text-gray-900 font-medium leading-relaxed mb-6">{region.description}</p>
              <div className="pt-6 border-t border-gray-200 group-hover:border-black/10">
                <span className="text-xs font-black block group-hover:text-black">Member States: {region.members}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Logistics & Compliance */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Logistics */}
            <div className="space-y-8">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mr-4">
                  <Ship className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-3xl font-black text-gray-900">Shipping & Logistics</h2>
              </div>
              
              <div className="space-y-4">
                {[
                  { title: "Intra-African Corridors", desc: "Optimized routes for regional trade between West, East, and Southern Africa.", icon: <Truck className="w-5 h-5" /> },
                  { title: "Marine & Cargo Insurance", desc: "Comprehensive protection for high-value artisanal and industrial goods.", icon: <ShieldAlert className="w-5 h-5" /> },
                  { title: "Port-to-Port Tracking", desc: "Real-time visibility for international shipments from major African ports.", icon: <Globe2 className="w-5 h-5" /> }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 flex items-start space-x-4">
                    <div className="text-blue-500 mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-500 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance */}
            <div className="space-y-8">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mr-4">
                  <Scale className="w-6 h-6 text-orange-600" />
                </div>
                <h2 className="text-3xl font-black text-gray-900">Duties & Levies</h2>
              </div>
              
              <div className="bg-white rounded-3xl p-8 border border-gray-100">
                <p className="text-gray-600 font-medium mb-8">
                  Taxation and custom duties vary significantly based on the origin of goods and the trade agreement in place.
                </p>
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="font-bold text-gray-800">Export Duties</span>
                    </div>
                    <span className="text-xs font-black text-orange-600 uppercase">Variable (0 - 5%)</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="font-bold text-gray-800">Custom Levies</span>
                    </div>
                    <span className="text-xs font-black text-orange-600 uppercase">Product Based</span>
                  </div>
                  <div className="flex justify-between items-center bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                    <div className="flex items-center">
                      <ShieldAlert className="w-5 h-5 text-yellow-600 mr-3" />
                      <span className="font-bold text-yellow-900">AfCFTA Exemption</span>
                    </div>
                    <span className="text-xs font-black text-yellow-600 uppercase italic">Up to 90% Reduced</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto bg-yellow-400 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-yellow-200">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-8">Need specialized trade advice?</h2>
            <p className="text-lg text-black/70 font-bold mb-10 max-w-2xl mx-auto">
              Our trade compliance partners are ready to help you navigate the complexities of cross-border commerce.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-black text-white px-12 py-5 rounded-2xl font-black text-lg transition-transform hover:scale-105">
                Contact an Expert
              </button>
              <button className="bg-white text-black px-12 py-5 rounded-2xl font-black text-lg transition-transform hover:scale-105 border-2 border-black/5">
                Download Trade Guide
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
