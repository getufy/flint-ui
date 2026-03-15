# @getufy/flint-ui

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
