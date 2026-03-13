"use client";

import React from 'react';
import { Shield, Star, Factory, Palette, Shirt, Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function VendorTypesSection() {
  const t = useTranslations('VendorTypes');

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t('title')}</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-yellow-50 rounded-xl p-8 text-center md:text-left hover:shadow-lg transition flex flex-col md:flex-row items-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 md:mb-0 md:mr-6 flex-shrink-0">
              <Palette className="h-10 w-10 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mr-3">{t('artisanTitle')}</h3>
                <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">{t('artisanBadge')}</div>
              </div>
              <p className="text-gray-700">
                {t('artisanDesc')}
              </p>
            </div>
          </div>
          
          <div className="bg-yellow-50 rounded-xl p-8 text-center md:text-left hover:shadow-lg transition flex flex-col md:flex-row items-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 md:mb-0 md:mr-6 flex-shrink-0">
              <Shirt className="h-10 w-10 text-green-600" />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mr-3">{t('brandTitle')}</h3>
                <div className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">{t('brandBadge')}</div>
              </div>
              <p className="text-gray-700">
                {t('brandDesc')}
              </p>
            </div>
          </div>
          
          <div className="bg-yellow-50 rounded-xl p-8 text-center md:text-left hover:shadow-lg transition flex flex-col md:flex-row items-center">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-6 md:mb-0 md:mr-6 flex-shrink-0">
              <Factory className="h-10 w-10 text-yellow-600" />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mr-3">{t('factoryTitle')}</h3>
                <div className="bg-yellow-600 text-white text-xs font-bold px-2 py-1 rounded-full">{t('factoryBadge')}</div>
              </div>
              <p className="text-gray-700">
                {t('factoryDesc')}
              </p>
            </div>
          </div>
          
          <div className="bg-yellow-50 rounded-xl p-8 text-center md:text-left hover:shadow-lg transition flex flex-col md:flex-row items-center">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6 md:mb-0 md:mr-6 flex-shrink-0">
              <Globe className="h-10 w-10 text-purple-600" />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mr-3">{t('exportTitle')}</h3>
                <div className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">{t('exportBadge')}</div>
              </div>
              <p className="text-gray-700">
                {t('exportDesc')}
              </p>
            </div>
          </div>
        </div>
        
        {/* Badge Verification System */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">{t('badgeSystemTitle')}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Shield className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{t('blueTitle')}</h4>
                  <p className="text-sm text-gray-600">{t('blueSubtitle')}</p>
                </div>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>{t('checkIdentity')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>{t('checkContact')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>{t('checkProductBasic')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">○</span>
                  <span className="text-gray-400">{t('checkRegistration')}</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{t('goldTitle')}</h4>
                  <p className="text-sm text-gray-600">{t('goldSubtitle')}</p>
                </div>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">✓</span>
                  <span>{t('checkBluePlus')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">✓</span>
                  <span>{t('checkRegistrationOfficial')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">✓</span>
                  <span>{t('checkProductExtended')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">✓</span>
                  <span>{t('checkTradeDocs')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}