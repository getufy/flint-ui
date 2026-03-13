# Chip

<Demo label="Variants">

<ui-chip variant="filled">Filled</ui-chip>
<ui-chip variant="outlined">Outlined</ui-chip>
<ui-chip variant="filled" color="primary">Primary</ui-chip>
<ui-chip variant="filled" color="secondary">Secondary</ui-chip>
<ui-chip deletable>Deletable</ui-chip>

</Demo>

- **Tag**: `<ui-chip>`
- **Class**: `UiChip`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiChip } from 'storybook-lit';
```

### Usage

```html
<ui-chip></ui-chip>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | `string` | `''` |  |
| `variant` | `variant` | `'filled' \| 'outlined'` | `'filled'` |  |
| `color` | `color` | `'default' \| 'primary' \| 'secondary'` | `'default'` |  |
| `size` | `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |  |
| `clickable` | `clickable` | `boolean` | `false` |  |
| `deletable` | `deletable` | `boolean` | `false` |  |
| `disabled` | `disabled` | `boolean` | `false` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `click` | — |  |
| `delete` | — |  |

### Slots

| Name | Description |
| --- | --- |
| `avatar` |  |
| `icon` |  |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-chip-height` | `32px` |
| `--ui-chip-padding-x` | `12px` |
| `--ui-chip-border-radius` | `16px` |
| `--ui-chip-font-size` | `0.875rem` |
| `--ui-chip-gap` | `8px` |
| `--ui-chip-height-sm` | `24px` |
| `--ui-chip-padding-x-sm` | `8px` |
| `--ui-chip-font-size-sm` | `0.75rem` |
| `--ui-chip-border-radius-sm` | `12px` |
| `--ui-chip-height-lg` | `40px` |
| `--ui-chip-padding-x-lg` | `16px` |
| `--ui-chip-font-size-lg` | `1rem` |
| `--ui-chip-border-radius-lg` | `20px` |
| `--ui-font-family` | — |
| `--ui-surface-2` | — |
| `--ui-text-color` | — |
| `--ui-hover-color` | — |
| `--ui-active-color` | — |
| `--ui-input-border-color` | — |
| `--ui-primary-color` | — |
| `--ui-text-color-on-primary` | — |
| `--ui-secondary-color` | — |
| `--ui-shadow-sm` | — |
| `--ui-avatar-size` | `24px` |

---
