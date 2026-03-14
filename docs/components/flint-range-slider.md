# Flint Range Slider

<Demo html="<div style=&quot;display:flex;flex-direction:column;gap:16px;width:100%;max-width:300px&quot;><flint-range-slider min=&quot;0&quot; max=&quot;100&quot; label=&quot;Price range&quot; show-value></flint-range-slider><flint-range-slider min=&quot;0&quot; max=&quot;100&quot; label=&quot;Disabled&quot; disabled show-value></flint-range-slider></div>" />

- **Tag**: `<flint-range-slider>`
- **Class**: `FlintRangeSlider`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintRangeSlider } from 'flint-ui';
```

### Usage

```html
<flint-range-slider></flint-range-slider>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `[number, number]` | `[25, 75]` |  |
| `min` | `min` | `number` | `0` |  |
| `max` | `max` | `number` | `100` |  |
| `step` | `step` | `number` | `1` |  |
| `size` | `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |  |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `label` | `label` | `string` | `''` |  |
| `showValue` | `show-value` | `boolean` | `false` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-range-slider-change` | `{ value: this.value }` |  |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-range-slider-fill-color` | — |
| `--flint-range-slider-track-height` | — |
| `--flint-range-slider-track-color` | — |
| `--flint-range-slider-thumb-size` | — |
| `--flint-range-slider-thumb-color` | — |
| `--flint-range-slider-thumb-border` | — |
| `--flint-font-family` | — |
| `--flint-text-color` | — |
| `--flint-input-border-color` | — |
| `--flint-primary-color` | — |
| `--flint-surface-1` | — |
| `--flint-text-color-muted` | — |
| `--flint-shadow-sm` | — |
| `--flint-shadow-md` | — |

---
