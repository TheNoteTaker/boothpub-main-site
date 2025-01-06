# Operational Context

Last Updated: 2024-01-05

## System Operation

### Error Handling Patterns

1. **Client-Side Errors**
   - Form validation with Zod
   - Network request handling
   - Image loading fallbacks
   - Hydration errors

2. **Build-Time Errors**
   - Astro compilation issues
   - Image optimization failures
   - Type checking errors
   - Integration conflicts

3. **Runtime Errors**
   - Component hydration failures
   - Form submission errors
   - Image loading issues
   - Performance degradation

### Error Recovery

1. **Graceful Degradation**
   - Progressive enhancement
   - Fallback content
   - Error boundaries
   - Default values

2. **User Feedback**
   - Clear error messages
   - Loading states
   - Form validation feedback
   - Progress indicators

## Infrastructure Details

### Build Pipeline

1. **Astro Build Process**
   - Static site generation
   - Image optimization
   - CSS optimization
   - JavaScript bundling

2. **Asset Pipeline**
   - Image processing with @astrojs/image
   - Font optimization
   - Icon bundling
   - Static file handling

### Deployment

1. **Static Hosting**
   - CDN distribution
   - Edge caching
   - Asset optimization
   - Performance monitoring

2. **Monitoring**
   - Core Web Vitals
   - Error tracking
   - Performance metrics
   - User analytics

## Performance Requirements

### Page Performance

1. **Core Web Vitals**
   - LCP < 2.5s
   - FID < 100ms
   - CLS < 0.1
   - TBT < 300ms

2. **Additional Metrics**
   - TTFB < 200ms
   - FCP < 1s
   - Speed Index < 3s
   - JavaScript size < 100KB initial

### Resource Optimization

1. **Images**
   - WebP format primary
   - Responsive sizes
   - Lazy loading
   - Proper dimensions

2. **JavaScript**
   - Minimal initial JS
   - Selective hydration
   - Code splitting
   - Tree shaking

3. **CSS**
   - Critical CSS inline
   - Tailwind optimization
   - Unused CSS removal
   - Minimal animations

### Caching Strategy

1. **Static Assets**
   - Long-term caching
   - Cache invalidation
   - Version hashing
   - CDN caching

2. **API Responses**
   - Build-time caching
   - Static generation
   - Incremental builds
   - Cache revalidation

## Monitoring and Alerts

### Performance Monitoring

1. **Real User Metrics**
   - Core Web Vitals
   - User interactions
   - Error rates
   - Page transitions

2. **Build Metrics**
   - Build time
   - Bundle size
   - Asset optimization
   - Type checking

### Alert Thresholds

1. **Critical Alerts**
   - LCP > 3s
   - CLS > 0.15
   - Error rate > 1%
   - Build failures

2. **Warning Alerts**
   - LCP > 2.5s
   - JS size > 100KB
   - Build time > 5min
   - Cache misses > 10%
