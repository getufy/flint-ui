# @getufy/flint-ui-react

## [0.8.0](https://github.com/getufy/flint-ui/compare/flint-ui-react-v0.7.0...flint-ui-react-v0.8.0) (2026-03-17)


### ⚠ BREAKING CHANGES

* Button appearance/color replaces variant; Skeleton shape replaces variant; Progress mode replaces variant; Select change event detail is now a discriminated union. Old props still work with deprecation warnings.

### Features

* complete v0.7.0 DX report — P1 breaking changes, P2 React DX, P3 docs ([a82f451](https://github.com/getufy/flint-ui/commit/a82f4512e7836752b0503d50feefcc3e14da8689))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @getufy/flint-ui bumped from 0.7.0 to 0.8.0
  * peerDependencies
    * @getufy/flint-ui bumped from ^0.7.0 to ^0.8.0

## [0.7.0](https://github.com/getufy/flint-ui/compare/flint-ui-react-v0.6.1...flint-ui-react-v0.7.0) (2026-03-16)


### Features

* complete all P2 items — forms, components, testing, infrastructure ([8930614](https://github.com/getufy/flint-ui/commit/89306141d4a54f72b753f8c102240cf73f27e40b))
* complete P0 + P1 — SSR guards, typed open events, TODO audit ([7c2b5fa](https://github.com/getufy/flint-ui/commit/7c2b5fa2da7d2d85c1291c10dbccf160e985d2b2))
* controlled/uncontrolled docs, Select string value, responsive Stack, event naming, theming docs, Chip events ([a6deddb](https://github.com/getufy/flint-ui/commit/a6deddb92cf6fcc53bd700aa487649c5cc0984b3))
* typed event detail exports, Card click event, [@fires](https://github.com/fires) JSDoc fixes ([61db322](https://github.com/getufy/flint-ui/commit/61db32285441e79670d76334a42de10d43973b1e))


### Bug Fixes

* auto-focus first focusable element in Dialog/Drawer, CardMedia object-fit ([ecec5cc](https://github.com/getufy/flint-ui/commit/ecec5cc993431ee71d7324664e496d95070a8754))
* React event forwarding, drawer/select stacking, CSS fixes (v0.6.1 DX report) ([fb14ddc](https://github.com/getufy/flint-ui/commit/fb14ddc90a40c11d8686fb87bea39d90eddbab81))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @getufy/flint-ui bumped from * to 0.7.0
  * peerDependencies
    * @getufy/flint-ui bumped from ^0.6.0 to ^0.7.0

## 0.6.1

### Major Changes

- [`4d6440c`](https://github.com/getufy/flint-ui/commit/4d6440c2c03d0b667bc7d2f9109566f45ce080db) Thanks [@mihai-ufy](https://github.com/mihai-ufy)! - Namespace all custom events to `flint-{component}-{event}` format

  **Breaking change:** All custom events have been renamed from generic names (e.g. `change`, `input`, `close`) to namespaced names (e.g. `flint-select-change`, `flint-input-input`, `flint-dialog-close`). This affects every component that dispatches custom events.

  React wrapper event props have been updated accordingly (e.g. `onFlintSelectChange` instead of `onChange`).

  See `docs/migration/v0.3-to-v0.4.md` for the complete rename table and search-and-replace patterns.

### Patch Changes

- Updated dependencies [[`4d6440c`](https://github.com/getufy/flint-ui/commit/4d6440c2c03d0b667bc7d2f9109566f45ce080db)]:
  - @getufy/flint-ui@0.6.1

## 0.6.1

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
  - @getufy/flint-ui@0.6.1

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
