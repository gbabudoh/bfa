import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Removing legacy category...');
  
  const deleted = await prisma.category.delete({
    where: { slug: 'advanced-manufacturing-aerospace' }
  }).catch(e => {
    console.log('Category not found or already deleted');
    return null;
  });

  if (deleted) {
    console.log('Successfully deleted:', deleted.name);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
