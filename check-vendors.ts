import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Fetching vendors...');
    const vendors = await prisma.vendor.findMany({
      select: {
        id: true,
        storeName: true,
        businessType: true,
        isVerified: true,
        location: true
      }
    });
    console.log('Vendors found:', JSON.stringify(vendors, null, 2));
    console.log('Total count:', vendors.length);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
