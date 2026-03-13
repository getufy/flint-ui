# Input

- **Tag**: `<ui-input>`
- **Class**: `UiInput`
- **Form Associated**: Yes

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiInput } from 'storybook-lit';
```

### Usage

```html
<ui-input></ui-input>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | `string` | `''` |  |
| `value` | `value` | `string` | `''` |  |
| `type` | `type` | `string` | `'text'` |  |
| `placeholder` | `placeholder` | `string` | `''` |  |
| `helpText` | `help-text` | `string` | `''` |  |
| `error` | `error` | `boolean` | `false` |  |
| `errorMessage` | `error-message` | `string` | `''` |  |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `required` | `required` | `boolean` | `false` |  |
| `readonly` | `readonly` | `boolean` | `false` |  |
| `name` | `name` | `string` | `''` |  |
| `autocomplete` | `autocomplete` | `string` | `''` |  |
| `size` | `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | 'sm' \| 'default' \| 'lg' |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `ui-input-input` | `{ value: this.value }` |  |
| `ui-input-change` | `{ value: this.value }` |  |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-input-border-radius` | — |
| `--ui-input-border-color` | — |
| `--ui-input-bg` | — |
| `--ui-input-placeholder-color` | — |
| `--ui-input-border-hover-color` | — |
| `--ui-input-disabled-bg` | — |
| `--ui-input-disabled-color` | — |
| `--ui-input-readonly-bg` | — |
| `--ui-font-family` | — |
| `--ui-label-color` | — |
| `--ui-text-color` | — |
| `--ui-primary-color` | — |
| `--ui-primary-focus-ring` | — |
| `--ui-error-color` | — |
| `--ui-error-focus-ring` | — |
| `--ui-help-text-color` | — |

### Methods

| Method | Description |
| --- | --- |
| `inputElement(): HTMLInputElement` |  |

---
