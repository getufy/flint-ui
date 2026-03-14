# Copy Button

<Demo html="<div style=&quot;display:flex;gap:8px;flex-wrap:wrap&quot;><flint-copy-button value=&quot;Hello, World!&quot;>Copy Text</flint-copy-button><flint-copy-button value=&quot;npm install flint-ui&quot;>Copy Command</flint-copy-button></div>" />

- **Tag**: `<flint-copy-button>`
- **Class**: `FlintCopyButton`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintCopyButton } from 'flint-ui';
```

### Usage

```html
<flint-copy-button></flint-copy-button>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` | The text value to copy. |
| `from` | `from` | `string` | `''` | ID reference to another element to copy text from. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the copy button. |
| `copyLabel` | `copy-label` | `string` | `'Copy'` | Label shown in the tooltip (idle state). |
| `successLabel` | `success-label` | `string` | `'Copied!'` | Label shown in the tooltip after successful copy. |
| `errorLabel` | `error-label` | `string` | `'Error'` | Label shown in the tooltip on copy error. |
| `feedbackDuration` | `feedback-duration` | `number` | `1000` | Duration (ms) to show feedback before returning to idle. |
| `tooltipPlacement` | `tooltip-placement` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | Tooltip placement. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-copy-error` | `{ reason: 'empty' }` | Fired when the copy operation fails or the value is empty. |
| `flint-copy` | `{ value: text }` | Fired after a successful copy to the clipboard. |

### Slots

| Name | Description |
| --- | --- |
| `success-icon` | Custom icon shown after a successful copy. |
| `error-icon` | Custom icon shown when a copy error occurs. |
| `copy-icon` | Custom icon shown in the idle state. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-copy-button-size` | — |
| `--flint-copy-button-icon-size` | — |
| `--flint-copy-button-success-color` | `var(--flint-success-color` |
| `--flint-copy-button-error-color` | `var(--flint-error-color` |
| `--flint-font-family` | — |
| `--flint-border-color` | — |
| `--flint-border-radius-md` | — |
| `--flint-surface-1` | — |
| `--flint-text-color-muted` | — |
| `--flint-hover-color` | — |
| `--flint-text-color` | — |
| `--flint-active-color` | — |
| `--flint-primary-color` | — |
| `--flint-border-radius-sm` | — |
| `--flint-tooltip-bg` | — |
| `--flint-tooltip-text-color` | — |

---
