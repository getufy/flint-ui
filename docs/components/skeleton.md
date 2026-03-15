# Skeleton

<Demo label="Variants" html="<div style=&quot;display:flex;flex-direction:column;gap:8px;width:100%;max-width:300px&quot;><flint-skeleton variant=&quot;circular&quot; width=&quot;40px&quot; height=&quot;40px&quot;></flint-skeleton><flint-skeleton variant=&quot;text&quot; width=&quot;200px&quot;></flint-skeleton><flint-skeleton variant=&quot;text&quot; width=&quot;160px&quot;></flint-skeleton><flint-skeleton variant=&quot;rectangular&quot; width=&quot;100%&quot; height=&quot;120px&quot;></flint-skeleton></div>" />

<Demo label="Card Placeholder" html="<div style=&quot;display:flex;gap:12px;width:100%;max-width:300px&quot;>  <flint-skeleton variant=&quot;circular&quot; width=&quot;48px&quot; height=&quot;48px&quot;></flint-skeleton>  <div style=&quot;flex:1;display:flex;flex-direction:column;gap:6px&quot;>    <flint-skeleton variant=&quot;text&quot; width=&quot;80%&quot;></flint-skeleton>    <flint-skeleton variant=&quot;text&quot; width=&quot;60%&quot;></flint-skeleton>  </div></div>" />

Skeletons display a placeholder preview of content before data gets loaded.

- **Tag**: `<flint-skeleton>`
- **Class**: `FlintSkeleton`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintSkeleton } from '@getufy/flint-ui';
```

### Usage

```html
<flint-skeleton></flint-skeleton>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `dark` | `dark` | `boolean` | `false` | If true, applies dark-theme styles regardless of OS preference. |
| `animation` | `animation` | `'pulse' \| 'wave' \| 'none'` | `'pulse'` | The animation type. |
| `variant` | `variant` | `'text' \| 'circular' \| 'rectangular' \| 'rounded'` | `'text'` | The shape of the skeleton. |
| `width` | `width` | `string` | `''` | The width of the skeleton. Accepts any CSS length value (e.g. '200px', '50%'). |
| `height` | `height` | `string` | `''` | The height of the skeleton. Accepts any CSS length value. |
| `label` | `label` | `string` | `'Loading...'` | Accessible label announced by screen readers. Set to '' to silence. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-skeleton-bg` | — |
| `--flint-skeleton-bg-dark` | — |
| `--flint-skeleton-wave-color` | — |
| `--flint-skeleton-animation-duration` | — |
| `--flint-border-radius-sm` | — |
| `--flint-border-radius-md` | — |
| `--flint-border-radius-lg` | — |

---
