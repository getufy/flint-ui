# Flint Range Slider

<Demo html='<div style="display:flex;flex-direction:column;gap:16px;width:100%;max-width:300px"><flint-range-slider min="0" max="100" label="Price range" show-value></flint-range-slider><flint-range-slider min="0" max="100" label="Disabled" disabled show-value></flint-range-slider></div>' />

A range slider that lets users select a start and end value within a range.

- **Tag**: `<flint-range-slider>`
- **Class**: `FlintRangeSlider`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintRangeSlider } from '@getufy/flint-ui';
```

### Usage

```html
<flint-range-slider></flint-range-slider>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `[number, number]` | `[25, 75]` | Current [start, end] values. |
| `min` | `min` | `number` | `0` | Minimum bound (default: 0). |
| `max` | `max` | `number` | `100` | Maximum bound (default: 100). |
| `step` | `step` | `number` | `1` | Step increment (default: 1). |
| `size` | `size` | `'sm'\|'md'\|'lg'` | `'md'` | Visual size of track and thumbs (default: 'md'). |
| `disabled` | `disabled` | `boolean` | `false` | Disables both thumbs. |
| `label` | `label` | `string` | `''` | Label text shown above the track. |
| `showValue` | `show-value` | `boolean` | `false` | Show the current [start, end] values. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-range-slider-change` | `&#123; value: [number, number] &#125;` | When either thumb moves. detail: &#123; value: [number, number] &#125; |

### CSS Parts

| Name | Description |
| --- | --- |
| `base` | The component's base wrapper element. |
| `fill` | The fill element. |
| `track` | The track element. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-range-slider-track-height` | — |
| `--flint-range-slider-thumb-size` | — |
| `--flint-range-slider-track-color` | — |
| `--flint-range-slider-fill-color` | — |
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
