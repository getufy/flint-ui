import { describe, it, expect, vi } from 'vitest';
import { fixture, html, oneEvent } from '@open-wc/testing';
import { expectAccessible } from '../test-utils/axe';
import './flint-pagination.js';
import { buildPages } from './flint-pagination.js';
import type { FlintPagination } from './flint-pagination.js';

/* ── buildPages unit tests ──────────────────────────────────────────── */
describe('buildPages', () => {
    it('count=1 returns [1]', () => {
        expect(buildPages(1, 1, 1, 1)).toEqual([1]);
    });

    it('count=0 returns []', () => {
        expect(buildPages(0, 1, 1, 1)).toEqual([]);
    });

    it('page > count clamps to last page siblings', () => {
        // page=20 on count=10 — should not throw
        const items = buildPages(10, 20, 1, 1);
        expect(items.every(i => i === 'start-ellipsis' || i === 'end-ellipsis' || (i >= 1 && i <= 10))).toBe(true);
    });

    it('siblingCount=0 shows minimal items', () => {
        const items = buildPages(11, 6, 0, 1);
        expect(items).toContain('start-ellipsis');
        expect(items).toContain('end-ellipsis');
        // only page 6 in the middle
        const nums = items.filter((i): i is number => typeof i === 'number');
        expect(nums).toContain(6);
    });

    it('boundaryCount=0 shows no boundary pages', () => {
        const items = buildPages(10, 5, 1, 0);
        expect(items).not.toContain(1);
        expect(items).not.toContain(10);
    });

    it('boundaryCount=2 shows 2 pages at each end', () => {
        const items = buildPages(11, 6, 1, 2);
        expect(items).toContain(1);
        expect(items).toContain(2);
        expect(items).toContain(10);
        expect(items).toContain(11);
    });

    it('no duplicates in result', () => {
        const items = buildPages(5, 3, 1, 1);
        const nums = items.filter((i): i is number => typeof i === 'number');
        expect(nums.length).toBe(new Set(nums).size);
    });
});

/* ── flint-pagination component tests ─────────────────────────────────── */
describe('flint-pagination', () => {
    it('is defined', () => {
        expect(document.createElement('flint-pagination')).toBeInstanceOf(HTMLElement);
    });

    it('defaults to page 1, count 1', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination></flint-pagination>`);
        expect(el.page).toBe(1);
        expect(el.count).toBe(1);
    });

    it('renders page buttons for count=5', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" page="1"></flint-pagination>`);
        const btns = el.shadowRoot!.querySelectorAll('.page-btn:not(.ellipsis)');
        // prev + 5 pages + next = 7
        expect(btns.length).toBe(7);
    });

    it('marks the current page as active', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" page="3"></flint-pagination>`);
        const active = el.shadowRoot!.querySelector('.page-btn.active');
        expect(active?.textContent?.trim()).toBe('3');
    });

    it('sets aria-current="page" on active button only', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" page="3"></flint-pagination>`);
        const withCurrent = el.shadowRoot!.querySelectorAll('[aria-current="page"]');
        expect(withCurrent.length).toBe(1);
        expect(withCurrent[0].textContent?.trim()).toBe('3');
        // inactive page has no aria-current
        const page1 = Array.from(el.shadowRoot!.querySelectorAll('.page-btn'))
            .find(b => b.textContent?.trim() === '1');
        expect(page1?.hasAttribute('aria-current')).toBe(false);
    });

    it('fires flint-pagination-change when a page button is clicked', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" page="1"></flint-pagination>`);
        const btns = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.page-btn:not(.ellipsis)');
        const page3 = Array.from(btns).find(b => b.textContent?.trim() === '3')!;
        setTimeout(() => page3.click());
        const event = await oneEvent(el, 'flint-pagination-change') as CustomEvent;
        expect(event.detail.page).toBe(3);
    });

    it('event is bubbles=true and composed=true', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" page="1"></flint-pagination>`);
        const page2 = Array.from(el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.page-btn'))
            .find(b => b.textContent?.trim() === '2')!;
        setTimeout(() => page2.click());
        const event = await oneEvent(el, 'flint-pagination-change') as CustomEvent;
        expect(event.bubbles).toBe(true);
        expect(event.composed).toBe(true);
    });

    it('clicking the active page does NOT fire event', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" page="3"></flint-pagination>`);
        const spy = vi.fn();
        el.addEventListener('flint-pagination-change', spy);
        const activeBtn = el.shadowRoot!.querySelector<HTMLButtonElement>('.page-btn.active')!;
        activeBtn.click();
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });

    it('fires flint-pagination-change on next click', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" page="2"></flint-pagination>`);
        const next = el.shadowRoot!.querySelector('.page-btn[aria-label="Next page"]') as HTMLButtonElement;
        setTimeout(() => next.click());
        const event = await oneEvent(el, 'flint-pagination-change') as CustomEvent;
        expect(event.detail.page).toBe(3);
    });

    it('prev button is disabled on page 1', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" page="1"></flint-pagination>`);
        const prev = el.shadowRoot!.querySelector('.page-btn[aria-label="Previous page"]') as HTMLButtonElement;
        expect(prev.disabled).toBe(true);
    });

    it('next button is disabled on last page', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" page="5"></flint-pagination>`);
        const next = el.shadowRoot!.querySelector('.page-btn[aria-label="Next page"]') as HTMLButtonElement;
        expect(next.disabled).toBe(true);
    });

    it('shows first/last buttons when showFirstButton/showLastButton are set', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" page="3" show-first-button show-last-button></flint-pagination>`);
        const first = el.shadowRoot!.querySelector('.page-btn[aria-label="First page"]');
        const last = el.shadowRoot!.querySelector('.page-btn[aria-label="Last page"]');
        expect(first).not.toBeNull();
        expect(last).not.toBeNull();
    });

    it('first button fires event with page=1', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="10" page="7" show-first-button></flint-pagination>`);
        const first = el.shadowRoot!.querySelector<HTMLButtonElement>('.page-btn[aria-label="First page"]')!;
        setTimeout(() => first.click());
        const event = await oneEvent(el, 'flint-pagination-change') as CustomEvent;
        expect(event.detail.page).toBe(1);
    });

    it('last button fires event with page=count', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="10" page="3" show-last-button></flint-pagination>`);
        const last = el.shadowRoot!.querySelector<HTMLButtonElement>('.page-btn[aria-label="Last page"]')!;
        setTimeout(() => last.click());
        const event = await oneEvent(el, 'flint-pagination-change') as CustomEvent;
        expect(event.detail.page).toBe(10);
    });

    it('first button is disabled on page 1', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" page="1" show-first-button></flint-pagination>`);
        const first = el.shadowRoot!.querySelector<HTMLButtonElement>('.page-btn[aria-label="First page"]')!;
        expect(first.disabled).toBe(true);
    });

    it('last button is disabled on last page', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" page="5" show-last-button></flint-pagination>`);
        const last = el.shadowRoot!.querySelector<HTMLButtonElement>('.page-btn[aria-label="Last page"]')!;
        expect(last.disabled).toBe(true);
    });

    it('hides prev/next when hidePrevButton/hideNextButton are set', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" page="3" hide-prev-button hide-next-button></flint-pagination>`);
        const prev = el.shadowRoot!.querySelector('.page-btn[aria-label="Previous page"]');
        const next = el.shadowRoot!.querySelector('.page-btn[aria-label="Next page"]');
        expect(prev).toBeNull();
        expect(next).toBeNull();
    });

    it('renders both start-ellipsis and end-ellipsis for mid-range pages', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="20" page="10"></flint-pagination>`);
        const ellipsis = el.shadowRoot!.querySelectorAll('.page-btn.ellipsis');
        expect(ellipsis.length).toBe(2);
    });

    it('renders only end-ellipsis near start', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="20" page="2"></flint-pagination>`);
        const ellipsis = el.shadowRoot!.querySelectorAll('.page-btn.ellipsis');
        expect(ellipsis.length).toBe(1);
    });

    it('siblingCount=2 shows more page buttons', async () => {
        const el1 = await fixture<FlintPagination>(html`<flint-pagination count="11" page="6" sibling-count="1"></flint-pagination>`);
        const el2 = await fixture<FlintPagination>(html`<flint-pagination count="11" page="6" sibling-count="2"></flint-pagination>`);
        const count1 = el1.shadowRoot!.querySelectorAll('.page-btn:not(.ellipsis)').length;
        const count2 = el2.shadowRoot!.querySelectorAll('.page-btn:not(.ellipsis)').length;
        expect(count2).toBeGreaterThan(count1);
    });

    it('reflects variant attribute', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" page="1" variant="outlined"></flint-pagination>`);
        expect(el.getAttribute('variant')).toBe('outlined');
    });

    it('reflects shape attribute', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" page="1" shape="rounded"></flint-pagination>`);
        expect(el.getAttribute('shape')).toBe('rounded');
    });

    it('reflects size attribute', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" page="1" size="lg"></flint-pagination>`);
        expect(el.getAttribute('size')).toBe('lg');
    });

    it('reflects color attribute', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" page="1" color="secondary"></flint-pagination>`);
        expect(el.getAttribute('color')).toBe('secondary');
    });

    it('all buttons disabled when disabled prop is set', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" page="3" disabled></flint-pagination>`);
        const spy = vi.fn();
        el.addEventListener('flint-pagination-change', spy);
        const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.page-btn:not(.active)');
        btn?.click();
        expect(spy).not.toHaveBeenCalled();
    });

    it('page prop change updates active button', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" page="1"></flint-pagination>`);
        el.page = 4;
        await el.updateComplete;
        const active = el.shadowRoot!.querySelector('.page-btn.active');
        expect(active?.textContent?.trim()).toBe('4');
    });

    it('count prop change updates rendered buttons', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="3" page="1"></flint-pagination>`);
        el.count = 7;
        await el.updateComplete;
        // prev + 7 pages + next = 9 non-ellipsis buttons
        const btns = el.shadowRoot!.querySelectorAll('.page-btn:not(.ellipsis)');
        expect(btns.length).toBe(9);
    });

    it('count=0 guard renders a single page 1 button', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="0" page="1"></flint-pagination>`);
        const pageBtns = el.shadowRoot!.querySelectorAll('.page-btn:not(.ellipsis)');
        // prev(disabled) + page1(active) + next(disabled)
        expect(pageBtns.length).toBe(3);
    });

    it('page > count guard clamps to last page', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" page="99"></flint-pagination>`);
        await el.updateComplete;
        const active = el.shadowRoot!.querySelector('.page-btn.active');
        expect(active?.textContent?.trim()).toBe('5');
    });

    it('defaultPage sets initial page in uncontrolled mode', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="10" default-page="5"></flint-pagination>`);
        expect(el.page).toBe(5);
        const active = el.shadowRoot!.querySelector('.page-btn.active');
        expect(active?.textContent?.trim()).toBe('5');
    });

    it('uncontrolled mode updates page on click without external handler', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" default-page="1"></flint-pagination>`);
        const page3 = Array.from(el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.page-btn'))
            .find(b => b.textContent?.trim() === '3')!;
        page3.click();
        await el.updateComplete;
        expect(el.page).toBe(3);
        const active = el.shadowRoot!.querySelector('.page-btn.active');
        expect(active?.textContent?.trim()).toBe('3');
    });

    it('custom label sets aria-label on nav', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" page="1" label="article pages"></flint-pagination>`);
        const nav = el.shadowRoot!.querySelector('nav');
        expect(nav?.getAttribute('aria-label')).toBe('article pages');
    });

    it('default nav aria-label is "pagination navigation"', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" page="1"></flint-pagination>`);
        const nav = el.shadowRoot!.querySelector('nav');
        expect(nav?.getAttribute('aria-label')).toBe('pagination navigation');
    });

    it('nav landmark is rendered', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" page="1"></flint-pagination>`);
        expect(el.shadowRoot!.querySelector('nav')).not.toBeNull();
    });

    it('ol list is rendered', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" page="1"></flint-pagination>`);
        expect(el.shadowRoot!.querySelector('ol')).not.toBeNull();
    });

    it('each page button is wrapped in an li', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="3" page="1"></flint-pagination>`);
        const lis = el.shadowRoot!.querySelectorAll('li');
        const btns = el.shadowRoot!.querySelectorAll('.page-btn');
        expect(lis.length).toBe(btns.length);
    });

    it('slotted prev-icon renders in prev button', async () => {
        const el = await fixture<FlintPagination>(html`
            <flint-pagination count="5" page="3">
                <span slot="prev-icon" id="custom-prev">PREV</span>
            </flint-pagination>
        `);
        const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="prev-icon"]')!;
        const assigned = slot.assignedElements();
        expect(assigned.length).toBe(1);
        expect((assigned[0] as HTMLElement).id).toBe('custom-prev');
    });

    it('slotted next-icon renders in next button', async () => {
        const el = await fixture<FlintPagination>(html`
            <flint-pagination count="5" page="2">
                <span slot="next-icon" id="custom-next">NEXT</span>
            </flint-pagination>
        `);
        const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="next-icon"]')!;
        const assigned = slot.assignedElements();
        expect(assigned.length).toBe(1);
        expect((assigned[0] as HTMLElement).id).toBe('custom-next');
    });

    it('slotted first-icon renders in first button', async () => {
        const el = await fixture<FlintPagination>(html`
            <flint-pagination count="5" page="3" show-first-button>
                <span slot="first-icon" id="custom-first">FIRST</span>
            </flint-pagination>
        `);
        const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="first-icon"]')!;
        const assigned = slot.assignedElements();
        expect(assigned.length).toBe(1);
        expect((assigned[0] as HTMLElement).id).toBe('custom-first');
    });

    it('slotted last-icon renders in last button', async () => {
        const el = await fixture<FlintPagination>(html`
            <flint-pagination count="5" page="3" show-last-button>
                <span slot="last-icon" id="custom-last">LAST</span>
            </flint-pagination>
        `);
        const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="last-icon"]')!;
        const assigned = slot.assignedElements();
        expect(assigned.length).toBe(1);
        expect((assigned[0] as HTMLElement).id).toBe('custom-last');
    });

    it('slotted ellipsis-icon renders in ellipsis buttons', async () => {
        const el = await fixture<FlintPagination>(html`
            <flint-pagination count="20" page="10">
                <span slot="ellipsis-icon" id="custom-ellipsis">...</span>
            </flint-pagination>
        `);
        const slots = el.shadowRoot!.querySelectorAll<HTMLSlotElement>('slot[name="ellipsis-icon"]');
        expect(slots.length).toBeGreaterThan(0);
        expect(slots[0].assignedElements().length).toBe(1);
    });

    it('fires flint-pagination-change on prev click', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" page="3"></flint-pagination>`);
        const prev = el.shadowRoot!.querySelector('.page-btn[aria-label="Previous page"]') as HTMLButtonElement;
        setTimeout(() => prev.click());
        const event = await oneEvent(el, 'flint-pagination-change') as CustomEvent;
        expect(event.detail.page).toBe(2);
    });

    it('renders only start-ellipsis near end of range', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="20" page="19"></flint-pagination>`);
        const ellipsis = el.shadowRoot!.querySelectorAll('.page-btn.ellipsis');
        expect(ellipsis.length).toBe(1);
    });

    it('page=0 clamps to page 1 in rendering', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" page="0"></flint-pagination>`);
        const active = el.shadowRoot!.querySelector('.page-btn.active');
        expect(active?.textContent?.trim()).toBe('1');
    });

    it('page buttons have correct aria-label', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="3" page="1"></flint-pagination>`);
        const page2 = Array.from(el.shadowRoot!.querySelectorAll('.page-btn'))
            .find(b => b.textContent?.trim() === '2');
        expect(page2?.getAttribute('aria-label')).toBe('Page 2');
    });

    it('reflects color="standard" attribute', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" color="standard"></flint-pagination>`);
        expect(el.getAttribute('color')).toBe('standard');
    });

    it('reflects variant="text" (default) attribute', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5"></flint-pagination>`);
        expect(el.getAttribute('variant')).toBe('text');
    });

    it('reflects size="md" (default) attribute', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5"></flint-pagination>`);
        expect(el.getAttribute('size')).toBe('md');
    });

    it('reflects shape="circular" (default) attribute', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5"></flint-pagination>`);
        expect(el.getAttribute('shape')).toBe('circular');
    });

    it('reflects shape="square" attribute', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" shape="square"></flint-pagination>`);
        expect(el.getAttribute('shape')).toBe('square');
    });

    it('reflects disabled attribute', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" disabled></flint-pagination>`);
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('reflects show-first-button attribute', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" show-first-button></flint-pagination>`);
        expect(el.hasAttribute('show-first-button')).toBe(true);
    });

    it('reflects show-last-button attribute', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" show-last-button></flint-pagination>`);
        expect(el.hasAttribute('show-last-button')).toBe(true);
    });

    it('reflects hide-prev-button attribute', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" hide-prev-button></flint-pagination>`);
        expect(el.hasAttribute('hide-prev-button')).toBe(true);
    });

    it('reflects hide-next-button attribute', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" hide-next-button></flint-pagination>`);
        expect(el.hasAttribute('hide-next-button')).toBe(true);
    });

    it('_go with p < 1 does not navigate or fire event', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" page="1"></flint-pagination>`);
        const spy = vi.fn();
        el.addEventListener('flint-pagination-change', spy);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (el as any)._go(0);
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
        expect(el.page).toBe(1);
    });

    it('_go with p > count does not navigate or fire event', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" page="5"></flint-pagination>`);
        const spy = vi.fn();
        el.addEventListener('flint-pagination-change', spy);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (el as any)._go(6);
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
        expect(el.page).toBe(5);
    });

    it('defaultPage=1 (explicit) keeps page at 1', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="10" default-page="1"></flint-pagination>`);
        expect(el.page).toBe(1);
    });

    it('color="primary" is the default color', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5"></flint-pagination>`);
        expect(el.getAttribute('color')).toBe('primary');
    });
});

/* ── Edge cases: 1 page and boundary clicks ───────────────────── */
describe('flint-pagination — edge cases', () => {
    it('count=1 renders a single page button with prev and next disabled', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="1" page="1"></flint-pagination>`);
        const prev = el.shadowRoot!.querySelector('.page-btn[aria-label="Previous page"]') as HTMLButtonElement;
        const next = el.shadowRoot!.querySelector('.page-btn[aria-label="Next page"]') as HTMLButtonElement;
        expect(prev.disabled).toBe(true);
        expect(next.disabled).toBe(true);
        const active = el.shadowRoot!.querySelector('.page-btn.active');
        expect(active?.textContent?.trim()).toBe('1');
    });

    it('count=1 clicking next does not fire event', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="1" page="1"></flint-pagination>`);
        const spy = vi.fn();
        el.addEventListener('flint-pagination-change', spy);
        const next = el.shadowRoot!.querySelector('.page-btn[aria-label="Next page"]') as HTMLButtonElement;
        next.click();
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
        expect(el.page).toBe(1);
    });

    it('clicking next on last page does not fire event (boundary guard)', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" page="5"></flint-pagination>`);
        const spy = vi.fn();
        el.addEventListener('flint-pagination-change', spy);
        const next = el.shadowRoot!.querySelector('.page-btn[aria-label="Next page"]') as HTMLButtonElement;
        next.click();
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
        expect(el.page).toBe(5);
    });

    it('clicking prev on first page does not fire event', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="5" page="1"></flint-pagination>`);
        const spy = vi.fn();
        el.addEventListener('flint-pagination-change', spy);
        const prev = el.shadowRoot!.querySelector('.page-btn[aria-label="Previous page"]') as HTMLButtonElement;
        prev.click();
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
        expect(el.page).toBe(1);
    });
});

/* ── Additional buildPages edge cases ──────────────────────────── */
describe('buildPages edge cases', () => {
    it('count=2 returns both pages', () => {
        expect(buildPages(2, 1, 1, 1)).toEqual([1, 2]);
    });

    it('large siblingCount covering all pages shows no ellipsis', () => {
        const items = buildPages(7, 4, 3, 1);
        expect(items).not.toContain('start-ellipsis');
        expect(items).not.toContain('end-ellipsis');
        const nums = items.filter((i): i is number => typeof i === 'number');
        expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    it('shows page number instead of ellipsis when gap is exactly 1', () => {
        // With count=5, page=3, sibling=0, boundary=1 the gap is just page 2
        // so it inserts the number rather than an ellipsis
        const items = buildPages(5, 3, 0, 1);
        expect(items).not.toContain('start-ellipsis');
    });

    it('boundaryCount > count deduplicates properly', () => {
        const items = buildPages(3, 2, 0, 5);
        const nums = items.filter((i): i is number => typeof i === 'number');
        expect(nums).toEqual([1, 2, 3]);
    });

    it('page=1 on large count produces end-ellipsis only', () => {
        const items = buildPages(100, 1, 1, 1);
        expect(items).toContain('end-ellipsis');
        expect(items).not.toContain('start-ellipsis');
    });

    it('page=count on large count produces start-ellipsis only', () => {
        const items = buildPages(100, 100, 1, 1);
        expect(items).toContain('start-ellipsis');
        expect(items).not.toContain('end-ellipsis');
    });
});

// ── Accessibility ─────────────────────────────────────────────────────────

describe('flint-pagination — accessibility', () => {
    it('should pass automated a11y checks', async () => {
        const el = await fixture<FlintPagination>(html`<flint-pagination count="10" page="1"></flint-pagination>`);
        await expectAccessible(el);
    }, 15000);
});
