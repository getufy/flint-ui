# Text Field

<Demo label="States" html="<div style=&quot;display:flex;flex-direction:column;gap:12px;width:100%;max-width:300px&quot;><flint-text-field label=&quot;Name&quot; placeholder=&quot;Enter your name&quot;></flint-text-field><flint-text-field label=&quot;With Help&quot; help-text=&quot;This field is required&quot;></flint-text-field><flint-text-field label=&quot;Error&quot; error help-text=&quot;Please enter a valid email&quot;></flint-text-field><flint-text-field label=&quot;Disabled&quot; disabled value=&quot;Cannot edit&quot;></flint-text-field></div>" />

Text Field: a styled text input with outlined/filled variants.

- **Tag**: `<flint-text-field>`
- **Class**: `FlintTextField`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintTextField } from '@getufy/flint-ui';
```

### Usage

```html
<flint-text-field></flint-text-field>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | `string` | `''` | Label text displayed above the input. |
| `value` | `value` | `string` | `''` | Current value of the text field. |
| `placeholder` | `placeholder` | `string` | `''` | Placeholder text shown when the input is empty. |
| `type` | `type` | `string` | `'text'` | HTML input type (e.g. 'text', 'password', 'email'). |
| `variant` | `variant` | `'outlined' \| 'filled'` | `'outlined'` | Visual style variant of the text field. |
| `disabled` | `disabled` | `boolean` | `false` | Whether the text field is disabled. |
| `error` | `error` | `boolean` | `false` | Whether the text field is in an error state. |
| `helperText` | `helper-text` | `string` | `''` | Helper text displayed below the input. |
| `errorMessage` | `error-message` | `string` | `''` | Error message displayed below the input when in error state. |
| `defaultValue` | `default-value` | `string` | `''` | Initial value for uncontrolled usage. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-text-field-input` | — | Fired on each keystroke as the value changes. detail: `{ value: string }` |
| `flint-text-field-change` | — | Fired when the input loses focus after the value has changed. detail: `{ value: string }` |

### Slots

| Name | Description |
| --- | --- |
| `leading` |  |
| `trailing` |  |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-text-field-margin-bottom` | `0` |
| `--flint-font-family` | — |
| `--flint-label-color` | — |
| `--flint-input-bg` | — |
| `--flint-input-border-color` | — |
| `--flint-input-border-radius` | — |
| `--flint-input-border-hover-color` | — |
| `--flint-primary-color` | — |
| `--flint-primary-focus-ring` | — |
| `--flint-error-color` | — |
| `--flint-error-focus-ring` | — |
| `--flint-input-disabled-bg` | — |
| `--flint-input-placeholder-color` | — |
| `--flint-text-color-muted` | — |
| `--flint-help-text-color` | — |
| `--flint-surface-2` | — |
| `--flint-hover-color` | — |

---
