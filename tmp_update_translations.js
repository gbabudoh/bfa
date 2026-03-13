const fs = require('fs');
const files = {
  'en.json': {
    loading: 'Loading Storefront...',
    notFoundTitle: 'Vendor Not Found',
    notFoundDesc: 'The vendor you are looking for might have moved or is currently unavailable.',
    exploreAll: 'EXPLORE ALL VENDORS',
    tabs: { products: 'Products', about: 'About', reviews: 'Reviews' },
    allCategories: 'All Categories',
    sort: 'Sort',
    wholesale: 'Wholesale',
    outOfStock: 'Out of Stock',
    viewDetails: 'View Details',
    customerReviews: 'Customer Reviews',
    writeReview: 'Write a Review',
    reviewPlaceholder: 'This vendor currently has {rating} average rating from {count} reviews. We\'re currently updating our review interface to better showcase customer feedback.',
    goldBadge: 'GOLD',
    registrationNo: 'Registration No:',
    voiceCall: 'VOICE CALL',
    videoCall: 'VIDEO CALL',
    memberSince: 'Member since',
    paymentOptions: 'Payment Options',
    shipping: 'Shipping',
    save: 'Save',
    share: 'Share',
    signInPrompt: 'Please sign in to start a {mode} call.',
    aboutTitle: 'About {name}',
    businessDetails: 'Business Details',
    address: 'Address:',
    businessHours: 'Business Hours:',
    memberSinceDetailed: 'Member Since:',
    registrationNumberDetailed: 'Registration Number:',
    contactInformation: 'Contact Information',
    phone: 'Phone:',
    videoCallDetailed: 'Video Call:',
    availableForRegistered: 'Available for registered buyers (9am-3pm WAT)',
    sendMessage: 'SEND MESSAGE',
    requestQuote: 'REQUEST QUOTE',
    businessType: 'Business Type:',
    manufacturerDesc: 'This vendor produces their own products directly, offering authentic goods directly from the source.',
    artisanDesc: 'African Artisan / Maker',
    factoryDesc: 'African Manufacturer / Factory',
    productionCapacity: 'Production Capacity',
    certifications: 'Certifications',
    additionalInfo: 'Additional Information',
    shippingOptions: 'Shipping Options',
    productCategories: 'Product Categories',
    certProductionTitle: 'Certifications & Production Capacity',
    minimumOrder: 'Minimum Order:'
  },
  'fr.json': {
    loading: 'Chargement de la vitrine...',
    notFoundTitle: 'Vendeur non trouvé',
    notFoundDesc: 'Le vendeur que vous recherchez a peut-être déménagé ou est actuellement indisponible.',
    exploreAll: 'EXPLORER TOUS LES VENDEURS',
    tabs: { products: 'Produits', about: 'À propos', reviews: 'Avis' },
    allCategories: 'Toutes les catégories',
    sort: 'Trier',
    wholesale: 'Vente en gros',
    outOfStock: 'En rupture de stock',
    viewDetails: 'Voir les détails',
    customerReviews: 'Avis des clients',
    writeReview: 'Écrire un avis',
    reviewPlaceholder: 'Ce vendeur a actuellement une note moyenne de {rating} basée sur {count} avis. Nous mettons actuellement à jour notre interface d\'avis pour mieux présenter les retours clients.',
    goldBadge: 'OR',
    registrationNo: 'N° d\'enregistrement:',
    voiceCall: 'APPEL VOCAL',
    videoCall: 'APPEL VIDÉO',
    memberSince: 'Membre depuis',
    paymentOptions: 'Options de paiement',
    shipping: 'Livraison',
    save: 'Enregistrer',
    share: 'Partager',
    signInPrompt: 'Veuillez vous connecter pour démarrer un appel {mode}.',
    aboutTitle: 'À propos de {name}',
    businessDetails: 'Détails de l\'entreprise',
    address: 'Adresse:',
    businessHours: 'Heures d\'ouverture:',
    memberSinceDetailed: 'Membre depuis:',
    registrationNumberDetailed: 'Numéro d\'enregistrement:',
    contactInformation: 'Informations de contact',
    phone: 'Téléphone:',
    videoCallDetailed: 'Appel Vidéo:',
    availableForRegistered: 'Disponible pour les acheteurs enregistrés (9h-15h WAT)',
    sendMessage: 'ENVOYER UN MESSAGE',
    requestQuote: 'DEMANDER UN DEVIS',
    businessType: 'Type d\'entreprise:',
    manufacturerDesc: 'Ce vendeur produit ses propres produits directement, offrant des produits authentiques directement à la source.',
    artisanDesc: 'Artisan / Fabricant africain',
    factoryDesc: 'Fabricant / Usine africaine',
    productionCapacity: 'Capacité de production',
    certifications: 'Certifications',
    additionalInfo: 'Informations complémentaires',
    shippingOptions: 'Options d\'expédition',
    productCategories: 'Catégories de produits',
    certProductionTitle: 'Certifications et Capacité de production',
    minimumOrder: 'Commande minimale:'
  }
};

const otherLocales = ['ar', 'pt', 'sw', 'pidgin'];
for (const locale of otherLocales) {
  files[locale + '.json'] = files['en.json'];
}

for (const [file, trans] of Object.entries(files)) {
  const path = 'e:/APPLICATIONS/applications/applications/bfa/messages/' + file;
  if (fs.existsSync(path)) {
    const data = JSON.parse(fs.readFileSync(path, 'utf8'));
    data.VendorStorefront = trans;
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
    console.log(`Updated ${file}`);
  } else {
    console.log(`File not found: ${path}`);
  }
}
console.log('VendorStorefront translations added.');
