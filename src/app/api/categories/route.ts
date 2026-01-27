import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type PrismaWithCategory = typeof prisma & {
  category: {
    findMany: (args: unknown) => Promise<unknown[]>;
  };
};

export async function GET() {
  try {
    const categories = await (prisma as unknown as PrismaWithCategory).category.findMany({
      orderBy: { displayOrder: 'asc' },
      include: {
        subcategories: true
      }
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
