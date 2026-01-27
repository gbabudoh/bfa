"use client"

// app/products/[productId]/page.tsx
import React from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Star, 
  Truck, 
  Shield,
  CheckCircle,
  Mail,
  Video,
  CreditCard,
  Globe,
  ChevronRight,
  ChevronLeft,
  Heart,
  Share2,
  MessageCircle,
  Calendar,
  User,
  Clock,
  Minus,
  Plus,
  ArrowLeft
} from 'lucide-react';

// This would normally come from a database

import Nav from '../../../components/Nav';
import Footer from '../../../components/Footer';

// This would normally come from a database
const mockProduct = {
  id: 'p1001',
  name: 'Premium Ankara Fabric - 6 Yards',
  description: 'Authentic premium Ankara fabric direct from Nigeria. This vibrant, high-quality 100% cotton fabric is perfect for creating traditional African clothing, modern fashion pieces, or home decor. Each piece is 6 yards (5.5 meters) in length.',
  price: 45.99,
  wholesalePrice: 35.99,
  minWholesaleQty: 10,
  currency: 'USD',
  images: [
    '/images/products/ankara-fabric-1.jpg',
    '/images/products/ankara-fabric-2.jpg',
    '/images/products/ankara-fabric-3.jpg',
  ],
  category: 'Textiles',
  inStock: true,
  stockQuantity: 50,
  isWholesale: true,
  isRetail: true,
  shipping: {
    worldwide: true,
    estimatedDelivery: '7-14 business days',
    freeShippingThreshold: 100,
  },
  details: [
    { label: 'Material', value: '100% Cotton' },
    { label: 'Dimensions', value: '6 yards (5.5 meters)' },
    { label: 'Width', value: '45-46 inches' },
    { label: 'Pattern', value: 'Traditional African motifs' },
    { label: 'Care', value: 'Machine washable, gentle cycle' },
    { label: 'Origin', value: 'Nigeria' },
  ],
  vendor: {
    id: 'v12345',
    name: 'African Textiles & Crafts',
    badge: 'gold',
    rating: 4.8,
    reviewCount: 56,
    location: 'Lagos, Nigeria',
  },
  reviews: [
    {
      id: 'r1',
      user: 'Sarah T.',
      rating: 5,
      date: '2025-03-12',
      comment: 'Beautiful fabric with vibrant colors! The quality is excellent and it arrived well-packaged. I\'ll definitely order more patterns.',
    },
    {
      id: 'r2',
      user: 'Michael K.',
      rating: 4,
      date: '2025-02-28',
      comment: 'Good quality fabric. Shipping took a bit longer than expected but the product itself is worth it.',
    },
    {
      id: 'r3',
      user: 'Aisha M.',
      rating: 5,
      date: '2025-02-15',
      comment: 'Authentic Ankara fabric, exactly as described. Made a beautiful dress and received many compliments!',
    },
  ],
};

// Related products
const relatedProducts = [
  {
    id: 'p1002',
    name: 'Hand-Woven Kente Cloth - Traditional',
    price: 120.00,
    currency: 'USD',
    image: '/images/products/kente-cloth.jpg',
    category: 'Textiles',
  },
  {
    id: 'p1006',
    name: 'Hand-Dyed Adire Fabric - Indigo Blue',
    price: 55.00,
    currency: 'USD',
    image: '/images/products/adire-fabric.jpg',
    category: 'Textiles',
  },
  {
    id: 'p1004',
    name: 'African Print Shirt - Men\'s',
    price: 39.99,
    currency: 'USD',
    image: '/images/products/african-shirt.jpg',
    category: 'Clothing',
  },
];

export default function ProductDetailPage() {
  return (
    <div className="min-h-screen bg-yellow-50">
      <Nav />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-yellow-600 transition">Home</Link>
              </li>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <li>
                <Link href="/browse" className="hover:text-yellow-600 transition">Browse</Link>
              </li>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <li>
                <Link href={`/category/${mockProduct.category.toLowerCase()}`} className="hover:text-yellow-600 transition">
                  {mockProduct.category}
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <li className="text-gray-900 font-medium truncate max-w-xs">
                {mockProduct.name}
              </li>
            </ol>
          </nav>
        </div>
      </div>
      
      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 p-6 md:p-8">
            {/* Product Images */}
            <div className="lg:col-span-2">
              <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden relative mb-4">
                {/* This would normally be an actual image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xl">
                  {mockProduct.name} - Main Image
                </div>
                
                {/* Navigation buttons */}
                <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 focus:outline-none">
                  <ChevronLeft className="h-5 w-5 text-gray-700" />
                </button>
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 focus:outline-none">
                  <ChevronRight className="h-5 w-5 text-gray-700" />
                </button>
              </div>
              
              {/* Thumbnail gallery */}
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((i) => (
                  <button key={i} className="bg-gray-200 rounded-lg overflow-hidden aspect-w-1 aspect-h-1 hover:opacity-80 transition">
                    <div className="flex items-center justify-center text-gray-500 text-sm p-2">
                      Thumbnail {i}
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Vendor Info (mobile only) */}
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100 md:hidden">
                <Link href={`/vendors/${mockProduct.vendor.id}`} className="flex items-center">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full overflow-hidden mr-3 flex items-center justify-center text-yellow-600 font-bold text-xs">
                    LOGO
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{mockProduct.vendor.name}</h3>
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3 w-3 ${i < Math.floor(mockProduct.vendor.rating) ? 'text-yellow-500' : 'text-gray-300'}`} 
                            fill={i < Math.floor(mockProduct.vendor.rating) ? 'currentColor' : 'none'} 
                          />
                        ))}
                      </div>
                      <span className="ml-1 text-xs text-gray-600">{mockProduct.vendor.rating}</span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400 ml-auto" />
                </Link>
              </div>
            </div>
            
            {/* Product Info */}
            <div className="lg:col-span-3">
              <div className="flex justify-between">
                <div>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                    {mockProduct.category}
                  </span>
                  {mockProduct.inStock ? (
                    <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded flex items-center inline-flex">
                      <CheckCircle className="h-3 w-3 mr-1" /> In Stock
                    </span>
                  ) : (
                    <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                      Out of Stock
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-yellow-600 transition">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="text-gray-500 hover:text-yellow-600 transition">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
                {mockProduct.name}
              </h1>
              
              {/* Pricing */}
              <div className="mt-4">
                {mockProduct.isRetail && (
                  <div className="mb-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {mockProduct.currency} {mockProduct.price.toFixed(2)}
                    </span>
                    <span className="ml-2 text-sm text-gray-600">retail price</span>
                  </div>
                )}
                
                {mockProduct.isWholesale && (
                  <div className="text-gray-800">
                    <span className="font-semibold">
                      {mockProduct.currency} {mockProduct.wholesalePrice.toFixed(2)}
                    </span>
                    <span className="ml-1 text-sm text-gray-600">
                      wholesale price (min. {mockProduct.minWholesaleQty} units)
                    </span>
                  </div>
                )}
              </div>
              
              {/* Vendor Info (desktop) */}
              <div className="hidden md:block mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                <div className="flex justify-between items-center">
                  <Link href={`/vendors/${mockProduct.vendor.id}`} className="flex items-center">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full overflow-hidden mr-3 flex items-center justify-center text-yellow-600 font-bold text-xs">
                      LOGO
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium text-gray-900">{mockProduct.vendor.name}</h3>
                        {mockProduct.vendor.badge === 'gold' ? (
                          <div className="ml-2 bg-yellow-200 text-yellow-600 text-xs px-1.5 py-0.5 rounded-full flex items-center">
                            <Star className="h-2.5 w-2.5 mr-0.5" />
                            GOLD
                          </div>
                        ) : (
                          <div className="ml-2 bg-blue-200 text-blue-600 text-xs px-1.5 py-0.5 rounded-full flex items-center">
                            <Shield className="h-2.5 w-2.5 mr-0.5" />
                            BLUE
                          </div>
                        )}
                      </div>
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${i < Math.floor(mockProduct.vendor.rating) ? 'text-yellow-500' : 'text-gray-300'}`} 
                              fill={i < Math.floor(mockProduct.vendor.rating) ? 'currentColor' : 'none'} 
                            />
                          ))}
                        </div>
                        <span className="ml-1 text-xs text-gray-600">{mockProduct.vendor.rating} ({mockProduct.vendor.reviewCount} reviews)</span>
                        <span className="mx-2 text-gray-300">|</span>
                        <span className="text-xs text-gray-600">{mockProduct.vendor.location}</span>
                      </div>
                    </div>
                  </Link>
                  <div className="flex space-x-2">
                    <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm flex items-center">
                      <Mail className="h-3.5 w-3.5 mr-1" />
                      Contact
                    </button>
                    <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm flex items-center">
                      <Video className="h-3.5 w-3.5 mr-1" />
                      Call
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Product Description */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
                <p className="text-gray-700">
                  {mockProduct.description}
                </p>
              </div>
              
              {/* Product Details */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Product Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                  {mockProduct.details.map((detail, index) => (
                    <div key={index} className="flex">
                      <span className="font-medium text-gray-700 min-w-[100px]">{detail.label}:</span>
                      <span className="text-gray-700">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Shipping Info */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Shipping</h2>
                <ul className="text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <Truck className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                    <span>
                      {mockProduct.shipping.worldwide 
                        ? 'Ships worldwide' 
                        : 'Ships to select countries'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                    <span>Estimated delivery: {mockProduct.shipping.estimatedDelivery}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                    <span>
                      Free shipping for orders over {mockProduct.currency} {mockProduct.shipping.freeShippingThreshold.toFixed(2)}
                    </span>
                  </li>
                </ul>
              </div>
              
              {/* Purchase Options */}
              <div className="mt-8 space-y-4">
                {mockProduct.isRetail && (
                  <div className="flex items-center">
                    <div className="mr-4">
                      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity
                      </label>
                      <div className="flex items-center border border-gray-300 rounded-md w-32">
                        <button className="px-3 py-1 text-gray-600 hover:text-gray-800">
                          <Minus className="h-4 w-4" />
                        </button>
                        <input
                          type="number"
                          id="quantity"
                          min="1"
                          defaultValue="1"
                          className="w-12 text-center border-0 focus:ring-0"
                        />
                        <button className="px-3 py-1 text-gray-600 hover:text-gray-800">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <button className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition flex items-center justify-center">
                      <ShoppingBag className="h-5 w-5 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                )}
                
                {mockProduct.isWholesale && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <h3 className="text-md font-medium text-gray-900 mb-2">Wholesale Inquiry</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      Interested in wholesale quantities? Minimum order: {mockProduct.minWholesaleQty} units at {mockProduct.currency} {mockProduct.wholesalePrice.toFixed(2)} per unit.
                    </p>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Contact for Wholesale
                    </button>
                  </div>
                )}
              </div>
              
              {/* Payment Options */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Accepted Payment Methods</h3>
                <div className="flex space-x-2">
                  <div className="bg-gray-100 rounded p-1">
                    <CreditCard className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="bg-gray-100 rounded p-1">
                    <Globe className="h-6 w-6 text-gray-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Review Summary */}
              <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-gray-900">{mockProduct.vendor.rating}</div>
                  <div className="flex justify-center my-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < Math.floor(mockProduct.vendor.rating) ? 'text-yellow-500' : 'text-gray-300'}`} 
                        fill={i < Math.floor(mockProduct.vendor.rating) ? 'currentColor' : 'none'} 
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">Based on {mockProduct.reviews.length} reviews</div>
                </div>
                
                <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition">
                  Write a Review
                </button>
              </div>
              
              {/* Reviews List */}
              <div className="md:col-span-3">
                <div className="space-y-6">
                  {mockProduct.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden mr-3 flex items-center justify-center text-gray-500">
                            <User className="h-5 w-5" />
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
                
                <div className="mt-6 text-center">
                  <button className="text-yellow-600 hover:text-yellow-800 font-medium transition">
                    View All Reviews
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden">
              <Link href={`/products/${product.id}`} className="block">
                <div className="h-48 bg-gray-200 relative">
                  {/* This would normally be an actual image */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    {product.name} Image
                  </div>
                </div>
                
                <div className="p-4">
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                    {product.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 mt-2 mb-2">{product.name}</h3>
                  <div className="text-gray-900 font-bold">
                    {product.currency} {product.price.toFixed(2)}
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
      
      {/* Back to Previous Page */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-8">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center text-gray-700 hover:text-yellow-600 transition"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to previous page
        </button>
      </div>
      
      <Footer />
    </div>
  );
}