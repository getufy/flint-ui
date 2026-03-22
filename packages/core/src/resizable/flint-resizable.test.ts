import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-resizable.js';
import { expectAccessible } from '../test-utils/axe.js';
import type { FlintResizableGroup, FlintResizablePanel, FlintResizableHandle } from './flint-resizable.js';

/* ------------------------------------------------------------------ */
/*  helpers                                                           */
/* ------------------------------------------------------------------ */

interface MakeOpts {
  orientation?: 'horizontal' | 'vertical';
  dir?: 'ltr' | 'rtl';
  panelSizes?: number[];
  withHandle?: boolean;
}

async function make(opts: MakeOpts = {}) {
  const {
    orientation = 'horizontal',
    dir = 'ltr',
    panelSizes = [50, 50],
    withHandle = false,
  } = opts;

  const el = await fixture<FlintResizableGroup>(html`
    <flint-resizable-group .orientation=${orientation} .dir=${dir}>
      ${panelSizes.map(
        (size, i) => html`
          <flint-resizable-panel .defaultSize=${size}>
            <div>Panel ${i + 1}</div>
          </flint-resizable-panel>
          ${i < panelSizes.length - 1
            ? html`<flint-resizable-handle ?with-handle=${withHandle}></flint-resizable-handle>`
            : ''}
        `,
      )}
    </flint-resizable-group>
  `);
  await el.updateComplete;
  return el;
}

function getPanels(group: FlintResizableGroup) {
  return Array.from(group.querySelectorAll<FlintResizablePanel>('flint-resizable-panel'));
}

function getHandles(group: FlintResizableGroup) {
  return Array.from(group.querySelectorAll<FlintResizableHandle>('flint-resizable-handle'));
}

const mockRect = (width = 1000, height = 400) => ({
  width, height, x: 0, y: 0, top: 0, right: width, bottom: height, left: 0,
  toJSON: () => ({}),
});

/* ------------------------------------------------------------------ */
/*  flint-resizable-group — rendering                                    */
/* ------------------------------------------------------------------ */

describe('flint-resizable-group — rendering', () => {
  it('renders a slot in shadow DOM', async () => {
    const el = await make();
    expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
  });

  it('defaults to horizontal orientation', async () => {
    const el = await make();
    expect(el.orientation).toBe('horizontal');
    expect(el.getAttribute('orientation')).toBe('horizontal');
  });

  it('reflects vertical orientation', async () => {
    const el = await make({ orientation: 'vertical' });
    expect(el.getAttribute('orientation')).toBe('vertical');
  });

  it('defaults dir to ltr', async () => {
    const el = await make();
    expect(el.dir).toBe('ltr');
  });
});

/* ------------------------------------------------------------------ */
/*  flint-resizable-group — size distribution                            */
/* ------------------------------------------------------------------ */

describe('flint-resizable-group — size distribution', () => {
  it('distributes defaultSize to panels', async () => {
    const el = await make({ panelSizes: [30, 70] });
    const panels = getPanels(el);
    expect(panels[0].size).toBe(30);
    expect(panels[1].size).toBe(70);
  });

  it('distributes remaining size to panels without explicit size', async () => {
    const el = await fixture<FlintResizableGroup>(html`
      <flint-resizable-group>
        <flint-resizable-panel .defaultSize=${60}>
          <div>A</div>
        </flint-resizable-panel>
        <flint-resizable-handle></flint-resizable-handle>
        <flint-resizable-panel>
          <div>B</div>
        </flint-resizable-panel>
      </flint-resizable-group>
    `);
    await el.updateComplete;
    const panels = getPanels(el);
    expect(panels[0].size).toBe(60);
    expect(panels[1].size).toBe(40);
  });

  it('returns layout snapshot from getLayout()', async () => {
    const el = await make({ panelSizes: [25, 75] });
    expect(el.getLayout()).toEqual([25, 75]);
  });
});

/* ------------------------------------------------------------------ */
/*  flint-resizable-panel — properties                                   */
/* ------------------------------------------------------------------ */

describe('flint-resizable-panel — properties', () => {
  it('applies flex-basis based on size', async () => {
    const el = await make({ panelSizes: [40, 60] });
    const panels = getPanels(el);
    expect(panels[0].size).toBe(40);
    expect(panels[1].size).toBe(60);
    expect(panels[0].style.flexBasis).toContain('40');
    expect(panels[1].style.flexBasis).toContain('60');
  });

  it('defaults minSize to 0 and maxSize to 100', async () => {
    const el = await make();
    const panel = getPanels(el)[0];
    expect(panel.minSize).toBe(0);
    expect(panel.maxSize).toBe(100);
  });

  it('defaults collapsible to false', async () => {
    const el = await make();
    const panel = getPanels(el)[0];
    expect(panel.collapsible).toBe(false);
  });

  it('defaults collapsed to false', async () => {
    const el = await make();
    const panel = getPanels(el)[0];
    expect(panel.collapsed).toBe(false);
  });
});

/* ------------------------------------------------------------------ */
/*  flint-resizable-handle — rendering                                   */
/* ------------------------------------------------------------------ */

describe('flint-resizable-handle — rendering', () => {
  it('has role=separator and tabindex=0', async () => {
    const el = await make();
    const handle = getHandles(el)[0];
    expect((handle as any)._internals?.role).toBe('separator');
    expect(handle.getAttribute('tabindex')).toBe('0');
  });

  it('reflects orientation attribute', async () => {
    const el = await make({ orientation: 'vertical' });
    await el.updateComplete;
    const handle = getHandles(el)[0];
    await handle.updateComplete;
    expect(handle.getAttribute('orientation')).toBe('vertical');
  });

  it('renders grip dots when withHandle is true', async () => {
    const el = await make({ withHandle: true });
    const handle = getHandles(el)[0];
    await handle.updateComplete;
    expect(handle.getAttribute('with-handle')).not.toBeNull();
    const dots = handle.shadowRoot!.querySelectorAll('.grip-dot');
    expect(dots.length).toBe(5);
  });

  it('does not show grip by default', async () => {
    const el = await make();
    const handle = getHandles(el)[0];
    expect(handle.withHandle).toBe(false);
  });

  it('reflects disabled attribute', async () => {
    const el = await make();
    const handle = getHandles(el)[0];
    handle.disabled = true;
    await handle.updateComplete;
    expect(handle.hasAttribute('disabled')).toBe(true);
  });
});

/* ------------------------------------------------------------------ */
/*  flint-resizable-handle — keyboard                                    */
/* ------------------------------------------------------------------ */

describe('flint-resizable-handle — keyboard', () => {
  it('calls _handleKeyResize on ArrowRight', async () => {
    const el = await make({ panelSizes: [50, 50] });
    const handle = getHandles(el)[0];
    const spy = vi.spyOn(el, '_handleKeyResize');
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(spy).toHaveBeenCalledWith(handle, 1);
  });

  it('calls _handleKeyResize on ArrowLeft', async () => {
    const el = await make({ panelSizes: [50, 50] });
    const handle = getHandles(el)[0];
    const spy = vi.spyOn(el, '_handleKeyResize');
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    expect(spy).toHaveBeenCalledWith(handle, -1);
  });

  it('uses ArrowUp/Down for vertical orientation', async () => {
    const el = await make({ orientation: 'vertical', panelSizes: [50, 50] });
    const handle = getHandles(el)[0];
    await handle.updateComplete;
    const spy = vi.spyOn(el, '_handleKeyResize');
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    expect(spy).toHaveBeenCalledWith(handle, 1);
  });

  it('does not respond when disabled', async () => {
    const el = await make({ panelSizes: [50, 50] });
    const handle = getHandles(el)[0];
    handle.disabled = true;
    const spy = vi.spyOn(el, '_handleKeyResize');
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(spy).not.toHaveBeenCalled();
  });

  it('responds to Home key', async () => {
    const el = await make({ panelSizes: [50, 50] });
    const handle = getHandles(el)[0];
    const spy = vi.spyOn(el, '_handleKeyResize');
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    expect(spy).toHaveBeenCalledWith(handle, -100);
  });

  it('responds to End key', async () => {
    const el = await make({ panelSizes: [50, 50] });
    const handle = getHandles(el)[0];
    const spy = vi.spyOn(el, '_handleKeyResize');
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    expect(spy).toHaveBeenCalledWith(handle, 100);
  });
});

/* ------------------------------------------------------------------ */
/*  flint-resizable-group — resize event                                 */
/* ------------------------------------------------------------------ */

describe('flint-resizable-group — resize event', () => {
  it('fires flint-resizable-change on resize', async () => {
    const el = await make({ panelSizes: [50, 50] });
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());

    const spy = vi.fn();
    el.addEventListener('flint-resizable-change', spy);

    const handle = getHandles(el)[0];
    el._handleResize(handle, 50);

    expect(spy).toHaveBeenCalledOnce();
    const detail = spy.mock.calls[0][0].detail;
    expect(detail.layout).toBeDefined();
    expect(detail.layout.length).toBe(2);
  });

  it('adjusts panel sizes proportionally on resize', async () => {
    const el = await make({ panelSizes: [50, 50] });
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());

    const handle = getHandles(el)[0];
    el._handleResize(handle, 100); // 100px = 10% of 1000px

    const panels = getPanels(el);
    expect(panels[0].size).toBe(60);
    expect(panels[1].size).toBe(40);
  });
});

/* ------------------------------------------------------------------ */
/*  flint-resizable-group — min/max constraints                          */
/* ------------------------------------------------------------------ */

describe('flint-resizable-group — constraints', () => {
  it('enforces minSize on panels', async () => {
    const el = await fixture<FlintResizableGroup>(html`
      <flint-resizable-group>
        <flint-resizable-panel .defaultSize=${50} .minSize=${20}>
          <div>A</div>
        </flint-resizable-panel>
        <flint-resizable-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${50} .minSize=${20}>
          <div>B</div>
        </flint-resizable-panel>
      </flint-resizable-group>
    `);
    await el.updateComplete;
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());

    const handle = getHandles(el)[0];
    el._handleResize(handle, -400);

    const panels = getPanels(el);
    expect(panels[0].size).toBeGreaterThanOrEqual(20);
    expect(panels[1].size).toBeLessThanOrEqual(80);
  });

  it('enforces maxSize on panels', async () => {
    const el = await fixture<FlintResizableGroup>(html`
      <flint-resizable-group>
        <flint-resizable-panel .defaultSize=${50} .maxSize=${70}>
          <div>A</div>
        </flint-resizable-panel>
        <flint-resizable-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${50}>
          <div>B</div>
        </flint-resizable-panel>
      </flint-resizable-group>
    `);
    await el.updateComplete;
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());

    const handle = getHandles(el)[0];
    el._handleResize(handle, 300);

    const panels = getPanels(el);
    expect(panels[0].size).toBeLessThanOrEqual(70);
  });

  it('collapses panel on a NEW drag that starts at minSize', async () => {
    const el = await fixture<FlintResizableGroup>(html`
      <flint-resizable-group>
        <flint-resizable-panel .defaultSize=${50} .minSize=${20} .collapsible=${true}>
          <div>A</div>
        </flint-resizable-panel>
        <flint-resizable-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${50}>
          <div>B</div>
        </flint-resizable-panel>
      </flint-resizable-group>
    `);
    await el.updateComplete;
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());

    const handle = getHandles(el)[0];
    const panels = getPanels(el);

    // Drag 1: bring panel to minSize (50% → 20%)
    el._startDrag();
    el._handleResize(handle, -300);
    expect(panels[0].size).toBe(20);
    el._endDrag();

    // Drag 2: starts at minSize — collapse is now allowed
    el._startDrag();
    el._handleResize(handle, -150);
    expect(panels[0].size).toBe(0);
    el._endDrag();
  });

  it('collapses in a single drag when dragged past minSize/2', async () => {
    const el = await fixture<FlintResizableGroup>(html`
      <flint-resizable-group>
        <flint-resizable-panel .defaultSize=${50} .minSize=${20} .collapsible=${true}>
          <div>A</div>
        </flint-resizable-panel>
        <flint-resizable-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${50}>
          <div>B</div>
        </flint-resizable-panel>
      </flint-resizable-group>
    `);
    await el.updateComplete;
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());

    const handle = getHandles(el)[0];
    const panels = getPanels(el);

    // Single drag: 50% → 5% (< minSize/2 = 10%) → collapses immediately
    el._startDrag();
    el._handleResize(handle, -450); // newBefore = 5 < minSize/2 (10) → collapse
    expect(panels[0].size).toBe(0);
    el._endDrag();
  });

  it('clamps to minSize when single drag stops between minSize and minSize/2', async () => {
    const el = await fixture<FlintResizableGroup>(html`
      <flint-resizable-group>
        <flint-resizable-panel .defaultSize=${50} .minSize=${20} .collapsible=${true}>
          <div>A</div>
        </flint-resizable-panel>
        <flint-resizable-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${50}>
          <div>B</div>
        </flint-resizable-panel>
      </flint-resizable-group>
    `);
    await el.updateComplete;
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());

    const handle = getHandles(el)[0];
    const panels = getPanels(el);

    // Single drag: 50% → 15% (≥ minSize/2 = 10%) → clamped to minSize, NOT collapsed
    el._startDrag();
    el._handleResize(handle, -350); // newBefore = 15 ≥ minSize/2 (10) → clamp to 20
    expect(panels[0].size).toBe(20);
    el._endDrag();
  });

  it('collapses via accumulated overshoot across many small drag events', async () => {
    const el = await fixture<FlintResizableGroup>(html`
      <flint-resizable-group>
        <flint-resizable-panel .defaultSize=${50} .minSize=${20} .collapsible=${true}>
          <div>A</div>
        </flint-resizable-panel>
        <flint-resizable-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${50}>
          <div>B</div>
        </flint-resizable-panel>
      </flint-resizable-group>
    `);
    await el.updateComplete;
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());

    const handle = getHandles(el)[0];
    const panels = getPanels(el);

    // Drag past minSize in many tiny steps — each step is 1% (10px on 1000px)
    // minSize=20%, threshold=minSize/2=10%, so after 10 steps of 1% overshoot → collapse
    el._startDrag();
    // First bring panel from 50% to minSize (30 × -1% = -30%)
    for (let i = 0; i < 30; i++) el._handleResize(handle, -10);
    expect(panels[0].size).toBe(20); // clamped at minSize

    // Continue dragging past minSize: 10 × -1% = -10% overshoot ≥ threshold(10%) → collapse
    for (let i = 0; i < 10; i++) el._handleResize(handle, -10);
    expect(panels[0].size).toBe(0);
    el._endDrag();
  });

  it('resets overshoot when user drags back above minSize', async () => {
    const el = await fixture<FlintResizableGroup>(html`
      <flint-resizable-group>
        <flint-resizable-panel .defaultSize=${50} .minSize=${20} .collapsible=${true}>
          <div>A</div>
        </flint-resizable-panel>
        <flint-resizable-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${50}>
          <div>B</div>
        </flint-resizable-panel>
      </flint-resizable-group>
    `);
    await el.updateComplete;
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());

    const handle = getHandles(el)[0];
    const panels = getPanels(el);

    el._startDrag();
    // Bring to minSize
    for (let i = 0; i < 30; i++) el._handleResize(handle, -10);
    expect(panels[0].size).toBe(20);

    // Accumulate 5% overshoot (half the threshold)
    for (let i = 0; i < 5; i++) el._handleResize(handle, -10);
    expect(panels[0].size).toBe(20); // still clamped, not collapsed

    // Drag back above minSize → overshoot resets
    el._handleResize(handle, 50); // +5% → panel = 25%
    expect(panels[0].size).toBe(25);

    // Now drag past minSize again: need full threshold from scratch
    for (let i = 0; i < 9; i++) el._handleResize(handle, -10); // 9% overshoot < 10%
    expect(panels[0].size).toBe(20); // still at minSize, not collapsed
    el._endDrag();
  });
});

/* ------------------------------------------------------------------ */
/*  flint-resizable-group — RTL                                          */
/* ------------------------------------------------------------------ */

describe('flint-resizable-group — RTL', () => {
  it('reverses drag direction in RTL', async () => {
    const el = await make({ panelSizes: [50, 50], dir: 'rtl' });
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());

    const handle = getHandles(el)[0];
    el._handleResize(handle, 100);

    const panels = getPanels(el);
    expect(panels[0].size).toBe(40);
    expect(panels[1].size).toBe(60);
  });
});

/* ------------------------------------------------------------------ */
/*  flint-resizable-group — three panels                                 */
/* ------------------------------------------------------------------ */

describe('flint-resizable-group — three panels', () => {
  it('handles three-panel layout', async () => {
    const el = await make({ panelSizes: [33, 34, 33] });
    const panels = getPanels(el);
    expect(panels.length).toBe(3);
    expect(getHandles(el).length).toBe(2);
  });

  it('resizes adjacent panels only', async () => {
    const el = await make({ panelSizes: [30, 40, 30] });
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());

    const handles = getHandles(el);
    el._handleResize(handles[0], 50); // 5%

    const panels = getPanels(el);
    expect(panels[0].size).toBe(35);
    expect(panels[1].size).toBe(35);
    expect(panels[2].size).toBe(30);
  });
});

/* ------------------------------------------------------------------ */
/*  flint-resizable-group — vertical orientation                         */
/* ------------------------------------------------------------------ */

describe('flint-resizable-group — vertical', () => {
  it('uses height for resize calculation in vertical mode', async () => {
    const el = await make({ orientation: 'vertical', panelSizes: [50, 50] });
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect(400, 1000));

    const handle = getHandles(el)[0];
    el._handleResize(handle, 100); // 100px = 10% of 1000px height

    const panels = getPanels(el);
    expect(panels[0].size).toBe(60);
    expect(panels[1].size).toBe(40);
  });
});

/* ------------------------------------------------------------------ */
/*  flint-resizable-group — nested isolation                             */
/* ------------------------------------------------------------------ */

describe('flint-resizable-group — nested', () => {
  it('outer group does not collect inner group panels', async () => {
    const el = await fixture<FlintResizableGroup>(html`
      <flint-resizable-group orientation="horizontal">
        <flint-resizable-panel .defaultSize=${50}>
          <flint-resizable-group orientation="vertical">
            <flint-resizable-panel .defaultSize=${50}>
              <div>Inner 1</div>
            </flint-resizable-panel>
            <flint-resizable-handle></flint-resizable-handle>
            <flint-resizable-panel .defaultSize=${50}>
              <div>Inner 2</div>
            </flint-resizable-panel>
          </flint-resizable-group>
        </flint-resizable-panel>
        <flint-resizable-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${50}>
          <div>Outer 2</div>
        </flint-resizable-panel>
      </flint-resizable-group>
    `);
    await el.updateComplete;

    expect(el.getLayout().length).toBe(2);
    expect(el.getLayout()).toEqual([50, 50]);
  });
});

/* ------------------------------------------------------------------ */
/*  flint-resizable-handle — pointer drag simulation                     */
/* ------------------------------------------------------------------ */

describe('flint-resizable-handle — pointer drag simulation', () => {
  it('resizes panels on pointerdown → pointermove → pointerup', async () => {
    const el = await make({ panelSizes: [50, 50] });
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());

    const handle = getHandles(el)[0];
    handle.setPointerCapture = vi.fn();
    handle.releasePointerCapture = vi.fn();

    handle.dispatchEvent(new PointerEvent('pointerdown', { clientX: 500, clientY: 200, pointerId: 1, bubbles: true, button: 0 }));
    handle.dispatchEvent(new PointerEvent('pointermove', { clientX: 600, clientY: 200, pointerId: 1, bubbles: true, buttons: 1 }));
    handle.dispatchEvent(new PointerEvent('pointerup', { clientX: 600, clientY: 200, pointerId: 1, bubbles: true }));

    const panels = getPanels(el);
    expect(panels[0].size).toBe(60);
    expect(panels[1].size).toBe(40);
  });

  it('does not resize when handle is disabled', async () => {
    const el = await make({ panelSizes: [50, 50] });
    const handle = getHandles(el)[0];
    handle.disabled = true;
    handle.setPointerCapture = vi.fn();

    handle.dispatchEvent(new PointerEvent('pointerdown', { clientX: 500, clientY: 200, pointerId: 1, bubbles: true, button: 0 }));
    handle.dispatchEvent(new PointerEvent('pointermove', { clientX: 600, clientY: 200, pointerId: 1, bubbles: true, buttons: 1 }));

    const panels = getPanels(el);
    expect(panels[0].size).toBe(50);
    expect(panels[1].size).toBe(50);
  });

  it('resets dragging state on pointercancel', async () => {
    const el = await make({ panelSizes: [50, 50] });
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());

    const handle = getHandles(el)[0];
    handle.setPointerCapture = vi.fn();
    handle.releasePointerCapture = vi.fn();

    handle.dispatchEvent(new PointerEvent('pointerdown', { clientX: 500, clientY: 200, pointerId: 1, bubbles: true, button: 0 }));
    handle.dispatchEvent(new PointerEvent('pointercancel', { pointerId: 1, bubbles: true }));
    handle.dispatchEvent(new PointerEvent('pointermove', { clientX: 700, clientY: 200, pointerId: 1, bubbles: true, buttons: 1 }));

    const panels = getPanels(el);
    expect(panels[0].size).toBe(50);
    expect(panels[1].size).toBe(50);
  });
});

/* ------------------------------------------------------------------ */
/*  flint-resizable-handle — lostpointercapture                          */
/* ------------------------------------------------------------------ */

describe('flint-resizable-handle — lostpointercapture resets dragging', () => {
  it('stops resizing after lostpointercapture (drag-out-of-window fix)', async () => {
    const el = await make({ panelSizes: [50, 50] });
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());

    const handle = getHandles(el)[0];
    handle.setPointerCapture = vi.fn();
    handle.releasePointerCapture = vi.fn();

    handle.dispatchEvent(new PointerEvent('pointerdown', { clientX: 500, clientY: 200, pointerId: 1, bubbles: true, button: 0 }));
    handle.dispatchEvent(new PointerEvent('pointermove', { clientX: 550, clientY: 200, pointerId: 1, bubbles: true, buttons: 1 }));
    handle.dispatchEvent(new Event('lostpointercapture'));
    handle.dispatchEvent(new PointerEvent('pointermove', { clientX: 700, clientY: 200, pointerId: 1, bubbles: true, buttons: 1 }));

    const panels = getPanels(el);
    expect(panels[0].size).toBe(55);
    expect(panels[1].size).toBe(45);
  });

  it('ignores pointermove when e.buttons === 0 (mouse released without pointerup)', async () => {
    const el = await make({ panelSizes: [50, 50] });
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());

    const handle = getHandles(el)[0];
    handle.setPointerCapture = vi.fn();

    handle.dispatchEvent(new PointerEvent('pointerdown', { clientX: 500, clientY: 200, pointerId: 1, bubbles: true, button: 0 }));
    handle.dispatchEvent(new PointerEvent('pointermove', { clientX: 700, clientY: 200, pointerId: 1, bubbles: true, buttons: 0 }));

    const panels = getPanels(el);
    expect(panels[0].size).toBe(50);
    expect(panels[1].size).toBe(50);
  });
});

/* ------------------------------------------------------------------ */
/*  flint-resizable-handle — primary button only                         */
/* ------------------------------------------------------------------ */

describe('flint-resizable-handle — primary button only', () => {
  it('does not start drag on right-click (button=2)', async () => {
    const el = await make({ panelSizes: [50, 50] });
    const handle = getHandles(el)[0];
    handle.setPointerCapture = vi.fn();

    handle.dispatchEvent(new PointerEvent('pointerdown', { clientX: 500, clientY: 200, pointerId: 1, bubbles: true, button: 2 }));
    handle.dispatchEvent(new PointerEvent('pointermove', { clientX: 600, clientY: 200, pointerId: 1, bubbles: true, buttons: 2 }));

    const panels = getPanels(el);
    expect(panels[0].size).toBe(50);
    expect(panels[1].size).toBe(50);
    expect(handle.setPointerCapture).not.toHaveBeenCalled();
  });

  it('does not start drag on middle-click (button=1)', async () => {
    const el = await make({ panelSizes: [50, 50] });
    const handle = getHandles(el)[0];
    handle.setPointerCapture = vi.fn();

    handle.dispatchEvent(new PointerEvent('pointerdown', { clientX: 500, clientY: 200, pointerId: 1, bubbles: true, button: 1 }));
    handle.dispatchEvent(new PointerEvent('pointermove', { clientX: 600, clientY: 200, pointerId: 1, bubbles: true, buttons: 4 }));

    const panels = getPanels(el);
    expect(panels[0].size).toBe(50);
    expect(panels[1].size).toBe(50);
  });
});

/* ------------------------------------------------------------------ */
/*  flint-resizable-handle — disconnect cleanup                          */
/* ------------------------------------------------------------------ */

describe('flint-resizable-handle — disconnect cleanup', () => {
  it('removes event listeners on disconnect', async () => {
    const el = await make();
    const handle = getHandles(el)[0];
    const removeSpy = vi.spyOn(handle, 'removeEventListener');
    handle.remove();
    expect(removeSpy).toHaveBeenCalled();
  });
});

/* ------------------------------------------------------------------ */
/*  flint-resizable-group — dynamic children                             */
/* ------------------------------------------------------------------ */

describe('flint-resizable-group — dynamic children', () => {
  it('picks up dynamically added panels via slotchange', async () => {
    const el = await fixture<FlintResizableGroup>(html`
      <flint-resizable-group>
        <flint-resizable-panel .defaultSize=${50}>
          <div>A</div>
        </flint-resizable-panel>
        <flint-resizable-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${50}>
          <div>B</div>
        </flint-resizable-panel>
      </flint-resizable-group>
    `);
    await el.updateComplete;
    expect(el.getLayout().length).toBe(2);

    const handleEl = document.createElement('flint-resizable-handle');
    const panelEl = document.createElement('flint-resizable-panel');
    (panelEl as FlintResizablePanel).defaultSize = 0;
    el.appendChild(handleEl);
    el.appendChild(panelEl);
    await el.updateComplete;

    expect(el.getLayout().length).toBe(3);
  });

  it('handles dynamic panel removal', async () => {
    const el = await make({ panelSizes: [30, 40, 30] });
    expect(el.getLayout().length).toBe(3);

    const panels = getPanels(el);
    const handles = getHandles(el);
    panels[2].remove();
    handles[1].remove();
    await el.updateComplete;

    expect(el.getLayout().length).toBe(2);
  });
});

/* ------------------------------------------------------------------ */
/*  flint-resizable-group — orientation change after render              */
/* ------------------------------------------------------------------ */

describe('flint-resizable-group — orientation change', () => {
  it('syncs children when orientation changes after initial render', async () => {
    const el = await make({ orientation: 'horizontal', panelSizes: [50, 50] });
    const handle = getHandles(el)[0];
    expect(handle.getAttribute('orientation')).toBe('horizontal');

    el.orientation = 'vertical';
    await el.updateComplete;
    await handle.updateComplete;

    expect(handle.getAttribute('orientation')).toBe('vertical');
  });

  it('syncs children when dir changes after initial render', async () => {
    const el = await make({ dir: 'ltr', panelSizes: [50, 50] });
    el.dir = 'rtl';
    await el.updateComplete;
    expect(el.getAttribute('dir')).toBe('rtl');
  });
});

/* ------------------------------------------------------------------ */
/*  flint-resizable-group — edge cases                                   */
/* ------------------------------------------------------------------ */

describe('flint-resizable-group — edge cases', () => {
  it('does not resize when container has zero size', async () => {
    const el = await make({ panelSizes: [50, 50] });
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect(0, 0));

    const spy = vi.fn();
    el.addEventListener('flint-resizable-change', spy);
    const handle = getHandles(el)[0];
    el._handleResize(handle, 100);

    expect(spy).not.toHaveBeenCalled();
    const panels = getPanels(el);
    expect(panels[0].size).toBe(50);
    expect(panels[1].size).toBe(50);
  });
});

/* ------------------------------------------------------------------ */
/*  flint-resizable-group — after-panel maxSize                          */
/* ------------------------------------------------------------------ */

describe('flint-resizable-group — after-panel maxSize', () => {
  it('enforces maxSize on the after panel', async () => {
    const el = await fixture<FlintResizableGroup>(html`
      <flint-resizable-group>
        <flint-resizable-panel .defaultSize=${50}>
          <div>A</div>
        </flint-resizable-panel>
        <flint-resizable-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${50} .maxSize=${60}>
          <div>B</div>
        </flint-resizable-panel>
      </flint-resizable-group>
    `);
    await el.updateComplete;
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());

    const handle = getHandles(el)[0];
    el._handleResize(handle, -300);

    const panels = getPanels(el);
    expect(panels[1].size).toBeLessThanOrEqual(60);
  });
});

/* ------------------------------------------------------------------ */
/*  flint-resizable-panel — connectedCallback with size > 0              */
/* ------------------------------------------------------------------ */

describe('flint-resizable-panel — connectedCallback', () => {
  it('applies flexBasis immediately when size > 0 on connect', async () => {
    const panel = document.createElement('flint-resizable-panel') as import('./flint-resizable.js').FlintResizablePanel;
    panel.size = 42;
    document.body.appendChild(panel);
    await panel.updateComplete;

    expect(panel.style.flexBasis).not.toBe('');
    expect(panel.style.flexBasis).toContain('42');
    expect(panel.size).toBe(42);
    panel.remove();
  });
});

/* ------------------------------------------------------------------ */
/*  flint-resizable-group — --_rg-handle-total CSS custom property       */
/* ------------------------------------------------------------------ */

describe('flint-resizable-group — --_rg-handle-total CSS variable', () => {
  it('sets --_rg-handle-total when handles are present', async () => {
    const el = await make({ withHandle: false });
    const total = el.style.getPropertyValue('--_rg-handle-total');
    expect(total).not.toBe('');
    expect(total).not.toBe('0px');
  });

  it('sets 0px when there are no handles', async () => {
    const el = await fixture<FlintResizableGroup>(html`
      <flint-resizable-group>
        <flint-resizable-panel .defaultSize=${100}>
          <div>Solo</div>
        </flint-resizable-panel>
      </flint-resizable-group>
    `);
    await el.updateComplete;
    const total = el.style.getPropertyValue('--_rg-handle-total');
    expect(total).toBe('0px');
  });

  it('uses active-size var for with-handle handles', async () => {
    const el = await make({ withHandle: true });
    const total = el.style.getPropertyValue('--_rg-handle-total');
    expect(total).toContain('active-size');
  });

  it('uses regular size var for plain handles', async () => {
    const el = await make({ withHandle: false });
    const total = el.style.getPropertyValue('--_rg-handle-total');
    expect(total).toContain('handle-size');
    expect(total).not.toContain('active-size');
  });

  it('uses calc() for multiple handles', async () => {
    const el = await make({ panelSizes: [30, 40, 30] });
    const total = el.style.getPropertyValue('--_rg-handle-total');
    expect(total).toContain('calc(');
  });

  it('updates --_rg-handle-total when orientation changes', async () => {
    const el = await make({ orientation: 'horizontal' });
    el.orientation = 'vertical';
    await el.updateComplete;
    const total = el.style.getPropertyValue('--_rg-handle-total');
    expect(total).not.toBe('');
  });
});

/* ------------------------------------------------------------------ */
/*  flint-resizable-panel — flex-basis calc formula                      */
/* ------------------------------------------------------------------ */

describe('flint-resizable-panel — flex-basis calc formula', () => {
  it('flex-basis uses calc() formula to keep handle on-screen', async () => {
    const el = await make({ panelSizes: [50, 50] });
    const panels = getPanels(el);
    expect(panels[0].style.flexBasis).toContain('calc(');
    expect(panels[0].style.flexBasis).toContain('--_rg-handle-total');
  });

  it('extreme right: before.size stays ≤100', async () => {
    const el = await make({ panelSizes: [50, 50] });
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());

    const handle = getHandles(el)[0];
    el._handleResize(handle, 600);

    const panels = getPanels(el);
    expect(panels[0].size).toBeLessThanOrEqual(100);
    expect(panels[1].size).toBeGreaterThanOrEqual(0);
    expect(panels[0].style.flexBasis).toContain('calc(');
  });

  it('extreme left: after.size stays ≤100', async () => {
    const el = await make({ panelSizes: [50, 50] });
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());

    const handle = getHandles(el)[0];
    el._handleResize(handle, -600);

    const panels = getPanels(el);
    expect(panels[0].size).toBeGreaterThanOrEqual(0);
    expect(panels[1].size).toBeLessThanOrEqual(100);
    expect(panels[1].style.flexBasis).toContain('calc(');
  });
});

/* ------------------------------------------------------------------ */
/*  flint-resizable-handle — ARIA attributes                             */
/* ------------------------------------------------------------------ */

describe('flint-resizable-handle — ARIA attributes', () => {
  it('sets aria-valuenow, aria-valuemin, aria-valuemax on handles', async () => {
    const el = await fixture<FlintResizableGroup>(html`
      <flint-resizable-group>
        <flint-resizable-panel .defaultSize=${40} .minSize=${10} .maxSize=${80}>
          <div>A</div>
        </flint-resizable-panel>
        <flint-resizable-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${60}>
          <div>B</div>
        </flint-resizable-panel>
      </flint-resizable-group>
    `);
    await el.updateComplete;

    const handle = getHandles(el)[0];
    expect((handle as any)._internals?.ariaValueNow).toBe('40');
    expect((handle as any)._internals?.ariaValueMin).toBe('10');
    expect((handle as any)._internals?.ariaValueMax).toBe('80');
  });

  it('sets aria-orientation on handles', async () => {
    const el = await make({ orientation: 'vertical', panelSizes: [50, 50] });
    const handle = getHandles(el)[0];
    expect((handle as any)._internals?.ariaOrientation).toBe('vertical');
  });

  it('updates aria-valuenow after resize', async () => {
    const el = await make({ panelSizes: [50, 50] });
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());

    const handle = getHandles(el)[0];
    el._handleResize(handle, 200); // 20%

    expect((handle as any)._internals?.ariaValueNow).toBe('70');
  });
});

/* ------------------------------------------------------------------ */
/*  FlintResizablePanel — collapse / expand API                          */
/* ------------------------------------------------------------------ */

describe('FlintResizablePanel — collapse/expand API', () => {
  it('collapse() sets size to 0 and collapsed=true', async () => {
    const el = await make({ panelSizes: [30, 70] });
    const panels = getPanels(el);
    panels[0].collapse();
    expect(panels[0].size).toBe(0);
    expect(panels[0].collapsed).toBe(true);
  });

  it('collapse() transfers size to next sibling', async () => {
    const el = await make({ panelSizes: [30, 70] });
    const panels = getPanels(el);
    panels[0].collapse();
    expect(panels[1].size).toBe(100);
  });

  it('collapse() prefers next sibling, falls back to prev', async () => {
    const el = await make({ panelSizes: [30, 70] });
    const panels = getPanels(el);
    // Collapse the last panel — no next sibling, uses prev
    panels[1].collapse();
    expect(panels[0].size).toBe(100);
    expect(panels[1].size).toBe(0);
  });

  it('collapse() is a no-op when already collapsed', async () => {
    const el = await make({ panelSizes: [30, 70] });
    const panels = getPanels(el);
    panels[0].collapse();
    panels[0].collapse(); // second call
    expect(panels[0].size).toBe(0);
    expect(panels[1].size).toBe(100);
  });

  it('expand() restores size and sets collapsed=false', async () => {
    const el = await make({ panelSizes: [30, 70] });
    const panels = getPanels(el);
    panels[0].collapse();
    expect(panels[0].collapsed).toBe(true);

    panels[0].expand();
    expect(panels[0].collapsed).toBe(false);
    expect(panels[0].size).toBeGreaterThan(0);
  });

  it('expand() is a no-op when not collapsed', async () => {
    const el = await make({ panelSizes: [30, 70] });
    const panels = getPanels(el);
    panels[0].expand(); // no-op
    expect(panels[0].size).toBe(30);
    expect(panels[1].size).toBe(70);
  });

  it('expand() restores to previous size', async () => {
    const el = await make({ panelSizes: [30, 70] });
    const panels = getPanels(el);
    panels[0].collapse();
    panels[0].expand();
    expect(panels[0].size).toBe(30);
    expect(panels[1].size).toBe(70);
  });

  it('toggle() collapses an expanded panel', async () => {
    const el = await make({ panelSizes: [30, 70] });
    const panels = getPanels(el);
    panels[0].toggle();
    expect(panels[0].collapsed).toBe(true);
    expect(panels[0].size).toBe(0);
  });

  it('toggle() expands a collapsed panel', async () => {
    const el = await make({ panelSizes: [30, 70] });
    const panels = getPanels(el);
    panels[0].collapse();
    panels[0].toggle();
    expect(panels[0].collapsed).toBe(false);
    expect(panels[0].size).toBeGreaterThan(0);
  });

  it('fires flint-resizable-collapse on collapse()', async () => {
    const el = await make({ panelSizes: [30, 70] });
    const spy = vi.fn();
    el.addEventListener('flint-resizable-collapse', spy);

    const panels = getPanels(el);
    panels[0].collapse();

    expect(spy).toHaveBeenCalledOnce();
    expect(spy.mock.calls[0][0].detail.index).toBe(0);
    expect(spy.mock.calls[0][0].detail.layout).toBeDefined();
  });

  it('fires flint-resizable-expand on expand()', async () => {
    const el = await make({ panelSizes: [30, 70] });
    const panels = getPanels(el);
    panels[0].collapse();

    const spy = vi.fn();
    el.addEventListener('flint-resizable-expand', spy);
    panels[0].expand();

    expect(spy).toHaveBeenCalledOnce();
    expect(spy.mock.calls[0][0].detail.index).toBe(0);
  });

  it('fires flint-resizable-change on collapse()', async () => {
    const el = await make({ panelSizes: [30, 70] });
    const spy = vi.fn();
    el.addEventListener('flint-resizable-change', spy);

    const panels = getPanels(el);
    panels[0].collapse();

    expect(spy).toHaveBeenCalledOnce();
  });

  it('_restoreSize tracks last non-zero size across drags', async () => {
    const el = await make({ panelSizes: [50, 50] });
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());

    const handle = getHandles(el)[0];
    const panels = getPanels(el);

    // Drag panel 0 to 30%
    el._handleResize(handle, -200); // -20%
    expect(panels[0].size).toBe(30);
    expect(panels[0]._restoreSize).toBe(30);

    // Collapse — _restoreSize preserved
    panels[0].collapse();
    expect(panels[0]._restoreSize).toBe(30);

    // Expand — should restore to 30%
    panels[0].expand();
    expect(panels[0].size).toBe(30);
  });

  it('collapsed attribute reflects on host element', async () => {
    const el = await make({ panelSizes: [30, 70] });
    const panels = getPanels(el);
    panels[0].collapse();
    await panels[0].updateComplete;
    expect(panels[0].hasAttribute('collapsed')).toBe(true);

    panels[0].expand();
    await panels[0].updateComplete;
    expect(panels[0].hasAttribute('collapsed')).toBe(false);
  });
});

/* ------------------------------------------------------------------ */
/*  flint-resizable-group — malformed group (handle without panels)      */
/* ------------------------------------------------------------------ */

describe('flint-resizable-group — malformed structure', () => {
  it('handles a group with a handle but no panels without errors', async () => {
    const el = await fixture<FlintResizableGroup>(html`
      <flint-resizable-group>
        <flint-resizable-handle></flint-resizable-handle>
      </flint-resizable-group>
    `);
    await el.updateComplete;
    // _syncAriaOnHandles: !before || !after → continue (line 132)
    expect(el.getLayout()).toEqual([]);
  });

  it('_handleResize with handle in list but no panels returns early', async () => {
    const el = await fixture<FlintResizableGroup>(html`
      <flint-resizable-group>
        <flint-resizable-handle></flint-resizable-handle>
      </flint-resizable-group>
    `);
    await el.updateComplete;
    const handle = getHandles(el)[0];
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());

    const spy = vi.fn();
    el.addEventListener('flint-resizable-change', spy);
    // idx=0, but _panels is empty → !before → return (line 229)
    el._handleResize(handle, 100);
    expect(spy).not.toHaveBeenCalled();
  });
});

/* ------------------------------------------------------------------ */
/*  _collapsePanel — edge cases                                       */
/* ------------------------------------------------------------------ */

describe('flint-resizable-group — _collapsePanel edge cases', () => {
  it('_collapsePanel is a no-op when panel is not registered (idx === -1)', async () => {
    const el = await make({ panelSizes: [50, 50] });
    const outsidePanel = document.createElement('flint-resizable-panel') as FlintResizablePanel;
    outsidePanel.size = 30;
    document.body.appendChild(outsidePanel);
    await outsidePanel.updateComplete;

    const spy = vi.fn();
    el.addEventListener('flint-resizable-collapse', spy);
    el._collapsePanel(outsidePanel); // idx === -1 → return
    expect(spy).not.toHaveBeenCalled();
    outsidePanel.remove();
  });

  it('_collapsePanel is a no-op when group has only one panel (no sibling)', async () => {
    const el = await fixture<FlintResizableGroup>(html`
      <flint-resizable-group>
        <flint-resizable-panel .defaultSize=${100}><div>Solo</div></flint-resizable-panel>
      </flint-resizable-group>
    `);
    await el.updateComplete;
    const panels = getPanels(el);
    panels[0].collapse(); // !sibling → return
    expect(panels[0].size).toBe(100);
    expect(panels[0].collapsed).toBe(false);
  });
});

/* ------------------------------------------------------------------ */
/*  _expandPanel — edge cases                                         */
/* ------------------------------------------------------------------ */

describe('flint-resizable-group — _expandPanel edge cases', () => {
  it('_expandPanel is a no-op when panel is not registered (idx === -1)', async () => {
    const el = await make({ panelSizes: [50, 50] });
    const outsidePanel = document.createElement('flint-resizable-panel') as FlintResizablePanel;
    outsidePanel.collapsed = true;
    document.body.appendChild(outsidePanel);
    await outsidePanel.updateComplete;

    const spy = vi.fn();
    el.addEventListener('flint-resizable-expand', spy);
    el._expandPanel(outsidePanel); // idx === -1 → return
    expect(spy).not.toHaveBeenCalled();
    outsidePanel.remove();
  });

  it('_expandPanel is a no-op when group has only one panel (no sibling)', async () => {
    const el = await fixture<FlintResizableGroup>(html`
      <flint-resizable-group>
        <flint-resizable-panel .defaultSize=${100}><div>Solo</div></flint-resizable-panel>
      </flint-resizable-group>
    `);
    await el.updateComplete;
    const panels = getPanels(el);
    panels[0].collapsed = true;
    panels[0].size = 0;
    panels[0]._applySize();
    panels[0].expand(); // !sibling → return
    expect(panels[0].size).toBe(0);
  });

  it('_expandPanel is a no-op when sibling has no available space (actual <= 0)', async () => {
    const el = await fixture<FlintResizableGroup>(html`
      <flint-resizable-group>
        <flint-resizable-panel .defaultSize=${50}><div>A</div></flint-resizable-panel>
        <flint-resizable-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${50} .minSize=${50}><div>B</div></flint-resizable-panel>
      </flint-resizable-group>
    `);
    await el.updateComplete;
    const panels = getPanels(el);

    // Manually set state: panels[0] collapsed, sibling exactly at minSize (no available space)
    panels[0]._restoreSize = 50;
    panels[0].size = 0;
    panels[0].collapsed = true;
    panels[0]._applySize();
    panels[1].size = 50; // exactly at minSize → available = 50 - 50 = 0
    panels[1]._applySize();

    panels[0].expand(); // actual = min(50, 0) = 0 → actual <= 0 → return
    expect(panels[0].size).toBe(0);
    expect(panels[0].collapsed).toBe(true);
  });

  it('expand() uses defaultSize fallback when _restoreSize is 0', async () => {
    const el = await make({ panelSizes: [50, 50] });
    const panels = getPanels(el);

    // Manually put panel in collapsed state without a prior non-zero size
    panels[0]._restoreSize = 0;
    panels[0].size = 0;
    panels[0].collapsed = true;
    panels[0]._applySize();
    panels[1].size = 100;
    panels[1]._applySize();

    panels[0].expand();
    // _restoreSize=0 → fallback: Math.max(minSize>0?minSize:0, defaultSize>0?defaultSize:20)
    // minSize=0, defaultSize=50 → Math.max(0, 50) = 50
    expect(panels[0].size).toBe(50);
    expect(panels[0].collapsed).toBe(false);
  });

  it('expand() uses 20 as final fallback when _restoreSize, minSize, and defaultSize are all 0', async () => {
    const el = await make({ panelSizes: [50, 50] });
    const panels = getPanels(el);

    panels[0].defaultSize = 0;
    panels[0]._restoreSize = 0;
    panels[0].size = 0;
    panels[0].collapsed = true;
    panels[0]._applySize();
    panels[1].size = 100;
    panels[1]._applySize();

    panels[0].expand();
    // Math.max(0 ? 0:0, 0 ? 0:20) = Math.max(0, 20) = 20
    expect(panels[0].size).toBe(20);
    expect(panels[0].collapsed).toBe(false);
  });

  it('expand() uses minSize fallback when _restoreSize is 0 and minSize > 0', async () => {
    const el = await fixture<FlintResizableGroup>(html`
      <flint-resizable-group>
        <flint-resizable-panel .defaultSize=${30} .minSize=${15}><div>A</div></flint-resizable-panel>
        <flint-resizable-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${70}><div>B</div></flint-resizable-panel>
      </flint-resizable-group>
    `);
    await el.updateComplete;
    const panels = getPanels(el);

    panels[0].defaultSize = 0;
    panels[0]._restoreSize = 0;
    panels[0].size = 0;
    panels[0].collapsed = true;
    panels[0]._applySize();
    panels[1].size = 100;
    panels[1]._applySize();

    panels[0].expand();
    // Math.max(15>0?15:0, 0>0?0:20) = Math.max(15, 20) = 20
    expect(panels[0].size).toBe(20);
    expect(panels[0].collapsed).toBe(false);
  });
});

/* ------------------------------------------------------------------ */
/*  _handleResize — invalid handle (idx === -1)                       */
/* ------------------------------------------------------------------ */

describe('flint-resizable-group — _handleResize invalid handle', () => {
  it('_handleResize is a no-op when handle is not in the group', async () => {
    const el = await make({ panelSizes: [50, 50] });
    const outsideHandle = document.createElement('flint-resizable-handle') as FlintResizableHandle;
    document.body.appendChild(outsideHandle);
    await outsideHandle.updateComplete;

    const spy = vi.fn();
    el.addEventListener('flint-resizable-change', spy);
    el._handleResize(outsideHandle, 100); // idx === -1 → return
    expect(spy).not.toHaveBeenCalled();
    outsideHandle.remove();
  });
});

/* ------------------------------------------------------------------ */
/*  Pointer events — early returns when not currently dragging        */
/* ------------------------------------------------------------------ */

describe('flint-resizable-handle — pointer events without active drag', () => {
  it('pointermove before pointerdown does nothing (early return)', async () => {
    const el = await make({ panelSizes: [50, 50] });
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());
    const handle = getHandles(el)[0];

    // Fire pointermove without first starting a drag
    handle.dispatchEvent(
      new PointerEvent('pointermove', { clientX: 700, clientY: 200, pointerId: 1, bubbles: true, buttons: 1 }),
    );

    const panels = getPanels(el);
    expect(panels[0].size).toBe(50);
    expect(panels[1].size).toBe(50);
  });

  it('pointerup before pointerdown does nothing (early return)', async () => {
    const el = await make({ panelSizes: [50, 50] });
    const handle = getHandles(el)[0];
    handle.releasePointerCapture = vi.fn();

    handle.dispatchEvent(new PointerEvent('pointerup', { pointerId: 1, bubbles: true }));
    expect(handle.releasePointerCapture).not.toHaveBeenCalled();
  });

  it('pointercancel before pointerdown does nothing (early return)', async () => {
    const el = await make({ panelSizes: [50, 50] });
    const handle = getHandles(el)[0];
    handle.releasePointerCapture = vi.fn();

    handle.dispatchEvent(new PointerEvent('pointercancel', { pointerId: 1, bubbles: true }));
    expect(handle.releasePointerCapture).not.toHaveBeenCalled();
  });
});

/* ------------------------------------------------------------------ */
/*  Keyboard — standalone handle (no group)                           */
/* ------------------------------------------------------------------ */

describe('flint-resizable-handle — keyboard without parent group', () => {
  it('keydown on a standalone handle does not throw', async () => {
    const handle = document.createElement('flint-resizable-handle') as FlintResizableHandle;
    document.body.appendChild(handle);
    await handle.updateComplete;

    // No parent flint-resizable-group → _onKeyDown early-returns (!group)
    expect(() => {
      handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    }).not.toThrow();

    handle.remove();
  });
});

/* ------------------------------------------------------------------ */
/*  Keyboard — ArrowUp in vertical orientation                        */
/* ------------------------------------------------------------------ */

describe('flint-resizable-handle — keyboard ArrowUp vertical', () => {
  it('calls _handleKeyResize with direction -1 on ArrowUp (vertical)', async () => {
    const el = await make({ orientation: 'vertical', panelSizes: [50, 50] });
    const handle = getHandles(el)[0];
    await handle.updateComplete;

    const spy = vi.spyOn(el, '_handleKeyResize');
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    expect(spy).toHaveBeenCalledWith(handle, -1);
  });

  it('ignores horizontal keys (ArrowLeft/Right) in vertical orientation', async () => {
    const el = await make({ orientation: 'vertical', panelSizes: [50, 50] });
    const handle = getHandles(el)[0];
    await handle.updateComplete;

    const spy = vi.spyOn(el, '_handleKeyResize');
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(spy).not.toHaveBeenCalled();
  });

  it('ignores vertical keys (ArrowUp/Down) in horizontal orientation', async () => {
    const el = await make({ orientation: 'horizontal', panelSizes: [50, 50] });
    const handle = getHandles(el)[0];

    const spy = vi.spyOn(el, '_handleKeyResize');
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    expect(spy).not.toHaveBeenCalled();
  });
});

/* ------------------------------------------------------------------ */
/*  Fast collapse — after panel                                       */
/* ------------------------------------------------------------------ */

describe('flint-resizable-group — fast collapse of after panel', () => {
  it('collapses after panel on new drag that starts at minSize', async () => {
    const el = await fixture<FlintResizableGroup>(html`
      <flint-resizable-group>
        <flint-resizable-panel .defaultSize=${50}><div>A</div></flint-resizable-panel>
        <flint-resizable-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${50} .minSize=${20} .collapsible=${true}>
          <div>B</div>
        </flint-resizable-panel>
      </flint-resizable-group>
    `);
    await el.updateComplete;
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());

    const handle = getHandles(el)[0];
    const panels = getPanels(el);

    // Drag 1: bring panels[1] to minSize (50% → 20%)
    el._startDrag();
    el._handleResize(handle, 300); // +30% → panels[1]: 50-30=20 (= minSize)
    expect(panels[1].size).toBe(20);
    el._endDrag();

    // Drag 2: starts with panels[1] at minSize → in _collapsibleAtDragStart
    el._startDrag();
    el._handleResize(handle, 150); // +15% → newAfter = 20-15=5 < minSize/2(10) → collapse
    expect(panels[1].size).toBe(0);
    el._endDrag();
  });
});

/* ------------------------------------------------------------------ */
/*  _distributeDefaultSizes — defaultSize path (lines 93–95)         */
/* ------------------------------------------------------------------ */

describe('flint-resizable-group — _distributeDefaultSizes defaultSize path', () => {
  it('applies defaultSize when panel is appended before its first Lit update', async () => {
    const el = await fixture<FlintResizableGroup>(html`
      <flint-resizable-group>
        <flint-resizable-panel .defaultSize=${60}><div>A</div></flint-resizable-panel>
        <flint-resizable-handle></flint-resizable-handle>
      </flint-resizable-group>
    `);
    await el.updateComplete;

    // Create panel with defaultSize but _hasExplicitSize = false
    const panel = document.createElement('flint-resizable-panel') as FlintResizablePanel;
    panel.defaultSize = 40;
    // Appending triggers slotchange → _collectChildren → _distributeDefaultSizes
    // At that moment _hasExplicitSize is false and defaultSize > 0 → lines 93-95 execute
    el.appendChild(panel);
    await el.updateComplete;

    expect(panel.size).toBeGreaterThan(0);
  });
});

/* ------------------------------------------------------------------ */
/*  flint-resizable-panel — size property set after connect              */
/* ------------------------------------------------------------------ */

describe('flint-resizable-panel — size change triggers _applySize', () => {
  it('updates flex-basis when size property changes via willUpdate', async () => {
    const el = await make({ panelSizes: [50, 50] });
    const panels = getPanels(el);
    panels[0].size = 30;
    await panels[0].updateComplete;
    expect(panels[0].style.flexBasis).toContain('30');
  });

  it('willUpdate skips _applySize when size did not change (line 382 false branch)', async () => {
    const el = await make({ panelSizes: [50, 50] });
    const panels = getPanels(el);
    const applySpy = vi.spyOn(panels[0], '_applySize');

    // Changing a property that is NOT 'size' triggers willUpdate without 'size' in changed
    panels[0].minSize = 10;
    await panels[0].updateComplete;

    // _applySize should NOT have been called from willUpdate (size didn't change)
    expect(applySpy).not.toHaveBeenCalled();
    expect(panels[0].size).toBe(50);
  });
});

/* ------------------------------------------------------------------ */
/*  flint-resizable-group — updated() false-false branch (line 317)     */
/* ------------------------------------------------------------------ */

describe('flint-resizable-group — updated() skips _syncChildren when no relevant change', () => {
  it('does not call _syncChildren when neither orientation nor dir changed', async () => {
    const el = await make({ panelSizes: [50, 50] });
    const syncSpy = vi.spyOn(el as unknown as { _syncChildren: () => void }, '_syncChildren' as never);

    // Force a Lit update without changing orientation or dir
    el.requestUpdate();
    await el.updateComplete;

    // _syncChildren should NOT be called (false-false branch of || on line 317)
    expect(syncSpy).not.toHaveBeenCalled();
  });
});

/* ------------------------------------------------------------------ */
/*  Vertical orientation — pointer drag uses clientY                  */
/* ------------------------------------------------------------------ */

describe('flint-resizable-handle — vertical pointer drag', () => {
  it('resizes panels in vertical mode using clientY', async () => {
    const el = await make({ orientation: 'vertical', panelSizes: [50, 50] });
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect(400, 1000));

    const handle = getHandles(el)[0];
    handle.setPointerCapture = vi.fn();
    handle.releasePointerCapture = vi.fn();

    handle.dispatchEvent(
      new PointerEvent('pointerdown', { clientX: 200, clientY: 500, pointerId: 1, bubbles: true, button: 0 }),
    );
    handle.dispatchEvent(
      new PointerEvent('pointermove', { clientX: 200, clientY: 600, pointerId: 1, bubbles: true, buttons: 1 }),
    );
    handle.dispatchEvent(
      new PointerEvent('pointerup', { clientX: 200, clientY: 600, pointerId: 1, bubbles: true }),
    );

    const panels = getPanels(el);
    // 100px delta on 1000px height = 10% shift
    expect(panels[0].size).toBe(60);
    expect(panels[1].size).toBe(40);
  });
});

/* ------------------------------------------------------------------ */
/*  flint-resizable-group — _handleKeyResize uses step from CSS var      */
/* ------------------------------------------------------------------ */

describe('flint-resizable-group — _handleKeyResize', () => {
  it('_handleKeyResize calls _handleResize with step-based delta', async () => {
    const el = await make({ panelSizes: [50, 50] });
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());
    vi.spyOn(el, '_handleResize');

    const handle = getHandles(el)[0];
    el._handleKeyResize(handle, 1);

    expect(el._handleResize).toHaveBeenCalled();
  });

  it('_handleKeyResize uses CSS custom property value when set (line 298 truthy branch)', async () => {
    const el = await make({ panelSizes: [50, 50] });
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());
    const resizeSpy = vi.spyOn(el, '_handleResize');

    // Set the step via inline style so getComputedStyle returns it
    el.style.setProperty('--flint-resizable-step', '10');

    const handle = getHandles(el)[0];
    el._handleKeyResize(handle, 1);

    // With step=10%, direction=1, width=1000px → delta = 1 * (1000 * 10/100) = 100px
    expect(resizeSpy).toHaveBeenCalledWith(handle, 100);
  });
});

/* ------------------------------------------------------------------ */
/*  Before panel already-at-zero drag (lines 258–264)                 */
/* ------------------------------------------------------------------ */

describe('flint-resizable-group — before panel already-collapsed drag', () => {
  it('transfers overshoot back to sibling when before panel is at 0 and dragged further left (lines 258-260)', async () => {
    // Covers: before.size===0 && newBefore<=0 path
    // Panel 0 is already collapsed; dragging left inflates sibling by delta,
    // but lines 258-260 subtract the overshoot back so sibling stays correct.
    const el = await fixture<FlintResizableGroup>(html`
      <flint-resizable-group>
        <flint-resizable-panel .defaultSize=${70} .minSize=${20}><div>A</div></flint-resizable-panel>
        <flint-resizable-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${30}><div>B</div></flint-resizable-panel>
      </flint-resizable-group>
    `);
    await el.updateComplete;
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());

    const handle = getHandles(el)[0];
    const panels = getPanels(el);

    // Manually set before panel to 0 (collapsed state)
    panels[0].size = 0;
    panels[1].size = 90;
    panels[0]._applySize();
    panels[1]._applySize();

    // Drag left: newBefore = 0 + (-5%) = -5 → lines 258-260: newAfter += -5 → sibling stays 90
    el._handleResize(handle, -50); // -5% on 1000px
    expect(panels[0].size).toBe(0);
    // Without lines 258-260 the sibling would gain 5% → 95; with them it stays at 90
    expect(panels[1].size).toBe(90);
  });

  it('snaps before panel to minSize when dragging right slightly from zero (lines 262-264)', async () => {
    // Covers: before.size===0 && newBefore>0 (partial snap-back) path
    const el = await fixture<FlintResizableGroup>(html`
      <flint-resizable-group>
        <flint-resizable-panel .defaultSize=${70} .minSize=${20}><div>A</div></flint-resizable-panel>
        <flint-resizable-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${30}><div>B</div></flint-resizable-panel>
      </flint-resizable-group>
    `);
    await el.updateComplete;
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());

    const handle = getHandles(el)[0];
    const panels = getPanels(el);

    panels[0].size = 0;
    panels[1].size = 100;
    panels[0]._applySize();
    panels[1]._applySize();

    // Drag right +30px (+3%): newBefore = 0+3 = 3, which is 0 < 3 < 20 (minSize)
    // lines 262-264: diff=17, newBefore=20, newAfter -= 17 → 80
    el._handleResize(handle, 30);
    expect(panels[0].size).toBe(20); // snapped to minSize
    expect(panels[1].size).toBe(80); // 100 - 3(delta) - 17(snap diff) = 80
  });
});

/* ------------------------------------------------------------------ */
/*  After panel already-at-zero drag (lines 290–296)                  */
/* ------------------------------------------------------------------ */

describe('flint-resizable-group — after panel already-collapsed drag', () => {
  it('transfers overshoot back to sibling when after panel is at 0 and dragged further right (lines 290-292)', async () => {
    // Covers: after.size===0 && newAfter<=0 path
    const el = await fixture<FlintResizableGroup>(html`
      <flint-resizable-group>
        <flint-resizable-panel .defaultSize=${30}><div>A</div></flint-resizable-panel>
        <flint-resizable-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${70} .minSize=${20}><div>B</div></flint-resizable-panel>
      </flint-resizable-group>
    `);
    await el.updateComplete;
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());

    const handle = getHandles(el)[0];
    const panels = getPanels(el);

    panels[0].size = 90;
    panels[1].size = 0;
    panels[0]._applySize();
    panels[1]._applySize();

    // Drag right +50px (+5%): newAfter = 0-5 = -5 → lines 290-292: newBefore += -5 → before stays 90
    el._handleResize(handle, 50);
    expect(panels[1].size).toBe(0);
    // Without lines 290-292 the sibling would gain 5% → 95; with them it stays at 90
    expect(panels[0].size).toBe(90);
  });

  it('snaps after panel to minSize when dragging left slightly from zero (lines 294-296)', async () => {
    // Covers: after.size===0 && newAfter>0 (partial snap-back) path
    const el = await fixture<FlintResizableGroup>(html`
      <flint-resizable-group>
        <flint-resizable-panel .defaultSize=${30}><div>A</div></flint-resizable-panel>
        <flint-resizable-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${70} .minSize=${20}><div>B</div></flint-resizable-panel>
      </flint-resizable-group>
    `);
    await el.updateComplete;
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());

    const handle = getHandles(el)[0];
    const panels = getPanels(el);

    panels[0].size = 100;
    panels[1].size = 0;
    panels[0]._applySize();
    panels[1]._applySize();

    // Drag left -30px (-3%): newAfter = 0+3 = 3, which is 0 < 3 < 20 (minSize)
    // lines 294-296: diff=17, newAfter=20, newBefore -= 17 → 80
    el._handleResize(handle, -30);
    expect(panels[1].size).toBe(20); // snapped to minSize
    expect(panels[0].size).toBe(80); // 100 - 3(delta) - 17(snap diff) = 80
  });
});

/* ------------------------------------------------------------------ */
/*  After panel collapsible overshoot accumulation (lines 305–308)    */
/* ------------------------------------------------------------------ */

describe('flint-resizable-group — after panel collapsible overshoot accumulation', () => {
  it('clamps after panel to minSize when single-step overshoot is below threshold (lines 305-308)', async () => {
    // after.size!=0, collapsible, overshoot < minSize/2 → accumulate & clamp (lines 305-308)
    const el = await fixture<FlintResizableGroup>(html`
      <flint-resizable-group>
        <flint-resizable-panel .defaultSize=${50}><div>A</div></flint-resizable-panel>
        <flint-resizable-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${50} .minSize=${30} .collapsible=${true}><div>B</div></flint-resizable-panel>
      </flint-resizable-group>
    `);
    await el.updateComplete;
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());

    const handle = getHandles(el)[0];
    const panels = getPanels(el);

    el._startDrag();
    // +250px (+25%): newAfter = 50-25=25 < minSize(30), overshoot=5 < threshold(15) → lines 305-308
    el._handleResize(handle, 250);
    expect(panels[1].size).toBe(30); // clamped to minSize, not collapsed
    expect(panels[0].size).toBe(70); // before adjusted for diff
    el._endDrag();
  });

  it('collapses after panel via accumulated overshoot across many small drag events', async () => {
    const el = await fixture<FlintResizableGroup>(html`
      <flint-resizable-group>
        <flint-resizable-panel .defaultSize=${50}><div>A</div></flint-resizable-panel>
        <flint-resizable-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${50} .minSize=${20} .collapsible=${true}><div>B</div></flint-resizable-panel>
      </flint-resizable-group>
    `);
    await el.updateComplete;
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());

    const handle = getHandles(el)[0];
    const panels = getPanels(el);

    // Drag 1: bring panels[1] from 50% to minSize (20%) in 30 steps of 1%
    el._startDrag();
    for (let i = 0; i < 30; i++) el._handleResize(handle, 10);
    expect(panels[1].size).toBe(20);
    el._endDrag();

    // Drag 2: start at minSize → in _collapsibleAtDragStart; 10 × 1% overshoot = 10% = minSize/2 → collapse
    el._startDrag();
    for (let i = 0; i < 10; i++) el._handleResize(handle, 10);
    expect(panels[1].size).toBe(0);
    el._endDrag();
  });

  it('resets after-panel overshoot when user drags back above minSize', async () => {
    const el = await fixture<FlintResizableGroup>(html`
      <flint-resizable-group>
        <flint-resizable-panel .defaultSize=${50}><div>A</div></flint-resizable-panel>
        <flint-resizable-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${50} .minSize=${20} .collapsible=${true}><div>B</div></flint-resizable-panel>
      </flint-resizable-group>
    `);
    await el.updateComplete;
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());

    const handle = getHandles(el)[0];
    const panels = getPanels(el);

    el._startDrag();
    // Bring panels[1] to minSize
    for (let i = 0; i < 30; i++) el._handleResize(handle, 10);
    expect(panels[1].size).toBe(20);

    // Accumulate 5% overshoot (below threshold of 10%)
    for (let i = 0; i < 5; i++) el._handleResize(handle, 10);
    expect(panels[1].size).toBe(20); // still clamped, not collapsed

    // Drag back above minSize → overshoot resets
    el._handleResize(handle, -50); // +5% → panels[1] = 25
    expect(panels[1].size).toBe(25);

    // Need full threshold again from scratch (9 steps of 1% = 9% < 10% → no collapse)
    for (let i = 0; i < 9; i++) el._handleResize(handle, 10);
    expect(panels[1].size).toBe(20); // clamped to minSize, not collapsed
    el._endDrag();
  });
});

/* ------------------------------------------------------------------ */
/*  Collapse overshoot — exact boundary tests (kills >= vs > mutants) */
/* ------------------------------------------------------------------ */

describe('flint-resizable-group — collapse overshoot >= boundary', () => {
  it('collapses before panel when overshoot is exactly minSize/2 (tests >= not >)', async () => {
    const el = await fixture<FlintResizableGroup>(html`
      <flint-resizable-group>
        <flint-resizable-panel .defaultSize=${50} .minSize=${20} .collapsible=${true}><div>A</div></flint-resizable-panel>
        <flint-resizable-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${50}><div>B</div></flint-resizable-panel>
      </flint-resizable-group>
    `);
    await el.updateComplete;
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());

    const handle = getHandles(el)[0];
    const panels = getPanels(el);

    el._startDrag();
    // newBefore = 50 - 40 = 10, overshoot = 20 - 10 = 10 = minSize/2(10) → must collapse (>=)
    el._handleResize(handle, -400);
    expect(panels[0].size).toBe(0);
    el._endDrag();
  });

  it('does NOT collapse before panel when overshoot is 1% below minSize/2', async () => {
    const el = await fixture<FlintResizableGroup>(html`
      <flint-resizable-group>
        <flint-resizable-panel .defaultSize=${50} .minSize=${20} .collapsible=${true}><div>A</div></flint-resizable-panel>
        <flint-resizable-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${50}><div>B</div></flint-resizable-panel>
      </flint-resizable-group>
    `);
    await el.updateComplete;
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());

    const handle = getHandles(el)[0];
    const panels = getPanels(el);

    el._startDrag();
    // newBefore = 50 - 39 = 11, overshoot = 20 - 11 = 9 < 10 → must NOT collapse
    el._handleResize(handle, -390);
    expect(panels[0].size).toBe(20); // clamped to minSize, not collapsed
    el._endDrag();
  });

  it('collapses after panel when overshoot is exactly minSize/2 (tests >= not >)', async () => {
    const el = await fixture<FlintResizableGroup>(html`
      <flint-resizable-group>
        <flint-resizable-panel .defaultSize=${50}><div>A</div></flint-resizable-panel>
        <flint-resizable-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${50} .minSize=${20} .collapsible=${true}><div>B</div></flint-resizable-panel>
      </flint-resizable-group>
    `);
    await el.updateComplete;
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());

    const handle = getHandles(el)[0];
    const panels = getPanels(el);

    el._startDrag();
    // newAfter = 50 - 40 = 10, overshoot = 20 - 10 = 10 = minSize/2(10) → must collapse (>=)
    el._handleResize(handle, 400);
    expect(panels[1].size).toBe(0);
    el._endDrag();
  });

  it('does NOT collapse after panel when overshoot is 1% below minSize/2', async () => {
    const el = await fixture<FlintResizableGroup>(html`
      <flint-resizable-group>
        <flint-resizable-panel .defaultSize=${50}><div>A</div></flint-resizable-panel>
        <flint-resizable-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${50} .minSize=${20} .collapsible=${true}><div>B</div></flint-resizable-panel>
      </flint-resizable-group>
    `);
    await el.updateComplete;
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(mockRect());

    const handle = getHandles(el)[0];
    const panels = getPanels(el);

    el._startDrag();
    // newAfter = 50 - 39 = 11, overshoot = 20 - 11 = 9 < 10 → must NOT collapse
    el._handleResize(handle, 390);
    expect(panels[1].size).toBe(20); // clamped to minSize, not collapsed
    el._endDrag();
  });
});

describe('flint-resizable — accessibility', () => {
    it('should be accessible', async () => {
        const el = await fixture(html`
            <flint-resizable-group>
                <flint-resizable-panel>Panel 1</flint-resizable-panel>
                <flint-resizable-handle></flint-resizable-handle>
                <flint-resizable-panel>Panel 2</flint-resizable-panel>
            </flint-resizable-group>
        `);
        await expectAccessible(el);
    });
});
