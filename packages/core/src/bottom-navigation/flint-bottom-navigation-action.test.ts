import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-bottom-navigation-action.js';
import type { FlintBottomNavigationAction } from './flint-bottom-navigation-action.js';

describe('flint-bottom-navigation-action', () => {
    // ── Rendering ──────────────────────────────────────────────────────────────

    it('creates a shadow root', async () => {
        const el = await fixture<FlintBottomNavigationAction>(html`
            <flint-bottom-navigation-action label="Home" value="home"></flint-bottom-navigation-action>
        `);
        expect(el.shadowRoot).not.toBeNull();
    });

    it('renders an icon-container with icon slot and default slot', async () => {
        const el = await fixture<FlintBottomNavigationAction>(html`
            <flint-bottom-navigation-action label="Home" value="home"></flint-bottom-navigation-action>
        `);
        const container = el.shadowRoot!.querySelector('.icon-container');
        expect(container).not.toBeNull();
        expect(container!.getAttribute('aria-hidden')).toBe('true');

        const iconSlot = container!.querySelector('slot[name="icon"]');
        expect(iconSlot).not.toBeNull();

        const defaultSlot = container!.querySelector('slot:not([name])');
        expect(defaultSlot).not.toBeNull();
    });

    it('renders label text in a span', async () => {
        const el = await fixture<FlintBottomNavigationAction>(html`
            <flint-bottom-navigation-action label="Favorites" value="favs"></flint-bottom-navigation-action>
        `);
        const labelSpan = el.shadowRoot!.querySelector('.label');
        expect(labelSpan).not.toBeNull();
        expect(labelSpan!.textContent?.trim()).toBe('Favorites');
    });

    it('projects slotted icon content', async () => {
        const el = await fixture<FlintBottomNavigationAction>(html`
            <flint-bottom-navigation-action label="Home" value="home">
                <span slot="icon">ICON</span>
            </flint-bottom-navigation-action>
        `);
        const iconSlot = el.shadowRoot!.querySelector('slot[name="icon"]') as HTMLSlotElement;
        const assigned = iconSlot.assignedElements();
        expect(assigned.length).toBe(1);
        expect(assigned[0].textContent).toBe('ICON');
    });

    // ── Properties ─────────────────────────────────────────────────────────────

    it('defaults label to empty string', () => {
        const el = document.createElement('flint-bottom-navigation-action') as FlintBottomNavigationAction;
        expect(el.label).toBe('');
    });

    it('defaults active to false', () => {
        const el = document.createElement('flint-bottom-navigation-action') as FlintBottomNavigationAction;
        expect(el.active).toBe(false);
    });

    it('defaults showLabel to true', () => {
        const el = document.createElement('flint-bottom-navigation-action') as FlintBottomNavigationAction;
        expect(el.showLabel).toBe(true);
    });

    it('reflects active attribute to host', async () => {
        const el = await fixture<FlintBottomNavigationAction>(html`
            <flint-bottom-navigation-action label="Home" value="home" active></flint-bottom-navigation-action>
        `);
        expect(el.active).toBe(true);
        expect(el.hasAttribute('active')).toBe(true);
    });

    it('adds hidden class to label when showLabel is false', async () => {
        const el = await fixture<FlintBottomNavigationAction>(html`
            <flint-bottom-navigation-action label="Home" value="home"></flint-bottom-navigation-action>
        `);
        el.showLabel = false;
        await el.updateComplete;
        const labelSpan = el.shadowRoot!.querySelector('.label');
        expect(labelSpan!.classList.contains('hidden')).toBe(true);
    });

    it('does not add hidden class when showLabel is true', async () => {
        const el = await fixture<FlintBottomNavigationAction>(html`
            <flint-bottom-navigation-action label="Home" value="home"></flint-bottom-navigation-action>
        `);
        const labelSpan = el.shadowRoot!.querySelector('.label');
        expect(labelSpan!.classList.contains('hidden')).toBe(false);
    });

    // ── ARIA ───────────────────────────────────────────────────────────────────

    it('sets role="tab" on the host element', async () => {
        const el = await fixture<FlintBottomNavigationAction>(html`
            <flint-bottom-navigation-action label="Home" value="home"></flint-bottom-navigation-action>
        `);
        expect(el._internals?.role).toBe('tab');
    });

    it('internals role is always tab regardless of host attribute', async () => {
        const el = await fixture<FlintBottomNavigationAction>(html`
            <flint-bottom-navigation-action label="Home" value="home" role="button"></flint-bottom-navigation-action>
        `);
        expect(el._internals?.role).toBe('tab');
    });

    it('sets tabindex="-1" by default (roving tabindex, parent sets 0 on active)', async () => {
        const el = await fixture<FlintBottomNavigationAction>(html`
            <flint-bottom-navigation-action label="Home" value="home"></flint-bottom-navigation-action>
        `);
        expect(el.tabIndex).toBe(-1);
    });

    it('sets aria-selected based on active property', async () => {
        const el = await fixture<FlintBottomNavigationAction>(html`
            <flint-bottom-navigation-action label="Home" value="home"></flint-bottom-navigation-action>
        `);
        await el.updateComplete;
        expect(el._internals?.ariaSelected).toBe('false');

        el.active = true;
        await el.updateComplete;
        expect(el._internals?.ariaSelected).toBe('true');
    });

    // ── Keyboard interaction ───────────────────────────────────────────────────

    it('fires click on Enter keydown', async () => {
        const el = await fixture<FlintBottomNavigationAction>(html`
            <flint-bottom-navigation-action label="Home" value="home"></flint-bottom-navigation-action>
        `);
        const spy = vi.fn();
        el.addEventListener('click', spy);

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
    });

    it('fires click on Space keydown', async () => {
        const el = await fixture<FlintBottomNavigationAction>(html`
            <flint-bottom-navigation-action label="Home" value="home"></flint-bottom-navigation-action>
        `);
        const spy = vi.fn();
        el.addEventListener('click', spy);

        el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
    });

    it('does not fire click on other keys', async () => {
        const el = await fixture<FlintBottomNavigationAction>(html`
            <flint-bottom-navigation-action label="Home" value="home"></flint-bottom-navigation-action>
        `);
        const spy = vi.fn();
        el.addEventListener('click', spy);

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
        expect(spy).not.toHaveBeenCalled();
    });

    // ── Lifecycle ──────────────────────────────────────────────────────────────

    it('removes keydown listener on disconnect', async () => {
        const el = await fixture<FlintBottomNavigationAction>(html`
            <flint-bottom-navigation-action label="Home" value="home"></flint-bottom-navigation-action>
        `);
        const spy = vi.fn();
        el.addEventListener('click', spy);

        el.remove();

        // keydown should no longer trigger click after disconnect
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        expect(spy).not.toHaveBeenCalled();
    });
});
