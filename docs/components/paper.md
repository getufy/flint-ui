# Paper

The Paper component is a container for displaying content on an elevated surface. Shadow styles are influenced by real-world physical counterparts. Supported elevation values: 0, 1, 2, 3, 4, 6, 8, 12, 16, 24. Other numeric values are accepted but produce no visible shadow.

- **Tag**: `<ui-paper>`
- **Class**: `UiPaper`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiPaper } from 'storybook-lit';
```

### Usage

```html
<ui-paper></ui-paper>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `elevation` | `elevation` | `number` | `1` |  |
| `square` | `square` | `boolean` | `false` | * If true, the paper will have square corners (border-radius: 0). |
| `variant` | `variant` | `'elevated' \| 'outlined' \| 'flat'` | `'elevated'` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-paper-padding` | `0` |
| `--ui-surface-1` | — |
| `--ui-text-color` | — |
| `--ui-border-radius-md` | — |
| `--ui-border-color` | — |
| `--ui-surface-background-flat` | — |

---
