# Transfer List

<Demo html='<div style="width:100%;max-width:550px"><flint-transfer-list left-title="Available" right-title="Selected" searchable data-options="js:JavaScript,ts:TypeScript,py:Python,rust:Rust,go:Go,java:Java,cpp:C++,ruby:Ruby"></flint-transfer-list></div>' />

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
| `leftTitle` | `leftTitle` | `string` | `'Options'` | Title displayed above the left (available) list. |
| `rightTitle` | `rightTitle` | `string` | `'Selected'` | Title displayed above the right (selected) list. |
| `disabled` | `disabled` | `boolean` | `false` | Whether the transfer list is disabled. |
| `searchable` | `searchable` | `boolean` | `false` | Whether to show search inputs for filtering each list. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-transfer-list-change` | `&#123; value: string[] &#125;` | Dispatched when items are moved between lists. detail: `&#123; value: string[] &#125;` |

### CSS Parts

| Name | Description |
| --- | --- |
| `actions` | The actions container. |
| `base` | The component's base wrapper element. |
| `header` | The header element. |
| `left-list` | The left list element. |
| `right-list` | The right list element. |

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
