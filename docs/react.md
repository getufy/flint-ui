# React Usage

All components are available as React wrappers via the `@getufy/flint-ui-react` package, auto-generated with [`@lit/react`](https://lit.dev/docs/frameworks/react/).

## Installation

```bash
npm install @getufy/flint-ui @getufy/flint-ui-react lit
```

Import the theme in your app's entry point (e.g. `main.tsx`):

```tsx
import '@getufy/flint-ui/theme.css';
// optional dark mode
import '@getufy/flint-ui/theme-dark.css';
```

## Tree-Shaking Imports

```tsx
// Barrel import (simple — works, but may pull in all components)
import { FlintButton } from '@getufy/flint-ui-react';

// Subpath import (smaller bundles — only loads the button)
import { FlintButton } from '@getufy/flint-ui-react/button';
```

Both styles work identically at runtime. Use subpath imports for production apps where bundle size matters.

## Basic Usage

```tsx
import { FlintButton, FlintCard } from '@getufy/flint-ui-react';

function App() {
  return (
    <FlintCard>
      <FlintButton>Click me</FlintButton>
    </FlintCard>
  );
}
```

## Props

Props map 1:1 with the Lit component properties. Use camelCase in JSX — the wrapper handles the attribute conversion automatically.

```tsx
// HTML
// <flint-button appearance="filled" color="primary" disabled>Click me</flint-button>

// React — appearance="filled" and color="primary" are defaults, so these are equivalent:
<FlintButton appearance="filled" color="primary" disabled>Click me</FlintButton>
<FlintButton disabled>Click me</FlintButton>
```

## Events

Custom events use `onEventName` props. The naming convention converts the Lit event name to PascalCase with an `on` prefix:

| Lit event | React prop | Notes |
|-----------|-----------|-------|
| `flint-change` | `onFlintChange` | Value committed (blur/enter) |
| `flint-input-input` | `onFlintInputInput` | Each keystroke |
| `flint-input-change` | `onFlintInputChange` | Value committed |
| `flint-menu-close` | `onFlintMenuClose` | |
| `flint-dialog-close` | `onFlintDialogClose` | |
| `flint-drawer-close` | `onFlintDrawerClose` | |

> **`Input` vs `Change`**: Components with text input fire two events — `flint-*-input` on every keystroke and `flint-*-change` when the value is committed (blur or Enter). Use `input` for live search/filtering and `change` for form submission.

```tsx
<FlintSelect
  label="Fruit"
  onFlintChange={(e) => console.log(e.detail.value)}
/>

<FlintDialog open onFlintDialogClose={() => setOpen(false)}>
  <FlintDialogTitle>Title</FlintDialogTitle>
  <FlintDialogContent>Content</FlintDialogContent>
</FlintDialog>
```

The event object is a standard `CustomEvent`. Access the payload via `e.detail`. All event detail types are fully typed — hover over the prop in your IDE to see the shape.

## Controlled vs Uncontrolled

### Controlled (React owns the value)

```tsx
const [value, setValue] = useState('');

<FlintTextField
  label="Name"
  value={value}
  onFlintTextFieldInput={(e) => setValue(e.detail.value)}
/>
```

### Uncontrolled (component owns the value)

```tsx
<FlintTextField
  label="Name"
  defaultValue="Jane"
  onFlintTextFieldChange={(e) => console.log('committed:', e.detail.value)}
/>
```

Use `defaultValue` / `defaultChecked` / `defaultOpen` for uncontrolled patterns. The component manages its own state, and you only react to committed changes.

## Complex Properties

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

## Refs

Use standard React refs to access the underlying custom element and its methods. Import the element type for full type safety:

```tsx
import { useRef } from 'react';
import { FlintDialog } from '@getufy/flint-ui-react';
import type { FlintDialog as FlintDialogElement } from '@getufy/flint-ui';

function MyDialog() {
  const dialogRef = useRef<FlintDialogElement>(null);

  const openDialog = () => {
    dialogRef.current?.show();
  };

  return (
    <>
      <button onClick={openDialog}>Open</button>
      <FlintDialog ref={dialogRef}>
        <FlintDialogContent>Hello</FlintDialogContent>
      </FlintDialog>
    </>
  );
}
```

## Theming

Use the `FlintTheme` component to set the color mode and palette:

```tsx
import { FlintTheme } from '@getufy/flint-ui-react';

function App() {
  return (
    <FlintTheme mode="dark" palette="rose">
      {/* All children inherit the theme */}
      <FlintButton>Themed button</FlintButton>
    </FlintTheme>
  );
}
```

Available modes: `'light'`, `'dark'`, `'auto'` (follows system preference).

To suppress the custom-element re-registration warnings in development:

```tsx
import '@getufy/flint-ui/suppress-warnings';
```

## Styling with CSS Parts

Flint components expose CSS parts via the `::part()` pseudo-element for deep customization beyond CSS custom properties:

```css
/* Round all buttons */
flint-button::part(base) {
  border-radius: 9999px;
}

/* Style the input field inside a text field */
flint-text-field::part(input) {
  font-family: monospace;
}
```

Check each component's documentation for the list of available part names.

## TypeScript

All wrappers export their props type as `Flint<Component>Props`.

Event detail types can be imported from the core package for full type safety:

```tsx
import { FlintSelect } from '@getufy/flint-ui-react';
import type { FlintSelectChangeDetail } from '@getufy/flint-ui';

const handleChange = (e: CustomEvent<FlintSelectChangeDetail>) => {
  console.log(e.detail.value);
};

<FlintSelect onFlintSelectChange={handleChange} />
```

Props types are also exported:

```tsx
import { FlintButton, type FlintButtonProps } from '@getufy/flint-ui-react';

const buttonProps: FlintButtonProps = {
  appearance: 'filled',
  disabled: false,
};
```

## Styling with CSS Custom Properties

CSS custom properties work the same way. Use the `--flint-*` prefix:

```tsx
<FlintButton style={{ '--flint-primary-color': '#8b5cf6' } as React.CSSProperties}>
  Purple
</FlintButton>
```

## Form Example

```tsx
import { useState } from 'react';
import {
  FlintTextField,
  FlintSelect,
  FlintSwitch,
  FlintButton,
} from '@getufy/flint-ui-react';

function ContactForm() {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('general');
  const [subscribe, setSubscribe] = useState(false);

  return (
    <form onSubmit={(e) => { e.preventDefault(); console.log({ name, topic, subscribe }); }}>
      <FlintTextField
        label="Name"
        value={name}
        onFlintTextFieldChange={(e) => setName(e.detail.value)}
      />
      <FlintSelect
        label="Topic"
        value={topic}
        options={[
          { value: 'general', label: 'General' },
          { value: 'support', label: 'Support' },
          { value: 'feedback', label: 'Feedback' },
        ]}
        onFlintChange={(e) => setTopic(e.detail.value)}
      />
      <FlintSwitch
        label="Subscribe to updates"
        onFlintSwitchChange={(e) => setSubscribe(e.detail.checked)}
      />
      <FlintButton type="submit">Send</FlintButton>
    </form>
  );
}
```

## React 18 Compatibility

React 18 serializes boolean web component attributes as strings — `open="false"` is treated as truthy by the browser because the attribute is present. React 19 fixed this natively.

**If you use `@getufy/flint-ui-react`**, this is handled automatically in all React versions. The wrappers use `createComponent` from `@lit/react`, which sets properties (not attributes) on the underlying element.

**If you use raw web components in React 18** (without the wrappers), use the `|| undefined` pattern to remove the attribute when the value is falsy:

```tsx
// ❌ React 18: sets open="false" (truthy!)
<flint-dialog open={isOpen}>...</flint-dialog>

// ✅ React 18: removes the attribute when false
<flint-dialog open={isOpen || undefined}>...</flint-dialog>
```

::: tip
This is one of the key reasons to prefer `@getufy/flint-ui-react` — it eliminates this entire class of bugs.
:::

## Component Reference

All props, events, slots, CSS parts, and CSS variables are documented on each component page in the sidebar. The API is identical between the Lit and React versions.
