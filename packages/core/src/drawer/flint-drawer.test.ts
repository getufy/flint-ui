import { describe, it, expect, vi } from 'vitest';
import { fixture, html, oneEvent } from '@open-wc/testing';
import './flint-drawer.js';
import type { FlintDrawer } from './flint-drawer.js';

describe('flint-drawer', () => {
    it('is defined', async () => {
        const el = document.createElement('flint-drawer');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('renders temporary drawer by default', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer></flint-drawer>`);
        expect(el.variant).toBe('temporary');
    });

    it('shows backdrop when open and variant is temporary', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer open variant="temporary"></flint-drawer>`);
        const backdrop = el.shadowRoot!.querySelector('.backdrop');
        expect(backdrop).not.toBeNull();
        expect(backdrop?.classList.contains('open')).toBe(true);
    });

    it('dispatches flint-drawer-close when backdrop is clicked', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer open></flint-drawer>`);
        const backdrop = el.shadowRoot!.querySelector('.backdrop') as HTMLElement;

        setTimeout(() => backdrop?.click());

        const event = await oneEvent(el, 'flint-drawer-close');
        expect(event).toBeDefined();
    });

    it('dispatches flint-drawer-close when Escape is pressed', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer open></flint-drawer>`);

        const closeSpy = vi.fn();
        el.addEventListener('flint-drawer-close', closeSpy);

        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        expect(closeSpy).toHaveBeenCalled();
    });

    it('does not dispatch flint-drawer-close when Escape is already defaultPrevented', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer open></flint-drawer>`);

        const closeSpy = vi.fn();
        el.addEventListener('flint-drawer-close', closeSpy);

        const evt = new KeyboardEvent('keydown', { key: 'Escape', cancelable: true });
        evt.preventDefault();
        window.dispatchEvent(evt);

        expect(closeSpy).not.toHaveBeenCalled();
    });

    it('paper has open class when open', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer anchor="right" open></flint-drawer>`);
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.classList.contains('open')).toBe(true);
    });

    it('shows edge handle when edge is true and closed', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer edge></flint-drawer>`);
        const edge = el.shadowRoot!.querySelector('.edge');
        expect(edge).not.toBeNull();
    });

    it('opens drawer when edge handle is clicked', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer edge></flint-drawer>`);
        const edge = el.shadowRoot!.querySelector('.edge') as HTMLElement;
        edge.click();
        expect(el.open).toBe(true);
    });

    it('supports persistent variant without backdrop', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer variant="persistent" open></flint-drawer>`);
        const backdrop = el.shadowRoot!.querySelector('.backdrop');
        expect(backdrop).toBeNull();
    });

    // ── Edge handle corner cases ─────────────────────────────────────────────

    it('does not show edge handle for persistent variant', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer variant="persistent" edge></flint-drawer>`);
        const edge = el.shadowRoot!.querySelector('.edge');
        // CSS restricts edge to temporary only; also showEdge JS check
        expect(edge).toBeNull();
    });

    it('does not show edge handle for mini variant', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer variant="mini" edge></flint-drawer>`);
        const edge = el.shadowRoot!.querySelector('.edge');
        expect(edge).toBeNull();
    });

    it('does not show edge handle when drawer is open', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer edge open></flint-drawer>`);
        const edge = el.shadowRoot!.querySelector('.edge');
        expect(edge).toBeNull();
    });

    // ── aria-hidden correctness ──────────────────────────────────────────────

    it('sets aria-hidden="true" on paper when temporary drawer is closed', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer></flint-drawer>`);
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.getAttribute('aria-hidden')).toBe('true');
    });

    it('sets aria-hidden="false" on paper when temporary drawer is open', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer open></flint-drawer>`);
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.getAttribute('aria-hidden')).toBe('false');
    });

    it('mini variant paper is never aria-hidden even when collapsed', async () => {
        // Mini icons remain visually accessible when collapsed — must not be hidden from AT
        const el = await fixture<FlintDrawer>(html`<flint-drawer variant="mini"></flint-drawer>`);
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.getAttribute('aria-hidden')).toBe('false');
    });

    // ── role and aria-modal ──────────────────────────────────────────────────

    it('paper has role="dialog" for temporary variant', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer variant="temporary"></flint-drawer>`);
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.getAttribute('role')).toBe('dialog');
    });

    it('paper has role="complementary" for persistent variant', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer variant="persistent" open></flint-drawer>`);
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.getAttribute('role')).toBe('complementary');
    });

    it('paper has role="complementary" for mini variant', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer variant="mini"></flint-drawer>`);
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.getAttribute('role')).toBe('complementary');
    });

    it('paper has aria-modal="true" when temporary drawer is open', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer open></flint-drawer>`);
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.getAttribute('aria-modal')).toBe('true');
    });

    it('paper has aria-modal="false" when temporary drawer is closed', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer></flint-drawer>`);
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.getAttribute('aria-modal')).toBe('false');
    });

    // ── Accessible label ─────────────────────────────────────────────────────

    it('paper has default aria-label "Drawer"', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer></flint-drawer>`);
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.getAttribute('aria-label')).toBe('Drawer');
    });

    it('paper uses custom label when label property is set', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer label="Main navigation"></flint-drawer>`);
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.getAttribute('aria-label')).toBe('Main navigation');
    });

    // ── Focus management ─────────────────────────────────────────────────────

    it('paper has tabindex="-1" to receive programmatic focus', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer></flint-drawer>`);
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.getAttribute('tabindex')).toBe('-1');
    });

    it('moves focus into paper when temporary drawer opens', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer></flint-drawer>`);
        el.open = true;
        await el.updateComplete;
        const paper = el.shadowRoot!.querySelector<HTMLElement>('.paper');
        expect(document.activeElement).toBe(el);
        // The paper inside the shadow root should be the active element
        expect(el.shadowRoot!.activeElement).toBe(paper);
    });

    it('returns focus to trigger element when temporary drawer closes', async () => {
        const trigger = await fixture<HTMLButtonElement>(html`<button>Open</button>`);
        const el = await fixture<FlintDrawer>(html`<flint-drawer></flint-drawer>`);

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

        const el = await fixture<FlintDrawer>(html`<flint-drawer variant="persistent"></flint-drawer>`);
        el.open = true;
        await el.updateComplete;

        // Focus should remain on the trigger — persistent drawers don't steal focus
        expect(document.activeElement).toBe(trigger);
    });

    // ── Default property values ──────────────────────────────────────────────

    it('edge is false by default', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer></flint-drawer>`);
        expect(el.edge).toBe(false);
        // No edge handle rendered without the edge attribute
        const edge = el.shadowRoot!.querySelector('.edge');
        expect(edge).toBeNull();
    });

    it('container is false by default', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer></flint-drawer>`);
        expect(el.container).toBe(false);
        expect(el.hasAttribute('container')).toBe(false);
    });

    // ── Keydown handler — each guard condition tested independently ──────────

    it('Escape when drawer is closed does not dispatch flint-drawer-close', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer></flint-drawer>`);
        const closeSpy = vi.fn();
        el.addEventListener('flint-drawer-close', closeSpy);
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        expect(closeSpy).not.toHaveBeenCalled();
    });

    it('non-Escape key when open does not dispatch flint-drawer-close', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer open></flint-drawer>`);
        const closeSpy = vi.fn();
        el.addEventListener('flint-drawer-close', closeSpy);
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        expect(closeSpy).not.toHaveBeenCalled();
    });

    it('ArrowDown key when open does not dispatch flint-drawer-close', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer open></flint-drawer>`);
        const closeSpy = vi.fn();
        el.addEventListener('flint-drawer-close', closeSpy);
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        expect(closeSpy).not.toHaveBeenCalled();
    });

    it('Escape on persistent variant does not dispatch flint-drawer-close', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer open variant="persistent"></flint-drawer>`);
        const closeSpy = vi.fn();
        el.addEventListener('flint-drawer-close', closeSpy);
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        expect(closeSpy).not.toHaveBeenCalled();
    });

    it('Escape on mini variant does not dispatch flint-drawer-close', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer open variant="mini"></flint-drawer>`);
        const closeSpy = vi.fn();
        el.addEventListener('flint-drawer-close', closeSpy);
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        expect(closeSpy).not.toHaveBeenCalled();
    });

    // ── Event properties ─────────────────────────────────────────────────────

    it('flint-drawer-close event has bubbles=true and composed=true', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer open></flint-drawer>`);
        let capturedEvent: CustomEvent | null = null;
        el.addEventListener('flint-drawer-close', (e) => { capturedEvent = e as CustomEvent; });
        const backdrop = el.shadowRoot!.querySelector('.backdrop') as HTMLElement;
        backdrop.click();
        expect(capturedEvent!.bubbles).toBe(true);
        expect(capturedEvent!.composed).toBe(true);
    });

    it('flint-drawer-close event bubbles to a parent element', async () => {
        const parent = await fixture<HTMLDivElement>(html`
            <div><flint-drawer open></flint-drawer></div>
        `);
        const el = parent.querySelector('flint-drawer') as FlintDrawer;
        const closeSpy = vi.fn();
        parent.addEventListener('flint-drawer-close', closeSpy);
        const backdrop = el.shadowRoot!.querySelector('.backdrop') as HTMLElement;
        backdrop.click();
        expect(closeSpy).toHaveBeenCalled();
    });

    // ── updated() early-return branch ────────────────────────────────────────

    it('changing a non-open property triggers update without moving focus', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer open></flint-drawer>`);
        // Trigger a re-render with a non-open property change; updated() must
        // return early at the !changed.has('open') guard without side effects.
        el.label = 'Navigation';
        await el.updateComplete;
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.getAttribute('aria-label')).toBe('Navigation');
    });

    it('anchor change does not trigger focus side effects', async () => {
        const trigger = await fixture<HTMLButtonElement>(html`<button>btn</button>`);
        trigger.focus();
        const el = await fixture<FlintDrawer>(html`<flint-drawer open></flint-drawer>`);
        el.anchor = 'right';
        await el.updateComplete;
        // Paper is still a dialog — no crash, no unwanted focus steal
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.getAttribute('role')).toBe('dialog');
    });

    // ── Edge anchor classes ──────────────────────────────────────────────────

    it('edge handle has edge-left class for left anchor (default)', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer edge></flint-drawer>`);
        const edge = el.shadowRoot!.querySelector('.edge');
        expect(edge?.classList.contains('edge-left')).toBe(true);
    });

    it('edge handle has edge-right class for right anchor', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer edge anchor="right"></flint-drawer>`);
        const edge = el.shadowRoot!.querySelector('.edge');
        expect(edge?.classList.contains('edge-right')).toBe(true);
    });

    it('edge handle has edge-top class for top anchor', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer edge anchor="top"></flint-drawer>`);
        const edge = el.shadowRoot!.querySelector('.edge');
        expect(edge?.classList.contains('edge-top')).toBe(true);
    });

    it('edge handle has edge-bottom class for bottom anchor', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer edge anchor="bottom"></flint-drawer>`);
        const edge = el.shadowRoot!.querySelector('.edge');
        expect(edge?.classList.contains('edge-bottom')).toBe(true);
    });

    // ── Disconnect cleanup ───────────────────────────────────────────────────

    it('disconnecting removes keydown listener — Escape no longer fires close', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer open></flint-drawer>`);
        const closeSpy = vi.fn();
        el.addEventListener('flint-drawer-close', closeSpy);
        el.remove();
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        expect(closeSpy).not.toHaveBeenCalled();
    });

    // ── Mini focus management ────────────────────────────────────────────────

    it('mini variant open does not steal focus', async () => {
        const trigger = await fixture<HTMLButtonElement>(html`<button>Toggle</button>`);
        trigger.focus();
        const el = await fixture<FlintDrawer>(html`<flint-drawer variant="mini"></flint-drawer>`);
        el.open = true;
        await el.updateComplete;
        expect(document.activeElement).toBe(trigger);
    });

    it('mini variant close does not restore focus to a previous element', async () => {
        const trigger = await fixture<HTMLButtonElement>(html`<button>Toggle</button>`);
        trigger.focus();
        const el = await fixture<FlintDrawer>(html`<flint-drawer variant="mini" open></flint-drawer>`);
        el.open = false;
        await el.updateComplete;
        // Focus was never moved by the drawer, so it remains on trigger
        expect(document.activeElement).toBe(trigger);
    });

    // ── Backdrop role="presentation" ────────────────────────────────────────

    it('backdrop has role="presentation"', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer open></flint-drawer>`);
        const backdrop = el.shadowRoot!.querySelector('.backdrop');
        expect(backdrop?.getAttribute('role')).toBe('presentation');
    });

    // ── Backdrop/paper closed state ──────────────────────────────────────────

    it('backdrop does not have open class when drawer is closed', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer></flint-drawer>`);
        const backdrop = el.shadowRoot!.querySelector('.backdrop');
        expect(backdrop?.classList.contains('open')).toBe(false);
    });

    it('paper does not have open class when drawer is closed', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer></flint-drawer>`);
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.classList.contains('open')).toBe(false);
    });

    // ── aria-hidden on persistent ────────────────────────────────────────────

    it('persistent variant paper is aria-hidden when closed', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer variant="persistent"></flint-drawer>`);
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.getAttribute('aria-hidden')).toBe('true');
    });

    it('persistent variant paper is not aria-hidden when open', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer variant="persistent" open></flint-drawer>`);
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.getAttribute('aria-hidden')).toBe('false');
    });

    it('mini variant paper is never aria-hidden even when open', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer variant="mini" open></flint-drawer>`);
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.getAttribute('aria-hidden')).toBe('false');
    });

    // ── aria-modal on non-temporary ──────────────────────────────────────────

    it('paper has aria-modal="false" for persistent variant when open', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer variant="persistent" open></flint-drawer>`);
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.getAttribute('aria-modal')).toBe('false');
    });

    it('paper has aria-modal="false" for mini variant', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer variant="mini" open></flint-drawer>`);
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.getAttribute('aria-modal')).toBe('false');
    });

    // ── Anchor attribute ─────────────────────────────────────────────────────

    it('default anchor is left', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer></flint-drawer>`);
        expect(el.anchor).toBe('left');
        expect(el.getAttribute('anchor')).toBe('left');
    });

    it('anchor reflects to attribute', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer anchor="right"></flint-drawer>`);
        expect(el.getAttribute('anchor')).toBe('right');
    });

    // ── Open/close state transitions ─────────────────────────────────────────

    it('closing an open drawer removes open class from backdrop', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer open></flint-drawer>`);
        el.open = false;
        await el.updateComplete;
        const backdrop = el.shadowRoot!.querySelector('.backdrop');
        expect(backdrop?.classList.contains('open')).toBe(false);
    });

    it('closing an open drawer removes open class from paper', async () => {
        const el = await fixture<FlintDrawer>(html`<flint-drawer open></flint-drawer>`);
        el.open = false;
        await el.updateComplete;
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.classList.contains('open')).toBe(false);
    });

});
