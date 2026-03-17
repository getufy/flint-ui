# Copy Button

<Demo html='<div style="display:flex;gap:8px;flex-wrap:wrap"><flint-copy-button value="Hello, World!">Copy Text</flint-copy-button><flint-copy-button value="npm install @getufy/flint-ui">Copy Command</flint-copy-button></div>' />

Copy Button: copies text to the clipboard with visual feedback.

- **Tag**: `<flint-copy-button>`
- **Class**: `FlintCopyButton`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintCopyButton } from '@getufy/flint-ui';
```

### Usage

```html
<flint-copy-button></flint-copy-button>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` | The text value to copy. |
| `from` | `from` | `string` | `''` | An id referencing another element to copy from. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the copy button. |
| `copyLabel` | `copy-label` | `string` | `'Copy'` | Label shown in the tooltip (idle state). |
| `successLabel` | `success-label` | `string` | `'Copied!'` | Label shown in the tooltip after successful copy. |
| `errorLabel` | `error-label` | `string` | `'Error'` | Label shown in the tooltip on copy error. |
| `feedbackDuration` | `feedback-duration` | `number` | `1000` | Duration (ms) to show feedback before returning to idle. |
| `tooltipPlacement` | `tooltip-placement` | `Placement` | `'top'` | Tooltip placement. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-copy-error` | `&#123; reason: string &#125;` | Fired when the copy operation fails. detail: `&#123; reason: string &#125;` |
| `flint-copy` | `&#123; value: string &#125;` | Fired after a successful copy operation. detail: `&#123; value: string &#125;` |

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
