import { describe, it, expect, vi } from 'vitest';
import { fixture, html, oneEvent } from '@open-wc/testing';
import './ui-tabs.js';
import type { UiTab, UiTabList, UiTabPanel, UiTabs } from './ui-tabs.js';

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
});
