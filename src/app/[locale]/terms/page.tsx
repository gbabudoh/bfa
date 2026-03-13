"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  ArrowLeft,
  FileText,
  Shield,
  Briefcase,
  CreditCard,
  Scale,
  XCircle,
  AlertTriangle,
  Download,
  Printer
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";

export default function TermsPage() {
  const t = useTranslations("Terms");
  const [activeSection, setActiveSection] = useState("introduction");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const sections = useMemo(() => [
    { id: "introduction", icon: FileText, key: "introduction" },
    { id: "account", icon: Shield, key: "account" },
    { id: "vendors", icon: Briefcase, key: "vendors" },
    { id: "buyers", icon: CreditCard, key: "buyers" },
    { id: "fees", icon: CreditCard, key: "fees" },
    { id: "content", icon: FileText, key: "content" },
    { id: "dispute", icon: Scale, key: "dispute" },
    { id: "termination", icon: XCircle, key: "termination" },
    { id: "limitation", icon: AlertTriangle, key: "limitation" }
  ], []);

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 200;
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("backToHome")}
          </Link>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
                {t("title")}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
                {t("subtitle")}
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-gray-500">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                {t("lastUpdated")}: <span className="text-gray-900 ml-1">March 2026</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="inline-flex items-center px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                {t("download")}
              </button>
              <button className="inline-flex items-center px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <Printer className="w-4 h-4 mr-2" />
                {t("print")}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Content & Sidebar Grid */}
        <div className="flex flex-col lg:flex-row gap-12 relative lg:items-start w-full">
          
          {/* Sticky Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/4 pb-8 lg:pb-0 order-2 lg:order-1 lg:sticky lg:top-32"
          >
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-lg">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6 pb-4 border-b border-gray-100">
                {t("tableOfContents")}
              </h3>
              <nav className="flex flex-col space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`flex items-center text-left py-2.5 px-3 rounded-lg transition-all duration-200 text-sm font-medium ${
                        isActive 
                          ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100/50" 
                          : "text-gray-500 hover:text-gray-900 hover:bg-white/50"
                      }`}
                    >
                      <Icon className={`w-4 h-4 mr-3 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                      <span className="truncate">{t(`sections.${section.key}.title`)}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* Main Content Areas */}
          <div className="w-full lg:w-3/4 order-1 lg:order-2 space-y-12 pb-24">
            {sections.map((section, index) => (
              <motion.section
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="scroll-mt-32"
              >
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100 transition-shadow hover:shadow-md">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mr-5">
                      <section.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                      {t(`sections.${section.key}.title`)}
                    </h2>
                  </div>
                  
                  <div className="prose prose-lg prose-blue max-w-none text-gray-600 leading-relaxed">
                    <p>{t(`sections.${section.key}.content`)}</p>
                  </div>
                </div>
              </motion.section>
            ))}

            {/* Back to Top */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="pt-8 text-center"
            >
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl font-medium text-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2 rotate-90" />
                {t("backToTop")}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
