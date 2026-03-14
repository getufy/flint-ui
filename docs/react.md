# React Usage

All components are available as React wrappers via the `@getufy/flint-ui-react` package, auto-generated with [`@lit/react`](https://lit.dev/docs/frameworks/react/).

## Installation

```bash
npm install @getufy/flint-ui @getufy/flint-ui-react
```

## Import

```tsx
import { FlintButton, FlintCard, FlintDialog } from '@getufy/flint-ui-react';
```

## Props

Props map 1:1 with the Lit component attributes. Use camelCase in JSX — the wrapper handles the attribute conversion automatically.

```tsx
// HTML
// <flint-button variant="primary" disabled>Click me</flint-button>

// React
<FlintButton variant="primary" disabled>Click me</FlintButton>
```

## Events

Custom events use `onEventName` props. The naming convention converts the Lit event name to camelCase with an `on` prefix:

| Lit event | React prop |
|-----------|-----------|
| `flint-change` | `onFlintChange` |
| `flint-menu-close` | `onFlintMenuClose` |
| `close` | `onClose` |
| `flint-drawer-close` | `onFlintDrawerClose` |

```tsx
<FlintSelect
  label="Fruit"
  onFlintChange={(e) => console.log(e.detail.value)}
/>

<FlintDialog open onClose={() => setOpen(false)}>
  <FlintDialogTitle>Title</FlintDialogTitle>
  <FlintDialogContent>Content</FlintDialogContent>
</FlintDialog>
```

## Complex properties

Properties that accept objects or arrays (like `options` on `FlintSelect` or `items` on `FlintRichTreeView`) can be passed directly as JSX props — no `data-options` workaround needed.

```tsx
<FlintSelect
  label="Fruit"
  options={[
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
  ]}
/>
```

## Styling

CSS custom properties work the same way. Use the `--flint-*` prefix:

```tsx
<FlintButton style={{ '--flint-primary-color': '#8b5cf6' } as React.CSSProperties}>
  Purple
</FlintButton>
```

## Component reference

All props, events, slots, and CSS variables are documented on each component page in the sidebar. The API is identical between the Lit and React versions.
