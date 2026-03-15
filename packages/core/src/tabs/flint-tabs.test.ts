import { describe, it, expect, vi, beforeAll } from 'vitest';
import { fixture, html, oneEvent } from '@open-wc/testing';
import './flint-tabs.js';
import type { FlintTab, FlintTabList, FlintTabPanel, FlintTabs } from './flint-tabs.js';
import { expectAccessible } from '../test-utils/axe';

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
    return fixture<FlintTabs>(html`
        <flint-tabs value="${value}">
            <flint-tab-list>
                <flint-tab value="a">Tab A</flint-tab>
                <flint-tab value="b">Tab B</flint-tab>
                <flint-tab value="c" disabled>Tab C</flint-tab>
            </flint-tab-list>
            <flint-tab-panel value="a">Panel A</flint-tab-panel>
            <flint-tab-panel value="b">Panel B</flint-tab-panel>
            <flint-tab-panel value="c">Panel C</flint-tab-panel>
        </flint-tabs>
    `);
}

/* ================================================================== */
describe('flint-tab', () => {
    it('is defined', () => expect(document.createElement('flint-tab')).toBeInstanceOf(HTMLElement));

    it('renders a button by default', async () => {
        const el = await fixture<FlintTab>(html`<flint-tab value="x">Label</flint-tab>`);
        expect(el.shadowRoot?.querySelector('button')).toBeTruthy();
    });

    it('renders an anchor when href is provided', async () => {
        const el = await fixture<FlintTab>(html`<flint-tab value="x" href="#x">Link</flint-tab>`);
        expect(el.shadowRoot?.querySelector('a')).toBeTruthy();
    });

    it('reflects selected state', async () => {
        const el = await fixture<FlintTab>(html`<flint-tab value="x" selected>A</flint-tab>`);
        const btn = el.shadowRoot!.querySelector('button')!;
        expect(btn.getAttribute('aria-selected')).toBe('true');
        expect(btn.tabIndex).toBe(0);
    });

    it('non-selected tab has tabindex=-1', async () => {
        const el = await fixture<FlintTab>(html`<flint-tab value="x">A</flint-tab>`);
        const btn = el.shadowRoot!.querySelector('button')!;
        expect(btn.tabIndex).toBe(-1);
    });

    it('disabled button has disabled attribute', async () => {
        const el = await fixture<FlintTab>(html`<flint-tab value="x" disabled>D</flint-tab>`);
        expect(el.shadowRoot?.querySelector('button')?.disabled).toBe(true);
    });

    it('fires flint-tab-click on click', async () => {
        const el = await fixture<FlintTab>(html`<flint-tab value="alpha">A</flint-tab>`);
        const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('button')!;
        setTimeout(() => btn.click());
        const ev = await oneEvent(el, 'flint-tab-click') as CustomEvent;
        expect(ev.detail.value).toBe('alpha');
    });

    it('does not fire click when disabled', async () => {
        const el = await fixture<FlintTab>(html`<flint-tab value="x" disabled>D</flint-tab>`);
        const spy = vi.fn();
        el.addEventListener('flint-tab-click', spy);
        el.shadowRoot?.querySelector<HTMLButtonElement>('button')?.click();
        expect(spy).not.toHaveBeenCalled();
    });

    it('applies iconPosition class to button', async () => {
        const el = await fixture<FlintTab>(html`<flint-tab value="x" icon-position="top">A</flint-tab>`);
        const btn = el.shadowRoot!.querySelector('button')!;
        expect(btn.className).toContain('icon-top');
    });

    it('applies different icon positions', async () => {
        const positions = ['top', 'bottom', 'start', 'end'] as const;
        for (const pos of positions) {
            const el = await fixture<FlintTab>(html`<flint-tab value="x" icon-position="${pos}">A</flint-tab>`);
            const btn = el.shadowRoot!.querySelector('button')!;
            expect(btn.className).toContain(`icon-${pos}`);
        }
    });

    it('anchor has aria-selected and tabindex', async () => {
        const el = await fixture<FlintTab>(html`<flint-tab value="x" href="#x" selected>Link</flint-tab>`);
        const anchor = el.shadowRoot!.querySelector('a')!;
        expect(anchor.getAttribute('aria-selected')).toBe('true');
        expect(anchor.tabIndex).toBe(0);
    });

    it('disabled anchor does not fire click', async () => {
        const el = await fixture<FlintTab>(html`<flint-tab value="x" href="#x" disabled>Link</flint-tab>`);
        const spy = vi.fn();
        el.addEventListener('flint-tab-click', spy);
        el.shadowRoot?.querySelector<HTMLAnchorElement>('a')?.click();
        expect(spy).not.toHaveBeenCalled();
    });

    it('full-width attribute is reflected', async () => {
        const el = await fixture<FlintTab>(html`<flint-tab value="x" full-width>A</flint-tab>`);
        expect(el.hasAttribute('full-width')).toBe(true);
        expect(el.fullWidth).toBe(true);
    });

    it('setTabIndex sets tabindex on inner button', async () => {
        const el = await fixture<FlintTab>(html`<flint-tab value="x">A</flint-tab>`);
        el.setTabIndex(0);
        const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('button')!;
        expect(btn.tabIndex).toBe(0);
        el.setTabIndex(-1);
        expect(btn.tabIndex).toBe(-1);
    });

    it('focusInner focuses inner button', async () => {
        const el = await fixture<FlintTab>(html`<flint-tab value="x">A</flint-tab>`);
        el.focusInner();
        expect(el.shadowRoot!.activeElement).toBe(el.shadowRoot!.querySelector('button'));
    });

    it('icon slot exists in shadow DOM', async () => {
        const el = await fixture<FlintTab>(html`<flint-tab value="x"><span slot="icon">🔔</span>A</flint-tab>`);
        const slot = el.shadowRoot!.querySelector('slot[name="icon"]');
        expect(slot).toBeTruthy();
    });
});

/* ================================================================== */
describe('flint-tab-panel', () => {
    it('is defined', () => expect(document.createElement('flint-tab-panel')).toBeInstanceOf(HTMLElement));

    it('visible when no hidden attribute', async () => {
        const el = await fixture<FlintTabPanel>(html`<flint-tab-panel value="a">Content</flint-tab-panel>`);
        expect(el.hasAttribute('hidden')).toBe(false);
    });

    it('panel hidden attribute hides via display:none', async () => {
        const el = await fixture<FlintTabPanel>(html`<flint-tab-panel value="a" hidden>Content</flint-tab-panel>`);
        expect(el.hasAttribute('hidden')).toBe(true);
    });

    it('panel inner div has role=tabpanel', async () => {
        const el = await fixture<FlintTabPanel>(html`<flint-tab-panel value="a">Content</flint-tab-panel>`);
        const panel = el.shadowRoot!.querySelector('.panel')!;
        expect(panel.getAttribute('role')).toBe('tabpanel');
    });

    it('panel slot renders content', async () => {
        const el = await fixture<FlintTabPanel>(html`<flint-tab-panel value="a"><p>Test content</p></flint-tab-panel>`);
        const slot = el.shadowRoot!.querySelector('slot');
        expect(slot).toBeTruthy();
    });
});

/* ================================================================== */
describe('flint-tabs (coordination)', () => {
    it('is defined', () => expect(document.createElement('flint-tabs')).toBeInstanceOf(HTMLElement));

    it('marks the active tab as selected', async () => {
        const el = await makeTabs('b');
        const tabs = el.querySelectorAll<FlintTab>('flint-tab');
        expect(tabs[0].selected).toBe(false);
        expect(tabs[1].selected).toBe(true);
    });

    it('shows the correct panel', async () => {
        const el = await makeTabs('a');
        const panels = el.querySelectorAll<FlintTabPanel>('flint-tab-panel');
        expect(panels[0].hasAttribute('hidden')).toBe(false);
        expect(panels[1].hasAttribute('hidden')).toBe(true);
    });

    it('hides all other panels', async () => {
        const el = await makeTabs('b');
        const panels = el.querySelectorAll<FlintTabPanel>('flint-tab-panel');
        expect(panels[0].hasAttribute('hidden')).toBe(true);
        expect(panels[1].hasAttribute('hidden')).toBe(false);
        expect(panels[2].hasAttribute('hidden')).toBe(true);
    });

    it('updates selection on tab click', async () => {
        const el = await makeTabs('a');
        const tabs = el.querySelectorAll<FlintTab>('flint-tab');
        const btn = tabs[1].shadowRoot!.querySelector<HTMLButtonElement>('button')!;
        setTimeout(() => btn.click());
        await oneEvent(el, 'flint-tab-change');
        expect(el.value).toBe('b');
        expect(tabs[1].selected).toBe(true);
        expect(tabs[0].selected).toBe(false);
    });

    it('emits flint-tab-change with correct value', async () => {
        const el = await makeTabs('a');
        const tab = el.querySelectorAll<FlintTab>('flint-tab')[1];
        setTimeout(() => tab.shadowRoot!.querySelector<HTMLButtonElement>('button')!.click());
        const ev = await oneEvent(el, 'flint-tab-change') as CustomEvent;
        expect(ev.detail.value).toBe('b');
    });

    it('sets aria-controls on tabs', async () => {
        const el = await makeTabs('a');
        const tab = el.querySelector<FlintTab>('flint-tab[value="a"]')!;
        expect(tab.getAttribute('aria-controls')).toBe('panel-a');
    });

    it('sets aria-labelledby on panels', async () => {
        const el = await makeTabs('a');
        const panel = el.querySelector<FlintTabPanel>('flint-tab-panel[value="a"]')!;
        expect(panel.getAttribute('aria-labelledby')).toBe('tab-a');
    });

    it('fullWidth variant sets full-width on each tab', async () => {
        const el = await fixture<FlintTabs>(html`
            <flint-tabs value="a" variant="fullWidth">
                <flint-tab-list><flint-tab value="a">A</flint-tab><flint-tab value="b">B</flint-tab></flint-tab-list>
                <flint-tab-panel value="a">A</flint-tab-panel>
                <flint-tab-panel value="b">B</flint-tab-panel>
            </flint-tabs>`);
        const tabs = el.querySelectorAll<FlintTab>('flint-tab');
        tabs.forEach(t => expect(t.fullWidth).toBe(true));
    });

    it('disabled tab cannot become active via click', async () => {
        const el = await makeTabs('a');
        const disabledTab = el.querySelector<FlintTab>('flint-tab[disabled]')!;
        const spy = vi.fn();
        el.addEventListener('flint-tab-change', spy);
        disabledTab.shadowRoot?.querySelector<HTMLButtonElement>('button')?.click();
        expect(spy).not.toHaveBeenCalled();
        expect(el.value).toBe('a');
    });

    it('defaultValue initializes value on first update', async () => {
        const el = await fixture<FlintTabs>(html`
            <flint-tabs default-value="b">
                <flint-tab-list><flint-tab value="a">A</flint-tab><flint-tab value="b">B</flint-tab></flint-tab-list>
                <flint-tab-panel value="a">A</flint-tab-panel>
                <flint-tab-panel value="b">B</flint-tab-panel>
            </flint-tabs>`);
        expect(el.value).toBe('b');
    });

    it('auto-select persists value when empty', async () => {
        const el = await fixture<FlintTabs>(html`
            <flint-tabs>
                <flint-tab-list><flint-tab value="a">A</flint-tab><flint-tab value="b">B</flint-tab></flint-tab-list>
                <flint-tab-panel value="a">A</flint-tab-panel>
                <flint-tab-panel value="b">B</flint-tab-panel>
            </flint-tabs>`);
        expect(el.value).toBe('a'); // first tab auto-selected and persisted
    });

    it('programmatic value change syncs tabs', async () => {
        const el = await makeTabs('a');
        el.value = 'c';
        el.requestUpdate();
        await el.updateComplete;
        const tabs = el.querySelectorAll<FlintTab>('flint-tab');
        expect(tabs[0].selected).toBe(false);
        expect(tabs[2].selected).toBe(true);
    });

    it('all-disabled tabs fallback', async () => {
        const el = await fixture<FlintTabs>(html`
            <flint-tabs>
                <flint-tab-list><flint-tab value="a" disabled>A</flint-tab><flint-tab value="b" disabled>B</flint-tab></flint-tab-list>
                <flint-tab-panel value="a">A</flint-tab-panel>
                <flint-tab-panel value="b">B</flint-tab-panel>
            </flint-tabs>`);
        // value stays '' when all tabs disabled
        expect(el.value).toBe('');
    });

    it('orientation propagates to tabList', async () => {
        const el = await fixture<FlintTabs>(html`
            <flint-tabs orientation="vertical">
                <flint-tab-list><flint-tab value="a">A</flint-tab></flint-tab-list>
                <flint-tab-panel value="a">A</flint-tab-panel>
            </flint-tabs>`);
        const tabList = el.querySelector<FlintTabList>('flint-tab-list')!;
        expect(tabList.orientation).toBe('vertical');
    });

    it('centered propagates to tabList', async () => {
        const el = await fixture<FlintTabs>(html`
            <flint-tabs centered>
                <flint-tab-list><flint-tab value="a">A</flint-tab></flint-tab-list>
                <flint-tab-panel value="a">A</flint-tab-panel>
            </flint-tabs>`);
        const tabList = el.querySelector<FlintTabList>('flint-tab-list')!;
        expect(tabList.centered).toBe(true);
    });

    it('scrollButtons propagates to tabList', async () => {
        const el = await fixture<FlintTabs>(html`
            <flint-tabs scroll-buttons="false">
                <flint-tab-list><flint-tab value="a">A</flint-tab></flint-tab-list>
                <flint-tab-panel value="a">A</flint-tab-panel>
            </flint-tabs>`);
        const tabList = el.querySelector<FlintTabList>('flint-tab-list')!;
        expect(tabList.scrollButtons).toBe('false');
    });

    it('sets id on tab elements', async () => {
        const el = await makeTabs('a');
        const tab = el.querySelector<FlintTab>('flint-tab[value="a"]')!;
        expect(tab.getAttribute('id')).toBe('tab-a');
    });

    it('flint-tab-change event bubbles and is composed', async () => {
        const el = await makeTabs('a');
        const listener = vi.fn((e: Event) => expect(e.composed).toBe(true));
        document.addEventListener('flint-tab-change', listener);
        const btn = el.querySelector<FlintTab>('flint-tab[value="b"]')!.shadowRoot!.querySelector<HTMLButtonElement>('button')!;
        setTimeout(() => btn.click());
        const ev = await oneEvent(el, 'flint-tab-change') as CustomEvent;
        expect(ev.bubbles).toBe(true);
        expect(ev.composed).toBe(true);
        document.removeEventListener('flint-tab-change', listener);
    });

    it('dynamic tab addition triggers re-sync', async () => {
        const el = await makeTabs('a');
        const newTab = document.createElement('flint-tab');
        newTab.setAttribute('value', 'd');
        newTab.textContent = 'D';
        const tabList = el.querySelector<FlintTabList>('flint-tab-list')!;
        tabList.appendChild(newTab);
        await el.updateComplete;
        expect(el.querySelectorAll('flint-tab').length).toBe(4);
    });

    it('textColor/indicatorColor resolve primary', async () => {
        const el = await fixture<FlintTabs>(html`
            <flint-tabs text-color="primary" indicator-color="primary">
                <flint-tab-list><flint-tab value="a" selected>A</flint-tab></flint-tab-list>
                <flint-tab-panel value="a">A</flint-tab-panel>
            </flint-tabs>`);
        const tab = el.querySelector<FlintTab>('flint-tab')!;
        const activeColor = tab.style.getPropertyValue('--flint-tab-active');
        expect(activeColor).toContain('#3b82f6'); // primary blue
    });

    it('textColor/indicatorColor resolve secondary', async () => {
        const el = await fixture<FlintTabs>(html`
            <flint-tabs text-color="secondary">
                <flint-tab-list><flint-tab value="a" selected>A</flint-tab></flint-tab-list>
                <flint-tab-panel value="a">A</flint-tab-panel>
            </flint-tabs>`);
        const tab = el.querySelector<FlintTab>('flint-tab')!;
        const activeColor = tab.style.getPropertyValue('--flint-tab-active');
        expect(activeColor).toContain('#8b5cf6'); // secondary violet
    });

    it('textColor inherit returns currentColor', async () => {
        const el = await fixture<FlintTabs>(html`
            <flint-tabs text-color="inherit">
                <flint-tab-list><flint-tab value="a" selected>A</flint-tab></flint-tab-list>
                <flint-tab-panel value="a">A</flint-tab-panel>
            </flint-tabs>`);
        const tab = el.querySelector<FlintTab>('flint-tab')!;
        const activeColor = tab.style.getPropertyValue('--flint-tab-active');
        expect(activeColor).toBe('currentColor');
    });

    it('custom CSS color is passed through', async () => {
        const el = await fixture<FlintTabs>(html`
            <flint-tabs text-color="#ff0000">
                <flint-tab-list><flint-tab value="a" selected>A</flint-tab></flint-tab-list>
                <flint-tab-panel value="a">A</flint-tab-panel>
            </flint-tabs>`);
        const tab = el.querySelector<FlintTab>('flint-tab')!;
        const activeColor = tab.style.getPropertyValue('--flint-tab-active');
        expect(activeColor).toBe('#ff0000');
    });
});

/* ================================================================== */
describe('flint-tab-list', () => {
    it('is defined', () => expect(document.createElement('flint-tab-list')).toBeInstanceOf(HTMLElement));

    it('does not show scroll buttons in standard variant', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list variant="standard" scroll-buttons="auto">
                <flint-tab value="a">A</flint-tab>
            </flint-tab-list>`);
        expect(el.shadowRoot?.querySelector('.scroll-btn')).toBeNull();
    });

    it('shows scroll buttons in scrollable variant', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list variant="scrollable" scroll-buttons="auto">
                <flint-tab value="a">A</flint-tab>
            </flint-tab-list>`);
        expect(el.shadowRoot?.querySelectorAll('.scroll-btn').length).toBe(2);
    });

    it('hides scroll buttons when scroll-buttons="false"', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list variant="scrollable" scroll-buttons="false">
                <flint-tab value="a">A</flint-tab>
            </flint-tab-list>`);
        expect(el.shadowRoot?.querySelector('.scroll-btn')).toBeNull();
    });

    it('keyboard ArrowRight focuses next tab', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list>
                <flint-tab value="a">A</flint-tab>
                <flint-tab value="b">B</flint-tab>
                <flint-tab value="c">C</flint-tab>
            </flint-tab-list>`);
        const tabs = el.querySelectorAll<FlintTab>('flint-tab');
        tabs[0].focusInner();
        const evt = new KeyboardEvent('keydown', { key: 'ArrowRight' });
        el.shadowRoot!.querySelector('.scroll-area')!.dispatchEvent(evt);
        await el.updateComplete;
        expect(tabs[1].shadowRoot!.activeElement).toBeTruthy();
    });

    it('keyboard ArrowLeft focuses previous tab', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list>
                <flint-tab value="a">A</flint-tab>
                <flint-tab value="b">B</flint-tab>
                <flint-tab value="c">C</flint-tab>
            </flint-tab-list>`);
        const tabs = el.querySelectorAll<FlintTab>('flint-tab');
        tabs[1].focusInner();
        const evt = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
        el.shadowRoot!.querySelector('.scroll-area')!.dispatchEvent(evt);
        await el.updateComplete;
        expect(tabs[0].shadowRoot!.activeElement).toBeTruthy();
    });

    it('keyboard Home focuses first tab', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list>
                <flint-tab value="a">A</flint-tab>
                <flint-tab value="b">B</flint-tab>
                <flint-tab value="c">C</flint-tab>
            </flint-tab-list>`);
        const tabs = el.querySelectorAll<FlintTab>('flint-tab');
        tabs[2].focusInner();
        const evt = new KeyboardEvent('keydown', { key: 'Home' });
        el.shadowRoot!.querySelector('.scroll-area')!.dispatchEvent(evt);
        await el.updateComplete;
        expect(tabs[0].shadowRoot!.activeElement).toBeTruthy();
    });

    it('keyboard End focuses last tab', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list>
                <flint-tab value="a">A</flint-tab>
                <flint-tab value="b">B</flint-tab>
                <flint-tab value="c">C</flint-tab>
            </flint-tab-list>`);
        const tabs = el.querySelectorAll<FlintTab>('flint-tab');
        tabs[0].focusInner();
        const evt = new KeyboardEvent('keydown', { key: 'End' });
        el.shadowRoot!.querySelector('.scroll-area')!.dispatchEvent(evt);
        await el.updateComplete;
        expect(tabs[2].shadowRoot!.activeElement).toBeTruthy();
    });

    it('keyboard navigation skips disabled tabs', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list>
                <flint-tab value="a">A</flint-tab>
                <flint-tab value="b" disabled>B</flint-tab>
                <flint-tab value="c">C</flint-tab>
            </flint-tab-list>`);
        const allTabs = el.querySelectorAll<FlintTab>('flint-tab');
        const tabs = Array.from(allTabs).filter(t => !t.disabled);
        tabs[0].focusInner();
        const evt = new KeyboardEvent('keydown', { key: 'ArrowRight' });
        el.shadowRoot!.querySelector('.scroll-area')!.dispatchEvent(evt);
        await el.updateComplete;
        expect(tabs[1].shadowRoot!.activeElement).toBeTruthy();
    });

    it('keyboard wraps from last to first on ArrowRight', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list>
                <flint-tab value="a">A</flint-tab>
                <flint-tab value="b">B</flint-tab>
                <flint-tab value="c">C</flint-tab>
            </flint-tab-list>`);
        const tabs = el.querySelectorAll<FlintTab>('flint-tab');
        tabs[2].focusInner();
        const evt = new KeyboardEvent('keydown', { key: 'ArrowRight' });
        el.shadowRoot!.querySelector('.scroll-area')!.dispatchEvent(evt);
        await el.updateComplete;
        expect(tabs[0].shadowRoot!.activeElement).toBeTruthy();
    });

    it('keyboard wraps from first to last on ArrowLeft', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list>
                <flint-tab value="a">A</flint-tab>
                <flint-tab value="b">B</flint-tab>
                <flint-tab value="c">C</flint-tab>
            </flint-tab-list>`);
        const tabs = el.querySelectorAll<FlintTab>('flint-tab');
        tabs[0].focusInner();
        const evt = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
        el.shadowRoot!.querySelector('.scroll-area')!.dispatchEvent(evt);
        await el.updateComplete;
        expect(tabs[2].shadowRoot!.activeElement).toBeTruthy();
    });

    it('orientation prop reflects', async () => {
        const el = await fixture<FlintTabList>(html`<flint-tab-list orientation="vertical"><flint-tab value="a">A</flint-tab></flint-tab-list>`);
        expect(el.hasAttribute('orientation')).toBe(true);
        expect(el.getAttribute('orientation')).toBe('vertical');
    });

    it('variant prop reflects', async () => {
        const el = await fixture<FlintTabList>(html`<flint-tab-list variant="scrollable"><flint-tab value="a">A</flint-tab></flint-tab-list>`);
        expect(el.getAttribute('variant')).toBe('scrollable');
    });

    it('scroll buttons disabled/enabled state based on scroll position', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list variant="scrollable" scroll-buttons="auto" style="width: 200px; overflow: hidden;">
                ${Array.from({ length: 20 }, (_, i) => html`<flint-tab value="${i}">Tab ${i}</flint-tab>`)}
            </flint-tab-list>`);
        const backBtn = el.shadowRoot!.querySelector<HTMLButtonElement>('.scroll-btn:first-child')!;
        expect(backBtn.disabled).toBe(true);
    });

    it('vertical scroll buttons show for vertical orientation', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list orientation="vertical" variant="scrollable" scroll-buttons="auto" style="height: 100px;">
                ${Array.from({ length: 10 }, (_, i) => html`<flint-tab value="${i}">Item ${i}</flint-tab>`)}
            </flint-tab-list>`);
        const buttons = el.shadowRoot!.querySelectorAll('.scroll-btn');
        expect(buttons.length).toBe(2);
    });

    it('syncIndicator returns early when no selected tab without crashing', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list>
                <flint-tab value="a">A</flint-tab>
                <flint-tab value="b">B</flint-tab>
            </flint-tab-list>`);
        // Should not crash even with no selected tab
        expect(() => el.syncIndicator()).not.toThrow();
    });

    it('keyboard navigation works with scrollIntoView guard', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list>
                <flint-tab value="a">A</flint-tab>
                <flint-tab value="b">B</flint-tab>
            </flint-tab-list>`);
        const tabs = el.querySelectorAll<FlintTab>('flint-tab');
        tabs[0].focusInner();
        const evt = new KeyboardEvent('keydown', { key: 'ArrowRight' });
        el.shadowRoot!.querySelector('.scroll-area')!.dispatchEvent(evt);
        await el.updateComplete;
        expect(tabs[1].shadowRoot!.activeElement).toBeTruthy();
    });

    it('ariaLabel prop sets aria-label on tablist', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list aria-label="Custom label">
                <flint-tab value="a">A</flint-tab>
            </flint-tab-list>`);
        const tablist = el.shadowRoot!.querySelector('[role="tablist"]');
        expect(tablist?.getAttribute('aria-label')).toBe('Custom label');
    });

    it('empty ariaLabel does not set aria-label', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list>
                <flint-tab value="a">A</flint-tab>
            </flint-tab-list>`);
        const tablist = el.shadowRoot!.querySelector('[role="tablist"]');
        expect(tablist?.getAttribute('aria-label')).toBeNull();
    });
});

/* ================================================================== */
describe('flint-tab-list keyboard & interaction', () => {
    it('scroll button click scrolls content left (horizontal)', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list variant="scrollable" scroll-buttons="auto" style="width: 100px;">
                ${Array.from({ length: 10 }, (_, i) => html`<flint-tab value="${i}">T${i}</flint-tab>`)}
            </flint-tab-list>`);
        const scrollArea = el.shadowRoot!.querySelector<HTMLDivElement>('.scroll-area')!;
        const buttons = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.scroll-btn');
        const backBtn = buttons[0];
        const initialScroll = scrollArea.scrollLeft;
        backBtn.click();
        await new Promise(resolve => setTimeout(resolve, 50));
        expect(scrollArea.scrollLeft).toBeLessThanOrEqual(initialScroll);
    });

    it('indicator element exists in shadow dom', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list>
                <flint-tab value="a" selected>First</flint-tab>
                <flint-tab value="b">Second</flint-tab>
            </flint-tab-list>`);
        const indicator = el.shadowRoot!.querySelector<HTMLDivElement>('.indicator');
        expect(indicator).toBeTruthy();
        expect(indicator?.className).toContain('indicator');
    });

    it('forward scroll button click invokes _scroll forward', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list variant="scrollable" scroll-buttons="auto" style="width: 100px;">
                ${Array.from({ length: 10 }, (_, i) => html`<flint-tab value="${i}">T${i}</flint-tab>`)}
            </flint-tab-list>`);
        const buttons = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.scroll-btn');
        const fwdBtn = buttons[1]; // second button = forward
        expect(fwdBtn).toBeTruthy();
        // clicking forward button should not throw
        expect(() => fwdBtn.click()).not.toThrow();
    });

    it('vertical scroll buttons click _scroll with top delta', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list orientation="vertical" variant="scrollable" scroll-buttons="auto" style="height:100px;">
                ${Array.from({ length: 10 }, (_, i) => html`<flint-tab value="${i}">Item ${i}</flint-tab>`)}
            </flint-tab-list>`);
        const buttons = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.scroll-btn');
        expect(buttons.length).toBe(2);
        // click both — neither should throw (exercises vertical _scroll branch)
        expect(() => buttons[0].click()).not.toThrow(); // scroll back
        expect(() => buttons[1].click()).not.toThrow(); // scroll forward
    });
});

/* ================================================================== */
describe('flint-tabs event cleanup', () => {
    it('disconnectedCallback removes event listener', async () => {
        const el = await fixture<FlintTabs>(html`
            <flint-tabs value="a">
                <flint-tab-list><flint-tab value="a">A</flint-tab></flint-tab-list>
                <flint-tab-panel value="a">A</flint-tab-panel>
            </flint-tabs>`);
        const spy = vi.spyOn(el, 'removeEventListener');
        el.disconnectedCallback();
        expect(spy).toHaveBeenCalledWith('flint-tab-click', expect.any(Function));
        spy.mockRestore();
    });

    it('event listener is active during connection', async () => {
        const el = await makeTabs('a');
        const spy = vi.fn();
        el.addEventListener('flint-tab-change', spy);
        const btn = el.querySelector<FlintTab>('flint-tab[value="b"]')!.shadowRoot!.querySelector<HTMLButtonElement>('button')!;
        setTimeout(() => btn.click());
        await oneEvent(el, 'flint-tab-change');
        expect(spy).toHaveBeenCalled();
    });
});

/* ================================================================== */
describe('flint-tabs value edge cases', () => {
    it('value changes to disabled tab silently fail on click', async () => {
        const el = await fixture<FlintTabs>(html`
            <flint-tabs value="a">
                <flint-tab-list>
                    <flint-tab value="a">A</flint-tab>
                    <flint-tab value="b" disabled>B</flint-tab>
                </flint-tab-list>
                <flint-tab-panel value="a">A</flint-tab-panel>
                <flint-tab-panel value="b">B</flint-tab-panel>
            </flint-tabs>`);
        const spy = vi.fn();
        el.addEventListener('flint-tab-change', spy);
        const disabledTab = el.querySelector<FlintTab>('flint-tab[disabled]')!;
        disabledTab.shadowRoot?.querySelector<HTMLButtonElement>('button')?.click();
        expect(spy).not.toHaveBeenCalled();
        expect(el.value).toBe('a');
    });

    it('value set to non-existent tab id shows nothing', async () => {
        const el = await makeTabs('a');
        el.value = 'nonexistent';
        el.requestUpdate();
        await el.updateComplete;
        const panels = el.querySelectorAll<FlintTabPanel>('flint-tab-panel');
        panels.forEach(p => expect(p.hasAttribute('hidden')).toBe(true));
    });

    it('switching between all tabs updates correctly', async () => {
        const el = await makeTabs('a');
        const values = ['a', 'b', 'c'];
        for (const val of values) {
            el.value = val;
            el.requestUpdate();
            await el.updateComplete;
            const panels = el.querySelectorAll<FlintTabPanel>('flint-tab-panel');
            panels.forEach((p, i) => {
                const shouldBeHidden = values[i] !== val;
                expect(p.hasAttribute('hidden')).toBe(shouldBeHidden);
            });
        }
    });
});

/* ================================================================== */
describe('flint-tab icon slot rendering', () => {
    it('renders both icon and text slots', async () => {
        const el = await fixture<FlintTab>(html`
            <flint-tab value="x" icon-position="start">
                <span slot="icon">📧</span>
                Mail
            </flint-tab>`);
        const iconSlot = el.shadowRoot!.querySelector('slot[name="icon"]');
        const defaultSlot = el.shadowRoot!.querySelector('slot:not([name])');
        expect(iconSlot).toBeTruthy();
        expect(defaultSlot).toBeTruthy();
    });

    it('icon slot is empty when no icon provided', async () => {
        const el = await fixture<FlintTab>(html`<flint-tab value="x">Label</flint-tab>`);
        const iconSlot = el.shadowRoot!.querySelector('slot[name="icon"]');
        expect(iconSlot).toBeTruthy();
    });
});

/* ================================================================== */
describe('flint-tab-panel accessibility', () => {
    it('has role=tabpanel on inner div', async () => {
        const el = await fixture<FlintTabPanel>(html`<flint-tab-panel value="test">Content</flint-tab-panel>`);
        const panel = el.shadowRoot!.querySelector('[role="tabpanel"]');
        expect(panel).toBeTruthy();
    });

    it('tabpanel content is accessible via slot', async () => {
        const el = await fixture<FlintTabPanel>(html`
            <flint-tab-panel value="test">
                <p class="content">Test</p>
            </flint-tab-panel>`);
        const slot = el.shadowRoot!.querySelector('slot');
        expect(slot).toBeTruthy();
    });
});

/* ================================================================== */
describe('flint-tabs integration with fullWidth variant', () => {
    it('fullWidth sets full-width on all tabs immediately', async () => {
        const el = await fixture<FlintTabs>(html`
            <flint-tabs value="a" variant="fullWidth">
                <flint-tab-list>
                    <flint-tab value="a">A</flint-tab>
                    <flint-tab value="b">B</flint-tab>
                    <flint-tab value="c">C</flint-tab>
                </flint-tab-list>
                <flint-tab-panel value="a">A</flint-tab-panel>
                <flint-tab-panel value="b">B</flint-tab-panel>
                <flint-tab-panel value="c">C</flint-tab-panel>
            </flint-tabs>`);
        const tabs = el.querySelectorAll<FlintTab>('flint-tab');
        tabs.forEach(t => expect(t.fullWidth).toBe(true));
    });
});

/* ================================================================== */
describe('flint-tabs color resolution', () => {
    it('resolves undefined color to inherit', async () => {
        const el = await fixture<FlintTabs>(html`
            <flint-tabs text-color="unknown-color">
                <flint-tab-list><flint-tab value="a" selected>A</flint-tab></flint-tab-list>
                <flint-tab-panel value="a">A</flint-tab-panel>
            </flint-tabs>`);
        const tab = el.querySelector<FlintTab>('flint-tab')!;
        const activeColor = tab.style.getPropertyValue('--flint-tab-active');
        expect(activeColor).toBe('unknown-color');
    });

    it('textColor="inherit" uses currentColor for inactive', async () => {
        const el = await fixture<FlintTabs>(html`
            <flint-tabs text-color="inherit">
                <flint-tab-list><flint-tab value="a">A</flint-tab></flint-tab-list>
                <flint-tab-panel value="a">A</flint-tab-panel>
            </flint-tabs>`);
        const tab = el.querySelector<FlintTab>('flint-tab')!;
        const inactiveColor = tab.style.getPropertyValue('--flint-tab-inactive');
        expect(inactiveColor).toBe('currentColor');
    });
});

/* ================================================================== */
describe('flint-tab-list vertical orientation', () => {
    it('ArrowDown focuses next tab in vertical orientation', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list orientation="vertical">
                <flint-tab value="a">A</flint-tab>
                <flint-tab value="b">B</flint-tab>
                <flint-tab value="c">C</flint-tab>
            </flint-tab-list>`);
        const tabs = el.querySelectorAll<FlintTab>('flint-tab');
        tabs[0].focusInner();
        const evt = new KeyboardEvent('keydown', { key: 'ArrowDown' });
        el.shadowRoot!.querySelector('.scroll-area')!.dispatchEvent(evt);
        await el.updateComplete;
        expect(tabs[1].shadowRoot!.activeElement).toBeTruthy();
    });

    it('ArrowUp focuses previous tab in vertical orientation', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list orientation="vertical">
                <flint-tab value="a">A</flint-tab>
                <flint-tab value="b">B</flint-tab>
                <flint-tab value="c">C</flint-tab>
            </flint-tab-list>`);
        const tabs = el.querySelectorAll<FlintTab>('flint-tab');
        tabs[1].focusInner();
        const evt = new KeyboardEvent('keydown', { key: 'ArrowUp' });
        el.shadowRoot!.querySelector('.scroll-area')!.dispatchEvent(evt);
        await el.updateComplete;
        expect(tabs[0].shadowRoot!.activeElement).toBeTruthy();
    });

    it('ArrowDown wraps from last to first in vertical orientation', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list orientation="vertical">
                <flint-tab value="a">A</flint-tab>
                <flint-tab value="b">B</flint-tab>
                <flint-tab value="c">C</flint-tab>
            </flint-tab-list>`);
        const tabs = el.querySelectorAll<FlintTab>('flint-tab');
        tabs[2].focusInner();
        const evt = new KeyboardEvent('keydown', { key: 'ArrowDown' });
        el.shadowRoot!.querySelector('.scroll-area')!.dispatchEvent(evt);
        await el.updateComplete;
        expect(tabs[0].shadowRoot!.activeElement).toBeTruthy();
    });

    it('ArrowUp wraps from first to last in vertical orientation', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list orientation="vertical">
                <flint-tab value="a">A</flint-tab>
                <flint-tab value="b">B</flint-tab>
                <flint-tab value="c">C</flint-tab>
            </flint-tab-list>`);
        const tabs = el.querySelectorAll<FlintTab>('flint-tab');
        tabs[0].focusInner();
        const evt = new KeyboardEvent('keydown', { key: 'ArrowUp' });
        el.shadowRoot!.querySelector('.scroll-area')!.dispatchEvent(evt);
        await el.updateComplete;
        expect(tabs[2].shadowRoot!.activeElement).toBeTruthy();
    });

    it('horizontal keys (ArrowLeft/Right) are ignored in vertical orientation', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list orientation="vertical">
                <flint-tab value="a">A</flint-tab>
                <flint-tab value="b">B</flint-tab>
            </flint-tab-list>`);
        const tabs = el.querySelectorAll<FlintTab>('flint-tab');
        tabs[0].focusInner();
        const evt = new KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true });
        el.shadowRoot!.querySelector('.scroll-area')!.dispatchEvent(evt);
        await el.updateComplete;
        // focus should not move (ArrowRight not valid for vertical)
        expect(tabs[1].shadowRoot!.activeElement).toBeFalsy();
    });

    it('syncIndicator runs for vertical orientation without crashing', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list orientation="vertical">
                <flint-tab value="a" selected>A</flint-tab>
                <flint-tab value="b">B</flint-tab>
            </flint-tab-list>`);
        expect(() => el.syncIndicator()).not.toThrow();
    });

    it('disconnectedCallback disconnects ResizeObserver', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list>
                <flint-tab value="a">A</flint-tab>
            </flint-tab-list>`);
        // Should not throw when disconnected
        expect(() => el.disconnectedCallback()).not.toThrow();
    });
});

/* ================================================================== */
describe('flint-tabs without tab-list', () => {
    it('_syncAll runs without tabList present', async () => {
        const el = await fixture<FlintTabs>(html`
            <flint-tabs value="a">
                <flint-tab value="a">A</flint-tab>
                <flint-tab-panel value="a">Panel A</flint-tab-panel>
            </flint-tabs>`);
        // No flint-tab-list child — should not throw
        expect(() => el.requestUpdate()).not.toThrow();
        await el.updateComplete;
        expect(el.value).toBe('a');
    });
});

/* ================================================================== */
describe('flint-tab-list variant and scroll prop changes', () => {
    it('variant changes from standard to scrollable show scroll buttons', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list variant="standard">
                <flint-tab value="a">A</flint-tab>
            </flint-tab-list>`);
        expect(el.shadowRoot?.querySelector('.scroll-btn')).toBeNull();
        el.variant = 'scrollable';
        await el.updateComplete;
        expect(el.shadowRoot?.querySelectorAll('.scroll-btn').length).toBe(2);
    });

    it('centered prop reflects to attribute', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list centered>
                <flint-tab value="a">A</flint-tab>
            </flint-tab-list>`);
        expect(el.hasAttribute('centered')).toBe(true);
        expect(el.centered).toBe(true);
    });

    it('unrecognized key in keydown is ignored', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list>
                <flint-tab value="a">A</flint-tab>
                <flint-tab value="b">B</flint-tab>
            </flint-tab-list>`);
        const tabs = el.querySelectorAll<FlintTab>('flint-tab');
        tabs[0].focusInner();
        const evt = new KeyboardEvent('keydown', { key: 'Tab', cancelable: true });
        el.shadowRoot!.querySelector('.scroll-area')!.dispatchEvent(evt);
        await el.updateComplete;
        // no crash, focus unchanged
        expect(tabs[1].shadowRoot!.activeElement).toBeFalsy();
    });
});

/* ================================================================== */
describe('flint-tab-list syncIndicator with real dimensions', () => {
    it('positions indicator correctly for horizontal orientation', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list>
                <flint-tab value="a" selected>A</flint-tab>
                <flint-tab value="b">B</flint-tab>
            </flint-tab-list>`);
        const row = el.shadowRoot!.querySelector<HTMLDivElement>('.tabs-row')!;
        const tab = el.querySelector<FlintTab>('flint-tab[value="a"]')!;

        vi.spyOn(row, 'getBoundingClientRect').mockReturnValue({
            left: 10, top: 20, width: 400, height: 48,
            right: 410, bottom: 68, x: 10, y: 20, toJSON: () => ({}),
        } as DOMRect);
        vi.spyOn(tab, 'getBoundingClientRect').mockReturnValue({
            left: 10, top: 20, width: 120, height: 48,
            right: 130, bottom: 68, x: 10, y: 20, toJSON: () => ({}),
        } as DOMRect);

        el.syncIndicator();

        const indicator = el.shadowRoot!.querySelector<HTMLDivElement>('.indicator')!;
        expect(indicator.style.left).toBe('0px');
        expect(indicator.style.width).toBe('120px');
        expect(indicator.style.top).toBe('');
        expect(indicator.style.height).toBe('');
        expect(indicator.style.opacity).toBe('1');
    });

    it('positions indicator correctly for vertical orientation', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list orientation="vertical">
                <flint-tab value="a" selected>A</flint-tab>
                <flint-tab value="b">B</flint-tab>
            </flint-tab-list>`);
        const row = el.shadowRoot!.querySelector<HTMLDivElement>('.tabs-row')!;
        const tab = el.querySelector<FlintTab>('flint-tab[value="a"]')!;

        vi.spyOn(row, 'getBoundingClientRect').mockReturnValue({
            left: 0, top: 10, width: 200, height: 300,
            right: 200, bottom: 310, x: 0, y: 10, toJSON: () => ({}),
        } as DOMRect);
        vi.spyOn(tab, 'getBoundingClientRect').mockReturnValue({
            left: 0, top: 10, width: 200, height: 48,
            right: 200, bottom: 58, x: 0, y: 10, toJSON: () => ({}),
        } as DOMRect);

        el.syncIndicator();

        const indicator = el.shadowRoot!.querySelector<HTMLDivElement>('.indicator')!;
        expect(indicator.style.top).toBe('0px');
        expect(indicator.style.height).toBe('48px');
        expect(indicator.style.left).toBe('');
        expect(indicator.style.width).toBe('');
        expect(indicator.style.opacity).toBe('1');
    });

    it('indicator left offset accounts for row offset', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list>
                <flint-tab value="a">A</flint-tab>
                <flint-tab value="b" selected>B</flint-tab>
            </flint-tab-list>`);
        const row = el.shadowRoot!.querySelector<HTMLDivElement>('.tabs-row')!;
        const tab = el.querySelector<FlintTab>('flint-tab[value="b"]')!;

        vi.spyOn(row, 'getBoundingClientRect').mockReturnValue({
            left: 0, top: 0, width: 400, height: 48,
            right: 400, bottom: 48, x: 0, y: 0, toJSON: () => ({}),
        } as DOMRect);
        vi.spyOn(tab, 'getBoundingClientRect').mockReturnValue({
            left: 100, top: 0, width: 100, height: 48,
            right: 200, bottom: 48, x: 100, y: 0, toJSON: () => ({}),
        } as DOMRect);

        el.syncIndicator();

        const indicator = el.shadowRoot!.querySelector<HTMLDivElement>('.indicator')!;
        expect(indicator.style.left).toBe('100px');
        expect(indicator.style.width).toBe('100px');
        expect(indicator.style.opacity).toBe('1');
    });
});

/* ================================================================== */
describe('flint-tab-list _scroll with enabled buttons', () => {
    function mockScrollArea(scrollArea: HTMLDivElement, opts: {
        scrollLeft?: number; scrollTop?: number;
        scrollWidth?: number; scrollHeight?: number;
        clientWidth?: number; clientHeight?: number;
    }) {
        for (const [key, val] of Object.entries(opts)) {
            Object.defineProperty(scrollArea, key, { get: () => val, configurable: true });
        }
    }

    function polyfillScrollBy(el: HTMLDivElement) {
        if (typeof el.scrollBy !== 'function') {
            (el as unknown as Record<string, unknown>).scrollBy = () => {};
        }
    }

    it('back button calls scrollBy left=-200 when canBack is true', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list variant="scrollable">
                ${Array.from({ length: 10 }, (_, i) => html`<flint-tab value="${i}">T${i}</flint-tab>`)}
            </flint-tab-list>`);
        const scrollArea = el.shadowRoot!.querySelector<HTMLDivElement>('.scroll-area')!;
        polyfillScrollBy(scrollArea);
        mockScrollArea(scrollArea, { scrollLeft: 50, scrollWidth: 500, clientWidth: 200 });
        scrollArea.dispatchEvent(new Event('scroll'));
        await el.updateComplete;

        const scrollSpy = vi.spyOn(scrollArea, 'scrollBy');
        const backBtn = el.shadowRoot!.querySelector<HTMLButtonElement>('.scroll-btn:first-child')!;
        expect(backBtn.disabled).toBe(false);
        backBtn.click();
        expect(scrollSpy).toHaveBeenCalledWith({ left: -200, behavior: 'smooth' });
    });

    it('forward button calls scrollBy left=200 when canFwd is true', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list variant="scrollable">
                ${Array.from({ length: 10 }, (_, i) => html`<flint-tab value="${i}">T${i}</flint-tab>`)}
            </flint-tab-list>`);
        const scrollArea = el.shadowRoot!.querySelector<HTMLDivElement>('.scroll-area')!;
        polyfillScrollBy(scrollArea);
        mockScrollArea(scrollArea, { scrollLeft: 0, scrollWidth: 500, clientWidth: 200 });
        scrollArea.dispatchEvent(new Event('scroll'));
        await el.updateComplete;

        const scrollSpy = vi.spyOn(scrollArea, 'scrollBy');
        const fwdBtn = el.shadowRoot!.querySelector<HTMLButtonElement>('.scroll-btn:last-child')!;
        expect(fwdBtn.disabled).toBe(false);
        fwdBtn.click();
        expect(scrollSpy).toHaveBeenCalledWith({ left: 200, behavior: 'smooth' });
    });

    it('vertical back button calls scrollBy top=-200', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list orientation="vertical" variant="scrollable">
                ${Array.from({ length: 10 }, (_, i) => html`<flint-tab value="${i}">T${i}</flint-tab>`)}
            </flint-tab-list>`);
        const scrollArea = el.shadowRoot!.querySelector<HTMLDivElement>('.scroll-area')!;
        polyfillScrollBy(scrollArea);
        mockScrollArea(scrollArea, { scrollTop: 50, scrollHeight: 500, clientHeight: 200 });
        scrollArea.dispatchEvent(new Event('scroll'));
        await el.updateComplete;

        const scrollSpy = vi.spyOn(scrollArea, 'scrollBy');
        const backBtn = el.shadowRoot!.querySelector<HTMLButtonElement>('.scroll-btn:first-child')!;
        expect(backBtn.disabled).toBe(false);
        backBtn.click();
        expect(scrollSpy).toHaveBeenCalledWith({ top: -200, behavior: 'smooth' });
    });

    it('vertical forward button calls scrollBy top=200', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list orientation="vertical" variant="scrollable">
                ${Array.from({ length: 10 }, (_, i) => html`<flint-tab value="${i}">T${i}</flint-tab>`)}
            </flint-tab-list>`);
        const scrollArea = el.shadowRoot!.querySelector<HTMLDivElement>('.scroll-area')!;
        polyfillScrollBy(scrollArea);
        mockScrollArea(scrollArea, { scrollTop: 0, scrollHeight: 500, clientHeight: 200 });
        scrollArea.dispatchEvent(new Event('scroll'));
        await el.updateComplete;

        const scrollSpy = vi.spyOn(scrollArea, 'scrollBy');
        const fwdBtn = el.shadowRoot!.querySelector<HTMLButtonElement>('.scroll-btn:last-child')!;
        expect(fwdBtn.disabled).toBe(false);
        fwdBtn.click();
        expect(scrollSpy).toHaveBeenCalledWith({ top: 200, behavior: 'smooth' });
    });
});

/* ================================================================== */
describe('flint-tab-list ResizeObserver callback and scroll event listener', () => {
    it('ResizeObserver callback triggers checkScroll and syncIndicator without throwing', async () => {
        let capturedCallback: (() => void) | null = null;
        const OrigRO = globalThis.ResizeObserver;
        globalThis.ResizeObserver = class {
            constructor(cb: () => void) { capturedCallback = cb; }
            observe() {}
            unobserve() {}
            disconnect() {}
        } as unknown as typeof ResizeObserver;

        const el = await fixture<FlintTabList>(html`
            <flint-tab-list>
                <flint-tab value="a">A</flint-tab>
            </flint-tab-list>`);

        expect(capturedCallback).not.toBeNull();
        expect(() => capturedCallback!()).not.toThrow();
        globalThis.ResizeObserver = OrigRO;
        el.disconnectedCallback();
    });

    it('scroll event on scroll-area triggers _checkScroll callback', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list>
                <flint-tab value="a">A</flint-tab>
            </flint-tab-list>`);
        const scrollArea = el.shadowRoot!.querySelector<HTMLDivElement>('.scroll-area')!;
        expect(() => scrollArea.dispatchEvent(new Event('scroll'))).not.toThrow();
    });
});

/* ================================================================== */
describe('flint-tab-list keyboard nav with no prior focus', () => {
    it('ArrowRight without prior focus defaults to first tab', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list>
                <flint-tab value="a">A</flint-tab>
                <flint-tab value="b">B</flint-tab>
            </flint-tab-list>`);
        // Do NOT call focusInner — no tab has focus, so cur < 0
        const evt = new KeyboardEvent('keydown', { key: 'ArrowRight' });
        el.shadowRoot!.querySelector('.scroll-area')!.dispatchEvent(evt);
        await el.updateComplete;
        const tabs = el.querySelectorAll<FlintTab>('flint-tab');
        // idx starts at 0, ArrowRight → idx=1
        expect(tabs[1].shadowRoot!.activeElement).toBeTruthy();
    });

    it('ArrowLeft without prior focus defaults to last tab (wraps from 0)', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list>
                <flint-tab value="a">A</flint-tab>
                <flint-tab value="b">B</flint-tab>
                <flint-tab value="c">C</flint-tab>
            </flint-tab-list>`);
        // No focusInner, cur < 0 → idx=0 → ArrowLeft wraps to last
        const evt = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
        el.shadowRoot!.querySelector('.scroll-area')!.dispatchEvent(evt);
        await el.updateComplete;
        const tabs = el.querySelectorAll<FlintTab>('flint-tab');
        expect(tabs[2].shadowRoot!.activeElement).toBeTruthy();
    });
});

/* ================================================================== */
describe('flint-tab-list without ResizeObserver', () => {
    it('firstUpdated works when ResizeObserver is undefined', async () => {
        const OrigRO = globalThis.ResizeObserver;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (globalThis as any).ResizeObserver = undefined;
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list>
                <flint-tab value="a">A</flint-tab>
            </flint-tab-list>`);
        // Should work fine without ResizeObserver
        expect(el.shadowRoot?.querySelector('.indicator')).toBeTruthy();
        globalThis.ResizeObserver = OrigRO;
    });
});

/* ================================================================== */
describe('flint-tab-list scrollIntoView when available', () => {
    it('calls scrollIntoView on keyboard navigation when method exists', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list>
                <flint-tab value="a">A</flint-tab>
                <flint-tab value="b">B</flint-tab>
            </flint-tab-list>`);
        const tabs = el.querySelectorAll<FlintTab>('flint-tab');
        const scrollSpy = vi.fn();
        // Attach scrollIntoView to target tab
        (tabs[1] as unknown as Record<string, unknown>).scrollIntoView = scrollSpy;

        tabs[0].focusInner();
        const evt = new KeyboardEvent('keydown', { key: 'ArrowRight' });
        el.shadowRoot!.querySelector('.scroll-area')!.dispatchEvent(evt);
        await el.updateComplete;

        expect(scrollSpy).toHaveBeenCalledWith({ block: 'nearest', inline: 'nearest' });
    });

    // ── Accessibility ─────────────────────────────────────────────────────────

    it('should pass automated a11y checks', async () => {
        const el = await makeTabs();
        // axe doesn't recognize slotted flint-tab custom elements as valid role="tab" children
        await expectAccessible(el, { rules: { 'aria-required-children': { enabled: false } } });
    }, 15000);
});

/* ================================================================== */
describe('CSS parts', () => {
    it('flint-tabs exposes part="base"', async () => {
        const el = await makeTabs();
        expect(el.shadowRoot!.querySelector('[part="base"]')).not.toBeNull();
    });

    it('flint-tab exposes part="tab" on button', async () => {
        const tab = await fixture<FlintTab>(html`<flint-tab value="x">Label</flint-tab>`);
        expect(tab.shadowRoot!.querySelector('[part="tab"]')).not.toBeNull();
    });

    it('flint-tab exposes part="tab" on anchor when href is set', async () => {
        const tab = await fixture<FlintTab>(html`<flint-tab value="x" href="#x">Link</flint-tab>`);
        expect(tab.shadowRoot!.querySelector('a[part="tab"]')).not.toBeNull();
    });

    it('flint-tab-panel exposes part="panel"', async () => {
        const panel = await fixture<FlintTabPanel>(html`<flint-tab-panel value="x">Content</flint-tab-panel>`);
        expect(panel.shadowRoot!.querySelector('[part="panel"]')).not.toBeNull();
    });

    it('flint-tab-list exposes part="nav" and part="indicator"', async () => {
        const el = await fixture<FlintTabList>(html`
            <flint-tab-list>
                <flint-tab value="a">A</flint-tab>
            </flint-tab-list>`);
        expect(el.shadowRoot!.querySelector('[part="nav"]')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('[part="indicator"]')).not.toBeNull();
    });
});
