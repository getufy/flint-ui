# Skeleton

<Demo label="Variants" html='<div style="display:flex;flex-direction:column;gap:8px;width:100%;max-width:300px"><flint-skeleton shape="circular" width="40px" height="40px"></flint-skeleton><flint-skeleton shape="text" width="200px"></flint-skeleton><flint-skeleton shape="text" width="160px"></flint-skeleton><flint-skeleton shape="rectangular" width="100%" height="120px"></flint-skeleton></div>' />

<Demo label="Card Placeholder" html='<div style="display:flex;gap:12px;width:100%;max-width:300px">  <flint-skeleton shape="circular" width="48px" height="48px"></flint-skeleton>  <div style="flex:1;display:flex;flex-direction:column;gap:6px">    <flint-skeleton shape="text" width="80%"></flint-skeleton>    <flint-skeleton shape="text" width="60%"></flint-skeleton>  </div></div>' />

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
| `shape` | `shape` | `'text' \| 'circular' \| 'rectangular' \| 'rounded'` | `'text'` | The shape of the skeleton. |
| `width` | `width` | `string` | `''` | The width of the skeleton. Accepts any CSS length value (e.g. '200px', '50%'). |
| `height` | `height` | `string` | `''` | The height of the skeleton. Accepts any CSS length value. |
| `label` | `label` | `string` | `'Loading...'` | Accessible label announced by screen readers. Set to '' to silence. |

### CSS Parts

| Name | Description |
| --- | --- |
| `skeleton` | The inner skeleton span element. |

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
