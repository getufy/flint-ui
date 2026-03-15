# @getufy/flint-ui-react

## 1.0.0

### Minor Changes

- [#21](https://github.com/getufy/flint-ui/pull/21) [`051f9a4`](https://github.com/getufy/flint-ui/commit/051f9a4e2fe07ba66b2cd7e76b5e61d4a5050e49) Thanks [@mihai-ufy](https://github.com/mihai-ufy)! - Add SSR support via Lit SSR + Declarative Shadow DOM

  - SSR-safe locale resolution (`resolveLocale()`) for format components
  - Guard browser-only APIs in grid, stack, autoloader, and `FlintElement.define()`
  - Custom Elements Manifest (CEM) with VS Code and JetBrains IDE support
  - Animation registry, localize controller, and form controller
  - `::part()` exposure on high-use components
  - `hoist` property on tooltip, hover card, and date picker
  - axe-core automated accessibility testing
  - SSR smoke tests and documentation

### Patch Changes

- Updated dependencies [[`051f9a4`](https://github.com/getufy/flint-ui/commit/051f9a4e2fe07ba66b2cd7e76b5e61d4a5050e49)]:
  - @getufy/flint-ui@1.0.0

## 0.4.0

### Minor Changes (BREAKING)

- Event handler props renamed to match new namespaced events (e.g. `onChange` → `onFlintTextFieldChange`, `onClose` → `onFlintDialogClose`).
- Full IntelliSense support with typed event details and explicit prop interfaces.
- Fixed build to emit JS alongside type declarations for proper TypeScript resolution.
- Codegen now cleans up stale event files and exports event detail interfaces from barrel files.

### Dependencies

- Updated dependency `@getufy/flint-ui` to `^0.4.0`

## 0.3.0

### Minor Changes (BREAKING)

- Explicit prop interfaces with full JSDoc, typed event detail generics, and slot documentation for all 185+ wrapper components.

### Dependencies

- Updated dependency `@getufy/flint-ui` to `^0.3.0`

## 0.2.2

### Patch Changes

- [`6a4a210`](https://github.com/getufy/flint-ui/commit/6a4a21067db72f1071674622263a1561f3663e30) Thanks [@mihai-ufy](https://github.com/mihai-ufy)! - Add per-component React imports for tree-shaking, OSS governance files, expanded docs, and improved package metadata

- Updated dependencies [[`6a4a210`](https://github.com/getufy/flint-ui/commit/6a4a21067db72f1071674622263a1561f3663e30)]:
  - @getufy/flint-ui@0.2.2
