import type { ImageMetadata, LocalImageProps, RemoteImageProps } from 'astro';
import { getImage, type ImageTransform } from 'astro:assets';
import { IMAGE_PATHS } from './image-paths';

export interface OptimizeImageOptions {
  src: string | ImageMetadata;
  alt: string;
  width: number;
  height: number;
  params?: Record<string, string | number>;
  format?: 'webp' | 'avif' | 'png' | 'jpg';
  quality?: number;
  sizes?: string;
}

export const DEFAULT_IMAGE_CONFIG = {
  format: 'webp' as const,
  quality: 80,
  sizes: '100vw',
} as const;

export interface ResponsiveImageSizes {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  '2xl'?: number;
}

export const defaultSizes: ResponsiveImageSizes = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export function generateSrcSet(
  transform: ImageTransform,
  sizes: ResponsiveImageSizes = defaultSizes
): string {
  return Object.values(sizes)
    .map((size) => `${transform.src}?w=${size} ${size}w`)
    .join(', ');
}

export async function optimizeImage({
  src,
  alt,
  width,
  height,
  params = {},
  format = DEFAULT_IMAGE_CONFIG.format,
  quality = DEFAULT_IMAGE_CONFIG.quality,
  sizes = DEFAULT_IMAGE_CONFIG.sizes,
}: OptimizeImageOptions) {
  // Handle remote URLs
  const finalSrc = typeof src === 'string'
    ? `${src}?${new URLSearchParams({
        ...params,
        w: width.toString(),
        h: height.toString(),
        fit: 'crop',
        q: quality.toString()
      } as Record<string, string>).toString()}`
    : src;

  return await getImage({
    src: finalSrc,
    alt,
    width,
    height,
    format,
    quality,
    loading: 'eager',
    decoding: 'async',
    sizes,
  });
}

export async function getLocalImage(path: string, options: Partial<LocalImageProps> = {}) {
  const image = await import(`../../public${path}`);
  return optimizeImage({
    src: image.default,
    alt: options.alt || '',
    ...options,
  });
}