# Table

<Demo html="<div style=&quot;width:100%;max-width:500px&quot;><ui-table-container>  <ui-table>    <ui-table-head>      <ui-table-row>        <ui-table-cell header>Name</ui-table-cell>        <ui-table-cell header>Role</ui-table-cell>        <ui-table-cell header align=&quot;right&quot;>Score</ui-table-cell>      </ui-table-row>    </ui-table-head>    <ui-table-body>      <ui-table-row>        <ui-table-cell>Alice</ui-table-cell>        <ui-table-cell>Engineer</ui-table-cell>        <ui-table-cell align=&quot;right&quot;>92</ui-table-cell>      </ui-table-row>      <ui-table-row selected>        <ui-table-cell>Bob</ui-table-cell>        <ui-table-cell>Designer</ui-table-cell>        <ui-table-cell align=&quot;right&quot;>87</ui-table-cell>      </ui-table-row>      <ui-table-row>        <ui-table-cell>Carol</ui-table-cell>        <ui-table-cell>Manager</ui-table-cell>        <ui-table-cell align=&quot;right&quot;>95</ui-table-cell>      </ui-table-row>      <ui-table-row>        <ui-table-cell>Dave</ui-table-cell>        <ui-table-cell>Analyst</ui-table-cell>        <ui-table-cell align=&quot;right&quot;>78</ui-table-cell>      </ui-table-row>    </ui-table-body>  </ui-table></ui-table-container></div>" />

## `<ui-table-pagination>`

- **Tag**: `<ui-table-pagination>`
- **Class**: `UiTablePagination`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiTablePagination } from 'storybook-lit';
```

### Usage

```html
<ui-table-pagination></ui-table-pagination>
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
| `--ui-font-family` | — |
| `--ui-text-color-muted` | — |
| `--ui-border-color` | — |
| `--ui-text-color` | — |
| `--ui-hover-color` | — |

---

## `<ui-table-sort-label>`

- **Tag**: `<ui-table-sort-label>`
- **Class**: `UiTableSortLabel`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiTableSortLabel } from 'storybook-lit';
```

### Usage

```html
<ui-table-sort-label></ui-table-sort-label>
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

## `<ui-table-container>`

ui-table-container

- **Tag**: `<ui-table-container>`
- **Class**: `UiTableContainer`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiTableContainer } from 'storybook-lit';
```

### Usage

```html
<ui-table-container></ui-table-container>
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
| `--ui-table-container-bg` | `var(--ui-surface-background, white` |

---

## `<ui-table>`

ui-table

- **Tag**: `<ui-table>`
- **Class**: `UiTable`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiTable } from 'storybook-lit';
```

### Usage

```html
<ui-table></ui-table>
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
| `--ui-table-striped-bg` | `var(--ui-surface-2` |
| `--ui-table-cell-padding-y` | `16px` |
| `--ui-table-cell-padding-x` | `16px` |
| `--ui-table-border-color` | `var(--ui-border-color` |
| `--ui-table-header-bg` | `transparent` |
| `--ui-table-header-color` | `var(--ui-text-color-muted` |
| `--ui-table-container-bg` | `var(--ui-surface-background, white` |
| `--ui-table-border-radius` | `var(--ui-border-radius-lg, 8px` |
| `--ui-table-shadow` | `var(--ui-shadow-sm` |
| `--ui-table-shadow-elevated` | `var(--ui-shadow-md` |
| `--ui-table-row-hover-bg` | `var(--ui-hover-color, rgba(0, 0, 0, 0.04` |
| `--ui-table-row-selected-bg` | `var(--ui-primary-color-light, rgba(59, 130, 246, 0.08` |
| `--ui-table-cell-padding-y-dense` | `6px` |
| `--ui-table-cell-padding-x-dense` | `16px` |

---

## `<ui-table-head>`

ui-table-head

- **Tag**: `<ui-table-head>`
- **Class**: `UiTableHead`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiTableHead } from 'storybook-lit';
```

### Usage

```html
<ui-table-head></ui-table-head>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-table-header-bg` | `transparent` |
| `--ui-table-header-color` | `var(--ui-text-color-muted` |

---

## `<ui-table-body>`

ui-table-body

- **Tag**: `<ui-table-body>`
- **Class**: `UiTableBody`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiTableBody } from 'storybook-lit';
```

### Usage

```html
<ui-table-body></ui-table-body>
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

## `<ui-table-row>`

ui-table-row

- **Tag**: `<ui-table-row>`
- **Class**: `UiTableRow`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiTableRow } from 'storybook-lit';
```

### Usage

```html
<ui-table-row></ui-table-row>
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
| `--ui-table-row-hover-bg` | `var(--ui-hover-color, rgba(0, 0, 0, 0.04` |
| `--ui-table-row-selected-bg` | `var(--ui-primary-color-light, rgba(59, 130, 246, 0.08` |

---

## `<ui-table-cell>`

ui-table-cell

- **Tag**: `<ui-table-cell>`
- **Class**: `UiTableCell`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiTableCell } from 'storybook-lit';
```

### Usage

```html
<ui-table-cell></ui-table-cell>
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
| `--ui-table-cell-padding-y` | `16px` |
| `--ui-table-cell-padding-x` | `16px` |
| `--ui-table-cell-padding-y-dense` | `6px` |
| `--ui-table-cell-padding-x-dense` | `16px` |

---

## `<ui-table-footer>`

ui-table-footer

- **Tag**: `<ui-table-footer>`
- **Class**: `UiTableFooter`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiTableFooter } from 'storybook-lit';
```

### Usage

```html
<ui-table-footer></ui-table-footer>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---
