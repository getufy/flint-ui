# Table

<Demo html='<div style="width:100%;max-width:500px"><flint-table-container>  <flint-table>    <flint-table-head>      <flint-table-row>        <flint-table-cell header>Name</flint-table-cell>        <flint-table-cell header>Role</flint-table-cell>        <flint-table-cell header align="right">Score</flint-table-cell>      </flint-table-row>    </flint-table-head>    <flint-table-body>      <flint-table-row>        <flint-table-cell>Alice</flint-table-cell>        <flint-table-cell>Engineer</flint-table-cell>        <flint-table-cell align="right">92</flint-table-cell>      </flint-table-row>      <flint-table-row selected>        <flint-table-cell>Bob</flint-table-cell>        <flint-table-cell>Designer</flint-table-cell>        <flint-table-cell align="right">87</flint-table-cell>      </flint-table-row>      <flint-table-row>        <flint-table-cell>Carol</flint-table-cell>        <flint-table-cell>Manager</flint-table-cell>        <flint-table-cell align="right">95</flint-table-cell>      </flint-table-row>      <flint-table-row>        <flint-table-cell>Dave</flint-table-cell>        <flint-table-cell>Analyst</flint-table-cell>        <flint-table-cell align="right">78</flint-table-cell>      </flint-table-row>    </flint-table-body>  </flint-table></flint-table-container></div>' />

## `<flint-table-pagination>`

Table Pagination: pagination controls for tabular data.

- **Tag**: `<flint-table-pagination>`
- **Class**: `FlintTablePagination`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintTablePagination } from '@getufy/flint-ui';
```

### Usage

```html
<flint-table-pagination></flint-table-pagination>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `count` | `count` | `number` | `0` | Total number of rows. |
| `page` | `page` | `number` | `0` | Controlled current page (0-indexed). |
| `rowsPerPage` | `rowsPerPage` | `number` | `10` | Controlled rows per page. |
| `rowsPerPageOptions` | `rowsPerPageOptions` | `number[]` | `[5, 10, 25]` | Available rows-per-page options. |
| `defaultPage` | `default-page` | `number` | `0` | Uncontrolled default page (applied on first render). |
| `defaultRowsPerPage` | `default-rows-per-page` | `number` | `-1` | Uncontrolled default rows per page. |
| `showFirstLast` | `show-first-last` | `boolean` | `false` | Show First/Last page buttons. |
| `labelRowsPerPage` | `label-rows-per-page` | `string` | `'Rows per page:'` | Label for the rows-per-page selector. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-pagination-page-change` | `&#123; page: number &#125;` | Fired when the current page changes. detail: `&#123; page: number &#125;` |
| `flint-pagination-rows-per-page-change` | `&#123; rowsPerPage: number &#125;` | Fired when rows per page changes. detail: `&#123; rowsPerPage: number &#125;` |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-font-family` | — |
| `--flint-text-color-muted` | — |
| `--flint-border-color` | — |
| `--flint-text-color` | — |
| `--flint-hover-color` | — |

---

## `<flint-table-sort-label>`

- **Tag**: `<flint-table-sort-label>`
- **Class**: `FlintTableSortLabel`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintTableSortLabel } from '@getufy/flint-ui';
```

### Usage

```html
<flint-table-sort-label></flint-table-sort-label>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `active` | `active` | `boolean` | `false` | Whether this column is currently sorted. |
| `direction` | `direction` | `'asc' \| 'desc'` | `'asc'` | Sort direction when active. |

---

## `<flint-table-container>`

Scrollable container that wraps a `<flint-table>` to provide overflow handling,
optional elevation shadow, and sticky header support.

- **Tag**: `<flint-table-container>`
- **Class**: `FlintTableContainer`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintTableContainer } from '@getufy/flint-ui';
```

### Usage

```html
<flint-table-container></flint-table-container>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `shadow` | `shadow` | `boolean` | `false` | Applies a stronger box-shadow elevation. |
| `stickyHeader` | `sticky-header` | `boolean` | `false` | Sticks the table header to the top on scroll. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot accepts a `&lt;flint-table&gt;` element. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-table-container-bg` | `var(--flint-surface-background, white` |

---

## `<flint-table>`

The main table element. Use inside a `<flint-table-container>` for scrolling
and sticky header support, or standalone for simple layouts.

- **Tag**: `<flint-table>`
- **Class**: `FlintTable`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintTable } from '@getufy/flint-ui';
```

### Usage

```html
<flint-table></flint-table>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `size` | `size` | `'md'\|'sm'` | `'md'` | Cell padding density. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Accepts `&lt;flint-table-head&gt;`, `&lt;flint-table-body&gt;`, and `&lt;flint-table-footer&gt;`. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-table-striped-bg` | `var(--flint-surface-2` |
| `--flint-table-cell-padding-y` | `16px` |
| `--flint-table-cell-padding-x` | `16px` |
| `--flint-table-border-color` | `var(--flint-border-color` |
| `--flint-table-header-bg` | `transparent` |
| `--flint-table-header-color` | `var(--flint-text-color-muted` |
| `--flint-table-container-bg` | `var(--flint-surface-background, white` |
| `--flint-table-border-radius` | `var(--flint-border-radius-lg, 8px` |
| `--flint-table-shadow` | `var(--flint-shadow-sm` |
| `--flint-table-shadow-elevated` | `var(--flint-shadow-md` |
| `--flint-table-row-hover-bg` | `var(--flint-hover-color, rgba(0, 0, 0, 0.04` |
| `--flint-table-row-selected-bg` | `var(--flint-primary-color-light, rgba(59, 130, 246, 0.08` |
| `--flint-table-cell-padding-y-dense` | `6px` |
| `--flint-table-cell-padding-x-dense` | `16px` |

---

## `<flint-table-head>`

Groups header rows at the top of a `<flint-table>`. Rendered with a subtle
bottom border and bold text styling by default.

- **Tag**: `<flint-table-head>`
- **Class**: `FlintTableHead`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintTableHead } from '@getufy/flint-ui';
```

### Usage

```html
<flint-table-head></flint-table-head>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Accepts one or more `&lt;flint-table-row&gt;` elements containing header cells. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-table-header-bg` | `transparent` |
| `--flint-table-header-color` | `var(--flint-text-color-muted` |

---

## `<flint-table-body>`

Groups body rows in a `<flint-table>`. Supports alternating row shading
via the `striped` attribute.

- **Tag**: `<flint-table-body>`
- **Class**: `FlintTableBody`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintTableBody } from '@getufy/flint-ui';
```

### Usage

```html
<flint-table-body></flint-table-body>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `striped` | `striped` | `boolean` | `false` | Enables alternating row background shading. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Accepts one or more `&lt;flint-table-row&gt;` elements. |

---

## `<flint-table-row>`

A single row within a `<flint-table-head>`, `<flint-table-body>`,
or `<flint-table-footer>`. Supports selected and hover highlight states.

- **Tag**: `<flint-table-row>`
- **Class**: `FlintTableRow`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintTableRow } from '@getufy/flint-ui';
```

### Usage

```html
<flint-table-row></flint-table-row>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `selected` | `selected` | `boolean` | `false` | Highlights the row as selected. |
| `hover` | `hover` | `boolean` | `false` | Forces the hover highlight state. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Accepts one or more `&lt;flint-table-cell&gt;` elements. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-table-row-hover-bg` | `var(--flint-hover-color, rgba(0, 0, 0, 0.04` |
| `--flint-table-row-selected-bg` | `var(--flint-primary-color-light, rgba(59, 130, 246, 0.08` |

---

## `<flint-table-cell>`

A single cell within a `<flint-table-row>`. Can render as a data cell
or a header cell via the `header` attribute. Supports text alignment
and padding presets.

- **Tag**: `<flint-table-cell>`
- **Class**: `FlintTableCell`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintTableCell } from '@getufy/flint-ui';
```

### Usage

```html
<flint-table-cell></flint-table-cell>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `header` | `header` | `boolean` | `false` | Renders the cell with header (th) styling. |
| `align` | `align` | `'left'\|'right'\|'center'` | `'left'` | Text alignment within the cell. |
| `padding` | `padding` | `'normal'\|'checkbox'\|'none'` | `'normal'` | Padding preset for the cell. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Cell content (text, icons, controls, etc.). |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-table-cell-padding-y` | `16px` |
| `--flint-table-cell-padding-x` | `16px` |
| `--flint-table-cell-padding-y-dense` | `6px` |
| `--flint-table-cell-padding-x-dense` | `16px` |

---

## `<flint-table-footer>`

Footer section of a `<flint-table>`, typically used for summary rows,
pagination controls, or aggregate data.

- **Tag**: `<flint-table-footer>`
- **Class**: `FlintTableFooter`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintTableFooter } from '@getufy/flint-ui';
```

### Usage

```html
<flint-table-footer></flint-table-footer>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Accepts one or more `&lt;flint-table-row&gt;` elements or arbitrary footer content. |

---
