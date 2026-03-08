import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-table.js';
import './ui-table-sort-label.js';
import './ui-table-pagination.js';
import type { UiTable, UiTableRow, UiTableCell, UiTableBody, UiTableContainer } from './ui-table';
import type { UiTablePagination } from './ui-table-pagination';
import type { UiTableSortLabel } from './ui-table-sort-label';

/* ------------------------------------------------------------------ */
/*  UiTableContainer                                                     */
/* ------------------------------------------------------------------ */

describe('ui-table-container', () => {
    it('renders slot', async () => {
        const el = await fixture<UiTableContainer>(html`
            <ui-table-container><span id="c">hello</span></ui-table-container>
        `);
        expect(el.querySelector('#c')).toBeTruthy();
    });

    it('shadow attr reflects', async () => {
        const el = await fixture<UiTableContainer>(html`<ui-table-container shadow></ui-table-container>`);
        expect(el.hasAttribute('shadow')).toBe(true);
        expect(el.shadow).toBe(true);
    });

    it('sticky-header attr reflects', async () => {
        const el = await fixture<UiTableContainer>(html`<ui-table-container sticky-header></ui-table-container>`);
        expect(el.hasAttribute('sticky-header')).toBe(true);
        expect(el.stickyHeader).toBe(true);
    });

    it('shadow defaults to false', async () => {
        const el = await fixture<UiTableContainer>(html`<ui-table-container></ui-table-container>`);
        expect(el.shadow).toBe(false);
        expect(el.hasAttribute('shadow')).toBe(false);
    });
});

/* ------------------------------------------------------------------ */
/*  UiTable + UiTableHead/Body/Footer                                   */
/* ------------------------------------------------------------------ */

describe('ui-table', () => {
    it('renders a simple table structure', async () => {
        const el = await fixture<UiTable>(html`
            <ui-table>
                <ui-table-head>
                    <ui-table-row>
                        <ui-table-cell header>Name</ui-table-cell>
                    </ui-table-row>
                </ui-table-head>
                <ui-table-body>
                    <ui-table-row>
                        <ui-table-cell>John Doe</ui-table-cell>
                    </ui-table-row>
                </ui-table-body>
            </ui-table>
        `);
        expect(el.querySelector('ui-table-cell[header]')!.textContent).toBe('Name');
        expect(el.querySelector('ui-table-body ui-table-cell')!.textContent).toBe('John Doe');
    });

    it('size prop reflects', async () => {
        const el = await fixture<UiTable>(html`<ui-table size="small"></ui-table>`);
        expect(el.getAttribute('size')).toBe('small');
    });

    it('size defaults to medium', async () => {
        const el = await fixture<UiTable>(html`<ui-table></ui-table>`);
        expect(el.size).toBe('medium');
    });

    it('renders footer', async () => {
        const el = await fixture<UiTable>(html`
            <ui-table>
                <ui-table-footer>
                    <ui-table-row><ui-table-cell>Total</ui-table-cell></ui-table-row>
                </ui-table-footer>
            </ui-table>
        `);
        expect(el.querySelector('ui-table-footer ui-table-cell')!.textContent).toBe('Total');
    });
});

/* ------------------------------------------------------------------ */
/*  UiTableBody (striped)                                               */
/* ------------------------------------------------------------------ */

describe('ui-table-body', () => {
    it('striped attr reflects', async () => {
        const el = await fixture<UiTableBody>(html`<ui-table-body striped></ui-table-body>`);
        expect(el.hasAttribute('striped')).toBe(true);
        expect(el.striped).toBe(true);
    });

    it('striped defaults to false', async () => {
        const el = await fixture<UiTableBody>(html`<ui-table-body></ui-table-body>`);
        expect(el.striped).toBe(false);
    });
});

/* ------------------------------------------------------------------ */
/*  UiTableRow                                                          */
/* ------------------------------------------------------------------ */

describe('ui-table-row', () => {
    it('selected attr reflects', async () => {
        const el = await fixture<UiTableRow>(html`<ui-table-row selected></ui-table-row>`);
        expect(el.hasAttribute('selected')).toBe(true);
        expect(el.selected).toBe(true);
    });

    it('hover attr reflects', async () => {
        const el = await fixture<UiTableRow>(html`<ui-table-row hover></ui-table-row>`);
        expect(el.hasAttribute('hover')).toBe(true);
        expect(el.hover).toBe(true);
    });

    it('selected defaults to false', async () => {
        const el = await fixture<UiTableRow>(html`<ui-table-row></ui-table-row>`);
        expect(el.selected).toBe(false);
    });

    it('selected can be toggled programmatically', async () => {
        const el = await fixture<UiTableRow>(html`<ui-table-row></ui-table-row>`);
        el.selected = true;
        await el.updateComplete;
        expect(el.hasAttribute('selected')).toBe(true);
        el.selected = false;
        await el.updateComplete;
        expect(el.hasAttribute('selected')).toBe(false);
    });
});

/* ------------------------------------------------------------------ */
/*  UiTableCell                                                         */
/* ------------------------------------------------------------------ */

describe('ui-table-cell', () => {
    it('header attr reflects', async () => {
        const el = await fixture<UiTableCell>(html`<ui-table-cell header>H</ui-table-cell>`);
        expect(el.hasAttribute('header')).toBe(true);
    });

    it('align right reflects', async () => {
        const el = await fixture<UiTableCell>(html`<ui-table-cell align="right">Content</ui-table-cell>`);
        expect(el.getAttribute('align')).toBe('right');
    });

    it('align center reflects', async () => {
        const el = await fixture<UiTableCell>(html`<ui-table-cell align="center">Content</ui-table-cell>`);
        expect(el.getAttribute('align')).toBe('center');
    });

    it('align defaults to left', async () => {
        const el = await fixture<UiTableCell>(html`<ui-table-cell>Content</ui-table-cell>`);
        expect(el.align).toBe('left');
    });

    it('padding checkbox reflects', async () => {
        const el = await fixture<UiTableCell>(html`<ui-table-cell padding="checkbox"></ui-table-cell>`);
        expect(el.getAttribute('padding')).toBe('checkbox');
    });

    it('padding none reflects', async () => {
        const el = await fixture<UiTableCell>(html`<ui-table-cell padding="none"></ui-table-cell>`);
        expect(el.getAttribute('padding')).toBe('none');
    });

    it('padding defaults to normal', async () => {
        const el = await fixture<UiTableCell>(html`<ui-table-cell></ui-table-cell>`);
        expect(el.padding).toBe('normal');
    });
});

/* ------------------------------------------------------------------ */
/*  UiTableSortLabel                                                    */
/* ------------------------------------------------------------------ */

describe('ui-table-sort-label', () => {
    it('active attr reflects', async () => {
        const el = await fixture<UiTableSortLabel>(html`<ui-table-sort-label active>Sort</ui-table-sort-label>`);
        expect(el.hasAttribute('active')).toBe(true);
        expect(el.active).toBe(true);
    });

    it('direction asc (default)', async () => {
        const el = await fixture<UiTableSortLabel>(html`<ui-table-sort-label>Sort</ui-table-sort-label>`);
        expect(el.direction).toBe('asc');
    });

    it('direction desc', async () => {
        const el = await fixture<UiTableSortLabel>(html`<ui-table-sort-label direction="desc">Sort</ui-table-sort-label>`);
        expect(el.getAttribute('direction')).toBe('desc');
    });

    it('icon has desc class when direction is desc', async () => {
        const el = await fixture<UiTableSortLabel>(html`
            <ui-table-sort-label active direction="desc">Sort</ui-table-sort-label>
        `);
        const icon = el.shadowRoot!.querySelector('.icon');
        expect(icon!.classList.contains('desc')).toBe(true);
        expect(icon!.classList.contains('asc')).toBe(false);
    });

    it('icon has asc class when direction is asc', async () => {
        const el = await fixture<UiTableSortLabel>(html`
            <ui-table-sort-label active direction="asc">Sort</ui-table-sort-label>
        `);
        const icon = el.shadowRoot!.querySelector('.icon');
        expect(icon!.classList.contains('asc')).toBe(true);
    });
});

/* ------------------------------------------------------------------ */
/*  UiTablePagination                                                   */
/* ------------------------------------------------------------------ */

describe('ui-table-pagination', () => {
    it('dispatches page-change on next click', async () => {
        const pageHandler = vi.fn();
        const el = await fixture<UiTablePagination>(html`
            <ui-table-pagination .count=${100} .page=${1} @page-change=${pageHandler}></ui-table-pagination>
        `);
        el.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="Next page"]')!.click();
        expect(pageHandler).toHaveBeenCalled();
        expect(pageHandler.mock.calls[0][0].detail.page).toBe(2);
    });

    it('dispatches page-change on previous click', async () => {
        const handler = vi.fn();
        const el = await fixture<UiTablePagination>(html`
            <ui-table-pagination .count=${100} .page=${3} @page-change=${handler}></ui-table-pagination>
        `);
        el.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="Previous page"]')!.click();
        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.page).toBe(2);
    });

    it('prev button disabled on first page', async () => {
        const el = await fixture<UiTablePagination>(html`
            <ui-table-pagination .count=${100} .page=${0}></ui-table-pagination>
        `);
        const prev = el.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="Previous page"]')!;
        expect(prev.disabled).toBe(true);
    });

    it('next button disabled on last page', async () => {
        const el = await fixture<UiTablePagination>(html`
            <ui-table-pagination .count=${10} .page=${0} .rowsPerPage=${10}></ui-table-pagination>
        `);
        const next = el.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="Next page"]')!;
        expect(next.disabled).toBe(true);
    });

    it('dispatches rows-per-page-change when select changes', async () => {
        const handler = vi.fn();
        const el = await fixture<UiTablePagination>(html`
            <ui-table-pagination .count=${100} .page=${0} @rows-per-page-change=${handler}></ui-table-pagination>
        `);
        const select = el.shadowRoot!.querySelector<HTMLSelectElement>('select')!;
        select.value = '25';
        select.dispatchEvent(new Event('change'));
        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.rowsPerPage).toBe(25);
    });

    it('renders custom labelRowsPerPage', async () => {
        const el = await fixture<UiTablePagination>(html`
            <ui-table-pagination .count=${10} label-rows-per-page="Per page:"></ui-table-pagination>
        `);
        expect(el.shadowRoot!.textContent).toContain('Per page:');
    });

    it('shows first/last buttons when show-first-last is set', async () => {
        const el = await fixture<UiTablePagination>(html`
            <ui-table-pagination .count=${100} .page=${3} show-first-last></ui-table-pagination>
        `);
        expect(el.shadowRoot!.querySelector('button[aria-label="First page"]')).toBeTruthy();
        expect(el.shadowRoot!.querySelector('button[aria-label="Last page"]')).toBeTruthy();
    });

    it('first page button dispatches page-change with 0', async () => {
        const handler = vi.fn();
        const el = await fixture<UiTablePagination>(html`
            <ui-table-pagination .count=${100} .page=${5} show-first-last @page-change=${handler}></ui-table-pagination>
        `);
        el.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="First page"]')!.click();
        expect(handler.mock.calls[0][0].detail.page).toBe(0);
    });

    it('last page button dispatches page-change with last page index', async () => {
        const handler = vi.fn();
        const el = await fixture<UiTablePagination>(html`
            <ui-table-pagination .count=${100} .page=${0} .rowsPerPage=${10} show-first-last @page-change=${handler}></ui-table-pagination>
        `);
        el.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="Last page"]')!.click();
        expect(handler.mock.calls[0][0].detail.page).toBe(9);
    });

    it('first/last buttons absent by default', async () => {
        const el = await fixture<UiTablePagination>(html`
            <ui-table-pagination .count=${100} .page=${3}></ui-table-pagination>
        `);
        expect(el.shadowRoot!.querySelector('button[aria-label="First page"]')).toBeNull();
        expect(el.shadowRoot!.querySelector('button[aria-label="Last page"]')).toBeNull();
    });

    it('custom rowsPerPageOptions renders correct options', async () => {
        const el = await fixture<UiTablePagination>(html`
            <ui-table-pagination .count=${100} .rowsPerPageOptions=${[10, 20, 50]}></ui-table-pagination>
        `);
        const options = el.shadowRoot!.querySelectorAll('option');
        expect(options.length).toBe(3);
        expect(options[2].value).toBe('50');
    });

    it('defaultPage sets initial page for uncontrolled use', async () => {
        const el = await fixture<UiTablePagination>(html`
            <ui-table-pagination .count=${100} default-page="3"></ui-table-pagination>
        `);
        // The displayed range should start at 3*10+1 = 31
        expect(el.shadowRoot!.textContent).toContain('31');
    });
});
