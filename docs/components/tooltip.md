# Tooltip

<Demo label="Placements" html="<div style=&quot;display:flex;gap:8px;flex-wrap:wrap&quot;><flint-tooltip label=&quot;Top tooltip&quot;>  <flint-button variant=&quot;secondary&quot;>Top</flint-button></flint-tooltip><flint-tooltip label=&quot;Bottom tooltip&quot; placement=&quot;bottom&quot;>  <flint-button variant=&quot;secondary&quot;>Bottom</flint-button></flint-tooltip><flint-tooltip label=&quot;Left tooltip&quot; placement=&quot;left&quot;>  <flint-button variant=&quot;secondary&quot;>Left</flint-button></flint-tooltip><flint-tooltip label=&quot;Right tooltip&quot; placement=&quot;right&quot;>  <flint-button variant=&quot;secondary&quot;>Right</flint-button></flint-tooltip></div>" />

flint-tooltip A component that displays a text label when users hover over or focus on an element.

- **Tag**: `<flint-tooltip>`
- **Class**: `FlintTooltip`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintTooltip } from 'flint-ui';
```

### Usage

```html
<flint-tooltip></flint-tooltip>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | `string` | `''` |  |
| `placement` | `placement` | `Placement` | `'top'` |  |
| `arrow` | `arrow` | `boolean` | `false` |  |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `openDelay` | `open-delay` | `number` | `0` | Delay in ms before showing the tooltip. |
| `closeDelay` | `close-delay` | `number` | `0` | Delay in ms before hiding the tooltip. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-tooltip-bg` | — |
| `--flint-tooltip-color` | — |
| `--flint-tooltip-max-width` | `300px` |
| `--flint-border-radius-sm` | — |
| `--flint-font-family` | — |
| `--flint-shadow-sm` | — |

---
