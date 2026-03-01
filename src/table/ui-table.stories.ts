import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-table.js';
import './ui-table-sort-label.js';
import './ui-table-pagination.js';

import { UiTableRow } from './ui-table';

const meta: Meta = {
    title: 'Data Display/Table',
    component: 'ui-table',
};

export default meta;

type Story = StoryObj;

const testData = [
    { id: 1, name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
    { id: 2, name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
    { id: 3, name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
    { id: 4, name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
    { id: 5, name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
];

export const Basic: Story = {
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
                    ${testData.map(row => html`
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
    `
};

export const Sortable: Story = {
    render: () => html`
        <ui-table-container>
            <ui-table>
                <ui-table-head>
                    <ui-table-row>
                        <ui-table-cell header>
                            <ui-table-sort-label active direction="asc">Dessert</ui-table-sort-label>
                        </ui-table-cell>
                        <ui-table-cell header align="right">
                            <ui-table-sort-label>Calories</ui-table-sort-label>
                        </ui-table-cell>
                        <ui-table-cell header align="right">Fat</ui-table-cell>
                    </ui-table-row>
                </ui-table-head>
                <ui-table-body>
                    <ui-table-row>
                        <ui-table-cell>Eclair</ui-table-cell>
                        <ui-table-cell align="right">262</ui-table-cell>
                        <ui-table-cell align="right">16.0</ui-table-cell>
                    </ui-table-row>
                    <ui-table-row selected>
                        <ui-table-cell>Frozen yoghurt (Selected)</ui-table-cell>
                        <ui-table-cell align="right">159</ui-table-cell>
                        <ui-table-cell align="right">6.0</ui-table-cell>
                    </ui-table-row>
                </ui-table-body>
            </ui-table>
        </ui-table-container>
    `
};

export const Interactive: Story = {
    render: () => {
        const handleSelectAll = (e: Event) => {
            const checked = (e.target as HTMLInputElement).checked;
            const table = (e.target as HTMLElement).closest('ui-table');
            if (!table) return;
            const rowCheckboxes = table.querySelectorAll('ui-table-body input[type="checkbox"]');
            const rows = table.querySelectorAll('ui-table-body ui-table-row');
            rowCheckboxes.forEach((cb) => (cb as HTMLInputElement).checked = checked);
            rows.forEach((row) => (row as UiTableRow).selected = checked);
        };

        const handleRowSelect = (e: Event) => {
            const cb = e.target as HTMLInputElement;
            const table = cb.closest('ui-table');
            if (!table) return;
            const row = cb.closest('ui-table-row');
            if (row) {
                (row as UiTableRow).selected = cb.checked;
            }

            const allChecked = Array.from(table.querySelectorAll('ui-table-body input[type="checkbox"]'))
                .every((input) => (input as HTMLInputElement).checked);

            const selectAllCb = table.querySelector('ui-table-head input[type="checkbox"]') as HTMLInputElement;
            if (selectAllCb) selectAllCb.checked = allChecked;
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
                        <ui-table-row>
                            <ui-table-cell padding="checkbox">
                                <input type="checkbox" @change=${handleRowSelect} />
                            </ui-table-cell>
                            <ui-table-cell><b>iPhone 15 Pro</b></ui-table-cell>
                            <ui-table-cell>Electronics</ui-table-cell>
                            <ui-table-cell align="right">42</ui-table-cell>
                            <ui-table-cell align="right">$999.00</ui-table-cell>
                        </ui-table-row>
                        <ui-table-row>
                            <ui-table-cell padding="checkbox">
                                <input type="checkbox" @change=${handleRowSelect} />
                            </ui-table-cell>
                            <ui-table-cell><b>MacBook Air M2</b></ui-table-cell>
                            <ui-table-cell>Electronics</ui-table-cell>
                            <ui-table-cell align="right">12</ui-table-cell>
                            <ui-table-cell align="right">$1,199.00</ui-table-cell>
                        </ui-table-row>
                    </ui-table-body>
                </ui-table>
                <ui-table-pagination .count=${100} .page=${0} .rowsPerPage=${10}></ui-table-pagination>
            </ui-table-container>
        `;
    }
};

