# Toggle

<Demo label="States" html='<div style="display:flex;gap:8px;flex-wrap:wrap"><flint-toggle>Default</flint-toggle><flint-toggle pressed>Pressed</flint-toggle><flint-toggle disabled>Disabled</flint-toggle></div>' />

A two-state button that can be either on (pressed) or off.

- **Tag**: `<flint-toggle>`
- **Class**: `FlintToggle`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintToggle } from '@getufy/flint-ui';
```

### Usage

```html
<flint-toggle></flint-toggle>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `pressed` | `pressed` | `boolean` | `false` | Whether the toggle is currently pressed (on). |
| `disabled` | `disabled` | `boolean` | `false` | Whether the toggle is disabled. |
| `variant` | `variant` | `'default' \| 'outline'` | `'default'` | Visual variant of the toggle. |
| `size` | `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Size of the toggle. |
| `dir` | `dir` | `'ltr' \| 'rtl'` | `'ltr'` | Text direction for the toggle. |
| `defaultPressed` | `default-pressed` | `boolean` | `false` | Initial pressed state for uncontrolled mode. |
| `ariaLabel` | `aria-label` | `string \| null` | `null` | Accessible label for icon-only toggles. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-toggle-change` | `&#123; pressed: boolean &#125;` | Dispatched when the pressed state changes. Detail: `&#123; pressed: boolean &#125;` |

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
