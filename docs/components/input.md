# Input

<Demo label="Types" html='<div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:300px"><flint-input label="Text" placeholder="Enter your name"></flint-input><flint-input label="Email" type="email" placeholder="you@example.com"></flint-input><flint-input label="Password" type="password" value="secret123"></flint-input><flint-input label="Search" type="search" placeholder="Search..."></flint-input></div>' />

<Demo label="States" html='<div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:300px"><flint-input label="Disabled" disabled value="Cannot edit"></flint-input><flint-input label="Readonly" readonly value="Read only value"></flint-input><flint-input label="Error" error value="Invalid input" help-text="This field has an error"></flint-input></div>' />

<Demo label="Sizes" html='<div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:300px"><flint-input label="Small" size="sm" placeholder="Small"></flint-input><flint-input label="Default" placeholder="Default"></flint-input><flint-input label="Large" size="lg" placeholder="Large"></flint-input></div>' />

Input: a styled text input with label, help text, and error states.

- **Tag**: `<flint-input>`
- **Class**: `FlintInput`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintInput } from '@getufy/flint-ui';
```

### Usage

```html
<flint-input></flint-input>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | `string` | `''` | Label text displayed above the input. |
| `value` | `value` | `string` | `''` | Current value (controlled). When set, the component reflects this value and does not manage its own state. |
| `type` | `type` | `string` | `'text'` | HTML input type (text, email, password, etc.). |
| `placeholder` | `placeholder` | `string` | `''` | Placeholder text shown when the input is empty. |
| `helperText` | `helper-text` | `string` | `''` | Help text displayed below the input. |
| `error` | `error` | `boolean` | `false` | Whether the input is in an error state. |
| `errorMessage` | `error-message` | `string` | `''` | Error message displayed below the input. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the input and prevents interaction. |
| `required` | `required` | `boolean` | `false` | Marks the input as required for form validation. |
| `readonly` | `readonly` | `boolean` | `false` | Makes the input read-only. |
| `name` | `name` | `string` | `''` | Form field name used when submitting form data. |
| `autocomplete` | `autocomplete` | `string` | `''` | Browser autocomplete hint. |
| `pattern` | `pattern` | `string` | `''` | Regex pattern for validation. |
| `min` | `min` | `string` | `''` | Minimum value (for number/date inputs). |
| `max` | `max` | `string` | `''` | Maximum value (for number/date inputs). |
| `minLength` | `minlength` | `number \| undefined` | — | Minimum length for text validation. |
| `maxLength` | `maxlength` | `number \| undefined` | — | Maximum length for text validation. |
| `size` | `size` | `Size` | `'md'` | Size variant of the input. |
| `variant` | `variant` | `'outlined' \| 'filled'` | `'outlined'` | Visual variant of the input. |
| `pill` | `pill` | `boolean` | `false` | Whether to use pill-shaped (fully rounded) ends. |
| `defaultValue` | `default-value` | `string \| undefined` | — | Initial value (uncontrolled). Only used on first render; ignored after mount. |
| `clearable` | `clearable` | `boolean` | `false` | Shows a clear button when the input has a value. |
| `passwordToggle` | `password-toggle` | `boolean` | `false` | Shows a toggle button on password inputs to reveal/hide the value. |
| `passwordVisible` | `password-visible` | `boolean` | `false` | Whether the password is currently visible. Only relevant when `passwordToggle` is true. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-input-input` | `&#123; value: string &#125;` | Fired on each keystroke as the value changes. detail: `&#123; value: string &#125;` |
| `flint-input-change` | `&#123; value: string &#125;` | Fired when the input loses focus after the value has changed. detail: `&#123; value: string &#125;` |
| `flint-input-clear` | — | Fired when the clear button is clicked. detail: `undefined` |

### Slots

| Name | Description |
| --- | --- |
| `prefix` | Content placed before the input (e.g. icon). |
| `suffix` | Content placed after the input (e.g. icon). |

### CSS Parts

| Name | Description |
| --- | --- |
| `base` | The component wrapper. |
| `label` | The label element. |
| `input` | The native input element. |
| `prefix` | The prefix slot container. |
| `suffix` | The suffix slot container. |
| `clear-button` | The clear button. |
| `password-toggle-button` | The password toggle button. |
| `help-text` | The help text paragraph. |
| `error-message` | The error message paragraph. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-input-border-radius` | — |
| `--flint-input-border-color` | — |
| `--flint-input-bg` | — |
| `--flint-input-border-hover-color` | — |
| `--flint-input-placeholder-color` | — |
| `--flint-input-disabled-color` | — |
| `--flint-input-disabled-bg` | — |
| `--flint-input-readonly-bg` | — |
| `--flint-input-filled-bg` | `var(--flint-surface-background-flat, #f3f4f6` |
| `--flint-input-filled-bg-hover` | `#e5e7eb` |
| `--flint-font-family` | — |
| `--flint-label-color` | — |
| `--flint-primary-color` | — |
| `--flint-primary-focus-ring` | — |
| `--flint-error-color` | — |
| `--flint-error-focus-ring` | — |
| `--flint-text-color` | — |
| `--flint-help-text-color` | — |

---
