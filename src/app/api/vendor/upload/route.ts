import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { uploadFile } from '@/lib/minio';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'VENDOR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Get vendor to use as part of filename/path
    const vendor = await prisma.vendor.findFirst({
      where: { userId: session.user.id }
    });

    if (!vendor) {
      return NextResponse.json({ error: 'Vendor profile not found' }, { status: 404 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename with vendor ID prefix
    const extension = file.name.split('.').pop();
    const filename = `vendors/${vendor.id}/${Date.now()}.${extension}`;

    // Upload to MinIO
    await uploadFile(filename, buffer, {
      'Content-Type': file.type,
      'Vendor-ID': vendor.id
    });

    // For now, we return a path that our imgproxy utility can handle
    // In lib/imgproxy.ts, it expects either an S3 URL or a MinIO internal URL
    // We'll return the filename which the frontend can then wrap with a utility if needed,
    // or just return the full public URL if MinIO is configured for public access.
    
    // Using the internal MinIO endpoint pattern from lib/imgproxy.ts
    const minioEndpoint = process.env.MINIO_ENDPOINT || '149.102.155.247';
    const minioPort = process.env.MINIO_PORT || '9000';
    const bucketName = process.env.MINIO_BUCKET_NAME || 'bfa-storage';
    const url = `http://${minioEndpoint}:${minioPort}/${bucketName}/${filename}`;

    return NextResponse.json({ url, filename });
  } catch (error) {
    console.error('Vendor Upload Error:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
