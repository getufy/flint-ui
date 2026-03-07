# Performance & SEO Optimizations

This document outlines the performance and SEO improvements implemented for the Lite homepage.

## SEO Enhancements

### 1. Meta Tags
Added comprehensive meta tags to `index.html`:
- **Title**: `lite · Web Component UI Library`
- **Description**: Clear description of the library's purpose
- **Keywords**: web components, UI library, React, TypeScript, Lit
- **Open Graph Tags**: og:title, og:description, og:type, og:url for social sharing
- **Twitter Card**: twitter:card, twitter:title, twitter:description
- **Canonical URL**: https://lite.dev
- **Theme Color**: #3b82f6 (brand color)

### 2. Sitemap
Created `public/sitemap.xml` with all main pages:
- Homepage (priority: 1.0)
- /docs (priority: 0.9)
- /blog (priority: 0.8)
- /contact (priority: 0.7)

Updated change frequency and last modification dates for search engines.

### 3. Robots.txt
Created `public/robots.txt`:
- Allows crawling of all public pages
- Sets appropriate crawl delay (1 second)
- Points to sitemap location
- Blocks private/admin paths

## Performance Optimizations

### 1. Build Optimization
Enhanced `vite.config.ts` with:
- **Code Splitting**: Separate chunks for React, pages, and sections
  - `react.js` - React and React-DOM library (vendor bundle)
  - `pages.js` - ComponentLibraryPage, BlogPage, ContactPage
  - `sections.js` - Header, Footer components
  - Main entry point with home section logic
- **CSS Code Splitting**: Separate CSS files per component
- **Minification**: Terser minification enabled
- **Asset Organization**: Organized output into js/, css/, and assets/ directories
- **Chunk File Names**: Hash-based file names for cache busting

### 2. Image Lazy Loading
Created `LazyImage` component (`src/components/LazyImage.tsx`):
- Uses Intersection Observer API for lazy loading
- Configurable placeholder images
- Smooth fade-in transition when image loads
- Root margin of 50px for preloading as user scrolls
- Fallback to placeholder SVG if no image specified

Usage:
```tsx
import { LazyImage } from '../components/LazyImage';

<LazyImage
    src="/path/to/image.jpg"
    alt="Description"
    width={400}
    height={300}
/>
```

### 3. Route-Based Code Splitting
The application routes are now split:
- **Homepage**: `/` (Hero, Showcase, Components, etc.)
- **Docs**: `/docs` (ComponentLibraryPage - lazy loaded)
- **Blog**: `/blog` (BlogPage - lazy loaded)
- **Contact**: `/contact` (ContactPage - lazy loaded)

Each page is loaded on-demand, reducing initial bundle size.

### 4. CSS Optimization
- Inline critical CSS in `index.html` (box-sizing reset, scroll behavior)
- CSS code splitting for per-route stylesheets
- CSS custom properties for theming reduce style overrides

## Network & Caching

### Static Assets
- All files in `public/` are served with long-term caching headers (handled by server)
- Use hash-based filenames for cache busting on new builds

### Recommendations for Deployment
1. Configure your server to serve:
   - `js/*.js` with `Cache-Control: max-age=31536000, immutable` (1 year)
   - `css/*.css` with `Cache-Control: max-age=31536000, immutable` (1 year)
   - `html` files with `Cache-Control: max-age=3600, must-revalidate` (1 hour)
   - `robots.txt` and `sitemap.xml` with `Cache-Control: max-age=86400` (1 day)

2. Enable gzip compression on your server
3. Consider using a CDN for static assets
4. Enable browser caching via appropriate headers

## Bundle Analysis
To analyze bundle sizes:
```bash
npm run build  # Creates dist-homepage/
```

## Future Optimization Opportunities
1. **Image Optimization**:
   - Convert images to WebP format
   - Use responsive image sizes with srcset
   - Implement progressive image loading

2. **Code Optimization**:
   - Tree-shaking unused code
   - Component-level code splitting
   - Dynamic imports for heavy dependencies

3. **Performance Monitoring**:
   - Add Core Web Vitals tracking
   - Monitor JavaScript execution time
   - Track First Contentful Paint (FCP) and Largest Contentful Paint (LCP)

4. **Service Workers**:
   - Implement service worker for offline support
   - Cache static assets aggressively
   - Implement stale-while-revalidate pattern

## Accessibility & SEO
- Semantic HTML with proper heading hierarchy
- Alt text on all images (via LazyImage)
- Form labels and ARIA attributes
- Dark mode support with proper color contrast
- Mobile responsive design
