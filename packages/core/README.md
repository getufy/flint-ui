# @getufy/flint-ui

[![npm](https://img.shields.io/npm/v/@getufy/flint-ui)](https://www.npmjs.com/package/@getufy/flint-ui)
[![license](https://img.shields.io/npm/l/@getufy/flint-ui)](https://github.com/getufy/flint-ui/blob/main/LICENSE)

A modern, lightweight web component library built with [Lit](https://lit.dev). 50+ components for building rich UIs — works with any framework.

## Installation

```bash
npm install @getufy/flint-ui lit
```

## Resources

- **[Documentation](https://getufy.github.io/flint-ui/)** — full component docs, guides, and examples
- **[Live Storybook](https://getufy.github.io/flint-ui/storybook/)** — interactive component playground
- **[React wrappers](https://www.npmjs.com/package/@getufy/flint-ui-react)** — `@getufy/flint-ui-react` for React projects

## Getting Started

> **Required:** Import the theme CSS once in your app entry point. Without this, components render unstyled.
>
> ```js
> import '@getufy/flint-ui/theme.css';
> import '@getufy/flint-ui/theme-dark.css';  // Required for dark mode support
> ```
>
> If you omit `theme.css`, components render with no spacing, colors, or typography.
> If you omit `theme-dark.css`, dark mode will not work.
> In development, a console warning will alert you if theme CSS is missing.

## Suppress Dev Warnings

In development, Lit prints a console warning about running in dev mode. To silence it, add this import **before any component imports**:

```js
// Must come before any @getufy/flint-ui imports
import '@getufy/flint-ui/suppress-warnings';
```

## Usage

```html
<script type="module">
  import '@getufy/flint-ui/button/flint-button';
</script>

<flint-button variant="contained" color="primary">Click me</flint-button>
```

Or import the full bundle:

```js
import { FlintButton, FlintTabs, FlintDialog } from '@getufy/flint-ui';
```

### Tree-shakeable imports

```js
import '@getufy/flint-ui/tabs/flint-tabs';
import '@getufy/flint-ui/dialog/flint-dialog';
import '@getufy/flint-ui/date-picker/flint-date-picker';
```

## Components

**Inputs:** Button, Checkbox, Input, Radio, Rating, Select, Slider, Switch, Textarea, Toggle, Autocomplete, Input OTP, Date Picker, Date Range Picker, Time Picker, Transfer List

**Data Display:** Avatar, Badge, Chip, Divider, Item, List, Table, Tooltip, Typography, Kbd, Empty, Carousel

**Feedback:** Alert, Dialog, Progress, Skeleton, Snackbar, Sonner, Backdrop

**Surfaces:** Accordion, App Bar, Card, Paper

**Navigation:** Bottom Navigation, Breadcrumbs, Drawer, Link, Menu, Menubar, Navigation Menu, Pagination, Speed Dial, Stepper, Tabs

**Layout:** Box, Container, Grid, Stack, Image List, Split Panel, Resizable, Scroll Area

**Utilities:** Collapsible, Command, Copy Button, Hover Card, Image Comparer, Tree View, Relative Time, Format Date, Format Number, Visually Hidden

## Theming

```css
:root {
  --flint-primary-color: #3b82f6;
  --flint-text-color: #111827;
  --flint-font-family: system-ui, sans-serif;
}
```

```js
import '@getufy/flint-ui/theme.css';       // Light theme (required)
import '@getufy/flint-ui/theme-dark.css';   // Dark theme
```

### Dark Mode

The dark theme CSS includes a `@media (prefers-color-scheme: dark)` block that auto-applies dark mode based on the user's OS preference. To manually control the mode:

```js
// Force dark mode
document.documentElement.setAttribute('data-theme', 'dark');

// Force light mode (overrides OS dark preference)
document.documentElement.setAttribute('data-theme', 'light');
```

Or use `<flint-theme mode="dark">` / `<flint-theme mode="light">` as a wrapper component — when placed at the root level (direct child of `<body>`), it automatically sets `data-theme` on the document element.

### CSS Custom Properties

All components use `--flint-*` prefixed CSS custom properties. Key tokens:

| Token | Default | Description |
|-------|---------|-------------|
| `--flint-primary-color` | `#3b82f6` | Primary brand color |
| `--flint-text-color` | `#111827` | Default text color |
| `--flint-font-family` | `system-ui` | Font stack |
| `--flint-background` | `#ffffff` | Page background |
| `--flint-surface-background` | `#ffffff` | Card/surface background |

Components expose per-component overrides (e.g., `--flint-chip-bg`, `--flint-chip-color`, `--flint-avatar-bg`). See each component's JSDoc `@cssprop` annotations.

### CSS Parts

Components expose `::part()` selectors for styling Shadow DOM internals. Common parts:

| Part | Components | Description |
|------|-----------|-------------|
| `base` | Most components | Outermost wrapper |
| `input` | Input, Textarea, Select | Native input element |
| `label` | Input, Textarea, Select | Label element |
| `title` | CardHeader | Title element |
| `content` | CardHeader, AccordionSummary | Content container |

## Events

All custom events use the `flint-` prefix and follow the pattern `flint-[component]-[action]`:

| Component | Event | Detail |
|-----------|-------|--------|
| Input | `flint-input-input` | `{ value: string }` |
| Input | `flint-input-change` | `{ value: string }` |
| Select | `flint-select-change` | `{ value, multiple }` |
| Dialog | `flint-dialog-close` | `{ open: false }` |
| Dialog | `flint-dialog-open` | `{ open: true }` |
| Tabs | `flint-tabs-change` | `{ value: string }` |
| Switch | `flint-switch-change` | `{ checked: boolean }` |
| Pagination | `flint-pagination-change` | `{ page: number }` |
| Drawer | `flint-drawer-close` | `{ open: false }` |

> **Timing:** `flint-input-input` fires on every keystroke. `flint-input-change` fires on blur.

## React

Looking for React wrappers? See [`@getufy/flint-ui-react`](https://www.npmjs.com/package/@getufy/flint-ui-react).

## License

[MIT](https://github.com/getufy/flint-ui/blob/main/LICENSE)
