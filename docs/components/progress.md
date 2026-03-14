# Progress

<Demo label="Circular Indeterminate" html="<flint-circular-progress></flint-circular-progress>" />

<Demo label="Circular Determinate" html="<div style=&quot;display:flex;gap:8px;flex-wrap:wrap;align-items:center&quot;><flint-circular-progress value=&quot;0&quot;></flint-circular-progress><flint-circular-progress value=&quot;25&quot;></flint-circular-progress><flint-circular-progress value=&quot;50&quot;></flint-circular-progress><flint-circular-progress value=&quot;75&quot;></flint-circular-progress><flint-circular-progress value=&quot;100&quot;></flint-circular-progress></div>" />

<Demo label="Linear Indeterminate" html="<div style=&quot;width:100%;max-width:400px&quot;><flint-linear-progress></flint-linear-progress></div>" />

<Demo label="Linear Determinate" html="<div style=&quot;display:flex;flex-direction:column;gap:12px;width:100%;max-width:400px&quot;><flint-linear-progress value=&quot;30&quot;></flint-linear-progress><flint-linear-progress value=&quot;60&quot;></flint-linear-progress><flint-linear-progress value=&quot;100&quot;></flint-linear-progress></div>" />

## `<flint-circular-progress>`

flint-circular-progress: a circular progress indicator (spinner).

- **Tag**: `<flint-circular-progress>`
- **Class**: `FlintCircularProgress`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintCircularProgress } from 'flint-ui';
```

### Usage

```html
<flint-circular-progress></flint-circular-progress>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `variant` | `variant` | `'determinate' \| 'indeterminate'` | `'indeterminate'` | Whether the progress shows a specific value or an endless animation. |
| `value` | `value` | `number` | `0` | Current progress percentage (0-100), used when variant is determinate. |
| `size` | `size` | `number` | `40` | Diameter of the circular spinner in pixels. |
| `thickness` | `thickness` | `number` | `3.6` | Stroke width of the circular track in pixels. |
| `color` | `color` | `'primary' \| 'success' \| 'error' \| 'warning'` | `'primary'` | Color theme of the progress indicator. |
| `label` | `label` | `string` | `''` | Accessible label applied as aria-label on the progressbar. |

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
import 'flint-ui'; // auto-registers all
// or
import { FlintLinearProgress } from 'flint-ui';
```

### Usage

```html
<flint-linear-progress></flint-linear-progress>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `variant` | `variant` | `'determinate' \| 'indeterminate'` | `'indeterminate'` | Whether the progress shows a specific value or an endless animation. |
| `value` | `value` | `number` | `0` | Current progress percentage (0-100), used when variant is determinate. |
| `height` | `height` | `number` | `4` | Height of the progress bar in pixels. |
| `color` | `color` | `'primary' \| 'success' \| 'error' \| 'warning'` | `'primary'` | Color theme of the progress bar. |
| `label` | `label` | `string` | `''` | Accessible label applied as aria-label on the progressbar. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-linear-progress-height` | — |
| `--flint-linear-progress-bg` | — |
| `--flint-linear-progress-color` | — |

---
