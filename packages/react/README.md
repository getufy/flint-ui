# @getufy/flint-ui-react

[![npm](https://img.shields.io/npm/v/@getufy/flint-ui-react)](https://www.npmjs.com/package/@getufy/flint-ui-react)
[![license](https://img.shields.io/npm/l/@getufy/flint-ui-react)](https://github.com/getufy/flint-ui/blob/main/LICENSE)

React wrappers for [`@getufy/flint-ui`](https://www.npmjs.com/package/@getufy/flint-ui) web components, auto-generated with [`@lit/react`](https://lit.dev/docs/frameworks/react/).

## Installation

```bash
npm install @getufy/flint-ui @getufy/flint-ui-react
```

Peer dependencies: `react ^18 || ^19`, `@getufy/flint-ui ^0.2.2`

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
    <FlintButton variant="filled" onFlintClick={() => console.log('clicked')}>
      Click me
    </FlintButton>
  );
}
```

### Events

Custom events map to camelCase `on*` props:

| Lit event | React prop |
|---|---|
| `flint-change` | `onFlintChange` |
| `flint-click` | `onFlintClick` |
| `flint-menu-close` | `onFlintMenuClose` |
| `flint-dialog-close` | `onFlintDialogClose` |

```tsx
<FlintSelect
  label="Fruit"
  onFlintChange={(e) => console.log(e.detail.value)}
/>
```

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
