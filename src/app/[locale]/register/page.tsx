"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { globalCountries } from '@/lib/countries';
import { 
  User, 
  Building2, 
  Shield, 
  Star, 
  Mail, 
  Factory,
  Shirt,
  Palette,
  Leaf,
  Armchair,
  Activity,
  Cpu,
  Zap,
  Plane,
  Briefcase,
  Package,
  ShoppingBag,
  Warehouse,
  Pickaxe,
  ArrowRight,
  CheckCircle2,
  Lock,
  ArrowLeft
} from 'lucide-react';

export default function RegisterPage() {
  const t = useTranslations('Register');
  const tc = useTranslations('RegistrationCategories');
  const [selectedRole, setSelectedRole] = useState<'buyer' | 'vendor' | null>(null);
  const [selectedVendorType, setSelectedVendorType] = useState('artisan');
  const [badgeType, setBadgeType] = useState('blue');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = [
    { id: 'agribusiness', name: tc('agribusiness'), icon: Leaf },
    { id: 'fashion', name: tc('fashion'), icon: Shirt },
    { id: 'infrastructure', name: tc('infrastructure'), icon: Factory },
    { id: 'tech', name: tc('tech'), icon: Cpu },
    { id: 'healthcare', name: tc('healthcare'), icon: Activity },
    { id: 'energy', name: tc('energy'), icon: Zap },
    { id: 'home', name: tc('home'), icon: Armchair },
    { id: 'packaging', name: tc('packaging'), icon: Package },
    { id: 'consumer', name: tc('consumer'), icon: ShoppingBag },
    { id: 'artisanal', name: tc('artisanal'), icon: Palette },
    { id: 'manufacturing', name: tc('manufacturing'), icon: Plane },
    { id: 'professional', name: tc('professional'), icon: Briefcase },
  ];

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
  };

  if (!mounted) return null;

  const CategorySelection = () => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
      {categories.map((cat) => (
        <motion.div
          key={cat.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => toggleCategory(cat.id)}
          className={`relative p-3 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center overflow-hidden h-24 ${
            selectedCategories.includes(cat.id)
              ? 'bg-yellow-500/10 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.2)]'
              : 'bg-white/40 border-white/50 backdrop-blur-md hover:bg-white/60'
          }`}
        >
          <cat.icon className={`h-6 w-6 mb-2 transition-colors duration-300 ${
            selectedCategories.includes(cat.id) ? 'text-yellow-600' : 'text-gray-500'
          }`} />
          <span className={`text-[9px] font-bold leading-tight uppercase tracking-widest ${
            selectedCategories.includes(cat.id) ? 'text-yellow-800' : 'text-gray-600'
          }`}>{cat.name}</span>
          
          {selectedCategories.includes(cat.id) && (
            <motion.div 
              layoutId="glow"
              className="absolute inset-0 bg-yellow-400/10 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden font-sans selection:bg-yellow-200 selection:text-yellow-900">
      {/* Premium Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#fdfcf1]" />
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-yellow-200/40 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -80, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] bg-amber-100/30 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 50, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] bg-orange-50/40 rounded-full blur-[80px]"
        />
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-700 text-sm font-semibold mb-6 backdrop-blur-md"
          >
            <Shield className="w-4 h-4 mr-2" />
            {t('verifiedProfiles')}
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
            {t('description')}
          </p>
        </motion.div>

        {!selectedRole ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Buyer Choice Card */}
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => setSelectedRole('buyer')}
              className="group relative bg-white/40 backdrop-blur-xl border border-white/60 rounded-[2.5rem] p-10 cursor-pointer overflow-hidden shadow-2xl shadow-yellow-900/5 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 p-8">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-yellow-500/10 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-yellow-500 transition-colors duration-500">
                  <User className="w-10 h-10 text-yellow-600 group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">{t('asBuyer')}</h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {t('buyerDesc')}
                </p>
                <div className="space-y-4">
                   {[t('globalReach'), t('secureCommunication'), t('verifiedProfiles')].map((item, i) => (
                     <div key={i} className="flex items-center text-gray-700 font-medium">
                       <CheckCircle2 className="w-5 h-5 text-yellow-500 mr-3" />
                       {item}
                     </div>
                   ))}
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-tl-[100px] -mr-16 -mb-16 group-hover:bg-yellow-500/10 transition-colors duration-500" />
            </motion.div>

            {/* Vendor Choice Card */}
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => setSelectedRole('vendor')}
              className="group relative bg-white/40 backdrop-blur-xl border border-white/60 rounded-[2.5rem] p-10 cursor-pointer overflow-hidden shadow-2xl shadow-yellow-900/5 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 p-8">
                <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-yellow-600/10 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-yellow-600 transition-colors duration-500">
                  <Building2 className="w-10 h-10 text-yellow-600 group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">{t('asVendor')}</h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {t('vendorDesc')}
                </p>
                <div className="space-y-4">
                   {[t('artisanType'), t('brandType'), t('factoryType'), t('exportType')].map((item, i) => (
                     <div key={i} className="flex items-center text-gray-700 font-medium">
                       <CheckCircle2 className="w-5 h-5 text-yellow-600 mr-3" />
                       {item}
                     </div>
                   ))}
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-yellow-600/5 rounded-tl-[100px] -mr-16 -mb-16 group-hover:bg-yellow-600/10 transition-colors duration-500" />
            </motion.div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-8 flex items-center justify-between">
              <button 
                onClick={() => setSelectedRole(null)}
                className="inline-flex items-center text-gray-600 hover:text-gray-900 font-bold transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-md border border-white/60 flex items-center justify-center mr-3 group-hover:bg-white/60 transition-all">
                  <ArrowLeft className="w-5 h-5" />
                </div>
                {t('goBack')}
              </button>
              <div className="px-6 py-2 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 font-bold text-gray-900 capitalize">
                {selectedRole === 'buyer' ? t('asBuyer') : t('asVendor')}
              </div>
            </div>

            <div className="bg-white/40 backdrop-blur-2xl border border-white/60 shadow-2xl shadow-yellow-900/10 rounded-[2.5rem] p-8 md:p-12">
              <AnimatePresence mode="wait">
                {selectedRole === 'buyer' ? (
                  <motion.div
                    key="buyer-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="text-center mb-12">
                      <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{t('buyerTitle')}</h2>
                      <p className="text-gray-600 font-medium">{t('buyerDesc')}</p>
                    </div>

                    <form className="space-y-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-800 ml-1">{t('firstName')}</label>
                          <input
                            type="text"
                            className="w-full bg-white/50 border border-white focus:border-yellow-500 focus:bg-white focus:ring-4 focus:ring-yellow-500/10 rounded-2xl px-6 py-4 outline-none transition-all duration-300 font-medium text-gray-900"
                            placeholder="John"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-800 ml-1">{t('lastName')}</label>
                          <input
                            type="text"
                            className="w-full bg-white/50 border border-white focus:border-yellow-500 focus:bg-white focus:ring-4 focus:ring-yellow-500/10 rounded-2xl px-6 py-4 outline-none transition-all duration-300 font-medium text-gray-900"
                            placeholder="Doe"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-800 ml-1">{t('email')}</label>
                        <div className="relative">
                          <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            className="w-full bg-white/50 border border-white focus:border-yellow-500 focus:bg-white focus:ring-4 focus:ring-yellow-500/10 rounded-2xl pl-16 pr-6 py-4 outline-none transition-all duration-300 font-medium text-gray-900"
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-800 ml-1">{t('password')}</label>
                        <div className="relative">
                          <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="password"
                            className="w-full bg-white/50 border border-white focus:border-yellow-500 focus:bg-white focus:ring-4 focus:ring-yellow-500/10 rounded-2xl pl-16 pr-6 py-4 outline-none transition-all duration-300 font-medium text-gray-900"
                            placeholder="••••••••"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-800 ml-1">{t('country')}</label>
                        <select
                          className="w-full bg-white/50 border border-white focus:border-yellow-500 focus:bg-white focus:ring-4 focus:ring-yellow-500/10 rounded-2xl px-6 py-4 outline-none transition-all duration-300 font-medium text-gray-900 appearance-none cursor-pointer"
                          required
                        >
                          <option value="">{t('countrySelect')}</option>
                          {globalCountries.map((country) => (
                            <option key={country.value} value={country.value}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white rounded-2xl py-5 font-black text-lg tracking-wide shadow-xl shadow-yellow-500/20 active:scale-[0.98] transition-all flex items-center justify-center group"
                      >
                        {t('asBuyer')}
                        <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="vendor-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="text-center mb-12">
                      <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{t('vendorTitle')}</h2>
                      <p className="text-gray-600 font-medium">{t('vendorDesc')}</p>
                    </div>

                    {/* Vendor Type Selection with modern visual style */}
                    <div className="mb-12">
                      <label className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6 block ml-1">{t('businessType')}</label>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { id: 'retailer', icon: ShoppingBag, color: 'blue', label: 'Retailer' },
                          { id: 'manufacturer', icon: Shirt, color: 'green', label: 'Manufacturer' },
                          { id: 'artisan', icon: Palette, color: 'yellow', label: 'Artisan' },
                          { id: 'wholesaler', icon: Warehouse, color: 'purple', label: 'Wholesaler' },
                          { id: 'factory', icon: Factory, color: 'orange', label: 'Factory' },
                          { id: 'miner', icon: Pickaxe, color: 'zinc', label: 'Miner' },
                          { id: 'agribusiness', icon: Leaf, color: 'emerald', label: 'Agribusiness' }
                        ].map((type) => (
                          <motion.div
                            key={type.id}
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedVendorType(type.id)}
                            className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col items-center text-center ${
                              selectedVendorType === type.id
                                ? `bg-white border-white shadow-2xl`
                                : `bg-white/30 border-white/50 backdrop-blur-md opacity-60 grayscale hover:grayscale-0 hover:opacity-100`
                            }`}
                          >
                            <type.icon className={`w-8 h-8 mb-4 ${
                              selectedVendorType === type.id 
                                ? type.color === 'blue' ? 'text-blue-500' : type.color === 'green' ? 'text-green-500' : type.color === 'yellow' ? 'text-yellow-500' : type.color === 'purple' ? 'text-purple-500' : type.color === 'orange' ? 'text-orange-500' : type.color === 'zinc' ? 'text-zinc-600' : 'text-emerald-500'
                                : 'text-gray-600'
                            }`} />
                            <span className="text-xs font-black uppercase tracking-tight leading-tight">{type.label}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <form className="space-y-8">
                       <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-800 ml-1">{t('businessName')}</label>
                        <input
                          type="text"
                          className="w-full bg-white/50 border border-white focus:border-yellow-600 focus:bg-white focus:ring-4 focus:ring-yellow-600/10 rounded-2xl px-6 py-4 outline-none transition-all duration-300 font-medium text-gray-900"
                          placeholder="Your Company Name"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-800 ml-1">{t('email')}</label>
                          <input
                            type="email"
                            className="w-full bg-white/50 border border-white focus:border-yellow-600 focus:bg-white focus:ring-4 focus:ring-yellow-600/10 rounded-2xl px-6 py-4 outline-none transition-all duration-300 font-medium text-gray-900"
                            placeholder="business@example.com"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-800 ml-1">{t('password')}</label>
                          <input
                            type="password"
                            className="w-full bg-white/50 border border-white focus:border-yellow-600 focus:bg-white focus:ring-4 focus:ring-yellow-600/10 rounded-2xl px-6 py-4 outline-none transition-all duration-300 font-medium text-gray-900"
                            placeholder="••••••••"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-800 ml-1">{t('countryInAfrica')}</label>
                        <select
                          className="w-full bg-white/50 border border-white focus:border-yellow-600 focus:bg-white focus:ring-4 focus:ring-yellow-600/10 rounded-2xl px-6 py-4 outline-none transition-all duration-300 font-medium text-gray-900 appearance-none cursor-pointer"
                          required
                        >
                          <option value="">{t('countrySelect')}</option>
                          {globalCountries.map((country) => (
                            <option key={country.value} value={country.value}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Dynamic Sections Based on Type */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={selectedVendorType}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-8 rounded-[2rem] bg-white/40 border border-white/60 space-y-6"
                        >
                          <div className="flex items-center mb-2">
                             <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                               <CheckCircle2 className="w-5 h-5 text-white" />
                             </div>
                             <h4 className="text-lg font-bold text-gray-900">
                               {selectedVendorType === 'artisan' ? t('artisanInfo') : 
                                selectedVendorType === 'brand' ? t('brandInfo') :
                                selectedVendorType === 'factory' ? t('factoryInfo') : t('distributorInfo')}
                             </h4>
                          </div>

                          {selectedVendorType !== 'wholesaler' ? (
                            <div className="space-y-4">
                              <label className="text-sm font-black uppercase tracking-widest text-gray-500 ml-1">
                                {selectedVendorType === 'factory' || selectedVendorType === 'manufacturer' ? t('factoryCategories') : t('craftedCategories')}
                              </label>
                              <CategorySelection />
                              
                              <div className="space-y-2 pt-4">
                                <label className="text-sm font-bold text-gray-800 ml-1">
                                  {selectedVendorType === 'factory' ? t('factoryCapacity') : t('monthlyCapacity')}
                                </label>
                                <input
                                  type="text"
                                  className="w-full bg-white/50 border border-white focus:border-yellow-500 focus:bg-white rounded-2xl px-6 py-4 outline-none"
                                  placeholder={selectedVendorType === 'factory' ? t('factoryCapacityPlaceholder') : t('artisanCapacityPlaceholder')}
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-6">
                              <div className="space-y-4">
                                <label className="text-sm font-black uppercase tracking-widest text-gray-500 ml-1">{t('servicesOffered')}</label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                  {['logistics', 'customs', 'sourcing'].map((serv) => (
                                    <div key={serv} className="bg-white/40 backdrop-blur-md rounded-2xl p-4 border border-white/60 flex items-center">
                                      <input type="checkbox" id={serv} className="w-5 h-5 rounded-lg border-white/80 text-yellow-600 focus:ring-yellow-500/20" />
                                      <label htmlFor={serv} className="ml-3 text-sm font-bold text-gray-700 capitalize">{t(serv)}</label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="space-y-4">
                                <label className="text-sm font-black uppercase tracking-widest text-gray-500 ml-1">{t('focusCategories')}</label>
                                <CategorySelection />
                              </div>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>

                      {/* Badge Selection */}
                      <div className="space-y-4">
                        <label className="text-sm font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">{t('badgeType')}</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            { id: 'blue', icon: Shield, label: t('blueBadge'), desc: t('blueBadgeDesc'), color: 'blue' },
                            { id: 'gold', icon: Star, label: t('goldBadge'), desc: t('goldBadgeDesc'), color: 'yellow' }
                          ].map((badge) => (
                            <motion.div
                              key={badge.id}
                              whileHover={{ scale: 1.01 }}
                              onClick={() => setBadgeType(badge.id)}
                              className={`p-6 rounded-[2rem] border transition-all duration-300 cursor-pointer flex items-start ${
                                badgeType === badge.id
                                  ? 'bg-white border-white shadow-xl'
                                  : 'bg-white/30 border-white/50 opacity-60'
                              }`}
                            >
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-4 ${
                                badgeType === badge.id 
                                  ? badge.id === 'blue' ? 'bg-blue-500 text-white' : 'bg-yellow-500 text-white'
                                  : 'bg-gray-200 text-gray-500'
                              }`}>
                                <badge.icon className="w-6 h-6" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-black text-gray-900 mb-1">{badge.label}</h4>
                                <p className="text-xs text-gray-600 leading-relaxed font-medium">{badge.desc}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {badgeType === 'gold' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-6 pt-4"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-sm font-bold text-gray-800 ml-1">{t('registrationNumber')}</label>
                              <input type="text" className="w-full bg-white/50 border border-white focus:bg-white focus:border-yellow-600 rounded-2xl px-6 py-4 outline-none" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-bold text-gray-800 ml-1">{t('taxId')}</label>
                              <input type="text" className="w-full bg-white/50 border border-white focus:bg-white focus:border-yellow-600 rounded-2xl px-6 py-4 outline-none" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-800 ml-1">{t('uploadDocument')}</label>
                            <label className="relative group cursor-pointer block">
                              <div className="w-full bg-white/50 border-2 border-dashed border-white/80 group-hover:border-yellow-500/50 rounded-2xl p-10 flex flex-col items-center justify-center transition-all bg-white/10 hover:bg-white/30">
                                <Package className="w-10 h-10 text-gray-400 group-hover:text-yellow-500 transition-colors mb-4" />
                                <span className="font-black text-gray-900">{t('fileRequirements')}</span>
                                <span className="text-xs text-gray-500 mt-2 font-bold uppercase tracking-widest">{t('uploadDocument')}</span>
                              </div>
                              <input type="file" className="hidden" />
                            </label>
                          </div>
                        </motion.div>
                      )}

                      <button
                        type="submit"
                        className="w-full bg-yellow-600 hover:bg-yellow-700 text-white rounded-2xl py-5 font-black text-lg tracking-wide shadow-xl shadow-yellow-600/20 active:scale-[0.98] transition-all flex items-center justify-center group"
                      >
                        {t('asVendor')}
                        <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="mt-8 text-center text-gray-500 font-medium text-sm">
              <p className="max-w-md mx-auto leading-relaxed">
                {t('agreeToTerms')} <Link href="/terms" className="text-yellow-700 font-bold hover:underline cursor-pointer">{t('terms')}</Link> {t('and')} <Link href="/privacy" className="text-yellow-700 font-bold hover:underline cursor-pointer">{t('privacy')}</Link>
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Decorative Blur Orbs */}
      <div className="fixed -bottom-20 -right-20 w-96 h-96 bg-yellow-400/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed -top-40 -left-40 w-[30rem] h-[30rem] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
}
