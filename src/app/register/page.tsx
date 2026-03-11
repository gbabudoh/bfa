"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  Building2, 
  ChevronRight, 
  Shield, 
  Star, 
  Mail, 
  Factory, 
  Globe,
  Shirt,
  Palette,
  Leaf,
  Armchair,
  Activity,
  Cpu,
  Zap,
  Plane,
  Briefcase,
  Package,
  ShoppingBag
} from 'lucide-react';

const globalCountries = [
  { value: "afghanistan", name: "Afghanistan" },
  { value: "albania", name: "Albania" },
  { value: "algeria", name: "Algeria" },
  { value: "andorra", name: "Andorra" },
  { value: "angola", name: "Angola" },
  { value: "antigua_and_barbuda", name: "Antigua and Barbuda" },
  { value: "argentina", name: "Argentina" },
  { value: "armenia", name: "Armenia" },
  { value: "australia", name: "Australia" },
  { value: "austria", name: "Austria" },
  { value: "azerbaijan", name: "Azerbaijan" },
  { value: "bahamas", name: "Bahamas" },
  { value: "bahrain", name: "Bahrain" },
  { value: "bangladesh", name: "Bangladesh" },
  { value: "barbados", name: "Barbados" },
  { value: "belarus", name: "Belarus" },
  { value: "belgium", name: "Belgium" },
  { value: "belize", name: "Belize" },
  { value: "benin", name: "Benin" },
  { value: "bhutan", name: "Bhutan" },
  { value: "bolivia", name: "Bolivia" },
  { value: "bosnia_and_herzegovina", name: "Bosnia and Herzegovina" },
  { value: "botswana", name: "Botswana" },
  { value: "brazil", name: "Brazil" },
  { value: "brunei", name: "Brunei" },
  { value: "bulgaria", name: "Bulgaria" },
  { value: "burkina_faso", name: "Burkina Faso" },
  { value: "burundi", name: "Burundi" },
  { value: "cote_divoire", name: "Côte d'Ivoire" },
  { value: "cabo_verde", name: "Cabo Verde" },
  { value: "cambodia", name: "Cambodia" },
  { value: "cameroon", name: "Cameroon" },
  { value: "canada", name: "Canada" },
  { value: "central_african_republic", name: "Central African Republic" },
  { value: "chad", name: "Chad" },
  { value: "chile", name: "Chile" },
  { value: "china", name: "China" },
  { value: "colombia", name: "Colombia" },
  { value: "comoros", name: "Comoros" },
  { value: "congo_brazzaville", name: "Congo (Congo-Brazzaville)" },
  { value: "costa_rica", name: "Costa Rica" },
  { value: "croatia", name: "Croatia" },
  { value: "cuba", name: "Cuba" },
  { value: "cyprus", name: "Cyprus" },
  { value: "czechia", name: "Czechia (Czech Republic)" },
  { value: "dr_congo", name: "Democratic Republic of the Congo" },
  { value: "denmark", name: "Denmark" },
  { value: "djibouti", name: "Djibouti" },
  { value: "dominica", name: "Dominica" },
  { value: "dominican_republic", name: "Dominican Republic" },
  { value: "ecuador", name: "Ecuador" },
  { value: "egypt", name: "Egypt" },
  { value: "el_salvador", name: "El Salvador" },
  { value: "equatorial_guinea", name: "Equatorial Guinea" },
  { value: "eritrea", name: "Eritrea" },
  { value: "estonia", name: "Estonia" },
  { value: "eswatini", name: "Eswatini (fmr. Swaziland)" },
  { value: "ethiopia", name: "Ethiopia" },
  { value: "fiji", name: "Fiji" },
  { value: "finland", name: "Finland" },
  { value: "france", name: "France" },
  { value: "gabon", name: "Gabon" },
  { value: "gambia", name: "Gambia" },
  { value: "georgia", name: "Georgia" },
  { value: "germany", name: "Germany" },
  { value: "ghana", name: "Ghana" },
  { value: "greece", name: "Greece" },
  { value: "grenada", name: "Grenada" },
  { value: "guatemala", name: "Guatemala" },
  { value: "guinea", name: "Guinea" },
  { value: "guinea_bissau", name: "Guinea-Bissau" },
  { value: "guyana", name: "Guyana" },
  { value: "haiti", name: "Haiti" },
  { value: "vatican_city", name: "Holy See" },
  { value: "honduras", name: "Honduras" },
  { value: "hungary", name: "Hungary" },
  { value: "iceland", name: "Iceland" },
  { value: "india", name: "India" },
  { value: "indonesia", name: "Indonesia" },
  { value: "iran", name: "Iran" },
  { value: "iraq", name: "Iraq" },
  { value: "ireland", name: "Ireland" },
  { value: "israel", name: "Israel" },
  { value: "italy", name: "Italy" },
  { value: "jamaica", name: "Jamaica" },
  { value: "japan", name: "Japan" },
  { value: "jordan", name: "Jordan" },
  { value: "kazakhstan", name: "Kazakhstan" },
  { value: "kenya", name: "Kenya" },
  { value: "kiribati", name: "Kiribati" },
  { value: "kuwait", name: "Kuwait" },
  { value: "kyrgyzstan", name: "Kyrgyzstan" },
  { value: "laos", name: "Laos" },
  { value: "latvia", name: "Latvia" },
  { value: "lebanon", name: "Lebanon" },
  { value: "lesotho", name: "Lesotho" },
  { value: "liberia", name: "Liberia" },
  { value: "libya", name: "Libya" },
  { value: "liechtenstein", name: "Liechtenstein" },
  { value: "lithuania", name: "Lithuania" },
  { value: "luxembourg", name: "Luxembourg" },
  { value: "madagascar", name: "Madagascar" },
  { value: "malawi", name: "Malawi" },
  { value: "malaysia", name: "Malaysia" },
  { value: "maldives", name: "Maldives" },
  { value: "mali", name: "Mali" },
  { value: "malta", name: "Malta" },
  { value: "marshall_islands", name: "Marshall Islands" },
  { value: "mauritania", name: "Mauritania" },
  { value: "mauritius", name: "Mauritius" },
  { value: "mexico", name: "Mexico" },
  { value: "micronesia", name: "Micronesia" },
  { value: "moldova", name: "Moldova" },
  { value: "monaco", name: "Monaco" },
  { value: "mongolia", name: "Mongolia" },
  { value: "montenegro", name: "Montenegro" },
  { value: "morocco", name: "Morocco" },
  { value: "mozambique", name: "Mozambique" },
  { value: "myanmar", name: "Myanmar (formerly Burma)" },
  { value: "namibia", name: "Namibia" },
  { value: "nauru", name: "Nauru" },
  { value: "nepal", name: "Nepal" },
  { value: "netherlands", name: "Netherlands" },
  { value: "new_zealand", name: "New Zealand" },
  { value: "nicaragua", name: "Nicaragua" },
  { value: "niger", name: "Niger" },
  { value: "nigeria", name: "Nigeria" },
  { value: "north_korea", name: "North Korea" },
  { value: "north_macedonia", name: "North Macedonia" },
  { value: "norway", name: "Norway" },
  { value: "oman", name: "Oman" },
  { value: "pakistan", name: "Pakistan" },
  { value: "palau", name: "Palau" },
  { value: "palestine", name: "Palestine State" },
  { value: "panama", name: "Panama" },
  { value: "papua_new_guinea", name: "Papua New Guinea" },
  { value: "paraguay", name: "Paraguay" },
  { value: "peru", name: "Peru" },
  { value: "philippines", name: "Philippines" },
  { value: "poland", name: "Poland" },
  { value: "portugal", name: "Portugal" },
  { value: "qatar", name: "Qatar" },
  { value: "romania", name: "Romania" },
  { value: "russia", name: "Russia" },
  { value: "rwanda", name: "Rwanda" },
  { value: "saint_kitts_and_nevis", name: "Saint Kitts and Nevis" },
  { value: "saint_lucia", name: "Saint Lucia" },
  { value: "saint_vincent", name: "Saint Vincent and the Grenadines" },
  { value: "samoa", name: "Samoa" },
  { value: "san_marino", name: "San Marino" },
  { value: "sao_tome_and_principe", name: "Sao Tome and Principe" },
  { value: "saudi_arabia", name: "Saudi Arabia" },
  { value: "senegal", name: "Senegal" },
  { value: "serbia", name: "Serbia" },
  { value: "seychelles", name: "Seychelles" },
  { value: "sierra_leone", name: "Sierra Leone" },
  { value: "singapore", name: "Singapore" },
  { value: "slovakia", name: "Slovakia" },
  { value: "slovenia", name: "Slovenia" },
  { value: "solomon_islands", name: "Solomon Islands" },
  { value: "somalia", name: "Somalia" },
  { value: "south_africa", name: "South Africa" },
  { value: "south_korea", name: "South Korea" },
  { value: "south_sudan", name: "South Sudan" },
  { value: "spain", name: "Spain" },
  { value: "sri_lanka", name: "Sri Lanka" },
  { value: "sudan", name: "Sudan" },
  { value: "suriname", name: "Suriname" },
  { value: "sweden", name: "Sweden" },
  { value: "switzerland", name: "Switzerland" },
  { value: "syria", name: "Syria" },
  { value: "tajikistan", name: "Tajikistan" },
  { value: "tanzania", name: "Tanzania" },
  { value: "thailand", name: "Thailand" },
  { value: "timor_leste", name: "Timor-Leste" },
  { value: "togo", name: "Togo" },
  { value: "tonga", name: "Tonga" },
  { value: "trinidad_and_tobago", name: "Trinidad and Tobago" },
  { value: "tunisia", name: "Tunisia" },
  { value: "turkey", name: "Turkey" },
  { value: "turkmenistan", name: "Turkmenistan" },
  { value: "tuvalu", name: "Tuvalu" },
  { value: "uganda", name: "Uganda" },
  { value: "ukraine", name: "Ukraine" },
  { value: "uae", name: "United Arab Emirates" },
  { value: "uk", name: "United Kingdom" },
  { value: "usa", name: "United States of America" },
  { value: "uruguay", name: "Uruguay" },
  { value: "uzbekistan", name: "Uzbekistan" },
  { value: "vanuatu", name: "Vanuatu" },
  { value: "venezuela", name: "Venezuela" },
  { value: "vietnam", name: "Vietnam" },
  { value: "yemen", name: "Yemen" },
  { value: "zambia", name: "Zambia" },
  { value: "zimbabwe", name: "Zimbabwe" },
];

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState('buyer');
  const [selectedVendorType, setSelectedVendorType] = useState('artisan');
  const [badgeType, setBadgeType] = useState('blue');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [
    { id: 'agribusiness', name: 'Agribusiness & Food Processing', icon: Leaf },
    { id: 'fashion', name: 'Fashion, Textiles & Lifestyle', icon: Shirt },
    { id: 'infrastructure', name: 'Building, Infrastructure & Industrial', icon: Factory },
    { id: 'tech', name: 'Tech, Automotive & Electronics', icon: Cpu },
    { id: 'healthcare', name: 'Healthcare & Chemical Sciences', icon: Activity },
    { id: 'energy', name: 'Natural Resources & Energy', icon: Zap },
    { id: 'home', name: 'Home, Decor & Furniture', icon: Armchair },
    { id: 'packaging', name: 'Packaging & Paper Products', icon: Package },
    { id: 'consumer', name: 'Consumer Goods', icon: ShoppingBag },
    { id: 'artisanal', name: 'Handmade Crafts & Artisanal Goods', icon: Palette },
    { id: 'manufacturing', name: 'Advanced Manufacturing & Aerospace', icon: Plane },
    { id: 'professional', name: 'Professional & Business Services', icon: Briefcase },
  ];

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
  };

  const CategorySelection = () => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
      {categories.map((cat) => (
        <div
          key={cat.id}
          onClick={() => toggleCategory(cat.id)}
          className={`p-4 border rounded-xl flex flex-col items-center justify-center transition cursor-pointer group hover:bg-yellow-50 ${
            selectedCategories.includes(cat.id)
              ? 'border-yellow-500 bg-yellow-50 ring-1 ring-yellow-500 shadow-sm'
              : 'border-gray-200 bg-white hover:border-yellow-200 shadow-sm'
          }`}
        >
          <cat.icon className={`h-8 w-8 mb-3 transition-transform duration-300 ${
            selectedCategories.includes(cat.id) ? 'text-yellow-600 scale-110' : 'text-gray-400 group-hover:text-yellow-500'
          }`} />
          <span className={`text-[10px] font-black text-center leading-tight uppercase tracking-wider ${
            selectedCategories.includes(cat.id) ? 'text-yellow-700' : 'text-gray-500'
          }`}>{cat.name}</span>
          {selectedCategories.includes(cat.id) && (
            <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-400 via-yellow-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Join Buy from Africa</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Register as a buyer to connect with African vendors or as a business partner to showcase your products globally
          </p>
        </div>
        
        {/* Role Selection Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
          <div className="flex flex-wrap">
            <button
              className={`flex-grow px-4 py-3 text-center rounded-lg font-medium transition cursor-pointer ${
                selectedRole === 'buyer'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedRole('buyer')}
            >
              <User className="h-5 w-5 mx-auto mb-1 cursor-pointer" />
              Register as Buyer
            </button>
            <button
              className={`flex-grow px-4 py-3 text-center rounded-lg font-medium transition cursor-pointer ${
                selectedRole === 'vendor'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedRole('vendor')}
            >
              <Building2 className="h-5 w-5 mx-auto mb-1 cursor-pointer" />
              Register as Vendor
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Buyer Registration */}
          {selectedRole === 'buyer' && (
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition col-span-1 md:col-span-2">
              <div className="mb-8 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-yellow-600 cursor-pointer" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Register as a Buyer</h2>
                <p className="mt-2 text-gray-600">
                  Connect with authentic African vendors and explore unique products
                </p>
              </div>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="buyerEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="buyerEmail"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="buyerPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="buyerPassword"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="buyerCountry" className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <select
                    id="buyerCountry"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 cursor-pointer"
                    required
                  >
                    <option value="">Select your country</option>
                    {globalCountries.map((country) => (
                      <option key={country.value} value={country.value}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-lg font-medium transition flex items-center justify-center cursor-pointer"
                  >
                    Register as Buyer <ChevronRight className="ml-2 h-5 w-5 cursor-pointer" />
                  </button>
                </div>
              </form>
              
              <div className="mt-6 text-center text-gray-600 text-sm">
                <p>By registering, you agree to our <Link href="/terms" className="text-yellow-600 hover:underline cursor-pointer">Terms of Service</Link> and <Link href="/privacy" className="text-yellow-600 hover:underline cursor-pointer">Privacy Policy</Link></p>
              </div>
            </div>
          )}
          
          {/* Vendor Registration */}
          {selectedRole === 'vendor' && (
            <div className="col-span-1 md:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition mb-8">
                <div className="mb-8 text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-8 w-8 text-yellow-600 cursor-pointer" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Register as a Vendor</h2>
                  <p className="mt-2 text-gray-600">
                    Showcase your African products or services to a global audience
                  </p>
                </div>
                
                {/* Vendor Type Selection */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Your Business Type</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div 
                      className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition ${
                        selectedVendorType === 'artisan' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                      onClick={() => setSelectedVendorType('artisan')}
                    >
                      <Palette className={`h-8 w-8 mb-2 cursor-pointer ${selectedVendorType === 'artisan' ? 'text-blue-600' : 'text-gray-500'}`} />
                      <h4 className="font-medium text-center cursor-pointer">African Artisan / Maker</h4>
                      <p className="text-xs text-gray-500 text-center mt-1 cursor-pointer">Produce authentic goods</p>
                    </div>
                    
                    <div 
                      className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition ${
                        selectedVendorType === 'brand' 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-300 hover:border-green-300'
                      }`}
                      onClick={() => setSelectedVendorType('brand')}
                    >
                      <Shirt className={`h-8 w-8 mb-2 cursor-pointer ${selectedVendorType === 'brand' ? 'text-green-600' : 'text-gray-500'}`} />
                      <h4 className="font-medium text-center cursor-pointer">African Brand / Designer</h4>
                      <p className="text-xs text-gray-500 text-center mt-1 cursor-pointer">Unique African designs</p>
                    </div>
                    
                    <div 
                      className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition ${
                        selectedVendorType === 'factory' 
                          ? 'border-yellow-500 bg-yellow-50' 
                          : 'border-gray-300 hover:border-yellow-300'
                      }`}
                      onClick={() => setSelectedVendorType('factory')}
                    >
                      <Factory className={`h-8 w-8 mb-2 cursor-pointer ${selectedVendorType === 'factory' ? 'text-yellow-600' : 'text-gray-500'}`} />
                      <h4 className="font-medium text-center cursor-pointer">African Manufacturer / Factory</h4>
                      <p className="text-xs text-gray-500 text-center mt-1 cursor-pointer">Mass production scale</p>
                    </div>
                    
                    <div 
                      className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition ${
                        selectedVendorType === 'export' 
                          ? 'border-purple-500 bg-purple-50' 
                          : 'border-gray-300 hover:border-purple-300'
                      }`}
                      onClick={() => setSelectedVendorType('export')}
                    >
                      <Globe className={`h-8 w-8 mb-2 cursor-pointer ${selectedVendorType === 'export' ? 'text-purple-600' : 'text-gray-500'}`} />
                      <h4 className="font-medium text-center cursor-pointer">African Distributor / Export Agent</h4>
                      <p className="text-xs text-gray-500 text-center mt-1 cursor-pointer">Logistics & export</p>
                    </div>
                  </div>
                </div>
                
                <form className="space-y-6">
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                      Business/Individual Name
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="vendorEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="vendorEmail"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="vendorPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      id="vendorPassword"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="vendorCountry" className="block text-sm font-medium text-gray-700 mb-1">
                      Country in Africa
                    </label>
                    <select
                      id="vendorCountry"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 cursor-pointer"
                      required
                    >
                      <option value="">Select your country</option>
                      <option value="algeria">Algeria</option>
                      <option value="angola">Angola</option>
                      <option value="benin">Benin</option>
                      <option value="botswana">Botswana</option>
                      <option value="burkina_faso">Burkina Faso</option>
                      <option value="burundi">Burundi</option>
                      <option value="cabo_verde">Cabo Verde</option>
                      <option value="cameroon">Cameroon</option>
                      <option value="central_african_republic">Central African Republic</option>
                      <option value="chad">Chad</option>
                      <option value="comoros">Comoros</option>
                      <option value="congo_brazzaville">Congo (Brazzaville)</option>
                      <option value="congo_kinshasa">Congo (Kinshasa)</option>
                      <option value="cote_divoire">Cote d&apos;Ivoire</option>
                      <option value="djibouti">Djibouti</option>
                      <option value="egypt">Egypt</option>
                      <option value="equatorial_guinea">Equatorial Guinea</option>
                      <option value="eritrea">Eritrea</option>
                      <option value="eswatini">Eswatini</option>
                      <option value="ethiopia">Ethiopia</option>
                      <option value="gabon">Gabon</option>
                      <option value="gambia">Gambia</option>
                      <option value="ghana">Ghana</option>
                      <option value="guinea">Guinea</option>
                      <option value="guinea_bissau">Guinea-Bissau</option>
                      <option value="kenya">Kenya</option>
                      <option value="lesotho">Lesotho</option>
                      <option value="liberia">Liberia</option>
                      <option value="libya">Libya</option>
                      <option value="madagascar">Madagascar</option>
                      <option value="malawi">Malawi</option>
                      <option value="mali">Mali</option>
                      <option value="mauritania">Mauritania</option>
                      <option value="mauritius">Mauritius</option>
                      <option value="morocco">Morocco</option>
                      <option value="mozambique">Mozambique</option>
                      <option value="namibia">Namibia</option>
                      <option value="niger">Niger</option>
                      <option value="nigeria">Nigeria</option>
                      <option value="rwanda">Rwanda</option>
                      <option value="sao_tome_and_principe">Sao Tome and Principe</option>
                      <option value="senegal">Senegal</option>
                      <option value="seychelles">Seychelles</option>
                      <option value="sierra_leone">Sierra Leone</option>
                      <option value="somalia">Somalia</option>
                      <option value="south_africa">South Africa</option>
                      <option value="south_sudan">South Sudan</option>
                      <option value="sudan">Sudan</option>
                      <option value="tanzania">Tanzania</option>
                      <option value="togo">Togo</option>
                      <option value="tunisia">Tunisia</option>
                      <option value="uganda">Uganda</option>
                      <option value="zambia">Zambia</option>
                      <option value="zimbabwe">Zimbabwe</option>
                    </select>
                  </div>
                  
                  {/* Specific fields based on vendor type */}
                  {selectedVendorType === 'artisan' && (
                    <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-gray-900">Artisan / Maker Information</h4>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                          Product Categories Crafted
                        </label>
                        <CategorySelection />
                        <p className="text-xs text-gray-500 mt-4 font-medium italic">Click to select all relevant categories for your work.</p>
                      </div>
                      
                      <div>
                        <label htmlFor="artisanCapacity" className="block text-sm font-medium text-gray-700 mb-1">
                          Monthly Production Capacity
                        </label>
                        <input
                          type="text"
                          id="artisanCapacity"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          placeholder="e.g., 50 items"
                        />
                      </div>
                    </div>
                  )}
                  
                  {selectedVendorType === 'brand' && (
                    <div className="space-y-4 p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-gray-900">Brand / Designer Information</h4>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                          Product Categories
                        </label>
                        <CategorySelection />
                        <p className="text-xs text-gray-500 mt-4 font-medium italic">Click to select all relevant categories for your brand.</p>
                      </div>
                      <div>
                        <label htmlFor="brandVision" className="block text-sm font-medium text-gray-700 mb-1">
                          Brand Vision / Story
                        </label>
                        <textarea
                          id="brandVision"
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          placeholder="Briefly describe your design philosophy..."
                        />
                      </div>
                    </div>
                  )}
                  
                  {selectedVendorType === 'factory' && (
                    <div className="space-y-4 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-medium text-gray-900">Manufacturer / Factory Information</h4>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                          Product Categories Manufactured
                        </label>
                        <CategorySelection />
                        <p className="text-xs text-gray-500 mt-4 font-medium italic">Click to select all relevant categories for your factory.</p>
                      </div>
                      
                      <div>
                        <label htmlFor="factoryCapacity" className="block text-sm font-medium text-gray-700 mb-1">
                          Monthly Production Capacity
                        </label>
                        <input
                          type="text"
                          id="factoryCapacity"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          placeholder="e.g., 10,000 units"
                        />
                      </div>
                    </div>
                  )}
                  
                  {selectedVendorType === 'export' && (
                    <div className="space-y-4 p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-medium text-gray-900">Distributor / Export Agent Information</h4>
                      <div>
                        <label htmlFor="exportServices" className="block text-sm font-medium text-gray-700 mb-1">
                          Services Offered
                        </label>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input type="checkbox" id="export_logistics" className="h-4 w-4 text-purple-600 border-gray-300 rounded" />
                            <label htmlFor="export_logistics" className="ml-2 text-sm text-gray-700">Logistics & Shipping</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="export_customs" className="h-4 w-4 text-purple-600 border-gray-300 rounded" />
                            <label htmlFor="export_customs" className="ml-2 text-sm text-gray-700">Customs Brokerage</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="export_sourcing" className="h-4 w-4 text-purple-600 border-gray-300 rounded" />
                            <label htmlFor="export_sourcing" className="ml-2 text-sm text-gray-700">Product Sourcing</label>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                          Focus Product Categories
                        </label>
                        <CategorySelection />
                        <p className="text-xs text-gray-500 mt-4 font-medium italic">Click to select all relevant categories you handle.</p>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Verification Badge Type
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className={`border rounded-lg p-4 flex items-start hover:border-blue-500 cursor-pointer ${
                        badgeType === 'blue' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                      }`}
                        onClick={() => setBadgeType('blue')}
                      >
                        <input
                          type="radio"
                          id="blueVendor"
                          name="vendorType"
                          value="blue"
                          className="mt-1 mr-3"
                          checked={badgeType === 'blue'}
                          onChange={() => setBadgeType('blue')}
                        />
                        <div>
                          <label htmlFor="blueVendor" className="flex items-center cursor-pointer">
                            <Shield className="h-5 w-5 text-blue-500 mr-2 cursor-pointer" />
                            <span className="font-medium cursor-pointer">Blue Badge Vendor</span>
                          </label>
                          <p className="text-sm text-gray-600 mt-1 cursor-pointer">Individual or non-registered business</p>
                        </div>
                      </div>
                      <div className={`border rounded-lg p-4 flex items-start hover:border-yellow-500 cursor-pointer ${
                        badgeType === 'gold' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300'
                      }`}
                        onClick={() => setBadgeType('gold')}
                      >
                        <input
                          type="radio"
                          id="goldVendor"
                          name="vendorType"
                          value="gold"
                          className="mt-1 mr-3"
                          checked={badgeType === 'gold'}
                          onChange={() => setBadgeType('gold')}
                        />
                        <div>
                          <label htmlFor="goldVendor" className="flex items-center cursor-pointer">
                            <Star className="h-5 w-5 text-yellow-600 mr-2 cursor-pointer" />
                            <span className="font-medium cursor-pointer">Gold Badge Vendor</span>
                          </label>
                          <p className="text-sm text-gray-600 mt-1 cursor-pointer">Registered African business</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {badgeType === 'gold' && (
                    <div id="goldVendorFields" className="space-y-4 p-4 bg-yellow-50 rounded-lg">
                      <div>
                        <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Business Registration Number
                        </label>
                        <input
                          type="text"
                          id="registrationNumber"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="registrationDocument" className="block text-sm font-medium text-gray-700 mb-1">
                          Upload Business Registration Document
                        </label>
                        <input
                          type="file"
                          id="registrationDocument"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">PDF, JPG or PNG (Max 5MB)</p>
                      </div>
                      <div>
                        <label htmlFor="taxId" className="block text-sm font-medium text-gray-700 mb-1">
                          Tax ID / VAT Number
                        </label>
                        <input
                          type="text"
                          id="taxId"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-lg font-medium transition flex items-center justify-center cursor-pointer"
                    >
                      Register as {selectedVendorType.charAt(0).toUpperCase() + selectedVendorType.slice(1)} <ChevronRight className="ml-2 h-5 w-5 cursor-pointer" />
                    </button>
                  </div>
                </form>
                
                <div className="mt-6 text-center text-gray-600 text-sm">
                  <p>By registering, you agree to our <Link href="/terms" className="text-yellow-600 hover:underline cursor-pointer">Terms of Service</Link> and <Link href="/privacy" className="text-yellow-600 hover:underline cursor-pointer">Privacy Policy</Link></p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Additional Information */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Register with Buy from Africa?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center md:items-start">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-yellow-600 cursor-pointer" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Global Reach</h4>
              <p className="text-gray-700 text-center md:text-left">
                Connect with buyers and sellers from across the globe and expand your market reach.
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-start">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-yellow-600 cursor-pointer" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Verified Profiles</h4>
              <p className="text-gray-700 text-center md:text-left">
                Our badge system ensures transparency and builds trust between buyers and vendors.
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-start">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-yellow-600 cursor-pointer" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Secure Communication</h4>
              <p className="text-gray-700 text-center md:text-left">
                Our internal messaging system ensures safe and direct communication between parties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}