"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Store, MapPin, Globe, Clock, Save, Eye, Phone, Mail, 
  Building2, CreditCard, Truck, Tag, Award, Package,
  Loader2, CheckCircle, AlertCircle, Plus, X, ExternalLink
} from 'lucide-react';
import ImageUpload from './ImageUpload';
import Link from 'next/link';
import Image from 'next/image';

interface VendorData {
  id: string;
  storeName: string;
  description: string | null;
  longDescription: string | null;
  logo: string | null;
  banner: string | null;
  location: string | null;
  businessType: string | null;
  badgeType: string | null;
  regNumber: string | null;
  categories: string[];
  shippingCountries: string[];
  paymentOptions: string[];
  contactEmail: string | null;
  contactPhone: string | null;
  website: string | null;
  address: string | null;
  businessHours: string | null;
  certifications: string[];
  productionCapacity: string | null;
  minOrderWholesale: string | null;
  minOrderRetail: string | null;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
}

const BUSINESS_TYPES = [
  { value: 'retailer', label: 'Retailer', desc: 'Sells products from various sources' },
  { value: 'manufacturer', label: 'Manufacturer', desc: 'Produces own products directly' },
  { value: 'artisan', label: 'Artisan', desc: 'Handcrafted goods specialist' },
  { value: 'wholesaler', label: 'Wholesaler', desc: 'Bulk sales specialist' },
  { value: 'factory', label: 'Factory', desc: 'Industrial production facility' },
];

const PAYMENT_OPTIONS = [
  'Bank Transfer', 'Credit Card', 'PayPal', 'Mobile Money', 
  'Cash on Delivery', 'Letter of Credit', 'Western Union', 'Crypto'
];

const SHIPPING_REGIONS = [
  'Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Egypt', 'Morocco',
  'Tanzania', 'Ethiopia', 'Uganda', 'Senegal', 'Cameroon', 'Côte d\'Ivoire',
  'Europe', 'North America', 'Asia', 'Middle East', 'Worldwide'
];

const PRODUCT_CATEGORIES = [
  // Manufacturers
  'Textiles and fabrics', 'Apparel and fashion accessories', 'Leather and leather goods',
  'Footwear', 'Automotive assembly and components', 'Electrical equipment and cables',
  'Electronics and small appliances', 'Industrial machinery and equipment',
  'Furniture and fittings', 'Packaging materials',
  // Artisans
  'Handicrafts and souvenirs', 'Home décor and interior items',
  'Traditional art, sculpture, and carvings', 'Jewellery and adornments',
  'Cultural and religious items',
  // Miners
  'Minerals and ores', 'Precious metals and gemstones', 'Industrial minerals',
  // Industrial
  'Building materials and construction products', 'Metals and metal products',
  'Wood and wood products', 'Paper, pulp, and printed materials',
  'Chemicals and petrochemicals', 'Fertilizers and agro-inputs',
  'Paints, coatings, and adhesives', 'Plastics and rubber products',
  // Food and Agriculture
  'Agricultural commodities', 'Processed foods and beverages',
  'Livestock and animal products', 'Fisheries and aquaculture products',
  // Health & Wellness
  'Pharmaceuticals and medical supplies', 'Cosmetics, beauty, and personal care',
  'Health and wellness products',
  // Home & Living
  'Cleaning and household care products', 'Eco-friendly and sustainable products',
  'Educational and office supplies',
  // Technology & Energy
  'Renewable energy equipment', 'ICT hardware assembly',
  'Digital content tied to physical goods',
];

type TabType = 'identity' | 'contact' | 'business' | 'shipping' | 'preview';

export default function StorefrontSettingsForm() {
  const [vendor, setVendor] = useState<VendorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [activeTab, setActiveTab] = useState<TabType>('identity');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form state
  const [formData, setFormData] = useState({
    storeName: '',
    description: '',
    longDescription: '',
    logo: '',
    banner: '',
    location: '',
    businessType: 'retailer',
    regNumber: '',
    categories: [] as string[],
    shippingCountries: [] as string[],
    paymentOptions: [] as string[],
    contactEmail: '',
    contactPhone: '',
    website: '',
    address: '',
    businessHours: '',
    certifications: [] as string[],
    productionCapacity: '',
    minOrderWholesale: '',
    minOrderRetail: '',
  });

  const [newCertification, setNewCertification] = useState('');

  // Fetch vendor data
  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const res = await fetch('/api/vendor/storefront');
        if (res.ok) {
          const data = await res.json();
          setVendor(data);
          setFormData({
            storeName: data.storeName || '',
            description: data.description || '',
            longDescription: data.longDescription || '',
            logo: data.logo || '',
            banner: data.banner || '',
            location: data.location || '',
            businessType: data.businessType || 'retailer',
            regNumber: data.regNumber || '',
            categories: data.categories || [],
            shippingCountries: data.shippingCountries || [],
            paymentOptions: data.paymentOptions || [],
            contactEmail: data.contactEmail || '',
            contactPhone: data.contactPhone || '',
            website: data.website || '',
            address: data.address || '',
            businessHours: data.businessHours || '',
            certifications: data.certifications || [],
            productionCapacity: data.productionCapacity || '',
            minOrderWholesale: data.minOrderWholesale || '',
            minOrderRetail: data.minOrderRetail || '',
          });
        }
      } catch (error) {
        console.error('Error fetching vendor:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVendor();
  }, []);

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};
    if (!formData.storeName.trim()) newErrors.storeName = 'Store name is required';
    if (formData.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Invalid email format';
    }
    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = 'Website must start with http:// or https://';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setSaving(true);
    setSaveStatus('idle');
    
    try {
      const res = await fetch('/api/vendor/storefront', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        const updated = await res.json();
        setVendor(updated);
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Error saving:', error);
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const toggleArrayItem = (field: 'categories' | 'shippingCountries' | 'paymentOptions', item: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }));
  };

  const addCertification = () => {
    if (newCertification.trim() && !formData.certifications.includes(newCertification.trim())) {
      setFormData(prev => ({
        ...prev,
        certifications: [...prev.certifications, newCertification.trim()]
      }));
      setNewCertification('');
    }
  };

  const removeCertification = (cert: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c !== cert)
    }));
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 text-[#D9A606] animate-spin" />
          <p className="text-gray-500 font-medium">Loading storefront settings...</p>
        </div>
      </div>
    );
  }

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'identity', label: 'Brand Identity', icon: <Store className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact Info', icon: <Phone className="w-4 h-4" /> },
    { id: 'business', label: 'Business Details', icon: <Building2 className="w-4 h-4" /> },
    { id: 'shipping', label: 'Shipping & Payment', icon: <Truck className="w-4 h-4" /> },
    { id: 'preview', label: 'Preview', icon: <Eye className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-6 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-[#D9A606]/10 text-[#D9A606]">
              <Store className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#D9A606] uppercase tracking-wider">Storefront Management</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Manage Your Storefront</h1>
          <p className="text-gray-500 mt-1">Customize how your store appears to buyers on the marketplace</p>
        </div>
        
        <div className="flex items-center gap-3">
          {vendor && (
            <Link 
              href={`/vendors/${vendor.id}`}
              target="_blank"
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View Public Page
            </Link>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-[#D9A606] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#B8890A] transition-colors disabled:opacity-50 shadow-lg shadow-yellow-200"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Save Status Toast */}
      {saveStatus !== 'idle' && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg ${
          saveStatus === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {saveStatus === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {saveStatus === 'success' ? 'Changes saved successfully!' : 'Failed to save changes'}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-[#D9A606] text-white shadow-lg shadow-yellow-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-8">
        {/* Brand Identity Tab */}
        {activeTab === 'identity' && (
          <div className="space-y-8">
            {/* Images Section */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#D9A606] rounded-full"></div>
                Brand Assets
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ImageUpload
                  label="Store Logo"
                  value={formData.logo}
                  onChange={(url) => updateField('logo', url)}
                  aspectRatio="square"
                  placeholder="Upload Logo"
                />
                <div className="md:col-span-1">
                  <ImageUpload
                    label="Store Banner"
                    value={formData.banner}
                    onChange={(url) => updateField('banner', url)}
                    aspectRatio="video"
                    placeholder="Upload Banner (21:9)"
                  />
                </div>
              </div>
            </div>

            {/* Store Info */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#D9A606] rounded-full"></div>
                Store Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Store Name *</label>
                  <input
                    type="text"
                    value={formData.storeName}
                    onChange={(e) => updateField('storeName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#D9A606]/20 focus:border-[#D9A606] outline-none transition-all ${
                      errors.storeName ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                    placeholder="Your store name"
                  />
                  {errors.storeName && <p className="text-red-500 text-xs">{errors.storeName}</p>}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => updateField('location', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D9A606]/20 focus:border-[#D9A606] outline-none transition-all"
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-gray-700">Short Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D9A606]/20 focus:border-[#D9A606] outline-none transition-all resize-none"
                    placeholder="Brief description of your store (shown in search results)"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-gray-700">Full Description</label>
                  <textarea
                    value={formData.longDescription}
                    onChange={(e) => updateField('longDescription', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D9A606]/20 focus:border-[#D9A606] outline-none transition-all resize-none"
                    placeholder="Detailed description of your business, products, and services"
                  />
                </div>
              </div>
            </div>

            {/* Product Categories */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#D9A606] rounded-full"></div>
                <Tag className="w-5 h-5" />
                Product Categories
              </h3>
              <p className="text-gray-500 text-sm mb-4">Select the categories that best describe your products</p>
              <div className="flex flex-wrap gap-2">
                {PRODUCT_CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => toggleArrayItem('categories', cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      formData.categories.includes(cat)
                        ? 'bg-[#D9A606] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contact Info Tab */}
        {activeTab === 'contact' && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-[#D9A606] rounded-full"></div>
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => updateField('contactEmail', e.target.value)}
                    className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#D9A606]/20 focus:border-[#D9A606] outline-none transition-all ${
                      errors.contactEmail ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                    placeholder="contact@yourstore.com"
                  />
                </div>
                {errors.contactEmail && <p className="text-red-500 text-xs">{errors.contactEmail}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => updateField('contactPhone', e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D9A606]/20 focus:border-[#D9A606] outline-none transition-all"
                    placeholder="+234 xxx xxx xxxx"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Website</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => updateField('website', e.target.value)}
                    className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#D9A606]/20 focus:border-[#D9A606] outline-none transition-all ${
                      errors.website ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
                {errors.website && <p className="text-red-500 text-xs">{errors.website}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Business Hours</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.businessHours}
                    onChange={(e) => updateField('businessHours', e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D9A606]/20 focus:border-[#D9A606] outline-none transition-all"
                    placeholder="Mon-Fri: 9am-5pm WAT"
                  />
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-gray-700">Business Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                  <textarea
                    value={formData.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    rows={2}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D9A606]/20 focus:border-[#D9A606] outline-none transition-all resize-none"
                    placeholder="Full business address"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Business Details Tab */}
        {activeTab === 'business' && (
          <div className="space-y-8">
            {/* Business Type */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#D9A606] rounded-full"></div>
                <Building2 className="w-5 h-5" />
                Business Type
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {BUSINESS_TYPES.map(type => (
                  <button
                    key={type.value}
                    onClick={() => updateField('businessType', type.value)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      formData.businessType === type.value
                        ? 'border-[#D9A606] bg-[#D9A606]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="font-bold text-gray-900">{type.label}</p>
                    <p className="text-sm text-gray-500 mt-1">{type.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Registration & Certifications */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#D9A606] rounded-full"></div>
                <Award className="w-5 h-5" />
                Registration & Certifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Registration Number</label>
                  <input
                    type="text"
                    value={formData.regNumber}
                    onChange={(e) => updateField('regNumber', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D9A606]/20 focus:border-[#D9A606] outline-none transition-all"
                    placeholder="Business registration number"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Production Capacity</label>
                  <input
                    type="text"
                    value={formData.productionCapacity}
                    onChange={(e) => updateField('productionCapacity', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D9A606]/20 focus:border-[#D9A606] outline-none transition-all"
                    placeholder="e.g., 10,000 units/month"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-gray-700">Certifications</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newCertification}
                      onChange={(e) => setNewCertification(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addCertification()}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D9A606]/20 focus:border-[#D9A606] outline-none transition-all"
                      placeholder="Add certification (e.g., ISO 9001, Fair Trade)"
                    />
                    <button
                      onClick={addCertification}
                      className="px-4 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      <Plus className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  {formData.certifications.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.certifications.map(cert => (
                        <span key={cert} className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          <Award className="w-3 h-3" />
                          {cert}
                          <button onClick={() => removeCertification(cert)} className="ml-1 hover:text-green-900">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Minimum Orders */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#D9A606] rounded-full"></div>
                <Package className="w-5 h-5" />
                Minimum Order Requirements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Wholesale Minimum</label>
                  <input
                    type="text"
                    value={formData.minOrderWholesale}
                    onChange={(e) => updateField('minOrderWholesale', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D9A606]/20 focus:border-[#D9A606] outline-none transition-all"
                    placeholder="e.g., 100 units or $500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Retail Minimum</label>
                  <input
                    type="text"
                    value={formData.minOrderRetail}
                    onChange={(e) => updateField('minOrderRetail', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D9A606]/20 focus:border-[#D9A606] outline-none transition-all"
                    placeholder="e.g., No minimum"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Shipping & Payment Tab */}
        {activeTab === 'shipping' && (
          <div className="space-y-8">
            {/* Payment Options */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#D9A606] rounded-full"></div>
                <CreditCard className="w-5 h-5" />
                Accepted Payment Methods
              </h3>
              <p className="text-gray-500 text-sm mb-4">Select all payment methods you accept</p>
              <div className="flex flex-wrap gap-2">
                {PAYMENT_OPTIONS.map(option => (
                  <button
                    key={option}
                    onClick={() => toggleArrayItem('paymentOptions', option)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      formData.paymentOptions.includes(option)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Shipping Regions */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#D9A606] rounded-full"></div>
                <Truck className="w-5 h-5" />
                Shipping Destinations
              </h3>
              <p className="text-gray-500 text-sm mb-4">Select regions where you can ship products</p>
              <div className="flex flex-wrap gap-2">
                {SHIPPING_REGIONS.map(region => (
                  <button
                    key={region}
                    onClick={() => toggleArrayItem('shippingCountries', region)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      formData.shippingCountries.includes(region)
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Preview Tab */}
        {activeTab === 'preview' && (
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-bold text-yellow-800">Live Preview</p>
                <p className="text-sm text-yellow-700">This is how your storefront will appear to buyers. Changes are not saved until you click &quot;Save Changes&quot;.</p>
              </div>
            </div>

            {/* Preview Card */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
              {/* Banner */}
              <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 relative">
                {formData.banner && (
                  <Image src={formData.banner} alt="Banner" fill className="object-cover" unoptimized />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Profile Section */}
              <div className="px-8 pb-8 -mt-16 relative">
                <div className="flex items-end gap-6">
                  <div className="w-32 h-32 rounded-2xl bg-white border-4 border-white shadow-lg overflow-hidden">
                    {formData.logo ? (
                      <Image src={formData.logo} alt="Logo" fill className="object-cover" unoptimized />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <Store className="w-12 h-12 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="pb-2">
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-black text-gray-900">{formData.storeName || 'Your Store Name'}</h2>
                      {vendor?.isVerified && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">VERIFIED</span>
                      )}
                    </div>
                    <p className="text-gray-500">{formData.location || 'Location not set'}</p>
                  </div>
                </div>

                {/* Preview Details */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">About</h4>
                    <p className="text-gray-600 text-sm">{formData.description || 'No description provided'}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Business Type</h4>
                    <p className="text-gray-600 text-sm capitalize">{formData.businessType || 'Not specified'}</p>
                  </div>

                  {formData.categories.length > 0 && (
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Categories</h4>
                      <div className="flex flex-wrap gap-1">
                        {formData.categories.map(cat => (
                          <span key={cat} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{cat}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {formData.paymentOptions.length > 0 && (
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Payment Options</h4>
                      <div className="flex flex-wrap gap-1">
                        {formData.paymentOptions.map(opt => (
                          <span key={opt} className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">{opt}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {formData.shippingCountries.length > 0 && (
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Ships To</h4>
                      <div className="flex flex-wrap gap-1">
                        {formData.shippingCountries.map(country => (
                          <span key={country} className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">{country}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {formData.contactEmail && (
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Contact</h4>
                      <p className="text-gray-600 text-sm">{formData.contactEmail}</p>
                      {formData.contactPhone && <p className="text-gray-600 text-sm">{formData.contactPhone}</p>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
