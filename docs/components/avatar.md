# Avatar

<Demo label="Image" html="<ui-avatar src=&quot;https://i.pravatar.cc/150?img=1&quot; alt=&quot;User 1&quot;></ui-avatar><ui-avatar src=&quot;https://i.pravatar.cc/150?img=2&quot; alt=&quot;User 2&quot;></ui-avatar><ui-avatar src=&quot;https://i.pravatar.cc/150?img=3&quot; alt=&quot;User 3&quot;></ui-avatar>" />

<Demo label="Initials" html="<ui-avatar>AB</ui-avatar><ui-avatar>CD</ui-avatar><ui-avatar>EF</ui-avatar>" />

- **Tag**: `<ui-avatar>`
- **Class**: `UiAvatar`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiAvatar } from 'storybook-lit';
```

### Usage

```html
<ui-avatar></ui-avatar>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `src` | `src` | `string` | `''` |  |
| `alt` | `alt` | `string` | `''` |  |
| `initials` | `initials` | `string` | `''` |  |
| `variant` | `variant` | `'circle' \| 'square' \| 'rounded'` | `'circle'` |  |
| `size` | `size` | `'small' \| 'medium' \| 'large' \| 'xlarge'` | `'medium'` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-avatar-size` | `40px` |
| `--ui-avatar-bg` | `var(--ui-surface-3` |
| `--ui-avatar-color` | `var(--ui-text-color-muted` |
| `--ui-font-family` | — |
| `--ui-border-radius-md` | — |
| `--ui-surface-2` | — |
| `--ui-surface-3` | — |

---
