import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-visually-hidden';
import type { FlintVisuallyHidden } from './flint-visually-hidden';

/* ── helpers ─────────────────────────────────────────────────────── */

async function make(slotContent = html`<span>Hidden text</span>`) {
    const el = await fixture<FlintVisuallyHidden>(html`
        <flint-visually-hidden>${slotContent}</flint-visually-hidden>
    `);
    await el.updateComplete;
    return el;
}

/* ═══════════════════════════════════════════════════════════════════
   Rendering
═══════════════════════════════════════════════════════════════════ */
describe('flint-visually-hidden — rendering', () => {
    it('renders without error', async () => {
        const el = await make();
        expect(el).toBeTruthy();
    });

    it('renders a <slot> in shadow DOM', async () => {
        const el = await make();
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('slotted content is in the light DOM', async () => {
        const el = await make(html`<span id="inner">Screen reader text</span>`);
        const inner = el.querySelector('#inner');
        expect(inner).not.toBeNull();
        expect(inner!.textContent).toBe('Screen reader text');
    });

    it('accepts plain text as slotted content', async () => {
        const el = await fixture<FlintVisuallyHidden>(html`
            <flint-visually-hidden>Plain text content</flint-visually-hidden>
        `);
        await el.updateComplete;
        const textNodes = Array.from(el.childNodes).filter(
            n => n.nodeType === Node.TEXT_NODE
        );
        const text = textNodes.map(n => n.textContent?.trim()).join('');
        expect(text).toBe('Plain text content');
    });

    it('accepts a link as slotted content', async () => {
        const el = await make(html`<a href="#main">Skip to main content</a>`);
        const link = el.querySelector('a');
        expect(link).not.toBeNull();
        expect(link!.getAttribute('href')).toBe('#main');
    });

    it('accepts multiple children', async () => {
        const el = await fixture<FlintVisuallyHidden>(html`
            <flint-visually-hidden>
                <span>First</span>
                <span>Second</span>
            </flint-visually-hidden>
        `);
        await el.updateComplete;
        const spans = el.querySelectorAll('span');
        expect(spans.length).toBe(2);
    });

    it('renders with no slotted content without error', async () => {
        const el = await fixture<FlintVisuallyHidden>(html`
            <flint-visually-hidden></flint-visually-hidden>
        `);
        await el.updateComplete;
        expect(el).toBeTruthy();
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('renders slotted img element', async () => {
        const el = await make(html`<img src="#" alt="decorative description" />`);
        const img = el.querySelector('img');
        expect(img).not.toBeNull();
        expect(img!.getAttribute('alt')).toBe('decorative description');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Accessibility
═══════════════════════════════════════════════════════════════════ */
describe('flint-visually-hidden — accessibility', () => {
    it('slotted link is focusable', async () => {
        const el = await make(html`<a href="#main">Skip</a>`);
        const link = el.querySelector('a') as HTMLAnchorElement;
        expect(link.tabIndex).toBe(0);
    });

    it('does not add aria-hidden to the host', async () => {
        const el = await make();
        expect(el.hasAttribute('aria-hidden')).toBe(false);
    });

    it('does not set role on host', async () => {
        const el = await make();
        expect(el.getAttribute('role')).toBeNull();
    });

    it('slotted content text is accessible (not aria-hidden)', async () => {
        const el = await make(html`<span id="sr-text">Screen reader only</span>`);
        const span = el.querySelector('#sr-text')!;
        expect(span.getAttribute('aria-hidden')).toBeNull();
    });

    it('slotted aria-live region is accessible', async () => {
        const el = await make(html`<div aria-live="polite">Status message</div>`);
        const live = el.querySelector('[aria-live]') as HTMLElement;
        expect(live).not.toBeNull();
        expect(live.getAttribute('aria-live')).toBe('polite');
    });

    it('host element is not aria-hidden when containing a live region', async () => {
        const el = await make(html`<div aria-live="assertive">Alert!</div>`);
        expect(el.getAttribute('aria-hidden')).toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════
   DOM structure
═══════════════════════════════════════════════════════════════════ */
describe('flint-visually-hidden — DOM structure', () => {
    it('shadow root contains only a slot element', async () => {
        const el = await make();
        const children = Array.from(el.shadowRoot!.children).filter(
            c => c.tagName.toLowerCase() !== 'style'
        );
        expect(children.length).toBe(1);
        expect(children[0]!.tagName.toLowerCase()).toBe('slot');
    });

    it('slotted children remain in light DOM (not moved to shadow)', async () => {
        const el = await make(html`<span id="check">text</span>`);
        const span = el.querySelector('#check');
        expect(span).not.toBeNull();
        expect(el.shadowRoot!.querySelector('#check')).toBeNull();
    });

    it('can hold interactive elements that receive focus', async () => {
        const el = await fixture<FlintVisuallyHidden>(html`
            <flint-visually-hidden>
                <button id="focusable">Click me</button>
            </flint-visually-hidden>
        `);
        await el.updateComplete;
        const btn = el.querySelector('#focusable') as HTMLButtonElement;
        expect(btn).not.toBeNull();
        expect(() => btn.focus()).not.toThrow();
    });

    it('can hold a slotted input element', async () => {
        const el = await fixture<FlintVisuallyHidden>(html`
            <flint-visually-hidden>
                <input type="text" id="sr-input" />
            </flint-visually-hidden>
        `);
        await el.updateComplete;
        const input = el.querySelector('#sr-input') as HTMLInputElement;
        expect(input).not.toBeNull();
        expect(input.tagName.toLowerCase()).toBe('input');
    });

    it('tag name is flint-visually-hidden', async () => {
        const el = await make();
        expect(el.tagName.toLowerCase()).toBe('flint-visually-hidden');
    });

    it('shadow root exists', async () => {
        const el = await make();
        expect(el.shadowRoot).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════
   notFocusable property
═══════════════════════════════════════════════════════════════════ */
describe('flint-visually-hidden — notFocusable prop', () => {
    it('notFocusable defaults to false', async () => {
        const el = await make();
        expect(el.notFocusable).toBe(false);
    });

    it('not-focusable attribute is absent by default', async () => {
        const el = await make();
        expect(el.hasAttribute('not-focusable')).toBe(false);
    });

    it('setting not-focusable attribute reflects to notFocusable property', async () => {
        const el = await fixture<FlintVisuallyHidden>(html`
            <flint-visually-hidden not-focusable><span>SR text</span></flint-visually-hidden>
        `);
        await el.updateComplete;
        expect(el.notFocusable).toBe(true);
        expect(el.hasAttribute('not-focusable')).toBe(true);
    });

    it('setting notFocusable = true adds the attribute', async () => {
        const el = await make();
        el.notFocusable = true;
        await el.updateComplete;
        expect(el.hasAttribute('not-focusable')).toBe(true);
    });

    it('setting notFocusable = false removes the attribute', async () => {
        const el = await fixture<FlintVisuallyHidden>(html`
            <flint-visually-hidden not-focusable><span>text</span></flint-visually-hidden>
        `);
        await el.updateComplete;
        el.notFocusable = false;
        await el.updateComplete;
        expect(el.hasAttribute('not-focusable')).toBe(false);
    });

    it('notFocusable does not affect slotted content visibility in DOM', async () => {
        const el = await fixture<FlintVisuallyHidden>(html`
            <flint-visually-hidden not-focusable>
                <span id="label">Opens in new tab</span>
            </flint-visually-hidden>
        `);
        await el.updateComplete;
        // Content remains in DOM regardless of notFocusable
        expect(el.querySelector('#label')).not.toBeNull();
        expect(el.querySelector('#label')!.textContent).toBe('Opens in new tab');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Nesting & multiple instances
═══════════════════════════════════════════════════════════════════ */
describe('flint-visually-hidden — nesting & multiple instances', () => {
    it('two independent instances do not share state', async () => {
        const container = await fixture<HTMLDivElement>(html`
            <div>
                <flint-visually-hidden id="vh1"><span>Label one</span></flint-visually-hidden>
                <flint-visually-hidden id="vh2" not-focusable><span>Label two</span></flint-visually-hidden>
            </div>
        `);
        const vh1 = container.querySelector('#vh1') as FlintVisuallyHidden;
        const vh2 = container.querySelector('#vh2') as FlintVisuallyHidden;
        await vh1.updateComplete;
        await vh2.updateComplete;

        expect(vh1.notFocusable).toBe(false);
        expect(vh2.notFocusable).toBe(true);
    });

    it('multiple instances each render their own slot', async () => {
        const container = await fixture<HTMLDivElement>(html`
            <div>
                <flint-visually-hidden><span id="c1">First</span></flint-visually-hidden>
                <flint-visually-hidden><span id="c2">Second</span></flint-visually-hidden>
            </div>
        `);
        expect(container.querySelector('#c1')!.textContent).toBe('First');
        expect(container.querySelector('#c2')!.textContent).toBe('Second');
    });

    it('can be nested inside other elements', async () => {
        const label = await fixture<HTMLLabelElement>(html`
            <label>
                <flint-visually-hidden>Email address</flint-visually-hidden>
                <input type="email" placeholder="Email" />
            </label>
        `);
        const vh = label.querySelector('flint-visually-hidden')!;
        expect(vh).not.toBeNull();
        const input = label.querySelector('input');
        expect(input).not.toBeNull();
    });

    it('can be used inside a button', async () => {
        const btn = await fixture<HTMLButtonElement>(html`
            <button>
                <svg aria-hidden="true" width="16" height="16"></svg>
                <flint-visually-hidden not-focusable>Close dialog</flint-visually-hidden>
            </button>
        `);
        const vh = btn.querySelector('flint-visually-hidden')!;
        expect(vh).not.toBeNull();
        // SVG and vh are both children
        expect(btn.children.length).toBe(2);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Typical use-cases
═══════════════════════════════════════════════════════════════════ */
describe('flint-visually-hidden — use cases', () => {
    it('skip link use-case: link is in the DOM with correct href', async () => {
        const el = await fixture<FlintVisuallyHidden>(html`
            <flint-visually-hidden>
                <a href="#main-content">Skip to main content</a>
            </flint-visually-hidden>
        `);
        await el.updateComplete;
        const link = el.querySelector('a')!;
        expect(link.getAttribute('href')).toBe('#main-content');
        expect(link.textContent!.trim()).toBe('Skip to main content');
    });

    it('new-tab announcement use-case: text node is accessible', async () => {
        const el = await fixture<FlintVisuallyHidden>(html`
            <flint-visually-hidden not-focusable>opens in a new tab</flint-visually-hidden>
        `);
        await el.updateComplete;
        const text = Array.from(el.childNodes)
            .filter(n => n.nodeType === Node.TEXT_NODE)
            .map(n => n.textContent?.trim())
            .join('');
        expect(text).toBe('opens in a new tab');
    });

    it('icon-button label use-case: hidden span text matches', async () => {
        const el = await fixture<FlintVisuallyHidden>(html`
            <flint-visually-hidden not-focusable><span>Delete item</span></flint-visually-hidden>
        `);
        await el.updateComplete;
        const span = el.querySelector('span')!;
        expect(span.textContent).toBe('Delete item');
    });

    it('form label use-case: label wraps input + hidden text', async () => {
        const label = await fixture<HTMLLabelElement>(html`
            <label>
                <flint-visually-hidden>Email address</flint-visually-hidden>
                <input type="email" placeholder="Email" />
            </label>
        `);
        const vh = label.querySelector('flint-visually-hidden')!;
        const span = document.createElement('span');
        span.textContent = 'Email address';
        vh.appendChild(span);
        expect(vh.querySelector('span')!.textContent).toBe('Email address');
        expect(label.querySelector('input')).not.toBeNull();
    });

    it('breadcrumb separator use-case: hidden text replaces aria-hidden separator', async () => {
        const nav = await fixture<HTMLElement>(html`
            <nav aria-label="breadcrumb">
                <span>Home</span>
                <span aria-hidden="true">/</span>
                <span>
                    Products
                    <flint-visually-hidden not-focusable>(current page)</flint-visually-hidden>
                </span>
            </nav>
        `);
        const vh = nav.querySelector('flint-visually-hidden')!;
        const text = Array.from(vh.childNodes)
            .filter(n => n.nodeType === Node.TEXT_NODE)
            .map(n => n.textContent?.trim())
            .join('');
        expect(text).toBe('(current page)');
        expect(vh.getAttribute('not-focusable')).not.toBeNull();
    });

    it('aria-live region use-case: live div is accessible in DOM', async () => {
        const el = await fixture<FlintVisuallyHidden>(html`
            <flint-visually-hidden not-focusable>
                <div id="sr-live" aria-live="polite">Ready</div>
            </flint-visually-hidden>
        `);
        await el.updateComplete;
        const live = el.querySelector('#sr-live') as HTMLElement;
        expect(live).not.toBeNull();
        expect(live.getAttribute('aria-live')).toBe('polite');
        expect(live.textContent).toBe('Ready');
    });

    it('status indicator use-case: hidden status text is in DOM', async () => {
        const container = await fixture<HTMLElement>(html`
            <li>
                Alex Johnson
                <flint-visually-hidden not-focusable>(online)</flint-visually-hidden>
            </li>
        `);
        const vh = container.querySelector('flint-visually-hidden')!;
        const text = Array.from(vh.childNodes)
            .filter(n => n.nodeType === Node.TEXT_NODE)
            .map(n => n.textContent?.trim())
            .join('');
        expect(text).toBe('(online)');
    });

    it('data table context use-case: hidden column action label', async () => {
        const el = await fixture<FlintVisuallyHidden>(html`
            <flint-visually-hidden not-focusable>sorted ascending</flint-visually-hidden>
        `);
        await el.updateComplete;
        const text = Array.from(el.childNodes)
            .filter(n => n.nodeType === Node.TEXT_NODE)
            .map(n => n.textContent?.trim())
            .join('');
        expect(text).toBe('sorted ascending');
        expect(el.notFocusable).toBe(true);
    });
});
