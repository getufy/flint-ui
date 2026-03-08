import { describe, it, expect, vi, beforeAll } from 'vitest';
import { fixture, html, oneEvent } from '@open-wc/testing';
import './ui-tabs.js';
import type { UiTab, UiTabList, UiTabPanel, UiTabs } from './ui-tabs.js';

/* ── ResizeObserver polyfill for tests ── */
beforeAll(() => {
    if (typeof global.ResizeObserver === 'undefined') {
        global.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        };
    }
});

/* ── helpers ── */
async function makeTabs(value = 'a') {
    return fixture<UiTabs>(html`
        <ui-tabs value="${value}">
            <ui-tab-list>
                <ui-tab value="a">Tab A</ui-tab>
                <ui-tab value="b">Tab B</ui-tab>
                <ui-tab value="c" disabled>Tab C</ui-tab>
            </ui-tab-list>
            <ui-tab-panel value="a">Panel A</ui-tab-panel>
            <ui-tab-panel value="b">Panel B</ui-tab-panel>
            <ui-tab-panel value="c">Panel C</ui-tab-panel>
        </ui-tabs>
    `);
}

/* ================================================================== */
describe('ui-tab', () => {
    it('is defined', () => expect(document.createElement('ui-tab')).toBeInstanceOf(HTMLElement));

    it('renders a button by default', async () => {
        const el = await fixture<UiTab>(html`<ui-tab value="x">Label</ui-tab>`);
        expect(el.shadowRoot?.querySelector('button')).toBeTruthy();
    });

    it('renders an anchor when href is provided', async () => {
        const el = await fixture<UiTab>(html`<ui-tab value="x" href="#x">Link</ui-tab>`);
        expect(el.shadowRoot?.querySelector('a')).toBeTruthy();
    });

    it('reflects selected state', async () => {
        const el = await fixture<UiTab>(html`<ui-tab value="x" selected>A</ui-tab>`);
        const btn = el.shadowRoot!.querySelector('button')!;
        expect(btn.getAttribute('aria-selected')).toBe('true');
        expect(btn.tabIndex).toBe(0);
    });

    it('non-selected tab has tabindex=-1', async () => {
        const el = await fixture<UiTab>(html`<ui-tab value="x">A</ui-tab>`);
        const btn = el.shadowRoot!.querySelector('button')!;
        expect(btn.tabIndex).toBe(-1);
    });

    it('disabled button has disabled attribute', async () => {
        const el = await fixture<UiTab>(html`<ui-tab value="x" disabled>D</ui-tab>`);
        expect(el.shadowRoot?.querySelector('button')?.disabled).toBe(true);
    });

    it('fires ui-tab-click on click', async () => {
        const el = await fixture<UiTab>(html`<ui-tab value="alpha">A</ui-tab>`);
        const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('button')!;
        setTimeout(() => btn.click());
        const ev = await oneEvent(el, 'ui-tab-click') as CustomEvent;
        expect(ev.detail.value).toBe('alpha');
    });

    it('does not fire click when disabled', async () => {
        const el = await fixture<UiTab>(html`<ui-tab value="x" disabled>D</ui-tab>`);
        const spy = vi.fn();
        el.addEventListener('ui-tab-click', spy);
        el.shadowRoot?.querySelector<HTMLButtonElement>('button')?.click();
        expect(spy).not.toHaveBeenCalled();
    });

    it('applies iconPosition class to button', async () => {
        const el = await fixture<UiTab>(html`<ui-tab value="x" icon-position="top">A</ui-tab>`);
        const btn = el.shadowRoot!.querySelector('button')!;
        expect(btn.className).toContain('icon-top');
    });

    it('applies different icon positions', async () => {
        const positions = ['top', 'bottom', 'start', 'end'] as const;
        for (const pos of positions) {
            const el = await fixture<UiTab>(html`<ui-tab value="x" icon-position="${pos}">A</ui-tab>`);
            const btn = el.shadowRoot!.querySelector('button')!;
            expect(btn.className).toContain(`icon-${pos}`);
        }
    });

    it('anchor has aria-selected and tabindex', async () => {
        const el = await fixture<UiTab>(html`<ui-tab value="x" href="#x" selected>Link</ui-tab>`);
        const anchor = el.shadowRoot!.querySelector('a')!;
        expect(anchor.getAttribute('aria-selected')).toBe('true');
        expect(anchor.tabIndex).toBe(0);
    });

    it('disabled anchor does not fire click', async () => {
        const el = await fixture<UiTab>(html`<ui-tab value="x" href="#x" disabled>Link</ui-tab>`);
        const spy = vi.fn();
        el.addEventListener('ui-tab-click', spy);
        el.shadowRoot?.querySelector<HTMLAnchorElement>('a')?.click();
        expect(spy).not.toHaveBeenCalled();
    });

    it('full-width attribute is reflected', async () => {
        const el = await fixture<UiTab>(html`<ui-tab value="x" full-width>A</ui-tab>`);
        expect(el.hasAttribute('full-width')).toBe(true);
        expect(el.fullWidth).toBe(true);
    });

    it('setTabIndex sets tabindex on inner button', async () => {
        const el = await fixture<UiTab>(html`<ui-tab value="x">A</ui-tab>`);
        el.setTabIndex(0);
        const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('button')!;
        expect(btn.tabIndex).toBe(0);
        el.setTabIndex(-1);
        expect(btn.tabIndex).toBe(-1);
    });

    it('focusInner focuses inner button', async () => {
        const el = await fixture<UiTab>(html`<ui-tab value="x">A</ui-tab>`);
        el.focusInner();
        expect(el.shadowRoot!.activeElement).toBe(el.shadowRoot!.querySelector('button'));
    });

    it('icon slot exists in shadow DOM', async () => {
        const el = await fixture<UiTab>(html`<ui-tab value="x"><span slot="icon">🔔</span>A</ui-tab>`);
        const slot = el.shadowRoot!.querySelector('slot[name="icon"]');
        expect(slot).toBeTruthy();
    });
});

/* ================================================================== */
describe('ui-tab-panel', () => {
    it('is defined', () => expect(document.createElement('ui-tab-panel')).toBeInstanceOf(HTMLElement));

    it('visible when no hidden attribute', async () => {
        const el = await fixture<UiTabPanel>(html`<ui-tab-panel value="a">Content</ui-tab-panel>`);
        expect(el.hasAttribute('hidden')).toBe(false);
    });

    it('panel hidden attribute hides via display:none', async () => {
        const el = await fixture<UiTabPanel>(html`<ui-tab-panel value="a" hidden>Content</ui-tab-panel>`);
        expect(el.hasAttribute('hidden')).toBe(true);
    });

    it('panel inner div has role=tabpanel', async () => {
        const el = await fixture<UiTabPanel>(html`<ui-tab-panel value="a">Content</ui-tab-panel>`);
        const panel = el.shadowRoot!.querySelector('.panel')!;
        expect(panel.getAttribute('role')).toBe('tabpanel');
    });

    it('panel slot renders content', async () => {
        const el = await fixture<UiTabPanel>(html`<ui-tab-panel value="a"><p>Test content</p></ui-tab-panel>`);
        const slot = el.shadowRoot!.querySelector('slot');
        expect(slot).toBeTruthy();
    });
});

/* ================================================================== */
describe('ui-tabs (coordination)', () => {
    it('is defined', () => expect(document.createElement('ui-tabs')).toBeInstanceOf(HTMLElement));

    it('marks the active tab as selected', async () => {
        const el = await makeTabs('b');
        const tabs = el.querySelectorAll<UiTab>('ui-tab');
        expect(tabs[0].selected).toBe(false);
        expect(tabs[1].selected).toBe(true);
    });

    it('shows the correct panel', async () => {
        const el = await makeTabs('a');
        const panels = el.querySelectorAll<UiTabPanel>('ui-tab-panel');
        expect(panels[0].hasAttribute('hidden')).toBe(false);
        expect(panels[1].hasAttribute('hidden')).toBe(true);
    });

    it('hides all other panels', async () => {
        const el = await makeTabs('b');
        const panels = el.querySelectorAll<UiTabPanel>('ui-tab-panel');
        expect(panels[0].hasAttribute('hidden')).toBe(true);
        expect(panels[1].hasAttribute('hidden')).toBe(false);
        expect(panels[2].hasAttribute('hidden')).toBe(true);
    });

    it('updates selection on tab click', async () => {
        const el = await makeTabs('a');
        const tabs = el.querySelectorAll<UiTab>('ui-tab');
        const btn = tabs[1].shadowRoot!.querySelector<HTMLButtonElement>('button')!;
        setTimeout(() => btn.click());
        await oneEvent(el, 'ui-tab-change');
        expect(el.value).toBe('b');
        expect(tabs[1].selected).toBe(true);
        expect(tabs[0].selected).toBe(false);
    });

    it('emits ui-tab-change with correct value', async () => {
        const el = await makeTabs('a');
        const tab = el.querySelectorAll<UiTab>('ui-tab')[1];
        setTimeout(() => tab.shadowRoot!.querySelector<HTMLButtonElement>('button')!.click());
        const ev = await oneEvent(el, 'ui-tab-change') as CustomEvent;
        expect(ev.detail.value).toBe('b');
    });

    it('sets aria-controls on tabs', async () => {
        const el = await makeTabs('a');
        const tab = el.querySelector<UiTab>('ui-tab[value="a"]')!;
        expect(tab.getAttribute('aria-controls')).toBe('panel-a');
    });

    it('sets aria-labelledby on panels', async () => {
        const el = await makeTabs('a');
        const panel = el.querySelector<UiTabPanel>('ui-tab-panel[value="a"]')!;
        expect(panel.getAttribute('aria-labelledby')).toBe('tab-a');
    });

    it('fullWidth variant sets full-width on each tab', async () => {
        const el = await fixture<UiTabs>(html`
            <ui-tabs value="a" variant="fullWidth">
                <ui-tab-list><ui-tab value="a">A</ui-tab><ui-tab value="b">B</ui-tab></ui-tab-list>
                <ui-tab-panel value="a">A</ui-tab-panel>
                <ui-tab-panel value="b">B</ui-tab-panel>
            </ui-tabs>`);
        const tabs = el.querySelectorAll<UiTab>('ui-tab');
        tabs.forEach(t => expect(t.fullWidth).toBe(true));
    });

    it('disabled tab cannot become active via click', async () => {
        const el = await makeTabs('a');
        const disabledTab = el.querySelector<UiTab>('ui-tab[disabled]')!;
        const spy = vi.fn();
        el.addEventListener('ui-tab-change', spy);
        disabledTab.shadowRoot?.querySelector<HTMLButtonElement>('button')?.click();
        expect(spy).not.toHaveBeenCalled();
        expect(el.value).toBe('a');
    });

    it('defaultValue initializes value on first update', async () => {
        const el = await fixture<UiTabs>(html`
            <ui-tabs default-value="b">
                <ui-tab-list><ui-tab value="a">A</ui-tab><ui-tab value="b">B</ui-tab></ui-tab-list>
                <ui-tab-panel value="a">A</ui-tab-panel>
                <ui-tab-panel value="b">B</ui-tab-panel>
            </ui-tabs>`);
        expect(el.value).toBe('b');
    });

    it('auto-select persists value when empty', async () => {
        const el = await fixture<UiTabs>(html`
            <ui-tabs>
                <ui-tab-list><ui-tab value="a">A</ui-tab><ui-tab value="b">B</ui-tab></ui-tab-list>
                <ui-tab-panel value="a">A</ui-tab-panel>
                <ui-tab-panel value="b">B</ui-tab-panel>
            </ui-tabs>`);
        expect(el.value).toBe('a'); // first tab auto-selected and persisted
    });

    it('programmatic value change syncs tabs', async () => {
        const el = await makeTabs('a');
        el.value = 'c';
        el.requestUpdate();
        await el.updateComplete;
        const tabs = el.querySelectorAll<UiTab>('ui-tab');
        expect(tabs[0].selected).toBe(false);
        expect(tabs[2].selected).toBe(true);
    });

    it('all-disabled tabs fallback', async () => {
        const el = await fixture<UiTabs>(html`
            <ui-tabs>
                <ui-tab-list><ui-tab value="a" disabled>A</ui-tab><ui-tab value="b" disabled>B</ui-tab></ui-tab-list>
                <ui-tab-panel value="a">A</ui-tab-panel>
                <ui-tab-panel value="b">B</ui-tab-panel>
            </ui-tabs>`);
        // value stays '' when all tabs disabled
        expect(el.value).toBe('');
    });

    it('orientation propagates to tabList', async () => {
        const el = await fixture<UiTabs>(html`
            <ui-tabs orientation="vertical">
                <ui-tab-list><ui-tab value="a">A</ui-tab></ui-tab-list>
                <ui-tab-panel value="a">A</ui-tab-panel>
            </ui-tabs>`);
        const tabList = el.querySelector<UiTabList>('ui-tab-list')!;
        expect(tabList.orientation).toBe('vertical');
    });

    it('centered propagates to tabList', async () => {
        const el = await fixture<UiTabs>(html`
            <ui-tabs centered>
                <ui-tab-list><ui-tab value="a">A</ui-tab></ui-tab-list>
                <ui-tab-panel value="a">A</ui-tab-panel>
            </ui-tabs>`);
        const tabList = el.querySelector<UiTabList>('ui-tab-list')!;
        expect(tabList.centered).toBe(true);
    });

    it('scrollButtons propagates to tabList', async () => {
        const el = await fixture<UiTabs>(html`
            <ui-tabs scroll-buttons="false">
                <ui-tab-list><ui-tab value="a">A</ui-tab></ui-tab-list>
                <ui-tab-panel value="a">A</ui-tab-panel>
            </ui-tabs>`);
        const tabList = el.querySelector<UiTabList>('ui-tab-list')!;
        expect(tabList.scrollButtons).toBe('false');
    });

    it('sets id on tab elements', async () => {
        const el = await makeTabs('a');
        const tab = el.querySelector<UiTab>('ui-tab[value="a"]')!;
        expect(tab.getAttribute('id')).toBe('tab-a');
    });

    it('ui-tab-change event bubbles and is composed', async () => {
        const el = await makeTabs('a');
        const listener = vi.fn((e: Event) => expect(e.composed).toBe(true));
        document.addEventListener('ui-tab-change', listener);
        const btn = el.querySelector<UiTab>('ui-tab[value="b"]')!.shadowRoot!.querySelector<HTMLButtonElement>('button')!;
        setTimeout(() => btn.click());
        const ev = await oneEvent(el, 'ui-tab-change') as CustomEvent;
        expect(ev.bubbles).toBe(true);
        expect(ev.composed).toBe(true);
        document.removeEventListener('ui-tab-change', listener);
    });

    it('dynamic tab addition triggers re-sync', async () => {
        const el = await makeTabs('a');
        const newTab = document.createElement('ui-tab');
        newTab.setAttribute('value', 'd');
        newTab.textContent = 'D';
        const tabList = el.querySelector<UiTabList>('ui-tab-list')!;
        tabList.appendChild(newTab);
        await el.updateComplete;
        expect(el.querySelectorAll('ui-tab').length).toBe(4);
    });

    it('textColor/indicatorColor resolve primary', async () => {
        const el = await fixture<UiTabs>(html`
            <ui-tabs text-color="primary" indicator-color="primary">
                <ui-tab-list><ui-tab value="a" selected>A</ui-tab></ui-tab-list>
                <ui-tab-panel value="a">A</ui-tab-panel>
            </ui-tabs>`);
        const tab = el.querySelector<UiTab>('ui-tab')!;
        const activeColor = tab.style.getPropertyValue('--ui-tab-active');
        expect(activeColor).toContain('#3b82f6'); // primary blue
    });

    it('textColor/indicatorColor resolve secondary', async () => {
        const el = await fixture<UiTabs>(html`
            <ui-tabs text-color="secondary">
                <ui-tab-list><ui-tab value="a" selected>A</ui-tab></ui-tab-list>
                <ui-tab-panel value="a">A</ui-tab-panel>
            </ui-tabs>`);
        const tab = el.querySelector<UiTab>('ui-tab')!;
        const activeColor = tab.style.getPropertyValue('--ui-tab-active');
        expect(activeColor).toContain('#8b5cf6'); // secondary violet
    });

    it('textColor inherit returns currentColor', async () => {
        const el = await fixture<UiTabs>(html`
            <ui-tabs text-color="inherit">
                <ui-tab-list><ui-tab value="a" selected>A</ui-tab></ui-tab-list>
                <ui-tab-panel value="a">A</ui-tab-panel>
            </ui-tabs>`);
        const tab = el.querySelector<UiTab>('ui-tab')!;
        const activeColor = tab.style.getPropertyValue('--ui-tab-active');
        expect(activeColor).toBe('currentColor');
    });

    it('custom CSS color is passed through', async () => {
        const el = await fixture<UiTabs>(html`
            <ui-tabs text-color="#ff0000">
                <ui-tab-list><ui-tab value="a" selected>A</ui-tab></ui-tab-list>
                <ui-tab-panel value="a">A</ui-tab-panel>
            </ui-tabs>`);
        const tab = el.querySelector<UiTab>('ui-tab')!;
        const activeColor = tab.style.getPropertyValue('--ui-tab-active');
        expect(activeColor).toBe('#ff0000');
    });
});

/* ================================================================== */
describe('ui-tab-list', () => {
    it('is defined', () => expect(document.createElement('ui-tab-list')).toBeInstanceOf(HTMLElement));

    it('does not show scroll buttons in standard variant', async () => {
        const el = await fixture<UiTabList>(html`
            <ui-tab-list variant="standard" scroll-buttons="auto">
                <ui-tab value="a">A</ui-tab>
            </ui-tab-list>`);
        expect(el.shadowRoot?.querySelector('.scroll-btn')).toBeNull();
    });

    it('shows scroll buttons in scrollable variant', async () => {
        const el = await fixture<UiTabList>(html`
            <ui-tab-list variant="scrollable" scroll-buttons="auto">
                <ui-tab value="a">A</ui-tab>
            </ui-tab-list>`);
        expect(el.shadowRoot?.querySelectorAll('.scroll-btn').length).toBe(2);
    });

    it('hides scroll buttons when scroll-buttons="false"', async () => {
        const el = await fixture<UiTabList>(html`
            <ui-tab-list variant="scrollable" scroll-buttons="false">
                <ui-tab value="a">A</ui-tab>
            </ui-tab-list>`);
        expect(el.shadowRoot?.querySelector('.scroll-btn')).toBeNull();
    });

    it('keyboard ArrowRight focuses next tab', async () => {
        const el = await fixture<UiTabList>(html`
            <ui-tab-list>
                <ui-tab value="a">A</ui-tab>
                <ui-tab value="b">B</ui-tab>
                <ui-tab value="c">C</ui-tab>
            </ui-tab-list>`);
        const tabs = el.querySelectorAll<UiTab>('ui-tab');
        tabs[0].focusInner();
        const evt = new KeyboardEvent('keydown', { key: 'ArrowRight' });
        el.shadowRoot!.querySelector('.scroll-area')!.dispatchEvent(evt);
        await el.updateComplete;
        expect(tabs[1].shadowRoot!.activeElement).toBeTruthy();
    });

    it('keyboard ArrowLeft focuses previous tab', async () => {
        const el = await fixture<UiTabList>(html`
            <ui-tab-list>
                <ui-tab value="a">A</ui-tab>
                <ui-tab value="b">B</ui-tab>
                <ui-tab value="c">C</ui-tab>
            </ui-tab-list>`);
        const tabs = el.querySelectorAll<UiTab>('ui-tab');
        tabs[1].focusInner();
        const evt = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
        el.shadowRoot!.querySelector('.scroll-area')!.dispatchEvent(evt);
        await el.updateComplete;
        expect(tabs[0].shadowRoot!.activeElement).toBeTruthy();
    });

    it('keyboard Home focuses first tab', async () => {
        const el = await fixture<UiTabList>(html`
            <ui-tab-list>
                <ui-tab value="a">A</ui-tab>
                <ui-tab value="b">B</ui-tab>
                <ui-tab value="c">C</ui-tab>
            </ui-tab-list>`);
        const tabs = el.querySelectorAll<UiTab>('ui-tab');
        tabs[2].focusInner();
        const evt = new KeyboardEvent('keydown', { key: 'Home' });
        el.shadowRoot!.querySelector('.scroll-area')!.dispatchEvent(evt);
        await el.updateComplete;
        expect(tabs[0].shadowRoot!.activeElement).toBeTruthy();
    });

    it('keyboard End focuses last tab', async () => {
        const el = await fixture<UiTabList>(html`
            <ui-tab-list>
                <ui-tab value="a">A</ui-tab>
                <ui-tab value="b">B</ui-tab>
                <ui-tab value="c">C</ui-tab>
            </ui-tab-list>`);
        const tabs = el.querySelectorAll<UiTab>('ui-tab');
        tabs[0].focusInner();
        const evt = new KeyboardEvent('keydown', { key: 'End' });
        el.shadowRoot!.querySelector('.scroll-area')!.dispatchEvent(evt);
        await el.updateComplete;
        expect(tabs[2].shadowRoot!.activeElement).toBeTruthy();
    });

    it('keyboard navigation skips disabled tabs', async () => {
        const el = await fixture<UiTabList>(html`
            <ui-tab-list>
                <ui-tab value="a">A</ui-tab>
                <ui-tab value="b" disabled>B</ui-tab>
                <ui-tab value="c">C</ui-tab>
            </ui-tab-list>`);
        const allTabs = el.querySelectorAll<UiTab>('ui-tab');
        const tabs = Array.from(allTabs).filter(t => !t.disabled);
        tabs[0].focusInner();
        const evt = new KeyboardEvent('keydown', { key: 'ArrowRight' });
        el.shadowRoot!.querySelector('.scroll-area')!.dispatchEvent(evt);
        await el.updateComplete;
        expect(tabs[1].shadowRoot!.activeElement).toBeTruthy();
    });

    it('keyboard wraps from last to first on ArrowRight', async () => {
        const el = await fixture<UiTabList>(html`
            <ui-tab-list>
                <ui-tab value="a">A</ui-tab>
                <ui-tab value="b">B</ui-tab>
                <ui-tab value="c">C</ui-tab>
            </ui-tab-list>`);
        const tabs = el.querySelectorAll<UiTab>('ui-tab');
        tabs[2].focusInner();
        const evt = new KeyboardEvent('keydown', { key: 'ArrowRight' });
        el.shadowRoot!.querySelector('.scroll-area')!.dispatchEvent(evt);
        await el.updateComplete;
        expect(tabs[0].shadowRoot!.activeElement).toBeTruthy();
    });

    it('keyboard wraps from first to last on ArrowLeft', async () => {
        const el = await fixture<UiTabList>(html`
            <ui-tab-list>
                <ui-tab value="a">A</ui-tab>
                <ui-tab value="b">B</ui-tab>
                <ui-tab value="c">C</ui-tab>
            </ui-tab-list>`);
        const tabs = el.querySelectorAll<UiTab>('ui-tab');
        tabs[0].focusInner();
        const evt = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
        el.shadowRoot!.querySelector('.scroll-area')!.dispatchEvent(evt);
        await el.updateComplete;
        expect(tabs[2].shadowRoot!.activeElement).toBeTruthy();
    });

    it('orientation prop reflects', async () => {
        const el = await fixture<UiTabList>(html`<ui-tab-list orientation="vertical"><ui-tab value="a">A</ui-tab></ui-tab-list>`);
        expect(el.hasAttribute('orientation')).toBe(true);
        expect(el.getAttribute('orientation')).toBe('vertical');
    });
});
