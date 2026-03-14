# Rating

<Demo label="Interactive" html="<flint-rating value=&quot;0&quot;></flint-rating>" />

<Demo label="Values" html="<div style=&quot;display:flex;gap:8px;flex-wrap:wrap&quot;><flint-rating value=&quot;1&quot; readonly></flint-rating><flint-rating value=&quot;3&quot; readonly></flint-rating><flint-rating value=&quot;5&quot; readonly></flint-rating></div>" />

<Demo label="Disabled" html="<flint-rating value=&quot;3&quot; disabled></flint-rating>" />

- **Tag**: `<flint-rating>`
- **Class**: `FlintRating`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintRating } from 'flint-ui';
```

### Usage

```html
<flint-rating></flint-rating>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `number` | `0` | Current rating value. |
| `max` | `max` | `number` | `5` | Maximum number of stars displayed. |
| `readonly` | `readonly` | `boolean` | `false` | Displays the rating without allowing interaction. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the rating control. |
| `clearable` | `clearable` | `boolean` | `false` | Allows clicking the current value again to reset it to 0. |
| `defaultValue` | `default-value` | `number` | `0` | Initial value for uncontrolled mode; ignored after first render. |
| `size` | `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the star icons. |
| `name` | `name` | `string` | `''` | Form control name for the hidden input. |
| `label` | `label` | `string` | `'Rating'` | Accessible label for the rating group (aria-label). |
| `precision` | `precision` | `1 \| 0.5` | `1` | Rating step; set to 0.5 to allow half-star values. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-rating-change` | `{ value: this.value }` | Fired when the rating value changes via user interaction. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-rating-size` | — |
| `--flint-rating-color` | — |
| `--flint-rating-empty-color` | — |
| `--flint-font-family` | — |

---
