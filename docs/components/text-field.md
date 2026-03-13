# Text Field

<Demo label="States">

<div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:300px">
<ui-text-field label="Name" placeholder="Enter your name"></ui-text-field>
<ui-text-field label="With Help" help-text="This field is required"></ui-text-field>
<ui-text-field label="Error" error help-text="Please enter a valid email"></ui-text-field>
<ui-text-field label="Disabled" disabled value="Cannot edit"></ui-text-field>
</div>

</Demo>

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
