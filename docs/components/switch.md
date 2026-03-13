# Switch

A Switch component for toggling settings.

- **Tag**: `<ui-switch>`
- **Class**: `UiSwitch`
- **Form Associated**: Yes

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiSwitch } from 'storybook-lit';
```

### Usage

```html
<ui-switch></ui-switch>
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
| `ui-switch-change` | — | Dispatched when the switch state changes. Detail: `{ checked: boolean }` |

### Slots

| Name | Description |
| --- | --- |
| `icon-on` | Optional icon to show when the switch is ON. |
| `icon-off` | Optional icon to show when the switch is OFF. |
| `(default)` | Optional label content (used when the `label` prop is not set). |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-switch-thumb-color` | — |
| `--ui-switch-width` | — |
| `--ui-switch-height` | — |
| `--ui-switch-bg` | — |
| `--ui-switch-bg-on` | — |
| `--ui-switch-thumb-offset` | — |
| `--ui-switch-thumb-size` | — |
| `--ui-switch-thumb-bg` | — |
| `--ui-secondary-color` | — |
| `--ui-primary-color` | — |
| `--ui-font-family` | — |
| `--ui-shadow-sm` | — |
| `--ui-text-color-muted` | — |
| `--ui-text-color` | — |

---
