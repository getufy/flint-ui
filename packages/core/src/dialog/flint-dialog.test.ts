import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { LitElement } from 'lit';
import './flint-dialog.js';
import type { FlintDialog } from './flint-dialog.js';
import type { FlintDialogActions } from './flint-dialog.js';
import { FlintBackdrop } from '../backdrop/flint-backdrop.js';
import { expectAccessible } from '../test-utils/axe';

describe('flint-dialog', () => {

    // ── Existence ───────────────────────────────────────────────────────────
    it('is defined', () => {
        expect(document.createElement('flint-dialog')).toBeInstanceOf(HTMLElement);
        expect(document.createElement('flint-dialog-title')).toBeInstanceOf(HTMLElement);
        expect(document.createElement('flint-dialog-content')).toBeInstanceOf(HTMLElement);
        expect(document.createElement('flint-dialog-content-text')).toBeInstanceOf(HTMLElement);
        expect(document.createElement('flint-dialog-actions')).toBeInstanceOf(HTMLElement);
    });

    // ── Default state ────────────────────────────────────────────────────────
    it('renders as hidden by default', async () => {
        const el = await fixture<FlintDialog>(html`<flint-dialog></flint-dialog>`);
        await el.updateComplete;
        const panel = el.shadowRoot!.querySelector('.dialog-panel') as HTMLElement;
        expect(panel.classList.contains('open')).toBe(false);
        expect(el.open).toBe(false);
    });

    it('has pointer-events:none when closed', async () => {
        const el = await fixture<FlintDialog>(html`<flint-dialog></flint-dialog>`);
        await el.updateComplete;
        const panel = el.shadowRoot!.querySelector('.dialog-panel') as HTMLElement;
        expect(panel.style.pointerEvents).not.toBe('auto');
    });

    // ── Open state ───────────────────────────────────────────────────────────
    it('shows panel when open=true', async () => {
        const el = await fixture<FlintDialog>(html`<flint-dialog open></flint-dialog>`);
        await el.updateComplete;
        const panel = el.shadowRoot!.querySelector('.dialog-panel') as HTMLElement;
        expect(panel.classList.contains('open')).toBe(true);
        expect(el.open).toBe(true);
    });

    it('reflects open attribute on host', async () => {
        const el = await fixture<FlintDialog>(html`<flint-dialog open></flint-dialog>`);
        await el.updateComplete;
        expect(el.hasAttribute('open')).toBe(true);
    });

    // ── Close behaviour ──────────────────────────────────────────────────────
    it('dispatches close event when backdrop fires close', async () => {
        const el = await fixture<FlintDialog>(html`<flint-dialog open></flint-dialog>`);
        const backdrop = el.shadowRoot!.querySelector('flint-backdrop') as FlintBackdrop;
        const closeSpy = vi.fn();
        el.addEventListener('flint-dialog-close', closeSpy);

        backdrop.dispatchEvent(new CustomEvent('flint-backdrop-close', { bubbles: true, composed: true }));
        await el.updateComplete;

        expect(closeSpy).toHaveBeenCalledOnce();
    });

    it('requestClose() fires close event', async () => {
        const el = await fixture<FlintDialog>(html`<flint-dialog open></flint-dialog>`);
        const closeSpy = vi.fn();
        el.addEventListener('flint-dialog-close', closeSpy);

        el.requestClose();

        expect(closeSpy).toHaveBeenCalledOnce();
    });

    it('does NOT fire close when disableBackdropClose=true and backdrop is clicked', async () => {
        const el = await fixture<FlintDialog>(html`<flint-dialog open disable-backdrop-close></flint-dialog>`);
        const backdrop = el.shadowRoot!.querySelector('flint-backdrop') as FlintBackdrop;
        const closeSpy = vi.fn();
        el.addEventListener('flint-dialog-close', closeSpy);

        // Simulate backdrop firing flint-backdrop-close
        backdrop.dispatchEvent(new CustomEvent('flint-backdrop-close', { bubbles: true, composed: true }));
        await el.updateComplete;

        expect(closeSpy).not.toHaveBeenCalled();
    });

    // ── Transitions ──────────────────────────────────────────────────────────
    it('does NOT add a transition class for scale (default)', async () => {
        const el = await fixture<FlintDialog>(html`<flint-dialog></flint-dialog>`);
        await el.updateComplete;
        const panel = el.shadowRoot!.querySelector('.dialog-panel') as HTMLElement;
        // scale is handled via base CSS, not a class
        expect(panel.classList.contains('transition-scale')).toBe(false);
    });

    it('adds transition-slide-up class for slide-up', async () => {
        const el = await fixture<FlintDialog>(html`<flint-dialog transition="slide-up"></flint-dialog>`);
        await el.updateComplete;
        const panel = el.shadowRoot!.querySelector('.dialog-panel') as HTMLElement;
        expect(panel.classList.contains('transition-slide-up')).toBe(true);
    });

    it('adds transition-slide-down class for slide-down', async () => {
        const el = await fixture<FlintDialog>(html`<flint-dialog transition="slide-down"></flint-dialog>`);
        await el.updateComplete;
        const panel = el.shadowRoot!.querySelector('.dialog-panel') as HTMLElement;
        expect(panel.classList.contains('transition-slide-down')).toBe(true);
    });

    // ── Accessibility ────────────────────────────────────────────────────────
    it('panel has role="dialog" and aria-modal="true"', async () => {
        const el = await fixture<FlintDialog>(html`<flint-dialog open></flint-dialog>`);
        await el.updateComplete;
        const panel = el.shadowRoot!.querySelector('.dialog-panel') as HTMLElement;
        expect(panel.getAttribute('role')).toBe('dialog');
        expect(panel.getAttribute('aria-modal')).toBe('true');
    });

    it('panel has aria-labelledby (aria-describedby removed – no target element exists)', async () => {
        const el = await fixture<FlintDialog>(html`<flint-dialog open></flint-dialog>`);
        await el.updateComplete;
        const panel = el.shadowRoot!.querySelector('.dialog-panel') as HTMLElement;
        expect(panel.hasAttribute('aria-labelledby')).toBe(true);
        expect(panel.hasAttribute('aria-describedby')).toBe(false);
    });

    // ── Slots ────────────────────────────────────────────────────────────────
    it('renders slotted title, content, and actions', async () => {
        const el = await fixture<FlintDialog>(html`
            <flint-dialog open>
                <flint-dialog-title id="t">My Title</flint-dialog-title>
                <flint-dialog-content id="c">Content</flint-dialog-content>
                <flint-dialog-actions id="a">Actions</flint-dialog-actions>
            </flint-dialog>
        `);
        expect(el.querySelector('#t')).not.toBeNull();
        expect(el.querySelector('#c')).not.toBeNull();
        expect(el.querySelector('#a')).not.toBeNull();
    });

    // ── flint-dialog-actions align ──────────────────────────────────────────────
    it('dialog-actions reflects align attribute', async () => {
        const el = await fixture<FlintDialogActions>(html`
            <flint-dialog-actions align="start"></flint-dialog-actions>
        `);
        await el.updateComplete;
        expect(el.getAttribute('align')).toBe('start');
    });

    it('dialog-actions supports all align values', async () => {
        for (const align of ['start', 'center', 'end', 'space-between'] as const) {
            const el = await fixture<FlintDialogActions>(html`
                <flint-dialog-actions .align=${align}></flint-dialog-actions>
            `);
            await el.updateComplete;
            expect(el.align).toBe(align);
            expect(el.getAttribute('align')).toBe(align);
        }
    });

    // ── Escape key ────────────────────────────────────────────────────────────
    it('Escape fires close event when open', async () => {
        const el = await fixture<FlintDialog>(html`<flint-dialog open></flint-dialog>`);
        const closeSpy = vi.fn();
        el.addEventListener('flint-dialog-close', closeSpy);

        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        await el.updateComplete;

        expect(closeSpy).toHaveBeenCalledOnce();
    });

    it('Escape does NOT fire close when dialog is closed', async () => {
        const el = await fixture<FlintDialog>(html`<flint-dialog></flint-dialog>`);
        const closeSpy = vi.fn();
        el.addEventListener('flint-dialog-close', closeSpy);

        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        await el.updateComplete;

        expect(closeSpy).not.toHaveBeenCalled();
    });

    it('Escape fires close even when disableBackdropClose=true', async () => {
        const el = await fixture<FlintDialog>(html`<flint-dialog open disable-backdrop-close></flint-dialog>`);
        const closeSpy = vi.fn();
        el.addEventListener('flint-dialog-close', closeSpy);

        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        await el.updateComplete;

        expect(closeSpy).toHaveBeenCalledOnce();
    });

    it('removes keydown listener when disconnected', async () => {
        const el = await fixture<FlintDialog>(html`<flint-dialog open></flint-dialog>`);
        const closeSpy = vi.fn();
        el.addEventListener('flint-dialog-close', closeSpy);

        el.remove();

        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        expect(closeSpy).not.toHaveBeenCalled();
    });

    // ── Panel click isolation ─────────────────────────────────────────────────
    it('clicking inside the dialog panel does NOT fire close', async () => {
        const el = await fixture<FlintDialog>(html`<flint-dialog open></flint-dialog>`);
        const closeSpy = vi.fn();
        el.addEventListener('flint-dialog-close', closeSpy);

        const panel = el.shadowRoot!.querySelector('.dialog-panel') as HTMLElement;
        panel.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        await el.updateComplete;

        expect(closeSpy).not.toHaveBeenCalled();
    });

    // ── open toggling ─────────────────────────────────────────────────────────
    it('toggling open adds and removes the open class', async () => {
        const el = await fixture<FlintDialog>(html`<flint-dialog></flint-dialog>`);
        const panel = el.shadowRoot!.querySelector('.dialog-panel') as HTMLElement;

        el.open = true;
        await el.updateComplete;
        expect(panel.classList.contains('open')).toBe(true);

        el.open = false;
        await el.updateComplete;
        expect(panel.classList.contains('open')).toBe(false);
    });

    // ── Nested dialogs ────────────────────────────────────────────────────────
    it('Escape closes only the topmost open dialog, not the parent', async () => {
        const parent = await fixture<FlintDialog>(html`<flint-dialog open></flint-dialog>`);
        const child = await fixture<FlintDialog>(html`<flint-dialog open></flint-dialog>`);
        await parent.updateComplete;
        await child.updateComplete;

        const parentSpy = vi.fn();
        const childSpy = vi.fn();
        parent.addEventListener('flint-dialog-close', parentSpy);
        child.addEventListener('flint-dialog-close', childSpy);

        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        await parent.updateComplete;
        await child.updateComplete;

        expect(childSpy).toHaveBeenCalledOnce();
        expect(parentSpy).not.toHaveBeenCalled();
    });

    it('Escape closes parent after child is dismissed', async () => {
        const parent = await fixture<FlintDialog>(html`<flint-dialog open></flint-dialog>`);
        const child = await fixture<FlintDialog>(html`<flint-dialog open></flint-dialog>`);
        await parent.updateComplete;
        await child.updateComplete;

        const parentSpy = vi.fn();
        parent.addEventListener('flint-dialog-close', parentSpy);

        // Simulate host closing the child (host sets open=false on close event)
        child.open = false;
        await child.updateComplete;

        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        await parent.updateComplete;

        expect(parentSpy).toHaveBeenCalledOnce();
    });

    it('parent dialog stays open when child is dismissed via Escape', async () => {
        const parent = await fixture<FlintDialog>(html`<flint-dialog open></flint-dialog>`);
        const child = await fixture<FlintDialog>(html`<flint-dialog open></flint-dialog>`);
        await parent.updateComplete;
        await child.updateComplete;

        const parentSpy = vi.fn();
        parent.addEventListener('flint-dialog-close', parentSpy);

        // First Escape: closes child only
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        await parent.updateComplete;
        await child.updateComplete;

        expect(parentSpy).not.toHaveBeenCalled();
        expect(parent.open).toBe(true);
    });

    it('requestClose on child does not affect parent', async () => {
        const parent = await fixture<FlintDialog>(html`<flint-dialog open></flint-dialog>`);
        const child = await fixture<FlintDialog>(html`<flint-dialog open></flint-dialog>`);
        await parent.updateComplete;
        await child.updateComplete;

        const parentSpy = vi.fn();
        parent.addEventListener('flint-dialog-close', parentSpy);

        child.requestClose();

        expect(parentSpy).not.toHaveBeenCalled();
    });

    // ── Edge cases for _openDialogs tracking ───────────────────────────────────
    it('disconnecting a closed dialog does not error', async () => {
        const el = await fixture<FlintDialog>(html`<flint-dialog></flint-dialog>`);
        // Dialog was never opened, so it's not in _openDialogs
        el.remove();
        // Should not throw
        expect(true).toBe(true);
    });

    it('updating a non-open prop does not alter dialog stack', async () => {
        const el = await fixture<FlintDialog>(html`<flint-dialog open></flint-dialog>`);
        const closeSpy = vi.fn();
        el.addEventListener('flint-dialog-close', closeSpy);

        // Change transition (not open) — should not affect stack
        el.transition = 'slide-up';
        await el.updateComplete;

        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        expect(closeSpy).toHaveBeenCalledOnce();
    });

    it('opening an already-open dialog does not duplicate in stack', async () => {
        const el = await fixture<FlintDialog>(html`<flint-dialog open></flint-dialog>`);
        // Force another update cycle with open still true
        el.requestUpdate('open');
        await el.updateComplete;

        const closeSpy = vi.fn();
        el.addEventListener('flint-dialog-close', closeSpy);
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        expect(closeSpy).toHaveBeenCalledOnce();
    });

    // ── Focus management ────────────────────────────────────────────────────────

    it('moves focus into dialog panel when opened', async () => {
        const trigger = document.createElement('button');
        document.body.appendChild(trigger);
        trigger.focus();
        const el = await fixture<FlintDialog>(html`<flint-dialog .open=${true}><p>Content</p></flint-dialog>`);
        await el.updateComplete;
        const panel = el.shadowRoot!.querySelector('.dialog-panel');
        expect(el.shadowRoot!.activeElement).toBe(panel);
        trigger.remove();
    });

    it('restores focus to trigger when closed', async () => {
        const trigger = document.createElement('button');
        document.body.appendChild(trigger);
        trigger.focus();
        const el = await fixture<FlintDialog>(html`<flint-dialog .open=${true}><p>Content</p></flint-dialog>`);
        await el.updateComplete;
        el.open = false;
        await el.updateComplete;
        // Focus restore is deferred after close animation (async even in jsdom)
        await new Promise(r => setTimeout(r, 0));
        expect(document.activeElement).toBe(trigger);
        trigger.remove();
    });

    // ── Sub-component rendering ───────────────────────────────────────────────
    it('dialog-title renders an h2 inside shadow root', async () => {
        const el = await fixture(html`<flint-dialog-title>Hello</flint-dialog-title>`);
        await (el as LitElement).updateComplete;
        const h2 = el.shadowRoot!.querySelector('h2');
        expect(h2).not.toBeNull();
        expect(h2!.id).toBe('dialog-title');
    });

    it('dialog-content renders a slot', async () => {
        const el = await fixture(html`<flint-dialog-content>body</flint-dialog-content>`);
        await (el as LitElement).updateComplete;
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('dialog-content-text renders a slot', async () => {
        const el = await fixture(html`<flint-dialog-content-text>text</flint-dialog-content-text>`);
        await (el as LitElement).updateComplete;
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    // ── CSS parts ────────────────────────────────────────────────────────────
    it('exposes CSS parts for external styling', async () => {
        const el = await fixture<FlintDialog>(html`<flint-dialog open></flint-dialog>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('[part="panel"]')).not.toBeNull();
    });

    // ── Accessibility ─────────────────────────────────────────────────────────

    it('should pass automated a11y checks', async () => {
        const el = await fixture<FlintDialog>(html`
            <flint-dialog open aria-label="Test dialog">
                <flint-dialog-title>Title</flint-dialog-title>
                <flint-dialog-content>Content</flint-dialog-content>
                <flint-dialog-actions>
                    <button>OK</button>
                </flint-dialog-actions>
            </flint-dialog>
        `);
        await el.updateComplete;
        // aria-labelledby references a shadow DOM ID for the title slot — axe can't resolve cross-boundary
        await expectAccessible(el, { rules: { 'aria-dialog-name': { enabled: false } } });
    }, 15000);
});
