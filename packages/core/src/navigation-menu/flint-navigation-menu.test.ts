import { html } from 'lit';
import { expect, describe, it, vi } from 'vitest';
import { fixture } from '@open-wc/testing';
import { expectAccessible } from '../test-utils/axe';
import './flint-navigation-menu.js';
import './flint-navigation-menu-list.js';
import './flint-navigation-menu-item.js';
import './flint-navigation-menu-trigger.js';
import './flint-navigation-menu-content.js';
import './flint-navigation-menu-link.js';
import type { FlintNavigationMenu } from './flint-navigation-menu.js';
import type { FlintNavigationMenuList } from './flint-navigation-menu-list.js';
import type { FlintNavigationMenuItem } from './flint-navigation-menu-item.js';
import type { FlintNavigationMenuTrigger } from './flint-navigation-menu-trigger.js';
import type { FlintNavigationMenuContent } from './flint-navigation-menu-content.js';
import type { FlintNavigationMenuLink } from './flint-navigation-menu-link.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function makeMenu() {
    const el = await fixture(html`
        <flint-navigation-menu>
            <flint-navigation-menu-list>
                <flint-navigation-menu-item>
                    <flint-navigation-menu-trigger content-id="c1">Menu 1</flint-navigation-menu-trigger>
                    <flint-navigation-menu-content id="c1">
                        <flint-navigation-menu-link href="#">Item 1</flint-navigation-menu-link>
                        <flint-navigation-menu-link href="#">Item 2</flint-navigation-menu-link>
                    </flint-navigation-menu-content>
                </flint-navigation-menu-item>
                <flint-navigation-menu-item>
                    <flint-navigation-menu-trigger content-id="c2">Menu 2</flint-navigation-menu-trigger>
                    <flint-navigation-menu-content id="c2">
                        <flint-navigation-menu-link href="#">Item A</flint-navigation-menu-link>
                    </flint-navigation-menu-content>
                </flint-navigation-menu-item>
            </flint-navigation-menu-list>
        </flint-navigation-menu>
    `);
    const menu = el as FlintNavigationMenu;
    const [trigger1, trigger2] = Array.from(el.querySelectorAll('flint-navigation-menu-trigger')) as FlintNavigationMenuTrigger[];
    const [content1, content2] = Array.from(el.querySelectorAll('flint-navigation-menu-content')) as FlintNavigationMenuContent[];
    return { menu, trigger1, trigger2, content1, content2 };
}

// ---------------------------------------------------------------------------
// flint-navigation-menu
// ---------------------------------------------------------------------------

describe('flint-navigation-menu', () => {
    it('renders correctly', async () => {
        const { menu } = await makeMenu();
        expect(menu).toBeTruthy();
        expect(menu.querySelector('flint-navigation-menu-list')).toBeTruthy();
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

    it('closes content when pointerdown fires outside', async () => {
        const { menu, content1 } = await makeMenu();
        menu.openContent('c1');
        await content1.updateComplete;
        expect(menu.openContentId).toBe('c1');

        document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
        await content1.updateComplete;
        expect(menu.openContentId).toBeNull();
        expect(content1.open).toBe(false);
    });

    it('supports rtl direction', async () => {
        const el = await fixture(html`<flint-navigation-menu dir="rtl"></flint-navigation-menu>`);
        expect(el.getAttribute('dir')).toBe('rtl');
    });

    it('removes document pointerdown listener on disconnectedCallback', async () => {
        const el = await fixture(html`<flint-navigation-menu></flint-navigation-menu>`);
        const spy = vi.spyOn(document, 'removeEventListener');
        el.remove();
        expect(spy).toHaveBeenCalledWith('pointerdown', expect.any(Function));
        spy.mockRestore();
    });
});

// ---------------------------------------------------------------------------
// flint-navigation-menu-list
// ---------------------------------------------------------------------------

describe('flint-navigation-menu-list', () => {
    it('renders with correct gap', async () => {
        const el = await fixture(html`<flint-navigation-menu-list gap="16"></flint-navigation-menu-list>`);
        expect(el.getAttribute('gap')).toBe('16');
    });

    it('renders with correct direction', async () => {
        const el = await fixture(html`<flint-navigation-menu-list direction="column"></flint-navigation-menu-list>`);
        expect(el.getAttribute('direction')).toBe('column');
    });

    it('nav element has role="menubar"', async () => {
        const el = await fixture(html`<flint-navigation-menu-list></flint-navigation-menu-list>`);
        const nav = el.shadowRoot!.querySelector('nav');
        expect(nav?.getAttribute('role')).toBe('menubar');
    });

    it('nav element has aria-label', async () => {
        const el = await fixture(html`<flint-navigation-menu-list aria-label="Site navigation"></flint-navigation-menu-list>`);
        const nav = el.shadowRoot!.querySelector('nav');
        expect(nav?.getAttribute('aria-label')).toBe('Site navigation');
    });

    it('nav element has default aria-label', async () => {
        const el = await fixture(html`<flint-navigation-menu-list></flint-navigation-menu-list>`);
        const nav = el.shadowRoot!.querySelector('nav');
        expect(nav?.getAttribute('aria-label')).toBe('Main navigation');
    });
});

// ---------------------------------------------------------------------------
// flint-navigation-menu-item
// ---------------------------------------------------------------------------

describe('flint-navigation-menu-item', () => {
    it('renders with item id', async () => {
        const el = await fixture(html`<flint-navigation-menu-item item-id="test-item">Item</flint-navigation-menu-item>`);
        expect(el.getAttribute('item-id')).toBe('test-item');
    });

    it('container div has role="none"', async () => {
        const el = await fixture(html`<flint-navigation-menu-item>Item</flint-navigation-menu-item>`);
        const div = el.shadowRoot!.querySelector('div');
        expect(div?.getAttribute('role')).toBe('none');
    });

    it('supports disabled state', async () => {
        const el = await fixture(html`<flint-navigation-menu-item disabled>Item</flint-navigation-menu-item>`);
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('disabled propagates to child trigger', async () => {
        const el = await fixture(html`
            <flint-navigation-menu-item>
                <flint-navigation-menu-trigger content-id="x">T</flint-navigation-menu-trigger>
                <flint-navigation-menu-content id="x">C</flint-navigation-menu-content>
            </flint-navigation-menu-item>
        `);
        const item = el as FlintNavigationMenuItem;
        const trigger = el.querySelector('flint-navigation-menu-trigger') as FlintNavigationMenuTrigger;
        expect(trigger.disabled).toBe(false);

        item.disabled = true;
        await item.updateComplete;
        expect(trigger.disabled).toBe(true);
    });

    it('disabled propagates to child link', async () => {
        const el = await fixture(html`
            <flint-navigation-menu-item>
                <flint-navigation-menu-link href="#">Link</flint-navigation-menu-link>
            </flint-navigation-menu-item>
        `);
        const item = el as FlintNavigationMenuItem;
        const link = el.querySelector('flint-navigation-menu-link') as FlintNavigationMenuLink;
        expect(link.disabled).toBe(false);

        item.disabled = true;
        await item.updateComplete;
        expect(link.disabled).toBe(true);
    });
});

// ---------------------------------------------------------------------------
// flint-navigation-menu-trigger
// ---------------------------------------------------------------------------

describe('flint-navigation-menu-trigger', () => {
    it('opens content on click', async () => {
        const el = await fixture(html`
            <div>
                <flint-navigation-menu-trigger content-id="oc1">Trigger</flint-navigation-menu-trigger>
                <flint-navigation-menu-content id="oc1">Content</flint-navigation-menu-content>
            </div>
        `);
        const trigger = el.querySelector('flint-navigation-menu-trigger') as FlintNavigationMenuTrigger;
        const content = el.querySelector('flint-navigation-menu-content') as FlintNavigationMenuContent;

        expect(content.open).toBe(false);
        trigger.click();
        await trigger.updateComplete;
        expect(content.open).toBe(true);
    });

    it('toggles on multiple clicks', async () => {
        const el = await fixture(html`
            <div>
                <flint-navigation-menu-trigger content-id="oc2">Trigger</flint-navigation-menu-trigger>
                <flint-navigation-menu-content id="oc2">Content</flint-navigation-menu-content>
            </div>
        `);
        const trigger = el.querySelector('flint-navigation-menu-trigger') as FlintNavigationMenuTrigger;
        const content = el.querySelector('flint-navigation-menu-content') as FlintNavigationMenuContent;

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
                <flint-navigation-menu-trigger content-id="oc3">Trigger</flint-navigation-menu-trigger>
                <flint-navigation-menu-content id="oc3">Content</flint-navigation-menu-content>
            </div>
        `);
        const trigger = el.querySelector('flint-navigation-menu-trigger') as FlintNavigationMenuTrigger;
        const content = el.querySelector('flint-navigation-menu-content') as FlintNavigationMenuContent;

        trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        await trigger.updateComplete;
        expect(content.open).toBe(true);
    });

    it('supports keyboard navigation with Space', async () => {
        const el = await fixture(html`
            <div>
                <flint-navigation-menu-trigger content-id="oc4">Trigger</flint-navigation-menu-trigger>
                <flint-navigation-menu-content id="oc4">Content</flint-navigation-menu-content>
            </div>
        `);
        const trigger = el.querySelector('flint-navigation-menu-trigger') as FlintNavigationMenuTrigger;
        const content = el.querySelector('flint-navigation-menu-content') as FlintNavigationMenuContent;

        trigger.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
        await trigger.updateComplete;
        expect(content.open).toBe(true);
    });

    it('disables when disabled prop is true', async () => {
        const el = await fixture(html`<flint-navigation-menu-trigger disabled>Trigger</flint-navigation-menu-trigger>`);
        const button = el.shadowRoot?.querySelector('button') as HTMLButtonElement;
        expect(button.disabled).toBe(true);
    });

    it('has proper aria attributes', async () => {
        const el = await fixture(html`<flint-navigation-menu-trigger content-id="test">Trigger</flint-navigation-menu-trigger>`);
        const button = el.shadowRoot?.querySelector('button') as HTMLButtonElement;
        expect(button.hasAttribute('aria-expanded')).toBe(true);
        expect(button.hasAttribute('aria-haspopup')).toBe(true);
        expect(button.hasAttribute('aria-controls')).toBe(true);
    });

    it('reflects content-id attribute', async () => {
        const el = await fixture(html`<flint-navigation-menu-trigger content-id="my-content">T</flint-navigation-menu-trigger>`);
        expect(el.getAttribute('content-id')).toBe('my-content');
    });

    it('fires flint-navigation-menu-trigger-click with correct detail', async () => {
        const el = await fixture(html`
            <div>
                <flint-navigation-menu-trigger content-id="tc">Trigger</flint-navigation-menu-trigger>
                <flint-navigation-menu-content id="tc">Content</flint-navigation-menu-content>
            </div>
        `);
        const trigger = el.querySelector('flint-navigation-menu-trigger') as FlintNavigationMenuTrigger;
        const spy = vi.fn();
        el.addEventListener('flint-navigation-menu-trigger-click', spy);

        trigger.click();
        await trigger.updateComplete;

        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail).toEqual({ contentId: 'tc', open: true });
    });

    it('aria-expanded resets to false after menu.closeAll()', async () => {
        const el = await fixture(html`
            <flint-navigation-menu>
                <flint-navigation-menu-list>
                    <flint-navigation-menu-item>
                        <flint-navigation-menu-trigger content-id="ca">Trigger</flint-navigation-menu-trigger>
                        <flint-navigation-menu-content id="ca">Content</flint-navigation-menu-content>
                    </flint-navigation-menu-item>
                </flint-navigation-menu-list>
            </flint-navigation-menu>
        `);
        const menu = el as FlintNavigationMenu;
        const trigger = el.querySelector('flint-navigation-menu-trigger') as FlintNavigationMenuTrigger;

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
// flint-navigation-menu-content
// ---------------------------------------------------------------------------

describe('flint-navigation-menu-content', () => {
    it('renders hidden by default', async () => {
        const el = await fixture(html`<flint-navigation-menu-content id="test">Content</flint-navigation-menu-content>`);
        expect(el.hasAttribute('open')).toBe(false);
    });

    it('shows when open prop is true', async () => {
        const el = await fixture(html`<flint-navigation-menu-content open>Content</flint-navigation-menu-content>`);
        expect(el.hasAttribute('open')).toBe(true);
    });

    it('supports keyboard navigation with Escape', async () => {
        const el = await fixture(html`<flint-navigation-menu-content id="test" open>Content</flint-navigation-menu-content>`);
        const content = el as FlintNavigationMenuContent;
        content.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        await content.updateComplete;
        expect(content.open).toBe(false);
    });

    it('fires flint-navigation-menu-content-toggle on Escape', async () => {
        const el = await fixture(html`
            <div>
                <flint-navigation-menu-content id="test" open>Content</flint-navigation-menu-content>
            </div>
        `);
        const content = el.querySelector('flint-navigation-menu-content') as FlintNavigationMenuContent;
        const spy = vi.fn();
        el.addEventListener('flint-navigation-menu-content-toggle', spy);

        content.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        await content.updateComplete;

        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail).toEqual({ contentId: 'test', open: false });
    });

    it('Tab key closes the menu', async () => {
        const el = await fixture(html`<flint-navigation-menu-content id="test" open>Content</flint-navigation-menu-content>`);
        const content = el as FlintNavigationMenuContent;
        content.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
        await content.updateComplete;
        expect(content.open).toBe(false);
    });

    it('Arrow keys wrap around (Down at last → first)', async () => {
        const el = await fixture(html`
            <flint-navigation-menu-content id="test" open>
                <flint-navigation-menu-link href="#">A</flint-navigation-menu-link>
                <flint-navigation-menu-link href="#">B</flint-navigation-menu-link>
                <flint-navigation-menu-link href="#">C</flint-navigation-menu-link>
            </flint-navigation-menu-content>
        `);
        const content = el as FlintNavigationMenuContent;
        const links = Array.from(el.querySelectorAll('flint-navigation-menu-link')) as HTMLElement[];
        // Focus last link host (arrow key nav operates on host elements)
        links[2].focus();

        content.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await content.updateComplete;

        expect(el.ownerDocument.activeElement).toBe(links[0]);
    });

    it('Arrow keys wrap around (Up at first → last)', async () => {
        const el = await fixture(html`
            <flint-navigation-menu-content id="test" open>
                <flint-navigation-menu-link href="#">A</flint-navigation-menu-link>
                <flint-navigation-menu-link href="#">B</flint-navigation-menu-link>
                <flint-navigation-menu-link href="#">C</flint-navigation-menu-link>
            </flint-navigation-menu-content>
        `);
        const content = el as FlintNavigationMenuContent;
        const links = Array.from(el.querySelectorAll('flint-navigation-menu-link')) as HTMLElement[];
        // Focus first link host (arrow key nav operates on host elements)
        links[0].focus();

        content.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        await content.updateComplete;

        expect(el.ownerDocument.activeElement).toBe(links[2]);
    });

    it('supports custom direction', async () => {
        const el = await fixture(html`<flint-navigation-menu-content dir="rtl">Content</flint-navigation-menu-content>`);
        expect(el.getAttribute('dir')).toBe('rtl');
    });
});

// ---------------------------------------------------------------------------
// flint-navigation-menu-link
// ---------------------------------------------------------------------------

describe('flint-navigation-menu-link', () => {
    it('renders with href', async () => {
        const el = await fixture(html`<flint-navigation-menu-link href="/test">Link</flint-navigation-menu-link>`);
        const link = el.shadowRoot?.querySelector('a') as HTMLAnchorElement;
        expect(link.href).toContain('/test');
    });

    it('supports disabled state', async () => {
        const el = await fixture(html`<flint-navigation-menu-link href="/test" disabled>Link</flint-navigation-menu-link>`);
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('has proper aria attributes', async () => {
        const el = await fixture(html`<flint-navigation-menu-link href="/test">Link</flint-navigation-menu-link>`);
        const link = el.shadowRoot?.querySelector('a') as HTMLAnchorElement;
        expect(link.getAttribute('role')).toBe('menuitem');
    });

    it('supports target attribute', async () => {
        const el = await fixture(html`<flint-navigation-menu-link href="/test" target="_blank">Link</flint-navigation-menu-link>`);
        const link = el.shadowRoot?.querySelector('a') as HTMLAnchorElement;
        expect(link.target).toBe('_blank');
    });

    it('supports title attribute', async () => {
        const el = await fixture(html`<flint-navigation-menu-link href="/test" title="Test Link">Link</flint-navigation-menu-link>`);
        const link = el.shadowRoot?.querySelector('a') as HTMLAnchorElement;
        expect(link.title).toBe('Test Link');
    });

    it('active prop sets aria-current="page"', async () => {
        const el = await fixture(html`<flint-navigation-menu-link href="/test" active>Link</flint-navigation-menu-link>`);
        const link = el.shadowRoot?.querySelector('a') as HTMLAnchorElement;
        expect(link.getAttribute('aria-current')).toBe('page');
    });

    it('active prop adds active class', async () => {
        const el = await fixture(html`<flint-navigation-menu-link href="/test" active>Link</flint-navigation-menu-link>`);
        const link = el.shadowRoot?.querySelector('a') as HTMLAnchorElement;
        expect(link.classList.contains('link--active')).toBe(true);
    });

    it('reflects active attribute', async () => {
        const el = await fixture(html`<flint-navigation-menu-link active>Link</flint-navigation-menu-link>`);
        expect(el.hasAttribute('active')).toBe(true);
    });

    it('inactive link does not have aria-current attribute', async () => {
        const el = await fixture(html`<flint-navigation-menu-link href="/test">Link</flint-navigation-menu-link>`);
        const link = el.shadowRoot?.querySelector('a') as HTMLAnchorElement;
        expect(link.hasAttribute('aria-current')).toBe(false);
    });
});

// ---------------------------------------------------------------------------
// Accessibility
// ---------------------------------------------------------------------------

describe('Accessibility', () => {
    it('trigger has proper aria-expanded', async () => {
        const el = await fixture(html`
            <div>
                <flint-navigation-menu-trigger content-id="test">Trigger</flint-navigation-menu-trigger>
                <flint-navigation-menu-content id="test">Content</flint-navigation-menu-content>
            </div>
        `);
        const trigger = el.querySelector('flint-navigation-menu-trigger') as FlintNavigationMenuTrigger;
        const button = trigger.shadowRoot?.querySelector('button') as HTMLButtonElement;

        expect(button.getAttribute('aria-expanded')).toBe('false');
        trigger.click();
        await trigger.updateComplete;
        expect(button.getAttribute('aria-expanded')).toBe('true');
    });

    it('content has proper role', async () => {
        const el = await fixture(html`<flint-navigation-menu-content open>Content</flint-navigation-menu-content>`);
        const panel = el.shadowRoot?.querySelector('[role="menu"]');
        expect(panel).toBeTruthy();
    });

    it('link has aria-disabled="false" when not disabled', async () => {
        const el = await fixture(html`<flint-navigation-menu-link href="#">Link</flint-navigation-menu-link>`);
        const a = el.shadowRoot?.querySelector('a') as HTMLAnchorElement;
        expect(a.getAttribute('aria-disabled')).toBe('false');
    });

    it('link has aria-disabled="true" when disabled', async () => {
        const el = await fixture(html`<flint-navigation-menu-link href="#" disabled>Link</flint-navigation-menu-link>`);
        const a = el.shadowRoot?.querySelector('a') as HTMLAnchorElement;
        expect(a.getAttribute('aria-disabled')).toBe('true');
    });

    it('trigger host has no tabindex attribute', async () => {
        const el = await fixture(html`<flint-navigation-menu-trigger content-id="x">T</flint-navigation-menu-trigger>`);
        expect(el.hasAttribute('tabindex')).toBe(false);
    });
});

// ---------------------------------------------------------------------------
// flint-navigation-menu-item hover timers
// ---------------------------------------------------------------------------

describe('flint-navigation-menu-item hover timers', () => {
    it('opens content after openDelay on mouseenter', async () => {
        vi.useFakeTimers();
        const el = await fixture(html`
            <flint-navigation-menu>
                <flint-navigation-menu-list>
                    <flint-navigation-menu-item open-delay="100">
                        <flint-navigation-menu-trigger content-id="ht1">T</flint-navigation-menu-trigger>
                        <flint-navigation-menu-content id="ht1">C</flint-navigation-menu-content>
                    </flint-navigation-menu-item>
                </flint-navigation-menu-list>
            </flint-navigation-menu>
        `);
        const item = el.querySelector('flint-navigation-menu-item')!;
        const content = el.querySelector('flint-navigation-menu-content') as FlintNavigationMenuContent;

        item.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        expect(content.open).toBe(false); // not yet open

        vi.advanceTimersByTime(100);
        await content.updateComplete;
        expect(content.open).toBe(true);
        vi.useRealTimers();
    });

    it('mouseleave before openDelay cancels pending open', async () => {
        vi.useFakeTimers();
        const el = await fixture(html`
            <flint-navigation-menu>
                <flint-navigation-menu-list>
                    <flint-navigation-menu-item open-delay="200">
                        <flint-navigation-menu-trigger content-id="ht2">T</flint-navigation-menu-trigger>
                        <flint-navigation-menu-content id="ht2">C</flint-navigation-menu-content>
                    </flint-navigation-menu-item>
                </flint-navigation-menu-list>
            </flint-navigation-menu>
        `);
        const item = el.querySelector('flint-navigation-menu-item')!;
        const content = el.querySelector('flint-navigation-menu-content') as FlintNavigationMenuContent;

        item.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        vi.advanceTimersByTime(100); // before delay fires
        item.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        vi.advanceTimersByTime(300); // advance past original delay
        await content.updateComplete;

        expect(content.open).toBe(false);
        vi.useRealTimers();
    });

    it('closes content after closeDelay on mouseleave', async () => {
        vi.useFakeTimers();
        const el = await fixture(html`
            <flint-navigation-menu>
                <flint-navigation-menu-list>
                    <flint-navigation-menu-item open-delay="0" close-delay="150">
                        <flint-navigation-menu-trigger content-id="ht3">T</flint-navigation-menu-trigger>
                        <flint-navigation-menu-content id="ht3">C</flint-navigation-menu-content>
                    </flint-navigation-menu-item>
                </flint-navigation-menu-list>
            </flint-navigation-menu>
        `);
        const item = el.querySelector('flint-navigation-menu-item')!;
        const content = el.querySelector('flint-navigation-menu-content') as FlintNavigationMenuContent;

        item.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        vi.advanceTimersByTime(0);
        await content.updateComplete;
        expect(content.open).toBe(true);

        item.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        expect(content.open).toBe(true); // not yet closed

        vi.advanceTimersByTime(150);
        await content.updateComplete;
        expect(content.open).toBe(false);
        vi.useRealTimers();
    });

    it('mouseenter during close delay cancels close', async () => {
        vi.useFakeTimers();
        const el = await fixture(html`
            <flint-navigation-menu>
                <flint-navigation-menu-list>
                    <flint-navigation-menu-item open-delay="0" close-delay="200">
                        <flint-navigation-menu-trigger content-id="ht4">T</flint-navigation-menu-trigger>
                        <flint-navigation-menu-content id="ht4">C</flint-navigation-menu-content>
                    </flint-navigation-menu-item>
                </flint-navigation-menu-list>
            </flint-navigation-menu>
        `);
        const item = el.querySelector('flint-navigation-menu-item')!;
        const content = el.querySelector('flint-navigation-menu-content') as FlintNavigationMenuContent;

        item.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        vi.advanceTimersByTime(0);
        await content.updateComplete;
        expect(content.open).toBe(true);

        item.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        vi.advanceTimersByTime(100); // before close fires
        item.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true })); // re-enter cancels close
        vi.advanceTimersByTime(300);
        await content.updateComplete;

        expect(content.open).toBe(true); // still open
        vi.useRealTimers();
    });

    it('timers are cleared on disconnectedCallback', async () => {
        vi.useFakeTimers();
        const el = await fixture(html`
            <flint-navigation-menu>
                <flint-navigation-menu-list>
                    <flint-navigation-menu-item open-delay="100">
                        <flint-navigation-menu-trigger content-id="ht5">T</flint-navigation-menu-trigger>
                        <flint-navigation-menu-content id="ht5">C</flint-navigation-menu-content>
                    </flint-navigation-menu-item>
                </flint-navigation-menu-list>
            </flint-navigation-menu>
        `);
        const item = el.querySelector('flint-navigation-menu-item')!;
        const content = el.querySelector('flint-navigation-menu-content') as FlintNavigationMenuContent;

        item.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        item.remove(); // disconnect before timer fires
        vi.advanceTimersByTime(200);
        await content.updateComplete;

        expect(content.open).toBe(false);
        vi.useRealTimers();
    });
});

// ---------------------------------------------------------------------------
// flint-navigation-menu-content keyboard Home/End
// ---------------------------------------------------------------------------

describe('flint-navigation-menu-content Home/End keys', () => {
    it('Home key focuses first item', async () => {
        const el = await fixture(html`
            <flint-navigation-menu-content id="he-test" open>
                <flint-navigation-menu-link href="#">A</flint-navigation-menu-link>
                <flint-navigation-menu-link href="#">B</flint-navigation-menu-link>
                <flint-navigation-menu-link href="#">C</flint-navigation-menu-link>
            </flint-navigation-menu-content>
        `);
        const content = el as FlintNavigationMenuContent;
        const links = Array.from(el.querySelectorAll('flint-navigation-menu-link')) as HTMLElement[];
        links[2].focus();

        content.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
        await content.updateComplete;

        expect(el.ownerDocument.activeElement).toBe(links[0]);
    });

    it('End key focuses last item', async () => {
        const el = await fixture(html`
            <flint-navigation-menu-content id="he-test2" open>
                <flint-navigation-menu-link href="#">A</flint-navigation-menu-link>
                <flint-navigation-menu-link href="#">B</flint-navigation-menu-link>
                <flint-navigation-menu-link href="#">C</flint-navigation-menu-link>
            </flint-navigation-menu-content>
        `);
        const content = el as FlintNavigationMenuContent;
        const links = Array.from(el.querySelectorAll('flint-navigation-menu-link')) as HTMLElement[];
        links[0].focus();

        content.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
        await content.updateComplete;

        expect(el.ownerDocument.activeElement).toBe(links[2]);
    });
});

// ---------------------------------------------------------------------------
// close-on-link-click
// ---------------------------------------------------------------------------

describe('close on link click', () => {
    it('clicking a link inside content closes the menu', async () => {
        const el = await fixture(html`
            <flint-navigation-menu>
                <flint-navigation-menu-list>
                    <flint-navigation-menu-item>
                        <flint-navigation-menu-trigger content-id="col1">T</flint-navigation-menu-trigger>
                        <flint-navigation-menu-content id="col1">
                            <flint-navigation-menu-link href="#">Link</flint-navigation-menu-link>
                        </flint-navigation-menu-content>
                    </flint-navigation-menu-item>
                </flint-navigation-menu-list>
            </flint-navigation-menu>
        `);
        const menu = el as FlintNavigationMenu;
        const content = el.querySelector('flint-navigation-menu-content') as FlintNavigationMenuContent;
        const link = el.querySelector('flint-navigation-menu-link') as FlintNavigationMenuLink;

        menu.openContent('col1');
        await content.updateComplete;
        expect(content.open).toBe(true);

        link.click();
        await content.updateComplete;
        expect(content.open).toBe(false);
        expect(menu.openContentId).toBeNull();
    });
});

// ---------------------------------------------------------------------------
// Programmatic control: openContent from external button does not self-close
// ---------------------------------------------------------------------------

describe('programmatic control', () => {
    it('openContent stays open when a click event also fires on document (external button pattern)', async () => {
        const { menu, content1 } = await makeMenu();

        // Simulate an external button: pointerdown fires first (handled by menu),
        // then click fires and calls openContent — menu must remain open.
        document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
        menu.openContent('c1');
        await content1.updateComplete;

        expect(content1.open).toBe(true);
        expect(menu.openContentId).toBe('c1');
    });

    it('openContent from external button switches correctly between menus', async () => {
        const { menu, content1, content2 } = await makeMenu();

        document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
        menu.openContent('c1');
        await content1.updateComplete;
        expect(content1.open).toBe(true);

        document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
        menu.openContent('c2');
        await content1.updateComplete;
        await content2.updateComplete;
        expect(content1.open).toBe(false);
        expect(content2.open).toBe(true);
    });
});

// ---------------------------------------------------------------------------
// openContent closes previously open content
// ---------------------------------------------------------------------------

describe('openContent replaces open panel', () => {
    it('openContent() on a different id closes previously open content', async () => {
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
});

// ---------------------------------------------------------------------------
// flint-navigation-menu _handleContentToggle branch coverage
// ---------------------------------------------------------------------------

describe('flint-navigation-menu content-toggle edge cases', () => {
    it('close event for non-active content does not clear openContentId', async () => {
        const { menu, content1 } = await makeMenu();
        menu.openContent('c1');
        await content1.updateComplete;
        expect(menu.openContentId).toBe('c1');

        // Fire a close event for c2 (which is not the currently open content)
        menu.dispatchEvent(
            new CustomEvent('flint-navigation-menu-content-toggle', {
                detail: { contentId: 'c2', open: false },
                bubbles: false,
            })
        );
        // openContentId should remain 'c1' since c2 was not open
        expect(menu.openContentId).toBe('c1');
    });

    it('close event for active content clears openContentId', async () => {
        const { menu, content1 } = await makeMenu();
        menu.openContent('c1');
        await content1.updateComplete;
        expect(menu.openContentId).toBe('c1');

        // Fire a close event for c1 (the currently open content)
        menu.dispatchEvent(
            new CustomEvent('flint-navigation-menu-content-toggle', {
                detail: { contentId: 'c1', open: false },
                bubbles: false,
            })
        );
        expect(menu.openContentId).toBeNull();
    });
});

// ---------------------------------------------------------------------------
// flint-navigation-menu-content _focusTrigger branch coverage
// ---------------------------------------------------------------------------

describe('flint-navigation-menu-content _focusTrigger', () => {
    it('Escape inside full menu calls focus on the trigger via menu-level search', async () => {
        const el = await fixture(html`
            <flint-navigation-menu>
                <flint-navigation-menu-list>
                    <flint-navigation-menu-item>
                        <flint-navigation-menu-trigger content-id="esc-full">T</flint-navigation-menu-trigger>
                        <flint-navigation-menu-content id="esc-full" open>Content</flint-navigation-menu-content>
                    </flint-navigation-menu-item>
                </flint-navigation-menu-list>
            </flint-navigation-menu>
        `);
        const trigger = el.querySelector('flint-navigation-menu-trigger') as HTMLElement;
        const content = el.querySelector('flint-navigation-menu-content') as FlintNavigationMenuContent;
        const focusSpy = vi.spyOn(trigger, 'focus');

        content.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        await content.updateComplete;

        expect(content.open).toBe(false);
        // Trigger.focus() should have been called via the menu-level search path (lines 160-165)
        expect(focusSpy).toHaveBeenCalledOnce();
        focusSpy.mockRestore();
    });

    it('Escape when no matching trigger in menu falls through to document fallback', async () => {
        const el = await fixture(html`
            <flint-navigation-menu>
                <flint-navigation-menu-content id="esc-no-trigger" open>Content</flint-navigation-menu-content>
            </flint-navigation-menu>
        `);
        const content = el.querySelector('flint-navigation-menu-content') as FlintNavigationMenuContent;

        // Should not throw even with no matching trigger
        content.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        await content.updateComplete;

        expect(content.open).toBe(false);
    });

    it('ArrowDown with no items does not throw', async () => {
        const el = await fixture(html`
            <flint-navigation-menu-content id="empty-down" open></flint-navigation-menu-content>
        `);
        const content = el as FlintNavigationMenuContent;
        // No items — should not throw
        content.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await content.updateComplete;
        expect(true).toBe(true);
    });

    it('ArrowUp with no items does not throw', async () => {
        const el = await fixture(html`
            <flint-navigation-menu-content id="empty-up" open></flint-navigation-menu-content>
        `);
        const content = el as FlintNavigationMenuContent;
        // No items — should not throw
        content.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        await content.updateComplete;
        expect(true).toBe(true);
    });
});

// ---------------------------------------------------------------------------
// flint-navigation-menu-item edge cases
// ---------------------------------------------------------------------------

describe('flint-navigation-menu-item _openContent edge cases', () => {
    it('mouseenter on disabled item does not open content', async () => {
        vi.useFakeTimers();
        const el = await fixture(html`
            <flint-navigation-menu>
                <flint-navigation-menu-list>
                    <flint-navigation-menu-item disabled open-delay="100">
                        <flint-navigation-menu-trigger content-id="dis-ht">T</flint-navigation-menu-trigger>
                        <flint-navigation-menu-content id="dis-ht">C</flint-navigation-menu-content>
                    </flint-navigation-menu-item>
                </flint-navigation-menu-list>
            </flint-navigation-menu>
        `);
        const item = el.querySelector('flint-navigation-menu-item')!;
        const content = el.querySelector('flint-navigation-menu-content') as FlintNavigationMenuContent;

        item.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        vi.advanceTimersByTime(200);
        await content.updateComplete;

        expect(content.open).toBe(false);
        vi.useRealTimers();
    });

    it('_openContent with disabled trigger returns early without opening', async () => {
        vi.useFakeTimers();
        const el = await fixture(html`
            <flint-navigation-menu>
                <flint-navigation-menu-list>
                    <flint-navigation-menu-item open-delay="100">
                        <flint-navigation-menu-trigger content-id="dis-tr">T</flint-navigation-menu-trigger>
                        <flint-navigation-menu-content id="dis-tr">C</flint-navigation-menu-content>
                    </flint-navigation-menu-item>
                </flint-navigation-menu-list>
            </flint-navigation-menu>
        `);
        const item = el.querySelector('flint-navigation-menu-item')!;
        const trigger = el.querySelector('flint-navigation-menu-trigger') as FlintNavigationMenuTrigger;
        const content = el.querySelector('flint-navigation-menu-content') as FlintNavigationMenuContent;

        // Start hover timer, then disable the trigger before it fires
        // (without changing item.disabled which would trigger _syncChildren re-sync)
        item.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        trigger.disabled = true;
        // Timer fires → _openContent → sees trigger.disabled=true → returns early
        vi.advanceTimersByTime(100);
        await content.updateComplete;

        expect(content.open).toBe(false);
        vi.useRealTimers();
    });

    it('_openContent when trigger has no contentId returns early', async () => {
        vi.useFakeTimers();
        const el = await fixture(html`
            <flint-navigation-menu>
                <flint-navigation-menu-list>
                    <flint-navigation-menu-item open-delay="0">
                        <flint-navigation-menu-trigger>T</flint-navigation-menu-trigger>
                        <flint-navigation-menu-content id="no-cid-c">C</flint-navigation-menu-content>
                    </flint-navigation-menu-item>
                </flint-navigation-menu-list>
            </flint-navigation-menu>
        `);
        const item = el.querySelector('flint-navigation-menu-item')!;
        const content = el.querySelector('flint-navigation-menu-content') as FlintNavigationMenuContent;

        item.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        vi.advanceTimersByTime(0);
        await content.updateComplete;

        expect(content.open).toBe(false);
        vi.useRealTimers();
    });

    it('_openContent when content element not found returns early', async () => {
        vi.useFakeTimers();
        const el = await fixture(html`
            <flint-navigation-menu>
                <flint-navigation-menu-list>
                    <flint-navigation-menu-item open-delay="0">
                        <flint-navigation-menu-trigger content-id="non-existent">T</flint-navigation-menu-trigger>
                    </flint-navigation-menu-item>
                </flint-navigation-menu-list>
            </flint-navigation-menu>
        `);
        const item = el.querySelector('flint-navigation-menu-item')!;

        // Should not throw
        item.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        vi.advanceTimersByTime(0);

        expect(true).toBe(true);
        vi.useRealTimers();
    });

    it('_closeContent when content is already closed is a no-op', async () => {
        vi.useFakeTimers();
        const el = await fixture(html`
            <flint-navigation-menu>
                <flint-navigation-menu-list>
                    <flint-navigation-menu-item open-delay="0" close-delay="50">
                        <flint-navigation-menu-trigger content-id="cc-noop">T</flint-navigation-menu-trigger>
                        <flint-navigation-menu-content id="cc-noop">C</flint-navigation-menu-content>
                    </flint-navigation-menu-item>
                </flint-navigation-menu-list>
            </flint-navigation-menu>
        `);
        const item = el.querySelector('flint-navigation-menu-item')!;
        const content = el.querySelector('flint-navigation-menu-content') as FlintNavigationMenuContent;

        // Content is not open — mouseleave fires _closeContent which should return early
        expect(content.open).toBe(false);
        item.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        vi.advanceTimersByTime(50);
        await content.updateComplete;

        expect(content.open).toBe(false);
        vi.useRealTimers();
    });

    it('_syncChildren skips triggers belonging to a nested item', async () => {
        const el = await fixture(html`
            <flint-navigation-menu-item>
                <flint-navigation-menu-trigger content-id="outer-oc">Outer</flint-navigation-menu-trigger>
                <flint-navigation-menu-content id="outer-oc">
                    <flint-navigation-menu-item>
                        <flint-navigation-menu-trigger content-id="inner-ic">Inner</flint-navigation-menu-trigger>
                        <flint-navigation-menu-content id="inner-ic">Inner Content</flint-navigation-menu-content>
                    </flint-navigation-menu-item>
                </flint-navigation-menu-content>
            </flint-navigation-menu-item>
        `) as FlintNavigationMenuItem;

        const triggers = Array.from(el.querySelectorAll('flint-navigation-menu-trigger')) as FlintNavigationMenuTrigger[];
        const outerTrigger = triggers[0];
        const innerTrigger = triggers[1];

        el.disabled = true;
        await el.updateComplete;

        expect(outerTrigger.disabled).toBe(true);
        expect(innerTrigger.disabled).toBe(false); // inner trigger not affected
    });
});

// ---------------------------------------------------------------------------
// flint-navigation-menu-link event handling
// ---------------------------------------------------------------------------

describe('flint-navigation-menu-link event handling', () => {
    it('click on disabled link calls preventDefault', async () => {
        const el = await fixture(html`<flint-navigation-menu-link href="/test" disabled>Link</flint-navigation-menu-link>`);
        const link = el as FlintNavigationMenuLink;

        const event = new MouseEvent('click', { bubbles: true, cancelable: true });
        const preventSpy = vi.spyOn(event, 'preventDefault');
        link.dispatchEvent(event);

        expect(preventSpy).toHaveBeenCalledOnce();
    });

    it('Enter key on link triggers anchor click', async () => {
        const el = await fixture(html`<flint-navigation-menu-link href="#">Link</flint-navigation-menu-link>`) as FlintNavigationMenuLink;
        await el.updateComplete;
        const a = el.shadowRoot!.querySelector('a') as HTMLAnchorElement;
        const clickSpy = vi.spyOn(a, 'click');

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await el.updateComplete;

        expect(clickSpy).toHaveBeenCalledOnce();
        clickSpy.mockRestore();
    });

    it('Space key on link triggers anchor click', async () => {
        const el = await fixture(html`<flint-navigation-menu-link href="#">Link</flint-navigation-menu-link>`) as FlintNavigationMenuLink;
        await el.updateComplete;
        const a = el.shadowRoot!.querySelector('a') as HTMLAnchorElement;
        const clickSpy = vi.spyOn(a, 'click');

        el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
        await el.updateComplete;

        expect(clickSpy).toHaveBeenCalledOnce();
        clickSpy.mockRestore();
    });

    it('Enter key on disabled link does not trigger anchor click', async () => {
        const el = await fixture(html`<flint-navigation-menu-link href="#" disabled>Link</flint-navigation-menu-link>`) as FlintNavigationMenuLink;
        await el.updateComplete;
        const a = el.shadowRoot!.querySelector('a') as HTMLAnchorElement;
        const clickSpy = vi.spyOn(a, 'click');

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await el.updateComplete;

        expect(clickSpy).not.toHaveBeenCalled();
        clickSpy.mockRestore();
    });

    it('other keydown keys are ignored without crashing', async () => {
        const el = await fixture(html`<flint-navigation-menu-link href="#">Link</flint-navigation-menu-link>`) as FlintNavigationMenuLink;
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        await el.updateComplete;
        expect(true).toBe(true);
    });

    it('focus() delegates to the inner anchor element', async () => {
        const el = await fixture(html`<flint-navigation-menu-link href="/test">Link</flint-navigation-menu-link>`) as FlintNavigationMenuLink;
        await el.updateComplete;
        const a = el.shadowRoot!.querySelector('a') as HTMLElement;
        const focusSpy = vi.spyOn(a, 'focus');

        el.focus();

        expect(focusSpy).toHaveBeenCalledOnce();
        focusSpy.mockRestore();
    });

    it('click without parent menu does not throw', async () => {
        const el = await fixture(html`<flint-navigation-menu-link href="#">Link</flint-navigation-menu-link>`) as FlintNavigationMenuLink;
        // No parent flint-navigation-menu — click should not throw
        el.click();
        await el.updateComplete;
        expect(true).toBe(true);
    });
});

// ---------------------------------------------------------------------------
// flint-navigation-menu-list prop updates
// ---------------------------------------------------------------------------

describe('flint-navigation-menu-list prop updates', () => {
    it('changing direction prop updates flex direction style', async () => {
        const el = await fixture(html`<flint-navigation-menu-list></flint-navigation-menu-list>`) as FlintNavigationMenuList;
        // Change direction without changing gap — exercises the direction branch of willUpdate
        el.direction = 'column';
        await el.updateComplete;
        expect(el.style.getPropertyValue('--flint-navigation-menu-list-direction')).toBe('column');
    });

    it('changing gap prop updates gap style', async () => {
        const el = await fixture(html`<flint-navigation-menu-list></flint-navigation-menu-list>`) as FlintNavigationMenuList;
        el.gap = 24;
        await el.updateComplete;
        expect(el.style.getPropertyValue('--flint-navigation-menu-list-gap')).toBe('24px');
    });
});

// ---------------------------------------------------------------------------
// flint-navigation-menu-trigger _getContent and _focusFirstContentItem
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// flint-navigation-menu pointerdown inside menu
// ---------------------------------------------------------------------------

describe('flint-navigation-menu openContent edge cases', () => {
    it('openContent() with non-existent id sets openContentId but does not crash', async () => {
        const { menu } = await makeMenu();
        // No content element with this id — if (content) branch is false
        menu.openContent('no-such-id');
        expect(menu.openContentId).toBe('no-such-id');
    });
});

describe('flint-navigation-menu pointerdown handling', () => {
    it('pointerdown inside the menu does not close content', async () => {
        const { menu, content1 } = await makeMenu();
        menu.openContent('c1');
        await content1.updateComplete;
        expect(menu.openContentId).toBe('c1');

        // Dispatch pointerdown inside the menu — should NOT close
        const trigger1 = menu.querySelector('flint-navigation-menu-trigger') as HTMLElement;
        trigger1.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
        await content1.updateComplete;

        expect(menu.openContentId).toBe('c1');
        expect(content1.open).toBe(true);
    });
});

// ---------------------------------------------------------------------------
// flint-navigation-menu-content Arrow/Home/End edge cases
// ---------------------------------------------------------------------------

describe('flint-navigation-menu-content keyboard edge cases', () => {
    it('ArrowDown from non-last item moves to next (no wrap)', async () => {
        const el = await fixture(html`
            <flint-navigation-menu-content id="nd-next" open>
                <flint-navigation-menu-link href="#">A</flint-navigation-menu-link>
                <flint-navigation-menu-link href="#">B</flint-navigation-menu-link>
                <flint-navigation-menu-link href="#">C</flint-navigation-menu-link>
            </flint-navigation-menu-content>
        `);
        const content = el as FlintNavigationMenuContent;
        const links = Array.from(el.querySelectorAll('flint-navigation-menu-link')) as HTMLElement[];
        links[0].focus(); // focus first item

        content.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await content.updateComplete;

        expect(el.ownerDocument.activeElement).toBe(links[1]); // moved to second (no wrap)
    });

    it('ArrowUp from non-first item moves to previous (no wrap)', async () => {
        const el = await fixture(html`
            <flint-navigation-menu-content id="nd-prev" open>
                <flint-navigation-menu-link href="#">A</flint-navigation-menu-link>
                <flint-navigation-menu-link href="#">B</flint-navigation-menu-link>
                <flint-navigation-menu-link href="#">C</flint-navigation-menu-link>
            </flint-navigation-menu-content>
        `);
        const content = el as FlintNavigationMenuContent;
        const links = Array.from(el.querySelectorAll('flint-navigation-menu-link')) as HTMLElement[];
        links[2].focus(); // focus last item

        content.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        await content.updateComplete;

        expect(el.ownerDocument.activeElement).toBe(links[1]); // moved to second (no wrap)
    });

    it('Home key with empty items does not throw', async () => {
        const el = await fixture(html`<flint-navigation-menu-content id="empty-home" open></flint-navigation-menu-content>`);
        const content = el as FlintNavigationMenuContent;
        content.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
        await content.updateComplete;
        expect(true).toBe(true);
    });

    it('End key with empty items does not throw', async () => {
        const el = await fixture(html`<flint-navigation-menu-content id="empty-end" open></flint-navigation-menu-content>`);
        const content = el as FlintNavigationMenuContent;
        content.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
        await content.updateComplete;
        expect(true).toBe(true);
    });
});

// ---------------------------------------------------------------------------
// flint-navigation-menu-item additional edge cases
// ---------------------------------------------------------------------------

describe('flint-navigation-menu-item additional edge cases', () => {
    it('updated() with non-disabled prop change does not break', async () => {
        const el = await fixture(html`<flint-navigation-menu-item item-id="orig">Item</flint-navigation-menu-item>`) as FlintNavigationMenuItem;
        // Change itemId (not disabled) — updated() is called but disabled branch is skipped
        el.itemId = 'changed';
        await el.updateComplete;
        expect(el.itemId).toBe('changed');
    });

    it('_closeContent when item has no trigger is a no-op', async () => {
        vi.useFakeTimers();
        const el = await fixture(html`
            <flint-navigation-menu-item close-delay="0">
                <p>No trigger here</p>
            </flint-navigation-menu-item>
        `) as FlintNavigationMenuItem;

        el.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        vi.advanceTimersByTime(0);

        expect(true).toBe(true); // no crash
        vi.useRealTimers();
    });

    it('_closeContent when trigger has no contentId is a no-op', async () => {
        vi.useFakeTimers();
        const el = await fixture(html`
            <flint-navigation-menu-item close-delay="0">
                <flint-navigation-menu-trigger>T (no content-id)</flint-navigation-menu-trigger>
            </flint-navigation-menu-item>
        `) as FlintNavigationMenuItem;

        el.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        vi.advanceTimersByTime(0);

        expect(true).toBe(true); // no crash
        vi.useRealTimers();
    });

    it('_syncChildren skips links belonging to a nested item', async () => {
        const el = await fixture(html`
            <flint-navigation-menu-item>
                <flint-navigation-menu-link href="#">Outer Link</flint-navigation-menu-link>
                <flint-navigation-menu-item>
                    <flint-navigation-menu-link href="#">Inner Link</flint-navigation-menu-link>
                </flint-navigation-menu-item>
            </flint-navigation-menu-item>
        `) as FlintNavigationMenuItem;

        const links = Array.from(el.querySelectorAll('flint-navigation-menu-link')) as FlintNavigationMenuLink[];
        const outerLink = links[0];
        const innerLink = links[1];

        el.disabled = true;
        await el.updateComplete;

        expect(outerLink.disabled).toBe(true);
        expect(innerLink.disabled).toBe(false); // inner link not affected
    });
});

// ---------------------------------------------------------------------------
// flint-navigation-menu-link disconnectedCallback
// ---------------------------------------------------------------------------

describe('flint-navigation-menu-link disconnectedCallback', () => {
    it('removes event listeners on disconnect', async () => {
        const el = await fixture(html`<flint-navigation-menu-link href="#">Link</flint-navigation-menu-link>`) as FlintNavigationMenuLink;
        const removeSpy = vi.spyOn(el, 'removeEventListener');
        el.remove();
        expect(removeSpy).toHaveBeenCalledWith('click', expect.any(Function));
        expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
        removeSpy.mockRestore();
    });
});

// ---------------------------------------------------------------------------
// flint-navigation-menu-list willUpdate branch
// ---------------------------------------------------------------------------

describe('flint-navigation-menu-list willUpdate branch', () => {
    it('willUpdate with unrelated prop change (ariaLabel) does not call _updateStyles', async () => {
        const el = await fixture(html`<flint-navigation-menu-list></flint-navigation-menu-list>`) as FlintNavigationMenuList;
        const initialGap = el.style.getPropertyValue('--flint-navigation-menu-list-gap');
        // Change ariaLabel (not gap/direction) — exercises the false-false branch of willUpdate condition
        el.ariaLabel = 'Updated navigation';
        await el.updateComplete;
        // Gap style should remain unchanged
        expect(el.style.getPropertyValue('--flint-navigation-menu-list-gap')).toBe(initialGap);
        expect(el.ariaLabel).toBe('Updated navigation');
    });
});

// ---------------------------------------------------------------------------
// flint-navigation-menu-trigger _handleClick disabled branch
// ---------------------------------------------------------------------------

describe('flint-navigation-menu-trigger _handleClick disabled', () => {
    it('clicking the host of a disabled trigger does not open content', async () => {
        const el = await fixture(html`
            <div>
                <flint-navigation-menu-trigger content-id="dc1" disabled>T</flint-navigation-menu-trigger>
                <flint-navigation-menu-content id="dc1">C</flint-navigation-menu-content>
            </div>
        `);
        const trigger = el.querySelector('flint-navigation-menu-trigger') as FlintNavigationMenuTrigger;
        const content = el.querySelector('flint-navigation-menu-content') as FlintNavigationMenuContent;

        // Programmatic click on the host fires _handleClick; disabled → returns early
        trigger.click();
        await trigger.updateComplete;

        expect(content.open).toBe(false);
    });
});

describe('flint-navigation-menu-trigger _getContent edge cases', () => {
    it('ArrowDown focuses first [role="menuitem"] element in content', async () => {
        const el = await fixture(html`
            <div>
                <flint-navigation-menu-trigger content-id="ad1">T</flint-navigation-menu-trigger>
                <flint-navigation-menu-content id="ad1" open>
                    <button role="menuitem">First Item</button>
                </flint-navigation-menu-content>
            </div>
        `);
        const trigger = el.querySelector('flint-navigation-menu-trigger') as FlintNavigationMenuTrigger;
        const button = el.querySelector('[role="menuitem"]') as HTMLElement;

        trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await trigger.updateComplete;

        expect(el.ownerDocument.activeElement).toBe(button);
    });

    it('ArrowDown with no [role="menuitem"] in content does not throw', async () => {
        const el = await fixture(html`
            <div>
                <flint-navigation-menu-trigger content-id="ad2">T</flint-navigation-menu-trigger>
                <flint-navigation-menu-content id="ad2" open>
                    <p>No menuitem</p>
                </flint-navigation-menu-content>
            </div>
        `);
        const trigger = el.querySelector('flint-navigation-menu-trigger') as FlintNavigationMenuTrigger;

        trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await trigger.updateComplete;

        expect(true).toBe(true); // no crash
    });

    it('ArrowDown with no contentId does not throw', async () => {
        const el = await fixture(html`<flint-navigation-menu-trigger>T</flint-navigation-menu-trigger>`);
        const trigger = el as FlintNavigationMenuTrigger;

        trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await trigger.updateComplete;

        expect(true).toBe(true); // no crash
    });

    it('disabled trigger ignores all keydown events', async () => {
        const el = await fixture(html`
            <div>
                <flint-navigation-menu-trigger content-id="dk1" disabled>T</flint-navigation-menu-trigger>
                <flint-navigation-menu-content id="dk1">C</flint-navigation-menu-content>
            </div>
        `);
        const trigger = el.querySelector('flint-navigation-menu-trigger') as FlintNavigationMenuTrigger;
        const content = el.querySelector('flint-navigation-menu-content') as FlintNavigationMenuContent;

        trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        trigger.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
        trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await trigger.updateComplete;

        expect(content.open).toBe(false);
    });

    it('_getContent returns null when contentId is empty', async () => {
        const el = await fixture(html`<flint-navigation-menu-trigger>T</flint-navigation-menu-trigger>`);
        const trigger = el as FlintNavigationMenuTrigger;

        // Clicking a trigger with no contentId should not crash (content is null)
        trigger.click();
        await trigger.updateComplete;

        expect(true).toBe(true);
    });

    it('_getContent finds content at menu level (outside the item)', async () => {
        // Content is at menu level, not inside the item — triggers menu-level fallback
        const el = await fixture(html`
            <flint-navigation-menu>
                <flint-navigation-menu-item>
                    <flint-navigation-menu-trigger content-id="menu-lvl">T</flint-navigation-menu-trigger>
                </flint-navigation-menu-item>
                <flint-navigation-menu-content id="menu-lvl">Menu-level content</flint-navigation-menu-content>
            </flint-navigation-menu>
        `);
        const trigger = el.querySelector('flint-navigation-menu-trigger') as FlintNavigationMenuTrigger;
        const content = el.querySelector('flint-navigation-menu-content') as FlintNavigationMenuContent;

        trigger.click();
        await trigger.updateComplete;

        expect(content.open).toBe(true);
    });

    it('_getContent finds content via parent element fallback (no item or menu wrapper)', async () => {
        // Trigger in a plain div with content sibling — exercises parent-element fallback
        const el = await fixture(html`
            <div>
                <flint-navigation-menu-trigger content-id="parent-fb">T</flint-navigation-menu-trigger>
                <flint-navigation-menu-content id="parent-fb">Content</flint-navigation-menu-content>
            </div>
        `);
        const trigger = el.querySelector('flint-navigation-menu-trigger') as FlintNavigationMenuTrigger;
        const content = el.querySelector('flint-navigation-menu-content') as FlintNavigationMenuContent;

        trigger.click();
        await trigger.updateComplete;

        expect(content.open).toBe(true);
    });

    it('contentId change causes trigger to observe new content element', async () => {
        const el = await fixture(html`
            <div>
                <flint-navigation-menu-trigger content-id="obs-1">T</flint-navigation-menu-trigger>
                <flint-navigation-menu-content id="obs-1">C1</flint-navigation-menu-content>
                <flint-navigation-menu-content id="obs-2">C2</flint-navigation-menu-content>
            </div>
        `);
        const trigger = el.querySelector('flint-navigation-menu-trigger') as FlintNavigationMenuTrigger;
        const content2 = el.querySelector('#obs-2') as FlintNavigationMenuContent;

        // Change contentId to point to content2
        trigger.contentId = 'obs-2';
        await trigger.updateComplete;

        trigger.click();
        await trigger.updateComplete;

        expect(content2.open).toBe(true);
    });
});

// ── Accessibility ─────────────────────────────────────────────────────────

describe('flint-navigation-menu — accessibility', () => {
    it('should pass automated a11y checks', async () => {
        const el = await fixture(html`
            <flint-navigation-menu>
                <flint-navigation-menu-list>
                    <flint-navigation-menu-item>
                        <flint-navigation-menu-trigger content-id="a11y-c1">Menu 1</flint-navigation-menu-trigger>
                        <flint-navigation-menu-content id="a11y-c1">
                            <flint-navigation-menu-link href="#">Item 1</flint-navigation-menu-link>
                        </flint-navigation-menu-content>
                    </flint-navigation-menu-item>
                    <flint-navigation-menu-item>
                        <flint-navigation-menu-link href="#">Link</flint-navigation-menu-link>
                    </flint-navigation-menu-item>
                </flint-navigation-menu-list>
            </flint-navigation-menu>
        `);
        await expectAccessible(el, { rules: { 'aria-required-children': { enabled: false }, 'aria-required-parent': { enabled: false } } });
    }, 15000);
});
