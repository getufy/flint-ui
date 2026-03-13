# Progress

<Demo label="Circular Indeterminate">

<ui-circular-progress></ui-circular-progress>

</Demo>

<Demo label="Circular Determinate">

<ui-circular-progress value="0"></ui-circular-progress>
<ui-circular-progress value="25"></ui-circular-progress>
<ui-circular-progress value="50"></ui-circular-progress>
<ui-circular-progress value="75"></ui-circular-progress>
<ui-circular-progress value="100"></ui-circular-progress>

</Demo>

<Demo label="Linear Indeterminate">

<div style="width:100%;max-width:400px">
<ui-linear-progress></ui-linear-progress>
</div>

</Demo>

<Demo label="Linear Determinate">

<div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:400px">
<ui-linear-progress value="30"></ui-linear-progress>
<ui-linear-progress value="60"></ui-linear-progress>
<ui-linear-progress value="100"></ui-linear-progress>
</div>

</Demo>

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
