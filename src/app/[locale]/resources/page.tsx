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
import { useTranslations } from 'next-intl';

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

export default function ResourcesPage() {
  const t = useTranslations('Resources');

  const currencies = [
    { code: "USD", name: t('currencies.USD'), symbol: "$" },
    { code: "EUR", name: t('currencies.EUR'), symbol: "€" },
    { code: "GBP", name: t('currencies.GBP'), symbol: "£" },
    { code: "CNY", name: t('currencies.CNY'), symbol: "¥" },
    { code: "NGN", name: t('currencies.NGN'), symbol: "₦" },
    { code: "ZAR", name: t('currencies.ZAR'), symbol: "R" },
    { code: "KES", name: t('currencies.KES'), symbol: "KSh" },
    { code: "GHS", name: t('currencies.GHS'), symbol: "₵" },
    { code: "EGP", name: t('currencies.EGP'), symbol: "£" },
    { code: "ETB", name: t('currencies.ETB'), symbol: "Br" },
  ];

  const tradeRegions = [
    {
      name: t('regions.AfCFTA.name'),
      fullName: t('regions.AfCFTA.fullName'),
      description: t('regions.AfCFTA.description'),
      members: 54
    },
    {
      name: t('regions.ECOWAS.name'),
      fullName: t('regions.ECOWAS.fullName'),
      description: t('regions.ECOWAS.description'),
      members: 15
    },
    {
      name: t('regions.EAC.name'),
      fullName: t('regions.EAC.fullName'),
      description: t('regions.EAC.description'),
      members: 8
    },
    {
      name: t('regions.SADC.name'),
      fullName: t('regions.SADC.fullName'),
      description: t('regions.SADC.description'),
      members: 16
    }
  ];

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
              {t('heroTitle')} <span className="text-yellow-500 italic">{t('heroTitleHighlight')}</span>
            </h1>
            <p className="text-xl text-gray-400 font-medium leading-relaxed">
              {t('heroSubtitle')}
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
            <h2 className="text-3xl font-black text-gray-900">{t('currencyTitle')}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Converter Form */}
            <div className="lg:col-span-2 bg-gray-50 rounded-3xl p-8 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">{t('youConvert')}</label>
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
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">{t('youReceive')}</label>
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
                {t('liveRatesInfo')}
              </div>
            </div>

            {/* Quick Rates Panel */}
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-3xl p-6 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <TrendingUp className="w-20 h-20" />
                </div>
                <h3 className="text-lg font-black mb-6 flex items-center">
                  {t('liveRatesTitle')} <span className="ml-2 px-2 py-0.5 bg-green-500 text-[8px] rounded uppercase">{t('liveRatesUpdated')}</span>
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
          <h2 className="text-4xl font-black text-gray-900 mb-4">{t('tradeRegionsTitle')}</h2>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto">{t('tradeRegionsSubtitle')}</p>
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
                <span className="text-xs font-black block group-hover:text-black">{t('memberStates', { count: region.members })}</span>
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
                <h2 className="text-3xl font-black text-gray-900">{t('logisticsTitle')}</h2>
              </div>
              
              <div className="space-y-4">
                {[
                  { title: t('logisticsIntra'), desc: t('logisticsIntraDesc'), icon: <Truck className="w-5 h-5" /> },
                  { title: t('logisticsInsurance'), desc: t('logisticsInsuranceDesc'), icon: <ShieldAlert className="w-5 h-5" /> },
                  { title: t('logisticsTracking'), desc: t('logisticsTrackingDesc'), icon: <Globe2 className="w-5 h-5" /> }
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
                <h2 className="text-3xl font-black text-gray-900">{t('complianceTitle')}</h2>
              </div>
              
              <div className="bg-white rounded-3xl p-8 border border-gray-100">
                <p className="text-gray-600 font-medium mb-8">
                  {t('complianceSubtitle')}
                </p>
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="font-bold text-gray-800">{t('exportDuties')}</span>
                    </div>
                    <span className="text-xs font-black text-orange-600 uppercase">{t('exportVariable')}</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="font-bold text-gray-800">{t('customLevies')}</span>
                    </div>
                    <span className="text-xs font-black text-orange-600 uppercase">{t('customProductBased')}</span>
                  </div>
                  <div className="flex justify-between items-center bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                    <div className="flex items-center">
                      <ShieldAlert className="w-5 h-5 text-yellow-600 mr-3" />
                      <span className="font-bold text-yellow-900">{t('afcftaExemption')}</span>
                    </div>
                    <span className="text-xs font-black text-yellow-600 uppercase italic">{t('afcftaReduced')}</span>
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
            <h2 className="text-4xl md:text-5xl font-black text-black mb-8">{t('ctaTitle')}</h2>
            <p className="text-lg text-black/70 font-bold mb-10 max-w-2xl mx-auto">
              {t('ctaSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-black text-white px-12 py-5 rounded-2xl font-black text-lg transition-transform hover:scale-105">
                {t('ctaContact')}
              </button>
              <button className="bg-white text-black px-12 py-5 rounded-2xl font-black text-lg transition-transform hover:scale-105 border-2 border-black/5">
                {t('ctaDownload')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
