"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FileEdit, 
  Save, 
  Image as ImageIcon, 
  Layout, 
  Eye, 
  Settings,
  RefreshCw,
  Loader2,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Zap,
  Award,
  Activity,
  Terminal,
  ArrowUpRight,
  Monitor,
  Database,
  Star,
  Trash2,
  Plus,
  Globe,
  X,
} from 'lucide-react';

interface CMSConfig {
  key: string;
  value: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  images: string[];
  isFeatured: boolean;
  vendor?: {
    storeName: string;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  isFeatured: boolean;
  displayOrder: number;
  parentId: string | null;
  subcategories?: Category[];
}

export default function AdminCMSPage() {
  const [activeSegment, setActiveSegment] = useState('HERO');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  
  const [configs, setConfigs] = useState<Record<string, string>>({
    hero_title: 'Connect with African Vendors Worldwide',
    hero_description: 'Discover authentic products and services directly from verified African businesses.',
    hero_btn1: 'Explore Products',
    hero_btn2: 'Become a Vendor',
    hero_bg_type: 'Yellow Gradient (Default)',
  });
  
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', slug: '', parentId: '', image: '', isFeatured: false, id: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [isFetchingProducts, setIsFetchingProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingCategoryId, setUploadingCategoryId] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const categoryFileInputRef = React.useRef<HTMLInputElement>(null);
  const modalFileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    fetchCMSData();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/cms/categories');
      const data = await res.json();
      if (data.categories) {
        setCategories(data.categories);
      }
    } catch {
      console.error('Failed to fetch categories');
    }
  };

  const fetchCMSData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/cms');
      const data = await res.json();
      if (data.configs) {
        const configMap: Record<string, string> = {};
        data.configs.forEach((c: CMSConfig) => {
          configMap[c.key] = c.value;
        });
        setConfigs(prev => ({ ...prev, ...configMap }));
      }
      if (data.featuredProducts) {
        setFeaturedProducts(data.featuredProducts);
      }
    } catch {
      console.error('Failed to fetch CMS');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfigChange = (key: string, value: string) => {
    setConfigs(prev => ({ ...prev, [key]: value }));
  };

  const saveChanges = async () => {
    setIsSaving(true);
    setFeedback(null);
    try {
      const configArray = Object.entries(configs).map(([key, value]) => ({ key, value }));
      const res = await fetch('/api/admin/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ configs: configArray }),
      });
      
      if (res.ok) {
        setFeedback({ type: 'success', message: 'Changes published successfully!' });
      } else {
        throw new Error('Failed to save');
      }
    } catch {
      setFeedback({ type: 'error', message: 'Failed to publish changes. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/cms/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        // Update local state and save to database immediately
        const updatedConfigs = { ...configs, hero_image_url: data.url };
        setConfigs(updatedConfigs);
        
        // Auto-save the image URL to database
        const configArray = Object.entries(updatedConfigs).map(([key, value]) => ({ key, value }));
        const saveRes = await fetch('/api/admin/cms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ configs: configArray }),
        });
        
        if (saveRes.ok) {
          setFeedback({ type: 'success', message: 'Image uploaded and saved!' });
        } else {
          setFeedback({ type: 'success', message: 'Image uploaded! Click Publish to save.' });
        }
      } else {
        throw new Error('Upload failed');
      }
    } catch {
      setFeedback({ type: 'error', message: 'Failed to upload image. Please try again.' });
    } finally {
      setIsUploading(false);
    }
  };

  const toggleFeatured = async (productId: string, isFeatured: boolean) => {
    try {
      const res = await fetch('/api/admin/cms/featured', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, isFeatured }),
      });
      if (res.ok) {
        if (isFeatured) {
          const productToAdd = allProducts.find(p => p.id === productId);
          if (productToAdd) {
            setFeaturedProducts(prev => [...prev.filter(p => p.id !== productId), productToAdd]);
          }
        } else {
          setFeaturedProducts(prev => prev.filter(p => p.id !== productId));
        }
      }
    } catch {
      console.error('Failed to toggle featured');
    }
  };

  const openProductPicker = async () => {
    setIsModalOpen(true);
    setIsFetchingProducts(true);
    try {
      const res = await fetch('/api/admin/products'); // I need to make sure this route exists or create it
      const data = await res.json();
      if (data.products) {
        setAllProducts(data.products);
      }
    } catch {
      console.error('Failed to fetch products');
    } finally {
      setIsFetchingProducts(false);
    }
  };

  const saveCategory = async () => {
    if (!newCategory.name) return;
    try {
      const method = isEditing ? 'PUT' : 'POST';
      const payload = {
        name: newCategory.name,
        slug: newCategory.slug || newCategory.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/&/g, 'and'),
        parentId: newCategory.parentId || null,
        image: newCategory.image || null,
        isFeatured: newCategory.isFeatured,
        ...(isEditing && { id: newCategory.id })
      };

      const res = await fetch('/api/admin/cms/categories', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setFeedback({ 
          type: 'success', 
          message: isEditing ? 'Category updated!' : (newCategory.parentId ? 'Subcategory created!' : 'Category created!') 
        });
        setNewCategory({ name: '', slug: '', parentId: '', image: '', isFeatured: false, id: '' });
        setIsCategoryModalOpen(false);
        setIsEditing(false);
        fetchCategories();
      }
    } catch {
      setFeedback({ type: 'error', message: `Failed to ${isEditing ? 'update' : 'create'} category` });
    }
  };

  const bootstrapIndustryNodes = async () => {
    setIsSaving(true);
    setFeedback({ type: 'success', message: 'Initializing global industry nodes...' });
    
    const industryNodes = [
      { name: 'Manufacturers', slug: 'manufacturers' },
      { name: 'Artisans', slug: 'artisans' },
      { name: 'Miners', slug: 'miners' },
      { name: 'Industrial', slug: 'industrial' },
      { name: 'Food and Agriculture', slug: 'food-and-agriculture' },
      { name: 'Health & Wellness', slug: 'health-and-wellness' },
      { name: 'Home & Living', slug: 'home-and-living' },
      { name: 'Technology & Energy', slug: 'technology-and-energy' }
    ];

    try {
      for (const node of industryNodes) {
        // Check if already exists
        const exists = categories.find(c => c.slug === node.slug);
        if (!exists) {
          await fetch('/api/admin/cms/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: node.name,
              slug: node.slug,
              parentId: null,
              isFeatured: true
            }),
          });
        }
      }
      setFeedback({ type: 'success', message: 'Industry hierarchy successfully provisioned.' });
      fetchCategories();
    } catch {
      setFeedback({ type: 'error', message: 'Failed to provision industry nodes' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleModalImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/cms/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setNewCategory(prev => ({ ...prev, image: data.url }));
        setFeedback({ type: 'success', message: 'Image uploaded successfully!' });
      }
    } catch (err) {
      console.error(err);
      setFeedback({ type: 'error', message: 'Failed to upload image' });
    } finally {
      setIsUploading(false);
    }
  };

  const openEditCategoryModal = (category: Category) => {
    setNewCategory({
      id: category.id,
      name: category.name,
      slug: category.slug,
      parentId: category.parentId || '',
      image: category.image || '',
      isFeatured: category.isFeatured
    });
    setIsEditing(true);
    setIsCategoryModalOpen(true);
  };

  const toggleExpandCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const openSubcategoryModal = (parentId: string) => {
    setNewCategory({ name: '', slug: '', parentId, image: '', isFeatured: false, id: '' });
    setIsCategoryModalOpen(true);
  };

  const toggleCategoryFeatured = async (category: Category) => {
    try {
      const res = await fetch('/api/admin/cms/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...category, isFeatured: !category.isFeatured }),
      });
      if (res.ok) {
        setCategories(prev => prev.map(c => 
          c.id === category.id ? { ...c, isFeatured: !c.isFeatured } : c
        ));
      }
    } catch {
      setFeedback({ type: 'error', message: 'Failed to update category' });
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const res = await fetch('/api/admin/cms/categories', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setCategories(prev => prev.filter(c => c.id !== id));
        setFeedback({ type: 'success', message: 'Category deleted!' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Failed to delete category' });
    }
  };

  const handleCategoryImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, categoryId: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingCategoryId(categoryId);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/cms/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        
        // Find category (could be parent or subcategory)
        let targetCategory: Category | undefined;
        for (const cat of categories) {
          if (cat.id === categoryId) {
            targetCategory = cat;
            break;
          }
          const sub = cat.subcategories?.find(s => s.id === categoryId);
          if (sub) {
            targetCategory = sub;
            break;
          }
        }

        if (targetCategory) {
          await fetch('/api/admin/cms/categories', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...targetCategory, image: data.url }),
          });
          
          setCategories(prev => prev.map(c => {
            if (c.id === categoryId) return { ...c, image: data.url };
            if (c.subcategories) {
              return {
                ...c,
                subcategories: c.subcategories.map(s => 
                  s.id === categoryId ? { ...s, image: data.url } : s
                )
              };
            }
            return c;
          }));
          
          setFeedback({ type: 'success', message: 'Category image updated!' });
        }
      }
    } catch {
      setFeedback({ type: 'error', message: 'Failed to upload image' });
    } finally {
      setUploadingCategoryId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-gray-400 space-y-4">
        <Loader2 size={40} className="animate-spin text-yellow-500" />
        <p className="font-bold text-sm uppercase tracking-widest">Loading CMS Engine...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {feedback && (
        <div className={`fixed bottom-8 right-8 z-[100] p-4 rounded-2xl shadow-2xl flex items-center space-x-3 border animate-in slide-in-from-right-full ${
          feedback.type === 'success' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'
        }`}>
          {feedback.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <p className="font-bold text-sm">{feedback.message}</p>
          <button onClick={() => setFeedback(null)} className="ml-4 hover:opacity-60 transition-opacity">
            <Trash2 size={16} />
          </button>
        </div>
      )}

      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-10 bg-white p-12 xl:p-16 rounded-[3.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-yellow-500/5 rounded-full blur-[160px] -mr-96 -mt-96"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-yellow-50 text-yellow-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl mb-10 border border-yellow-200/50">
            <Monitor size={14} className="animate-pulse" />
            Vetted Content Architecture
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 tracking-tighter leading-[0.9] uppercase mb-10">
            Content <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-orange-500 to-yellow-700 tracking-tighter italic">Architect</span>
          </h1>
          <p className="text-gray-500 text-lg font-medium leading-relaxed italic max-w-xl">
            Managing the global storefront aesthetic, curation nodes, and regional marketing hierarchies across the continental commerce ecosystem.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-4 w-full xl:w-auto">
          <button className="flex-1 xl:flex-none flex items-center justify-center space-x-4 bg-white border border-gray-200 text-gray-900 px-10 py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] transition-all hover:bg-gray-50 hover:shadow-2xl active:scale-95 cursor-pointer group">
            <Eye size={18} className="text-yellow-600 group-hover:scale-110 transition-transform" />
            <span>Vetted Preview</span>
          </button>
          <button 
            disabled={isSaving}
            onClick={saveChanges}
            className="flex-1 xl:flex-none flex items-center justify-center space-x-4 bg-gray-900 hover:bg-slate-800 text-white px-10 py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] transition-all shadow-3xl shadow-slate-900/20 active:scale-95 cursor-pointer group disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 size={18} className="animate-spin text-yellow-500" />
            ) : (
              <Save size={18} className="text-yellow-500 group-hover:scale-110 transition-transform" />
            )}
            <span>{isSaving ? 'Syncing...' : 'Publish Logic'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-3 relative">
          <div className="sticky top-10 space-y-3">
            <div className="px-6 py-4 mb-6">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] italic flex items-center gap-3">
                <Terminal size={14} className="text-yellow-600" />
                Curation Segments
              </h3>
            </div>
            {([
              { id: 'HERO', label: 'Homepage Hero', icon: <Layout size={18} /> },
              { id: 'BANNER', label: 'Marketing Banners', icon: <ImageIcon size={18} /> },
              { id: 'FEATURED_CATEGORIES', label: 'Featured Categories', icon: <Star size={18} /> },
              { id: 'FEATURED', label: 'Featured Products', icon: <Zap size={18} /> },
              { id: 'CATEGORIES', label: 'Categories Menu', icon: <Database size={18} /> },
              { id: 'FOOTER', label: 'Footer Settings', icon: <Settings size={18} /> },
              { id: 'ABOUT', label: 'About Page', icon: <Globe size={18} />, isLink: true, href: '/admin/cms/about' },
            ] as Array<{ id: string; label: string; icon: React.ReactNode; isLink?: boolean; href?: string }>).map((item) => (
              item.isLink ? (
                <Link
                  key={item.id}
                  href={item.href || '#'}
                  className="w-full flex items-center justify-between px-8 py-5 rounded-[2rem] transition-all duration-300 font-black text-[10px] uppercase tracking-widest text-gray-400 hover:bg-gray-50 hover:text-gray-900 border border-transparent group"
                >
                  <div className="flex items-center space-x-4">
                    <span className="group-hover:scale-110 group-hover:rotate-12 transition-transform">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => setActiveSegment(item.id)}
                  className={`w-full flex items-center justify-between px-8 py-5 rounded-[2rem] transition-all duration-300 font-black text-[10px] uppercase tracking-widest cursor-pointer group ${
                    activeSegment === item.id 
                      ? 'bg-white text-yellow-600 shadow-2xl shadow-yellow-500/10 border border-yellow-100 italic' 
                      : 'text-gray-400 hover:bg-gray-50 hover:text-gray-700 border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <span className={`group-hover:scale-110 group-hover:rotate-12 transition-transform ${activeSegment === item.id ? 'text-yellow-600' : ''}`}>
                      {item.icon}
                    </span>
                    <span className="cursor-pointer">{item.label}</span>
                  </div>
                  {activeSegment === item.id && <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full animate-pulse"></div>}
                </button>
              )
            ))}
            
            <div className="mt-12 p-8 bg-gray-900 rounded-[2.5rem] relative overflow-hidden group">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.1),transparent)] pointer-events-none"></div>
               <div className="relative z-10">
                 <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-3">System Health</p>
                 <div className="flex items-center gap-3 text-white mb-6">
                    <Activity size={16} className="text-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold tracking-tight">Syncing Live Catalogs</span>
                 </div>
                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-gradient-to-r from-amber-600 to-orange-500 w-[84%] rounded-full shadow-lg shadow-amber-500/20 transition-all duration-1000"></div>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Editor Area */}
        <div className="lg:col-span-3 space-y-8">
          {activeSegment === 'HERO' && (
            <div className="bg-white/80 backdrop-blur-3xl rounded-[3rem] border border-white shadow-2xl relative overflow-hidden p-10 xl:p-16 space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600"></div>
              
              <div className="flex items-center justify-between border-b border-gray-100 pb-10">
                <div className="space-y-1">
                  <h2 className="text-2xl font-black text-gray-900 flex items-center gap-4 uppercase tracking-tighter">
                    <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-yellow-500/20">
                      <FileEdit size={24} />
                    </div>
                    Hero Node Configuration
                  </h2>
                  <p className="text-gray-500 text-sm font-medium italic pl-16">Calibrating the primary entry-point aesthetic for the global ecosystem.</p>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Live Node</span>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
                <div className="space-y-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] pl-1">Primary Title</label>
                    <input 
                      type="text" 
                      value={configs.hero_title || ''}
                      onChange={(e) => handleConfigChange('hero_title', e.target.value)}
                      className="w-full px-8 py-6 bg-gray-50/50 border border-gray-100 rounded-[2rem] text-lg font-bold text-gray-900 focus:ring-4 focus:ring-yellow-500/10 focus:bg-white focus:border-yellow-500/50 transition-all outline-none italic"
                      placeholder="Connect with African Vendors Worldwide"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] pl-1">Hero Description</label>
                    <textarea 
                      rows={5}
                      value={configs.hero_description || ''}
                      onChange={(e) => handleConfigChange('hero_description', e.target.value)}
                      className="w-full px-8 py-6 bg-gray-50/50 border border-gray-100 rounded-[2rem] text-sm font-medium text-gray-600 focus:ring-4 focus:ring-yellow-500/10 focus:bg-white focus:border-yellow-500/50 transition-all outline-none resize-none leading-relaxed"
                      placeholder="Discover authentic products and services directly from verified African businesses."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] pl-1">Primary CTA</label>
                      <input 
                        type="text" 
                        value={configs.hero_btn1 || ''}
                        onChange={(e) => handleConfigChange('hero_btn1', e.target.value)}
                        className="w-full px-8 py-5 bg-gray-50/50 border border-gray-100 rounded-2xl text-xs font-black uppercase tracking-widest outline-none focus:border-yellow-500 transition-all" 
                        placeholder="Explore Products"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] pl-1">Secondary CTA</label>
                      <input 
                        type="text" 
                        value={configs.hero_btn2 || ''}
                        onChange={(e) => handleConfigChange('hero_btn2', e.target.value)}
                        className="w-full px-8 py-5 bg-gray-50/50 border border-gray-100 rounded-2xl text-xs font-black uppercase tracking-widest outline-none focus:border-yellow-500 transition-all" 
                        placeholder="Become a Vendor"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-10">
                  <div className="space-y-6">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] pl-1">Hero Asset Projection</label>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative aspect-[16/10] bg-gray-900 rounded-[2.5rem] border-2 border-dashed border-gray-800 flex flex-col items-center justify-center overflow-hidden hover:border-yellow-500/50 transition-all cursor-pointer group shadow-2xl ${isUploading ? 'opacity-50' : ''}`}
                    >
                      {configs.hero_image_url ? (
                        <Image 
                          key={configs.hero_image_url}
                          src={configs.hero_image_url} 
                          alt="Hero Preview" 
                          fill 
                          unoptimized
                          style={{objectFit: 'cover'}}
                          className="group-hover:scale-110 transition-transform duration-1000 z-0 opacity-60"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-yellow-950/20 flex items-center justify-center">
                          <ImageIcon size={60} className="text-yellow-600/20" />
                        </div>
                      )}
                      <div className="relative z-20 text-center space-y-6">
                        <div className="mx-auto w-20 h-20 bg-white/10 backdrop-blur-2xl rounded-3xl shadow-3xl flex items-center justify-center text-white mb-2 border border-white/10 cursor-pointer group-hover:scale-110 group-hover:bg-yellow-500 transition-all duration-500">
                          {isUploading ? <Loader2 size={32} className="animate-spin text-white" /> : <RefreshCw size={32} className="cursor-pointer" />}
                        </div>
                        <div className="space-y-2">
                           <p className="text-[10px] font-black text-white uppercase tracking-[0.4em] drop-shadow-2xl">
                             {isUploading ? 'Calibrating Optic...' : 'Inject High-Fidelity Asset'}
                           </p>
                           {configs.hero_image_url && (
                             <p className="text-[8px] text-white/40 font-mono tracking-tighter truncate max-w-[200px] mx-auto uppercase">
                               UID: {configs.hero_image_url.split('/').pop()}
                             </p>
                           )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <Zap size={14} className="text-yellow-600" />
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Optimized for 8K Dynamic Viewports</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] pl-1">Background Ambient Type</label>
                    <div className="relative group">
                      <select 
                        value={configs.hero_bg_type || 'Yellow Gradient (Default)'}
                        onChange={(e) => handleConfigChange('hero_bg_type', e.target.value)}
                        className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-black uppercase tracking-[0.2em] outline-none appearance-none cursor-pointer focus:border-yellow-500 transition-all pr-12"
                      >
                        <option>Yellow Gradient (Default)</option>
                        <option>Solid African Gold</option>
                        <option>Abstract Pattern</option>
                        <option>Static Image</option>
                      </select>
                      <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-yellow-600 transition-colors" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Local Save Action */}
              <div className="flex justify-end pt-10 border-t border-gray-100">
                <button 
                  onClick={saveChanges}
                  disabled={isSaving}
                  className="flex items-center gap-4 bg-gray-900 hover:bg-slate-800 text-white px-12 py-6 rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.3em] transition-all shadow-3xl shadow-slate-900/40 active:scale-95 disabled:opacity-50 group"
                >
                  {isSaving ? (
                    <Loader2 size={18} className="animate-spin text-yellow-500" />
                  ) : (
                    <Save size={18} className="text-yellow-500 group-hover:scale-110 transition-transform" />
                  )}
                  <span>{isSaving ? 'Syncing...' : 'Save Hero Configuration'}</span>
                </button>
              </div>
            </div>
          )}

          {activeSegment === 'FEATURED' && (
            <div className="bg-white/80 backdrop-blur-3xl rounded-[3rem] border border-white shadow-2xl relative overflow-hidden p-10 xl:p-16 space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-600"></div>
              
              <div className="flex items-center justify-between border-b border-gray-100 pb-10">
                <div className="space-y-1">
                  <h2 className="text-2xl font-black text-gray-900 flex items-center gap-4 uppercase tracking-tighter">
                    <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-amber-500/20">
                      <Zap size={24} />
                    </div>
                    Spotlight Registry
                  </h2>
                  <p className="text-gray-500 text-sm font-medium italic pl-16">Curating high-conversion SKU nodes for the primary storefront spotlight.</p>
                </div>
                <button 
                  onClick={openProductPicker}
                  className="flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-xl cursor-pointer group"
                >
                  <Plus size={16} className="text-amber-500 group-hover:rotate-90 transition-transform" />
                  Provision Product
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {featuredProducts.length === 0 ? (
                  <div className="col-span-full py-24 text-center border-2 border-dashed border-gray-100 rounded-[3rem] space-y-6">
                    <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-300 mx-auto">
                      <Database size={40} />
                    </div>
                    <p className="text-gray-400 font-bold italic tracking-tight">Spotlight Registry is currently void of active SKU nodes.</p>
                  </div>
                ) : (
                  featuredProducts.map((item) => (
                    <div key={item.id} className="group bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden cursor-pointer p-6">
                      <div className="aspect-square relative rounded-3xl overflow-hidden mb-6">
                        <Image src={item.images[0] || '/images/products/placeholder.jpg'} alt={item.name} fill style={{objectFit: 'cover'}} className="group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all flex items-center justify-center gap-4">
                           <button 
                            onClick={() => toggleFeatured(item.id, false)}
                            className="w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:border-red-500 translate-y-4 group-hover:translate-y-0"
                          >
                            <Trash2 size={24} />
                          </button>
                          <Link 
                            href={`/admin/products/${item.id}`}
                            className="w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-amber-500 hover:border-amber-500 translate-y-4 group-hover:translate-y-0 delay-75"
                          >
                            <ArrowUpRight size={24} />
                          </Link>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                           <h3 className="text-sm font-black text-gray-900 group-hover:text-amber-600 transition-colors uppercase tracking-tight truncate max-w-[80%]">{item.name}</h3>
                           <span className="text-[10px] font-black bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-lg border border-emerald-100/50 uppercase tracking-widest">Featured</span>
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          <Database size={12} className="text-amber-500" />
                          {item.category} • {item.vendor?.storeName}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeSegment === 'BANNER' && (
            <div className="bg-white/80 backdrop-blur-3xl rounded-[3rem] border border-white shadow-2xl relative overflow-hidden p-10 xl:p-16 space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600"></div>
              
              <div className="flex items-center justify-between border-b border-gray-100 pb-10">
                <div className="space-y-1">
                  <h2 className="text-2xl font-black text-gray-900 flex items-center gap-4 uppercase tracking-tighter">
                    <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
                      <ImageIcon size={24} />
                    </div>
                    Marketing Banner Matrix
                  </h2>
                  <p className="text-gray-500 text-sm font-medium italic pl-16">Syncing high-impact promotional slots across the digital storefront.</p>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100">
                  <Activity size={12} className="text-blue-500 animate-spin" />
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Real-Time Sync</span>
                </div>
              </div>

              <div className="space-y-10">
                {[1, 2].map((i) => (
                  <div key={i} className="group p-10 bg-gray-50/50 rounded-[3rem] border border-gray-100 transition-all hover:bg-white hover:shadow-2xl hover:border-blue-100/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-32 -mt-32 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    
                    <div className="relative z-10 flex flex-col xl:flex-row gap-12">
                      <div className="flex-1 space-y-8">
                        <div className="flex items-center justify-between">
                          <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.4em] italic flex items-center gap-3">
                            <Award size={14} className="text-blue-500" />
                            Banner Slot_0{i}
                          </h3>
                          <button className="text-red-500 hover:text-red-700 text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer hover:underline underline-offset-8">Decommission</button>
                        </div>
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] pl-1">Target Campaign Title</label>
                            <input 
                              type="text" 
                              value={configs[`banner_${i}_title`] || `Seasonal Sale ${i}`}
                              onChange={(e) => handleConfigChange(`banner_${i}_title`, e.target.value)}
                              className="w-full px-8 py-5 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all italic"
                            />
                          </div>
                          <div className="space-y-4">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] pl-1">Conversion Linkage</label>
                            <input 
                              type="text" 
                              value={configs[`banner_${i}_link`] || '/explore'}
                              onChange={(e) => handleConfigChange(`banner_${i}_link`, e.target.value)}
                              className="w-full px-8 py-5 bg-white border border-gray-100 rounded-2xl text-[10px] font-mono font-bold text-gray-500 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="xl:w-[450px]">
                         <div className="relative aspect-video bg-gray-900 rounded-[2.5rem] overflow-hidden group/thumb cursor-pointer border-2 border-transparent hover:border-blue-500 transition-all shadow-2xl">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-60"></div>
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 group-hover/thumb:bg-black/60 transition-all">
                            <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white mb-4 border border-white/20 group-hover/thumb:scale-110 group-hover/thumb:bg-blue-600 transition-all">
                                <RefreshCw size={24} />
                            </div>
                            <p className="text-[10px] font-black text-white uppercase tracking-[0.3em] drop-shadow-lg">Refresh Asset Node</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <button className="w-full py-10 border-2 border-dashed border-gray-200 rounded-[3rem] text-gray-400 hover:border-blue-400 hover:bg-blue-50/30 hover:text-blue-600 transition-all font-black text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-4 cursor-pointer group">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <Plus size={20} />
                  </div>
                  Provision New Promotional Slot
                </button>
              </div>

              {/* Local Save Action */}
              <div className="flex justify-end pt-10 border-t border-gray-100">
                <button 
                  onClick={saveChanges}
                  disabled={isSaving}
                  className="flex items-center gap-4 bg-gray-900 hover:bg-slate-800 text-white px-12 py-6 rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.3em] transition-all shadow-3xl shadow-slate-900/40 active:scale-95 disabled:opacity-50 group"
                >
                  {isSaving ? (
                    <Loader2 size={18} className="animate-spin text-blue-500" />
                  ) : (
                    <Save size={18} className="text-blue-500 group-hover:scale-110 transition-transform" />
                  )}
                  <span>{isSaving ? 'Syncing...' : 'Save Marketing Array'}</span>
                </button>
              </div>
            </div>
          )}

          {activeSegment === 'FEATURED_CATEGORIES' && (
            <div className="bg-white/80 backdrop-blur-3xl rounded-[3rem] border border-white shadow-2xl relative overflow-hidden p-10 xl:p-16 space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-600"></div>
              
              <div className="flex items-center justify-between border-b border-gray-100 pb-10">
                <div className="space-y-1">
                  <h2 className="text-2xl font-black text-gray-900 flex items-center gap-4 uppercase tracking-tighter">
                    <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-purple-500/20">
                      <Star size={24} />
                    </div>
                    Industry Card Curation
                  </h2>
                  <p className="text-gray-500 text-sm font-medium italic pl-16">Architecting the primary industry nodes for regional market discovery.</p>
                </div>
                <button 
                  onClick={bootstrapIndustryNodes}
                  disabled={isSaving}
                  className="flex items-center gap-3 bg-white border border-gray-200 text-gray-900 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-50 hover:shadow-xl transition-all active:scale-95 shadow-sm cursor-pointer group disabled:opacity-50"
                >
                  <RefreshCw size={16} className={`text-purple-500 group-hover:rotate-180 transition-transform duration-700 ${isSaving ? 'animate-spin' : ''}`} />
                  {isSaving ? 'Syncing Schema...' : 'Bootstrap Industry Nodes'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                {categories.filter(c => !c.parentId).length === 0 ? (
                  <div className="col-span-full py-24 text-center border-2 border-dashed border-gray-100 rounded-[3rem] space-y-6">
                    <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-300 mx-auto">
                      <Globe size={40} />
                    </div>
                    <p className="text-gray-400 font-bold italic tracking-tight">Sub-continental industry registry is currently inactive.</p>
                  </div>
                ) : (
                  categories.filter(c => !c.parentId).map((category) => (
                    <div key={category.id} className="group bg-white/95 backdrop-blur-md rounded-[2.5rem] border border-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden cursor-pointer flex flex-col h-[420px]">
                      <div className="absolute inset-0">
                        {category.image ? (
                          <Image 
                            src={category.image} 
                            alt={category.name} 
                            fill 
                            style={{objectFit: 'cover'}}
                            className="group-hover:scale-110 transition-transform duration-1000 grayscale-[20%] group-hover:grayscale-0 opacity-40 group-hover:opacity-60"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-50">
                             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.05),transparent)]"></div>
                             <Globe size={80} className="text-gray-200 animate-pulse" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
                      </div>

                      <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
                        <div className="flex justify-between items-start">
                          <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-xl border ${category.isFeatured ? 'bg-amber-500 text-white border-amber-400' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                            {category.isFeatured ? 'Spotlight Active' : 'Registry Hidden'}
                          </div>
                          <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                            <button 
                              onClick={() => openEditCategoryModal(category)}
                              className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-amber-600 hover:border-amber-200 hover:shadow-lg transition-all cursor-pointer"
                            >
                              <FileEdit size={18} />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="space-y-1.5">
                             <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter leading-tight">{category.name}</h3>
                             <p className="text-gray-400 text-[8px] font-mono tracking-widest uppercase italic">PATHID_REGISTRY: /{category.slug}</p>
                          </div>
                          
                          <button 
                            onClick={() => {
                              setUploadingCategoryId(category.id);
                              categoryFileInputRef.current?.click();
                            }}
                            className="w-full py-5 bg-gray-900 border border-gray-900 rounded-[1.5rem] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-center space-x-4 group/btn shadow-xl"
                          >
                            {uploadingCategoryId === category.id ? (
                              <Loader2 size={16} className="animate-spin text-amber-500" />
                            ) : (
                              <>
                                <RefreshCw size={16} className="text-amber-500 group-hover/btn:rotate-180 transition-transform duration-700" />
                                <span>Re-map Asset</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}


          {activeSegment === 'CATEGORIES' && (
            <div className="bg-white/80 backdrop-blur-3xl rounded-[3rem] border border-white shadow-2xl relative overflow-hidden p-10 xl:p-16 space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600"></div>
              
              <div className="flex items-center justify-between border-b border-gray-100 pb-10">
                <div className="space-y-1">
                  <h2 className="text-2xl font-black text-gray-900 flex items-center gap-4 uppercase tracking-tighter">
                    <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-500/20">
                      <Database size={24} />
                    </div>
                    Global Taxonomy Master
                  </h2>
                  <p className="text-gray-500 text-sm font-medium italic pl-16">Indexing the continental commerce hierarchy and regional sub-industry nodes.</p>
                </div>
                <button 
                  onClick={() => {
                    setNewCategory({ name: '', slug: '', parentId: '', image: '', isFeatured: false, id: '' });
                    setIsEditing(false);
                    setIsCategoryModalOpen(true);
                  }}
                  className="flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-xl cursor-pointer group"
                >
                  <Plus size={16} className="text-emerald-500 group-hover:rotate-90 transition-transform" />
                  Initialize Industry Node
                </button>
              </div>

              <input 
                type="file" 
                ref={categoryFileInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  if (uploadingCategoryId) {
                    handleCategoryImageUpload(e, uploadingCategoryId);
                  }
                }}
              />

              <p className="text-sm text-gray-500">Manage categories and subcategories. Toggle to feature them on the homepage.</p>

              <div className="space-y-6">
                {categories.length === 0 ? (
                  <div className="py-24 text-center border-2 border-dashed border-gray-100 rounded-[3rem] space-y-6">
                    <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-300 mx-auto">
                      <Globe size={40} />
                    </div>
                    <p className="text-gray-400 font-bold italic tracking-tight">Taxonomy registry is currently void of active industry nodes.</p>
                  </div>
                ) : (
                  categories.map((category) => (
                    <div key={category.id} className={`group rounded-[2.5rem] border overflow-hidden transition-all duration-500 ${category.isFeatured ? 'bg-emerald-50 shadow-emerald-500/10 border-emerald-100/50' : 'bg-gray-50/30 border-gray-100 hover:bg-white hover:shadow-2xl hover:border-gray-200'}`}>
                      <div className="p-8 flex items-center justify-between">
                        <div className="flex items-center gap-8">
                          <button
                            onClick={() => toggleExpandCategory(category.id)}
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${expandedCategories.has(category.id) ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20' : 'bg-white border border-gray-100 text-gray-400 hover:bg-gray-50'}`}
                          >
                            <ChevronDown size={18} className={`transition-transform duration-500 ${expandedCategories.has(category.id) ? 'rotate-180' : ''}`} />
                          </button>

                          <div 
                            onClick={() => {
                              setUploadingCategoryId(category.id);
                              categoryFileInputRef.current?.click();
                            }}
                            className="relative w-24 h-16 rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 cursor-pointer group/img"
                          >
                            {uploadingCategoryId === category.id ? (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                                <Loader2 size={16} className="animate-spin text-white" />
                              </div>
                            ) : category.image ? (
                              <>
                                <Image src={category.image} alt={category.name} fill style={{objectFit: 'cover'}} className="opacity-80 group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/40 transition-all flex items-center justify-center">
                                  <RefreshCw size={12} className="text-white opacity-0 group-hover/img:opacity-100 transition-all" />
                                </div>
                              </>
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-emerald-500/20 hover:bg-gray-800 transition-colors">
                                <ImageIcon size={24} />
                              </div>
                            )}
                          </div>

                          <div className="space-y-1">
                            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">{category.name}</h3>
                            <div className="flex items-center gap-4">
                              <span className="text-[10px] font-mono font-bold text-gray-400 uppercase">UID: {category.id.slice(0,8)}</span>
                              <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg border ${category.isFeatured ? 'bg-amber-500 text-white border-amber-400' : 'bg-white text-gray-400 border-gray-100'}`}>
                                {category.isFeatured ? 'Spotlight Active' : 'Registry Mode'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => openSubcategoryModal(category.id)}
                            className="px-6 py-3 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:bg-emerald-50 hover:border-emerald-100 transition-all cursor-pointer"
                          >
                            + Provision Sub-Node
                          </button>
                          <button
                            onClick={() => openEditCategoryModal(category)}
                            className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-amber-500 hover:border-amber-100 hover:shadow-lg transition-all cursor-pointer"
                          >
                            <FileEdit size={18} />
                          </button>
                          <button
                            onClick={() => toggleCategoryFeatured(category)}
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${category.isFeatured ? 'bg-amber-500 text-white shadow-xl shadow-amber-500/20' : 'bg-white border border-gray-100 text-gray-400 hover:bg-gray-50'}`}
                          >
                            <Star size={18} />
                          </button>
                          <button
                            onClick={() => deleteCategory(category.id)}
                            className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 hover:shadow-lg transition-all cursor-pointer"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      
                      {expandedCategories.has(category.id) && category.subcategories && category.subcategories.length > 0 && (
                        <div className="px-8 pb-8 animate-in slide-in-from-top-4 duration-500">
                          <div className="bg-white/50 backdrop-blur-xl rounded-[2rem] border border-white/50 p-8 space-y-6 shadow-inner">
                            <div className="flex items-center justify-between mb-4">
                               <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] italic flex items-center gap-3">
                                 <Terminal size={14} className="text-emerald-500" />
                                 Sub-Industry Nodes
                               </h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {category.subcategories.map((sub) => (
                                <div key={sub.id} className="flex items-center justify-between p-5 bg-white border border-gray-50 rounded-2xl hover:border-emerald-100/50 hover:shadow-xl transition-all group/sub">
                                  <div className="flex items-center gap-5">
                                     <div 
                                      onClick={() => {
                                        setUploadingCategoryId(sub.id);
                                        categoryFileInputRef.current?.click();
                                      }}
                                      className="w-14 h-10 relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 cursor-pointer group/subimg"
                                    >
                                      {uploadingCategoryId === sub.id ? (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                                          <Loader2 size={12} className="animate-spin text-white" />
                                        </div>
                                      ) : sub.image ? (
                                        <>
                                          <Image src={sub.image} alt={sub.name} fill style={{objectFit: 'cover'}} className="opacity-80" />
                                          <div className="absolute inset-0 bg-black/0 group-hover/subimg:bg-black/60 transition-all flex items-center justify-center text-white opacity-0 group-hover/subimg:opacity-100">
                                            <RefreshCw size={12} />
                                          </div>
                                        </>
                                      ) : (
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-emerald-500/20">
                                          <ImageIcon size={16} />
                                        </div>
                                      )}
                                     </div>
                                     <div>
                                        <p className="text-xs font-black text-gray-900 uppercase tracking-tight">{sub.name}</p>
                                        <p className="text-[9px] font-mono text-gray-400">PATHID: /{sub.slug}</p>
                                     </div>
                                  </div>
                                  <div className="flex items-center gap-2 opacity-0 group-hover/sub:opacity-100 transition-opacity">
                                    <button onClick={() => openEditCategoryModal(sub)} className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:text-amber-500 transition-all"><FileEdit size={14} /></button>
                                    <button onClick={() => deleteCategory(sub.id)} className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 transition-all"><Trash2 size={14} /></button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {expandedCategories.has(category.id) && (!category.subcategories || category.subcategories.length === 0) && (
                        <div className="px-8 pb-8 animate-in slide-in-from-top-4 duration-500">
                          <div className="bg-white/50 backdrop-blur-xl rounded-[2rem] border border-white/50 p-8 text-center shadow-inner">
                            <p className="text-xs text-gray-400 italic">No subordinate nodes detected. Click &quot;+ Provision Sub-Node&quot; to initialize.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
          {activeSegment === 'FOOTER' && (
            <div className="bg-white/80 backdrop-blur-3xl rounded-[3rem] border border-white shadow-2xl relative overflow-hidden p-10 xl:p-16 space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-slate-500 via-gray-500 to-zinc-600"></div>
              
              <div className="flex items-center justify-between border-b border-gray-100 pb-10">
                <div className="space-y-1">
                  <h2 className="text-2xl font-black text-gray-900 flex items-center gap-4 uppercase tracking-tighter">
                    <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-gray-900/20">
                      <Globe size={24} />
                    </div>
                    Global Footer Architect
                  </h2>
                  <p className="text-gray-500 text-sm font-medium italic pl-16">Configuring the terminal commerce footprint and legal sub-nodes.</p>
                </div>
                <div className="flex items-center gap-3 bg-gray-100 px-6 py-3 rounded-2xl border border-gray-200">
                   <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                   <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Global Broadcast Active</span>
                </div>
              </div>

              <div className="space-y-10">
                {/* Company Info */}
                <div className="p-10 bg-white/50 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-sm space-y-8">
                  <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                    <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-600">
                      <Award size={20} />
                    </div>
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em]">Corporate Identity</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Entity Name</label>
                      <input 
                        type="text" 
                        value={configs.footer_company_name || 'Buy from Africa'}
                        onChange={(e) => handleConfigChange('footer_company_name', e.target.value)}
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-900 outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Brand Tagline</label>
                      <input 
                        type="text" 
                        value={configs.footer_tagline || 'Connecting Africa to the World'}
                        onChange={(e) => handleConfigChange('footer_tagline', e.target.value)}
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-900 outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Terminal Description</label>
                    <textarea 
                      rows={3}
                      value={configs.footer_description || 'Your gateway to authentic African products and services.'}
                      onChange={(e) => handleConfigChange('footer_description', e.target.value)}
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-[13px] font-medium text-gray-600 outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all shadow-inner resize-none"
                    />
                  </div>
                </div>

                {/* Contact Info */}
                <div className="p-10 bg-white/50 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-sm space-y-8">
                  <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600">
                      <Zap size={20} />
                    </div>
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em]">Contact Protocols</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Communication Channel (Email)</label>
                      <input 
                        type="email" 
                        value={configs.footer_email || 'contact@buyfromafrica.com'}
                        onChange={(e) => handleConfigChange('footer_email', e.target.value)}
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-900 outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Voice Registry (Phone)</label>
                      <input 
                        type="text" 
                        value={configs.footer_phone || '+1 (555) 123-4567'}
                        onChange={(e) => handleConfigChange('footer_phone', e.target.value)}
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-900 outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Physical Node Address</label>
                    <input 
                      type="text" 
                      value={configs.footer_address || '123 Business Street, City, Country'}
                      onChange={(e) => handleConfigChange('footer_address', e.target.value)}
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-900 outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                </div>

                {/* Social Links */}
                <div className="p-10 bg-white/50 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-sm space-y-8">
                  <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                    <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-600">
                      <ArrowUpRight size={20} />
                    </div>
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em]">External Matrix (Social)</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Facebook Gateway</label>
                      <input 
                        type="url" 
                        value={configs.footer_facebook || ''}
                        onChange={(e) => handleConfigChange('footer_facebook', e.target.value)}
                        placeholder="https://facebook.com/..."
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-900 outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">X / Twitter Gateway</label>
                      <input 
                        type="url" 
                        value={configs.footer_twitter || ''}
                        onChange={(e) => handleConfigChange('footer_twitter', e.target.value)}
                        placeholder="https://twitter.com/..."
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-900 outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Instagram Gateway</label>
                      <input 
                        type="url" 
                        value={configs.footer_instagram || ''}
                        onChange={(e) => handleConfigChange('footer_instagram', e.target.value)}
                        placeholder="https://instagram.com/..."
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-900 outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">LinkedIn Gateway</label>
                      <input 
                        type="url" 
                        value={configs.footer_linkedin || ''}
                        onChange={(e) => handleConfigChange('footer_linkedin', e.target.value)}
                        placeholder="https://linkedin.com/..."
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-900 outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                  </div>
                </div>


                {/* Copyright */}
                <div className="p-10 bg-white/50 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-sm space-y-8">
                  <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-600">
                      <Award size={20} />
                    </div>
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em]">Legal Sub-Nodes</h3>
                  </div>
                  <div className="space-y-3">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Copyright Signature</label>
                    <input 
                      type="text" 
                      value={configs.footer_copyright || '© 2024 Buy from Africa. All rights reserved.'}
                      onChange={(e) => handleConfigChange('footer_copyright', e.target.value)}
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-900 outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                </div>
              </div>

              {/* Local Save Action */}
              <div className="flex justify-end pt-10 border-t border-gray-100">
                <button 
                  onClick={saveChanges}
                  disabled={isSaving}
                  className="flex items-center gap-4 bg-gray-900 hover:bg-slate-800 text-white px-12 py-6 rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.3em] transition-all shadow-3xl shadow-slate-900/40 active:scale-95 disabled:opacity-50 group"
                >
                  {isSaving ? (
                    <Loader2 size={18} className="animate-spin text-zinc-500" />
                  ) : (
                    <Save size={18} className="text-zinc-500 group-hover:scale-110 transition-transform" />
                  )}
                  <span>{isSaving ? 'Syncing...' : 'Save Footer Layout'}</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Product Picker Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-white/80 backdrop-blur-xl">
              <div>
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter italic flex items-center gap-3">
                   <Plus size={20} className="text-amber-500" />
                   Product Registry
                </h3>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-8 italic">Curating and provisioning regional spotlight assets.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 hover:shadow-lg transition-all cursor-pointer group"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search products by name or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white transition-all"
                />
              </div>

              <div className="max-h-[400px] overflow-y-auto space-y-2 pr-2">
                {isFetchingProducts ? (
                  <div className="py-20 flex flex-col items-center justify-center text-gray-400">
                    <Loader2 size={32} className="animate-spin text-yellow-500 mb-4" />
                    <p className="text-xs font-black uppercase tracking-widest">Scanning Catalog...</p>
                  </div>
                ) : (
                  allProducts
                    .filter(p => !featuredProducts.some(fp => fp.id === p.id))
                    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map(product => (
                      <div key={product.id} className="flex items-center justify-between p-3 hover:bg-yellow-50/50 rounded-2xl border border-transparent hover:border-yellow-100 transition-all group">
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 relative rounded-lg overflow-hidden bg-gray-100">
                            <Image src={product.images[0] || '/images/products/placeholder.jpg'} alt={product.name} fill style={{objectFit: 'cover'}} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">{product.name}</p>
                            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{product.category}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => toggleFeatured(product.id, true)}
                          className="bg-yellow-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm hover:bg-yellow-700 active:scale-95 transition-all opacity-0 group-hover:opacity-100"
                        >
                          Feature Item
                        </button>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Creation Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCategoryModalOpen(false)}></div>
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-white/80 backdrop-blur-xl">
              <div>
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter italic flex items-center gap-3">
                   <Database size={20} className="text-emerald-500" />
                   Node Provisioning
                </h3>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-8 italic">
                  {isEditing ? 'SYNC_NODE_DETAILS' : 'INITIALIZE_NEW_PATH'}
                </p>
              </div>
              <button 
                onClick={() => setIsCategoryModalOpen(false)}
                className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 hover:shadow-lg transition-all cursor-pointer group"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {newCategory.parentId ? 'Subcategory Name' : 'Category Name'}
                </label>
                <input 
                  type="text" 
                  placeholder={newCategory.parentId ? "e.g. Cotton Fabrics" : "e.g. Fashion, Textiles & Lifestyle"}
                  value={newCategory.name}
                  onChange={(e) => setNewCategory(prev => ({ 
                    ...prev, 
                    name: e.target.value,
                    slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/&/g, 'and')
                  }))}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">URL Slug</label>
                <input 
                  type="text" 
                  placeholder="e.g. fashion-textiles-lifestyle"
                  value={newCategory.slug}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, slug: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white transition-all"
                />
                <p className="text-[10px] text-gray-500 mt-1">This will be used in the URL: /category/{newCategory.slug || 'slug'}</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category Image</label>
                <input 
                  type="file" 
                  ref={modalFileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleModalImageUpload}
                />
                <div className="flex items-center space-x-4">
                  <div className="h-20 w-32 relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                    {newCategory.image ? (
                      <Image src={newCategory.image} alt="Preview" fill style={{objectFit: 'cover'}} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon size={24} className="text-gray-300" />
                      </div>
                    )}
                    {isUploading && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Loader2 size={20} className="animate-spin text-white" />
                      </div>
                    )}
                  </div>
                  <button 
                    type="button"
                    onClick={() => modalFileInputRef.current?.click()}
                    className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 transition-all cursor-pointer flex items-center space-x-2"
                  >
                    <RefreshCw size={14} />
                    <span>{newCategory.image ? 'Change Image' : 'Upload Image'}</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="categoryFeatured"
                  checked={newCategory.isFeatured}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, isFeatured: e.target.checked }))}
                  className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                />
                <label htmlFor="categoryFeatured" className="text-sm font-bold text-gray-700">Display on Homepage</label>
              </div>
              <button
                onClick={saveCategory}
                disabled={!newCategory.name}
                className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-xl font-bold transition-all cursor-pointer disabled:cursor-not-allowed"
              >
                {isEditing ? 'Save Changes' : (newCategory.parentId ? 'Create Subcategory' : 'Create Category')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
