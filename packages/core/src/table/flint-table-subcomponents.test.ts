import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-table-pagination.js';
import './flint-table-sort-label.js';
import type { FlintTablePagination } from './flint-table-pagination';
import type { FlintTableSortLabel } from './flint-table-sort-label';

/* ------------------------------------------------------------------ */
/*  FlintTablePagination                                               */
/* ------------------------------------------------------------------ */

describe('flint-table-pagination', () => {
    /* ── Default render ─────────────────────────────────────────────── */

    it('renders with default properties', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination></flint-table-pagination>
        `);
        expect(el.count).toBe(0);
        expect(el.page).toBe(0);
        expect(el.rowsPerPage).toBe(10);
        expect(el.showFirstLast).toBe(false);
        expect(el.labelRowsPerPage).toBeUndefined();
    });

    it('renders a select element and nav buttons', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${50}></flint-table-pagination>
        `);
        expect(el.shadowRoot!.querySelector('select')).toBeTruthy();
        expect(el.shadowRoot!.querySelector('button[aria-label="Previous page"]')).toBeTruthy();
        expect(el.shadowRoot!.querySelector('button[aria-label="Next page"]')).toBeTruthy();
    });

    /* ── Properties ─────────────────────────────────────────────────── */

    it('count property is reflected in display', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${200} .page=${0} .rowsPerPage=${10}></flint-table-pagination>
        `);
        await el.updateComplete;
        expect(el.shadowRoot!.textContent).toContain('of 200');
    });

    it('page property controls displayed range', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${100} .page=${2} .rowsPerPage=${10}></flint-table-pagination>
        `);
        await el.updateComplete;
        expect(el.shadowRoot!.textContent).toContain('21-30 of 100');
    });

    it('rowsPerPage property controls page size in display', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${100} .page=${0} .rowsPerPage=${25}></flint-table-pagination>
        `);
        await el.updateComplete;
        expect(el.shadowRoot!.textContent).toContain('1-25 of 100');
    });

    it('rowsPerPageOptions renders correct number of options', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${100} .rowsPerPageOptions=${[5, 10, 25, 50, 100]}></flint-table-pagination>
        `);
        const options = el.shadowRoot!.querySelectorAll('option');
        expect(options.length).toBe(5);
        expect(options[0].value).toBe('5');
        expect(options[1].value).toBe('10');
        expect(options[4].value).toBe('100');
    });

    it('selected option matches current rowsPerPage', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${100} .rowsPerPage=${25} .rowsPerPageOptions=${[10, 25, 50]}></flint-table-pagination>
        `);
        const options = el.shadowRoot!.querySelectorAll('option');
        expect(options[1].selected).toBe(true);
    });

    /* ── Page navigation ────────────────────────────────────────────── */

    it('next button advances page by 1', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${100} .page=${0} @flint-pagination-page-change=${handler}></flint-table-pagination>
        `);
        el.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="Next page"]')!.click();
        expect(handler).toHaveBeenCalledOnce();
        expect(handler.mock.calls[0][0].detail.page).toBe(1);
    });

    it('prev button goes back by 1', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${100} .page=${5} @flint-pagination-page-change=${handler}></flint-table-pagination>
        `);
        el.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="Previous page"]')!.click();
        expect(handler).toHaveBeenCalledOnce();
        expect(handler.mock.calls[0][0].detail.page).toBe(4);
    });

    it('first page button navigates to page 0', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${100} .page=${7} show-first-last @flint-pagination-page-change=${handler}></flint-table-pagination>
        `);
        el.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="First page"]')!.click();
        expect(handler.mock.calls[0][0].detail.page).toBe(0);
    });

    it('last page button navigates to final page', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${55} .page=${0} .rowsPerPage=${10} show-first-last @flint-pagination-page-change=${handler}></flint-table-pagination>
        `);
        el.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="Last page"]')!.click();
        // ceil(55/10) - 1 = 5
        expect(handler.mock.calls[0][0].detail.page).toBe(5);
    });

    it('prev button is disabled on page 0', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${50} .page=${0}></flint-table-pagination>
        `);
        const prev = el.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="Previous page"]')!;
        expect(prev.disabled).toBe(true);
    });

    it('next button is disabled on the last page', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${20} .page=${1} .rowsPerPage=${10}></flint-table-pagination>
        `);
        const next = el.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="Next page"]')!;
        expect(next.disabled).toBe(true);
    });

    it('first page button is disabled on page 0', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${100} .page=${0} show-first-last></flint-table-pagination>
        `);
        const first = el.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="First page"]')!;
        expect(first.disabled).toBe(true);
    });

    it('last page button is disabled on last page', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${20} .page=${1} .rowsPerPage=${10} show-first-last></flint-table-pagination>
        `);
        const last = el.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="Last page"]')!;
        expect(last.disabled).toBe(true);
    });

    it('both prev and next enabled on a middle page', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${100} .page=${5} .rowsPerPage=${10}></flint-table-pagination>
        `);
        const prev = el.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="Previous page"]')!;
        const next = el.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="Next page"]')!;
        expect(prev.disabled).toBe(false);
        expect(next.disabled).toBe(false);
    });

    /* ── Events ─────────────────────────────────────────────────────── */

    it('flint-pagination-page-change event bubbles and is composed', async () => {
        let event: CustomEvent | null = null;
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${100} .page=${0}></flint-table-pagination>
        `);
        el.addEventListener('flint-pagination-page-change', (e) => { event = e as CustomEvent; });
        el.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="Next page"]')!.click();
        expect(event).toBeTruthy();
        expect(event!.bubbles).toBe(true);
        expect(event!.composed).toBe(true);
    });

    it('flint-pagination-rows-per-page-change fires on select change', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${100} .page=${0} @flint-pagination-rows-per-page-change=${handler}></flint-table-pagination>
        `);
        const select = el.shadowRoot!.querySelector<HTMLSelectElement>('select')!;
        select.value = '25';
        select.dispatchEvent(new Event('change'));
        expect(handler).toHaveBeenCalledOnce();
        expect(handler.mock.calls[0][0].detail.rowsPerPage).toBe(25);
    });

    it('rows-per-page change resets internal page to 0', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${100} .page=${5} .rowsPerPage=${10}></flint-table-pagination>
        `);
        const select = el.shadowRoot!.querySelector<HTMLSelectElement>('select')!;
        select.value = '25';
        select.dispatchEvent(new Event('change'));
        await el.updateComplete;
        expect(el.shadowRoot!.textContent).toContain('1-');
    });

    it('flint-pagination-rows-per-page-change event bubbles and is composed', async () => {
        let event: CustomEvent | null = null;
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${100} .page=${0}></flint-table-pagination>
        `);
        el.addEventListener('flint-pagination-rows-per-page-change', (e) => { event = e as CustomEvent; });
        const select = el.shadowRoot!.querySelector<HTMLSelectElement>('select')!;
        select.value = '5';
        select.dispatchEvent(new Event('change'));
        expect(event).toBeTruthy();
        expect(event!.bubbles).toBe(true);
        expect(event!.composed).toBe(true);
    });

    /* ── Display edge cases ─────────────────────────────────────────── */

    it('displays 0-0 of 0 when count is 0', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${0} .page=${0} .rowsPerPage=${10}></flint-table-pagination>
        `);
        await el.updateComplete;
        expect(el.shadowRoot!.textContent).toContain('of 0');
    });

    it('clamps to on partial last page', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${43} .page=${4} .rowsPerPage=${10}></flint-table-pagination>
        `);
        await el.updateComplete;
        expect(el.shadowRoot!.textContent).toContain('41-43 of 43');
    });

    it('labelRowsPerPage customizes label text', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${10} label-rows-per-page="Items per page:"></flint-table-pagination>
        `);
        expect(el.shadowRoot!.textContent).toContain('Items per page:');
    });

    it('select has aria-label matching labelRowsPerPage', async () => {
        const el = await fixture<FlintTablePagination>(html`
            <flint-table-pagination .count=${10} label-rows-per-page="Show:"></flint-table-pagination>
        `);
        const select = el.shadowRoot!.querySelector('select')!;
        expect(select.getAttribute('aria-label')).toBe('Show:');
    });
});

/* ------------------------------------------------------------------ */
/*  FlintTableSortLabel                                                */
/* ------------------------------------------------------------------ */

describe('flint-table-sort-label', () => {
    /* ── Default render ─────────────────────────────────────────────── */

    it('renders with default properties', async () => {
        const el = await fixture<FlintTableSortLabel>(html`
            <flint-table-sort-label>Column</flint-table-sort-label>
        `);
        expect(el.active).toBe(false);
        expect(el.direction).toBe('asc');
    });

    it('renders a slot for label content', async () => {
        const el = await fixture<FlintTableSortLabel>(html`
            <flint-table-sort-label>Name</flint-table-sort-label>
        `);
        const slot = el.shadowRoot!.querySelector('slot');
        expect(slot).toBeTruthy();
    });

    it('renders an SVG icon', async () => {
        const el = await fixture<FlintTableSortLabel>(html`
            <flint-table-sort-label>Col</flint-table-sort-label>
        `);
        const svg = el.shadowRoot!.querySelector('svg');
        expect(svg).toBeTruthy();
    });

    /* ── Properties ─────────────────────────────────────────────────── */

    it('active reflects to attribute', async () => {
        const el = await fixture<FlintTableSortLabel>(html`
            <flint-table-sort-label active>Col</flint-table-sort-label>
        `);
        expect(el.hasAttribute('active')).toBe(true);
        expect(el.active).toBe(true);
    });

    it('active can be set programmatically', async () => {
        const el = await fixture<FlintTableSortLabel>(html`
            <flint-table-sort-label>Col</flint-table-sort-label>
        `);
        el.active = true;
        await el.updateComplete;
        expect(el.hasAttribute('active')).toBe(true);
    });

    it('direction defaults to asc', async () => {
        const el = await fixture<FlintTableSortLabel>(html`
            <flint-table-sort-label>Col</flint-table-sort-label>
        `);
        expect(el.direction).toBe('asc');
    });

    it('direction can be set to desc via attribute', async () => {
        const el = await fixture<FlintTableSortLabel>(html`
            <flint-table-sort-label direction="desc">Col</flint-table-sort-label>
        `);
        expect(el.direction).toBe('desc');
    });

    it('direction can be toggled programmatically', async () => {
        const el = await fixture<FlintTableSortLabel>(html`
            <flint-table-sort-label direction="asc">Col</flint-table-sort-label>
        `);
        el.direction = 'desc';
        await el.updateComplete;
        expect(el.direction).toBe('desc');
        const icon = el.shadowRoot!.querySelector('.icon')!;
        expect(icon.classList.contains('desc')).toBe(true);
        expect(icon.classList.contains('asc')).toBe(false);
    });

    /* ── ARIA attributes ────────────────────────────────────────────── */

    it('sets aria-sort to none when not active', async () => {
        const el = await fixture<FlintTableSortLabel>(html`
            <flint-table-sort-label>Col</flint-table-sort-label>
        `);
        await el.updateComplete;
        expect(el._internals?.ariaSort).toBe('none');
    });

    it('sets aria-sort to ascending when active and direction is asc', async () => {
        const el = await fixture<FlintTableSortLabel>(html`
            <flint-table-sort-label active direction="asc">Col</flint-table-sort-label>
        `);
        await el.updateComplete;
        expect(el._internals?.ariaSort).toBe('ascending');
    });

    it('sets aria-sort to descending when active and direction is desc', async () => {
        const el = await fixture<FlintTableSortLabel>(html`
            <flint-table-sort-label active direction="desc">Col</flint-table-sort-label>
        `);
        await el.updateComplete;
        expect(el._internals?.ariaSort).toBe('descending');
    });

    it('updates aria-sort when active changes programmatically', async () => {
        const el = await fixture<FlintTableSortLabel>(html`
            <flint-table-sort-label direction="asc">Col</flint-table-sort-label>
        `);
        await el.updateComplete;
        expect(el._internals?.ariaSort).toBe('none');
        el.active = true;
        await el.updateComplete;
        expect(el._internals?.ariaSort).toBe('ascending');
    });

    it('updates aria-sort when direction changes programmatically', async () => {
        const el = await fixture<FlintTableSortLabel>(html`
            <flint-table-sort-label active direction="asc">Col</flint-table-sort-label>
        `);
        await el.updateComplete;
        expect(el._internals?.ariaSort).toBe('ascending');
        el.direction = 'desc';
        await el.updateComplete;
        expect(el._internals?.ariaSort).toBe('descending');
    });

    /* ── Icon CSS classes (sort direction indicator) ─────────────────── */

    it('icon has asc class when direction is asc', async () => {
        const el = await fixture<FlintTableSortLabel>(html`
            <flint-table-sort-label active direction="asc">Col</flint-table-sort-label>
        `);
        const icon = el.shadowRoot!.querySelector('.icon')!;
        expect(icon.classList.contains('asc')).toBe(true);
        expect(icon.classList.contains('desc')).toBe(false);
    });

    it('icon has desc class when direction is desc', async () => {
        const el = await fixture<FlintTableSortLabel>(html`
            <flint-table-sort-label active direction="desc">Col</flint-table-sort-label>
        `);
        const icon = el.shadowRoot!.querySelector('.icon')!;
        expect(icon.classList.contains('desc')).toBe(true);
        expect(icon.classList.contains('asc')).toBe(false);
    });

    it('icon always has the icon class', async () => {
        const el = await fixture<FlintTableSortLabel>(html`
            <flint-table-sort-label>Col</flint-table-sort-label>
        `);
        const icon = el.shadowRoot!.querySelector('.icon')!;
        expect(icon.classList.contains('icon')).toBe(true);
    });
});
