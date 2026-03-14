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

## Basic Usage

```tsx
import { FlintButton, FlintCard } from '@getufy/flint-ui-react';

function App() {
  return (
    <FlintCard>
      <FlintButton variant="primary">Click me</FlintButton>
    </FlintCard>
  );
}
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

The event object is a standard `CustomEvent`. Access the payload via `e.detail`.

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

Use standard React refs to access the underlying custom element and its methods:

```tsx
import { useRef } from 'react';
import { FlintDialog } from '@getufy/flint-ui-react';

function MyDialog() {
  const dialogRef = useRef<HTMLElement>(null);

  const openDialog = () => {
    // Access the underlying Lit element's methods
    (dialogRef.current as any)?.show();
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

## TypeScript

All wrappers export their props type as `Flint<Component>Props`:

```tsx
import { FlintButton, type FlintButtonProps } from '@getufy/flint-ui-react';

const buttonProps: FlintButtonProps = {
  variant: 'primary',
  disabled: false,
};
```

## Styling

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
        onFlintChange={(e) => setName(e.detail.value)}
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
        onFlintChange={(e) => setSubscribe(e.detail.checked)}
      />
      <FlintButton type="submit" variant="primary">Send</FlintButton>
    </form>
  );
}
```

## Component Reference

All props, events, slots, and CSS variables are documented on each component page in the sidebar. The API is identical between the Lit and React versions.
