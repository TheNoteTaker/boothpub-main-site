# System Patterns

Last Updated: 2024-01-03

## High-Level Architecture

- Static Site Generation with Astro
  - Image optimization through Sharp
  - SEO optimization with sitemap and robots.txt
  - Content management with MDX
- Interactive components with React (partial hydration)
- Database and Authentication with Supabase
- Styling with Tailwind CSS and Shadcn UI

## Core Technical Patterns

### Component Architecture

- Astro pages for static content
- React components for interactive elements
- Shared layouts for consistent structure
- Atomic design principles for UI components
- TypeScript for type safety
- Optimized image handling with Sharp

### Component Patterns

1. **Static Components (Astro)**
   - Header with mobile navigation
   - Footer with dynamic content
   - Hero sections with optimized images
   - Content sections with MDX support

2. **Interactive Components (React)**
   - Photo strip animations
   - Form handling
   - Dynamic UI elements
   - Client-side interactions

### Data Flow

1. **Static Data**
   - Content files in src/content
   - Build-time data fetching
   - Static asset optimization
   - Image processing pipeline

2. **Dynamic Data**
   - Supabase real-time subscriptions
   - Client-side state management
   - Form handling with validation
   - Image optimization on demand

### State Management

- Local component state for UI
- Supabase for persistent data
- Context API for shared state
- TypeScript for type safety

### Image Optimization

- Sharp for processing
- WebP and AVIF formats
- Lazy loading strategy
- Responsive images
- Quality optimization

## Key Technical Decisions

1. **Astro + React**
   - Optimal performance through partial hydration
   - SEO-friendly static generation
   - Interactive where needed
   - TypeScript integration

2. **Supabase**
   - Simplified backend development
   - Built-in authentication
   - Real-time capabilities
   - Row-level security

3. **Tailwind + Shadcn**
   - Consistent design system
   - Rapid development
   - Customizable components
   - Responsive by default

4. **Image Processing**
   - Sharp for optimization
   - Multiple formats (WebP, AVIF)
   - Responsive sizes
   - Quality/size balance
