# Grid

<Demo label="Responsive Grid" html='<flint-grid container spacing="2" style="width:100%">  <flint-grid xs="12" md="6"><flint-paper elevation="1" style="padding:16px;text-align:center">xs=12 md=6</flint-paper></flint-grid>  <flint-grid xs="12" md="6"><flint-paper elevation="1" style="padding:16px;text-align:center">xs=12 md=6</flint-paper></flint-grid>  <flint-grid xs="6" md="3"><flint-paper elevation="1" style="padding:16px;text-align:center">xs=6 md=3</flint-paper></flint-grid>  <flint-grid xs="6" md="3"><flint-paper elevation="1" style="padding:16px;text-align:center">xs=6 md=3</flint-paper></flint-grid>  <flint-grid xs="6" md="3"><flint-paper elevation="1" style="padding:16px;text-align:center">xs=6 md=3</flint-paper></flint-grid>  <flint-grid xs="6" md="3"><flint-paper elevation="1" style="padding:16px;text-align:center">xs=6 md=3</flint-paper></flint-grid></flint-grid>' />

- **Tag**: `<flint-grid>`
- **Class**: `FlintGrid`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintGrid } from '@getufy/flint-ui';
```

### Usage

```html
<flint-grid></flint-grid>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `container` | `container` | `boolean` | `false` | Whether this element acts as a grid container. |
| `direction` | `direction` | `'row' \| 'row-reverse' \| 'column' \| 'column-reverse'` | `'row'` | Flex direction of the grid container. |
| `wrap` | `wrap` | `'nowrap' \| 'wrap' \| 'wrap-reverse'` | `'wrap'` | Flex wrap behavior of the grid container. |
| `alignItems` | `align-items` | `'flex-start' \| 'center' \| 'flex-end' \| 'stretch' \| 'baseline' \| undefined` | — | Cross-axis alignment of grid items. |
| `justifyContent` | `justify-content` | `'flex-start' \| 'center' \| 'flex-end' \| 'space-between' \| 'space-around' \| 'space-evenly' \| undefined` | — | Main-axis alignment of grid items. |
| `columns` | `columns` | `number` | `12` | Total number of columns. Default is 12. |
| `spacing` | `spacing` | `ResponsiveValue&lt;number \| string&gt;` | `0` | Spacing between items. 1 unit = 8px. |
| `rowSpacing` | `rowSpacing` | `ResponsiveValue&lt;number \| string&gt; \| undefined` | — | Row spacing override; takes precedence over `spacing` for the row axis. |
| `columnSpacing` | `columnSpacing` | `ResponsiveValue&lt;number \| string&gt; \| undefined` | — | Column spacing override; takes precedence over `spacing` for the column axis. |
| `xs` | `xs` | `GridSize \| undefined` | — | Number of columns to span at the xs breakpoint. |
| `sm` | `sm` | `GridSize \| undefined` | — | Number of columns to span at the sm breakpoint. |
| `md` | `md` | `GridSize \| undefined` | — | Number of columns to span at the md breakpoint. |
| `lg` | `lg` | `GridSize \| undefined` | — | Number of columns to span at the lg breakpoint. |
| `xl` | `xl` | `GridSize \| undefined` | — | Number of columns to span at the xl breakpoint. |
| `offset` | `offset` | `Partial&lt;Record&lt;Breakpoint, number \| 'auto'&gt;&gt; \| undefined` | — | Offset per breakpoint, expressed in column units or 'auto'. |
| `order` | `order` | `ResponsiveValue&lt;number&gt; \| undefined` | — | Flex order. Supports responsive values so items can be reordered at |

---
