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
| `value` | `value` | `[number, number]` | `[25, 75]` | Current start and end values of the range. |
| `min` | `min` | `number` | `0` | Minimum allowed value. |
| `max` | `max` | `number` | `100` | Maximum allowed value. |
| `step` | `step` | `number` | `1` | Step increment between allowed values. |
| `size` | `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Visual size of the track and thumbs. |
| `disabled` | `disabled` | `boolean` | `false` | Disables both thumbs so the slider cannot be adjusted. |
| `label` | `label` | `string` | `''` | Label text displayed above the track. |
| `showValue` | `show-value` | `boolean` | `false` | Displays the current start and end values next to the label. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-range-slider-change` | `{ value: this.value }` | Fired when either thumb is moved. |

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
