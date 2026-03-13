"use client"

// components/Footer.tsx
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, Mail, PhoneCall, MapPin, Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface FooterConfig {
  footer_company_name?: string;
  footer_tagline?: string;
  footer_description?: string;
  footer_email?: string;
  footer_phone?: string;
  footer_address?: string;
  footer_facebook?: string;
  footer_twitter?: string;
  footer_instagram?: string;
  footer_linkedin?: string;
  footer_copyright?: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  isFeatured: boolean;
}

const Footer = () => {
  const t = useTranslations('Footer');
  const [config, setConfig] = useState<FooterConfig>({});
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cmsRes, catRes] = await Promise.all([
          fetch('/api/admin/cms'),
          fetch('/api/admin/cms/categories')
        ]);
        
        const cmsData = await cmsRes.json();
        if (cmsData.configs) {
          const configMap: FooterConfig = {};
          cmsData.configs.forEach((c: { key: string; value: string }) => {
            configMap[c.key as keyof FooterConfig] = c.value;
          });
          setConfig(configMap);
        }

        const catData = await catRes.json();
        if (catData.categories) {
          setCategories(catData.categories.filter((c: Category) => c.isFeatured).slice(0, 5));
        }
      } catch (error) {
        console.error('Footer fetch error:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <footer className="bg-gradient-to-b from-yellow-50 to-yellow-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Image 
                src="/logo.png" 
                alt={config.footer_company_name || "Buy from Africa"} 
                width={40} 
                height={40} 
                className="h-10 w-auto mr-2"
                unoptimized
              />
            </div>
            <p className="text-gray-700 mb-4">
              {config.footer_description || t('description')}
            </p>
            <div className="flex space-x-4">
              {config.footer_facebook && (
                <a href={config.footer_facebook} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-yellow-600 transition">
                  <Facebook size={20} />
                </a>
              )}
              {config.footer_twitter && (
                <a href={config.footer_twitter} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-yellow-600 transition">
                  <Twitter size={20} />
                </a>
              )}
              {config.footer_instagram && (
                <a href={config.footer_instagram} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-yellow-600 transition">
                  <Instagram size={20} />
                </a>
              )}
              {config.footer_linkedin && (
                <a href={config.footer_linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-yellow-600 transition">
                  <Linkedin size={20} />
                </a>
              )}
              {!config.footer_facebook && !config.footer_twitter && !config.footer_instagram && !config.footer_linkedin && (
                <>
                  <a href="#" className="text-gray-600 hover:text-yellow-600 transition">
                    <Facebook size={20} />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-yellow-600 transition">
                    <Twitter size={20} />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-yellow-600 transition">
                    <Instagram size={20} />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-yellow-600 transition">
                    <Linkedin size={20} />
                  </a>
                </>
              )}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/browse" className="text-gray-700 hover:text-yellow-600 transition">
                  {t('browseProducts')}
                </Link>
              </li>
              <li>
                <Link href="/vendors" className="text-gray-700 hover:text-yellow-600 transition">
                  {t('findVendors')}
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-700 hover:text-yellow-600 transition">
                  {t('becomeVendor')}
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-700 hover:text-yellow-600 transition">
                  {t('registerBuyer')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-700 hover:text-yellow-600 transition">
                  {t('about')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('categories')}</h3>
            <ul className="space-y-2">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <li key={cat.id}>
                    <Link href={`/category/${cat.slug}`} className="text-gray-700 hover:text-yellow-600 transition">
                      {cat.name}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <Link href="/category/textiles" className="text-gray-700 hover:text-yellow-600 transition">
                      Textiles &amp; Clothing
                    </Link>
                  </li>
                  <li>
                    <Link href="/category/crafts" className="text-gray-700 hover:text-yellow-600 transition">
                      Arts &amp; Crafts
                    </Link>
                  </li>
                  <li>
                    <Link href="/category/food" className="text-gray-700 hover:text-yellow-600 transition">
                      Food &amp; Agriculture
                    </Link>
                  </li>
                  <li>
                    <Link href="/category/minerals" className="text-gray-700 hover:text-yellow-600 transition">
                      Minerals &amp; Materials
                    </Link>
                  </li>
                  <li>
                    <Link href="/category/services" className="text-gray-700 hover:text-yellow-600 transition">
                      Services
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('contact')}</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                <span className="text-gray-700">
                  {config.footer_address || t('address')}
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-yellow-600 mr-2" />
                <a href={`mailto:${config.footer_email || 'info@buyfromafrica.com'}`} className="text-gray-700 hover:text-yellow-600 transition">
                  {config.footer_email || 'info@buyfromafrica.com'}
                </a>
              </li>
              <li className="flex items-center">
                <PhoneCall className="h-5 w-5 text-yellow-600 mr-2" />
                <a href={`tel:${config.footer_phone || '+2341234567890'}`} className="text-gray-700 hover:text-yellow-600 transition">
                  {config.footer_phone || '+234 123 456 7890'}
                </a>
              </li>
              <li className="flex items-center">
                <Globe className="h-5 w-5 text-yellow-600 mr-2" />
                <a href="https://www.buyfromafrica.com" className="text-gray-700 hover:text-yellow-600 transition">
                  www.buyfromafrica.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-yellow-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-700 text-sm">
              {config.footer_copyright || `© ${new Date().getFullYear()} Buy from Africa. All rights reserved.`}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/terms" className="text-gray-700 hover:text-yellow-600 transition text-sm">
                {t('terms')}
              </Link>
              <Link href="/privacy" className="text-gray-700 hover:text-yellow-600 transition text-sm">
                {t('privacy')}
              </Link>
              <Link href="/faq" className="text-gray-700 hover:text-yellow-600 transition text-sm">
                {t('faq')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;