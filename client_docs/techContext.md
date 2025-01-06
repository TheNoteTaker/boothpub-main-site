# Technical Context

Last Updated: 2024-01-05

## Core Technologies

### Primary Framework

- Astro 4.0
  - Zero-JS by default
  - Partial hydration
  - Built-in optimizations
  - Content collections

### Supporting Technologies

- React (interactive components only)
- TypeScript (type safety)
- Tailwind CSS (styling)
- Shadcn UI (complex interactions)

## Integration Patterns

### Astro Integrations

1. **@astrojs/image**
   - Built-in image optimization
   - Automatic format conversion
   - Responsive images
   - CLS prevention

2. **@astrojs/react**
   - Selective hydration
   - Island architecture
   - Progressive enhancement
   - Minimal client JS

3. **@astrojs/tailwind**
   - Zero-runtime CSS
   - PurgeCSS integration
   - Component styling
   - Responsive utilities

4. **Additional Integrations**
   - @astrojs/seo
   - @astrojs/sitemap
   - @astrojs/prefetch
   - @astrojs/mdx

### Component Strategy

1. **Static Components (Astro)**
   - Landing pages
   - Content sections
   - Image galleries
   - Service descriptions

2. **Interactive Components (React)**
   - Booking forms
   - Photo animations
   - FAQ accordions
   - Real-time features

## Development Environment

### Tools

- VS Code with Astro extension
- TypeScript for type checking
- ESLint for linting
- Prettier for formatting

### Build Process

- Astro build system
- Image optimization pipeline
- CSS purging
- JavaScript bundling

## Technical Constraints

### Performance

- Core Web Vitals targets
- Bundle size limits
- Image optimization rules
- Hydration strategies

### Browser Support

- Modern browsers
- Progressive enhancement
- Mobile-first approach
- Accessibility compliance

## Infrastructure

### Deployment

- Static hosting
- CDN distribution
- Edge caching
- Asset optimization

### Services

- Supabase for data
- Image optimization CDN
- Analytics integration
- Form handling

## Development Standards

### Code Quality

- TypeScript strict mode
- ESLint configuration
- Component patterns
- Testing requirements

### Performance Standards

- Lighthouse scores > 90
- Core Web Vitals pass
- Bundle size limits
- Image optimization rules
