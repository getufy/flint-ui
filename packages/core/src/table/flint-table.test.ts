import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-table.js';
import './flint-table-sort-label.js';
import './flint-table-pagination.js';
import type { FlintTable, FlintTableRow, FlintTableCell, FlintTableBody, FlintTableContainer } from './flint-table';
import type { FlintTablePagination } from './flint-table-pagination';
import type { FlintTableSortLabel } from './flint-table-sort-label';
import { expectAccessible } from '../test-utils/axe';

/* ------------------------------------------------------------------ */
/*  FlintTableContainer                                                     */
/* ------------------------------------------------------------------ */

describe('flint-table-container', () => {
    it('renders slot', async () => {
        const el = await fixture<FlintTableContainer>(html`
            <flint-table-container><span id="c">hello</span></flint-table-container>
        `);
        expect(el.querySelector('#c')).toBeTruthy();
    });

    it('shadow attr reflects', async () => {
        const el = await fixture<FlintTableContainer>(html`<flint-table-container shadow></flint-table-container>`);
        expect(el.hasAttribute('shadow')).toBe(true);
        expect(el.shadow).toBe(true);
    });

    it('sticky-header attr reflects', async () => {
        const el = await fixture<FlintTableContainer>(html`<flint-table-container sticky-header></flint-table-container>`);
        expect(el.hasAttribute('sticky-header')).toBe(true);
        expect(el.stickyHeader).toBe(true);
    });

    it('shadow defaults to false', async () => {
        const el = await fixture<FlintTableContainer>(html`<flint-table-container></flint-table-container>`);
        expect(el.shadow).toBe(false);
        expect(el.hasAttribute('shadow')).toBe(false);
    });
});

/* ------------------------------------------------------------------ */
/*  FlintTable + FlintTableHead/Body/Footer                                   */
/* ------------------------------------------------------------------ */

describe('flint-table', () => {
    it('renders a simple table structure', async () => {
        const el = await fixture<FlintTable>(html`
            <flint-table>
                <flint-table-head>
                    <flint-table-row>
                        <flint-table-cell header>Name</flint-table-cell>
                    </flint-table-row>
                </flint-table-head>
                <flint-table-body>
                    <flint-table-row>
                        <flint-table-cell>John Doe</flint-table-cell>
                    </flint-table-row>
                </flint-table-body>
            </flint-table>
        `);
        expect(el.querySelector('flint-table-cell[header]')!.textContent).toBe('Name');
        expect(el.querySelector('flint-table-body flint-table-cell')!.textContent).toBe('John Doe');
    });

    it('size prop reflects', async () => {
        const el = await fixture<FlintTable>(html`<flint-table size="sm"></flint-table>`);
        expect(el.getAttribute('size')).toBe('sm');
    });

    it('size defaults to md', async () => {
        const el = await fixture<FlintTable>(html`<flint-table></flint-table>`);
        expect(el.size).toBe('md');
    });

    it('renders footer', async () => {
        const el = await fixture<FlintTable>(html`
            <flint-table>
                <flint-table-footer>
                    <flint-table-row><flint-table-cell>Total</flint-table-cell></flint-table-row>
                </flint-table-footer>
            </flint-table>
        `);
        expect(el.querySelector('flint-table-footer flint-table-cell')!.textContent).toBe('Total');
    });
});

/* ------------------------------------------------------------------ */
/*  FlintTableBody (striped)                                               */
/* ------------------------------------------------------------------ */

describe('flint-table-body', () => {
    it('striped attr reflects', async () => {
        const el = await fixture<FlintTableBody>(html`<flint-table-body striped></flint-table-body>`);
        expect(el.hasAttribute('striped')).toBe(true);
        expect(el.striped).toBe(true);
    });

    it('striped defaults to false', async () => {
        const el = await fixture<FlintTableBody>(html`<flint-table-body></flint-table-body>`);
        expect(el.striped).toBe(false);
    });
});

/* ------------------------------------------------------------------ */
/*  FlintTableRow                                                          */
/* ------------------------------------------------------------------ */

describe('flint-table-row', () => {
    it('selected attr reflects', async () => {
        const el = await fixture<FlintTableRow>(html`<flint-table-row selected></flint-table-row>`);
        expect(el.hasAttribute('selected')).toBe(true);
        expect(el.selected).toBe(true);
    });

    it('hover attr reflects', async () => {
        const el = await fixture<FlintTableRow>(html`<flint-table-row hover></flint-table-row>`);
        expect(el.hasAttribute('hover')).toBe(true);
        expect(el.hover).toBe(true);
    });

    it('selected defaults to false', async () => {
        const el = await fixture<FlintTableRow>(html`<flint-table-row></flint-table-row>`);
        expect(el.selected).toBe(false);
    });

    it('selected can be toggled programmatically', async () => {
        const el = await fixture<FlintTableRow>(html`<flint-table-row></flint-table-row>`);
        el.selected = true;
        await el.updateComplete;
        expect(el.hasAttribute('selected')).toBe(true);
        el.selected = false;
        await el.updateComplete;
        expect(el.hasAttribute('selected')).toBe(false);
    });
});

/* ------------------------------------------------------------------ */
/*  FlintTableCell                                                         */
/* ------------------------------------------------------------------ */

describe('flint-table-cell', () => {
    it('header attr reflects', async () => {
        const el = await fixture<FlintTableCell>(html`<flint-table-cell header>H</flint-table-cell>`);
        expect(el.hasAttribute('header')).toBe(true);
    });

    it('align right reflects', async () => {
        const el = await fixture<FlintTableCell>(html`<flint-table-cell align="right">Content</flint-table-cell>`);
        expect(el.getAttribute('align')).toBe('right');
    });

    it('align center reflects', async () => {
        const el = await fixture<FlintTableCell>(html`<flint-table-cell align="center">Content</flint-table-cell>`);
        expect(el.getAttribute('align')).toBe('center');
    });

    it('align defaults to left', async () => {
        const el = await fixture<FlintTableCell>(html`<flint-table-cell>Content</flint-table-cell>`);
        expect(el.align).toBe('left');
    });

    it('padding checkbox reflects', async () => {
        const el = await fixture<FlintTableCell>(html`<flint-table-cell padding="checkbox"></flint-table-cell>`);
        expect(el.getAttribute('padding')).toBe('checkbox');
    });

    it('padding none reflects', async () => {
        const el = await fixture<FlintTableCell>(html`<flint-table-cell padding="none"></flint-table-cell>`);
        expect(el.getAttribute('padding')).toBe('none');
    });

    it('padding defaults to normal', async () => {
        const el = await fixture<FlintTableCell>(html`<flint-table-cell></flint-table-cell>`);
        expect(el.padding).toBe('normal');
    });
});

/* ------------------------------------------------------------------ */
/*  FlintTableSortLabel                                                    */
/* ------------------------------------------------------------------ */

describe('flint-table-sort-label', () => {
    it('active attr reflects', async () => {
        const el = await fixture<FlintTableSortLabel>(html`<flint-table-sort-label active>Sort</flint-table-sort-label>`);
        expect(el.hasAttribute('active')).toBe(true);
        expect(el.active).toBe(true);
    });

    it('direction asc (default)', async () => {
        const el = await fixture<FlintTableSortLabel>(html`<flint-table-sort-label>Sort</flint-table-sort-label>`);
        expect(el.direction).toBe('asc');
    });

    it('direction desc', async () => {
        const el = await fixture<FlintTableSortLabel>(html`<flint-table-sort-label direction="desc">Sort</flint-table-sort-label>`);
        expect(el.getAttribute('direction')).toBe('desc');
    });

    it('icon has desc class when direction is desc', async () => {
        const el = await fixture<FlintTableSortLabel>(html`
            <flint-table-sort-label active direction="desc">Sort</flint-table-sort-label>
        `);
        const icon = el.shadowRoot!.querySelector('.icon');
        expect(icon!.classList.contains('desc')).toBe(true);
        expect(icon!.classList.contains('asc')).toBe(false);
    });

    it('icon has asc class when direction is asc', async () => {
        const el = await fixture<FlintTableSortLabel>(html`
            <flint-table-sort-label active direction="asc">Sort</flint-table-sort-label>
        `);
        const icon = el.shadowRoot!.querySelector('.icon');
        expect(icon!.classList.contains('asc')).toBe(true);
    });
});

/* ------------------------------------------------------------------ */
/*  FlintTablePagination                                                   */
/* ------------------------------------------------------------------ */

describe('flint-table-pagination', () => {
    it('dispatches flint-pagination-page-change on next click', async () => {
        const pageHandler = vi.fn();
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${100} .page=${1} @flint-pagination-page-change=${pageHandler}></flint-table-pagination>
        `);
        el.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="Next page"]')!.click();
        expect(pageHandler).toHaveBeenCalled();
        expect(pageHandler.mock.calls[0][0].detail.page).toBe(2);
    });

    it('dispatches flint-pagination-page-change on previous click', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${100} .page=${3} @flint-pagination-page-change=${handler}></flint-table-pagination>
        `);
        el.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="Previous page"]')!.click();
        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.page).toBe(2);
    });

    it('prev button disabled on first page', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${100} .page=${0}></flint-table-pagination>
        `);
        const prev = el.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="Previous page"]')!;
        expect(prev.disabled).toBe(true);
    });

    it('next button disabled on last page', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${10} .page=${0} .rowsPerPage=${10}></flint-table-pagination>
        `);
        const next = el.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="Next page"]')!;
        expect(next.disabled).toBe(true);
    });

    it('dispatches flint-pagination-rows-per-page-change when select changes', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${100} .page=${0} @flint-pagination-rows-per-page-change=${handler}></flint-table-pagination>
        `);
        const select = el.shadowRoot!.querySelector<HTMLSelectElement>('select')!;
        select.value = '25';
        select.dispatchEvent(new Event('change'));
        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.rowsPerPage).toBe(25);
    });

    it('renders custom labelRowsPerPage', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${10} label-rows-per-page="Per page:"></flint-table-pagination>
        `);
        expect(el.shadowRoot!.textContent).toContain('Per page:');
    });

    it('shows first/last buttons when show-first-last is set', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${100} .page=${3} show-first-last></flint-table-pagination>
        `);
        expect(el.shadowRoot!.querySelector('button[aria-label="First page"]')).toBeTruthy();
        expect(el.shadowRoot!.querySelector('button[aria-label="Last page"]')).toBeTruthy();
    });

    it('first page button dispatches flint-pagination-page-change with 0', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${100} .page=${5} show-first-last @flint-pagination-page-change=${handler}></flint-table-pagination>
        `);
        el.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="First page"]')!.click();
        expect(handler.mock.calls[0][0].detail.page).toBe(0);
    });

    it('last page button dispatches flint-pagination-page-change with last page index', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${100} .page=${0} .rowsPerPage=${10} show-first-last @flint-pagination-page-change=${handler}></flint-table-pagination>
        `);
        el.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="Last page"]')!.click();
        expect(handler.mock.calls[0][0].detail.page).toBe(9);
    });

    it('first/last buttons absent by default', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${100} .page=${3}></flint-table-pagination>
        `);
        expect(el.shadowRoot!.querySelector('button[aria-label="First page"]')).toBeNull();
        expect(el.shadowRoot!.querySelector('button[aria-label="Last page"]')).toBeNull();
    });

    it('custom rowsPerPageOptions renders correct options', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${100} .rowsPerPageOptions=${[10, 20, 50]}></flint-table-pagination>
        `);
        const options = el.shadowRoot!.querySelectorAll('option');
        expect(options.length).toBe(3);
        expect(options[2].value).toBe('50');
    });

    it('defaultPage sets initial page for uncontrolled use', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${100} default-page="3"></flint-table-pagination>
        `);
        // The displayed range should start at 3*10+1 = 31
        expect(el.shadowRoot!.textContent).toContain('31');
    });

    // ── Mutation-killing: from/to/count display ───────────────────────────────

    it('displays correct from-to-of-count on first page', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${100} .page=${0} .rowsPerPage=${10}></flint-table-pagination>
        `);
        await el.updateComplete;
        expect(el.shadowRoot!.textContent).toContain('1-10 of 100');
    });

    it('displays correct from-to-of-count on second page', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${100} .page=${1} .rowsPerPage=${10}></flint-table-pagination>
        `);
        await el.updateComplete;
        expect(el.shadowRoot!.textContent).toContain('11-20 of 100');
    });

    it('displays correct from-to-of-count on last partial page', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${95} .page=${9} .rowsPerPage=${10}></flint-table-pagination>
        `);
        await el.updateComplete;
        // page 9: from=91, to=min(95, 100)=95
        expect(el.shadowRoot!.textContent).toContain('91-95 of 95');
    });

    it('next button disabled exactly on last page (isLast = to >= count)', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${30} .page=${2} .rowsPerPage=${10}></flint-table-pagination>
        `);
        await el.updateComplete;
        // page 2: to = min(30, 30) = 30 >= 30 → isLast = true
        const next = el.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="Next page"]')!;
        expect(next.disabled).toBe(true);
    });

    it('next button enabled one page before last', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${30} .page=${1} .rowsPerPage=${10}></flint-table-pagination>
        `);
        await el.updateComplete;
        // page 1: to = min(30, 20) = 20; 20 < 30 → isLast = false
        const next = el.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="Next page"]')!;
        expect(next.disabled).toBe(false);
    });

    it('flint-pagination-rows-per-page-change resets page to 0 and fires event', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${100} .page=${5} @flint-pagination-rows-per-page-change=${handler}></flint-table-pagination>
        `);
        const select = el.shadowRoot!.querySelector<HTMLSelectElement>('select')!;
        select.value = '25';
        select.dispatchEvent(new Event('change'));
        await el.updateComplete;
        // After rows change, page resets to 0 — display should show "1-..."
        expect(el.shadowRoot!.textContent).toContain('1-');
    });

    it('_lastPage: last page button dispatches correct page for non-round count', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${95} .page=${0} .rowsPerPage=${10} show-first-last @flint-pagination-page-change=${handler}></flint-table-pagination>
        `);
        el.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="Last page"]')!.click();
        // ceil(95/10) - 1 = 10 - 1 = 9
        expect(handler.mock.calls[0][0].detail.page).toBe(9);
    });

    it('_lastPage: last page button disabled when count=0 (isLast=true)', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${0} .page=${0} .rowsPerPage=${10} show-first-last></flint-table-pagination>
        `);
        await el.updateComplete;
        // count=0 → isLast=true → Last and Next buttons both disabled
        const last = el.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="Last page"]')!;
        expect(last.disabled).toBe(true);
    });

    it('defaultRowsPerPage > 0 uses that value over rowsPerPage', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${100} default-rows-per-page="25"></flint-table-pagination>
        `);
        await el.updateComplete;
        // display should show 1-25 of 100
        expect(el.shadowRoot!.textContent).toContain('1-25 of 100');
    });

    it('defaultRowsPerPage=0 falls back to rowsPerPage', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${100} .rowsPerPage=${5} default-rows-per-page="0"></flint-table-pagination>
        `);
        await el.updateComplete;
        // defaultRowsPerPage=0 (not > 0) → falls back to rowsPerPage=5
        expect(el.shadowRoot!.textContent).toContain('1-5 of 100');
    });

    it('flint-pagination-page-change event detail has correct value for _go(1)', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${100} .page=${3} @flint-pagination-page-change=${handler}></flint-table-pagination>
        `);
        el.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="Next page"]')!.click();
        expect(handler.mock.calls[0][0].detail.page).toBe(4);
    });

    it('flint-pagination-page-change event detail has correct value for _go(-1)', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${100} .page=${3} @flint-pagination-page-change=${handler}></flint-table-pagination>
        `);
        el.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="Previous page"]')!.click();
        expect(handler.mock.calls[0][0].detail.page).toBe(2);
    });

    it('syncs _page when page prop changes after first render', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${100} .page=${0} .rowsPerPage=${10}></flint-table-pagination>
        `);
        await el.updateComplete;
        expect(el.shadowRoot!.textContent).toContain('1-10 of 100');
        el.page = 4;
        await el.updateComplete;
        expect(el.shadowRoot!.textContent).toContain('41-50 of 100');
    });

    it('syncs _rowsPerPage when rowsPerPage prop changes after first render', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${100} .page=${0} .rowsPerPage=${10}></flint-table-pagination>
        `);
        await el.updateComplete;
        expect(el.shadowRoot!.textContent).toContain('1-10 of 100');
        el.rowsPerPage = 25;
        await el.updateComplete;
        expect(el.shadowRoot!.textContent).toContain('1-25 of 100');
    });
});

/* ------------------------------------------------------------------ */
/*  FlintTableSortLabel (mutation-killing additions)                       */
/* ------------------------------------------------------------------ */

describe('flint-table-sort-label mutations', () => {
    it('icon has asc class when direction=asc (regardless of active)', async () => {
        const el = await fixture<FlintTableSortLabel>(html`
            <flint-table-sort-label direction="asc">Col</flint-table-sort-label>
        `);
        const icon = el.shadowRoot!.querySelector('.icon')!;
        expect(icon.classList.contains('asc')).toBe(true);
        expect(icon.classList.contains('desc')).toBe(false);
    });

    it('icon has desc class when direction=desc (regardless of active)', async () => {
        const el = await fixture<FlintTableSortLabel>(html`
            <flint-table-sort-label direction="desc">Col</flint-table-sort-label>
        `);
        const icon = el.shadowRoot!.querySelector('.icon')!;
        expect(icon.classList.contains('desc')).toBe(true);
        expect(icon.classList.contains('asc')).toBe(false);
    });

    it('active defaults to false', async () => {
        const el = await fixture<FlintTableSortLabel>(html`
            <flint-table-sort-label>Col</flint-table-sort-label>
        `);
        expect(el.active).toBe(false);
        expect(el.hasAttribute('active')).toBe(false);
    });

    it('active=true reflects to attribute', async () => {
        const el = await fixture<FlintTableSortLabel>(html`
            <flint-table-sort-label active>Col</flint-table-sort-label>
        `);
        expect(el.active).toBe(true);
        expect(el.hasAttribute('active')).toBe(true);
    });

    it('direction defaults to asc', async () => {
        const el = await fixture<FlintTableSortLabel>(html`
            <flint-table-sort-label>Col</flint-table-sort-label>
        `);
        expect(el.direction).toBe('asc');
    });

    it('programmatic direction change to desc updates icon class', async () => {
        const el = await fixture<FlintTableSortLabel>(html`
            <flint-table-sort-label direction="asc">Col</flint-table-sort-label>
        `);
        el.direction = 'desc';
        await el.updateComplete;
        const icon = el.shadowRoot!.querySelector('.icon')!;
        expect(icon.classList.contains('desc')).toBe(true);
        expect(icon.classList.contains('asc')).toBe(false);
    });
});

/* ------------------------------------------------------------------ */
/*  Table component programmatic toggles                                */
/* ------------------------------------------------------------------ */

describe('flint-table-container programmatic toggles', () => {
    it('stickyHeader can be toggled programmatically', async () => {
        const el = await fixture<FlintTableContainer>(html`<flint-table-container></flint-table-container>`);
        expect(el.stickyHeader).toBe(false);
        el.stickyHeader = true;
        await el.updateComplete;
        expect(el.hasAttribute('sticky-header')).toBe(true);
        el.stickyHeader = false;
        await el.updateComplete;
        expect(el.hasAttribute('sticky-header')).toBe(false);
    });

    it('shadow can be toggled programmatically', async () => {
        const el = await fixture<FlintTableContainer>(html`<flint-table-container></flint-table-container>`);
        el.shadow = true;
        await el.updateComplete;
        expect(el.hasAttribute('shadow')).toBe(true);
        el.shadow = false;
        await el.updateComplete;
        expect(el.hasAttribute('shadow')).toBe(false);
    });
});

describe('flint-table-row programmatic hover toggle', () => {
    it('hover defaults to false', async () => {
        const el = await fixture<FlintTableRow>(html`<flint-table-row></flint-table-row>`);
        expect(el.hover).toBe(false);
        expect(el.hasAttribute('hover')).toBe(false);
    });

    it('hover can be toggled programmatically', async () => {
        const el = await fixture<FlintTableRow>(html`<flint-table-row></flint-table-row>`);
        el.hover = true;
        await el.updateComplete;
        expect(el.hasAttribute('hover')).toBe(true);
        el.hover = false;
        await el.updateComplete;
        expect(el.hasAttribute('hover')).toBe(false);
    });
});

describe('flint-table size programmatic change', () => {
    it('size can be changed to sm programmatically', async () => {
        const el = await fixture<FlintTable>(html`<flint-table></flint-table>`);
        expect(el.size).toBe('md');
        el.size = 'sm';
        await el.updateComplete;
        expect(el.getAttribute('size')).toBe('sm');
    });
});

describe('flint-table-cell programmatic changes', () => {
    it('header can be toggled programmatically', async () => {
        const el = await fixture<FlintTableCell>(html`<flint-table-cell>H</flint-table-cell>`);
        el.header = true;
        await el.updateComplete;
        expect(el.hasAttribute('header')).toBe(true);
        el.header = false;
        await el.updateComplete;
        expect(el.hasAttribute('header')).toBe(false);
    });

    it('align can be changed programmatically', async () => {
        const el = await fixture<FlintTableCell>(html`<flint-table-cell>C</flint-table-cell>`);
        el.align = 'center';
        await el.updateComplete;
        expect(el.getAttribute('align')).toBe('center');
        el.align = 'right';
        await el.updateComplete;
        expect(el.getAttribute('align')).toBe('right');
    });

    it('padding can be changed programmatically', async () => {
        const el = await fixture<FlintTableCell>(html`<flint-table-cell>C</flint-table-cell>`);
        el.padding = 'checkbox';
        await el.updateComplete;
        expect(el.getAttribute('padding')).toBe('checkbox');
        el.padding = 'none';
        await el.updateComplete;
        expect(el.getAttribute('padding')).toBe('none');
        el.padding = 'normal';
        await el.updateComplete;
        expect(el.getAttribute('padding')).toBe('normal');
    });
});

// ── Accessibility ─────────────────────────────────────────────────────────

describe('flint-table a11y', () => {
    it('should pass automated a11y checks', async () => {
        const el = await fixture(html`
            <flint-table-container>
                <flint-table>
                    <flint-table-head>
                        <flint-table-row>
                            <flint-table-cell>Name</flint-table-cell>
                            <flint-table-cell>Value</flint-table-cell>
                        </flint-table-row>
                    </flint-table-head>
                    <flint-table-body>
                        <flint-table-row>
                            <flint-table-cell>Item</flint-table-cell>
                            <flint-table-cell>123</flint-table-cell>
                        </flint-table-row>
                    </flint-table-body>
                </flint-table>
            </flint-table-container>
        `);
        await expectAccessible(el);
    }, 15000);
});
