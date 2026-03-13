# Split Panel

<Demo html="<ui-split-panel style=&quot;height:200px;width:100%;max-width:500px;border:1px solid #e5e7eb;border-radius:8px&quot;>  <div slot=&quot;start&quot; style=&quot;padding:16px;background:#f0f9ff;height:100%&quot;>Left Panel — Drag the divider</div>  <div slot=&quot;end&quot; style=&quot;padding:16px;background:#fef3c7;height:100%&quot;>Right Panel</div></ui-split-panel>" />

- **Tag**: `<ui-split-panel>`
- **Class**: `UiSplitPanel`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiSplitPanel } from 'storybook-lit';
```

### Usage

```html
<ui-split-panel></ui-split-panel>
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
| `ui-split-panel-reposition` | — |  |

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
