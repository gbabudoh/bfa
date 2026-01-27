import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('superadmin123', 12);
  const permissions = ["USERS", "VENDORS", "PRODUCTS", "FINANCE", "CMS", "MANAGEMENT"];
  
  const superAdmin = await prisma.user.upsert({
    where: { email: 'superadmin1@buyfromafrica.com' },
    update: {
      role: 'SUPER_ADMIN' as any,
      permissions: permissions as any,
    } as any,
    create: {
      email: 'superadmin1@buyfromafrica.com',
      name: 'Super Admin',
      password: password,
      role: 'SUPER_ADMIN' as any,
      permissions: permissions as any,
    } as any,
  });

  console.log('Super Admin created:', superAdmin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
