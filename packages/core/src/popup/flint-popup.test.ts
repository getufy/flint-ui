import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-popup';
import type { FlintPopup } from './flint-popup';
import { expectAccessible } from '../test-utils/axe';

/* ── helpers ────────────────────────────────────────────────────────── */

async function make(opts: Partial<{
    active: boolean;
    placement: string;
    strategy: string;
    distance: number;
    skidding: number;
    flip: boolean;
    shift: boolean;
    arrow: boolean;
    hoverBridge: boolean;
    sync: string;
    autoSize: string;
}> = {}) {
    const el = await fixture<FlintPopup>(html`
        <flint-popup
            ?active=${opts.active ?? false}
            placement=${opts.placement ?? 'top'}
            strategy=${opts.strategy ?? 'absolute'}
            .distance=${opts.distance ?? 0}
            .skidding=${opts.skidding ?? 0}
            ?flip=${opts.flip ?? false}
            ?shift=${opts.shift ?? false}
            ?arrow=${opts.arrow ?? false}
            ?hover-bridge=${opts.hoverBridge ?? false}
            sync=${opts.sync ?? ''}
            auto-size=${opts.autoSize ?? ''}
        >
            <button slot="anchor">Anchor</button>
            <div class="content">Popup content</div>
        </flint-popup>
    `);
    await el.updateComplete;
    return el;
}

function getPopup(el: FlintPopup) {
    return el.shadowRoot!.querySelector('.popup') as HTMLElement;
}

function getArrow(el: FlintPopup) {
    return el.shadowRoot!.querySelector('.popup__arrow') as HTMLElement | null;
}

function getHoverBridge(el: FlintPopup) {
    return el.shadowRoot!.querySelector('.popup__hover-bridge') as HTMLElement | null;
}

/* ═══════════════════════════════════════════════════════════════════
   rendering
═══════════════════════════════════════════════════════════════════ */
describe('flint-popup — rendering', () => {
    it('renders an anchor slot and a popup container', async () => {
        const el = await make();
        const anchorSlot = el.shadowRoot!.querySelector('slot[name="anchor"]');
        const popup = getPopup(el);
        expect(anchorSlot).not.toBeNull();
        expect(popup).not.toBeNull();
    });

    it('renders a default slot inside the popup container', async () => {
        const el = await make();
        const popup = getPopup(el);
        const defaultSlot = popup.querySelector('slot:not([name])');
        expect(defaultSlot).not.toBeNull();
    });

    it('assigns slotted anchor element correctly', async () => {
        const el = await make();
        const anchorSlot = el.shadowRoot!.querySelector('slot[name="anchor"]') as HTMLSlotElement;
        const assigned = anchorSlot.assignedElements({ flatten: true });
        expect(assigned.length).toBe(1);
        expect(assigned[0].tagName).toBe('BUTTON');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   defaults
═══════════════════════════════════════════════════════════════════ */
describe('flint-popup — defaults', () => {
    it('defaults to inactive', async () => {
        const el = await make();
        expect(el.active).toBe(false);
    });

    it('defaults placement to top', async () => {
        const el = await make();
        expect(el.placement).toBe('top');
    });

    it('defaults strategy to absolute', async () => {
        const el = await make();
        expect(el.strategy).toBe('absolute');
    });

    it('defaults distance and skidding to 0', async () => {
        const el = await make();
        expect(el.distance).toBe(0);
        expect(el.skidding).toBe(0);
    });

    it('defaults flip and shift to false', async () => {
        const el = await make();
        expect(el.flip).toBe(false);
        expect(el.shift).toBe(false);
    });

    it('defaults arrow to false', async () => {
        const el = await make();
        expect(el.arrow).toBe(false);
    });

    it('defaults hoverBridge to false', async () => {
        const el = await make();
        expect(el.hoverBridge).toBe(false);
    });

    it('defaults sync and autoSize to empty string', async () => {
        const el = await make();
        expect(el.sync).toBe('');
        expect(el.autoSize).toBe('');
    });

    it('defaults arrowPadding to 4', async () => {
        const el = await make();
        expect(el.arrowPadding).toBe(4);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   active toggle
═══════════════════════════════════════════════════════════════════ */
describe('flint-popup — active toggle', () => {
    it('hides popup when inactive', async () => {
        const el = await make({ active: false });
        const popup = getPopup(el);
        expect(popup.classList.contains('popup--active')).toBe(false);
    });

    it('shows popup when active', async () => {
        const el = await make({ active: true });
        const popup = getPopup(el);
        expect(popup.classList.contains('popup--active')).toBe(true);
    });

    it('reflects active attribute on the host', async () => {
        const el = await make({ active: true });
        await el.updateComplete;
        expect(el.hasAttribute('active')).toBe(true);
    });

    it('removes active attribute when deactivated', async () => {
        const el = await make({ active: true });
        el.active = false;
        await el.updateComplete;
        expect(el.hasAttribute('active')).toBe(false);
    });

    it('toggles popup--active class on the popup element', async () => {
        const el = await make({ active: false });
        const popup = getPopup(el);
        expect(popup.classList.contains('popup--active')).toBe(false);

        el.active = true;
        await el.updateComplete;
        expect(popup.classList.contains('popup--active')).toBe(true);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   strategy
═══════════════════════════════════════════════════════════════════ */
describe('flint-popup — strategy', () => {
    it('adds popup--fixed class when strategy is fixed', async () => {
        const el = await make({ strategy: 'fixed', active: true });
        const popup = getPopup(el);
        expect(popup.classList.contains('popup--fixed')).toBe(true);
    });

    it('does not add popup--fixed class for absolute strategy', async () => {
        const el = await make({ strategy: 'absolute', active: true });
        const popup = getPopup(el);
        expect(popup.classList.contains('popup--fixed')).toBe(false);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   arrow
═══════════════════════════════════════════════════════════════════ */
describe('flint-popup — arrow', () => {
    it('does not render arrow by default', async () => {
        const el = await make();
        expect(getArrow(el)).toBeNull();
    });

    it('renders arrow element when arrow=true', async () => {
        const el = await make({ arrow: true });
        const arrowEl = getArrow(el);
        expect(arrowEl).not.toBeNull();
        expect(arrowEl!.getAttribute('part')).toBe('arrow');
    });

    it('removes arrow when toggled off', async () => {
        const el = await make({ arrow: true });
        expect(getArrow(el)).not.toBeNull();
        el.arrow = false;
        await el.updateComplete;
        expect(getArrow(el)).toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════
   hover bridge
═══════════════════════════════════════════════════════════════════ */
describe('flint-popup — hover bridge', () => {
    it('does not render hover bridge by default', async () => {
        const el = await make();
        expect(getHoverBridge(el)).toBeNull();
    });

    it('does not render hover bridge when inactive', async () => {
        const el = await make({ hoverBridge: true, active: false });
        expect(getHoverBridge(el)).toBeNull();
    });

    it('renders hover bridge when hoverBridge=true and active', async () => {
        const el = await make({ hoverBridge: true, active: true });
        const bridge = getHoverBridge(el);
        expect(bridge).not.toBeNull();
        expect(bridge!.getAttribute('part')).toBe('hover-bridge');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   placement
═══════════════════════════════════════════════════════════════════ */
describe('flint-popup — placement', () => {
    it('reflects placement attribute', async () => {
        const el = await make({ placement: 'bottom' });
        await el.updateComplete;
        expect(el.getAttribute('placement')).toBe('bottom');
    });

    it('accepts compound placements', async () => {
        const el = await make({ placement: 'bottom-start' });
        await el.updateComplete;
        expect(el.getAttribute('placement')).toBe('bottom-start');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   reposition event
═══════════════════════════════════════════════════════════════════ */
describe('flint-popup — reposition event', () => {
    it('fires flint-reposition when activated', async () => {
        const el = await make({ active: false });
        const spy = vi.fn();
        el.addEventListener('flint-reposition', spy);

        el.active = true;
        await el.updateComplete;
        // Give the async reposition a chance to resolve
        await new Promise(r => setTimeout(r, 50));

        expect(spy).toHaveBeenCalled();
        expect(spy.mock.calls[0][0].detail).toHaveProperty('placement');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   anchor via property
═══════════════════════════════════════════════════════════════════ */
describe('flint-popup — anchor property', () => {
    it('accepts an Element reference as anchor', async () => {
        const anchorEl = document.createElement('div');
        anchorEl.id = 'my-anchor';
        document.body.appendChild(anchorEl);

        const el = await fixture<FlintPopup>(html`
            <flint-popup .anchor=${anchorEl} active>
                <div>Content</div>
            </flint-popup>
        `);
        await el.updateComplete;
        await new Promise(r => setTimeout(r, 50));

        // Should not throw and popup should be active
        expect(el.active).toBe(true);

        anchorEl.remove();
    });

    it('accepts a CSS selector string as anchor', async () => {
        const anchorEl = document.createElement('div');
        anchorEl.id = 'selector-anchor';
        document.body.appendChild(anchorEl);

        const el = await fixture<FlintPopup>(html`
            <flint-popup .anchor=${'#selector-anchor'} active>
                <div>Content</div>
            </flint-popup>
        `);
        await el.updateComplete;
        await new Promise(r => setTimeout(r, 50));

        expect(el.active).toBe(true);

        anchorEl.remove();
    });
});

/* ═══════════════════════════════════════════════════════════════════
   cleanup
═══════════════════════════════════════════════════════════════════ */
describe('flint-popup — cleanup', () => {
    it('does not throw when disconnected while active', async () => {
        const el = await make({ active: true });
        await new Promise(r => setTimeout(r, 50));
        expect(() => el.remove()).not.toThrow();
    });

    it('does not throw when reposition is called after disconnect', async () => {
        const el = await make({ active: true });
        await new Promise(r => setTimeout(r, 50));
        el.remove();
        await expect(el.reposition()).resolves.not.toThrow();
    });
});

/* ═══════════════════════════════════════════════════════════════════
   a11y
═══════════════════════════════════════════════════════════════════ */
describe('flint-popup — a11y', () => {
    it('passes axe accessibility checks', async () => {
        const el = await make({ active: true });
        await new Promise(r => setTimeout(r, 50));
        await expectAccessible(el);
    });
});
