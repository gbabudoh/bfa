"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { 
  ChevronLeft, 
  Upload, 
  Plus, 
  DollarSign, 
  Tag, 
  Box, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Check,
  X,
  Trash2
} from 'lucide-react';

export default function VendorAddProductPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const additionalFileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '0',
    isWholesale: false,
    wholesalePrice: '',
    minWholesaleQty: '',
    isRetail: true,
    origin: ''
  });

  const [activeTab, setActiveTab] = useState('basic');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleWholesale = () => {
    setFormData(prev => ({ ...prev, isWholesale: !prev.isWholesale }));
  };

  // Handle image selection
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: { file: File; preview: string }[] = [];
    
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const preview = URL.createObjectURL(file);
        newImages.push({ file, preview });
      }
    });

    setImages(prev => [...prev, ...newImages].slice(0, 4)); // Max 4 images
    
    // Reset input
    if (e.target) {
      e.target.value = '';
    }
  };

  // Remove image
  const removeImage = (index: number) => {
    setImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const triggerAdditionalFileInput = () => {
    additionalFileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Find the vendor ID from the session
      const vendorId = session.user.vendorId || session.user.id;

      // Upload images first if any
      const uploadedImageUrls: string[] = [];
      
      if (images.length > 0) {
        for (const img of images) {
          const formData = new FormData();
          formData.append('file', img.file);
          
          const uploadRes = await fetch('/api/vendor/upload', {
            method: 'POST',
            body: formData,
          });
          
          if (uploadRes.ok) {
            const uploadData = await uploadRes.json();
            uploadedImageUrls.push(uploadData.url);
          }
        }
      }

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          vendorId,
          images: uploadedImageUrls,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create product');
      }

      setSubmitStatus('success');
      setTimeout(() => {
        router.push('/vendor/dashboard/products');
      }, 2000);
    } catch (error: unknown) {
      console.error('Submission error:', error);
      const msg = error instanceof Error ? error.message : 'An unknown error occurred';
      setSubmitStatus('error');
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 font-sans max-w-5xl mx-auto pb-20">
      {/* ── Navigation & Header ── */}
      <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
        <Link 
          href="/vendor/dashboard/products" 
          className="flex items-center gap-2 text-zinc-500 hover:text-[#D9A606] transition-colors group w-fit cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Back to Vault</span>
        </Link>
        <div className="flex justify-between items-end">
          <div>
             <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black text-[#D9A606] uppercase tracking-[0.4em] italic">Product Architecture</span>
             </div>
             <h1 className="text-4xl font-black text-zinc-900 tracking-tighter">New <span className="text-zinc-400">Spec.</span></h1>
          </div>
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting || submitStatus === 'success'}
            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 shadow-lg cursor-pointer flex items-center gap-2 ${
              submitStatus === 'success' 
                ? 'bg-green-500 text-white' 
                : 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-zinc-200'
            }`}
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : submitStatus === 'success' ? (
              <Check className="w-4 h-4" />
            ) : null}
            {submitStatus === 'success' ? 'Deployed' : 'Deploy Product'}
          </button>
        </div>
      </div>

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-in fade-in zoom-in duration-300">
          <AlertCircle className="w-5 h-5" />
          <p className="text-xs font-bold uppercase tracking-wider">{errorMessage}</p>
        </div>
      )}

      {/* ── Main Form Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Media Upload */}
        <div className="lg:col-span-1 space-y-6 animate-in fade-in slide-in-from-left-6 duration-1000 delay-200">
          <div className="p-8 rounded-[2.5rem] bg-white/70 border-2 border-gray-200 backdrop-blur-xl shadow-xl shadow-gray-200/50 group">
             <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Product Images</span>
                <ImageIcon className="w-4 h-4 text-zinc-400" />
             </div>
             
             {/* Hidden file inputs */}
             <input 
               type="file" 
               ref={fileInputRef}
               onChange={handleImageSelect}
               accept="image/*"
               multiple
               className="hidden"
             />
             <input 
               type="file" 
               ref={additionalFileInputRef}
               onChange={handleImageSelect}
               accept="image/*"
               className="hidden"
             />

             {/* Main upload area */}
             {images.length === 0 ? (
               <div 
                 onClick={triggerFileInput}
                 className="aspect-square rounded-[2rem] bg-white border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-4 transition-all hover:bg-gray-50 hover:border-[#D9A606] cursor-pointer text-center p-6"
               >
                  <div className="w-16 h-16 rounded-2xl bg-[#D9A606]/10 flex items-center justify-center text-[#D9A606]">
                     <Upload className="w-8 h-8" />
                  </div>
                  <div>
                     <p className="text-sm font-black text-zinc-900 uppercase tracking-tight">Click to Upload</p>
                     <p className="text-xs text-zinc-500 mt-2 font-medium">PNG, JPG up to 10MB</p>
                     <p className="text-[10px] text-zinc-400 mt-1">Recommended: 1200x1200px</p>
                  </div>
               </div>
             ) : (
               <div className="aspect-square rounded-[2rem] bg-white border-2 border-gray-300 overflow-hidden relative group/main">
                 <Image 
                   src={images[0].preview} 
                   alt="Main product image"
                   fill
                   className="object-cover"
                 />
                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/main:opacity-100 transition-opacity flex items-center justify-center gap-3">
                   <button 
                     type="button"
                     onClick={triggerFileInput}
                     className="p-3 rounded-xl bg-white text-zinc-900 hover:bg-[#D9A606] hover:text-white transition-all"
                   >
                     <Upload className="w-5 h-5" />
                   </button>
                   <button 
                     type="button"
                     onClick={() => removeImage(0)}
                     className="p-3 rounded-xl bg-white text-red-500 hover:bg-red-500 hover:text-white transition-all"
                   >
                     <Trash2 className="w-5 h-5" />
                   </button>
                 </div>
               </div>
             )}

             {/* Additional image slots */}
             <div className="grid grid-cols-3 gap-3 mt-4">
                {[0, 1, 2].map((i) => {
                  const imageIndex = i + 1; // Offset by 1 since index 0 is main image
                  const hasImage = images[imageIndex];
                  
                  return (
                    <div 
                      key={i} 
                      className={`aspect-square rounded-xl overflow-hidden relative group/thumb ${
                        hasImage 
                          ? 'border-2 border-gray-300' 
                          : 'bg-white border-2 border-dashed border-gray-300 hover:border-[#D9A606] cursor-pointer'
                      }`}
                      onClick={() => !hasImage && triggerAdditionalFileInput()}
                    >
                      {hasImage ? (
                        <>
                          <Image 
                            src={images[imageIndex].preview} 
                            alt={`Product image ${imageIndex + 1}`}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                            <button 
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage(imageIndex);
                              }}
                              className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 hover:text-[#D9A606] transition-colors">
                          <Plus className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  );
                })}
             </div>

             {/* Image count indicator */}
             {images.length > 0 && (
               <div className="mt-4 flex items-center justify-between text-xs">
                 <span className="text-zinc-500 font-medium">{images.length}/4 images uploaded</span>
                 {images.length < 4 && (
                   <button 
                     type="button"
                     onClick={triggerAdditionalFileInput}
                     className="text-[#D9A606] font-bold hover:underline"
                   >
                     + Add more
                   </button>
                 )}
               </div>
             )}
          </div>

          <div className="p-8 rounded-[2rem] bg-[#D9A606]/5 border-2 border-[#D9A606]/20 backdrop-blur-md">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-[#D9A606] text-white">
                   <AlertCircle className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-black text-[#D9A606] uppercase tracking-widest">Image Guidelines</span>
             </div>
             <ul className="text-[11px] text-[#A67F05] leading-relaxed font-medium space-y-2">
               <li>• Use white or neutral backgrounds</li>
               <li>• Minimum resolution: 1200x1200px</li>
               <li>• Show product from multiple angles</li>
               <li>• Max file size: 10MB per image</li>
             </ul>
          </div>
        </div>

        {/* Right Column: Details Form */}
        <div className="lg:col-span-2 space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
          <div className="p-10 rounded-[3rem] bg-white/70 border border-white/50 backdrop-blur-xl shadow-xl shadow-gray-200/50">
             
             {/* Tabs */}
             <div className="flex gap-8 mb-10 border-b border-gray-100 pb-4">
                {['basic', 'pricing', 'inventory'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`text-[10px] font-black uppercase tracking-widest pb-4 relative transition-all cursor-pointer ${
                      activeTab === tab ? "text-[#D9A606]" : "text-zinc-400 hover:text-zinc-600"
                    }`}
                  >
                    {tab} Config
                    {activeTab === tab && (
                      <div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-[#D9A606] animate-in slide-in-from-left duration-300"></div>
                    )}
                  </button>
                ))}
             </div>

             <form onSubmit={handleSubmit} className="space-y-8">
                {activeTab === 'basic' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
                    <div className="space-y-2 md:col-span-2">
                       <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest ml-1">Product Designation</label>
                       <input 
                         type="text" 
                         name="name"
                         value={formData.name}
                         onChange={handleInputChange}
                         placeholder="e.g. Handcrafted Ceramic Vessel"
                         className="w-full bg-white border-2 border-gray-300 rounded-2xl px-6 py-4 text-sm font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#D9A606]/30 focus:border-[#D9A606] transition-all placeholder:text-zinc-400"
                       />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                       <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest ml-1">Intellectual Description</label>
                       <textarea 
                         rows={4}
                         name="description"
                         value={formData.description}
                         onChange={handleInputChange}
                         placeholder="The philosophy, craftsmanship, and materials behind this creation..."
                         className="w-full bg-white border-2 border-gray-300 rounded-2xl px-6 py-4 text-sm font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#D9A606]/30 focus:border-[#D9A606] transition-all placeholder:text-zinc-400 resize-none"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest ml-1">Sector / Category</label>
                       <select 
                         name="category"
                         value={formData.category}
                         onChange={handleInputChange}
                         className="w-full bg-white border-2 border-gray-300 rounded-2xl px-6 py-4 text-sm font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#D9A606]/30 focus:border-[#D9A606] transition-all appearance-none cursor-pointer"
                        >
                           <option value="">Select Category</option>
                           <optgroup label="Manufacturers">
                             <option value="Textiles and fabrics">Textiles and fabrics</option>
                             <option value="Apparel and fashion accessories">Apparel and fashion accessories</option>
                             <option value="Leather and leather goods">Leather and leather goods</option>
                             <option value="Footwear">Footwear</option>
                             <option value="Automotive assembly and components">Automotive assembly and components</option>
                             <option value="Electrical equipment and cables">Electrical equipment and cables</option>
                             <option value="Electronics and small appliances">Electronics and small appliances</option>
                             <option value="Industrial machinery and equipment">Industrial machinery and equipment</option>
                             <option value="Furniture and fittings">Furniture and fittings</option>
                             <option value="Packaging materials">Packaging materials (paper, plastic, glass, metal)</option>
                           </optgroup>
                           <optgroup label="Artisans">
                             <option value="Handicrafts and souvenirs">Handicrafts and souvenirs</option>
                             <option value="Home décor and interior items">Home décor and interior items</option>
                             <option value="Traditional art, sculpture, and carvings">Traditional art, sculpture, and carvings</option>
                             <option value="Jewellery and adornments">Jewellery and adornments</option>
                             <option value="Cultural and religious items">Cultural and religious items</option>
                           </optgroup>
                           <optgroup label="Miners">
                             <option value="Minerals and ores">Minerals and ores</option>
                             <option value="Precious metals and gemstones">Precious metals and gemstones</option>
                             <option value="Industrial minerals">Industrial minerals (cement inputs, phosphates, etc.)</option>
                           </optgroup>
                           <optgroup label="Industrial">
                             <option value="Building materials and construction products">Building materials and construction products</option>
                             <option value="Metals and metal products">Metals and metal products (basic and fabricated)</option>
                             <option value="Wood and wood products">Wood and wood products (sawn timber, panels, joinery)</option>
                             <option value="Paper, pulp, and printed materials">Paper, pulp, and printed materials</option>
                             <option value="Chemicals and petrochemicals">Chemicals and petrochemicals</option>
                             <option value="Fertilizers and agro-inputs">Fertilizers and agro-inputs</option>
                             <option value="Paints, coatings, and adhesives">Paints, coatings, and adhesives</option>
                             <option value="Plastics and rubber products">Plastics and rubber products</option>
                           </optgroup>
                           <optgroup label="Food and Agriculture">
                             <option value="Agricultural commodities">Agricultural commodities</option>
                             <option value="Processed foods and beverages">Processed foods and beverages</option>
                             <option value="Livestock and animal products">Livestock and animal products</option>
                             <option value="Fisheries and aquaculture products">Fisheries and aquaculture products</option>
                           </optgroup>
                           <optgroup label="Health & Wellness">
                              <option value="Pharmaceuticals and medical supplies">Pharmaceuticals and medical supplies</option>
                              <option value="Cosmetics, beauty, and personal care">Cosmetics, beauty, and personal care</option>
                              <option value="Health and wellness products">Health and wellness products (herbal remedies, supplements)</option>
                            </optgroup>
                            <optgroup label="Home & Living">
                              <option value="Cleaning and household care products">Cleaning and household care products</option>
                              <option value="Eco-friendly and sustainable products">Eco-friendly and sustainable products (organic, fair trade, recycled)</option>
                              <option value="Educational and office supplies">Educational and office supplies</option>
                            </optgroup>
                            <optgroup label="Technology & Energy">
                              <option value="Renewable energy equipment">Renewable energy equipment (solar components, small systems)</option>
                              <option value="ICT hardware assembly">ICT hardware assembly (phones, devices)</option>
                              <option value="Digital content tied to physical goods">Digital content tied to physical goods (branded merch, media-linked products)</option>
                            </optgroup>
                        </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest ml-1">Origin Label</label>
                       <input 
                         type="text" 
                         name="origin"
                         value={formData.origin}
                         onChange={handleInputChange}
                         placeholder="e.g. Ethiopia / Nairobi"
                         className="w-full bg-white border-2 border-gray-300 rounded-2xl px-6 py-4 text-sm font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#D9A606]/30 focus:border-[#D9A606] transition-all placeholder:text-zinc-400"
                       />
                    </div>
                  </div>
                )}

                {activeTab === 'pricing' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
                    <div className="space-y-2">
                       <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest ml-1">Base Price (USD)</label>
                       <div className="relative">
                          <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                          <input 
                            type="number" 
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="0.00"
                            className="w-full bg-white border-2 border-gray-300 rounded-2xl px-12 py-4 text-sm font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#D9A606]/30 focus:border-[#D9A606] transition-all placeholder:text-zinc-400"
                          />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest ml-1">Stock Availability</label>
                       <div className="relative">
                          <Box className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                          <input 
                            type="number" 
                            name="stock"
                            value={formData.stock}
                            onChange={handleInputChange}
                            placeholder="Units available"
                            className="w-full bg-white border-2 border-gray-300 rounded-2xl px-12 py-4 text-sm font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#D9A606]/30 focus:border-[#D9A606] transition-all placeholder:text-zinc-400"
                          />
                       </div>
                    </div>
                    <div className="md:col-span-2 p-6 rounded-2xl bg-zinc-50 border-2 border-gray-300 flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className={`w-12 h-6 rounded-full transition-all relative cursor-pointer ${formData.isWholesale ? 'bg-[#D9A606]' : 'bg-zinc-300'}`} onClick={toggleWholesale}>
                             <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow ${formData.isWholesale ? 'left-7' : 'left-1'}`}></div>
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-zinc-900 uppercase tracking-wider">Wholesale Activation</p>
                             <p className="text-[9px] text-zinc-500 font-bold uppercase mt-1">Enable bulk discounts for global distributors</p>
                          </div>
                       </div>
                       {formData.isWholesale && <CheckCircle2 className="w-5 h-5 text-[#D9A606] animate-in zoom-in" />}
                    </div>
                    
                    {formData.isWholesale && (
                      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-top-4 duration-500">
                        <div className="space-y-2">
                           <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest ml-1">Wholesale Price (USD)</label>
                           <input 
                             type="number" 
                             name="wholesalePrice"
                             value={formData.wholesalePrice}
                             onChange={handleInputChange}
                             placeholder="0.00"
                             className="w-full bg-white border-2 border-gray-300 rounded-2xl px-6 py-4 text-sm font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#D9A606]/30 focus:border-[#D9A606] transition-all placeholder:text-zinc-400"
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest ml-1">Min Wholesale Qty</label>
                           <input 
                             type="number" 
                             name="minWholesaleQty"
                             value={formData.minWholesaleQty}
                             onChange={handleInputChange}
                             placeholder="e.g. 10"
                             className="w-full bg-white border-2 border-gray-300 rounded-2xl px-6 py-4 text-sm font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#D9A606]/30 focus:border-[#D9A606] transition-all placeholder:text-zinc-400"
                           />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'inventory' && (
                  <div className="grid grid-cols-1 gap-6 animate-in fade-in duration-500">
                    {/* SKU Architecture */}
                    <div className="p-6 rounded-2xl bg-white border-2 border-gray-300 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4 items-center">
                          <div className="w-12 h-12 rounded-xl bg-[#D9A606]/10 flex items-center justify-center text-[#D9A606]">
                            <Tag className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-sm font-black text-zinc-900 uppercase tracking-wider">SKU Architecture</p>
                            <p className="text-xs text-zinc-500 font-medium mt-1">Unique product identifier for inventory tracking</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4 items-center">
                        <div className="flex-1">
                          <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest ml-1 block mb-2">SKU Code</label>
                          <input 
                            type="text" 
                            name="sku"
                            placeholder="e.g. BFA-PROD-001 (leave empty to auto-generate)"
                            className="w-full bg-white border-2 border-gray-300 rounded-xl px-4 py-3 text-sm font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#D9A606]/30 focus:border-[#D9A606] transition-all placeholder:text-zinc-400"
                          />
                        </div>
                        <button 
                          type="button"
                          className="mt-6 px-4 py-3 rounded-xl bg-[#D9A606] text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#C49505] transition-all"
                        >
                          Generate
                        </button>
                      </div>
                    </div>

                    {/* Global Logistics */}
                    <div className="p-6 rounded-2xl bg-white border-2 border-gray-300 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4 items-center">
                          <div className="w-12 h-12 rounded-xl bg-[#D9A606]/10 flex items-center justify-center text-[#D9A606]">
                            <Box className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-sm font-black text-zinc-900 uppercase tracking-wider">Global Logistics</p>
                            <p className="text-xs text-zinc-500 font-medium mt-1">Shipping dimensions and weight for international dispatch</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest ml-1 block mb-2">Weight (kg)</label>
                          <input 
                            type="number" 
                            name="weight"
                            placeholder="0.0"
                            step="0.1"
                            className="w-full bg-white border-2 border-gray-300 rounded-xl px-4 py-3 text-sm font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#D9A606]/30 focus:border-[#D9A606] transition-all placeholder:text-zinc-400"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest ml-1 block mb-2">Length (cm)</label>
                          <input 
                            type="number" 
                            name="length"
                            placeholder="0"
                            className="w-full bg-white border-2 border-gray-300 rounded-xl px-4 py-3 text-sm font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#D9A606]/30 focus:border-[#D9A606] transition-all placeholder:text-zinc-400"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest ml-1 block mb-2">Width (cm)</label>
                          <input 
                            type="number" 
                            name="width"
                            placeholder="0"
                            className="w-full bg-white border-2 border-gray-300 rounded-xl px-4 py-3 text-sm font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#D9A606]/30 focus:border-[#D9A606] transition-all placeholder:text-zinc-400"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest ml-1 block mb-2">Height (cm)</label>
                          <input 
                            type="number" 
                            name="height"
                            placeholder="0"
                            className="w-full bg-white border-2 border-gray-300 rounded-xl px-4 py-3 text-sm font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#D9A606]/30 focus:border-[#D9A606] transition-all placeholder:text-zinc-400"
                          />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest ml-1 block mb-3">Shipping Regions</label>
                        <div className="flex flex-wrap gap-2">
                          {['Africa', 'Europe', 'North America', 'Asia', 'Middle East', 'Worldwide'].map((region) => (
                            <button
                              key={region}
                              type="button"
                              className="px-4 py-2 rounded-lg border-2 border-gray-300 text-xs font-bold text-zinc-600 hover:border-[#D9A606] hover:text-[#D9A606] hover:bg-[#D9A606]/5 transition-all"
                            >
                              {region}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
             </form>

             <div className="mt-12 pt-8 border-t border-gray-100 flex justify-end gap-4">
                <Link href="/vendor/dashboard/products" className="px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer">
                  Cancel
                </Link>
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting || submitStatus === 'success'}
                  className={`px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg cursor-pointer flex items-center gap-2 ${
                    submitStatus === 'success'
                      ? 'bg-green-500 text-white'
                      : 'bg-[#D9A606] text-white shadow-[#D9A606]/20'
                  }`}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : submitStatus === 'success' ? (
                    <Check className="w-4 h-4" />
                  ) : null}
                  {submitStatus === 'success' ? 'Entry Generated' : 'Generate Entry'}
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
