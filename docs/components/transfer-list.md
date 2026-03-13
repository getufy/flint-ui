# Transfer List

<Demo html="<div style=&quot;width:100%;max-width:550px&quot;><ui-transfer-list left-title=&quot;Available&quot; right-title=&quot;Selected&quot; searchable data-options=&quot;js:JavaScript,ts:TypeScript,py:Python,rust:Rust,go:Go,java:Java,cpp:C++,ruby:Ruby&quot;></ui-transfer-list></div>" />

A premium Transfer List component for moving items between two lists.

- **Tag**: `<ui-transfer-list>`
- **Class**: `UiTransferList`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiTransferList } from 'storybook-lit';
```

### Usage

```html
<ui-transfer-list></ui-transfer-list>
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
| `--ui-transfer-list-width` | — |
| `--ui-transfer-list-height` | — |
| `--ui-font-family` | — |
| `--ui-text-color` | — |
| `--ui-text-color-muted` | — |
| `--ui-text-color-on-primary` | — |
| `--ui-primary-color` | — |
| `--ui-surface-2` | — |
| `--ui-border-color` | — |
| `--ui-border-radius-md` | `6px` |
| `--ui-primary-focus-ring` | — |
| `--ui-surface-1` | — |
| `--ui-border-radius-lg` | — |
| `--ui-shadow-sm` | — |
| `--ui-hover-color` | — |
| `--ui-primary-color-light` | — |
| `--ui-shadow-md` | — |

---
