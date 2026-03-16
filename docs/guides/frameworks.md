# Framework Integration

Flint UI components are standard web components and work in any framework. This guide covers framework-specific configuration.

## Vue

Vue 3 needs to know that `flint-*` tags are custom elements so it does not try to resolve them as Vue components.

### Vite (`vite.config.ts`)

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('flint-'),
        },
      },
    }),
  ],
});
```

### Usage

```vue
<script setup>
import '@getufy/flint-ui/theme.css';
import '@getufy/flint-ui';
</script>

<template>
  <flint-button variant="contained" @flint-button-click="handleClick">
    Click me
  </flint-button>
</template>
```

### Typed Events

Vue's `v-on` / `@` directive works with custom events out of the box. Event detail is available via `$event.detail`:

```vue
<flint-input @flint-input-change="(e) => value = e.detail.value" />
```

## Angular

Add `CUSTOM_ELEMENTS_SCHEMA` to the module or component that uses Flint UI elements:

### Standalone Components (Angular 14+)

```ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@getufy/flint-ui';

@Component({
  selector: 'app-root',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <flint-button variant="contained" (flint-button-click)="onClick()">
      Click me
    </flint-button>
  `,
})
export class AppComponent {
  onClick() {
    console.log('clicked');
  }
}
```

### NgModule-based

```ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

### Theme CSS

Import the theme in `styles.css` or `angular.json`:

```css
/* styles.css */
@import '@getufy/flint-ui/theme.css';
```

## Svelte

Svelte has built-in support for custom elements. No special configuration is needed.

### Usage

```svelte
<script>
  import '@getufy/flint-ui/theme.css';
  import '@getufy/flint-ui';

  let value = '';
</script>

<flint-input
  placeholder="Type here..."
  on:flint-input-change={(e) => value = e.detail.value}
/>
<p>Value: {value}</p>
```

### Svelte 5

In Svelte 5, custom element events use the `on` prefix with the `onflint-*` pattern:

```svelte
<flint-button
  variant="contained"
  onflint-button-click={() => console.log('clicked')}
>
  Click me
</flint-button>
```

## CDN / Vanilla HTML

For projects without a build tool, load Flint UI from a CDN:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@getufy/flint-ui/src/theme.css">
  <script src="https://cdn.jsdelivr.net/npm/@getufy/flint-ui/dist/flint-ui.iife.min.js"></script>
</head>
<body>
  <flint-button variant="contained">Hello</flint-button>
</body>
</html>
```

All components and exports are available under the `FlintUI` global variable.
