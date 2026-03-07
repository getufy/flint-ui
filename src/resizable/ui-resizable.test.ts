import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-resizable.js';
import type { UiResizableGroup, UiResizablePanel, UiResizableHandle } from './ui-resizable.js';

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

  const el = await fixture<UiResizableGroup>(html`
    <ui-resizable-group .orientation=${orientation} .dir=${dir}>
      ${panelSizes.map(
        (size, i) => html`
          <ui-resizable-panel .defaultSize=${size}>
            <div>Panel ${i + 1}</div>
          </ui-resizable-panel>
          ${i < panelSizes.length - 1
            ? html`<ui-resizable-handle ?with-handle=${withHandle}></ui-resizable-handle>`
            : ''}
        `,
      )}
    </ui-resizable-group>
  `);
  await el.updateComplete;
  return el;
}

function getPanels(group: UiResizableGroup) {
  return Array.from(group.querySelectorAll<UiResizablePanel>('ui-resizable-panel'));
}

function getHandles(group: UiResizableGroup) {
  return Array.from(group.querySelectorAll<UiResizableHandle>('ui-resizable-handle'));
}

/* ------------------------------------------------------------------ */
/*  ui-resizable-group — rendering                                    */
/* ------------------------------------------------------------------ */

describe('ui-resizable-group — rendering', () => {
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
/*  ui-resizable-group — size distribution                            */
/* ------------------------------------------------------------------ */

describe('ui-resizable-group — size distribution', () => {
  it('distributes defaultSize to panels', async () => {
    const el = await make({ panelSizes: [30, 70] });
    const panels = getPanels(el);
    expect(panels[0].size).toBe(30);
    expect(panels[1].size).toBe(70);
  });

  it('distributes remaining size to panels without explicit size', async () => {
    const el = await fixture<UiResizableGroup>(html`
      <ui-resizable-group>
        <ui-resizable-panel .defaultSize=${60}>
          <div>A</div>
        </ui-resizable-panel>
        <ui-resizable-handle></ui-resizable-handle>
        <ui-resizable-panel>
          <div>B</div>
        </ui-resizable-panel>
      </ui-resizable-group>
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
/*  ui-resizable-panel — properties                                   */
/* ------------------------------------------------------------------ */

describe('ui-resizable-panel — properties', () => {
  it('applies flex-basis based on size', async () => {
    const el = await make({ panelSizes: [40, 60] });
    const panels = getPanels(el);
    expect(panels[0].style.flexBasis).toBe('40%');
    expect(panels[1].style.flexBasis).toBe('60%');
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
});

/* ------------------------------------------------------------------ */
/*  ui-resizable-handle — rendering                                   */
/* ------------------------------------------------------------------ */

describe('ui-resizable-handle — rendering', () => {
  it('has role=separator and tabindex=0', async () => {
    const el = await make();
    const handle = getHandles(el)[0];
    expect(handle.getAttribute('role')).toBe('separator');
    expect(handle.getAttribute('tabindex')).toBe('0');
  });

  it('reflects orientation attribute', async () => {
    const el = await make({ orientation: 'vertical' });
    await el.updateComplete;
    const handle = getHandles(el)[0];
    // Wait for sync
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
/*  ui-resizable-handle — keyboard                                    */
/* ------------------------------------------------------------------ */

describe('ui-resizable-handle — keyboard', () => {
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
/*  ui-resizable-group — resize event                                 */
/* ------------------------------------------------------------------ */

describe('ui-resizable-group — resize event', () => {
  it('fires ui-resizable-change on resize', async () => {
    const el = await make({ panelSizes: [50, 50] });
    // Mock getBoundingClientRect for the group
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      width: 1000,
      height: 400,
      x: 0,
      y: 0,
      top: 0,
      right: 1000,
      bottom: 400,
      left: 0,
      toJSON: () => ({}),
    });

    const spy = vi.fn();
    el.addEventListener('ui-resizable-change', spy);

    const handle = getHandles(el)[0];
    el._handleResize(handle, 50); // 50px delta

    expect(spy).toHaveBeenCalledOnce();
    const detail = spy.mock.calls[0][0].detail;
    expect(detail.layout).toBeDefined();
    expect(detail.layout.length).toBe(2);
  });

  it('adjusts panel sizes proportionally on resize', async () => {
    const el = await make({ panelSizes: [50, 50] });
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      width: 1000,
      height: 400,
      x: 0,
      y: 0,
      top: 0,
      right: 1000,
      bottom: 400,
      left: 0,
      toJSON: () => ({}),
    });

    const handle = getHandles(el)[0];
    el._handleResize(handle, 100); // 100px = 10% of 1000px

    const panels = getPanels(el);
    expect(panels[0].size).toBe(60);
    expect(panels[1].size).toBe(40);
  });
});

/* ------------------------------------------------------------------ */
/*  ui-resizable-group — min/max constraints                          */
/* ------------------------------------------------------------------ */

describe('ui-resizable-group — constraints', () => {
  it('enforces minSize on panels', async () => {
    const el = await fixture<UiResizableGroup>(html`
      <ui-resizable-group>
        <ui-resizable-panel .defaultSize=${50} .minSize=${20}>
          <div>A</div>
        </ui-resizable-panel>
        <ui-resizable-handle></ui-resizable-handle>
        <ui-resizable-panel .defaultSize=${50} .minSize=${20}>
          <div>B</div>
        </ui-resizable-panel>
      </ui-resizable-group>
    `);
    await el.updateComplete;

    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      width: 1000,
      height: 400,
      x: 0,
      y: 0,
      top: 0,
      right: 1000,
      bottom: 400,
      left: 0,
      toJSON: () => ({}),
    });

    const handle = getHandles(el)[0];
    // Try to move left panel below its min (resize by -400px = -40%)
    el._handleResize(handle, -400);

    const panels = getPanels(el);
    expect(panels[0].size).toBeGreaterThanOrEqual(20);
    expect(panels[1].size).toBeLessThanOrEqual(80);
  });

  it('enforces maxSize on panels', async () => {
    const el = await fixture<UiResizableGroup>(html`
      <ui-resizable-group>
        <ui-resizable-panel .defaultSize=${50} .maxSize=${70}>
          <div>A</div>
        </ui-resizable-panel>
        <ui-resizable-handle></ui-resizable-handle>
        <ui-resizable-panel .defaultSize=${50}>
          <div>B</div>
        </ui-resizable-panel>
      </ui-resizable-group>
    `);
    await el.updateComplete;

    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      width: 1000,
      height: 400,
      x: 0,
      y: 0,
      top: 0,
      right: 1000,
      bottom: 400,
      left: 0,
      toJSON: () => ({}),
    });

    const handle = getHandles(el)[0];
    // Try to grow panel A beyond max (resize by +300px = +30%)
    el._handleResize(handle, 300);

    const panels = getPanels(el);
    expect(panels[0].size).toBeLessThanOrEqual(70);
  });

  it('collapses panel when collapsible and dragged below half minSize from minSize', async () => {
    const el = await fixture<UiResizableGroup>(html`
      <ui-resizable-group>
        <ui-resizable-panel .defaultSize=${50} .minSize=${20} .collapsible=${true}>
          <div>A</div>
        </ui-resizable-panel>
        <ui-resizable-handle></ui-resizable-handle>
        <ui-resizable-panel .defaultSize=${50}>
          <div>B</div>
        </ui-resizable-panel>
      </ui-resizable-group>
    `);
    await el.updateComplete;

    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      width: 1000,
      height: 400,
      x: 0,
      y: 0,
      top: 0,
      right: 1000,
      bottom: 400,
      left: 0,
      toJSON: () => ({}),
    });

    const handle = getHandles(el)[0];
    // First drag to minSize boundary (50% → 20%)
    el._handleResize(handle, -300);
    const panels = getPanels(el);
    expect(panels[0].size).toBe(20);

    // Now drag past collapse threshold (20% → below 10% = minSize/2)
    el._handleResize(handle, -150);
    expect(panels[0].size).toBe(0);
  });

  it('does not collapse on a single fast drag from above minSize', async () => {
    const el = await fixture<UiResizableGroup>(html`
      <ui-resizable-group>
        <ui-resizable-panel .defaultSize=${50} .minSize=${20} .collapsible=${true}>
          <div>A</div>
        </ui-resizable-panel>
        <ui-resizable-handle></ui-resizable-handle>
        <ui-resizable-panel .defaultSize=${50}>
          <div>B</div>
        </ui-resizable-panel>
      </ui-resizable-group>
    `);
    await el.updateComplete;

    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      width: 1000,
      height: 400,
      x: 0,
      y: 0,
      top: 0,
      right: 1000,
      bottom: 400,
      left: 0,
      toJSON: () => ({}),
    });

    const handle = getHandles(el)[0];
    // Fast drag: 50% → would be 5% (below minSize/2=10%), but panel was above minSize
    // so it should clamp to minSize, NOT collapse
    el._handleResize(handle, -450);

    const panels = getPanels(el);
    expect(panels[0].size).toBe(20); // clamped to minSize, not collapsed to 0
  });
});

/* ------------------------------------------------------------------ */
/*  ui-resizable-group — RTL                                          */
/* ------------------------------------------------------------------ */

describe('ui-resizable-group — RTL', () => {
  it('reverses drag direction in RTL', async () => {
    const el = await make({ panelSizes: [50, 50], dir: 'rtl' });

    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      width: 1000,
      height: 400,
      x: 0,
      y: 0,
      top: 0,
      right: 1000,
      bottom: 400,
      left: 0,
      toJSON: () => ({}),
    });

    const handle = getHandles(el)[0];
    // In RTL, a positive pixel delta should shrink panel A (reversed)
    el._handleResize(handle, 100);

    const panels = getPanels(el);
    expect(panels[0].size).toBe(40); // Shrunk (reversed)
    expect(panels[1].size).toBe(60); // Grew
  });
});

/* ------------------------------------------------------------------ */
/*  ui-resizable-group — three panels                                 */
/* ------------------------------------------------------------------ */

describe('ui-resizable-group — three panels', () => {
  it('handles three-panel layout', async () => {
    const el = await make({ panelSizes: [33, 34, 33] });
    const panels = getPanels(el);
    expect(panels.length).toBe(3);
    expect(getHandles(el).length).toBe(2);
  });

  it('resizes adjacent panels only', async () => {
    const el = await make({ panelSizes: [30, 40, 30] });

    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      width: 1000,
      height: 400,
      x: 0,
      y: 0,
      top: 0,
      right: 1000,
      bottom: 400,
      left: 0,
      toJSON: () => ({}),
    });

    const handles = getHandles(el);
    // Resize first handle — should only affect panels 0 and 1
    el._handleResize(handles[0], 50); // 5%

    const panels = getPanels(el);
    expect(panels[0].size).toBe(35);
    expect(panels[1].size).toBe(35);
    expect(panels[2].size).toBe(30); // Unchanged
  });
});

/* ------------------------------------------------------------------ */
/*  ui-resizable-group — vertical orientation                         */
/* ------------------------------------------------------------------ */

describe('ui-resizable-group — vertical', () => {
  it('uses height for resize calculation in vertical mode', async () => {
    const el = await make({ orientation: 'vertical', panelSizes: [50, 50] });

    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      width: 400,
      height: 1000,
      x: 0,
      y: 0,
      top: 0,
      right: 400,
      bottom: 1000,
      left: 0,
      toJSON: () => ({}),
    });

    const handle = getHandles(el)[0];
    el._handleResize(handle, 100); // 100px = 10% of 1000px height

    const panels = getPanels(el);
    expect(panels[0].size).toBe(60);
    expect(panels[1].size).toBe(40);
  });
});

/* ------------------------------------------------------------------ */
/*  ui-resizable-group — nested isolation                             */
/* ------------------------------------------------------------------ */

describe('ui-resizable-group — nested', () => {
  it('outer group does not collect inner group panels', async () => {
    const el = await fixture<UiResizableGroup>(html`
      <ui-resizable-group orientation="horizontal">
        <ui-resizable-panel .defaultSize=${50}>
          <ui-resizable-group orientation="vertical">
            <ui-resizable-panel .defaultSize=${50}>
              <div>Inner 1</div>
            </ui-resizable-panel>
            <ui-resizable-handle></ui-resizable-handle>
            <ui-resizable-panel .defaultSize=${50}>
              <div>Inner 2</div>
            </ui-resizable-panel>
          </ui-resizable-group>
        </ui-resizable-panel>
        <ui-resizable-handle></ui-resizable-handle>
        <ui-resizable-panel .defaultSize=${50}>
          <div>Outer 2</div>
        </ui-resizable-panel>
      </ui-resizable-group>
    `);
    await el.updateComplete;

    // Outer group should only know about its 2 direct panels
    expect(el.getLayout().length).toBe(2);
    expect(el.getLayout()).toEqual([50, 50]);
  });
});

/* ------------------------------------------------------------------ */
/*  ui-resizable-handle — disconnect cleanup                          */
/* ------------------------------------------------------------------ */

describe('ui-resizable-handle — pointer drag simulation', () => {
  it('resizes panels on pointerdown → pointermove → pointerup', async () => {
    const el = await make({ panelSizes: [50, 50] });
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      width: 1000, height: 400,
      x: 0, y: 0, top: 0, right: 1000, bottom: 400, left: 0,
      toJSON: () => ({}),
    });

    const handle = getHandles(el)[0];
    // Stub setPointerCapture / releasePointerCapture (not in jsdom)
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
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      width: 1000, height: 400,
      x: 0, y: 0, top: 0, right: 1000, bottom: 400, left: 0,
      toJSON: () => ({}),
    });

    const handle = getHandles(el)[0];
    handle.setPointerCapture = vi.fn();
    handle.releasePointerCapture = vi.fn();

    handle.dispatchEvent(new PointerEvent('pointerdown', { clientX: 500, clientY: 200, pointerId: 1, bubbles: true, button: 0 }));
    handle.dispatchEvent(new PointerEvent('pointercancel', { pointerId: 1, bubbles: true }));
    // Further moves should be ignored since dragging was cancelled
    handle.dispatchEvent(new PointerEvent('pointermove', { clientX: 700, clientY: 200, pointerId: 1, bubbles: true, buttons: 1 }));

    const panels = getPanels(el);
    expect(panels[0].size).toBe(50);
    expect(panels[1].size).toBe(50);
  });
});

/* ------------------------------------------------------------------ */
/*  ui-resizable-handle — lostpointercapture (drag-out-of-window fix) */
/* ------------------------------------------------------------------ */

describe('ui-resizable-handle — lostpointercapture resets dragging', () => {
  it('stops resizing after lostpointercapture (drag-out-of-window fix)', async () => {
    const el = await make({ panelSizes: [50, 50] });
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      width: 1000, height: 400,
      x: 0, y: 0, top: 0, right: 1000, bottom: 400, left: 0,
      toJSON: () => ({}),
    });

    const handle = getHandles(el)[0];
    handle.setPointerCapture = vi.fn();
    handle.releasePointerCapture = vi.fn();

    // Start drag
    handle.dispatchEvent(new PointerEvent('pointerdown', { clientX: 500, clientY: 200, pointerId: 1, bubbles: true, button: 0 }));
    handle.dispatchEvent(new PointerEvent('pointermove', { clientX: 550, clientY: 200, pointerId: 1, bubbles: true, buttons: 1 }));

    // Simulate pointer capture lost (e.g. pointer left browser window)
    handle.dispatchEvent(new Event('lostpointercapture'));

    // Further moves should be ignored — dragging was reset
    handle.dispatchEvent(new PointerEvent('pointermove', { clientX: 700, clientY: 200, pointerId: 1, bubbles: true, buttons: 1 }));

    const panels = getPanels(el);
    // Only the first 50px move (5%) should have taken effect
    expect(panels[0].size).toBe(55);
    expect(panels[1].size).toBe(45);
  });

  it('ignores pointermove when e.buttons === 0 (mouse released without pointerup)', async () => {
    const el = await make({ panelSizes: [50, 50] });
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      width: 1000, height: 400,
      x: 0, y: 0, top: 0, right: 1000, bottom: 400, left: 0,
      toJSON: () => ({}),
    });

    const handle = getHandles(el)[0];
    handle.setPointerCapture = vi.fn();

    // Start drag
    handle.dispatchEvent(new PointerEvent('pointerdown', { clientX: 500, clientY: 200, pointerId: 1, bubbles: true, button: 0 }));

    // Move with buttons=0 (no button pressed — stale drag)
    handle.dispatchEvent(new PointerEvent('pointermove', { clientX: 700, clientY: 200, pointerId: 1, bubbles: true, buttons: 0 }));

    const panels = getPanels(el);
    expect(panels[0].size).toBe(50);
    expect(panels[1].size).toBe(50);
  });
});

/* ------------------------------------------------------------------ */
/*  ui-resizable-handle — primary button only                         */
/* ------------------------------------------------------------------ */

describe('ui-resizable-handle — primary button only', () => {
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

describe('ui-resizable-handle — disconnect cleanup', () => {
  it('removes event listeners on disconnect', async () => {
    const el = await make();
    const handle = getHandles(el)[0];
    const removeSpy = vi.spyOn(handle, 'removeEventListener');
    handle.remove();
    expect(removeSpy).toHaveBeenCalled();
  });
});

/* ------------------------------------------------------------------ */
/*  ui-resizable-group — dynamic children                             */
/* ------------------------------------------------------------------ */

describe('ui-resizable-group — dynamic children', () => {
  it('picks up dynamically added panels via slotchange', async () => {
    const el = await fixture<UiResizableGroup>(html`
      <ui-resizable-group>
        <ui-resizable-panel .defaultSize=${50}>
          <div>A</div>
        </ui-resizable-panel>
        <ui-resizable-handle></ui-resizable-handle>
        <ui-resizable-panel .defaultSize=${50}>
          <div>B</div>
        </ui-resizable-panel>
      </ui-resizable-group>
    `);
    await el.updateComplete;
    expect(el.getLayout().length).toBe(2);

    // Add a third panel
    const handleEl = document.createElement('ui-resizable-handle');
    const panelEl = document.createElement('ui-resizable-panel');
    (panelEl as UiResizablePanel).defaultSize = 0;
    el.appendChild(handleEl);
    el.appendChild(panelEl);
    await el.updateComplete;

    expect(el.getLayout().length).toBe(3);
  });

  it('handles dynamic panel removal', async () => {
    const el = await make({ panelSizes: [30, 40, 30] });
    expect(el.getLayout().length).toBe(3);

    // Remove the last panel + its handle
    const panels = getPanels(el);
    const handles = getHandles(el);
    panels[2].remove();
    handles[1].remove();
    await el.updateComplete;

    expect(el.getLayout().length).toBe(2);
  });
});

/* ------------------------------------------------------------------ */
/*  ui-resizable-group — orientation change after render              */
/* ------------------------------------------------------------------ */

describe('ui-resizable-group — orientation change', () => {
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
/*  ui-resizable-group — totalPx=0 early return                      */
/* ------------------------------------------------------------------ */

describe('ui-resizable-group — edge cases', () => {
  it('does not resize when container has zero size', async () => {
    const el = await make({ panelSizes: [50, 50] });
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      width: 0, height: 0,
      x: 0, y: 0, top: 0, right: 0, bottom: 0, left: 0,
      toJSON: () => ({}),
    });

    const spy = vi.fn();
    el.addEventListener('ui-resizable-change', spy);
    const handle = getHandles(el)[0];
    el._handleResize(handle, 100);

    // Should not fire event or change sizes
    expect(spy).not.toHaveBeenCalled();
    const panels = getPanels(el);
    expect(panels[0].size).toBe(50);
    expect(panels[1].size).toBe(50);
  });
});

/* ------------------------------------------------------------------ */
/*  ui-resizable-group — maxSize on after-panel                       */
/* ------------------------------------------------------------------ */

describe('ui-resizable-group — after-panel maxSize', () => {
  it('enforces maxSize on the after panel', async () => {
    const el = await fixture<UiResizableGroup>(html`
      <ui-resizable-group>
        <ui-resizable-panel .defaultSize=${50}>
          <div>A</div>
        </ui-resizable-panel>
        <ui-resizable-handle></ui-resizable-handle>
        <ui-resizable-panel .defaultSize=${50} .maxSize=${60}>
          <div>B</div>
        </ui-resizable-panel>
      </ui-resizable-group>
    `);
    await el.updateComplete;

    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      width: 1000, height: 400,
      x: 0, y: 0, top: 0, right: 1000, bottom: 400, left: 0,
      toJSON: () => ({}),
    });

    const handle = getHandles(el)[0];
    // Shrink panel A by 300px = 30%, giving after-panel 80% (exceeds max 60%)
    el._handleResize(handle, -300);

    const panels = getPanels(el);
    expect(panels[1].size).toBeLessThanOrEqual(60);
  });
});

/* ------------------------------------------------------------------ */
/*  ui-resizable-panel — connectedCallback with size > 0              */
/* ------------------------------------------------------------------ */

describe('ui-resizable-panel — connectedCallback', () => {
  it('applies flexBasis immediately when size > 0 on connect', async () => {
    const panel = document.createElement('ui-resizable-panel') as import('./ui-resizable.js').UiResizablePanel;
    panel.size = 42;
    document.body.appendChild(panel);
    await panel.updateComplete;

    expect(panel.style.flexBasis).toBe('42%');
    panel.remove();
  });
});

/* ------------------------------------------------------------------ */
/*  ui-resizable-handle — ARIA attributes                             */
/* ------------------------------------------------------------------ */

describe('ui-resizable-handle — ARIA attributes', () => {
  it('sets aria-valuenow, aria-valuemin, aria-valuemax on handles', async () => {
    const el = await fixture<UiResizableGroup>(html`
      <ui-resizable-group>
        <ui-resizable-panel .defaultSize=${40} .minSize=${10} .maxSize=${80}>
          <div>A</div>
        </ui-resizable-panel>
        <ui-resizable-handle></ui-resizable-handle>
        <ui-resizable-panel .defaultSize=${60}>
          <div>B</div>
        </ui-resizable-panel>
      </ui-resizable-group>
    `);
    await el.updateComplete;

    const handle = getHandles(el)[0];
    expect(handle.getAttribute('aria-valuenow')).toBe('40');
    expect(handle.getAttribute('aria-valuemin')).toBe('10');
    expect(handle.getAttribute('aria-valuemax')).toBe('80');
  });

  it('sets aria-orientation on handles', async () => {
    const el = await make({ orientation: 'vertical', panelSizes: [50, 50] });
    const handle = getHandles(el)[0];
    expect(handle.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('updates aria-valuenow after resize', async () => {
    const el = await make({ panelSizes: [50, 50] });
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      width: 1000, height: 400,
      x: 0, y: 0, top: 0, right: 1000, bottom: 400, left: 0,
      toJSON: () => ({}),
    });

    const handle = getHandles(el)[0];
    el._handleResize(handle, 200); // 20%

    expect(handle.getAttribute('aria-valuenow')).toBe('70');
  });
});
