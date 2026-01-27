// components/CountryFlag.tsx
import React from 'react';

interface CountryFlagProps {
  country: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const CountryFlag: React.FC<CountryFlagProps> = ({ 
  country, 
  className = "", 
  size = "md" 
}) => {
  // Convert country name to ISO 2-letter code
  const getCountryCode = (country: string): string => {
    const countryCodes: {[key: string]: string} = {
      "Nigeria": "ng",
      "Ghana": "gh",
      "Kenya": "ke",
      "South Africa": "za",
      "Tanzania": "tz",
      "Ethiopia": "et",
      "Morocco": "ma",
      "Senegal": "sn",
      "Algeria": "dz",
      "Angola": "ao",
      "Benin": "bj",
      "Botswana": "bw",
      "Burkina Faso": "bf",
      "Burundi": "bi",
      "Cabo Verde": "cv",
      "Cameroon": "cm",
      "Central African Republic": "cf",
      "Chad": "td",
      "Comoros": "km",
      "Congo, Democratic Republic of the": "cd",
      "Congo, Republic of the": "cg",
      "Côte d'Ivoire": "ci",
      "Djibouti": "dj",
      "Egypt": "eg",
      "Equatorial Guinea": "gq",
      "Eritrea": "er",
      "Eswatini": "sz",
      "Gabon": "ga",
      "Gambia": "gm",
      "Guinea": "gn",
      "Guinea-Bissau": "gw",
      "Lesotho": "ls",
      "Liberia": "lr",
      "Libya": "ly",
      "Madagascar": "mg",
      "Malawi": "mw",
      "Mali": "ml",
      "Mauritania": "mr",
      "Mauritius": "mu",
      "Mozambique": "mz",
      "Namibia": "na",
      "Niger": "ne",
      "Rwanda": "rw",
      "São Tomé and Príncipe": "st",
      "Seychelles": "sc",
      "Sierra Leone": "sl",
      "Somalia": "so",
      "South Sudan": "ss",
      "Sudan": "sd",
      "Togo": "tg",
      "Tunisia": "tn",
      "Uganda": "ug",
      "Zambia": "zm",
      "Zimbabwe": "zw",
    };
    
    // Extract country name if in format "City, Country"
    const parts = country.split(", ");
    const countryName = parts.length > 1 ? parts[parts.length - 1] : country;
    
    return countryCodes[countryName] || "";
  };
  
  // Special case for Worldwide
  if (country === "Worldwide") {
    return (
      <span 
        className={`inline-block ${className}`} 
        role="img" 
        aria-label="Worldwide"
        style={{ fontSize: size === 'sm' ? '14px' : size === 'lg' ? '24px' : '18px' }}
      >
        🌍
      </span>
    );
  }
  
  const code = getCountryCode(country);
  
  if (!code) return null;
  
  // Flag dimensions based on size
  const dimensions = {
    sm: { width: 16, height: 12 },
    md: { width: 24, height: 18 },
    lg: { width: 32, height: 24 }
  };
  
  const { width, height } = dimensions[size];
  
  return (
    <img
      src={`https://flagcdn.com/${width}x${height}/${code}.png`}
      srcSet={`https://flagcdn.com/${width*2}x${height*2}/${code}.png 2x, https://flagcdn.com/${width*3}x${height*3}/${code}.png 3x`}
      width={width}
      height={height}
      alt={`${country} flag`}
      className={`inline-block ${className}`}
      style={{ verticalAlign: 'middle' }}
    />
  );
};

export default CountryFlag;