# Input

<Demo label="Types" html="<div style=&quot;display:flex;flex-direction:column;gap:12px;width:100%;max-width:300px&quot;><flint-input label=&quot;Text&quot; placeholder=&quot;Enter your name&quot;></flint-input><flint-input label=&quot;Email&quot; type=&quot;email&quot; placeholder=&quot;you@example.com&quot;></flint-input><flint-input label=&quot;Password&quot; type=&quot;password&quot; value=&quot;secret123&quot;></flint-input><flint-input label=&quot;Search&quot; type=&quot;search&quot; placeholder=&quot;Search...&quot;></flint-input></div>" />

<Demo label="States" html="<div style=&quot;display:flex;flex-direction:column;gap:12px;width:100%;max-width:300px&quot;><flint-input label=&quot;Disabled&quot; disabled value=&quot;Cannot edit&quot;></flint-input><flint-input label=&quot;Readonly&quot; readonly value=&quot;Read only value&quot;></flint-input><flint-input label=&quot;Error&quot; error value=&quot;Invalid input&quot; help-text=&quot;This field has an error&quot;></flint-input></div>" />

<Demo label="Sizes" html="<div style=&quot;display:flex;flex-direction:column;gap:12px;width:100%;max-width:300px&quot;><flint-input label=&quot;Small&quot; size=&quot;sm&quot; placeholder=&quot;Small&quot;></flint-input><flint-input label=&quot;Default&quot; placeholder=&quot;Default&quot;></flint-input><flint-input label=&quot;Large&quot; size=&quot;lg&quot; placeholder=&quot;Large&quot;></flint-input></div>" />

- **Tag**: `<flint-input>`
- **Class**: `FlintInput`
- **Form Associated**: Yes

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintInput } from 'flint-ui';
```

### Usage

```html
<flint-input></flint-input>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | `string` | `''` | Label text displayed above the input. |
| `value` | `value` | `string` | `''` | Current value of the input. |
| `type` | `type` | `string` | `'text'` | The HTML input type (e.g. 'text', 'email', 'password', 'search'). |
| `placeholder` | `placeholder` | `string` | `''` | Placeholder text shown when the input is empty. |
| `helpText` | `help-text` | `string` | `''` | Helper text displayed below the input. |
| `error` | `error` | `boolean` | `false` | Whether the input is in an error state. |
| `errorMessage` | `error-message` | `string` | `''` | Error message displayed below the input when in error state. |
| `disabled` | `disabled` | `boolean` | `false` | Whether the input is disabled. |
| `required` | `required` | `boolean` | `false` | Whether the input is required for form submission. |
| `readonly` | `readonly` | `boolean` | `false` | Whether the input is read-only. |
| `name` | `name` | `string` | `''` | Form control name for form submission. |
| `autocomplete` | `autocomplete` | `string` | `''` | Hint for the browser's autocomplete behavior. |
| `size` | `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | 'sm' \| 'default' \| 'lg' |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-input-input` | `{ value: this.value }` | Fired on every keystroke as the user types. |
| `flint-input-change` | `{ value: this.value }` | Fired when the input loses focus after its value has changed. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-input-border-radius` | — |
| `--flint-input-border-color` | — |
| `--flint-input-bg` | — |
| `--flint-input-placeholder-color` | — |
| `--flint-input-border-hover-color` | — |
| `--flint-input-disabled-bg` | — |
| `--flint-input-disabled-color` | — |
| `--flint-input-readonly-bg` | — |
| `--flint-font-family` | — |
| `--flint-label-color` | — |
| `--flint-text-color` | — |
| `--flint-primary-color` | — |
| `--flint-primary-focus-ring` | — |
| `--flint-error-color` | — |
| `--flint-error-focus-ring` | — |
| `--flint-help-text-color` | — |

### Methods

| Method | Description |
| --- | --- |
| `inputElement(): HTMLInputElement` | Returns the internal native `<input>` element for direct access. |

---
