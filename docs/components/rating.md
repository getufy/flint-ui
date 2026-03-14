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
| `value` | `value` | `number` | `0` |  |
| `max` | `max` | `number` | `5` |  |
| `readonly` | `readonly` | `boolean` | `false` |  |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `clearable` | `clearable` | `boolean` | `false` |  |
| `defaultValue` | `default-value` | `number` | `0` |  |
| `size` | `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |  |
| `name` | `name` | `string` | `''` |  |
| `label` | `label` | `string` | `'Rating'` |  |
| `precision` | `precision` | `1 \| 0.5` | `1` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-rating-change` | `{ value: this.value }` |  |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-rating-size` | — |
| `--flint-rating-color` | — |
| `--flint-rating-empty-color` | — |
| `--flint-font-family` | — |

---
