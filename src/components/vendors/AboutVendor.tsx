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
  FileText,
  Shield
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
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="glass-card rounded-[3.5rem] p-10 md:p-16 border-white/60 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col gap-12">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-1.5 w-12 bg-yellow-500 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight uppercase">
                {t('aboutTitle', { name: vendor.name || vendor.storeName })}
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg md:text-xl font-medium max-w-4xl">
              {vendor.longDescription}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Business Details Section */}
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-yellow-50 rounded-2xl border border-yellow-100">
                <Award className="h-5 w-5 text-yellow-600" />
                <h3 className="text-xs font-black text-yellow-800 uppercase tracking-[0.2em]">{t('businessDetails')}</h3>
              </div>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                <li className="flex items-start group/item">
                  <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-gray-100 group-hover/item:border-yellow-200 group-hover/item:shadow-md transition-all">
                    <MapPin className="h-5 w-5 text-gray-400 group-hover/item:text-yellow-600 transition-colors" />
                  </div>
                  <div className="ml-5">
                    <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t('address')}</span>
                    <span className="text-gray-900 font-bold leading-tight flex items-center gap-2">
                      {vendor.contactInfo?.address?.replace("Nigeria", `${getCountryFlag("Nigeria")} Nigeria`)}
                    </span>
                  </div>
                </li>
                
                <li className="flex items-start group/item">
                  <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-gray-100 group-hover/item:border-yellow-200 group-hover/item:shadow-md transition-all">
                    <Clock className="h-5 w-5 text-gray-400 group-hover/item:text-yellow-600 transition-colors" />
                  </div>
                  <div className="ml-5">
                    <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t('businessHours')}</span>
                    <span className="text-gray-900 font-bold leading-tight">{vendor.contactInfo?.businessHours}</span>
                  </div>
                </li>
                
                <li className="flex items-start group/item">
                  <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-gray-100 group-hover/item:border-yellow-200 group-hover/item:shadow-md transition-all">
                    <Calendar className="h-5 w-5 text-gray-400 group-hover/item:text-yellow-600 transition-colors" />
                  </div>
                  <div className="ml-5">
                    <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t('memberSinceDetailed')}</span>
                    <span className="text-gray-900 font-bold leading-tight">{vendor.joinDate}</span>
                  </div>
                </li>

                {vendor.badge === 'gold' && (
                  <li className="flex items-start group/item">
                    <div className="bg-gray-900 p-3.5 rounded-2xl shadow-lg border border-gray-800">
                      <Shield className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-5">
                      <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t('registrationNumberDetailed')}</span>
                      <span className="text-gray-900 font-black tracking-widest">{vendor.regNumber}</span>
                    </div>
                  </li>
                )}
              </ul>
            </div>
            
            {/* Interactive Contact Section */}
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-blue-50 rounded-2xl border border-blue-100">
                <Phone className="h-5 w-5 text-blue-600" />
                <h3 className="text-xs font-black text-blue-800 uppercase tracking-[0.2em]">{t('contactInformation')}</h3>
              </div>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6 group/item">
                  <div className="bg-white p-4 rounded-[1.5rem] shadow-sm border border-gray-100 group-hover/item:border-blue-200 group-hover/item:shadow-md transition-all">
                    <Phone className="h-6 w-6 text-gray-400 group-hover/item:text-blue-600 transition-colors" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{t('phone')}</span>
                    <p className="text-gray-900 font-black leading-relaxed max-w-xs uppercase text-[10px] tracking-tight">
                      Available for registered buyers (9am-3pm WAT)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group/item">
                  <div className="bg-white p-4 rounded-[1.5rem] shadow-sm border border-gray-100 group-hover/item:border-yellow-200 group-hover/item:shadow-md transition-all">
                    <Video className="h-6 w-6 text-gray-400 group-hover/item:text-yellow-600 transition-colors" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{t('videoCallDetailed')}</span>
                    <p className="text-gray-900 font-black leading-relaxed max-w-xs uppercase text-[10px] tracking-tight">
                      Available for registered buyers (9am-3pm WAT)
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex flex-wrap gap-4">
                <button className="flex-1 bg-[#D9A606] hover:bg-yellow-600 text-white px-8 py-5 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-yellow-200/50 flex items-center justify-center gap-3 active:scale-95 group/btn cursor-pointer">
                  <MessageSquare className="h-5 w-5 group-hover/btn:rotate-12 transition-transform" /> 
                  {t('sendMessage')}
                </button>
                <button className="flex-1 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-100 px-8 py-5 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 active:scale-95 group/btn cursor-pointer">
                  <FileText className="h-5 w-5 text-yellow-600 group-hover/btn:-translate-y-0.5 transition-transform" /> 
                  {t('requestQuote')}
                </button>
              </div>
            </div>
          </div>
          
          {/* Business Type Highlight Banner */}
          <div className="relative mt-8 group/banner">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-100 via-gray-50 to-blue-100 rounded-[2.5rem] blur opacity-40"></div>
            <div className="relative glass-surface bg-white/40 p-8 md:p-10 rounded-[2.5rem] border border-white flex flex-col md:flex-row items-center gap-10">
              <div className="bg-white p-6 rounded-3xl shadow-xl shadow-gray-200/40 relative">
                <Factory className="h-10 w-10 text-yellow-600" />
                <div className="absolute -top-2 -right-2 bg-yellow-400 h-6 w-6 rounded-full border-4 border-white"></div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-2">{t('businessTypeLabel')}</h4>
                <div className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-2">
                   {vendor.businessType === 'factory' || vendor.businessType === 'manufacturer' ? t('factoryBadge') : 
                    vendor.businessType === 'artisan' ? t('artisanBadge') : 
                    vendor.businessType === 'designer' ? t('brandBadge') : 
                    vendor.businessType === 'exporter' ? t('exportBadge') : 
                    vendor.businessType}
                </div>
                <p className="text-gray-500 font-bold leading-relaxed max-w-2xl">
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
