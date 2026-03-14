# Text Field

<Demo label="States" html="<div style=&quot;display:flex;flex-direction:column;gap:12px;width:100%;max-width:300px&quot;><flint-text-field label=&quot;Name&quot; placeholder=&quot;Enter your name&quot;></flint-text-field><flint-text-field label=&quot;With Help&quot; help-text=&quot;This field is required&quot;></flint-text-field><flint-text-field label=&quot;Error&quot; error help-text=&quot;Please enter a valid email&quot;></flint-text-field><flint-text-field label=&quot;Disabled&quot; disabled value=&quot;Cannot edit&quot;></flint-text-field></div>" />

- **Tag**: `<flint-text-field>`
- **Class**: `FlintTextField`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintTextField } from 'flint-ui';
```

### Usage

```html
<flint-text-field></flint-text-field>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | `string` | `''` |  |
| `value` | `value` | `string` | `''` |  |
| `placeholder` | `placeholder` | `string` | `''` |  |
| `type` | `type` | `string` | `'text'` |  |
| `variant` | `variant` | `'outlined' \| 'filled'` | `'outlined'` |  |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `error` | `error` | `boolean` | `false` |  |
| `helperText` | `helper-text` | `string` | `''` |  |
| `errorMessage` | `error-message` | `string` | `''` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `input` | `{ value: this.value }` |  |
| `change` | `{ value: this.value }` |  |

### Slots

| Name | Description |
| --- | --- |
| `leading` |  |
| `trailing` |  |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-font-family` | — |
| `--flint-label-color` | — |
| `--flint-input-bg` | — |
| `--flint-input-border-color` | — |
| `--flint-input-border-radius` | — |
| `--flint-input-border-hover-color` | — |
| `--flint-primary-color` | — |
| `--flint-primary-focus-ring` | — |
| `--flint-error-color` | — |
| `--flint-error-focus-ring` | — |
| `--flint-input-disabled-bg` | — |
| `--flint-input-placeholder-color` | — |
| `--flint-text-color-muted` | — |
| `--flint-help-text-color` | — |
| `--flint-surface-2` | — |
| `--flint-hover-color` | — |

---

## Accessibility

- **Keyboard**: standard text input.
- **ARIA**: native `<input>` with associated label.
- **Screen reader**: announces label, value, and validation state.
