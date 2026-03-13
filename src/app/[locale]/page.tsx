"use client"

// app/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShoppingBag,
  Users,
  Globe,
  Truck,
  CreditCard,
  MessageCircle,
  Video,
  Shield,
  Star,
  ArrowRight,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Category {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  isFeatured: boolean;
}

export default function HomePage() {
  const tHero = useTranslations('Hero');
  const tHIW = useTranslations('HowItWorks');
  const tFC = useTranslations('FeaturedCategories');
  const tVT = useTranslations('VendorTypes');
  const tPF = useTranslations('PlatformFeatures');
  const tCTA = useTranslations('CTA');
  const tTest = useTranslations('Testimonials');
  const tNews = useTranslations('Newsletter');
  const ct = useTranslations('Categories');

  const [configs, setConfigs] = React.useState<Record<string, string>>({
    hero_title: 'Connect with African Vendors Worldwide',
    hero_description: 'Discover authentic products and services directly from verified African businesses. Your gateway to Africa\'s finest offerings.',
    hero_btn1: 'Explore Products',
    hero_btn2: 'Become a Vendor',
    hero_image_url: '/images/hero-image.jpg',
  });
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [cmsRes, catRes] = await Promise.all([
          fetch('/api/admin/cms'),
          fetch('/api/admin/cms/categories')
        ]);
        
        const cmsData = await cmsRes.json();
        if (cmsData.configs) {
          const configMap: Record<string, string> = {};
          cmsData.configs.forEach((c: { key: string; value: string }) => {
            configMap[c.key] = c.value;
          });
          setConfigs(prev => ({ ...prev, ...configMap }));
        }

        const catData = await catRes.json();
        if (catData.categories) {
          setCategories(catData.categories.filter((c: Category) => c.isFeatured));
        }
      } catch (error) {
        console.error('Fetch Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-400 via-yellow-50 to-yellow-50">
      {/* Hero Section - Reordered for mobile */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-yellow-400 opacity-30 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 md:pt-16 pb-12 sm:pb-16 md:pb-24 relative z-10">
          {/* Mobile first layout: stacked on mobile, side-by-side on larger screens */}
          <div className="flex flex-col md:flex-row items-center">
            {/* Image comes first on mobile */}
            <div className="w-full md:hidden mb-10">
              <div className="relative w-full h-72 max-w-md mx-auto">
                <div className="absolute top-0 left-0 w-full h-full bg-yellow-500 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-4 right-0 w-60 h-60 bg-yellow-600 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -top-8 right-12 w-60 h-60 bg-yellow-300 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden shadow-2xl min-h-[280px] bg-yellow-100">
                  {configs.hero_image_url ? (
                    <Image
                      src={configs.hero_image_url}
                      alt="African marketplace"
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{objectFit: 'cover'}}
                      priority
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag size={80} className="text-yellow-300 opacity-50" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Text content */}
            <div className={`md:w-1/2 text-center md:text-left transition-all duration-700 ${isLoading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {tHero('title')}
              </h1>
              <p className="mt-6 text-xl text-gray-800 max-w-lg mx-auto md:mx-0">
                {tHero('description')}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/browse"
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-full text-lg font-medium transition flex items-center justify-center"
                >
                  {tHero('explore')} <ShoppingBag className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/register"
                  className="bg-white hover:bg-gray-100 text-yellow-600 border border-yellow-600 px-6 py-3 rounded-full text-lg font-medium transition flex items-center justify-center"
                >
                  {tHero('becomeVendor')} <Users className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Image for desktop - hidden on mobile */}
            <div className="hidden md:block md:w-1/2 md:flex md:justify-center">
              <div className="relative w-full max-w-lg h-96">
                <div className="absolute top-0 left-0 w-full h-full bg-yellow-500 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-4 right-0 w-72 h-72 bg-yellow-600 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -top-8 right-12 w-72 h-72 bg-yellow-300 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden shadow-2xl min-h-[384px] bg-yellow-100">
                  {configs.hero_image_url ? (
                    <Image
                      src={configs.hero_image_url}
                      alt="African marketplace"
                      fill
                      unoptimized
                      sizes="(min-width: 768px) 50vw, 100vw"
                      style={{objectFit: 'cover'}}
                      priority
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag size={120} className="text-yellow-300 opacity-50" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{tHIW('title')}</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              {tHIW('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-yellow-50 rounded-xl p-8 text-center hover:shadow-lg transition">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{tHIW('step1.title')}</h3>
              <p className="text-gray-700">
                {tHIW('step1.desc')}
              </p>
            </div>

            <div className="bg-yellow-50 rounded-xl p-8 text-center hover:shadow-lg transition">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{tHIW('step2.title')}</h3>
              <p className="text-gray-700">
                {tHIW('step2.desc')}
              </p>
            </div>

            <div className="bg-yellow-50 rounded-xl p-8 text-center hover:shadow-lg transition">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{tHIW('step3.title')}</h3>
              <p className="text-gray-700">
                {tHIW('step3.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{tFC('title')}</h2>
              <p className="mt-4 text-xl text-gray-600">
                {tFC('subtitle')}
              </p>
            </div>
            <Link href="/browse" className="hidden md:flex items-center text-yellow-600 hover:text-yellow-700 font-medium">
              {tFC('viewAll')} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.length > 0 ? (
              categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="group relative h-48 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
                >
                  <div className="absolute inset-0 group-hover:scale-105 transition duration-300 bg-yellow-200">
                    {category.image ? (
                      <Image 
                        src={category.image} 
                        alt={category.name} 
                        fill 
                        style={{objectFit: 'cover'}}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Star className="text-yellow-400 opacity-30" size={40} />
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-white font-medium text-lg">{ct(category.slug)}</h3>
                  </div>
                </Link>
              ))
            ) : (
              // Fallback categories if none in database
              [
                { name: 'Textiles & Clothing', slug: 'textiles' },
                { name: 'Arts & Crafts', slug: 'crafts' },
                { name: 'Food & Agriculture', slug: 'food' },
                { name: 'Minerals & Materials', slug: 'minerals' },
                { name: 'Jewelry & Accessories', slug: 'jewelry' },
                { name: 'Health & Beauty', slug: 'beauty' },
                { name: 'Technology & Services', slug: 'tech' },
                { name: 'Home & Decor', slug: 'home' },
              ].map((category, index) => (
                <Link
                  key={index}
                  href={`/category/${category.slug}`}
                  className="group relative h-48 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
                >
                  <div className="absolute inset-0 group-hover:scale-105 transition duration-300 bg-yellow-200">
                    <div className="w-full h-full flex items-center justify-center">
                      <Star className="text-yellow-400 opacity-30" size={40} />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-white font-medium text-lg">{ct(category.slug)}</h3>
                  </div>
                </Link>
              ))
            )}
          </div>

          <div className="mt-8 flex justify-center md:hidden">
            <Link
              href="/browse"
              className="flex items-center text-yellow-600 hover:text-yellow-700 font-medium"
            >
              {tFC('viewAll')} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Vendor Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{tVT('title')}</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              {tVT('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-yellow-50 rounded-xl p-8 text-center md:text-left hover:shadow-lg transition flex flex-col md:flex-row items-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 md:mb-0 md:mr-6 flex-shrink-0">
                <Shield className="h-10 w-10 text-blue-500" />
              </div>
              <div>
                <div className="flex items-center justify-center md:justify-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mr-3">{tVT('blue.title')}</h3>
                  <div className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">{tVT('blue.badge')}</div>
                </div>
                <p className="text-gray-700">
                  {tVT('blue.desc')}
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-8 text-center md:text-left hover:shadow-lg transition flex flex-col md:flex-row items-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-6 md:mb-0 md:mr-6 flex-shrink-0">
                <Star className="h-10 w-10 text-yellow-600" />
              </div>
              <div>
                <div className="flex items-center justify-center md:justify-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mr-3">{tVT('gold.title')}</h3>
                  <div className="bg-yellow-600 text-white text-xs font-bold px-2 py-1 rounded-full">{tVT('gold.badge')}</div>
                </div>
                <p className="text-gray-700">
                  {tVT('gold.desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-16 bg-gradient-to-b from-yellow-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{tPF('title')}</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              {tPF('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <ShoppingBag className="h-6 w-6 text-yellow-600" />,
                title: tPF('storefronts.title'),
                description: tPF('storefronts.desc')
              },
              {
                icon: <MessageCircle className="h-6 w-6 text-yellow-600" />,
                title: tPF('messaging.title'),
                description: tPF('messaging.desc')
              },
              {
                icon: <Video className="h-6 w-6 text-yellow-600" />,
                title: tPF('video.title'),
                description: tPF('video.desc')
              },
              {
                icon: <CreditCard className="h-6 w-6 text-yellow-600" />,
                title: tPF('payments.title'),
                description: tPF('payments.desc')
              },
              {
                icon: <Truck className="h-6 w-6 text-yellow-600" />,
                title: tPF('shipping.title'),
                description: tPF('shipping.desc')
              },
              {
                icon: <Globe className="h-6 w-6 text-yellow-600" />,
                title: tPF('global.title'),
                description: tPF('global.desc')
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-2/3 text-center lg:text-left mb-8 lg:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {tCTA('title')}
              </h2>
              <p className="mt-4 text-xl text-white opacity-90 max-w-2xl">
                {tCTA('subtitle')}
              </p>
            </div>
            <div className="lg:w-1/3 flex flex-col sm:flex-row lg:flex-col space-y-4 sm:space-y-0 sm:space-x-4 lg:space-y-4 lg:space-x-0">
              <Link
                href="/register"
                className="bg-white hover:bg-gray-100 text-yellow-600 px-6 py-3 rounded-full text-lg font-medium transition flex items-center justify-center"
              >
                {tCTA('register')} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/browse"
                className="bg-transparent hover:bg-yellow-600 text-white border border-white px-6 py-3 rounded-full text-lg font-medium transition flex items-center justify-center"
              >
                {tCTA('browse')} <ShoppingBag className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{tTest('title')}</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              {tTest('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'International Buyer',
                quote: 'Buy from Africa has transformed how I source textiles. The direct connection with vendors allows for better pricing and authentic products.',
                image: '/images/products/placeholder.jpg'
              },
              {
                name: 'Emmanuel Okonkwo',
                role: 'Gold Badge Vendor',
                quote: 'As a registered business in Nigeria, the platform has helped us reach customers worldwide. Our export volume has increased by 40% since joining.',
                image: '/images/products/placeholder.jpg'
              },
              {
                name: 'Amina Diallo',
                role: 'Blue Badge Vendor',
                quote: 'I create handmade jewelry in Senegal. This platform has given me the opportunity to showcase my craft globally without needing a formal business.',
                image: '/images/products/placeholder.jpg'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-yellow-50 rounded-xl p-8 shadow-md hover:shadow-lg transition">
                <div className="flex items-center mb-6">
                  <div className="relative w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4 flex-shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={`Testimonial from ${testimonial.name}`}
                      fill
                      sizes="48px"
                      style={{objectFit: 'cover'}}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-yellow-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">{testimonial.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-8 md:mb-0 md:pr-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {tNews('title')}
                </h2>
                <p className="text-lg text-gray-700">
                  {tNews('subtitle')}
                </p>
              </div>
              <div className="md:w-1/3 w-full">
                <form className="space-y-4">
                  <div>
                    <input
                      type="email"
                      placeholder={tNews('placeholder')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-lg font-medium transition"
                  >
                    {tNews('button')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}