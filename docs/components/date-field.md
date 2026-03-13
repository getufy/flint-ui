# Date Field

<Demo label="States">

<div style="display:flex;gap:16px;flex-wrap:wrap">
<ui-date-field label="Date" value="2025-12-31" style="width:200px"></ui-date-field>
<ui-date-field label="Empty" style="width:200px"></ui-date-field>
<ui-date-field label="Disabled" disabled value="2025-06-15" style="width:200px"></ui-date-field>
</div>

</Demo>

— move between segments - **Backspace / Delete** — clear the current segment - **Escape / a** — clear all segments

- **Tag**: `<ui-date-field>`
- **Class**: `UiDateField`
- **Form Associated**: Yes

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiDateField } from 'storybook-lit';
```

### Usage

```html
<ui-date-field></ui-date-field>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` | Controlled date value (ISO YYYY-MM-DD). Set to '' for uncontrolled. |
| `label` | `label` | `string` | `''` | Field label. |
| `name` | `name` | `string` | `''` | Form field name. Reflected so the browser picks it up for form data collection. |
| `min` | `min` | `string` | `''` | Minimum allowed date (ISO). |
| `max` | `max` | `string` | `''` | Maximum allowed date (ISO). |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `readonly` | `readonly` | `boolean` | `false` |  |
| `error` | `error` | `boolean` | `false` |  |
| `helperText` | `helper-text` | `string` | `''` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `change` | — | { detail: { value: string } } ISO date when all three segments are filled |
| `clear` | — | Fired when all segments are cleared |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-font-family` | — |
| `--ui-text-color-muted` | — |
| `--ui-error-color` | — |
| `--ui-primary-color` | — |
| `--ui-input-bg` | — |
| `--ui-border-color` | — |
| `--ui-border-radius-md` | — |
| `--ui-primary-focus-ring` | — |
| `--ui-error-focus-ring` | — |
| `--ui-input-disabled-bg` | — |
| `--ui-text-color` | — |
| `--ui-input-placeholder-color` | — |
| `--ui-text-color-on-primary` | — |
| `--ui-hover-color` | — |

### Methods

| Method | Description |
| --- | --- |
| `clear()` | Clears all three segments and fires 'clear'. |

---
