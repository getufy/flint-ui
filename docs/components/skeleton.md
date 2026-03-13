# Skeleton

<Demo label="Variants" html="<div style=&quot;display:flex;flex-direction:column;gap:8px;width:100%;max-width:300px&quot;><ui-skeleton variant=&quot;circular&quot; width=&quot;40px&quot; height=&quot;40px&quot;></ui-skeleton><ui-skeleton variant=&quot;text&quot; width=&quot;200px&quot;></ui-skeleton><ui-skeleton variant=&quot;text&quot; width=&quot;160px&quot;></ui-skeleton><ui-skeleton variant=&quot;rectangular&quot; width=&quot;100%&quot; height=&quot;120px&quot;></ui-skeleton></div>" />

<Demo label="Card Placeholder" html="<div style=&quot;display:flex;gap:12px;width:100%;max-width:300px&quot;>  <ui-skeleton variant=&quot;circular&quot; width=&quot;48px&quot; height=&quot;48px&quot;></ui-skeleton>  <div style=&quot;flex:1;display:flex;flex-direction:column;gap:6px&quot;>    <ui-skeleton variant=&quot;text&quot; width=&quot;80%&quot;></ui-skeleton>    <ui-skeleton variant=&quot;text&quot; width=&quot;60%&quot;></ui-skeleton>  </div></div>" />

Skeletons display a placeholder preview of content before data gets loaded.

- **Tag**: `<ui-skeleton>`
- **Class**: `UiSkeleton`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiSkeleton } from 'storybook-lit';
```

### Usage

```html
<ui-skeleton></ui-skeleton>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `dark` | `dark` | `boolean` | `false` | * If true, applies dark-theme styles regardless of OS preference. |
| `animation` | `animation` | `'pulse' \| 'wave' \| 'none'` | `'pulse'` | * The animation type. |
| `variant` | `variant` | `'text' \| 'circular' \| 'rectangular' \| 'rounded'` | `'text'` | * The shape of the skeleton. |
| `width` | `width` | `string` | `''` | * The width of the skeleton. Accepts any CSS length value (e.g. '200px', '50%'). |
| `height` | `height` | `string` | `''` | * The height of the skeleton. Accepts any CSS length value. |
| `label` | `label` | `string` | `'Loading...'` | * Accessible label announced by screen readers. Set to '' to silence. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-skeleton-bg` | `var(--ui-surface-3` |
| `--ui-skeleton-bg-dark` | `rgba(255, 255, 255, 0.13` |
| `--ui-skeleton-animation-duration` | `1.5s` |
| `--ui-skeleton-wave-color` | `rgba(255, 255, 255, 0.4` |
| `--ui-border-radius-sm` | — |
| `--ui-border-radius-md` | — |
| `--ui-border-radius-lg` | — |

---
