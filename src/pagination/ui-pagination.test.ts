import { describe, it, expect, vi } from 'vitest';
import { fixture, html, oneEvent } from '@open-wc/testing';
import './ui-pagination.js';
import type { UiPagination } from './ui-pagination.js';

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
        const btns = el.shadowRoot!.querySelectorAll('.page-btn:not(.nav):not(.ellipsis)');
        expect(btns.length).toBe(5);
    });

    it('marks the current page as active', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" page="3"></ui-pagination>`);
        const active = el.shadowRoot!.querySelector('.page-btn.active');
        expect(active?.textContent?.trim()).toBe('3');
    });

    it('fires ui-pagination-change when a page button is clicked', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" page="1"></ui-pagination>`);
        const btns = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.page-btn:not(.nav):not(.ellipsis)');
        const page3 = Array.from(btns).find(b => b.textContent?.trim() === '3')!;
        setTimeout(() => page3.click());
        const event = await oneEvent(el, 'ui-pagination-change') as CustomEvent;
        expect(event.detail.page).toBe(3);
    });

    it('fires ui-pagination-change on next click', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" page="2"></ui-pagination>`);
        const next = el.shadowRoot!.querySelector('.page-btn.nav[aria-label="Go to next page"]') as HTMLButtonElement;
        setTimeout(() => next.click());
        const event = await oneEvent(el, 'ui-pagination-change') as CustomEvent;
        expect(event.detail.page).toBe(3);
    });

    it('prev button is disabled on page 1', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" page="1"></ui-pagination>`);
        const prev = el.shadowRoot!.querySelector('.page-btn.nav[aria-label="Go to previous page"]') as HTMLButtonElement;
        expect(prev.disabled).toBe(true);
    });

    it('next button is disabled on last page', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" page="5"></ui-pagination>`);
        const next = el.shadowRoot!.querySelector('.page-btn.nav[aria-label="Go to next page"]') as HTMLButtonElement;
        expect(next.disabled).toBe(true);
    });

    it('shows first/last buttons when showFirstButton/showLastButton are set', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" page="3" show-first-button show-last-button></ui-pagination>`);
        const first = el.shadowRoot!.querySelector('.page-btn.nav[aria-label="Go to first page"]');
        const last = el.shadowRoot!.querySelector('.page-btn.nav[aria-label="Go to last page"]');
        expect(first).not.toBeNull();
        expect(last).not.toBeNull();
    });

    it('hides prev/next when hidePrevButton/hideNextButton are set', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" page="3" hide-prev-button hide-next-button></ui-pagination>`);
        const prev = el.shadowRoot!.querySelector('.page-btn.nav[aria-label="Go to previous page"]');
        const next = el.shadowRoot!.querySelector('.page-btn.nav[aria-label="Go to next page"]');
        expect(prev).toBeNull();
        expect(next).toBeNull();
    });

    it('renders ellipsis for large page counts', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="20" page="10"></ui-pagination>`);
        const ellipsis = el.shadowRoot!.querySelectorAll('.page-btn.ellipsis');
        expect(ellipsis.length).toBeGreaterThan(0);
    });

    it('reflects variant attribute', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" page="1" variant="outlined"></ui-pagination>`);
        expect(el.getAttribute('variant')).toBe('outlined');
    });

    it('all buttons disabled when disabled prop is set', async () => {
        const el = await fixture<UiPagination>(html`<ui-pagination count="5" page="3" disabled></ui-pagination>`);
        const spy = vi.fn();
        el.addEventListener('ui-pagination-change', spy);
        const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.page-btn:not(.active)');
        btn?.click();
        expect(spy).not.toHaveBeenCalled();
    });
});
