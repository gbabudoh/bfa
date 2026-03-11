import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding test accounts...');

  const users = [
    {
      email: 'vendor1@testaccount.com',
      name: 'Blue Badge Vendor',
      password: 'testaccount1pass',
      role: UserRole.VENDOR,
      vendor: {
        storeName: 'Vendor 1 Boutique',
        description: 'Individual or non-registered business (Blue Badge Vendor)',
        businessType: 'artisan',
        isVerified: false,
      }
    },
    {
      email: 'vendor2@testaccount.com',
      name: 'Gold Badge Vendor',
      password: 'testaccount2pass',
      role: UserRole.VENDOR,
      vendor: {
        storeName: 'Vendor 2 Enterprise',
        description: 'Registered African business (Gold Badge Vendor)',
        businessType: 'factory',
        isVerified: true,
      }
    },
    {
      email: 'buyer@testbuyer.com',
      name: 'Test Buyer',
      password: 'testbuyerpass',
      role: UserRole.BUYER,
    }
  ];

  for (const userData of users) {
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {
        name: userData.name,
        password: hashedPassword,
        role: userData.role,
      },
      create: {
        email: userData.email,
        name: userData.name,
        password: hashedPassword,
        role: userData.role,
      },
    });

    if (userData.vendor) {
      await prisma.vendor.upsert({
        where: { userId: user.id },
        update: {
          storeName: userData.vendor.storeName,
          description: userData.vendor.description,
          businessType: userData.vendor.businessType,
          isVerified: userData.vendor.isVerified,
        },
        create: {
          userId: user.id,
          storeName: userData.vendor.storeName,
          description: userData.vendor.description,
          businessType: userData.vendor.businessType,
          isVerified: userData.vendor.isVerified,
        },
      });
    }

    console.log(`User ${userData.email} created/updated.`);
  }

  console.log('Test accounts seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
