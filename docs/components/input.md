# Input

<Demo label="Types">

<div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:300px">
<ui-input label="Text" placeholder="Enter your name"></ui-input>
<ui-input label="Email" type="email" placeholder="you@example.com"></ui-input>
<ui-input label="Password" type="password" value="secret123"></ui-input>
<ui-input label="Search" type="search" placeholder="Search..."></ui-input>
</div>

</Demo>

<Demo label="States">

<div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:300px">
<ui-input label="Disabled" disabled value="Cannot edit"></ui-input>
<ui-input label="Readonly" readonly value="Read only value"></ui-input>
<ui-input label="Error" error value="Invalid input" help-text="This field has an error"></ui-input>
</div>

</Demo>

<Demo label="Sizes">

<div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:300px">
<ui-input label="Small" size="sm" placeholder="Small"></ui-input>
<ui-input label="Default" placeholder="Default"></ui-input>
<ui-input label="Large" size="lg" placeholder="Large"></ui-input>
</div>

</Demo>

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
