import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-image-list.js';
import './ui-image-list-item.js';
import './ui-image-list-item-bar.js';
import type { UiImageList } from './ui-image-list.js';
import type { UiImageListItem } from './ui-image-list-item.js';
import type { UiImageListItemBar } from './ui-image-list-item-bar.js';

describe('ui-image-list', () => {
    it('is defined', () => {
        expect(document.createElement('ui-image-list')).toBeInstanceOf(HTMLElement);
        expect(document.createElement('ui-image-list-item')).toBeInstanceOf(HTMLElement);
        expect(document.createElement('ui-image-list-item-bar')).toBeInstanceOf(HTMLElement);
    });

    it('renders correct number of columns via grid-template-columns', async () => {
        const el = await fixture<UiImageList>(html`
      <ui-image-list cols="4" gap="8"></ui-image-list>
    `);
        await el.updateComplete;
        const list = el.shadowRoot!.querySelector('.image-list') as HTMLElement;
        expect(list.style.gridTemplateColumns).toBe('repeat(4, 1fr)');
    });

    it('applies gap correctly', async () => {
        const el = await fixture<UiImageList>(html`
      <ui-image-list cols="3" gap="12"></ui-image-list>
    `);
        await el.updateComplete;
        const list = el.shadowRoot!.querySelector('.image-list') as HTMLElement;
        expect(list.style.gap).toBe('12px');
    });

    it('applies variant class', async () => {
        const el = await fixture<UiImageList>(html`
      <ui-image-list variant="quilted"></ui-image-list>
    `);
        await el.updateComplete;
        const list = el.shadowRoot!.querySelector('.image-list');
        expect(list!.classList.contains('variant-quilted')).toBe(true);
    });

    it('uses column-count for masonry variant', async () => {
        const el = await fixture<UiImageList>(html`
      <ui-image-list variant="masonry" cols="3"></ui-image-list>
    `);
        await el.updateComplete;
        const list = el.shadowRoot!.querySelector('.image-list') as HTMLElement;
        expect(list.style.columnCount).toBe('3');
    });

    it('item-bar renders title slot', async () => {
        const el = await fixture<UiImageListItemBar>(html`
      <ui-image-list-item-bar>My Title</ui-image-list-item-bar>
    `);
        await el.updateComplete;
        // Check the bar renders its internal structure
        expect(el.shadowRoot!.querySelector('.bar-title')).toBeTruthy();
        expect(el.shadowRoot!.querySelector('.bar-subtitle')).toBeTruthy();
    });

    it('item-bar reflects position attribute', async () => {
        const el = await fixture<UiImageListItemBar>(html`
      <ui-image-list-item-bar position="below"></ui-image-list-item-bar>
    `);
        await el.updateComplete;
        expect(el.getAttribute('position')).toBe('below');
    });

    it('image-list-item applies grid span styles', async () => {
        const el = await fixture<UiImageListItem>(html`
      <ui-image-list-item rows="2" cols="2"></ui-image-list-item>
    `);
        await el.updateComplete;
        expect(el.style.gridRow).toBe('span 2');
        expect(el.style.gridColumn).toBe('span 2');
    });
});
