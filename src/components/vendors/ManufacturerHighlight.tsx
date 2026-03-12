"use client";

import React from 'react';
import { Factory, CheckCircle } from 'lucide-react';
import { Vendor } from '@/types/vendor';

interface ManufacturerHighlightProps {
  vendor: Vendor;
}

const ManufacturerHighlight: React.FC<ManufacturerHighlightProps> = ({ vendor }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div className="bg-[#EBF5FF] rounded-2xl p-8 border border-[#DBEAFE] shadow-sm">
        <div className="flex items-start gap-4">
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <Factory className="h-6 w-6 text-[#1E40AF]" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-[#1E3A8A] mb-2">
              African {vendor.businessType?.includes('Artisan') ? 'Artisan / Maker' : 'Manufacturer / Factory'}
            </h2>
            <p className="text-[#374151] text-base leading-relaxed mb-6">
              This vendor produces their own products directly, offering authentic goods directly from the source.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-tight mb-2">Production Capacity</h3>
                <p className="text-gray-700 font-medium">{vendor.productionCapacity}</p>
              </div>
              
              <div className="md:col-span-1 lg:col-span-2">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-tight mb-3">Certifications</h3>
                <div className="flex flex-wrap gap-3">
                  {vendor.certifications.map((cert: string, index: number) => (
                    <span key={index} className="inline-flex items-center text-sm bg-white text-gray-700 px-4 py-1.5 rounded-full border border-gray-100 shadow-sm font-medium">
                      <CheckCircle className="h-4 w-4 text-[#10B981] mr-2" />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManufacturerHighlight;
