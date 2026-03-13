# Select

<Demo html="<ui-select label=&quot;Fruit&quot; placeholder=&quot;Pick one&quot; style=&quot;width:200px&quot;></ui-select>" />

A select component for choosing one or multiple options from a list.

- **Tag**: `<ui-select>`
- **Class**: `UiSelect`
- **Form Associated**: Yes

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiSelect } from 'storybook-lit';
```

### Usage

```html
<ui-select></ui-select>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | `string` | `''` |  |
| `options` | `options` | `SelectOption[]` | `[]` |  |
| `value` | `value` | `string[]` | `[]` |  |
| `multiple` | `multiple` | `boolean` | `false` |  |
| `placeholder` | `placeholder` | `string` | `'Select an option'` |  |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `readonly` | `readonly` | `boolean` | `false` |  |
| `required` | `required` | `boolean` | `false` |  |
| `error` | `error` | `boolean` | `false` |  |
| `errorMessage` | `error-message` | `string` | `''` |  |
| `name` | `name` | `string` | `''` |  |
| `size` | `size` | `SelectSize` | `'md'` |  |
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
| `--ui-select-bg` | — |
| `--ui-select-border` | — |
| `--ui-select-radius` | — |
| `--ui-select-focus-color` | — |
| `--ui-select-error-color` | — |
| `--ui-select-chip-bg` | — |
| `--ui-select-chip-color` | — |
| `--ui-select-chip-radius` | — |
| `--ui-select-option-hover-bg` | — |
| `--ui-select-option-selected-bg` | — |
| `--ui-select-option-selected-color` | — |
| `--ui-input-bg` | — |
| `--ui-input-border-color` | — |
| `--ui-input-border-radius` | — |
| `--ui-primary-color` | — |
| `--ui-error-color` | — |
| `--ui-hover-color` | — |
| `--ui-primary-color-light` | — |
| `--ui-text-color-on-primary` | — |
| `--ui-font-family` | — |
| `--ui-label-color` | — |
| `--ui-input-border-hover-color` | — |
| `--ui-primary-focus-ring` | — |
| `--ui-error-focus-ring` | — |
| `--ui-input-disabled-bg` | — |
| `--ui-input-readonly-bg` | — |
| `--ui-input-placeholder-color` | — |
| `--ui-text-color` | — |
| `--ui-text-color-muted` | — |
| `--ui-shadow-lg` | — |
| `--ui-border-color` | — |

---
