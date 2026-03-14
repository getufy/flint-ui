# Text Field

<Demo label="States" html="<div style=&quot;display:flex;flex-direction:column;gap:12px;width:100%;max-width:300px&quot;><flint-text-field label=&quot;Name&quot; placeholder=&quot;Enter your name&quot;></flint-text-field><flint-text-field label=&quot;With Help&quot; help-text=&quot;This field is required&quot;></flint-text-field><flint-text-field label=&quot;Error&quot; error help-text=&quot;Please enter a valid email&quot;></flint-text-field><flint-text-field label=&quot;Disabled&quot; disabled value=&quot;Cannot edit&quot;></flint-text-field></div>" />

- **Tag**: `<flint-text-field>`
- **Class**: `FlintTextField`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintTextField } from 'flint-ui';
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
| `placeholder` | `placeholder` | `string` | `''` | Placeholder text shown when the field is empty. |
| `type` | `type` | `string` | `'text'` | HTML input type (e.g. text, password, email). |
| `variant` | `variant` | `'outlined' \| 'filled'` | `'outlined'` | Visual style variant of the text field. |
| `disabled` | `disabled` | `boolean` | `false` | Prevents user interaction with the field. |
| `error` | `error` | `boolean` | `false` | Displays the field in an error state. |
| `helperText` | `helper-text` | `string` | `''` | Help text displayed below the input. |
| `errorMessage` | `error-message` | `string` | `''` | Error message displayed below the input when in error state. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `input` | `{ value: this.value }` | Fired on every keystroke as the user types. |
| `change` | `{ value: this.value }` | Fired when the input value changes on blur. |

### Slots

| Name | Description |
| --- | --- |
| `leading` | Content displayed before the input (e.g. an icon). |
| `trailing` | Content displayed after the input (e.g. an icon or button). |

### CSS Custom Properties

| Property | Default |
| --- | --- |
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
