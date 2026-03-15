# @getufy/flint-ui

## 1.0.0

### Major Changes

- [`3280fc4`](https://github.com/getufy/flint-ui/commit/3280fc42b81b17d148f8749927d1cb4e994ff908) Thanks [@mihai-ufy](https://github.com/mihai-ufy)! - BREAKING: v0.3.0 release

  - **Event payload consistency**: All open/close events now include `detail: { open: true/false }`. Stepper events use `{ step }` instead of `{ index }`. Chip delete click handler now includes `detail: { value }`.
  - **Form prop standardization**: Renamed `helpText` to `helperText` (attribute: `helper-text`) on FlintInput and FlintTextarea. Added `errorMessage` prop to date/time picker components.
  - **Docs discoverability**: Added prominent Resources sections with links to docs, Storybook, and React wrappers in both package READMEs.
  - **React wrappers**: Explicit prop interfaces with full JSDoc, typed event detail generics, and slot documentation for all 185+ wrapper components.

## 0.2.2

### Patch Changes

- [`6a4a210`](https://github.com/getufy/flint-ui/commit/6a4a21067db72f1071674622263a1561f3663e30) Thanks [@mihai-ufy](https://github.com/mihai-ufy)! - Add per-component React imports for tree-shaking, OSS governance files, expanded docs, and improved package metadata
