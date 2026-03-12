"use client";

import React, { useRef, useState } from 'react';
import { Camera, Loader2, X, UploadCloud } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  aspectRatio?: "square" | "video";
  placeholder?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  label, 
  value, 
  onChange, 
  aspectRatio = "square",
  placeholder = "Upload Image"
}) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/vendor/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      const data = await res.json();
      onChange(data.url);
    } catch (error) {
      console.error('Upload Error:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const containerClass = aspectRatio === "square" 
    ? "aspect-square w-32" 
    : "aspect-[21/9] w-full max-h-48";

  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">{label}</label>
      
      <div 
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative cursor-pointer border-2 border-dashed border-gray-200 
          rounded-2xl overflow-hidden bg-gray-50 hover:bg-gray-100 
          hover:border-yellow-400 transition-all group flex items-center justify-center
          ${containerClass}
        `}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*"
          onChange={handleFileChange}
        />

        {value ? (
          <>
            <Image 
              src={value} 
              alt={label} 
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="text-white h-8 w-8" />
            </div>
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 p-4 text-center">
            {uploading ? (
              <Loader2 className="h-8 w-8 text-yellow-600 animate-spin" />
            ) : (
              <>
                <div className="bg-yellow-100 p-3 rounded-full group-hover:bg-yellow-200 transition-colors">
                  <UploadCloud className="h-6 w-6 text-yellow-700" />
                </div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">
                  {placeholder}
                </span>
              </>
            )}
          </div>
        )}
      </div>
      <p className="text-[10px] text-gray-400 font-medium">Recommended: PNG or JPG, max 5MB</p>
    </div>
  );
};

export default ImageUpload;
