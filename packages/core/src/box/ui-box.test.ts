import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-box.js';
import type { UiBox } from './ui-box.js';

describe('ui-box', () => {
    // ── Registration ─────────────────────────────────────────────────
    it('is defined', () => {
        const el = document.createElement('ui-box');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    // ── Component prop ───────────────────────────────────────────────
    it('renders a div by default', async () => {
        const el = await fixture<UiBox>(html`<ui-box>Content</ui-box>`);
        expect(el.shadowRoot?.querySelector('div')).toBeTruthy();
    });

    it('renders a different element when "component" is set', async () => {
        const el = await fixture<UiBox>(html`<ui-box component="section">Content</ui-box>`);
        expect(el.shadowRoot?.querySelector('section')).toBeTruthy();
        expect(el.shadowRoot?.querySelector('div')).toBeNull();
    });

    it('renders all allowed component tags', async () => {
        const tags = [
            'span', 'article', 'header', 'footer', 'main', 'aside', 'nav',
            'ul', 'ol', 'li', 'p', 'form', 'fieldset', 'label', 'figure',
            'figcaption', 'address', 'blockquote', 'details', 'summary', 'dialog',
        ];
        for (const tag of tags) {
            const el = await fixture<UiBox>(html`<ui-box .component=${tag}>x</ui-box>`);
            expect(el.shadowRoot?.querySelector(tag)).toBeTruthy();
        }
    });

    it('falls back to div and warns for an invalid component tag', async () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        const el = await fixture<UiBox>(html`<ui-box component="script">Content</ui-box>`);
        expect(el.shadowRoot?.querySelector('div')).toBeTruthy();
        expect(el.shadowRoot?.querySelector('script')).toBeNull();
        expect(warn).toHaveBeenCalledWith(expect.stringContaining('"script"'));
        warn.mockRestore();
    });

    // ── Margin shorthands ────────────────────────────────────────────
    it('applies m (margin shorthand)', async () => {
        const el = await fixture<UiBox>(html`<ui-box m="16px">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.margin).toBe('16px');
    });

    it('applies mx (marginLeft + marginRight)', async () => {
        const el = await fixture<UiBox>(html`<ui-box mx="20px">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.marginLeft).toBe('20px');
        expect(inner.style.marginRight).toBe('20px');
    });

    it('applies my (marginTop + marginBottom)', async () => {
        const el = await fixture<UiBox>(html`<ui-box my="8px">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.marginTop).toBe('8px');
        expect(inner.style.marginBottom).toBe('8px');
    });

    it('applies mt (marginTop)', async () => {
        const el = await fixture<UiBox>(html`<ui-box mt="4px">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.marginTop).toBe('4px');
    });

    it('applies mr (marginRight)', async () => {
        const el = await fixture<UiBox>(html`<ui-box mr="6px">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.marginRight).toBe('6px');
    });

    it('applies mb (marginBottom)', async () => {
        const el = await fixture<UiBox>(html`<ui-box mb="10px">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.marginBottom).toBe('10px');
    });

    it('applies ml (marginLeft)', async () => {
        const el = await fixture<UiBox>(html`<ui-box ml="12px">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.marginLeft).toBe('12px');
    });

    it('specific mt overrides my', async () => {
        const el = await fixture<UiBox>(html`<ui-box my="20px" mt="5px">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.marginTop).toBe('5px');
        expect(inner.style.marginBottom).toBe('20px');
    });

    it('specific ml overrides mx', async () => {
        const el = await fixture<UiBox>(html`<ui-box mx="20px" ml="5px">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.marginLeft).toBe('5px');
        expect(inner.style.marginRight).toBe('20px');
    });

    // ── Padding shorthands ───────────────────────────────────────────
    it('applies p (padding shorthand)', async () => {
        const el = await fixture<UiBox>(html`<ui-box p="12px">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.padding).toBe('12px');
    });

    it('applies px (paddingLeft + paddingRight)', async () => {
        const el = await fixture<UiBox>(html`<ui-box px="20px">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.paddingLeft).toBe('20px');
        expect(inner.style.paddingRight).toBe('20px');
    });

    it('applies py (paddingTop + paddingBottom)', async () => {
        const el = await fixture<UiBox>(html`<ui-box py="8px">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.paddingTop).toBe('8px');
        expect(inner.style.paddingBottom).toBe('8px');
    });

    it('applies pt (paddingTop)', async () => {
        const el = await fixture<UiBox>(html`<ui-box pt="2px">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.paddingTop).toBe('2px');
    });

    it('applies pr (paddingRight)', async () => {
        const el = await fixture<UiBox>(html`<ui-box pr="4px">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.paddingRight).toBe('4px');
    });

    it('applies pb (paddingBottom)', async () => {
        const el = await fixture<UiBox>(html`<ui-box pb="6px">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.paddingBottom).toBe('6px');
    });

    it('applies pl (paddingLeft)', async () => {
        const el = await fixture<UiBox>(html`<ui-box pl="8px">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.paddingLeft).toBe('8px');
    });

    it('specific pt overrides py', async () => {
        const el = await fixture<UiBox>(html`<ui-box py="20px" pt="5px">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.paddingTop).toBe('5px');
        expect(inner.style.paddingBottom).toBe('20px');
    });

    it('specific pl overrides px', async () => {
        const el = await fixture<UiBox>(html`<ui-box px="20px" pl="5px">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.paddingLeft).toBe('5px');
        expect(inner.style.paddingRight).toBe('20px');
    });

    // ── Display / Flex ───────────────────────────────────────────────
    it('applies display, flexDirection, alignItems, justifyContent', async () => {
        const el = await fixture<UiBox>(html`
            <ui-box display="flex" flexDirection="column" alignItems="center" justifyContent="space-between">
                Content
            </ui-box>
        `);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.display).toBe('flex');
        expect(inner.style.flexDirection).toBe('column');
        expect(inner.style.alignItems).toBe('center');
        expect(inner.style.justifyContent).toBe('space-between');
    });

    it('applies flexWrap', async () => {
        const el = await fixture<UiBox>(html`<ui-box flexWrap="wrap">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.flexWrap).toBe('wrap');
    });

    it('applies flexBasis', async () => {
        const el = await fixture<UiBox>(html`<ui-box flexBasis="50%">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.flexBasis).toBe('50%');
    });

    it('applies flexGrow', async () => {
        const el = await fixture<UiBox>(html`<ui-box flexGrow="1">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.flexGrow).toBe('1');
    });

    it('applies flexShrink', async () => {
        const el = await fixture<UiBox>(html`<ui-box flexShrink="0">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.flexShrink).toBe('0');
    });

    it('applies gap', async () => {
        const el = await fixture<UiBox>(html`<ui-box display="flex" gap="8px">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.gap).toBe('8px');
    });

    // ── Colors ───────────────────────────────────────────────────────
    it('maps bgcolor="primary" to CSS variable', async () => {
        const el = await fixture<UiBox>(html`<ui-box bgcolor="primary">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.backgroundColor).toBe('var(--ui-primary-color)');
    });

    it('maps bgcolor="secondary" to CSS variable', async () => {
        const el = await fixture<UiBox>(html`<ui-box bgcolor="secondary">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.backgroundColor).toBe('var(--ui-secondary-color)');
    });

    it('maps color="primary" to CSS variable', async () => {
        const el = await fixture<UiBox>(html`<ui-box color="primary">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.color).toBe('var(--ui-primary-color)');
    });

    it('maps color="secondary" to CSS variable', async () => {
        const el = await fixture<UiBox>(html`<ui-box bgcolor="primary" color="secondary">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.backgroundColor).toBe('var(--ui-primary-color)');
        expect(inner.style.color).toBe('var(--ui-secondary-color)');
    });

    it('passes raw bgcolor value through unchanged', async () => {
        const el = await fixture<UiBox>(html`<ui-box bgcolor="#ff0000">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.backgroundColor).toBe('rgb(255, 0, 0)');
    });

    it('passes raw color value through unchanged', async () => {
        const el = await fixture<UiBox>(html`<ui-box color="blue">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.color).toBe('blue');
    });

    // ── Visual ───────────────────────────────────────────────────────
    it('applies border and borderRadius', async () => {
        const el = await fixture<UiBox>(html`<ui-box border="2px solid rgb(255, 0, 0)" borderRadius="8px">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        const style = getComputedStyle(inner);
        expect(style.borderTopWidth).toBe('2px');
        expect(style.borderTopStyle).toBe('solid');
        expect(style.borderTopColor).toBe('rgb(255, 0, 0)');
        expect(style.borderRadius).toBe('8px');
    });

    it('applies boxShadow', async () => {
        const el = await fixture<UiBox>(html`<ui-box boxShadow="0px 2px 4px black">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.boxShadow).toBeTruthy();
    });

    it('applies width', async () => {
        const el = await fixture<UiBox>(html`<ui-box width="200px">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.width).toBe('200px');
    });

    it('applies height', async () => {
        const el = await fixture<UiBox>(html`<ui-box height="100px">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.height).toBe('100px');
    });

    it('applies width and height together', async () => {
        const el = await fixture<UiBox>(html`<ui-box width="300px" height="150px">Content</ui-box>`);
        const inner = el.shadowRoot!.querySelector('div')!;
        expect(inner.style.width).toBe('300px');
        expect(inner.style.height).toBe('150px');
    });

    // ── Slot ─────────────────────────────────────────────────────────
    it('renders slotted content', async () => {
        const el = await fixture<UiBox>(html`<ui-box>Hello World</ui-box>`);
        const nodes = Array.from(el.childNodes).filter(n => n.nodeType === Node.TEXT_NODE);
        expect(nodes.some(n => n.textContent?.includes('Hello World'))).toBe(true);
    });

    it('renders nested ui-box children', async () => {
        const el = await fixture<UiBox>(html`
            <ui-box p="16px">
                <ui-box p="8px" bgcolor="primary">nested</ui-box>
            </ui-box>
        `);
        const nested = el.querySelector('ui-box');
        expect(nested).toBeTruthy();
        expect(nested?.shadowRoot?.querySelector('div')).toBeTruthy();
    });
});
