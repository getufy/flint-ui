# Storybook Lit Component Library

A comprehensive library of 70+ UI components built with [LitElement](https://lit.dev/) and [TypeScript](https://www.typescriptlang.org/), showcased with [Storybook](https://storybook.js.org/).

## Installation

```bash
npm install storybook-lit lit
```

## Usage

Import the full bundle:

```ts
import { UiButton, UiTabs } from 'storybook-lit';
```

Or import individual components for better tree-shaking:

```ts
import 'storybook-lit/button';
import 'storybook-lit/tabs';
```

Apply the theme by importing the CSS:

```ts
import 'storybook-lit/theme.css';
// optional dark mode
import 'storybook-lit/theme-dark.css';
```

## Components

### Inputs
`ui-autocomplete` `ui-checkbox` `ui-date-field` `ui-date-picker` `ui-date-range-picker` `ui-input` `ui-input-otp` `ui-radio` `ui-rating` `ui-select` `ui-slider` `ui-switch` `ui-text-field` `ui-textarea` `ui-time-picker` `ui-toggle` `ui-toggle-button` `ui-transfer-list`

### Data Display
`ui-avatar` `ui-badge` `ui-chip` `ui-divider` `ui-format-date` `ui-format-number` `ui-image-list` `ui-item` `ui-kbd` `ui-list` `ui-relative-time` `ui-table` `ui-tooltip` `ui-typography`

### Feedback
`ui-alert` `ui-backdrop` `ui-dialog` `ui-progress` `ui-skeleton` `ui-snackbar` `ui-sonner`

### Surfaces
`ui-accordion` `ui-card` `ui-paper`

### Navigation
`ui-bottom-navigation` `ui-breadcrumbs` `ui-command` `ui-drawer` `ui-link` `ui-menu` `ui-menubar` `ui-navigation-menu` `ui-pagination` `ui-speed-dial` `ui-stepper` `ui-tabs`

### Layout
`ui-box` `ui-container` `ui-grid` `ui-stack` `ui-resizable` `ui-split-panel`

### Utilities
`ui-collapsible` `ui-copy-button` `ui-empty` `ui-hover-card` `ui-image-comparer` `ui-scroll-area` `ui-visually-hidden`

## Theming

Override CSS custom properties to customize the look:

```css
:root {
  --ui-primary-color: #3b82f6;
  --ui-text-color: #111827;
  --ui-font-family: system-ui;
  --ui-border-radius-md: 6px;
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
    ui-<component>.ts          # LitElement component
    ui-<component>.css         # Component styles
    ui-<component>.stories.ts  # Storybook stories
    ui-<component>.test.ts     # Vitest unit tests
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
