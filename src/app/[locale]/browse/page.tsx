"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { 
  ShoppingBag, 
  Search, 
  Filter,
  Star,
  Shield,
  XCircle,
  Heart,
  Factory,
  Store,
  Loader2,
  MapPin,
  Palette,
  Shirt,
  Globe
} from 'lucide-react';

// Define types for live data
interface Vendor {
  id: string;
  storeName: string;
  isVerified: boolean;
  location: string | null;
  businessType: string | null;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  wholesalePrice: number | null;
  minWholesaleQty: number | null;
  isWholesale: boolean;
  isRetail: boolean;
  images: string[];
  category: string;
  stock: number;
  currency: string;
  vendor: Vendor;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

interface Country {
  id: string;
  name: string;
}

export default function BrowsePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('Browse');
  
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Local state for search input to allow typing without immediate re-fetch
  const [localSearchQuery, setLocalSearchQuery] = useState(searchParams.get('search') || '');

  // Countries for filtering
  const countries = [
    { id: 'all', name: 'All Countries' },
    { id: 'Nigeria', name: 'Nigeria' },
    { id: 'Ghana', name: 'Ghana' },
    { id: 'Kenya', name: 'Kenya' },
    { id: 'South Africa', name: 'South Africa' },
    { id: 'Ethiopia', name: 'Ethiopia' },
    { id: 'Tanzania', name: 'Tanzania' },
    { id: 'Morocco', name: 'Morocco' },
  ];

  // Fetch initial data and react to URL changes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch products with current search params
        const productsRes = await fetch(`/api/products?${searchParams.toString()}`);
        if (!productsRes.ok) throw new Error('Failed to fetch products');
        const productsData = await productsRes.json();
        setProducts(productsData);

        // Fetch categories if not loaded
        if (categories.length === 0) {
          const categoriesRes = await fetch('/api/categories');
          if (categoriesRes.ok) {
            const categoriesData = await categoriesRes.json();
            setCategories(categoriesData);
          }
        }
      } catch (error) {
        console.error('Error fetching browse data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchParams, categories.length]);

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all' || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/browse?${params.toString()}`);
  };

  const clearAllFilters = () => {
    setLocalSearchQuery('');
    router.push('/browse');
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateFilters('search', localSearchQuery);
  };

  const currentView = searchParams.get('view') || 'grid';
  const activeCategory = searchParams.get('category') || 'all';
  const activeCountry = searchParams.get('country') || 'all';
  const activeBusinessType = searchParams.get('businessType') || 'all';
  const activeSalesType = searchParams.get('salesType') || 'all';
  const activeInStock = searchParams.get('inStock') === 'true';

  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Search Header */}
      <div className="bg-gradient-to-b from-yellow-400 to-yellow-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6">
            {t('title')}
          </h1>
          
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                className="block w-full pl-10 pr-3 py-3 border border-yellow-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-900 shadow-sm"
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute inset-y-0 right-0 px-4 py-2 bg-yellow-600 text-white rounded-r-xl hover:bg-yellow-700 transition flex items-center cursor-pointer font-medium"
              >
                {t('searchButton')}
              </button>
            </form>
            
            <div className="flex flex-wrap justify-center mt-4 gap-2">
              <span className="text-sm text-gray-800 font-medium">{t('popular')}</span>
              {['Ankara fabric', 'Coffee', 'African Masks', 'Traditional Spices'].map((term, index) => (
                <button 
                  key={index}
                  className="bg-white bg-opacity-50 hover:bg-white px-3 py-1 rounded-full text-sm text-gray-800 transition cursor-pointer"
                  onClick={() => {
                    setLocalSearchQuery(term);
                    updateFilters('search', term);
                  }}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Controls (Mobile) */}
        <div className="lg:hidden flex justify-between items-center mb-6">
          <button 
            className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 flex items-center text-gray-700 cursor-pointer active:scale-[0.98] transition"
            onClick={() => setIsMobileFiltersOpen(true)}
          >
            <Filter className="h-5 w-5 mr-2" />
            {t('filters')}
          </button>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{t('view')}</span>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden shadow-sm">
              <button 
                className={`px-3 py-1.5 cursor-pointer transition ${currentView === 'grid' ? 'bg-yellow-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                onClick={() => updateFilters('view', 'grid')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button 
                className={`px-3 py-1.5 cursor-pointer transition ${currentView === 'list' ? 'bg-yellow-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                onClick={() => updateFilters('view', 'list')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Mobile Version */}
          {isMobileFiltersOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileFiltersOpen(false)}></div>
              <div className="absolute right-0 top-0 h-full w-4/5 max-w-xs bg-white shadow-2xl overflow-y-auto p-6 animate-in slide-in-from-right duration-300">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold text-gray-900 border-b-2 border-yellow-500 pb-1">{t('filters')}</h2>
                  <button className="cursor-pointer p-1 hover:bg-gray-100 rounded-full transition" onClick={() => setIsMobileFiltersOpen(false)}>
                    <XCircle className="h-7 w-7 text-gray-400" />
                  </button>
                </div>
                
                {/* Mobile Filters Content Area */}
                <FilterContent 
                  activeCategory={activeCategory}
                  activeCountry={activeCountry}
                  activeBusinessType={activeBusinessType}
                  activeSalesType={activeSalesType}
                  activeInStock={activeInStock}
                  categories={categories}
                  countries={countries}
                  updateFilters={updateFilters}
                  clearAllFilters={clearAllFilters}
                />

                <div className="mt-8">
                  <button 
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-yellow-200 transition active:scale-[0.98] cursor-pointer"
                    onClick={() => setIsMobileFiltersOpen(false)}
                  >
                    {t('viewProducts')}
                  </button>
                </div>
              </div>
            </div>
          )}
        
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900">{t('filters')}</h2>
                <button 
                  onClick={clearAllFilters}
                  className="text-sm font-medium text-yellow-600 hover:text-yellow-800 transition cursor-pointer"
                >
                  {t('clearAll')}
                </button>
              </div>
              
              <FilterContent 
                activeCategory={activeCategory}
                activeCountry={activeCountry}
                activeBusinessType={activeBusinessType}
                activeSalesType={activeSalesType}
                activeInStock={activeInStock}
                categories={categories}
                countries={countries}
                updateFilters={updateFilters}
                clearAllFilters={clearAllFilters}
              />
            </div>
          </div>
          
          {/* Product Results */}
          <div className="lg:w-3/4">
            {/* Sort and Display Options */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <p className="text-gray-600">
                    {t('showing', { count: products.length })}
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <label htmlFor="sort-by" className="text-sm font-medium text-gray-700">
                      {t('sortBy')}
                    </label>
                    <select
                      id="sort-by"
                      value={searchParams.get('sort') || 'newest'}
                      onChange={(e) => updateFilters('sort', e.target.value)}
                      className="border border-gray-200 rounded-lg text-sm px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white shadow-xs"
                    >
                      <option value="newest">{t('sortOptions.newest')}</option>
                      <option value="price-low">{t('sortOptions.price-low')}</option>
                      <option value="price-high">{t('sortOptions.price-high')}</option>
                      <option value="popular">{t('sortOptions.popular')}</option>
                    </select>
                  </div>
                  
                  <div className="hidden lg:flex items-center space-x-2 border-l border-gray-200 pl-4">
                    <div className="flex border border-gray-200 rounded-lg overflow-hidden shadow-xs">
                      <button 
                        className={`px-3 py-1.5 cursor-pointer transition ${currentView === 'grid' ? 'bg-yellow-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                        onClick={() => updateFilters('view', 'grid')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                      </button>
                      <button 
                        className={`px-3 py-1.5 cursor-pointer transition ${currentView === 'list' ? 'bg-yellow-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                        onClick={() => updateFilters('view', 'list')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Loading State */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <Loader2 className="h-12 w-12 text-yellow-600 animate-spin mb-4" />
                <p className="text-gray-500 font-medium">{t('loading')}</p>
              </div>
            ) : (
              <>
                {/* Grid View */}
                {currentView === 'grid' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <ProductGridCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
                
                {/* List View */}
                {currentView === 'list' && (
                  <div className="space-y-6">
                    {products.map((product) => (
                      <ProductListCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
                
                {/* Pagination (Simplified for now) */}
                <div className="mt-12 flex justify-center">
                   <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-gray-500 text-sm font-medium">
                     {t('showing', { count: products.length })}
                   </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}

// Sub-components for cleaner structure

function FilterContent({ 
  activeCategory, 
  activeCountry, 
  activeBusinessType, 
  activeSalesType, 
  activeInStock,
  categories,
  countries,
  updateFilters,
  clearAllFilters 
}: {
  activeCategory: string,
  activeCountry: string,
  activeBusinessType: string,
  activeSalesType: string,
  activeInStock: boolean,
  categories: Category[],
  countries: Country[],
  updateFilters: (key: string, value: string) => void,
  clearAllFilters: () => void
}) {
  const ct = useTranslations('Categories');
  const t = useTranslations('Browse');
  const tf = useTranslations('Filters');
  const tc = useTranslations('Countries');
  const ts = useTranslations('SalesTypes');
  const tv = useTranslations('VendorOrigins');

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-l-4 border-yellow-500 pl-3">{tf('categories')}</h3>
        <div className="space-y-2.5 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          <button 
            onClick={() => updateFilters('category', 'all')}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition cursor-pointer ${activeCategory === 'all' ? 'bg-yellow-100 text-yellow-800 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            {tf('allCategories')}
          </button>
          {categories.map((category: Category) => (
            <button 
              key={category.id}
              onClick={() => updateFilters('category', category.name)}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition cursor-pointer ${activeCategory === category.name ? 'bg-yellow-100 text-yellow-800 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {ct(category.slug)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Country Filter */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-l-4 border-yellow-500 pl-3">{tf('country')}</h3>
        <select
          value={activeCountry}
          onChange={(e) => updateFilters('country', e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white"
        >
          {countries.map((country: Country) => (
            <option key={country.id} value={country.id === 'all' ? 'all' : country.name}>
              {tc(country.id)}
            </option>
          ))}
        </select>
      </div>

      {/* Sales Type Filter */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-l-4 border-yellow-500 pl-3">{tf('salesType')}</h3>
        <div className="space-y-3">
          {[
            { id: 'all' },
            { id: 'retail' },
            { id: 'wholesale' }
          ].map((type) => (
            <label key={type.id} className="flex items-center group cursor-pointer">
              <input
                type="radio"
                name="salesType"
                checked={activeSalesType === type.id}
                onChange={() => updateFilters('salesType', type.id)}
                className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 transition"
              />
              <span className={`ml-3 text-sm transition ${activeSalesType === type.id ? 'text-gray-900 font-bold' : 'text-gray-600 group-hover:text-gray-900'}`}>
                {ts(type.id)}
              </span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Business Type Filter */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-l-4 border-yellow-500 pl-3">{tf('vendorOrigin')}</h3>
        <div className="space-y-3">
          {[
            { id: 'all', icon: <MapPin className="h-4 w-4" /> },
            { id: 'artisan', icon: <Palette className="h-4 w-4 text-blue-600" /> },
            { id: 'brand', icon: <Shirt className="h-4 w-4 text-green-600" /> },
            { id: 'factory', icon: <Factory className="h-4 w-4 text-yellow-600" /> },
            { id: 'export', icon: <Globe className="h-4 w-4 text-purple-600" /> }
          ].map((type) => (
            <label key={type.id} className="flex items-center group cursor-pointer">
              <input
                type="radio"
                name="businessType"
                checked={activeBusinessType === type.id}
                onChange={() => updateFilters('businessType', type.id)}
                className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 transition"
              />
              <span className="ml-3 flex items-center">
                {type.icon}
                <span className={`ml-2 text-sm transition ${activeBusinessType === type.id ? 'text-gray-900 font-bold' : 'text-gray-600 group-hover:text-gray-900'}`}>
                  {tv(type.id)}
                </span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <label className="flex items-center group cursor-pointer">
          <input
            type="checkbox"
            checked={activeInStock}
            onChange={() => updateFilters('inStock', activeInStock ? 'false' : 'true')}
            className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded transition"
          />
          <span className={`ml-3 text-sm transition ${activeInStock ? 'text-gray-900 font-bold' : 'text-gray-600 group-hover:text-gray-900'}`}>
            {tf('inStockOnly')}
          </span>
        </label>
      </div>

      <div className="pt-4">
        <button 
          onClick={clearAllFilters}
          className="w-full text-xs text-gray-400 hover:text-gray-600 transition underline cursor-pointer"
        >
          {t('resetFilters')}
        </button>
      </div>
    </div>
  );
}

function ProductGridCard({ product }: { product: Product }) {
  const ct = useTranslations('Categories');
  const t = useTranslations('Browse');
  
  const getCategorySlug = (name: string) => {
    // Note: this won't have access to 'categories' state from parent
    // but the fallback logic is usually enough for the common categories
    return name.toLowerCase().replace(/ & /g, '-and-').replace(/ /g, '-');
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full active:scale-[0.98]">
      <Link href={`/products/${product.id}`} className="block flex-1">
        <div className="h-52 bg-gray-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-yellow-101 flex items-center justify-center text-yellow-300">
             <ShoppingBag className="h-12 w-12 opacity-20" />
          </div>
          
          {product.images && product.images[0] && (
            <div className="absolute inset-0">
               <Image 
                src={product.images[0]} 
                alt={product.name} 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          )}
          
          {/* Status Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isWholesale && (
              <span className="bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                {t('wholesale')}
              </span>
            )}
            {product.stock <= 0 && (
              <span className="bg-red-600/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                {t('outOfStock')}
              </span>
            )}
          </div>
          
          <button className="absolute top-3 right-3 bg-white/80 hover:bg-white backdrop-blur-md p-1.5 rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm cursor-pointer z-10">
            <Heart className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-5 flex-1 flex flex-col">
          <div className="mb-2">
            <span className="inline-block bg-yellow-100 text-yellow-800 text-[10px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-sm mb-2">
              {ct(getCategorySlug(product.category))}
            </span>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-yellow-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </div>
          
          <div className="mt-auto pt-4">
            <div className="flex flex-col gap-1 mb-4">
              {product.isRetail && (
                <div className="flex items-baseline">
                  <span className="text-xl font-black text-gray-900">{product.currency} {product.price.toLocaleString()}</span>
                  <span className="text-xs text-gray-400 font-medium ml-1.5">{t('unit')}</span>
                </div>
              )}
              {product.isWholesale && product.wholesalePrice && (
                <div className="flex items-center text-xs text-gray-500">
                  <span className="font-bold text-blue-600 mr-1.5">{t('bulk')}</span>
                  <span>{product.currency} {product.wholesalePrice.toLocaleString()} (min. {product.minWholesaleQty})</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between text-xs pt-3 border-t border-gray-50">
              <div className="flex items-center text-gray-600 font-medium">
                <MapPin className="h-3.5 w-3.5 text-gray-400 mr-1" />
                {product.vendor?.location?.split(',')[0]}
              </div>
              <div className="flex items-center">
                 {product.vendor?.isVerified && (
                   <div className="flex items-center bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-[10px] font-bold">
                      <Shield className="h-3 w-3 mr-1" />
                      {t('verified')}
                   </div>
                 )}
              </div>
            </div>
          </div>
        </div>
      </Link>
      
      <div className="p-4 bg-gray-50/50 flex gap-2">
        <Link 
          href={`/products/${product.id}`}
          className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-xl text-xs font-bold transition flex items-center justify-center cursor-pointer shadow-md shadow-yellow-100"
        >
          <ShoppingBag className="h-3.5 w-3.5 mr-1.5" />
          {t('viewDetails')}
        </Link>
      </div>
    </div>
  );
}

function ProductListCard({ product }: { product: Product }) {
  const ct = useTranslations('Categories');
  const t = useTranslations('Browse');
  
  const getCategorySlug = (name: string) => {
    return name.toLowerCase().replace(/ & /g, '-and-').replace(/ /g, '-');
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 active:scale-[0.995]">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-64 h-64 bg-gray-100 relative shrink-0">
          <div className="absolute inset-0 bg-yellow-200 flex items-center justify-center text-yellow-300">
             <ShoppingBag className="h-16 w-16 opacity-20" />
          </div>
          {product.images && product.images[0] && (
            <div className="absolute inset-0">
               <Image 
                src={product.images[0]} 
                alt={product.name} 
                fill
                sizes="(max-width: 768px) 100vw, 256px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}
          
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isWholesale && (
              <span className="bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                {t('wholesale')}
              </span>
            )}
            {product.stock <= 0 && (
              <span className="bg-red-600/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                {t('outOfStock')}
              </span>
            )}
          </div>
        </div>
        
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
               <div>
                  <span className="inline-block bg-yellow-100 text-yellow-800 text-[10px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-sm mb-2">
                    {ct(getCategorySlug(product.category))}
                  </span>
                  <h3 className="text-2xl font-black text-gray-900 group-hover:text-yellow-600 transition-colors">
                    {product.name}
                  </h3>
               </div>
               <button className="text-gray-300 hover:text-red-500 transition-colors cursor-pointer">
                  <Heart className="h-7 w-7" />
               </button>
            </div>
            
            <div className="flex items-center space-x-3 mb-4">
              <Link href={`/vendors/${product.vendor.id}`} className="flex items-center text-sm font-bold text-gray-600 hover:text-yellow-600 transition">
                {product.vendor.isVerified ? <Star className="h-4 w-4 text-yellow-500 mr-1.5" /> : <Store className="h-4 w-4 text-gray-400 mr-1.5" />}
                {product.vendor.storeName}
              </Link>
              <span className="text-gray-300">•</span>
              <span className="text-sm font-medium text-gray-500 flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {product.vendor.location}
              </span>
            </div>
            
            <p className="text-gray-600 line-clamp-2 mb-6">
              {product.description}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-t border-gray-50 pt-6">
            <div className="space-y-1">
              {product.isRetail && (
                <div className="flex items-baseline">
                  <span className="text-2xl font-black text-gray-900">{product.currency} {product.price.toLocaleString()}</span>
                  <span className="text-sm text-gray-400 font-medium ml-2">{t('unit')}</span>
                </div>
              )}
              {product.isWholesale && product.wholesalePrice && (
                <div className="text-sm font-medium text-gray-500 bg-blue-50 border border-blue-100 rounded-lg px-3 py-1 inline-block">
                  <span className="font-bold text-blue-700">{t('bulk')}</span> {product.currency} {product.wholesalePrice.toLocaleString()} 
                  <span className="ml-2 opacity-60">(min. {product.minWholesaleQty} units)</span>
                </div>
              )}
            </div>
            
            <Link 
              href={`/products/${product.id}`}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-xl font-bold transition flex items-center justify-center cursor-pointer shadow-lg shadow-yellow-100 active:scale-95"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              {t('viewDetailsOrder')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Newsletter() {
  const t = useTranslations('Newsletter');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden group">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-150"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-yellow-900/10 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-150"></div>
        
        <div className="flex flex-col md:flex-row items-center relative z-10">
          <div className="md:w-3/5 mb-10 md:mb-0 md:pr-16 text-white text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              {t('title')}
            </h2>
            <p className="text-white/90 text-lg md:text-xl font-medium">
              {t('subtitle')}
            </p>
          </div>
          <div className="md:w-2/5 w-full bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-inner">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input
                  type="email"
                  placeholder={t('placeholder')}
                  className="w-full px-5 py-4 border-0 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-300/50 bg-white shadow-xl text-gray-900 placeholder:text-gray-400 font-medium"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-900 hover:bg-black text-white px-5 py-4 rounded-xl font-black transition-all cursor-pointer shadow-2xl hover:shadow-yellow-900/40 active:scale-[0.98]"
              >
                {t('button')}
              </button>
              <p className="text-center text-[10px] text-white/60 font-medium">
                {t('privacy')}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

