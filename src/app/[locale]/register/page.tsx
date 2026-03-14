"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { globalCountries } from '@/lib/countries';
import { 
  User, 
  Building2, 
  ChevronRight, 
  Shield, 
  Star, 
  Mail, 
  Factory, 
  Globe,
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
  ShoppingBag
} from 'lucide-react';


export default function RegisterPage() {
  const t = useTranslations('Register');
  const tc = useTranslations('RegistrationCategories');
  const [selectedRole, setSelectedRole] = useState('buyer');
  const [selectedVendorType, setSelectedVendorType] = useState('artisan');
  const [badgeType, setBadgeType] = useState('blue');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
 
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

  const CategorySelection = () => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
      {categories.map((cat) => (
        <div
          key={cat.id}
          onClick={() => toggleCategory(cat.id)}
          className={`p-4 border rounded-xl flex flex-col items-center justify-center transition cursor-pointer group hover:bg-yellow-50 ${
            selectedCategories.includes(cat.id)
              ? 'border-yellow-500 bg-yellow-50 ring-1 ring-yellow-500 shadow-sm'
              : 'border-gray-200 bg-white hover:border-yellow-200 shadow-sm'
          }`}
        >
          <cat.icon className={`h-8 w-8 mb-3 transition-transform duration-300 ${
            selectedCategories.includes(cat.id) ? 'text-yellow-600 scale-110' : 'text-gray-400 group-hover:text-yellow-500'
          }`} />
          <span className={`text-[10px] font-black text-center leading-tight uppercase tracking-wider ${
            selectedCategories.includes(cat.id) ? 'text-yellow-700' : 'text-gray-500'
          }`}>{cat.name}</span>
          {selectedCategories.includes(cat.id) && (
            <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-400 via-yellow-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{t('title')}</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>
        
        {/* Role Selection Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
          <div className="flex flex-wrap">
            <button
              className={`flex-grow px-4 py-3 text-center rounded-lg font-medium transition cursor-pointer ${
                selectedRole === 'buyer'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedRole('buyer')}
            >
              <User className="h-5 w-5 mx-auto mb-1 cursor-pointer" />
              {t('asBuyer')}
            </button>
            <button
              className={`flex-grow px-4 py-3 text-center rounded-lg font-medium transition cursor-pointer ${
                selectedRole === 'vendor'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedRole('vendor')}
            >
              <Building2 className="h-5 w-5 mx-auto mb-1 cursor-pointer" />
              {t('asVendor')}
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Buyer Registration */}
          {selectedRole === 'buyer' && (
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition col-span-1 md:col-span-2">
              <div className="mb-8 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-yellow-600 cursor-pointer" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{t('buyerTitle')}</h2>
                <p className="mt-2 text-gray-600">
                  {t('buyerDesc')}
                </p>
              </div>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('firstName')}
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('lastName')}
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="buyerEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('email')}
                  </label>
                  <input
                    type="email"
                    id="buyerEmail"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="buyerPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('password')}
                  </label>
                  <input
                    type="password"
                    id="buyerPassword"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="buyerCountry" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('country')}
                  </label>
                  <select
                    id="buyerCountry"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 cursor-pointer"
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
                
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-lg font-medium transition flex items-center justify-center cursor-pointer"
                  >
                    {t('asBuyer')} <ChevronRight className="ml-2 h-5 w-5 cursor-pointer" />
                  </button>
                </div>
              </form>
              
              <div className="mt-6 text-center text-gray-600 text-sm">
                <p>{t('agreeToTerms')} <Link href="/terms" className="text-yellow-600 hover:underline cursor-pointer">{t('terms')}</Link> {t('and')} <Link href="/privacy" className="text-yellow-600 hover:underline cursor-pointer">{t('privacy')}</Link></p>
              </div>
            </div>
          )}
          
          {/* Vendor Registration */}
          {selectedRole === 'vendor' && (
            <div className="col-span-1 md:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition mb-8">
                <div className="mb-8 text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-8 w-8 text-yellow-600 cursor-pointer" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{t('vendorTitle')}</h2>
                  <p className="mt-2 text-gray-600">
                    {t('vendorDesc')}
                  </p>
                </div>
                
                {/* Vendor Type Selection */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('businessType')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div 
                      className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition ${
                        selectedVendorType === 'artisan' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                      onClick={() => setSelectedVendorType('artisan')}
                    >
                      <Palette className={`h-8 w-8 mb-2 cursor-pointer ${selectedVendorType === 'artisan' ? 'text-blue-600' : 'text-gray-500'}`} />
                      <h4 className="font-medium text-center cursor-pointer">{t('artisanType')}</h4>
                      <p className="text-xs text-gray-500 text-center mt-1 cursor-pointer">{t('artisanDesc')}</p>
                    </div>
                    
                    <div 
                      className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition ${
                        selectedVendorType === 'brand' 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-300 hover:border-green-300'
                      }`}
                      onClick={() => setSelectedVendorType('brand')}
                    >
                      <Shirt className={`h-8 w-8 mb-2 cursor-pointer ${selectedVendorType === 'brand' ? 'text-green-600' : 'text-gray-500'}`} />
                      <h4 className="font-medium text-center cursor-pointer">{t('brandType')}</h4>
                      <p className="text-xs text-gray-500 text-center mt-1 cursor-pointer">{t('brandDesc')}</p>
                    </div>
                    
                    <div 
                      className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition ${
                        selectedVendorType === 'factory' 
                          ? 'border-yellow-500 bg-yellow-50' 
                          : 'border-gray-300 hover:border-yellow-300'
                      }`}
                      onClick={() => setSelectedVendorType('factory')}
                    >
                      <Factory className={`h-8 w-8 mb-2 cursor-pointer ${selectedVendorType === 'factory' ? 'text-yellow-600' : 'text-gray-500'}`} />
                      <h4 className="font-medium text-center cursor-pointer">{t('factoryType')}</h4>
                      <p className="text-xs text-gray-500 text-center mt-1 cursor-pointer">{t('factoryDesc')}</p>
                    </div>
                    
                    <div 
                      className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition ${
                        selectedVendorType === 'export' 
                          ? 'border-purple-500 bg-purple-50' 
                          : 'border-gray-300 hover:border-purple-300'
                      }`}
                      onClick={() => setSelectedVendorType('export')}
                    >
                      <Globe className={`h-8 w-8 mb-2 cursor-pointer ${selectedVendorType === 'export' ? 'text-purple-600' : 'text-gray-500'}`} />
                      <h4 className="font-medium text-center cursor-pointer">{t('exportType')}</h4>
                      <p className="text-xs text-gray-500 text-center mt-1 cursor-pointer">{t('exportDesc')}</p>
                    </div>
                  </div>
                </div>
                
                <form className="space-y-6">
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('businessName')}
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="vendorEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('email')}
                    </label>
                    <input
                      type="email"
                      id="vendorEmail"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="vendorPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('password')}
                    </label>
                    <input
                      type="password"
                      id="vendorPassword"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="vendorCountry" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('countryInAfrica')}
                    </label>
                    <select
                      id="vendorCountry"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 cursor-pointer"
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
                  
                  {/* Specific fields based on vendor type */}
                  {selectedVendorType === 'artisan' && (
                    <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-gray-900">{t('artisanInfo')}</h4>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                          {t('craftedCategories')}
                        </label>
                        <CategorySelection />
                        <p className="text-xs text-gray-500 mt-4 font-medium italic">{t('clickCategories')}</p>
                      </div>
                      
                      <div>
                        <label htmlFor="artisanCapacity" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('monthlyCapacity')}
                        </label>
                        <input
                          type="text"
                          id="artisanCapacity"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          placeholder={t('artisanCapacityPlaceholder')}
                        />
                      </div>
                    </div>
                  )}
                  
                  {selectedVendorType === 'brand' && (
                    <div className="space-y-4 p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-gray-900">{t('brandInfo')}</h4>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                          {t('craftedCategories')}
                        </label>
                        <CategorySelection />
                        <p className="text-xs text-gray-500 mt-4 font-medium italic">{t('clickCategories')}</p>
                      </div>
                      <div>
                        <label htmlFor="brandVision" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('brandVision')}
                        </label>
                        <textarea
                          id="brandVision"
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          placeholder={t('brandVisionPlaceholder')}
                        />
                      </div>
                    </div>
                  )}
                  
                  {selectedVendorType === 'factory' && (
                    <div className="space-y-4 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-medium text-gray-900">{t('factoryInfo')}</h4>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                          {t('factoryCategories')}
                        </label>
                        <CategorySelection />
                        <p className="text-xs text-gray-500 mt-4 font-medium italic">{t('clickCategories')}</p>
                      </div>
                      
                      <div>
                        <label htmlFor="factoryCapacity" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('factoryCapacity')}
                        </label>
                        <input
                          type="text"
                          id="factoryCapacity"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          placeholder={t('factoryCapacityPlaceholder')}
                        />
                      </div>
                    </div>
                  )}
                  
                  {selectedVendorType === 'export' && (
                    <div className="space-y-4 p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-medium text-gray-900">{t('distributorInfo')}</h4>
                      <div>
                        <label htmlFor="exportServices" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('servicesOffered')}
                        </label>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input type="checkbox" id="export_logistics" className="h-4 w-4 text-purple-600 border-gray-300 rounded" />
                            <label htmlFor="export_logistics" className="ml-2 text-sm text-gray-700">{t('logistics')}</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="export_customs" className="h-4 w-4 text-purple-600 border-gray-300 rounded" />
                            <label htmlFor="export_customs" className="ml-2 text-sm text-gray-700">{t('customs')}</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="export_sourcing" className="h-4 w-4 text-purple-600 border-gray-300 rounded" />
                            <label htmlFor="export_sourcing" className="ml-2 text-sm text-gray-700">{t('sourcing')}</label>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                          {t('focusCategories')}
                        </label>
                        <CategorySelection />
                        <p className="text-xs text-gray-500 mt-4 font-medium italic">{t('focusCategoriesDesc')}</p>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      {t('badgeType')}
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className={`border rounded-lg p-4 flex items-start hover:border-blue-500 cursor-pointer ${
                        badgeType === 'blue' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                      }`}
                        onClick={() => setBadgeType('blue')}
                      >
                        <input
                          type="radio"
                          id="blueVendor"
                          name="vendorType"
                          value="blue"
                          className="mt-1 mr-3"
                          checked={badgeType === 'blue'}
                          onChange={() => setBadgeType('blue')}
                        />
                        <div>
                          <label htmlFor="blueVendor" className="flex items-center cursor-pointer">
                            <Shield className="h-5 w-5 text-blue-500 mr-2 cursor-pointer" />
                            <span className="font-medium cursor-pointer">{t('blueBadge')}</span>
                          </label>
                          <p className="text-sm text-gray-600 mt-1 cursor-pointer">{t('blueBadgeDesc')}</p>
                        </div>
                      </div>
                      <div className={`border rounded-lg p-4 flex items-start hover:border-yellow-500 cursor-pointer ${
                        badgeType === 'gold' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300'
                      }`}
                        onClick={() => setBadgeType('gold')}
                      >
                        <input
                          type="radio"
                          id="goldVendor"
                          name="vendorType"
                          value="gold"
                          className="mt-1 mr-3"
                          checked={badgeType === 'gold'}
                          onChange={() => setBadgeType('gold')}
                        />
                        <div>
                          <label htmlFor="goldVendor" className="flex items-center cursor-pointer">
                            <Star className="h-5 w-5 text-yellow-600 mr-2 cursor-pointer" />
                            <span className="font-medium cursor-pointer">{t('goldBadge')}</span>
                          </label>
                          <p className="text-sm text-gray-600 mt-1 cursor-pointer">{t('goldBadgeDesc')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {badgeType === 'gold' && (
                    <div id="goldVendorFields" className="space-y-4 p-4 bg-yellow-50 rounded-lg">
                      <div>
                        <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('registrationNumber')}
                        </label>
                        <input
                          type="text"
                          id="registrationNumber"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="registrationDocument" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('uploadDocument')}
                        </label>
                        <input
                          type="file"
                          id="registrationDocument"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">{t('fileRequirements')}</p>
                      </div>
                      <div>
                        <label htmlFor="taxId" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('taxId')}
                        </label>
                        <input
                          type="text"
                          id="taxId"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-lg font-medium transition flex items-center justify-center cursor-pointer"
                    >
                      {t('asVendor')} <ChevronRight className="ml-2 h-5 w-5 cursor-pointer" />
                    </button>
                  </div>
                </form>
                
                <div className="mt-6 text-center text-gray-600 text-sm">
                  <p>{t('agreeToTerms')} <Link href="/terms" className="text-yellow-600 hover:underline cursor-pointer">{t('terms')}</Link> {t('and')} <Link href="/privacy" className="text-yellow-600 hover:underline cursor-pointer">{t('privacy')}</Link></p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Additional Information */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('whyRegister')}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center md:items-start">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-yellow-600 cursor-pointer" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{t('globalReach')}</h4>
              <p className="text-gray-700 text-center md:text-left">
                {t('globalReachDesc')}
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-start">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-yellow-600 cursor-pointer" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{t('verifiedProfiles')}</h4>
              <p className="text-gray-700 text-center md:text-left">
                {t('verifiedProfilesDesc')}
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-start">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-yellow-600 cursor-pointer" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{t('secureCommunication')}</h4>
              <p className="text-gray-700 text-center md:text-left">
                {t('secureCommunicationDesc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}