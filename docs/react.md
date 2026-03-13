# React Usage

All components are available as React wrappers via the `storybook-lit-react` package, auto-generated with [`@lit/react`](https://lit.dev/docs/frameworks/react/).

## Installation

```bash
npm install storybook-lit storybook-lit-react
```

## Import

```tsx
import { UiButton, UiCard, UiDialog } from 'storybook-lit-react';
```

## Props

Props map 1:1 with the Lit component attributes. Use camelCase in JSX — the wrapper handles the attribute conversion automatically.

```tsx
// HTML
// <ui-button variant="primary" disabled>Click me</ui-button>

// React
<UiButton variant="primary" disabled>Click me</UiButton>
```

## Events

Custom events use `onEventName` props. The naming convention converts the Lit event name to camelCase with an `on` prefix:

| Lit event | React prop |
|-----------|-----------|
| `ui-change` | `onUiChange` |
| `ui-menu-close` | `onUiMenuClose` |
| `close` | `onClose` |
| `ui-drawer-close` | `onUiDrawerClose` |

```tsx
<UiSelect
  label="Fruit"
  onUiChange={(e) => console.log(e.detail.value)}
/>

<UiDialog open onClose={() => setOpen(false)}>
  <UiDialogTitle>Title</UiDialogTitle>
  <UiDialogContent>Content</UiDialogContent>
</UiDialog>
```

## Complex properties

Properties that accept objects or arrays (like `options` on `UiSelect` or `items` on `UiRichTreeView`) can be passed directly as JSX props — no `data-options` workaround needed.

```tsx
<UiSelect
  label="Fruit"
  options={[
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
  ]}
/>
```

## Styling

CSS custom properties work the same way. Use the `--ui-*` prefix:

```tsx
<UiButton style={{ '--ui-primary-color': '#8b5cf6' } as React.CSSProperties}>
  Purple
</UiButton>
```

## Component reference

All props, events, slots, and CSS variables are documented on each component page in the sidebar. The API is identical between the Lit and React versions.
