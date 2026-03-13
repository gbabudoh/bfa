import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { productId, isFeatured } = await request.json();

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: { isFeatured }
    });

    return NextResponse.json({ message: 'Product updated', product: updatedProduct });
  } catch (error) {
    console.error('Featured Toggle Error:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}
