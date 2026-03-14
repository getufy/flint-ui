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
| `variant` | `variant` | `'determinate' \| 'indeterminate'` | `'indeterminate'` |  |
| `value` | `value` | `number` | `0` |  |
| `size` | `size` | `number` | `40` |  |
| `thickness` | `thickness` | `number` | `3.6` |  |
| `color` | `color` | `'primary' \| 'success' \| 'error' \| 'warning'` | `'primary'` |  |
| `label` | `label` | `string` | `''` |  |

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
| `variant` | `variant` | `'determinate' \| 'indeterminate'` | `'indeterminate'` |  |
| `value` | `value` | `number` | `0` |  |
| `height` | `height` | `number` | `4` |  |
| `color` | `color` | `'primary' \| 'success' \| 'error' \| 'warning'` | `'primary'` |  |
| `label` | `label` | `string` | `''` |  |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-linear-progress-height` | — |
| `--flint-linear-progress-bg` | — |
| `--flint-linear-progress-color` | — |

---
