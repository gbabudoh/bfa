"use client";

import React, { useState } from 'react';
import { 
  Store, 
  MapPin, 
  Globe, 
  Clock, 
  Camera, 
  Layout, 
  Save,
  ChevronRight,
  ShieldCheck,
  Smartphone,
  Zap
} from 'lucide-react';

interface StorefrontSettings {
  storeName: string;
  tagline: string;
  description: string;
  address: string;
  city: string;
  country: string;
  timezone: string;
  currency: string;
  primaryColor: string;
  accentColor: string;
  layoutType: 'luxury' | 'minimal' | 'modern';
  featuredCollection: string;
}

export default function StorefrontSettingsForm() {
  const [settings, setSettings] = useState<StorefrontSettings>({
    storeName: "BFA Premium Boutique",
    tagline: "Authentic African Excellence Delivered Globally",
    description: "Specializing in high-end handcrafted textiles and artisan artifacts directly from the heart of the continent.",
    address: "125 Innovation Drive, Lekki Phase 1",
    city: "Lagos",
    country: "Nigeria",
    timezone: "UTC+1 (WAT)",
    currency: "USD ($)",
    primaryColor: "#D9A606",
    accentColor: "#F2B705",
    layoutType: 'modern',
    featuredCollection: 'Spring Essentials 2025'
  });

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24 font-sans">
      {/* ── High-Fidelity Form Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-gray-100 pb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="p-2.5 rounded-xl bg-[#D9A606]/10 text-[#D9A606] shadow-sm">
                <Store className="w-5 h-5" />
             </div>
             <span className="text-[10px] font-black text-[#D9A606] uppercase tracking-[0.4em] italic leading-none">Global Presence</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tighter uppercase tracking-[-0.04em]">Storefront <span className="text-zinc-400">DNA.</span></h1>
          <p className="mt-4 text-zinc-500 font-medium max-w-lg leading-relaxed">Customize your shop&apos;s signature identity across the global BFA marketplace.</p>
        </div>
        <button
          type="submit"
          className="group flex items-center gap-4 bg-zinc-900 text-white px-10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:bg-black hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.1)] active:shadow-none"
        >
          <Save className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          Synchronize Settings
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          {/* Identity Architecture */}
          <section className="p-10 rounded-[3.5rem] bg-white/70 border border-white/50 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.02)] space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
               <ShieldCheck className="w-32 h-32 text-zinc-900" />
            </div>
            
            <div className="flex items-center gap-4 mb-2">
              <div className="w-1.5 h-10 bg-[#D9A606] rounded-full"></div>
              <h2 className="text-sm font-black text-zinc-900 uppercase tracking-[0.3em]">Identity Architecture</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-4 italic">Brand Designation</label>
                <div className="relative group/input">
                  <Store className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within/input:text-[#D9A606] transition-colors" />
                  <input 
                    type="text" 
                    value={settings.storeName}
                    onChange={(e) => setSettings({...settings, storeName: e.target.value})}
                    className="w-full bg-white/50 border border-gray-100 rounded-3xl py-5 pl-14 pr-6 text-sm font-bold text-zinc-900 focus:bg-white focus:border-[#D9A606]/50 focus:ring-4 focus:ring-[#D9A606]/5 transition-all outline-none placeholder:text-zinc-300 shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-4 italic">Strategic Tagline</label>
                <div className="relative group/input">
                   <Zap className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within/input:text-[#D9A606] transition-colors" />
                   <input 
                    type="text" 
                    value={settings.tagline}
                    onChange={(e) => setSettings({...settings, tagline: e.target.value})}
                    className="w-full bg-white/50 border border-gray-100 rounded-3xl py-5 pl-14 pr-6 text-sm font-bold text-zinc-900 focus:bg-white focus:border-[#D9A606]/50 focus:ring-4 focus:ring-[#D9A606]/5 transition-all outline-none shadow-sm"
                  />
                </div>
              </div>

              <div className="md:col-span-2 space-y-3">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-4 italic">Brand Narrative</label>
                <textarea 
                  rows={4}
                  value={settings.description}
                  onChange={(e) => setSettings({...settings, description: e.target.value})}
                  className="w-full bg-white/50 border border-gray-100 rounded-[2.5rem] p-8 text-sm font-bold text-zinc-900 focus:bg-white focus:border-[#D9A606]/50 focus:ring-4 focus:ring-[#D9A606]/5 transition-all outline-none resize-none shadow-sm"
                />
              </div>
            </div>
          </section>

          {/* Logistics Matrix */}
          <section className="p-10 rounded-[3.5rem] bg-white/70 border border-white/50 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.02)] space-y-8 relative overflow-hidden group">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-1.5 h-10 bg-zinc-900 rounded-full"></div>
              <h2 className="text-sm font-black text-zinc-900 uppercase tracking-[0.3em]">Logistics Matrix</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-4 italic">Global Locale</label>
                <div className="relative">
                  <Globe className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input 
                    type="text" 
                    value={settings.country}
                    onChange={(e) => setSettings({...settings, country: e.target.value})}
                    className="w-full bg-white/50 border border-gray-100 rounded-3xl py-5 pl-14 pr-6 text-sm font-bold text-zinc-900 focus:bg-white focus:border-[#D9A606]/50 transition-all outline-none shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-4 italic">Temporal Zone</label>
                <div className="relative">
                  <Clock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input 
                    type="text" 
                    value={settings.timezone}
                    onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                    className="w-full bg-white/50 border border-gray-100 rounded-3xl py-5 pl-14 pr-6 text-sm font-bold text-zinc-900 focus:bg-white focus:border-[#D9A606]/50 transition-all outline-none shadow-sm"
                  />
                </div>
              </div>

              <div className="md:col-span-2 space-y-3">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-4 italic">Operational Headquarters</label>
                <div className="relative">
                  <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input 
                    type="text" 
                    value={settings.address}
                    onChange={(e) => setSettings({...settings, address: e.target.value})}
                    className="w-full bg-white/50 border border-gray-100 rounded-3xl py-5 pl-14 pr-6 text-sm font-bold text-zinc-900 focus:bg-white focus:border-[#D9A606]/50 transition-all outline-none shadow-sm"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Tactical UI Options */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="p-8 rounded-[3.5rem] bg-white/70 border border-white/50 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.02)] space-y-8 sticky top-40">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-1.5 h-10 bg-[#D9A606] rounded-full"></div>
              <h2 className="text-sm font-black text-zinc-900 uppercase tracking-[0.3em]">Tactical UI</h2>
            </div>

            <div className="space-y-8">
               <div className="space-y-4">
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-2 italic">Design Language</p>
                  <div className="grid grid-cols-1 gap-2">
                     {(['modern', 'luxury', 'minimal'] as const).map((type) => (
                        <button
                           key={type}
                           onClick={() => setSettings({...settings, layoutType: type})}
                           className={`group relative flex items-center justify-between p-5 rounded-3xl border transition-all ${
                              settings.layoutType === type 
                               ? 'bg-zinc-900 border-zinc-900 text-white shadow-xl scale-[1.02]' 
                               : 'bg-gray-50 border-gray-100 text-zinc-500 hover:bg-white hover:border-[#D9A606]'
                           }`}
                        >
                           <span className="text-[11px] font-black uppercase tracking-widest">{type}</span>
                           <Layout className={`w-4 h-4 ${settings.layoutType === type ? 'text-[#D9A606]' : 'text-zinc-300'}`} />
                        </button>
                     ))}
                  </div>
               </div>

               <div className="p-6 rounded-[2.5rem] bg-gray-100/50 border border-gray-200/50 relative overflow-hidden hover:bg-white transition-all group/upload">
                  <div className="flex flex-col items-center text-center gap-4 py-4">
                     <div className="p-5 rounded-full bg-white border border-gray-100 text-zinc-300 group-hover/upload:text-[#D9A606] group-hover/upload:scale-110 transition-all duration-500 shadow-sm">
                        <Camera className="w-8 h-8" />
                     </div>
                     <div>
                        <p className="text-[11px] font-black text-zinc-900 uppercase tracking-widest mb-1">Brand Assets</p>
                        <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest opacity-60 italic leading-none underline decoration-zinc-200">Update Core Media</p>
                     </div>
                  </div>
               </div>

               <div className="p-6 rounded-[2.5rem] bg-zinc-900 text-white relative overflow-hidden group/preview shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D9A606]/20 to-transparent"></div>
                  <div className="relative z-10">
                     <div className="flex items-center gap-2 mb-4">
                        <Smartphone className="w-4 h-4 text-[#D9A606]" />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] italic">Mobile Preview</span>
                     </div>
                     <p className="text-sm font-black tracking-tight mb-4">See your storefront exactly as your clients see it.</p>
                     <button className="w-full flex items-center justify-between group-hover/preview:gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                        Launch VR Suite
                        <ChevronRight className="w-4 h-4 group-hover/preview:translate-x-1 transition-transform" />
                     </button>
                  </div>
               </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
