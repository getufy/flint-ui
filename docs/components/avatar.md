# Avatar

<Demo label="Image" html="<div style=&quot;display:flex;gap:8px;flex-wrap:wrap&quot;><flint-avatar src=&quot;https://i.pravatar.cc/150?img=1&quot; alt=&quot;User 1&quot;></flint-avatar><flint-avatar src=&quot;https://i.pravatar.cc/150?img=2&quot; alt=&quot;User 2&quot;></flint-avatar><flint-avatar src=&quot;https://i.pravatar.cc/150?img=3&quot; alt=&quot;User 3&quot;></flint-avatar></div>" />

<Demo label="Initials" html="<div style=&quot;display:flex;gap:8px;flex-wrap:wrap&quot;><flint-avatar>AB</flint-avatar><flint-avatar>CD</flint-avatar><flint-avatar>EF</flint-avatar></div>" />

- **Tag**: `<flint-avatar>`
- **Class**: `FlintAvatar`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintAvatar } from '@getufy/flint-ui';
```

### Usage

```html
<flint-avatar></flint-avatar>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `src` | `src` | `string` | `''` | Image source URL for the avatar. |
| `alt` | `alt` | `string` | `''` | Alt text for the avatar image. |
| `initials` | `initials` | `string` | `''` | Initials to display when no image is provided. |
| `variant` | `variant` | `'circle' \| 'square' \| 'rounded'` | `'circle'` | Shape variant of the avatar. |
| `size` | `size` | `'small' \| 'medium' \| 'large' \| 'xlarge'` | `'medium'` | Size of the avatar. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-avatar-size` | `40px` |
| `--flint-avatar-bg` | `var(--flint-surface-3` |
| `--flint-avatar-color` | `var(--flint-text-color-muted` |
| `--flint-font-family` | — |
| `--flint-border-radius-md` | — |
| `--flint-surface-2` | — |
| `--flint-surface-3` | — |

---
