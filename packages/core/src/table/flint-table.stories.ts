import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-table.js';
import './flint-table-sort-label.js';
import './flint-table-pagination.js';

import { FlintTableRow } from './flint-table';
import { FlintTableSortLabel } from './flint-table-sort-label';

/* ------------------------------------------------------------------ */
/*  Shared test data                                                     */
/* ------------------------------------------------------------------ */

const desserts = [
    { id: 1, name: 'Frozen yoghurt',      calories: 159, fat: 6.0,  carbs: 24, protein: 4.0 },
    { id: 2, name: 'Ice cream sandwich',  calories: 237, fat: 9.0,  carbs: 37, protein: 4.3 },
    { id: 3, name: 'Eclair',              calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
    { id: 4, name: 'Cupcake',             calories: 305, fat: 3.7,  carbs: 67, protein: 4.3 },
    { id: 5, name: 'Gingerbread',         calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
];

const products = [
    { name: 'iPhone 15 Pro',   category: 'Electronics', stock: 42,  price: '$999.00'    },
    { name: 'MacBook Air M2',  category: 'Electronics', stock: 12,  price: '$1,199.00'  },
    { name: 'AirPods Pro',     category: 'Electronics', stock: 87,  price: '$249.00'    },
    { name: 'iPad mini',       category: 'Tablets',     stock: 5,   price: '$499.00'    },
    { name: 'Apple Watch S9',  category: 'Wearables',   stock: 31,  price: '$399.00'    },
    { name: 'Magic Keyboard',  category: 'Accessories', stock: 0,   price: '$99.00'     },
];

/* ------------------------------------------------------------------ */
/*  Meta                                                                 */
/* ------------------------------------------------------------------ */

const meta: Meta = {
    title: 'Data Display/Table',
    component: 'flint-table',
    parameters: {
        a11y: {
            config: {
                rules: [
                    { id: 'label', enabled: false },
                    { id: 'aria-required-children', enabled: false },
                    { id: 'scrollable-region-focusable', enabled: false },
                ],
            },
        },
        docs: {
            description: {
                component: `
#### \`<flint-table-pagination>\`

Table Pagination: pagination controls for tabular data.

- **Tag**: \`<flint-table-pagination>\`
- **Class**: \`FlintTablePagination\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`count\` | \`count\` | \`number\` | \`0\` | Total number of rows. |
| \`page\` | \`page\` | \`number\` | \`0\` | Controlled current page (0-indexed). |
| \`rowsPerPage\` | \`rowsPerPage\` | \`number\` | \`10\` | Controlled rows per page. |
| \`rowsPerPageOptions\` | \`rowsPerPageOptions\` | \`number[]\` | \`[5, 10, 25]\` | Available rows-per-page options. |
| \`defaultPage\` | \`default-page\` | \`number\` | \`0\` | Uncontrolled default page (applied on first render). |
| \`defaultRowsPerPage\` | \`default-rows-per-page\` | \`number\` | \`-1\` | Uncontrolled default rows per page. |
| \`showFirstLast\` | \`show-first-last\` | \`boolean\` | \`false\` | Show First/Last page buttons. |
| \`labelRowsPerPage\` | \`label-rows-per-page\` | \`string \\| undefined\` | — | Label for the rows-per-page selector. Defaults to localized "Rows per page:". |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-pagination-page-change\` | \`&#123; page: number &#125;\` | Fired when the current page changes. detail: \`&#123; page: number &#125;\` |
| \`flint-pagination-rows-per-page-change\` | \`&#123; rowsPerPage: number &#125;\` | Fired when rows per page changes. detail: \`&#123; rowsPerPage: number &#125;\` |

#### CSS Parts

| Name | Description |
|---|---|
| \`base\` | The component's base wrapper element. |
| \`select\` | The select element. |
| \`spacer\` | The spacer element. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-font-family\` | — |
| \`--flint-text-color-muted\` | — |
| \`--flint-border-color\` | — |
| \`--flint-text-color\` | — |
| \`--flint-hover-color\` | — |

---

#### \`<flint-table-sort-label>\`

- **Tag**: \`<flint-table-sort-label>\`
- **Class**: \`FlintTableSortLabel\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`active\` | \`active\` | \`boolean\` | \`false\` | Whether this column is currently sorted. |
| \`direction\` | \`direction\` | \`'asc' \\| 'desc'\` | \`'asc'\` | Sort direction when active. |

#### CSS Parts

| Name | Description |
|---|---|
| \`icon\` | The icon container. |

---

#### \`<flint-table-container>\`

Scrollable container that wraps a \`<flint-table>\` to provide overflow handling,
optional elevation shadow, and sticky header support.

- **Tag**: \`<flint-table-container>\`
- **Class**: \`FlintTableContainer\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`shadow\` | \`shadow\` | \`boolean\` | \`false\` | Applies a stronger box-shadow elevation. |
| \`stickyHeader\` | \`sticky-header\` | \`boolean\` | \`false\` | Sticks the table header to the top on scroll. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot accepts a \`&lt;flint-table&gt;\` element. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-table-container-bg\` | \`var(--flint-surface-background\` |

---

#### \`<flint-table>\`

The main table element. Use inside a \`<flint-table-container>\` for scrolling
and sticky header support, or standalone for simple layouts.

- **Tag**: \`<flint-table>\`
- **Class**: \`FlintTable\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`size\` | \`size\` | \`'md'\\|'sm'\` | \`'md'\` | Cell padding density. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Accepts \`&lt;flint-table-head&gt;\`, \`&lt;flint-table-body&gt;\`, and \`&lt;flint-table-footer&gt;\`. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-table-striped-bg\` | \`var(--flint-surface-2\` |
| \`--flint-table-cell-padding-y\` | \`16px\` |
| \`--flint-table-cell-padding-x\` | \`16px\` |
| \`--flint-table-border-color\` | \`var(--flint-border-color\` |
| \`--flint-table-header-bg\` | \`transparent\` |
| \`--flint-table-header-color\` | \`var(--flint-text-color-muted\` |
| \`--flint-table-container-bg\` | \`var(--flint-surface-background\` |
| \`--flint-table-border-radius\` | \`var(--flint-border-radius-lg\` |
| \`--flint-table-shadow\` | \`var(--flint-shadow-sm\` |
| \`--flint-table-shadow-elevated\` | \`var(--flint-shadow-md\` |
| \`--flint-table-row-hover-bg\` | \`var(--flint-hover-color, rgba(0, 0, 0, 0.04\` |
| \`--flint-table-row-selected-bg\` | \`var(--flint-primary-color-light, rgba(59, 130, 246, 0.08\` |
| \`--flint-table-cell-padding-y-dense\` | \`6px\` |
| \`--flint-table-cell-padding-x-dense\` | \`16px\` |

---

#### \`<flint-table-head>\`

Groups header rows at the top of a \`<flint-table>\`. Rendered with a subtle
bottom border and bold text styling by default.

- **Tag**: \`<flint-table-head>\`
- **Class**: \`FlintTableHead\`

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Accepts one or more \`&lt;flint-table-row&gt;\` elements containing header cells. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-table-header-bg\` | \`transparent\` |
| \`--flint-table-header-color\` | \`var(--flint-text-color-muted\` |

---

#### \`<flint-table-body>\`

Groups body rows in a \`<flint-table>\`. Supports alternating row shading
via the \`striped\` attribute.

- **Tag**: \`<flint-table-body>\`
- **Class**: \`FlintTableBody\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`striped\` | \`striped\` | \`boolean\` | \`false\` | Enables alternating row background shading. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Accepts one or more \`&lt;flint-table-row&gt;\` elements. |

---

#### \`<flint-table-row>\`

A single row within a \`<flint-table-head>\`, \`<flint-table-body>\`,
or \`<flint-table-footer>\`. Supports selected and hover highlight states.

- **Tag**: \`<flint-table-row>\`
- **Class**: \`FlintTableRow\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`selected\` | \`selected\` | \`boolean\` | \`false\` | Highlights the row as selected. |
| \`hover\` | \`hover\` | \`boolean\` | \`false\` | Forces the hover highlight state. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Accepts one or more \`&lt;flint-table-cell&gt;\` elements. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-table-row-hover-bg\` | \`var(--flint-hover-color, rgba(0, 0, 0, 0.04\` |
| \`--flint-table-row-selected-bg\` | \`var(--flint-primary-color-light, rgba(59, 130, 246, 0.08\` |

---

#### \`<flint-table-cell>\`

A single cell within a \`<flint-table-row>\`. Can render as a data cell
or a header cell via the \`header\` attribute. Supports text alignment
and padding presets.

- **Tag**: \`<flint-table-cell>\`
- **Class**: \`FlintTableCell\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`header\` | \`header\` | \`boolean\` | \`false\` | Renders the cell with header (th) styling. |
| \`align\` | \`align\` | \`'left'\\|'right'\\|'center'\` | \`'left'\` | Text alignment within the cell. |
| \`padding\` | \`padding\` | \`'normal'\\|'checkbox'\\|'none'\` | \`'normal'\` | Padding preset for the cell. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Cell content (text, icons, controls, etc.). |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-table-cell-padding-y\` | \`16px\` |
| \`--flint-table-cell-padding-x\` | \`16px\` |
| \`--flint-table-cell-padding-y-dense\` | \`6px\` |
| \`--flint-table-cell-padding-x-dense\` | \`16px\` |

---

#### \`<flint-table-footer>\`

Footer section of a \`<flint-table>\`, typically used for summary rows,
pagination controls, or aggregate data.

- **Tag**: \`<flint-table-footer>\`
- **Class**: \`FlintTableFooter\`

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Accepts one or more \`&lt;flint-table-row&gt;\` elements or arbitrary footer content. |
                `,
            },
        },
    },
};

export default meta;

type Story = StoryObj;

/* ------------------------------------------------------------------ */
/*  Basic                                                                */
/* ------------------------------------------------------------------ */

export const Basic: Story = {
    name: 'Basic',
    render: () => html`
        <flint-table-container>
            <flint-table>
                <flint-table-head>
                    <flint-table-row>
                        <flint-table-cell header>Dessert (100g serving)</flint-table-cell>
                        <flint-table-cell header align="right">Calories</flint-table-cell>
                        <flint-table-cell header align="right">Fat (g)</flint-table-cell>
                        <flint-table-cell header align="right">Carbs (g)</flint-table-cell>
                        <flint-table-cell header align="right">Protein (g)</flint-table-cell>
                    </flint-table-row>
                </flint-table-head>
                <flint-table-body>
                    ${desserts.map(row => html`
                        <flint-table-row>
                            <flint-table-cell>${row.name}</flint-table-cell>
                            <flint-table-cell align="right">${row.calories}</flint-table-cell>
                            <flint-table-cell align="right">${row.fat}</flint-table-cell>
                            <flint-table-cell align="right">${row.carbs}</flint-table-cell>
                            <flint-table-cell align="right">${row.protein}</flint-table-cell>
                        </flint-table-row>
                    `)}
                </flint-table-body>
            </flint-table>
        </flint-table-container>
    `,
};

/* ------------------------------------------------------------------ */
/*  Dense (small size)                                                   */
/* ------------------------------------------------------------------ */

export const Dense: Story = {
    name: 'Dense',
    render: () => html`
        <flint-table-container>
            <flint-table size="sm">
                <flint-table-head>
                    <flint-table-row>
                        <flint-table-cell header>Dessert</flint-table-cell>
                        <flint-table-cell header align="right">Calories</flint-table-cell>
                        <flint-table-cell header align="right">Fat (g)</flint-table-cell>
                        <flint-table-cell header align="right">Carbs (g)</flint-table-cell>
                        <flint-table-cell header align="right">Protein (g)</flint-table-cell>
                    </flint-table-row>
                </flint-table-head>
                <flint-table-body>
                    ${desserts.map(row => html`
                        <flint-table-row>
                            <flint-table-cell>${row.name}</flint-table-cell>
                            <flint-table-cell align="right">${row.calories}</flint-table-cell>
                            <flint-table-cell align="right">${row.fat}</flint-table-cell>
                            <flint-table-cell align="right">${row.carbs}</flint-table-cell>
                            <flint-table-cell align="right">${row.protein}</flint-table-cell>
                        </flint-table-row>
                    `)}
                </flint-table-body>
            </flint-table>
        </flint-table-container>
    `,
};

/* ------------------------------------------------------------------ */
/*  Striped                                                              */
/* ------------------------------------------------------------------ */

export const Striped: Story = {
    name: 'Striped',
    render: () => html`
        <flint-table-container>
            <flint-table>
                <flint-table-head>
                    <flint-table-row>
                        <flint-table-cell header>Dessert</flint-table-cell>
                        <flint-table-cell header align="right">Calories</flint-table-cell>
                        <flint-table-cell header align="right">Fat (g)</flint-table-cell>
                    </flint-table-row>
                </flint-table-head>
                <flint-table-body striped>
                    ${desserts.map(row => html`
                        <flint-table-row>
                            <flint-table-cell>${row.name}</flint-table-cell>
                            <flint-table-cell align="right">${row.calories}</flint-table-cell>
                            <flint-table-cell align="right">${row.fat}</flint-table-cell>
                        </flint-table-row>
                    `)}
                </flint-table-body>
            </flint-table>
        </flint-table-container>
    `,
};

/* ------------------------------------------------------------------ */
/*  Sticky Header                                                        */
/* ------------------------------------------------------------------ */

export const StickyHeader: Story = {
    name: 'Sticky Header',
    render: () => html`
        <flint-table-container sticky-header style="max-height: 220px;">
            <flint-table>
                <flint-table-head>
                    <flint-table-row>
                        <flint-table-cell header>Dessert</flint-table-cell>
                        <flint-table-cell header align="right">Calories</flint-table-cell>
                        <flint-table-cell header align="right">Fat (g)</flint-table-cell>
                    </flint-table-row>
                </flint-table-head>
                <flint-table-body>
                    ${[...desserts, ...desserts].map(row => html`
                        <flint-table-row>
                            <flint-table-cell>${row.name}</flint-table-cell>
                            <flint-table-cell align="right">${row.calories}</flint-table-cell>
                            <flint-table-cell align="right">${row.fat}</flint-table-cell>
                        </flint-table-row>
                    `)}
                </flint-table-body>
            </flint-table>
        </flint-table-container>
    `,
};

/* ------------------------------------------------------------------ */
/*  Sortable                                                             */
/* ------------------------------------------------------------------ */

export const Sortable: Story = {
    name: 'Sortable',
    render: () => {
        type Col = 'name' | 'calories' | 'fat';
        let sortCol: Col = 'name';
        let sortDir: 'asc' | 'desc' = 'asc';

        const sortedData = () => [...desserts].sort((a, b) => {
            const av = a[sortCol], bv = b[sortCol];
            const cmp = typeof av === 'string' ? av.localeCompare(bv as string) : (av as number) - (bv as number);
            return sortDir === 'asc' ? cmp : -cmp;
        });

        const render = (host: HTMLElement) => {
            const body = host.querySelector('flint-table-body');
            if (!body) return;
            body.innerHTML = '';
            sortedData().forEach(row => {
                body.insertAdjacentHTML('beforeend',
                    `<flint-table-row><flint-table-cell>${row.name}</flint-table-cell>` +
                    `<flint-table-cell align="right">${row.calories}</flint-table-cell>` +
                    `<flint-table-cell align="right">${row.fat}</flint-table-cell></flint-table-row>`
                );
            });
            host.querySelectorAll('flint-table-sort-label').forEach(el => {
                const col = el.getAttribute('data-col') as Col;
                (el as FlintTableSortLabel).active = col === sortCol;
                (el as FlintTableSortLabel).direction = col === sortCol ? sortDir : 'asc';
            });
        };

        const handleSort = (col: Col, e: Event) => {
            const host = (e.target as HTMLElement).closest('flint-table-container')!;
            if (sortCol === col) sortDir = sortDir === 'asc' ? 'desc' : 'asc';
            else { sortCol = col; sortDir = 'asc'; }
            render(host as HTMLElement);
        };

        return html`
            <flint-table-container>
                <flint-table>
                    <flint-table-head>
                        <flint-table-row>
                            <flint-table-cell header>
                                <flint-table-sort-label active direction="asc" data-col="name"
                                    @click=${(e: Event) => handleSort('name', e)}>
                                    Dessert
                                </flint-table-sort-label>
                            </flint-table-cell>
                            <flint-table-cell header align="right">
                                <flint-table-sort-label data-col="calories"
                                    @click=${(e: Event) => handleSort('calories', e)}>
                                    Calories
                                </flint-table-sort-label>
                            </flint-table-cell>
                            <flint-table-cell header align="right">
                                <flint-table-sort-label data-col="fat"
                                    @click=${(e: Event) => handleSort('fat', e)}>
                                    Fat (g)
                                </flint-table-sort-label>
                            </flint-table-cell>
                        </flint-table-row>
                    </flint-table-head>
                    <flint-table-body>
                        ${desserts.map(row => html`
                            <flint-table-row>
                                <flint-table-cell>${row.name}</flint-table-cell>
                                <flint-table-cell align="right">${row.calories}</flint-table-cell>
                                <flint-table-cell align="right">${row.fat}</flint-table-cell>
                            </flint-table-row>
                        `)}
                    </flint-table-body>
                </flint-table>
            </flint-table-container>
        `;
    },
};

/* ------------------------------------------------------------------ */
/*  With Footer                                                          */
/* ------------------------------------------------------------------ */

export const WithFooter: Story = {
    name: 'With Footer',
    render: () => {
        const totalCalories = desserts.reduce((s, r) => s + r.calories, 0);
        const totalFat      = desserts.reduce((s, r) => s + r.fat, 0);
        return html`
            <flint-table-container>
                <flint-table>
                    <flint-table-head>
                        <flint-table-row>
                            <flint-table-cell header>Dessert</flint-table-cell>
                            <flint-table-cell header align="right">Calories</flint-table-cell>
                            <flint-table-cell header align="right">Fat (g)</flint-table-cell>
                        </flint-table-row>
                    </flint-table-head>
                    <flint-table-body>
                        ${desserts.map(row => html`
                            <flint-table-row>
                                <flint-table-cell>${row.name}</flint-table-cell>
                                <flint-table-cell align="right">${row.calories}</flint-table-cell>
                                <flint-table-cell align="right">${row.fat}</flint-table-cell>
                            </flint-table-row>
                        `)}
                    </flint-table-body>
                    <flint-table-footer>
                        <flint-table-row>
                            <flint-table-cell><strong>Total</strong></flint-table-cell>
                            <flint-table-cell align="right"><strong>${totalCalories}</strong></flint-table-cell>
                            <flint-table-cell align="right"><strong>${totalFat}</strong></flint-table-cell>
                        </flint-table-row>
                    </flint-table-footer>
                </flint-table>
            </flint-table-container>
        `;
    },
};

/* ------------------------------------------------------------------ */
/*  Empty State                                                          */
/* ------------------------------------------------------------------ */

export const EmptyState: Story = {
    name: 'Empty State',
    render: () => html`
        <flint-table-container>
            <flint-table>
                <flint-table-head>
                    <flint-table-row>
                        <flint-table-cell header>Name</flint-table-cell>
                        <flint-table-cell header>Category</flint-table-cell>
                        <flint-table-cell header align="right">Stock</flint-table-cell>
                    </flint-table-row>
                </flint-table-head>
                <flint-table-body>
                    <flint-table-row>
                        <flint-table-cell padding="none" align="center"
                            style="padding: 48px; color: var(--flint-text-color-muted);">
                            No results found.
                        </flint-table-cell>
                    </flint-table-row>
                </flint-table-body>
            </flint-table>
        </flint-table-container>
    `,
};

/* ------------------------------------------------------------------ */
/*  Interactive (select rows + pagination)                              */
/* ------------------------------------------------------------------ */

export const Interactive: Story = {
    name: 'Interactive',
    render: () => {
        const handleSelectAll = (e: Event) => {
            const checked = (e.target as HTMLInputElement).checked;
            const table = (e.target as HTMLElement).closest('flint-table');
            if (!table) return;
            table.querySelectorAll<HTMLInputElement>('flint-table-body input[type="checkbox"]')
                .forEach(cb => { cb.checked = checked; });
            table.querySelectorAll<FlintTableRow>('flint-table-body flint-table-row')
                .forEach(row => { row.selected = checked; });
        };

        const handleRowSelect = (e: Event) => {
            const cb = e.target as HTMLInputElement;
            const table = cb.closest('flint-table');
            if (!table) return;
            const row = cb.closest<FlintTableRow>('flint-table-row');
            if (row) row.selected = cb.checked;
            const allChecked = Array.from(
                table.querySelectorAll<HTMLInputElement>('flint-table-body input[type="checkbox"]')
            ).every(i => i.checked);
            const selectAll = table.querySelector<HTMLInputElement>('flint-table-head input[type="checkbox"]');
            if (selectAll) selectAll.checked = allChecked;
        };

        return html`
            <flint-table-container shadow>
                <flint-table>
                    <flint-table-head>
                        <flint-table-row>
                            <flint-table-cell header padding="checkbox">
                                <input type="checkbox" @change=${handleSelectAll} />
                            </flint-table-cell>
                            <flint-table-cell header>Product Name</flint-table-cell>
                            <flint-table-cell header>Category</flint-table-cell>
                            <flint-table-cell header align="right">Stock</flint-table-cell>
                            <flint-table-cell header align="right">Price</flint-table-cell>
                        </flint-table-row>
                    </flint-table-head>
                    <flint-table-body>
                        ${products.map(p => html`
                            <flint-table-row>
                                <flint-table-cell padding="checkbox">
                                    <input type="checkbox" @change=${handleRowSelect} />
                                </flint-table-cell>
                                <flint-table-cell><b>${p.name}</b></flint-table-cell>
                                <flint-table-cell>${p.category}</flint-table-cell>
                                <flint-table-cell align="right"
                                    style="${p.stock === 0 ? 'color: var(--flint-destructive-color)' : ''}">
                                    ${p.stock === 0 ? 'Out of stock' : p.stock}
                                </flint-table-cell>
                                <flint-table-cell align="right">${p.price}</flint-table-cell>
                            </flint-table-row>
                        `)}
                    </flint-table-body>
                </flint-table>
                <flint-table-pagination
                    .count=${100}
                    .page=${0}
                    .rowsPerPage=${10}
                    show-first-last
                    @flint-pagination-page-change=${(e: CustomEvent) => console.log('page', e.detail.page)}
                    @flint-pagination-rows-per-page-change=${(e: CustomEvent) => console.log('rowsPerPage', e.detail.rowsPerPage)}
                ></flint-table-pagination>
            </flint-table-container>
        `;
    },
};

/* ------------------------------------------------------------------ */
/*  Controlled Pagination                                               */
/* ------------------------------------------------------------------ */

export const ControlledPagination: Story = {
    name: 'Controlled Pagination',
    render: () => {
        return html`
            <div id="ctrl-wrap">
                <flint-table-container>
                    <flint-table>
                        <flint-table-head>
                            <flint-table-row>
                                <flint-table-cell header>Dessert</flint-table-cell>
                                <flint-table-cell header align="right">Calories</flint-table-cell>
                            </flint-table-row>
                        </flint-table-head>
                        <flint-table-body>
                            ${desserts.map(row => html`
                                <flint-table-row>
                                    <flint-table-cell>${row.name}</flint-table-cell>
                                    <flint-table-cell align="right">${row.calories}</flint-table-cell>
                                </flint-table-row>
                            `)}
                        </flint-table-body>
                    </flint-table>
                    <flint-table-pagination
                        id="ctrl-pg"
                        .count=${50}
                        .page=${2}
                        .rowsPerPage=${5}
                        .rowsPerPageOptions=${[5, 10, 20]}
                        label-rows-per-page="Per page:"
                        show-first-last
                        @flint-pagination-page-change=${(e: CustomEvent) => {
                            const pg = document.getElementById('ctrl-pg') as HTMLElement & { page: number };
                            if (pg) pg.page = e.detail.page;
                        }}
                    ></flint-table-pagination>
                </flint-table-container>
            </div>
        `;
    },
};
