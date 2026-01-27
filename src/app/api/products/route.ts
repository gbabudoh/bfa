import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extraction of query parameters
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const country = searchParams.get('country');
    const businessType = searchParams.get('businessType');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const salesType = searchParams.get('salesType'); // 'retail', 'wholesale', 'all'
    const inStock = searchParams.get('inStock'); // 'true' or null
    const sort = searchParams.get('sort') || 'newest';

    // Using 'any' for where to bypass temporary Prisma Client type sync delays 
    // after schema changes. This ensures new fields like isRetail are usable immediately.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    // Search filter (name or description)
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' as const } },
        { description: { contains: search, mode: 'insensitive' as const } }
      ];
    }

    // Category filter
    if (category && category !== 'all') {
      where.category = { contains: category, mode: 'insensitive' as const };
    }

    // Price range filter
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    // Sales Type filter (New schema fields)
    if (salesType === 'retail') {
      where.isRetail = true;
    } else if (salesType === 'wholesale') {
      where.isWholesale = true;
    }

    // Stock availability filter
    if (inStock === 'true') {
      where.stock = { gt: 0 };
    }

    // Nested filtering via Vendor relationship (Country & Business Type)
    if ((country && country !== 'all') || (businessType && businessType !== 'all')) {
      where.vendor = {};
      
      if (country && country !== 'all') {
        where.vendor.location = { contains: country, mode: 'insensitive' as const };
      }
      
      if (businessType && businessType !== 'all') {
        where.vendor.businessType = businessType;
      }
    }

    // Sorting logic
    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' };
    if (sort === 'price-low') {
      orderBy = { price: Prisma.SortOrder.asc };
    } else if (sort === 'price-high') {
      orderBy = { price: Prisma.SortOrder.desc };
    } else if (sort === 'popular') {
      orderBy = { createdAt: Prisma.SortOrder.desc };
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        vendor: {
          select: {
            id: true,
            storeName: true,
            isVerified: true,
            location: true,
            businessType: true
          }
        }
      },
      orderBy,
      take: 50 // Limit results for performance
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
