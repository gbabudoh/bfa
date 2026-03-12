import React from 'react';
import { 
  Star,
  Video, 
  MapPin, 
  Globe, 
  Clock, 
  Share2, 
  Heart,
  CreditCard,
  Truck,
  Factory,
  Phone
} from 'lucide-react';
import Image from 'next/image';
import { Vendor } from '@/types/vendor';
import VideoCall from './VideoCall';
import { useSession } from 'next-auth/react';

interface VendorHeaderProps {
  vendor: Vendor;
  getCountryFlag: (location: string) => string;
}

const VendorHeader: React.FC<VendorHeaderProps> = ({ vendor, getCountryFlag }) => {
  const { data: session } = useSession();
  const [callMode, setCallMode] = React.useState<'voice' | 'video' | null>(null);

  const handleStartCall = (mode: 'voice' | 'video') => {
    if (!session) {
      alert(`Please sign in to start a ${mode} call.`);
      return;
    }
    setCallMode(mode);
  };
  return (
    <div className="relative">
      {/* Banner Container */}
      <div className="pt-6 px-4 sm:px-6 lg:px-8">
        <div className="relative h-48 md:h-72 w-full overflow-hidden rounded-[2rem] shadow-lg border border-gray-100">
          {vendor.banner ? (
            <Image
              src={vendor.banner}
              alt={`${vendor.name} banner`}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-[#D9A606] flex items-center justify-center">
              <h1 className="text-white text-5xl md:text-7xl font-black tracking-wider opacity-10 uppercase select-none">
                {vendor.name}
              </h1>
            </div>
          )}
          
          {/* Overlay gradient for better text readability and depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </div>
      
      {/* Floating Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-24 mb-8 relative z-10">
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-10 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Logo */}
            <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 bg-white rounded-2xl flex items-center justify-center border-4 border-white shadow-xl overflow-hidden relative">
              {vendor.logo ? (
                <Image
                  src={vendor.logo}
                  alt={vendor.name || 'Vendor logo'}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#FFFBEB] flex items-center justify-center">
                  <span className="text-[#D9A606] font-black text-4xl uppercase tracking-tighter">
                    {vendor.name?.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{vendor.name}</h2>
                    <div className="flex items-center gap-2">
                       <span className="bg-[#FFFBEB] text-[#D9A606] text-[10px] font-bold px-2 py-1 rounded-sm border border-[#FDE68A] flex items-center">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        GOLD
                      </span>
                      <span className="bg-[#EBF5FF] text-[#1E40AF] text-[10px] font-bold px-2 py-1 rounded-sm border border-[#DBEAFE] flex items-center">
                        <Factory className="h-3 w-3 mr-1" />
                        {vendor.businessType?.toUpperCase() || 'VENDOR'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-2">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4].map((i) => (
                        <Star key={i} className="h-5 w-5 text-[#D9A606] fill-current" />
                      ))}
                      <Star className="h-5 w-5 text-[#D9A606] fill-current opacity-50" />
                    </div>
                    <span className="ml-2 text-base font-medium text-gray-600">{vendor.rating} ({vendor.reviewCount} reviews)</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center mt-5 text-sm text-gray-500 gap-y-2">
                    <div className="flex items-center mr-6">
                      <MapPin className="h-4 w-4 text-[#D9A606] mr-2" />
                      <span>
                        <span className="mr-1">{getCountryFlag(vendor.location || "")}</span> {vendor.location || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center mr-6">
                      <Globe className="h-4 w-4 text-[#D9A606] mr-2" />
                      {vendor.badgeType}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-[#D9A606] mr-2" />
                      Member since {vendor.joinDate}
                    </div>
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">Registration No:</span> {vendor.regNumber}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 xl:mt-0 mt-4">
                  <button 
                    onClick={() => handleStartCall('voice')}
                    className="bg-[#D9A606] hover:bg-[#A37304] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center shadow-sm cursor-pointer transform active:scale-95"
                  >
                    <Phone className="h-3.5 w-3.5 mr-2" /> 
                    VOICE CALL
                  </button>
                  <button 
                    onClick={() => handleStartCall('video')}
                    className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 transform active:scale-95 group cursor-pointer"
                  >
                    <Video className="h-3.5 w-3.5 text-[#D9A606] group-hover:scale-110 transition-transform" /> 
                    VIDEO CALL
                  </button>
                </div>
              </div>
              
              <p className="mt-6 text-gray-600 leading-relaxed max-w-4xl text-base">
                {vendor.description}
              </p>
              
              <div className="mt-6 flex flex-wrap gap-2">
                {vendor.categories.map((category: string, index: number) => (
                  <span key={index} className="bg-[#FFFBEB] text-[#92400E] text-xs font-semibold px-3 py-1 rounded bg-opacity-70 border border-[#FEF3C7]">
                    {category}
                  </span>
                ))}
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="flex flex-wrap gap-x-12 gap-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Payment Options</h3>
                    <div className="flex flex-wrap gap-3">
                      {vendor.paymentOptions.map((option: string, index: number) => (
                        <span key={index} className="bg-[#F3F4F6] text-gray-700 px-3 py-1.5 rounded-md text-xs font-medium flex items-center border border-gray-200">
                          <CreditCard className="h-3.5 w-3.5 mr-2 opacity-70" />
                          {option}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Shipping</h3>
                    <div className="flex flex-wrap gap-3">
                      {vendor.shippingCountries.map((country: string, index: number) => (
                        <span key={index} className="bg-[#F3F4F6] text-gray-700 px-3 py-1.5 rounded-md text-xs font-medium flex items-center border border-gray-200">
                          <Truck className="h-3.5 w-3.5 mr-2 opacity-70" />
                          <span className="mr-1.5 leading-none">🌍</span> {country}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <button className="text-gray-500 hover:text-[#D9A606] transition flex items-center font-medium cursor-pointer">
                    <Heart className="h-5 w-5 mr-1.5" />
                    Save
                  </button>
                  <button className="text-gray-500 hover:text-[#D9A606] transition flex items-center font-medium cursor-pointer">
                    <Share2 className="h-5 w-5 mr-1.5" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {callMode && session && (
        <VideoCall 
          room={`vendor-${vendor.id}`} 
          username={session.user?.name || "Buyer"} 
          vendorLogo={vendor.logo}
          mode={callMode}
          onClose={() => setCallMode(null)} 
        />
      )}
    </div>
  );
};

export default VendorHeader;
