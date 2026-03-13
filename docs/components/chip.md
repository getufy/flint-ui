# Chip

<Demo label="Variants" html="<ui-chip label=&quot;Filled&quot; variant=&quot;filled&quot;></ui-chip><ui-chip label=&quot;Outlined&quot; variant=&quot;outlined&quot;></ui-chip><ui-chip label=&quot;Primary&quot; variant=&quot;filled&quot; color=&quot;primary&quot;></ui-chip><ui-chip label=&quot;Secondary&quot; variant=&quot;filled&quot; color=&quot;secondary&quot;></ui-chip>" />

<Demo label="Sizes" html="<ui-chip label=&quot;Small&quot; size=&quot;sm&quot;></ui-chip><ui-chip label=&quot;Medium&quot; size=&quot;md&quot;></ui-chip><ui-chip label=&quot;Large&quot; size=&quot;lg&quot;></ui-chip>" />

<Demo label="Interactive" html="<ui-chip label=&quot;Clickable&quot; clickable></ui-chip><ui-chip label=&quot;Deletable&quot; deletable></ui-chip><ui-chip label=&quot;Both&quot; clickable deletable></ui-chip><ui-chip label=&quot;Disabled&quot; disabled></ui-chip>" />

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
