# FAQ & Troubleshooting

## Components not rendering

Make sure you've imported the component. Flint UI uses custom elements which must be registered before use:

```js
// Either import the side-effect registration:
import '@getufy/flint-ui/button/flint-button';

// Or import the class (which also registers the element):
import { FlintButton } from '@getufy/flint-ui';
```

If using a framework with SSR, ensure the import runs on the client side.

## Styles not applying

Import the theme CSS in your app's entry point:

```js
import '@getufy/flint-ui/theme.css';
```

Without this, CSS custom properties like `--flint-primary-color` won't have values and components will render with browser defaults.

## TypeScript errors

Ensure `lit` is in your `dependencies` (not just `devDependencies`), since Flint UI's types reference Lit types:

```bash
npm install lit
```

If you see "Cannot find module '@getufy/flint-ui'" errors, check that your `tsconfig.json` has `"moduleResolution": "bundler"` or `"node16"`.

## SSR support

Flint UI components use Shadow DOM and require a browser environment. For SSR frameworks (Next.js, Nuxt, Astro), render components on the client side only:

- **Next.js**: Use `'use client'` directive or dynamic imports with `{ ssr: false }`
- **Astro**: Use `client:only="lit"` directive
- **Nuxt**: Use `<ClientOnly>` wrapper

Full SSR via `@lit-labs/ssr` is not yet supported.

## How do I customize the theme?

Override any `--flint-*` CSS custom property. No build step required:

```css
:root {
  --flint-primary-color: #8b5cf6;
  --flint-border-radius-md: 8px;
}
```

See [Theming](/theming) for all available tokens. For dark mode, import `theme-dark.css` and add the `flint-theme-dark` class.

## Bundle size concerns

Use per-component imports for optimal tree-shaking:

```js
// Good — only loads button code
import '@getufy/flint-ui/button/flint-button';

// Larger — imports the entire library barrel
import { FlintButton } from '@getufy/flint-ui';
```

Check current bundle sizes with `npm run size` in the repository.

## Can I use Flint UI with Vue, Angular, or Svelte?

Yes. Flint UI components are standard web components and work in any framework. Use them like regular HTML elements:

**Vue:**
```vue
<template>
  <flint-button variant="primary" @flint-click="handleClick">
    Click me
  </flint-button>
</template>

<script setup>
import '@getufy/flint-ui/button/flint-button';
</script>
```

**Svelte:**
```svelte
<script>
  import '@getufy/flint-ui/button/flint-button';
</script>

<flint-button variant="primary" on:flint-click={handleClick}>
  Click me
</flint-button>
```

For React, use the dedicated `@getufy/flint-ui-react` package for better DX. See the [React guide](/react).

## How do I report a bug?

Open an issue on [GitHub](https://github.com/getufy/flint-ui/issues) using the bug report template.
