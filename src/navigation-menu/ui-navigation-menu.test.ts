import { html } from 'lit';
import { expect, describe, it, vi } from 'vitest';
import { fixture } from '@open-wc/testing';
import './ui-navigation-menu.js';
import './ui-navigation-menu-list.js';
import './ui-navigation-menu-item.js';
import './ui-navigation-menu-trigger.js';
import './ui-navigation-menu-content.js';
import './ui-navigation-menu-link.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function makeMenu() {
    const el = await fixture(html`
        <ui-navigation-menu>
            <ui-navigation-menu-list>
                <ui-navigation-menu-item>
                    <ui-navigation-menu-trigger content-id="c1">Menu 1</ui-navigation-menu-trigger>
                    <ui-navigation-menu-content id="c1">
                        <ui-navigation-menu-link href="#">Item 1</ui-navigation-menu-link>
                        <ui-navigation-menu-link href="#">Item 2</ui-navigation-menu-link>
                    </ui-navigation-menu-content>
                </ui-navigation-menu-item>
                <ui-navigation-menu-item>
                    <ui-navigation-menu-trigger content-id="c2">Menu 2</ui-navigation-menu-trigger>
                    <ui-navigation-menu-content id="c2">
                        <ui-navigation-menu-link href="#">Item A</ui-navigation-menu-link>
                    </ui-navigation-menu-content>
                </ui-navigation-menu-item>
            </ui-navigation-menu-list>
        </ui-navigation-menu>
    `);
    const menu = el as any;
    const [trigger1, trigger2] = Array.from(el.querySelectorAll('ui-navigation-menu-trigger')) as any[];
    const [content1, content2] = Array.from(el.querySelectorAll('ui-navigation-menu-content')) as any[];
    return { menu, trigger1, trigger2, content1, content2 };
}

// ---------------------------------------------------------------------------
// ui-navigation-menu
// ---------------------------------------------------------------------------

describe('ui-navigation-menu', () => {
    it('renders correctly', async () => {
        const { menu } = await makeMenu();
        expect(menu).toBeTruthy();
        expect(menu.querySelector('ui-navigation-menu-list')).toBeTruthy();
    });

    it('openContent() opens the panel and updates openContentId', async () => {
        const { menu, content1 } = await makeMenu();
        expect(menu.openContentId).toBeNull();
        menu.openContent('c1');
        await content1.updateComplete;
        expect(menu.openContentId).toBe('c1');
        expect(content1.open).toBe(true);
    });

    it('only one content open at a time — opening second closes first', async () => {
        const { menu, content1, content2 } = await makeMenu();
        menu.openContent('c1');
        await content1.updateComplete;
        expect(content1.open).toBe(true);

        menu.openContent('c2');
        await content1.updateComplete;
        await content2.updateComplete;
        expect(content1.open).toBe(false);
        expect(content2.open).toBe(true);
        expect(menu.openContentId).toBe('c2');
    });

    it('closeAll() closes all open panels and clears openContentId', async () => {
        const { menu, content1 } = await makeMenu();
        menu.openContent('c1');
        await content1.updateComplete;
        expect(content1.open).toBe(true);

        menu.closeAll();
        await content1.updateComplete;
        expect(content1.open).toBe(false);
        expect(menu.openContentId).toBeNull();
    });

    it('closes content when clicking outside', async () => {
        const { menu, content1 } = await makeMenu();
        menu.openContent('c1');
        await content1.updateComplete;
        expect(menu.openContentId).toBe('c1');

        document.body.click();
        await content1.updateComplete;
        expect(menu.openContentId).toBeNull();
        expect(content1.open).toBe(false);
    });

    it('supports rtl direction', async () => {
        const el = await fixture(html`<ui-navigation-menu dir="rtl"></ui-navigation-menu>`);
        expect(el.getAttribute('dir')).toBe('rtl');
    });

    it('removes document click listener on disconnectedCallback', async () => {
        const el = await fixture(html`<ui-navigation-menu></ui-navigation-menu>`);
        const spy = vi.spyOn(document, 'removeEventListener');
        el.remove();
        expect(spy).toHaveBeenCalledWith('click', expect.any(Function));
        spy.mockRestore();
    });
});

// ---------------------------------------------------------------------------
// ui-navigation-menu-list
// ---------------------------------------------------------------------------

describe('ui-navigation-menu-list', () => {
    it('renders with correct gap', async () => {
        const el = await fixture(html`<ui-navigation-menu-list gap="16"></ui-navigation-menu-list>`);
        expect(el.getAttribute('gap')).toBe('16');
    });

    it('renders with correct direction', async () => {
        const el = await fixture(html`<ui-navigation-menu-list direction="column"></ui-navigation-menu-list>`);
        expect(el.getAttribute('direction')).toBe('column');
    });

    it('nav element has role="menubar"', async () => {
        const el = await fixture(html`<ui-navigation-menu-list></ui-navigation-menu-list>`);
        const nav = el.shadowRoot!.querySelector('nav');
        expect(nav?.getAttribute('role')).toBe('menubar');
    });

    it('nav element has aria-label', async () => {
        const el = await fixture(html`<ui-navigation-menu-list aria-label="Site navigation"></ui-navigation-menu-list>`);
        const nav = el.shadowRoot!.querySelector('nav');
        expect(nav?.getAttribute('aria-label')).toBe('Site navigation');
    });

    it('nav element has default aria-label', async () => {
        const el = await fixture(html`<ui-navigation-menu-list></ui-navigation-menu-list>`);
        const nav = el.shadowRoot!.querySelector('nav');
        expect(nav?.getAttribute('aria-label')).toBe('Main navigation');
    });
});

// ---------------------------------------------------------------------------
// ui-navigation-menu-item
// ---------------------------------------------------------------------------

describe('ui-navigation-menu-item', () => {
    it('renders with item id', async () => {
        const el = await fixture(html`<ui-navigation-menu-item item-id="test-item">Item</ui-navigation-menu-item>`);
        expect(el.getAttribute('item-id')).toBe('test-item');
    });

    it('container div has role="none"', async () => {
        const el = await fixture(html`<ui-navigation-menu-item>Item</ui-navigation-menu-item>`);
        const div = el.shadowRoot!.querySelector('div');
        expect(div?.getAttribute('role')).toBe('none');
    });

    it('supports disabled state', async () => {
        const el = await fixture(html`<ui-navigation-menu-item disabled>Item</ui-navigation-menu-item>`);
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('disabled propagates to child trigger', async () => {
        const el = await fixture(html`
            <ui-navigation-menu-item>
                <ui-navigation-menu-trigger content-id="x">T</ui-navigation-menu-trigger>
                <ui-navigation-menu-content id="x">C</ui-navigation-menu-content>
            </ui-navigation-menu-item>
        `);
        const item = el as any;
        const trigger = el.querySelector('ui-navigation-menu-trigger') as any;
        expect(trigger.disabled).toBe(false);

        item.disabled = true;
        await item.updateComplete;
        expect(trigger.disabled).toBe(true);
    });

    it('disabled propagates to child link', async () => {
        const el = await fixture(html`
            <ui-navigation-menu-item>
                <ui-navigation-menu-link href="#">Link</ui-navigation-menu-link>
            </ui-navigation-menu-item>
        `);
        const item = el as any;
        const link = el.querySelector('ui-navigation-menu-link') as any;
        expect(link.disabled).toBe(false);

        item.disabled = true;
        await item.updateComplete;
        expect(link.disabled).toBe(true);
    });
});

// ---------------------------------------------------------------------------
// ui-navigation-menu-trigger
// ---------------------------------------------------------------------------

describe('ui-navigation-menu-trigger', () => {
    it('opens content on click', async () => {
        const el = await fixture(html`
            <div>
                <ui-navigation-menu-trigger content-id="oc1">Trigger</ui-navigation-menu-trigger>
                <ui-navigation-menu-content id="oc1">Content</ui-navigation-menu-content>
            </div>
        `);
        const trigger = el.querySelector('ui-navigation-menu-trigger') as any;
        const content = el.querySelector('ui-navigation-menu-content') as any;

        expect(content.open).toBe(false);
        trigger.click();
        await trigger.updateComplete;
        expect(content.open).toBe(true);
    });

    it('toggles on multiple clicks', async () => {
        const el = await fixture(html`
            <div>
                <ui-navigation-menu-trigger content-id="oc2">Trigger</ui-navigation-menu-trigger>
                <ui-navigation-menu-content id="oc2">Content</ui-navigation-menu-content>
            </div>
        `);
        const trigger = el.querySelector('ui-navigation-menu-trigger') as any;
        const content = el.querySelector('ui-navigation-menu-content') as any;

        trigger.click();
        await trigger.updateComplete;
        expect(content.open).toBe(true);

        trigger.click();
        await trigger.updateComplete;
        expect(content.open).toBe(false);
    });

    it('supports keyboard navigation with Enter', async () => {
        const el = await fixture(html`
            <div>
                <ui-navigation-menu-trigger content-id="oc3">Trigger</ui-navigation-menu-trigger>
                <ui-navigation-menu-content id="oc3">Content</ui-navigation-menu-content>
            </div>
        `);
        const trigger = el.querySelector('ui-navigation-menu-trigger') as any;
        const content = el.querySelector('ui-navigation-menu-content') as any;

        trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        await trigger.updateComplete;
        expect(content.open).toBe(true);
    });

    it('supports keyboard navigation with Space', async () => {
        const el = await fixture(html`
            <div>
                <ui-navigation-menu-trigger content-id="oc4">Trigger</ui-navigation-menu-trigger>
                <ui-navigation-menu-content id="oc4">Content</ui-navigation-menu-content>
            </div>
        `);
        const trigger = el.querySelector('ui-navigation-menu-trigger') as any;
        const content = el.querySelector('ui-navigation-menu-content') as any;

        trigger.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
        await trigger.updateComplete;
        expect(content.open).toBe(true);
    });

    it('disables when disabled prop is true', async () => {
        const el = await fixture(html`<ui-navigation-menu-trigger disabled>Trigger</ui-navigation-menu-trigger>`);
        const button = el.shadowRoot?.querySelector('button') as HTMLButtonElement;
        expect(button.disabled).toBe(true);
    });

    it('has proper aria attributes', async () => {
        const el = await fixture(html`<ui-navigation-menu-trigger content-id="test">Trigger</ui-navigation-menu-trigger>`);
        const button = el.shadowRoot?.querySelector('button') as HTMLButtonElement;
        expect(button.hasAttribute('aria-expanded')).toBe(true);
        expect(button.hasAttribute('aria-haspopup')).toBe(true);
        expect(button.hasAttribute('aria-controls')).toBe(true);
    });

    it('reflects content-id attribute', async () => {
        const el = await fixture(html`<ui-navigation-menu-trigger content-id="my-content">T</ui-navigation-menu-trigger>`);
        expect(el.getAttribute('content-id')).toBe('my-content');
    });

    it('fires ui-navigation-menu-trigger-click with correct detail', async () => {
        const el = await fixture(html`
            <div>
                <ui-navigation-menu-trigger content-id="tc">Trigger</ui-navigation-menu-trigger>
                <ui-navigation-menu-content id="tc">Content</ui-navigation-menu-content>
            </div>
        `);
        const trigger = el.querySelector('ui-navigation-menu-trigger') as any;
        const spy = vi.fn();
        el.addEventListener('ui-navigation-menu-trigger-click', spy);

        trigger.click();
        await trigger.updateComplete;

        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail).toEqual({ contentId: 'tc', open: true });
    });

    it('aria-expanded resets to false after menu.closeAll()', async () => {
        const el = await fixture(html`
            <ui-navigation-menu>
                <ui-navigation-menu-list>
                    <ui-navigation-menu-item>
                        <ui-navigation-menu-trigger content-id="ca">Trigger</ui-navigation-menu-trigger>
                        <ui-navigation-menu-content id="ca">Content</ui-navigation-menu-content>
                    </ui-navigation-menu-item>
                </ui-navigation-menu-list>
            </ui-navigation-menu>
        `);
        const menu = el as any;
        const trigger = el.querySelector('ui-navigation-menu-trigger') as any;

        trigger.click();
        await trigger.updateComplete;
        const button = trigger.shadowRoot!.querySelector('button') as HTMLButtonElement;
        expect(button.getAttribute('aria-expanded')).toBe('true');

        menu.closeAll();
        // Wait for MutationObserver to fire and trigger to re-render
        await new Promise((r) => setTimeout(r, 0));
        await trigger.updateComplete;
        expect(button.getAttribute('aria-expanded')).toBe('false');
    });
});

// ---------------------------------------------------------------------------
// ui-navigation-menu-content
// ---------------------------------------------------------------------------

describe('ui-navigation-menu-content', () => {
    it('renders hidden by default', async () => {
        const el = await fixture(html`<ui-navigation-menu-content id="test">Content</ui-navigation-menu-content>`);
        expect(el.hasAttribute('open')).toBe(false);
    });

    it('shows when open prop is true', async () => {
        const el = await fixture(html`<ui-navigation-menu-content open>Content</ui-navigation-menu-content>`);
        expect(el.hasAttribute('open')).toBe(true);
    });

    it('supports keyboard navigation with Escape', async () => {
        const el = await fixture(html`<ui-navigation-menu-content id="test" open>Content</ui-navigation-menu-content>`);
        const content = el as any;
        content.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        await content.updateComplete;
        expect(content.open).toBe(false);
    });

    it('fires ui-navigation-menu-content-toggle on Escape', async () => {
        const el = await fixture(html`
            <div>
                <ui-navigation-menu-content id="test" open>Content</ui-navigation-menu-content>
            </div>
        `);
        const content = el.querySelector('ui-navigation-menu-content') as any;
        const spy = vi.fn();
        el.addEventListener('ui-navigation-menu-content-toggle', spy);

        content.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        await content.updateComplete;

        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail).toEqual({ contentId: 'test', open: false });
    });

    it('Tab key closes the menu', async () => {
        const el = await fixture(html`<ui-navigation-menu-content id="test" open>Content</ui-navigation-menu-content>`);
        const content = el as any;
        content.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
        await content.updateComplete;
        expect(content.open).toBe(false);
    });

    it('Arrow keys wrap around (Down at last → first)', async () => {
        const el = await fixture(html`
            <ui-navigation-menu-content id="test" open>
                <ui-navigation-menu-link href="#">A</ui-navigation-menu-link>
                <ui-navigation-menu-link href="#">B</ui-navigation-menu-link>
                <ui-navigation-menu-link href="#">C</ui-navigation-menu-link>
            </ui-navigation-menu-content>
        `);
        const content = el as any;
        const links = Array.from(el.querySelectorAll('ui-navigation-menu-link')) as HTMLElement[];
        // Focus last link host (arrow key nav operates on host elements)
        links[2].focus();

        content.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await content.updateComplete;

        expect(el.ownerDocument.activeElement).toBe(links[0]);
    });

    it('Arrow keys wrap around (Up at first → last)', async () => {
        const el = await fixture(html`
            <ui-navigation-menu-content id="test" open>
                <ui-navigation-menu-link href="#">A</ui-navigation-menu-link>
                <ui-navigation-menu-link href="#">B</ui-navigation-menu-link>
                <ui-navigation-menu-link href="#">C</ui-navigation-menu-link>
            </ui-navigation-menu-content>
        `);
        const content = el as any;
        const links = Array.from(el.querySelectorAll('ui-navigation-menu-link')) as HTMLElement[];
        // Focus first link host (arrow key nav operates on host elements)
        links[0].focus();

        content.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        await content.updateComplete;

        expect(el.ownerDocument.activeElement).toBe(links[2]);
    });

    it('supports custom direction', async () => {
        const el = await fixture(html`<ui-navigation-menu-content dir="rtl">Content</ui-navigation-menu-content>`);
        expect(el.getAttribute('dir')).toBe('rtl');
    });
});

// ---------------------------------------------------------------------------
// ui-navigation-menu-link
// ---------------------------------------------------------------------------

describe('ui-navigation-menu-link', () => {
    it('renders with href', async () => {
        const el = await fixture(html`<ui-navigation-menu-link href="/test">Link</ui-navigation-menu-link>`);
        const link = el.shadowRoot?.querySelector('a') as HTMLAnchorElement;
        expect(link.href).toContain('/test');
    });

    it('supports disabled state', async () => {
        const el = await fixture(html`<ui-navigation-menu-link href="/test" disabled>Link</ui-navigation-menu-link>`);
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('has proper aria attributes', async () => {
        const el = await fixture(html`<ui-navigation-menu-link href="/test">Link</ui-navigation-menu-link>`);
        const link = el.shadowRoot?.querySelector('a') as HTMLAnchorElement;
        expect(link.getAttribute('role')).toBe('menuitem');
    });

    it('supports target attribute', async () => {
        const el = await fixture(html`<ui-navigation-menu-link href="/test" target="_blank">Link</ui-navigation-menu-link>`);
        const link = el.shadowRoot?.querySelector('a') as HTMLAnchorElement;
        expect(link.target).toBe('_blank');
    });

    it('supports title attribute', async () => {
        const el = await fixture(html`<ui-navigation-menu-link href="/test" title="Test Link">Link</ui-navigation-menu-link>`);
        const link = el.shadowRoot?.querySelector('a') as HTMLAnchorElement;
        expect(link.title).toBe('Test Link');
    });

    it('active prop sets aria-current="page"', async () => {
        const el = await fixture(html`<ui-navigation-menu-link href="/test" active>Link</ui-navigation-menu-link>`);
        const link = el.shadowRoot?.querySelector('a') as HTMLAnchorElement;
        expect(link.getAttribute('aria-current')).toBe('page');
    });

    it('active prop adds active class', async () => {
        const el = await fixture(html`<ui-navigation-menu-link href="/test" active>Link</ui-navigation-menu-link>`);
        const link = el.shadowRoot?.querySelector('a') as HTMLAnchorElement;
        expect(link.classList.contains('link--active')).toBe(true);
    });

    it('reflects active attribute', async () => {
        const el = await fixture(html`<ui-navigation-menu-link active>Link</ui-navigation-menu-link>`);
        expect(el.hasAttribute('active')).toBe(true);
    });

    it('inactive link does not have aria-current', async () => {
        const el = await fixture(html`<ui-navigation-menu-link href="/test">Link</ui-navigation-menu-link>`);
        const link = el.shadowRoot?.querySelector('a') as HTMLAnchorElement;
        // aria-current="" (empty) is falsy but exists; spec says absent or "false" means not current
        const val = link.getAttribute('aria-current');
        expect(val === null || val === '' || val === 'false').toBe(true);
    });
});

// ---------------------------------------------------------------------------
// Accessibility
// ---------------------------------------------------------------------------

describe('Accessibility', () => {
    it('trigger has proper aria-expanded', async () => {
        const el = await fixture(html`
            <div>
                <ui-navigation-menu-trigger content-id="test">Trigger</ui-navigation-menu-trigger>
                <ui-navigation-menu-content id="test">Content</ui-navigation-menu-content>
            </div>
        `);
        const trigger = el.querySelector('ui-navigation-menu-trigger') as any;
        const button = trigger.shadowRoot?.querySelector('button') as HTMLButtonElement;

        expect(button.getAttribute('aria-expanded')).toBe('false');
        trigger.click();
        await trigger.updateComplete;
        expect(button.getAttribute('aria-expanded')).toBe('true');
    });

    it('content has proper role', async () => {
        const el = await fixture(html`<ui-navigation-menu-content open>Content</ui-navigation-menu-content>`);
        const panel = el.shadowRoot?.querySelector('[role="menu"]');
        expect(panel).toBeTruthy();
    });
});
