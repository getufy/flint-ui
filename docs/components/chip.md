# Chip

<Demo label="Variants" html='<div style="display:flex;gap:8px;flex-wrap:wrap"><flint-chip label="Filled" variant="filled"></flint-chip><flint-chip label="Outlined" variant="outlined"></flint-chip><flint-chip label="Primary" variant="filled" color="primary"></flint-chip><flint-chip label="Secondary" variant="filled" color="secondary"></flint-chip></div>' />

<Demo label="Sizes" html='<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><flint-chip label="Small" size="sm"></flint-chip><flint-chip label="Medium" size="md"></flint-chip><flint-chip label="Large" size="lg"></flint-chip></div>' />

<Demo label="Interactive" html='<div style="display:flex;gap:8px;flex-wrap:wrap"><flint-chip label="Clickable" clickable></flint-chip><flint-chip label="Deletable" deletable></flint-chip><flint-chip label="Both" clickable deletable></flint-chip><flint-chip label="Disabled" disabled></flint-chip></div>' />

Chip: a compact element representing an input, attribute, or action.

- **Tag**: `<flint-chip>`
- **Class**: `FlintChip`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintChip } from '@getufy/flint-ui';
```

### Usage

```html
<flint-chip></flint-chip>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | `string` | `''` | Text content displayed inside the chip. |
| `variant` | `variant` | `'filled' \| 'outlined'` | `'filled'` | Visual style variant of the chip. |
| `color` | `color` | `'default' \| 'primary' \| 'secondary'` | `'default'` | Color theme applied to the chip. |
| `size` | `size` | `Size` | `'md'` | Size of the chip. |
| `clickable` | `clickable` | `boolean` | `false` | Whether the chip responds to click interactions. |
| `deletable` | `deletable` | `boolean` | `false` | Whether the chip shows a delete icon. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the chip and prevents interaction. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-chip-click` | — | Fired when a clickable chip is clicked. |
| `flint-chip-delete` | `&#123; value: string &#125;` | Fired when the chip's delete icon is clicked. detail: `&#123; value: string &#125;` |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Text content for the chip (alternative to the `label` prop). |
| `avatar` | Avatar element shown at start. |
| `icon` | Icon shown at start when no avatar. |

### CSS Parts

| Name | Description |
| --- | --- |
| `base` | The chip's base wrapper element. |
| `label` | The label text element. |
| `delete-icon` | The delete button element. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-chip-height` | `32px` |
| `--flint-chip-padding-x` | `12px` |
| `--flint-chip-border-radius` | `16px` |
| `--flint-chip-font-size` | `0.875rem` |
| `--flint-chip-gap` | `8px` |
| `--flint-chip-height-sm` | `24px` |
| `--flint-chip-padding-x-sm` | `8px` |
| `--flint-chip-font-size-sm` | `0.75rem` |
| `--flint-chip-border-radius-sm` | `12px` |
| `--flint-chip-height-lg` | `40px` |
| `--flint-chip-padding-x-lg` | `16px` |
| `--flint-chip-font-size-lg` | `1rem` |
| `--flint-chip-border-radius-lg` | `20px` |
| `--flint-font-family` | — |
| `--flint-surface-2` | — |
| `--flint-text-color` | — |
| `--flint-hover-color` | — |
| `--flint-active-color` | — |
| `--flint-input-border-color` | — |
| `--flint-primary-color` | — |
| `--flint-text-color-on-primary` | — |
| `--flint-secondary-color` | — |
| `--flint-shadow-sm` | — |
| `--flint-avatar-size` | `24px` |

---
