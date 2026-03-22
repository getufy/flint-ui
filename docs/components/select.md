# Select

<Demo html='<div style="display:flex;gap:16px;flex-wrap:wrap"><flint-select label="Fruit" placeholder="Pick one" style="width:220px" data-options="apple:Apple,banana:Banana,cherry:Cherry,grape:Grape,mango:Mango"></flint-select><flint-select label="Disabled" disabled placeholder="Disabled" style="width:220px"></flint-select></div>' />

A select component for choosing one or multiple options from a list.

- **Tag**: `<flint-select>`
- **Class**: `FlintSelect`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintSelect } from '@getufy/flint-ui';
```

### Usage

```html
<flint-select></flint-select>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | `string` | `''` | Label text displayed above the select. |
| `options` | `options` | `SelectOption[]` | `[]` | Array of selectable options. |
| `value` | `value` | `string \| string[]` | `[]` | Current value (controlled). When set, the component reflects this value and does not manage its own state. Accepts a single string or an array of strings. |
| `multiple` | `multiple` | `boolean` | `false` | Allow multiple selections. |
| `placeholder` | `placeholder` | `string` | `''` | Placeholder text when no value is selected. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the select and prevents interaction. |
| `readonly` | `readonly` | `boolean` | `false` | Makes the select read-only. |
| `required` | `required` | `boolean` | `false` | Marks the select as required for form validation. |
| `error` | `error` | `boolean` | `false` | Whether the select is in an error state. |
| `errorMessage` | `error-message` | `string` | `''` | Error message displayed below the select. |
| `name` | `name` | `string` | `''` | Form field name used when submitting form data. |
| `size` | `size` | `SelectSize` | `'md'` | Size variant of the select. |
| `defaultValue` | `default-value` | `string` | `''` | Initial value (uncontrolled). Only used on first render; ignored after mount. Single-select only. |
| `hoist` | `hoist` | `boolean` | `true` | When true, the dropdown uses `position: fixed` so it can escape |
| `loadOptions` | `loadOptions` | `((searchTerm?: string) =&gt; Promise&lt;SelectOption[]&gt;) \| null` | `null` | Async options loader. When provided, called when the dropdown opens. |
| `clearable` | `clearable` | `boolean` | `false` | When true, shows a clear button in the trigger when a value is selected. |
| `searchable` | `searchable` | `boolean` | `false` | When true, adds a text input for filtering options by label. |
| `maxTagsVisible` | `max-tags-visible` | `string` | `Infinity` | Maximum number of chips visible in multi-select mode. |
| `virtualize` | `virtualize` | `boolean` | `false` | Enable virtual scrolling for large option lists. |
| `itemHeight` | `item-height` | `number` | `36` | Fixed item height in px used for virtual scroll calculations. |
| `visibleItems` | `visible-items` | `number` | `8` | Maximum visible items in the dropdown (determines dropdown height). |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-select-change` | — | Dispatched when the selection changes. detail: `&#123; value: string, multiple: false &#125; \| &#123; value: string[], multiple: true &#125;` |
| `flint-clear` | — | Dispatched when the clear button is clicked. |

### Slots

| Name | Description |
| --- | --- |
| `icon` | Optional icon shown at the start of the trigger. |
| `error-message` | Optional slot for error message content (use error-message prop for simple text). |

### CSS Parts

| Name | Description |
| --- | --- |
| `label` | The `&lt;label&gt;` element. |
| `trigger` | The combobox trigger container. |
| `placeholder` | The placeholder text `&lt;span&gt;`. |
| `chip` | A selected-value chip (multiple mode). |
| `chip-overflow` | The "+N more" overflow chip (multiple mode). |
| `clear-button` | The clear button (when clearable). |
| `search-input` | The search input (when searchable). |
| `dropdown` | The dropdown listbox container. |
| `option` | An individual option element. |
| `error-message` | The error message `&lt;span&gt;`. |

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
| `--flint-select-z-index` | `1000` |
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
