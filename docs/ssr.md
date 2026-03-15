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

The official `@astrojs/lit` integration was deprecated in Astro 5. Flint UI components can still be used in Astro via client-side `<script>` tags:

```astro
<flint-button>Click me</flint-button>

<script>
  import '@getufy/flint-ui/button/flint-button';
</script>
```

For SSR, you would need a custom integration using `@lit-labs/ssr` directly.

### Remix

No official Lit SSR integration exists for Remix. Components render as empty custom element tags on the server and hydrate on the client. For progressive enhancement, this is often acceptable since Remix's loader provides the data and the component shells are visible.

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

## Best Practices

1. **Set `lang` on format components** for deterministic SSR output
2. **Import individual components**, not the barrel `index.ts` — this keeps server bundles small
3. **Test SSR output** for critical components using `@lit-labs/ssr`'s `render()` + `collectResult()`
4. **Don't rely on `isServer` from Lit** for browser detection in jsdom test environments — use `typeof document !== 'undefined'` instead
5. **Keep Lit external** in your build output — do not bundle Lit into your component dist (Flint UI already does this via `rolldownOptions.external: [/^lit/]`)
