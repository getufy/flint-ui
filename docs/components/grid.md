# Grid

<Demo label="Responsive Grid" html="<ui-grid container spacing=&quot;2&quot; style=&quot;width:100%&quot;>  <ui-grid xs=&quot;12&quot; md=&quot;6&quot;><ui-paper elevation=&quot;1&quot; style=&quot;padding:16px;text-align:center&quot;>xs=12 md=6</ui-paper></ui-grid>  <ui-grid xs=&quot;12&quot; md=&quot;6&quot;><ui-paper elevation=&quot;1&quot; style=&quot;padding:16px;text-align:center&quot;>xs=12 md=6</ui-paper></ui-grid>  <ui-grid xs=&quot;6&quot; md=&quot;3&quot;><ui-paper elevation=&quot;1&quot; style=&quot;padding:16px;text-align:center&quot;>xs=6 md=3</ui-paper></ui-grid>  <ui-grid xs=&quot;6&quot; md=&quot;3&quot;><ui-paper elevation=&quot;1&quot; style=&quot;padding:16px;text-align:center&quot;>xs=6 md=3</ui-paper></ui-grid>  <ui-grid xs=&quot;6&quot; md=&quot;3&quot;><ui-paper elevation=&quot;1&quot; style=&quot;padding:16px;text-align:center&quot;>xs=6 md=3</ui-paper></ui-grid>  <ui-grid xs=&quot;6&quot; md=&quot;3&quot;><ui-paper elevation=&quot;1&quot; style=&quot;padding:16px;text-align:center&quot;>xs=6 md=3</ui-paper></ui-grid></ui-grid>" />

- **Tag**: `<ui-grid>`
- **Class**: `UiGrid`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiGrid } from 'storybook-lit';
```

### Usage

```html
<ui-grid></ui-grid>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `container` | `container` | `boolean` | `false` |  |
| `direction` | `direction` | `'row' \| 'row-reverse' \| 'column' \| 'column-reverse'` | `'row'` |  |
| `wrap` | `wrap` | `'nowrap' \| 'wrap' \| 'wrap-reverse'` | `'wrap'` |  |
| `columns` | `columns` | `number` | `12` | Total number of columns. Default is 12. |
| `spacing` | `spacing` | `ResponsiveValue<number \| string>` | `0` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---
