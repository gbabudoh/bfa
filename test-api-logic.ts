import prisma from './src/lib/prisma';

async function main() {
  const type = 'all';
  const where = {
    ...(type && type !== 'all' ? { businessType: type } : {}),
  };

  const vendors = await prisma.vendor.findMany({
    where,
    include: {
      products: {
        where: { isFeatured: true },
        take: 3
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  console.log('Vendors from API logic:', JSON.stringify(vendors, null, 2));
}

main();
