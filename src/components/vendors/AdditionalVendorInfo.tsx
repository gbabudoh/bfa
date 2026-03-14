"use client";

import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Vendor } from '@/types/vendor';
import { useTranslations } from 'next-intl';

interface AdditionalVendorInfoProps {
  vendor: Vendor;
  getCountryFlag: (location: string) => string;
}

const AdditionalVendorInfo: React.FC<AdditionalVendorInfoProps> = ({ vendor, getCountryFlag }) => {
  const t = useTranslations('VendorStorefront');
  return (
    <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
      <div className="glass-card rounded-[3.5rem] p-10 md:p-16 border-white/60 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-1.5 w-12 bg-blue-500 rounded-full"></div>
          <h3 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight uppercase">
            {t('additionalInfo')}
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Payment Options */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 bg-emerald-50 rounded-2xl border border-emerald-100">
              <h4 className="text-[10px] font-black text-emerald-800 uppercase tracking-[0.2em]">{t('paymentOptions')}</h4>
            </div>
            <ul className="space-y-4 px-1">
              {vendor.paymentOptions.map((option: string, index: number) => (
                <li key={index} className="flex items-center group/item">
                  <div className="bg-emerald-500/10 p-1.5 rounded-lg mr-4 group-hover/item:bg-emerald-500/20 transition-colors">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                  </div>
                  <span className="text-gray-700 text-sm font-bold uppercase tracking-tight">{option}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Shipping Options */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 bg-blue-50 rounded-2xl border border-blue-100">
              <h4 className="text-[10px] font-black text-blue-800 uppercase tracking-[0.2em]">{t('shippingOptions')}</h4>
            </div>
            <ul className="space-y-4 px-1">
              {vendor.shippingCountries.map((country: string, index: number) => (
                <li key={index} className="flex items-center group/item">
                  <div className="bg-blue-500/10 p-1.5 rounded-lg mr-4 group-hover/item:bg-blue-500/20 transition-colors">
                    <span className="leading-none text-base">{getCountryFlag(country) || "🌍"}</span>
                  </div>
                  <span className="text-gray-700 text-sm font-bold uppercase tracking-tight">{country}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Product Categories */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 bg-yellow-50 rounded-2xl border border-yellow-100">
              <h4 className="text-[10px] font-black text-yellow-800 uppercase tracking-[0.2em]">{t('productCategories')}</h4>
            </div>
            <ul className="space-y-4 px-1">
              {vendor.categories.map((category: string, index: number) => (
                <li key={index} className="flex items-center group/item">
                  <div className="bg-yellow-500/10 p-1.5 rounded-lg mr-4 group-hover/item:bg-yellow-500/20 transition-colors">
                    <CheckCircle className="h-4 w-4 text-yellow-600" />
                  </div>
                  <span className="text-gray-700 text-sm font-bold uppercase tracking-tight">{category}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Certifications & Production Capacity Details */}
        {(vendor.businessType === 'artisan' || vendor.businessType === 'manufacturer') && (
          <div className="mt-20 pt-16 border-t border-gray-100/60">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-10 px-1">
              {t('certProductionTitle')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div className="space-y-5">
                {vendor.certifications.map((cert: string, index: number) => (
                  <div key={index} className="glass-surface bg-white/40 p-5 rounded-2xl border border-white flex items-center gap-6 group hover:border-emerald-200 hover:shadow-lg transition-all">
                    <div className="bg-emerald-500 p-3 rounded-xl shadow-lg shadow-emerald-200">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-gray-900 text-sm font-black uppercase tracking-tight">{cert}</span>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-1">
                <div className="bg-white/40 backdrop-blur-md p-8 rounded-[2rem] border border-white shadow-sm hover:shadow-md transition-all">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] mb-3 block">{t('productionCapacity')}</span>
                  <span className="text-2xl font-black text-gray-900 tracking-tight">{vendor.productionCapacity}</span>
                </div>
                
                <div className="bg-gray-900 p-8 rounded-[2rem] shadow-xl hover:-translate-y-1 transition-all">
                  <span className="text-[10px] font-black text-yellow-400/60 uppercase tracking-[0.25em] mb-3 block">{t('minimumOrder')}</span>
                  <span className="text-2xl font-black text-white tracking-tight">{vendor.minimumOrderQuantity}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdditionalVendorInfo;
