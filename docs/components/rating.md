# Rating

<Demo>

<ui-rating value="3"></ui-rating>
<ui-rating value="4" readonly></ui-rating>

</Demo>

- **Tag**: `<ui-rating>`
- **Class**: `UiRating`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiRating } from 'storybook-lit';
```

### Usage

```html
<ui-rating></ui-rating>
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
| `ui-rating-change` | `{ value: this.value }` |  |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-rating-size` | — |
| `--ui-rating-color` | — |
| `--ui-rating-empty-color` | — |
| `--ui-font-family` | — |

---
