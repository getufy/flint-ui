# Rating

<Demo label="Interactive" html='<flint-rating value="0"></flint-rating>' />

<Demo label="Values" html='<div style="display:flex;gap:8px;flex-wrap:wrap"><flint-rating value="1" readonly></flint-rating><flint-rating value="3" readonly></flint-rating><flint-rating value="5" readonly></flint-rating></div>' />

<Demo label="Disabled" html='<flint-rating value="3" disabled></flint-rating>' />

Rating: a star-based rating input.

- **Tag**: `<flint-rating>`
- **Class**: `FlintRating`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintRating } from '@getufy/flint-ui';
```

### Usage

```html
<flint-rating></flint-rating>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `number` | `0` | Current rating value. |
| `max` | `max` | `number` | `5` | Maximum number of stars. |
| `readonly` | `readonly` | `boolean` | `false` | Whether the rating is read-only. |
| `disabled` | `disabled` | `boolean` | `false` | Whether the rating is disabled. |
| `clearable` | `clearable` | `boolean` | `false` | Whether clicking the current value clears the rating. |
| `defaultValue` | `defaultValue` | `number` | `0` | Initial rating value for uncontrolled mode. |
| `size` | `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the rating stars. |
| `name` | `name` | `string` | `''` | Form field name for the hidden input. |
| `label` | `label` | `string` | `'Rating'` | Accessible label for the rating group. |
| `precision` | `precision` | `1 \| 0.5` | `1` | Rating step precision (1 for full stars, 0.5 for half stars). |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-rating-change` | — | Fired when the rating value changes. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-rating-size` | — |
| `--flint-rating-color` | — |
| `--flint-rating-empty-color` | — |
| `--flint-font-family` | — |

---
