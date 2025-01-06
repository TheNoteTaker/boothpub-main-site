# System Patterns

Last Updated: 2024-01-05

## High-Level Architecture

### Core Architecture

- Static Site Generation with Astro
  - Zero-JS by default approach
  - Selective hydration for interactive components
  - Built-in image optimization
  - Native SEO optimization

### Component Strategy

- Astro components for static content (default)
- React components only for complex interactions
- Hybrid approach for progressive enhancement
- Island architecture for optimal performance

## Core Technical Patterns

### Component Architecture

1. **Static Components (Astro-first)**
   - Header and navigation
   - Content sections
   - Image galleries
   - Service descriptions
   - Pricing tables

2. **Interactive Components (React)**
   - Photo strip animations
   - Booking forms
   - FAQ accordions
   - Real-time availability checks

### Performance Patterns

1. **Image Optimization**
   - Astro's built-in image optimization
   - Proper width/height attributes
   - WebP format with fallbacks
   - Lazy loading for below-fold
   - Alt text for accessibility

2. **JavaScript Strategy**
   - Zero-JS by default
   - Partial hydration where needed
   - Chunked loading for React
   - Progressive enhancement

3. **CSS Strategy**
   - Tailwind with PurgeCSS
   - Critical CSS inlined
   - Deferred non-critical styles
   - Component-scoped styles

### Data Flow

1. **Build-time Data**
   - Content collection for static data
   - Image optimization at build
   - SEO metadata generation
   - Sitemap generation

2. **Runtime Data**
   - Form submissions via Supabase
   - Availability checks
   - Booking management
   - Contact form handling

## Key Technical Decisions

1. **Astro-First Development**
   - Prefer Astro components by default
   - React only for complex interactions
   - Built-in optimizations
   - Native routing

2. **Performance Optimization**
   - LCP optimization priority
   - Minimal TBT through selective hydration
   - CLS prevention with proper image handling
   - FCP optimization through critical CSS

3. **UI Component Strategy**
   - Shadcn UI for complex interactions
   - Astro components for static UI
   - Tailwind for styling
   - Accessibility-first approach

4. **Build and Deploy**
   - Static generation
   - Edge-optimized delivery
   - Asset optimization
   - Automated performance monitoring
