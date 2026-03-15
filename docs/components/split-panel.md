# Split Panel

<Demo html="<flint-split-panel style=&quot;height:200px;width:100%;max-width:500px;border:1px solid #e5e7eb;border-radius:8px&quot;>  <div slot=&quot;start&quot; style=&quot;padding:16px;background:#f0f9ff;height:100%&quot;>Left Panel — Drag the divider</div>  <div slot=&quot;end&quot; style=&quot;padding:16px;background:#fef3c7;height:100%&quot;>Right Panel</div></flint-split-panel>" />

`flint-split-panel` — Two adjacent panels separated by a draggable divider.

- **Tag**: `<flint-split-panel>`
- **Class**: `FlintSplitPanel`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintSplitPanel } from '@getufy/flint-ui';
```

### Usage

```html
<flint-split-panel></flint-split-panel>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `position` | `position` | `number` | `50` | Divider position as a percentage (0–100). Defaults to 50. |
| `positionInPixels` | `position-in-pixels` | `number` | `-1` | Divider position in pixels from the primary panel's edge. |
| `vertical` | `vertical` | `boolean` | `false` | Vertical layout — start/end panels are stacked top/bottom. |
| `disabled` | `disabled` | `boolean` | `false` | Prevent the divider from being repositioned. |
| `primary` | `primary` | `'start' \| 'end' \| undefined` | — | Designates a primary panel that maintains its pixel size when the |
| `snap` | `snap` | `string \| SnapFunction` | `''` | Space-separated snap positions (`Npx`, `N%`, `repeat(Npx)`, `repeat(N%)`), |
| `snapThreshold` | `snap-threshold` | `number` | `12` | How close (px) the divider must be to a snap point before snapping. Default: 12. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-split-panel-reposition` | `{ position: number; positionInPixels: number }` | Emitted when the divider position changes. Detail: `{ position: number; positionInPixels: number }`. |

### Slots

| Name | Description |
| --- | --- |
| `start` | Content for the start (left/top) panel. |
| `end` | Content for the end (right/bottom) panel. |
| `divider` | Custom handle icon rendered inside the divider. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-split-panel-divider-width` | — |
| `--flint-split-panel-divider-hit-area` | — |
| `--flint-split-panel-divider-color` | — |
| `--flint-split-panel-divider-hover-color` | — |
| `--flint-split-panel-min` | — |
| `--flint-split-panel-max` | — |

---
