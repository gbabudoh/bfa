import { PrismaClient } from './src/generated/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'superadmin1@buyfromafrica.com';
  const password = 'G1veSAaces2Dbkend';

  console.log('Testing login for:', email);
  
  const user = await prisma.user.findUnique({
    where: { email },
    include: { vendor: { select: { id: true } } }
  });

  if (!user) {
    console.log('User not found');
    return;
  }

  if (!user.password) {
    console.log('User has no password');
    return;
  }

  const isValid = await bcrypt.compare(password, user.password);
  console.log('Password valid:', isValid);

  if (isValid) {
    const userToReturn = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      permissions: user.permissions,
      vendorId: user.vendor?.id
    };
    console.log('User object to return:', JSON.stringify(userToReturn, null, 2));
  }
}

main().finally(() => prisma.$disconnect());
