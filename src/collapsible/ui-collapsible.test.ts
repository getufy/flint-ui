import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-collapsible';
import type { UiCollapsible, UiCollapsibleTrigger, UiCollapsibleContent } from './ui-collapsible';

/* ── helpers ────────────────────────────────────────────────────────── */

interface MakeOpts {
    open?: boolean;
    disabled?: boolean;
    defaultOpen?: boolean;
}

async function make({ open = false, disabled = false, defaultOpen = false }: MakeOpts = {}) {
    const el = await fixture<UiCollapsible>(html`
        <ui-collapsible
            .open=${open}
            .disabled=${disabled}
            .defaultOpen=${defaultOpen}
        >
            <ui-collapsible-trigger>Toggle</ui-collapsible-trigger>
            <ui-collapsible-content>
                <p>Content</p>
            </ui-collapsible-content>
        </ui-collapsible>
    `);
    await el.updateComplete;
    return el;
}

function getTrigger(el: UiCollapsible) {
    return el.querySelector('ui-collapsible-trigger') as UiCollapsibleTrigger;
}
function getContent(el: UiCollapsible) {
    return el.querySelector('ui-collapsible-content') as UiCollapsibleContent;
}
function getButton(el: UiCollapsible) {
    return getTrigger(el).shadowRoot!.querySelector('button') as HTMLButtonElement;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ui-collapsible — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-collapsible — rendering', () => {
    it('renders a slot in shadow DOM', async () => {
        const el = await make();
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('defaults to closed (open = false)', async () => {
        const el = await make();
        expect(el.open).toBe(false);
    });

    it('starts open when open=true is passed', async () => {
        const el = await make({ open: true });
        expect(el.open).toBe(true);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-collapsible — defaultOpen
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-collapsible — defaultOpen', () => {
    it('starts open when defaultOpen=true is passed', async () => {
        const el = await make({ defaultOpen: true });
        await el.updateComplete;
        expect(el.open).toBe(true);
    });

    it('syncs content open when defaultOpen initialises', async () => {
        const el = await make({ defaultOpen: true });
        await el.updateComplete;
        expect(getContent(el).open).toBe(true);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-collapsible — toggle()
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-collapsible — toggle()', () => {
    it('opens when toggled from closed', async () => {
        const el = await make();
        el.toggle();
        await el.updateComplete;
        expect(el.open).toBe(true);
    });

    it('closes when toggled from open', async () => {
        const el = await make({ open: true });
        el.toggle();
        await el.updateComplete;
        expect(el.open).toBe(false);
    });

    it('does nothing when disabled', async () => {
        const el = await make({ disabled: true });
        el.toggle();
        await el.updateComplete;
        expect(el.open).toBe(false);
    });

    it('fires ui-collapsible-change with correct detail', async () => {
        const el = await make();
        const spy = vi.fn();
        el.addEventListener('ui-collapsible-change', spy);
        el.toggle();
        await el.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail).toEqual({ open: true });
    });

    it('fires ui-collapsible-change on close too', async () => {
        const el = await make({ open: true });
        const spy = vi.fn();
        el.addEventListener('ui-collapsible-change', spy);
        el.toggle();
        await el.updateComplete;
        expect(spy.mock.calls[0][0].detail).toEqual({ open: false });
    });

    it('does not fire event when disabled', async () => {
        const el = await make({ disabled: true });
        const spy = vi.fn();
        el.addEventListener('ui-collapsible-change', spy);
        el.toggle();
        expect(spy).not.toHaveBeenCalled();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-collapsible — child sync
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-collapsible — child sync', () => {
    it('sets content.open=true when opened', async () => {
        const el = await make();
        el.open = true;
        await el.updateComplete;
        expect(getContent(el).open).toBe(true);
    });

    it('sets content.open=false when closed', async () => {
        const el = await make({ open: true });
        el.open = false;
        await el.updateComplete;
        expect(getContent(el).open).toBe(false);
    });

    it('sets trigger.expanded=true when opened', async () => {
        const el = await make();
        el.open = true;
        await el.updateComplete;
        expect(getTrigger(el).expanded).toBe(true);
    });

    it('sets trigger.disabled=true when parent is disabled', async () => {
        const el = await make({ disabled: true });
        await el.updateComplete;
        expect(getTrigger(el).disabled).toBe(true);
    });

    it('syncs on slotchange (dynamically added content)', async () => {
        const el = await fixture<UiCollapsible>(html`
            <ui-collapsible open>
                <ui-collapsible-trigger>T</ui-collapsible-trigger>
            </ui-collapsible>
        `);
        await el.updateComplete;
        // add content dynamically
        const content = document.createElement('ui-collapsible-content') as UiCollapsibleContent;
        el.appendChild(content);
        // trigger slotchange
        await el.updateComplete;
        await content.updateComplete;
        expect(content.open).toBe(true);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-collapsible-trigger — rendering & behaviour
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-collapsible-trigger — rendering', () => {
    it('renders a <button> in shadow DOM', async () => {
        const el = await make();
        const btn = getButton(el);
        expect(btn).not.toBeNull();
        expect(btn.tagName.toLowerCase()).toBe('button');
    });

    it('aria-expanded is "false" when closed', async () => {
        const el = await make();
        const btn = getButton(el);
        expect(btn.getAttribute('aria-expanded')).toBe('false');
    });

    it('aria-expanded is "true" when open', async () => {
        const el = await make({ open: true });
        const btn = getButton(el);
        expect(btn.getAttribute('aria-expanded')).toBe('true');
    });

    it('button is disabled when trigger is disabled', async () => {
        const el = await make({ disabled: true });
        await el.updateComplete;
        const btn = getButton(el);
        expect(btn.disabled).toBe(true);
    });

    it('clicking the button toggles the collapsible', async () => {
        const el = await make();
        const btn = getButton(el);
        btn.click();
        await el.updateComplete;
        expect(el.open).toBe(true);
    });

    it('clicking again closes the collapsible', async () => {
        const el = await make({ open: true });
        const btn = getButton(el);
        btn.click();
        await el.updateComplete;
        expect(el.open).toBe(false);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-collapsible-content — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-collapsible-content — rendering', () => {
    it('renders a .panel div with a slot', async () => {
        const el = await make();
        const content = getContent(el);
        await content.updateComplete;
        expect(content.shadowRoot!.querySelector('.panel')).not.toBeNull();
        expect(content.shadowRoot!.querySelector('.panel-inner slot')).not.toBeNull();
    });

    it('defaults to open=false', async () => {
        const el = await make();
        expect(getContent(el).open).toBe(false);
    });

    it('panel has aria-hidden="true" when closed', async () => {
        const el = await make();
        const content = getContent(el);
        await content.updateComplete;
        const panel = content.shadowRoot!.querySelector('.panel')!;
        expect(panel.getAttribute('aria-hidden')).toBe('true');
    });

    it('panel has aria-hidden="false" when open', async () => {
        const el = await make({ open: true });
        const content = getContent(el);
        await content.updateComplete;
        const panel = content.shadowRoot!.querySelector('.panel')!;
        expect(panel.getAttribute('aria-hidden')).toBe('false');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-collapsible — nested isolation
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-collapsible — nested isolation', () => {
    it('outer open does not set inner content open', async () => {
        const el = await fixture<UiCollapsible>(html`
            <ui-collapsible>
                <ui-collapsible-trigger>Outer</ui-collapsible-trigger>
                <ui-collapsible-content>
                    <ui-collapsible>
                        <ui-collapsible-trigger>Inner</ui-collapsible-trigger>
                        <ui-collapsible-content id="inner-content">
                            <p>Inner</p>
                        </ui-collapsible-content>
                    </ui-collapsible>
                </ui-collapsible-content>
            </ui-collapsible>
        `);
        await el.updateComplete;

        el.open = true;
        await el.updateComplete;

        const innerContent = el.querySelector('#inner-content') as UiCollapsibleContent;
        // inner collapsible was not toggled, so its content should remain closed
        expect(innerContent.open).toBe(false);
    });

    it('inner toggle does not affect outer state', async () => {
        const el = await fixture<UiCollapsible>(html`
            <ui-collapsible open>
                <ui-collapsible-trigger>Outer</ui-collapsible-trigger>
                <ui-collapsible-content>
                    <ui-collapsible id="inner">
                        <ui-collapsible-trigger>Inner</ui-collapsible-trigger>
                        <ui-collapsible-content><p>Inner</p></ui-collapsible-content>
                    </ui-collapsible>
                </ui-collapsible-content>
            </ui-collapsible>
        `);
        await el.updateComplete;

        const inner = el.querySelector('#inner') as UiCollapsible;
        inner.toggle();
        await el.updateComplete;

        expect(el.open).toBe(true); // outer unchanged
        expect(inner.open).toBe(true); // inner toggled
    });
});
