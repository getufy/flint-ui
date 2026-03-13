# Badge

<Demo label="Content" html="<ui-badge content=&quot;4&quot;>  <div style=&quot;width:40px;height:40px;border-radius:8px;background:#e5e7eb;display:flex;align-items:center;justify-content:center&quot;>    <svg width=&quot;20&quot; height=&quot;20&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot;><path d=&quot;M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z&quot;></path><polyline points=&quot;22,6 12,13 2,6&quot;></polyline></svg>  </div></ui-badge><ui-badge content=&quot;99+&quot; variant=&quot;error&quot;>  <div style=&quot;width:40px;height:40px;border-radius:8px;background:#e5e7eb;display:flex;align-items:center;justify-content:center&quot;>    <svg width=&quot;20&quot; height=&quot;20&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot;><path d=&quot;M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9&quot;></path><path d=&quot;M13.73 21a2 2 0 0 1-3.46 0&quot;></path></svg>  </div></ui-badge>" />

<Demo label="Variants" html="<ui-badge content=&quot;3&quot; variant=&quot;primary&quot;><div style=&quot;width:30px;height:30px;border-radius:6px;background:#e5e7eb&quot;></div></ui-badge><ui-badge content=&quot;3&quot; variant=&quot;secondary&quot;><div style=&quot;width:30px;height:30px;border-radius:6px;background:#e5e7eb&quot;></div></ui-badge><ui-badge content=&quot;3&quot; variant=&quot;success&quot;><div style=&quot;width:30px;height:30px;border-radius:6px;background:#e5e7eb&quot;></div></ui-badge><ui-badge content=&quot;3&quot; variant=&quot;warning&quot;><div style=&quot;width:30px;height:30px;border-radius:6px;background:#e5e7eb&quot;></div></ui-badge><ui-badge content=&quot;3&quot; variant=&quot;error&quot;><div style=&quot;width:30px;height:30px;border-radius:6px;background:#e5e7eb&quot;></div></ui-badge>" />

<Demo label="Dot" html="<ui-badge dot><div style=&quot;width:30px;height:30px;border-radius:6px;background:#e5e7eb&quot;></div></ui-badge><ui-badge dot variant=&quot;error&quot;><div style=&quot;width:30px;height:30px;border-radius:6px;background:#e5e7eb&quot;></div></ui-badge>" />

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
