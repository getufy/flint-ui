# @getufy/flint-ui-react

## 1.0.0

### Major Changes

- [`9ea8e85`](https://github.com/getufy/flint-ui/commit/9ea8e85141daf26f7770d3821b98efe8ed160af9) Thanks [@mihai-ufy](https://github.com/mihai-ufy)! - BREAKING: v0.3.0 release

  - **Event payload consistency**: All open/close events now include `detail: { open: true/false }`. Stepper events use `{ step }` instead of `{ index }`. Chip delete click handler now includes `detail: { value }`.
  - **Form prop standardization**: Renamed `helpText` to `helperText` (attribute: `helper-text`) on FlintInput and FlintTextarea. Added `errorMessage` prop to date/time picker components.
  - **Docs discoverability**: Added prominent Resources sections with links to docs, Storybook, and React wrappers in both package READMEs.
  - **React wrappers**: Explicit prop interfaces with full JSDoc, typed event detail generics, and slot documentation for all 185+ wrapper components.

### Patch Changes

- Updated dependencies [[`9ea8e85`](https://github.com/getufy/flint-ui/commit/9ea8e85141daf26f7770d3821b98efe8ed160af9)]:
  - @getufy/flint-ui@1.0.0

## 0.2.2

### Patch Changes

- [`6a4a210`](https://github.com/getufy/flint-ui/commit/6a4a21067db72f1071674622263a1561f3663e30) Thanks [@mihai-ufy](https://github.com/mihai-ufy)! - Add per-component React imports for tree-shaking, OSS governance files, expanded docs, and improved package metadata

- Updated dependencies [[`6a4a210`](https://github.com/getufy/flint-ui/commit/6a4a21067db72f1071674622263a1561f3663e30)]:
  - @getufy/flint-ui@0.2.2
