# Checkbox

<Demo label="States" html="<div style=&quot;display:flex;gap:8px;flex-wrap:wrap&quot;><flint-checkbox label=&quot;Unchecked&quot;></flint-checkbox><flint-checkbox label=&quot;Checked&quot; checked></flint-checkbox><flint-checkbox label=&quot;Indeterminate&quot; indeterminate></flint-checkbox><flint-checkbox label=&quot;Disabled&quot; disabled></flint-checkbox><flint-checkbox label=&quot;Checked Disabled&quot; checked disabled></flint-checkbox></div>" />

- **Tag**: `<flint-checkbox>`
- **Class**: `FlintCheckbox`
- **Form Associated**: Yes

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintCheckbox } from 'flint-ui';
```

### Usage

```html
<flint-checkbox></flint-checkbox>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `checked` | `checked` | `boolean` | `false` | Whether the checkbox is checked. |
| `indeterminate` | `indeterminate` | `boolean` | `false` | Whether the checkbox is in an indeterminate state. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the checkbox, preventing user interaction. |
| `required` | `required` | `boolean` | `false` | Marks the checkbox as required for form validation. |
| `size` | `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | The size of the checkbox. |
| `label` | `label` | `string` | `''` | Text label displayed next to the checkbox. |
| `name` | `name` | `string` | `''` | Form control name submitted with the form data. |
| `value` | `value` | `string` | `'on'` | The value submitted with form data when checked. |
| `defaultChecked` | `default-checked` | `boolean` | `false` | Sets the initial checked state on first render. |
| `ariaLabel` | `aria-label` | `string \| null` | `null` | Accessible label for the checkbox input. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `change` | `{ checked: this.checked, value: this.value, indeterminate: false }` | Fired when the checked state changes. |

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
