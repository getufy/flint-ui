# Checkbox

<Demo label="States" html='<div style="display:flex;gap:8px;flex-wrap:wrap"><flint-checkbox label="Unchecked"></flint-checkbox><flint-checkbox label="Checked" checked></flint-checkbox><flint-checkbox label="Indeterminate" indeterminate></flint-checkbox><flint-checkbox label="Disabled" disabled></flint-checkbox><flint-checkbox label="Checked Disabled" checked disabled></flint-checkbox></div>' />

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
| `checked` | `checked` | `boolean` | `false` | Current checked state (controlled). When set, the component reflects this state and does not manage its own state. |
| `indeterminate` | `indeterminate` | `boolean` | `false` | Displays the checkbox in an indeterminate state. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the checkbox and prevents interaction. |
| `required` | `required` | `boolean` | `false` | Marks the checkbox as required for form validation. |
| `size` | `size` | `Size` | `'md'` | Size of the checkbox control. |
| `label` | `label` | `string` | `''` | Visible label text displayed next to the checkbox. |
| `name` | `name` | `string` | `''` | Form field name used when submitting form data. |
| `value` | `value` | `string` | `'on'` | Value submitted with form data when checked. |
| `defaultChecked` | `default-checked` | `boolean` | `false` | Initial checked state (uncontrolled). Only used on first render; ignored after mount. |
| `ariaLabel` | `aria-label` | `string \| null` | `null` | Accessible label for screen readers when no visible label is provided. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-checkbox-change` | `&#123; checked: boolean; value: string; indeterminate: boolean &#125;` | Fired when the checked state changes. detail: `&#123; checked: boolean; value: string; indeterminate: boolean &#125;` |

### CSS Parts

| Name | Description |
| --- | --- |
| `base` | The checkbox's base wrapper label. |
| `control` | The checkbox visual indicator. |
| `label` | The label text element. |

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
