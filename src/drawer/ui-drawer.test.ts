import { describe, it, expect, vi } from 'vitest';
import { fixture, html, oneEvent } from '@open-wc/testing';
import './ui-drawer.js';
import type { UiDrawer } from './ui-drawer.js';

describe('ui-drawer', () => {
    it('is defined', async () => {
        const el = document.createElement('ui-drawer');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('renders temporary drawer by default', async () => {
        const el = await fixture<UiDrawer>(html`<ui-drawer></ui-drawer>`);
        expect(el.variant).toBe('temporary');
    });

    it('shows backdrop when open and variant is temporary', async () => {
        const el = await fixture<UiDrawer>(html`<ui-drawer open variant="temporary"></ui-drawer>`);
        const backdrop = el.shadowRoot!.querySelector('.backdrop');
        expect(backdrop).not.toBeNull();
        expect(backdrop?.classList.contains('open')).toBe(true);
    });

    it('dispatches ui-drawer-close when backdrop is clicked', async () => {
        const el = await fixture<UiDrawer>(html`<ui-drawer open></ui-drawer>`);
        const backdrop = el.shadowRoot!.querySelector('.backdrop') as HTMLElement;

        setTimeout(() => backdrop?.click());

        const event = await oneEvent(el, 'ui-drawer-close');
        expect(event).toBeDefined();
    });

    it('dispatches ui-drawer-close when Escape is pressed', async () => {
        const el = await fixture<UiDrawer>(html`<ui-drawer open></ui-drawer>`);

        const closeSpy = vi.fn();
        el.addEventListener('ui-drawer-close', closeSpy);

        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        expect(closeSpy).toHaveBeenCalled();
    });

    it('does not dispatch ui-drawer-close when Escape is already defaultPrevented', async () => {
        const el = await fixture<UiDrawer>(html`<ui-drawer open></ui-drawer>`);

        const closeSpy = vi.fn();
        el.addEventListener('ui-drawer-close', closeSpy);

        const evt = new KeyboardEvent('keydown', { key: 'Escape', cancelable: true });
        evt.preventDefault();
        window.dispatchEvent(evt);

        expect(closeSpy).not.toHaveBeenCalled();
    });

    it('paper has open class when open', async () => {
        const el = await fixture<UiDrawer>(html`<ui-drawer anchor="right" open></ui-drawer>`);
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.classList.contains('open')).toBe(true);
    });

    it('shows edge handle when edge is true and closed', async () => {
        const el = await fixture<UiDrawer>(html`<ui-drawer edge></ui-drawer>`);
        const edge = el.shadowRoot!.querySelector('.edge');
        expect(edge).not.toBeNull();
    });

    it('opens drawer when edge handle is clicked', async () => {
        const el = await fixture<UiDrawer>(html`<ui-drawer edge></ui-drawer>`);
        const edge = el.shadowRoot!.querySelector('.edge') as HTMLElement;
        edge.click();
        expect(el.open).toBe(true);
    });

    it('supports persistent variant without backdrop', async () => {
        const el = await fixture<UiDrawer>(html`<ui-drawer variant="persistent" open></ui-drawer>`);
        const backdrop = el.shadowRoot!.querySelector('.backdrop');
        expect(backdrop).toBeNull();
    });

    // ── Edge handle corner cases ─────────────────────────────────────────────

    it('does not show edge handle for persistent variant', async () => {
        const el = await fixture<UiDrawer>(html`<ui-drawer variant="persistent" edge></ui-drawer>`);
        const edge = el.shadowRoot!.querySelector('.edge');
        // CSS restricts edge to temporary only; also showEdge JS check
        expect(edge).toBeNull();
    });

    it('does not show edge handle for mini variant', async () => {
        const el = await fixture<UiDrawer>(html`<ui-drawer variant="mini" edge></ui-drawer>`);
        const edge = el.shadowRoot!.querySelector('.edge');
        expect(edge).toBeNull();
    });

    it('does not show edge handle when drawer is open', async () => {
        const el = await fixture<UiDrawer>(html`<ui-drawer edge open></ui-drawer>`);
        const edge = el.shadowRoot!.querySelector('.edge');
        expect(edge).toBeNull();
    });

    // ── aria-hidden correctness ──────────────────────────────────────────────

    it('sets aria-hidden="true" on paper when temporary drawer is closed', async () => {
        const el = await fixture<UiDrawer>(html`<ui-drawer></ui-drawer>`);
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.getAttribute('aria-hidden')).toBe('true');
    });

    it('sets aria-hidden="false" on paper when temporary drawer is open', async () => {
        const el = await fixture<UiDrawer>(html`<ui-drawer open></ui-drawer>`);
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.getAttribute('aria-hidden')).toBe('false');
    });

    it('mini variant paper is never aria-hidden even when collapsed', async () => {
        // Mini icons remain visually accessible when collapsed — must not be hidden from AT
        const el = await fixture<UiDrawer>(html`<ui-drawer variant="mini"></ui-drawer>`);
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.getAttribute('aria-hidden')).toBe('false');
    });

    // ── role and aria-modal ──────────────────────────────────────────────────

    it('paper has role="dialog" for temporary variant', async () => {
        const el = await fixture<UiDrawer>(html`<ui-drawer variant="temporary"></ui-drawer>`);
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.getAttribute('role')).toBe('dialog');
    });

    it('paper has role="complementary" for persistent variant', async () => {
        const el = await fixture<UiDrawer>(html`<ui-drawer variant="persistent" open></ui-drawer>`);
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.getAttribute('role')).toBe('complementary');
    });

    it('paper has role="complementary" for mini variant', async () => {
        const el = await fixture<UiDrawer>(html`<ui-drawer variant="mini"></ui-drawer>`);
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.getAttribute('role')).toBe('complementary');
    });

    it('paper has aria-modal="true" when temporary drawer is open', async () => {
        const el = await fixture<UiDrawer>(html`<ui-drawer open></ui-drawer>`);
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.getAttribute('aria-modal')).toBe('true');
    });

    it('paper has aria-modal="false" when temporary drawer is closed', async () => {
        const el = await fixture<UiDrawer>(html`<ui-drawer></ui-drawer>`);
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.getAttribute('aria-modal')).toBe('false');
    });

    // ── Accessible label ─────────────────────────────────────────────────────

    it('paper has default aria-label "Drawer"', async () => {
        const el = await fixture<UiDrawer>(html`<ui-drawer></ui-drawer>`);
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.getAttribute('aria-label')).toBe('Drawer');
    });

    it('paper uses custom label when label property is set', async () => {
        const el = await fixture<UiDrawer>(html`<ui-drawer label="Main navigation"></ui-drawer>`);
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.getAttribute('aria-label')).toBe('Main navigation');
    });

    // ── Focus management ─────────────────────────────────────────────────────

    it('paper has tabindex="-1" to receive programmatic focus', async () => {
        const el = await fixture<UiDrawer>(html`<ui-drawer></ui-drawer>`);
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.getAttribute('tabindex')).toBe('-1');
    });

    it('moves focus into paper when temporary drawer opens', async () => {
        const el = await fixture<UiDrawer>(html`<ui-drawer></ui-drawer>`);
        el.open = true;
        await el.updateComplete;
        const paper = el.shadowRoot!.querySelector<HTMLElement>('.paper');
        expect(document.activeElement).toBe(el);
        // The paper inside the shadow root should be the active element
        expect(el.shadowRoot!.activeElement).toBe(paper);
    });

    it('returns focus to trigger element when temporary drawer closes', async () => {
        const trigger = await fixture<HTMLButtonElement>(html`<button>Open</button>`);
        const el = await fixture<UiDrawer>(html`<ui-drawer></ui-drawer>`);

        trigger.focus();
        el.open = true;
        await el.updateComplete;

        el.open = false;
        await el.updateComplete;

        expect(document.activeElement).toBe(trigger);
    });

    it('does not move focus when non-temporary drawer opens', async () => {
        const trigger = await fixture<HTMLButtonElement>(html`<button>Toggle</button>`);
        trigger.focus();

        const el = await fixture<UiDrawer>(html`<ui-drawer variant="persistent"></ui-drawer>`);
        el.open = true;
        await el.updateComplete;

        // Focus should remain on the trigger — persistent drawers don't steal focus
        expect(document.activeElement).toBe(trigger);
    });
});
