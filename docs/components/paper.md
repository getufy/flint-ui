# Paper

<Demo label="Elevations" html="<div style=&quot;display:flex;gap:8px;flex-wrap:wrap&quot;><flint-paper elevation=&quot;0&quot; style=&quot;padding:16px&quot;>Elevation 0</flint-paper><flint-paper elevation=&quot;1&quot; style=&quot;padding:16px&quot;>Elevation 1</flint-paper><flint-paper elevation=&quot;3&quot; style=&quot;padding:16px&quot;>Elevation 3</flint-paper><flint-paper elevation=&quot;6&quot; style=&quot;padding:16px&quot;>Elevation 6</flint-paper><flint-paper elevation=&quot;12&quot; style=&quot;padding:16px&quot;>Elevation 12</flint-paper></div>" />

The Paper component is a container for displaying content on an elevated surface.
Shadow styles are influenced by real-world physical counterparts.

- **Tag**: `<flint-paper>`
- **Class**: `FlintPaper`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintPaper } from '@getufy/flint-ui';
```

### Usage

```html
<flint-paper></flint-paper>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `elevation` | `elevation` | `number` | `1` | Shadow depth. Supported values: 0, 1, 2, 3, 4, 6, 8, 12, 16, 24. |
| `square` | `square` | `boolean` | `false` | If true, the paper will have square corners (border-radius: 0). |
| `variant` | `variant` | `'elevated' \| 'outlined' \| 'flat'` | `'elevated'` | Visual variant. |

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
