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
> ```

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
import '@getufy/flint-ui/theme.css';       // Light theme
import '@getufy/flint-ui/theme-dark.css';   // Dark theme
```

## React

Looking for React wrappers? See [`@getufy/flint-ui-react`](https://www.npmjs.com/package/@getufy/flint-ui-react).

## License

[MIT](https://github.com/getufy/flint-ui/blob/main/LICENSE)
