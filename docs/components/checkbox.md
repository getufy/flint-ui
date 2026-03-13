# Checkbox

<Demo label="States" html="<ui-checkbox label=&quot;Unchecked&quot;></ui-checkbox><ui-checkbox label=&quot;Checked&quot; checked></ui-checkbox><ui-checkbox label=&quot;Indeterminate&quot; indeterminate></ui-checkbox><ui-checkbox label=&quot;Disabled&quot; disabled></ui-checkbox><ui-checkbox label=&quot;Checked Disabled&quot; checked disabled></ui-checkbox>" />

- **Tag**: `<ui-checkbox>`
- **Class**: `UiCheckbox`
- **Form Associated**: Yes

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiCheckbox } from 'storybook-lit';
```

### Usage

```html
<ui-checkbox></ui-checkbox>
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
| `--ui-checkbox-size` | `18px` |
| `--ui-checkbox-border-radius` | `var(--ui-border-radius-sm` |
| `--ui-checkbox-gap` | `8px` |
| `--ui-checkbox-size-sm` | `14px` |
| `--ui-checkbox-size-lg` | `22px` |
| `--ui-checkbox-icon-size` | `12px` |
| `--ui-checkbox-icon-size-sm` | `10px` |
| `--ui-checkbox-icon-size-lg` | `16px` |
| `--ui-checkbox-label-font-size` | `14px` |
| `--ui-checkbox-label-font-size-sm` | `12px` |
| `--ui-checkbox-label-font-size-lg` | `16px` |
| `--ui-font-family` | — |
| `--ui-text-color` | — |
| `--ui-input-border-color` | — |
| `--ui-surface-1` | — |
| `--ui-primary-color` | — |
| `--ui-text-color-on-primary` | — |

---
