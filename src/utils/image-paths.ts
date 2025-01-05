// Define image categories and their paths
export const IMAGE_PATHS = {
  events: {
    booth: '/assets/photos/events/booth',
    parties: '/assets/photos/events/parties',
    weddings: '/assets/photos/events/weddings',
    corporate: '/assets/photos/events/corporate',
  },
  hero: '/assets/photos/hero',
  gallery: '/assets/photos/gallery',
  team: '/assets/photos/team',
  equipment: '/assets/photos/equipment',
} as const;

// Helper function to get all images in a directory
export function getImagePath(category: keyof typeof IMAGE_PATHS, filename: string): string {
  const basePath = IMAGE_PATHS[category];
  return `${basePath}/${filename}`;
}