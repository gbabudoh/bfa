import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'vendor1@testaccount.com';
  const user = await prisma.user.findUnique({
    where: { email },
    include: { vendor: true }
  });

  if (!user) {
    console.log('User not found:', email);
    return;
  }

  console.log('User found:', user.email);
  console.log('Role:', user.role);
  console.log('Has password:', !!user.password);
  
  if (user.password) {
    const testPassword = 'testaccount1pass';
    const isValid = await bcrypt.compare(testPassword, user.password);
    console.log('Password verification for "testaccount1pass":', isValid);
  }

  if (user.vendor) {
    console.log('Vendor profile found:', user.vendor.storeName);
  } else {
    console.log('Vendor profile NOT found');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
