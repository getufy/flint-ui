import { describe, it, expect, vi } from 'vitest';
import { fixture, html, oneEvent } from '@open-wc/testing';
import './flint-speed-dial.js';
import type { FlintSpeedDial, FlintSpeedDialAction } from './flint-speed-dial.js';

/* ── helpers ─────────────────────────────────────────────────────── */

/** Build a speed dial with 3 actions and return it. */
async function dial(open = false) {
    return fixture<FlintSpeedDial>(html`
        <flint-speed-dial ?open=${open}>
            <flint-speed-dial-action tooltip-title="Copy" name="copy">📋</flint-speed-dial-action>
            <flint-speed-dial-action tooltip-title="Print" name="print">🖨️</flint-speed-dial-action>
            <flint-speed-dial-action tooltip-title="Save" name="save">💾</flint-speed-dial-action>
        </flint-speed-dial>
    `);
}

function actionButtons(el: FlintSpeedDial): HTMLButtonElement[] {
    return Array.from(el.querySelectorAll('flint-speed-dial-action'))
        .map(a => (a as Element).shadowRoot!.querySelector<HTMLButtonElement>('.action-btn')!)
        .filter(Boolean);
}

function fab(el: FlintSpeedDial): HTMLButtonElement {
    return el.shadowRoot!.querySelector<HTMLButtonElement>('.fab')!;
}

function keydown(target: EventTarget, key: string) {
    target.dispatchEvent(new KeyboardEvent('keydown', {
        key, bubbles: true, composed: true, cancelable: true,
    }));
}

/* ================================================================== */
describe('flint-speed-dial — basic', () => {
    it('is defined', () => {
        expect(document.createElement('flint-speed-dial')).toBeInstanceOf(HTMLElement);
        expect(document.createElement('flint-speed-dial-action')).toBeInstanceOf(HTMLElement);
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

    it('fires flint-speed-dial-open when FAB is clicked while closed', async () => {
        const el = await dial();
        setTimeout(() => fab(el).click());
        await oneEvent(el, 'flint-speed-dial-open');
        expect(el.open).toBe(true);
    });

    it('fires flint-speed-dial-close when FAB is clicked while open', async () => {
        const el = await dial(true);
        setTimeout(() => fab(el).click());
        await oneEvent(el, 'flint-speed-dial-close');
    });

    it('fires flint-speed-dial-close when backdrop is clicked', async () => {
        const el = await dial(true);
        const backdrop = el.shadowRoot!.querySelector<HTMLElement>('.backdrop')!;
        setTimeout(() => backdrop.click());
        await oneEvent(el, 'flint-speed-dial-close');
    });

    it('reflects direction attribute', async () => {
        const el = await fixture<FlintSpeedDial>(html`<flint-speed-dial direction="left"></flint-speed-dial>`);
        expect(el.direction).toBe('left');
        expect(el.getAttribute('direction')).toBe('left');
    });

    it('supports hidden prop', async () => {
        const el = await dial();
        el.hidden = true;
        expect(el.hidden).toBe(true);
    });

    it('defaultOpen initializes open state without needing explicit open prop', async () => {
        const el = await fixture<FlintSpeedDial>(html`<flint-speed-dial default-open></flint-speed-dial>`);
        expect(el.open).toBe(true);
    });

    it('defaultOpen does not fire open event (silent init)', async () => {
        const spy = vi.fn();
        const el = await fixture<FlintSpeedDial>(html`<flint-speed-dial default-open></flint-speed-dial>`);
        el.addEventListener('flint-speed-dial-open', spy);
        await el.updateComplete;
        // Event was NOT fired during first-update init
        expect(spy).not.toHaveBeenCalled();
    });
});

/* ================================================================== */
describe('flint-speed-dial — ARIA attributes', () => {
    it('FAB has aria-haspopup="menu"', async () => {
        const el = await dial();
        expect(fab(el).getAttribute('aria-haspopup')).toBe('menu');
    });

    it('FAB has aria-expanded="false" when closed', async () => {
        const el = await dial();
        expect(fab(el).getAttribute('aria-expanded')).toBe('false');
    });

    it('FAB has aria-expanded="true" when open', async () => {
        const el = await dial(true);
        expect(fab(el).getAttribute('aria-expanded')).toBe('true');
    });

    it('FAB has aria-controls="sd-menu"', async () => {
        const el = await dial();
        expect(fab(el).getAttribute('aria-controls')).toBe('sd-menu');
    });

    it('actions container has aria-hidden="true" when closed', async () => {
        const el = await dial();
        const menu = el.shadowRoot!.querySelector('#sd-menu')!;
        expect(menu.getAttribute('aria-hidden')).toBe('true');
    });

    it('actions container has aria-hidden="false" when open', async () => {
        const el = await dial(true);
        const menu = el.shadowRoot!.querySelector('#sd-menu')!;
        expect(menu.getAttribute('aria-hidden')).toBe('false');
    });

    it('actions container has role="menu"', async () => {
        const el = await dial();
        const menu = el.shadowRoot!.querySelector('#sd-menu')!;
        expect(menu.getAttribute('role')).toBe('menu');
    });
});

/* ================================================================== */
describe('flint-speed-dial — disabled', () => {
    it('reflects disabled attribute', async () => {
        const el = await fixture<FlintSpeedDial>(html`<flint-speed-dial disabled></flint-speed-dial>`);
        expect(el.disabled).toBe(true);
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('FAB click does nothing when disabled', async () => {
        const spy = vi.fn();
        const el = await fixture<FlintSpeedDial>(html`<flint-speed-dial disabled></flint-speed-dial>`);
        el.addEventListener('flint-speed-dial-open', spy);
        fab(el).click();
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
        expect(el.open).toBe(false);
    });

    it('arrow keys do nothing when disabled', async () => {
        const el = await fixture<FlintSpeedDial>(html`<flint-speed-dial disabled></flint-speed-dial>`);
        keydown(el, 'ArrowDown');
        await el.updateComplete;
        expect(el.open).toBe(false);
    });

    it('FAB has disabled attribute when disabled', async () => {
        const el = await fixture<FlintSpeedDial>(html`<flint-speed-dial disabled></flint-speed-dial>`);
        expect(fab(el).hasAttribute('disabled')).toBe(true);
    });

    it('FAB has aria-disabled="true" when disabled', async () => {
        const el = await fixture<FlintSpeedDial>(html`<flint-speed-dial disabled></flint-speed-dial>`);
        expect(fab(el).getAttribute('aria-disabled')).toBe('true');
    });

    it('FAB has no aria-disabled when not disabled', async () => {
        const el = await dial();
        expect(fab(el).hasAttribute('aria-disabled')).toBe(false);
    });
});

/* ================================================================== */
describe('flint-speed-dial — keyboard navigation', () => {
    it('closes on Escape and fires flint-speed-dial-close', async () => {
        const el = await dial(true);
        const spy = vi.fn();
        el.addEventListener('flint-speed-dial-close', spy);
        keydown(el, 'Escape');
        await el.updateComplete;
        expect(spy).toHaveBeenCalled();
        expect(el.open).toBe(false);
    });

    it('Escape returns focus to FAB', async () => {
        const el = await dial(true);
        await el.updateComplete;
        actionButtons(el)[0].focus();
        keydown(el, 'Escape');
        await el.updateComplete;
        expect(el.shadowRoot!.activeElement).toBe(fab(el));
    });

    it('opens on ArrowDown when closed', async () => {
        const el = await dial();
        const spy = vi.fn();
        el.addEventListener('flint-speed-dial-open', spy);
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

    it('Home key jumps to first action', async () => {
        const el = await dial(true);
        await el.updateComplete;
        const btns = actionButtons(el);
        btns[2].focus();
        keydown(el, 'Home');
        await el.updateComplete;
        expect(el.open).toBe(true); // dial stays open
    });

    it('End key jumps to last action', async () => {
        const el = await dial(true);
        await el.updateComplete;
        const btns = actionButtons(el);
        btns[0].focus();
        keydown(el, 'End');
        await el.updateComplete;
        expect(el.open).toBe(true); // dial stays open
    });

    it('Home/End do nothing when dial is closed', async () => {
        const el = await dial();
        keydown(el, 'Home');
        keydown(el, 'End');
        await el.updateComplete;
        expect(el.open).toBe(false);
    });

    it('disabled actions are excluded from keyboard navigation', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial open>
                <flint-speed-dial-action tooltip-title="A" name="a">A</flint-speed-dial-action>
                <flint-speed-dial-action tooltip-title="B" name="b" disabled>B</flint-speed-dial-action>
                <flint-speed-dial-action tooltip-title="C" name="c">C</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        // _actionButtons() filters out disabled; only A and C are enabled
        const btns = Array.from(el.querySelectorAll('flint-speed-dial-action'))
            .filter(a => !a.hasAttribute('disabled'))
            .map(a => (a as Element).shadowRoot!.querySelector<HTMLButtonElement>('.action-btn')!)
            .filter(Boolean);
        expect(btns.length).toBe(2);
    });
});

/* ================================================================== */
describe('flint-speed-dial — focusout closes dial', () => {
    it('closes when focus leaves the component', async () => {
        const container = await fixture<HTMLDivElement>(html`
            <div>
                <button id="outside">outside</button>
                <flint-speed-dial open>
                    <flint-speed-dial-action tooltip-title="Copy">📋</flint-speed-dial-action>
                </flint-speed-dial>
            </div>
        `);
        const el = container.querySelector('flint-speed-dial') as FlintSpeedDial;
        await el.updateComplete;

        // Simulate focus moving to element outside the component
        el.dispatchEvent(new FocusEvent('focusout', {
            bubbles: true,
            relatedTarget: container.querySelector('#outside'),
        }));
        await el.updateComplete;
        expect(el.open).toBe(false);
    });

    it('does not close when focus moves between inner elements', async () => {
        const el = await dial(true);
        await el.updateComplete;
        const btns = actionButtons(el);

        // Simulate focus moving from one action button to another (relatedTarget is inside)
        el.dispatchEvent(new FocusEvent('focusout', {
            bubbles: true,
            relatedTarget: btns[1],
        }));
        await el.updateComplete;
        expect(el.open).toBe(true);
    });
});

/* ================================================================== */
describe('flint-speed-dial — tooltip management', () => {
    it('sets tooltip-placement="left" for direction up', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial direction="up" open>
                <flint-speed-dial-action tooltip-title="Copy">📋</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        const action = el.querySelector('flint-speed-dial-action')!;
        expect(action.getAttribute('tooltip-placement')).toBe('left');
    });

    it('sets tooltip-placement="left" for direction down', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial direction="down" open>
                <flint-speed-dial-action tooltip-title="Copy">📋</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        const action = el.querySelector('flint-speed-dial-action')!;
        expect(action.getAttribute('tooltip-placement')).toBe('left');
    });

    it('sets tooltip-placement="top" for direction left', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial direction="left" open>
                <flint-speed-dial-action tooltip-title="Copy">📋</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        const action = el.querySelector('flint-speed-dial-action')!;
        expect(action.getAttribute('tooltip-placement')).toBe('top');
    });

    it('sets tooltip-placement="top" for direction right', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial direction="right" open>
                <flint-speed-dial-action tooltip-title="Copy">📋</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        const action = el.querySelector('flint-speed-dial-action')!;
        expect(action.getAttribute('tooltip-placement')).toBe('top');
    });

    it('persistent-tooltips sets tooltip-open on actions when open', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial persistent-tooltips open>
                <flint-speed-dial-action tooltip-title="Copy">📋</flint-speed-dial-action>
                <flint-speed-dial-action tooltip-title="Save">💾</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        const actions = el.querySelectorAll('flint-speed-dial-action');
        actions.forEach(a => {
            expect(a.hasAttribute('tooltip-open')).toBe(true);
        });
    });

    it('persistent-tooltips removes tooltip-open when closed', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial persistent-tooltips>
                <flint-speed-dial-action tooltip-title="Copy">📋</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        const action = el.querySelector('flint-speed-dial-action')!;
        expect(action.hasAttribute('tooltip-open')).toBe(false);
    });

    it('stagger transition-delay is applied to actions on open', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial direction="down" open>
                <flint-speed-dial-action tooltip-title="A">A</flint-speed-dial-action>
                <flint-speed-dial-action tooltip-title="B">B</flint-speed-dial-action>
                <flint-speed-dial-action tooltip-title="C">C</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        const actions = Array.from(el.querySelectorAll<HTMLElement>('flint-speed-dial-action'));
        // direction=down is not reversed, so index 0 gets 0ms, 1 gets 40ms, 2 gets 80ms
        expect(actions[0].style.transitionDelay).toBe('0ms');
        expect(actions[1].style.transitionDelay).toBe('40ms');
        expect(actions[2].style.transitionDelay).toBe('80ms');
    });

    it('stagger is reversed for direction up (nearest FAB gets shortest delay)', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial direction="up" open>
                <flint-speed-dial-action tooltip-title="A">A</flint-speed-dial-action>
                <flint-speed-dial-action tooltip-title="B">B</flint-speed-dial-action>
                <flint-speed-dial-action tooltip-title="C">C</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        const actions = Array.from(el.querySelectorAll<HTMLElement>('flint-speed-dial-action'));
        // direction=up is reversed, so index 0 (farthest from FAB) gets 80ms, last gets 0ms
        expect(actions[0].style.transitionDelay).toBe('80ms');
        expect(actions[2].style.transitionDelay).toBe('0ms');
    });

    it('slotchange re-syncs tooltip state on dynamically added action', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial persistent-tooltips open>
                <flint-speed-dial-action tooltip-title="Copy">📋</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;

        const newAction = document.createElement('flint-speed-dial-action') as FlintSpeedDialAction;
        newAction.setAttribute('tooltip-title', 'New');
        el.appendChild(newAction);
        // Wait for slotchange + update
        await new Promise(r => setTimeout(r, 0));
        await el.updateComplete;

        expect(newAction.hasAttribute('tooltip-open')).toBe(true);
        expect(newAction.getAttribute('tooltip-placement')).toBe('left');
    });
});

/* ================================================================== */
describe('flint-speed-dial — action click', () => {
    it('clicking an action closes the dial', async () => {
        const el = await dial(true);
        await el.updateComplete;
        const btns = actionButtons(el);
        btns[0].click();
        await el.updateComplete;
        expect(el.open).toBe(false);
    });

    it('clicking an action fires flint-speed-dial-close', async () => {
        const el = await dial(true);
        await el.updateComplete;
        const btns = actionButtons(el);
        setTimeout(() => btns[0].click());
        await oneEvent(el, 'flint-speed-dial-close');
    });
});

/* ================================================================== */
describe('flint-speed-dial-action', () => {
    it('has correct aria-label from tooltip-title', async () => {
        const el = await fixture<FlintSpeedDialAction>(html`
            <flint-speed-dial-action tooltip-title="Save">💾</flint-speed-dial-action>
        `);
        const btn = el.shadowRoot!.querySelector('.action-btn') as HTMLButtonElement;
        expect(btn.getAttribute('aria-label')).toBe('Save');
    });

    it('has role="menuitem"', async () => {
        const el = await fixture<FlintSpeedDialAction>(html`
            <flint-speed-dial-action tooltip-title="Copy">📋</flint-speed-dial-action>
        `);
        const btn = el.shadowRoot!.querySelector('.action-btn') as HTMLButtonElement;
        expect(btn.getAttribute('role')).toBe('menuitem');
    });

    it('fires flint-speed-dial-action-click with tooltipTitle detail', async () => {
        const el = await fixture<FlintSpeedDialAction>(html`
            <flint-speed-dial-action tooltip-title="Copy">📋</flint-speed-dial-action>
        `);
        const btn = el.shadowRoot!.querySelector('.action-btn') as HTMLButtonElement;
        setTimeout(() => btn.click());
        const event = await oneEvent(el, 'flint-speed-dial-action-click') as CustomEvent;
        expect(event.detail.tooltipTitle).toBe('Copy');
    });

    it('fires flint-speed-dial-action-click with name detail', async () => {
        const el = await fixture<FlintSpeedDialAction>(html`
            <flint-speed-dial-action tooltip-title="Copy" name="copy-action">📋</flint-speed-dial-action>
        `);
        const btn = el.shadowRoot!.querySelector('.action-btn') as HTMLButtonElement;
        setTimeout(() => btn.click());
        const event = await oneEvent(el, 'flint-speed-dial-action-click') as CustomEvent;
        expect(event.detail.name).toBe('copy-action');
    });

    it('does not fire when disabled', async () => {
        const el = await fixture<FlintSpeedDialAction>(html`
            <flint-speed-dial-action tooltip-title="Save" disabled>💾</flint-speed-dial-action>
        `);
        const spy = vi.fn();
        el.addEventListener('flint-speed-dial-action-click', spy);
        el.shadowRoot!.querySelector<HTMLButtonElement>('.action-btn')?.click();
        expect(spy).not.toHaveBeenCalled();
    });

    it('shows tooltip when tooltip-open is set', async () => {
        const el = await fixture<FlintSpeedDialAction>(html`
            <flint-speed-dial-action tooltip-title="Edit" tooltip-open>✏️</flint-speed-dial-action>
        `);
        const tooltip = el.shadowRoot!.querySelector('.tooltip');
        expect(tooltip?.classList.contains('visible')).toBe(true);
    });

    it('tooltip is not visible by default', async () => {
        const el = await fixture<FlintSpeedDialAction>(html`
            <flint-speed-dial-action tooltip-title="Edit">✏️</flint-speed-dial-action>
        `);
        const tooltip = el.shadowRoot!.querySelector('.tooltip');
        expect(tooltip?.classList.contains('visible')).toBe(false);
    });

    it('no tooltip element rendered when tooltip-title is empty', async () => {
        const el = await fixture<FlintSpeedDialAction>(html`
            <flint-speed-dial-action>✏️</flint-speed-dial-action>
        `);
        const tooltip = el.shadowRoot!.querySelector('.tooltip');
        expect(tooltip).toBeNull();
    });

    it('default name is empty string', async () => {
        const el = await fixture<FlintSpeedDialAction>(html`
            <flint-speed-dial-action tooltip-title="X">X</flint-speed-dial-action>
        `);
        expect(el.name).toBe('');
    });
});

/* ================================================================== */
/* Mutation-killing additions                                           */
/* ================================================================== */

/* ── mouseenter / mouseleave / focus / blur on action button ── */
describe('flint-speed-dial-action — hover/focus/blur tooltip visibility', () => {
    it('mouseenter makes tooltip visible', async () => {
        const el = await fixture<FlintSpeedDialAction>(html`
            <flint-speed-dial-action tooltip-title="Edit">✏️</flint-speed-dial-action>
        `);
        const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.action-btn')!;
        btn.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.tooltip')?.classList.contains('visible')).toBe(true);
    });

    it('mouseleave hides tooltip again', async () => {
        const el = await fixture<FlintSpeedDialAction>(html`
            <flint-speed-dial-action tooltip-title="Edit">✏️</flint-speed-dial-action>
        `);
        const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.action-btn')!;
        btn.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;
        btn.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.tooltip')?.classList.contains('visible')).toBe(false);
    });

    it('focus on action button makes tooltip visible', async () => {
        const el = await fixture<FlintSpeedDialAction>(html`
            <flint-speed-dial-action tooltip-title="Zoom">🔍</flint-speed-dial-action>
        `);
        const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.action-btn')!;
        btn.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.tooltip')?.classList.contains('visible')).toBe(true);
    });

    it('blur on action button hides tooltip', async () => {
        const el = await fixture<FlintSpeedDialAction>(html`
            <flint-speed-dial-action tooltip-title="Zoom">🔍</flint-speed-dial-action>
        `);
        const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.action-btn')!;
        btn.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
        await el.updateComplete;
        btn.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.tooltip')?.classList.contains('visible')).toBe(false);
    });

    it('_tooltipVisible = tooltipOpen || _hovered: hover alone (no tooltipOpen) suffices', async () => {
        const el = await fixture<FlintSpeedDialAction>(html`
            <flint-speed-dial-action tooltip-title="X">X</flint-speed-dial-action>
        `);
        expect(el.tooltipOpen).toBe(false);
        const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.action-btn')!;
        btn.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.tooltip')?.classList.contains('visible')).toBe(true);
    });

    it('_tooltipVisible = tooltipOpen || _hovered: tooltipOpen alone (no hover) suffices', async () => {
        const el = await fixture<FlintSpeedDialAction>(html`
            <flint-speed-dial-action tooltip-title="X" tooltip-open>X</flint-speed-dial-action>
        `);
        await el.updateComplete;
        // _hovered is false (no mouseenter dispatched)
        expect(el.shadowRoot!.querySelector('.tooltip')?.classList.contains('visible')).toBe(true);
    });

    it('disabled guard in _handleClick: click event dispatched directly on disabled button is blocked', async () => {
        const spy = vi.fn();
        const el = await fixture<FlintSpeedDialAction>(html`
            <flint-speed-dial-action tooltip-title="X" disabled>X</flint-speed-dial-action>
        `);
        el.addEventListener('flint-speed-dial-action-click', spy);
        el.shadowRoot!.querySelector<HTMLButtonElement>('.action-btn')!
            .dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(spy).not.toHaveBeenCalled();
    });
});

/* ── FAB arrow navigation when dial is already open ── */
describe('flint-speed-dial — FAB arrow navigation when dial is already open', () => {
    async function openDialFabFocused() {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial open>
                <flint-speed-dial-action tooltip-title="A" name="a">A</flint-speed-dial-action>
                <flint-speed-dial-action tooltip-title="B" name="b">B</flint-speed-dial-action>
                <flint-speed-dial-action tooltip-title="C" name="c">C</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        fab(el).focus();
        return el;
    }

    it('ArrowDown from focused FAB focuses first action (not last)', async () => {
        const el = await openDialFabFocused();
        keydown(el, 'ArrowDown');
        await el.updateComplete;
        const actions = Array.from(el.querySelectorAll('flint-speed-dial-action'));
        expect(actions[0].shadowRoot!.activeElement?.classList.contains('action-btn')).toBe(true);
        expect(actions[2].shadowRoot!.activeElement).toBeNull();
    });

    it('ArrowUp from focused FAB focuses last action (not first)', async () => {
        const el = await openDialFabFocused();
        keydown(el, 'ArrowUp');
        await el.updateComplete;
        const actions = Array.from(el.querySelectorAll('flint-speed-dial-action'));
        expect(actions[2].shadowRoot!.activeElement?.classList.contains('action-btn')).toBe(true);
        expect(actions[0].shadowRoot!.activeElement).toBeNull();
    });

    it('ArrowRight from focused FAB focuses first action', async () => {
        const el = await openDialFabFocused();
        keydown(el, 'ArrowRight');
        await el.updateComplete;
        const actions = Array.from(el.querySelectorAll('flint-speed-dial-action'));
        expect(actions[0].shadowRoot!.activeElement?.classList.contains('action-btn')).toBe(true);
        expect(actions[2].shadowRoot!.activeElement).toBeNull();
    });

    it('ArrowLeft from focused FAB focuses last action', async () => {
        const el = await openDialFabFocused();
        keydown(el, 'ArrowLeft');
        await el.updateComplete;
        const actions = Array.from(el.querySelectorAll('flint-speed-dial-action'));
        expect(actions[2].shadowRoot!.activeElement?.classList.contains('action-btn')).toBe(true);
        expect(actions[0].shadowRoot!.activeElement).toBeNull();
    });
});

/* ── _focusActionAt clamping and empty guard ── */
describe('flint-speed-dial — _focusActionAt clamping (mutation kills)', () => {
    it('ArrowUp on first action stays on first (clamps to 0, not -1)', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial open>
                <flint-speed-dial-action tooltip-title="A" name="a">A</flint-speed-dial-action>
                <flint-speed-dial-action tooltip-title="B" name="b">B</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        actionButtons(el)[0].focus();
        keydown(el, 'ArrowUp');
        await el.updateComplete;
        const actions = Array.from(el.querySelectorAll('flint-speed-dial-action'));
        expect(actions[0].shadowRoot!.activeElement?.classList.contains('action-btn')).toBe(true);
    });

    it('ArrowDown on last action stays on last (clamps to btns.length-1)', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial open>
                <flint-speed-dial-action tooltip-title="A" name="a">A</flint-speed-dial-action>
                <flint-speed-dial-action tooltip-title="B" name="b">B</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        actionButtons(el)[1].focus();
        keydown(el, 'ArrowDown');
        await el.updateComplete;
        const actions = Array.from(el.querySelectorAll('flint-speed-dial-action'));
        expect(actions[1].shadowRoot!.activeElement?.classList.contains('action-btn')).toBe(true);
    });

    it('arrow key on open dial with no enabled actions does not throw', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial open>
                <flint-speed-dial-action tooltip-title="X" disabled>X</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        // All actions disabled → _actionButtons() returns [] → _focusActionAt returns early
        expect(() => keydown(el, 'ArrowDown')).not.toThrow();
        expect(el.open).toBe(true);
    });
});

/* ── Stagger delay arithmetic — all 4 directions, open + close ── */
describe('flint-speed-dial — stagger delay arithmetic (mutation kills)', () => {
    it('direction=left (reversed): open delays are 80ms, 40ms, 0ms', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial direction="left" open>
                <flint-speed-dial-action tooltip-title="A">A</flint-speed-dial-action>
                <flint-speed-dial-action tooltip-title="B">B</flint-speed-dial-action>
                <flint-speed-dial-action tooltip-title="C">C</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        const actions = Array.from(el.querySelectorAll<HTMLElement>('flint-speed-dial-action'));
        // reversed=true, count=3: staggerIdx[i] = count-1-i → [2,1,0] → *40ms
        expect(actions[0].style.transitionDelay).toBe('80ms');
        expect(actions[1].style.transitionDelay).toBe('40ms');
        expect(actions[2].style.transitionDelay).toBe('0ms');
    });

    it('direction=right (not reversed): open delays are 0ms, 40ms, 80ms', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial direction="right" open>
                <flint-speed-dial-action tooltip-title="A">A</flint-speed-dial-action>
                <flint-speed-dial-action tooltip-title="B">B</flint-speed-dial-action>
                <flint-speed-dial-action tooltip-title="C">C</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        const actions = Array.from(el.querySelectorAll<HTMLElement>('flint-speed-dial-action'));
        // reversed=false: staggerIdx[i] = i → [0,1,2] → *40ms
        expect(actions[0].style.transitionDelay).toBe('0ms');
        expect(actions[1].style.transitionDelay).toBe('40ms');
        expect(actions[2].style.transitionDelay).toBe('80ms');
    });

    it('direction=up: close delays are 0ms, 30ms, 60ms (closeIdx=i for reversed)', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial direction="up" open>
                <flint-speed-dial-action tooltip-title="A">A</flint-speed-dial-action>
                <flint-speed-dial-action tooltip-title="B">B</flint-speed-dial-action>
                <flint-speed-dial-action tooltip-title="C">C</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        el.open = false;
        await el.updateComplete;
        const actions = Array.from(el.querySelectorAll<HTMLElement>('flint-speed-dial-action'));
        // reversed=true, closeIdx=i → [0,1,2] → *30ms
        expect(actions[0].style.transitionDelay).toBe('0ms');
        expect(actions[1].style.transitionDelay).toBe('30ms');
        expect(actions[2].style.transitionDelay).toBe('60ms');
    });

    it('direction=down: close delays are 60ms, 30ms, 0ms (closeIdx=count-1-i)', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial direction="down" open>
                <flint-speed-dial-action tooltip-title="A">A</flint-speed-dial-action>
                <flint-speed-dial-action tooltip-title="B">B</flint-speed-dial-action>
                <flint-speed-dial-action tooltip-title="C">C</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        el.open = false;
        await el.updateComplete;
        const actions = Array.from(el.querySelectorAll<HTMLElement>('flint-speed-dial-action'));
        // reversed=false, closeIdx=count-1-i → [2,1,0] → *30ms
        expect(actions[0].style.transitionDelay).toBe('60ms');
        expect(actions[1].style.transitionDelay).toBe('30ms');
        expect(actions[2].style.transitionDelay).toBe('0ms');
    });

    it('open multiplier is 40ms not 30ms: 2-action dial has second delay=40ms', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial direction="down" open>
                <flint-speed-dial-action tooltip-title="A">A</flint-speed-dial-action>
                <flint-speed-dial-action tooltip-title="B">B</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        const actions = Array.from(el.querySelectorAll<HTMLElement>('flint-speed-dial-action'));
        expect(actions[1].style.transitionDelay).toBe('40ms');
    });

    it('close multiplier is 30ms not 40ms: reversed 2-action on close has 0ms,30ms', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial direction="up" open>
                <flint-speed-dial-action tooltip-title="A">A</flint-speed-dial-action>
                <flint-speed-dial-action tooltip-title="B">B</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        el.open = false;
        await el.updateComplete;
        const actions = Array.from(el.querySelectorAll<HTMLElement>('flint-speed-dial-action'));
        // reversed, closeIdx=i: [0]*30=0ms, [1]*30=30ms
        expect(actions[0].style.transitionDelay).toBe('0ms');
        expect(actions[1].style.transitionDelay).toBe('30ms');
    });
});

/* ── _onFabFocus guard conditions ── */
describe('flint-speed-dial — FAB focus auto-open guards', () => {
    it('FAB focus with relatedTarget=null does NOT open (mouse click, not tab)', async () => {
        const el = await dial();
        const spy = vi.fn();
        el.addEventListener('flint-speed-dial-open', spy);
        fab(el).dispatchEvent(new FocusEvent('focus', {
            bubbles: true, composed: true, relatedTarget: null,
        }));
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
        expect(el.open).toBe(false);
    });

    it('FAB focus with external relatedTarget opens the dial', async () => {
        const container = await fixture<HTMLDivElement>(html`
            <div>
                <button id="before">before</button>
                <flint-speed-dial>
                    <flint-speed-dial-action tooltip-title="Copy">📋</flint-speed-dial-action>
                </flint-speed-dial>
            </div>
        `);
        const el = container.querySelector('flint-speed-dial') as FlintSpeedDial;
        await el.updateComplete;
        const before = container.querySelector<HTMLButtonElement>('#before')!;
        fab(el).dispatchEvent(new FocusEvent('focus', {
            bubbles: true, composed: true, relatedTarget: before,
        }));
        await el.updateComplete;
        expect(el.open).toBe(true);
    });

    it('FAB focus when already open does NOT re-fire flint-speed-dial-open', async () => {
        const container = await fixture<HTMLDivElement>(html`
            <div>
                <button id="before">before</button>
                <flint-speed-dial open>
                    <flint-speed-dial-action tooltip-title="Copy">📋</flint-speed-dial-action>
                </flint-speed-dial>
            </div>
        `);
        const el = container.querySelector('flint-speed-dial') as FlintSpeedDial;
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('flint-speed-dial-open', spy);
        const before = container.querySelector<HTMLButtonElement>('#before')!;
        fab(el).dispatchEvent(new FocusEvent('focus', {
            bubbles: true, composed: true, relatedTarget: before,
        }));
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
        expect(el.open).toBe(true);
    });
});

/* ── Arrow open: exact first/last focus target ── */
describe('flint-speed-dial — arrow open: exact first/last action focus', () => {
    it('ArrowDown opens dial and focuses first action (not last)', async () => {
        const el = await dial();
        keydown(el, 'ArrowDown');
        await el.updateComplete;
        await Promise.resolve(); // flush updateComplete.then()
        const actions = Array.from(el.querySelectorAll('flint-speed-dial-action'));
        expect(actions[0].shadowRoot!.activeElement?.classList.contains('action-btn')).toBe(true);
        expect(actions[2].shadowRoot!.activeElement).toBeNull();
    });

    it('ArrowUp opens dial and focuses last action (not first)', async () => {
        const el = await dial();
        keydown(el, 'ArrowUp');
        await el.updateComplete;
        await Promise.resolve();
        const actions = Array.from(el.querySelectorAll('flint-speed-dial-action'));
        expect(actions[2].shadowRoot!.activeElement?.classList.contains('action-btn')).toBe(true);
        expect(actions[0].shadowRoot!.activeElement).toBeNull();
    });

    it('ArrowRight opens dial and focuses first action', async () => {
        const el = await dial();
        keydown(el, 'ArrowRight');
        await el.updateComplete;
        await Promise.resolve();
        const actions = Array.from(el.querySelectorAll('flint-speed-dial-action'));
        expect(actions[0].shadowRoot!.activeElement?.classList.contains('action-btn')).toBe(true);
        expect(actions[2].shadowRoot!.activeElement).toBeNull();
    });

    it('ArrowLeft opens dial and focuses last action', async () => {
        const el = await dial();
        keydown(el, 'ArrowLeft');
        await el.updateComplete;
        await Promise.resolve();
        const actions = Array.from(el.querySelectorAll('flint-speed-dial-action'));
        expect(actions[2].shadowRoot!.activeElement?.classList.contains('action-btn')).toBe(true);
        expect(actions[0].shadowRoot!.activeElement).toBeNull();
    });
});

/* ── Arrow navigate actions: exact prev/next focus ── */
describe('flint-speed-dial — arrow navigation exact prev/next focus', () => {
    it('ArrowDown on action[0] moves focus to action[1]', async () => {
        const el = await dial(true);
        await el.updateComplete;
        actionButtons(el)[0].focus();
        keydown(el, 'ArrowDown');
        await el.updateComplete;
        const actions = Array.from(el.querySelectorAll('flint-speed-dial-action'));
        expect(actions[1].shadowRoot!.activeElement?.classList.contains('action-btn')).toBe(true);
        expect(actions[0].shadowRoot!.activeElement).toBeNull();
    });

    it('ArrowUp on action[1] moves focus to action[0]', async () => {
        const el = await dial(true);
        await el.updateComplete;
        actionButtons(el)[1].focus();
        keydown(el, 'ArrowUp');
        await el.updateComplete;
        const actions = Array.from(el.querySelectorAll('flint-speed-dial-action'));
        expect(actions[0].shadowRoot!.activeElement?.classList.contains('action-btn')).toBe(true);
        expect(actions[1].shadowRoot!.activeElement).toBeNull();
    });

    it('ArrowRight on action[1] moves focus to action[2]', async () => {
        const el = await dial(true);
        await el.updateComplete;
        actionButtons(el)[1].focus();
        keydown(el, 'ArrowRight');
        await el.updateComplete;
        const actions = Array.from(el.querySelectorAll('flint-speed-dial-action'));
        expect(actions[2].shadowRoot!.activeElement?.classList.contains('action-btn')).toBe(true);
        expect(actions[1].shadowRoot!.activeElement).toBeNull();
    });

    it('ArrowLeft on action[2] moves focus to action[1]', async () => {
        const el = await dial(true);
        await el.updateComplete;
        actionButtons(el)[2].focus();
        keydown(el, 'ArrowLeft');
        await el.updateComplete;
        const actions = Array.from(el.querySelectorAll('flint-speed-dial-action'));
        expect(actions[1].shadowRoot!.activeElement?.classList.contains('action-btn')).toBe(true);
        expect(actions[2].shadowRoot!.activeElement).toBeNull();
    });
});

/* ── Home/End exact focus targets ── */
describe('flint-speed-dial — Home/End exact focus targets (mutation kills)', () => {
    it('Home focuses action[0] not action[2]', async () => {
        const el = await dial(true);
        await el.updateComplete;
        actionButtons(el)[2].focus();
        keydown(el, 'Home');
        await el.updateComplete;
        const actions = Array.from(el.querySelectorAll('flint-speed-dial-action'));
        expect(actions[0].shadowRoot!.activeElement?.classList.contains('action-btn')).toBe(true);
        expect(actions[2].shadowRoot!.activeElement).toBeNull();
    });

    it('End focuses action[2] not action[0]', async () => {
        const el = await dial(true);
        await el.updateComplete;
        actionButtons(el)[0].focus();
        keydown(el, 'End');
        await el.updateComplete;
        const actions = Array.from(el.querySelectorAll('flint-speed-dial-action'));
        expect(actions[2].shadowRoot!.activeElement?.classList.contains('action-btn')).toBe(true);
        expect(actions[0].shadowRoot!.activeElement).toBeNull();
    });

    it('Home/End ignored when no action is focused (actionFocused=false)', async () => {
        const el = await dial(true);
        await el.updateComplete;
        // FAB focused, no action focused → actionFocused = false
        fab(el).focus();
        const spy = vi.fn();
        el.addEventListener('flint-speed-dial-close', spy);
        keydown(el, 'Home');
        keydown(el, 'End');
        await el.updateComplete;
        expect(el.open).toBe(true);
        expect(spy).not.toHaveBeenCalled();
    });
});

/* ── showTooltip = persistentTooltips || isTouch (mutation: || vs &&) ── */
describe('flint-speed-dial — showTooltip: persistentTooltips || isTouch (mutation kills)', () => {
    it('isTouch=true alone (without persistentTooltips) adds tooltip-open when open', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial is-touch open>
                <flint-speed-dial-action tooltip-title="Copy">📋</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        expect(el.querySelector('flint-speed-dial-action')!.hasAttribute('tooltip-open')).toBe(true);
    });

    it('persistentTooltips=true alone (without isTouch) adds tooltip-open when open', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial persistent-tooltips open>
                <flint-speed-dial-action tooltip-title="Copy">📋</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        expect(el.querySelector('flint-speed-dial-action')!.hasAttribute('tooltip-open')).toBe(true);
    });

    it('neither isTouch nor persistentTooltips → no tooltip-open even when open', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial open>
                <flint-speed-dial-action tooltip-title="Copy">📋</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        expect(el.querySelector('flint-speed-dial-action')!.hasAttribute('tooltip-open')).toBe(false);
    });

    it('showTooltip=true but dial closed → tooltip-open is NOT set (open guard)', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial persistent-tooltips>
                <flint-speed-dial-action tooltip-title="Copy">📋</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        expect(el.querySelector('flint-speed-dial-action')!.hasAttribute('tooltip-open')).toBe(false);
    });
});

/* ── updated() re-syncs tooltips on prop changes ── */
describe('flint-speed-dial — updated() re-syncs tooltip state on prop changes', () => {
    it('changing direction from up to left updates tooltip placement to top', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial direction="up" open>
                <flint-speed-dial-action tooltip-title="Copy">📋</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        const action = el.querySelector('flint-speed-dial-action')!;
        expect(action.getAttribute('tooltip-placement')).toBe('left');
        el.direction = 'left';
        await el.updateComplete;
        expect(action.getAttribute('tooltip-placement')).toBe('top');
    });

    it('changing isTouch=true triggers tooltip-open sync on open dial', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial open>
                <flint-speed-dial-action tooltip-title="Copy">📋</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        expect(el.querySelector('flint-speed-dial-action')!.hasAttribute('tooltip-open')).toBe(false);
        el.isTouch = true;
        await el.updateComplete;
        expect(el.querySelector('flint-speed-dial-action')!.hasAttribute('tooltip-open')).toBe(true);
    });

    it('changing persistentTooltips=true triggers tooltip-open sync on open dial', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial open>
                <flint-speed-dial-action tooltip-title="Copy">📋</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        expect(el.querySelector('flint-speed-dial-action')!.hasAttribute('tooltip-open')).toBe(false);
        el.persistentTooltips = true;
        await el.updateComplete;
        expect(el.querySelector('flint-speed-dial-action')!.hasAttribute('tooltip-open')).toBe(true);
    });
});

/* ── Edge cases: Escape/focusout when closed, _setOpen event name ── */
describe('flint-speed-dial — edge cases (mutation kills)', () => {
    it('Escape when already closed does NOT fire flint-speed-dial-close', async () => {
        const el = await dial();
        const spy = vi.fn();
        el.addEventListener('flint-speed-dial-close', spy);
        keydown(el, 'Escape');
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
        expect(el.open).toBe(false);
    });

    it('focusout when already closed does NOT fire flint-speed-dial-close', async () => {
        const el = await dial();
        const spy = vi.fn();
        el.addEventListener('flint-speed-dial-close', spy);
        el.dispatchEvent(new FocusEvent('focusout', {
            bubbles: true, relatedTarget: document.body,
        }));
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });

    it('FAB click on closed dial fires flint-speed-dial-open (not close)', async () => {
        const el = await dial();
        const openSpy = vi.fn();
        const closeSpy = vi.fn();
        el.addEventListener('flint-speed-dial-open', openSpy);
        el.addEventListener('flint-speed-dial-close', closeSpy);
        fab(el).click();
        await el.updateComplete;
        expect(openSpy).toHaveBeenCalledOnce();
        expect(closeSpy).not.toHaveBeenCalled();
        expect(el.open).toBe(true);
    });

    it('FAB click on open dial fires flint-speed-dial-close (not open)', async () => {
        const el = await dial(true);
        const openSpy = vi.fn();
        const closeSpy = vi.fn();
        el.addEventListener('flint-speed-dial-open', openSpy);
        el.addEventListener('flint-speed-dial-close', closeSpy);
        fab(el).click();
        await el.updateComplete;
        expect(closeSpy).toHaveBeenCalledOnce();
        expect(openSpy).not.toHaveBeenCalled();
        expect(el.open).toBe(false);
    });

    it('disconnecting component removes event listeners without throwing', async () => {
        const container = await fixture<HTMLDivElement>(html`
            <div>
                <flint-speed-dial open>
                    <flint-speed-dial-action tooltip-title="Copy">📋</flint-speed-dial-action>
                </flint-speed-dial>
            </div>
        `);
        const el = container.querySelector('flint-speed-dial') as FlintSpeedDial;
        await el.updateComplete;
        expect(() => container.removeChild(el)).not.toThrow();
    });
});

/* ── Action click _suppressNextOpen: FAB regains focus without reopening ── */
describe('flint-speed-dial — action click: suppress re-open on FAB focus-back', () => {
    it('after action click, FAB is focused and dial stays closed', async () => {
        const el = await dial(true);
        await el.updateComplete;
        const btns = actionButtons(el);
        btns[0].click();
        await el.updateComplete;
        await Promise.resolve(); // flush microtask for _suppressNextOpen reset
        expect(el.open).toBe(false);
        expect(el.shadowRoot!.activeElement?.classList.contains('fab')).toBe(true);
    });

    it('_suppressNextOpen: FAB focus event after action-click does not reopen', async () => {
        const el = await dial(true);
        await el.updateComplete;
        const btns = actionButtons(el);
        const openSpy = vi.fn();
        el.addEventListener('flint-speed-dial-open', openSpy);
        btns[0].click();
        await el.updateComplete;
        // At this point _suppressNextOpen=true; focus returns to FAB
        // The flag should prevent re-open even if focus event fires
        expect(openSpy).not.toHaveBeenCalled();
    });
});

/* ── _isReversedDirection mutation kills ── */
describe('flint-speed-dial — _isReversedDirection (up and left are reversed)', () => {
    it('direction=up has reversed stagger (80ms,40ms,0ms on open)', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial direction="up" open>
                <flint-speed-dial-action tooltip-title="A">A</flint-speed-dial-action>
                <flint-speed-dial-action tooltip-title="B">B</flint-speed-dial-action>
                <flint-speed-dial-action tooltip-title="C">C</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        const actions = Array.from(el.querySelectorAll<HTMLElement>('flint-speed-dial-action'));
        expect(actions[0].style.transitionDelay).toBe('80ms');
        expect(actions[2].style.transitionDelay).toBe('0ms');
    });

    it('direction=left has reversed stagger (same as up)', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial direction="left" open>
                <flint-speed-dial-action tooltip-title="A">A</flint-speed-dial-action>
                <flint-speed-dial-action tooltip-title="B">B</flint-speed-dial-action>
                <flint-speed-dial-action tooltip-title="C">C</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        const actions = Array.from(el.querySelectorAll<HTMLElement>('flint-speed-dial-action'));
        expect(actions[0].style.transitionDelay).toBe('80ms');
        expect(actions[2].style.transitionDelay).toBe('0ms');
    });

    it('direction=down has forward stagger (0ms,40ms,80ms on open)', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial direction="down" open>
                <flint-speed-dial-action tooltip-title="A">A</flint-speed-dial-action>
                <flint-speed-dial-action tooltip-title="B">B</flint-speed-dial-action>
                <flint-speed-dial-action tooltip-title="C">C</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        const actions = Array.from(el.querySelectorAll<HTMLElement>('flint-speed-dial-action'));
        expect(actions[0].style.transitionDelay).toBe('0ms');
        expect(actions[2].style.transitionDelay).toBe('80ms');
    });

    it('direction=right has forward stagger (0ms,40ms,80ms on open)', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial direction="right" open>
                <flint-speed-dial-action tooltip-title="A">A</flint-speed-dial-action>
                <flint-speed-dial-action tooltip-title="B">B</flint-speed-dial-action>
                <flint-speed-dial-action tooltip-title="C">C</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        const actions = Array.from(el.querySelectorAll<HTMLElement>('flint-speed-dial-action'));
        expect(actions[0].style.transitionDelay).toBe('0ms');
        expect(actions[2].style.transitionDelay).toBe('80ms');
    });
});

/* ── _tooltipPlacement switch: all 4 directions ── */
describe('flint-speed-dial — _tooltipPlacement switch (mutation kills)', () => {
    it('up → left placement (not top/right/bottom)', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial direction="up" open>
                <flint-speed-dial-action tooltip-title="X">X</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        expect(el.querySelector('flint-speed-dial-action')!.getAttribute('tooltip-placement')).toBe('left');
    });

    it('down → left placement (not top/right/bottom)', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial direction="down" open>
                <flint-speed-dial-action tooltip-title="X">X</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        expect(el.querySelector('flint-speed-dial-action')!.getAttribute('tooltip-placement')).toBe('left');
    });

    it('left → top placement (not left/right/bottom)', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial direction="left" open>
                <flint-speed-dial-action tooltip-title="X">X</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        expect(el.querySelector('flint-speed-dial-action')!.getAttribute('tooltip-placement')).toBe('top');
    });

    it('right → top placement (not left/right/bottom)', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial direction="right" open>
                <flint-speed-dial-action tooltip-title="X">X</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        expect(el.querySelector('flint-speed-dial-action')!.getAttribute('tooltip-placement')).toBe('top');
    });

    it('up and down both use left placement (not the same as left/right directions)', async () => {
        const up = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial direction="up" open>
                <flint-speed-dial-action tooltip-title="X">X</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        const down = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial direction="down" open>
                <flint-speed-dial-action tooltip-title="X">X</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await up.updateComplete;
        await down.updateComplete;
        expect(up.querySelector('flint-speed-dial-action')!.getAttribute('tooltip-placement')).toBe('left');
        expect(down.querySelector('flint-speed-dial-action')!.getAttribute('tooltip-placement')).toBe('left');
    });
});

/* ── willUpdate / defaultOpen guard ── */
describe('flint-speed-dial — willUpdate defaultOpen guard (mutation kills)', () => {
    it('defaultOpen=true sets open=true on first render silently', async () => {
        const spy = vi.fn();
        const el = await fixture<FlintSpeedDial>(html`<flint-speed-dial default-open></flint-speed-dial>`);
        el.addEventListener('flint-speed-dial-open', spy);
        await el.updateComplete;
        expect(el.open).toBe(true);
        expect(spy).not.toHaveBeenCalled();
    });

    it('element without default-open starts closed', async () => {
        const el = await fixture<FlintSpeedDial>(html`<flint-speed-dial></flint-speed-dial>`);
        await el.updateComplete;
        expect(el.open).toBe(false);
    });

    it('open=false is the default (no defaultOpen attribute)', async () => {
        const el = await fixture<FlintSpeedDial>(html`<flint-speed-dial></flint-speed-dial>`);
        expect(el.open).toBe(false);
        expect(el.hasAttribute('open')).toBe(false);
    });
});

/* ── connectedCallback matchMedia auto-detect ── */
describe('flint-speed-dial — connectedCallback matchMedia auto-detect', () => {
    it('auto-detects touch device via matchMedia when is-touch attribute is absent', async () => {
        const origMatchMedia = window.matchMedia;
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: vi.fn().mockReturnValue({ matches: true }),
        });
        try {
            const el = await fixture<FlintSpeedDial>(html`<flint-speed-dial></flint-speed-dial>`);
            await el.updateComplete;
            expect(el.isTouch).toBe(true);
        } finally {
            Object.defineProperty(window, 'matchMedia', {
                writable: true,
                value: origMatchMedia,
            });
        }
    });

    it('does not override explicit is-touch attribute with matchMedia result', async () => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: vi.fn().mockReturnValue({ matches: false }),
        });
        try {
            const el = await fixture<FlintSpeedDial>(html`<flint-speed-dial is-touch></flint-speed-dial>`);
            await el.updateComplete;
            expect(el.isTouch).toBe(true);
        } finally {
            Object.defineProperty(window, 'matchMedia', { writable: true, value: undefined });
        }
    });
});

/* ── _tooltipPlacement default case (unreachable via TS but coverage) ── */
describe('flint-speed-dial — _tooltipPlacement default case', () => {
    it('invalid direction falls back to left placement (default switch case)', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial open>
                <flint-speed-dial-action tooltip-title="X">X</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        // Force an invalid direction to hit the default case
        (el as unknown as { direction: string }).direction = 'diagonal';
        await el.updateComplete;
        expect(el.querySelector('flint-speed-dial-action')!.getAttribute('tooltip-placement')).toBe('left');
    });
});

/* ── closeIcon prop: renders custom span (line 390 branch) ── */
describe('flint-speed-dial — closeIcon custom text', () => {
    it('closeIcon prop renders custom icon span instead of default SVG', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial close-icon="✖"></flint-speed-dial>
        `);
        await el.updateComplete;
        const closeSpan = el.shadowRoot!.querySelector('.fab-icon.close-icon span');
        expect(closeSpan).not.toBeNull();
        expect(closeSpan?.textContent).toBe('✖');
    });

    it('without closeIcon prop, default SVG close icon is rendered', async () => {
        const el = await dial();
        const svg = el.shadowRoot!.querySelector('.fab-icon.close-icon svg');
        expect(svg).not.toBeNull();
        const customSpan = el.shadowRoot!.querySelector('.fab-icon.close-icon span');
        expect(customSpan).toBeNull();
    });
});

/* ── Home/End + Arrow with btns.length=0 guard (lines 231, 179) ── */
describe('flint-speed-dial — btns.length=0 defensive guards', () => {
    it('Home guard: action focused then disabled mid-flight → no throw', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial open>
                <flint-speed-dial-action tooltip-title="A" name="a">A</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        // Focus the enabled action so actionFocused=true
        actionButtons(el)[0].focus();
        // Now disable it so _actionButtons() returns [] at keydown time
        el.querySelector('flint-speed-dial-action')!.setAttribute('disabled', '');
        expect(() => keydown(el, 'Home')).not.toThrow();
        expect(el.open).toBe(true);
    });

    it('End guard: action focused then disabled mid-flight → no throw', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial open>
                <flint-speed-dial-action tooltip-title="A" name="a">A</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        actionButtons(el)[0].focus();
        el.querySelector('flint-speed-dial-action')!.setAttribute('disabled', '');
        expect(() => keydown(el, 'End')).not.toThrow();
        expect(el.open).toBe(true);
    });

    it('Arrow guard: _focusActionAt called with empty btns → no throw', async () => {
        const el = await fixture<FlintSpeedDial>(html`
            <flint-speed-dial open>
                <flint-speed-dial-action tooltip-title="A" name="a">A</flint-speed-dial-action>
            </flint-speed-dial>
        `);
        await el.updateComplete;
        actionButtons(el)[0].focus();
        el.querySelector('flint-speed-dial-action')!.setAttribute('disabled', '');
        expect(() => keydown(el, 'ArrowDown')).not.toThrow();
        expect(el.open).toBe(true);
    });
});
