import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const imageUrl = '/uploads/cms/1769476917817-Whisk_b1aa246a0a74f14b3994bb32b5313cebdr.jpg';
  
  await prisma.cMSConfig.upsert({
    where: { key: 'hero_image_url' },
    update: { value: imageUrl },
    create: { key: 'hero_image_url', value: imageUrl }
  });

  console.log('Hero image URL updated to:', imageUrl);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
