import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Get all categories
    const allCategories = await prisma.category.findMany({
      orderBy: { displayOrder: 'asc' },
    });
    
    // Separate parent categories and subcategories
    const parentCategories = allCategories.filter(c => !c.parentId);
    const subcategories = allCategories.filter(c => c.parentId);
    
    // Attach subcategories to their parents
    const categories = parentCategories.map(parent => ({
      ...parent,
      subcategories: subcategories.filter(sub => sub.parentId === parent.id)
    }));
    
    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Categories GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, slug, image, parentId } = await request.json();
    
    const category = await prisma.category.create({
      data: {
        name,
        slug: slug || name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/&/g, 'and'),
        image,
        parentId: parentId || null,
        isFeatured: false,
        displayOrder: 0
      }
    });

    return NextResponse.json({ category });
  } catch (error) {
    console.error('Categories POST Error:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, name, slug, image, isFeatured, displayOrder, parentId } = await request.json();
    
    const category = await prisma.category.update({
      where: { id },
      data: { name, slug, image, isFeatured, displayOrder, parentId }
    });

    return NextResponse.json({ category });
  } catch (error) {
    console.error('Categories PUT Error:', error);
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    
    // Delete subcategories first
    await prisma.category.deleteMany({ where: { parentId: id } });
    await prisma.category.delete({ where: { id } });

    return NextResponse.json({ message: 'Category deleted' });
  } catch (error) {
    console.error('Categories DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
