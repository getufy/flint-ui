import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-bottom-navigation.js';
import './ui-bottom-navigation-action.js';
import type { UiBottomNavigation } from './ui-bottom-navigation.js';
import type { UiBottomNavigationAction } from './ui-bottom-navigation-action.js';

describe('ui-bottom-navigation', () => {
    it('is defined', async () => {
        const el = document.createElement('ui-bottom-navigation');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('sets active property on child actions based on value', async () => {
        const el = await fixture<UiBottomNavigation>(html`
            <ui-bottom-navigation value="favs">
                <ui-bottom-navigation-action label="Recents" value="recents"></ui-bottom-navigation-action>
                <ui-bottom-navigation-action label="Favorites" value="favs"></ui-bottom-navigation-action>
            </ui-bottom-navigation>
        `);

        const actions = el.querySelectorAll('ui-bottom-navigation-action');
        expect(actions[0].active).toBe(false);
        expect(actions[1].active).toBe(true);
    });

    it('dispatches ui-bottom-navigation-change when an action is clicked', async () => {
        const el = await fixture<UiBottomNavigation>(html`
            <ui-bottom-navigation value="recents">
                <ui-bottom-navigation-action label="Recents" value="recents"></ui-bottom-navigation-action>
                <ui-bottom-navigation-action label="Favorites" value="favs"></ui-bottom-navigation-action>
            </ui-bottom-navigation>
        `);

        const changeSpy = vi.fn();
        el.addEventListener('ui-bottom-navigation-change', changeSpy);

        const favAction = el.querySelectorAll('ui-bottom-navigation-action')[1] as UiBottomNavigationAction;
        favAction.click();

        expect(changeSpy).toHaveBeenCalled();
        expect(changeSpy.mock.calls[0][0].detail.value).toBe('favs');
        expect(el.value).toBe('favs');
    });

    it('does not dispatch change when clicking the already-active action', async () => {
        const el = await fixture<UiBottomNavigation>(html`
            <ui-bottom-navigation value="recents">
                <ui-bottom-navigation-action label="Recents" value="recents"></ui-bottom-navigation-action>
                <ui-bottom-navigation-action label="Favorites" value="favs"></ui-bottom-navigation-action>
            </ui-bottom-navigation>
        `);

        const changeSpy = vi.fn();
        el.addEventListener('ui-bottom-navigation-change', changeSpy);

        const activeAction = el.querySelectorAll('ui-bottom-navigation-action')[0] as UiBottomNavigationAction;
        activeAction.click();

        expect(changeSpy).not.toHaveBeenCalled();
    });

    it('shows all labels when show-labels is true', async () => {
        const el = await fixture<UiBottomNavigation>(html`
            <ui-bottom-navigation value="recents" show-labels>
                <ui-bottom-navigation-action label="Recents" value="recents"></ui-bottom-navigation-action>
                <ui-bottom-navigation-action label="Favorites" value="favs"></ui-bottom-navigation-action>
                <ui-bottom-navigation-action label="Nearby" value="nearby"></ui-bottom-navigation-action>
                <ui-bottom-navigation-action label="Folder" value="folder"></ui-bottom-navigation-action>
            </ui-bottom-navigation>
        `);

        const actions = el.querySelectorAll('ui-bottom-navigation-action');
        actions.forEach(action => {
            expect(action.showLabel).toBe(true);
        });
    });

    it('updates action labels when show-labels changes after initial render', async () => {
        const el = await fixture<UiBottomNavigation>(html`
            <ui-bottom-navigation value="recents">
                <ui-bottom-navigation-action label="Recents" value="recents"></ui-bottom-navigation-action>
                <ui-bottom-navigation-action label="Favorites" value="favs"></ui-bottom-navigation-action>
                <ui-bottom-navigation-action label="Nearby" value="nearby"></ui-bottom-navigation-action>
                <ui-bottom-navigation-action label="Folder" value="folder"></ui-bottom-navigation-action>
            </ui-bottom-navigation>
        `);

        const actions = el.querySelectorAll('ui-bottom-navigation-action');
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
        const el = await fixture<UiBottomNavigation>(html`
            <ui-bottom-navigation value="recents">
                <ui-bottom-navigation-action label="Recents" value="recents"></ui-bottom-navigation-action>
                <ui-bottom-navigation-action label="Favorites" value="favs"></ui-bottom-navigation-action>
                <ui-bottom-navigation-action label="Nearby" value="nearby"></ui-bottom-navigation-action>
            </ui-bottom-navigation>
        `);

        const actions = el.querySelectorAll('ui-bottom-navigation-action');
        actions.forEach(action => {
            expect(action.showLabel).toBe(true);
        });
    });

    it('hides unselected labels when there are more than 3 actions and show-labels is false', async () => {
        const el = await fixture<UiBottomNavigation>(html`
            <ui-bottom-navigation value="recents">
                <ui-bottom-navigation-action label="Recents" value="recents"></ui-bottom-navigation-action>
                <ui-bottom-navigation-action label="Favorites" value="favs"></ui-bottom-navigation-action>
                <ui-bottom-navigation-action label="Nearby" value="nearby"></ui-bottom-navigation-action>
                <ui-bottom-navigation-action label="Folder" value="folder"></ui-bottom-navigation-action>
            </ui-bottom-navigation>
        `);

        const actions = el.querySelectorAll('ui-bottom-navigation-action');
        expect(actions[0].showLabel).toBe(true);  // selected
        expect(actions[1].showLabel).toBe(false); // unselected
        expect(actions[2].showLabel).toBe(false); // unselected
        expect(actions[3].showLabel).toBe(false); // unselected
    });

    it('renders container with role="tablist"', async () => {
        const el = await fixture<UiBottomNavigation>(html`
            <ui-bottom-navigation value="recents">
                <ui-bottom-navigation-action label="Recents" value="recents"></ui-bottom-navigation-action>
            </ui-bottom-navigation>
        `);

        const container = el.shadowRoot!.querySelector('.container');
        expect(container?.getAttribute('role')).toBe('tablist');
    });
});

describe('ui-bottom-navigation-action', () => {
    it('is defined', async () => {
        const el = document.createElement('ui-bottom-navigation-action');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('has role="tab" set on the host', async () => {
        const el = await fixture<UiBottomNavigationAction>(html`
            <ui-bottom-navigation-action label="Home" value="home"></ui-bottom-navigation-action>
        `);
        expect(el.getAttribute('role')).toBe('tab');
    });

    it('has tabindex="0" for keyboard focus', async () => {
        const el = await fixture<UiBottomNavigationAction>(html`
            <ui-bottom-navigation-action label="Home" value="home"></ui-bottom-navigation-action>
        `);
        expect(el.tabIndex).toBe(0);
    });

    it('sets aria-selected="true" when active', async () => {
        const el = await fixture<UiBottomNavigationAction>(html`
            <ui-bottom-navigation-action label="Home" value="home" active></ui-bottom-navigation-action>
        `);
        expect(el.getAttribute('aria-selected')).toBe('true');
    });

    it('sets aria-selected="false" when not active', async () => {
        const el = await fixture<UiBottomNavigationAction>(html`
            <ui-bottom-navigation-action label="Home" value="home"></ui-bottom-navigation-action>
        `);
        await el.updateComplete;
        expect(el.getAttribute('aria-selected')).toBe('false');
    });

    it('updates aria-selected when active changes', async () => {
        const el = await fixture<UiBottomNavigationAction>(html`
            <ui-bottom-navigation-action label="Home" value="home"></ui-bottom-navigation-action>
        `);
        await el.updateComplete;
        expect(el.getAttribute('aria-selected')).toBe('false');

        el.active = true;
        await el.updateComplete;
        expect(el.getAttribute('aria-selected')).toBe('true');
    });

    it('dispatches a click event on Enter key', async () => {
        const el = await fixture<UiBottomNavigationAction>(html`
            <ui-bottom-navigation-action label="Home" value="home"></ui-bottom-navigation-action>
        `);

        const clickSpy = vi.fn();
        el.addEventListener('click', clickSpy);

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        expect(clickSpy).toHaveBeenCalled();
    });

    it('dispatches a click event on Space key', async () => {
        const el = await fixture<UiBottomNavigationAction>(html`
            <ui-bottom-navigation-action label="Home" value="home"></ui-bottom-navigation-action>
        `);

        const clickSpy = vi.fn();
        el.addEventListener('click', clickSpy);

        el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
        expect(clickSpy).toHaveBeenCalled();
    });

    it('keyboard Enter on action triggers parent change event', async () => {
        const el = await fixture<UiBottomNavigation>(html`
            <ui-bottom-navigation value="recents">
                <ui-bottom-navigation-action label="Recents" value="recents"></ui-bottom-navigation-action>
                <ui-bottom-navigation-action label="Favorites" value="favs"></ui-bottom-navigation-action>
            </ui-bottom-navigation>
        `);

        const changeSpy = vi.fn();
        el.addEventListener('ui-bottom-navigation-change', changeSpy);

        const favAction = el.querySelectorAll('ui-bottom-navigation-action')[1] as UiBottomNavigationAction;
        favAction.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

        expect(changeSpy).toHaveBeenCalled();
        expect(changeSpy.mock.calls[0][0].detail.value).toBe('favs');
    });
});
