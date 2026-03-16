# Using Flint UI with Next.js

This guide covers how to use `@getufy/flint-ui-react` in a Next.js application with server-side rendering (SSR).

## Installation

```bash
npm install @getufy/flint-ui @getufy/flint-ui-react
```

## The `'use client'` Directive

Web components rely on browser APIs (`customElements`, `HTMLElement`, shadow DOM) that are not available during server-side rendering. All components from `@getufy/flint-ui-react` must be used inside client components.

Add the `'use client'` directive at the top of any file that imports Flint UI components:

```tsx
'use client';

import { FlintButton } from '@getufy/flint-ui-react';

export function MyComponent() {
  return <FlintButton variant="contained">Click me</FlintButton>;
}
```

## Dynamic Imports for SSR Safety

If you need to render a Flint UI component inside a page that is server-rendered, use Next.js `dynamic()` with `ssr: false` to defer loading to the client:

```tsx
import dynamic from 'next/dynamic';

const FlintButton = dynamic(
  () => import('@getufy/flint-ui-react').then((mod) => mod.FlintButton),
  { ssr: false }
);

export default function Page() {
  return <FlintButton variant="contained">Click me</FlintButton>;
}
```

This approach works for both the App Router and the Pages Router.

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

import { FlintInput } from '@getufy/flint-ui-react';

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

- **Hydration mismatch**: If a Flint UI component renders differently on server vs. client, use `dynamic(..., { ssr: false })` to skip SSR for that component.
- **Missing styles**: Ensure the theme CSS is imported in a layout or `_app` file, not inside a client component that may be lazy-loaded.
- **TypeScript**: Event types are exported from `@getufy/flint-ui` (e.g., `FlintInputChangeEvent`) for type-safe event handlers.
