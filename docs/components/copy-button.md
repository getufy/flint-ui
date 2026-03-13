# Copy Button

- **Tag**: `<ui-copy-button>`
- **Class**: `UiCopyButton`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiCopyButton } from 'storybook-lit';
```

### Usage

```html
<ui-copy-button></ui-copy-button>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` | The text value to copy. |
| `from` | `from` | `string` | `''` |  |
| `disabled` | `disabled` | `boolean` | `false` | Disables the copy button. |
| `copyLabel` | `copy-label` | `string` | `'Copy'` | Label shown in the tooltip (idle state). |
| `successLabel` | `success-label` | `string` | `'Copied!'` | Label shown in the tooltip after successful copy. |
| `errorLabel` | `error-label` | `string` | `'Error'` | Label shown in the tooltip on copy error. |
| `feedbackDuration` | `feedback-duration` | `number` | `1000` | Duration (ms) to show feedback before returning to idle. |
| `tooltipPlacement` | `tooltip-placement` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | Tooltip placement. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `ui-copy-error` | `{ reason: 'empty' }` |  |
| `ui-copy` | `{ value: text }` |  |

### Slots

| Name | Description |
| --- | --- |
| `success-icon` |  |
| `error-icon` |  |
| `copy-icon` |  |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-copy-button-size` | — |
| `--ui-copy-button-icon-size` | — |
| `--ui-copy-button-success-color` | `var(--ui-success-color` |
| `--ui-copy-button-error-color` | `var(--ui-error-color` |
| `--ui-font-family` | — |
| `--ui-border-color` | — |
| `--ui-border-radius-md` | — |
| `--ui-surface-1` | — |
| `--ui-text-color-muted` | — |
| `--ui-hover-color` | — |
| `--ui-text-color` | — |
| `--ui-active-color` | — |
| `--ui-primary-color` | — |
| `--ui-border-radius-sm` | — |
| `--ui-tooltip-bg` | — |
| `--ui-tooltip-text-color` | — |

---
