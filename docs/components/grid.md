# Grid

<Demo label="Responsive Grid">

<ui-grid container spacing="2" style="width:100%">
  <ui-grid xs="12" md="6"><ui-paper elevation="1" style="padding:16px;text-align:center">xs=12 md=6</ui-paper></ui-grid>
  <ui-grid xs="12" md="6"><ui-paper elevation="1" style="padding:16px;text-align:center">xs=12 md=6</ui-paper></ui-grid>
  <ui-grid xs="6" md="3"><ui-paper elevation="1" style="padding:16px;text-align:center">xs=6 md=3</ui-paper></ui-grid>
  <ui-grid xs="6" md="3"><ui-paper elevation="1" style="padding:16px;text-align:center">xs=6 md=3</ui-paper></ui-grid>
  <ui-grid xs="6" md="3"><ui-paper elevation="1" style="padding:16px;text-align:center">xs=6 md=3</ui-paper></ui-grid>
  <ui-grid xs="6" md="3"><ui-paper elevation="1" style="padding:16px;text-align:center">xs=6 md=3</ui-paper></ui-grid>
</ui-grid>

</Demo>

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
