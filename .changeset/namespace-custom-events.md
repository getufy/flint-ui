---
"@getufy/flint-ui": major
"@getufy/flint-ui-react": major
---

Namespace all custom events to `flint-{component}-{event}` format

**Breaking change:** All custom events have been renamed from generic names (e.g. `change`, `input`, `close`) to namespaced names (e.g. `flint-select-change`, `flint-input-input`, `flint-dialog-close`). This affects every component that dispatches custom events.

React wrapper event props have been updated accordingly (e.g. `onFlintSelectChange` instead of `onChange`).

See `docs/migration/v0.3-to-v0.4.md` for the complete rename table and search-and-replace patterns.
