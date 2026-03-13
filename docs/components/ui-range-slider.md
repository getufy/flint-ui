# Ui Range Slider

<Demo>

<div style="display:flex;flex-direction:column;gap:16px;width:100%;max-width:300px">
<ui-range-slider min="0" max="100" label="Price range" show-value></ui-range-slider>
<ui-range-slider min="0" max="100" label="Disabled" disabled show-value></ui-range-slider>
</div>

</Demo>

- **Tag**: `<ui-range-slider>`
- **Class**: `UiRangeSlider`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiRangeSlider } from 'storybook-lit';
```

### Usage

```html
<ui-range-slider></ui-range-slider>
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
| `ui-range-slider-change` | `{ value: this.value }` |  |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-range-slider-fill-color` | — |
| `--ui-range-slider-track-height` | — |
| `--ui-range-slider-track-color` | — |
| `--ui-range-slider-thumb-size` | — |
| `--ui-range-slider-thumb-color` | — |
| `--ui-range-slider-thumb-border` | — |
| `--ui-font-family` | — |
| `--ui-text-color` | — |
| `--ui-input-border-color` | — |
| `--ui-primary-color` | — |
| `--ui-surface-1` | — |
| `--ui-text-color-muted` | — |
| `--ui-shadow-sm` | — |
| `--ui-shadow-md` | — |

---
