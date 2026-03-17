# Text Field

<Demo label="States" html='<div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:300px"><flint-text-field label="Name" placeholder="Enter your name"></flint-text-field><flint-text-field label="With Help" help-text="This field is required"></flint-text-field><flint-text-field label="Error" error help-text="Please enter a valid email"></flint-text-field><flint-text-field label="Disabled" disabled value="Cannot edit"></flint-text-field></div>' />

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
| `shadowRootOptions` | `shadowRootOptions` | `object` | `&#123; ...LitElement.shadowRootOptions, delegatesFocus: true &#125;` |  |
| `label` | `label` | `string` | `''` | Label text displayed above the input. |
| `value` | `value` | `string` | `''` | Current value of the text field. |
| `placeholder` | `placeholder` | `string` | `''` | Placeholder text shown when the input is empty. |
| `type` | `type` | `string` | `'text'` | HTML input type (e.g. 'text', 'password', 'email'). |
| `variant` | `variant` | `'outlined' \| 'filled'` | `'outlined'` | Visual style variant of the text field. |
| `disabled` | `disabled` | `boolean` | `false` | Whether the text field is disabled. |
| `error` | `error` | `boolean` | `false` | Whether the text field is in an error state. |
| `helperText` | `helperText` | `string` | `''` | Helper text displayed below the input. |
| `errorMessage` | `errorMessage` | `string` | `''` | Error message displayed below the input when in error state. |
| `defaultValue` | `default-value` | `string` | `''` | Initial value for uncontrolled usage. |
| `name` | `name` | `string` | `''` | Form field name used when submitting form data. |
| `required` | `required` | `boolean` | `false` | Marks the input as required for form validation. |
| `pattern` | `pattern` | `string` | `''` | Regex pattern for validation. |
| `min` | `min` | `string` | `''` | Minimum value (for number/date inputs). |
| `max` | `max` | `string` | `''` | Maximum value (for number/date inputs). |
| `minLength` | `minlength` | `number \| undefined` | — | Minimum length for text validation. |
| `maxLength` | `maxlength` | `number \| undefined` | — | Maximum length for text validation. |
| `readonly` | `readonly` | `boolean` | `false` | Makes the input read-only. |
| `clearable` | `clearable` | `boolean` | `false` | Shows a clear button when the input has a value. |
| `passwordToggle` | `password-toggle` | `boolean` | `false` | Shows a toggle button on password inputs to reveal/hide the value. |
| `passwordVisible` | `password-visible` | `boolean` | `false` | Whether the password is currently visible. Only relevant when `passwordToggle` is true. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-text-field-input` | `&#123; value: string &#125;` | Fired on each keystroke as the value changes. detail: `&#123; value: string &#125;` |
| `flint-text-field-change` | `&#123; value: string &#125;` | Fired when the input loses focus after the value has changed. detail: `&#123; value: string &#125;` |
| `flint-text-field-clear` | — | Fired when the clear button is clicked. detail: `undefined` |

### Slots

| Name | Description |
| --- | --- |
| `prefix` | Content placed before the input (e.g. icon). |
| `suffix` | Content placed after the input (e.g. icon). |

### CSS Parts

| Name | Description |
| --- | --- |
| `prefix-icon` | The prefix slot container. |
| `suffix-icon` | The suffix slot container. |
| `clear-button` | The clear button. |
| `password-toggle-button` | The password toggle button. |

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
| `--flint-text-color` | — |
| `--flint-help-text-color` | — |
| `--flint-surface-2` | — |
| `--flint-hover-color` | — |

---
