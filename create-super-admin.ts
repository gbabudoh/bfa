
import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
  const email = 'superadmin1@buyfromafrica.com';
  const password = 'G1veSAaces2Dbkend';
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log(`Upserting super admin: ${email}`);

  try {
    const user = await prisma.user.upsert({
      where: { email: email.toLowerCase() },
      update: {
        password: hashedPassword,
        role: 'SUPER_ADMIN' as UserRole,
        permissions: ["CMS", "FINANCE", "USERS", "ADMIN_ACCESS"],
        name: 'Super Admin',
        emailVerified: new Date(),
      },
      create: {
        email: email.toLowerCase(),
        password: hashedPassword,
        role: 'SUPER_ADMIN' as UserRole,
        permissions: ["CMS", "FINANCE", "USERS", "ADMIN_ACCESS"],
        name: 'Super Admin',
        emailVerified: new Date(),
      },
    });

    console.log('Super admin upserted successfully:', user);
  } catch (e) {
    console.error('Error creating super admin:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
