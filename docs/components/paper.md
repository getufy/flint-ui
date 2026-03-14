# Paper

<Demo label="Elevations" html="<div style=&quot;display:flex;gap:8px;flex-wrap:wrap&quot;><flint-paper elevation=&quot;0&quot; style=&quot;padding:16px&quot;>Elevation 0</flint-paper><flint-paper elevation=&quot;1&quot; style=&quot;padding:16px&quot;>Elevation 1</flint-paper><flint-paper elevation=&quot;3&quot; style=&quot;padding:16px&quot;>Elevation 3</flint-paper><flint-paper elevation=&quot;6&quot; style=&quot;padding:16px&quot;>Elevation 6</flint-paper><flint-paper elevation=&quot;12&quot; style=&quot;padding:16px&quot;>Elevation 12</flint-paper></div>" />

The Paper component is a container for displaying content on an elevated surface. Shadow styles are influenced by real-world physical counterparts. Supported elevation values: 0, 1, 2, 3, 4, 6, 8, 12, 16, 24. Other numeric values are accepted but produce no visible shadow.

- **Tag**: `<flint-paper>`
- **Class**: `FlintPaper`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintPaper } from 'flint-ui';
```

### Usage

```html
<flint-paper></flint-paper>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `elevation` | `elevation` | `number` | `1` | Shadow depth; supported values are 0, 1, 2, 3, 4, 6, 8, 12, 16, 24. |
| `square` | `square` | `boolean` | `false` | * If true, the paper will have square corners (border-radius: 0). |
| `variant` | `variant` | `'elevated' \| 'outlined' \| 'flat'` | `'elevated'` | Visual style: elevated adds shadow, outlined adds a border, flat removes both. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-paper-padding` | `0` |
| `--flint-surface-1` | — |
| `--flint-text-color` | — |
| `--flint-border-radius-md` | — |
| `--flint-border-color` | — |
| `--flint-surface-background-flat` | — |

---
