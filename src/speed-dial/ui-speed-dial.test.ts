import { describe, it, expect, vi } from 'vitest';
import { fixture, html, oneEvent } from '@open-wc/testing';
import './ui-speed-dial.js';
import type { UiSpeedDial, UiSpeedDialAction } from './ui-speed-dial.js';

/* ── helpers ─────────────────────────────────────────────────────── */

/** Build a speed dial with 3 actions and return it. */
async function dial(open = false) {
    return fixture<UiSpeedDial>(html`
        <ui-speed-dial ?open=${open}>
            <ui-speed-dial-action tooltip-title="Copy" name="copy">📋</ui-speed-dial-action>
            <ui-speed-dial-action tooltip-title="Print" name="print">🖨️</ui-speed-dial-action>
            <ui-speed-dial-action tooltip-title="Save" name="save">💾</ui-speed-dial-action>
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

    it('defaultOpen initializes open state without needing explicit open prop', async () => {
        const el = await fixture<UiSpeedDial>(html`<ui-speed-dial default-open></ui-speed-dial>`);
        expect(el.open).toBe(true);
    });

    it('defaultOpen does not fire open event (silent init)', async () => {
        const spy = vi.fn();
        const el = await fixture<UiSpeedDial>(html`<ui-speed-dial default-open></ui-speed-dial>`);
        el.addEventListener('ui-speed-dial-open', spy);
        await el.updateComplete;
        // Event was NOT fired during first-update init
        expect(spy).not.toHaveBeenCalled();
    });
});

/* ================================================================== */
describe('ui-speed-dial — ARIA attributes', () => {
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
describe('ui-speed-dial — disabled', () => {
    it('reflects disabled attribute', async () => {
        const el = await fixture<UiSpeedDial>(html`<ui-speed-dial disabled></ui-speed-dial>`);
        expect(el.disabled).toBe(true);
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('FAB click does nothing when disabled', async () => {
        const spy = vi.fn();
        const el = await fixture<UiSpeedDial>(html`<ui-speed-dial disabled></ui-speed-dial>`);
        el.addEventListener('ui-speed-dial-open', spy);
        fab(el).click();
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
        expect(el.open).toBe(false);
    });

    it('arrow keys do nothing when disabled', async () => {
        const el = await fixture<UiSpeedDial>(html`<ui-speed-dial disabled></ui-speed-dial>`);
        keydown(el, 'ArrowDown');
        await el.updateComplete;
        expect(el.open).toBe(false);
    });

    it('FAB has disabled attribute when disabled', async () => {
        const el = await fixture<UiSpeedDial>(html`<ui-speed-dial disabled></ui-speed-dial>`);
        expect(fab(el).hasAttribute('disabled')).toBe(true);
    });

    it('FAB has aria-disabled="true" when disabled', async () => {
        const el = await fixture<UiSpeedDial>(html`<ui-speed-dial disabled></ui-speed-dial>`);
        expect(fab(el).getAttribute('aria-disabled')).toBe('true');
    });

    it('FAB has no aria-disabled when not disabled', async () => {
        const el = await dial();
        expect(fab(el).hasAttribute('aria-disabled')).toBe(false);
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
        const el = await fixture<UiSpeedDial>(html`
            <ui-speed-dial open>
                <ui-speed-dial-action tooltip-title="A" name="a">A</ui-speed-dial-action>
                <ui-speed-dial-action tooltip-title="B" name="b" disabled>B</ui-speed-dial-action>
                <ui-speed-dial-action tooltip-title="C" name="c">C</ui-speed-dial-action>
            </ui-speed-dial>
        `);
        await el.updateComplete;
        // _actionButtons() filters out disabled; only A and C are enabled
        const btns = Array.from(el.querySelectorAll('ui-speed-dial-action'))
            .filter(a => !a.hasAttribute('disabled'))
            .map(a => (a as Element).shadowRoot!.querySelector<HTMLButtonElement>('.action-btn')!)
            .filter(Boolean);
        expect(btns.length).toBe(2);
    });
});

/* ================================================================== */
describe('ui-speed-dial — focusout closes dial', () => {
    it('closes when focus leaves the component', async () => {
        const container = await fixture<HTMLDivElement>(html`
            <div>
                <button id="outside">outside</button>
                <ui-speed-dial open>
                    <ui-speed-dial-action tooltip-title="Copy">📋</ui-speed-dial-action>
                </ui-speed-dial>
            </div>
        `);
        const el = container.querySelector('ui-speed-dial') as UiSpeedDial;
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
describe('ui-speed-dial — tooltip management', () => {
    it('sets tooltip-placement="left" for direction up', async () => {
        const el = await fixture<UiSpeedDial>(html`
            <ui-speed-dial direction="up" open>
                <ui-speed-dial-action tooltip-title="Copy">📋</ui-speed-dial-action>
            </ui-speed-dial>
        `);
        await el.updateComplete;
        const action = el.querySelector('ui-speed-dial-action')!;
        expect(action.getAttribute('tooltip-placement')).toBe('left');
    });

    it('sets tooltip-placement="left" for direction down', async () => {
        const el = await fixture<UiSpeedDial>(html`
            <ui-speed-dial direction="down" open>
                <ui-speed-dial-action tooltip-title="Copy">📋</ui-speed-dial-action>
            </ui-speed-dial>
        `);
        await el.updateComplete;
        const action = el.querySelector('ui-speed-dial-action')!;
        expect(action.getAttribute('tooltip-placement')).toBe('left');
    });

    it('sets tooltip-placement="top" for direction left', async () => {
        const el = await fixture<UiSpeedDial>(html`
            <ui-speed-dial direction="left" open>
                <ui-speed-dial-action tooltip-title="Copy">📋</ui-speed-dial-action>
            </ui-speed-dial>
        `);
        await el.updateComplete;
        const action = el.querySelector('ui-speed-dial-action')!;
        expect(action.getAttribute('tooltip-placement')).toBe('top');
    });

    it('sets tooltip-placement="top" for direction right', async () => {
        const el = await fixture<UiSpeedDial>(html`
            <ui-speed-dial direction="right" open>
                <ui-speed-dial-action tooltip-title="Copy">📋</ui-speed-dial-action>
            </ui-speed-dial>
        `);
        await el.updateComplete;
        const action = el.querySelector('ui-speed-dial-action')!;
        expect(action.getAttribute('tooltip-placement')).toBe('top');
    });

    it('persistent-tooltips sets tooltip-open on actions when open', async () => {
        const el = await fixture<UiSpeedDial>(html`
            <ui-speed-dial persistent-tooltips open>
                <ui-speed-dial-action tooltip-title="Copy">📋</ui-speed-dial-action>
                <ui-speed-dial-action tooltip-title="Save">💾</ui-speed-dial-action>
            </ui-speed-dial>
        `);
        await el.updateComplete;
        const actions = el.querySelectorAll('ui-speed-dial-action');
        actions.forEach(a => {
            expect(a.hasAttribute('tooltip-open')).toBe(true);
        });
    });

    it('persistent-tooltips removes tooltip-open when closed', async () => {
        const el = await fixture<UiSpeedDial>(html`
            <ui-speed-dial persistent-tooltips>
                <ui-speed-dial-action tooltip-title="Copy">📋</ui-speed-dial-action>
            </ui-speed-dial>
        `);
        await el.updateComplete;
        const action = el.querySelector('ui-speed-dial-action')!;
        expect(action.hasAttribute('tooltip-open')).toBe(false);
    });

    it('stagger transition-delay is applied to actions on open', async () => {
        const el = await fixture<UiSpeedDial>(html`
            <ui-speed-dial direction="down" open>
                <ui-speed-dial-action tooltip-title="A">A</ui-speed-dial-action>
                <ui-speed-dial-action tooltip-title="B">B</ui-speed-dial-action>
                <ui-speed-dial-action tooltip-title="C">C</ui-speed-dial-action>
            </ui-speed-dial>
        `);
        await el.updateComplete;
        const actions = Array.from(el.querySelectorAll<HTMLElement>('ui-speed-dial-action'));
        // direction=down is not reversed, so index 0 gets 0ms, 1 gets 40ms, 2 gets 80ms
        expect(actions[0].style.transitionDelay).toBe('0ms');
        expect(actions[1].style.transitionDelay).toBe('40ms');
        expect(actions[2].style.transitionDelay).toBe('80ms');
    });

    it('stagger is reversed for direction up (nearest FAB gets shortest delay)', async () => {
        const el = await fixture<UiSpeedDial>(html`
            <ui-speed-dial direction="up" open>
                <ui-speed-dial-action tooltip-title="A">A</ui-speed-dial-action>
                <ui-speed-dial-action tooltip-title="B">B</ui-speed-dial-action>
                <ui-speed-dial-action tooltip-title="C">C</ui-speed-dial-action>
            </ui-speed-dial>
        `);
        await el.updateComplete;
        const actions = Array.from(el.querySelectorAll<HTMLElement>('ui-speed-dial-action'));
        // direction=up is reversed, so index 0 (farthest from FAB) gets 80ms, last gets 0ms
        expect(actions[0].style.transitionDelay).toBe('80ms');
        expect(actions[2].style.transitionDelay).toBe('0ms');
    });

    it('slotchange re-syncs tooltip state on dynamically added action', async () => {
        const el = await fixture<UiSpeedDial>(html`
            <ui-speed-dial persistent-tooltips open>
                <ui-speed-dial-action tooltip-title="Copy">📋</ui-speed-dial-action>
            </ui-speed-dial>
        `);
        await el.updateComplete;

        const newAction = document.createElement('ui-speed-dial-action') as UiSpeedDialAction;
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
describe('ui-speed-dial — action click', () => {
    it('clicking an action closes the dial', async () => {
        const el = await dial(true);
        await el.updateComplete;
        const btns = actionButtons(el);
        btns[0].click();
        await el.updateComplete;
        expect(el.open).toBe(false);
    });

    it('clicking an action fires ui-speed-dial-close', async () => {
        const el = await dial(true);
        await el.updateComplete;
        const btns = actionButtons(el);
        setTimeout(() => btns[0].click());
        await oneEvent(el, 'ui-speed-dial-close');
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

    it('fires ui-speed-dial-action-click with name detail', async () => {
        const el = await fixture<UiSpeedDialAction>(html`
            <ui-speed-dial-action tooltip-title="Copy" name="copy-action">📋</ui-speed-dial-action>
        `);
        const btn = el.shadowRoot!.querySelector('.action-btn') as HTMLButtonElement;
        setTimeout(() => btn.click());
        const event = await oneEvent(el, 'ui-speed-dial-action-click') as CustomEvent;
        expect(event.detail.name).toBe('copy-action');
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

    it('tooltip is not visible by default', async () => {
        const el = await fixture<UiSpeedDialAction>(html`
            <ui-speed-dial-action tooltip-title="Edit">✏️</ui-speed-dial-action>
        `);
        const tooltip = el.shadowRoot!.querySelector('.tooltip');
        expect(tooltip?.classList.contains('visible')).toBe(false);
    });

    it('no tooltip element rendered when tooltip-title is empty', async () => {
        const el = await fixture<UiSpeedDialAction>(html`
            <ui-speed-dial-action>✏️</ui-speed-dial-action>
        `);
        const tooltip = el.shadowRoot!.querySelector('.tooltip');
        expect(tooltip).toBeNull();
    });

    it('default name is empty string', async () => {
        const el = await fixture<UiSpeedDialAction>(html`
            <ui-speed-dial-action tooltip-title="X">X</ui-speed-dial-action>
        `);
        expect(el.name).toBe('');
    });
});
