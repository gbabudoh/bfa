import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const badge = searchParams.get('badge');
    const country = searchParams.get('country');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    const where: Prisma.VendorWhereInput = {
      ...(type && type !== 'all' ? { businessType: type } : {}),
      ...(badge && badge !== 'all' ? { isVerified: badge === 'gold' } : {}),
      ...(country && country !== 'all' ? { location: { contains: country, mode: 'insensitive' as const } } : {}),
      ...(category && category !== 'all' ? { 
        products: { 
          some: { 
            category: { contains: category, mode: 'insensitive' as const } 
          } 
        } 
      } : {}),
      ...(search ? {
        OR: [
          { storeName: { contains: search, mode: 'insensitive' as const } },
          { description: { contains: search, mode: 'insensitive' as const } },
          { location: { contains: search, mode: 'insensitive' as const } },
        ]
      } : {})
    };

    const vendors = await prisma.vendor.findMany({
      where,
      include: {
        products: {
          where: { isFeatured: true },
          take: 3
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(vendors);
  } catch (error) {
    console.error('Error fetching vendors:', error);
    return NextResponse.json({ error: 'Failed to fetch vendors' }, { status: 500 });
  }
}
