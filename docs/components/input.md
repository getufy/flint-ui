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
| `value` | `value` | `string` | `''` | Current input value. |
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
| `size` | `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | 'sm' \| 'default' \| 'lg' |
| `defaultValue` | `default-value` | `string \| undefined` | — | Initial value for uncontrolled usage. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-input-input` | — | Fired on each keystroke as the value changes. |
| `flint-input-change` | — | Fired when the input loses focus after the value has changed. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-input-border-radius` | — |
| `--flint-input-border-color` | — |
| `--flint-input-bg` | — |
| `--flint-input-placeholder-color` | — |
| `--flint-input-border-hover-color` | — |
| `--flint-input-disabled-bg` | — |
| `--flint-input-disabled-color` | — |
| `--flint-input-readonly-bg` | — |
| `--flint-font-family` | — |
| `--flint-label-color` | — |
| `--flint-text-color` | — |
| `--flint-primary-color` | — |
| `--flint-primary-focus-ring` | — |
| `--flint-error-color` | — |
| `--flint-error-focus-ring` | — |
| `--flint-help-text-color` | — |

---
