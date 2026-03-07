import { html } from 'lit';
import { expect, describe, it } from 'vitest';
import { fixture } from '@open-wc/testing';
import './ui-navigation-menu.js';
import './ui-navigation-menu-list.js';
import './ui-navigation-menu-item.js';
import './ui-navigation-menu-trigger.js';
import './ui-navigation-menu-content.js';
import './ui-navigation-menu-link.js';

describe('Navigation Menu', () => {
    describe('ui-navigation-menu', () => {
        it('renders correctly', async () => {
            const el = await fixture(
                html`<ui-navigation-menu>
                    <ui-navigation-menu-list>
                        <ui-navigation-menu-item>
                            <ui-navigation-menu-trigger content-id="test">Test</ui-navigation-menu-trigger>
                            <ui-navigation-menu-content id="test">Content</ui-navigation-menu-content>
                        </ui-navigation-menu-item>
                    </ui-navigation-menu-list>
                </ui-navigation-menu>`
            );

            expect(el).to.exist;
            expect(el.querySelector('ui-navigation-menu-list')).to.exist;
        });

        it('closes content when clicking outside', async () => {
            const el = await fixture(
                html`<ui-navigation-menu>
                    <ui-navigation-menu-list>
                        <ui-navigation-menu-item>
                            <ui-navigation-menu-trigger content-id="test">Test</ui-navigation-menu-trigger>
                            <ui-navigation-menu-content id="test">Content</ui-navigation-menu-content>
                        </ui-navigation-menu-item>
                    </ui-navigation-menu-list>
                </ui-navigation-menu>`
            );

            const menu = el as any;
            menu.openContent('test');
            expect(menu.openContentId).to.equal('test');

            // Simulate click outside
            document.body.click();
            expect(menu.openContentId).to.be.null;
        });

        it('supports rtl direction', async () => {
            const el = await fixture(
                html`<ui-navigation-menu dir="rtl">
                    <ui-navigation-menu-list>
                        <ui-navigation-menu-item>
                            <ui-navigation-menu-trigger content-id="test">Test</ui-navigation-menu-trigger>
                            <ui-navigation-menu-content id="test">Content</ui-navigation-menu-content>
                        </ui-navigation-menu-item>
                    </ui-navigation-menu-list>
                </ui-navigation-menu>`
            );

            expect(el.getAttribute('dir')).to.equal('rtl');
        });
    });

    describe('ui-navigation-menu-list', () => {
        it('renders with correct gap', async () => {
            const el = await fixture(
                html`<ui-navigation-menu-list gap="16"></ui-navigation-menu-list>`
            );

            expect(el.getAttribute('gap')).to.equal('16');
        });

        it('renders with correct direction', async () => {
            const el = await fixture(
                html`<ui-navigation-menu-list direction="column"></ui-navigation-menu-list>`
            );

            expect(el.getAttribute('direction')).to.equal('column');
        });
    });

    describe('ui-navigation-menu-item', () => {
        it('renders with item id', async () => {
            const el = await fixture(
                html`<ui-navigation-menu-item item-id="test-item">Item</ui-navigation-menu-item>`
            );

            expect(el.getAttribute('item-id')).to.equal('test-item');
        });

        it('supports disabled state', async () => {
            const el = await fixture(
                html`<ui-navigation-menu-item disabled>Item</ui-navigation-menu-item>`
            );

            expect(el.hasAttribute('disabled')).to.be.true;
        });
    });

    describe('ui-navigation-menu-trigger', () => {
        it('opens content on click', async () => {
            const el = await fixture(
                html`
                    <div>
                        <ui-navigation-menu-trigger content-id="test">Trigger</ui-navigation-menu-trigger>
                        <ui-navigation-menu-content id="test">Content</ui-navigation-menu-content>
                    </div>
                `
            );

            const trigger = el.querySelector('ui-navigation-menu-trigger') as any;
            const content = el.querySelector('ui-navigation-menu-content') as any;

            expect(content.open).to.be.false;

            trigger.click();
            await trigger.updateComplete;

            expect(content.open).to.be.true;
        });

        it('toggles on multiple clicks', async () => {
            const el = await fixture(
                html`
                    <div>
                        <ui-navigation-menu-trigger content-id="test">Trigger</ui-navigation-menu-trigger>
                        <ui-navigation-menu-content id="test">Content</ui-navigation-menu-content>
                    </div>
                `
            );

            const trigger = el.querySelector('ui-navigation-menu-trigger') as any;
            const content = el.querySelector('ui-navigation-menu-content') as any;

            trigger.click();
            await trigger.updateComplete;
            expect(content.open).to.be.true;

            trigger.click();
            await trigger.updateComplete;
            expect(content.open).to.be.false;
        });

        it('supports keyboard navigation with Enter', async () => {
            const el = await fixture(
                html`
                    <div>
                        <ui-navigation-menu-trigger content-id="test">Trigger</ui-navigation-menu-trigger>
                        <ui-navigation-menu-content id="test">Content</ui-navigation-menu-content>
                    </div>
                `
            );

            const trigger = el.querySelector('ui-navigation-menu-trigger') as any;
            const content = el.querySelector('ui-navigation-menu-content') as any;

            expect(content.open).to.be.false;

            trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
            await trigger.updateComplete;

            expect(content.open).to.be.true;
        });

        it('supports keyboard navigation with Space', async () => {
            const el = await fixture(
                html`
                    <div>
                        <ui-navigation-menu-trigger content-id="test">Trigger</ui-navigation-menu-trigger>
                        <ui-navigation-menu-content id="test">Content</ui-navigation-menu-content>
                    </div>
                `
            );

            const trigger = el.querySelector('ui-navigation-menu-trigger') as any;
            const content = el.querySelector('ui-navigation-menu-content') as any;

            trigger.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
            await trigger.updateComplete;

            expect(content.open).to.be.true;
        });

        it('disables when disabled prop is true', async () => {
            const el = await fixture(
                html`<ui-navigation-menu-trigger disabled>Trigger</ui-navigation-menu-trigger>`
            );

            const trigger = el.shadowRoot?.querySelector('button') as HTMLButtonElement;
            expect(trigger.disabled).to.be.true;
        });

        it('has proper aria attributes', async () => {
            const el = await fixture(
                html`<ui-navigation-menu-trigger content-id="test">Trigger</ui-navigation-menu-trigger>`
            );

            const trigger = el.shadowRoot?.querySelector('button') as HTMLButtonElement;
            expect(trigger.hasAttribute('aria-expanded')).to.be.true;
            expect(trigger.hasAttribute('aria-haspopup')).to.be.true;
            expect(trigger.hasAttribute('aria-controls')).to.be.true;
        });
    });

    describe('ui-navigation-menu-content', () => {
        it('renders hidden by default', async () => {
            const el = await fixture(
                html`<ui-navigation-menu-content id="test">Content</ui-navigation-menu-content>`
            );

            expect(el.hasAttribute('open')).to.be.false;
        });

        it('shows when open prop is true', async () => {
            const el = await fixture(
                html`<ui-navigation-menu-content open>Content</ui-navigation-menu-content>`
            );

            expect(el.hasAttribute('open')).to.be.true;
        });

        it('supports keyboard navigation with Escape', async () => {
            const el = await fixture(
                html`<ui-navigation-menu-content id="test" open>Content</ui-navigation-menu-content>`
            );

            const content = el as any;
            content.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
            await content.updateComplete;

            expect(content.open).to.be.false;
        });

        it('supports custom direction', async () => {
            const el = await fixture(
                html`<ui-navigation-menu-content dir="rtl">Content</ui-navigation-menu-content>`
            );

            expect(el.getAttribute('dir')).to.equal('rtl');
        });
    });

    describe('ui-navigation-menu-link', () => {
        it('renders with href', async () => {
            const el = await fixture(
                html`<ui-navigation-menu-link href="/test">Link</ui-navigation-menu-link>`
            );

            const link = el.shadowRoot?.querySelector('a') as HTMLAnchorElement;
            expect(link.href).to.include('/test');
        });

        it('supports disabled state', async () => {
            const el = await fixture(
                html`<ui-navigation-menu-link href="/test" disabled>Link</ui-navigation-menu-link>`
            );

            expect(el.hasAttribute('disabled')).to.be.true;
        });

        it('has proper aria attributes', async () => {
            const el = await fixture(
                html`<ui-navigation-menu-link href="/test">Link</ui-navigation-menu-link>`
            );

            const link = el.shadowRoot?.querySelector('a') as HTMLAnchorElement;
            expect(link.getAttribute('role')).to.equal('menuitem');
        });

        it('supports target attribute', async () => {
            const el = await fixture(
                html`<ui-navigation-menu-link href="/test" target="_blank">Link</ui-navigation-menu-link>`
            );

            const link = el.shadowRoot?.querySelector('a') as HTMLAnchorElement;
            expect(link.target).to.equal('_blank');
        });

        it('supports title attribute', async () => {
            const el = await fixture(
                html`<ui-navigation-menu-link href="/test" title="Test Link">Link</ui-navigation-menu-link>`
            );

            const link = el.shadowRoot?.querySelector('a') as HTMLAnchorElement;
            expect(link.title).to.equal('Test Link');
        });
    });

    describe('Accessibility', () => {
        it('trigger has proper aria-expanded', async () => {
            const el = await fixture(
                html`
                    <div>
                        <ui-navigation-menu-trigger content-id="test">Trigger</ui-navigation-menu-trigger>
                        <ui-navigation-menu-content id="test">Content</ui-navigation-menu-content>
                    </div>
                `
            );

            const trigger = el.querySelector('ui-navigation-menu-trigger') as any;
            const button = trigger.shadowRoot?.querySelector('button') as HTMLButtonElement;

            expect(button.getAttribute('aria-expanded')).to.equal('false');

            trigger.click();
            await trigger.updateComplete;

            expect(button.getAttribute('aria-expanded')).to.equal('true');
        });

        it('content has proper role', async () => {
            const el = await fixture(
                html`<ui-navigation-menu-content open>Content</ui-navigation-menu-content>`
            );

            const panel = el.shadowRoot?.querySelector('[role="menu"]');
            expect(panel).to.exist;
        });
    });
});
