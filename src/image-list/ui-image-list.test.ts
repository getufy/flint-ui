import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-image-list.js';
import './ui-image-list-item.js';
import './ui-image-list-item-bar.js';
import type { UiImageList } from './ui-image-list.js';
import type { UiImageListItem } from './ui-image-list-item.js';
import type { UiImageListItemBar } from './ui-image-list-item-bar.js';

// ── ui-image-list ────────────────────────────────────────────────────────────
describe('ui-image-list', () => {
  it('registers all three custom elements', () => {
    expect(document.createElement('ui-image-list')).toBeInstanceOf(HTMLElement);
    expect(document.createElement('ui-image-list-item')).toBeInstanceOf(HTMLElement);
    expect(document.createElement('ui-image-list-item-bar')).toBeInstanceOf(HTMLElement);
  });

  it('renders grid-template-columns for given cols', async () => {
    const el = await fixture<UiImageList>(html`<ui-image-list cols="4" gap="8"></ui-image-list>`);
    const list = el.shadowRoot!.querySelector('.image-list') as HTMLElement;
    expect(list.style.gridTemplateColumns).toBe('repeat(4, 1fr)');
  });

  it('applies gap on non-masonry variants', async () => {
    const el = await fixture<UiImageList>(html`<ui-image-list gap="12"></ui-image-list>`);
    const list = el.shadowRoot!.querySelector('.image-list') as HTMLElement;
    expect(list.style.gap).toBe('12px');
  });

  it('applies variant class to inner list', async () => {
    for (const variant of ['standard', 'quilted', 'woven', 'masonry'] as const) {
      const el = await fixture<UiImageList>(html`<ui-image-list variant="${variant}"></ui-image-list>`);
      const list = el.shadowRoot!.querySelector('.image-list')!;
      expect(list.classList.contains(`variant-${variant}`)).toBe(true);
    }
  });

  it('uses column-count for masonry variant', async () => {
    const el = await fixture<UiImageList>(html`<ui-image-list variant="masonry" cols="3"></ui-image-list>`);
    const list = el.shadowRoot!.querySelector('.image-list') as HTMLElement;
    expect(list.style.columnCount).toBe('3');
  });

  it('sets column-gap for masonry', async () => {
    const el = await fixture<UiImageList>(html`<ui-image-list variant="masonry" gap="10"></ui-image-list>`);
    const list = el.shadowRoot!.querySelector('.image-list') as HTMLElement;
    expect(list.style.columnGap).toBe('10px');
  });

  it('sets grid-auto-rows to auto when autoRows=true', async () => {
    const el = await fixture<UiImageList>(html`<ui-image-list ?autoRows=${true}></ui-image-list>`);
    const list = el.shadowRoot!.querySelector('.image-list') as HTMLElement;
    expect(list.style.gridAutoRows).toBe('auto');
  });

  it('uses rowHeight for grid-auto-rows when autoRows=false', async () => {
    const el = await fixture<UiImageList>(html`<ui-image-list .rowHeight=${200}></ui-image-list>`);
    const list = el.shadowRoot!.querySelector('.image-list') as HTMLElement;
    expect(list.style.gridAutoRows).toBe('200px');
  });

  it('renders a slot for items', async () => {
    const el = await fixture<UiImageList>(html`<ui-image-list></ui-image-list>`);
    expect(el.shadowRoot!.querySelector('slot')).toBeTruthy();
  });
});

// ── ui-image-list-item ───────────────────────────────────────────────────────
describe('ui-image-list-item', () => {
  it('renders item-wrapper and two slots', async () => {
    const el = await fixture<UiImageListItem>(html`<ui-image-list-item></ui-image-list-item>`);
    const wrapper = el.shadowRoot!.querySelector('.item-wrapper');
    expect(wrapper).toBeTruthy();
    // Default slot inside item-wrapper
    expect(wrapper!.querySelector('slot:not([name])')).toBeTruthy();
    // Named bar slot outside item-wrapper (sibling)
    const barSlot = el.shadowRoot!.querySelector('slot[name="bar"]');
    expect(barSlot).toBeTruthy();
    expect(wrapper!.contains(barSlot)).toBe(false);
  });

  it('applies grid-row span when rows > 1', async () => {
    const el = await fixture<UiImageListItem>(html`<ui-image-list-item rows="3"></ui-image-list-item>`);
    expect(el.style.gridRow).toBe('span 3');
  });

  it('applies grid-column span when cols > 1', async () => {
    const el = await fixture<UiImageListItem>(html`<ui-image-list-item cols="2"></ui-image-list-item>`);
    expect(el.style.gridColumn).toBe('span 2');
  });

  it('resets gridRow and gridColumn to empty when span reverts to 1', async () => {
    const el = await fixture<UiImageListItem>(html`<ui-image-list-item rows="2" cols="2"></ui-image-list-item>`);
    expect(el.style.gridRow).toBe('span 2');
    el.rows = 1;
    el.cols = 1;
    await el.updateComplete;
    expect(el.style.gridRow).toBe('');
    expect(el.style.gridColumn).toBe('');
  });

  it('applies both row and column spans together', async () => {
    const el = await fixture<UiImageListItem>(html`<ui-image-list-item rows="2" cols="2"></ui-image-list-item>`);
    expect(el.style.gridRow).toBe('span 2');
    expect(el.style.gridColumn).toBe('span 2');
  });

  it('reflects bar-position attribute', async () => {
    const el = await fixture<UiImageListItem>(html`<ui-image-list-item bar-position="below"></ui-image-list-item>`);
    expect(el.getAttribute('bar-position')).toBe('below');
  });

  it('adds masonry class when inside masonry list', async () => {
    const list = await fixture<UiImageList>(html`
      <ui-image-list variant="masonry">
        <ui-image-list-item id="item"></ui-image-list-item>
      </ui-image-list>
    `);
    const item = list.querySelector<UiImageListItem>('#item')!;
    await item.updateComplete;
    expect(item.classList.contains('masonry')).toBe(true);
  });

  it('removes masonry class when variant attribute changes away from masonry', async () => {
    const list = await fixture<UiImageList>(html`
      <ui-image-list variant="masonry">
        <ui-image-list-item></ui-image-list-item>
      </ui-image-list>
    `);
    const item = list.querySelector<UiImageListItem>('ui-image-list-item')!;
    await item.updateComplete;
    expect(item.classList.contains('masonry')).toBe(true);

    // Change variant attribute (getAttribute in item reads the DOM attr)
    list.setAttribute('variant', 'standard');
    item.requestUpdate();
    await item.updateComplete;
    expect(item.classList.contains('masonry')).toBe(false);
  });

  it('applies aspect-ratio style when set', async () => {
    const el = await fixture<UiImageListItem>(html`<ui-image-list-item aspect-ratio="3/4"></ui-image-list-item>`);
    expect(el.style.aspectRatio).toBe('3/4');
  });

  it('reflects aspect-ratio attribute', async () => {
    const el = await fixture<UiImageListItem>(html`<ui-image-list-item aspect-ratio="16/9"></ui-image-list-item>`);
    expect(el.getAttribute('aspect-ratio')).toBe('16/9');
  });

  it('clears aspect-ratio style when set to auto', async () => {
    const el = await fixture<UiImageListItem>(html`<ui-image-list-item aspect-ratio="3/4"></ui-image-list-item>`);
    expect(el.style.aspectRatio).toBe('3/4');
    el.aspectRatio = 'auto';
    await el.updateComplete;
    expect(el.style.aspectRatio).toBe('');
  });

  it('sets --ui-image-fit CSS custom property for cover (default)', async () => {
    const el = await fixture<UiImageListItem>(html`<ui-image-list-item></ui-image-list-item>`);
    expect(el.style.getPropertyValue('--ui-image-fit')).toBe('cover');
  });

  it('sets --ui-image-fit CSS custom property to contain', async () => {
    const el = await fixture<UiImageListItem>(html`<ui-image-list-item .fit=${'contain'}></ui-image-list-item>`);
    expect(el.style.getPropertyValue('--ui-image-fit')).toBe('contain');
  });

  it('updates --ui-image-fit when fit property changes', async () => {
    const el = await fixture<UiImageListItem>(html`<ui-image-list-item></ui-image-list-item>`);
    el.fit = 'contain';
    await el.updateComplete;
    expect(el.style.getPropertyValue('--ui-image-fit')).toBe('contain');
  });

  it('applies woven span 2 for odd weave in woven list', async () => {
    const list = await fixture<UiImageList>(html`
      <ui-image-list variant="woven">
        <ui-image-list-item id="odd" weave="odd"></ui-image-list-item>
        <ui-image-list-item id="even" weave="even"></ui-image-list-item>
      </ui-image-list>
    `);
    const odd = list.querySelector<UiImageListItem>('#odd')!;
    const even = list.querySelector<UiImageListItem>('#even')!;
    await odd.updateComplete;
    await even.updateComplete;
    expect(odd.style.gridRow).toBe('span 2');
    expect(even.style.gridRow).toBe('span 1');
  });
});

// ── ui-image-list-item-bar ───────────────────────────────────────────────────
describe('ui-image-list-item-bar', () => {
  it('renders bar-inner, bar-title, bar-subtitle, and bar-action', async () => {
    const el = await fixture<UiImageListItemBar>(html`<ui-image-list-item-bar>My Title</ui-image-list-item-bar>`);
    expect(el.shadowRoot!.querySelector('.bar-inner')).toBeTruthy();
    expect(el.shadowRoot!.querySelector('.bar-title')).toBeTruthy();
    expect(el.shadowRoot!.querySelector('.bar-subtitle')).toBeTruthy();
    expect(el.shadowRoot!.querySelector('.bar-action')).toBeTruthy();
  });

  it('defaults position to "bottom"', async () => {
    const el = await fixture<UiImageListItemBar>(html`<ui-image-list-item-bar></ui-image-list-item-bar>`);
    expect(el.position).toBe('bottom');
  });

  it('reflects position="below" attribute', async () => {
    const el = await fixture<UiImageListItemBar>(html`<ui-image-list-item-bar position="below"></ui-image-list-item-bar>`);
    expect(el.getAttribute('position')).toBe('below');
  });

  it('reflects position="top" attribute', async () => {
    const el = await fixture<UiImageListItemBar>(html`<ui-image-list-item-bar position="top"></ui-image-list-item-bar>`);
    expect(el.getAttribute('position')).toBe('top');
  });

  it('renders subtitle slot', async () => {
    const el = await fixture<UiImageListItemBar>(html`
      <ui-image-list-item-bar>Title<span slot="subtitle">Sub</span></ui-image-list-item-bar>
    `);
    expect(el.shadowRoot!.querySelector('slot[name="subtitle"]')).toBeTruthy();
  });

  it('renders action slot', async () => {
    const el = await fixture<UiImageListItemBar>(html`
      <ui-image-list-item-bar>Title<button slot="action">★</button></ui-image-list-item-bar>
    `);
    expect(el.shadowRoot!.querySelector('slot[name="action"]')).toBeTruthy();
  });
});

// ── Integration: item + bar ──────────────────────────────────────────────────
describe('ui-image-list-item + bar integration', () => {
  it('bar slotted into bar slot renders inside item', async () => {
    const el = await fixture<UiImageListItem>(html`
      <ui-image-list-item>
        <img src="test.jpg" alt="test" />
        <ui-image-list-item-bar slot="bar">My Bar</ui-image-list-item-bar>
      </ui-image-list-item>
    `);
    const bar = el.querySelector('ui-image-list-item-bar');
    expect(bar).toBeTruthy();
    expect(bar!.getAttribute('slot')).toBe('bar');
  });

  it('image without slot attribute is assigned to default slot', async () => {
    const el = await fixture<UiImageListItem>(html`
      <ui-image-list-item>
        <img src="test.jpg" alt="test" />
      </ui-image-list-item>
    `);
    const img = el.querySelector('img');
    expect(img).toBeTruthy();
    // Image has no slot attribute — goes to default slot
    expect(img!.getAttribute('slot')).toBeNull();
  });

  it('bar at top has position="top" attribute', async () => {
    const el = await fixture<UiImageListItem>(html`
      <ui-image-list-item>
        <img src="test.jpg" alt="test" />
        <ui-image-list-item-bar slot="bar" position="top">Top Bar</ui-image-list-item-bar>
      </ui-image-list-item>
    `);
    const bar = el.querySelector('ui-image-list-item-bar')!;
    expect(bar.getAttribute('position')).toBe('top');
  });

  it('full list renders items in grid with correct column count', async () => {
    const el = await fixture<UiImageList>(html`
      <ui-image-list cols="3" gap="4">
        <ui-image-list-item><img src="a.jpg" alt="a" /></ui-image-list-item>
        <ui-image-list-item><img src="b.jpg" alt="b" /></ui-image-list-item>
        <ui-image-list-item><img src="c.jpg" alt="c" /></ui-image-list-item>
      </ui-image-list>
    `);
    const list = el.shadowRoot!.querySelector('.image-list') as HTMLElement;
    expect(list.style.gridTemplateColumns).toBe('repeat(3, 1fr)');
    expect(el.querySelectorAll('ui-image-list-item').length).toBe(3);
  });
});
