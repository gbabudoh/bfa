"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Filter, MapPin, Star, Shield, Tag, Factory, Store, XCircle, Loader2, Users, Palette, Shirt, Briefcase, Pickaxe, Leaf, Warehouse } from 'lucide-react';
import { useTranslations } from 'next-intl';

// Define country flags
interface CountryFlags {
  [key: string]: string;
}

// Country flag mapping
const countryFlags: CountryFlags = {
  "Nigeria": "🇳🇬",
  "Ghana": "🇬🇭",
  "Kenya": "🇰🇪",
  "South Africa": "🇿🇦",
  "Tanzania": "🇹🇿",
  "Ethiopia": "🇪🇹",
  "Morocco": "🇲🇦",
  "Senegal": "🇸🇳",
  "Worldwide": "🌍"
};

// Function to get flag based on location string
const getCountryFlag = (location: string): string => {
  if (!location) return "";
  
  // Extract country name from location (assuming format like "City, Country")
  const parts = location.split(", ");
  const country = parts.length > 1 ? parts[parts.length - 1] : location;
  
  return countryFlags[country] || "";
};

// Define types
interface Product {
  id: string;
  name: string;
  images: string[];
}

interface Vendor {
  id: string;
  storeName: string;
  description: string;
  logo: string | null;
  banner: string | null;
  location: string | null;
  rating: number;
  isVerified: boolean;
  businessType?: string;
  products: Product[];
}

interface Country {
  id: string;
  nameKey: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
}

interface BusinessTypeInfo {
  icon: React.ReactNode;
  color: string;
}

// Get business type display info
const getBusinessTypeInfo = (type: string): BusinessTypeInfo => {
  const t = (type || '').toLowerCase();
  
  if (t.includes('retailer')) {
    return { icon: <Store className="h-4 w-4" />, color: 'bg-indigo-100 text-indigo-800' };
  }
  if (t.includes('manufacturer')) {
    return { icon: <Shirt className="h-4 w-4" />, color: 'bg-green-100 text-green-800' };
  }
  if (t.includes('artisan') || t.includes('maker')) {
    return { icon: <Palette className="h-4 w-4" />, color: 'bg-blue-100 text-blue-800' };
  }
  if (t.includes('wholesaler')) {
    return { icon: <Briefcase className="h-4 w-4" />, color: 'bg-purple-100 text-purple-800' };
  }
  if (t.includes('factory')) {
    return { icon: <Factory className="h-4 w-4" />, color: 'bg-orange-100 text-orange-800' };
  }
  if (t.includes('miner')) {
    return { icon: <Pickaxe className="h-4 w-4" />, color: 'bg-zinc-100 text-zinc-800' };
  }
  if (t.includes('agribusiness')) {
    return { icon: <Leaf className="h-4 w-4" />, color: 'bg-emerald-100 text-emerald-800' };
  }

  // Fallback for any other types
  return { icon: <Tag className="h-4 w-4" />, color: 'bg-gray-100 text-gray-800' };
};

export default function VendorsPage() {
  const t = useTranslations('Vendors');
  const tc = useTranslations('Countries');
  const tct = useTranslations('Categories');
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);

  // Countries constant for filtering
  const countries: Country[] = [
    { id: 'all', nameKey: 'all' },
    { id: 'nigeria', nameKey: 'Nigeria' },
    { id: 'ghana', nameKey: 'Ghana' },
    { id: 'kenya', nameKey: 'Kenya' },
    { id: 'south-africa', nameKey: 'South Africa' },
    { id: 'ethiopia', nameKey: 'Ethiopia' },
    { id: 'tanzania', nameKey: 'Tanzania' },
    { id: 'morocco', nameKey: 'Morocco' },
    { id: 'senegal', nameKey: 'Senegal' },
  ];
  
  // URL-driven state
  const selectedBusinessType = searchParams.get('type') || 'all';
  const selectedBadge = searchParams.get('badge') || 'all';
  const selectedCountry = searchParams.get('country') || 'all';
  const selectedCategory = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const query = new URLSearchParams(searchParams.toString());
        const res = await fetch(`/api/vendors?${query.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setVendors(data);
        }

        // Fetch categories once
        if (categoriesList.length === 0) {
          const catRes = await fetch('/api/categories');
          if (catRes.ok) {
            const catData = await catRes.json();
            setCategoriesList(catData);
          }
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchParams, categoriesList.length]);

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/vendors?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push('/vendors');
  };

  return (
    <div className="relative min-h-screen bg-[#FFFDF5] overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-200/20 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/20 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
        <div className="absolute top-[20%] right-[5%] w-[30%] h-[30%] bg-purple-100/10 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">
            {t('title').split(' ').map((word, i) => (
              <span key={i} className={i === 0 ? "text-gradient-gold" : ""}>{word} </span>
            ))}
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
            {t('subtitle')}
          </p>
        </div>

        {/* Filters Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Store className="text-yellow-600 h-6 w-6" />
              {t('allVendors')}
            </h2>
            <button 
              className="md:hidden glass-card px-4 py-2 flex items-center text-gray-700 font-bold rounded-2xl transition-all active:scale-95"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            >
              <Filter className="h-5 w-5 mr-2 text-yellow-600" />
              {t('filters')}
            </button>
          </div>
          
          <div className={`glass-card rounded-[2rem] overflow-hidden transition-all duration-500 ease-in-out ${isFiltersOpen ? 'max-h-[1000px] opacity-100 mb-8' : 'max-h-0 md:max-h-[500px] opacity-0 md:opacity-100'}`}>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Business Type Filter */}
                <div className="space-y-4">
                  <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400">{t('businessType')}</h3>
                  <div className="space-y-3">
                    {[
                      { id: 'all', label: t('allBusinessTypes'), icon: <Users /> },
                      { id: 'retailer', label: 'Retailer', icon: <Store />, color: 'text-indigo-600' },
                      { id: 'manufacturer', label: 'Manufacturer', icon: <Shirt />, color: 'text-green-600' },
                      { id: 'artisan', label: 'Artisan', icon: <Palette />, color: 'text-blue-600' },
                      { id: 'wholesaler', label: 'Wholesaler', icon: <Warehouse />, color: 'text-purple-600' },
                      { id: 'factory', label: 'Factory', icon: <Factory />, color: 'text-orange-600' },
                      { id: 'miner', label: 'Miner', icon: <Pickaxe />, color: 'text-zinc-600' },
                      { id: 'agribusiness', label: 'Agribusiness', icon: <Leaf />, color: 'text-emerald-600' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => updateFilters('type', item.id)}
                        className={`w-full flex items-center text-left px-4 py-2 rounded-xl transition-all font-medium text-sm group ${selectedBusinessType === item.id ? 'bg-yellow-100 text-yellow-900 border-yellow-200' : 'hover:bg-gray-50 text-gray-600 border-transparent'} border`}
                      >
                        <span className={`mr-3 ${selectedBusinessType === item.id ? 'text-yellow-600' : 'text-gray-400 group-hover:text-yellow-600'} transition-colors`}>
                          {itemClone(item.icon, { className: 'h-4 w-4' })}
                        </span>
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Verification Level */}
                <div className="space-y-4">
                  <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400">{t('verificationLevel')}</h3>
                  <div className="space-y-3">
                    {[
                      { id: 'all', label: t('allVendors'), icon: <Shield /> },
                      { id: 'gold', label: t('goldBadge'), icon: <Star />, color: 'text-yellow-600' },
                      { id: 'blue', label: t('blueBadge'), icon: <Shield />, color: 'text-blue-600' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => updateFilters('badge', item.id)}
                        className={`w-full flex items-center text-left px-4 py-2 rounded-xl transition-all font-medium text-sm group ${selectedBadge === item.id ? 'bg-yellow-100 text-yellow-900 border-yellow-200' : 'hover:bg-gray-50 text-gray-600 border-transparent'} border`}
                      >
                        <span className={`mr-3 ${selectedBadge === item.id ? 'text-yellow-600' : 'text-gray-400 group-hover:text-yellow-600'} transition-colors`}>
                          {itemClone(item.icon, { className: 'h-4 w-4 shadow-sm' })}
                        </span>
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Country Filter */}
                <div className="space-y-4">
                  <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400">{t('countryLabel')}</h3>
                  <div className="relative group">
                    <select
                      value={selectedCountry}
                      onChange={(e) => updateFilters('country', e.target.value)}
                      className="w-full appearance-none px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all cursor-pointer"
                    >
                      {countries.map((country) => (
                        <option key={country.id} value={country.id} className="font-sans">
                          {country.id !== 'all' && countryFlags[country.nameKey]} {tc(country.nameKey)}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                      <ChevronRight className="h-4 w-4 rotate-90" />
                    </div>
                  </div>

                  <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400 pt-4">{t('categoryLabel')}</h3>
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => updateFilters('category', e.target.value)}
                      className="w-full appearance-none px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all cursor-pointer"
                    >
                      <option value="all">{tct('viewAll')}</option>
                      {categoriesList.map((category) => (
                        <option key={category.id} value={category.slug}>
                          {tct(category.slug)}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                      <ChevronRight className="h-4 w-4 rotate-90" />
                    </div>
                  </div>
                </div>

                {/* Search & Actions */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-4">{t('searchLabel')}</h3>
                    <div className="relative">
                      <input 
                        type="text"
                        placeholder={t('searchPlaceholder')}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all"
                        value={searchQuery}
                        onChange={(e) => updateFilters('search', e.target.value)}
                      />
                      <Filter className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  
                  <button 
                    onClick={clearAllFilters}
                    className="mt-6 w-full py-3 px-6 bg-gray-900 text-white rounded-2xl text-sm font-black hover:bg-black transition-all shadow-xl shadow-gray-200 active:scale-95"
                  >
                    {t('clearAll')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Active Filters Bar */}
        {(selectedBusinessType !== 'all' || selectedBadge !== 'all' || selectedCountry !== 'all' || selectedCategory !== 'all' || searchQuery) && (
          <div className="mb-10 flex flex-wrap gap-2 items-center p-4 glass-panel rounded-2xl border-white/50">
            <span className="text-xs font-black uppercase tracking-widest text-gray-400 mr-2">{t('activeFilters')}</span>
            
            {searchQuery && (
              <div className="bg-blue-50 text-blue-700 text-[10px] font-black uppercase px-3 py-1.5 rounded-full flex items-center border border-blue-100 shadow-sm">
                <span>&quot;{searchQuery}&quot;</span>
                <button onClick={() => updateFilters('search', 'all')} className="ml-2 hover:text-blue-900"><XCircle className="h-3.5 w-3.5" /></button>
              </div>
            )}
            
            {/* ... other filters with similar styling ... */}
            {selectedBusinessType !== 'all' && (
              <div className="bg-yellow-50 text-yellow-800 text-[10px] font-black uppercase px-3 py-1.5 rounded-full flex items-center border border-yellow-100 shadow-sm">
                <span>{selectedBusinessType}</span>
                <button onClick={() => updateFilters('type', 'all')} className="ml-2 hover:text-yellow-900"><XCircle className="h-3.5 w-3.5" /></button>
              </div>
            )}

            {selectedBadge !== 'all' && (
              <div className="bg-yellow-50 text-yellow-800 text-[10px] font-black uppercase px-3 py-1.5 rounded-full flex items-center border border-yellow-100 shadow-sm">
                <span>{selectedBadge} Badge</span>
                <button onClick={() => updateFilters('badge', 'all')} className="ml-2 hover:text-yellow-900"><XCircle className="h-3.5 w-3.5" /></button>
              </div>
            )}
          </div>
        )}
        
        {/* Vendor Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 glass-card rounded-[3rem]">
            <div className="relative">
              <div className="h-16 w-16 border-4 border-yellow-100 border-t-yellow-600 rounded-full animate-spin"></div>
              <Loader2 className="absolute inset-0 m-auto h-6 w-6 text-yellow-600 animate-pulse" />
            </div>
            <p className="mt-6 text-gray-400 font-bold uppercase tracking-widest text-sm">{t('loading')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vendors.length > 0 ? (
              vendors.map((vendor, index) => {
                const businessTypeInfo = getBusinessTypeInfo(vendor.businessType || 'retailer');
                const flag = getCountryFlag(vendor.location || '');
                
                return (
                  <div key={vendor.id} 
                    className="glass-card rounded-[2.5rem] group hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500 flex flex-col h-full border-white/40 overflow-hidden"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Banner Section */}
                    <div className="h-40 relative overflow-hidden">
                      {vendor.banner ? (
                        <Image src={vendor.banner} alt={vendor.storeName} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 flex items-center justify-center">
                          <Store className="text-yellow-400/30 w-16 h-16" />
                        </div>
                      )}
                      
                      {/* Badge Top Left */}
                      <div className="absolute top-4 left-4">
                        <span className={`${businessTypeInfo.color} backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center shadow-lg border border-white/20`}>
                          {itemClone(businessTypeInfo.icon, { className: 'h-3 w-3 mr-1.5' })}
                          {vendor.businessType?.toUpperCase() || 'VENDOR'}
                        </span>
                      </div>

                      {/* Verification Right */}
                      <div className="absolute top-4 right-4">
                        {vendor.isVerified ? (
                          <div className="bg-yellow-500 text-white text-[10px] font-black px-3 py-1.5 rounded-xl flex items-center shadow-lg border border-yellow-400/50">
                            <Star className="h-3 w-3 mr-1 fill-current" />
                            {t('gold')}
                          </div>
                        ) : (
                          <div className="bg-blue-600 text-white text-[10px] font-black px-3 py-1.5 rounded-xl flex items-center shadow-lg border border-blue-400/50">
                            <Shield className="h-3 w-3 mr-1 fill-current" />
                            {t('blue')}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="px-8 pt-0 pb-8 flex-1 flex flex-col">
                      <div className="relative -mt-10 mb-6 flex items-end">
                        <div className="h-20 w-20 bg-white rounded-3xl p-1.5 shadow-2xl border border-gray-100 relative overflow-hidden group-hover:rotate-3 transition-transform duration-500">
                          {vendor.logo ? (
                            <div className="relative h-full w-full rounded-[1.25rem] overflow-hidden">
                              <Image src={vendor.logo} alt={vendor.storeName} fill className="object-cover" />
                            </div>
                          ) : (
                            <div className="h-full w-full rounded-[1.25rem] bg-yellow-50 flex items-center justify-center text-yellow-600 font-black text-2xl">
                              {vendor.storeName.charAt(0)}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex-1">
                        <Link href={`/vendors/${vendor.id}`} className="block">
                          <h3 className="text-2xl font-black text-gray-900 mb-1 group-hover:text-yellow-600 transition-colors tracking-tight">
                            {vendor.storeName}
                          </h3>
                        </Link>
                        
                        <div className="flex items-center text-xs font-bold text-gray-400 space-x-3 mb-4">
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1 text-yellow-600" />
                            <span>{flag} {vendor.location || t('noLocation')}</span>
                          </div>
                          <div className="flex items-center text-yellow-600">
                            <Star className="h-3 w-3 mr-1 fill-current" />
                            <span>{vendor.rating.toFixed(1)}</span>
                          </div>
                        </div>

                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 italic font-medium mb-6">
                          &quot;{vendor.description === 'Registered African business (Gold Badge Vendor)' 
                            ? t('goldBadgeDescription') 
                            : vendor.description === 'Individual or non-registered business (Blue Badge Vendor)' 
                              ? t('blueBadgeDescription') 
                              : (vendor.description || t('defaultVendorDescription'))}&quot;
                        </p>
                      </div>

                      {/* Spotlight Items */}
                      {vendor.products && vendor.products.length > 0 && (
                        <div className="mb-6 pt-4 border-t border-gray-100/50">
                          <div className="flex space-x-2">
                            {vendor.products.slice(0, 4).map((product) => (
                              <div key={product.id} className="h-10 w-10 rounded-xl overflow-hidden glass-panel border-white group/thumb">
                                {product.images?.[0] ? (
                                  <Image src={product.images[0]} alt={product.name} width={40} height={40} className="object-cover transition-transform group-hover/thumb:scale-125" />
                                ) : (
                                  <div className="h-full w-full bg-gray-50 flex items-center justify-center text-gray-300"><Tag size={12}/></div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <Link 
                        href={`/vendors/${vendor.id}`}
                        className="w-full py-4 px-6 bg-white border border-gray-100 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-900 shadow-sm group-hover:bg-yellow-600 group-hover:text-white group-hover:border-yellow-500 transition-all flex items-center justify-center gap-2"
                      >
                        {t('viewProfile')}
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full py-32 text-center glass-card rounded-[3rem]">
                <div className="bg-yellow-50 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <XCircle size={48} className="text-yellow-200" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">{t('emptyTitle')}</h3>
                <p className="text-gray-500 max-w-sm mx-auto mb-10 font-medium">{t('emptyText')}</p>
                <button onClick={clearAllFilters} className="bg-black text-white px-10 py-4 rounded-3xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform">
                  {t('resetAll')}
                </button>
              </div>
            )}
          </div>
        )}
        
        {/* Modern Pagination */}
        {vendors.length > 0 && (
          <div className="mt-20 flex justify-center">
            <div className="glass-card flex items-center p-2 rounded-3xl border-white/50">
              <button className="h-12 w-12 flex items-center justify-center rounded-2xl hover:bg-white transition-colors text-gray-400 hover:text-yellow-600">
                <ChevronLeft size={20} />
              </button>
              <div className="flex px-4 gap-1">
                {[1, 2, 3].map((n) => (
                  <button key={n} className={`h-12 w-12 flex items-center justify-center rounded-2xl font-black text-sm transition-all ${n === 1 ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-200' : 'hover:bg-white text-gray-400 hover:text-gray-900'}`}>
                    {n}
                  </button>
                ))}
              </div>
              <button className="h-12 w-12 flex items-center justify-center rounded-2xl hover:bg-white transition-colors text-gray-400 hover:text-yellow-600">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper to clone icons with props safely
function itemClone(item: React.ReactNode, props: React.SVGProps<SVGSVGElement>) {
  if (React.isValidElement(item)) {
    return React.cloneElement(item as React.ReactElement<React.SVGProps<SVGSVGElement>>, props);
  }
  return item;
}