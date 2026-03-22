# @getufy/flint-ui

## [0.8.3](https://github.com/getufy/flint-ui/compare/flint-ui-v0.8.2...flint-ui-v0.8.3) (2026-03-22)


### Features

* add hoist prop and string array options to autocomplete ([37600ec](https://github.com/getufy/flint-ui/commit/37600ec2084c17cd4075cd823155f9989bdb781d))
* add missing semantic tokens for success/warning/neutral colors ([59be9b4](https://github.com/getufy/flint-ui/commit/59be9b4f890632c1047846857730b311e7109b12))


### Bug Fixes

* prevent drawer content clipping with box-sizing border-box ([767b3f4](https://github.com/getufy/flint-ui/commit/767b3f4060d676e06ce425610d4e24e4163e8fa6))
* remove hardcoded CSS fallbacks that break dark mode on overlays ([daca7cd](https://github.com/getufy/flint-ui/commit/daca7cdfb2c0bacb4c8a55374b288d7f859186ef))
* rewrite storybook playbooks and fix CI failures ([ca26fa8](https://github.com/getufy/flint-ui/commit/ca26fa8b1b90a9718192a25845b489edd7d05997))

## [0.8.2](https://github.com/getufy/flint-ui/compare/flint-ui-v0.8.1...flint-ui-v0.8.2) (2026-03-17)


### Features

* add max prop to linear and circular progress ([95b331d](https://github.com/getufy/flint-ui/commit/95b331dda8e9922c32e769209e49a6760f85acd6))


### Bug Fixes

* improve JSDoc on table components ([f2747d8](https://github.com/getufy/flint-ui/commit/f2747d8c771496c9c95c6269a9d4af7f09520da2))

## [0.8.1](https://github.com/getufy/flint-ui/compare/flint-ui-v0.8.0...flint-ui-v0.8.1) (2026-03-17)


### Bug Fixes

* add source files to sideEffects to fix VitePress docs ([dd4554e](https://github.com/getufy/flint-ui/commit/dd4554e77501bfc633e0d248ce67f67c4beb8298))

## [0.8.0](https://github.com/getufy/flint-ui/compare/flint-ui-v0.7.0...flint-ui-v0.8.0) (2026-03-17)


### ⚠ BREAKING CHANGES

* Button appearance/color replaces variant; Skeleton shape replaces variant; Progress mode replaces variant; Select change event detail is now a discriminated union. Old props still work with deprecation warnings.

### Features

* complete v0.7.0 DX report — P1 breaking changes, P2 React DX, P3 docs ([a82f451](https://github.com/getufy/flint-ui/commit/a82f4512e7836752b0503d50feefcc3e14da8689))


### Bug Fixes

* resolve P0 bugs from v0.7.0 DX report — scroll lock, card overflow, tab UX ([f650968](https://github.com/getufy/flint-ui/commit/f65096883f8831ffa154db296aee9023c4201206))

## [0.7.0](https://github.com/getufy/flint-ui/compare/flint-ui-v0.6.1...flint-ui-v0.7.0) (2026-03-16)


### ⚠ BREAKING CHANGES

* Rating no longer renders a hidden <input> (uses ElementInternals instead).
* Size props changed from 'small'/'medium'/'large'/'default' to 'sm'/'md'/'lg'. Drawer anchor prop renamed to placement. HoverCard side prop renamed to placement. Toggle outline variant renamed to outlined. TextField leading/trailing slots renamed to prefix/suffix.
* Button now renders prefix/suffix slot wrappers and CSS parts in its shadow DOM.

### Features

* complete all P2 items — forms, components, testing, infrastructure ([8930614](https://github.com/getufy/flint-ui/commit/89306141d4a54f72b753f8c102240cf73f27e40b))
* complete all P3 backlog — tests, stories, a11y fix, abort bug fix ([0e709e9](https://github.com/getufy/flint-ui/commit/0e709e9df1380c813cf35d69ff4f66898a3a7396))
* complete P0 + P1 — SSR guards, typed open events, TODO audit ([7c2b5fa](https://github.com/getufy/flint-ui/commit/7c2b5fa2da7d2d85c1291c10dbccf160e985d2b2))
* controlled/uncontrolled docs, Select string value, responsive Stack, event naming, theming docs, Chip events ([a6deddb](https://github.com/getufy/flint-ui/commit/a6deddb92cf6fcc53bd700aa487649c5cc0984b3))
* P0 ship-blocking fixes — focus trap, SSR guards, button overhaul, form/a11y improvements ([72966c2](https://github.com/getufy/flint-ui/commit/72966c2e1450ab292c87742e3ccdecd0cbe1a908))
* P1 — API consistency, form APIs, design tokens, a11y, TypeScript improvements ([b6e3cc8](https://github.com/getufy/flint-ui/commit/b6e3cc899a36e6d0f9a72cb0f379add5199e6dd0))
* P2 — CSS parts, form system, component features, testing & CI, infrastructure ([c648df7](https://github.com/getufy/flint-ui/commit/c648df71bb619f6526ddc596479d5c83aa4637fa))
* P3 — quick fixes, new components, advanced patterns, testing infrastructure ([18aea44](https://github.com/getufy/flint-ui/commit/18aea44a8ccec5711c0c336fbe7c431e6c4282d5))
* typed event detail exports, Card click event, [@fires](https://github.com/fires) JSDoc fixes ([61db322](https://github.com/getufy/flint-ui/commit/61db32285441e79670d76334a42de10d43973b1e))


### Bug Fixes

* auto-focus first focusable element in Dialog/Drawer, CardMedia object-fit ([ecec5cc](https://github.com/getufy/flint-ui/commit/ecec5cc993431ee71d7324664e496d95070a8754))
* React event forwarding, drawer/select stacking, CSS fixes (v0.6.1 DX report) ([fb14ddc](https://github.com/getufy/flint-ui/commit/fb14ddc90a40c11d8686fb87bea39d90eddbab81))
* resolve CI failures — lock file sync, command filter loop, type errors ([d6eee5e](https://github.com/getufy/flint-ui/commit/d6eee5e380e31d7425ddc74376cf74efad34531f))
* size limits, audit vulnerability, chromatic token guard, snapshot ([bdfb3cf](https://github.com/getufy/flint-ui/commit/bdfb3cf289b805a319cb92c924101a9e4fddecb5))
* WCAG 2.5.8 touch target compliance — 44x44px minimum on all interactive components ([0bb76be](https://github.com/getufy/flint-ui/commit/0bb76be6dde1d66190174e007496e2fea992ca19))

## 0.6.1

### Major Changes

- [`4d6440c`](https://github.com/getufy/flint-ui/commit/4d6440c2c03d0b667bc7d2f9109566f45ce080db) Thanks [@mihai-ufy](https://github.com/mihai-ufy)! - Namespace all custom events to `flint-{component}-{event}` format

  **Breaking change:** All custom events have been renamed from generic names (e.g. `change`, `input`, `close`) to namespaced names (e.g. `flint-select-change`, `flint-input-input`, `flint-dialog-close`). This affects every component that dispatches custom events.

  React wrapper event props have been updated accordingly (e.g. `onFlintSelectChange` instead of `onChange`).

  See `docs/migration/v0.3-to-v0.4.md` for the complete rename table and search-and-replace patterns.

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

## 0.4.0

### Minor Changes (BREAKING)

- Namespace all custom events, fix CSS overflow, harden codegen

  - **Event naming convention**: All custom events now follow the `flint-{component}-{event}` pattern. This is a breaking change for consumers listening to bare DOM event names.
    - `change` → `flint-text-field-change`, `flint-select-change`, `flint-chip-change`, `flint-time-picker-change`, `flint-date-picker-change`, etc.
    - `input` → `flint-text-field-input`, `flint-textarea-input`, etc.
    - `click` → `flint-chip-click`, `flint-speed-dial-action-click`
    - `close` → `flint-dialog-close`, `flint-menu-close`, `flint-snackbar-close`
    - `open`/`close` → `flint-hover-card-open`/`flint-hover-card-close`, `flint-speed-dial-open`/`flint-speed-dial-close`
  - **CSS overflow fixes**: Changed `overflow: hidden` to `overflow: clip` on Card, Dialog, Menu, ResizableGroup, ResizablePanel, and SplitPanel.
  - **Codegen improvements**: Parser now handles `@fires` JSDoc fallback for ternary/variable event dispatches, strips `{Type}` prefixes, skips native DOM events, and cleans up stale event files.
  - **TextField**: Default margin changed to `var(--flint-text-field-margin-bottom, 0)` (was `0 0 16px`).
  - **Menu**: Added `min-width: 200px`, `width: max-content`, and `--flint-menu-max-width` CSS custom property.
  - **InputOtp**: Focus listener moved to `connectedCallback`/`disconnectedCallback` to prevent memory leaks.

## 0.3.0

### Minor Changes (BREAKING)

- Standardize event payloads, form props, and improve docs discoverability
  - **Event payload consistency**: All open/close events now include `detail: { open: true/false }`. Stepper events use `{ step }` instead of `{ index }`. Chip delete click handler now includes `detail: { value }`.
  - **Form prop standardization**: Renamed `helpText` to `helperText` (attribute: `helper-text`) on FlintInput and FlintTextarea. Added `errorMessage` prop to date/time picker components.
  - **React wrappers**: Explicit prop interfaces with full JSDoc, typed event detail generics, and slot documentation for all 185+ wrapper components.

## 0.2.2

### Patch Changes

- [`6a4a210`](https://github.com/getufy/flint-ui/commit/6a4a21067db72f1071674622263a1561f3663e30) Thanks [@mihai-ufy](https://github.com/mihai-ufy)! - Add per-component React imports for tree-shaking, OSS governance files, expanded docs, and improved package metadata
