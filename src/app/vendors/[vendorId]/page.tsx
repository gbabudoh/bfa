"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Star, 
  Shield, 
  Mail, 
  Phone, 
  Video, 
  MapPin, 
  Globe, 
  // Removed ChevronRight as it's not used
  ShoppingBag,
  Tag,
  Truck,
  Clock,
  Share2,
  Heart,
  // Removed Filter as it's not used
  ArrowUpDown,
  Factory,
  CheckCircle,
  Calendar,
  Award,
  CreditCard,
  Palette,
  Shirt
} from 'lucide-react';

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
  // Removed duplicate "Nigeria" entry
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
  
  // Extract country name from location (assuming format like "City, Country")
  const parts = location.split(", ");
  const country = parts.length > 1 ? parts[parts.length - 1] : location;
  
  return countryFlags[country] || "";
};

// This would normally come from a database based on the vendorId parameter
const mockVendor = {
  id: 'v12345',
  name: 'African Textiles & Crafts',
  description: 'We are a leading supplier of authentic African textiles, including hand-woven fabrics, Ankara prints, and traditional crafts made by skilled artisans across West Africa.',
  longDescription: 'Founded in 2018, African Textiles & Crafts works directly with artisans and textile communities across Nigeria and neighboring countries to bring high-quality, authentic African fabrics to the global market. Our mission is to preserve traditional craftsmanship while creating sustainable income opportunities for local communities. We specialize in Ankara fabrics, Adire (traditional Yoruba tie-dye), and handwoven textiles that showcase the rich cultural heritage of West Africa. All our products are ethically sourced, with fair compensation for artisans and environmentally conscious production methods.',
  logo: '/images/vendors/african-textiles.jpg',
  coverImage: '/images/vendors/african-textiles-banner.jpg',
  location: 'Lagos, Nigeria',
  rating: 4.8,
  reviewCount: 56,
  isVerified: true,
  badge: 'gold',
  badgeType: 'Registered Business',
  businessType: 'artisan',
  regNumber: 'RC-123456-NGR',
  joinDate: 'January 2023',
  profileImage: '/images/vendors/african-textiles.jpg',
  bannerImage: '/images/vendors/african-textiles-banner.jpg',
  categories: ['Textiles', 'Clothing', 'Crafts'],
  shippingCountries: ['Worldwide'],
  paymentOptions: ['Bank Transfer', 'Credit Card', 'PayPal'],
  contactInfo: {
    email: 'info@africantextiles.com',
    phone: '+234 123 456 7890',
    website: 'www.africantextiles.com',
    address: '123 Commercial Avenue, Lagos Island, Lagos, Nigeria',
    businessHours: 'Mon-Fri: 9am-5pm WAT'
  },
  socialMedia: {
    facebook: 'https://facebook.com/africantextiles',
    instagram: 'https://instagram.com/africantextiles',
    twitter: 'https://twitter.com/africantextiles'
  },
  certifications: [
    'Fair Trade Certified',
    'Organic Materials',
    'Sustainable Production'
  ],
  productionCapacity: '10,000 yards monthly',
  minimumOrderQuantity: 'Wholesale: 50 yards, Retail: No minimum'
};

// Mock products from this vendor
const mockProducts = [
  {
    id: 'p1001',
    name: 'Premium Ankara Fabric - 6 Yards',
    price: 45.99,
    wholesalePrice: 35.99,
    minWholesaleQty: 10,
    currency: 'USD',
    image: '/images/products/ankara-fabric.jpg',
    category: 'Textiles',
    inStock: true,
    isWholesale: true,
    isRetail: true,
  },
  {
    id: 'p1006',
    name: 'Hand-Dyed Adire Fabric - Indigo Blue',
    price: 55.00,
    wholesalePrice: 42.00,
    minWholesaleQty: 10,
    currency: 'USD',
    image: '/images/products/adire-fabric.jpg',
    category: 'Textiles',
    inStock: true,
    isWholesale: true,
    isRetail: true,
  },
  {
    id: 'p1010',
    name: 'Traditional Kente Scarf',
    price: 28.50,
    wholesalePrice: 22.00,
    minWholesaleQty: 20,
    currency: 'USD',
    image: '/images/products/kente-scarf.jpg',
    category: 'Clothing',
    inStock: true,
    isWholesale: true,
    isRetail: true,
  },
  {
    id: 'p1015',
    name: 'Hand-Carved Wooden Coasters (Set of 4)',
    price: 18.99,
    wholesalePrice: 14.50,
    minWholesaleQty: 25,
    currency: 'USD',
    image: '/images/products/wooden-coasters.jpg',
    category: 'Crafts',
    inStock: true,
    isWholesale: true,
    isRetail: true,
  },
];

// Mock reviews
const mockReviews = [
  {
    id: 'r1',
    user: 'Sarah T.',
    rating: 5,
    date: '2025-03-12',
    comment: 'Excellent service and product quality. The Ankara fabric I ordered was even more vibrant and beautifully patterned than in the photos. Shipping was faster than expected to the US.',
  },
  {
    id: 'r2',
    user: 'Michael K.',
    rating: 4,
    date: '2025-02-28',
    comment: 'Good quality fabrics, authentic designs. Shipping took a bit longer than expected but the products themselves are worth it. Will order again.',
  },
  {
    id: 'r3',
    user: 'Aisha M.',
    rating: 5,
    date: '2025-02-15',
    comment: 'As a Nigerian living abroad, I\'m thrilled to find such high-quality, authentic fabrics. The vendor was very responsive to my questions and helped me choose patterns that matched my vision.',
  },
];

// Define business type info interface
interface BusinessTypeInfo {
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  description: string;
}

// Get business type display info
const getBusinessTypeInfo = (type: string): BusinessTypeInfo => {
  switch(type) {
    case 'artisan':
    case 'manufacturer': // fallback for old data
      return { 
        icon: <Palette className="h-5 w-5 text-blue-600" />, 
        color: 'text-blue-800', 
        bgColor: 'bg-blue-100',
        description: 'This vendor is a skilled artisan or craft maker, producing unique handmade goods.' 
      };
    case 'brand':
    case 'distributor': // fallback for old data
      return { 
        icon: <Shirt className="h-5 w-5 text-green-600" />, 
        color: 'text-green-800', 
        bgColor: 'bg-green-100',
        description: 'This vendor is an African brand or designer, creating distinctive products and collections.' 
      };
    case 'factory':
    case 'wholesaler': // fallback for old data
      return { 
        icon: <Factory className="h-5 w-5 text-yellow-600" />, 
        color: 'text-yellow-800', 
        bgColor: 'bg-yellow-100',
        description: 'This vendor is an African manufacturer or factory, producing goods at scale.' 
      };
    case 'export':
    case 'retailer': // fallback for old data
      return { 
        icon: <Globe className="h-5 w-5 text-purple-600" />, 
        color: 'text-purple-800', 
        bgColor: 'bg-purple-100',
        description: 'This vendor is a distributor or export agent, specializing in logistics and international trade.' 
      };
    default:
      return { 
        icon: <Tag className="h-5 w-5 text-gray-600" />, 
        color: 'text-gray-800', 
        bgColor: 'bg-gray-100',
        description: 'This vendor offers a variety of African products and services.' 
      };
  }
};

export default function VendorDetailPage() {
  const businessTypeInfo = getBusinessTypeInfo(mockVendor.businessType);
  const [activeTab, setActiveTab] = React.useState('about');
  
  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Vendor Banner & Profile Section */}
      <div className="bg-gradient-to-b from-yellow-400 to-yellow-300 h-48 md:h-64 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        {/* This would normally be an actual image */}
        <div className="absolute inset-0 flex items-center justify-center text-white text-opacity-20 text-6xl font-bold">
          VENDOR BANNER
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 md:-mt-16 mb-8 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row">
            {/* Vendor Profile Image */}
            <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 bg-yellow-100 rounded-xl overflow-hidden border-4 border-white shadow-md mb-4 md:mb-0 md:mr-6">
              {/* This would normally be an actual image */}
              <div className="w-full h-full flex items-center justify-center text-yellow-400 font-bold">
                LOGO
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                <div>
                  <div className="flex items-center">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{mockVendor.name}</h1>
                    {mockVendor.badge === 'gold' ? (
                      <div className="ml-3 bg-yellow-100 text-yellow-600 text-xs font-bold px-2 py-1 rounded-full flex items-center">
                        <Star className="h-3 w-3 mr-1" />
                        GOLD
                      </div>
                    ) : (
                      <div className="ml-3 bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded-full flex items-center">
                        <Shield className="h-3 w-3 mr-1" />
                        BLUE
                      </div>
                    )}
                    
                    <div className={`ml-3 ${businessTypeInfo.bgColor} ${businessTypeInfo.color} text-xs font-bold px-2 py-1 rounded-full flex items-center`}>
                      {businessTypeInfo.icon}
                      <span className="ml-1 uppercase text-xs">{mockVendor.businessType}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(mockVendor.rating) ? 'text-yellow-500' : 'text-gray-300'}`} 
                          fill={i < Math.floor(mockVendor.rating) ? 'currentColor' : 'none'} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">{mockVendor.rating} ({mockVendor.reviewCount} reviews)</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center mt-3 text-sm text-gray-700">
                    <div className="flex items-center mr-4 mb-2">
                      <MapPin className="h-4 w-4 text-yellow-600 mr-1" />
                      <span>
                        <span className="mr-1">{getCountryFlag("Nigeria")}</span> {mockVendor.location}
                      </span>
                    </div>
                    <div className="flex items-center mr-4 mb-2">
                      <Globe className="h-4 w-4 text-yellow-600 mr-1" />
                      {mockVendor.badgeType}
                    </div>
                    <div className="flex items-center mb-2">
                      <Clock className="h-4 w-4 text-yellow-600 mr-1" />
                      Member since {mockVendor.joinDate}
                    </div>
                  </div>
                  
                  {mockVendor.badge === 'gold' && (
                    <div className="mt-3 text-sm text-gray-700">
                      <span className="font-medium">Registration No:</span> {mockVendor.regNumber}
                    </div>
                  )}
                </div>
                
                <div className="flex mt-4 md:mt-0 space-x-3">
                  <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center">
                    <Mail className="h-4 w-4 mr-2" /> 
                    Contact
                  </button>
                  <button className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center">
                    <Video className="h-4 w-4 mr-2" /> 
                    Request Call
                  </button>
                </div>
              </div>
              
              <p className="mt-4 text-gray-700">{mockVendor.description}</p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {mockVendor.categories.map((category, index) => (
                  <span key={index} className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                    {category}
                  </span>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Payment Options</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockVendor.paymentOptions.map((option, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded flex items-center">
                        <CreditCard className="h-3 w-3 mr-1" />
                        {option}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Shipping</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockVendor.shippingCountries.map((country, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded flex items-center">
                        <Truck className="h-3 w-3 mr-1" />
                        <span className="mr-1">{getCountryFlag(country)}</span> {country}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <button className="text-gray-700 hover:text-yellow-600 transition flex items-center mr-4">
                    <Heart className="h-4 w-4 mr-1" />
                    Save
                  </button>
                  <button className="text-gray-700 hover:text-yellow-600 transition flex items-center">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Business Type Info Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className={`${businessTypeInfo.bgColor} rounded-xl p-6 flex items-start`}>
          <div className="mr-4 mt-1">
            {businessTypeInfo.icon}
          </div>
          <div>
            <h2 className={`text-lg font-semibold ${businessTypeInfo.color} mb-1`}>
              This is a <span className="capitalize">{mockVendor.businessType}</span>
            </h2>
            <p className="text-gray-700">{businessTypeInfo.description}</p>
            
            {(mockVendor.businessType === 'artisan' || mockVendor.businessType === 'factory') && (
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Production Capacity</h3>
                  <p className="text-sm text-gray-700">{mockVendor.productionCapacity}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Certifications</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {mockVendor.certifications.map((cert, index) => (
                      <span key={index} className="inline-flex items-center text-xs bg-white bg-opacity-60 text-gray-700 px-2 py-1 rounded-full">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {(mockVendor.businessType === 'brand' || mockVendor.businessType === 'export') && (
              <div className="mt-3">
                <h3 className="text-sm font-medium text-gray-900">Order Requirements</h3>
                <p className="text-sm text-gray-700">{mockVendor.minimumOrderQuantity}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Tabs and Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button 
              className={`px-1 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'products' 
                  ? 'border-yellow-500 text-yellow-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('products')}
            >
              Products
            </button>
            <button 
              className={`px-1 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'about' 
                  ? 'border-yellow-500 text-yellow-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('about')}
            >
              About
            </button>
            <button 
              className={`px-1 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'reviews' 
                  ? 'border-yellow-500 text-yellow-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </nav>
        </div>
        
        {/* Products Tab Content */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Products ({mockProducts.length})</h2>
              <div className="flex items-center">
                <select className="border border-gray-300 rounded-lg text-sm px-3 py-1 mr-2 focus:outline-none focus:ring-1 focus:ring-yellow-500">
                  <option>All Categories</option>
                  <option>Textiles</option>
                  <option>Clothing</option>
                  <option>Crafts</option>
                </select>
                <button className="bg-white border border-gray-300 px-3 py-1 rounded-lg text-sm flex items-center hover:bg-gray-50">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  Sort
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden">
                  <Link href={`/products/${product.id}`} className="block">
                    <div className="h-48 bg-gray-200 relative">
                      {/* This would normally be an actual image */}
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                        {product.category} Image
                      </div>
                      
                      {/* Product badges */}
                      <div className="absolute top-2 left-2 flex flex-col space-y-1">
                        {product.isWholesale && (
                          <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                            Wholesale
                          </span>
                        )}
                        {!product.inStock && (
                          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                      
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          {product.isRetail && (
                            <div className="text-gray-900 font-bold">
                              {product.currency} {product.price.toFixed(2)}
                              <span className="text-xs text-gray-600 ml-1">retail</span>
                            </div>
                          )}
                          
                          {product.isWholesale && (
                            <div className="text-gray-700 text-sm">
                              {product.currency} {product.wholesalePrice.toFixed(2)}
                              <span className="text-xs text-gray-600 ml-1">
                                wholesale (min. {product.minWholesaleQty})
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </Link>
                  
                  <div className="px-4 pb-4 pt-2 border-t border-gray-100 flex justify-between">
                    <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm font-medium transition flex items-center">
                      <ShoppingBag className="h-4 w-4 mr-1" />
                      View Details
                    </button>
                    
                    <button className="text-gray-700 hover:text-yellow-600 transition">
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
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About {mockVendor.name}</h2>
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <p className="text-gray-700 mb-6">
                {mockVendor.longDescription}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-3">Business Details</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <MapPin className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                      <div>
                        <span className="font-medium">Address:</span><br />
                        {mockVendor.contactInfo.address.replace("Nigeria", `${getCountryFlag("Nigeria")} Nigeria`)}
                      </div>
                    </li>
                    <li className="flex items-center">
                      <Globe className="h-5 w-5 text-yellow-600 mr-2" />
                      <div>
                        <span className="font-medium">Website:</span> {mockVendor.contactInfo.website}
                      </div>
                    </li>
                    <li className="flex items-center">
                      <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                      <div>
                        <span className="font-medium">Business Hours:</span> {mockVendor.contactInfo.businessHours}
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Calendar className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                      <div>
                        <span className="font-medium">Member Since:</span> {mockVendor.joinDate}
                      </div>
                    </li>
                    {mockVendor.badge === 'gold' && (
                      <li className="flex items-center">
                        <Award className="h-5 w-5 text-yellow-600 mr-2" />
                        <div>
                          <span className="font-medium">Registration Number:</span> {mockVendor.regNumber}
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-3">Contact Information</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Mail className="h-5 w-5 text-yellow-600 mr-2" />
                      <div>
                        <span className="font-medium">Email:</span> {mockVendor.contactInfo.email}
                      </div>
                    </li>
                    <li className="flex items-center">
                      <Phone className="h-5 w-5 text-yellow-600 mr-2" />
                      <div>
                        <span className="font-medium">Phone:</span> {mockVendor.contactInfo.phone}
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Video className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                      <div>
                        <span className="font-medium">Video Call:</span><br />
                        Available for registered buyers (9am-3pm WAT)
                      </div>
                    </li>
                  </ul>
                  
                  <h4 className="text-md font-semibold text-gray-900 mt-6 mb-3">
                    Business Type: <span className="capitalize">{mockVendor.businessType}</span>
                  </h4>
                  <div className="flex items-center">
                    {businessTypeInfo.icon}
                    <p className="text-gray-700 ml-2">{businessTypeInfo.description}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional Business Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Payment Options</h4>
                  <ul className="space-y-1">
                    {mockVendor.paymentOptions.map((option, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Shipping Options</h4>
                  <ul className="space-y-1">
                    {mockVendor.shippingCountries.map((country, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {getCountryFlag(country)} {country}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Product Categories</h4>
                  <ul className="space-y-1">
                    {mockVendor.categories.map((category, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {(mockVendor.businessType === 'artisan' || mockVendor.businessType === 'factory') && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">Certifications & Production Capacity</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <ul className="space-y-1">
                        {mockVendor.certifications.map((cert, index) => (
                          <li key={index} className="flex items-center text-gray-700">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            {cert}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-gray-700">
                        <span className="font-medium">Production Capacity:</span> {mockVendor.productionCapacity}
                      </p>
                      <p className="text-gray-700 mt-2">
                        <span className="font-medium">Minimum Order:</span> {mockVendor.minimumOrderQuantity}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Reviews Tab Content */}
        {activeTab === 'reviews' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Customer Reviews</h2>
              <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                Write a Review
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Review Summary */}
              <div className="md:col-span-1 bg-white rounded-xl shadow-md p-6">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-gray-900">{mockVendor.rating}</div>
                  <div className="flex justify-center my-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < Math.floor(mockVendor.rating) ? 'text-yellow-500' : 'text-gray-300'}`} 
                        fill={i < Math.floor(mockVendor.rating) ? 'currentColor' : 'none'} 
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">Based on {mockVendor.reviewCount} reviews</div>
                </div>
                
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    // Calculate percentage (this would be from real data in production)
                    const percent = rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 7 : rating === 2 ? 2 : 1;
                    
                    return (
                      <div key={rating} className="flex items-center text-sm">
                        <div className="w-8">{rating}</div>
                        <Star className="h-4 w-4 text-yellow-500 mr-2" fill="currentColor" />
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-500 h-2 rounded-full" 
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <div className="w-12 text-right text-gray-600">{percent}%</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Reviews List */}
              <div className="md:col-span-3">
                <div className="space-y-6">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-xl shadow-md p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <div className="mr-3 bg-yellow-100 rounded-full h-10 w-10 flex items-center justify-center text-yellow-600 font-bold">
                            {review.user.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{review.user}</h4>
                            <div className="flex items-center mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`} 
                                    fill={i < review.rating ? 'currentColor' : 'none'} 
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {review.date}
                        </div>
                      </div>
                      <p className="mt-3 text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-center">
                  <button className="text-yellow-600 hover:text-yellow-800 font-medium transition">
                    Load More Reviews
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}