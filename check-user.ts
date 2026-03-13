import { PrismaClient } from './src/generated/client';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: 'superadmin1@buyfromafrica.com' }
  });
  console.log(JSON.stringify(user, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
