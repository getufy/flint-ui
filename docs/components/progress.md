# Progress

<Demo label="Circular Indeterminate" html='<flint-circular-progress></flint-circular-progress>' />

<Demo label="Circular Determinate" html='<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><flint-circular-progress value="0"></flint-circular-progress><flint-circular-progress value="25"></flint-circular-progress><flint-circular-progress value="50"></flint-circular-progress><flint-circular-progress value="75"></flint-circular-progress><flint-circular-progress value="100"></flint-circular-progress></div>' />

<Demo label="Linear Indeterminate" html='<div style="width:100%;max-width:400px"><flint-linear-progress></flint-linear-progress></div>' />

<Demo label="Linear Determinate" html='<div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:400px"><flint-linear-progress value="30"></flint-linear-progress><flint-linear-progress value="60"></flint-linear-progress><flint-linear-progress value="100"></flint-linear-progress></div>' />

## `<flint-circular-progress>`

flint-circular-progress: a circular progress indicator (spinner).

- **Tag**: `<flint-circular-progress>`
- **Class**: `FlintCircularProgress`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintCircularProgress } from '@getufy/flint-ui';
```

### Usage

```html
<flint-circular-progress></flint-circular-progress>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `mode` | `mode` | `'determinate' \| 'indeterminate'` | `'indeterminate'` | Progress mode: determinate shows a specific value, indeterminate shows an animation. |
| `variant` | `variant` | `'determinate' \| 'indeterminate'` | `'indeterminate'` |  |
| `value` | `value` | `number` | `0` | Current progress value (0 to max) for determinate mode. |
| `max` | `max` | `number` | `100` | Maximum value. The progress is calculated as value / max. |
| `size` | `size` | `number` | `40` | Diameter of the circular indicator in pixels. |
| `thickness` | `thickness` | `number` | `3.6` | Stroke width of the circle in pixels. |
| `color` | `color` | `'primary' \| 'success' \| 'error' \| 'warning'` | `'primary'` | Color theme of the progress indicator. |
| `label` | `label` | `string` | `''` | Accessible label for the progress indicator. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-circular-progress-size` | — |
| `--flint-circular-progress-color` | — |
| `--flint-circular-progress-thickness` | `3.6` |
| `--flint-primary-color` | — |
| `--flint-primary-color-light` | — |

---

## `<flint-linear-progress>`

flint-linear-progress: a horizontal progress bar.

- **Tag**: `<flint-linear-progress>`
- **Class**: `FlintLinearProgress`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintLinearProgress } from '@getufy/flint-ui';
```

### Usage

```html
<flint-linear-progress></flint-linear-progress>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `mode` | `mode` | `'determinate' \| 'indeterminate'` | `'indeterminate'` | Progress mode: determinate shows a specific value, indeterminate shows an animation. |
| `variant` | `variant` | `'determinate' \| 'indeterminate'` | `'indeterminate'` |  |
| `value` | `value` | `number` | `0` | Current progress value (0 to max). |
| `max` | `max` | `number` | `100` | Maximum value. The progress is calculated as value / max. |
| `height` | `height` | `number` | `4` | Height of the progress bar in pixels. |
| `color` | `color` | `'primary' \| 'success' \| 'error' \| 'warning'` | `'primary'` | Color theme of the progress bar. |
| `label` | `label` | `string` | `''` | Accessible label for the progress bar. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-linear-progress-height` | — |
| `--flint-linear-progress-bg` | — |
| `--flint-linear-progress-color` | — |

---
