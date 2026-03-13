# Slider

<Demo>

<div style="width:100%;max-width:300px">
<ui-slider value="40"></ui-slider>
</div>

</Demo>

- **Tag**: `<ui-slider>`
- **Class**: `UiSlider`
- **Form Associated**: Yes

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiSlider } from 'storybook-lit';
```

### Usage

```html
<ui-slider></ui-slider>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `number` | `50` |  |
| `defaultValue` | `default-value` | `number \| undefined` | `undefined` |  |
| `min` | `min` | `number` | `0` |  |
| `max` | `max` | `number` | `100` |  |
| `step` | `step` | `number` | `1` |  |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `label` | `label` | `string` | `''` |  |
| `showValue` | `show-value` | `boolean` | `false` |  |
| `vertical` | `vertical` | `boolean` | `false` |  |
| `size` | `size` | `Size` | `'md'` |  |
| `name` | `name` | `string` | `''` |  |
| `formatValue` | `format-value` | `((v: number)` | `> string) \| undefined = undefined` | Optional formatter: `(value: number) => string`. JS-only prop (not an attribute). |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `ui-slider-change` | `{ value: this.value }` |  |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-slider-vertical-height` | `200px` |
| `--ui-font-family` | — |
| `--ui-text-color` | — |
| `--ui-primary-color` | — |
| `--ui-input-border-color` | — |
| `--ui-surface-1` | — |
| `--ui-shadow-sm` | — |
| `--ui-shadow-md` | — |
| `--ui-text-color-muted` | — |

---
