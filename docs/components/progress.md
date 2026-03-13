# Progress

<Demo label="Circular Indeterminate" html="<ui-circular-progress></ui-circular-progress>" />

<Demo label="Circular Determinate" html="<div style=&quot;display:flex;gap:8px;flex-wrap:wrap;align-items:center&quot;><ui-circular-progress value=&quot;0&quot;></ui-circular-progress><ui-circular-progress value=&quot;25&quot;></ui-circular-progress><ui-circular-progress value=&quot;50&quot;></ui-circular-progress><ui-circular-progress value=&quot;75&quot;></ui-circular-progress><ui-circular-progress value=&quot;100&quot;></ui-circular-progress></div>" />

<Demo label="Linear Indeterminate" html="<div style=&quot;width:100%;max-width:400px&quot;><ui-linear-progress></ui-linear-progress></div>" />

<Demo label="Linear Determinate" html="<div style=&quot;display:flex;flex-direction:column;gap:12px;width:100%;max-width:400px&quot;><ui-linear-progress value=&quot;30&quot;></ui-linear-progress><ui-linear-progress value=&quot;60&quot;></ui-linear-progress><ui-linear-progress value=&quot;100&quot;></ui-linear-progress></div>" />

## `<ui-circular-progress>`

ui-circular-progress: a circular progress indicator (spinner).

- **Tag**: `<ui-circular-progress>`
- **Class**: `UiCircularProgress`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiCircularProgress } from 'storybook-lit';
```

### Usage

```html
<ui-circular-progress></ui-circular-progress>
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
| `--ui-circular-progress-size` | — |
| `--ui-circular-progress-color` | — |
| `--ui-circular-progress-thickness` | `3.6` |
| `--ui-primary-color` | — |
| `--ui-primary-color-light` | — |

---

## `<ui-linear-progress>`

ui-linear-progress: a horizontal progress bar.

- **Tag**: `<ui-linear-progress>`
- **Class**: `UiLinearProgress`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiLinearProgress } from 'storybook-lit';
```

### Usage

```html
<ui-linear-progress></ui-linear-progress>
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
| `--ui-linear-progress-height` | — |
| `--ui-linear-progress-bg` | — |
| `--ui-linear-progress-color` | — |

---
