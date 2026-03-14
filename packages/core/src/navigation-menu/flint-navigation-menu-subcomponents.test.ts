import { html } from 'lit';
import { expect, describe, it, vi } from 'vitest';
import { fixture } from '@open-wc/testing';
import './flint-navigation-menu.js';
import './flint-navigation-menu-list.js';
import './flint-navigation-menu-item.js';
import './flint-navigation-menu-trigger.js';
import './flint-navigation-menu-content.js';
import './flint-navigation-menu-link.js';
import type { FlintNavigationMenuList } from './flint-navigation-menu-list.js';
import type { FlintNavigationMenuItem } from './flint-navigation-menu-item.js';
import type { FlintNavigationMenuTrigger } from './flint-navigation-menu-trigger.js';
import type { FlintNavigationMenuContent } from './flint-navigation-menu-content.js';
import type { FlintNavigationMenuLink } from './flint-navigation-menu-link.js';

// ---------------------------------------------------------------------------
// flint-navigation-menu-list
// ---------------------------------------------------------------------------

describe('flint-navigation-menu-list', () => {
    it('renders and creates a shadow root', async () => {
        const el = await fixture<FlintNavigationMenuList>(
            html`<flint-navigation-menu-list></flint-navigation-menu-list>`
        );
        expect(el.shadowRoot).toBeTruthy();
    });

    it('projects slot content', async () => {
        const el = await fixture<FlintNavigationMenuList>(html`
            <flint-navigation-menu-list>
                <flint-navigation-menu-item></flint-navigation-menu-item>
            </flint-navigation-menu-list>
        `);
        const item = el.querySelector('flint-navigation-menu-item');
        expect(item).toBeTruthy();
    });

    it('renders a nav with role="menubar"', async () => {
        const el = await fixture<FlintNavigationMenuList>(
            html`<flint-navigation-menu-list></flint-navigation-menu-list>`
        );
        const nav = el.shadowRoot!.querySelector('nav');
        expect(nav).toBeTruthy();
        expect(nav!.getAttribute('role')).toBe('menubar');
    });

    it('uses default aria-label "Main navigation"', async () => {
        const el = await fixture<FlintNavigationMenuList>(
            html`<flint-navigation-menu-list></flint-navigation-menu-list>`
        );
        const nav = el.shadowRoot!.querySelector('nav');
        expect(nav!.getAttribute('aria-label')).toBe('Main navigation');
    });

    it('respects custom aria-label', async () => {
        const el = await fixture<FlintNavigationMenuList>(
            html`<flint-navigation-menu-list aria-label="Footer links"></flint-navigation-menu-list>`
        );
        const nav = el.shadowRoot!.querySelector('nav');
        expect(nav!.getAttribute('aria-label')).toBe('Footer links');
    });

    it('defaults gap to 4 and direction to row', async () => {
        const el = await fixture<FlintNavigationMenuList>(
            html`<flint-navigation-menu-list></flint-navigation-menu-list>`
        );
        expect(el.gap).toBe(4);
        expect(el.direction).toBe('row');
    });

    it('updates gap CSS custom property when gap changes', async () => {
        const el = await fixture<FlintNavigationMenuList>(
            html`<flint-navigation-menu-list .gap=${16}></flint-navigation-menu-list>`
        );
        await el.updateComplete;
        expect(el.style.getPropertyValue('--flint-navigation-menu-list-gap')).toBe('16px');
    });

    it('updates direction CSS custom property when direction changes', async () => {
        const el = await fixture<FlintNavigationMenuList>(
            html`<flint-navigation-menu-list .direction=${'column'}></flint-navigation-menu-list>`
        );
        await el.updateComplete;
        expect(el.style.getPropertyValue('--flint-navigation-menu-list-direction')).toBe('column');
    });

    it('sets align to stretch when direction is column', async () => {
        const el = await fixture<FlintNavigationMenuList>(
            html`<flint-navigation-menu-list .direction=${'column'}></flint-navigation-menu-list>`
        );
        await el.updateComplete;
        expect(el.style.getPropertyValue('--flint-navigation-menu-list-align')).toBe('stretch');
    });

    it('sets align to center when direction is row', async () => {
        const el = await fixture<FlintNavigationMenuList>(
            html`<flint-navigation-menu-list .direction=${'row'}></flint-navigation-menu-list>`
        );
        await el.updateComplete;
        expect(el.style.getPropertyValue('--flint-navigation-menu-list-align')).toBe('center');
    });
});

// ---------------------------------------------------------------------------
// flint-navigation-menu-item
// ---------------------------------------------------------------------------

describe('flint-navigation-menu-item', () => {
    it('renders and creates a shadow root', async () => {
        const el = await fixture<FlintNavigationMenuItem>(
            html`<flint-navigation-menu-item></flint-navigation-menu-item>`
        );
        expect(el.shadowRoot).toBeTruthy();
    });

    it('projects slot content', async () => {
        const el = await fixture<FlintNavigationMenuItem>(html`
            <flint-navigation-menu-item>
                <span class="child">Hello</span>
            </flint-navigation-menu-item>
        `);
        const child = el.querySelector('.child');
        expect(child).toBeTruthy();
        expect(child!.textContent).toBe('Hello');
    });

    it('renders a div with role="none"', async () => {
        const el = await fixture<FlintNavigationMenuItem>(
            html`<flint-navigation-menu-item></flint-navigation-menu-item>`
        );
        const div = el.shadowRoot!.querySelector('.item');
        expect(div).toBeTruthy();
        expect(div!.getAttribute('role')).toBe('none');
    });

    it('exposes the root part', async () => {
        const el = await fixture<FlintNavigationMenuItem>(
            html`<flint-navigation-menu-item></flint-navigation-menu-item>`
        );
        const root = el.shadowRoot!.querySelector('[part="root"]');
        expect(root).toBeTruthy();
    });

    it('defaults disabled to false', async () => {
        const el = await fixture<FlintNavigationMenuItem>(
            html`<flint-navigation-menu-item></flint-navigation-menu-item>`
        );
        expect(el.disabled).toBe(false);
    });

    it('reflects disabled attribute', async () => {
        const el = await fixture<FlintNavigationMenuItem>(
            html`<flint-navigation-menu-item ?disabled=${true}></flint-navigation-menu-item>`
        );
        await el.updateComplete;
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('defaults itemId to empty string', async () => {
        const el = await fixture<FlintNavigationMenuItem>(
            html`<flint-navigation-menu-item></flint-navigation-menu-item>`
        );
        expect(el.itemId).toBe('');
    });

    it('accepts custom itemId', async () => {
        const el = await fixture<FlintNavigationMenuItem>(
            html`<flint-navigation-menu-item .itemId=${'my-item'}></flint-navigation-menu-item>`
        );
        expect(el.itemId).toBe('my-item');
    });

    it('defaults openDelay to 100 and closeDelay to 150', async () => {
        const el = await fixture<FlintNavigationMenuItem>(
            html`<flint-navigation-menu-item></flint-navigation-menu-item>`
        );
        expect(el.openDelay).toBe(100);
        expect(el.closeDelay).toBe(150);
    });

    it('accepts custom open-delay and close-delay', async () => {
        const el = await fixture<FlintNavigationMenuItem>(
            html`<flint-navigation-menu-item open-delay="200" close-delay="300"></flint-navigation-menu-item>`
        );
        expect(el.openDelay).toBe(200);
        expect(el.closeDelay).toBe(300);
    });

    it('propagates disabled to child triggers', async () => {
        const el = await fixture<FlintNavigationMenuItem>(html`
            <flint-navigation-menu-item ?disabled=${true}>
                <flint-navigation-menu-trigger content-id="x">T</flint-navigation-menu-trigger>
            </flint-navigation-menu-item>
        `);
        await el.updateComplete;
        const trigger = el.querySelector('flint-navigation-menu-trigger') as FlintNavigationMenuTrigger;
        expect(trigger.disabled).toBe(true);
    });

    it('propagates disabled to child links', async () => {
        const el = await fixture<FlintNavigationMenuItem>(html`
            <flint-navigation-menu-item ?disabled=${true}>
                <flint-navigation-menu-link href="#">Link</flint-navigation-menu-link>
            </flint-navigation-menu-item>
        `);
        await el.updateComplete;
        const link = el.querySelector('flint-navigation-menu-link') as FlintNavigationMenuLink;
        expect(link.disabled).toBe(true);
    });
});

// ---------------------------------------------------------------------------
// flint-navigation-menu-trigger
// ---------------------------------------------------------------------------

describe('flint-navigation-menu-trigger', () => {
    it('renders and creates a shadow root', async () => {
        const el = await fixture<FlintNavigationMenuTrigger>(
            html`<flint-navigation-menu-trigger></flint-navigation-menu-trigger>`
        );
        expect(el.shadowRoot).toBeTruthy();
    });

    it('projects slot content into the button', async () => {
        const el = await fixture<FlintNavigationMenuTrigger>(
            html`<flint-navigation-menu-trigger>Click me</flint-navigation-menu-trigger>`
        );
        const slot = el.shadowRoot!.querySelector('slot');
        expect(slot).toBeTruthy();
    });

    it('renders a button element', async () => {
        const el = await fixture<FlintNavigationMenuTrigger>(
            html`<flint-navigation-menu-trigger>Trigger</flint-navigation-menu-trigger>`
        );
        const btn = el.shadowRoot!.querySelector('button');
        expect(btn).toBeTruthy();
    });

    it('exposes button and icon parts', async () => {
        const el = await fixture<FlintNavigationMenuTrigger>(
            html`<flint-navigation-menu-trigger>Trigger</flint-navigation-menu-trigger>`
        );
        expect(el.shadowRoot!.querySelector('[part="button"]')).toBeTruthy();
        expect(el.shadowRoot!.querySelector('[part="icon"]')).toBeTruthy();
    });

    it('defaults contentId to empty string', async () => {
        const el = await fixture<FlintNavigationMenuTrigger>(
            html`<flint-navigation-menu-trigger></flint-navigation-menu-trigger>`
        );
        expect(el.contentId).toBe('');
    });

    it('reflects content-id attribute', async () => {
        const el = await fixture<FlintNavigationMenuTrigger>(
            html`<flint-navigation-menu-trigger content-id="panel1"></flint-navigation-menu-trigger>`
        );
        await el.updateComplete;
        expect(el.contentId).toBe('panel1');
        expect(el.getAttribute('content-id')).toBe('panel1');
    });

    it('defaults disabled to false', async () => {
        const el = await fixture<FlintNavigationMenuTrigger>(
            html`<flint-navigation-menu-trigger></flint-navigation-menu-trigger>`
        );
        expect(el.disabled).toBe(false);
    });

    it('reflects disabled attribute and disables the button', async () => {
        const el = await fixture<FlintNavigationMenuTrigger>(
            html`<flint-navigation-menu-trigger ?disabled=${true}></flint-navigation-menu-trigger>`
        );
        await el.updateComplete;
        expect(el.hasAttribute('disabled')).toBe(true);
        const btn = el.shadowRoot!.querySelector('button');
        expect(btn!.disabled).toBe(true);
    });

    it('sets aria-haspopup="true" on the button', async () => {
        const el = await fixture<FlintNavigationMenuTrigger>(
            html`<flint-navigation-menu-trigger></flint-navigation-menu-trigger>`
        );
        const btn = el.shadowRoot!.querySelector('button');
        expect(btn!.getAttribute('aria-haspopup')).toBe('true');
    });

    it('sets aria-expanded to false initially', async () => {
        const el = await fixture<FlintNavigationMenuTrigger>(
            html`<flint-navigation-menu-trigger></flint-navigation-menu-trigger>`
        );
        const btn = el.shadowRoot!.querySelector('button');
        expect(btn!.getAttribute('aria-expanded')).toBe('false');
    });

    it('sets aria-controls to match contentId', async () => {
        const el = await fixture<FlintNavigationMenuTrigger>(
            html`<flint-navigation-menu-trigger content-id="my-panel"></flint-navigation-menu-trigger>`
        );
        const btn = el.shadowRoot!.querySelector('button');
        expect(btn!.getAttribute('aria-controls')).toBe('my-panel');
    });

    it('fires flint-navigation-menu-trigger-click on click', async () => {
        const el = await fixture<FlintNavigationMenuTrigger>(html`
            <div>
                <flint-navigation-menu-trigger content-id="c">Label</flint-navigation-menu-trigger>
                <flint-navigation-menu-content id="c"></flint-navigation-menu-content>
            </div>
        `);
        const trigger = el.querySelector('flint-navigation-menu-trigger') as FlintNavigationMenuTrigger;
        const handler = vi.fn();
        trigger.addEventListener('flint-navigation-menu-trigger-click', handler);
        trigger.click();
        expect(handler).toHaveBeenCalledOnce();
        expect(handler.mock.calls[0][0].detail.contentId).toBe('c');
    });

    it('does not fire event when disabled', async () => {
        const el = await fixture<FlintNavigationMenuTrigger>(
            html`<flint-navigation-menu-trigger ?disabled=${true} content-id="c">Label</flint-navigation-menu-trigger>`
        );
        const handler = vi.fn();
        el.addEventListener('flint-navigation-menu-trigger-click', handler);
        el.click();
        expect(handler).not.toHaveBeenCalled();
    });

    it('toggles associated content open on click', async () => {
        const wrapper = await fixture(html`
            <div>
                <flint-navigation-menu-trigger content-id="p1">Open</flint-navigation-menu-trigger>
                <flint-navigation-menu-content id="p1"></flint-navigation-menu-content>
            </div>
        `);
        const trigger = wrapper.querySelector('flint-navigation-menu-trigger') as FlintNavigationMenuTrigger;
        const content = wrapper.querySelector('flint-navigation-menu-content') as FlintNavigationMenuContent;
        expect(content.open).toBe(false);

        trigger.click();
        await trigger.updateComplete;
        expect(content.open).toBe(true);

        trigger.click();
        await trigger.updateComplete;
        expect(content.open).toBe(false);
    });

    it('renders a chevron icon inside the button', async () => {
        const el = await fixture<FlintNavigationMenuTrigger>(
            html`<flint-navigation-menu-trigger>Menu</flint-navigation-menu-trigger>`
        );
        const svg = el.shadowRoot!.querySelector('svg');
        expect(svg).toBeTruthy();
    });
});

// ---------------------------------------------------------------------------
// flint-navigation-menu-content
// ---------------------------------------------------------------------------

describe('flint-navigation-menu-content', () => {
    it('renders and creates a shadow root', async () => {
        const el = await fixture<FlintNavigationMenuContent>(
            html`<flint-navigation-menu-content></flint-navigation-menu-content>`
        );
        expect(el.shadowRoot).toBeTruthy();
    });

    it('projects slot content', async () => {
        const el = await fixture<FlintNavigationMenuContent>(html`
            <flint-navigation-menu-content>
                <flint-navigation-menu-link href="#">Link</flint-navigation-menu-link>
            </flint-navigation-menu-content>
        `);
        const link = el.querySelector('flint-navigation-menu-link');
        expect(link).toBeTruthy();
    });

    it('renders a panel with role="menu"', async () => {
        const el = await fixture<FlintNavigationMenuContent>(
            html`<flint-navigation-menu-content></flint-navigation-menu-content>`
        );
        const panel = el.shadowRoot!.querySelector('.panel');
        expect(panel).toBeTruthy();
        expect(panel!.getAttribute('role')).toBe('menu');
    });

    it('exposes panel part', async () => {
        const el = await fixture<FlintNavigationMenuContent>(
            html`<flint-navigation-menu-content></flint-navigation-menu-content>`
        );
        expect(el.shadowRoot!.querySelector('[part="panel"]')).toBeTruthy();
    });

    it('defaults open to false', async () => {
        const el = await fixture<FlintNavigationMenuContent>(
            html`<flint-navigation-menu-content></flint-navigation-menu-content>`
        );
        expect(el.open).toBe(false);
    });

    it('reflects open attribute', async () => {
        const el = await fixture<FlintNavigationMenuContent>(
            html`<flint-navigation-menu-content ?open=${true}></flint-navigation-menu-content>`
        );
        await el.updateComplete;
        expect(el.hasAttribute('open')).toBe(true);
    });

    it('removes open attribute when set to false', async () => {
        const el = await fixture<FlintNavigationMenuContent>(
            html`<flint-navigation-menu-content ?open=${true}></flint-navigation-menu-content>`
        );
        await el.updateComplete;
        expect(el.hasAttribute('open')).toBe(true);

        el.open = false;
        await el.updateComplete;
        expect(el.hasAttribute('open')).toBe(false);
    });

    it('defaults dir to ltr', async () => {
        const el = await fixture<FlintNavigationMenuContent>(
            html`<flint-navigation-menu-content></flint-navigation-menu-content>`
        );
        expect(el.dir).toBe('ltr');
    });

    it('updates gap CSS property when gap changes', async () => {
        const el = await fixture<FlintNavigationMenuContent>(
            html`<flint-navigation-menu-content .gap=${20}></flint-navigation-menu-content>`
        );
        await el.updateComplete;
        expect(el.style.getPropertyValue('--flint-navigation-menu-content-gap')).toBe('20px');
    });

    it('sets dir attribute when dir property changes', async () => {
        const el = await fixture<FlintNavigationMenuContent>(
            html`<flint-navigation-menu-content .dir=${'rtl'}></flint-navigation-menu-content>`
        );
        await el.updateComplete;
        expect(el.getAttribute('dir')).toBe('rtl');
    });

    it('closes and fires event on Escape key', async () => {
        const el = await fixture<FlintNavigationMenuContent>(
            html`<flint-navigation-menu-content ?open=${true} id="esc-test"></flint-navigation-menu-content>`
        );
        await el.updateComplete;

        const handler = vi.fn();
        el.addEventListener('flint-navigation-menu-content-toggle', handler);

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        expect(el.open).toBe(false);
        expect(handler).toHaveBeenCalledOnce();
        expect(handler.mock.calls[0][0].detail.open).toBe(false);
    });

    it('closes on Tab key without preventing default', async () => {
        const el = await fixture<FlintNavigationMenuContent>(
            html`<flint-navigation-menu-content ?open=${true} id="tab-test"></flint-navigation-menu-content>`
        );
        await el.updateComplete;

        const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
        el.dispatchEvent(event);
        expect(el.open).toBe(false);
        // Tab should NOT preventDefault so focus moves naturally
        expect(event.defaultPrevented).toBe(false);
    });
});

// ---------------------------------------------------------------------------
// flint-navigation-menu-link
// ---------------------------------------------------------------------------

describe('flint-navigation-menu-link', () => {
    it('renders and creates a shadow root', async () => {
        const el = await fixture<FlintNavigationMenuLink>(
            html`<flint-navigation-menu-link href="#"></flint-navigation-menu-link>`
        );
        expect(el.shadowRoot).toBeTruthy();
    });

    it('projects slot content', async () => {
        const el = await fixture<FlintNavigationMenuLink>(
            html`<flint-navigation-menu-link href="#">My Link</flint-navigation-menu-link>`
        );
        const slot = el.shadowRoot!.querySelector('slot');
        expect(slot).toBeTruthy();
    });

    it('renders an anchor element', async () => {
        const el = await fixture<FlintNavigationMenuLink>(
            html`<flint-navigation-menu-link href="/about">About</flint-navigation-menu-link>`
        );
        const a = el.shadowRoot!.querySelector('a');
        expect(a).toBeTruthy();
        expect(a!.getAttribute('href')).toBe('/about');
    });

    it('sets role="menuitem" on the anchor', async () => {
        const el = await fixture<FlintNavigationMenuLink>(
            html`<flint-navigation-menu-link href="#">Link</flint-navigation-menu-link>`
        );
        const a = el.shadowRoot!.querySelector('a');
        expect(a!.getAttribute('role')).toBe('menuitem');
    });

    it('exposes link part', async () => {
        const el = await fixture<FlintNavigationMenuLink>(
            html`<flint-navigation-menu-link href="#">Link</flint-navigation-menu-link>`
        );
        expect(el.shadowRoot!.querySelector('[part="link"]')).toBeTruthy();
    });

    it('defaults disabled to false', async () => {
        const el = await fixture<FlintNavigationMenuLink>(
            html`<flint-navigation-menu-link href="#">Link</flint-navigation-menu-link>`
        );
        expect(el.disabled).toBe(false);
    });

    it('reflects disabled attribute', async () => {
        const el = await fixture<FlintNavigationMenuLink>(
            html`<flint-navigation-menu-link ?disabled=${true} href="#">Link</flint-navigation-menu-link>`
        );
        await el.updateComplete;
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('sets aria-disabled to true when disabled', async () => {
        const el = await fixture<FlintNavigationMenuLink>(
            html`<flint-navigation-menu-link ?disabled=${true} href="#">Link</flint-navigation-menu-link>`
        );
        const a = el.shadowRoot!.querySelector('a');
        expect(a!.getAttribute('aria-disabled')).toBe('true');
    });

    it('sets aria-disabled to false when not disabled', async () => {
        const el = await fixture<FlintNavigationMenuLink>(
            html`<flint-navigation-menu-link href="#">Link</flint-navigation-menu-link>`
        );
        const a = el.shadowRoot!.querySelector('a');
        expect(a!.getAttribute('aria-disabled')).toBe('false');
    });

    it('defaults active to false', async () => {
        const el = await fixture<FlintNavigationMenuLink>(
            html`<flint-navigation-menu-link href="#">Link</flint-navigation-menu-link>`
        );
        expect(el.active).toBe(false);
    });

    it('reflects active attribute', async () => {
        const el = await fixture<FlintNavigationMenuLink>(
            html`<flint-navigation-menu-link ?active=${true} href="#">Link</flint-navigation-menu-link>`
        );
        await el.updateComplete;
        expect(el.hasAttribute('active')).toBe(true);
    });

    it('sets aria-current="page" when active', async () => {
        const el = await fixture<FlintNavigationMenuLink>(
            html`<flint-navigation-menu-link ?active=${true} href="#">Link</flint-navigation-menu-link>`
        );
        const a = el.shadowRoot!.querySelector('a');
        expect(a!.getAttribute('aria-current')).toBe('page');
    });

    it('does not set aria-current when not active', async () => {
        const el = await fixture<FlintNavigationMenuLink>(
            html`<flint-navigation-menu-link href="#">Link</flint-navigation-menu-link>`
        );
        const a = el.shadowRoot!.querySelector('a');
        expect(a!.hasAttribute('aria-current')).toBe(false);
    });

    it('adds link--active class when active', async () => {
        const el = await fixture<FlintNavigationMenuLink>(
            html`<flint-navigation-menu-link ?active=${true} href="#">Link</flint-navigation-menu-link>`
        );
        const a = el.shadowRoot!.querySelector('a');
        expect(a!.classList.contains('link--active')).toBe(true);
    });

    it('passes href, target, and title to the anchor', async () => {
        const el = await fixture<FlintNavigationMenuLink>(
            html`<flint-navigation-menu-link href="/home" target="_blank" title="Go home">Home</flint-navigation-menu-link>`
        );
        const a = el.shadowRoot!.querySelector('a');
        expect(a!.getAttribute('href')).toBe('/home');
        expect(a!.getAttribute('target')).toBe('_blank');
        expect(a!.getAttribute('title')).toBe('Go home');
    });

    it('prevents click when disabled', async () => {
        const el = await fixture<FlintNavigationMenuLink>(
            html`<flint-navigation-menu-link ?disabled=${true} href="#">Link</flint-navigation-menu-link>`
        );
        const event = new MouseEvent('click', { bubbles: true, cancelable: true });
        el.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(true);
    });
});
