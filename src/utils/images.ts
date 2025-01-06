import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

export interface ImageOptions {
  src: string | ImageMetadata;
  alt: string;
  width: number;
  height: number;
  format?: 'webp' | 'avif' | 'png' | 'jpg';
  quality?: number;
}

export interface ResponsiveImageOptions extends ImageOptions {
  sizes?: string;
  breakpoints?: number[];
}

const DEFAULT_CONFIG = {
  format: 'webp' as const,
  quality: 80,
  breakpoints: [640, 768, 1024, 1280, 1536],
  sizes: '(min-width: 1536px) 1536px, (min-width: 1280px) 1280px, (min-width: 1024px) 1024px, (min-width: 768px) 768px, (min-width: 640px) 640px, 100vw'
} as const;

/**
 * Optimizes an image using astro:assets
 * @param options Image optimization options
 * @returns Optimized image metadata
 */
export async function optimizeImage(options: ImageOptions) {
  const {
    src,
    alt,
    width,
    height,
    format = DEFAULT_CONFIG.format,
    quality = DEFAULT_CONFIG.quality,
  } = options;

  if (!alt) {
    throw new Error('Alt text is required for images');
  }

  return await getImage({
    src,
    alt,
    width,
    height,
    format,
    quality,
  });
}

/**
 * Creates a responsive image with multiple sizes
 * @param options Responsive image options
 * @returns Array of optimized images for different breakpoints
 */
export async function createResponsiveImage(options: ResponsiveImageOptions) {
  const {
    src,
    alt,
    width,
    height,
    format = DEFAULT_CONFIG.format,
    quality = DEFAULT_CONFIG.quality,
    breakpoints = DEFAULT_CONFIG.breakpoints,
    sizes = DEFAULT_CONFIG.sizes,
  } = options;

  if (!alt) {
    throw new Error('Alt text is required for responsive images');
  }

  const images = await Promise.all(
    breakpoints.map(async (breakpoint) => {
      const scaledWidth = Math.min(breakpoint, width);
      const scaledHeight = Math.round((scaledWidth / width) * height);

      return await getImage({
        src,
        alt,
        width: scaledWidth,
        height: scaledHeight,
        format,
        quality,
      });
    })
  );

  return {
    images,
    sizes,
  };
}

/**
 * Loads and optimizes a local image
 * @param path Path to the local image relative to the public directory
 * @param options Image options
 * @returns Optimized image metadata
 */
export async function getLocalImage(path: string, options: Omit<ImageOptions, 'src'>) {
  const image = await import(`../../public${path}`);
  return optimizeImage({
    src: image.default,
    ...options,
  });
}