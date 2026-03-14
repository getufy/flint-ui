# Slider

<Demo label="Values" html="<div style=&quot;display:flex;flex-direction:column;gap:16px;width:100%;max-width:300px&quot;><flint-slider value=&quot;25&quot;></flint-slider><flint-slider value=&quot;50&quot;></flint-slider><flint-slider value=&quot;75&quot;></flint-slider></div>" />

<Demo label="Disabled" html="<div style=&quot;width:100%;max-width:300px&quot;><flint-slider value=&quot;40&quot; disabled></flint-slider></div>" />

- **Tag**: `<flint-slider>`
- **Class**: `FlintSlider`

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
| `flint-slider-change` | `{ value: this.value }` |  |

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
