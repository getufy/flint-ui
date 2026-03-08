import { html } from 'lit';
import { expect, describe, it, vi } from 'vitest';
import { fixture } from '@open-wc/testing';
import './ui-navigation-menu.js';
import './ui-navigation-menu-list.js';
import './ui-navigation-menu-item.js';
import './ui-navigation-menu-trigger.js';
import './ui-navigation-menu-content.js';
import './ui-navigation-menu-link.js';
import type { UiNavigationMenu } from './ui-navigation-menu.js';
import type { UiNavigationMenuList } from './ui-navigation-menu-list.js';
import type { UiNavigationMenuItem } from './ui-navigation-menu-item.js';
import type { UiNavigationMenuTrigger } from './ui-navigation-menu-trigger.js';
import type { UiNavigationMenuContent } from './ui-navigation-menu-content.js';
import type { UiNavigationMenuLink } from './ui-navigation-menu-link.js';

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
    const menu = el as UiNavigationMenu;
    const [trigger1, trigger2] = Array.from(el.querySelectorAll('ui-navigation-menu-trigger')) as UiNavigationMenuTrigger[];
    const [content1, content2] = Array.from(el.querySelectorAll('ui-navigation-menu-content')) as UiNavigationMenuContent[];
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
        const el = await fixture(html`<ui-navigation-menu dir="rtl"></ui-navigation-menu>`);
        expect(el.getAttribute('dir')).toBe('rtl');
    });

    it('removes document pointerdown listener on disconnectedCallback', async () => {
        const el = await fixture(html`<ui-navigation-menu></ui-navigation-menu>`);
        const spy = vi.spyOn(document, 'removeEventListener');
        el.remove();
        expect(spy).toHaveBeenCalledWith('pointerdown', expect.any(Function));
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
        const item = el as UiNavigationMenuItem;
        const trigger = el.querySelector('ui-navigation-menu-trigger') as UiNavigationMenuTrigger;
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
        const item = el as UiNavigationMenuItem;
        const link = el.querySelector('ui-navigation-menu-link') as UiNavigationMenuLink;
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
        const trigger = el.querySelector('ui-navigation-menu-trigger') as UiNavigationMenuTrigger;
        const content = el.querySelector('ui-navigation-menu-content') as UiNavigationMenuContent;

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
        const trigger = el.querySelector('ui-navigation-menu-trigger') as UiNavigationMenuTrigger;
        const content = el.querySelector('ui-navigation-menu-content') as UiNavigationMenuContent;

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
        const trigger = el.querySelector('ui-navigation-menu-trigger') as UiNavigationMenuTrigger;
        const content = el.querySelector('ui-navigation-menu-content') as UiNavigationMenuContent;

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
        const trigger = el.querySelector('ui-navigation-menu-trigger') as UiNavigationMenuTrigger;
        const content = el.querySelector('ui-navigation-menu-content') as UiNavigationMenuContent;

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
        const trigger = el.querySelector('ui-navigation-menu-trigger') as UiNavigationMenuTrigger;
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
        const menu = el as UiNavigationMenu;
        const trigger = el.querySelector('ui-navigation-menu-trigger') as UiNavigationMenuTrigger;

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
        const content = el as UiNavigationMenuContent;
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
        const content = el.querySelector('ui-navigation-menu-content') as UiNavigationMenuContent;
        const spy = vi.fn();
        el.addEventListener('ui-navigation-menu-content-toggle', spy);

        content.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        await content.updateComplete;

        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail).toEqual({ contentId: 'test', open: false });
    });

    it('Tab key closes the menu', async () => {
        const el = await fixture(html`<ui-navigation-menu-content id="test" open>Content</ui-navigation-menu-content>`);
        const content = el as UiNavigationMenuContent;
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
        const content = el as UiNavigationMenuContent;
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
        const content = el as UiNavigationMenuContent;
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

    it('inactive link does not have aria-current attribute', async () => {
        const el = await fixture(html`<ui-navigation-menu-link href="/test">Link</ui-navigation-menu-link>`);
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
                <ui-navigation-menu-trigger content-id="test">Trigger</ui-navigation-menu-trigger>
                <ui-navigation-menu-content id="test">Content</ui-navigation-menu-content>
            </div>
        `);
        const trigger = el.querySelector('ui-navigation-menu-trigger') as UiNavigationMenuTrigger;
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

    it('link has aria-disabled="false" when not disabled', async () => {
        const el = await fixture(html`<ui-navigation-menu-link href="#">Link</ui-navigation-menu-link>`);
        const a = el.shadowRoot?.querySelector('a') as HTMLAnchorElement;
        expect(a.getAttribute('aria-disabled')).toBe('false');
    });

    it('link has aria-disabled="true" when disabled', async () => {
        const el = await fixture(html`<ui-navigation-menu-link href="#" disabled>Link</ui-navigation-menu-link>`);
        const a = el.shadowRoot?.querySelector('a') as HTMLAnchorElement;
        expect(a.getAttribute('aria-disabled')).toBe('true');
    });

    it('trigger host has no tabindex attribute', async () => {
        const el = await fixture(html`<ui-navigation-menu-trigger content-id="x">T</ui-navigation-menu-trigger>`);
        expect(el.hasAttribute('tabindex')).toBe(false);
    });
});

// ---------------------------------------------------------------------------
// ui-navigation-menu-item hover timers
// ---------------------------------------------------------------------------

describe('ui-navigation-menu-item hover timers', () => {
    it('opens content after openDelay on mouseenter', async () => {
        vi.useFakeTimers();
        const el = await fixture(html`
            <ui-navigation-menu>
                <ui-navigation-menu-list>
                    <ui-navigation-menu-item open-delay="100">
                        <ui-navigation-menu-trigger content-id="ht1">T</ui-navigation-menu-trigger>
                        <ui-navigation-menu-content id="ht1">C</ui-navigation-menu-content>
                    </ui-navigation-menu-item>
                </ui-navigation-menu-list>
            </ui-navigation-menu>
        `);
        const item = el.querySelector('ui-navigation-menu-item')!;
        const content = el.querySelector('ui-navigation-menu-content') as UiNavigationMenuContent;

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
            <ui-navigation-menu>
                <ui-navigation-menu-list>
                    <ui-navigation-menu-item open-delay="200">
                        <ui-navigation-menu-trigger content-id="ht2">T</ui-navigation-menu-trigger>
                        <ui-navigation-menu-content id="ht2">C</ui-navigation-menu-content>
                    </ui-navigation-menu-item>
                </ui-navigation-menu-list>
            </ui-navigation-menu>
        `);
        const item = el.querySelector('ui-navigation-menu-item')!;
        const content = el.querySelector('ui-navigation-menu-content') as UiNavigationMenuContent;

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
            <ui-navigation-menu>
                <ui-navigation-menu-list>
                    <ui-navigation-menu-item open-delay="0" close-delay="150">
                        <ui-navigation-menu-trigger content-id="ht3">T</ui-navigation-menu-trigger>
                        <ui-navigation-menu-content id="ht3">C</ui-navigation-menu-content>
                    </ui-navigation-menu-item>
                </ui-navigation-menu-list>
            </ui-navigation-menu>
        `);
        const item = el.querySelector('ui-navigation-menu-item')!;
        const content = el.querySelector('ui-navigation-menu-content') as UiNavigationMenuContent;

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
            <ui-navigation-menu>
                <ui-navigation-menu-list>
                    <ui-navigation-menu-item open-delay="0" close-delay="200">
                        <ui-navigation-menu-trigger content-id="ht4">T</ui-navigation-menu-trigger>
                        <ui-navigation-menu-content id="ht4">C</ui-navigation-menu-content>
                    </ui-navigation-menu-item>
                </ui-navigation-menu-list>
            </ui-navigation-menu>
        `);
        const item = el.querySelector('ui-navigation-menu-item')!;
        const content = el.querySelector('ui-navigation-menu-content') as UiNavigationMenuContent;

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
            <ui-navigation-menu>
                <ui-navigation-menu-list>
                    <ui-navigation-menu-item open-delay="100">
                        <ui-navigation-menu-trigger content-id="ht5">T</ui-navigation-menu-trigger>
                        <ui-navigation-menu-content id="ht5">C</ui-navigation-menu-content>
                    </ui-navigation-menu-item>
                </ui-navigation-menu-list>
            </ui-navigation-menu>
        `);
        const item = el.querySelector('ui-navigation-menu-item')!;
        const content = el.querySelector('ui-navigation-menu-content') as UiNavigationMenuContent;

        item.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        item.remove(); // disconnect before timer fires
        vi.advanceTimersByTime(200);
        await content.updateComplete;

        expect(content.open).toBe(false);
        vi.useRealTimers();
    });
});

// ---------------------------------------------------------------------------
// ui-navigation-menu-content keyboard Home/End
// ---------------------------------------------------------------------------

describe('ui-navigation-menu-content Home/End keys', () => {
    it('Home key focuses first item', async () => {
        const el = await fixture(html`
            <ui-navigation-menu-content id="he-test" open>
                <ui-navigation-menu-link href="#">A</ui-navigation-menu-link>
                <ui-navigation-menu-link href="#">B</ui-navigation-menu-link>
                <ui-navigation-menu-link href="#">C</ui-navigation-menu-link>
            </ui-navigation-menu-content>
        `);
        const content = el as UiNavigationMenuContent;
        const links = Array.from(el.querySelectorAll('ui-navigation-menu-link')) as HTMLElement[];
        links[2].focus();

        content.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
        await content.updateComplete;

        expect(el.ownerDocument.activeElement).toBe(links[0]);
    });

    it('End key focuses last item', async () => {
        const el = await fixture(html`
            <ui-navigation-menu-content id="he-test2" open>
                <ui-navigation-menu-link href="#">A</ui-navigation-menu-link>
                <ui-navigation-menu-link href="#">B</ui-navigation-menu-link>
                <ui-navigation-menu-link href="#">C</ui-navigation-menu-link>
            </ui-navigation-menu-content>
        `);
        const content = el as UiNavigationMenuContent;
        const links = Array.from(el.querySelectorAll('ui-navigation-menu-link')) as HTMLElement[];
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
            <ui-navigation-menu>
                <ui-navigation-menu-list>
                    <ui-navigation-menu-item>
                        <ui-navigation-menu-trigger content-id="col1">T</ui-navigation-menu-trigger>
                        <ui-navigation-menu-content id="col1">
                            <ui-navigation-menu-link href="#">Link</ui-navigation-menu-link>
                        </ui-navigation-menu-content>
                    </ui-navigation-menu-item>
                </ui-navigation-menu-list>
            </ui-navigation-menu>
        `);
        const menu = el as UiNavigationMenu;
        const content = el.querySelector('ui-navigation-menu-content') as UiNavigationMenuContent;
        const link = el.querySelector('ui-navigation-menu-link') as UiNavigationMenuLink;

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
// ui-navigation-menu _handleContentToggle branch coverage
// ---------------------------------------------------------------------------

describe('ui-navigation-menu content-toggle edge cases', () => {
    it('close event for non-active content does not clear openContentId', async () => {
        const { menu, content1 } = await makeMenu();
        menu.openContent('c1');
        await content1.updateComplete;
        expect(menu.openContentId).toBe('c1');

        // Fire a close event for c2 (which is not the currently open content)
        menu.dispatchEvent(
            new CustomEvent('ui-navigation-menu-content-toggle', {
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
            new CustomEvent('ui-navigation-menu-content-toggle', {
                detail: { contentId: 'c1', open: false },
                bubbles: false,
            })
        );
        expect(menu.openContentId).toBeNull();
    });
});

// ---------------------------------------------------------------------------
// ui-navigation-menu-content _focusTrigger branch coverage
// ---------------------------------------------------------------------------

describe('ui-navigation-menu-content _focusTrigger', () => {
    it('Escape inside full menu calls focus on the trigger via menu-level search', async () => {
        const el = await fixture(html`
            <ui-navigation-menu>
                <ui-navigation-menu-list>
                    <ui-navigation-menu-item>
                        <ui-navigation-menu-trigger content-id="esc-full">T</ui-navigation-menu-trigger>
                        <ui-navigation-menu-content id="esc-full" open>Content</ui-navigation-menu-content>
                    </ui-navigation-menu-item>
                </ui-navigation-menu-list>
            </ui-navigation-menu>
        `);
        const trigger = el.querySelector('ui-navigation-menu-trigger') as HTMLElement;
        const content = el.querySelector('ui-navigation-menu-content') as UiNavigationMenuContent;
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
            <ui-navigation-menu>
                <ui-navigation-menu-content id="esc-no-trigger" open>Content</ui-navigation-menu-content>
            </ui-navigation-menu>
        `);
        const content = el.querySelector('ui-navigation-menu-content') as UiNavigationMenuContent;

        // Should not throw even with no matching trigger
        content.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        await content.updateComplete;

        expect(content.open).toBe(false);
    });

    it('ArrowDown with no items does not throw', async () => {
        const el = await fixture(html`
            <ui-navigation-menu-content id="empty-down" open></ui-navigation-menu-content>
        `);
        const content = el as UiNavigationMenuContent;
        // No items — should not throw
        content.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await content.updateComplete;
        expect(true).toBe(true);
    });

    it('ArrowUp with no items does not throw', async () => {
        const el = await fixture(html`
            <ui-navigation-menu-content id="empty-up" open></ui-navigation-menu-content>
        `);
        const content = el as UiNavigationMenuContent;
        // No items — should not throw
        content.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        await content.updateComplete;
        expect(true).toBe(true);
    });
});

// ---------------------------------------------------------------------------
// ui-navigation-menu-item edge cases
// ---------------------------------------------------------------------------

describe('ui-navigation-menu-item _openContent edge cases', () => {
    it('mouseenter on disabled item does not open content', async () => {
        vi.useFakeTimers();
        const el = await fixture(html`
            <ui-navigation-menu>
                <ui-navigation-menu-list>
                    <ui-navigation-menu-item disabled open-delay="100">
                        <ui-navigation-menu-trigger content-id="dis-ht">T</ui-navigation-menu-trigger>
                        <ui-navigation-menu-content id="dis-ht">C</ui-navigation-menu-content>
                    </ui-navigation-menu-item>
                </ui-navigation-menu-list>
            </ui-navigation-menu>
        `);
        const item = el.querySelector('ui-navigation-menu-item')!;
        const content = el.querySelector('ui-navigation-menu-content') as UiNavigationMenuContent;

        item.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        vi.advanceTimersByTime(200);
        await content.updateComplete;

        expect(content.open).toBe(false);
        vi.useRealTimers();
    });

    it('_openContent with disabled trigger returns early without opening', async () => {
        vi.useFakeTimers();
        const el = await fixture(html`
            <ui-navigation-menu>
                <ui-navigation-menu-list>
                    <ui-navigation-menu-item open-delay="100">
                        <ui-navigation-menu-trigger content-id="dis-tr">T</ui-navigation-menu-trigger>
                        <ui-navigation-menu-content id="dis-tr">C</ui-navigation-menu-content>
                    </ui-navigation-menu-item>
                </ui-navigation-menu-list>
            </ui-navigation-menu>
        `);
        const item = el.querySelector('ui-navigation-menu-item')!;
        const trigger = el.querySelector('ui-navigation-menu-trigger') as UiNavigationMenuTrigger;
        const content = el.querySelector('ui-navigation-menu-content') as UiNavigationMenuContent;

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
            <ui-navigation-menu>
                <ui-navigation-menu-list>
                    <ui-navigation-menu-item open-delay="0">
                        <ui-navigation-menu-trigger>T</ui-navigation-menu-trigger>
                        <ui-navigation-menu-content id="no-cid-c">C</ui-navigation-menu-content>
                    </ui-navigation-menu-item>
                </ui-navigation-menu-list>
            </ui-navigation-menu>
        `);
        const item = el.querySelector('ui-navigation-menu-item')!;
        const content = el.querySelector('ui-navigation-menu-content') as UiNavigationMenuContent;

        item.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        vi.advanceTimersByTime(0);
        await content.updateComplete;

        expect(content.open).toBe(false);
        vi.useRealTimers();
    });

    it('_openContent when content element not found returns early', async () => {
        vi.useFakeTimers();
        const el = await fixture(html`
            <ui-navigation-menu>
                <ui-navigation-menu-list>
                    <ui-navigation-menu-item open-delay="0">
                        <ui-navigation-menu-trigger content-id="non-existent">T</ui-navigation-menu-trigger>
                    </ui-navigation-menu-item>
                </ui-navigation-menu-list>
            </ui-navigation-menu>
        `);
        const item = el.querySelector('ui-navigation-menu-item')!;

        // Should not throw
        item.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        vi.advanceTimersByTime(0);

        expect(true).toBe(true);
        vi.useRealTimers();
    });

    it('_closeContent when content is already closed is a no-op', async () => {
        vi.useFakeTimers();
        const el = await fixture(html`
            <ui-navigation-menu>
                <ui-navigation-menu-list>
                    <ui-navigation-menu-item open-delay="0" close-delay="50">
                        <ui-navigation-menu-trigger content-id="cc-noop">T</ui-navigation-menu-trigger>
                        <ui-navigation-menu-content id="cc-noop">C</ui-navigation-menu-content>
                    </ui-navigation-menu-item>
                </ui-navigation-menu-list>
            </ui-navigation-menu>
        `);
        const item = el.querySelector('ui-navigation-menu-item')!;
        const content = el.querySelector('ui-navigation-menu-content') as UiNavigationMenuContent;

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
            <ui-navigation-menu-item>
                <ui-navigation-menu-trigger content-id="outer-oc">Outer</ui-navigation-menu-trigger>
                <ui-navigation-menu-content id="outer-oc">
                    <ui-navigation-menu-item>
                        <ui-navigation-menu-trigger content-id="inner-ic">Inner</ui-navigation-menu-trigger>
                        <ui-navigation-menu-content id="inner-ic">Inner Content</ui-navigation-menu-content>
                    </ui-navigation-menu-item>
                </ui-navigation-menu-content>
            </ui-navigation-menu-item>
        `) as UiNavigationMenuItem;

        const triggers = Array.from(el.querySelectorAll('ui-navigation-menu-trigger')) as UiNavigationMenuTrigger[];
        const outerTrigger = triggers[0];
        const innerTrigger = triggers[1];

        el.disabled = true;
        await el.updateComplete;

        expect(outerTrigger.disabled).toBe(true);
        expect(innerTrigger.disabled).toBe(false); // inner trigger not affected
    });
});

// ---------------------------------------------------------------------------
// ui-navigation-menu-link event handling
// ---------------------------------------------------------------------------

describe('ui-navigation-menu-link event handling', () => {
    it('click on disabled link calls preventDefault', async () => {
        const el = await fixture(html`<ui-navigation-menu-link href="/test" disabled>Link</ui-navigation-menu-link>`);
        const link = el as UiNavigationMenuLink;

        const event = new MouseEvent('click', { bubbles: true, cancelable: true });
        const preventSpy = vi.spyOn(event, 'preventDefault');
        link.dispatchEvent(event);

        expect(preventSpy).toHaveBeenCalledOnce();
    });

    it('Enter key on link triggers anchor click', async () => {
        const el = await fixture(html`<ui-navigation-menu-link href="#">Link</ui-navigation-menu-link>`) as UiNavigationMenuLink;
        await el.updateComplete;
        const a = el.shadowRoot!.querySelector('a') as HTMLAnchorElement;
        const clickSpy = vi.spyOn(a, 'click');

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await el.updateComplete;

        expect(clickSpy).toHaveBeenCalledOnce();
        clickSpy.mockRestore();
    });

    it('Space key on link triggers anchor click', async () => {
        const el = await fixture(html`<ui-navigation-menu-link href="#">Link</ui-navigation-menu-link>`) as UiNavigationMenuLink;
        await el.updateComplete;
        const a = el.shadowRoot!.querySelector('a') as HTMLAnchorElement;
        const clickSpy = vi.spyOn(a, 'click');

        el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
        await el.updateComplete;

        expect(clickSpy).toHaveBeenCalledOnce();
        clickSpy.mockRestore();
    });

    it('Enter key on disabled link does not trigger anchor click', async () => {
        const el = await fixture(html`<ui-navigation-menu-link href="#" disabled>Link</ui-navigation-menu-link>`) as UiNavigationMenuLink;
        await el.updateComplete;
        const a = el.shadowRoot!.querySelector('a') as HTMLAnchorElement;
        const clickSpy = vi.spyOn(a, 'click');

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await el.updateComplete;

        expect(clickSpy).not.toHaveBeenCalled();
        clickSpy.mockRestore();
    });

    it('other keydown keys are ignored without crashing', async () => {
        const el = await fixture(html`<ui-navigation-menu-link href="#">Link</ui-navigation-menu-link>`) as UiNavigationMenuLink;
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        await el.updateComplete;
        expect(true).toBe(true);
    });

    it('focus() delegates to the inner anchor element', async () => {
        const el = await fixture(html`<ui-navigation-menu-link href="/test">Link</ui-navigation-menu-link>`) as UiNavigationMenuLink;
        await el.updateComplete;
        const a = el.shadowRoot!.querySelector('a') as HTMLElement;
        const focusSpy = vi.spyOn(a, 'focus');

        el.focus();

        expect(focusSpy).toHaveBeenCalledOnce();
        focusSpy.mockRestore();
    });

    it('click without parent menu does not throw', async () => {
        const el = await fixture(html`<ui-navigation-menu-link href="#">Link</ui-navigation-menu-link>`) as UiNavigationMenuLink;
        // No parent ui-navigation-menu — click should not throw
        el.click();
        await el.updateComplete;
        expect(true).toBe(true);
    });
});

// ---------------------------------------------------------------------------
// ui-navigation-menu-list prop updates
// ---------------------------------------------------------------------------

describe('ui-navigation-menu-list prop updates', () => {
    it('changing direction prop updates flex direction style', async () => {
        const el = await fixture(html`<ui-navigation-menu-list></ui-navigation-menu-list>`) as UiNavigationMenuList;
        // Change direction without changing gap — exercises the direction branch of willUpdate
        el.direction = 'column';
        await el.updateComplete;
        expect(el.style.getPropertyValue('--ui-navigation-menu-list-direction')).toBe('column');
    });

    it('changing gap prop updates gap style', async () => {
        const el = await fixture(html`<ui-navigation-menu-list></ui-navigation-menu-list>`) as UiNavigationMenuList;
        el.gap = 24;
        await el.updateComplete;
        expect(el.style.getPropertyValue('--ui-navigation-menu-list-gap')).toBe('24px');
    });
});

// ---------------------------------------------------------------------------
// ui-navigation-menu-trigger _getContent and _focusFirstContentItem
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// ui-navigation-menu pointerdown inside menu
// ---------------------------------------------------------------------------

describe('ui-navigation-menu openContent edge cases', () => {
    it('openContent() with non-existent id sets openContentId but does not crash', async () => {
        const { menu } = await makeMenu();
        // No content element with this id — if (content) branch is false
        menu.openContent('no-such-id');
        expect(menu.openContentId).toBe('no-such-id');
    });
});

describe('ui-navigation-menu pointerdown handling', () => {
    it('pointerdown inside the menu does not close content', async () => {
        const { menu, content1 } = await makeMenu();
        menu.openContent('c1');
        await content1.updateComplete;
        expect(menu.openContentId).toBe('c1');

        // Dispatch pointerdown inside the menu — should NOT close
        const trigger1 = menu.querySelector('ui-navigation-menu-trigger') as HTMLElement;
        trigger1.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
        await content1.updateComplete;

        expect(menu.openContentId).toBe('c1');
        expect(content1.open).toBe(true);
    });
});

// ---------------------------------------------------------------------------
// ui-navigation-menu-content Arrow/Home/End edge cases
// ---------------------------------------------------------------------------

describe('ui-navigation-menu-content keyboard edge cases', () => {
    it('ArrowDown from non-last item moves to next (no wrap)', async () => {
        const el = await fixture(html`
            <ui-navigation-menu-content id="nd-next" open>
                <ui-navigation-menu-link href="#">A</ui-navigation-menu-link>
                <ui-navigation-menu-link href="#">B</ui-navigation-menu-link>
                <ui-navigation-menu-link href="#">C</ui-navigation-menu-link>
            </ui-navigation-menu-content>
        `);
        const content = el as UiNavigationMenuContent;
        const links = Array.from(el.querySelectorAll('ui-navigation-menu-link')) as HTMLElement[];
        links[0].focus(); // focus first item

        content.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await content.updateComplete;

        expect(el.ownerDocument.activeElement).toBe(links[1]); // moved to second (no wrap)
    });

    it('ArrowUp from non-first item moves to previous (no wrap)', async () => {
        const el = await fixture(html`
            <ui-navigation-menu-content id="nd-prev" open>
                <ui-navigation-menu-link href="#">A</ui-navigation-menu-link>
                <ui-navigation-menu-link href="#">B</ui-navigation-menu-link>
                <ui-navigation-menu-link href="#">C</ui-navigation-menu-link>
            </ui-navigation-menu-content>
        `);
        const content = el as UiNavigationMenuContent;
        const links = Array.from(el.querySelectorAll('ui-navigation-menu-link')) as HTMLElement[];
        links[2].focus(); // focus last item

        content.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        await content.updateComplete;

        expect(el.ownerDocument.activeElement).toBe(links[1]); // moved to second (no wrap)
    });

    it('Home key with empty items does not throw', async () => {
        const el = await fixture(html`<ui-navigation-menu-content id="empty-home" open></ui-navigation-menu-content>`);
        const content = el as UiNavigationMenuContent;
        content.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
        await content.updateComplete;
        expect(true).toBe(true);
    });

    it('End key with empty items does not throw', async () => {
        const el = await fixture(html`<ui-navigation-menu-content id="empty-end" open></ui-navigation-menu-content>`);
        const content = el as UiNavigationMenuContent;
        content.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
        await content.updateComplete;
        expect(true).toBe(true);
    });
});

// ---------------------------------------------------------------------------
// ui-navigation-menu-item additional edge cases
// ---------------------------------------------------------------------------

describe('ui-navigation-menu-item additional edge cases', () => {
    it('updated() with non-disabled prop change does not break', async () => {
        const el = await fixture(html`<ui-navigation-menu-item item-id="orig">Item</ui-navigation-menu-item>`) as UiNavigationMenuItem;
        // Change itemId (not disabled) — updated() is called but disabled branch is skipped
        el.itemId = 'changed';
        await el.updateComplete;
        expect(el.itemId).toBe('changed');
    });

    it('_closeContent when item has no trigger is a no-op', async () => {
        vi.useFakeTimers();
        const el = await fixture(html`
            <ui-navigation-menu-item close-delay="0">
                <p>No trigger here</p>
            </ui-navigation-menu-item>
        `) as UiNavigationMenuItem;

        el.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        vi.advanceTimersByTime(0);

        expect(true).toBe(true); // no crash
        vi.useRealTimers();
    });

    it('_closeContent when trigger has no contentId is a no-op', async () => {
        vi.useFakeTimers();
        const el = await fixture(html`
            <ui-navigation-menu-item close-delay="0">
                <ui-navigation-menu-trigger>T (no content-id)</ui-navigation-menu-trigger>
            </ui-navigation-menu-item>
        `) as UiNavigationMenuItem;

        el.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        vi.advanceTimersByTime(0);

        expect(true).toBe(true); // no crash
        vi.useRealTimers();
    });

    it('_syncChildren skips links belonging to a nested item', async () => {
        const el = await fixture(html`
            <ui-navigation-menu-item>
                <ui-navigation-menu-link href="#">Outer Link</ui-navigation-menu-link>
                <ui-navigation-menu-item>
                    <ui-navigation-menu-link href="#">Inner Link</ui-navigation-menu-link>
                </ui-navigation-menu-item>
            </ui-navigation-menu-item>
        `) as UiNavigationMenuItem;

        const links = Array.from(el.querySelectorAll('ui-navigation-menu-link')) as UiNavigationMenuLink[];
        const outerLink = links[0];
        const innerLink = links[1];

        el.disabled = true;
        await el.updateComplete;

        expect(outerLink.disabled).toBe(true);
        expect(innerLink.disabled).toBe(false); // inner link not affected
    });
});

// ---------------------------------------------------------------------------
// ui-navigation-menu-link disconnectedCallback
// ---------------------------------------------------------------------------

describe('ui-navigation-menu-link disconnectedCallback', () => {
    it('removes event listeners on disconnect', async () => {
        const el = await fixture(html`<ui-navigation-menu-link href="#">Link</ui-navigation-menu-link>`) as UiNavigationMenuLink;
        const removeSpy = vi.spyOn(el, 'removeEventListener');
        el.remove();
        expect(removeSpy).toHaveBeenCalledWith('click', expect.any(Function));
        expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
        removeSpy.mockRestore();
    });
});

// ---------------------------------------------------------------------------
// ui-navigation-menu-list willUpdate branch
// ---------------------------------------------------------------------------

describe('ui-navigation-menu-list willUpdate branch', () => {
    it('willUpdate with unrelated prop change (ariaLabel) does not call _updateStyles', async () => {
        const el = await fixture(html`<ui-navigation-menu-list></ui-navigation-menu-list>`) as UiNavigationMenuList;
        const initialGap = el.style.getPropertyValue('--ui-navigation-menu-list-gap');
        // Change ariaLabel (not gap/direction) — exercises the false-false branch of willUpdate condition
        el.ariaLabel = 'Updated navigation';
        await el.updateComplete;
        // Gap style should remain unchanged
        expect(el.style.getPropertyValue('--ui-navigation-menu-list-gap')).toBe(initialGap);
        expect(el.ariaLabel).toBe('Updated navigation');
    });
});

// ---------------------------------------------------------------------------
// ui-navigation-menu-trigger _handleClick disabled branch
// ---------------------------------------------------------------------------

describe('ui-navigation-menu-trigger _handleClick disabled', () => {
    it('clicking the host of a disabled trigger does not open content', async () => {
        const el = await fixture(html`
            <div>
                <ui-navigation-menu-trigger content-id="dc1" disabled>T</ui-navigation-menu-trigger>
                <ui-navigation-menu-content id="dc1">C</ui-navigation-menu-content>
            </div>
        `);
        const trigger = el.querySelector('ui-navigation-menu-trigger') as UiNavigationMenuTrigger;
        const content = el.querySelector('ui-navigation-menu-content') as UiNavigationMenuContent;

        // Programmatic click on the host fires _handleClick; disabled → returns early
        trigger.click();
        await trigger.updateComplete;

        expect(content.open).toBe(false);
    });
});

describe('ui-navigation-menu-trigger _getContent edge cases', () => {
    it('ArrowDown focuses first [role="menuitem"] element in content', async () => {
        const el = await fixture(html`
            <div>
                <ui-navigation-menu-trigger content-id="ad1">T</ui-navigation-menu-trigger>
                <ui-navigation-menu-content id="ad1" open>
                    <button role="menuitem">First Item</button>
                </ui-navigation-menu-content>
            </div>
        `);
        const trigger = el.querySelector('ui-navigation-menu-trigger') as UiNavigationMenuTrigger;
        const button = el.querySelector('[role="menuitem"]') as HTMLElement;

        trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await trigger.updateComplete;

        expect(el.ownerDocument.activeElement).toBe(button);
    });

    it('ArrowDown with no [role="menuitem"] in content does not throw', async () => {
        const el = await fixture(html`
            <div>
                <ui-navigation-menu-trigger content-id="ad2">T</ui-navigation-menu-trigger>
                <ui-navigation-menu-content id="ad2" open>
                    <p>No menuitem</p>
                </ui-navigation-menu-content>
            </div>
        `);
        const trigger = el.querySelector('ui-navigation-menu-trigger') as UiNavigationMenuTrigger;

        trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await trigger.updateComplete;

        expect(true).toBe(true); // no crash
    });

    it('ArrowDown with no contentId does not throw', async () => {
        const el = await fixture(html`<ui-navigation-menu-trigger>T</ui-navigation-menu-trigger>`);
        const trigger = el as UiNavigationMenuTrigger;

        trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await trigger.updateComplete;

        expect(true).toBe(true); // no crash
    });

    it('disabled trigger ignores all keydown events', async () => {
        const el = await fixture(html`
            <div>
                <ui-navigation-menu-trigger content-id="dk1" disabled>T</ui-navigation-menu-trigger>
                <ui-navigation-menu-content id="dk1">C</ui-navigation-menu-content>
            </div>
        `);
        const trigger = el.querySelector('ui-navigation-menu-trigger') as UiNavigationMenuTrigger;
        const content = el.querySelector('ui-navigation-menu-content') as UiNavigationMenuContent;

        trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        trigger.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
        trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await trigger.updateComplete;

        expect(content.open).toBe(false);
    });

    it('_getContent returns null when contentId is empty', async () => {
        const el = await fixture(html`<ui-navigation-menu-trigger>T</ui-navigation-menu-trigger>`);
        const trigger = el as UiNavigationMenuTrigger;

        // Clicking a trigger with no contentId should not crash (content is null)
        trigger.click();
        await trigger.updateComplete;

        expect(true).toBe(true);
    });

    it('_getContent finds content at menu level (outside the item)', async () => {
        // Content is at menu level, not inside the item — triggers menu-level fallback
        const el = await fixture(html`
            <ui-navigation-menu>
                <ui-navigation-menu-item>
                    <ui-navigation-menu-trigger content-id="menu-lvl">T</ui-navigation-menu-trigger>
                </ui-navigation-menu-item>
                <ui-navigation-menu-content id="menu-lvl">Menu-level content</ui-navigation-menu-content>
            </ui-navigation-menu>
        `);
        const trigger = el.querySelector('ui-navigation-menu-trigger') as UiNavigationMenuTrigger;
        const content = el.querySelector('ui-navigation-menu-content') as UiNavigationMenuContent;

        trigger.click();
        await trigger.updateComplete;

        expect(content.open).toBe(true);
    });

    it('_getContent finds content via parent element fallback (no item or menu wrapper)', async () => {
        // Trigger in a plain div with content sibling — exercises parent-element fallback
        const el = await fixture(html`
            <div>
                <ui-navigation-menu-trigger content-id="parent-fb">T</ui-navigation-menu-trigger>
                <ui-navigation-menu-content id="parent-fb">Content</ui-navigation-menu-content>
            </div>
        `);
        const trigger = el.querySelector('ui-navigation-menu-trigger') as UiNavigationMenuTrigger;
        const content = el.querySelector('ui-navigation-menu-content') as UiNavigationMenuContent;

        trigger.click();
        await trigger.updateComplete;

        expect(content.open).toBe(true);
    });

    it('contentId change causes trigger to observe new content element', async () => {
        const el = await fixture(html`
            <div>
                <ui-navigation-menu-trigger content-id="obs-1">T</ui-navigation-menu-trigger>
                <ui-navigation-menu-content id="obs-1">C1</ui-navigation-menu-content>
                <ui-navigation-menu-content id="obs-2">C2</ui-navigation-menu-content>
            </div>
        `);
        const trigger = el.querySelector('ui-navigation-menu-trigger') as UiNavigationMenuTrigger;
        const content2 = el.querySelector('#obs-2') as UiNavigationMenuContent;

        // Change contentId to point to content2
        trigger.contentId = 'obs-2';
        await trigger.updateComplete;

        trigger.click();
        await trigger.updateComplete;

        expect(content2.open).toBe(true);
    });
});
