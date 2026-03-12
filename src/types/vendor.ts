export interface Vendor {
  id: string;
  userId: string;
  storeName: string;
  description: string | null;
  logo: string | null;
  banner: string | null;
  location: string | null;
  rating: number;
  reviewCount: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  isVerified: boolean;
  businessType: string | null;
  longDescription: string | null;
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
  // Display fields
  name?: string;
  joinDate?: string;
  badge?: string;
  minimumOrderQuantity?: string;
  contactInfo?: {
    email: string | null;
    phone: string | null;
    website: string | null;
    address: string | null;
    businessHours: string | null;
  };
  products?: Product[];
}

export interface Product {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
  wholesalePrice: number | null;
  minWholesaleQty: number | null;
  isWholesale: boolean;
  isRetail: boolean;
  images: string[];
  category: string;
  stock: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  currency: string;
  isFeatured: boolean;
}
