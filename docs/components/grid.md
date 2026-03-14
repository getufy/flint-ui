# Grid

<Demo label="Responsive Grid" html="<flint-grid container spacing=&quot;2&quot; style=&quot;width:100%&quot;>  <flint-grid xs=&quot;12&quot; md=&quot;6&quot;><flint-paper elevation=&quot;1&quot; style=&quot;padding:16px;text-align:center&quot;>xs=12 md=6</flint-paper></flint-grid>  <flint-grid xs=&quot;12&quot; md=&quot;6&quot;><flint-paper elevation=&quot;1&quot; style=&quot;padding:16px;text-align:center&quot;>xs=12 md=6</flint-paper></flint-grid>  <flint-grid xs=&quot;6&quot; md=&quot;3&quot;><flint-paper elevation=&quot;1&quot; style=&quot;padding:16px;text-align:center&quot;>xs=6 md=3</flint-paper></flint-grid>  <flint-grid xs=&quot;6&quot; md=&quot;3&quot;><flint-paper elevation=&quot;1&quot; style=&quot;padding:16px;text-align:center&quot;>xs=6 md=3</flint-paper></flint-grid>  <flint-grid xs=&quot;6&quot; md=&quot;3&quot;><flint-paper elevation=&quot;1&quot; style=&quot;padding:16px;text-align:center&quot;>xs=6 md=3</flint-paper></flint-grid>  <flint-grid xs=&quot;6&quot; md=&quot;3&quot;><flint-paper elevation=&quot;1&quot; style=&quot;padding:16px;text-align:center&quot;>xs=6 md=3</flint-paper></flint-grid></flint-grid>" />

- **Tag**: `<flint-grid>`
- **Class**: `FlintGrid`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintGrid } from 'flint-ui';
```

### Usage

```html
<flint-grid></flint-grid>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `container` | `container` | `boolean` | `false` | Makes this element a flex grid container. |
| `direction` | `direction` | `'row' \| 'row-reverse' \| 'column' \| 'column-reverse'` | `'row'` | Flex direction of the container's children. |
| `wrap` | `wrap` | `'nowrap' \| 'wrap' \| 'wrap-reverse'` | `'wrap'` | Controls whether items wrap to new lines. |
| `columns` | `columns` | `number` | `12` | Total number of columns. Default is 12. |
| `spacing` | `spacing` | `ResponsiveValue<number \| string>` | `0` | Gap between items (1 unit = 8px); accepts a number or responsive object. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---
