import rss from '@astrojs/rss';

export async function GET(context) {
  return rss({
    title: 'Booth Pub Blog',
    description: 'Latest updates and tips for event photography',
    site: context.site,
    items: [], // Add your items here
  });
} 