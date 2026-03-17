# Tooltip

<Demo label="Placements" html='<div style="display:flex;gap:8px;flex-wrap:wrap"><flint-tooltip label="Top tooltip">  <flint-button variant="secondary">Top</flint-button></flint-tooltip><flint-tooltip label="Bottom tooltip" placement="bottom">  <flint-button variant="secondary">Bottom</flint-button></flint-tooltip><flint-tooltip label="Left tooltip" placement="left">  <flint-button variant="secondary">Left</flint-button></flint-tooltip><flint-tooltip label="Right tooltip" placement="right">  <flint-button variant="secondary">Right</flint-button></flint-tooltip></div>' />

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
| `hoist` | `hoist` | `boolean` | `false` | When true, the tooltip popup uses `position: fixed` instead of `position: absolute` |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-tooltip-show` | — | Dispatched when the tooltip becomes visible. |
| `flint-tooltip-hide` | — | Dispatched when the tooltip is dismissed. |

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
