# Toggle

<Demo label="States">

<ui-toggle>Default</ui-toggle>
<ui-toggle pressed>Pressed</ui-toggle>
<ui-toggle disabled>Disabled</ui-toggle>

</Demo>

A two-state button that can be either on (pressed) or off.

- **Tag**: `<ui-toggle>`
- **Class**: `UiToggle`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiToggle } from 'storybook-lit';
```

### Usage

```html
<ui-toggle></ui-toggle>
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
| `ui-toggle-change` | — | Dispatched when the pressed state changes. Detail: `{ pressed: boolean }` |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Content to render inside the toggle (text, icons, or both). |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-toggle-border-radius` | `var(--ui-border-radius-md` |
| `--ui-toggle-padding-y` | `0.5rem` |
| `--ui-toggle-padding-x` | `0.75rem` |
| `--ui-toggle-min-width` | `2.25rem` |
| `--ui-toggle-min-height` | `2.25rem` |
| `--ui-toggle-font-size` | `0.875rem` |
| `--ui-toggle-color` | `var(--ui-text-color` |
| `--ui-toggle-bg` | `transparent` |
| `--ui-toggle-bg-hover` | `var(--ui-muted-background` |
| `--ui-toggle-color-hover` | `var(--ui-text-color` |
| `--ui-toggle-bg-pressed` | `var(--ui-primary-color-light` |
| `--ui-toggle-color-pressed` | `var(--ui-primary-color` |
| `--ui-toggle-bg-pressed-hover` | `var(--ui-primary-color-light-hover` |
| `--ui-toggle-padding-y-sm` | `0.375rem` |
| `--ui-toggle-padding-x-sm` | `0.625rem` |
| `--ui-toggle-padding-y-lg` | `0.625rem` |
| `--ui-toggle-padding-x-lg` | `1rem` |
| `--ui-toggle-border-color` | `var(--ui-border-color` |
| `--ui-toggle-border-pressed-color` | `var(--ui-primary-color-light-hover` |
| `--ui-font-family` | — |
| `--ui-primary-color` | — |

---
