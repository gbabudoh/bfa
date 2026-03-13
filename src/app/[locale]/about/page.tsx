"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Globe, 
  TrendingUp, 
  Heart, 
  ArrowRight, 
  MapPin, 
  Star, 
  Shield, 
  Truck, 
  Factory, 
  Store, 
  Briefcase 
} from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface IconProps {
  size?: number | string;
  className?: string;
}

const IconMap: Record<string, React.ComponentType<IconProps>> = {
  Globe: Globe,
  TrendingUp: TrendingUp,
  Heart: Heart,
  Star: Star,
  Shield: Shield,
  Truck: Truck,
  Factory: Factory,
  Store: Store,
  Briefcase: Briefcase,
  MapPin: MapPin
};

import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('About');
  const tc = useTranslations('Countries');

  const impactStats = [
    { value: '1,500+', label: t('impactStats.verifiedVendors') },
    { value: '15', label: t('impactStats.countries') },
    { value: '$12M+', label: t('impactStats.revenue') },
    { value: '40%', label: t('impactStats.vendorGrowth') }
  ];

  const missionPoints = [
    { icon: 'Globe', title: t('missionPoints.connect.title'), description: t('missionPoints.connect.description') },
    { icon: 'TrendingUp', title: t('missionPoints.empower.title'), description: t('missionPoints.empower.description') },
    { icon: 'Heart', title: t('missionPoints.sustain.title'), description: t('missionPoints.sustain.description') }
  ];

  const teamMembers = [
    { name: 'Sarah Johnson', role: t('teamMembers.sarah.role'), bio: t('teamMembers.sarah.bio'), image: '/images/team/sarah-johnson.jpg' },
    { name: 'Daniel Okafor', role: t('teamMembers.daniel.role'), bio: t('teamMembers.daniel.bio'), image: '/images/team/daniel-okafor.jpg' },
    { name: 'Amina Diallo', role: t('teamMembers.amina.role'), bio: t('teamMembers.amina.bio'), image: '/images/team/amina-diallo.jpg' }
  ];

  const partners = [
    { name: 'African Development Bank', logo: '/images/partners/afdb.png' },
    { name: 'World Trade Organization', logo: '/images/partners/wto.png' },
    { name: 'African Export-Import Bank', logo: '/images/partners/afrexim.png' },
    { name: 'Microsoft', logo: '/images/partners/microsoft.png' },
    { name: 'USAID', logo: '/images/partners/usaid.png' },
    { name: 'African Union', logo: '/images/partners/au.png' }
  ];

  const countries = [
    'Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Ethiopia', 
    'Morocco', 'Egypt', 'Tanzania', 'Senegal', 'Rwanda',
    'Uganda', 'Cameroon', 'Ivory Coast', 'Zambia', 'Angola'
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <main className="bg-[#FDFCFB] min-h-screen overflow-x-hidden selection:bg-yellow-200 selection:text-yellow-900">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-32 overflow-hidden bg-white">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-yellow-100/50 rounded-full blur-[120px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              x: [0, -30, 0],
              y: [0, -50, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-orange-50/50 rounded-full blur-[100px]" 
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-3/5 text-center lg:text-left"
            >
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block px-4 py-1.5 rounded-full bg-yellow-50 text-yellow-700 text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-yellow-100"
              >
                {t('ourJourney')}
              </motion.span>
              <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 leading-[0.9] tracking-tighter">
                {t('heroTitle').split(' ').map((word, i) => (
                  <span key={i} className={i === t('heroTitle').split(' ').length -1 ? "text-yellow-600" : ""}>
                    {word}{' '}
                  </span>
                ))}
              </h1>
              <p className="text-xl md:text-2xl text-gray-500 mb-12 font-medium leading-relaxed max-w-2xl">
                {t('heroDescription')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  href="/browse"
                  className="group relative inline-flex items-center px-10 py-5 bg-gray-900 text-white text-lg font-black rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-gray-900/20"
                >
                  <span className="relative z-10">{t('heroCTA')}</span>
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
                  <div className="absolute inset-0 bg-yellow-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>
                <Link 
                  href="/register"
                  className="px-10 py-5 bg-white border-2 border-gray-100 text-gray-900 text-lg font-black rounded-2xl transition-all hover:bg-gray-50 hover:border-gray-200 text-center"
                >
                  {t('getStarted')}
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-2/5 relative"
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-[12px] border-white active:scale-95 transition-transform duration-500">
                <div className="aspect-[4/5] bg-yellow-50 relative">
                  <Image 
                    src={"/images/hero-about.jpg"} 
                    alt="Buy from Africa" 
                    fill 
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - Premium Glassmorphism */}
      <section className="relative z-20 -mt-16 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 bg-white/70 backdrop-blur-3xl p-8 md:p-12 rounded-[3rem] border border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
          >
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center group border-r last:border-0 border-gray-100 px-4">
                <p className="text-3xl md:text-5xl font-black text-gray-900 mb-1 tracking-tighter group-hover:text-yellow-600 transition-colors">
                  {stat.value}
                </p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 md:py-40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <span className="text-yellow-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">{t('missionLabel')}</span>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
                {t('missionTitle')}
              </h2>
              <p className="text-xl text-gray-600 mb-10 font-bold leading-relaxed">
                  {t('missionSubtitle')}
                </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {missionPoints.map((point, index) => {
                  const Icon = IconMap[point.icon] || Globe;
                  return (
                    <motion.div 
                      key={index}
                      whileHover={{ y: -5 }}
                      className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-900/[0.02]"
                    >
                      <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-600 mb-4">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-black text-gray-900 mb-2">{point.title}</h3>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed">{point.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative group"
            >
              <div className="relative rounded-[4rem] overflow-hidden h-[600px] border-8 border-white shadow-2xl">
                 <Image 
                   src={"/images/mission-about.jpg"} 
                   alt="Mission" 
                   fill 
                   className="object-cover group-hover:scale-105 transition-transform duration-1000"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                 <div className="absolute bottom-10 left-10 text-white">
                    <p className="text-sm font-black uppercase tracking-widest opacity-80">{t('buildingBridgesLabel')}</p>
                    <p className="text-2xl font-black">{t('buildingBridgesTitle')}</p>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section - Modern Layout */}
      <section className="py-24 md:py-40 bg-gray-900 text-white rounded-[4rem] mx-4 md:mx-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-yellow-500/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black mb-12 leading-tight tracking-tighter"
            >
              {t('storyTitle').replace(t('storyTitleHighlight'), '')} <span className="text-yellow-500">{t('storyTitleHighlight')}</span>
            </motion.h2>
            <div className="space-y-8">
              {(t.raw('storyParagraphs') as string[]).map((paragraph, i) => (
                <motion.p 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-xl md:text-2xl text-gray-300 font-medium leading-[1.6]"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>

          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/10 pt-20">
             <div>
                <p className="text-4xl font-black text-yellow-500 mb-2">15+</p>
                <p className="text-xs font-black uppercase tracking-widest text-gray-400">{t('storyStats.countriesServiced')}</p>
             </div>
             <div>
                <p className="text-4xl font-black text-yellow-500 mb-2">1.5k</p>
                <p className="text-xs font-black uppercase tracking-widest text-gray-400">{t('storyStats.verifiedVendors')}</p>
             </div>
             <div>
                <p className="text-4xl font-black text-yellow-500 mb-2">40%</p>
                <p className="text-xs font-black uppercase tracking-widest text-gray-400">{t('storyStats.vendorGrowth')}</p>
             </div>
             <div>
                <p className="text-4xl font-black text-yellow-500 mb-2">$12M+</p>
                <p className="text-xs font-black uppercase tracking-widest text-gray-400">{t('storyStats.totalRevenue')}</p>
             </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <span className="text-yellow-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">{t('teamLabel')}</span>
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight tracking-tighter">{t('teamTitle')}</h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-500 font-medium">
              {t('teamDescription')}
            </p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="group relative"
              >
                <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
                  {member.image ? (
                    <Image 
                      src={member.image} 
                      alt={member.name} 
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300 font-black text-6xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-10 left-10 text-white">
                    <p className="text-2xl font-black mb-1">{member.name}</p>
                    <p className="text-xs font-black uppercase tracking-widest text-yellow-500">{member.role}</p>
                  </div>
                </div>
                <div className="mt-6 px-6 opacity-80 group-hover:opacity-100 transition-opacity">
                   <p className="text-gray-500 text-sm italic line-clamp-3">&quot;{member.bio}&quot;</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Map/Globe Visualization Alternative - Countries */}
      <section className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#1A1A1A] rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
               <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <Globe className="h-[1200px] w-[1200px] absolute -top-[300px] -right-[300px] text-white/10" />
               </div>
               
               <div className="relative z-10">
                  <div className="max-w-2xl mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter leading-tight">
                      {t('countriesTitle')}
                    </h2>
                    <p className="text-xl text-gray-400 font-medium">
                      {t('countriesDescription')}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-12 gap-x-8">
                    {countries.map((country, index) => (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        key={index} 
                        className="flex items-center space-x-3 group"
                      >
                         <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-yellow-500 group-hover:border-yellow-500 transition-all">
                            <MapPin className="h-4 w-4 text-white group-hover:text-black transition-colors" />
                         </div>
                         <span className="text-lg font-black text-white/80 group-hover:text-white transition-colors tracking-tight">{tc(country)}</span>
                      </motion.div>
                    ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Partners - Monochromatic Floating Grid */}
      <section className="py-24 md:py-40 bg-[#FDFCFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400 mb-20 whitespace-nowrap">{t('partnersLabel')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-50">
            {partners.map((partner, index) => (
              <motion.div 
                key={index}
                whileHover={{ opacity: 1, scale: 1.1 }}
                className="relative w-32 h-16"
              >
                {partner.logo ? (
                  <Image 
                    src={partner.logo} 
                    alt={partner.name} 
                    fill
                    className="object-contain grayscale" 
                  />
                ) : (
                  <span className="text-[10px] font-black text-gray-400">{partner.name}</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Minimal Footer CTA */}
      <section className="pb-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-yellow-500 rounded-[4rem] p-12 md:p-32 text-center relative overflow-hidden group active:scale-[0.98] transition-all"
          >
            <div className="absolute inset-0 bg-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <h2 className="text-5xl md:text-8xl font-black text-black mb-12 tracking-tighter leading-[0.8] whitespace-pre-line">
                {t('ctaTitle')}
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/register?type=vendor" 
                  className="bg-black text-white px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-transform"
                >
                  {t('ctaApplyVendor')}
                </Link>
                <Link 
                  href="/register?type=buyer" 
                  className="bg-white text-black px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-transform border border-black/10"
                >
                  {t('ctaApplyBuyer')}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}