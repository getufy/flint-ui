# Flint UI Component Library

A comprehensive library of 70+ UI components built with [LitElement](https://lit.dev/) and [TypeScript](https://www.typescriptlang.org/), showcased with [Storybook](https://storybook.js.org/).

## Installation

```bash
npm install flint-ui lit
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

## Components

### Inputs
`flint-autocomplete` `flint-checkbox` `flint-date-field` `flint-date-picker` `flint-date-range-picker` `flint-input` `flint-input-otp` `flint-radio` `flint-rating` `flint-select` `flint-slider` `flint-switch` `flint-text-field` `flint-textarea` `flint-time-picker` `flint-toggle` `flint-toggle-button` `flint-transfer-list`

### Data Display
`flint-avatar` `flint-badge` `flint-chip` `flint-divider` `flint-format-date` `flint-format-number` `flint-image-list` `flint-item` `flint-kbd` `flint-list` `flint-relative-time` `flint-table` `flint-tooltip` `flint-typography`

### Feedback
`flint-alert` `flint-backdrop` `flint-dialog` `flint-progress` `flint-skeleton` `flint-snackbar` `flint-sonner`

### Surfaces
`flint-accordion` `flint-card` `flint-paper`

### Navigation
`flint-bottom-navigation` `flint-breadcrumbs` `flint-command` `flint-drawer` `flint-link` `flint-menu` `flint-menubar` `flint-navigation-menu` `flint-pagination` `flint-speed-dial` `flint-stepper` `flint-tabs`

### Layout
`flint-box` `flint-container` `flint-grid` `flint-stack` `flint-resizable` `flint-split-panel`

### Utilities
`flint-collapsible` `flint-copy-button` `flint-empty` `flint-hover-card` `flint-image-comparer` `flint-scroll-area` `flint-visually-hidden`

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
npm run build              # tsc + vite build
npm test                   # Unit tests (jsdom) + browser tests (Playwright)
npm run build-coverage     # Unit tests with coverage report
npm run lint               # ESLint (0 errors, 0 warnings)
```

## Project Structure

```
src/
  <component>/
    flint-<component>.ts          # LitElement component
    flint-<component>.css         # Component styles
    flint-<component>.stories.ts  # Storybook stories
    flint-<component>.test.ts     # Vitest unit tests
  index.ts                     # Public API exports
  theme.css                    # Light theme tokens
  theme-dark.css               # Dark theme tokens
```

## Roadmap

- [ ] Structured theme system (SCSS variables)
- [ ] Dark mode toggle component
- [ ] Monorepo structure
- [ ] Published npm package for Lit
- [ ] React wrapper package (`gen:react` script exists)
- [ ] Name the framework

## License

ISC
