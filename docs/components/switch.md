# Switch

<Demo label="Sizes" html="<div style=&quot;display:flex;gap:8px;flex-wrap:wrap;align-items:center&quot;><flint-switch size=&quot;sm&quot;></flint-switch><flint-switch size=&quot;md&quot;></flint-switch><flint-switch size=&quot;lg&quot;></flint-switch></div>" />

<Demo label="States" html="<div style=&quot;display:flex;gap:8px;flex-wrap:wrap&quot;><flint-switch></flint-switch><flint-switch default-checked></flint-switch><flint-switch disabled></flint-switch><flint-switch default-checked disabled></flint-switch></div>" />

A Switch component for toggling settings.

- **Tag**: `<flint-switch>`
- **Class**: `FlintSwitch`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintSwitch } from '@getufy/flint-ui';
```

### Usage

```html
<flint-switch></flint-switch>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `checked` | `checked` | `boolean` | `false` | Whether the switch is toggled on. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the switch and prevents interaction. |
| `required` | `required` | `boolean` | `false` | Marks the switch as required for form validation. |
| `size` | `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the switch control. |
| `label` | `label` | `string` | `''` | Visible label text displayed next to the switch. |
| `name` | `name` | `string` | `''` | Form field name used when submitting form data. |
| `value` | `value` | `string` | `'on'` | Value submitted with form data when checked. |
| `defaultChecked` | `default-checked` | `boolean` | `false` | Initial checked state for uncontrolled usage. |
| `ariaLabel` | `aria-label` | `string \| null` | `null` | Accessible label for screen readers when no visible label is provided. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-switch-change` | — | Dispatched when the switch state changes. Detail: `{ checked: boolean }` |

### Slots

| Name | Description |
| --- | --- |
| `icon-on` | Optional icon to show when the switch is ON. |
| `icon-off` | Optional icon to show when the switch is OFF. |
| `(default)` | Optional label content (used when the `label` prop is not set). |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-switch-thumb-color` | — |
| `--flint-switch-width` | — |
| `--flint-switch-height` | — |
| `--flint-switch-bg` | — |
| `--flint-switch-bg-on` | — |
| `--flint-switch-thumb-offset` | — |
| `--flint-switch-thumb-size` | — |
| `--flint-switch-thumb-bg` | — |
| `--flint-secondary-color` | — |
| `--flint-primary-color` | — |
| `--flint-font-family` | — |
| `--flint-shadow-sm` | — |
| `--flint-text-color-muted` | — |
| `--flint-text-color` | — |

---
