import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-image-list.js';
import './flint-image-list-item.js';
import './flint-image-list-item-bar.js';
import type { FlintImageList } from './flint-image-list.js';
import type { FlintImageListItem } from './flint-image-list-item.js';
import type { FlintImageListItemBar } from './flint-image-list-item-bar.js';

// ── flint-image-list ────────────────────────────────────────────────────────────
describe('flint-image-list', () => {
  it('registers all three custom elements', () => {
    expect(document.createElement('flint-image-list')).toBeInstanceOf(HTMLElement);
    expect(document.createElement('flint-image-list-item')).toBeInstanceOf(HTMLElement);
    expect(document.createElement('flint-image-list-item-bar')).toBeInstanceOf(HTMLElement);
  });

  it('renders grid-template-columns for given cols', async () => {
    const el = await fixture<FlintImageList>(html`<flint-image-list cols="4" gap="8"></flint-image-list>`);
    const list = el.shadowRoot!.querySelector('.image-list') as HTMLElement;
    expect(list.style.gridTemplateColumns).toBe('repeat(4, 1fr)');
  });

  it('applies gap on non-masonry variants', async () => {
    const el = await fixture<FlintImageList>(html`<flint-image-list gap="12"></flint-image-list>`);
    const list = el.shadowRoot!.querySelector('.image-list') as HTMLElement;
    expect(list.style.gap).toBe('12px');
  });

  it('applies variant class to inner list', async () => {
    for (const variant of ['standard', 'quilted', 'woven', 'masonry'] as const) {
      const el = await fixture<FlintImageList>(html`<flint-image-list variant="${variant}"></flint-image-list>`);
      const list = el.shadowRoot!.querySelector('.image-list')!;
      expect(list.classList.contains(`variant-${variant}`)).toBe(true);
    }
  });

  it('uses column-count for masonry variant', async () => {
    const el = await fixture<FlintImageList>(html`<flint-image-list variant="masonry" cols="3"></flint-image-list>`);
    const list = el.shadowRoot!.querySelector('.image-list') as HTMLElement;
    expect(list.style.columnCount).toBe('3');
  });

  it('sets column-gap for masonry', async () => {
    const el = await fixture<FlintImageList>(html`<flint-image-list variant="masonry" gap="10"></flint-image-list>`);
    const list = el.shadowRoot!.querySelector('.image-list') as HTMLElement;
    expect(list.style.columnGap).toBe('10px');
  });

  it('sets grid-auto-rows to auto when autoRows=true', async () => {
    const el = await fixture<FlintImageList>(html`<flint-image-list ?autoRows=${true}></flint-image-list>`);
    const list = el.shadowRoot!.querySelector('.image-list') as HTMLElement;
    expect(list.style.gridAutoRows).toBe('auto');
  });

  it('uses rowHeight for grid-auto-rows when autoRows=false', async () => {
    const el = await fixture<FlintImageList>(html`<flint-image-list .rowHeight=${200}></flint-image-list>`);
    const list = el.shadowRoot!.querySelector('.image-list') as HTMLElement;
    expect(list.style.gridAutoRows).toBe('200px');
  });

  it('renders a slot for items', async () => {
    const el = await fixture<FlintImageList>(html`<flint-image-list></flint-image-list>`);
    expect(el.shadowRoot!.querySelector('slot')).toBeTruthy();
  });
});

// ── flint-image-list-item ───────────────────────────────────────────────────────
describe('flint-image-list-item', () => {
  it('renders item-wrapper and two slots', async () => {
    const el = await fixture<FlintImageListItem>(html`<flint-image-list-item></flint-image-list-item>`);
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
    const el = await fixture<FlintImageListItem>(html`<flint-image-list-item rows="3"></flint-image-list-item>`);
    expect(el.style.gridRow).toBe('span 3');
  });

  it('applies grid-column span when cols > 1', async () => {
    const el = await fixture<FlintImageListItem>(html`<flint-image-list-item cols="2"></flint-image-list-item>`);
    expect(el.style.gridColumn).toBe('span 2');
  });

  it('resets gridRow and gridColumn to empty when span reverts to 1', async () => {
    const el = await fixture<FlintImageListItem>(html`<flint-image-list-item rows="2" cols="2"></flint-image-list-item>`);
    expect(el.style.gridRow).toBe('span 2');
    el.rows = 1;
    el.cols = 1;
    await el.updateComplete;
    expect(el.style.gridRow).toBe('');
    expect(el.style.gridColumn).toBe('');
  });

  it('applies both row and column spans together', async () => {
    const el = await fixture<FlintImageListItem>(html`<flint-image-list-item rows="2" cols="2"></flint-image-list-item>`);
    expect(el.style.gridRow).toBe('span 2');
    expect(el.style.gridColumn).toBe('span 2');
  });

  it('reflects bar-position attribute', async () => {
    const el = await fixture<FlintImageListItem>(html`<flint-image-list-item bar-position="below"></flint-image-list-item>`);
    expect(el.getAttribute('bar-position')).toBe('below');
  });

  it('adds masonry class when inside masonry list', async () => {
    const list = await fixture<FlintImageList>(html`
      <flint-image-list variant="masonry">
        <flint-image-list-item id="item"></flint-image-list-item>
      </flint-image-list>
    `);
    const item = list.querySelector<FlintImageListItem>('#item')!;
    await item.updateComplete;
    expect(item.classList.contains('masonry')).toBe(true);
  });

  it('removes masonry class when variant attribute changes away from masonry', async () => {
    const list = await fixture<FlintImageList>(html`
      <flint-image-list variant="masonry">
        <flint-image-list-item></flint-image-list-item>
      </flint-image-list>
    `);
    const item = list.querySelector<FlintImageListItem>('flint-image-list-item')!;
    await item.updateComplete;
    expect(item.classList.contains('masonry')).toBe(true);

    // Change variant attribute (getAttribute in item reads the DOM attr)
    list.setAttribute('variant', 'standard');
    item.requestUpdate();
    await item.updateComplete;
    expect(item.classList.contains('masonry')).toBe(false);
  });

  it('applies aspect-ratio style when set', async () => {
    const el = await fixture<FlintImageListItem>(html`<flint-image-list-item aspect-ratio="3/4"></flint-image-list-item>`);
    expect(el.style.aspectRatio).toBe('3/4');
  });

  it('reflects aspect-ratio attribute', async () => {
    const el = await fixture<FlintImageListItem>(html`<flint-image-list-item aspect-ratio="16/9"></flint-image-list-item>`);
    expect(el.getAttribute('aspect-ratio')).toBe('16/9');
  });

  it('clears aspect-ratio style when set to auto', async () => {
    const el = await fixture<FlintImageListItem>(html`<flint-image-list-item aspect-ratio="3/4"></flint-image-list-item>`);
    expect(el.style.aspectRatio).toBe('3/4');
    el.aspectRatio = 'auto';
    await el.updateComplete;
    expect(el.style.aspectRatio).toBe('');
  });

  it('sets --flint-image-fit CSS custom property for cover (default)', async () => {
    const el = await fixture<FlintImageListItem>(html`<flint-image-list-item></flint-image-list-item>`);
    expect(el.style.getPropertyValue('--flint-image-fit')).toBe('cover');
  });

  it('sets --flint-image-fit CSS custom property to contain', async () => {
    const el = await fixture<FlintImageListItem>(html`<flint-image-list-item .fit=${'contain'}></flint-image-list-item>`);
    expect(el.style.getPropertyValue('--flint-image-fit')).toBe('contain');
  });

  it('updates --flint-image-fit when fit property changes', async () => {
    const el = await fixture<FlintImageListItem>(html`<flint-image-list-item></flint-image-list-item>`);
    el.fit = 'contain';
    await el.updateComplete;
    expect(el.style.getPropertyValue('--flint-image-fit')).toBe('contain');
  });

  it('applies woven span 2 for odd weave in woven list', async () => {
    const list = await fixture<FlintImageList>(html`
      <flint-image-list variant="woven">
        <flint-image-list-item id="odd" weave="odd"></flint-image-list-item>
        <flint-image-list-item id="even" weave="even"></flint-image-list-item>
      </flint-image-list>
    `);
    const odd = list.querySelector<FlintImageListItem>('#odd')!;
    const even = list.querySelector<FlintImageListItem>('#even')!;
    await odd.updateComplete;
    await even.updateComplete;
    expect(odd.style.gridRow).toBe('span 2');
    expect(even.style.gridRow).toBe('span 1');
  });
});

// ── flint-image-list-item-bar ───────────────────────────────────────────────────
describe('flint-image-list-item-bar', () => {
  it('renders bar-inner, bar-title, bar-subtitle, and bar-action', async () => {
    const el = await fixture<FlintImageListItemBar>(html`<flint-image-list-item-bar>My Title</flint-image-list-item-bar>`);
    expect(el.shadowRoot!.querySelector('.bar-inner')).toBeTruthy();
    expect(el.shadowRoot!.querySelector('.bar-title')).toBeTruthy();
    expect(el.shadowRoot!.querySelector('.bar-subtitle')).toBeTruthy();
    expect(el.shadowRoot!.querySelector('.bar-action')).toBeTruthy();
  });

  it('defaults position to "bottom"', async () => {
    const el = await fixture<FlintImageListItemBar>(html`<flint-image-list-item-bar></flint-image-list-item-bar>`);
    expect(el.position).toBe('bottom');
  });

  it('reflects position="below" attribute', async () => {
    const el = await fixture<FlintImageListItemBar>(html`<flint-image-list-item-bar position="below"></flint-image-list-item-bar>`);
    expect(el.getAttribute('position')).toBe('below');
  });

  it('reflects position="top" attribute', async () => {
    const el = await fixture<FlintImageListItemBar>(html`<flint-image-list-item-bar position="top"></flint-image-list-item-bar>`);
    expect(el.getAttribute('position')).toBe('top');
  });

  it('renders subtitle slot', async () => {
    const el = await fixture<FlintImageListItemBar>(html`
      <flint-image-list-item-bar>Title<span slot="subtitle">Sub</span></flint-image-list-item-bar>
    `);
    expect(el.shadowRoot!.querySelector('slot[name="subtitle"]')).toBeTruthy();
  });

  it('renders action slot', async () => {
    const el = await fixture<FlintImageListItemBar>(html`
      <flint-image-list-item-bar>Title<button slot="action">★</button></flint-image-list-item-bar>
    `);
    expect(el.shadowRoot!.querySelector('slot[name="action"]')).toBeTruthy();
  });
});

// ── Integration: item + bar ──────────────────────────────────────────────────
describe('flint-image-list-item + bar integration', () => {
  it('bar slotted into bar slot renders inside item', async () => {
    const el = await fixture<FlintImageListItem>(html`
      <flint-image-list-item>
        <img src="test.jpg" alt="test" />
        <flint-image-list-item-bar slot="bar">My Bar</flint-image-list-item-bar>
      </flint-image-list-item>
    `);
    const bar = el.querySelector('flint-image-list-item-bar');
    expect(bar).toBeTruthy();
    expect(bar!.getAttribute('slot')).toBe('bar');
  });

  it('image without slot attribute is assigned to default slot', async () => {
    const el = await fixture<FlintImageListItem>(html`
      <flint-image-list-item>
        <img src="test.jpg" alt="test" />
      </flint-image-list-item>
    `);
    const img = el.querySelector('img');
    expect(img).toBeTruthy();
    // Image has no slot attribute — goes to default slot
    expect(img!.getAttribute('slot')).toBeNull();
  });

  it('bar at top has position="top" attribute', async () => {
    const el = await fixture<FlintImageListItem>(html`
      <flint-image-list-item>
        <img src="test.jpg" alt="test" />
        <flint-image-list-item-bar slot="bar" position="top">Top Bar</flint-image-list-item-bar>
      </flint-image-list-item>
    `);
    const bar = el.querySelector('flint-image-list-item-bar')!;
    expect(bar.getAttribute('position')).toBe('top');
  });

  it('full list renders items in grid with correct column count', async () => {
    const el = await fixture<FlintImageList>(html`
      <flint-image-list cols="3" gap="4">
        <flint-image-list-item><img src="a.jpg" alt="a" /></flint-image-list-item>
        <flint-image-list-item><img src="b.jpg" alt="b" /></flint-image-list-item>
        <flint-image-list-item><img src="c.jpg" alt="c" /></flint-image-list-item>
      </flint-image-list>
    `);
    const list = el.shadowRoot!.querySelector('.image-list') as HTMLElement;
    expect(list.style.gridTemplateColumns).toBe('repeat(3, 1fr)');
    expect(el.querySelectorAll('flint-image-list-item').length).toBe(3);
  });
});
