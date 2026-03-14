import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-breadcrumbs.js';
import type { FlintBreadcrumbs } from './flint-breadcrumbs.js';

describe('flint-breadcrumbs', () => {
    it('is defined', async () => {
        const el = document.createElement('flint-breadcrumbs');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('renders a nav with aria-label="breadcrumb"', async () => {
        const el = await fixture<FlintBreadcrumbs>(html`
            <flint-breadcrumbs>
                <a href="#">Home</a>
            </flint-breadcrumbs>
        `);

        const nav = el.shadowRoot!.querySelector('nav');
        expect(nav).not.toBeNull();
        expect(nav!.getAttribute('aria-label')).toBe('breadcrumb');
    });

    it('renders children with separators', async () => {
        const el = await fixture<FlintBreadcrumbs>(html`
            <flint-breadcrumbs>
                <a href="#">Home</a>
                <a href="#">Catalog</a>
                <span>Accessories</span>
            </flint-breadcrumbs>
        `);

        const listItems = el.shadowRoot!.querySelectorAll('.breadcrumb-li');
        expect(listItems.length).toBe(3);

        // 2 separators — last item has none
        const separators = el.shadowRoot!.querySelectorAll('.separator');
        expect(separators.length).toBe(2);
    });

    it('separators are aria-hidden', async () => {
        const el = await fixture<FlintBreadcrumbs>(html`
            <flint-breadcrumbs>
                <a href="#">Home</a>
                <span>Current</span>
            </flint-breadcrumbs>
        `);

        const separators = el.shadowRoot!.querySelectorAll('.separator');
        separators.forEach(sep => {
            expect(sep.getAttribute('aria-hidden')).toBe('true');
        });
    });

    // Mutant 634 — default separator changed to ''
    it('has "/" as the default separator', async () => {
        const el = await fixture<FlintBreadcrumbs>(html`
            <flint-breadcrumbs>
                <a href="#">Home</a>
                <span>Current</span>
            </flint-breadcrumbs>
        `);

        expect(el.separator).toBe('/');
        const sep = el.shadowRoot!.querySelector('.separator');
        // Separator text content should contain '/' (not empty string)
        const textNodes = Array.from(sep!.childNodes).filter(n => n.nodeType === Node.TEXT_NODE);
        const text = textNodes.map(n => n.textContent).join('').trim();
        expect(text).toBe('/');
    });

    it('uses a custom separator property on all separator positions', async () => {
        const el = await fixture<FlintBreadcrumbs>(html`
            <flint-breadcrumbs separator="&gt;">
                <a href="#">Home</a>
                <a href="#">Catalog</a>
                <span>Accessories</span>
            </flint-breadcrumbs>
        `);

        const separators = el.shadowRoot!.querySelectorAll('.separator');
        expect(separators.length).toBe(2);
        separators.forEach(sep => {
            expect(sep.textContent?.trim()).toBe('>');
        });
    });

    it('renders custom separator slot content in all separator positions', async () => {
        const el = await fixture<FlintBreadcrumbs>(html`
            <flint-breadcrumbs>
                <span slot="separator">›</span>
                <a href="#">Home</a>
                <a href="#">Catalog</a>
                <span>Accessories</span>
            </flint-breadcrumbs>
        `);

        await el.updateComplete;

        const separators = el.shadowRoot!.querySelectorAll('.separator');
        expect(separators.length).toBe(2);
        separators.forEach(sep => {
            expect(sep.textContent?.trim()).toBe('›');
        });
    });

    // Mutant 656/658 — separator slot with no assigned nodes → _separatorNode is null
    it('sets separator node to null when separator slot is empty', async () => {
        const el = await fixture<FlintBreadcrumbs>(html`
            <flint-breadcrumbs separator="|">
                <a href="#">Home</a>
                <span>Current</span>
            </flint-breadcrumbs>
        `);

        await el.updateComplete;

        // No separator slot provided — should fall back to the separator property
        const sep = el.shadowRoot!.querySelector('.separator');
        const textNodes = Array.from(sep!.childNodes).filter(n => n.nodeType === Node.TEXT_NODE);
        const text = textNodes.map(n => n.textContent).join('').trim();
        expect(text).toBe('|');
    });

    // Mutant 654/655 — flatten: true for separator slot nodes
    it('uses flattened separator slot content (not raw slot element)', async () => {
        const el = await fixture<FlintBreadcrumbs>(html`
            <flint-breadcrumbs>
                <span slot="separator"><span>•</span></span>
                <a href="#">Home</a>
                <a href="#">Catalog</a>
                <span>Page</span>
            </flint-breadcrumbs>
        `);

        await el.updateComplete;

        // flatten: true should give us the inner <span> (text node descendant), not the outer <span slot="separator">
        const separators = el.shadowRoot!.querySelectorAll('.separator');
        expect(separators.length).toBe(2);
        separators.forEach(sep => {
            expect(sep.textContent?.trim()).toBe('•');
        });
    });

    // Mutants 645/646/647/648/649/650/651 — slot assignment logic
    it('assigns slot names breadcrumb-item-N to children', async () => {
        const el = await fixture<FlintBreadcrumbs>(html`
            <flint-breadcrumbs>
                <a href="#">Home</a>
                <a href="#">Catalog</a>
                <span>Accessories</span>
            </flint-breadcrumbs>
        `);

        await el.updateComplete;

        const children = Array.from(el.children).filter(c => c.slot !== 'separator') as HTMLElement[];
        expect(children[0].getAttribute('slot')).toBe('breadcrumb-item-0');
        expect(children[1].getAttribute('slot')).toBe('breadcrumb-item-1');
        expect(children[2].getAttribute('slot')).toBe('breadcrumb-item-2');
    });

    it('does not re-assign slot name if already correct', async () => {
        const el = await fixture<FlintBreadcrumbs>(html`
            <flint-breadcrumbs>
                <a href="#">Home</a>
                <span>Page</span>
            </flint-breadcrumbs>
        `);

        await el.updateComplete;

        // Manually call _handleSlotChange again (simulating second slotchange event)
        const a = el.children[0] as HTMLElement;
        const originalAttr = a.getAttribute('slot');
        // Trigger slotchange by dispatching it on the hidden slot
        const hiddenSlot = el.shadowRoot!.querySelector('div[aria-hidden] slot:not([name])') as HTMLSlotElement;
        hiddenSlot.dispatchEvent(new Event('slotchange'));
        await el.updateComplete;

        // Slot name should remain unchanged
        expect(a.getAttribute('slot')).toBe(originalAttr);
    });

    it('assigns the correct slot name format (breadcrumb-item-N, not empty string)', async () => {
        const el = await fixture<FlintBreadcrumbs>(html`
            <flint-breadcrumbs>
                <a href="#">A</a>
                <a href="#">B</a>
            </flint-breadcrumbs>
        `);

        await el.updateComplete;

        const items = Array.from(el.children) as HTMLElement[];
        items.forEach((item, idx) => {
            expect(item.getAttribute('slot')).toBe(`breadcrumb-item-${idx}`);
            expect(item.getAttribute('slot')).not.toBe('');
        });
    });

    it('collapses when items count exceeds max-items', async () => {
        const el = await fixture<FlintBreadcrumbs>(html`
            <flint-breadcrumbs max-items="2">
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">4</a>
            </flint-breadcrumbs>
        `);

        const buttons = el.shadowRoot!.querySelectorAll('.collapsed-button');
        expect(buttons.length).toBe(1);

        // 3 list items: item-0 (with sep), button (with sep), item-3
        const listItems = el.shadowRoot!.querySelectorAll('.breadcrumb-li');
        expect(listItems.length).toBe(3);
    });

    // Mutant 676 — condition `total <= maxItems || _expanded` changed to `false`
    it('does NOT collapse when items count equals max-items exactly', async () => {
        const el = await fixture<FlintBreadcrumbs>(html`
            <flint-breadcrumbs max-items="3">
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
            </flint-breadcrumbs>
        `);

        // total(3) <= maxItems(3) → show all, no collapse
        expect(el.shadowRoot!.querySelector('.collapsed-button')).toBeNull();
        const listItems = el.shadowRoot!.querySelectorAll('.breadcrumb-li');
        expect(listItems.length).toBe(3);
    });

    it('does NOT collapse when items count is less than max-items', async () => {
        const el = await fixture<FlintBreadcrumbs>(html`
            <flint-breadcrumbs max-items="5">
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
            </flint-breadcrumbs>
        `);

        expect(el.shadowRoot!.querySelector('.collapsed-button')).toBeNull();
    });

    it('expands when ellipsis button is clicked', async () => {
        const el = await fixture<FlintBreadcrumbs>(html`
            <flint-breadcrumbs max-items="2">
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
            </flint-breadcrumbs>
        `);

        const button = el.shadowRoot!.querySelector('.collapsed-button') as HTMLButtonElement;
        button.click();

        await el.updateComplete;

        const listItems = el.shadowRoot!.querySelectorAll('.breadcrumb-li');
        expect(listItems.length).toBe(3);
        expect(el.shadowRoot!.querySelector('.collapsed-button')).toBeNull();
    });

    // Mutant 676 — _expanded = true branch also kills this
    it('shows all items after expand, with no collapse button', async () => {
        const el = await fixture<FlintBreadcrumbs>(html`
            <flint-breadcrumbs max-items="1">
                <a href="#">A</a>
                <a href="#">B</a>
                <a href="#">C</a>
                <a href="#">D</a>
            </flint-breadcrumbs>
        `);

        const button = el.shadowRoot!.querySelector('.collapsed-button') as HTMLButtonElement;
        expect(button).not.toBeNull();
        button.click();
        await el.updateComplete;

        expect(el.shadowRoot!.querySelector('.collapsed-button')).toBeNull();
        expect(el.shadowRoot!.querySelectorAll('.breadcrumb-li').length).toBe(4);
    });

    it('honors items-before and items-after when collapsed', async () => {
        const el = await fixture<FlintBreadcrumbs>(html`
            <flint-breadcrumbs max-items="2" items-before="2" items-after="1">
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">4</a>
                <a href="#">5</a>
            </flint-breadcrumbs>
        `);

        // [1] [2] [...] [5] → 4 list items
        const listItems = el.shadowRoot!.querySelectorAll('.breadcrumb-li');
        expect(listItems.length).toBe(4);
    });

    it('skips ellipsis when items-before + items-after covers all items', async () => {
        const el = await fixture<FlintBreadcrumbs>(html`
            <flint-breadcrumbs max-items="2" items-before="2" items-after="2">
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
            </flint-breadcrumbs>
        `);

        // before(2) + after(min(2, 3-2)=1) = 3 >= total(3) → show all, no ellipsis
        expect(el.shadowRoot!.querySelector('.collapsed-button')).toBeNull();
        const listItems = el.shadowRoot!.querySelectorAll('.breadcrumb-li');
        expect(listItems.length).toBe(3);
    });

    // Mutant 670 — early return for total === 0 changed to `if (false)`
    it('renders empty OL when no items are provided', async () => {
        const el = await fixture<FlintBreadcrumbs>(html`
            <flint-breadcrumbs></flint-breadcrumbs>
        `);

        await el.updateComplete;

        const ol = el.shadowRoot!.querySelector('.breadcrumbs-ol');
        expect(ol).not.toBeNull();
        expect(ol!.children.length).toBe(0);
        expect(el.shadowRoot!.querySelectorAll('.breadcrumb-li').length).toBe(0);
    });

    // Mutant 672 — empty html`` returns "Stryker was here!"
    it('renders truly empty OL (no text content) when zero items', async () => {
        const el = await fixture<FlintBreadcrumbs>(html`
            <flint-breadcrumbs></flint-breadcrumbs>
        `);

        await el.updateComplete;

        const ol = el.shadowRoot!.querySelector('.breadcrumbs-ol');
        const text = Array.from(ol!.childNodes)
            .filter(n => n.nodeType === Node.TEXT_NODE)
            .map(n => n.textContent)
            .join('')
            .trim();
        expect(text).toBe('');
    });

    // Mutant 667 — last item's isLast=true renders separator instead of ''
    it('last item has no separator', async () => {
        const el = await fixture<FlintBreadcrumbs>(html`
            <flint-breadcrumbs>
                <a href="#">Home</a>
                <a href="#">Catalog</a>
                <span>Last</span>
            </flint-breadcrumbs>
        `);

        const listItems = el.shadowRoot!.querySelectorAll('.breadcrumb-li');
        const lastItem = listItems[listItems.length - 1];
        expect(lastItem.querySelector('.separator')).toBeNull();
    });

    it('only middle items have separators (not first, not last)', async () => {
        const el = await fixture<FlintBreadcrumbs>(html`
            <flint-breadcrumbs>
                <a href="#">A</a>
                <a href="#">B</a>
                <a href="#">C</a>
                <span>D</span>
            </flint-breadcrumbs>
        `);

        const listItems = el.shadowRoot!.querySelectorAll('.breadcrumb-li');
        expect(listItems.length).toBe(4);

        // Items 0, 1, 2 have separator; item 3 (last) does not
        expect(listItems[0].querySelector('.separator')).not.toBeNull();
        expect(listItems[1].querySelector('.separator')).not.toBeNull();
        expect(listItems[2].querySelector('.separator')).not.toBeNull();
        expect(listItems[3].querySelector('.separator')).toBeNull();
    });

    it('collapsed button has aria-label "Show all breadcrumbs"', async () => {
        const el = await fixture<FlintBreadcrumbs>(html`
            <flint-breadcrumbs max-items="1">
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
            </flint-breadcrumbs>
        `);

        const button = el.shadowRoot!.querySelector('.collapsed-button') as HTMLButtonElement;
        expect(button.getAttribute('aria-label')).toBe('Show all breadcrumbs');
    });

    it('single item renders no separator', async () => {
        const el = await fixture<FlintBreadcrumbs>(html`
            <flint-breadcrumbs>
                <span>Only Page</span>
            </flint-breadcrumbs>
        `);

        expect(el.shadowRoot!.querySelectorAll('.separator').length).toBe(0);
        expect(el.shadowRoot!.querySelectorAll('.breadcrumb-li').length).toBe(1);
    });

    it('two items render exactly one separator', async () => {
        const el = await fixture<FlintBreadcrumbs>(html`
            <flint-breadcrumbs>
                <a href="#">Home</a>
                <span>Page</span>
            </flint-breadcrumbs>
        `);

        expect(el.shadowRoot!.querySelectorAll('.separator').length).toBe(1);
        expect(el.shadowRoot!.querySelectorAll('.breadcrumb-li').length).toBe(2);
    });

    it('collapsed view has separator after the ellipsis button', async () => {
        const el = await fixture<FlintBreadcrumbs>(html`
            <flint-breadcrumbs max-items="2" items-before="1" items-after="1">
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">4</a>
            </flint-breadcrumbs>
        `);

        // Collapsed: [1] [...sep] [4]
        // The li containing the button should also have a separator
        const buttonLi = el.shadowRoot!.querySelector('li:has(.collapsed-button)');
        expect(buttonLi).not.toBeNull();
        expect(buttonLi!.querySelector('.separator')).not.toBeNull();
    });
});
