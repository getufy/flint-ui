# @getufy/flint-ui-react

[![npm](https://img.shields.io/npm/v/@getufy/flint-ui-react)](https://www.npmjs.com/package/@getufy/flint-ui-react)
[![license](https://img.shields.io/npm/l/@getufy/flint-ui-react)](https://github.com/getufy/flint-ui/blob/main/LICENSE)

React wrappers for [`@getufy/flint-ui`](https://www.npmjs.com/package/@getufy/flint-ui) web components, auto-generated with [`@lit/react`](https://lit.dev/docs/frameworks/react/).

## Installation

```bash
npm install @getufy/flint-ui-react @getufy/flint-ui lit
```

Import the theme in your app's entry point:

```js
import '@getufy/flint-ui/theme.css';
```

## Usage

```tsx
import { FlintButton, FlintSelect, FlintDialog } from '@getufy/flint-ui-react';

function App() {
  return (
    <FlintButton variant="primary" onFlintClick={() => console.log('clicked')}>
      Click me
    </FlintButton>
  );
}
```

### Per-component imports

For better tree-shaking, import from component sub-paths:

```tsx
import { FlintButton } from '@getufy/flint-ui-react/button';
import { FlintTabs, FlintTab, FlintTabPanel } from '@getufy/flint-ui-react/tabs';
```

### Events

Custom events use `onEventName` props:

| Lit event | React prop |
|-----------|-----------|
| `flint-change` | `onFlintChange` |
| `flint-menu-close` | `onFlintMenuClose` |
| `close` | `onClose` |

```tsx
<FlintSelect
  label="Fruit"
  onFlintChange={(e) => console.log(e.detail.value)}
/>
```

### Complex properties

Objects and arrays can be passed directly as JSX props:

```tsx
<FlintSelect
  label="Fruit"
  options={[
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
  ]}
/>
```

## Peer Dependencies

- `react` ^18.0.0 || ^19.0.0
- `@getufy/flint-ui` ^0.2.0

## Documentation

- [Full documentation](https://getufy.github.io/flint-ui/)
- [React guide](https://getufy.github.io/flint-ui/react)
- [Live Storybook](https://getufy.github.io/flint-ui/storybook/)

## License

[MIT](https://github.com/getufy/flint-ui/blob/main/LICENSE)
