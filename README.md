# Flint UI Component Library

A comprehensive library of 70+ UI components built with [LitElement](https://lit.dev/) and [TypeScript](https://www.typescriptlang.org/), showcased with [Storybook](https://storybook.js.org/).

## Installation

```bash
npm install flint-ui lit
```

### React

```bash
npm install flint-ui-react flint-ui lit
```

## Usage

Import the full bundle:

```ts
import { FlintButton, FlintTabs } from 'flint-ui';
```

Or import individual components for better tree-shaking:

```ts
import 'flint-ui/button';
import 'flint-ui/tabs';
```

Apply the theme by importing the CSS:

```ts
import 'flint-ui/theme.css';
// optional dark mode
import 'flint-ui/theme-dark.css';
```

### React

```tsx
import { FlintButton, FlintTabs } from 'flint-ui-react';
```

## Components

### Inputs
`flint-autocomplete` `flint-checkbox` `flint-date-field` `flint-date-picker` `flint-date-range-picker` `flint-input` `flint-input-otp` `flint-radio` `flint-range-slider` `flint-rating` `flint-select` `flint-slider` `flint-switch` `flint-text-field` `flint-textarea` `flint-time-picker` `flint-toggle` `flint-toggle-button` `flint-transfer-list`

### Data Display
`flint-avatar` `flint-badge` `flint-carousel` `flint-chip` `flint-divider` `flint-format-date` `flint-format-number` `flint-image-list` `flint-item` `flint-kbd` `flint-list` `flint-relative-time` `flint-table` `flint-tooltip` `flint-tree-view` `flint-typography`

### Feedback
`flint-alert` `flint-backdrop` `flint-dialog` `flint-empty` `flint-progress` `flint-skeleton` `flint-snackbar` `flint-sonner`

### Surfaces
`flint-accordion` `flint-app-bar` `flint-card` `flint-paper`

### Navigation
`flint-bottom-navigation` `flint-breadcrumbs` `flint-button` `flint-command` `flint-drawer` `flint-fab` `flint-link` `flint-menu` `flint-menubar` `flint-navigation-menu` `flint-pagination` `flint-speed-dial` `flint-stepper` `flint-tabs`

### Layout
`flint-box` `flint-container` `flint-grid` `flint-resizable` `flint-scroll-area` `flint-split-panel` `flint-stack`

### Utilities
`flint-collapsible` `flint-copy-button` `flint-hover-card` `flint-image-comparer` `flint-visually-hidden`

## Theming

Override CSS custom properties to customize the look:

```css
:root {
  --flint-primary-color: #3b82f6;
  --flint-text-color: #111827;
  --flint-font-family: system-ui;
  --flint-border-radius-md: 6px;
}
```

See `theme.css` for the full list of tokens. Import `theme-dark.css` for dark mode support.

## Development

```bash
npm run storybook          # Start Storybook on port 6006
npm run build              # Build core + React packages
npm test                   # Unit tests (jsdom) + browser tests (Playwright)
npm run build-coverage     # Unit tests with coverage report
npm run lint               # ESLint (0 errors, 0 warnings)
npm run validate           # Type-check + lint + test
npm run gen:react          # Regenerate React wrappers
npm run docs:dev           # Start docs dev server
```

## Project Structure

```
packages/
  core/                          # Lit web components (flint-ui)
    src/
      <component>/
        flint-<component>.ts          # LitElement component
        flint-<component>.stories.ts  # Storybook stories
        flint-<component>.test.ts     # Vitest unit tests
      index.ts                        # Public API exports
      theme.css                       # Light theme tokens
      theme-dark.css                  # Dark theme tokens
  react/                         # React wrappers (flint-ui-react)
scripts/                         # Codegen (React wrappers, docs)
docs/                            # VitePress documentation site
```

## License

ISC
