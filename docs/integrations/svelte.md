# Using Flint UI with Svelte

This guide covers how to use `@getufy/flint-ui` web components in Svelte (4 and 5) and SvelteKit applications.

## Installation

```bash
npm install @getufy/flint-ui lit
```

No additional configuration is needed. Svelte has built-in support for custom elements and will pass properties and listen to events on unknown HTML tags automatically.

## Theme Setup

Import the theme CSS in your root layout or entry point.

### SvelteKit (`src/routes/+layout.svelte`)

```svelte
<script>
  import '@getufy/flint-ui/theme.css';
  // Optional: dark mode
  // import '@getufy/flint-ui/theme-dark.css';
</script>

<slot />
```

### Vite + Svelte (`src/App.svelte` or `src/main.ts`)

```ts
// main.ts
import '@getufy/flint-ui/theme.css';
import App from './App.svelte';

const app = new App({ target: document.getElementById('app')! });
export default app;
```

## Basic Usage

Import components and use them directly in your template:

```svelte
<script>
  import '@getufy/flint-ui/button/flint-button';
  import '@getufy/flint-ui/card/flint-card';
</script>

<flint-card>
  <h2>Hello from Svelte</h2>
  <flint-button variant="contained">Click me</flint-button>
</flint-card>
```

## Props and Attributes

Bind props using standard Svelte syntax:

```svelte
<script>
  import '@getufy/flint-ui/button/flint-button';

  let variant = 'contained';
  let isDisabled = false;
</script>

<flint-button {variant} disabled={isDisabled}>
  Submit
</flint-button>
```

For object or array properties, Svelte sets them as JavaScript properties automatically when you use the binding syntax:

```svelte
<script>
  import '@getufy/flint-ui/select/flint-select';

  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
  ];
</script>

<flint-select label="Fruit" {options} />
```

## Event Handling

### Svelte 4

Use the `on:` directive with the full event name:

```svelte
<script>
  import '@getufy/flint-ui/button/flint-button';
  import '@getufy/flint-ui/input/flint-input';

  let value = '';

  function handleClick() {
    console.log('Button clicked');
  }

  function handleChange(e) {
    value = e.detail.value;
  }
</script>

<flint-button variant="contained" on:flint-button-click={handleClick}>
  Click me
</flint-button>

<flint-input
  placeholder="Type here..."
  on:flint-input-change={handleChange}
/>
<p>Value: {value}</p>
```

### Svelte 5

Svelte 5 replaces `on:` directives with callback props. For custom element events, use the `on` prefix followed by the event name:

```svelte
<script>
  import '@getufy/flint-ui/button/flint-button';
  import '@getufy/flint-ui/input/flint-input';

  let value = $state('');
</script>

<flint-button
  variant="contained"
  onflint-button-click={() => console.log('clicked')}
>
  Click me
</flint-button>

<flint-input
  placeholder="Type here..."
  onflint-input-change={(e) => value = e.detail.value}
/>
<p>Value: {value}</p>
```

## Two-Way Binding

Svelte's `bind:value` does not work with custom elements that use non-standard event names. Use the manual pattern:

```svelte
<script>
  import '@getufy/flint-ui/input/flint-input';

  let name = '';
</script>

<flint-input
  value={name}
  on:flint-input-change={(e) => name = e.detail.value}
/>
<p>Hello, {name}</p>
```

## Accessing Component Methods

Use `bind:this` to get a reference to the custom element:

```svelte
<script>
  import '@getufy/flint-ui/dialog/flint-dialog';

  let dialogEl;

  function openDialog() {
    dialogEl?.show();
  }
</script>

<button on:click={openDialog}>Open Dialog</button>
<flint-dialog bind:this={dialogEl}>
  <p>Dialog content</p>
</flint-dialog>
```

## Theming

Override CSS custom properties in a global stylesheet or a `<style>` block:

```svelte
<style>
  :global(:root) {
    --flint-primary-color: #8b5cf6;
    --flint-font-family: 'Inter', system-ui;
  }
</style>
```

Or scope to a single instance:

```svelte
<flint-button style="--flint-primary-color: #8b5cf6">
  Purple
</flint-button>
```

## SvelteKit SSR Considerations

Web components require browser APIs (`customElements`, `HTMLElement`, shadow DOM) that are unavailable during server-side rendering. SvelteKit renders pages on the server by default, so Flint UI components need to be loaded only on the client.

### Dynamic Imports with `onMount`

Import Flint UI components inside `onMount`, which only runs in the browser:

```svelte
<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  onMount(async () => {
    await import('@getufy/flint-ui/button/flint-button');
    await import('@getufy/flint-ui/card/flint-card');
  });
</script>

{#if browser}
  <flint-card>
    <flint-button variant="contained">Click me</flint-button>
  </flint-card>
{/if}
```

### Disable SSR Per-Page

For pages that are primarily Flint UI, disable SSR at the page level:

```ts
// src/routes/dashboard/+page.ts
export const ssr = false;
```

This allows you to import Flint UI components normally in that page without worrying about server-side errors.

### Wrapper Component

Create a reusable client-only wrapper:

```svelte
<!-- src/lib/ClientOnly.svelte -->
<script>
  import { onMount } from 'svelte';

  let mounted = false;
  onMount(() => { mounted = true; });
</script>

{#if mounted}
  <slot />
{/if}
```

```svelte
<script>
  import ClientOnly from '$lib/ClientOnly.svelte';
  import '@getufy/flint-ui/button/flint-button';
</script>

<ClientOnly>
  <flint-button variant="contained">Click me</flint-button>
</ClientOnly>
```

## TypeScript

Flint UI ships type declarations and `HTMLElementTagNameMap` augmentations. Import typed events from the core package:

```svelte
<script lang="ts">
  import '@getufy/flint-ui/input/flint-input';
  import type { FlintInputChangeEvent } from '@getufy/flint-ui';

  let value = '';

  function handleChange(e: FlintInputChangeEvent) {
    value = e.detail.value;
  }
</script>

<flint-input on:flint-input-change={handleChange} />
```
