# Using Flint UI with Next.js

This guide covers how to use `@getufy/flint-ui-react` in a Next.js application with server-side rendering (SSR).

## Installation

```bash
npm install @getufy/flint-ui @getufy/flint-ui-react
```

## The `'use client'` Directive

Web components rely on browser APIs (`customElements`, `HTMLElement`, shadow DOM) that are not available during server-side rendering. All components from `@getufy/flint-ui-react` must be used inside Client Components.

Add the `'use client'` directive at the top of any file that imports Flint UI components:

```tsx
'use client';

import { FlintButton } from '@getufy/flint-ui-react/button';

export function MyComponent() {
  return <FlintButton variant="contained">Click me</FlintButton>;
}
```

### Why is `'use client'` required?

Next.js App Router renders components as Server Components by default. Server Components execute on the server where `customElements`, `HTMLElement`, and the shadow DOM API do not exist. The `'use client'` directive tells Next.js to render the component in the browser, where web component APIs are available.

Any component that _imports_ a `'use client'` module automatically becomes a Client Component itself, so you only need the directive in the file that directly imports Flint UI.

## Client-Only Wrapper Pattern

Instead of adding `'use client'` to every file that uses Flint UI, create a single re-export file:

```tsx
// components/flint-client.tsx
'use client';

// Re-export only the components your app uses (tree-shaking friendly)
export { FlintButton } from '@getufy/flint-ui-react/button';
export { FlintInput } from '@getufy/flint-ui-react/input';
export { FlintSelect, FlintOption } from '@getufy/flint-ui-react/select';
export { FlintDialog } from '@getufy/flint-ui-react/dialog';
export { FlintTabs, FlintTab, FlintTabPanel } from '@getufy/flint-ui-react/tabs';
```

Then import from this wrapper anywhere in your app:

```tsx
// app/dashboard/page.tsx (Server Component — no 'use client' needed here)
import { FlintButton, FlintInput } from '@/components/flint-client';

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <SearchBar />
    </div>
  );
}

// This becomes a Client Component automatically because it uses FlintInput
function SearchBar() {
  return <FlintInput placeholder="Search..." />;
}
```

## Dynamic Imports for SSR Safety

If you need to completely skip server-side rendering for a component (e.g., it measures the viewport or uses `IntersectionObserver` at mount time), use Next.js `dynamic()` with `ssr: false`:

```tsx
import dynamic from 'next/dynamic';

const FlintCarousel = dynamic(
  () => import('@getufy/flint-ui-react/carousel').then((mod) => mod.FlintCarousel),
  {
    ssr: false,
    loading: () => <div style={{ height: 300 }}>Loading...</div>,
  }
);

export default function Page() {
  return <FlintCarousel>{/* slides */}</FlintCarousel>;
}
```

This approach works for both the App Router and the Pages Router. Use it sparingly -- most Flint components work fine with `'use client'` alone. Reserve `dynamic()` for components that:
- Access `window.innerWidth` / `ResizeObserver` at mount time (e.g., `FlintCarousel`, `FlintSplitPanel`)
- Use `IntersectionObserver` or `MutationObserver` immediately
- Cause hydration mismatch warnings

## Theme Setup

### App Router (`app/layout.tsx`)

Import the theme CSS in your root layout:

```tsx
import '@getufy/flint-ui/theme.css';
// Optional: dark theme
// import '@getufy/flint-ui/theme-dark.css';
// Optional: color palettes
// import '@getufy/flint-ui/theme-teal.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Pages Router (`pages/_app.tsx`)

```tsx
import '@getufy/flint-ui/theme.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

## Programmatic Theme Switching

Use the `setFlintTheme` utility for runtime theme changes:

```tsx
'use client';

import { setFlintTheme } from '@getufy/flint-ui';

export function ThemeToggle() {
  return (
    <button onClick={() => setFlintTheme({ mode: 'dark' })}>
      Toggle Dark Mode
    </button>
  );
}
```

## Event Handling

React wrappers from `@getufy/flint-ui-react` map custom events to React-style callbacks:

```tsx
'use client';

import { FlintInput } from '@getufy/flint-ui-react/input';

export function SearchInput() {
  return (
    <FlintInput
      placeholder="Search..."
      onFlintInputChange={(e) => console.log(e.detail.value)}
    />
  );
}
```

## Suppress Lit Dev Warnings (Optional)

Lit emits development-mode warnings in the browser console. To suppress them:

```tsx
// app/layout.tsx or pages/_app.tsx
import '@getufy/flint-ui/suppress-warnings';
```

## Common Pitfalls

### Hydration mismatch

Web components render as empty `<flint-button></flint-button>` tags on the server. On the client, the custom element upgrades and renders its shadow DOM. This mismatch can cause React hydration warnings. Solutions:

1. Use `'use client'` (recommended) -- the component only renders on the client after hydration
2. Use `dynamic(..., { ssr: false })` -- completely skip SSR for that component
3. Provide a `loading` fallback with `dynamic()` to avoid layout shift

### Missing styles

Ensure the theme CSS is imported in a layout or `_app` file, not inside a client component that may be lazy-loaded:

```tsx
// app/layout.tsx -- correct: imported at the root
import '@getufy/flint-ui/theme.css';
```

### Custom element registration timing

`customElements.define()` runs when a component module is first imported. If the HTML tag `<flint-button>` appears in the DOM before the module loads, it renders as an unknown element until the definition is registered. This is normal and expected -- the element "upgrades" once the import executes.

To avoid a flash of unstyled content (FOUC), ensure component imports are in your app bundle (not lazy-loaded after render):

```tsx
'use client';

// These imports register the custom elements synchronously
import { FlintButton } from '@getufy/flint-ui-react/button';
import { FlintInput } from '@getufy/flint-ui-react/input';
```

### `window` / `document` access

All Flint UI components guard browser API access inside lifecycle methods (`connectedCallback`, `firstUpdated`, etc.), so importing them at the module level is safe on the server. However, do not call component methods or access DOM properties outside of React effects:

```tsx
'use client';

import { useRef, useEffect } from 'react';
import { FlintDialog } from '@getufy/flint-ui-react/dialog';

function MyDialog() {
  const ref = useRef(null);

  useEffect(() => {
    // Safe: runs only on the client
    ref.current?.show();
  }, []);

  return <FlintDialog ref={ref}>Content</FlintDialog>;
}
```

### TypeScript

Event types are exported from `@getufy/flint-ui` (e.g., `FlintInputChangeEvent`) for type-safe event handlers:

```tsx
import type { FlintSelectChangeEvent } from '@getufy/flint-ui';

<FlintSelect onFlintSelectChange={(e: FlintSelectChangeEvent) => {
  console.log(e.detail.value);
}} />
```
