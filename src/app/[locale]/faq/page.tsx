"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { 
  ArrowLeft,
  Search,
  ChevronDown,
  MessageCircle,
  ShoppingBag,
  Store,
  Truck,
  HelpCircle,
  ArrowRight
} from "lucide-react";
import { useState } from "react";

export default function FAQPage() {
  const t = useTranslations("FAQ");
  const [activeCategory, setActiveCategory] = useState("general");
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const categories = [
    { id: "general", icon: HelpCircle, key: "general" },
    { id: "buyers", icon: ShoppingBag, key: "buyers" },
    { id: "vendors", icon: Store, key: "vendors" },
    { id: "shipping", icon: Truck, key: "shipping" }
  ];

  // Map questions to categories (in a real app this might be data-driven)
  const faqData = [
    { id: "whatIsBfa", category: "general", key: "whatIsBfa" },
    { id: "howToRegister", category: "general", key: "howToRegister" },
    { id: "buyerFees", category: "buyers", key: "buyerFees" },
    { id: "vendorRequirements", category: "vendors", key: "vendorRequirements" },
    { id: "shippingMethods", category: "shipping", key: "shippingMethods" },
    { id: "disputeResolution", category: "general", key: "disputeResolution" }
  ];

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFaqs = faqData.filter(faq => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const qStr = t(`questions.${faq.key}.question`).toLowerCase();
    const aStr = t(`questions.${faq.key}.answer`).toLowerCase();
    const matchesSearch = searchQuery === "" || 
      qStr.includes(searchQuery.toLowerCase()) || 
      aStr.includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-16 font-sans">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 z-50 transform origin-left"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <Link 
            href="/" 
            className="flex items-center text-gray-500 hover:text-blue-600 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-sm tracking-wide uppercase">{t("backToHome")}</span>
          </Link>
        </div>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 md:p-12 mb-12 border border-white/50 shadow-xl overflow-hidden"
        >
          {/* Decorative Gradients */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto mt-4">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold tracking-wider uppercase mb-6 shadow-sm">
              Help Center
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
              {t("title")}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mb-10">
              {t("subtitle")}
            </p>

            {/* Search Bar */}
            <div className="w-full max-w-2xl relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-4 border border-gray-200 rounded-2xl leading-5 bg-white/80 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-lg shadow-sm transition-all focus:shadow-md backdrop-blur-sm"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative lg:items-start w-full">
          
          {/* Sticky Sidebar Categories */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/4 pb-4 lg:pb-0 order-1 lg:sticky lg:top-32"
          >
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-lg hidden lg:block">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6 pb-4 border-b border-gray-100">
                Categories
              </h3>
              <nav className="flex flex-col space-y-2">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`flex items-center text-left py-3 px-4 rounded-xl transition-all duration-200 text-sm font-semibold ${
                    activeCategory === "all"
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/80"
                  }`}
                >
                  <Search className={`w-4 h-4 mr-3 flex-shrink-0 ${activeCategory === "all" ? 'text-white' : 'text-gray-400'}`} />
                  All Questions
                </button>
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isActive = activeCategory === category.id;
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex items-center text-left py-3 px-4 rounded-xl transition-all duration-200 text-sm font-semibold ${
                        isActive 
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" 
                          : "text-gray-600 hover:text-gray-900 hover:bg-white/80"
                      }`}
                    >
                      <Icon className={`w-4 h-4 mr-3 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                      <span className="truncate">{t(`categories.${category.key}`)}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Mobile Horizontal Categories */}
            <div className="lg:hidden flex overflow-x-auto pb-4 gap-3 snap-x hide-scrollbar">
               <button
                  onClick={() => setActiveCategory("all")}
                  className={`snap-start whitespace-nowrap flex items-center py-2 px-4 rounded-full transition-all text-sm font-medium border ${
                    activeCategory === "all"
                      ? "bg-blue-600 text-white border-blue-600 shadow-md" 
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  All Questions
                </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`snap-start whitespace-nowrap flex items-center py-2 px-4 rounded-full transition-all text-sm font-medium border ${
                    activeCategory === category.id
                      ? "bg-blue-600 text-white border-blue-600 shadow-md" 
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {t(`categories.${category.key}`)}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Main Content Area - Accordion */}
          <div className="w-full lg:w-3/4 order-2 space-y-6 pb-24">
            
            {filteredFaqs.length === 0 ? (
               <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm"
             >
               <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Search className="w-8 h-8 text-gray-300" />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
               <p className="text-gray-500">We couldn&apos;t find any questions matching &quot;{searchQuery}&quot;</p>
             </motion.div>
            ) : (
               <div className="space-y-4">
                 {filteredFaqs.map((faq, index) => {
                   const isOpen = openItems.includes(faq.id);
                   
                   return (
                     <motion.div
                       key={faq.id}
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.3, delay: index * 0.05 }}
                       className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                         isOpen 
                           ? "bg-white border-blue-200 shadow-lg shadow-blue-900/5" 
                           : "bg-white/60 backdrop-blur-sm border-gray-200 hover:border-blue-300 hover:shadow-md hover:bg-white"
                       }`}
                     >
                       <button
                         onClick={() => toggleItem(faq.id)}
                         className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset"
                       >
                         <h3 className={`text-lg md:text-xl font-bold transition-colors pr-8 ${
                             isOpen ? "text-blue-700" : "text-gray-900"
                           }`}
                         >
                           {t(`questions.${faq.key}.question`)}
                         </h3>
                         <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                             isOpen ? "bg-blue-100 text-blue-600 rotate-180" : "bg-gray-50 text-gray-400"
                           }`
                         }>
                           <ChevronDown className="w-5 h-5" />
                         </div>
                       </button>
                       
                       <AnimatePresence>
                         {isOpen && (
                           <motion.div
                             initial={{ height: 0, opacity: 0 }}
                             animate={{ height: "auto", opacity: 1 }}
                             exit={{ height: 0, opacity: 0 }}
                             transition={{ duration: 0.3, ease: "easeInOut" }}
                           >
                             <div className="p-6 md:p-8 pt-0 text-gray-600 text-lg leading-relaxed border-t border-gray-100/50 mt-2 bg-gradient-to-b from-transparent to-gray-50/50">
                               <p>{t(`questions.${faq.key}.answer`)}</p>
                             </div>
                           </motion.div>
                         )}
                       </AnimatePresence>
                     </motion.div>
                   );
                 })}
               </div>
            )}

            {/* Contact Support CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-16 bg-gradient-to-br from-gray-900 to-indigo-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl"
            >
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col items-center">
                 <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-6">
                    <MessageCircle className="w-8 h-8 text-white" />
                 </div>
                 <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                   {t("stillHaveQuestions")}
                 </h2>
                 <p className="text-blue-100 mb-8 max-w-lg mx-auto text-lg">
                   Our dedicated support team is here to help you with any specific inquiries or issues you might have.
                 </p>
                 <button
                   className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-gray-900 hover:bg-gray-100 transition-colors shadow-xl hover:shadow-2xl font-bold text-base group"
                 >
                   {t("contactSupport")}
                   <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </div>
  );
}
