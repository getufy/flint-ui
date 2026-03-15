# Slider

<Demo label="Values" html='<div style="display:flex;flex-direction:column;gap:16px;width:100%;max-width:300px"><flint-slider value="25"></flint-slider><flint-slider value="50"></flint-slider><flint-slider value="75"></flint-slider></div>' />

<Demo label="Disabled" html='<div style="width:100%;max-width:300px"><flint-slider value="40" disabled></flint-slider></div>' />

Slider: a range input for selecting a numeric value.

- **Tag**: `<flint-slider>`
- **Class**: `FlintSlider`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintSlider } from '@getufy/flint-ui';
```

### Usage

```html
<flint-slider></flint-slider>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `number` | `50` | Current slider value. |
| `defaultValue` | `default-value` | `number \| undefined` | `undefined` | Initial value for uncontrolled usage. |
| `min` | `min` | `number` | `0` | Minimum allowed value. |
| `max` | `max` | `number` | `100` | Maximum allowed value. |
| `step` | `step` | `number` | `1` | Step increment between values. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the slider and prevents interaction. |
| `label` | `label` | `string` | `''` | Label text displayed above the slider. |
| `showValue` | `show-value` | `boolean` | `false` | Whether to display the current value. |
| `vertical` | `vertical` | `boolean` | `false` | Renders the slider vertically. |
| `size` | `size` | `Size` | `'md'` | Size variant of the slider. |
| `name` | `name` | `string` | `''` | Form field name used when submitting form data. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-slider-change` | — | Fired when the slider value changes. |

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
