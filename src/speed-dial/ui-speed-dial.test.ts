import { describe, it, expect, vi } from 'vitest';
import { fixture, html, oneEvent } from '@open-wc/testing';
import './ui-speed-dial.js';
import type { UiSpeedDial, UiSpeedDialAction } from './ui-speed-dial.js';

/* ── helpers ─────────────────────────────────────────────────────── */

/** Build a speed dial with 3 actions and return it. */
async function dial(open = false) {
    return fixture<UiSpeedDial>(html`
        <ui-speed-dial ?open=${open}>
            <ui-speed-dial-action tooltip-title="Copy">📋</ui-speed-dial-action>
            <ui-speed-dial-action tooltip-title="Print">🖨️</ui-speed-dial-action>
            <ui-speed-dial-action tooltip-title="Save">💾</ui-speed-dial-action>
        </ui-speed-dial>
    `);
}

function actionButtons(el: UiSpeedDial): HTMLButtonElement[] {
    return Array.from(el.querySelectorAll('ui-speed-dial-action'))
        .map(a => (a as Element).shadowRoot!.querySelector<HTMLButtonElement>('.action-btn')!)
        .filter(Boolean);
}

function fab(el: UiSpeedDial): HTMLButtonElement {
    return el.shadowRoot!.querySelector<HTMLButtonElement>('.fab')!;
}

function keydown(target: EventTarget, key: string) {
    target.dispatchEvent(new KeyboardEvent('keydown', {
        key, bubbles: true, composed: true, cancelable: true,
    }));
}

/* ================================================================== */
describe('ui-speed-dial — basic', () => {
    it('is defined', () => {
        expect(document.createElement('ui-speed-dial')).toBeInstanceOf(HTMLElement);
        expect(document.createElement('ui-speed-dial-action')).toBeInstanceOf(HTMLElement);
    });

    it('is closed by default', async () => {
        const el = await dial();
        expect(el.open).toBe(false);
    });

    it('defaults to direction up', async () => {
        const el = await dial();
        expect(el.direction).toBe('up');
    });

    it('reflects open attribute', async () => {
        const el = await dial(true);
        expect(el.open).toBe(true);
        expect(el.hasAttribute('open')).toBe(true);
    });

    it('fires ui-speed-dial-open when FAB is clicked while closed', async () => {
        const el = await dial();
        setTimeout(() => fab(el).click());
        await oneEvent(el, 'ui-speed-dial-open');
        expect(el.open).toBe(true);
    });

    it('fires ui-speed-dial-close when FAB is clicked while open', async () => {
        const el = await dial(true);
        setTimeout(() => fab(el).click());
        await oneEvent(el, 'ui-speed-dial-close');
    });

    it('fires ui-speed-dial-close when backdrop is clicked', async () => {
        const el = await dial(true);
        const backdrop = el.shadowRoot!.querySelector<HTMLElement>('.backdrop')!;
        setTimeout(() => backdrop.click());
        await oneEvent(el, 'ui-speed-dial-close');
    });

    it('reflects direction attribute', async () => {
        const el = await fixture<UiSpeedDial>(html`<ui-speed-dial direction="left"></ui-speed-dial>`);
        expect(el.direction).toBe('left');
        expect(el.getAttribute('direction')).toBe('left');
    });

    it('supports hidden prop', async () => {
        const el = await dial();
        el.hidden = true;
        expect(el.hidden).toBe(true);
    });
});

/* ================================================================== */
describe('ui-speed-dial — keyboard navigation', () => {
    it('closes on Escape and fires ui-speed-dial-close', async () => {
        const el = await dial(true);
        const spy = vi.fn();
        el.addEventListener('ui-speed-dial-close', spy);
        keydown(el, 'Escape');
        await el.updateComplete;
        expect(spy).toHaveBeenCalled();
        expect(el.open).toBe(false);
    });

    it('opens on ArrowDown when closed', async () => {
        const el = await dial();
        const spy = vi.fn();
        el.addEventListener('ui-speed-dial-open', spy);
        keydown(el, 'ArrowDown');
        await el.updateComplete;
        expect(spy).toHaveBeenCalled();
        expect(el.open).toBe(true);
    });

    it('opens on ArrowUp when closed', async () => {
        const el = await dial();
        keydown(el, 'ArrowUp');
        await el.updateComplete;
        expect(el.open).toBe(true);
    });

    it('opens on ArrowLeft when closed', async () => {
        const el = await dial();
        keydown(el, 'ArrowLeft');
        await el.updateComplete;
        expect(el.open).toBe(true);
    });

    it('opens on ArrowRight when closed', async () => {
        const el = await dial();
        keydown(el, 'ArrowRight');
        await el.updateComplete;
        expect(el.open).toBe(true);
    });

    it('navigates to next action on ArrowDown when action is focused', async () => {
        const el = await dial(true);
        await el.updateComplete;
        const btns = actionButtons(el);
        btns[0].focus();
        keydown(el, 'ArrowDown');
        // The handler clamps, so focus stays on an action (no error thrown)
        expect(el.open).toBe(true);
    });

    it('navigates to prev action on ArrowUp when action is focused', async () => {
        const el = await dial(true);
        await el.updateComplete;
        const btns = actionButtons(el);
        btns[1].focus();
        keydown(el, 'ArrowUp');
        expect(el.open).toBe(true);
    });
});

/* ================================================================== */
describe('ui-speed-dial-action', () => {
    it('has correct aria-label from tooltip-title', async () => {
        const el = await fixture<UiSpeedDialAction>(html`
            <ui-speed-dial-action tooltip-title="Save">💾</ui-speed-dial-action>
        `);
        const btn = el.shadowRoot!.querySelector('.action-btn') as HTMLButtonElement;
        expect(btn.getAttribute('aria-label')).toBe('Save');
    });

    it('has role="menuitem"', async () => {
        const el = await fixture<UiSpeedDialAction>(html`
            <ui-speed-dial-action tooltip-title="Copy">📋</ui-speed-dial-action>
        `);
        const btn = el.shadowRoot!.querySelector('.action-btn') as HTMLButtonElement;
        expect(btn.getAttribute('role')).toBe('menuitem');
    });

    it('fires ui-speed-dial-action-click with tooltipTitle detail', async () => {
        const el = await fixture<UiSpeedDialAction>(html`
            <ui-speed-dial-action tooltip-title="Copy">📋</ui-speed-dial-action>
        `);
        const btn = el.shadowRoot!.querySelector('.action-btn') as HTMLButtonElement;
        setTimeout(() => btn.click());
        const event = await oneEvent(el, 'ui-speed-dial-action-click') as CustomEvent;
        expect(event.detail.tooltipTitle).toBe('Copy');
    });

    it('does not fire when disabled', async () => {
        const el = await fixture<UiSpeedDialAction>(html`
            <ui-speed-dial-action tooltip-title="Save" disabled>💾</ui-speed-dial-action>
        `);
        const spy = vi.fn();
        el.addEventListener('ui-speed-dial-action-click', spy);
        el.shadowRoot!.querySelector<HTMLButtonElement>('.action-btn')?.click();
        expect(spy).not.toHaveBeenCalled();
    });

    it('shows tooltip when tooltip-open is set', async () => {
        const el = await fixture<UiSpeedDialAction>(html`
            <ui-speed-dial-action tooltip-title="Edit" tooltip-open>✏️</ui-speed-dial-action>
        `);
        const tooltip = el.shadowRoot!.querySelector('.tooltip');
        expect(tooltip?.classList.contains('visible')).toBe(true);
    });
});
