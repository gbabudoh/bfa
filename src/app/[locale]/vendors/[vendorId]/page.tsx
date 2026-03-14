"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { 
  Star, 
  ArrowUpDown,
  Heart,
  Eye,
  ShoppingCart,
  ArrowRight,
  Tag
} from 'lucide-react';

// Import new components
import VendorHeader from '@/components/vendors/VendorHeader';
import ManufacturerHighlight from '@/components/vendors/ManufacturerHighlight';
import AboutVendor from '@/components/vendors/AboutVendor';
import AdditionalVendorInfo from '@/components/vendors/AdditionalVendorInfo';
import { Vendor, Product } from '@/types/vendor';

// Define type for country flags
interface CountryFlags {
  [key: string]: string;
}

// Country flag mapping
const countryFlags: CountryFlags = {
  "Nigeria": "🇳🇬",
  "Algeria": "🇩🇿",
  "Angola": "🇦🇴",
  "Benin": "🇧🇯",
  "Botswana": "🇧🇼",
  "Burkina Faso": "🇧🇫",
  "Burundi": "🇧🇮",
  "Cabo Verde": "🇨🇻",
  "Cameroon": "🇨🇲",
  "Central African Republic": "🇨🇫",
  "Chad": "🇹🇩",
  "Comoros": "🇰🇲",
  "Congo, Democratic Republic of the": "🇨🇩",
  "Congo, Republic of the": "🇨🇬",
  "Côte d'Ivoire": "🇨🇮",
  "Djibouti": "🇩🇯",
  "Egypt": "🇪🇬",
  "Equatorial Guinea": "🇬🇶",
  "Eritrea": "🇪🇷",
  "Eswatini": "🇸🇿",
  "Ethiopia": "🇪🇹",
  "Gabon": "🇬🇦",
  "Gambia": "🇬🇲",
  "Ghana": "🇬🇭",
  "Guinea": "🇬🇳",
  "Guinea-Bissau": "🇬🇼",
  "Kenya": "🇰🇪",
  "Lesotho": "🇱🇸",
  "Liberia": "🇱🇷",
  "Libya": "🇱🇾",
  "Madagascar": "🇲🇬",
  "Malawi": "🇲🇼",
  "Mali": "🇲🇱",
  "Mauritania": "🇲🇷",
  "Mauritius": "🇲🇺",
  "Morocco": "🇲🇦",
  "Mozambique": "🇲🇿",
  "Namibia": "🇳🇦",
  "Niger": "🇳🇪",
  "Rwanda": "🇷🇼",
  "São Tomé and Príncipe": "🇸🇹",
  "Senegal": "🇸🇳",
  "Seychelles": "🇸🇨",
  "Sierra Leone": "🇸🇱",
  "Somalia": "🇸🇴",
  "South Africa": "🇿🇦",
  "South Sudan": "🇸🇸",
  "Sudan": "🇸🇩",
  "Tanzania": "🇹🇿",
  "Togo": "🇹🇬",
  "Tunisia": "🇹🇳",
  "Uganda": "🇺🇬",
  "Zambia": "🇿🇲",
  "Zimbabwe": "🇿🇼",
  "Worldwide": "🌍"
};

// Function to get flag based on location string
const getCountryFlag = (location: string): string => {
  if (!location) return "";
  const parts = location.split(", ");
  const country = parts.length > 1 ? parts[parts.length - 1] : location;
  return countryFlags[country] || "";
};

export default function VendorDetailPage() {
  const t = useTranslations('VendorStorefront');
  const params = useParams();
  const vendorId = params.vendorId as string;
  
  const [vendor, setVendor] = React.useState<Vendor | null>(null);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState('about');
  
  React.useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const res = await fetch(`/api/vendors/${vendorId}`);
        if (res.ok) {
          const data = await res.json();
          // Map DB fields to what components expect
          const mappedVendor: Vendor = {
            ...data,
            name: data.storeName,
            joinDate: new Date(data.createdAt).toLocaleDateString(params.locale as string || 'en', { month: 'long', year: 'numeric' }),
            badge: 'gold', // Default or fetch from DB
            minimumOrderQuantity: `Wholesale: ${data.minOrderWholesale || 'N/A'}, Retail: ${data.minOrderRetail || 'N/A'}`,
            contactInfo: {
              email: data.contactEmail,
              phone: data.contactPhone,
              website: data.website,
              address: data.address,
              businessHours: data.businessHours
            }
          };
          setVendor(mappedVendor);
          setProducts(data.products || []);
        }
      } catch (error) {
        console.error("Error fetching vendor detail:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (vendorId) {
      fetchVendorData();
    }
  }, [vendorId, params.locale]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFDF5] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-yellow-200 border-t-yellow-600 rounded-full animate-spin"></div>
          <p className="font-bold text-gray-500 animate-pulse">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-[#FFFDF5] flex items-center justify-center p-8 text-center">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter uppercase">{t('notFoundTitle')}</h1>
          <p className="text-gray-500 max-w-md mb-8">{t('notFoundDesc')}</p>
          <Link href="/vendors" className="bg-[#D9A606] text-white px-8 py-4 rounded-2xl font-black shadow-lg hover:bg-[#A37304] transition-all">
            {t('exploreAll')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF5]">
      {/* Vendor Banner & Profile Section */}
      <VendorHeader vendor={vendor} />
      
      {/* Manufacturer Highlight Section */}
      {(vendor.businessType === 'manufacturer' || vendor.businessType === 'artisan') && (
        <ManufacturerHighlight vendor={vendor} />
      )}
      
      {/* Tabs and Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Tabs */}
        <div className="mb-10 border-b border-gray-200">
          <nav className="flex space-x-12">
            {[
              { id: 'products', name: t('tabs.products') },
              { id: 'about', name: t('tabs.about') },
              { id: 'reviews', name: t('tabs.reviews') },
            ].map((tab) => (
              <button 
                key={tab.id}
                className={`pb-4 text-base font-bold transition-all relative cursor-pointer ${
                  activeTab === tab.id 
                    ? 'text-[#D9A606]' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.name}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-[#D9A606] rounded-t-full"></span>
                )}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Products Tab Content */}
        {activeTab === 'products' && (
          <div className="space-y-12 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                  {t('tabs.products')} <span className="text-yellow-600 ml-2">{products.length}</span>
                </h2>
                <div className="h-1.5 w-12 bg-yellow-500 rounded-full mt-2"></div>
              </div>
              
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <select className="w-full appearance-none bg-white border border-gray-100 rounded-2xl text-sm font-bold px-6 py-4 focus:outline-none focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-500 shadow-sm cursor-pointer transition-all">
                    <option>{t('allCategories')}</option>
                    <option>Textiles</option>
                    <option>Clothing</option>
                    <option>Crafts</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="glass-card rounded-[2.5rem] overflow-hidden border-white/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col">
                    <div className="aspect-square relative overflow-hidden bg-gray-50">
                      {product.images?.[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-200 bg-gray-50/50">
                           <Tag size={48} className="opacity-20" />
                        </div>
                      )}
                      
                      {/* Status Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.isWholesale && (
                          <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest shadow-lg border border-blue-500/50">
                            {t('wholesale')}
                          </span>
                        )}
                      </div>

                      {/* Hover Actions */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                         <div className="h-12 w-12 glass-dark rounded-2xl flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-all duration-300">
                            <Eye className="h-5 w-5" />
                         </div>
                         <div className="h-12 w-12 glass-gold rounded-2xl flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-all duration-300 delay-75">
                            <ShoppingCart className="h-5 w-5" />
                         </div>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex-1">
                        <Link href={`/products/${product.id}`} className="block">
                          <h3 className="text-lg font-black text-gray-900 mb-1 group-hover:text-yellow-600 transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">
                          {product.category || 'CATEGORY'}
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-100/50 flex flex-col gap-1">
                        {product.isRetail && (
                          <div className="flex items-baseline gap-2 text-gray-400">
                            <span className="text-xl font-black text-gray-900">
                              {product.currency} {product.price?.toFixed(2)}
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-tighter">retail</span>
                          </div>
                        )}
                        
                        {product.isWholesale && (
                          <div className="flex items-center gap-2">
                            <span className="text-blue-600 text-xs font-black">
                              {product.currency} {product.wholesalePrice?.toFixed(2)}
                            </span>
                            <span className="text-[10px] font-bold text-gray-400">
                              (min. {product.minWholesaleQty})
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="mt-6 flex gap-2">
                        <Link 
                          href={`/products/${product.id}`}
                          className="flex-1 h-12 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-900 shadow-sm hover:bg-yellow-600 hover:text-white hover:border-yellow-500 transition-all flex items-center justify-center gap-2"
                        >
                          {t('viewDetails')}
                          <ArrowRight size={14} />
                        </Link>
                        <button className="h-12 w-12 glass-panel border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
                          <Heart className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* About Tab Content */}
        {activeTab === 'about' && (
          <div className="space-y-12">
            <AboutVendor vendor={vendor} getCountryFlag={getCountryFlag} />
            <AdditionalVendorInfo vendor={vendor} getCountryFlag={getCountryFlag} />
          </div>
        )}
        
        {/* Reviews Tab Content */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-2xl shadow-sm p-10 border border-gray-100 flex flex-col items-center justify-center min-h-[300px] text-center">
            <div className="bg-[#FFFBEB] p-4 rounded-full mb-4">
              <Star className="h-8 w-8 text-[#D9A606]" fill="currentColor" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t('customerReviews')}</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {t('reviewPlaceholder', { rating: vendor.rating || 0, count: vendor.reviewCount || 0 })}
            </p>
            <button className="mt-6 bg-[#D9A606] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#A37304] transition-colors shadow-sm cursor-pointer">
              {t('writeReview')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}