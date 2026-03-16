# @getufy/flint-ui-react

[![npm](https://img.shields.io/npm/v/@getufy/flint-ui-react)](https://www.npmjs.com/package/@getufy/flint-ui-react)
[![license](https://img.shields.io/npm/l/@getufy/flint-ui-react)](https://github.com/getufy/flint-ui/blob/main/LICENSE)

React wrappers for [`@getufy/flint-ui`](https://www.npmjs.com/package/@getufy/flint-ui) web components, auto-generated with [`@lit/react`](https://lit.dev/docs/frameworks/react/).

## Installation

```bash
npm install @getufy/flint-ui @getufy/flint-ui-react
```

Peer dependencies: `react ^18 || ^19`, `@getufy/flint-ui ^0.6.0`

## Setup

Import the theme once in your app entry point:

```ts
import '@getufy/flint-ui/theme.css';
```

## Resources

- **[Full documentation](https://getufy.github.io/flint-ui/)** — component docs, guides, and examples
- **[React guide](https://getufy.github.io/flint-ui/react)** — React-specific usage and patterns
- **[Live Storybook](https://getufy.github.io/flint-ui/storybook/)** — interactive component playground

## Subpath imports — use these for tree-shaking

**Always import from subpaths, not the barrel.** Each component is its own entry point; your bundler only includes the components you actually import.

```tsx
// Load only what you need
import { FlintButton } from '@getufy/flint-ui-react/button';
import { FlintSelect, FlintOption } from '@getufy/flint-ui-react/select';
import { FlintTabs, FlintTab, FlintTabPanel } from '@getufy/flint-ui-react/tabs';
```

### Why subpath imports matter

Lit's `@customElement()` decorator is a **side effect** — it registers the custom element globally as soon as the module is evaluated. The barrel import (`@getufy/flint-ui-react`) causes all 60+ components to register, even ones you never render.

```tsx
// Registers ALL 60+ components (~897 KB uncompressed)
import { FlintButton } from '@getufy/flint-ui-react';

// Registers only the button component
import { FlintButton } from '@getufy/flint-ui-react/button';
```

### Available subpaths

| Subpath | Exports include |
|---|---|
| `@getufy/flint-ui-react/accordion` | `FlintAccordion`, `FlintAccordionItem` |
| `@getufy/flint-ui-react/alert` | `FlintAlert` |
| `@getufy/flint-ui-react/app-bar` | `FlintAppBar` |
| `@getufy/flint-ui-react/autocomplete` | `FlintAutocomplete` |
| `@getufy/flint-ui-react/avatar` | `FlintAvatar` |
| `@getufy/flint-ui-react/backdrop` | `FlintBackdrop` |
| `@getufy/flint-ui-react/badge` | `FlintBadge` |
| `@getufy/flint-ui-react/bottom-navigation` | `FlintBottomNavigation`, `FlintBottomNavigationItem` |
| `@getufy/flint-ui-react/box` | `FlintBox` |
| `@getufy/flint-ui-react/breadcrumbs` | `FlintBreadcrumbs`, `FlintBreadcrumbItem` |
| `@getufy/flint-ui-react/button` | `FlintButton` |
| `@getufy/flint-ui-react/card` | `FlintCard` |
| `@getufy/flint-ui-react/carousel` | `FlintCarousel`, `FlintCarouselItem` |
| `@getufy/flint-ui-react/checkbox` | `FlintCheckbox` |
| `@getufy/flint-ui-react/chip` | `FlintChip` |
| `@getufy/flint-ui-react/collapsible` | `FlintCollapsible`, `FlintCollapsibleTrigger`, `FlintCollapsibleContent` |
| `@getufy/flint-ui-react/command` | `FlintCommand`, `FlintCommandInput`, `FlintCommandList`, `FlintCommandItem` |
| `@getufy/flint-ui-react/container` | `FlintContainer` |
| `@getufy/flint-ui-react/copy-button` | `FlintCopyButton` |
| `@getufy/flint-ui-react/date-field` | `FlintDateField` |
| `@getufy/flint-ui-react/date-picker` | `FlintDatePicker` |
| `@getufy/flint-ui-react/date-range-picker` | `FlintDateRangePicker` |
| `@getufy/flint-ui-react/dialog` | `FlintDialog` |
| `@getufy/flint-ui-react/divider` | `FlintDivider` |
| `@getufy/flint-ui-react/drawer` | `FlintDrawer` |
| `@getufy/flint-ui-react/empty` | `FlintEmpty` |
| `@getufy/flint-ui-react/fab` | `FlintFab` |
| `@getufy/flint-ui-react/format-date` | `FlintFormatDate` |
| `@getufy/flint-ui-react/format-number` | `FlintFormatNumber` |
| `@getufy/flint-ui-react/grid` | `FlintGrid`, `FlintGridItem` |
| `@getufy/flint-ui-react/hover-card` | `FlintHoverCard`, `FlintHoverCardTrigger`, `FlintHoverCardContent` |
| `@getufy/flint-ui-react/image-comparer` | `FlintImageComparer` |
| `@getufy/flint-ui-react/image-list` | `FlintImageList`, `FlintImageListItem` |
| `@getufy/flint-ui-react/input` | `FlintInput` |
| `@getufy/flint-ui-react/input-otp` | `FlintInputOtp`, `FlintInputOtpGroup`, `FlintInputOtpSlot` |
| `@getufy/flint-ui-react/item` | `FlintItem` |
| `@getufy/flint-ui-react/kbd` | `FlintKbd` |
| `@getufy/flint-ui-react/link` | `FlintLink` |
| `@getufy/flint-ui-react/list` | `FlintList`, `FlintListItem` |
| `@getufy/flint-ui-react/menu` | `FlintMenu`, `FlintMenuItem` |
| `@getufy/flint-ui-react/menubar` | `FlintMenubar`, `FlintMenubarItem` |
| `@getufy/flint-ui-react/navigation-menu` | `FlintNavigationMenu`, `FlintNavigationMenuItem` |
| `@getufy/flint-ui-react/pagination` | `FlintPagination` |
| `@getufy/flint-ui-react/paper` | `FlintPaper` |
| `@getufy/flint-ui-react/progress` | `FlintProgress` |
| `@getufy/flint-ui-react/radio` | `FlintRadio`, `FlintRadioGroup` |
| `@getufy/flint-ui-react/rating` | `FlintRating` |
| `@getufy/flint-ui-react/relative-time` | `FlintRelativeTime` |
| `@getufy/flint-ui-react/resizable` | `FlintResizable`, `FlintResizablePanel`, `FlintResizableHandle` |
| `@getufy/flint-ui-react/scroll-area` | `FlintScrollArea` |
| `@getufy/flint-ui-react/select` | `FlintSelect`, `FlintOption` |
| `@getufy/flint-ui-react/skeleton` | `FlintSkeleton` |
| `@getufy/flint-ui-react/slider` | `FlintSlider` |
| `@getufy/flint-ui-react/snackbar` | `FlintSnackbar` |
| `@getufy/flint-ui-react/sonner` | `FlintSonner` |
| `@getufy/flint-ui-react/speed-dial` | `FlintSpeedDial`, `FlintSpeedDialAction` |
| `@getufy/flint-ui-react/split-panel` | `FlintSplitPanel` |
| `@getufy/flint-ui-react/stack` | `FlintStack` |
| `@getufy/flint-ui-react/stepper` | `FlintStepper`, `FlintStepperItem` |
| `@getufy/flint-ui-react/switch` | `FlintSwitch` |
| `@getufy/flint-ui-react/table` | `FlintTable`, `FlintTableRow`, `FlintTableCell` |
| `@getufy/flint-ui-react/tabs` | `FlintTabs`, `FlintTab`, `FlintTabPanel` |
| `@getufy/flint-ui-react/text-field` | `FlintTextField` |
| `@getufy/flint-ui-react/textarea` | `FlintTextarea` |
| `@getufy/flint-ui-react/time-picker` | `FlintTimePicker` |
| `@getufy/flint-ui-react/toggle` | `FlintToggle`, `FlintToggleGroup` |
| `@getufy/flint-ui-react/tooltip` | `FlintTooltip` |
| `@getufy/flint-ui-react/transfer-list` | `FlintTransferList` |
| `@getufy/flint-ui-react/tree-view` | `FlintTreeView`, `FlintTreeItem` |
| `@getufy/flint-ui-react/typography` | `FlintTypography` |
| `@getufy/flint-ui-react/visually-hidden` | `FlintVisuallyHidden` |

For exact named exports in any subpath, check the TypeScript declarations in `node_modules/@getufy/flint-ui-react/dist/<name>.d.ts`.

## Basic usage

```tsx
// main.tsx
import '@getufy/flint-ui/theme.css';
import '@getufy/flint-ui/suppress-warnings'; // optional — see below

// MyComponent.tsx
import { FlintButton } from '@getufy/flint-ui-react/button';

export function MyComponent() {
  return (
    <FlintButton variant="primary" onClick={() => console.log('clicked')}>
      Click me
    </FlintButton>
  );
}
```

### Events

Custom events map to camelCase `on*` props following the pattern **`onFlint[ComponentName][EventType]`**:

| Lit event | React prop |
|---|---|
| `flint-pagination-change` | `onFlintPaginationChange` |
| `flint-select-change` | `onFlintSelectChange` |
| `flint-dialog-close` | `onFlintDialogClose` |
| `flint-menu-close` | `onFlintMenuClose` |

The component name is always included in the event prop. For example, `FlintPagination` fires `onFlintPaginationChange`, **not** `onFlintPageChange` or `onFlintChange`. Each wrapper has a strict TypeScript props interface -- using a wrong event name produces a compile-time error:

```tsx
// TS error: Property 'onFlintPageChange' does not exist on type '...'
<FlintPagination onFlintPageChange={() => {}} />

// Correct:
<FlintPagination onFlintPaginationChange={(e) => console.log(e.detail.page)} />
```

```tsx
<FlintSelect
  label="Fruit"
  onFlintSelectChange={(e) => console.log(e.detail.value)}
/>
```

### Slots

Web components use [slots](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) for content projection. In React, pass the `slot` attribute on a child element to target a named slot:

```tsx
import { FlintAppBar } from '@getufy/flint-ui-react/app-bar';
import { FlintButton } from '@getufy/flint-ui-react/button';

<FlintAppBar>
  <div slot="navigation">
    <FlintButton variant="icon">☰</FlintButton>
  </div>
  <div slot="title">My App</div>
  <div slot="actions">
    <FlintButton variant="icon">⚙</FlintButton>
  </div>
</FlintAppBar>
```

Each component documents its available slots in the [API docs](https://getufy.github.io/flint-ui/). Common slot names include `navigation`, `title`, `actions`, `start-content`, and `end-content` (AppBar); `trigger` and `content` (Dialog, HoverCard); and the default (unnamed) slot for primary children.

## Dark mode

Import the dark theme CSS alongside the base theme:

```ts
import '@getufy/flint-ui/theme.css';
import '@getufy/flint-ui/theme-dark.css';
```

Activate dark mode by adding `class="flint-theme-dark"` or `data-theme="dark"` to your `<html>` or `<body>` element:

```tsx
// Toggle dark mode
document.documentElement.classList.toggle('flint-theme-dark');

// Or use the data-theme attribute
document.documentElement.setAttribute('data-theme', 'dark');
```

The dark theme CSS also includes a `@media (prefers-color-scheme: dark)` block, so it automatically applies when the user's OS is set to dark mode. To opt out of automatic detection, add `class="flint-theme-light"` to force light mode.

## Recipes

### Login form

```tsx
import { FlintInput } from '@getufy/flint-ui-react/input';
import { FlintCheckbox } from '@getufy/flint-ui-react/checkbox';
import { FlintButton } from '@getufy/flint-ui-react/button';
import { FlintStack } from '@getufy/flint-ui-react/stack';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form onSubmit={(e) => { e.preventDefault(); /* handle login */ }}>
      <FlintStack spacing={2}>
        <FlintInput
          label="Email"
          type="email"
          required
          value={email}
          onFlintInputChange={(e) => setEmail(e.detail.value)}
        />
        <FlintInput
          label="Password"
          type="password"
          required
          value={password}
          onFlintInputChange={(e) => setPassword(e.detail.value)}
        />
        <FlintCheckbox label="Remember me" />
        <FlintButton type="submit">Sign in</FlintButton>
      </FlintStack>
    </form>
  );
}
```

### Card layout

```tsx
import { FlintCard } from '@getufy/flint-ui-react/card';
import { FlintGrid, FlintGridItem } from '@getufy/flint-ui-react/grid';
import { FlintButton } from '@getufy/flint-ui-react/button';
import { FlintChip } from '@getufy/flint-ui-react/chip';

function CardGrid({ items }) {
  return (
    <FlintGrid columns={3} spacing={2}>
      {items.map((item) => (
        <FlintGridItem key={item.id}>
          <FlintCard>
            <div style={{ padding: '1rem' }}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <FlintChip variant="outlined">{item.category}</FlintChip>
              <FlintButton variant="secondary">View</FlintButton>
            </div>
          </FlintCard>
        </FlintGridItem>
      ))}
    </FlintGrid>
  );
}
```

### Confirmation dialog

```tsx
import { FlintDialog } from '@getufy/flint-ui-react/dialog';
import { FlintButton } from '@getufy/flint-ui-react/button';
import { FlintStack } from '@getufy/flint-ui-react/stack';

function ConfirmDialog({ open, onConfirm, onCancel }) {
  return (
    <FlintDialog open={open} onFlintDialogClose={onCancel}>
      <flint-dialog-title>Delete item?</flint-dialog-title>
      <p>This action cannot be undone.</p>
      <FlintStack direction="row" spacing={1} justifyContent="flex-end">
        <FlintButton variant="secondary" onClick={onCancel}>Cancel</FlintButton>
        <FlintButton variant="destructive" onClick={onConfirm}>Delete</FlintButton>
      </FlintStack>
    </FlintDialog>
  );
}
```

### Toast notifications

Flint UI includes a Sonner-inspired toast system with an imperative `toast()` API:

```tsx
import { FlintToaster } from '@getufy/flint-ui-react/sonner';
import { toast } from '@getufy/flint-ui/sonner/flint-sonner';

function App() {
  return (
    <>
      {/* Place once at app root */}
      <FlintToaster position="bottom-right" />

      <button onClick={() => toast('Hello!')}>Show toast</button>
      <button onClick={() => toast.success('Saved!')}>Success</button>
      <button onClick={() => toast.error('Failed')}>Error</button>
      <button onClick={() => toast.promise(
        fetch('/api/save'),
        { loading: 'Saving...', success: 'Done!', error: 'Failed' }
      )}>Async</button>
    </>
  );
}
```

Available methods: `toast()`, `toast.success()`, `toast.error()`, `toast.info()`, `toast.warning()`, `toast.loading()`, `toast.promise()`, `toast.dismiss()`.

### AppBar with slots

Web Component slots are used via the `slot` attribute in React:

```tsx
import { FlintAppBar } from '@getufy/flint-ui-react/app-bar';
import { FlintButton } from '@getufy/flint-ui-react/button';

function Header() {
  return (
    <FlintAppBar>
      <div slot="navigation"><FlintButton variant="text">☰</FlintButton></div>
      <div slot="title">My App</div>
      <div slot="actions"><FlintButton variant="text">⚙</FlintButton></div>
    </FlintAppBar>
  );
}
```

Available slots: `navigation` (or `start-content`), `title`, `actions` (or `end-content`), and the default slot.

## Custom Elements Manifest

The core package ships a [Custom Elements Manifest](https://custom-elements-manifest.open-wc.org/) at `dist/custom-elements.json`. This machine-readable JSON describes all components, their properties, events, slots, and CSS custom properties.

```json
// package.json
{ "customElements": "dist/custom-elements.json" }
```

Tooling that consumes CEM:
- **VS Code** — autocompletion via `dist/vscode.html-custom-data.json` (add to `html.customData` setting)
- **JetBrains** — autocompletion via `dist/web-types.json` (auto-detected)
- **Storybook** — auto-generates ArgTypes from CEM
- **API docs** — generated from CEM via `npm run gen:docs`

## SSR / Next.js

Flint UI components work in server-rendered frameworks with some caveats:

### Next.js App Router

All Flint React wrappers must be used in Client Components. Add `'use client'` to any file that imports them:

```tsx
'use client';

import { FlintButton } from '@getufy/flint-ui-react/button';

export function MyButton() {
  return <FlintButton>Click me</FlintButton>;
}
```

### Theme CSS in layout

Import theme CSS in your root layout:

```tsx
// app/layout.tsx
import '@getufy/flint-ui/theme.css';
import '@getufy/flint-ui/theme-dark.css'; // optional

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Astro / Remix

Same pattern — import components in client-only islands or with framework-specific client directives:

```astro
---
// Astro — use client:only
---
<FlintButton client:only="react">Click me</FlintButton>
```

### Known limitations

- Web components render as empty custom elements during SSR; content appears after hydration (FOUC). Lit SSR + Declarative Shadow DOM is experimental and not yet recommended for production.
- `window` / `document` APIs are not available during SSR. All Flint components guard DOM access in `connectedCallback()`, so importing them server-side is safe.
- `suppress-warnings` import is a no-op on the server (uses `globalThis`).

## Suppressing the Lit dev mode warning

In development, Lit prints a console warning about running in dev mode. To silence it, add this import **before any component imports** in your app entry point:

```ts
// main.tsx — must be first
import '@getufy/flint-ui/suppress-warnings';
import '@getufy/flint-ui/theme.css';

// component imports after...
```

## License

[MIT](https://github.com/getufy/flint-ui/blob/main/LICENSE)
