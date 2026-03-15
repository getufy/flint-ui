# @getufy/flint-ui-react

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
