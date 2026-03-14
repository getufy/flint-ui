# @getufy/flint-ui-react

[![npm](https://img.shields.io/npm/v/@getufy/flint-ui-react)](https://www.npmjs.com/package/@getufy/flint-ui-react)
[![license](https://img.shields.io/npm/l/@getufy/flint-ui-react)](https://github.com/getufy/flint-ui/blob/main/LICENSE)

React wrappers for [`@getufy/flint-ui`](https://www.npmjs.com/package/@getufy/flint-ui) web components, built with [`@lit/react`](https://www.npmjs.com/package/@lit/react).

## Installation

```bash
npm install @getufy/flint-ui-react @getufy/flint-ui lit react
```

## Usage

```jsx
import { FlintButton, FlintTabs, FlintDialog } from '@getufy/flint-ui-react';

function App() {
  return (
    <FlintButton variant="contained" color="primary" onClick={() => console.log('clicked')}>
      Click me
    </FlintButton>
  );
}
```

All components from `@getufy/flint-ui` are available as React components with proper event handling and type definitions.

## Peer Dependencies

- `react` ^18.0.0 || ^19.0.0
- `@getufy/flint-ui` ^0.1.0
- `lit` ^3.0.0

## License

[MIT](https://github.com/getufy/flint-ui/blob/main/LICENSE)
