# Input

<Demo label="Types" html="<div style=&quot;display:flex;flex-direction:column;gap:12px;width:100%;max-width:300px&quot;><ui-input label=&quot;Text&quot; placeholder=&quot;Enter your name&quot;></ui-input><ui-input label=&quot;Email&quot; type=&quot;email&quot; placeholder=&quot;you@example.com&quot;></ui-input><ui-input label=&quot;Password&quot; type=&quot;password&quot; value=&quot;secret123&quot;></ui-input><ui-input label=&quot;Search&quot; type=&quot;search&quot; placeholder=&quot;Search...&quot;></ui-input></div>" />

<Demo label="States" html="<div style=&quot;display:flex;flex-direction:column;gap:12px;width:100%;max-width:300px&quot;><ui-input label=&quot;Disabled&quot; disabled value=&quot;Cannot edit&quot;></ui-input><ui-input label=&quot;Readonly&quot; readonly value=&quot;Read only value&quot;></ui-input><ui-input label=&quot;Error&quot; error value=&quot;Invalid input&quot; help-text=&quot;This field has an error&quot;></ui-input></div>" />

<Demo label="Sizes" html="<div style=&quot;display:flex;flex-direction:column;gap:12px;width:100%;max-width:300px&quot;><ui-input label=&quot;Small&quot; size=&quot;sm&quot; placeholder=&quot;Small&quot;></ui-input><ui-input label=&quot;Default&quot; placeholder=&quot;Default&quot;></ui-input><ui-input label=&quot;Large&quot; size=&quot;lg&quot; placeholder=&quot;Large&quot;></ui-input></div>" />

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
