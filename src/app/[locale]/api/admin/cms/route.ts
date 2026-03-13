import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const configs = await prisma.cMSConfig.findMany();
    const featuredProducts = await prisma.product.findMany({
      where: { isFeatured: true },
      include: { vendor: { select: { storeName: true } } }
    });

    return NextResponse.json({ configs, featuredProducts });
  } catch (error) {
    console.error('CMS GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch CMS content' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { configs } = await request.json();

    if (!Array.isArray(configs)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }

    // Upsert all provided configs
    const operations = configs.map((config: { key: string; value: string }) => 
      prisma.cMSConfig.upsert({
        where: { key: config.key },
        update: { value: config.value },
        create: { key: config.key, value: config.value }
      })
    );

    await Promise.all(operations);

    return NextResponse.json({ message: 'CMS updated successfully' });
  } catch (error) {
    console.error('CMS POST Error:', error);
    return NextResponse.json({ error: 'Failed to update CMS content' }, { status: 500 });
  }
}
