# Textarea

<Demo label="States">

<div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:400px">
<ui-textarea label="Message" placeholder="Type your message..."></ui-textarea>
<ui-textarea label="Disabled" disabled value="This textarea is disabled"></ui-textarea>
</div>

</Demo>

A Textarea component for multi-line text input.

- **Tag**: `<ui-textarea>`
- **Class**: `UiTextarea`
- **Form Associated**: Yes

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiTextarea } from 'storybook-lit';
```

### Usage

```html
<ui-textarea></ui-textarea>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` |  |
| `placeholder` | `placeholder` | `string` | `''` |  |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `readonly` | `readonly` | `boolean` | `false` |  |
| `required` | `required` | `boolean` | `false` |  |
| `error` | `error` | `boolean` | `false` |  |
| `errorMessage` | `error-message` | `string` | `''` |  |
| `helpText` | `help-text` | `string` | `''` |  |
| `label` | `label` | `string` | `''` |  |
| `size` | `size` | `'sm' \| 'default' \| 'lg'` | `'default'` |  |
| `rows` | `rows` | `number` | `3` |  |
| `maxlength` | `maxlength` | `number \| undefined` | `undefined` |  |
| `minlength` | `minlength` | `number \| undefined` | `undefined` |  |
| `name` | `name` | `string` | `''` |  |
| `autocomplete` | `autocomplete` | `string` | `''` |  |
| `resize` | `resize` | `'none' \| 'both' \| 'horizontal' \| 'vertical' \| 'auto'` | `'vertical'` |  |
| `defaultValue` | `default-value` | `string` | `''` |  |
| `ariaLabel` | `aria-label` | `string \| null` | `null` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `ui-textarea-input` | — | Dispatched on every keystroke. Detail: `{ value: string }` |
| `ui-textarea-change` | — | Dispatched on blur/change. Detail: `{ value: string }` |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-textarea-min-height` | `80px` |
| `--ui-font-family` | — |
| `--ui-label-color` | — |
| `--ui-input-border-radius` | — |
| `--ui-input-border-color` | — |
| `--ui-input-bg` | — |
| `--ui-text-color` | — |
| `--ui-input-placeholder-color` | — |
| `--ui-input-border-hover-color` | — |
| `--ui-primary-color` | — |
| `--ui-primary-focus-ring` | — |
| `--ui-error-color` | — |
| `--ui-error-focus-ring` | — |
| `--ui-input-disabled-bg` | — |
| `--ui-input-disabled-color` | — |
| `--ui-input-readonly-bg` | — |
| `--ui-help-text-color` | — |

---
