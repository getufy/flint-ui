# Checkbox

<Demo label="States" html="<div style=&quot;display:flex;gap:8px;flex-wrap:wrap&quot;><flint-checkbox label=&quot;Unchecked&quot;></flint-checkbox><flint-checkbox label=&quot;Checked&quot; checked></flint-checkbox><flint-checkbox label=&quot;Indeterminate&quot; indeterminate></flint-checkbox><flint-checkbox label=&quot;Disabled&quot; disabled></flint-checkbox><flint-checkbox label=&quot;Checked Disabled&quot; checked disabled></flint-checkbox></div>" />

Checkbox: a form control for boolean selection.

- **Tag**: `<flint-checkbox>`
- **Class**: `FlintCheckbox`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintCheckbox } from '@getufy/flint-ui';
```

### Usage

```html
<flint-checkbox></flint-checkbox>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `checked` | `checked` | `boolean` | `false` | Whether the checkbox is checked. |
| `indeterminate` | `indeterminate` | `boolean` | `false` | Displays the checkbox in an indeterminate state. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the checkbox and prevents interaction. |
| `required` | `required` | `boolean` | `false` | Marks the checkbox as required for form validation. |
| `size` | `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the checkbox control. |
| `label` | `label` | `string` | `''` | Visible label text displayed next to the checkbox. |
| `name` | `name` | `string` | `''` | Form field name used when submitting form data. |
| `value` | `value` | `string` | `'on'` | Value submitted with form data when checked. |
| `defaultChecked` | `default-checked` | `boolean` | `false` | Initial checked state for uncontrolled usage. |
| `ariaLabel` | `aria-label` | `string \| null` | `null` | Accessible label for screen readers when no visible label is provided. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-checkbox-change` | — | Fired when the checked state changes. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-checkbox-size` | `18px` |
| `--flint-checkbox-border-radius` | `var(--flint-border-radius-sm` |
| `--flint-checkbox-gap` | `8px` |
| `--flint-checkbox-size-sm` | `14px` |
| `--flint-checkbox-size-lg` | `22px` |
| `--flint-checkbox-icon-size` | `12px` |
| `--flint-checkbox-icon-size-sm` | `10px` |
| `--flint-checkbox-icon-size-lg` | `16px` |
| `--flint-checkbox-label-font-size` | `14px` |
| `--flint-checkbox-label-font-size-sm` | `12px` |
| `--flint-checkbox-label-font-size-lg` | `16px` |
| `--flint-font-family` | — |
| `--flint-text-color` | — |
| `--flint-input-border-color` | — |
| `--flint-surface-1` | — |
| `--flint-primary-color` | — |
| `--flint-text-color-on-primary` | — |

---
