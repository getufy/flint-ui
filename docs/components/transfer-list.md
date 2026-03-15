# Transfer List

<Demo html="<div style=&quot;width:100%;max-width:550px&quot;><flint-transfer-list left-title=&quot;Available&quot; right-title=&quot;Selected&quot; searchable data-options=&quot;js:JavaScript,ts:TypeScript,py:Python,rust:Rust,go:Go,java:Java,cpp:C++,ruby:Ruby&quot;></flint-transfer-list></div>" />

A premium Transfer List component for moving items between two lists.

- **Tag**: `<flint-transfer-list>`
- **Class**: `FlintTransferList`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintTransferList } from '@getufy/flint-ui';
```

### Usage

```html
<flint-transfer-list></flint-transfer-list>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `options` | `options` | `TransferOption[]` | `[]` | Available options to display in the transfer list. |
| `value` | `value` | `string[]` | `[]` | Currently selected values (items in the right list). |
| `defaultValue` | `default-value` | `string[]` | `[]` | Initial value for uncontrolled usage. Applied once on first render. |
| `leftTitle` | `left-title` | `string` | `'Options'` | Title displayed above the left (available) list. |
| `rightTitle` | `right-title` | `string` | `'Selected'` | Title displayed above the right (selected) list. |
| `disabled` | `disabled` | `boolean` | `false` | Whether the transfer list is disabled. |
| `searchable` | `searchable` | `boolean` | `false` | Whether to show search inputs for filtering each list. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-transfer-list-change` | — | Dispatched when items are moved between lists. detail: `{ value: string[] }` |

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
