# Date Field

<Demo label="States" html="<div style=&quot;display:flex;gap:16px;flex-wrap:wrap&quot;><flint-date-field label=&quot;Date&quot; value=&quot;2025-12-31&quot; style=&quot;width:200px&quot;></flint-date-field><flint-date-field label=&quot;Empty&quot; style=&quot;width:200px&quot;></flint-date-field><flint-date-field label=&quot;Disabled&quot; disabled value=&quot;2025-06-15&quot; style=&quot;width:200px&quot;></flint-date-field></div>" />

— move between segments - **Backspace / Delete** — clear the current segment - **Escape / a** — clear all segments

- **Tag**: `<flint-date-field>`
- **Class**: `FlintDateField`
- **Form Associated**: Yes

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintDateField } from 'flint-ui';
```

### Usage

```html
<flint-date-field></flint-date-field>
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
| `clear()` | Clears all three segments and fires 'clear'. |

---

## Accessibility

- **Keyboard**: Arrow keys adjust date segments, Tab moves between segments.
- **ARIA**: each segment has `role="spinbutton"`.
- **Screen reader**: announces segment label and value.
