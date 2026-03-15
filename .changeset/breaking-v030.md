---
"@getufy/flint-ui": major
"@getufy/flint-ui-react": major
---

BREAKING: v0.3.0 release

- **Event payload consistency**: All open/close events now include `detail: { open: true/false }`. Stepper events use `{ step }` instead of `{ index }`. Chip delete click handler now includes `detail: { value }`.
- **Form prop standardization**: Renamed `helpText` to `helperText` (attribute: `helper-text`) on FlintInput and FlintTextarea. Added `errorMessage` prop to date/time picker components.
- **Docs discoverability**: Added prominent Resources sections with links to docs, Storybook, and React wrappers in both package READMEs.
- **React wrappers**: Explicit prop interfaces with full JSDoc, typed event detail generics, and slot documentation for all 185+ wrapper components.
