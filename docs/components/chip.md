# Chip

<Demo label="Variants" html="<div style=&quot;display:flex;gap:8px;flex-wrap:wrap&quot;><flint-chip label=&quot;Filled&quot; variant=&quot;filled&quot;></flint-chip><flint-chip label=&quot;Outlined&quot; variant=&quot;outlined&quot;></flint-chip><flint-chip label=&quot;Primary&quot; variant=&quot;filled&quot; color=&quot;primary&quot;></flint-chip><flint-chip label=&quot;Secondary&quot; variant=&quot;filled&quot; color=&quot;secondary&quot;></flint-chip></div>" />

<Demo label="Sizes" html="<div style=&quot;display:flex;gap:8px;flex-wrap:wrap;align-items:center&quot;><flint-chip label=&quot;Small&quot; size=&quot;sm&quot;></flint-chip><flint-chip label=&quot;Medium&quot; size=&quot;md&quot;></flint-chip><flint-chip label=&quot;Large&quot; size=&quot;lg&quot;></flint-chip></div>" />

<Demo label="Interactive" html="<div style=&quot;display:flex;gap:8px;flex-wrap:wrap&quot;><flint-chip label=&quot;Clickable&quot; clickable></flint-chip><flint-chip label=&quot;Deletable&quot; deletable></flint-chip><flint-chip label=&quot;Both&quot; clickable deletable></flint-chip><flint-chip label=&quot;Disabled&quot; disabled></flint-chip></div>" />

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
| `size` | `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the chip. |
| `clickable` | `clickable` | `boolean` | `false` | Whether the chip responds to click interactions. |
| `deletable` | `deletable` | `boolean` | `false` | Whether the chip shows a delete icon. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the chip and prevents interaction. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-chip-click` | — | Fired when a clickable chip is clicked. |
| `flint-chip-delete` | — | Fired when the chip's delete icon is clicked. detail: `{ value: string }` |

### Slots

| Name | Description |
| --- | --- |
| `avatar` | Avatar element shown at start. |
| `icon` | Icon shown at start when no avatar. |

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
