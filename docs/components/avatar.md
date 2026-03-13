# Avatar

<Demo>

<ui-avatar src="https://i.pravatar.cc/150?img=1" alt="User 1"></ui-avatar>
<ui-avatar src="https://i.pravatar.cc/150?img=2" alt="User 2"></ui-avatar>
<ui-avatar>AB</ui-avatar>

</Demo>

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
