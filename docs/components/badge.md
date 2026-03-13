# Badge

A badge component that generates a small badge at the top-right of its children.

- **Tag**: `<ui-badge>`
- **Class**: `UiBadge`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiBadge } from 'storybook-lit';
```

### Usage

```html
<ui-badge></ui-badge>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `content` | `content` | `string` | `''` |  |
| `dot` | `dot` | `boolean` | `false` |  |
| `invisible` | `invisible` | `boolean` | `false` |  |
| `variant` | `variant` | `'primary' \| 'secondary' \| 'error' \| 'success' \| 'warning'` | `'primary'` |  |
| `max` | `max` | `number` | `99` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | The content to which the badge is attached. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-badge-background` | `var(--ui-primary-color` |
| `--ui-badge-color` | `var(--ui-text-color-on-primary` |
| `--ui-font-family` | — |
| `--ui-surface-1` | — |
| `--ui-primary-color` | — |
| `--ui-secondary-color` | — |
| `--ui-error-color` | — |
| `--ui-text-color-on-primary` | — |
| `--ui-success-color` | — |
| `--ui-warning-color` | — |

---
