import { describe, it, expect, vi, afterEach } from 'vitest';
import { fixture, html, oneEvent } from '@open-wc/testing';
import './flint-menu.js';
import type { FlintMenu, FlintMenuItem, FlintMenuGroup } from './flint-menu.js';

/** Wait for flint-menu and all its flint-menu-item children to finish rendering. */
async function settle(el: FlintMenu) {
    await el.updateComplete;
    await Promise.all(
        Array.from(el.querySelectorAll<FlintMenuItem>('flint-menu-item')).map(i => i.updateComplete)
    );
    // Allow setTimeout(0) auto-focus to fire
    await new Promise(r => setTimeout(r, 0));
}

// ═══════════════════════════════════════════════════════════════════════
// flint-menu
// ═══════════════════════════════════════════════════════════════════════
describe('flint-menu', () => {

    // ── Element creation ─────────────────────────────────────────────────
    it('is defined (all elements)', () => {
        expect(document.createElement('flint-menu')).toBeInstanceOf(HTMLElement);
        expect(document.createElement('flint-menu-item')).toBeInstanceOf(HTMLElement);
        expect(document.createElement('flint-menu-divider')).toBeInstanceOf(HTMLElement);
        expect(document.createElement('flint-menu-group')).toBeInstanceOf(HTMLElement);
    });

    // ── Default state ────────────────────────────────────────────────────
    it('is closed by default', async () => {
        const el = await fixture<FlintMenu>(html`<flint-menu></flint-menu>`);
        await el.updateComplete;
        expect(el.open).toBe(false);
        const paper = el.shadowRoot!.querySelector('.menu-paper');
        expect(paper?.classList.contains('open')).toBe(false);
    });

    it('has aria-hidden="true" when closed', async () => {
        const el = await fixture<FlintMenu>(html`<flint-menu></flint-menu>`);
        await el.updateComplete;
        const paper = el.shadowRoot!.querySelector('[role="menu"]');
        expect(paper?.getAttribute('aria-hidden')).toBe('true');
    });

    it('defaults placement to bottom-start', async () => {
        const el = await fixture<FlintMenu>(html`<flint-menu></flint-menu>`);
        expect(el.placement).toBe('bottom-start');
    });

    it('defaults closeOnSelect to true', async () => {
        const el = await fixture<FlintMenu>(html`<flint-menu></flint-menu>`);
        expect(el.closeOnSelect).toBe(true);
    });

    // ── Open state ───────────────────────────────────────────────────────
    it('shows paper when open=true', async () => {
        const el = await fixture<FlintMenu>(html`<flint-menu open></flint-menu>`);
        await el.updateComplete;
        const paper = el.shadowRoot!.querySelector('.menu-paper');
        expect(paper?.classList.contains('open')).toBe(true);
    });

    it('has aria-hidden="false" when open', async () => {
        const el = await fixture<FlintMenu>(html`<flint-menu open></flint-menu>`);
        await el.updateComplete;
        const paper = el.shadowRoot!.querySelector('[role="menu"]');
        expect(paper?.getAttribute('aria-hidden')).toBe('false');
    });

    it('reflects open attribute on host', async () => {
        const el = await fixture<FlintMenu>(html`<flint-menu open></flint-menu>`);
        expect(el.hasAttribute('open')).toBe(true);
    });

    // ── Placement ────────────────────────────────────────────────────────
    it('applies placement class to menu-paper', async () => {
        const el = await fixture<FlintMenu>(html`<flint-menu placement="bottom-end"></flint-menu>`);
        await el.updateComplete;
        const paper = el.shadowRoot!.querySelector('.menu-paper');
        expect(paper?.classList.contains('pos-bottom-end')).toBe(true);
    });

    it('changes placement class reactively', async () => {
        const el = await fixture<FlintMenu>(html`<flint-menu placement="bottom-start"></flint-menu>`);
        await el.updateComplete;
        el.placement = 'top-end';
        await el.updateComplete;
        const paper = el.shadowRoot!.querySelector('.menu-paper');
        expect(paper?.classList.contains('pos-top-end')).toBe(true);
        expect(paper?.classList.contains('pos-bottom-start')).toBe(false);
    });

    // ── Scrollable ───────────────────────────────────────────────────────
    it('applies scrollable class when prop is set', async () => {
        const el = await fixture<FlintMenu>(html`<flint-menu open scrollable></flint-menu>`);
        await el.updateComplete;
        const paper = el.shadowRoot!.querySelector('.menu-paper');
        expect(paper?.classList.contains('scrollable')).toBe(true);
    });

    // ── aria-label ───────────────────────────────────────────────────────
    it('sets aria-label on menu surface when label prop is provided', async () => {
        const el = await fixture<FlintMenu>(html`<flint-menu label="Main navigation"></flint-menu>`);
        await el.updateComplete;
        const paper = el.shadowRoot!.querySelector('[role="menu"]');
        expect(paper?.getAttribute('aria-label')).toBe('Main navigation');
    });

    it('omits aria-label attribute when label is not set', async () => {
        const el = await fixture<FlintMenu>(html`<flint-menu></flint-menu>`);
        await el.updateComplete;
        const paper = el.shadowRoot!.querySelector('[role="menu"]');
        expect(paper?.hasAttribute('aria-label')).toBe(false);
    });

    // ── Backdrop click ───────────────────────────────────────────────────
    it('fires flint-menu-close when backdrop is clicked', async () => {
        const el = await fixture<FlintMenu>(html`<flint-menu open></flint-menu>`);
        const backdrop = el.shadowRoot!.querySelector('.backdrop') as HTMLElement;
        setTimeout(() => backdrop.click());
        const event = await oneEvent(el, 'flint-menu-close');
        expect(event).toBeDefined();
    });

    it('backdrop is invisible (display:none) when closed', async () => {
        const el = await fixture<FlintMenu>(html`<flint-menu></flint-menu>`);
        await el.updateComplete;
        const backdrop = el.shadowRoot!.querySelector('.backdrop') as HTMLElement;
        expect(backdrop.classList.contains('open')).toBe(false);
    });

    // ── Escape key ───────────────────────────────────────────────────────
    it('fires flint-menu-close on Escape key when open', async () => {
        const el = await fixture<FlintMenu>(html`<flint-menu open></flint-menu>`);
        const spy = vi.fn();
        el.addEventListener('flint-menu-close', spy);
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        expect(spy).toHaveBeenCalledOnce();
    });

    it('does NOT fire flint-menu-close on Escape when closed', async () => {
        const el = await fixture<FlintMenu>(html`<flint-menu></flint-menu>`);
        const spy = vi.fn();
        el.addEventListener('flint-menu-close', spy);
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        expect(spy).not.toHaveBeenCalled();
    });

    // ── Close on select ──────────────────────────────────────────────────
    it('fires flint-menu-close when an item is selected (closeOnSelect=true)', async () => {
        const el = await fixture<FlintMenu>(html`
            <flint-menu open>
                <flint-menu-item id="item1">Item</flint-menu-item>
            </flint-menu>
        `);
        const spy = vi.fn();
        el.addEventListener('flint-menu-close', spy);

        const item = el.querySelector<FlintMenuItem>('#item1')!;
        item.dispatchEvent(new CustomEvent('flint-menu-item-select', { bubbles: true, composed: true }));

        expect(spy).toHaveBeenCalledOnce();
    });

    it('does NOT fire flint-menu-close on item select when closeOnSelect=false', async () => {
        const el = await fixture<FlintMenu>(html`
            <flint-menu open>
                <flint-menu-item id="item2">Item</flint-menu-item>
            </flint-menu>
        `);
        el.closeOnSelect = false;
        await el.updateComplete;

        const spy = vi.fn();
        el.addEventListener('flint-menu-close', spy);

        el.querySelector<FlintMenuItem>('#item2')!.dispatchEvent(
            new CustomEvent('flint-menu-item-select', { bubbles: true, composed: true })
        );
        expect(spy).not.toHaveBeenCalled();
    });

    // ── Keyboard navigation ──────────────────────────────────────────────
    it('focuses first enabled item when menu opens', async () => {
        const el = await fixture<FlintMenu>(html`
            <flint-menu>
                <flint-menu-item id="first">First</flint-menu-item>
                <flint-menu-item id="second">Second</flint-menu-item>
            </flint-menu>
        `);
        el.open = true;
        await settle(el);

        const first = el.querySelector<FlintMenuItem>('#first')!;
        expect(first.shadowRoot!.activeElement?.classList.contains('item')).toBe(true);
    });

    it('skips disabled items when focusing on open', async () => {
        const el = await fixture<FlintMenu>(html`
            <flint-menu>
                <flint-menu-item disabled>Disabled</flint-menu-item>
                <flint-menu-item id="enabled">Enabled</flint-menu-item>
            </flint-menu>
        `);
        el.open = true;
        await settle(el);

        const enabled = el.querySelector<FlintMenuItem>('#enabled')!;
        expect(enabled.shadowRoot!.activeElement?.classList.contains('item')).toBe(true);
    });

    it('moves focus to next item on ArrowDown', async () => {
        const el = await fixture<FlintMenu>(html`
            <flint-menu>
                <flint-menu-item>First</flint-menu-item>
                <flint-menu-item>Second</flint-menu-item>
            </flint-menu>
        `);
        el.open = true;
        await settle(el); // auto-focus lands on items[0]

        const items = Array.from(el.querySelectorAll<FlintMenuItem>('flint-menu-item'));

        // ArrowDown from first → second
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await el.updateComplete;

        expect(document.activeElement).toBe(items[1]);
    });

    it('wraps from last to first on ArrowDown', async () => {
        const el = await fixture<FlintMenu>(html`
            <flint-menu>
                <flint-menu-item>First</flint-menu-item>
                <flint-menu-item>Last</flint-menu-item>
            </flint-menu>
        `);
        el.open = true;
        await settle(el);

        const items = Array.from(el.querySelectorAll<FlintMenuItem>('flint-menu-item'));

        // ArrowUp from first wraps to last
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        await el.updateComplete;
        expect(document.activeElement).toBe(items[1]);

        // ArrowDown from last wraps to first
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await el.updateComplete;
        expect(document.activeElement).toBe(items[0]);
    });

    it('moves focus to previous item on ArrowUp', async () => {
        const el = await fixture<FlintMenu>(html`
            <flint-menu>
                <flint-menu-item>First</flint-menu-item>
                <flint-menu-item>Second</flint-menu-item>
            </flint-menu>
        `);
        el.open = true;
        await settle(el);

        const items = Array.from(el.querySelectorAll<FlintMenuItem>('flint-menu-item'));

        // Navigate to second via ArrowDown
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await el.updateComplete;
        expect(document.activeElement).toBe(items[1]);

        // ArrowUp → back to first
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        await el.updateComplete;
        expect(document.activeElement).toBe(items[0]);
    });

    it('wraps from first to last on ArrowUp', async () => {
        const el = await fixture<FlintMenu>(html`
            <flint-menu>
                <flint-menu-item>First</flint-menu-item>
                <flint-menu-item>Last</flint-menu-item>
            </flint-menu>
        `);
        el.open = true;
        await settle(el);

        const items = Array.from(el.querySelectorAll<FlintMenuItem>('flint-menu-item'));

        // ArrowUp from first wraps to last
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        await el.updateComplete;
        expect(document.activeElement).toBe(items[1]);
    });

    it('focuses first item on Home key', async () => {
        const el = await fixture<FlintMenu>(html`
            <flint-menu>
                <flint-menu-item>Alpha</flint-menu-item>
                <flint-menu-item>Beta</flint-menu-item>
                <flint-menu-item>Gamma</flint-menu-item>
            </flint-menu>
        `);
        el.open = true;
        await settle(el);

        const items = Array.from(el.querySelectorAll<FlintMenuItem>('flint-menu-item'));

        // Navigate forward, then Home → first
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await el.updateComplete;

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
        await el.updateComplete;
        expect(document.activeElement).toBe(items[0]);
    });

    it('focuses last item on End key', async () => {
        const el = await fixture<FlintMenu>(html`
            <flint-menu>
                <flint-menu-item>Alpha</flint-menu-item>
                <flint-menu-item>Beta</flint-menu-item>
                <flint-menu-item>Gamma</flint-menu-item>
            </flint-menu>
        `);
        el.open = true;
        await settle(el);

        const items = Array.from(el.querySelectorAll<FlintMenuItem>('flint-menu-item'));

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
        await el.updateComplete;
        expect(document.activeElement).toBe(items[2]);
    });

    it('ignores navigation keys when menu is closed', async () => {
        const el = await fixture<FlintMenu>(html`
            <flint-menu>
                <flint-menu-item>First</flint-menu-item>
            </flint-menu>
        `);
        await settle(el); // menu stays closed, no auto-focus

        const beforeFocus = document.activeElement;

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await el.updateComplete;

        // Focus must not have moved into a menu item
        expect(document.activeElement).toBe(beforeFocus);
    });

    // ── First-character jump ─────────────────────────────────────────────
    it('jumps to matching item on first-character keypress', async () => {
        const el = await fixture<FlintMenu>(html`
            <flint-menu>
                <flint-menu-item>Alpha</flint-menu-item>
                <flint-menu-item>Beta</flint-menu-item>
                <flint-menu-item>Gamma</flint-menu-item>
            </flint-menu>
        `);
        el.open = true;
        await settle(el);

        const items = Array.from(el.querySelectorAll<FlintMenuItem>('flint-menu-item'));

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'b', bubbles: true }));
        await el.updateComplete;

        expect(document.activeElement).toBe(items[1]); // Beta
    });

    // ── disconnectedCallback cleanup ─────────────────────────────────────
    it('removes window keydown listener on disconnect', async () => {
        const el = await fixture<FlintMenu>(html`<flint-menu open></flint-menu>`);
        const spy = vi.fn();
        el.addEventListener('flint-menu-close', spy);

        el.remove();
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        expect(spy).not.toHaveBeenCalled();
    });

    // ── scrollIntoView guard ─────────────────────────────────────────────
    it('does not throw when scrollIntoView is not available on focus target', async () => {
        const el = await fixture<FlintMenu>(html`
            <flint-menu>
                <flint-menu-item id="no-scroll">Item</flint-menu-item>
            </flint-menu>
        `);
        const item = el.querySelector<FlintMenuItem>('#no-scroll')!;
        await item.updateComplete;

        // Remove scrollIntoView from the inner .item div to test the guard
        const innerItem = item.shadowRoot!.querySelector<HTMLElement>('.item')!;
        (innerItem as Record<string, unknown>).scrollIntoView = undefined;

        el.open = true;
        await settle(el);

        // Should not throw — the guard skips scrollIntoView when it's not a function
        expect(item).toBeDefined();
    });

    // ── open with no items ───────────────────────────────────────────────
    it('does not throw when opening with no items', async () => {
        const el = await fixture<FlintMenu>(html`<flint-menu></flint-menu>`);
        el.open = true;
        await settle(el);
        // No items → items.length is 0 → no focus happens
        expect(el.open).toBe(true);
    });
});

// ═══════════════════════════════════════════════════════════════════════
// flint-menu-item
// ═══════════════════════════════════════════════════════════════════════
describe('flint-menu-item', () => {
    afterEach(() => vi.restoreAllMocks());

    // ── Defaults ─────────────────────────────────────────────────────────
    it('is not selected by default', async () => {
        const el = await fixture<FlintMenuItem>(html`<flint-menu-item>Item</flint-menu-item>`);
        expect(el.selected).toBe(false);
    });

    it('is not disabled by default', async () => {
        const el = await fixture<FlintMenuItem>(html`<flint-menu-item>Item</flint-menu-item>`);
        expect(el.disabled).toBe(false);
    });

    it('has tabindex=0 by default', async () => {
        const el = await fixture<FlintMenuItem>(html`<flint-menu-item>Item</flint-menu-item>`);
        await el.updateComplete;
        const item = el.shadowRoot!.querySelector('.item') as HTMLElement;
        expect(item.getAttribute('tabindex')).toBe('0');
    });

    // ── Attributes & reflection ───────────────────────────────────────────
    it('reflects selected attribute', async () => {
        const el = await fixture<FlintMenuItem>(html`<flint-menu-item selected>Item</flint-menu-item>`);
        expect(el.selected).toBe(true);
        expect(el.hasAttribute('selected')).toBe(true);
    });

    it('reflects disabled attribute', async () => {
        const el = await fixture<FlintMenuItem>(html`<flint-menu-item disabled>Item</flint-menu-item>`);
        expect(el.disabled).toBe(true);
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('has tabindex=-1 when disabled', async () => {
        const el = await fixture<FlintMenuItem>(html`<flint-menu-item disabled>Item</flint-menu-item>`);
        await el.updateComplete;
        const item = el.shadowRoot!.querySelector('.item') as HTMLElement;
        expect(item.getAttribute('tabindex')).toBe('-1');
    });

    // ── ARIA ─────────────────────────────────────────────────────────────
    it('has role="menuitem"', async () => {
        const el = await fixture<FlintMenuItem>(html`<flint-menu-item>Item</flint-menu-item>`);
        await el.updateComplete;
        const item = el.shadowRoot!.querySelector('.item');
        expect(item?.getAttribute('role')).toBe('menuitem');
    });

    it('sets aria-disabled="true" when disabled', async () => {
        const el = await fixture<FlintMenuItem>(html`<flint-menu-item disabled>Item</flint-menu-item>`);
        await el.updateComplete;
        const item = el.shadowRoot!.querySelector('.item');
        expect(item?.getAttribute('aria-disabled')).toBe('true');
    });

    it('sets aria-disabled="false" when not disabled', async () => {
        const el = await fixture<FlintMenuItem>(html`<flint-menu-item>Item</flint-menu-item>`);
        await el.updateComplete;
        const item = el.shadowRoot!.querySelector('.item');
        expect(item?.getAttribute('aria-disabled')).toBe('false');
    });

    // ── Event firing ─────────────────────────────────────────────────────
    it('fires flint-menu-item-select on click', async () => {
        const el = await fixture<FlintMenuItem>(html`<flint-menu-item>Item</flint-menu-item>`);
        const item = el.shadowRoot!.querySelector('.item') as HTMLElement;
        setTimeout(() => item.click());
        const event = await oneEvent(el, 'flint-menu-item-select') as CustomEvent;
        expect(event).toBeDefined();
        expect(event.detail).toBeDefined();
    });

    it('fires flint-menu-item-select with label in detail', async () => {
        const el = await fixture<FlintMenuItem>(html`<flint-menu-item>My Label</flint-menu-item>`);
        const item = el.shadowRoot!.querySelector('.item') as HTMLElement;
        setTimeout(() => item.click());
        const event = await oneEvent(el, 'flint-menu-item-select') as CustomEvent;
        expect(event.detail.label).toBe('My Label');
    });

    it('fires flint-menu-item-select with value prop in detail', async () => {
        const el = await fixture<FlintMenuItem>(html`<flint-menu-item value="my-val">Label</flint-menu-item>`);
        const item = el.shadowRoot!.querySelector('.item') as HTMLElement;
        setTimeout(() => item.click());
        const event = await oneEvent(el, 'flint-menu-item-select') as CustomEvent;
        expect(event.detail.value).toBe('my-val');
    });

    it('falls back detail.value to label text when no value prop set', async () => {
        const el = await fixture<FlintMenuItem>(html`<flint-menu-item>Fallback Label</flint-menu-item>`);
        const item = el.shadowRoot!.querySelector('.item') as HTMLElement;
        setTimeout(() => item.click());
        const event = await oneEvent(el, 'flint-menu-item-select') as CustomEvent;
        expect(event.detail.value).toBe('Fallback Label');
    });

    it('excludes icon slot text from detail.label', async () => {
        const el = await fixture<FlintMenuItem>(html`
            <flint-menu-item>
                <span slot="icon">★</span>
                Clean Label
            </flint-menu-item>
        `);
        await el.updateComplete;
        await new Promise(r => setTimeout(r, 0));
        const item = el.shadowRoot!.querySelector('.item') as HTMLElement;
        setTimeout(() => item.click());
        const event = await oneEvent(el, 'flint-menu-item-select') as CustomEvent;
        expect(event.detail.label).toBe('Clean Label');
        expect(event.detail.label).not.toContain('★');
    });

    it('does NOT fire flint-menu-item-select when disabled', async () => {
        const el = await fixture<FlintMenuItem>(html`<flint-menu-item disabled>Item</flint-menu-item>`);
        const spy = vi.fn();
        el.addEventListener('flint-menu-item-select', spy);
        el.shadowRoot!.querySelector<HTMLElement>('.item')?.click();
        expect(spy).not.toHaveBeenCalled();
    });

    // ── Keyboard activation ──────────────────────────────────────────────
    it('fires flint-menu-item-select on Enter key', async () => {
        const el = await fixture<FlintMenuItem>(html`<flint-menu-item>Item</flint-menu-item>`);
        const item = el.shadowRoot!.querySelector('.item') as HTMLElement;
        const spy = vi.fn();
        el.addEventListener('flint-menu-item-select', spy);
        item.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
    });

    it('fires flint-menu-item-select on Space key', async () => {
        const el = await fixture<FlintMenuItem>(html`<flint-menu-item>Item</flint-menu-item>`);
        const item = el.shadowRoot!.querySelector('.item') as HTMLElement;
        const spy = vi.fn();
        el.addEventListener('flint-menu-item-select', spy);
        item.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
    });

    it('calls preventDefault on Space key to prevent page scroll', async () => {
        const el = await fixture<FlintMenuItem>(html`<flint-menu-item>Item</flint-menu-item>`);
        const item = el.shadowRoot!.querySelector('.item') as HTMLElement;
        const spaceEvent = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true });
        const preventSpy = vi.spyOn(spaceEvent, 'preventDefault');
        item.dispatchEvent(spaceEvent);
        expect(preventSpy).toHaveBeenCalled();
    });

    it('calls preventDefault on Enter key', async () => {
        const el = await fixture<FlintMenuItem>(html`<flint-menu-item>Item</flint-menu-item>`);
        const item = el.shadowRoot!.querySelector('.item') as HTMLElement;
        const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
        const preventSpy = vi.spyOn(enterEvent, 'preventDefault');
        item.dispatchEvent(enterEvent);
        expect(preventSpy).toHaveBeenCalled();
    });

    // ── Dense / divider ──────────────────────────────────────────────────
    it('reflects dense attribute', async () => {
        const el = await fixture<FlintMenuItem>(html`<flint-menu-item dense>Item</flint-menu-item>`);
        expect(el.hasAttribute('dense')).toBe(true);
    });

    it('reflects divider attribute', async () => {
        const el = await fixture<FlintMenuItem>(html`<flint-menu-item divider>Item</flint-menu-item>`);
        expect(el.hasAttribute('divider')).toBe(true);
    });

    it('can have both selected and dense attributes', async () => {
        const el = await fixture<FlintMenuItem>(html`<flint-menu-item selected dense>Item</flint-menu-item>`);
        expect(el.hasAttribute('selected')).toBe(true);
        expect(el.hasAttribute('dense')).toBe(true);
    });

    // ── Icon slot space ──────────────────────────────────────────────────
    it('icon-wrap has [hidden] when no icon is slotted (no empty space)', async () => {
        const el = await fixture<FlintMenuItem>(html`<flint-menu-item>No Icon</flint-menu-item>`);
        await el.updateComplete;
        const iconWrap = el.shadowRoot!.querySelector('.icon-wrap') as HTMLElement;
        expect(iconWrap.hasAttribute('hidden')).toBe(true);
    });

    it('end-icon-wrap has [hidden] when no end-icon is slotted', async () => {
        const el = await fixture<FlintMenuItem>(html`<flint-menu-item>No End Icon</flint-menu-item>`);
        await el.updateComplete;
        const endIconWrap = el.shadowRoot!.querySelector('.end-icon-wrap') as HTMLElement;
        expect(endIconWrap.hasAttribute('hidden')).toBe(true);
    });

    it('icon-wrap is visible when icon slot is filled', async () => {
        const el = await fixture<FlintMenuItem>(html`
            <flint-menu-item>
                <span slot="icon">★</span>
                With Icon
            </flint-menu-item>
        `);
        await el.updateComplete;
        await new Promise(r => setTimeout(r, 0));
        await el.updateComplete;
        const iconWrap = el.shadowRoot!.querySelector('.icon-wrap') as HTMLElement;
        expect(iconWrap.hasAttribute('hidden')).toBe(false);
    });

    it('end-icon-wrap is visible when end-icon slot is filled', async () => {
        const el = await fixture<FlintMenuItem>(html`
            <flint-menu-item>
                Label
                <span slot="end-icon">⌘K</span>
            </flint-menu-item>
        `);
        await el.updateComplete;
        await new Promise(r => setTimeout(r, 0));
        await el.updateComplete;
        const endIconWrap = el.shadowRoot!.querySelector('.end-icon-wrap') as HTMLElement;
        expect(endIconWrap.hasAttribute('hidden')).toBe(false);
    });
});

// ═══════════════════════════════════════════════════════════════════════
// flint-menu-divider
// ═══════════════════════════════════════════════════════════════════════
describe('flint-menu-divider', () => {
    it('renders as a block element in the DOM', async () => {
        const el = await fixture(html`
            <flint-menu open>
                <flint-menu-item>Above</flint-menu-item>
                <flint-menu-divider></flint-menu-divider>
                <flint-menu-item>Below</flint-menu-item>
            </flint-menu>
        `);
        const divider = el.querySelector('flint-menu-divider');
        expect(divider).toBeTruthy();
        expect(divider).toBeInstanceOf(HTMLElement);
    });

    it('is positioned between items', async () => {
        const el = await fixture(html`
            <flint-menu open>
                <flint-menu-item id="a">A</flint-menu-item>
                <flint-menu-divider id="div"></flint-menu-divider>
                <flint-menu-item id="b">B</flint-menu-item>
            </flint-menu>
        `);
        const children = Array.from(el.children).map(c => c.tagName.toLowerCase());
        expect(children).toEqual(['flint-menu-item', 'flint-menu-divider', 'flint-menu-item']);
    });
});

// ═══════════════════════════════════════════════════════════════════════
// flint-menu-group
// ═══════════════════════════════════════════════════════════════════════
describe('flint-menu-group', () => {
    it('renders a role="group" container', async () => {
        const el = await fixture<FlintMenuGroup>(html`
            <flint-menu-group label="Account">
                <flint-menu-item>Profile</flint-menu-item>
            </flint-menu-group>
        `);
        await el.updateComplete;
        const group = el.shadowRoot!.querySelector('[role="group"]');
        expect(group).toBeTruthy();
    });

    it('renders the label text', async () => {
        const el = await fixture<FlintMenuGroup>(html`
            <flint-menu-group label="Settings"></flint-menu-group>
        `);
        await el.updateComplete;
        const labelEl = el.shadowRoot!.querySelector('.group-label');
        expect(labelEl?.textContent?.trim()).toBe('Settings');
    });

    it('sets aria-label on the group element', async () => {
        const el = await fixture<FlintMenuGroup>(html`
            <flint-menu-group label="Account"></flint-menu-group>
        `);
        await el.updateComplete;
        const group = el.shadowRoot!.querySelector('[role="group"]');
        expect(group?.getAttribute('aria-label')).toBe('Account');
    });

    it('omits label element when label prop is empty', async () => {
        const el = await fixture<FlintMenuGroup>(html`
            <flint-menu-group></flint-menu-group>
        `);
        await el.updateComplete;
        const labelEl = el.shadowRoot!.querySelector('.group-label');
        expect(labelEl).toBeNull();
    });

    it('slots items correctly', async () => {
        const el = await fixture<FlintMenuGroup>(html`
            <flint-menu-group label="Account">
                <flint-menu-item id="p">Profile</flint-menu-item>
                <flint-menu-item id="s">Settings</flint-menu-item>
            </flint-menu-group>
        `);
        expect(el.querySelectorAll('flint-menu-item').length).toBe(2);
    });
});
