import { describe, it, expect, vi } from 'vitest';
import { fixture, html, oneEvent } from '@open-wc/testing';
import './ui-accordion.js';
import type { UiAccordion, UiAccordionSummary, UiAccordionDetails, UiAccordionActions } from './ui-accordion.js';

/* Shadow-host helper: wraps an accordion in a shadow root to test composed events */
let hostCount = 0;
function createAccordionHost(expanded = false, disabled = false): { host: HTMLElement; acc: UiAccordion; summary: UiAccordionSummary } {
    const tagName = `accordion-shadow-host-${++hostCount}`;
    class AccordionShadowHost extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            const acc = document.createElement('ui-accordion') as UiAccordion;
            if (expanded) acc.setAttribute('expanded', '');
            if (disabled) acc.setAttribute('disabled', '');
            const summary = document.createElement('ui-accordion-summary') as UiAccordionSummary;
            summary.textContent = 'Title';
            const details = document.createElement('ui-accordion-details');
            details.textContent = 'Content';
            acc.appendChild(summary);
            acc.appendChild(details);
            this.shadowRoot!.appendChild(acc);
        }
    }
    customElements.define(tagName, AccordionShadowHost);
    const host = document.createElement(tagName);
    document.body.appendChild(host);
    const acc = host.shadowRoot!.querySelector('ui-accordion') as UiAccordion;
    const summary = acc.querySelector('ui-accordion-summary') as UiAccordionSummary;
    return { host, acc, summary };
}

/* ─────────────────────────────────────────────────────────────────── */
/*  Fixtures                                                             */
/* ─────────────────────────────────────────────────────────────────── */

async function makeAccordion(expanded = false, disabled = false) {
    return fixture<UiAccordion>(html`
        <ui-accordion ?expanded=${expanded} ?disabled=${disabled}>
            <ui-accordion-summary>Title</ui-accordion-summary>
            <ui-accordion-details>Content</ui-accordion-details>
        </ui-accordion>
    `);
}

async function makeAccordionWithActions() {
    return fixture<UiAccordion>(html`
        <ui-accordion expanded>
            <ui-accordion-summary>Title</ui-accordion-summary>
            <ui-accordion-details>Content</ui-accordion-details>
            <ui-accordion-actions>
                <button id="cancel">Cancel</button>
                <button id="agree">Agree</button>
            </ui-accordion-actions>
        </ui-accordion>
    `);
}

/* ─────────────────────────────────────────────────────────────────── */
/*  Element definitions                                                  */
/* ─────────────────────────────────────────────────────────────────── */

describe('accordion — element definitions', () => {
    it('defines ui-accordion', () => {
        expect(document.createElement('ui-accordion')).toBeInstanceOf(HTMLElement);
    });

    it('defines ui-accordion-summary', () => {
        expect(document.createElement('ui-accordion-summary')).toBeInstanceOf(HTMLElement);
    });

    it('defines ui-accordion-details', () => {
        expect(document.createElement('ui-accordion-details')).toBeInstanceOf(HTMLElement);
    });

    it('defines ui-accordion-actions', () => {
        expect(document.createElement('ui-accordion-actions')).toBeInstanceOf(HTMLElement);
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  UiAccordion — rendering                                              */
/* ─────────────────────────────────────────────────────────────────── */

describe('UiAccordion — rendering', () => {
    it('is collapsed by default', async () => {
        const acc = await makeAccordion();
        expect(acc.expanded).toBe(false);
        expect(acc.hasAttribute('expanded')).toBe(false);
    });

    it('reflects expanded attribute when set true', async () => {
        const acc = await makeAccordion(true);
        expect(acc.expanded).toBe(true);
        expect(acc.hasAttribute('expanded')).toBe(true);
    });

    it('reflects disabled attribute when set', async () => {
        const acc = await makeAccordion(false, true);
        expect(acc.disabled).toBe(true);
        expect(acc.hasAttribute('disabled')).toBe(true);
    });

    it('renders accordion-container with role="region"', async () => {
        const acc = await makeAccordion();
        const container = acc.shadowRoot!.querySelector('.accordion-container');
        expect(container).toBeTruthy();
        expect(container!.getAttribute('role')).toBe('region');
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  UiAccordion — toggle behavior                                        */
/* ─────────────────────────────────────────────────────────────────── */

describe('UiAccordion — toggle behavior', () => {
    it('expands when summary is clicked', async () => {
        const acc = await makeAccordion();
        const summary = acc.querySelector('ui-accordion-summary') as UiAccordionSummary;
        summary.click();
        await acc.updateComplete;
        expect(acc.expanded).toBe(true);
    });

    it('collapses when summary is clicked while expanded', async () => {
        const acc = await makeAccordion(true);
        const summary = acc.querySelector('ui-accordion-summary') as UiAccordionSummary;
        summary.click();
        await acc.updateComplete;
        expect(acc.expanded).toBe(false);
    });

    it('does not toggle when disabled', async () => {
        const acc = await makeAccordion(false, true);
        const summary = acc.querySelector('ui-accordion-summary') as UiAccordionSummary;
        summary.click();
        await acc.updateComplete;
        expect(acc.expanded).toBe(false);
    });

    it('fires ui-accordion-change with correct detail on expand', async () => {
        const acc = await makeAccordion();
        const summary = acc.querySelector('ui-accordion-summary') as UiAccordionSummary;
        setTimeout(() => summary.click());
        const ev = await oneEvent(acc, 'ui-accordion-change') as CustomEvent;
        expect(ev.detail.expanded).toBe(true);
    });

    it('fires ui-accordion-change with expanded=false on collapse', async () => {
        const acc = await makeAccordion(true);
        const summary = acc.querySelector('ui-accordion-summary') as UiAccordionSummary;
        setTimeout(() => summary.click());
        const ev = await oneEvent(acc, 'ui-accordion-change') as CustomEvent;
        expect(ev.detail.expanded).toBe(false);
    });

    it('does not fire ui-accordion-change when disabled', async () => {
        const acc = await makeAccordion(false, true);
        const summary = acc.querySelector('ui-accordion-summary') as UiAccordionSummary;
        const spy = vi.fn();
        acc.addEventListener('ui-accordion-change', spy);
        summary.click();
        await acc.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });

    it('action button clicks do not toggle accordion', async () => {
        const acc = await makeAccordionWithActions();
        const cancelBtn = acc.querySelector('#cancel') as HTMLButtonElement;
        cancelBtn.click();
        await acc.updateComplete;
        expect(acc.expanded).toBe(true);

        const agreeBtn = acc.querySelector('#agree') as HTMLButtonElement;
        agreeBtn.click();
        await acc.updateComplete;
        expect(acc.expanded).toBe(true);
    });

    it('clicking inside details does not toggle accordion', async () => {
        const acc = await fixture<UiAccordion>(html`
            <ui-accordion expanded>
                <ui-accordion-summary>Title</ui-accordion-summary>
                <ui-accordion-details>
                    <a id="link" href="#">A link</a>
                </ui-accordion-details>
            </ui-accordion>
        `);
        const link = acc.querySelector('#link') as HTMLElement;
        link.click();
        await acc.updateComplete;
        expect(acc.expanded).toBe(true);
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  UiAccordion — keyboard                                               */
/* ─────────────────────────────────────────────────────────────────── */

describe('UiAccordion — keyboard', () => {
    it('expands on Enter key', async () => {
        const acc = await makeAccordion();
        const summary = acc.querySelector('ui-accordion-summary') as UiAccordionSummary;
        summary.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await acc.updateComplete;
        expect(acc.expanded).toBe(true);
    });

    it('expands on Space key', async () => {
        const acc = await makeAccordion();
        const summary = acc.querySelector('ui-accordion-summary') as UiAccordionSummary;
        summary.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
        await acc.updateComplete;
        expect(acc.expanded).toBe(true);
    });

    it('collapses on Enter key when expanded', async () => {
        const acc = await makeAccordion(true);
        const summary = acc.querySelector('ui-accordion-summary') as UiAccordionSummary;
        summary.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await acc.updateComplete;
        expect(acc.expanded).toBe(false);
    });

    it('does not toggle on unrelated keys', async () => {
        const acc = await makeAccordion();
        const summary = acc.querySelector('ui-accordion-summary') as UiAccordionSummary;
        summary.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
        await acc.updateComplete;
        expect(acc.expanded).toBe(false);
    });

    it('does not toggle via keyboard when disabled', async () => {
        const acc = await makeAccordion(false, true);
        const summary = acc.querySelector('ui-accordion-summary') as UiAccordionSummary;
        summary.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await acc.updateComplete;
        expect(acc.expanded).toBe(false);
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  UiAccordionSummary                                                   */
/* ─────────────────────────────────────────────────────────────────── */

describe('UiAccordionSummary', () => {
    it('has role="button"', async () => {
        const el = await fixture<UiAccordionSummary>(html`<ui-accordion-summary>Title</ui-accordion-summary>`);
        expect(el.getAttribute('role')).toBe('button');
    });

    it('has tabindex="0"', async () => {
        const el = await fixture<UiAccordionSummary>(html`<ui-accordion-summary>Title</ui-accordion-summary>`);
        expect(el.getAttribute('tabindex')).toBe('0');
    });

    it('renders slotted content', async () => {
        const el = await fixture<UiAccordionSummary>(html`<ui-accordion-summary>My Title</ui-accordion-summary>`);
        expect(el.textContent?.trim()).toContain('My Title');
    });

    it('renders default expand icon SVG', async () => {
        const el = await fixture<UiAccordionSummary>(html`<ui-accordion-summary></ui-accordion-summary>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('svg')).toBeTruthy();
    });

    it('dispatches ui-accordion-toggle on click', async () => {
        const el = await fixture<UiAccordionSummary>(html`<ui-accordion-summary>Title</ui-accordion-summary>`);
        setTimeout(() => el.click());
        const ev = await oneEvent(el, 'ui-accordion-toggle');
        expect(ev).toBeTruthy();
    });

    it('dispatches ui-accordion-toggle on Enter key', async () => {
        const el = await fixture<UiAccordionSummary>(html`<ui-accordion-summary>Title</ui-accordion-summary>`);
        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })));
        const ev = await oneEvent(el, 'ui-accordion-toggle');
        expect(ev).toBeTruthy();
    });

    it('dispatches ui-accordion-toggle on Space key', async () => {
        const el = await fixture<UiAccordionSummary>(html`<ui-accordion-summary>Title</ui-accordion-summary>`);
        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true })));
        const ev = await oneEvent(el, 'ui-accordion-toggle');
        expect(ev).toBeTruthy();
    });

    it('does not dispatch ui-accordion-toggle on Tab key', async () => {
        const el = await fixture<UiAccordionSummary>(html`<ui-accordion-summary>Title</ui-accordion-summary>`);
        const spy = vi.fn();
        el.addEventListener('ui-accordion-toggle', spy);
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
        expect(spy).not.toHaveBeenCalled();
    });

    it('renders custom expandIcon slot content', async () => {
        const el = await fixture<UiAccordionSummary>(html`
            <ui-accordion-summary>
                Title
                <span slot="expandIcon" id="custom-icon">+</span>
            </ui-accordion-summary>
        `);
        expect(el.querySelector('#custom-icon')).toBeTruthy();
    });

    it('does not override a pre-existing role attribute', async () => {
        const el = await fixture<UiAccordionSummary>(html`<ui-accordion-summary role="heading">Title</ui-accordion-summary>`);
        expect(el.getAttribute('role')).toBe('heading');
    });

    it('does not override a pre-existing tabindex attribute', async () => {
        const el = await fixture<UiAccordionSummary>(html`<ui-accordion-summary tabindex="-1">Title</ui-accordion-summary>`);
        expect(el.getAttribute('tabindex')).toBe('-1');
    });

    it('sets role=button when no role is present', async () => {
        const el = await fixture<UiAccordionSummary>(html`<ui-accordion-summary>Title</ui-accordion-summary>`);
        expect(el.getAttribute('role')).toBe('button');
    });

    it('sets tabindex=0 when no tabindex is present', async () => {
        const el = await fixture<UiAccordionSummary>(html`<ui-accordion-summary>Title</ui-accordion-summary>`);
        expect(el.getAttribute('tabindex')).toBe('0');
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  UiAccordionDetails                                                   */
/* ─────────────────────────────────────────────────────────────────── */

describe('UiAccordionDetails', () => {
    it('renders slotted content', async () => {
        const el = await fixture<UiAccordionDetails>(html`<ui-accordion-details>Detail text</ui-accordion-details>`);
        expect(el.textContent?.trim()).toContain('Detail text');
    });

    it('has a details-inner container in shadow DOM', async () => {
        const el = await fixture<UiAccordionDetails>(html`<ui-accordion-details>Content</ui-accordion-details>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.details-inner')).toBeTruthy();
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  UiAccordionActions                                                   */
/* ─────────────────────────────────────────────────────────────────── */

describe('UiAccordionActions', () => {
    it('renders slotted content', async () => {
        const el = await fixture<UiAccordionActions>(html`
            <ui-accordion-actions><button>Action</button></ui-accordion-actions>
        `);
        expect(el.querySelector('button')).toBeTruthy();
    });

    it('renders a slot element in shadow DOM', async () => {
        const el = await fixture<UiAccordionActions>(html`
            <ui-accordion-actions><button>Action</button></ui-accordion-actions>
        `);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('slot')).toBeTruthy();
    });

    it('shadow DOM is not empty', async () => {
        const el = await fixture<UiAccordionActions>(html`<ui-accordion-actions></ui-accordion-actions>`);
        await el.updateComplete;
        expect(el.shadowRoot!.children.length).toBeGreaterThan(0);
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  UiAccordion — child attribute synchronization                        */
/* ─────────────────────────────────────────────────────────────────── */

describe('UiAccordion — child attribute synchronization', () => {
    it('sets expanded attribute on summary and details when initially expanded', async () => {
        const acc = await makeAccordion(true);
        await acc.updateComplete;
        const summary = acc.querySelector('ui-accordion-summary')!;
        const details = acc.querySelector('ui-accordion-details')!;
        expect(summary.hasAttribute('expanded')).toBe(true);
        expect(details.hasAttribute('expanded')).toBe(true);
    });

    it('does not set expanded attribute on children when initially collapsed', async () => {
        const acc = await makeAccordion(false);
        await acc.updateComplete;
        const summary = acc.querySelector('ui-accordion-summary')!;
        const details = acc.querySelector('ui-accordion-details')!;
        expect(summary.hasAttribute('expanded')).toBe(false);
        expect(details.hasAttribute('expanded')).toBe(false);
    });

    it('sets disabled attribute on children when initially disabled', async () => {
        const acc = await makeAccordion(false, true);
        await acc.updateComplete;
        const summary = acc.querySelector('ui-accordion-summary')!;
        const details = acc.querySelector('ui-accordion-details')!;
        expect(summary.hasAttribute('disabled')).toBe(true);
        expect(details.hasAttribute('disabled')).toBe(true);
    });

    it('does not set disabled attribute on children when not disabled', async () => {
        const acc = await makeAccordion(false, false);
        await acc.updateComplete;
        const summary = acc.querySelector('ui-accordion-summary')!;
        const details = acc.querySelector('ui-accordion-details')!;
        expect(summary.hasAttribute('disabled')).toBe(false);
        expect(details.hasAttribute('disabled')).toBe(false);
    });

    it('adds expanded attribute to children when expanded changes to true', async () => {
        const acc = await makeAccordion(false);
        const summary = acc.querySelector('ui-accordion-summary')!;
        const details = acc.querySelector('ui-accordion-details')!;
        expect(summary.hasAttribute('expanded')).toBe(false);
        acc.expanded = true;
        await acc.updateComplete;
        expect(summary.hasAttribute('expanded')).toBe(true);
        expect(details.hasAttribute('expanded')).toBe(true);
    });

    it('removes expanded attribute from children when expanded changes to false', async () => {
        const acc = await makeAccordion(true);
        const summary = acc.querySelector('ui-accordion-summary')!;
        const details = acc.querySelector('ui-accordion-details')!;
        expect(summary.hasAttribute('expanded')).toBe(true);
        acc.expanded = false;
        await acc.updateComplete;
        expect(summary.hasAttribute('expanded')).toBe(false);
        expect(details.hasAttribute('expanded')).toBe(false);
    });

    it('adds disabled attribute to children when disabled changes to true', async () => {
        const acc = await makeAccordion(false, false);
        const summary = acc.querySelector('ui-accordion-summary')!;
        const details = acc.querySelector('ui-accordion-details')!;
        expect(summary.hasAttribute('disabled')).toBe(false);
        acc.disabled = true;
        await acc.updateComplete;
        expect(summary.hasAttribute('disabled')).toBe(true);
        expect(details.hasAttribute('disabled')).toBe(true);
    });

    it('removes disabled attribute from children when disabled changes to false', async () => {
        const acc = await makeAccordion(false, true);
        const summary = acc.querySelector('ui-accordion-summary')!;
        const details = acc.querySelector('ui-accordion-details')!;
        expect(summary.hasAttribute('disabled')).toBe(true);
        acc.disabled = false;
        await acc.updateComplete;
        expect(summary.hasAttribute('disabled')).toBe(false);
        expect(details.hasAttribute('disabled')).toBe(false);
    });

    it('syncs all three child types (summary, details, actions) with expanded', async () => {
        const acc = await makeAccordionWithActions();
        await acc.updateComplete;
        const summary = acc.querySelector('ui-accordion-summary')!;
        const details = acc.querySelector('ui-accordion-details')!;
        const actions = acc.querySelector('ui-accordion-actions')!;
        expect(summary.hasAttribute('expanded')).toBe(true);
        expect(details.hasAttribute('expanded')).toBe(true);
        expect(actions.hasAttribute('expanded')).toBe(true);
    });

    it('syncs all three child types with disabled', async () => {
        const acc = await fixture<UiAccordion>(html`
            <ui-accordion disabled>
                <ui-accordion-summary>Title</ui-accordion-summary>
                <ui-accordion-details>Content</ui-accordion-details>
                <ui-accordion-actions><button>OK</button></ui-accordion-actions>
            </ui-accordion>
        `);
        await acc.updateComplete;
        const summary = acc.querySelector('ui-accordion-summary')!;
        const details = acc.querySelector('ui-accordion-details')!;
        const actions = acc.querySelector('ui-accordion-actions')!;
        expect(summary.hasAttribute('disabled')).toBe(true);
        expect(details.hasAttribute('disabled')).toBe(true);
        expect(actions.hasAttribute('disabled')).toBe(true);
    });

    it('sets the exact attribute name expanded (not empty or wrong name)', async () => {
        const acc = await makeAccordion(true);
        await acc.updateComplete;
        const summary = acc.querySelector('ui-accordion-summary')!;
        expect(summary.getAttribute('expanded')).toBe('');
    });

    it('sets the exact attribute name disabled (not empty or wrong name)', async () => {
        const acc = await makeAccordion(false, true);
        await acc.updateComplete;
        const summary = acc.querySelector('ui-accordion-summary')!;
        expect(summary.getAttribute('disabled')).toBe('');
    });

    it('removes only expanded, not all attributes, when collapsing', async () => {
        const acc = await makeAccordion(true, true);
        await acc.updateComplete;
        const summary = acc.querySelector('ui-accordion-summary')!;
        expect(summary.hasAttribute('disabled')).toBe(true);
        acc.expanded = false;
        await acc.updateComplete;
        expect(summary.hasAttribute('expanded')).toBe(false);
        expect(summary.hasAttribute('disabled')).toBe(true);
    });

    it('removes only disabled, not all attributes, when enabling', async () => {
        const acc = await makeAccordion(true, true);
        await acc.updateComplete;
        const summary = acc.querySelector('ui-accordion-summary')!;
        expect(summary.hasAttribute('expanded')).toBe(true);
        acc.disabled = false;
        await acc.updateComplete;
        expect(summary.hasAttribute('disabled')).toBe(false);
        expect(summary.hasAttribute('expanded')).toBe(true);
    });

    it('does not call setAttribute on children when no relevant property changed', async () => {
        const acc = await makeAccordion(false, false);
        const summary = acc.querySelector('ui-accordion-summary')!;
        await acc.updateComplete;

        const spy = vi.spyOn(summary, 'setAttribute');
        // requestUpdate with no property changes — changed map will be empty
        // so the if-condition should be false and forEach should NOT run
        acc.requestUpdate();
        await acc.updateComplete;
        expect(spy).not.toHaveBeenCalled();
        spy.mockRestore();
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  UiAccordion — event propagation                                      */
/* ─────────────────────────────────────────────────────────────────── */

describe('UiAccordion — event propagation', () => {
    it('ui-accordion-change bubbles to parent element', async () => {
        const parent = await fixture<HTMLDivElement>(html`
            <div>
                <ui-accordion>
                    <ui-accordion-summary>Title</ui-accordion-summary>
                    <ui-accordion-details>Content</ui-accordion-details>
                </ui-accordion>
            </div>
        `);
        const acc = parent.querySelector('ui-accordion') as UiAccordion;
        const summary = acc.querySelector('ui-accordion-summary') as UiAccordionSummary;
        const spy = vi.fn();
        parent.addEventListener('ui-accordion-change', spy);
        summary.click();
        await acc.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.expanded).toBe(true);
    });

    it('ui-accordion-change does not bubble when disabled', async () => {
        const parent = await fixture<HTMLDivElement>(html`
            <div>
                <ui-accordion disabled>
                    <ui-accordion-summary>Title</ui-accordion-summary>
                    <ui-accordion-details>Content</ui-accordion-details>
                </ui-accordion>
            </div>
        `);
        const acc = parent.querySelector('ui-accordion') as UiAccordion;
        const summary = acc.querySelector('ui-accordion-summary') as UiAccordionSummary;
        const spy = vi.fn();
        parent.addEventListener('ui-accordion-change', spy);
        summary.click();
        await acc.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });

    it('ui-accordion-toggle from summary bubbles to accordion', async () => {
        const acc = await makeAccordion();
        const summary = acc.querySelector('ui-accordion-summary') as UiAccordionSummary;
        const spy = vi.fn();
        acc.addEventListener('ui-accordion-toggle', spy);
        summary.click();
        await acc.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
    });

    it('ui-accordion-change is composed (crosses shadow DOM boundary)', async () => {
        const { host, acc, summary } = createAccordionHost();
        await acc.updateComplete;
        const spy = vi.fn();
        host.addEventListener('ui-accordion-change', spy);
        summary.click();
        await acc.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.expanded).toBe(true);
        host.remove();
    });

    it('ui-accordion-toggle is composed (crosses shadow DOM boundary to reach accordion inside shadow host)', async () => {
        // The accordion itself is inside a shadow root; the toggle event must cross the
        // shadow boundary from ui-accordion-summary (light DOM child of accordion) up to accordion
        // This tests composed:true on ui-accordion-toggle dispatch in _handleActivate
        const { host, acc, summary } = createAccordionHost();
        await acc.updateComplete;
        summary.click();
        await acc.updateComplete;
        // If composed:false, the event wouldn't reach the accordion (which is in shadow DOM)
        // and expanded would stay false
        expect(acc.expanded).toBe(true);
        host.remove();
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  Integration — group behavior                                         */
/* ─────────────────────────────────────────────────────────────────── */

describe('accordion — group integration', () => {
    it('multiple accordions can be expanded independently', async () => {
        const container = await fixture<HTMLDivElement>(html`
            <div>
                <ui-accordion>
                    <ui-accordion-summary>A</ui-accordion-summary>
                    <ui-accordion-details>Content A</ui-accordion-details>
                </ui-accordion>
                <ui-accordion>
                    <ui-accordion-summary>B</ui-accordion-summary>
                    <ui-accordion-details>Content B</ui-accordion-details>
                </ui-accordion>
            </div>
        `);
        const [accA, accB] = [...container.querySelectorAll('ui-accordion')] as UiAccordion[];
        const summaryA = accA.querySelector('ui-accordion-summary') as UiAccordionSummary;
        const summaryB = accB.querySelector('ui-accordion-summary') as UiAccordionSummary;

        summaryA.click();
        await accA.updateComplete;
        summaryB.click();
        await accB.updateComplete;

        expect(accA.expanded).toBe(true);
        expect(accB.expanded).toBe(true);
    });

    it('single-expansion logic can be controlled externally via events', async () => {
        let lastExpanded = '';
        const container = await fixture<HTMLDivElement>(html`
            <div>
                <ui-accordion id="a1" @ui-accordion-change=${(e: Event) => {
                    const { expanded } = (e as CustomEvent).detail;
                    (e.target as UiAccordion).expanded = expanded;
                    if (expanded) {
                        lastExpanded = 'a1';
                        const other = container.querySelector('#a2') as UiAccordion;
                        if (other) other.expanded = false;
                    }
                }}>
                    <ui-accordion-summary>A</ui-accordion-summary>
                    <ui-accordion-details>Content A</ui-accordion-details>
                </ui-accordion>
                <ui-accordion id="a2" @ui-accordion-change=${(e: Event) => {
                    const { expanded } = (e as CustomEvent).detail;
                    (e.target as UiAccordion).expanded = expanded;
                    if (expanded) {
                        lastExpanded = 'a2';
                        const other = container.querySelector('#a1') as UiAccordion;
                        if (other) other.expanded = false;
                    }
                }}>
                    <ui-accordion-summary>B</ui-accordion-summary>
                    <ui-accordion-details>Content B</ui-accordion-details>
                </ui-accordion>
            </div>
        `);
        const accA = container.querySelector('#a1') as UiAccordion;
        const accB = container.querySelector('#a2') as UiAccordion;
        const summaryA = accA.querySelector('ui-accordion-summary') as UiAccordionSummary;
        const summaryB = accB.querySelector('ui-accordion-summary') as UiAccordionSummary;

        summaryA.click();
        await accA.updateComplete;
        expect(accA.expanded).toBe(true);
        expect(lastExpanded).toBe('a1');

        summaryB.click();
        await accB.updateComplete;
        expect(accB.expanded).toBe(true);
        expect(accA.expanded).toBe(false);
        expect(lastExpanded).toBe('a2');
    });
});
