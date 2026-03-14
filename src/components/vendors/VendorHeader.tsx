import React from 'react';
import { 
  Star,
  Video, 
  MapPin, 
  Shield, 
  Clock, 
  Share2, 
  Heart,
  Factory,
  Phone
} from 'lucide-react';
import Image from 'next/image';
import { Vendor } from '@/types/vendor';
import VideoCall from './VideoCall';
import AuthPromptModal from './AuthPromptModal';
import { useSession, signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';

interface VendorHeaderProps {
  vendor: Vendor;
}

const VendorHeader: React.FC<VendorHeaderProps> = ({ vendor }) => {
  const t = useTranslations('VendorStorefront');
  const { data: session } = useSession();
  const [callMode, setCallMode] = React.useState<'voice' | 'video' | null>(null);
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [pendingCallMode, setPendingCallMode] = React.useState<'voice' | 'video' | null>(null);

  const handleStartCall = (mode: 'voice' | 'video') => {
    if (!session) {
      setPendingCallMode(mode);
      setShowAuthModal(true);
      return;
    }
    setCallMode(mode);
  };

  return (
    <div className="relative pt-8 px-4 sm:px-6 lg:px-8">
      {/* Background Blobs for specific storefront depth */}
      <div className="absolute top-0 right-[20%] w-[40%] h-[40%] bg-yellow-200/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      {/* Immersive Banner */}
      <div className="relative h-[300px] md:h-[450px] w-full overflow-hidden rounded-[3rem] shadow-2xl border-4 border-white">
        {vendor.banner ? (
          <Image
            src={vendor.banner}
            alt={`${vendor.name} banner`}
            fill
            className="object-cover transition-transform duration-1000 hover:scale-110"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-tr from-yellow-700 via-yellow-600 to-yellow-800 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-[0.07] select-none pointer-events-none">
              <h1 className="text-[12rem] md:text-[20rem] font-black tracking-tighter uppercase leading-none transform -rotate-12 -translate-x-20">
                {vendor.name}
              </h1>
              <h1 className="text-[12rem] md:text-[20rem] font-black tracking-tighter uppercase leading-none transform -rotate-12 translate-x-20 -mt-20">
                {vendor.name}
              </h1>
            </div>
          </div>
        )}
        
        {/* Banner Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Banner Quick Actions (Top Right) */}
        <div className="absolute top-8 right-8 flex gap-3">
          <button className="h-12 w-12 glass-dark rounded-2xl flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-95">
            <Share2 className="h-5 w-5" />
          </button>
          <button className="h-12 w-12 glass-dark rounded-2xl flex items-center justify-center text-white hover:text-red-400 hover:bg-white/20 transition-all active:scale-95">
            <Heart className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Floating Glassmorphic Profile Card */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 -mt-32 md:-mt-40 relative z-10 pb-12">
        <div className="glass-card rounded-[3rem] p-8 md:p-12 border-white/40 shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Logo Section */}
            <div className="flex-shrink-0 flex justify-center lg:justify-start">
              <div className="relative group">
                <div className="relative w-40 h-40 md:w-56 md:h-56 bg-white rounded-[2.5rem] flex items-center justify-center border-8 border-white shadow-2xl overflow-hidden">
                  {vendor.logo ? (
                    <Image
                      src={vendor.logo}
                      alt={vendor.name || 'Vendor logo'}
                      fill
                      className="object-cover transition-transform group-hover:scale-110 duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center">
                      <span className="text-gradient-gold font-black text-7xl uppercase">
                        {vendor.name?.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-[0.9]">
                      {(() => {
                        const words = vendor.name?.split(' ') || [];
                        if (words.length <= 1) return vendor.name;
                        const mid = Math.ceil(words.length / 2);
                        return (
                          <React.Fragment>
                            {words.slice(0, mid).join(' ')}
                            <br className="hidden md:block" />
                            {words.slice(mid).join(' ')}
                          </React.Fragment>
                        );
                      })()}
                    </h2>
                    
                    <div className="flex gap-2 pt-2">
                      <span className="bg-[#D9A606] text-white text-[10px] font-black px-4 py-1.5 rounded-full flex items-center shadow-lg shadow-yellow-200 border border-yellow-400 uppercase tracking-widest">
                        <Star className="h-3 w-3 mr-1.5 fill-current" />
                        {t('goldBadge')}
                      </span>
                      <span className="bg-[#2563EB] text-white text-[10px] font-black px-4 py-1.5 rounded-full flex items-center shadow-lg shadow-blue-200 border border-blue-500 uppercase tracking-widest">
                        <Factory className="h-3 w-3 mr-1.5" />
                        {vendor.businessType?.toUpperCase() || 'FACTORY'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 py-1">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4].map((i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                      ))}
                      <Star className="h-5 w-5 text-yellow-200 fill-current" />
                      <span className="ml-2 text-2xl font-black text-gray-900">0</span>
                    </div>
                    <span className="text-gray-400 font-bold text-sm tracking-tight pt-1">
                      0 reviews
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-4 text-sm font-bold text-gray-400">
                    <div className="flex items-center gap-4">
                      <div className="bg-yellow-50 p-2.5 rounded-2xl">
                         <MapPin className="h-4 w-4 text-yellow-600" />
                      </div>
                      <span className="text-gray-500">{vendor.location || "N/A"}</span>
                      
                      <div className="bg-blue-50 p-2.5 rounded-2xl ml-4">
                         <Shield className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="text-gray-500 line-clamp-1">Verified African business...</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="bg-purple-50 p-2.5 rounded-2xl">
                         <Clock className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="text-gray-500">Member since {vendor.joinDate?.split(' ')[0]} {vendor.joinDate?.split(' ')[vendor.joinDate?.split(' ').length - 1]}</span>
                    </div>
                  </div>
                </div>
                
                {/* Stacked Communication Actions */}
                <div className="flex flex-col gap-4 w-full md:w-[220px]">
                  <button 
                    onClick={() => handleStartCall('voice')}
                    className="w-full bg-[#D9A606] hover:bg-[#B48A05] text-white p-6 rounded-3xl text-[10px] font-black transition-all flex items-center justify-between shadow-xl shadow-yellow-200/50 active:scale-95 group uppercase tracking-widest"
                  >
                    <div className="bg-white/20 p-2.5 rounded-2xl group-hover:bg-white/30 transition-colors">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col items-end leading-tight mr-4">
                      <span>VOICE</span>
                      <span>CALL</span>
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => handleStartCall('video')}
                    className="w-full bg-white hover:bg-gray-50 text-gray-900 p-6 rounded-3xl text-[10px] font-black transition-all flex items-center justify-between shadow-xl shadow-gray-100/50 active:scale-95 group border border-gray-100 uppercase tracking-widest"
                  >
                    <div className="bg-yellow-50 p-2.5 rounded-2xl group-hover:bg-yellow-100 transition-colors">
                      <Video className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div className="flex flex-col items-end leading-tight mr-4">
                      <span>VIDEO</span>
                      <span>CALL</span>
                    </div>
                  </button>
                </div>
              </div>
              
              {/* Pillar Quote Box */}
              <div className="mt-12 p-10 bg-white border border-gray-100/80 rounded-[3rem] text-center shadow-sm">
                <p className="text-gray-600 leading-relaxed text-lg font-medium italic">
                  &quot;{vendor.badgeType || 'Registered African business (Gold Badge Vendor)'}&quot;
                </p>
              </div>

              <div className="mt-16 flex flex-col md:flex-row justify-between items-end gap-10">
                <div className="flex gap-x-20">
                  <div className="flex gap-10">
                    <div>
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">PAYMENT OPTIONS</h3>
                      <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-relaxed">
                        DIRECT BANK TRANSFER,<br />MOBILE MONEY
                      </span>
                    </div>
                    <div>
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">SHIPPING</h3>
                      <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-relaxed">
                        NIGERIA, GHANA,<br />KENYA, SOUTH AFRICA
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-100 hover:border-yellow-200 transition-colors py-6 pl-8 pr-16 rounded-[2rem] shadow-sm group">
                  <div className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">REGISTRATION NO:</div>
                  <div className="text-gray-900 font-black text-sm uppercase tracking-widest group-hover:text-yellow-600 transition-colors">
                    {vendor.regNumber || 'VERIFIED'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {callMode && session && session.user && (
        <VideoCall 
          room={`vendor-${vendor.id}`} 
          username={session.user.name || "Buyer"} 
          vendorLogo={vendor.logo}
          mode={callMode as 'voice' | 'video'}
          onClose={() => setCallMode(null)} 
        />
      )}

      <AuthPromptModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={pendingCallMode}
        onSignIn={() => signIn()}
      />
    </div>
  );
};

export default VendorHeader;
