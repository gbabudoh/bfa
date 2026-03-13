"use client";

import React from 'react';
import { 
  Building2, 
  Globe, 
  CreditCard, 
  Banknote, 
  ShieldCheck, 
  ArrowRight, 
  ExternalLink,
  Users,
  Briefcase,
  Map,
  ShieldAlert,
  Zap,
  LayoutGrid
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function PartnershipsPage() {
  const t = useTranslations('Partnerships');
  const tc = useTranslations('Countries');

  const partnerships = [
    {
      category: t('ministriesCategory'),
      description: t('ministriesDesc'),
      icon: <Globe className="w-8 h-8 text-blue-600" />,
      color: "blue",
      partners: [
        { name: "Federal Ministry of Industry, Trade and Investment", country: tc('Nigeria'), link: "#" },
        { name: "Ministry of Trade and Industry (MoTI)", country: tc('Ghana'), link: "#" },
        { name: "Ministry of Industrialization, Trade and Enterprise Development", country: tc('Kenya'), link: "#" },
        { name: "Department of Trade, Industry and Competition (the dtic)", country: tc('South Africa'), link: "#" }
      ]
    },
    {
      category: t('chambersCategory'),
      description: t('chambersDesc'),
      icon: <Building2 className="w-8 h-8 text-yellow-600" />,
      color: "yellow",
      partners: [
        { name: "Lagos Chamber of Commerce and Industry", country: tc('Nigeria'), link: "#" },
        { name: "South African Chamber of Commerce and Industry", country: tc('South Africa'), link: "#" },
        { name: "Kenya National Chamber of Commerce & Industry", country: tc('Kenya'), link: "#" },
        { name: "Ethiopian Chamber of Commerce and Sectoral Associations", country: tc('Ethiopia'), link: "#" }
      ]
    },
    {
      category: t('banksCategory'),
      description: t('banksDesc'),
      icon: <Banknote className="w-8 h-8 text-green-600" />,
      color: "green",
      partners: [
        { name: "African Export-Import Bank (Afreximbank)", country: t('regionRegional'), link: "#" },
        { name: "African Development Bank Group (AfDB)", country: t('regionRegional'), link: "#" },
        { name: "Ecobank Transnational Inc.", country: t('regionPanAfrican'), link: "#" },
        { name: "Standard Bank Group", country: t('regionPanAfrican'), link: "#" }
      ]
    },
    {
      category: t('paymentCategory'),
      description: t('paymentDesc'),
      icon: <CreditCard className="w-8 h-8 text-purple-600" />,
      color: "purple",
      partners: [
        { name: "Flutterwave", country: t('regionPanAfrican'), link: "#" },
        { name: "Paystack", country: t('regionPanAfrican'), link: "#" },
        { name: "M-Pesa (Safaricom)", country: t('regionEastAfrica'), link: "#" },
        { name: "Interswitch", country: t('regionWestAfrica'), link: "#" }
      ]
    },
    {
      category: t('microfinanceCategory'),
      description: t('microfinanceDesc'),
      icon: <Users className="w-8 h-8 text-orange-600" />,
      color: "orange",
      partners: [
        { name: "LAPO Microfinance Bank", country: tc('Nigeria'), link: "#" },
        { name: "Faulu Microfinance Bank", country: tc('Kenya'), link: "#" },
        { name: "Advans Group", country: t('regionPanAfrican'), link: "#" },
        { name: "FINCA Impact Finance", country: t('regionPanAfrican'), link: "#" }
      ]
    }
  ];

  const tradeKnowledge = [
    {
      title: t('afcftaTitle'),
      description: t('afcftaDesc'),
      icon: <Globe className="w-6 h-6 text-yellow-600" />,
      badge: t('afcftaBadge')
    },
    {
      title: t('papssTitle'),
      description: t('papssDesc'),
      icon: <Banknote className="w-6 h-6 text-green-600" />,
      badge: t('papssBadge')
    },
    {
      title: t('ecowasTitle'),
      description: t('ecowasDesc'),
      icon: <ShieldAlert className="w-6 h-6 text-blue-600" />,
      badge: t('ecowasBadge')
    },
    {
      title: t('eacTitle'),
      description: t('eacDesc'),
      icon: <Zap className="w-6 h-6 text-purple-600" />,
      badge: t('eacBadge')
    },
    {
      title: t('sadcTitle'),
      description: t('sadcDesc'),
      icon: <Map className="w-6 h-6 text-orange-600" />,
      badge: t('sadcBadge')
    },
    {
      title: t('comesaTitle'),
      description: t('comesaDesc'),
      icon: <LayoutGrid className="w-6 h-6 text-indigo-600" />,
      badge: t('comesaBadge')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <section className="bg-yellow-600 py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" fill="none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" stroke="white" strokeWidth="0.5" />
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-6"
          >
            {t('heroTitle')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-yellow-50 max-w-3xl mx-auto font-medium"
          >
            {t('heroSubtitle')}
          </motion.p>
        </div>
      </section>

      {/* Directory Grid */}
      <section className="max-w-7xl mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partnerships.map((group, index) => (
            <motion.div 
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col h-full hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`p-4 rounded-2xl bg-${group.color}-50`}>
                  {group.icon}
                </div>
                <Briefcase className="text-gray-200 w-10 h-10" />
              </div>

              <h2 className="text-2xl font-black text-gray-900 mb-3">{group.category}</h2>
              <p className="text-gray-500 font-medium mb-8 flex-grow">{group.description}</p>

              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">{t('keyPartners')}</h3>
                <div className="grid grid-cols-1 gap-2">
                  {group.partners.map((partner) => (
                    <a 
                      key={partner.name}
                      href={partner.link}
                      className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-yellow-50 group transition-colors duration-300"
                    >
                      <div>
                        <span className="block font-bold text-gray-800 text-sm group-hover:text-yellow-700">{partner.name}</span>
                        <span className="text-[10px] font-black uppercase tracking-tighter text-gray-400 group-hover:text-yellow-500">{partner.country}</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-yellow-500 transition-transform group-hover:scale-110" />
                    </a>
                  ))}
                </div>
              </div>

              <button className={`mt-8 w-full py-4 rounded-2xl bg-${group.color}-600 hover:bg-${group.color}-700 text-white font-black text-sm transition-all duration-300 flex items-center justify-center`}>
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trade Intelligence Section */}
      <section className="max-w-7xl mx-auto px-4 mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-gray-200 pb-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">{t('tradeIntelligence')}</h2>
            <p className="text-gray-500 font-medium text-lg leading-relaxed">
              {t('tradeIntelligenceSubtitle')}
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex items-center space-x-2 text-yellow-600 font-black text-sm uppercase tracking-widest bg-yellow-50 px-6 py-3 rounded-2xl border border-yellow-100">
            <ShieldCheck className="w-5 h-5" />
            <span>{t('continentalIntelligence')}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tradeKnowledge.map((item, index) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + (index * 0.05) }}
              className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-lg shadow-gray-200/40 flex flex-col hover:border-yellow-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100">
                  {item.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full">
                  {item.badge}
                </span>
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-4 leading-tight">{item.title}</h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed mb-6 flex-grow">
                {item.description}
              </p>
              <div className="flex items-center text-xs font-black text-yellow-600 group cursor-pointer">
                <span>{t('learnMore')}</span>
                <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Become a Partner Call to Action */}
      <section className="max-w-7xl mx-auto px-4 mt-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-900 rounded-[2.5rem] p-12 text-center relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <ShieldCheck className="w-48 h-48 text-white rotate-12" />
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">{t('ctaTitle')}</h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed font-medium">
              {t('ctaSubtitle')}
            </p>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-12 py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-yellow-500/20 active:scale-95">
              {t('applyButton')}
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
