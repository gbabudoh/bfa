const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const allCategories = await prisma.category.findMany({
    where: { parentId: null },
    orderBy: { displayOrder: 'asc' },
  });
  console.log(JSON.stringify(allCategories, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
