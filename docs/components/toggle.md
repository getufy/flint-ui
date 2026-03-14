# Toggle

<Demo label="States" html="<div style=&quot;display:flex;gap:8px;flex-wrap:wrap&quot;><flint-toggle>Default</flint-toggle><flint-toggle pressed>Pressed</flint-toggle><flint-toggle disabled>Disabled</flint-toggle></div>" />

A two-state button that can be either on (pressed) or off.

- **Tag**: `<flint-toggle>`
- **Class**: `FlintToggle`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintToggle } from 'flint-ui';
```

### Usage

```html
<flint-toggle></flint-toggle>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `pressed` | `pressed` | `boolean` | `false` |  |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `variant` | `variant` | `'default' \| 'outline'` | `'default'` |  |
| `size` | `size` | `'sm' \| 'default' \| 'lg'` | `'default'` |  |
| `dir` | `dir` | `'ltr' \| 'rtl'` | `'ltr'` |  |
| `defaultPressed` | `default-pressed` | `boolean` | `false` |  |
| `ariaLabel` | `aria-label` | `string \| null` | `null` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-toggle-change` | — | Dispatched when the pressed state changes. Detail: `{ pressed: boolean }` |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Content to render inside the toggle (text, icons, or both). |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-toggle-border-radius` | `var(--flint-border-radius-md` |
| `--flint-toggle-padding-y` | `0.5rem` |
| `--flint-toggle-padding-x` | `0.75rem` |
| `--flint-toggle-min-width` | `2.25rem` |
| `--flint-toggle-min-height` | `2.25rem` |
| `--flint-toggle-font-size` | `0.875rem` |
| `--flint-toggle-color` | `var(--flint-text-color` |
| `--flint-toggle-bg` | `transparent` |
| `--flint-toggle-bg-hover` | `var(--flint-muted-background` |
| `--flint-toggle-color-hover` | `var(--flint-text-color` |
| `--flint-toggle-bg-pressed` | `var(--flint-primary-color-light` |
| `--flint-toggle-color-pressed` | `var(--flint-primary-color` |
| `--flint-toggle-bg-pressed-hover` | `var(--flint-primary-color-light-hover` |
| `--flint-toggle-padding-y-sm` | `0.375rem` |
| `--flint-toggle-padding-x-sm` | `0.625rem` |
| `--flint-toggle-padding-y-lg` | `0.625rem` |
| `--flint-toggle-padding-x-lg` | `1rem` |
| `--flint-toggle-border-color` | `var(--flint-border-color` |
| `--flint-toggle-border-pressed-color` | `var(--flint-primary-color-light-hover` |
| `--flint-font-family` | — |
| `--flint-primary-color` | — |

---

## Accessibility

- **Keyboard**: Space/Enter toggles pressed state.
- **ARIA**: `aria-pressed` reflects toggle state.
- **Screen reader**: announces pressed/not pressed.
