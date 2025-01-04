# Project Boundaries

Last Updated: 2024-01-03

## Technical Constraints

### Platform Limitations

- Supabase free tier limitations
- Static site generation constraints
- Browser compatibility requirements
- Mobile device support requirements
- Image optimization constraints:
  - Maximum original image size: 5MB
  - Maximum optimized image size: 200KB
  - Supported formats: JPG, PNG, WebP, AVIF
  - Maximum dimensions: 2500x2500px

### Performance Boundaries

- Maximum bundle size: 200KB (initial load)
- Maximum image size: 200KB per image
- Maximum API payload: 5MB
- Maximum concurrent users: 1000
- Image optimization targets:
  - Hero images: 85% quality
  - Gallery images: 80% quality
  - Thumbnail images: 75% quality
  - WebP/AVIF priority over JPG/PNG

### Security Constraints

- No sensitive data in client-side code
- Secure authentication flow
- Data encryption requirements
- API rate limiting

## Scale Requirements

### Traffic Expectations

- Peak concurrent users: 100
- Average daily visitors: 500
- Maximum daily bookings: 50
- Maximum file uploads: 100/day

### Data Limits

- Maximum database size: 500MB
- Maximum storage size: 1GB
- Maximum daily API calls: 10,000
- Maximum file storage per user: 50MB

### Performance Targets

- Page load time: < 3s
- API response time: < 200ms
- Search results: < 500ms
- Image optimization: < 100KB per image

## Hard Limitations

### Technical Limitations

- No server-side rendering
- Limited real-time capabilities
- Browser support: last 2 versions
- Mobile-first development required

### Business Limitations

- Geographic service area restrictions
- Maximum booking lead time: 12 months
- Minimum booking notice: 48 hours
- Payment processing restrictions

## Non-Negotiables

### Security Requirements

- HTTPS only
- Secure authentication
- Data encryption at rest
- Regular security audits

### Compliance Requirements

- GDPR compliance
- CCPA compliance
- Accessibility (WCAG 2.1)
- Data retention policies

### Quality Standards

- 95% test coverage
- Zero critical vulnerabilities
- Responsive design
- Performance budgets
- SEO optimization
