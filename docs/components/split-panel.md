# Split Panel

<Demo html="<flint-split-panel style=&quot;height:200px;width:100%;max-width:500px;border:1px solid #e5e7eb;border-radius:8px&quot;>  <div slot=&quot;start&quot; style=&quot;padding:16px;background:#f0f9ff;height:100%&quot;>Left Panel — Drag the divider</div>  <div slot=&quot;end&quot; style=&quot;padding:16px;background:#fef3c7;height:100%&quot;>Right Panel</div></flint-split-panel>" />

- **Tag**: `<flint-split-panel>`
- **Class**: `FlintSplitPanel`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintSplitPanel } from 'flint-ui';
```

### Usage

```html
<flint-split-panel></flint-split-panel>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `position` | `position` | `number` | `50` | Divider position as a percentage (0–100). Defaults to 50. |
| `positionInPixels` | `position-in-pixels` | `number` | `-1` |  |
| `vertical` | `vertical` | `boolean` | `false` | Vertical layout — start/end panels are stacked top/bottom. |
| `disabled` | `disabled` | `boolean` | `false` | Prevent the divider from being repositioned. |
| `snap` | `snap` | `string \| SnapFunction` | `''` |  |
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

### Methods

| Method | Description |
| --- | --- |
| `host([vertical])` |  |

---
