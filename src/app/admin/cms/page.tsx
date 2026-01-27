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
  Plus,
  Trash2,
  Star,
  Globe,
  Loader2,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronRight
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
  const [newCategory, setNewCategory] = useState({ name: '', slug: '', parentId: '' });
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [isFetchingProducts, setIsFetchingProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingCategoryId, setUploadingCategoryId] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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

  const createCategory = async () => {
    if (!newCategory.name) return;
    try {
      const res = await fetch('/api/admin/cms/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newCategory.name,
          slug: newCategory.slug || newCategory.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/&/g, 'and'),
          parentId: newCategory.parentId || null
        }),
      });
      if (res.ok) {
        setFeedback({ type: 'success', message: newCategory.parentId ? 'Subcategory created!' : 'Category created!' });
        setNewCategory({ name: '', slug: '', parentId: '' });
        setIsCategoryModalOpen(false);
        fetchCategories();
      }
    } catch {
      setFeedback({ type: 'error', message: 'Failed to create category' });
    }
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
    setNewCategory({ name: '', slug: '', parentId });
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
        const category = categories.find(c => c.id === categoryId);
        if (category) {
          await fetch('/api/admin/cms/categories', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...category, image: data.url }),
          });
          setCategories(prev => prev.map(c => 
            c.id === categoryId ? { ...c, image: data.url } : c
          ));
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

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CMS & Content Manager</h1>
          <p className="text-gray-500 mt-1">Control the storefront appearance, banners, and dynamic content.</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold transition-all hover:bg-gray-50 cursor-pointer">
            <Eye size={20} className="cursor-pointer" />
            <span className="cursor-pointer">Preview Site</span>
          </button>
          <button 
            disabled={isSaving}
            onClick={saveChanges}
            className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} className="cursor-pointer" />}
            <span className="cursor-pointer">{isSaving ? 'Publishing...' : 'Publish Changes'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {([
            { id: 'HERO', label: 'Homepage Hero', icon: <Layout size={18} /> },
            { id: 'BANNER', label: 'Marketing Banners', icon: <ImageIcon size={18} /> },
            { id: 'FEATURED', label: 'Featured Products', icon: <Settings size={18} /> },
            { id: 'CATEGORIES', label: 'Categories Menu', icon: <Settings size={18} /> },
            { id: 'FOOTER', label: 'Footer Settings', icon: <Settings size={18} /> },
            { id: 'ABOUT', label: 'About Page', icon: <Globe size={18} />, isLink: true, href: '/admin/cms/about' },
          ] as Array<{ id: string; label: string; icon: React.ReactNode; isLink?: boolean; href?: string }>).map((item) => (
            item.isLink ? (
              <Link
                key={item.id}
                href={item.href || '#'}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-bold text-gray-500 hover:bg-yellow-50 hover:text-yellow-600 border border-transparent"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ) : (
              <button
                key={item.id}
                onClick={() => setActiveSegment(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-bold cursor-pointer ${
                  activeSegment === item.id 
                    ? 'bg-yellow-50 text-yellow-600 border border-yellow-100' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`}
              >
                {item.icon}
                <span className="cursor-pointer">{item.label}</span>
              </button>
            )
          ))}
        </div>

        {/* Editor Area */}
        <div className="lg:col-span-3 space-y-8">
          {activeSegment === 'HERO' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
              <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center">
                  <FileEdit size={20} className="mr-2 text-yellow-600" />
                  Hero Section Configuration
                </h2>
                <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded tracking-widest">LIVE</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Primary Title</label>
                    <input 
                      type="text" 
                      value={configs.hero_title || ''}
                      onChange={(e) => handleConfigChange('hero_title', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-yellow-500 focus:bg-white transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Hero Description</label>
                    <textarea 
                      rows={4}
                      value={configs.hero_description || ''}
                      onChange={(e) => handleConfigChange('hero_description', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-yellow-500 focus:bg-white transition-all outline-none resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Button 1 Text</label>
                      <input 
                        type="text" 
                        value={configs.hero_btn1 || ''}
                        onChange={(e) => handleConfigChange('hero_btn1', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Button 2 Text</label>
                      <input 
                        type="text" 
                        value={configs.hero_btn2 || ''}
                        onChange={(e) => handleConfigChange('hero_btn2', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none" 
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Hero Image Overlay</label>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative aspect-video bg-gray-100 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden hover:border-yellow-400 transition-all cursor-pointer group min-h-[220px] ${isUploading ? 'opacity-50' : ''}`}
                    >
                      {configs.hero_image_url ? (
                        <Image 
                          key={configs.hero_image_url}
                          src={configs.hero_image_url} 
                          alt="Hero Preview" 
                          fill 
                          unoptimized
                          style={{objectFit: 'cover'}}
                          className="group-hover:scale-105 transition-transform duration-500 z-0"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-yellow-100 flex items-center justify-center">
                          <ImageIcon size={40} className="text-yellow-300" />
                        </div>
                      )}
                      <div className="relative z-20 text-center">
                        <div className="mx-auto w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-yellow-600 mb-2 border border-yellow-100 cursor-pointer">
                          {isUploading ? <Loader2 size={24} className="animate-spin" /> : <RefreshCw size={24} className="cursor-pointer" />}
                        </div>
                        <p className="text-xs font-bold text-white drop-shadow-md cursor-pointer bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-md">
                          {isUploading ? 'Uploading Engine...' : 'Click to Replace Image'}
                        </p>
                        {configs.hero_image_url && (
                          <p className="mt-2 text-[10px] text-white/60 drop-shadow-sm font-mono truncate max-w-[200px] mx-auto">
                            {configs.hero_image_url.split('/').pop()}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-2">Recommended size: 1920x1080px. Max 5MB. PNG or JPG.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Hero Background Type</label>
                    <select 
                      value={configs.hero_bg_type || 'Yellow Gradient (Default)'}
                      onChange={(e) => handleConfigChange('hero_bg_type', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none appearance-none cursor-pointer"
                    >
                      <option>Yellow Gradient (Default)</option>
                      <option>Solid African Gold</option>
                      <option>Abstract Pattern</option>
                      <option>Static Image</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSegment === 'FEATURED' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center">
                  <Star size={20} className="mr-2 text-yellow-500" />
                  Featured Products Management
                </h2>
                <button 
                  onClick={openProductPicker}
                  className="text-sm font-bold text-yellow-600 hover:bg-yellow-50 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                >
                  Add Product
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredProducts.length === 0 ? (
                  <div className="col-span-full py-12 text-center text-gray-400 font-medium border-2 border-dashed border-gray-100 rounded-2xl">
                    No products featured currently.
                  </div>
                ) : (
                  featuredProducts.map((item) => (
                    <div key={item.id} className="relative group rounded-xl overflow-hidden border border-gray-100">
                      <div className="aspect-square relative flex-shrink-0">
                        <Image src={item.images[0] || '/images/products/placeholder.jpg'} alt={item.name} fill style={{objectFit: 'cover'}} />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                          <button 
                            onClick={() => toggleFeatured(item.id, false)}
                            className="opacity-0 group-hover:opacity-100 bg-white p-2 rounded-lg text-red-500 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all cursor-pointer"
                          >
                            <Trash2 size={18} className="cursor-pointer" />
                          </button>
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-bold text-gray-900 truncate">{item.name}</p>
                        <p className="text-[10px] text-gray-500 font-medium">{item.category} • {item.vendor?.storeName}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeSegment === 'BANNER' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
              <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center">
                  <ImageIcon size={20} className="mr-2 text-blue-500" />
                  Marketing Banners Configuration
                </h2>
                <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded tracking-widest">REAL-TIME</span>
              </div>

              <div className="space-y-6">
                {[1, 2].map((i) => (
                  <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Banner Slot #{i}</h3>
                      <button className="text-red-500 hover:text-red-700 text-xs font-bold transition-colors cursor-pointer">Remove Slot</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Banner Title</label>
                          <input 
                            type="text" 
                            value={configs[`banner_${i}_title`] || `Seasonal Sale ${i}`}
                            onChange={(e) => handleConfigChange(`banner_${i}_title`, e.target.value)}
                            className="w-full px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Call to Action Link</label>
                          <input 
                            type="text" 
                            value={configs[`banner_${i}_link`] || '/explore'}
                            onChange={(e) => handleConfigChange(`banner_${i}_link`, e.target.value)}
                            className="w-full px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                          />
                        </div>
                      </div>
                      <div className="relative aspect-video bg-gray-200 rounded-xl overflow-hidden group cursor-pointer border-2 border-transparent hover:border-yellow-400 transition-all">
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                          <RefreshCw size={24} className="text-white mb-2" />
                          <p className="text-[10px] font-black text-white uppercase tracking-tighter">Update Asset</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 hover:border-yellow-400 hover:text-yellow-600 transition-all font-black text-xs uppercase tracking-widest flex items-center justify-center cursor-pointer">
                  <Plus size={18} className="mr-2" />
                  Create New Promotional Slot
                </button>
              </div>
            </div>
          )}

          {activeSegment === 'CATEGORIES' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center">
                  <Layout size={20} className="mr-2 text-purple-500" />
                  Categories &amp; Subcategories Management
                </h2>
                <button 
                  onClick={() => {
                    setNewCategory({ name: '', slug: '', parentId: '' });
                    setIsCategoryModalOpen(true);
                  }}
                  className="text-sm font-bold text-yellow-600 hover:bg-yellow-50 px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center"
                >
                  <Plus size={16} className="mr-1" />
                  Add Category
                </button>
              </div>

              <p className="text-sm text-gray-500">Manage categories and subcategories. Toggle to feature them on the homepage.</p>

              <div className="space-y-3">
                {categories.length === 0 ? (
                  <div className="py-12 text-center text-gray-400 font-medium border-2 border-dashed border-gray-100 rounded-2xl">
                    No categories created yet. Click &quot;Add Category&quot; to create one.
                  </div>
                ) : (
                  categories.map((category) => (
                    <div key={category.id} className="border border-gray-100 rounded-xl overflow-hidden">
                      {/* Parent Category */}
                      <div className={`flex items-center p-4 space-x-4 ${category.isFeatured ? 'bg-yellow-50' : 'bg-white'}`}>
                        <button
                          onClick={() => toggleExpandCategory(category.id)}
                          className="p-1 hover:bg-gray-100 rounded transition-all cursor-pointer"
                        >
                          {expandedCategories.has(category.id) ? (
                            <ChevronDown size={18} className="text-gray-500" />
                          ) : (
                            <ChevronRight size={18} className="text-gray-500" />
                          )}
                        </button>
                        <div 
                          onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = (e) => handleCategoryImageUpload(e as unknown as React.ChangeEvent<HTMLInputElement>, category.id);
                            input.click();
                          }}
                          className="h-12 w-12 relative rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 cursor-pointer group/img"
                        >
                          {uploadingCategoryId === category.id ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                              <Loader2 size={16} className="animate-spin text-white" />
                            </div>
                          ) : category.image ? (
                            <>
                              <Image src={category.image} alt={category.name} fill style={{objectFit: 'cover'}} />
                              <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/40 transition-all flex items-center justify-center">
                                <RefreshCw size={12} className="text-white opacity-0 group-hover/img:opacity-100 transition-all" />
                              </div>
                            </>
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 group-hover/img:bg-gray-300 transition-all">
                              <ImageIcon size={16} className="text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-900">{category.name}</p>
                          <p className="text-[10px] text-gray-500 font-mono">/{category.slug} • {category.subcategories?.length || 0} subcategories</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => openSubcategoryModal(category.id)}
                            className="px-2 py-1 rounded-lg text-xs font-bold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all cursor-pointer"
                          >
                            + Sub
                          </button>
                          <button
                            onClick={() => toggleCategoryFeatured(category)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              category.isFeatured 
                                ? 'bg-yellow-500 text-white' 
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                          >
                            {category.isFeatured ? 'Featured' : 'Hidden'}
                          </button>
                          <button
                            onClick={() => deleteCategory(category.id)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Subcategories */}
                      {expandedCategories.has(category.id) && category.subcategories && category.subcategories.length > 0 && (
                        <div className="border-t border-gray-100 bg-gray-50/50">
                          {category.subcategories.map((sub) => (
                            <div key={sub.id} className="flex items-center p-3 pl-14 space-x-3 border-b border-gray-100 last:border-b-0">
                              <div className="h-8 w-8 relative rounded-md overflow-hidden bg-gray-200 flex-shrink-0">
                                {sub.image ? (
                                  <Image src={sub.image} alt={sub.name} fill style={{objectFit: 'cover'}} />
                                ) : (
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <ImageIcon size={12} className="text-gray-400" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-gray-700">{sub.name}</p>
                                <p className="text-[9px] text-gray-400 font-mono">/{sub.slug}</p>
                              </div>
                              <button
                                onClick={() => deleteCategory(sub.id)}
                                className="p-1 rounded text-gray-300 hover:text-red-500 transition-all cursor-pointer"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Empty subcategories message */}
                      {expandedCategories.has(category.id) && (!category.subcategories || category.subcategories.length === 0) && (
                        <div className="border-t border-gray-100 bg-gray-50/50 p-4 pl-14">
                          <p className="text-xs text-gray-400 italic">No subcategories yet. Click &quot;+ Sub&quot; to add one.</p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeSegment === 'FOOTER' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center">
                  <Layout size={20} className="mr-2 text-gray-600" />
                  Footer Settings
                </h2>
                <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded tracking-widest">LIVE</span>
              </div>

              <p className="text-sm text-gray-500">Configure the footer content displayed across all pages.</p>

              <div className="space-y-6">
                {/* Company Info */}
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Company Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Company Name</label>
                      <input 
                        type="text" 
                        value={configs.footer_company_name || 'Buy from Africa'}
                        onChange={(e) => handleConfigChange('footer_company_name', e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Tagline</label>
                      <input 
                        type="text" 
                        value={configs.footer_tagline || 'Connecting Africa to the World'}
                        onChange={(e) => handleConfigChange('footer_tagline', e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Footer Description</label>
                    <textarea 
                      rows={3}
                      value={configs.footer_description || 'Your gateway to authentic African products and services.'}
                      onChange={(e) => handleConfigChange('footer_description', e.target.value)}
                      className="w-full px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-yellow-500 transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Contact Info */}
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Email Address</label>
                      <input 
                        type="email" 
                        value={configs.footer_email || 'contact@buyfromafrica.com'}
                        onChange={(e) => handleConfigChange('footer_email', e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Phone Number</label>
                      <input 
                        type="text" 
                        value={configs.footer_phone || '+1 (555) 123-4567'}
                        onChange={(e) => handleConfigChange('footer_phone', e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Address</label>
                    <input 
                      type="text" 
                      value={configs.footer_address || '123 Business Street, City, Country'}
                      onChange={(e) => handleConfigChange('footer_address', e.target.value)}
                      className="w-full px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                    />
                  </div>
                </div>

                {/* Social Links */}
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Social Media Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Facebook URL</label>
                      <input 
                        type="url" 
                        value={configs.footer_facebook || ''}
                        onChange={(e) => handleConfigChange('footer_facebook', e.target.value)}
                        placeholder="https://facebook.com/..."
                        className="w-full px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Twitter/X URL</label>
                      <input 
                        type="url" 
                        value={configs.footer_twitter || ''}
                        onChange={(e) => handleConfigChange('footer_twitter', e.target.value)}
                        placeholder="https://twitter.com/..."
                        className="w-full px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Instagram URL</label>
                      <input 
                        type="url" 
                        value={configs.footer_instagram || ''}
                        onChange={(e) => handleConfigChange('footer_instagram', e.target.value)}
                        placeholder="https://instagram.com/..."
                        className="w-full px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">LinkedIn URL</label>
                      <input 
                        type="url" 
                        value={configs.footer_linkedin || ''}
                        onChange={(e) => handleConfigChange('footer_linkedin', e.target.value)}
                        placeholder="https://linkedin.com/..."
                        className="w-full px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Copyright */}
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Copyright &amp; Legal</h3>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Copyright Text</label>
                    <input 
                      type="text" 
                      value={configs.footer_copyright || '© 2024 Buy from Africa. All rights reserved.'}
                      onChange={(e) => handleConfigChange('footer_copyright', e.target.value)}
                      className="w-full px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                    />
                  </div>
                </div>
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
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Select Featured Products</h3>
                <p className="text-sm text-gray-500 italic">Curate items for the storefront&apos;s spotlight.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <Trash2 size={20} className="text-gray-400" />
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
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {newCategory.parentId ? 'Create Subcategory' : 'Create New Category'}
                </h3>
                <p className="text-sm text-gray-500">
                  {newCategory.parentId 
                    ? `Adding subcategory to: ${categories.find(c => c.id === newCategory.parentId)?.name}`
                    : 'Add a new main category'
                  }
                </p>
              </div>
              <button 
                onClick={() => setIsCategoryModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <Trash2 size={20} className="text-gray-400" />
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
              <button
                onClick={createCategory}
                disabled={!newCategory.name}
                className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-xl font-bold transition-all cursor-pointer disabled:cursor-not-allowed"
              >
                {newCategory.parentId ? 'Create Subcategory' : 'Create Category'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
