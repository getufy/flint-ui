# Transfer List

<Demo html="<div style=&quot;width:100%;max-width:550px&quot;><flint-transfer-list left-title=&quot;Available&quot; right-title=&quot;Selected&quot; searchable data-options=&quot;js:JavaScript,ts:TypeScript,py:Python,rust:Rust,go:Go,java:Java,cpp:C++,ruby:Ruby&quot;></flint-transfer-list></div>" />

A premium Transfer List component for moving items between two lists.

- **Tag**: `<flint-transfer-list>`
- **Class**: `FlintTransferList`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintTransferList } from 'flint-ui';
```

### Usage

```html
<flint-transfer-list></flint-transfer-list>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `options` | `options` | `TransferOption[]` | `[]` |  |
| `value` | `value` | `string[]` | `[]` |  |
| `defaultValue` | `default-value` | `string[]` | `[]` | Initial value for uncontrolled usage. Applied once on first render. |
| `leftTitle` | `left-title` | `string` | `'Options'` |  |
| `rightTitle` | `right-title` | `string` | `'Selected'` |  |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `searchable` | `searchable` | `boolean` | `false` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `change` | — | Dispatched when items are moved between lists. Detail: `{ value: string[] }` |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-transfer-list-width` | — |
| `--flint-transfer-list-height` | — |
| `--flint-font-family` | — |
| `--flint-text-color` | — |
| `--flint-text-color-muted` | — |
| `--flint-text-color-on-primary` | — |
| `--flint-primary-color` | — |
| `--flint-surface-2` | — |
| `--flint-border-color` | — |
| `--flint-border-radius-md` | `6px` |
| `--flint-primary-focus-ring` | — |
| `--flint-surface-1` | — |
| `--flint-border-radius-lg` | — |
| `--flint-shadow-sm` | — |
| `--flint-hover-color` | — |
| `--flint-primary-color-light` | — |
| `--flint-shadow-md` | — |

---

## Accessibility

- **Keyboard**: Arrow keys navigate items, Space toggles selection, transfer buttons move items.
- **ARIA**: dual `role="listbox"` panels with `aria-selected`.
- **Screen reader**: announces list labels and selected items.
