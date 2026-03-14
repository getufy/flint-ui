# Table

<Demo html="<div style=&quot;width:100%;max-width:500px&quot;><flint-table-container>  <flint-table>    <flint-table-head>      <flint-table-row>        <flint-table-cell header>Name</flint-table-cell>        <flint-table-cell header>Role</flint-table-cell>        <flint-table-cell header align=&quot;right&quot;>Score</flint-table-cell>      </flint-table-row>    </flint-table-head>    <flint-table-body>      <flint-table-row>        <flint-table-cell>Alice</flint-table-cell>        <flint-table-cell>Engineer</flint-table-cell>        <flint-table-cell align=&quot;right&quot;>92</flint-table-cell>      </flint-table-row>      <flint-table-row selected>        <flint-table-cell>Bob</flint-table-cell>        <flint-table-cell>Designer</flint-table-cell>        <flint-table-cell align=&quot;right&quot;>87</flint-table-cell>      </flint-table-row>      <flint-table-row>        <flint-table-cell>Carol</flint-table-cell>        <flint-table-cell>Manager</flint-table-cell>        <flint-table-cell align=&quot;right&quot;>95</flint-table-cell>      </flint-table-row>      <flint-table-row>        <flint-table-cell>Dave</flint-table-cell>        <flint-table-cell>Analyst</flint-table-cell>        <flint-table-cell align=&quot;right&quot;>78</flint-table-cell>      </flint-table-row>    </flint-table-body>  </flint-table></flint-table-container></div>" />

## `<flint-table-pagination>`

- **Tag**: `<flint-table-pagination>`
- **Class**: `FlintTablePagination`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintTablePagination } from 'flint-ui';
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
| `rowsPerPage` | `rows-per-page` | `number` | `10` | Controlled rows per page. |
| `rowsPerPageOptions` | `rows-per-page-options` | `number[]` | `[5, 10, 25]` | Available rows-per-page options. |
| `defaultPage` | `default-page` | `number` | `0` | Uncontrolled default page (applied on first render). |
| `defaultRowsPerPage` | `default-rows-per-page` | `number` | `-1` | Uncontrolled default rows per page. |
| `showFirstLast` | `show-first-last` | `boolean` | `false` | Show First/Last page buttons. |
| `labelRowsPerPage` | `label-rows-per-page` | `string` | `'Rows per page:'` | Label for the rows-per-page selector. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `page-change` | `{ page: next }` |  |
| `rows-per-page-change` | `{ rowsPerPage: val }` |  |

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
import 'flint-ui'; // auto-registers all
// or
import { FlintTableSortLabel } from 'flint-ui';
```

### Usage

```html
<flint-table-sort-label></flint-table-sort-label>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `active` | `active` | `boolean` | `false` |  |
| `direction` | `direction` | `'asc' \| 'desc'` | `'asc'` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---

## `<flint-table-container>`

flint-table-container

- **Tag**: `<flint-table-container>`
- **Class**: `FlintTableContainer`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintTableContainer } from 'flint-ui';
```

### Usage

```html
<flint-table-container></flint-table-container>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `shadow` | `shadow` | `boolean` | `false` |  |
| `stickyHeader` | `sticky-header` | `boolean` | `false` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-table-container-bg` | `var(--flint-surface-background, white` |

---

## `<flint-table>`

flint-table

- **Tag**: `<flint-table>`
- **Class**: `FlintTable`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintTable } from 'flint-ui';
```

### Usage

```html
<flint-table></flint-table>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `size` | `size` | `'medium' \| 'small'` | `'medium'` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

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

flint-table-head

- **Tag**: `<flint-table-head>`
- **Class**: `FlintTableHead`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintTableHead } from 'flint-ui';
```

### Usage

```html
<flint-table-head></flint-table-head>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-table-header-bg` | `transparent` |
| `--flint-table-header-color` | `var(--flint-text-color-muted` |

---

## `<flint-table-body>`

flint-table-body

- **Tag**: `<flint-table-body>`
- **Class**: `FlintTableBody`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintTableBody } from 'flint-ui';
```

### Usage

```html
<flint-table-body></flint-table-body>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `striped` | `striped` | `boolean` | `false` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---

## `<flint-table-row>`

flint-table-row

- **Tag**: `<flint-table-row>`
- **Class**: `FlintTableRow`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintTableRow } from 'flint-ui';
```

### Usage

```html
<flint-table-row></flint-table-row>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `selected` | `selected` | `boolean` | `false` |  |
| `hover` | `hover` | `boolean` | `false` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-table-row-hover-bg` | `var(--flint-hover-color, rgba(0, 0, 0, 0.04` |
| `--flint-table-row-selected-bg` | `var(--flint-primary-color-light, rgba(59, 130, 246, 0.08` |

---

## `<flint-table-cell>`

flint-table-cell

- **Tag**: `<flint-table-cell>`
- **Class**: `FlintTableCell`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintTableCell } from 'flint-ui';
```

### Usage

```html
<flint-table-cell></flint-table-cell>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `header` | `header` | `boolean` | `false` |  |
| `align` | `align` | `'left' \| 'right' \| 'center'` | `'left'` |  |
| `padding` | `padding` | `'normal' \| 'checkbox' \| 'none'` | `'normal'` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-table-cell-padding-y` | `16px` |
| `--flint-table-cell-padding-x` | `16px` |
| `--flint-table-cell-padding-y-dense` | `6px` |
| `--flint-table-cell-padding-x-dense` | `16px` |

---

## `<flint-table-footer>`

flint-table-footer

- **Tag**: `<flint-table-footer>`
- **Class**: `FlintTableFooter`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintTableFooter } from 'flint-ui';
```

### Usage

```html
<flint-table-footer></flint-table-footer>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---
