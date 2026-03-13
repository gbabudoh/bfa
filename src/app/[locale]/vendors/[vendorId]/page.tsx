"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Star, 
  ShoppingBag,
  ArrowUpDown,
  Heart
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
            joinDate: new Date(data.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
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
  }, [vendorId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFDF5] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-yellow-200 border-t-yellow-600 rounded-full animate-spin"></div>
          <p className="font-bold text-gray-500 animate-pulse">Loading Storefront...</p>
        </div>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-[#FFFDF5] flex items-center justify-center p-8 text-center">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter uppercase">Vendor Not Found</h1>
          <p className="text-gray-500 max-w-md mb-8">The vendor you are looking for might have moved or is currently unavailable.</p>
          <Link href="/vendors" className="bg-[#D9A606] text-white px-8 py-4 rounded-2xl font-black shadow-lg hover:bg-[#A37304] transition-all">
            EXPLORE ALL VENDORS
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF5]">
      {/* Vendor Banner & Profile Section */}
      <VendorHeader vendor={vendor} getCountryFlag={getCountryFlag} />
      
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
              { id: 'products', name: 'Products' },
              { id: 'about', name: 'About' },
              { id: 'reviews', name: 'Reviews' },
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
          <div>
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900">Products ({products.length})</h2>
              <div className="flex items-center gap-3">
                <select className="bg-white border border-gray-200 rounded-xl text-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D9A606] focus:border-transparent shadow-sm cursor-pointer">
                  <option>All Categories</option>
                  <option>Textiles</option>
                  <option>Clothing</option>
                  <option>Crafts</option>
                </select>
                <button className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold flex items-center hover:bg-gray-50 transition-colors shadow-sm cursor-pointer">
                  <ArrowUpDown className="h-4 w-4 mr-2 text-[#D9A606]" />
                  Sort
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-50 group">
                  <Link href={`/products/${product.id}`} className="block cursor-pointer">
                    <div className="h-60 bg-gray-100 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-300 font-bold group-hover:scale-110 transition-transform duration-500">
                        {product.category}
                      </div>
                      
                      {/* Product badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.isWholesale && (
                          <span className="bg-[#1D4ED8] text-white text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-tighter">
                            Wholesale
                          </span>
                        )}
                        {product.stock <= 0 && (
                          <span className="bg-[#DC2626] text-white text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-tighter">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="text-base font-bold text-gray-900 mb-3 group-hover:text-[#D9A606] transition-colors line-clamp-2 min-h-[3rem]">{product.name}</h3>
                      
                      <div className="flex flex-col gap-1">
                        {product.isRetail && (
                          <div className="text-lg font-black text-gray-900">
                            {product.currency} {product.price.toFixed(2)}
                            <span className="text-[10px] text-gray-400 font-bold ml-1 uppercase">retail</span>
                          </div>
                        )}
                        
                        {product.isWholesale && (
                          <div className="text-[#1D4ED8] text-xs font-bold">
                            {product.currency} {product.wholesalePrice?.toFixed(2)}
                            <span className="text-gray-400 font-medium ml-1">
                              (min. {product.minWholesaleQty} units)
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                  
                  <div className="px-5 pb-5 pt-0 flex justify-between items-center mt-2">
                    <Link href={`/products/${product.id}`} className="bg-[#D9A606] hover:bg-[#A37304] text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center shadow-sm cursor-pointer">
                      <ShoppingBag className="h-3.5 w-3.5 mr-2" />
                      View Details
                    </Link>
                    
                    <button className="text-gray-300 hover:text-[#DC2626] transition-colors p-2 cursor-pointer">
                      <Heart className="h-5 w-5" />
                    </button>
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
            <h3 className="text-xl font-bold text-gray-900 mb-2">Customer Reviews</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              This vendor currently has {vendor.rating || 0} average rating from {vendor.reviewCount || 0} reviews. We&apos;re currently updating our review interface to better showcase customer feedback.
            </p>
            <button className="mt-6 bg-[#D9A606] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#A37304] transition-colors shadow-sm cursor-pointer">
              Write a Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
}