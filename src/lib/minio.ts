import * as Minio from 'minio';

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || '149.102.155.247',
  port: parseInt(process.env.MINIO_PORT || '9000'),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || 'admin',
  secretKey: process.env.MINIO_SECRET_KEY || 'G1veMePass2026',
});

const bucketName = process.env.MINIO_BUCKET_NAME || 'bfa-storage';

/**
 * Ensures the default bucket exists.
 */
export async function ensureBucket() {
  const exists = await minioClient.bucketExists(bucketName);
  if (!exists) {
    await minioClient.makeBucket(bucketName, 'us-east-1');
    console.log(`Bucket "${bucketName}" created successfully.`);
  }
}

/**
 * Uploads a file to MinIO.
 * @param fileName Name of the file in the bucket
 * @param fileBuffer Buffer or stream of the file content
 * @param metadata Optional metadata (e.g., Content-Type)
 */
export async function uploadFile(fileName: string, fileBuffer: Buffer | string, metadata: Minio.ItemBucketMetadata = {}) {
  await ensureBucket();
  const size = typeof fileBuffer === 'string' ? Buffer.byteLength(fileBuffer) : fileBuffer.length;
  return await minioClient.putObject(bucketName, fileName, fileBuffer, size, metadata);
}

/**
 * Gets a signed URL for a file.
 * @param fileName Name of the file
 * @param expiry Expiry time in seconds (default 1 hour)
 */
export async function getFileUrl(fileName: string, expiry = 3600) {
  return await minioClient.presignedGetObject(bucketName, fileName, expiry);
}

export default minioClient;
