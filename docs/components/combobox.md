# Combobox

Combobox: a free-text input with dropdown suggestions.

- **Tag**: `<flint-combobox>`
- **Class**: `FlintCombobox`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintCombobox } from '@getufy/flint-ui';
```

### Usage

```html
<flint-combobox></flint-combobox>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `shadowRootOptions` | `shadowRootOptions` | `object` | `&#123; ...LitElement.shadowRootOptions, delegatesFocus: true &#125;` |  |
| `options` | `options` | `ComboboxOption[]` | `[]` | The list of suggestion options. |
| `value` | `value` | `string` | `''` | The current text value. |
| `placeholder` | `placeholder` | `string` | `''` | Placeholder text shown when the input is empty. |
| `disabled` | `disabled` | `boolean` | `false` | Whether the combobox is disabled. |
| `required` | `required` | `boolean` | `false` | Marks the combobox as required for form validation. |
| `name` | `name` | `string` | `''` | Form field name used when submitting form data. |
| `defaultValue` | `default-value` | `string` | `''` | Initial value for uncontrolled usage. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-combobox-change` | `&#123; value: string &#125;` | Fired when the value changes. detail: `&#123; value: string &#125;` |

### CSS Parts

| Name | Description |
| --- | --- |
| `base` | The wrapper element. |
| `input` | The text input element. |
| `listbox` | The dropdown suggestions container. |
| `option` | An individual suggestion element. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-combobox-dropdown-max-height` | `250px` |
| `--flint-combobox-z-index` | `1000` |
| `--flint-font-family` | — |
| `--flint-input-border-color` | — |
| `--flint-input-border-radius` | — |
| `--flint-text-color` | — |
| `--flint-input-bg` | — |
| `--flint-primary-color` | — |
| `--flint-primary-focus-ring` | — |
| `--flint-input-disabled-bg` | — |
| `--flint-text-color-subtle` | — |
| `--flint-surface-background` | `white` |
| `--flint-border-color` | — |
| `--flint-shadow-lg` | — |
| `--flint-hover-color` | — |
| `--flint-primary-color-light` | — |
| `--flint-text-color-muted` | — |

---
