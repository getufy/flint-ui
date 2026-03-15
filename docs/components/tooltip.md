# Tooltip

<Demo label="Placements" html="<div style=&quot;display:flex;gap:8px;flex-wrap:wrap&quot;><flint-tooltip label=&quot;Top tooltip&quot;>  <flint-button variant=&quot;secondary&quot;>Top</flint-button></flint-tooltip><flint-tooltip label=&quot;Bottom tooltip&quot; placement=&quot;bottom&quot;>  <flint-button variant=&quot;secondary&quot;>Bottom</flint-button></flint-tooltip><flint-tooltip label=&quot;Left tooltip&quot; placement=&quot;left&quot;>  <flint-button variant=&quot;secondary&quot;>Left</flint-button></flint-tooltip><flint-tooltip label=&quot;Right tooltip&quot; placement=&quot;right&quot;>  <flint-button variant=&quot;secondary&quot;>Right</flint-button></flint-tooltip></div>" />

flint-tooltip
A component that displays a text label when users hover over or focus on an element.

- **Tag**: `<flint-tooltip>`
- **Class**: `FlintTooltip`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintTooltip } from '@getufy/flint-ui';
```

### Usage

```html
<flint-tooltip></flint-tooltip>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | `string` | `''` | Text content displayed inside the tooltip. |
| `placement` | `placement` | `Placement` | `'top'` | Preferred placement of the tooltip relative to the trigger element. |
| `arrow` | `arrow` | `boolean` | `false` | Show a small arrow pointing toward the trigger element. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the tooltip so it never appears. |
| `openDelay` | `open-delay` | `number` | `0` | Delay in ms before showing the tooltip. |
| `closeDelay` | `close-delay` | `number` | `0` | Delay in ms before hiding the tooltip. |

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
