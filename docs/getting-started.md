# Getting Started

## Installation

Install the core package and its peer dependency:

```bash
npm install @getufy/flint-ui lit
```

### React

```bash
npm install @getufy/flint-ui-react @getufy/flint-ui lit
```

## Setup

Import the theme CSS in your app's entry point:

```js
import '@getufy/flint-ui/theme.css';
```

For dark mode support, also import the dark theme:

```js
import '@getufy/flint-ui/theme-dark.css';
```

Then add the `flint-theme-dark` class to `<html>` or any container element to activate dark mode.

## Usage

### Web Components (vanilla)

Import and use components directly:

```html
<script type="module">
  import '@getufy/flint-ui/button/flint-button';
  import '@getufy/flint-ui/card/flint-card';
</script>

<flint-card>
  <flint-button variant="primary">Click me</flint-button>
</flint-card>
```

Or import from the barrel for convenience (less tree-shakeable):

```js
import { FlintButton, FlintCard } from '@getufy/flint-ui';
```

::: info Sub-component Registration
Composite components auto-register their children via `static dependencies`.
For example, importing `flint-dialog` also registers `flint-dialog-title`, `flint-dialog-content`,
and `flint-dialog-actions` — no extra imports needed.
:::

### React

```tsx
import { FlintButton, FlintCard } from '@getufy/flint-ui-react';

function App() {
  return (
    <FlintCard>
      <FlintButton variant="primary">Click me</FlintButton>
    </FlintCard>
  );
}
```

See the [React integration guide](/react) for event handling, refs, and TypeScript details.

::: tip React Users
Always use `@getufy/flint-ui-react` for React projects — it provides typed event handlers,
proper boolean attribute handling, and eliminates manual `addEventListener` calls.
:::

## Theming

Override CSS custom properties to customize the look:

```css
:root {
  --flint-primary-color: #8b5cf6;
  --flint-text-color: #1e293b;
  --flint-font-family: 'Inter', system-ui;
  --flint-border-radius-md: 8px;
}
```

See [Theming](/theming) for the full list of tokens.

## TypeScript

Flint UI ships type declarations out of the box. No additional `@types/` packages are needed.

For custom element type checking in HTML templates, the package provides `HTMLElementTagNameMap` augmentations so `document.querySelector('flint-button')` returns the correct type automatically.

## Explore Components

- Browse the [component docs](/components/button) in the sidebar
- Try the [live Storybook](https://getufy.github.io/flint-ui/storybook/) for interactive examples
