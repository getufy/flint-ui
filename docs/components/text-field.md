# Text Field

<Demo label="States" html="<div style=&quot;display:flex;flex-direction:column;gap:12px;width:100%;max-width:300px&quot;><ui-text-field label=&quot;Name&quot; placeholder=&quot;Enter your name&quot;></ui-text-field><ui-text-field label=&quot;With Help&quot; help-text=&quot;This field is required&quot;></ui-text-field><ui-text-field label=&quot;Error&quot; error help-text=&quot;Please enter a valid email&quot;></ui-text-field><ui-text-field label=&quot;Disabled&quot; disabled value=&quot;Cannot edit&quot;></ui-text-field></div>" />

- **Tag**: `<ui-text-field>`
- **Class**: `UiTextField`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiTextField } from 'storybook-lit';
```

### Usage

```html
<ui-text-field></ui-text-field>
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
| `--ui-font-family` | — |
| `--ui-label-color` | — |
| `--ui-input-bg` | — |
| `--ui-input-border-color` | — |
| `--ui-input-border-radius` | — |
| `--ui-input-border-hover-color` | — |
| `--ui-primary-color` | — |
| `--ui-primary-focus-ring` | — |
| `--ui-error-color` | — |
| `--ui-error-focus-ring` | — |
| `--ui-input-disabled-bg` | — |
| `--ui-input-placeholder-color` | — |
| `--ui-text-color-muted` | — |
| `--ui-help-text-color` | — |
| `--ui-surface-2` | — |
| `--ui-hover-color` | — |

---
