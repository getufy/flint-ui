# Split Panel

<Demo html="<flint-split-panel style=&quot;height:200px;width:100%;max-width:500px;border:1px solid #e5e7eb;border-radius:8px&quot;>  <div slot=&quot;start&quot; style=&quot;padding:16px;background:#f0f9ff;height:100%&quot;>Left Panel — Drag the divider</div>  <div slot=&quot;end&quot; style=&quot;padding:16px;background:#fef3c7;height:100%&quot;>Right Panel</div></flint-split-panel>" />

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
| `positionInPixels` | `position-in-pixels` | `number` | `-1` | Divider position in pixels from the primary panel's edge. Takes precedence over `position` when ≥ 0. |
| `vertical` | `vertical` | `boolean` | `false` | Vertical layout — start/end panels are stacked top/bottom. |
| `disabled` | `disabled` | `boolean` | `false` | Prevent the divider from being repositioned. |
| `primary` | `primary` | `'start' \| 'end'` | — | Designates a primary panel that maintains its pixel size when the host element is resized. The other panel grows or shrinks to fill. If unset, both panels resize proportionally. |
| `snap` | `snap` | `string \| SnapFunction` | `''` | Space-separated snap positions (`Npx`, `N%`, `repeat(Npx)`, `repeat(N%)`), e.g. `"100px 50%"` or `"repeat(100px) 50%"`. Can also be a `SnapFunction` for custom snapping logic. |
| `snapThreshold` | `snap-threshold` | `number` | `12` | How close (px) the divider must be to a snap point before snapping. Default: 12. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-split-panel-reposition` | — |  |

### Slots

| Name | Description |
| --- | --- |
| `start` |  |
| `divider` |  |
| `end` |  |

---
