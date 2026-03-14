# Slider

<Demo label="Values" html="<div style=&quot;display:flex;flex-direction:column;gap:16px;width:100%;max-width:300px&quot;><flint-slider value=&quot;25&quot;></flint-slider><flint-slider value=&quot;50&quot;></flint-slider><flint-slider value=&quot;75&quot;></flint-slider></div>" />

<Demo label="Disabled" html="<div style=&quot;width:100%;max-width:300px&quot;><flint-slider value=&quot;40&quot; disabled></flint-slider></div>" />

- **Tag**: `<flint-slider>`
- **Class**: `FlintSlider`
- **Form Associated**: Yes

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintSlider } from 'flint-ui';
```

### Usage

```html
<flint-slider></flint-slider>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `number` | `50` | Current slider value. |
| `defaultValue` | `default-value` | `number \| undefined` | `undefined` | Initial value applied once on first update (uncontrolled mode). |
| `min` | `min` | `number` | `0` | Minimum allowed value. |
| `max` | `max` | `number` | `100` | Maximum allowed value. |
| `step` | `step` | `number` | `1` | Step increment between values. |
| `disabled` | `disabled` | `boolean` | `false` | Disable the slider, preventing interaction. |
| `label` | `label` | `string` | `''` | Label text displayed above the slider. |
| `showValue` | `show-value` | `boolean` | `false` | Show the current value next to the label. |
| `vertical` | `vertical` | `boolean` | `false` | Render the slider vertically instead of horizontally. |
| `size` | `size` | `Size` | `'md'` | Visual size of the slider: 'sm', 'md', or 'lg'. |
| `name` | `name` | `string` | `''` | Form field name used when submitting form data. |
| `formatValue` | `format-value` | `((v: number)` | `> string) \| undefined = undefined` | Optional formatter: `(value: number) => string`. JS-only prop (not an attribute). |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-slider-change` | `{ value: this.value }` | Fired when the slider value changes via user interaction. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-slider-vertical-height` | `200px` |
| `--flint-font-family` | — |
| `--flint-text-color` | — |
| `--flint-primary-color` | — |
| `--flint-input-border-color` | — |
| `--flint-surface-1` | — |
| `--flint-shadow-sm` | — |
| `--flint-shadow-md` | — |
| `--flint-text-color-muted` | — |

---
