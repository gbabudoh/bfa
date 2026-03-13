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
    <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-8 pb-3 border-b border-gray-50">{t('additionalInfo')}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Payment Options */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">{t('paymentOptions')}</h4>
          <ul className="space-y-3">
            {vendor.paymentOptions.map((option: string, index: number) => (
              <li key={index} className="flex items-center text-gray-600 text-sm font-medium">
                <CheckCircle className="h-4 w-4 text-[#10B981] mr-3" />
                {option}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Shipping Options */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">{t('shippingOptions')}</h4>
          <ul className="space-y-3">
            {vendor.shippingCountries.map((country: string, index: number) => (
              <li key={index} className="flex items-center text-gray-600 text-sm font-medium">
                <CheckCircle className="h-4 w-4 text-[#10B981] mr-3" />
                <span className="mr-2 leading-none text-base">{getCountryFlag(country) || "🌍"}</span> {country}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Product Categories */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">{t('productCategories')}</h4>
          <ul className="space-y-3">
            {vendor.categories.map((category: string, index: number) => (
              <li key={index} className="flex items-center text-gray-600 text-sm font-medium">
                <CheckCircle className="h-4 w-4 text-[#10B981] mr-3" />
                {category}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Certifications & Production Capacity Details */}
      {(vendor.businessType === 'artisan' || vendor.businessType === 'manufacturer') && (
        <div className="mt-12 pt-8 border-t border-gray-100">
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6 px-1">{t('certProductionTitle')}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <ul className="space-y-3">
                {vendor.certifications.map((cert: string, index: number) => (
                  <li key={index} className="flex items-center text-gray-600 text-sm font-medium">
                    <CheckCircle className="h-4 w-4 text-[#10B981] mr-3" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4 px-1">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{t('productionCapacity')}:</span>
                <span className="text-gray-900 font-semibold">{vendor.productionCapacity}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{t('minimumOrder')}</span>
                <span className="text-gray-900 font-semibold">{vendor.minimumOrderQuantity}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdditionalVendorInfo;
