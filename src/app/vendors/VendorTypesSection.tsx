"use client";

import React from 'react';
import { Shield, Star, Factory, Truck, Store } from 'lucide-react';

export default function VendorTypesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Verified African Business Partners</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform connects you with verified businesses across the entire African supply chain
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-yellow-50 rounded-xl p-8 text-center md:text-left hover:shadow-lg transition flex flex-col md:flex-row items-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 md:mb-0 md:mr-6 flex-shrink-0">
              <Factory className="h-10 w-10 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mr-3">Manufacturers</h3>
                <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">PRODUCER</div>
              </div>
              <p className="text-gray-700">
                Direct access to African manufacturers producing high-quality goods. Source directly from the creators of authentic African products without intermediaries.
              </p>
            </div>
          </div>
          
          <div className="bg-yellow-50 rounded-xl p-8 text-center md:text-left hover:shadow-lg transition flex flex-col md:flex-row items-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 md:mb-0 md:mr-6 flex-shrink-0">
              <Truck className="h-10 w-10 text-green-600" />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mr-3">Distributors</h3>
                <div className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">DISTRIBUTOR</div>
              </div>
              <p className="text-gray-700">
                Established distribution networks that can handle larger orders with efficient logistics solutions across Africa and internationally. Ideal for businesses seeking reliable supply chains.
              </p>
            </div>
          </div>
          
          <div className="bg-yellow-50 rounded-xl p-8 text-center md:text-left hover:shadow-lg transition flex flex-col md:flex-row items-center">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-6 md:mb-0 md:mr-6 flex-shrink-0">
              <Star className="h-10 w-10 text-yellow-600" />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mr-3">Wholesalers</h3>
                <div className="bg-yellow-600 text-white text-xs font-bold px-2 py-1 rounded-full">WHOLESALER</div>
              </div>
              <p className="text-gray-700">
                Bulk suppliers offering competitive pricing for larger quantities. Perfect for retailers and businesses looking to stock inventories with authentic African products at wholesale rates.
              </p>
            </div>
          </div>
          
          <div className="bg-yellow-50 rounded-xl p-8 text-center md:text-left hover:shadow-lg transition flex flex-col md:flex-row items-center">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6 md:mb-0 md:mr-6 flex-shrink-0">
              <Store className="h-10 w-10 text-purple-600" />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mr-3">Retailers</h3>
                <div className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">RETAILER</div>
              </div>
              <p className="text-gray-700">
                Curated selections of African products available in smaller quantities. Ideal for individual consumers or small businesses looking for specialized items without minimum order requirements.
              </p>
            </div>
          </div>
        </div>
        
        {/* Badge Verification System */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Verification Badge System</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Shield className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Blue Badge</h4>
                  <p className="text-sm text-gray-600">Basic Verification</p>
                </div>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Identity verification</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Contact information verified</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Basic product authenticity checks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">○</span>
                  <span className="text-gray-400">Business registration verification</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Gold Badge</h4>
                  <p className="text-sm text-gray-600">Premium Verification</p>
                </div>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">✓</span>
                  <span>All Blue Badge verifications</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">✓</span>
                  <span>Official business registration verified</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">✓</span>
                  <span>Extended product authenticity verification</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">✓</span>
                  <span>Trade license and export documentation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}