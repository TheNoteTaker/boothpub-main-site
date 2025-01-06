# Project Boundaries

Last Updated: 2024-01-05

## Technical Constraints

### Performance Requirements

1. **Core Web Vitals**
   - LCP (Largest Contentful Paint) < 2.5s
   - FID (First Input Delay) < 100ms
   - CLS (Cumulative Layout Shift) < 0.1
   - TBT (Total Blocking Time) < 300ms

2. **Page Performance**
   - Initial page load < 1.5s
   - Time to Interactive < 2.5s
   - First Contentful Paint < 1s
   - JavaScript bundle size < 100KB (initial)

3. **Image Performance**
   - All images must have width/height
   - WebP format with fallbacks
   - Lazy loading for below-fold
   - Responsive image sets

### Framework Constraints

1. **Astro-First Development**
   - Zero-JS by default
   - React only for interactive components
   - No client-side routing
   - Static site generation

2. **Component Boundaries**
   - Astro components for static content
   - React for complex interactions
   - No mixing frameworks within components
   - Clear hydration boundaries

### Scale Requirements

1. **Content Scale**
   - Up to 100 gallery images
   - Up to 20 service packages
   - Up to 50 testimonials
   - Up to 10 FAQ sections

2. **Traffic Scale**
   - 10,000 monthly visitors
   - 1,000 form submissions
   - 100 concurrent users
   - 50 bookings per month

## Hard Limitations

1. **Technical Limitations**
   - No server-side rendering
   - No real-time updates
   - No client-side routing
   - Limited to static deployment

2. **Browser Support**
   - Modern browsers only
   - No IE11 support
   - Progressive enhancement
   - Mobile-first design

## Non-Negotiables

1. **Performance**
   - Must meet Core Web Vitals
   - No unnecessary JavaScript
   - Optimized images required
   - Responsive design required

2. **Accessibility**
   - WCAG 2.1 AA compliance
   - Semantic HTML required
   - Proper ARIA labels
   - Keyboard navigation

3. **Security**
   - HTTPS only
   - CSP headers
   - Form validation
   - XSS prevention

4. **SEO**
   - Meta tags required
   - Sitemap required
   - robots.txt required
   - Structured data
