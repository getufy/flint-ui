import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-table.js';
import './ui-table-sort-label.js';
import './ui-table-pagination.js';

import { UiTableRow } from './ui-table';
import { UiTableSortLabel } from './ui-table-sort-label';

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
    component: 'ui-table',
};

export default meta;

type Story = StoryObj;

/* ------------------------------------------------------------------ */
/*  Basic                                                                */
/* ------------------------------------------------------------------ */

export const Basic: Story = {
    name: 'Basic',
    render: () => html`
        <ui-table-container>
            <ui-table>
                <ui-table-head>
                    <ui-table-row>
                        <ui-table-cell header>Dessert (100g serving)</ui-table-cell>
                        <ui-table-cell header align="right">Calories</ui-table-cell>
                        <ui-table-cell header align="right">Fat (g)</ui-table-cell>
                        <ui-table-cell header align="right">Carbs (g)</ui-table-cell>
                        <ui-table-cell header align="right">Protein (g)</ui-table-cell>
                    </ui-table-row>
                </ui-table-head>
                <ui-table-body>
                    ${desserts.map(row => html`
                        <ui-table-row>
                            <ui-table-cell>${row.name}</ui-table-cell>
                            <ui-table-cell align="right">${row.calories}</ui-table-cell>
                            <ui-table-cell align="right">${row.fat}</ui-table-cell>
                            <ui-table-cell align="right">${row.carbs}</ui-table-cell>
                            <ui-table-cell align="right">${row.protein}</ui-table-cell>
                        </ui-table-row>
                    `)}
                </ui-table-body>
            </ui-table>
        </ui-table-container>
    `,
};

/* ------------------------------------------------------------------ */
/*  Dense (small size)                                                   */
/* ------------------------------------------------------------------ */

export const Dense: Story = {
    name: 'Dense',
    render: () => html`
        <ui-table-container>
            <ui-table size="small">
                <ui-table-head>
                    <ui-table-row>
                        <ui-table-cell header>Dessert</ui-table-cell>
                        <ui-table-cell header align="right">Calories</ui-table-cell>
                        <ui-table-cell header align="right">Fat (g)</ui-table-cell>
                        <ui-table-cell header align="right">Carbs (g)</ui-table-cell>
                        <ui-table-cell header align="right">Protein (g)</ui-table-cell>
                    </ui-table-row>
                </ui-table-head>
                <ui-table-body>
                    ${desserts.map(row => html`
                        <ui-table-row>
                            <ui-table-cell>${row.name}</ui-table-cell>
                            <ui-table-cell align="right">${row.calories}</ui-table-cell>
                            <ui-table-cell align="right">${row.fat}</ui-table-cell>
                            <ui-table-cell align="right">${row.carbs}</ui-table-cell>
                            <ui-table-cell align="right">${row.protein}</ui-table-cell>
                        </ui-table-row>
                    `)}
                </ui-table-body>
            </ui-table>
        </ui-table-container>
    `,
};

/* ------------------------------------------------------------------ */
/*  Striped                                                              */
/* ------------------------------------------------------------------ */

export const Striped: Story = {
    name: 'Striped',
    render: () => html`
        <ui-table-container>
            <ui-table>
                <ui-table-head>
                    <ui-table-row>
                        <ui-table-cell header>Dessert</ui-table-cell>
                        <ui-table-cell header align="right">Calories</ui-table-cell>
                        <ui-table-cell header align="right">Fat (g)</ui-table-cell>
                    </ui-table-row>
                </ui-table-head>
                <ui-table-body striped>
                    ${desserts.map(row => html`
                        <ui-table-row>
                            <ui-table-cell>${row.name}</ui-table-cell>
                            <ui-table-cell align="right">${row.calories}</ui-table-cell>
                            <ui-table-cell align="right">${row.fat}</ui-table-cell>
                        </ui-table-row>
                    `)}
                </ui-table-body>
            </ui-table>
        </ui-table-container>
    `,
};

/* ------------------------------------------------------------------ */
/*  Sticky Header                                                        */
/* ------------------------------------------------------------------ */

export const StickyHeader: Story = {
    name: 'Sticky Header',
    render: () => html`
        <ui-table-container sticky-header style="max-height: 220px;">
            <ui-table>
                <ui-table-head>
                    <ui-table-row>
                        <ui-table-cell header>Dessert</ui-table-cell>
                        <ui-table-cell header align="right">Calories</ui-table-cell>
                        <ui-table-cell header align="right">Fat (g)</ui-table-cell>
                    </ui-table-row>
                </ui-table-head>
                <ui-table-body>
                    ${[...desserts, ...desserts].map(row => html`
                        <ui-table-row>
                            <ui-table-cell>${row.name}</ui-table-cell>
                            <ui-table-cell align="right">${row.calories}</ui-table-cell>
                            <ui-table-cell align="right">${row.fat}</ui-table-cell>
                        </ui-table-row>
                    `)}
                </ui-table-body>
            </ui-table>
        </ui-table-container>
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
            const body = host.querySelector('ui-table-body');
            if (!body) return;
            body.innerHTML = '';
            sortedData().forEach(row => {
                body.insertAdjacentHTML('beforeend',
                    `<ui-table-row><ui-table-cell>${row.name}</ui-table-cell>` +
                    `<ui-table-cell align="right">${row.calories}</ui-table-cell>` +
                    `<ui-table-cell align="right">${row.fat}</ui-table-cell></ui-table-row>`
                );
            });
            host.querySelectorAll('ui-table-sort-label').forEach(el => {
                const col = el.getAttribute('data-col') as Col;
                (el as UiTableSortLabel).active = col === sortCol;
                (el as UiTableSortLabel).direction = col === sortCol ? sortDir : 'asc';
            });
        };

        const handleSort = (col: Col, e: Event) => {
            const host = (e.target as HTMLElement).closest('ui-table-container')!;
            if (sortCol === col) sortDir = sortDir === 'asc' ? 'desc' : 'asc';
            else { sortCol = col; sortDir = 'asc'; }
            render(host as HTMLElement);
        };

        return html`
            <ui-table-container>
                <ui-table>
                    <ui-table-head>
                        <ui-table-row>
                            <ui-table-cell header>
                                <ui-table-sort-label active direction="asc" data-col="name"
                                    @click=${(e: Event) => handleSort('name', e)}>
                                    Dessert
                                </ui-table-sort-label>
                            </ui-table-cell>
                            <ui-table-cell header align="right">
                                <ui-table-sort-label data-col="calories"
                                    @click=${(e: Event) => handleSort('calories', e)}>
                                    Calories
                                </ui-table-sort-label>
                            </ui-table-cell>
                            <ui-table-cell header align="right">
                                <ui-table-sort-label data-col="fat"
                                    @click=${(e: Event) => handleSort('fat', e)}>
                                    Fat (g)
                                </ui-table-sort-label>
                            </ui-table-cell>
                        </ui-table-row>
                    </ui-table-head>
                    <ui-table-body>
                        ${desserts.map(row => html`
                            <ui-table-row>
                                <ui-table-cell>${row.name}</ui-table-cell>
                                <ui-table-cell align="right">${row.calories}</ui-table-cell>
                                <ui-table-cell align="right">${row.fat}</ui-table-cell>
                            </ui-table-row>
                        `)}
                    </ui-table-body>
                </ui-table>
            </ui-table-container>
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
            <ui-table-container>
                <ui-table>
                    <ui-table-head>
                        <ui-table-row>
                            <ui-table-cell header>Dessert</ui-table-cell>
                            <ui-table-cell header align="right">Calories</ui-table-cell>
                            <ui-table-cell header align="right">Fat (g)</ui-table-cell>
                        </ui-table-row>
                    </ui-table-head>
                    <ui-table-body>
                        ${desserts.map(row => html`
                            <ui-table-row>
                                <ui-table-cell>${row.name}</ui-table-cell>
                                <ui-table-cell align="right">${row.calories}</ui-table-cell>
                                <ui-table-cell align="right">${row.fat}</ui-table-cell>
                            </ui-table-row>
                        `)}
                    </ui-table-body>
                    <ui-table-footer>
                        <ui-table-row>
                            <ui-table-cell><strong>Total</strong></ui-table-cell>
                            <ui-table-cell align="right"><strong>${totalCalories}</strong></ui-table-cell>
                            <ui-table-cell align="right"><strong>${totalFat}</strong></ui-table-cell>
                        </ui-table-row>
                    </ui-table-footer>
                </ui-table>
            </ui-table-container>
        `;
    },
};

/* ------------------------------------------------------------------ */
/*  Empty State                                                          */
/* ------------------------------------------------------------------ */

export const EmptyState: Story = {
    name: 'Empty State',
    render: () => html`
        <ui-table-container>
            <ui-table>
                <ui-table-head>
                    <ui-table-row>
                        <ui-table-cell header>Name</ui-table-cell>
                        <ui-table-cell header>Category</ui-table-cell>
                        <ui-table-cell header align="right">Stock</ui-table-cell>
                    </ui-table-row>
                </ui-table-head>
                <ui-table-body>
                    <ui-table-row>
                        <ui-table-cell padding="none" align="center"
                            style="padding: 48px; color: var(--ui-text-color-muted);">
                            No results found.
                        </ui-table-cell>
                    </ui-table-row>
                </ui-table-body>
            </ui-table>
        </ui-table-container>
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
            const table = (e.target as HTMLElement).closest('ui-table');
            if (!table) return;
            table.querySelectorAll<HTMLInputElement>('ui-table-body input[type="checkbox"]')
                .forEach(cb => { cb.checked = checked; });
            table.querySelectorAll<UiTableRow>('ui-table-body ui-table-row')
                .forEach(row => { row.selected = checked; });
        };

        const handleRowSelect = (e: Event) => {
            const cb = e.target as HTMLInputElement;
            const table = cb.closest('ui-table');
            if (!table) return;
            const row = cb.closest<UiTableRow>('ui-table-row');
            if (row) row.selected = cb.checked;
            const allChecked = Array.from(
                table.querySelectorAll<HTMLInputElement>('ui-table-body input[type="checkbox"]')
            ).every(i => i.checked);
            const selectAll = table.querySelector<HTMLInputElement>('ui-table-head input[type="checkbox"]');
            if (selectAll) selectAll.checked = allChecked;
        };

        return html`
            <ui-table-container shadow>
                <ui-table>
                    <ui-table-head>
                        <ui-table-row>
                            <ui-table-cell header padding="checkbox">
                                <input type="checkbox" @change=${handleSelectAll} />
                            </ui-table-cell>
                            <ui-table-cell header>Product Name</ui-table-cell>
                            <ui-table-cell header>Category</ui-table-cell>
                            <ui-table-cell header align="right">Stock</ui-table-cell>
                            <ui-table-cell header align="right">Price</ui-table-cell>
                        </ui-table-row>
                    </ui-table-head>
                    <ui-table-body>
                        ${products.map(p => html`
                            <ui-table-row>
                                <ui-table-cell padding="checkbox">
                                    <input type="checkbox" @change=${handleRowSelect} />
                                </ui-table-cell>
                                <ui-table-cell><b>${p.name}</b></ui-table-cell>
                                <ui-table-cell>${p.category}</ui-table-cell>
                                <ui-table-cell align="right"
                                    style="${p.stock === 0 ? 'color: var(--ui-destructive-color)' : ''}">
                                    ${p.stock === 0 ? 'Out of stock' : p.stock}
                                </ui-table-cell>
                                <ui-table-cell align="right">${p.price}</ui-table-cell>
                            </ui-table-row>
                        `)}
                    </ui-table-body>
                </ui-table>
                <ui-table-pagination
                    .count=${100}
                    .page=${0}
                    .rowsPerPage=${10}
                    show-first-last
                    @page-change=${(e: CustomEvent) => console.log('page', e.detail.page)}
                    @rows-per-page-change=${(e: CustomEvent) => console.log('rowsPerPage', e.detail.rowsPerPage)}
                ></ui-table-pagination>
            </ui-table-container>
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
                <ui-table-container>
                    <ui-table>
                        <ui-table-head>
                            <ui-table-row>
                                <ui-table-cell header>Dessert</ui-table-cell>
                                <ui-table-cell header align="right">Calories</ui-table-cell>
                            </ui-table-row>
                        </ui-table-head>
                        <ui-table-body>
                            ${desserts.map(row => html`
                                <ui-table-row>
                                    <ui-table-cell>${row.name}</ui-table-cell>
                                    <ui-table-cell align="right">${row.calories}</ui-table-cell>
                                </ui-table-row>
                            `)}
                        </ui-table-body>
                    </ui-table>
                    <ui-table-pagination
                        id="ctrl-pg"
                        .count=${50}
                        .page=${2}
                        .rowsPerPage=${5}
                        .rowsPerPageOptions=${[5, 10, 20]}
                        label-rows-per-page="Per page:"
                        show-first-last
                        @page-change=${(e: CustomEvent) => {
                            const pg = document.getElementById('ctrl-pg') as HTMLElement & { page: number };
                            if (pg) pg.page = e.detail.page;
                        }}
                    ></ui-table-pagination>
                </ui-table-container>
            </div>
        `;
    },
};
