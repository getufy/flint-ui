# Date Field

<Demo label="States" html='<div style="display:flex;gap:16px;flex-wrap:wrap"><flint-date-field label="Date" value="2025-12-31" style="width:200px"></flint-date-field><flint-date-field label="Empty" style="width:200px"></flint-date-field><flint-date-field label="Disabled" disabled value="2025-06-15" style="width:200px"></flint-date-field></div>' />

A segmented keyboard-driven date input.
Each section (month, day, year) is independently editable via keyboard.

- **Tag**: `<flint-date-field>`
- **Class**: `FlintDateField`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintDateField } from '@getufy/flint-ui';
```

### Usage

```html
<flint-date-field></flint-date-field>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `formAssociated` | `formAssociated` | `boolean` | `true` | Opts the element into form participation via the Form-Associated Custom Elements API. |
| `value` | `value` | `string` | `''` | Controlled date value (ISO YYYY-MM-DD). Set to '' for uncontrolled. |
| `label` | `label` | `string` | `''` | Field label. |
| `name` | `name` | `string` | `''` | Form field name. Reflected so the browser picks it up for form data collection. |
| `min` | `min` | `string` | `''` | Minimum allowed date (ISO). |
| `max` | `max` | `string` | `''` | Maximum allowed date (ISO). |
| `disabled` | `disabled` | `boolean` | `false` | Disables the field and prevents interaction. |
| `readonly` | `readonly` | `boolean` | `false` | Makes the field read-only (visible but not editable). |
| `error` | `error` | `boolean` | `false` | Displays the field in an error state. |
| `helperText` | `helper-text` | `string` | `''` | Helper text shown below the field. |
| `errorMessage` | `error-message` | `string` | `''` | Error message displayed below the field when in error state. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-date-field-clear` | — | Fired when all segments are cleared |
| `flint-date-field-change` | `&#123; value: string &#125;` | &#123; detail: &#123; value: string &#125; &#125; ISO date when all three segments are filled |

### CSS Parts

| Name | Description |
| --- | --- |
| `base` | The component's base wrapper element. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-font-family` | — |
| `--flint-text-color-muted` | — |
| `--flint-error-color` | — |
| `--flint-primary-color` | — |
| `--flint-input-bg` | — |
| `--flint-border-color` | — |
| `--flint-border-radius-md` | — |
| `--flint-primary-focus-ring` | — |
| `--flint-error-focus-ring` | — |
| `--flint-input-disabled-bg` | — |
| `--flint-text-color` | — |
| `--flint-input-placeholder-color` | — |
| `--flint-text-color-on-primary` | — |
| `--flint-hover-color` | — |

### Methods

| Method | Description |
| --- | --- |
| `clear(): void` | Clears all three segments and fires 'flint-date-field-clear'. |

---
