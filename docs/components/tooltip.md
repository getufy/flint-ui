# Tooltip

ui-tooltip A component that displays a text label when users hover over or focus on an element.

- **Tag**: `<ui-tooltip>`
- **Class**: `UiTooltip`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiTooltip } from 'storybook-lit';
```

### Usage

```html
<ui-tooltip></ui-tooltip>
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
| `--ui-tooltip-bg` | — |
| `--ui-tooltip-color` | — |
| `--ui-tooltip-max-width` | `300px` |
| `--ui-border-radius-sm` | — |
| `--ui-font-family` | — |
| `--ui-shadow-sm` | — |

---
