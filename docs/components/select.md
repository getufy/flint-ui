# Select

<Demo html="<div style=&quot;display:flex;gap:16px;flex-wrap:wrap&quot;><flint-select label=&quot;Fruit&quot; placeholder=&quot;Pick one&quot; style=&quot;width:220px&quot; data-options=&quot;apple:Apple,banana:Banana,cherry:Cherry,grape:Grape,mango:Mango&quot;></flint-select><flint-select label=&quot;Disabled&quot; disabled placeholder=&quot;Disabled&quot; style=&quot;width:220px&quot;></flint-select></div>" />

A select component for choosing one or multiple options from a list.

- **Tag**: `<flint-select>`
- **Class**: `FlintSelect`
- **Form Associated**: Yes

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintSelect } from 'flint-ui';
```

### Usage

```html
<flint-select></flint-select>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | `string` | `''` | Label text displayed above the select trigger. |
| `options` | `options` | `SelectOption[]` | `[]` | Array of selectable options, each with label, value, and optional disabled flag. |
| `value` | `value` | `string[]` | `[]` | Currently selected value(s) as an array of option value strings. |
| `multiple` | `multiple` | `boolean` | `false` | Allow selecting more than one option. |
| `placeholder` | `placeholder` | `string` | `'Select an option'` | Placeholder text shown when no option is selected. |
| `disabled` | `disabled` | `boolean` | `false` | Disable the select, preventing interaction. |
| `readonly` | `readonly` | `boolean` | `false` | Make the select read-only, preventing changes. |
| `required` | `required` | `boolean` | `false` | Mark the field as required for form validation. |
| `error` | `error` | `boolean` | `false` | Display the select in an error state. |
| `errorMessage` | `error-message` | `string` | `''` | Error message text shown below the select when in error state. |
| `name` | `name` | `string` | `''` | Form field name used when submitting form data. |
| `size` | `size` | `SelectSize` | `'md'` | Visual size of the select trigger: 'sm', 'md', or 'lg'. |
| `defaultValue` | `default-value` | `string` | `''` | Sets the initial value in uncontrolled mode (single-select only). |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `change` | — | Dispatched when the selection changes. detail: { value: string \| null } (single) or { value: string[] } (multiple) |

### Slots

| Name | Description |
| --- | --- |
| `icon` | Optional icon shown at the start of the trigger. |
| `error-message` | Optional slot for error message content (use error-message prop for simple text). |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-select-bg` | — |
| `--flint-select-border` | — |
| `--flint-select-radius` | — |
| `--flint-select-focus-color` | — |
| `--flint-select-error-color` | — |
| `--flint-select-chip-bg` | — |
| `--flint-select-chip-color` | — |
| `--flint-select-chip-radius` | — |
| `--flint-select-option-hover-bg` | — |
| `--flint-select-option-selected-bg` | — |
| `--flint-select-option-selected-color` | — |
| `--flint-input-bg` | — |
| `--flint-input-border-color` | — |
| `--flint-input-border-radius` | — |
| `--flint-primary-color` | — |
| `--flint-error-color` | — |
| `--flint-hover-color` | — |
| `--flint-primary-color-light` | — |
| `--flint-text-color-on-primary` | — |
| `--flint-font-family` | — |
| `--flint-label-color` | — |
| `--flint-input-border-hover-color` | — |
| `--flint-primary-focus-ring` | — |
| `--flint-error-focus-ring` | — |
| `--flint-input-disabled-bg` | — |
| `--flint-input-readonly-bg` | — |
| `--flint-input-placeholder-color` | — |
| `--flint-text-color` | — |
| `--flint-text-color-muted` | — |
| `--flint-shadow-lg` | — |
| `--flint-border-color` | — |

---
