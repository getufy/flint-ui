# Split Panel

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
