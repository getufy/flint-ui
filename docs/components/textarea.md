# Textarea

<Demo label="States" html="<div style=&quot;display:flex;flex-direction:column;gap:12px;width:100%;max-width:400px&quot;><flint-textarea label=&quot;Message&quot; placeholder=&quot;Type your message...&quot;></flint-textarea><flint-textarea label=&quot;Disabled&quot; disabled value=&quot;This textarea is disabled&quot;></flint-textarea></div>" />

A Textarea component for multi-line text input.

- **Tag**: `<flint-textarea>`
- **Class**: `FlintTextarea`
- **Form Associated**: Yes

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintTextarea } from 'flint-ui';
```

### Usage

```html
<flint-textarea></flint-textarea>
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
| `flint-textarea-input` | — | Dispatched on every keystroke. Detail: `{ value: string }` |
| `flint-textarea-change` | — | Dispatched on blur/change. Detail: `{ value: string }` |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-textarea-min-height` | `80px` |
| `--flint-font-family` | — |
| `--flint-label-color` | — |
| `--flint-input-border-radius` | — |
| `--flint-input-border-color` | — |
| `--flint-input-bg` | — |
| `--flint-text-color` | — |
| `--flint-input-placeholder-color` | — |
| `--flint-input-border-hover-color` | — |
| `--flint-primary-color` | — |
| `--flint-primary-focus-ring` | — |
| `--flint-error-color` | — |
| `--flint-error-focus-ring` | — |
| `--flint-input-disabled-bg` | — |
| `--flint-input-disabled-color` | — |
| `--flint-input-readonly-bg` | — |
| `--flint-help-text-color` | — |

---
