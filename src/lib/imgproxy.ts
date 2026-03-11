import Imgproxy from 'imgproxy';
import type { Gravity } from 'imgproxy';

// Library ResizingType is 'fit' | 'fill' | 'fill-down' | 'force' | 'crop'
type ResizingType = 'fit' | 'fill' | 'fill-down' | 'force' | 'crop';

interface ImgproxyOptions {
  width?: number;
  height?: number;
  resizing_type?: ResizingType;
  gravity?: Gravity;
}

const imgproxy = new Imgproxy({
  baseUrl: process.env.IMGPROXY_URL || 'http://149.102.155.247:8080',
  key: process.env.IMGPROXY_KEY || '',
  salt: process.env.IMGPROXY_SALT || '',
});

/**
 * Generates a processed image URL using imgproxy.
 * @param sourceUrl The original image URL (e.g., from MinIO or external)
 * @param options imgproxy processing options (resizing, cropping, etc.)
 */
export function getProcessedImageUrl(sourceUrl: string, options: ImgproxyOptions = {}) {
  // Default to thumbnail if no options provided
  const { 
    width = 300, 
    height = 300, 
    resizing_type = 'fill' as ResizingType, 
    gravity = 'ce' as Gravity 
  } = options;

  return imgproxy
    .builder()
    .resize(resizing_type, width, height)
    .gravity(gravity)
    .generateUrl(sourceUrl);
}

/**
 * Generates an imgproxy URL for a file stored in our MinIO bucket.
 * @param fileName Name of the file in the MinIO bucket
 * @param options imgproxy processing options
 */
export function getMinioProcessedUrl(fileName: string, options: ImgproxyOptions = {}) {
  const bucketName = process.env.MINIO_BUCKET_NAME || 'bfa-storage';
  const useS3 = process.env.IMGPROXY_USE_S3 === 'true';

  let sourceUrl: string;

  if (useS3) {
    // When using S3 integration in imgproxy, we use the s3:// scheme
    sourceUrl = `s3://${bucketName}/${fileName}`;
  } else {
    const minioEndpoint = process.env.MINIO_ENDPOINT || '149.102.155.247';
    const minioPort = process.env.MINIO_PORT || '9000';
    // Fallback to HTTP URL if S3 integration is not enabled in imgproxy
    sourceUrl = `http://${minioEndpoint}:${minioPort}/${bucketName}/${fileName}`;
  }

  return getProcessedImageUrl(sourceUrl, options);
}

export default imgproxy;
