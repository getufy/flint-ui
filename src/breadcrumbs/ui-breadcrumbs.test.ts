import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-breadcrumbs.js';
import type { UiBreadcrumbs } from './ui-breadcrumbs.js';

describe('ui-breadcrumbs', () => {
    it('is defined', async () => {
        const el = document.createElement('ui-breadcrumbs');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('renders a nav with aria-label="breadcrumb"', async () => {
        const el = await fixture<UiBreadcrumbs>(html`
            <ui-breadcrumbs>
                <a href="#">Home</a>
            </ui-breadcrumbs>
        `);

        const nav = el.shadowRoot!.querySelector('nav');
        expect(nav).not.toBeNull();
        expect(nav!.getAttribute('aria-label')).toBe('breadcrumb');
    });

    it('renders children with separators', async () => {
        const el = await fixture<UiBreadcrumbs>(html`
            <ui-breadcrumbs>
                <a href="#">Home</a>
                <a href="#">Catalog</a>
                <span>Accessories</span>
            </ui-breadcrumbs>
        `);

        const listItems = el.shadowRoot!.querySelectorAll('.breadcrumb-li');
        expect(listItems.length).toBe(3);

        // 2 separators — last item has none
        const separators = el.shadowRoot!.querySelectorAll('.separator');
        expect(separators.length).toBe(2);
    });

    it('separators are aria-hidden', async () => {
        const el = await fixture<UiBreadcrumbs>(html`
            <ui-breadcrumbs>
                <a href="#">Home</a>
                <span>Current</span>
            </ui-breadcrumbs>
        `);

        const separators = el.shadowRoot!.querySelectorAll('.separator');
        separators.forEach(sep => {
            expect(sep.getAttribute('aria-hidden')).toBe('true');
        });
    });

    it('uses a custom separator property on all separator positions', async () => {
        const el = await fixture<UiBreadcrumbs>(html`
            <ui-breadcrumbs separator="&gt;">
                <a href="#">Home</a>
                <a href="#">Catalog</a>
                <span>Accessories</span>
            </ui-breadcrumbs>
        `);

        const separators = el.shadowRoot!.querySelectorAll('.separator');
        expect(separators.length).toBe(2);
        separators.forEach(sep => {
            expect(sep.textContent?.trim()).toBe('>');
        });
    });

    it('renders custom separator slot content in all separator positions', async () => {
        const el = await fixture<UiBreadcrumbs>(html`
            <ui-breadcrumbs>
                <span slot="separator">›</span>
                <a href="#">Home</a>
                <a href="#">Catalog</a>
                <span>Accessories</span>
            </ui-breadcrumbs>
        `);

        await el.updateComplete;

        const separators = el.shadowRoot!.querySelectorAll('.separator');
        expect(separators.length).toBe(2);
        separators.forEach(sep => {
            expect(sep.textContent?.trim()).toBe('›');
        });
    });

    it('collapses when items count exceeds max-items', async () => {
        const el = await fixture<UiBreadcrumbs>(html`
            <ui-breadcrumbs max-items="2">
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">4</a>
            </ui-breadcrumbs>
        `);

        const buttons = el.shadowRoot!.querySelectorAll('.collapsed-button');
        expect(buttons.length).toBe(1);

        // 3 list items: item-0 (with sep), button (with sep), item-3
        const listItems = el.shadowRoot!.querySelectorAll('.breadcrumb-li');
        expect(listItems.length).toBe(3);
    });

    it('expands when ellipsis button is clicked', async () => {
        const el = await fixture<UiBreadcrumbs>(html`
            <ui-breadcrumbs max-items="2">
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
            </ui-breadcrumbs>
        `);

        const button = el.shadowRoot!.querySelector('.collapsed-button') as HTMLButtonElement;
        button.click();

        await el.updateComplete;

        const listItems = el.shadowRoot!.querySelectorAll('.breadcrumb-li');
        expect(listItems.length).toBe(3);
        expect(el.shadowRoot!.querySelector('.collapsed-button')).toBeNull();
    });

    it('honors items-before and items-after when collapsed', async () => {
        const el = await fixture<UiBreadcrumbs>(html`
            <ui-breadcrumbs max-items="2" items-before="2" items-after="1">
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">4</a>
                <a href="#">5</a>
            </ui-breadcrumbs>
        `);

        // [1] [2] [...] [5] → 4 list items
        const listItems = el.shadowRoot!.querySelectorAll('.breadcrumb-li');
        expect(listItems.length).toBe(4);
    });

    it('skips ellipsis when items-before + items-after covers all items', async () => {
        const el = await fixture<UiBreadcrumbs>(html`
            <ui-breadcrumbs max-items="2" items-before="2" items-after="2">
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
            </ui-breadcrumbs>
        `);

        // before(2) + after(min(2, 3-2)=1) = 3 >= total(3) → show all, no ellipsis
        expect(el.shadowRoot!.querySelector('.collapsed-button')).toBeNull();
        const listItems = el.shadowRoot!.querySelectorAll('.breadcrumb-li');
        expect(listItems.length).toBe(3);
    });
});
