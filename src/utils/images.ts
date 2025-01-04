import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

export interface OptimizeImageOptions {
  src: ImageMetadata | string;
  alt: string;
  width?: number;
  height?: number;
  format?: 'webp' | 'avif' | 'png' | 'jpg';
  quality?: number;
}

export async function optimizeImage({
  src,
  alt,
  width,
  height,
  format = 'webp',
  quality = 80,
}: OptimizeImageOptions) {
  if (typeof src === 'string') {
    return {
      src,
      alt,
      width,
      height,
    };
  }

  const optimized = await getImage({
    src,
    alt,
    width,
    height,
    format,
    quality,
  });

  return optimized;
}

export function generateSrcSet(
  src: string,
  widths: number[],
  format: 'webp' | 'avif' = 'webp'
) {
  return widths
    .map((width) => `${src}?w=${width}&format=${format} ${width}w`)
    .join(', ');
}

export const defaultImageSizes = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}; 