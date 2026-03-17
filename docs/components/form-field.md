# Form Field

A form field wrapper that provides consistent layout (label + control +
helper text + error message) for any slotted form control.

- **Tag**: `<flint-form-field>`
- **Class**: `FlintFormField`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintFormField } from '@getufy/flint-ui';
```

### Usage

```html
<flint-form-field></flint-form-field>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | `string` | `''` | Field label text. |
| `helperText` | `helper-text` | `string` | `''` | Helper text displayed below the control. |
| `errorMessage` | `error-message` | `string` | `''` | Error message displayed when `error` is true. |
| `error` | `error` | `boolean` | `false` | Whether the field is in an error state. |
| `required` | `required` | `boolean` | `false` | Shows a required indicator next to the label. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the field and its slotted control. |
| `labelPosition` | `label-position` | `LabelPosition` | `'top'` | Label placement relative to the control. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | The form control (e.g. FlintInput, FlintSelect, FlintCheckbox). |
| `label` | Custom label content (overrides the `label` prop). |
| `helper-text` | Custom helper text content (overrides the `helper-text` prop). |
| `error-message` | Custom error message content (overrides the `error-message` prop). |

### CSS Parts

| Name | Description |
| --- | --- |
| `label` | The label element. |
| `field` | The control wrapper. |
| `helper-text` | The helper text element. |
| `error-message` | The error message element. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-form-field-gap` | `6px` |
| `--flint-form-field-label-width` | `120px` |
| `--flint-form-field-label-font-size` | `0.875rem` |
| `--flint-form-field-label-font-weight` | `500` |
| `--flint-form-field-required-color` | — |
| `--flint-form-field-helper-font-size` | `0.75rem` |
| `--flint-form-field-error-font-size` | `0.75rem` |
| `--flint-form-field-error-color` | — |
| `--flint-font-family` | `system-ui, sans-serif` |
| `--flint-text-color` | — |
| `--flint-text-color-muted` | — |

---
