import { PrismaClient } from './src/generated/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'superadmin1@buyfromafrica.com';
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.password) {
    console.log('User not found or no password');
    return;
  }

  console.log('Stored Hash:', user.password);
  
  const passwordsToTest = ['G1veSAaces2Dbkend', 'superadmin123'];
  
  for (const pw of passwordsToTest) {
    const isValid = await bcrypt.compare(pw, user.password);
    console.log(`Verification for "${pw}":`, isValid);
  }
}

main().finally(() => prisma.$disconnect());
