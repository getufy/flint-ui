import { describe, it, expect, vi } from 'vitest';
import { fixture, html, oneEvent } from '@open-wc/testing';
import './ui-pagination.js';
import { buildPages } from './ui-pagination.js';
import type { UiPagination } from './ui-pagination.js';

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

/* ── ui-pagination component tests ─────────────────────────────────── */
describe('ui-pagination', () => {
    it('is defined', () => {
        expect(document.createElement('ui-pagination')).toBeInstanceOf(HTMLElement);
    });

    it('defaults to page 1, count 1', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination></ui-pagination>`);
        expect(el.page).toBe(1);
        expect(el.count).toBe(1);
    });

    it('renders page buttons for count=5', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" page="1"></ui-pagination>`);
        const btns = el.shadowRoot!.querySelectorAll('.page-btn:not(.ellipsis)');
        // prev + 5 pages + next = 7
        expect(btns.length).toBe(7);
    });

    it('marks the current page as active', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" page="3"></ui-pagination>`);
        const active = el.shadowRoot!.querySelector('.page-btn.active');
        expect(active?.textContent?.trim()).toBe('3');
    });

    it('sets aria-current="page" on active button only', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" page="3"></ui-pagination>`);
        const withCurrent = el.shadowRoot!.querySelectorAll('[aria-current="page"]');
        expect(withCurrent.length).toBe(1);
        expect(withCurrent[0].textContent?.trim()).toBe('3');
        // inactive page has no aria-current
        const page1 = Array.from(el.shadowRoot!.querySelectorAll('.page-btn'))
            .find(b => b.textContent?.trim() === '1');
        expect(page1?.hasAttribute('aria-current')).toBe(false);
    });

    it('fires ui-pagination-change when a page button is clicked', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" page="1"></ui-pagination>`);
        const btns = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.page-btn:not(.ellipsis)');
        const page3 = Array.from(btns).find(b => b.textContent?.trim() === '3')!;
        setTimeout(() => page3.click());
        const event = await oneEvent(el, 'ui-pagination-change') as CustomEvent;
        expect(event.detail.page).toBe(3);
    });

    it('event is bubbles=true and composed=true', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" page="1"></ui-pagination>`);
        const page2 = Array.from(el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.page-btn'))
            .find(b => b.textContent?.trim() === '2')!;
        setTimeout(() => page2.click());
        const event = await oneEvent(el, 'ui-pagination-change') as CustomEvent;
        expect(event.bubbles).toBe(true);
        expect(event.composed).toBe(true);
    });

    it('clicking the active page does NOT fire event', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" page="3"></ui-pagination>`);
        const spy = vi.fn();
        el.addEventListener('ui-pagination-change', spy);
        const activeBtn = el.shadowRoot!.querySelector<HTMLButtonElement>('.page-btn.active')!;
        activeBtn.click();
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });

    it('fires ui-pagination-change on next click', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" page="2"></ui-pagination>`);
        const next = el.shadowRoot!.querySelector('.page-btn[aria-label="Go to next page"]') as HTMLButtonElement;
        setTimeout(() => next.click());
        const event = await oneEvent(el, 'ui-pagination-change') as CustomEvent;
        expect(event.detail.page).toBe(3);
    });

    it('prev button is disabled on page 1', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" page="1"></ui-pagination>`);
        const prev = el.shadowRoot!.querySelector('.page-btn[aria-label="Go to previous page"]') as HTMLButtonElement;
        expect(prev.disabled).toBe(true);
    });

    it('next button is disabled on last page', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" page="5"></ui-pagination>`);
        const next = el.shadowRoot!.querySelector('.page-btn[aria-label="Go to next page"]') as HTMLButtonElement;
        expect(next.disabled).toBe(true);
    });

    it('shows first/last buttons when showFirstButton/showLastButton are set', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" page="3" show-first-button show-last-button></ui-pagination>`);
        const first = el.shadowRoot!.querySelector('.page-btn[aria-label="Go to first page"]');
        const last = el.shadowRoot!.querySelector('.page-btn[aria-label="Go to last page"]');
        expect(first).not.toBeNull();
        expect(last).not.toBeNull();
    });

    it('first button fires event with page=1', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="10" page="7" show-first-button></ui-pagination>`);
        const first = el.shadowRoot!.querySelector<HTMLButtonElement>('.page-btn[aria-label="Go to first page"]')!;
        setTimeout(() => first.click());
        const event = await oneEvent(el, 'ui-pagination-change') as CustomEvent;
        expect(event.detail.page).toBe(1);
    });

    it('last button fires event with page=count', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="10" page="3" show-last-button></ui-pagination>`);
        const last = el.shadowRoot!.querySelector<HTMLButtonElement>('.page-btn[aria-label="Go to last page"]')!;
        setTimeout(() => last.click());
        const event = await oneEvent(el, 'ui-pagination-change') as CustomEvent;
        expect(event.detail.page).toBe(10);
    });

    it('first button is disabled on page 1', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" page="1" show-first-button></ui-pagination>`);
        const first = el.shadowRoot!.querySelector<HTMLButtonElement>('.page-btn[aria-label="Go to first page"]')!;
        expect(first.disabled).toBe(true);
    });

    it('last button is disabled on last page', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" page="5" show-last-button></ui-pagination>`);
        const last = el.shadowRoot!.querySelector<HTMLButtonElement>('.page-btn[aria-label="Go to last page"]')!;
        expect(last.disabled).toBe(true);
    });

    it('hides prev/next when hidePrevButton/hideNextButton are set', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" page="3" hide-prev-button hide-next-button></ui-pagination>`);
        const prev = el.shadowRoot!.querySelector('.page-btn[aria-label="Go to previous page"]');
        const next = el.shadowRoot!.querySelector('.page-btn[aria-label="Go to next page"]');
        expect(prev).toBeNull();
        expect(next).toBeNull();
    });

    it('renders both start-ellipsis and end-ellipsis for mid-range pages', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="20" page="10"></ui-pagination>`);
        const ellipsis = el.shadowRoot!.querySelectorAll('.page-btn.ellipsis');
        expect(ellipsis.length).toBe(2);
    });

    it('renders only end-ellipsis near start', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="20" page="2"></ui-pagination>`);
        const ellipsis = el.shadowRoot!.querySelectorAll('.page-btn.ellipsis');
        expect(ellipsis.length).toBe(1);
    });

    it('siblingCount=2 shows more page buttons', async () => {
        const el1 = await fixture<UiPagination>(html`<ui-pagination count="11" page="6" sibling-count="1"></ui-pagination>`);
        const el2 = await fixture<UiPagination>(html`<ui-pagination count="11" page="6" sibling-count="2"></ui-pagination>`);
        const count1 = el1.shadowRoot!.querySelectorAll('.page-btn:not(.ellipsis)').length;
        const count2 = el2.shadowRoot!.querySelectorAll('.page-btn:not(.ellipsis)').length;
        expect(count2).toBeGreaterThan(count1);
    });

    it('reflects variant attribute', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" page="1" variant="outlined"></ui-pagination>`);
        expect(el.getAttribute('variant')).toBe('outlined');
    });

    it('reflects shape attribute', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" page="1" shape="rounded"></ui-pagination>`);
        expect(el.getAttribute('shape')).toBe('rounded');
    });

    it('reflects size attribute', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" page="1" size="large"></ui-pagination>`);
        expect(el.getAttribute('size')).toBe('large');
    });

    it('reflects color attribute', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" page="1" color="secondary"></ui-pagination>`);
        expect(el.getAttribute('color')).toBe('secondary');
    });

    it('all buttons disabled when disabled prop is set', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" page="3" disabled></ui-pagination>`);
        const spy = vi.fn();
        el.addEventListener('ui-pagination-change', spy);
        const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.page-btn:not(.active)');
        btn?.click();
        expect(spy).not.toHaveBeenCalled();
    });

    it('page prop change updates active button', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" page="1"></ui-pagination>`);
        el.page = 4;
        await el.updateComplete;
        const active = el.shadowRoot!.querySelector('.page-btn.active');
        expect(active?.textContent?.trim()).toBe('4');
    });

    it('count prop change updates rendered buttons', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="3" page="1"></ui-pagination>`);
        el.count = 7;
        await el.updateComplete;
        // prev + 7 pages + next = 9 non-ellipsis buttons
        const btns = el.shadowRoot!.querySelectorAll('.page-btn:not(.ellipsis)');
        expect(btns.length).toBe(9);
    });

    it('count=0 guard renders a single page 1 button', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="0" page="1"></ui-pagination>`);
        const pageBtns = el.shadowRoot!.querySelectorAll('.page-btn:not(.ellipsis)');
        // prev(disabled) + page1(active) + next(disabled)
        expect(pageBtns.length).toBe(3);
    });

    it('page > count guard clamps to last page', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" page="99"></ui-pagination>`);
        await el.updateComplete;
        const active = el.shadowRoot!.querySelector('.page-btn.active');
        expect(active?.textContent?.trim()).toBe('5');
    });

    it('defaultPage sets initial page in uncontrolled mode', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="10" default-page="5"></ui-pagination>`);
        expect(el.page).toBe(5);
        const active = el.shadowRoot!.querySelector('.page-btn.active');
        expect(active?.textContent?.trim()).toBe('5');
    });

    it('uncontrolled mode updates page on click without external handler', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" default-page="1"></ui-pagination>`);
        const page3 = Array.from(el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.page-btn'))
            .find(b => b.textContent?.trim() === '3')!;
        page3.click();
        await el.updateComplete;
        expect(el.page).toBe(3);
        const active = el.shadowRoot!.querySelector('.page-btn.active');
        expect(active?.textContent?.trim()).toBe('3');
    });

    it('custom label sets aria-label on nav', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" page="1" label="article pages"></ui-pagination>`);
        const nav = el.shadowRoot!.querySelector('nav');
        expect(nav?.getAttribute('aria-label')).toBe('article pages');
    });

    it('default nav aria-label is "pagination navigation"', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" page="1"></ui-pagination>`);
        const nav = el.shadowRoot!.querySelector('nav');
        expect(nav?.getAttribute('aria-label')).toBe('pagination navigation');
    });

    it('nav landmark is rendered', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" page="1"></ui-pagination>`);
        expect(el.shadowRoot!.querySelector('nav')).not.toBeNull();
    });

    it('ol list is rendered', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" page="1"></ui-pagination>`);
        expect(el.shadowRoot!.querySelector('ol')).not.toBeNull();
    });

    it('each page button is wrapped in an li', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="3" page="1"></ui-pagination>`);
        const lis = el.shadowRoot!.querySelectorAll('li');
        const btns = el.shadowRoot!.querySelectorAll('.page-btn');
        expect(lis.length).toBe(btns.length);
    });

    it('slotted prev-icon renders in prev button', async () => {
        const el = await fixture<UiPagination>(html`
            <ui-pagination count="5" page="3">
                <span slot="prev-icon" id="custom-prev">PREV</span>
            </ui-pagination>
        `);
        const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="prev-icon"]')!;
        const assigned = slot.assignedElements();
        expect(assigned.length).toBe(1);
        expect((assigned[0] as HTMLElement).id).toBe('custom-prev');
    });
});
