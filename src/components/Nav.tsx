"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Menu, X, User, Search, ChevronDown, 
  Shirt, Palmtree, Gem, Coffee, Leaf, 
  Music, Smartphone, Home, HeartPulse, Shapes,
  ArrowRight, ShoppingBag, Sparkles, Users,
  Package, Factory, Briefcase, Calculator,
  LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';

interface Category {
  id: string;
  name: string;
  slug: string;
  isFeatured: boolean;
  subcategories?: Category[];
}

const categoryIcons: Record<string, React.ReactNode> = {
  'textiles': <Shirt className="w-5 h-5" />,
  'crafts': <Palmtree className="w-5 h-5" />,
  'clothing': <Shirt className="w-5 h-5" />,
  'jewelry': <Gem className="w-5 h-5" />,
  'accessories': <Sparkles className="w-5 h-5" />,
  'food': <Coffee className="w-5 h-5" />,
  'agriculture': <Leaf className="w-5 h-5" />,
  'home': <Home className="w-5 h-5" />,
  'decor': <Shapes className="w-5 h-5" />,
  'beauty': <HeartPulse className="w-5 h-5" />,
  'tech': <Smartphone className="w-5 h-5" />,
  'services': <Sparkles className="w-5 h-5" />,
  'arts': <Music className="w-5 h-5" />,
  'agribusiness-food-processing': <Leaf className="w-5 h-5" />,
  'healthcare': <HeartPulse className="w-5 h-5" />,
  'chemical': <Leaf className="w-5 h-5" />,
  'natural-resources': <Palmtree className="w-5 h-5" />,
  'energy': <Sparkles className="w-5 h-5" />,
  'packaging': <Package className="w-5 h-5" />,
  'paper': <Package className="w-5 h-5" />,
  'manufacturing': <Factory className="w-5 h-5" />,
  'aerospace': <Smartphone className="w-5 h-5" />,
  'handmade': <Palmtree className="w-5 h-5" />,
  'artisanal': <Gem className="w-5 h-5" />,
  'consumer': <ShoppingBag className="w-5 h-5" />,
};

const getCategoryIcon = (slug: string, name: string) => {
  const normalizedSlug = slug.toLowerCase();
  for (const [key, icon] of Object.entries(categoryIcons)) {
    if (normalizedSlug.includes(key) || name.toLowerCase().includes(key)) {
      return icon;
    }
  }
  return <Shapes className="w-5 h-5" />;
};

const Nav = () => {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getDashboardUrl = () => {
    if (!session?.user) return '/login';
    const role = session.user.role;
    if (role === 'VENDOR') return '/vendor/dashboard';
    if (role === 'ADMIN' || role === 'SUPER_ADMIN') return '/admin';
    return '/buyer/dashboard';
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/admin/cms/categories');
        const data = await res.json();
        if (data.categories) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Group logic: Parent categories (top level)
  const parentCategories = categories.filter(c => !categories.find(all => all.subcategories?.some(sub => sub.id === c.id)));

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand */}
          <div className="flex-shrink-0 flex items-center mr-16">
            <Link href="/" className="flex items-center group">
              <Image 
                src="/logo.png" 
                alt="Buy from Africa" 
                width={48} 
                height={48} 
                className="h-12 w-auto"
                style={{ height: '3rem', width: 'auto' }}
                priority
                unoptimized
              />
            </Link>
          </div>

          {/* Main Navigation - Desktop */}
          <div className="hidden lg:flex items-center space-x-10">
            <Link href="/browse" className="text-sm font-bold text-gray-700 hover:text-yellow-600 transition-colors flex items-center">
              Browse
            </Link>
            
            {/* Mega Menu Trigger */}
            <div 
              className="group h-20 flex items-center"
              onMouseEnter={() => setIsCategoriesOpen(true)}
              onMouseLeave={() => setIsCategoriesOpen(false)}
            >
              <button className="flex items-center text-sm font-bold text-gray-700 group-hover:text-yellow-600 transition-colors">
                Categories <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${isCategoriesOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isCategoriesOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 -translate-x-1/2 top-20 w-[800px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 p-2"
                  >
                    <div className="flex divide-x divide-gray-50 h-[400px]">
                      {/* Left side: Main Categories list */}
                      <div className="w-1/3 overflow-y-auto p-4 space-y-1">
                        <h3 className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Main Industries</h3>
                        {parentCategories.map((category) => (
                          <button
                            key={category.id}
                            onMouseEnter={() => setActiveCategory(category.id)}
                            className={`w-full text-left px-4 py-3 rounded-2xl flex items-center justify-between transition-all duration-300 ${activeCategory === category.id ? 'bg-yellow-50 text-yellow-700 shadow-sm' : 'hover:bg-gray-50 text-gray-700'}`}
                          >
                            <div className="flex items-center">
                              <div className={`p-2 rounded-xl mr-3 ${activeCategory === category.id ? 'bg-yellow-200 shadow-inner' : 'bg-gray-100'}`}>
                                {getCategoryIcon(category.slug, category.name)}
                              </div>
                              <span className="font-bold text-sm tracking-tight">{category.name}</span>
                            </div>
                            <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${activeCategory === category.id ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`} />
                          </button>
                        ))}
                      </div>

                      {/* Right side: Specialized Subcategories or Featured */}
                      <div className="w-2/3 bg-gray-50/50 p-8 overflow-y-auto">
                        <AnimatePresence mode="wait">
                          {activeCategory ? (
                            <motion.div 
                              key={activeCategory}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              className="grid grid-cols-2 gap-8"
                            >
                              <div className="col-span-2 flex justify-between items-end border-b border-gray-100 pb-4 mb-2">
                                <div>
                                  <h4 className="text-xl font-black text-gray-900">
                                    {categories.find(c => c.id === activeCategory)?.name}
                                  </h4>
                                  <p className="text-xs text-gray-500 font-medium mt-1">Specialized products and services</p>
                                </div>
                                <Link 
                                  href={`/category/${categories.find(c => c.id === activeCategory)?.slug}`}
                                  className="text-yellow-600 text-xs font-black uppercase tracking-widest hover:underline flex items-center"
                                >
                                  View All <ArrowRight className="ml-1 w-3 h-3" />
                                </Link>
                              </div>

                              {categories.find(c => c.id === activeCategory)?.subcategories?.map((sub) => (
                                <Link 
                                  key={sub.id}
                                  href={`/category/${sub.slug}`}
                                  className="group flex items-start p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300"
                                >
                                  <div className="bg-white p-2.5 rounded-xl shadow-sm mr-4 group-hover:bg-yellow-500 group-hover:text-white transition-colors duration-300">
                                    {getCategoryIcon(sub.slug, sub.name)}
                                  </div>
                                  <div>
                                    <span className="block font-bold text-gray-800 text-sm mb-1 group-hover:text-yellow-600 transition-colors">{sub.name}</span>
                                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">Explore dynamic selection</span>
                                  </div>
                                </Link>
                              ))}
                              
                              {(!categories.find(c => c.id === activeCategory)?.subcategories || categories.find(c => c.id === activeCategory)?.subcategories?.length === 0) && (
                                <div className="col-span-2 py-12 text-center">
                                   <Sparkles className="w-12 h-12 text-yellow-200 mx-auto mb-4" />
                                   <p className="text-gray-400 font-medium italic">Premium items coming soon to this niche</p>
                                </div>
                              )}
                            </motion.div>
                          ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                               <div className="w-20 h-20 bg-yellow-101 rounded-full flex items-center justify-center mb-6">
                                  <ShoppingBag className="w-10 h-10 text-yellow-600" />
                               </div>
                               <h4 className="text-xl font-black text-gray-400">Discover Africa&apos;s Finest</h4>
                               <p className="text-sm text-gray-400 mt-2 max-w-xs">Hover over a category on the left to explore specialized products and verified vendors.</p>
                            </div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/vendors" className="text-sm font-bold text-gray-700 hover:text-yellow-600 transition-colors">
              Vendors
            </Link>
            <Link href="/partnerships" className="text-sm font-bold text-gray-700 hover:text-yellow-600 transition-colors">
              Partnerships
            </Link>
            <Link href="/resources" className="text-sm font-bold text-gray-700 hover:text-yellow-600 transition-colors">
              Resources
            </Link>
            <Link href="/about" className="text-sm font-bold text-gray-700 hover:text-yellow-600 transition-colors">
              About
            </Link>
          </div>

          {/* Search Trigger */}
          <div className="hidden lg:flex items-center px-4">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-3 bg-gray-50 rounded-2xl hover:bg-yellow-50 hover:text-yellow-600 transition-all duration-300 group shadow-sm active:scale-90 cursor-pointer"
              title="Search (Ctrl+K)"
            >
              <Search className="h-5 w-5 text-gray-500 group-hover:text-yellow-600 transition-all duration-300 cursor-pointer" />
            </button>
          </div>

          {/* Right-side buttons */}
          <div className="hidden lg:flex items-center space-x-6">
            {status === 'authenticated' ? (
              <Link 
                href={getDashboardUrl()} 
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-2xl text-sm font-black tracking-wide transition-all duration-300 shadow-xl shadow-yellow-200 hover:shadow-yellow-300 active:scale-95 flex items-center"
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-sm font-bold text-gray-700 hover:text-yellow-600 transition-colors flex items-center group">
                  <div className="bg-gray-100 p-2 rounded-xl mr-2 group-hover:bg-yellow-50 group-hover:text-yellow-600 transition-colors">
                    <User className="h-5 w-5" />
                  </div>
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-2xl text-sm font-black tracking-wide transition-all duration-300 shadow-xl shadow-yellow-200 hover:shadow-yellow-300 active:scale-95"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-3 rounded-2xl bg-gray-50 text-gray-900 border border-gray-100 shadow-sm active:scale-90 transition-transform"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-50 overflow-hidden shadow-2xl"
          >
            <div className="px-4 pt-6 pb-12 space-y-6">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-yellow-500 outline-none"
                  placeholder="What are you looking for?"
                />
              </div>

              <div className="space-y-4">
                <Link 
                  href="/browse" 
                  className="flex items-center justify-between px-4 py-4 rounded-2xl bg-gray-50 text-lg font-black text-gray-900 active:bg-yellow-50 active:text-yellow-700 transition"
                >
                  Browse Marketplace <ArrowRight className="w-5 h-5 text-yellow-500" />
                </Link>
                
                {/* Mobile Categories Accordion */}
                <div className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100">
                  <button 
                    onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                    className="w-full flex items-center justify-between px-6 py-5 text-lg font-black text-gray-900"
                  >
                    <div className="flex items-center">
                      <Shapes className="w-6 h-6 mr-3 text-yellow-600" />
                      Browse Industries
                    </div>
                    <ChevronDown className={`h-6 w-6 text-gray-400 transition-transform duration-500 ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isCategoriesOpen && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-4 pb-4"
                      >
                        <div className="grid grid-cols-1 gap-2">
                          {parentCategories.map((category) => (
                            <Link 
                              key={category.id}
                              href={`/category/${category.slug}`} 
                              className="flex items-center px-4 py-4 rounded-2xl hover:bg-white text-sm font-bold text-gray-700 transition shadow-sm bg-white/50"
                            >
                              <div className="bg-yellow-500 text-white p-2 rounded-xl mr-4">
                                {getCategoryIcon(category.slug, category.name)}
                              </div>
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link 
                  href="/vendors" 
                  className="flex items-center px-6 py-5 rounded-3xl bg-gray-50 text-lg font-black text-gray-900"
                >
                  <Users className="w-6 h-6 mr-3 text-yellow-600" />
                  Vendors
                </Link>

                <Link 
                  href="/partnerships" 
                  className="flex items-center px-6 py-5 rounded-3xl bg-gray-50 text-lg font-black text-gray-900"
                >
                  <Briefcase className="w-6 h-6 mr-3 text-yellow-600" />
                  Partnerships
                </Link>

                <Link 
                  href="/resources" 
                  className="flex items-center px-6 py-5 rounded-3xl bg-gray-50 text-lg font-black text-gray-900"
                >
                  <Calculator className="w-6 h-6 mr-3 text-yellow-600" />
                  Resources
                </Link>
                
                <Link 
                  href="/about" 
                  className="flex items-center px-6 py-5 rounded-3xl bg-gray-50 text-lg font-black text-gray-900"
                >
                  <Sparkles className="w-6 h-6 mr-3 text-yellow-600" />
                  About BFA
                </Link>
              </div>

              <div className="pt-8 border-t border-gray-100 grid grid-cols-2 gap-4">
                {status === 'authenticated' ? (
                  <Link 
                    href={getDashboardUrl()} 
                    className="col-span-2 flex items-center justify-center p-4 rounded-2xl bg-yellow-600 text-white font-black active:scale-95 transition-transform"
                  >
                    <LayoutDashboard className="w-5 h-5 mr-2" />
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link 
                      href="/login" 
                      className="flex items-center justify-center p-4 rounded-2xl border border-gray-200 font-bold text-gray-700 active:bg-gray-50"
                    >
                      Login
                    </Link>
                    <Link 
                      href="/register" 
                      className="flex items-center justify-center p-4 rounded-2xl bg-yellow-600 text-white font-black active:scale-95 transition-transform"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-gray-900/40 backdrop-blur-xl flex items-start justify-center pt-24 px-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: -20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: -20, opacity: 0 }}
              className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20"
            >
              <div className="p-8">
                <div className="relative mb-8">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="h-6 w-6 text-yellow-600 cursor-pointer" />
                   </div>
                   <input
                     autoFocus
                     type="text"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full pl-14 pr-16 py-6 bg-gray-50 border-0 rounded-3xl text-xl font-bold placeholder:text-gray-400 focus:ring-0"
                     placeholder="What are you looking for?"
                   />
                   <div className="absolute inset-y-0 right-4 flex items-center">
                     <button 
                       onClick={() => setIsSearchOpen(false)}
                       className="p-3 hover:bg-gray-100 rounded-2xl text-gray-400 transition-colors cursor-pointer"
                     >
                       <X className="w-5 h-5 cursor-pointer" />
                     </button>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   {/* Quick Links / Recent */}
                   <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Trending Categories</h4>
                      <div className="space-y-2">
                        {parentCategories.slice(0, 5).map(cat => (
                          <Link 
                            key={cat.id}
                            href={`/category/${cat.slug}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="flex items-center p-3 rounded-2xl hover:bg-gray-50 group transition-colors"
                          >
                             <div className="bg-yellow-50 p-2.5 rounded-xl mr-4 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                               {getCategoryIcon(cat.slug, cat.name)}
                             </div>
                             <span className="font-bold text-gray-700">{cat.name}</span>
                             <ArrowRight className="ml-auto w-4 h-4 text-gray-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </Link>
                        ))}
                      </div>
                   </div>

                   {/* Quick Actions / Suggestions */}
                   <div className="bg-gray-50/50 -m-8 p-8 border-l border-gray-100 hidden md:block">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Quick Actions</h4>
                      <div className="space-y-4">
                        <Link 
                           href="/vendors" 
                           onClick={() => setIsSearchOpen(false)}
                           className="block p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                        >
                           <Users className="w-5 h-5 text-yellow-600 mb-2" />
                           <span className="block font-bold text-sm text-gray-800">Become a Vendor</span>
                           <span className="text-[10px] text-gray-400 font-medium">Start selling your products globally</span>
                        </Link>
                        <Link 
                           href="/resources" 
                           onClick={() => setIsSearchOpen(false)}
                           className="block p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                        >
                           <Calculator className="w-5 h-5 text-yellow-600 mb-2" />
                           <span className="block font-bold text-sm text-gray-800">Trade Resources</span>
                           <span className="text-[10px] text-gray-400 font-medium">Currency and logistics data</span>
                        </Link>
                      </div>
                   </div>
                </div>
              </div>
              
              <div className="bg-yellow-500 py-4 px-8 flex justify-between items-center">
                 <span className="text-white text-xs font-black uppercase tracking-widest">Global African Hub</span>
                 <div className="flex gap-4 text-white/50 text-[10px] font-black uppercase tracking-tighter">
                    <span>Press <kbd className="text-white font-bold bg-white/20 px-1 rounded">Esc</kbd> to close</span>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;