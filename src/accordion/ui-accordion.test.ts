import { describe, it, expect, vi } from 'vitest';
import { fixture, html, oneEvent } from '@open-wc/testing';
import './ui-accordion.js';
import type { UiAccordion, UiAccordionSummary, UiAccordionDetails, UiAccordionActions } from './ui-accordion.js';

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
