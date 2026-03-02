import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-carousel';
import type { UiCarousel } from './ui-carousel';
import type { UiCarouselContent } from './ui-carousel';
import type { UiCarouselNext } from './ui-carousel';
import type { UiCarouselPrevious } from './ui-carousel';

/* ── helpers ────────────────────────────────────────────────────────────── */

/** Build a standard 3-slide carousel and wait for firstUpdated. */
async function makeCarousel(attrs = '') {
  const el = await fixture<UiCarousel>(html`
    <ui-carousel ${attrs}>
      <ui-carousel-previous></ui-carousel-previous>
      <ui-carousel-content>
        <ui-carousel-item>Slide 1</ui-carousel-item>
        <ui-carousel-item>Slide 2</ui-carousel-item>
        <ui-carousel-item>Slide 3</ui-carousel-item>
      </ui-carousel-content>
      <ui-carousel-next></ui-carousel-next>
    </ui-carousel>
  `);
  await el.updateComplete;
  return el;
}

function getContent(el: UiCarousel) {
  return el.querySelector('ui-carousel-content') as UiCarouselContent;
}
function getPrev(el: UiCarousel) {
  return el.querySelector('ui-carousel-previous') as UiCarouselPrevious;
}
function getNext(el: UiCarousel) {
  return el.querySelector('ui-carousel-next') as UiCarouselNext;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-carousel — rendering', () => {
  it('renders an inner div with role="region"', async () => {
    const el = await makeCarousel();
    const region = el.shadowRoot!.querySelector('[role="region"]')!;
    expect(region).not.toBeNull();
    expect(region.getAttribute('aria-roledescription')).toBe('carousel');
  });

  it('exposes tabindex="0" on the inner region div', async () => {
    const el = await makeCarousel();
    const region = el.shadowRoot!.querySelector('.carousel')!;
    expect(region.getAttribute('tabindex')).toBe('0');
  });

  it('ui-carousel-item inner div has role="group" and aria-roledescription="slide"', async () => {
    const el = await makeCarousel();
    const item = el.querySelector('ui-carousel-item')!;
    await item.updateComplete;
    const inner = item.shadowRoot!.querySelector('.item')!;
    expect(inner.getAttribute('role')).toBe('group');
    expect(inner.getAttribute('aria-roledescription')).toBe('slide');
  });

  it('ui-carousel-content track has aria-live="polite"', async () => {
    const el = await makeCarousel();
    const content = getContent(el);
    await content.updateComplete;
    const track = content.shadowRoot!.querySelector('.track')!;
    expect(track.getAttribute('aria-live')).toBe('polite');
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   Item counting
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-carousel — item counting', () => {
  it('detects the correct total after firstUpdated', async () => {
    const el = await makeCarousel();
    expect(el.total).toBe(3);
  });

  it('starts at index 0', async () => {
    const el = await makeCarousel();
    expect(el.currentIndex).toBe(0);
  });

  it('propagates index=0 to ui-carousel-content', async () => {
    const el = await makeCarousel();
    expect(getContent(el).index).toBe(0);
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   Navigation — next() / previous() / goTo()
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-carousel — navigation', () => {
  it('next() advances currentIndex by 1', async () => {
    const el = await makeCarousel();
    el.next();
    expect(el.currentIndex).toBe(1);
  });

  it('next() updates ui-carousel-content.index', async () => {
    const el = await makeCarousel();
    el.next();
    expect(getContent(el).index).toBe(1);
  });

  it('previous() decrements currentIndex by 1', async () => {
    const el = await makeCarousel();
    el.next();
    el.previous();
    expect(el.currentIndex).toBe(0);
  });

  it('goTo() jumps to the specified index', async () => {
    const el = await makeCarousel();
    el.goTo(2);
    expect(el.currentIndex).toBe(2);
    expect(getContent(el).index).toBe(2);
  });

  it('goTo() is a no-op for out-of-range values', async () => {
    const el = await makeCarousel();
    el.goTo(-1);
    el.goTo(99);
    expect(el.currentIndex).toBe(0);
  });

  it('goTo() is a no-op when index equals currentIndex', async () => {
    const el = await makeCarousel();
    const spy = vi.fn();
    el.addEventListener('ui-carousel-change', spy);
    el.goTo(0);
    expect(spy).not.toHaveBeenCalled();
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   Boundary behaviour — no loop
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-carousel — boundaries (loop=false)', () => {
  it('next() at last slide is a no-op', async () => {
    const el = await makeCarousel();
    el.goTo(2);
    el.next();
    expect(el.currentIndex).toBe(2);
  });

  it('next() at last slide does NOT fire ui-carousel-change', async () => {
    const el = await makeCarousel();
    el.goTo(2);
    const spy = vi.fn();
    el.addEventListener('ui-carousel-change', spy);
    el.next();
    expect(spy).not.toHaveBeenCalled();
  });

  it('previous() at first slide is a no-op', async () => {
    const el = await makeCarousel();
    el.previous();
    expect(el.currentIndex).toBe(0);
  });

  it('previous() at first slide does NOT fire ui-carousel-change', async () => {
    const el = await makeCarousel();
    const spy = vi.fn();
    el.addEventListener('ui-carousel-change', spy);
    el.previous();
    expect(spy).not.toHaveBeenCalled();
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   Loop mode
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-carousel — loop=true', () => {
  let el: UiCarousel;
  beforeEach(async () => {
    el = await fixture<UiCarousel>(html`
      <ui-carousel loop>
        <ui-carousel-previous></ui-carousel-previous>
        <ui-carousel-content>
          <ui-carousel-item>A</ui-carousel-item>
          <ui-carousel-item>B</ui-carousel-item>
          <ui-carousel-item>C</ui-carousel-item>
        </ui-carousel-content>
        <ui-carousel-next></ui-carousel-next>
      </ui-carousel>
    `);
    await el.updateComplete;
  });

  it('next() at last slide wraps to 0', async () => {
    el.goTo(2);
    el.next();
    expect(el.currentIndex).toBe(0);
  });

  it('previous() at first slide wraps to last', async () => {
    el.previous();
    expect(el.currentIndex).toBe(2);
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   Event — ui-carousel-change
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-carousel — ui-carousel-change event', () => {
  it('fires with correct index and total when calling next()', async () => {
    const el = await makeCarousel();
    const spy = vi.fn();
    el.addEventListener('ui-carousel-change', spy);
    el.next();
    expect(spy).toHaveBeenCalledOnce();
    expect(spy.mock.calls[0][0].detail).toEqual({ index: 1, total: 3 });
  });

  it('fires with correct index when calling previous()', async () => {
    const el = await makeCarousel();
    el.next(); // go to 1
    const spy = vi.fn();
    el.addEventListener('ui-carousel-change', spy);
    el.previous();
    expect(spy).toHaveBeenCalledOnce();
    expect(spy.mock.calls[0][0].detail.index).toBe(0);
  });

  it('fires with correct index when calling goTo()', async () => {
    const el = await makeCarousel();
    const spy = vi.fn();
    el.addEventListener('ui-carousel-change', spy);
    el.goTo(2);
    expect(spy.mock.calls[0][0].detail.index).toBe(2);
  });

  it('event bubbles and is composed', async () => {
    const el = await makeCarousel();
    const outerSpy = vi.fn();
    document.addEventListener('ui-carousel-change', outerSpy, { once: true });
    el.next();
    expect(outerSpy).toHaveBeenCalled();
    document.removeEventListener('ui-carousel-change', outerSpy);
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   Button disabled state
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-carousel — button disabled state', () => {
  it('previous button is disabled at index 0 (no loop)', async () => {
    const el = await makeCarousel();
    expect(getPrev(el).disabled).toBe(true);
  });

  it('next button is NOT disabled at index 0', async () => {
    const el = await makeCarousel();
    expect(getNext(el).disabled).toBe(false);
  });

  it('next button is disabled at last index (no loop)', async () => {
    const el = await makeCarousel();
    el.goTo(2);
    expect(getNext(el).disabled).toBe(true);
  });

  it('previous button is NOT disabled at last index', async () => {
    const el = await makeCarousel();
    el.goTo(2);
    expect(getPrev(el).disabled).toBe(false);
  });

  it('previous button is NOT disabled at index 0 when loop=true', async () => {
    const el = await fixture<UiCarousel>(html`
      <ui-carousel loop>
        <ui-carousel-previous></ui-carousel-previous>
        <ui-carousel-content>
          <ui-carousel-item>A</ui-carousel-item>
          <ui-carousel-item>B</ui-carousel-item>
        </ui-carousel-content>
        <ui-carousel-next></ui-carousel-next>
      </ui-carousel>
    `);
    await el.updateComplete;
    expect(getPrev(el).disabled).toBe(false);
  });

  it('next button is NOT disabled at last index when loop=true', async () => {
    const el = await fixture<UiCarousel>(html`
      <ui-carousel loop>
        <ui-carousel-previous></ui-carousel-previous>
        <ui-carousel-content>
          <ui-carousel-item>A</ui-carousel-item>
          <ui-carousel-item>B</ui-carousel-item>
        </ui-carousel-content>
        <ui-carousel-next></ui-carousel-next>
      </ui-carousel>
    `);
    await el.updateComplete;
    el.goTo(1);
    expect(getNext(el).disabled).toBe(false);
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   Keyboard navigation
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-carousel — keyboard navigation', () => {
  it('ArrowRight calls next()', async () => {
    const el = await makeCarousel();
    const region = el.shadowRoot!.querySelector('.carousel')!;
    region.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, composed: true }),
    );
    expect(el.currentIndex).toBe(1);
  });

  it('ArrowLeft calls previous()', async () => {
    const el = await makeCarousel();
    el.goTo(2);
    const region = el.shadowRoot!.querySelector('.carousel')!;
    region.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, composed: true }),
    );
    expect(el.currentIndex).toBe(1);
  });

  it('other keys are ignored', async () => {
    const el = await makeCarousel();
    const region = el.shadowRoot!.querySelector('.carousel')!;
    region.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }),
    );
    expect(el.currentIndex).toBe(0);
  });

  it('ArrowDown navigates when orientation is vertical', async () => {
    const el = await fixture<UiCarousel>(html`
      <ui-carousel orientation="vertical">
        <ui-carousel-content>
          <ui-carousel-item>A</ui-carousel-item>
          <ui-carousel-item>B</ui-carousel-item>
        </ui-carousel-content>
      </ui-carousel>
    `);
    await el.updateComplete;
    const region = el.shadowRoot!.querySelector('.carousel')!;
    region.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true }),
    );
    expect(el.currentIndex).toBe(1);
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   Button click — via closest() lookup
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-carousel — button click navigation', () => {
  it('clicking next button advances index', async () => {
    const el = await makeCarousel();
    const nextEl = getNext(el);
    await nextEl.updateComplete;
    const btn = nextEl.shadowRoot!.querySelector('button')!;
    btn.click();
    expect(el.currentIndex).toBe(1);
  });

  it('clicking previous button goes back', async () => {
    const el = await makeCarousel();
    el.goTo(2);
    const prevEl = getPrev(el);
    await prevEl.updateComplete;
    const btn = prevEl.shadowRoot!.querySelector('button')!;
    btn.click();
    expect(el.currentIndex).toBe(1);
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   Orientation propagation
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-carousel — orientation propagation', () => {
  it('propagates orientation to ui-carousel-content', async () => {
    const el = await fixture<UiCarousel>(html`
      <ui-carousel orientation="vertical">
        <ui-carousel-content>
          <ui-carousel-item>A</ui-carousel-item>
        </ui-carousel-content>
        <ui-carousel-previous></ui-carousel-previous>
        <ui-carousel-next></ui-carousel-next>
      </ui-carousel>
    `);
    await el.updateComplete;
    expect(getContent(el).orientation).toBe('vertical');
  });

  it('propagates orientation to nav buttons', async () => {
    const el = await fixture<UiCarousel>(html`
      <ui-carousel orientation="vertical">
        <ui-carousel-content>
          <ui-carousel-item>A</ui-carousel-item>
        </ui-carousel-content>
        <ui-carousel-previous></ui-carousel-previous>
        <ui-carousel-next></ui-carousel-next>
      </ui-carousel>
    `);
    await el.updateComplete;
    expect(getPrev(el).orientation).toBe('vertical');
    expect(getNext(el).orientation).toBe('vertical');
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   items-per-view (multi-item carousel)
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-carousel — items-per-view', () => {
  async function makeMultiCarousel(itemsPerView: number) {
    const el = await fixture<UiCarousel>(html`
      <ui-carousel items-per-view=${itemsPerView}>
        <ui-carousel-previous></ui-carousel-previous>
        <ui-carousel-content items-per-view=${itemsPerView}>
          <ui-carousel-item>Item 0</ui-carousel-item>
          <ui-carousel-item>Item 1</ui-carousel-item>
          <ui-carousel-item>Item 2</ui-carousel-item>
          <ui-carousel-item>Item 3</ui-carousel-item>
          <ui-carousel-item>Item 4</ui-carousel-item>
          <ui-carousel-item>Item 5</ui-carousel-item>
        </ui-carousel-content>
        <ui-carousel-next></ui-carousel-next>
      </ui-carousel>
    `);
    await el.updateComplete;
    return el;
  }

  it('propagates itemsPerView to ui-carousel-content', async () => {
    const el = await makeMultiCarousel(3);
    expect(getContent(el).itemsPerView).toBe(3);
  });

  it('next button disabled at total − itemsPerView (not total − 1)', async () => {
    // 6 items, 3 per view → last visible start = index 3
    const el = await makeMultiCarousel(3);
    el.goTo(3);
    expect(getNext(el).disabled).toBe(true);
  });

  it('next button NOT disabled at total − itemsPerView − 1', async () => {
    const el = await makeMultiCarousel(3);
    el.goTo(2); // index 2: shows items 2,3,4 — can still advance
    expect(getNext(el).disabled).toBe(false);
  });

  it('next() advances currentIndex by 1 with items-per-view=3', async () => {
    const el = await makeMultiCarousel(3);
    el.next();
    expect(el.currentIndex).toBe(1);
  });

  it('next() stops at total − itemsPerView when no loop', async () => {
    const el = await makeMultiCarousel(3);
    el.goTo(3);
    const spy = vi.fn();
    el.addEventListener('ui-carousel-change', spy);
    el.next(); // should be no-op
    expect(spy).not.toHaveBeenCalled();
    expect(el.currentIndex).toBe(3);
  });

  it('previous() still works with items-per-view=3', async () => {
    const el = await makeMultiCarousel(3);
    el.goTo(3);
    el.previous();
    expect(el.currentIndex).toBe(2);
  });

  it('sets CSS custom property --ui-carousel-items-per-view on content host', async () => {
    const el = await makeMultiCarousel(3);
    const content = getContent(el);
    await content.updateComplete;
    expect(
      content.style.getPropertyValue('--ui-carousel-items-per-view'),
    ).toBe('3');
  });
});
