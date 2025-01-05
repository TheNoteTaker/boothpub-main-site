// Define hero image dimensions and metadata
export const HERO_IMAGES = {
  main: {
    src: "https://images.unsplash.com/photo-1532635241-17e820acc59f",
    alt: "Photo Booth Event Background",
    width: 1920,
    height: 1080,
    params: {
      auto: "format",
      fit: "crop",
      q: "80"
    }
  }
} as const;