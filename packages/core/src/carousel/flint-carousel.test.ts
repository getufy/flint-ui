import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-carousel';
import type { FlintCarousel } from './flint-carousel';
import type { FlintCarouselContent } from './flint-carousel';
import type { FlintCarouselNext } from './flint-carousel';
import type { FlintCarouselPrevious } from './flint-carousel';

/* ── helpers ────────────────────────────────────────────────────────────── */

/** Build a standard 3-slide carousel and wait for firstUpdated. */
async function makeCarousel(attrs = '') {
  const el = await fixture<FlintCarousel>(html`
    <flint-carousel ${attrs}>
      <flint-carousel-previous></flint-carousel-previous>
      <flint-carousel-content>
        <flint-carousel-item>Slide 1</flint-carousel-item>
        <flint-carousel-item>Slide 2</flint-carousel-item>
        <flint-carousel-item>Slide 3</flint-carousel-item>
      </flint-carousel-content>
      <flint-carousel-next></flint-carousel-next>
    </flint-carousel>
  `);
  await el.updateComplete;
  return el;
}

function getContent(el: FlintCarousel) {
  return el.querySelector('flint-carousel-content') as FlintCarouselContent;
}
function getPrev(el: FlintCarousel) {
  return el.querySelector('flint-carousel-previous') as FlintCarouselPrevious;
}
function getNext(el: FlintCarousel) {
  return el.querySelector('flint-carousel-next') as FlintCarouselNext;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-carousel — rendering', () => {
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

  it('flint-carousel-item inner div has role="group" and aria-roledescription="slide"', async () => {
    const el = await makeCarousel();
    const item = el.querySelector('flint-carousel-item')!;
    await item.updateComplete;
    const inner = item.shadowRoot!.querySelector('.item')!;
    expect(inner.getAttribute('role')).toBe('group');
    expect(inner.getAttribute('aria-roledescription')).toBe('slide');
  });

  it('flint-carousel-content track has aria-live="polite"', async () => {
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
describe('flint-carousel — item counting', () => {
  it('detects the correct total after firstUpdated', async () => {
    const el = await makeCarousel();
    expect(el.total).toBe(3);
  });

  it('starts at index 0', async () => {
    const el = await makeCarousel();
    expect(el.currentIndex).toBe(0);
  });

  it('propagates index=0 to flint-carousel-content', async () => {
    const el = await makeCarousel();
    expect(getContent(el).index).toBe(0);
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   Navigation — next() / previous() / goTo()
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-carousel — navigation', () => {
  it('next() advances currentIndex by 1', async () => {
    const el = await makeCarousel();
    el.next();
    expect(el.currentIndex).toBe(1);
  });

  it('next() updates flint-carousel-content.index', async () => {
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
    el.addEventListener('flint-carousel-change', spy);
    el.goTo(0);
    expect(spy).not.toHaveBeenCalled();
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   Boundary behaviour — no loop
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-carousel — boundaries (loop=false)', () => {
  it('next() at last slide is a no-op', async () => {
    const el = await makeCarousel();
    el.goTo(2);
    el.next();
    expect(el.currentIndex).toBe(2);
  });

  it('next() at last slide does NOT fire flint-carousel-change', async () => {
    const el = await makeCarousel();
    el.goTo(2);
    const spy = vi.fn();
    el.addEventListener('flint-carousel-change', spy);
    el.next();
    expect(spy).not.toHaveBeenCalled();
  });

  it('previous() at first slide is a no-op', async () => {
    const el = await makeCarousel();
    el.previous();
    expect(el.currentIndex).toBe(0);
  });

  it('previous() at first slide does NOT fire flint-carousel-change', async () => {
    const el = await makeCarousel();
    const spy = vi.fn();
    el.addEventListener('flint-carousel-change', spy);
    el.previous();
    expect(spy).not.toHaveBeenCalled();
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   Loop mode
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-carousel — loop=true', () => {
  let el: FlintCarousel;
  beforeEach(async () => {
    el = await fixture<FlintCarousel>(html`
      <flint-carousel loop>
        <flint-carousel-previous></flint-carousel-previous>
        <flint-carousel-content>
          <flint-carousel-item>A</flint-carousel-item>
          <flint-carousel-item>B</flint-carousel-item>
          <flint-carousel-item>C</flint-carousel-item>
        </flint-carousel-content>
        <flint-carousel-next></flint-carousel-next>
      </flint-carousel>
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
   Event — flint-carousel-change
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-carousel — flint-carousel-change event', () => {
  it('fires with correct index and total when calling next()', async () => {
    const el = await makeCarousel();
    const spy = vi.fn();
    el.addEventListener('flint-carousel-change', spy);
    el.next();
    expect(spy).toHaveBeenCalledOnce();
    expect(spy.mock.calls[0][0].detail).toEqual({ index: 1, total: 3 });
  });

  it('fires with correct index when calling previous()', async () => {
    const el = await makeCarousel();
    el.next(); // go to 1
    const spy = vi.fn();
    el.addEventListener('flint-carousel-change', spy);
    el.previous();
    expect(spy).toHaveBeenCalledOnce();
    expect(spy.mock.calls[0][0].detail.index).toBe(0);
  });

  it('fires with correct index when calling goTo()', async () => {
    const el = await makeCarousel();
    const spy = vi.fn();
    el.addEventListener('flint-carousel-change', spy);
    el.goTo(2);
    expect(spy.mock.calls[0][0].detail.index).toBe(2);
  });

  it('event bubbles and is composed', async () => {
    const el = await makeCarousel();
    const outerSpy = vi.fn();
    document.addEventListener('flint-carousel-change', outerSpy, { once: true });
    el.next();
    expect(outerSpy).toHaveBeenCalled();
    document.removeEventListener('flint-carousel-change', outerSpy);
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   Button disabled state
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-carousel — button disabled state', () => {
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
    const el = await fixture<FlintCarousel>(html`
      <flint-carousel loop>
        <flint-carousel-previous></flint-carousel-previous>
        <flint-carousel-content>
          <flint-carousel-item>A</flint-carousel-item>
          <flint-carousel-item>B</flint-carousel-item>
        </flint-carousel-content>
        <flint-carousel-next></flint-carousel-next>
      </flint-carousel>
    `);
    await el.updateComplete;
    expect(getPrev(el).disabled).toBe(false);
  });

  it('next button is NOT disabled at last index when loop=true', async () => {
    const el = await fixture<FlintCarousel>(html`
      <flint-carousel loop>
        <flint-carousel-previous></flint-carousel-previous>
        <flint-carousel-content>
          <flint-carousel-item>A</flint-carousel-item>
          <flint-carousel-item>B</flint-carousel-item>
        </flint-carousel-content>
        <flint-carousel-next></flint-carousel-next>
      </flint-carousel>
    `);
    await el.updateComplete;
    el.goTo(1);
    expect(getNext(el).disabled).toBe(false);
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   Keyboard navigation
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-carousel — keyboard navigation', () => {
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
    const el = await fixture<FlintCarousel>(html`
      <flint-carousel orientation="vertical">
        <flint-carousel-content>
          <flint-carousel-item>A</flint-carousel-item>
          <flint-carousel-item>B</flint-carousel-item>
        </flint-carousel-content>
      </flint-carousel>
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
describe('flint-carousel — button click navigation', () => {
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
describe('flint-carousel — orientation propagation', () => {
  it('propagates orientation to flint-carousel-content', async () => {
    const el = await fixture<FlintCarousel>(html`
      <flint-carousel orientation="vertical">
        <flint-carousel-content>
          <flint-carousel-item>A</flint-carousel-item>
        </flint-carousel-content>
        <flint-carousel-previous></flint-carousel-previous>
        <flint-carousel-next></flint-carousel-next>
      </flint-carousel>
    `);
    await el.updateComplete;
    expect(getContent(el).orientation).toBe('vertical');
  });

  it('propagates orientation to nav buttons', async () => {
    const el = await fixture<FlintCarousel>(html`
      <flint-carousel orientation="vertical">
        <flint-carousel-content>
          <flint-carousel-item>A</flint-carousel-item>
        </flint-carousel-content>
        <flint-carousel-previous></flint-carousel-previous>
        <flint-carousel-next></flint-carousel-next>
      </flint-carousel>
    `);
    await el.updateComplete;
    expect(getPrev(el).orientation).toBe('vertical');
    expect(getNext(el).orientation).toBe('vertical');
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   items-per-view (multi-item carousel)
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-carousel — items-per-view', () => {
  async function makeMultiCarousel(itemsPerView: number) {
    const el = await fixture<FlintCarousel>(html`
      <flint-carousel items-per-view=${itemsPerView}>
        <flint-carousel-previous></flint-carousel-previous>
        <flint-carousel-content items-per-view=${itemsPerView}>
          <flint-carousel-item>Item 0</flint-carousel-item>
          <flint-carousel-item>Item 1</flint-carousel-item>
          <flint-carousel-item>Item 2</flint-carousel-item>
          <flint-carousel-item>Item 3</flint-carousel-item>
          <flint-carousel-item>Item 4</flint-carousel-item>
          <flint-carousel-item>Item 5</flint-carousel-item>
        </flint-carousel-content>
        <flint-carousel-next></flint-carousel-next>
      </flint-carousel>
    `);
    await el.updateComplete;
    return el;
  }

  it('propagates itemsPerView to flint-carousel-content', async () => {
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
    el.addEventListener('flint-carousel-change', spy);
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

  it('sets CSS custom property --flint-carousel-items-per-view on content host', async () => {
    const el = await makeMultiCarousel(3);
    const content = getContent(el);
    await content.updateComplete;
    expect(
      content.style.getPropertyValue('--flint-carousel-items-per-view'),
    ).toBe('3');
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   Zero-items carousel
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-carousel — zero items', () => {
  async function makeEmpty() {
    const el = await fixture<FlintCarousel>(html`
      <flint-carousel>
        <flint-carousel-previous></flint-carousel-previous>
        <flint-carousel-content></flint-carousel-content>
        <flint-carousel-next></flint-carousel-next>
      </flint-carousel>
    `);
    await el.updateComplete;
    return el;
  }

  it('total is 0 for empty carousel', async () => {
    const el = await makeEmpty();
    expect(el.total).toBe(0);
  });

  it('next() is a no-op when total is 0', async () => {
    const el = await makeEmpty();
    const spy = vi.fn();
    el.addEventListener('flint-carousel-change', spy);
    el.next();
    expect(spy).not.toHaveBeenCalled();
    expect(el.currentIndex).toBe(0);
  });

  it('previous() is a no-op when total is 0', async () => {
    const el = await makeEmpty();
    const spy = vi.fn();
    el.addEventListener('flint-carousel-change', spy);
    el.previous();
    expect(spy).not.toHaveBeenCalled();
    expect(el.currentIndex).toBe(0);
  });

  it('goTo(0) is a no-op when total is 0', async () => {
    const el = await makeEmpty();
    const spy = vi.fn();
    el.addEventListener('flint-carousel-change', spy);
    el.goTo(0);
    expect(spy).not.toHaveBeenCalled();
  });

  it('next button is disabled when total is 0', async () => {
    const el = await makeEmpty();
    expect(getNext(el).disabled).toBe(true);
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   goTo() exact boundary
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-carousel — goTo() exact boundary', () => {
  it('goTo(total) is a no-op — index === total is out of range', async () => {
    const el = await makeCarousel(); // 3 items: valid range 0-2
    const spy = vi.fn();
    el.addEventListener('flint-carousel-change', spy);
    el.goTo(3);
    expect(spy).not.toHaveBeenCalled();
    expect(el.currentIndex).toBe(0);
  });

  it('goTo(total - 1) navigates successfully', async () => {
    const el = await makeCarousel();
    el.goTo(2);
    expect(el.currentIndex).toBe(2);
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   Dynamic items via MutationObserver
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-carousel — dynamic items (MutationObserver)', () => {
  it('total increases when an item is appended', async () => {
    const el = await makeCarousel();
    expect(el.total).toBe(3);

    const newItem = document.createElement('flint-carousel-item');
    newItem.textContent = 'Slide 4';
    getContent(el).appendChild(newItem);

    await new Promise(r => setTimeout(r, 0));
    await el.updateComplete;

    expect(el.total).toBe(4);
  });

  it('total decreases when an item is removed', async () => {
    const el = await makeCarousel();
    const content = getContent(el);
    content.removeChild(content.querySelector('flint-carousel-item')!);

    await new Promise(r => setTimeout(r, 0));
    await el.updateComplete;

    expect(el.total).toBe(2);
  });

  it('currentIndex is clamped when removing the last item while on it', async () => {
    const el = await makeCarousel();
    el.goTo(2);

    const content = getContent(el);
    const items = content.querySelectorAll('flint-carousel-item');
    content.removeChild(items[items.length - 1]);

    await new Promise(r => setTimeout(r, 0));
    await el.updateComplete;

    expect(el.total).toBe(2);
    expect(el.currentIndex).toBe(1); // clamped to new total - 1
  });

  it('currentIndex stays when total is unchanged after mutation', async () => {
    const el = await makeCarousel();
    el.goTo(1);

    getContent(el).appendChild(document.createComment('noop'));

    await new Promise(r => setTimeout(r, 0));
    await el.updateComplete;

    expect(el.currentIndex).toBe(1);
    expect(el.total).toBe(3);
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   updated() lifecycle — prop changes after initial render
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-carousel — updated() lifecycle', () => {
  it('changing orientation updates content and nav buttons', async () => {
    const el = await makeCarousel();
    el.orientation = 'vertical';
    await el.updateComplete;
    expect(getContent(el).orientation).toBe('vertical');
    expect(getPrev(el).orientation).toBe('vertical');
    expect(getNext(el).orientation).toBe('vertical');
  });

  it('changing loop=true enables prev button at index 0', async () => {
    const el = await makeCarousel();
    expect(getPrev(el).disabled).toBe(true);
    el.loop = true;
    await el.updateComplete;
    expect(getPrev(el).disabled).toBe(false);
  });

  it('changing loop=false disables prev button at index 0', async () => {
    const el = await fixture<FlintCarousel>(html`
      <flint-carousel loop>
        <flint-carousel-previous></flint-carousel-previous>
        <flint-carousel-content>
          <flint-carousel-item>A</flint-carousel-item>
          <flint-carousel-item>B</flint-carousel-item>
        </flint-carousel-content>
        <flint-carousel-next></flint-carousel-next>
      </flint-carousel>
    `);
    await el.updateComplete;
    expect(getPrev(el).disabled).toBe(false);
    el.loop = false;
    await el.updateComplete;
    expect(getPrev(el).disabled).toBe(true);
  });

  it('changing itemsPerView updates content.itemsPerView', async () => {
    const el = await makeCarousel();
    el.itemsPerView = 2;
    await el.updateComplete;
    expect(getContent(el).itemsPerView).toBe(2);
  });

  it('increasing itemsPerView can disable next button', async () => {
    const el = await fixture<FlintCarousel>(html`
      <flint-carousel items-per-view="1">
        <flint-carousel-previous></flint-carousel-previous>
        <flint-carousel-content>
          <flint-carousel-item>A</flint-carousel-item>
          <flint-carousel-item>B</flint-carousel-item>
          <flint-carousel-item>C</flint-carousel-item>
        </flint-carousel-content>
        <flint-carousel-next></flint-carousel-next>
      </flint-carousel>
    `);
    await el.updateComplete;
    el.goTo(1);
    expect(getNext(el).disabled).toBe(false);
    el.itemsPerView = 2;
    await el.updateComplete;
    // lastIndex = 3-2=1, currentIndex=1 → next is disabled
    expect(getNext(el).disabled).toBe(true);
  });

  it('setting autoplay=0 stops timer', async () => {
    vi.useFakeTimers();
    try {
      const el = await fixture<FlintCarousel>(html`
        <flint-carousel autoplay="100">
          <flint-carousel-content>
            <flint-carousel-item>A</flint-carousel-item>
            <flint-carousel-item>B</flint-carousel-item>
            <flint-carousel-item>C</flint-carousel-item>
          </flint-carousel-content>
        </flint-carousel>
      `);
      await el.updateComplete;
      el.autoplay = 0;
      await el.updateComplete;
      vi.advanceTimersByTime(500);
      expect(el.currentIndex).toBe(0);
    } finally {
      vi.useRealTimers();
    }
  });

  it('starting autoplay via prop change after mount advances slides', async () => {
    vi.useFakeTimers();
    try {
      const el = await makeCarousel();
      el.autoplay = 100;
      await el.updateComplete;
      vi.advanceTimersByTime(100);
      expect(el.currentIndex).toBe(1);
    } finally {
      vi.useRealTimers();
    }
  });

  it('changing autoplay interval restarts timer', async () => {
    vi.useFakeTimers();
    try {
      const el = await fixture<FlintCarousel>(html`
        <flint-carousel autoplay="100">
          <flint-carousel-content>
            <flint-carousel-item>A</flint-carousel-item>
            <flint-carousel-item>B</flint-carousel-item>
            <flint-carousel-item>C</flint-carousel-item>
          </flint-carousel-content>
        </flint-carousel>
      `);
      await el.updateComplete;
      el.autoplay = 200;
      await el.updateComplete;
      vi.advanceTimersByTime(100);
      expect(el.currentIndex).toBe(0); // not enough for new interval
      vi.advanceTimersByTime(100);
      expect(el.currentIndex).toBe(1);
    } finally {
      vi.useRealTimers();
    }
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   Autoplay
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-carousel — autoplay', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it('auto-advances at the configured interval', async () => {
    const el = await fixture<FlintCarousel>(html`
      <flint-carousel autoplay="100">
        <flint-carousel-content>
          <flint-carousel-item>A</flint-carousel-item>
          <flint-carousel-item>B</flint-carousel-item>
          <flint-carousel-item>C</flint-carousel-item>
        </flint-carousel-content>
      </flint-carousel>
    `);
    await el.updateComplete;
    expect(el.currentIndex).toBe(0);
    vi.advanceTimersByTime(100);
    expect(el.currentIndex).toBe(1);
    vi.advanceTimersByTime(100);
    expect(el.currentIndex).toBe(2);
  });

  it('stops at boundary when loop=false', async () => {
    const el = await fixture<FlintCarousel>(html`
      <flint-carousel autoplay="100">
        <flint-carousel-content>
          <flint-carousel-item>A</flint-carousel-item>
          <flint-carousel-item>B</flint-carousel-item>
        </flint-carousel-content>
      </flint-carousel>
    `);
    await el.updateComplete;
    vi.advanceTimersByTime(100);
    expect(el.currentIndex).toBe(1);
    vi.advanceTimersByTime(100); // boundary — no advance
    expect(el.currentIndex).toBe(1);
  });

  it('wraps around when loop=true', async () => {
    const el = await fixture<FlintCarousel>(html`
      <flint-carousel autoplay="100" loop>
        <flint-carousel-content>
          <flint-carousel-item>A</flint-carousel-item>
          <flint-carousel-item>B</flint-carousel-item>
          <flint-carousel-item>C</flint-carousel-item>
        </flint-carousel-content>
      </flint-carousel>
    `);
    await el.updateComplete;
    vi.advanceTimersByTime(300); // 3 × 100ms → back to 0
    expect(el.currentIndex).toBe(0);
  });

  it('respects items-per-view boundary', async () => {
    const el = await fixture<FlintCarousel>(html`
      <flint-carousel autoplay="100" items-per-view="2">
        <flint-carousel-content>
          <flint-carousel-item>A</flint-carousel-item>
          <flint-carousel-item>B</flint-carousel-item>
          <flint-carousel-item>C</flint-carousel-item>
        </flint-carousel-content>
      </flint-carousel>
    `);
    await el.updateComplete;
    vi.advanceTimersByTime(100); // index 0 → 1 (lastIndex = 3-2 = 1)
    expect(el.currentIndex).toBe(1);
    vi.advanceTimersByTime(100); // at boundary — stops
    expect(el.currentIndex).toBe(1);
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   disconnectedCallback
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-carousel — disconnectedCallback', () => {
  it('stops autoplay on removal from DOM', async () => {
    vi.useFakeTimers();
    try {
      const el = await fixture<FlintCarousel>(html`
        <flint-carousel autoplay="100">
          <flint-carousel-content>
            <flint-carousel-item>A</flint-carousel-item>
            <flint-carousel-item>B</flint-carousel-item>
            <flint-carousel-item>C</flint-carousel-item>
          </flint-carousel-content>
        </flint-carousel>
      `);
      await el.updateComplete;
      el.parentNode!.removeChild(el);
      vi.advanceTimersByTime(500);
      expect(el.currentIndex).toBe(0);
    } finally {
      vi.useRealTimers();
    }
  });

  it('removal from DOM does not throw', async () => {
    const el = await makeCarousel();
    expect(() => el.parentNode!.removeChild(el)).not.toThrow();
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   FlintCarouselContent — transform output
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-carousel-content — transform', () => {
  it('renders translateX for horizontal at index > 0', async () => {
    const el = await makeCarousel();
    el.next();
    const content = getContent(el);
    await content.updateComplete;
    const track = content.shadowRoot!.querySelector('.track') as HTMLElement;
    expect(track.style.transform).toContain('translateX');
    expect(track.style.transform).not.toContain('translateY');
  });

  it('renders translateY for vertical at index > 0', async () => {
    const el = await fixture<FlintCarousel>(html`
      <flint-carousel orientation="vertical">
        <flint-carousel-content>
          <flint-carousel-item>A</flint-carousel-item>
          <flint-carousel-item>B</flint-carousel-item>
          <flint-carousel-item>C</flint-carousel-item>
        </flint-carousel-content>
      </flint-carousel>
    `);
    await el.updateComplete;
    el.next();
    const content = getContent(el);
    await content.updateComplete;
    const track = content.shadowRoot!.querySelector('.track') as HTMLElement;
    expect(track.style.transform).toContain('translateY');
    expect(track.style.transform).not.toContain('translateX');
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   FlintCarouselPrevious / FlintCarouselNext — orientation icons
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-carousel-previous — orientation icons', () => {
  it('shows left-pointing chevron (horizontal)', async () => {
    const el = await makeCarousel();
    const prevEl = getPrev(el);
    await prevEl.updateComplete;
    const polyline = prevEl.shadowRoot!.querySelector('polyline')!;
    expect(polyline.getAttribute('points')).toBe('15 18 9 12 15 6');
  });

  it('shows up-pointing chevron (vertical)', async () => {
    const el = await fixture<FlintCarousel>(html`
      <flint-carousel orientation="vertical">
        <flint-carousel-previous></flint-carousel-previous>
        <flint-carousel-content>
          <flint-carousel-item>A</flint-carousel-item>
        </flint-carousel-content>
      </flint-carousel>
    `);
    await el.updateComplete;
    const prevEl = getPrev(el);
    await prevEl.updateComplete;
    const polyline = prevEl.shadowRoot!.querySelector('polyline')!;
    expect(polyline.getAttribute('points')).toBe('18 15 12 9 6 15');
  });
});

describe('flint-carousel-next — orientation icons', () => {
  it('shows right-pointing chevron (horizontal)', async () => {
    const el = await makeCarousel();
    const nextEl = getNext(el);
    await nextEl.updateComplete;
    const polyline = nextEl.shadowRoot!.querySelector('polyline')!;
    expect(polyline.getAttribute('points')).toBe('9 18 15 12 9 6');
  });

  it('shows down-pointing chevron (vertical)', async () => {
    const el = await fixture<FlintCarousel>(html`
      <flint-carousel orientation="vertical">
        <flint-carousel-content>
          <flint-carousel-item>A</flint-carousel-item>
        </flint-carousel-content>
        <flint-carousel-next></flint-carousel-next>
      </flint-carousel>
    `);
    await el.updateComplete;
    const nextEl = getNext(el);
    await nextEl.updateComplete;
    const polyline = nextEl.shadowRoot!.querySelector('polyline')!;
    expect(polyline.getAttribute('points')).toBe('6 9 12 15 18 9');
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   Keyboard navigation — vertical orientation specifics
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-carousel — keyboard (vertical orientation)', () => {
  async function makeVertical() {
    const el = await fixture<FlintCarousel>(html`
      <flint-carousel orientation="vertical">
        <flint-carousel-content>
          <flint-carousel-item>A</flint-carousel-item>
          <flint-carousel-item>B</flint-carousel-item>
          <flint-carousel-item>C</flint-carousel-item>
        </flint-carousel-content>
      </flint-carousel>
    `);
    await el.updateComplete;
    return el;
  }

  it('ArrowUp calls previous() when vertical', async () => {
    const el = await makeVertical();
    el.goTo(2);
    el.shadowRoot!.querySelector('.carousel')!.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, composed: true }),
    );
    expect(el.currentIndex).toBe(1);
  });

  it('ArrowRight is ignored in vertical mode', async () => {
    const el = await makeVertical();
    el.shadowRoot!.querySelector('.carousel')!.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, composed: true }),
    );
    expect(el.currentIndex).toBe(0);
  });

  it('ArrowLeft is ignored in vertical mode', async () => {
    const el = await makeVertical();
    el.goTo(2);
    el.shadowRoot!.querySelector('.carousel')!.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, composed: true }),
    );
    expect(el.currentIndex).toBe(2);
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   label prop
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-carousel — label prop', () => {
  it('defaults aria-label to "Carousel"', async () => {
    const el = await makeCarousel();
    expect(
      el.shadowRoot!.querySelector('[role="region"]')!.getAttribute('aria-label'),
    ).toBe('Carousel');
  });

  it('sets custom aria-label via label attribute', async () => {
    const el = await fixture<FlintCarousel>(html`
      <flint-carousel label="Product images">
        <flint-carousel-content>
          <flint-carousel-item>A</flint-carousel-item>
        </flint-carousel-content>
      </flint-carousel>
    `);
    await el.updateComplete;
    expect(
      el.shadowRoot!.querySelector('[role="region"]')!.getAttribute('aria-label'),
    ).toBe('Product images');
  });

  it('updates aria-label when label changes', async () => {
    const el = await makeCarousel();
    el.label = 'Featured slides';
    await el.updateComplete;
    expect(
      el.shadowRoot!.querySelector('[role="region"]')!.getAttribute('aria-label'),
    ).toBe('Featured slides');
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   No nav buttons / no content
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-carousel — no nav buttons / no content', () => {
  it('programmatic navigation works without nav buttons', async () => {
    const el = await fixture<FlintCarousel>(html`
      <flint-carousel>
        <flint-carousel-content>
          <flint-carousel-item>A</flint-carousel-item>
          <flint-carousel-item>B</flint-carousel-item>
          <flint-carousel-item>C</flint-carousel-item>
        </flint-carousel-content>
      </flint-carousel>
    `);
    await el.updateComplete;
    el.next();
    expect(el.currentIndex).toBe(1);
    el.previous();
    expect(el.currentIndex).toBe(0);
  });

  it('carousel with no flint-carousel-content has total=0', async () => {
    const el = await fixture<FlintCarousel>(html`<flint-carousel></flint-carousel>`);
    await el.updateComplete;
    expect(el.total).toBe(0);
    expect(el.currentIndex).toBe(0);
  });
});
