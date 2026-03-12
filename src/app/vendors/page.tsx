"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Filter, MapPin, Star, Shield, Tag, Factory, Store, XCircle, Loader2, Users, Palette, Shirt, Globe } from 'lucide-react';

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
  name: string;
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
  
  if (t.includes('artisan') || t.includes('maker')) {
    return { icon: <Palette className="h-4 w-4" />, color: 'bg-blue-100 text-blue-800' };
  }
  if (t.includes('brand') || t.includes('designer')) {
    return { icon: <Shirt className="h-4 w-4" />, color: 'bg-green-100 text-green-800' };
  }
  if (t.includes('manufacturer') || t.includes('factory')) {
    return { icon: <Factory className="h-4 w-4" />, color: 'bg-yellow-100 text-yellow-800' };
  }
  if (t.includes('distributor') || t.includes('export')) {
    return { icon: <Globe className="h-4 w-4" />, color: 'bg-purple-100 text-purple-800' };
  }

  // Fallback for any other types
  return { icon: <Tag className="h-4 w-4" />, color: 'bg-gray-100 text-gray-800' };
};

// Countries constant for filtering
const countries: Country[] = [
  { id: 'all', name: 'All Countries' },
  { id: 'nigeria', name: 'Nigeria' },
  { id: 'ghana', name: 'Ghana' },
  { id: 'kenya', name: 'Kenya' },
  { id: 'south-africa', name: 'South Africa' },
  { id: 'ethiopia', name: 'Ethiopia' },
  { id: 'tanzania', name: 'Tanzania' },
  { id: 'morocco', name: 'Morocco' },
  { id: 'senegal', name: 'Senegal' },
];

export default function VendorsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  
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
    <>
      {/* Filters Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">African Vendors</h2>
          <button 
            className="md:hidden flex items-center text-gray-700 font-medium"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>
        
        <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${isFiltersOpen ? 'max-h-96' : 'max-h-0 md:max-h-96'}`}>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Business Type Filter */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Business Type</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="business-all"
                      name="businessType"
                      className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300"
                      checked={selectedBusinessType === 'all'}
                      onChange={() => updateFilters('type', 'all')}
                    />
                    <label htmlFor="business-all" className="ml-2 text-sm text-gray-700">
                      All Business Types
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="business-artisan"
                      name="businessType"
                      className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300"
                      checked={selectedBusinessType === 'artisan'}
                      onChange={() => updateFilters('type', 'artisan')}
                    />
                    <label htmlFor="business-artisan" className="ml-2 text-sm text-gray-700 flex items-center">
                      <Palette className="h-3 w-3 text-blue-600 mr-1" />
                      African Artisan / Makers
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="business-brand"
                      name="businessType"
                      className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300"
                      checked={selectedBusinessType === 'brand'}
                      onChange={() => updateFilters('type', 'brand')}
                    />
                    <label htmlFor="business-brand" className="ml-2 text-sm text-gray-700 flex items-center">
                      <Shirt className="h-3 w-3 text-green-600 mr-1" />
                      African Brand / Designers
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="business-factory"
                      name="businessType"
                      className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300"
                      checked={selectedBusinessType === 'factory'}
                      onChange={() => updateFilters('type', 'factory')}
                    />
                    <label htmlFor="business-factory" className="ml-2 text-sm text-gray-700 flex items-center">
                      <Factory className="h-3 w-3 text-yellow-600 mr-1" />
                      African Manufacturer / Factories
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="business-export"
                      name="businessType"
                      className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300"
                      checked={selectedBusinessType === 'export'}
                      onChange={() => updateFilters('type', 'export')}
                    />
                    <label htmlFor="business-export" className="ml-2 text-sm text-gray-700 flex items-center">
                      <Globe className="h-3 w-3 text-purple-600 mr-1" />
                      African Distributor / Export Agents
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Badge Type Filter */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Verification Level</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="badge-all"
                      name="badgeType"
                      className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300"
                      checked={selectedBadge === 'all'}
                      onChange={() => updateFilters('badge', 'all')}
                    />
                    <label htmlFor="badge-all" className="ml-2 text-sm text-gray-700">
                      All Vendors
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="badge-gold"
                      name="badgeType"
                      className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300"
                      checked={selectedBadge === 'gold'}
                      onChange={() => updateFilters('badge', 'gold')}
                    />
                    <label htmlFor="badge-gold" className="ml-2 text-sm text-gray-700 flex items-center">
                      <Star className="h-3 w-3 text-yellow-600 mr-1" />
                      Gold Badge Vendors
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="badge-blue"
                      name="badgeType"
                      className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300"
                      checked={selectedBadge === 'blue'}
                      onChange={() => updateFilters('badge', 'blue')}
                    />
                    <label htmlFor="badge-blue" className="ml-2 text-sm text-gray-700 flex items-center">
                      <Shield className="h-3 w-3 text-blue-600 mr-1" />
                      Blue Badge Vendors
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Country Filter */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Country</h3>
                <select
                  value={selectedCountry}
                  onChange={(e) => updateFilters('country', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
                >
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.id !== 'all' && countryFlags[country.name]} {country.name}
                    </option>
                  ))}
                </select>
                
                <h3 className="font-medium text-gray-900 mt-4 mb-3">Category</h3>
                <select
                  value={selectedCategory}
                  onChange={(e) => updateFilters('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
                >
                  <option value="all">All Categories</option>
                  {categoriesList.map((category) => (
                    <option key={category.id} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Active Filters */}
      {(selectedBusinessType !== 'all' || selectedBadge !== 'all' || selectedCountry !== 'all' || selectedCategory !== 'all' || searchQuery) && (
        <div className="mb-6 flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-700">Active Filters:</span>
          
          {searchQuery && (
            <div className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full flex items-center">
              Search: {searchQuery}
              <button 
                className="ml-1.5 text-yellow-800 hover:text-yellow-900"
                onClick={() => updateFilters('search', 'all')}
              >
                <XCircle className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {selectedBusinessType !== 'all' && (
            <div className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full flex items-center">
              Type: {selectedBusinessType.charAt(0).toUpperCase() + selectedBusinessType.slice(1)}
              <button 
                className="ml-1.5 text-yellow-800 hover:text-yellow-900"
                onClick={() => updateFilters('type', 'all')}
              >
                <XCircle className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
          
          {selectedBadge !== 'all' && (
            <div className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full flex items-center">
              Badge: {selectedBadge.charAt(0).toUpperCase() + selectedBadge.slice(1)}
              <button 
                className="ml-1.5 text-yellow-800 hover:text-yellow-900"
                onClick={() => updateFilters('badge', 'all')}
              >
                <XCircle className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {selectedCountry !== 'all' && (
            <div className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full flex items-center">
              Country: {countries.find(c => c.id === selectedCountry)?.name || selectedCountry}
              <button 
                className="ml-1.5 text-yellow-800 hover:text-yellow-900"
                onClick={() => updateFilters('country', 'all')}
              >
                <XCircle className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {selectedCategory !== 'all' && (
            <div className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full flex items-center">
              Category: {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
              <button 
                className="ml-1.5 text-yellow-800 hover:text-yellow-900"
                onClick={() => updateFilters('category', 'all')}
              >
                <XCircle className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          <button 
            onClick={clearAllFilters}
            className="text-xs text-yellow-600 hover:text-yellow-700 font-bold underline ml-2"
          >
            Clear All
          </button>
        </div>
      )}
      
      {/* Vendor Results */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm">
          <Loader2 size={40} className="text-yellow-500 animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Loading verified vendors...</p>
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.length > 0 ? (
          vendors.map((vendor) => {
            // Using storeName and banner from DB schema
            const businessTypeInfo = getBusinessTypeInfo(vendor.businessType || 'retailer');
            const flag = getCountryFlag(vendor.location || '');
            
            return (
              <div key={vendor.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden border border-gray-100">
                {/* Vendor Banner */}
                <div className="h-28 bg-gray-200 relative overflow-hidden">
                  {vendor.banner ? (
                    <Image 
                      src={vendor.banner} 
                      alt={vendor.storeName} 
                      fill 
                      style={{objectFit: 'cover'}}
                      className="transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-300 opacity-80">
                      <Store size={40} className="text-yellow-400 opacity-30" />
                    </div>
                  )}
                  
                  {/* Business Type Badge */}
                  <div className="absolute top-2 left-2">
                    <span className={`${businessTypeInfo.color} px-2 py-1 rounded-full text-xs font-medium flex items-center`}>
                      {businessTypeInfo.icon}
                      <span className="ml-1 capitalize">{vendor.businessType}</span>
                    </span>
                  </div>
                  
                  <div className="absolute top-3 right-3">
                    {vendor.isVerified ? (
                      <span className="bg-yellow-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded flex items-center shadow-lg border border-yellow-400">
                        <Star className="h-2.5 w-2.5 mr-1" />
                        GOLD
                      </span>
                    ) : (
                      <span className="bg-blue-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded flex items-center shadow-lg border border-blue-400">
                        <Shield className="h-2.5 w-2.5 mr-1" />
                        BLUE
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Vendor Info */}
                <div className="p-5">
                  <div className="flex items-start">
                    {/* Logo Placeholder */}
                    <div className="w-16 h-16 bg-white rounded-xl mr-4 flex-shrink-0 -mt-12 shadow-xl border-2 border-white overflow-hidden relative z-10">
                      {vendor.logo ? (
                        <Image src={vendor.logo} alt={vendor.storeName} fill style={{objectFit: 'cover'}} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-yellow-600 font-black text-2xl bg-yellow-50">
                          {vendor.storeName.charAt(0)}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-0.5 leading-tight group">
                        <Link href={`/vendors/${vendor.id}`} className="hover:text-yellow-600 transition-colors">
                          {vendor.storeName}
                        </Link>
                      </h3>
                      
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <MapPin className="h-3 w-3 text-yellow-600 mr-1" />
                        <span className="mr-1">{flag}</span> {vendor.location || 'Location not specified'}
                      </div>
                      
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${i < Math.floor(vendor.rating) ? 'text-yellow-500' : 'text-gray-200'}`} 
                              fill={i < Math.floor(vendor.rating) ? 'currentColor' : 'none'} 
                            />
                          ))}
                        </div>
                        <span className="ml-1.5 text-[10px] font-bold text-gray-600 uppercase tracking-tighter">{vendor.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="mt-4 text-sm text-gray-600 line-clamp-2 leading-relaxed h-10">
                    {vendor.description || 'Verified African business partner providing quality goods and services.'}
                  </p>
                </div>
                
                {/* Featured Products */}
                {vendor.products && vendor.products.length > 0 && (
                  <div className="px-5 pb-3 pt-1 border-t border-gray-50">
                    <h4 className="text-[10px] font-black text-gray-400 mb-2 tracking-widest uppercase">Spotlight</h4>
                    <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                      {vendor.products.map((product) => (
                        <Link key={product.id} href={`/products/${product.id}`} className="group/prod block flex-shrink-0">
                          <div className="w-14 h-14 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 relative shadow-sm">
                            {product.images && product.images[0] ? (
                              <Image src={product.images[0]} alt={product.name} fill style={{objectFit: 'cover'}} className="group-hover/prod:scale-110 transition-transform" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <Tag size={18} />
                              </div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="px-5 pb-5 pt-3 border-t border-gray-50">
                  <Link 
                    href={`/vendors/${vendor.id}`}
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-yellow-200 transition-all flex items-center justify-center group"
                  >
                    View Boutique Profile
                    <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-20 px-4">
            <div className="max-w-md mx-auto text-center bg-white rounded-3xl shadow-sm border border-gray-100 p-10">
              <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={40} className="text-yellow-400 opacity-40" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Verified Vendors</h3>
              <p className="text-gray-500 mb-8 leading-relaxed">
                We couldn&apos;t find any vendors matching your current search or filters. Try expanding your search horizons.
              </p>
              <button 
                onClick={clearAllFilters}
                className="bg-yellow-100 text-yellow-700 px-6 py-3 rounded-2xl font-bold hover:bg-yellow-200 transition-colors"
              >
                Reset All Parameters
              </button>
            </div>
          </div>
        )}
      </div>
      )}
      
      {/* Pagination */}
      {vendors.length > 0 && (
        <div className="mt-10 flex justify-center">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-yellow-600 text-sm font-medium text-white hover:bg-yellow-700"
            >
              1
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              2
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" />
            </a>
          </nav>
        </div>
      )}
    </>
  );
}