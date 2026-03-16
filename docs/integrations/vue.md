# Using Flint UI with Vue 3

This guide covers how to use `@getufy/flint-ui` web components in a Vue 3 application, including Nuxt 3.

## Installation

```bash
npm install @getufy/flint-ui lit
```

## Configure Custom Elements

Vue needs to know that `flint-*` tags are custom elements so it does not try to resolve them as Vue components. Without this configuration, Vue will log warnings in the console.

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

### Nuxt 3 (`nuxt.config.ts`)

```ts
export default defineNuxtConfig({
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('flint-'),
    },
  },
});
```

## Theme Setup

Import the theme CSS in your app entry point.

### Vite (`main.ts`)

```ts
import { createApp } from 'vue';
import '@getufy/flint-ui/theme.css';
// Optional: dark mode
// import '@getufy/flint-ui/theme-dark.css';
import App from './App.vue';

createApp(App).mount('#app');
```

### Nuxt 3 (`nuxt.config.ts`)

```ts
export default defineNuxtConfig({
  css: ['@getufy/flint-ui/theme.css'],
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('flint-'),
    },
  },
});
```

## Basic Usage

Import components in a `<script setup>` block and use them directly in templates:

```vue
<script setup lang="ts">
import '@getufy/flint-ui/button/flint-button';
import '@getufy/flint-ui/card/flint-card';
</script>

<template>
  <flint-card>
    <h2>Hello from Vue</h2>
    <flint-button variant="contained">Click me</flint-button>
  </flint-card>
</template>
```

## Props and Attributes

Bind properties and attributes using Vue's standard syntax. Use `v-bind` (`:`) for dynamic values:

```vue
<script setup lang="ts">
import '@getufy/flint-ui/button/flint-button';
import { ref } from 'vue';

const isDisabled = ref(false);
const variant = ref<'contained' | 'outlined' | 'text'>('contained');
</script>

<template>
  <flint-button :variant="variant" :disabled="isDisabled">
    Submit
  </flint-button>
</template>
```

For object or array properties (e.g., `options` on `flint-select`), use `.prop` binding to set the JavaScript property directly instead of the HTML attribute:

```vue
<template>
  <flint-select
    label="Fruit"
    .options="[
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
    ]"
  />
</template>
```

Or more commonly with a ref:

```vue
<script setup lang="ts">
import '@getufy/flint-ui/select/flint-select';
import { ref } from 'vue';

const options = ref([
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
]);
</script>

<template>
  <flint-select label="Fruit" :options="options" />
</template>
```

## Event Handling

Flint UI components emit `CustomEvent`s with a `flint-` prefix. Use Vue's `@` directive to listen:

```vue
<script setup lang="ts">
import '@getufy/flint-ui/button/flint-button';
import '@getufy/flint-ui/input/flint-input';

function handleClick() {
  console.log('Button clicked');
}

function handleChange(e: CustomEvent) {
  console.log('Value:', e.detail.value);
}
</script>

<template>
  <flint-button @flint-button-click="handleClick">
    Click me
  </flint-button>

  <flint-input
    placeholder="Type here..."
    @flint-input-change="handleChange"
  />
</template>
```

Access the event detail payload via `$event.detail` in inline handlers:

```vue
<template>
  <flint-input @flint-input-change="(e) => value = e.detail.value" />
</template>
```

## Two-Way Binding

Vue's `v-model` does not work directly with custom elements that emit non-standard events. Use a manual pattern instead:

```vue
<script setup lang="ts">
import '@getufy/flint-ui/input/flint-input';
import { ref } from 'vue';

const name = ref('');
</script>

<template>
  <flint-input
    :value="name"
    @flint-input-change="(e) => name = e.detail.value"
  />
  <p>Hello, {{ name }}</p>
</template>
```

For a reusable pattern, create a composable:

```ts
// composables/useFlintModel.ts
import { ref, watch, type Ref } from 'vue';

export function useFlintModel(initial = '') {
  const value = ref(initial);
  const onUpdate = (e: CustomEvent) => {
    value.value = e.detail.value;
  };
  return { value, onUpdate };
}
```

```vue
<script setup lang="ts">
import '@getufy/flint-ui/input/flint-input';
import { useFlintModel } from '@/composables/useFlintModel';

const { value: name, onUpdate: onNameChange } = useFlintModel('');
</script>

<template>
  <flint-input :value="name" @flint-input-change="onNameChange" />
</template>
```

## Accessing Component Methods

Use template refs to call methods on the underlying custom element:

```vue
<script setup lang="ts">
import '@getufy/flint-ui/dialog/flint-dialog';
import { ref } from 'vue';

const dialogRef = ref<HTMLElement | null>(null);

function openDialog() {
  (dialogRef.value as any)?.show();
}
</script>

<template>
  <button @click="openDialog">Open</button>
  <flint-dialog ref="dialogRef">
    <p>Dialog content</p>
  </flint-dialog>
</template>
```

## Theming

Override CSS custom properties in your global stylesheet or scoped styles:

```vue
<style>
:root {
  --flint-primary-color: #8b5cf6;
  --flint-font-family: 'Inter', system-ui;
}
</style>
```

Or scope to a single instance:

```vue
<template>
  <flint-button style="--flint-primary-color: #8b5cf6">
    Purple
  </flint-button>
</template>
```

## Nuxt 3 SSR Considerations

Web components rely on browser APIs (`customElements`, `HTMLElement`, shadow DOM) that are not available during server-side rendering. In Nuxt 3, wrap Flint UI components in a `<ClientOnly>` boundary:

```vue
<template>
  <ClientOnly>
    <flint-button variant="contained">Click me</flint-button>
  </ClientOnly>
</template>
```

For pages that are entirely client-rendered, you can also use the `.client.vue` suffix:

```
components/
  FlintForm.client.vue   <!-- Only rendered on the client -->
```

Alternatively, import components only on the client side using a Nuxt plugin:

```ts
// plugins/flint-ui.client.ts
import '@getufy/flint-ui';
```

The `.client.ts` suffix ensures the plugin runs only in the browser.

## TypeScript

Flint UI ships `HTMLElementTagNameMap` augmentations, so `document.querySelector('flint-button')` returns the correct type. Event types are exported from the core package:

```ts
import type { FlintInputChangeEvent } from '@getufy/flint-ui';

function handleChange(e: FlintInputChangeEvent) {
  console.log(e.detail.value);
}
```
