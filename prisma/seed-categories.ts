import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CategorySeed {
  name: string;
  slug: string;
  subcategories: { name: string; slug: string }[];
}

const CATEGORIES: CategorySeed[] = [
  {
    name: 'Manufacturers',
    slug: 'manufacturers',
    subcategories: [
      { name: 'Textiles and fabrics', slug: 'textiles-and-fabrics' },
      { name: 'Apparel and fashion accessories', slug: 'apparel-and-fashion-accessories' },
      { name: 'Leather and leather goods', slug: 'leather-and-leather-goods' },
      { name: 'Footwear', slug: 'footwear' },
      { name: 'Automotive assembly and components', slug: 'automotive-assembly-and-components' },
      { name: 'Electrical equipment and cables', slug: 'electrical-equipment-and-cables' },
      { name: 'Electronics and small appliances', slug: 'electronics-and-small-appliances' },
      { name: 'Industrial machinery and equipment', slug: 'industrial-machinery-and-equipment' },
      { name: 'Furniture and fittings', slug: 'furniture-and-fittings' },
      { name: 'Packaging materials', slug: 'packaging-materials' },
    ],
  },
  {
    name: 'Artisans',
    slug: 'artisans',
    subcategories: [
      { name: 'Handicrafts and souvenirs', slug: 'handicrafts-and-souvenirs' },
      { name: 'Home décor and interior items', slug: 'home-decor-and-interior-items' },
      { name: 'Traditional art, sculpture, and carvings', slug: 'traditional-art-sculpture-and-carvings' },
      { name: 'Jewellery and adornments', slug: 'jewellery-and-adornments' },
      { name: 'Cultural and religious items', slug: 'cultural-and-religious-items' },
    ],
  },
  {
    name: 'Miners',
    slug: 'miners',
    subcategories: [
      { name: 'Minerals and ores', slug: 'minerals-and-ores' },
      { name: 'Precious metals and gemstones', slug: 'precious-metals-and-gemstones' },
      { name: 'Industrial minerals', slug: 'industrial-minerals' },
    ],
  },
  {
    name: 'Industrial',
    slug: 'industrial',
    subcategories: [
      { name: 'Building materials and construction products', slug: 'building-materials-and-construction-products' },
      { name: 'Metals and metal products', slug: 'metals-and-metal-products' },
      { name: 'Wood and wood products', slug: 'wood-and-wood-products' },
      { name: 'Paper, pulp, and printed materials', slug: 'paper-pulp-and-printed-materials' },
      { name: 'Chemicals and petrochemicals', slug: 'chemicals-and-petrochemicals' },
      { name: 'Fertilizers and agro-inputs', slug: 'fertilizers-and-agro-inputs' },
      { name: 'Paints, coatings, and adhesives', slug: 'paints-coatings-and-adhesives' },
      { name: 'Plastics and rubber products', slug: 'plastics-and-rubber-products' },
    ],
  },
  {
    name: 'Food and Agriculture',
    slug: 'food-and-agriculture',
    subcategories: [
      { name: 'Agricultural commodities', slug: 'agricultural-commodities' },
      { name: 'Processed foods and beverages', slug: 'processed-foods-and-beverages' },
      { name: 'Livestock and animal products', slug: 'livestock-and-animal-products' },
      { name: 'Fisheries and aquaculture products', slug: 'fisheries-and-aquaculture-products' },
    ],
  },
  {
    name: 'Health & Wellness',
    slug: 'health-and-wellness',
    subcategories: [
      { name: 'Pharmaceuticals and medical supplies', slug: 'pharmaceuticals-and-medical-supplies' },
      { name: 'Cosmetics, beauty, and personal care', slug: 'cosmetics-beauty-and-personal-care' },
      { name: 'Health and wellness products', slug: 'health-and-wellness-products' },
    ],
  },
  {
    name: 'Home & Living',
    slug: 'home-and-living',
    subcategories: [
      { name: 'Cleaning and household care products', slug: 'cleaning-and-household-care-products' },
      { name: 'Eco-friendly and sustainable products', slug: 'eco-friendly-and-sustainable-products' },
      { name: 'Educational and office supplies', slug: 'educational-and-office-supplies' },
    ],
  },
  {
    name: 'Technology & Energy',
    slug: 'technology-and-energy',
    subcategories: [
      { name: 'Renewable energy equipment', slug: 'renewable-energy-equipment' },
      { name: 'ICT hardware assembly', slug: 'ict-hardware-assembly' },
      { name: 'Digital content tied to physical goods', slug: 'digital-content-tied-to-physical-goods' },
    ],
  },
];

async function seedCategories() {
  console.log('🌱 Seeding categories...');

  // Clear existing categories
  await prisma.category.deleteMany({});
  console.log('  Cleared existing categories.');

  let order = 0;
  for (const parent of CATEGORIES) {
    const created = await prisma.category.create({
      data: {
        name: parent.name,
        slug: parent.slug,
        isFeatured: true,
        displayOrder: order++,
      },
    });
    console.log(`  ✓ ${parent.name} (${parent.subcategories.length} subcategories)`);

    for (const sub of parent.subcategories) {
      await prisma.category.create({
        data: {
          name: sub.name,
          slug: sub.slug,
          parentId: created.id,
          isFeatured: false,
          displayOrder: order++,
        },
      });
    }
  }

  console.log(`\n✅ Done! Seeded ${CATEGORIES.length} parent categories with ${CATEGORIES.reduce((sum, c) => sum + c.subcategories.length, 0)} subcategories.`);
}

seedCategories()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
