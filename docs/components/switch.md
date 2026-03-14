# Switch

<Demo label="Sizes" html="<div style=&quot;display:flex;gap:8px;flex-wrap:wrap;align-items:center&quot;><flint-switch size=&quot;sm&quot;></flint-switch><flint-switch size=&quot;md&quot;></flint-switch><flint-switch size=&quot;lg&quot;></flint-switch></div>" />

<Demo label="States" html="<div style=&quot;display:flex;gap:8px;flex-wrap:wrap&quot;><flint-switch></flint-switch><flint-switch default-checked></flint-switch><flint-switch disabled></flint-switch><flint-switch default-checked disabled></flint-switch></div>" />

A Switch component for toggling settings.

- **Tag**: `<flint-switch>`
- **Class**: `FlintSwitch`
- **Form Associated**: Yes

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintSwitch } from 'flint-ui';
```

### Usage

```html
<flint-switch></flint-switch>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `checked` | `checked` | `boolean` | `false` |  |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `required` | `required` | `boolean` | `false` |  |
| `size` | `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |  |
| `label` | `label` | `string` | `''` |  |
| `name` | `name` | `string` | `''` |  |
| `value` | `value` | `string` | `'on'` |  |
| `defaultChecked` | `default-checked` | `boolean` | `false` |  |
| `ariaLabel` | `aria-label` | `string \| null` | `null` |  |

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

## Accessibility

- **Keyboard**: Space/Enter toggles.
- **ARIA**: `role="switch"` with `aria-checked`. Form-associated via `ElementInternals`.
- **Screen reader**: announces on/off state.
