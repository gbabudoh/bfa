import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  { name: 'Agribusiness & Food Processing', slug: 'agribusiness-food-processing' },
  { name: 'Fashion, Textiles & Lifestyle', slug: 'fashion-textiles-lifestyle' },
  { name: 'Building, Infrastructure & Industrial', slug: 'building-infrastructure-industrial' },
  { name: 'Tech, Automotive & Electronics', slug: 'tech-automotive-electronics' },
  { name: 'Healthcare & Chemical Sciences', slug: 'healthcare-chemical-sciences' },
  { name: 'Natural Resources & Energy', slug: 'natural-resources-energy' },
  { name: 'Home, Decor & Furniture', slug: 'home-decor-furniture' },
  { name: 'Packaging & Paper Products', slug: 'packaging-paper-products' },
  { name: 'Consumer Goods', slug: 'consumer-goods' },
  { name: 'Handmade Crafts & Artisanal Goods', slug: 'handmade-crafts-artisanal' },
  { name: 'Advanced Manufacturing & Aerospace', slug: 'advanced-manufacturing-aerospace' },
];

async function main() {
  console.log('Seeding categories...');
  
  for (let i = 0; i < categories.length; i++) {
    const cat = categories[i];
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, displayOrder: i },
      create: {
        name: cat.name,
        slug: cat.slug,
        isFeatured: true,
        displayOrder: i,
      },
    });
    console.log(`Created/Updated: ${cat.name}`);
  }
  
  console.log('Categories seeded successfully!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
