import { defineCollection, z } from 'astro:content';

const packages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    price: z.number(),
    features: z.array(z.string()),
    isPopular: z.boolean().optional(),
  }),
});

export const collections = {
  packages,
}; 