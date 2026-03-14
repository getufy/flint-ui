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
| `checked` | `checked` | `boolean` | `false` |  |
| `indeterminate` | `indeterminate` | `boolean` | `false` |  |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `required` | `required` | `boolean` | `false` |  |
| `size` | `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |  |
| `label` | `label` | `string` | `''` |  |
| `name` | `name` | `string` | `''` |  |
| `value` | `value` | `string` | `'on'` |  |
| `defaultChecked` | `default-checked` | `boolean` | `false` |  |
| `ariaLabel` | `aria-label` | `string \| null` | `null` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `change` | `{ checked: this.checked, value: this.value, indeterminate: false }` |  |

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
