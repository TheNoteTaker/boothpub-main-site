# Technical Context

Last Updated: 2024-01-03

## Core Technologies

### Frontend

- Astro 4.x with optimizations:
  - Sharp for image processing
  - Sitemap generation
  - MDX support
  - TypeScript integration
  - Partial hydration
- React 18.x (for interactive components only)
- TypeScript 5.x
- Tailwind CSS 3.x
- Shadcn UI
- Lucide Icons

### Image Processing

- Sharp
  - WebP and AVIF conversion
  - Quality optimization
  - Responsive sizes
  - Lazy loading
- Image optimization utilities
  - Automatic format conversion
  - Size optimization
  - Loading strategy management

### Backend

- Supabase
  - PostgreSQL Database
  - Authentication
  - Storage
  - Edge Functions (future)

### Development Tools

- Node.js 18.x+
- npm
- ESLint
- Prettier
- Git
- TypeScript
- Sharp CLI

## Integration Patterns

### Image Optimization

```typescript
// Image optimization pattern
import { optimizeImage } from '@/utils/images';

const image = await optimizeImage({
  src: "path/to/image.jpg",
  alt: "Description",
  width: 1920,
  height: 1080,
  format: 'webp',
  quality: 85
});
```

### Component Patterns

```typescript
// Astro component pattern
---
import { Image } from 'astro:assets';
import { optimizeImage } from '@/utils/images';

const image = await optimizeImage({...});
---

<Image {...image} loading="lazy" />
```

### Authentication Flow

```typescript
// Supabase Auth integration
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)
```

### Data Access

```typescript
// Database access pattern
interface Booking {
  id: string
  date: Date
  package: string
  status: 'pending' | 'confirmed' | 'completed'
}

async function getBookings(): Promise<Booking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    
  if (error) throw error
  return data
}
```

## Key Libraries/Frameworks

### UI Components

- @shadcn/ui
- @radix-ui/react
- @headlessui/react
- lucide-react

### Form Handling

- react-hook-form
- zod (validation)
- @hookform/resolvers

### Data Management

- @tanstack/react-query
- @supabase/supabase-js

## Infrastructure

### Hosting

- Static hosting (Vercel/Netlify)
- Supabase Cloud
- CDN for assets

### Development Environment

- VS Code
- Recommended extensions:
  - Astro
  - Tailwind CSS IntelliSense
  - ESLint
  - Prettier
  - TypeScript

### CI/CD

- GitHub Actions
- Automated testing
- Deployment pipelines
- Environment management

## Technical Constraints

### Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

### Performance Targets

- Lighthouse score > 90
- Core Web Vitals passing
- Bundle size optimization
- Image optimization

### Security Requirements

- Content Security Policy
- HTTPS only
- API authentication
- Data encryption
