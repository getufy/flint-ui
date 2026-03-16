# Server-Side Rendering (SSR)

Flint UI supports server-side rendering via [Lit SSR](https://lit.dev/docs/ssr/overview/) and [Declarative Shadow DOM](https://web.dev/articles/declarative-shadow-dom) (DSD). This enables components to render meaningful HTML on the server, improving First Contentful Paint and SEO.

## Status

Lit SSR (`@lit-labs/ssr`) is still an experimental Lit Labs package. Flint UI's SSR support should be considered **early-stage** — the core components render correctly, but edge cases may exist.

**Declarative Shadow DOM** has ~96% global browser support (Chrome 111+, Safari 16.4+, Firefox 123+, Edge 111+).

## Quick Start

Install the SSR package:

```bash
npm install @lit-labs/ssr
```

Render a component on the server:

```js
import '@lit-labs/ssr/lib/install-global-dom-shim.js';
import { render } from '@lit-labs/ssr';
import { collectResult } from '@lit-labs/ssr/lib/render-result.js';
import { html } from 'lit';

// Import the components you need
import '@getufy/flint-ui/button/flint-button';
import '@getufy/flint-ui/card/flint-card';

const template = html`
  <flint-card>
    <h2>Hello from the server</h2>
    <flint-button>Click me</flint-button>
  </flint-card>
`;

const result = render(template);
const htmlString = await collectResult(result);
// htmlString contains the full HTML with <template shadowrootmode="open">
```

## Framework Integration

### Next.js

Use `@lit-labs/nextjs` for Pages Router integration:

```bash
npm install @lit-labs/nextjs @lit-labs/ssr-react
```

```js
// next.config.js
const withLitSSR = require('@lit-labs/nextjs')();
module.exports = withLitSSR({ /* your config */ });
```

**Limitation:** Does NOT work with Next.js App Router / Server Components. Lit components must be rendered beyond the `'use client'` boundary.

### Astro

The official `@astrojs/lit` integration was deprecated in Astro 5. Flint UI components can be used in Astro in two ways:

**Vanilla web components** with a client-side `<script>` tag:

```astro
<flint-button>Click me</flint-button>

<script>
  import '@getufy/flint-ui/button/flint-button';
</script>
```

**React wrappers** with `client:only="react"` (requires `@astrojs/react`):

```astro
---
import { FlintButton } from '@getufy/flint-ui-react/button';
---
<FlintButton client:only="react">Click me</FlintButton>
```

The `client:only="react"` directive ensures the component is never rendered on the server -- it is mounted exclusively in the browser. This avoids any SSR-related issues with custom element registration.

For vanilla Lit components (not wrapped in React), you can use `client:only="lit"` if you add a custom Lit integration, but the `<script>` approach above is simpler and recommended.

### Remix

No official Lit SSR integration exists for Remix. Components render as empty custom element tags on the server and hydrate on the client. Use the `ClientOnly` wrapper from `remix-utils` to prevent server rendering and provide a fallback:

```bash
npm install remix-utils
```

```tsx
// app/routes/dashboard.tsx
import { ClientOnly } from 'remix-utils/client-only';
import { FlintButton } from '@getufy/flint-ui-react/button';
import { FlintInput } from '@getufy/flint-ui-react/input';

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <ClientOnly fallback={<input placeholder="Search..." />}>
        {() => <FlintInput placeholder="Search..." />}
      </ClientOnly>
      <ClientOnly fallback={<button>Submit</button>}>
        {() => <FlintButton>Submit</FlintButton>}
      </ClientOnly>
    </div>
  );
}
```

For Remix v2 with Vite, ensure Flint UI packages are not externalized by the server bundle. Add them to `serverDependenciesToBundle` in `remix.config.js` if you encounter import errors:

```js
// remix.config.js
export default {
  serverDependenciesToBundle: [/@getufy\/flint-ui/, /lit/],
};
```

## DSD Polyfill

For browsers without Declarative Shadow DOM support (< 4% of users), add this polyfill before your closing `</body>` tag:

```html
<script>
  if (!HTMLTemplateElement.prototype.hasOwnProperty('shadowRootMode')) {
    document.querySelectorAll('template[shadowrootmode]').forEach(t => {
      t.parentElement.attachShadow({ mode: t.getAttribute('shadowrootmode') })
        .append(t.content);
      t.remove();
    });
  }
</script>
```

## Known Limitations

### Viewport-dependent components

`flint-grid` and `flint-stack` use `window.innerWidth` and `getComputedStyle()` for responsive breakpoints. On the server, they default to **1200px** (the `lg` breakpoint). After hydration, the correct viewport width is used and the layout adjusts.

**Tip:** For critical above-the-fold layouts, set explicit breakpoint props to avoid layout shift:

```html
<!-- Explicit sizes avoid relying on viewport detection -->
<flint-grid container>
  <flint-grid xs="12" md="6">Sidebar</flint-grid>
  <flint-grid xs="12" md="6">Content</flint-grid>
</flint-grid>
```

### Locale-dependent components

`flint-format-date`, `flint-format-number`, and `flint-relative-time` resolve the locale from `document.documentElement.lang` and `navigator.language`. On the server, they default to **`'en'`** unless you set the `lang` attribute explicitly:

```html
<!-- Always set lang for deterministic SSR output -->
<flint-format-date date="2025-01-15" lang="fr"></flint-format-date>
<flint-format-number value="1234.5" lang="de"></flint-format-number>
```

### Components with overlays

Dialog, select dropdown, tooltip, hover card, and menu render in their **closed state** on the server. They become interactive after hydration.

### Autoloader

The autoloader (`@getufy/flint-ui/autoloader`) must NOT be imported on the server. It uses `MutationObserver` and `document.body`, which are browser-only. Import individual component modules instead:

```js
// Do this on the server:
import '@getufy/flint-ui/button/flint-button';
import '@getufy/flint-ui/card/flint-card';

// NOT this:
// import '@getufy/flint-ui/autoloader';
```

## Common SSR Pitfalls

### `window` / `document` are not available on the server

All Flint UI components guard DOM access inside lifecycle methods (`connectedCallback`, `firstUpdated`, etc.), so importing component modules on the server is safe. However, do not call browser-only APIs at the module level in your own code:

```tsx
// Bad: runs during SSR and crashes
const width = window.innerWidth;

// Good: guard with typeof check
const width = typeof window !== 'undefined' ? window.innerWidth : 1200;

// Good: use inside useEffect (React) or onMount (Svelte)
useEffect(() => {
  const width = window.innerWidth;
}, []);
```

### Custom element registration timing

`customElements.define()` is called when a component module is first imported. On the server, `customElements` does not exist (unless you use `@lit-labs/ssr`'s DOM shim), so the registration is a no-op. On the client:

- If the HTML tag (e.g., `<flint-button>`) appears in the DOM before the module is imported, it renders as an unknown element until the definition is registered ("custom element upgrade").
- Ensure component modules are imported early in your app bundle to minimize the flash of unstyled content.
- Never conditionally import a component module based on server/client detection -- always import it, and the registration will naturally run only on the client.

### Declarative Shadow DOM (DSD) support

Declarative Shadow DOM allows shadow roots to be expressed in HTML without JavaScript. Browser support is ~96% (Chrome 111+, Safari 16.4+, Firefox 123+). Flint UI does not currently ship pre-rendered DSD templates -- components hydrate from empty custom element shells. Full DSD support requires `@lit-labs/ssr`, which is still experimental.

For browsers without DSD support, see the [DSD polyfill](#dsd-polyfill) section above.

## Best Practices

1. **Set `lang` on format components** for deterministic SSR output
2. **Import individual components**, not the barrel `index.ts` — this keeps server bundles small
3. **Test SSR output** for critical components using `@lit-labs/ssr`'s `render()` + `collectResult()`
4. **Don't rely on `isServer` from Lit** for browser detection in jsdom test environments — use `typeof document !== 'undefined'` instead
5. **Keep Lit external** in your build output — do not bundle Lit into your component dist (Flint UI already does this via `rolldownOptions.external: [/^lit/]`)
