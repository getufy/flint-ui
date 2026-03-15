# Textarea

<Demo label="States" html="<div style=&quot;display:flex;flex-direction:column;gap:12px;width:100%;max-width:400px&quot;><flint-textarea label=&quot;Message&quot; placeholder=&quot;Type your message...&quot;></flint-textarea><flint-textarea label=&quot;Disabled&quot; disabled value=&quot;This textarea is disabled&quot;></flint-textarea></div>" />

A Textarea component for multi-line text input.

- **Tag**: `<flint-textarea>`
- **Class**: `FlintTextarea`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintTextarea } from '@getufy/flint-ui';
```

### Usage

```html
<flint-textarea></flint-textarea>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` | Current textarea value. |
| `placeholder` | `placeholder` | `string` | `''` | Placeholder text shown when empty. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the textarea and prevents interaction. |
| `readonly` | `readonly` | `boolean` | `false` | Makes the textarea read-only. |
| `required` | `required` | `boolean` | `false` | Marks the textarea as required for form validation. |
| `error` | `error` | `boolean` | `false` | Whether the textarea is in an error state. |
| `errorMessage` | `error-message` | `string` | `''` | Error message displayed below the textarea. |
| `helperText` | `helper-text` | `string` | `''` | Help text displayed below the textarea. |
| `label` | `label` | `string` | `''` | Label text displayed above the textarea. |
| `size` | `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Size variant of the textarea. |
| `rows` | `rows` | `number` | `3` | Number of visible text rows. |
| `maxlength` | `maxlength` | `number \| undefined` | `undefined` | Maximum number of characters allowed. |
| `minlength` | `minlength` | `number \| undefined` | `undefined` | Minimum number of characters required. |
| `name` | `name` | `string` | `''` | Form field name used when submitting form data. |
| `autocomplete` | `autocomplete` | `string` | `''` | Browser autocomplete hint. |
| `resize` | `resize` | `'none' \| 'both' \| 'horizontal' \| 'vertical' \| 'auto'` | `'vertical'` | Controls the resize handle. |
| `defaultValue` | `default-value` | `string` | `''` | Initial value for uncontrolled usage. |
| `ariaLabel` | `aria-label` | `string \| null` | `null` | Accessible label for screen readers when no visible label is provided. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-textarea-input` | `{ value: string }` | Dispatched on every keystroke. Detail: `{ value: string }` |
| `flint-textarea-change` | `{ value: string }` | Dispatched on blur/change. Detail: `{ value: string }` |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-textarea-min-height` | `80px` |
| `--flint-font-family` | — |
| `--flint-label-color` | — |
| `--flint-input-border-radius` | — |
| `--flint-input-border-color` | — |
| `--flint-input-bg` | — |
| `--flint-text-color` | — |
| `--flint-input-placeholder-color` | — |
| `--flint-input-border-hover-color` | — |
| `--flint-primary-color` | — |
| `--flint-primary-focus-ring` | — |
| `--flint-error-color` | — |
| `--flint-error-focus-ring` | — |
| `--flint-input-disabled-bg` | — |
| `--flint-input-disabled-color` | — |
| `--flint-input-readonly-bg` | — |
| `--flint-help-text-color` | — |

---
