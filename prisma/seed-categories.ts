import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface SeedCategory {
  name: string;
  slug: string;
  image?: string;
}

const categories: SeedCategory[] = [
  { name: 'Agribusiness & Food Processing', slug: 'agribusiness-food-processing', image: '/images/featured-categories/agric.jpg' },
  { name: 'Fashion, Textiles & Lifestyle', slug: 'fashion-textiles-lifestyle', image: '/images/featured-categories/fashion.jpg' },
  { name: 'Building, Infrastructure & Industrial', slug: 'building-infrastructure-industrial', image: '/images/featured-categories/building.jpg' },
  { name: 'Tech, Automotive & Electronics', slug: 'tech-automotive-electronics', image: '/images/featured-categories/tech.jpg' },
  { name: 'Healthcare & Chemical Sciences', slug: 'healthcare-chemical-sciences', image: '/images/featured-categories/healthcare.jpg' },
  { name: 'Natural Resources & Energy', slug: 'natural-resources-energy', image: '/images/featured-categories/energy.jpg' },
  { name: 'Home, Decor & Furniture', slug: 'home-decor-furniture', image: '/images/featured-categories/home.jpg' },
  { name: 'Packaging & Paper Products', slug: 'packaging-paper-products', image: '/images/featured-categories/packaging.jpg' },
  { name: 'Consumer Goods', slug: 'consumer-goods', image: '/images/featured-categories/consumer.jpg' },
  { name: 'Handmade Crafts & Artisanal Goods', slug: 'handmade-crafts-artisanal', image: '/images/featured-categories/craft.jpg' },
  { name: 'Manufacturing & Processing', slug: 'manufacturing-processing', image: '/images/featured-categories/manufacturing.jpg' },
];

async function main() {
  console.log('Seeding categories...');
  
  for (let i = 0; i < categories.length; i++) {
    const cat = categories[i];
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, displayOrder: i, image: cat.image || null },
      create: {
        name: cat.name,
        slug: cat.slug,
        image: cat.image || null,
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
