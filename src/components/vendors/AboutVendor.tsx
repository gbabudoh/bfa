"use client";

import React from 'react';
import { 
  MapPin, 
  Clock, 
  Calendar, 
  Award, 
  Phone, 
  Video,
  Factory,
  MessageSquare,
  FileText
} from 'lucide-react';
import { Vendor } from '@/types/vendor';
import { useTranslations } from 'next-intl';

interface AboutVendorProps {
  vendor: Vendor;
  getCountryFlag: (location: string) => string;
}

const AboutVendor: React.FC<AboutVendorProps> = ({ vendor, getCountryFlag }) => {
  const t = useTranslations('VendorStorefront');
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">{t('aboutTitle', { name: vendor.name || vendor.storeName })}</h2>
        <p className="text-gray-600 leading-relaxed text-base mb-8">
          {vendor.longDescription}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Business Details */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">{t('businessDetails')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <div className="bg-[#FFFBEB] p-2 rounded-lg mr-4 group-hover:bg-[#FEF3C7] transition-colors">
                  <MapPin className="h-5 w-5 text-[#D9A606]" />
                </div>
                <div>
                  <span className="block font-bold text-gray-900 text-sm">{t('address')}</span>
                  <span className="text-gray-600 text-sm">{vendor.contactInfo?.address?.replace("Nigeria", `${getCountryFlag("Nigeria")} Nigeria`)}</span>
                </div>
              </li>
              <li className="flex items-center group">
                <div className="bg-[#FFFBEB] p-2 rounded-lg mr-4 group-hover:bg-[#FEF3C7] transition-colors">
                  <Clock className="h-5 w-5 text-[#D9A606]" />
                </div>
                <div>
                  <span className="block font-bold text-gray-900 text-sm">{t('businessHours')}</span>
                  <span className="text-gray-600 text-sm">{vendor.contactInfo?.businessHours}</span>
                </div>
              </li>
              <li className="flex items-start group">
                <div className="bg-[#FFFBEB] p-2 rounded-lg mr-4 group-hover:bg-[#FEF3C7] transition-colors">
                  <Calendar className="h-5 w-5 text-[#D9A606]" />
                </div>
                <div>
                  <span className="block font-bold text-gray-900 text-sm">{t('memberSinceDetailed')}</span>
                  <span className="text-gray-600 text-sm">{vendor.joinDate}</span>
                </div>
              </li>
              {vendor.badge === 'gold' && (
                <li className="flex items-center group">
                  <div className="bg-[#FFFBEB] p-2 rounded-lg mr-4 group-hover:bg-[#FEF3C7] transition-colors">
                    <Award className="h-5 w-5 text-[#D9A606]" />
                  </div>
                  <div>
                    <span className="block font-bold text-gray-900 text-sm">{t('registrationNumberDetailed')}</span>
                    <span className="text-gray-600 text-sm font-mono">{vendor.regNumber}</span>
                  </div>
                </li>
              )}
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">{t('contactInformation')}</h3>
            <ul className="space-y-4">
              <li className="flex items-center group">
                <div className="bg-[#FFFBEB] p-2 rounded-lg mr-4 group-hover:bg-[#FEF3C7] transition-colors">
                  <Phone className="h-5 w-5 text-[#D9A606]" />
                </div>
                <div>
                  <span className="block font-bold text-gray-900 text-sm">{t('phone')}</span>
                  <a href={`tel:${vendor.contactInfo?.phone}`} className="text-gray-600 hover:text-[#D9A606] transition-colors text-sm font-medium cursor-pointer">
                    {vendor.contactInfo?.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start group">
                <div className="bg-[#FFFBEB] p-2 rounded-lg mr-4 group-hover:bg-[#FEF3C7] transition-colors">
                  <Video className="h-5 w-5 text-[#D9A606]" />
                </div>
                <div>
                  <span className="block font-bold text-gray-900 text-sm">{t('videoCallDetailed')}</span>
                  <p className="text-gray-600 text-sm mt-0.5">
                    {t('availableForRegistered')}
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-sm">
              <button className="bg-[#D9A606] hover:bg-[#A37304] text-white px-5 py-3 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 group transform active:scale-95 cursor-pointer">
                <MessageSquare className="h-4 w-4 group-hover:rotate-12 transition-transform" /> 
                {t('sendMessage')}
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 px-5 py-3 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 transform active:scale-95 cursor-pointer">
                <FileText className="h-4 w-4 text-[#D9A606]" /> 
                {t('requestQuote')}
              </button>
            </div>
            
            <div className="mt-10 p-5 bg-[#F9FAFB] rounded-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <h4 className="font-bold text-gray-900">{t('businessTypeLabel')} <span className="capitalize text-[#D9A606]">
                  {vendor.businessType === 'factory' || vendor.businessType === 'manufacturer' ? t('factoryBadge') : 
                   vendor.businessType === 'artisan' ? t('artisanBadge') : 
                   vendor.businessType === 'designer' ? t('brandBadge') : 
                   vendor.businessType === 'exporter' ? t('exportBadge') : 
                   vendor.businessType}
                </span></h4>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-[#EBF5FF] p-2 rounded-lg">
                  <Factory className="h-5 w-5 text-[#1E3A8A]" />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t('manufacturerDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutVendor;
