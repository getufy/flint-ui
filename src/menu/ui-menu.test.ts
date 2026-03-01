import { describe, it, expect, vi, afterEach } from 'vitest';
import { fixture, html, oneEvent } from '@open-wc/testing';
import './ui-menu.js';
import type { UiMenu, UiMenuItem } from './ui-menu.js';

// ═══════════════════════════════════════════════════════════════════════
// ui-menu
// ═══════════════════════════════════════════════════════════════════════
describe('ui-menu', () => {

    // ── Element creation ─────────────────────────────────────────────────
    it('is defined (all three elements)', () => {
        expect(document.createElement('ui-menu')).toBeInstanceOf(HTMLElement);
        expect(document.createElement('ui-menu-item')).toBeInstanceOf(HTMLElement);
        expect(document.createElement('ui-menu-divider')).toBeInstanceOf(HTMLElement);
    });

    // ── Default state ────────────────────────────────────────────────────
    it('is closed by default', async () => {
        const el = await fixture<UiMenu>(html`<ui-menu></ui-menu>`);
        await el.updateComplete;
        expect(el.open).toBe(false);
        const paper = el.shadowRoot!.querySelector('.menu-paper');
        expect(paper?.classList.contains('open')).toBe(false);
    });

    it('has aria-hidden="true" when closed', async () => {
        const el = await fixture<UiMenu>(html`<ui-menu></ui-menu>`);
        await el.updateComplete;
        const paper = el.shadowRoot!.querySelector('[role="menu"]');
        expect(paper?.getAttribute('aria-hidden')).toBe('true');
    });

    it('defaults placement to bottom-start', async () => {
        const el = await fixture<UiMenu>(html`<ui-menu></ui-menu>`);
        expect(el.placement).toBe('bottom-start');
    });

    it('defaults closeOnSelect to true', async () => {
        const el = await fixture<UiMenu>(html`<ui-menu></ui-menu>`);
        expect(el.closeOnSelect).toBe(true);
    });

    // ── Open state ───────────────────────────────────────────────────────
    it('shows paper when open=true', async () => {
        const el = await fixture<UiMenu>(html`<ui-menu open></ui-menu>`);
        await el.updateComplete;
        const paper = el.shadowRoot!.querySelector('.menu-paper');
        expect(paper?.classList.contains('open')).toBe(true);
    });

    it('has aria-hidden="false" when open', async () => {
        const el = await fixture<UiMenu>(html`<ui-menu open></ui-menu>`);
        await el.updateComplete;
        const paper = el.shadowRoot!.querySelector('[role="menu"]');
        expect(paper?.getAttribute('aria-hidden')).toBe('false');
    });

    it('reflects open attribute on host', async () => {
        const el = await fixture<UiMenu>(html`<ui-menu open></ui-menu>`);
        expect(el.hasAttribute('open')).toBe(true);
    });

    // ── Placement ────────────────────────────────────────────────────────
    it('applies placement class to menu-paper', async () => {
        const el = await fixture<UiMenu>(html`<ui-menu placement="bottom-end"></ui-menu>`);
        await el.updateComplete;
        const paper = el.shadowRoot!.querySelector('.menu-paper');
        expect(paper?.classList.contains('pos-bottom-end')).toBe(true);
    });

    it('changes placement class reactively', async () => {
        const el = await fixture<UiMenu>(html`<ui-menu placement="bottom-start"></ui-menu>`);
        await el.updateComplete;
        el.placement = 'top-end';
        await el.updateComplete;
        const paper = el.shadowRoot!.querySelector('.menu-paper');
        expect(paper?.classList.contains('pos-top-end')).toBe(true);
        expect(paper?.classList.contains('pos-bottom-start')).toBe(false);
    });

    // ── Scrollable ───────────────────────────────────────────────────────
    it('applies scrollable class when prop is set', async () => {
        const el = await fixture<UiMenu>(html`<ui-menu open scrollable></ui-menu>`);
        await el.updateComplete;
        const paper = el.shadowRoot!.querySelector('.menu-paper');
        expect(paper?.classList.contains('scrollable')).toBe(true);
    });

    // ── Backdrop click ───────────────────────────────────────────────────
    it('fires ui-menu-close when backdrop is clicked', async () => {
        const el = await fixture<UiMenu>(html`<ui-menu open></ui-menu>`);
        const backdrop = el.shadowRoot!.querySelector('.backdrop') as HTMLElement;
        setTimeout(() => backdrop.click());
        const event = await oneEvent(el, 'ui-menu-close');
        expect(event).toBeDefined();
    });

    it('backdrop is invisible (display:none) when closed', async () => {
        const el = await fixture<UiMenu>(html`<ui-menu></ui-menu>`);
        await el.updateComplete;
        const backdrop = el.shadowRoot!.querySelector('.backdrop') as HTMLElement;
        expect(backdrop.classList.contains('open')).toBe(false);
    });

    // ── Escape key ───────────────────────────────────────────────────────
    it('fires ui-menu-close on Escape key when open', async () => {
        const el = await fixture<UiMenu>(html`<ui-menu open></ui-menu>`);
        const spy = vi.fn();
        el.addEventListener('ui-menu-close', spy);
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        expect(spy).toHaveBeenCalledOnce();
    });

    it('does NOT fire ui-menu-close on Escape when closed', async () => {
        const el = await fixture<UiMenu>(html`<ui-menu></ui-menu>`);
        const spy = vi.fn();
        el.addEventListener('ui-menu-close', spy);
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        expect(spy).not.toHaveBeenCalled();
    });

    // ── Close on select ──────────────────────────────────────────────────
    it('fires ui-menu-close when an item is selected (closeOnSelect=true)', async () => {
        const el = await fixture<UiMenu>(html`
            <ui-menu open>
                <ui-menu-item id="item1">Item</ui-menu-item>
            </ui-menu>
        `);
        const spy = vi.fn();
        el.addEventListener('ui-menu-close', spy);

        const item = el.querySelector<UiMenuItem>('#item1')!;
        item.dispatchEvent(new CustomEvent('ui-menu-item-select', { bubbles: true, composed: true }));

        expect(spy).toHaveBeenCalledOnce();
    });

    it('does NOT fire ui-menu-close on item select when closeOnSelect=false', async () => {
        const el = await fixture<UiMenu>(html`
            <ui-menu open ?closeOnSelect=${false}>
                <ui-menu-item id="item2">Item</ui-menu-item>
            </ui-menu>
        `);
        el.closeOnSelect = false;
        await el.updateComplete;

        const spy = vi.fn();
        el.addEventListener('ui-menu-close', spy);

        el.querySelector<UiMenuItem>('#item2')!.dispatchEvent(
            new CustomEvent('ui-menu-item-select', { bubbles: true, composed: true })
        );
        expect(spy).not.toHaveBeenCalled();
    });
});

// ═══════════════════════════════════════════════════════════════════════
// ui-menu-item
// ═══════════════════════════════════════════════════════════════════════
describe('ui-menu-item', () => {
    afterEach(() => vi.restoreAllMocks());

    // ── Defaults ─────────────────────────────────────────────────────────
    it('is not selected by default', async () => {
        const el = await fixture<UiMenuItem>(html`<ui-menu-item>Item</ui-menu-item>`);
        expect(el.selected).toBe(false);
    });

    it('is not disabled by default', async () => {
        const el = await fixture<UiMenuItem>(html`<ui-menu-item>Item</ui-menu-item>`);
        expect(el.disabled).toBe(false);
    });

    it('has tabindex=0 by default', async () => {
        const el = await fixture<UiMenuItem>(html`<ui-menu-item>Item</ui-menu-item>`);
        await el.updateComplete;
        const item = el.shadowRoot!.querySelector('.item') as HTMLElement;
        expect(item.getAttribute('tabindex')).toBe('0');
    });

    // ── Attributes & reflection ───────────────────────────────────────────
    it('reflects selected attribute', async () => {
        const el = await fixture<UiMenuItem>(html`<ui-menu-item selected>Item</ui-menu-item>`);
        expect(el.selected).toBe(true);
        expect(el.hasAttribute('selected')).toBe(true);
    });

    it('reflects disabled attribute', async () => {
        const el = await fixture<UiMenuItem>(html`<ui-menu-item disabled>Item</ui-menu-item>`);
        expect(el.disabled).toBe(true);
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('has tabindex=-1 when disabled', async () => {
        const el = await fixture<UiMenuItem>(html`<ui-menu-item disabled>Item</ui-menu-item>`);
        await el.updateComplete;
        const item = el.shadowRoot!.querySelector('.item') as HTMLElement;
        expect(item.getAttribute('tabindex')).toBe('-1');
    });

    // ── ARIA ─────────────────────────────────────────────────────────────
    it('has role="menuitem"', async () => {
        const el = await fixture<UiMenuItem>(html`<ui-menu-item>Item</ui-menu-item>`);
        await el.updateComplete;
        const item = el.shadowRoot!.querySelector('.item');
        expect(item?.getAttribute('role')).toBe('menuitem');
    });

    it('sets aria-disabled="true" when disabled', async () => {
        const el = await fixture<UiMenuItem>(html`<ui-menu-item disabled>Item</ui-menu-item>`);
        await el.updateComplete;
        const item = el.shadowRoot!.querySelector('.item');
        expect(item?.getAttribute('aria-disabled')).toBe('true');
    });

    it('sets aria-disabled="false" when not disabled', async () => {
        const el = await fixture<UiMenuItem>(html`<ui-menu-item>Item</ui-menu-item>`);
        await el.updateComplete;
        const item = el.shadowRoot!.querySelector('.item');
        expect(item?.getAttribute('aria-disabled')).toBe('false');
    });

    // ── Event firing ─────────────────────────────────────────────────────
    it('fires ui-menu-item-select on click', async () => {
        const el = await fixture<UiMenuItem>(html`<ui-menu-item>Item</ui-menu-item>`);
        const item = el.shadowRoot!.querySelector('.item') as HTMLElement;
        setTimeout(() => item.click());
        const event = await oneEvent(el, 'ui-menu-item-select') as CustomEvent;
        expect(event).toBeDefined();
        expect(event.detail).toBeDefined();
    });

    it('fires ui-menu-item-select with label in detail', async () => {
        const el = await fixture<UiMenuItem>(html`<ui-menu-item>My Label</ui-menu-item>`);
        const item = el.shadowRoot!.querySelector('.item') as HTMLElement;
        setTimeout(() => item.click());
        const event = await oneEvent(el, 'ui-menu-item-select') as CustomEvent;
        expect(event.detail.label).toBe('My Label');
    });

    it('fires ui-menu-item-select with value prop in detail', async () => {
        const el = await fixture<UiMenuItem>(html`<ui-menu-item value="my-val">Label</ui-menu-item>`);
        const item = el.shadowRoot!.querySelector('.item') as HTMLElement;
        setTimeout(() => item.click());
        const event = await oneEvent(el, 'ui-menu-item-select') as CustomEvent;
        expect(event.detail.value).toBe('my-val');
    });

    it('does NOT fire ui-menu-item-select when disabled', async () => {
        const el = await fixture<UiMenuItem>(html`<ui-menu-item disabled>Item</ui-menu-item>`);
        const spy = vi.fn();
        el.addEventListener('ui-menu-item-select', spy);
        el.shadowRoot!.querySelector<HTMLElement>('.item')?.click();
        expect(spy).not.toHaveBeenCalled();
    });

    // ── Keyboard activation ──────────────────────────────────────────────
    it('fires ui-menu-item-select on Enter key', async () => {
        const el = await fixture<UiMenuItem>(html`<ui-menu-item>Item</ui-menu-item>`);
        const item = el.shadowRoot!.querySelector('.item') as HTMLElement;
        const spy = vi.fn();
        el.addEventListener('ui-menu-item-select', spy);
        item.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
    });

    it('fires ui-menu-item-select on Space key', async () => {
        const el = await fixture<UiMenuItem>(html`<ui-menu-item>Item</ui-menu-item>`);
        const item = el.shadowRoot!.querySelector('.item') as HTMLElement;
        const spy = vi.fn();
        el.addEventListener('ui-menu-item-select', spy);
        item.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
    });

    // ── Dense / divider ──────────────────────────────────────────────────
    it('reflects dense attribute', async () => {
        const el = await fixture<UiMenuItem>(html`<ui-menu-item dense>Item</ui-menu-item>`);
        expect(el.hasAttribute('dense')).toBe(true);
    });

    it('reflects divider attribute', async () => {
        const el = await fixture<UiMenuItem>(html`<ui-menu-item divider>Item</ui-menu-item>`);
        expect(el.hasAttribute('divider')).toBe(true);
    });

    // ── Icon slot space ──────────────────────────────────────────────────
    it('icon-wrap has [hidden] when no icon is slotted (no empty space)', async () => {
        const el = await fixture<UiMenuItem>(html`<ui-menu-item>No Icon</ui-menu-item>`);
        await el.updateComplete;
        const iconWrap = el.shadowRoot!.querySelector('.icon-wrap') as HTMLElement;
        // ?hidden=${!this._hasIcon} → _hasIcon starts false, so hidden attr must be present
        expect(iconWrap.hasAttribute('hidden')).toBe(true);
    });

    it('end-icon-wrap has [hidden] when no end-icon is slotted', async () => {
        const el = await fixture<UiMenuItem>(html`<ui-menu-item>No End Icon</ui-menu-item>`);
        await el.updateComplete;
        const endIconWrap = el.shadowRoot!.querySelector('.end-icon-wrap') as HTMLElement;
        expect(endIconWrap.hasAttribute('hidden')).toBe(true);
    });

    it('icon-wrap is visible when icon slot is filled', async () => {
        const el = await fixture<UiMenuItem>(html`
            <ui-menu-item>
                <span slot="icon">★</span>
                With Icon
            </ui-menu-item>
        `);
        await el.updateComplete;
        // Allow slotchange microtask to settle
        await new Promise(r => setTimeout(r, 0));
        await el.updateComplete;
        const iconWrap = el.shadowRoot!.querySelector('.icon-wrap') as HTMLElement;
        expect(iconWrap.hasAttribute('hidden')).toBe(false);
    });
});
