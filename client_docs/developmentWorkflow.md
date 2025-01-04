# Development Workflow

Last Updated: 2024-01-03

## Development Process

### Local Development

1. Use `npm run dev` for local development
2. Enable Supabase local development with `npx supabase start`
3. Test changes in multiple browsers and devices

### Code Standards

- TypeScript for type safety
- ESLint + Prettier for code formatting
- Component-first architecture
- Functional programming patterns
- Clear documentation and comments

### Testing Strategy

1. **Component Testing**
   - Unit tests for utility functions
   - Component testing with React Testing Library
   - Visual regression testing (future)

2. **Integration Testing**
   - End-to-end testing with Playwright
   - API integration testing
   - Database operation testing

### Release Process

1. **Pre-Release**
   - Code review
   - Test suite passing
   - Performance benchmarking
   - Accessibility checks

2. **Deployment**
   - Automated deployment through CI/CD
   - Database migrations
   - Static asset optimization
   - CDN cache invalidation

3. **Post-Release**
   - Monitoring
   - Error tracking
   - Performance metrics
   - User feedback collection

## Project-Specific Standards

### Component Structure

```typescript
// Component naming: PascalCase
// File location: src/components/[category]/[ComponentName].tsx
import type { ComponentProps } from 'react';

interface Props extends ComponentProps<'div'> {
  // Props definition
}

export function ComponentName({ ...props }: Props) {
  // Implementation
}
```

### Styling Conventions

- Use Tailwind utility classes
- Custom CSS in globals.css
- Component-specific styles in CSS modules
- Follow BEM naming for custom CSS

### State Management

- Props drilling limit: 2 levels
- Context for global state
- Local state for UI components
- Supabase for persistent data

### Documentation Requirements

- JSDoc for utilities and hooks
- README for each major feature
- Inline comments for complex logic
- Type definitions for all interfaces
