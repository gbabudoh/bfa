import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const configs = [
    { key: 'hero_title', value: 'Connect with African Vendors Worldwide' },
    { key: 'hero_description', value: 'Discover authentic products and services directly from verified African businesses. Your gateway to Africa\'s finest offerings.' },
    { key: 'hero_btn1', value: 'Explore Products' },
    { key: 'hero_btn2', value: 'Become a Vendor' },
    { key: 'hero_bg_type', value: 'Yellow Gradient (Default)' },
    { key: 'hero_image_url', value: '/images/hero-image.jpg' }
  ];

  for (const config of configs) {
    await prisma.cMSConfig.upsert({
      where: { key: config.key },
      update: {},
      create: config
    });
  }

  console.log('CMS Config seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
