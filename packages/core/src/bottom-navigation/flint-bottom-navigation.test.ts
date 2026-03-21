import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-bottom-navigation.js';
import './flint-bottom-navigation-action.js';
import type { FlintBottomNavigation } from './flint-bottom-navigation.js';
import type { FlintBottomNavigationAction } from './flint-bottom-navigation-action.js';
import { expectAccessible } from '../test-utils/axe.js';

describe('flint-bottom-navigation', () => {
    it('is defined', async () => {
        const el = document.createElement('flint-bottom-navigation');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('sets active property on child actions based on value', async () => {
        const el = await fixture<FlintBottomNavigation>(html`
            <flint-bottom-navigation value="favs">
                <flint-bottom-navigation-action label="Recents" value="recents"></flint-bottom-navigation-action>
                <flint-bottom-navigation-action label="Favorites" value="favs"></flint-bottom-navigation-action>
            </flint-bottom-navigation>
        `);

        const actions = el.querySelectorAll('flint-bottom-navigation-action');
        expect(actions[0].active).toBe(false);
        expect(actions[1].active).toBe(true);
    });

    it('dispatches flint-bottom-navigation-change when an action is clicked', async () => {
        const el = await fixture<FlintBottomNavigation>(html`
            <flint-bottom-navigation value="recents">
                <flint-bottom-navigation-action label="Recents" value="recents"></flint-bottom-navigation-action>
                <flint-bottom-navigation-action label="Favorites" value="favs"></flint-bottom-navigation-action>
            </flint-bottom-navigation>
        `);

        const changeSpy = vi.fn();
        el.addEventListener('flint-bottom-navigation-change', changeSpy);

        const favAction = el.querySelectorAll('flint-bottom-navigation-action')[1] as FlintBottomNavigationAction;
        favAction.click();

        expect(changeSpy).toHaveBeenCalled();
        expect(changeSpy.mock.calls[0][0].detail.value).toBe('favs');
        expect(el.value).toBe('favs');
    });

    it('does not dispatch change when clicking the already-active action', async () => {
        const el = await fixture<FlintBottomNavigation>(html`
            <flint-bottom-navigation value="recents">
                <flint-bottom-navigation-action label="Recents" value="recents"></flint-bottom-navigation-action>
                <flint-bottom-navigation-action label="Favorites" value="favs"></flint-bottom-navigation-action>
            </flint-bottom-navigation>
        `);

        const changeSpy = vi.fn();
        el.addEventListener('flint-bottom-navigation-change', changeSpy);

        const activeAction = el.querySelectorAll('flint-bottom-navigation-action')[0] as FlintBottomNavigationAction;
        activeAction.click();

        expect(changeSpy).not.toHaveBeenCalled();
    });

    it('shows all labels when show-labels is true', async () => {
        const el = await fixture<FlintBottomNavigation>(html`
            <flint-bottom-navigation value="recents" show-labels>
                <flint-bottom-navigation-action label="Recents" value="recents"></flint-bottom-navigation-action>
                <flint-bottom-navigation-action label="Favorites" value="favs"></flint-bottom-navigation-action>
                <flint-bottom-navigation-action label="Nearby" value="nearby"></flint-bottom-navigation-action>
                <flint-bottom-navigation-action label="Folder" value="folder"></flint-bottom-navigation-action>
            </flint-bottom-navigation>
        `);

        const actions = el.querySelectorAll('flint-bottom-navigation-action');
        actions.forEach(action => {
            expect(action.showLabel).toBe(true);
        });
    });

    it('updates action labels when show-labels changes after initial render', async () => {
        const el = await fixture<FlintBottomNavigation>(html`
            <flint-bottom-navigation value="recents">
                <flint-bottom-navigation-action label="Recents" value="recents"></flint-bottom-navigation-action>
                <flint-bottom-navigation-action label="Favorites" value="favs"></flint-bottom-navigation-action>
                <flint-bottom-navigation-action label="Nearby" value="nearby"></flint-bottom-navigation-action>
                <flint-bottom-navigation-action label="Folder" value="folder"></flint-bottom-navigation-action>
            </flint-bottom-navigation>
        `);

        const actions = el.querySelectorAll('flint-bottom-navigation-action');
        // Initially shift mode: only active shows label
        expect(actions[0].showLabel).toBe(true);
        expect(actions[1].showLabel).toBe(false);

        // Enable show-labels
        el.showLabels = true;
        await el.updateComplete;

        actions.forEach(action => {
            expect(action.showLabel).toBe(true);
        });
    });

    it('auto-shows labels when there are 3 or fewer actions', async () => {
        const el = await fixture<FlintBottomNavigation>(html`
            <flint-bottom-navigation value="recents">
                <flint-bottom-navigation-action label="Recents" value="recents"></flint-bottom-navigation-action>
                <flint-bottom-navigation-action label="Favorites" value="favs"></flint-bottom-navigation-action>
                <flint-bottom-navigation-action label="Nearby" value="nearby"></flint-bottom-navigation-action>
            </flint-bottom-navigation>
        `);

        const actions = el.querySelectorAll('flint-bottom-navigation-action');
        actions.forEach(action => {
            expect(action.showLabel).toBe(true);
        });
    });

    it('hides unselected labels when there are more than 3 actions and show-labels is false', async () => {
        const el = await fixture<FlintBottomNavigation>(html`
            <flint-bottom-navigation value="recents">
                <flint-bottom-navigation-action label="Recents" value="recents"></flint-bottom-navigation-action>
                <flint-bottom-navigation-action label="Favorites" value="favs"></flint-bottom-navigation-action>
                <flint-bottom-navigation-action label="Nearby" value="nearby"></flint-bottom-navigation-action>
                <flint-bottom-navigation-action label="Folder" value="folder"></flint-bottom-navigation-action>
            </flint-bottom-navigation>
        `);

        const actions = el.querySelectorAll('flint-bottom-navigation-action');
        expect(actions[0].showLabel).toBe(true);  // selected
        expect(actions[1].showLabel).toBe(false); // unselected
        expect(actions[2].showLabel).toBe(false); // unselected
        expect(actions[3].showLabel).toBe(false); // unselected
    });

    it('renders container with role="tablist"', async () => {
        const el = await fixture<FlintBottomNavigation>(html`
            <flint-bottom-navigation value="recents">
                <flint-bottom-navigation-action label="Recents" value="recents"></flint-bottom-navigation-action>
            </flint-bottom-navigation>
        `);

        const container = el.shadowRoot!.querySelector('.container');
        expect(container?.getAttribute('role')).toBe('tablist');
    });
});

describe('flint-bottom-navigation-action', () => {
    it('is defined', async () => {
        const el = document.createElement('flint-bottom-navigation-action');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('has role="tab" set on the host', async () => {
        const el = await fixture<FlintBottomNavigationAction>(html`
            <flint-bottom-navigation-action label="Home" value="home"></flint-bottom-navigation-action>
        `);
        expect(el.getAttribute('role')).toBe('tab');
    });

    it('has tabindex="0" for keyboard focus', async () => {
        const el = await fixture<FlintBottomNavigationAction>(html`
            <flint-bottom-navigation-action label="Home" value="home"></flint-bottom-navigation-action>
        `);
        expect(el.tabIndex).toBe(0);
    });

    it('sets aria-selected="true" when active', async () => {
        const el = await fixture<FlintBottomNavigationAction>(html`
            <flint-bottom-navigation-action label="Home" value="home" active></flint-bottom-navigation-action>
        `);
        expect(el.getAttribute('aria-selected')).toBe('true');
    });

    it('sets aria-selected="false" when not active', async () => {
        const el = await fixture<FlintBottomNavigationAction>(html`
            <flint-bottom-navigation-action label="Home" value="home"></flint-bottom-navigation-action>
        `);
        await el.updateComplete;
        expect(el.getAttribute('aria-selected')).toBe('false');
    });

    it('updates aria-selected when active changes', async () => {
        const el = await fixture<FlintBottomNavigationAction>(html`
            <flint-bottom-navigation-action label="Home" value="home"></flint-bottom-navigation-action>
        `);
        await el.updateComplete;
        expect(el.getAttribute('aria-selected')).toBe('false');

        el.active = true;
        await el.updateComplete;
        expect(el.getAttribute('aria-selected')).toBe('true');
    });

    it('dispatches a click event on Enter key', async () => {
        const el = await fixture<FlintBottomNavigationAction>(html`
            <flint-bottom-navigation-action label="Home" value="home"></flint-bottom-navigation-action>
        `);

        const clickSpy = vi.fn();
        el.addEventListener('click', clickSpy);

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        expect(clickSpy).toHaveBeenCalled();
    });

    it('dispatches a click event on Space key', async () => {
        const el = await fixture<FlintBottomNavigationAction>(html`
            <flint-bottom-navigation-action label="Home" value="home"></flint-bottom-navigation-action>
        `);

        const clickSpy = vi.fn();
        el.addEventListener('click', clickSpy);

        el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
        expect(clickSpy).toHaveBeenCalled();
    });

    it('keyboard Enter on action triggers parent change event', async () => {
        const el = await fixture<FlintBottomNavigation>(html`
            <flint-bottom-navigation value="recents">
                <flint-bottom-navigation-action label="Recents" value="recents"></flint-bottom-navigation-action>
                <flint-bottom-navigation-action label="Favorites" value="favs"></flint-bottom-navigation-action>
            </flint-bottom-navigation>
        `);

        const changeSpy = vi.fn();
        el.addEventListener('flint-bottom-navigation-change', changeSpy);

        const favAction = el.querySelectorAll('flint-bottom-navigation-action')[1] as FlintBottomNavigationAction;
        favAction.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

        expect(changeSpy).toHaveBeenCalled();
        expect(changeSpy.mock.calls[0][0].detail.value).toBe('favs');
    });
});

describe('flint-bottom-navigation — accessibility', () => {
    it('should be accessible', async () => {
        const el = await fixture(html`
            <flint-bottom-navigation value="recents">
                <flint-bottom-navigation-action label="Recents" value="recents"></flint-bottom-navigation-action>
                <flint-bottom-navigation-action label="Favorites" value="favs"></flint-bottom-navigation-action>
            </flint-bottom-navigation>
        `);
        await expectAccessible(el);
    });
});
