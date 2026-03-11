"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Users, ChevronRight, Search, Star, Shield, Factory, Palette, Shirt, Globe } from 'lucide-react';

export default function VendorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }
    router.push(`/vendors?${params.toString()}`);
  };

  const currentType = searchParams.get('type') || 'all';

  const getTypeLinkClass = (type: string, baseClass: string) => {
    const isActive = currentType === type;
    if (type === 'all') {
      return isActive 
        ? "px-4 py-2 rounded-full bg-yellow-600 text-white font-medium flex items-center shadow-sm" 
        : "px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium flex items-center transition";
    }
    
    return isActive
      ? `${baseClass.replace('bg-', 'bg-').replace('-100', '-600').replace('text-', 'text-white')} px-4 py-2 rounded-full font-medium flex items-center shadow-sm`
      : `${baseClass} hover:bg-opacity-80 px-4 py-2 rounded-full font-medium flex items-center transition`;
  };
  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Vendors Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">African Vendors</h1>
              <p className="mt-2 text-xl text-yellow-100">
                Connect with verified businesses across the African supply chain
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <Link
                href="/register"
                className="bg-white hover:bg-gray-50 text-yellow-600 px-6 py-3 rounded-lg font-medium transition flex items-center shadow-md"
              >
                <Users className="mr-2 h-5 w-5" />
                Become a Vendor
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center text-sm text-gray-600" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-yellow-600 transition">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <Link href="/vendors" className="hover:text-yellow-600 transition">
              Vendors
            </Link>
            {/* Additional breadcrumb items will be handled by individual vendor pages */}
          </nav>
        </div>
      </div>
      
      {/* Quick Vendor Type Filter */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            <Link 
              href="/vendors?type=all" 
              className={getTypeLinkClass('all', '')}
            >
              <Users className="h-4 w-4 mr-2" />
              All Vendors
            </Link>
            <Link 
              href="/vendors?type=artisan" 
              className={getTypeLinkClass('artisan', 'bg-blue-100 text-blue-800')}
            >
              <Palette className="h-4 w-4 mr-2" />
              Artisan / Makers
            </Link>
            <Link 
              href="/vendors?type=brand" 
              className={getTypeLinkClass('brand', 'bg-green-100 text-green-800')}
            >
              <Shirt className="h-4 w-4 mr-2" />
              Brand / Designers
            </Link>
            <Link 
              href="/vendors?type=factory" 
              className={getTypeLinkClass('factory', 'bg-yellow-100 text-yellow-800')}
            >
              <Factory className="h-4 w-4 mr-2" />
              Manufacturer / Factories
            </Link>
            <Link 
              href="/vendors?type=export" 
              className={getTypeLinkClass('export', 'bg-purple-100 text-purple-800')}
            >
              <Globe className="h-4 w-4 mr-2" />
              Distributor / Export Agents
            </Link>
          </div>
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200 py-4 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSearch} className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for vendors by name, products, or location..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-900"
            />
          </form>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      
      {/* Join as Vendor CTA */}
      <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-white">Become a Vendor on Buy from Africa</h2>
              <p className="mt-2 text-lg text-yellow-100">
                Showcase your products and connect with buyers from around the world
              </p>
            </div>
            <div>
              <Link
                href="/register"
                className="bg-white hover:bg-gray-50 text-yellow-600 px-6 py-3 rounded-lg font-medium transition shadow-lg inline-block"
              >
                Register as a Vendor
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Badge System Explanation */}
      <section className="bg-white py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Our Vendor Verification System</h3>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full p-2 mr-3">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Blue Badge Vendors</h4>
                <p className="text-sm text-gray-600">Basic verification for individual entrepreneurs</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-yellow-100 rounded-full p-2 mr-3">
                <Star className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Gold Badge Vendors</h4>
                <p className="text-sm text-gray-600">Premium verification for registered businesses</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}