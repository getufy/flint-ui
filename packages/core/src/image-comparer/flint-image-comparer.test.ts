import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-image-comparer';
import type { FlintImageComparer } from './flint-image-comparer';
import { expectAccessible } from '../test-utils/axe.js';

/* ── helpers ─────────────────────────────────────────────────── */

interface MakeOpts {
    position?: number;
    disabled?: boolean;
}

async function make({ position = 50, disabled = false }: MakeOpts = {}) {
    const el = await fixture<FlintImageComparer>(html`
        <flint-image-comparer .position=${position} ?disabled=${disabled}>
            <img slot="before" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="Before" />
            <img slot="after" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="After" />
        </flint-image-comparer>
    `);
    await el.updateComplete;
    return el;
}

function shadow(el: FlintImageComparer) {
    return el.shadowRoot!;
}

function handle(el: FlintImageComparer) {
    return shadow(el).querySelector('.handle') as HTMLElement;
}

function divider(el: FlintImageComparer) {
    return shadow(el).querySelector('.divider') as HTMLElement;
}

function beforePanel(el: FlintImageComparer) {
    return shadow(el).querySelector('.before') as HTMLElement;
}

/* ── rendering ───────────────────────────────────────────────── */

describe('flint-image-comparer', () => {
    describe('rendering', () => {
        it('renders shadow DOM structure', async () => {
            const el = await make();
            expect(shadow(el).querySelector('.base')).toBeTruthy();
            expect(shadow(el).querySelector('.before')).toBeTruthy();
            expect(shadow(el).querySelector('.after')).toBeTruthy();
            expect(divider(el)).toBeTruthy();
            expect(handle(el)).toBeTruthy();
        });

        it('renders with default position of 50', async () => {
            const el = await make();
            expect(el.position).toBe(50);
            expect(beforePanel(el).style.clipPath).toBe('inset(0 50% 0 0)');
            expect(divider(el).style.left).toBe('50%');
            expect(handle(el).style.left).toBe('50%');
        });

        it('renders slots for before, after, and handle', async () => {
            const el = await make();
            const slots = shadow(el).querySelectorAll('slot');
            const names = Array.from(slots).map((s) => s.name);
            expect(names).toContain('before');
            expect(names).toContain('after');
            expect(names).toContain('handle');
        });

        it('renders default handle icon (SVG)', async () => {
            const el = await make();
            const svg = handle(el).querySelector('svg');
            expect(svg).toBeTruthy();
        });
    });

    /* ── position prop ────────────────────────────────────────── */

    describe('position', () => {
        it('accepts a custom initial position', async () => {
            const el = await make({ position: 25 });
            expect(el.position).toBe(25);
            expect(beforePanel(el).style.clipPath).toBe('inset(0 75% 0 0)');
        });

        it('clamps position below 0 to 0', async () => {
            const el = await make({ position: -10 });
            expect(beforePanel(el).style.clipPath).toBe('inset(0 100% 0 0)');
        });

        it('clamps position above 100 to 100', async () => {
            const el = await make({ position: 150 });
            expect(beforePanel(el).style.clipPath).toBe('inset(0 0% 0 0)');
        });

        it('updates DOM when position changes', async () => {
            const el = await make();
            el.position = 75;
            await el.updateComplete;
            expect(beforePanel(el).style.clipPath).toBe('inset(0 25% 0 0)');
            expect(divider(el).style.left).toBe('75%');
            expect(handle(el).style.left).toBe('75%');
        });
    });

    /* ── disabled ─────────────────────────────────────────────── */

    describe('disabled', () => {
        it('reflects disabled attribute', async () => {
            const el = await make({ disabled: true });
            expect(el.hasAttribute('disabled')).toBe(true);
        });

        it('does not fire events when disabled and key pressed', async () => {
            const el = await make({ disabled: true, position: 50 });
            const spy = vi.fn();
            el.addEventListener('flint-image-comparer-change', spy);

            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
            expect(spy).not.toHaveBeenCalled();
            expect(el.position).toBe(50);
        });
    });

    /* ── keyboard ─────────────────────────────────────────────── */

    describe('keyboard', () => {
        it('ArrowRight increases position by 1', async () => {
            const el = await make({ position: 50 });
            const spy = vi.fn();
            el.addEventListener('flint-image-comparer-change', spy);

            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
            expect(el.position).toBe(51);
            expect(spy).toHaveBeenCalledOnce();
            expect(spy.mock.calls[0][0].detail.position).toBe(51);
        });

        it('ArrowLeft decreases position by 1', async () => {
            const el = await make({ position: 50 });
            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
            expect(el.position).toBe(49);
        });

        it('Shift+ArrowRight increases by 10', async () => {
            const el = await make({ position: 50 });
            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', shiftKey: true, bubbles: true }));
            expect(el.position).toBe(60);
        });

        it('Shift+ArrowLeft decreases by 10', async () => {
            const el = await make({ position: 50 });
            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', shiftKey: true, bubbles: true }));
            expect(el.position).toBe(40);
        });

        it('Home sets position to 0', async () => {
            const el = await make({ position: 50 });
            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
            expect(el.position).toBe(0);
        });

        it('End sets position to 100', async () => {
            const el = await make({ position: 50 });
            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
            expect(el.position).toBe(100);
        });

        it('does not fire change when position would not change (already at 0, ArrowLeft)', async () => {
            const el = await make({ position: 0 });
            const spy = vi.fn();
            el.addEventListener('flint-image-comparer-change', spy);
            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
            expect(spy).not.toHaveBeenCalled();
        });

        it('does not fire change when position would not change (already at 100, ArrowRight)', async () => {
            const el = await make({ position: 100 });
            const spy = vi.fn();
            el.addEventListener('flint-image-comparer-change', spy);
            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
            expect(spy).not.toHaveBeenCalled();
        });

        it('ignores unrelated keys', async () => {
            const el = await make({ position: 50 });
            const spy = vi.fn();
            el.addEventListener('flint-image-comparer-change', spy);
            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }));
            expect(spy).not.toHaveBeenCalled();
            expect(el.position).toBe(50);
        });
    });

    /* ── accessibility ────────────────────────────────────────── */

    describe('accessibility', () => {
        it('handle has role="slider"', async () => {
            const el = await make();
            expect(handle(el).getAttribute('role')).toBe('slider');
        });

        it('handle has correct aria attributes', async () => {
            const el = await make({ position: 30 });
            const h = handle(el);
            expect(h.getAttribute('aria-valuemin')).toBe('0');
            expect(h.getAttribute('aria-valuemax')).toBe('100');
            expect(h.getAttribute('aria-valuenow')).toBe('30');
            expect(h.getAttribute('aria-label')).toBe('Image comparison slider');
        });

        it('handle has tabindex="0"', async () => {
            const el = await make();
            expect(handle(el).getAttribute('tabindex')).toBe('0');
        });

        it('aria-valuenow updates when position changes', async () => {
            const el = await make();
            el.position = 80;
            await el.updateComplete;
            expect(handle(el).getAttribute('aria-valuenow')).toBe('80');
        });
    });

    /* ── events ───────────────────────────────────────────────── */

    describe('events', () => {
        it('fires flint-image-comparer-change with detail.position', async () => {
            const el = await make({ position: 50 });
            const spy = vi.fn();
            el.addEventListener('flint-image-comparer-change', spy);

            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
            expect(spy).toHaveBeenCalledOnce();

            const detail = spy.mock.calls[0][0].detail;
            expect(detail).toEqual({ position: 51 });
        });

        it('event bubbles and is composed', async () => {
            const el = await make({ position: 50 });
            const spy = vi.fn();
            el.addEventListener('flint-image-comparer-change', spy);

            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
            const event = spy.mock.calls[0][0] as CustomEvent;
            expect(event.bubbles).toBe(true);
            expect(event.composed).toBe(true);
        });
    });

    /* ── CSS parts ────────────────────────────────────────────── */

    describe('CSS parts', () => {
        it('exposes all required parts', async () => {
            const el = await make();
            expect(shadow(el).querySelector('[part="base"]')).toBeTruthy();
            expect(shadow(el).querySelector('[part="before"]')).toBeTruthy();
            expect(shadow(el).querySelector('[part="after"]')).toBeTruthy();
            expect(shadow(el).querySelector('[part="divider"]')).toBeTruthy();
            expect(shadow(el).querySelector('[part="handle"]')).toBeTruthy();
        });
    });

    /* ── pointer drag ─────────────────────────────────────────── */

    describe('pointer drag', () => {
        function mockRect(el: FlintImageComparer) {
            vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
                left: 0, top: 0, right: 400, bottom: 300,
                width: 400, height: 300, x: 0, y: 0,
                toJSON: () => ({}),
            } as DOMRect);
            el.setPointerCapture = vi.fn();
            el.releasePointerCapture = vi.fn();
        }

        it('pointerdown sets position from pointer location', async () => {
            const el = await make({ position: 50 });
            mockRect(el);
            el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 300, pointerId: 1, bubbles: true }));
            // 300 / 400 * 100 = 75
            expect(el.position).toBe(75);
        });

        it('pointermove updates position while dragging', async () => {
            const el = await make({ position: 50 });
            mockRect(el);
            el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 200, pointerId: 1, buttons: 1, bubbles: true }));
            el.dispatchEvent(new PointerEvent('pointermove', { clientX: 100, pointerId: 1, buttons: 1, bubbles: true }));
            // 100 / 400 * 100 = 25
            expect(el.position).toBe(25);
        });

        it('pointerup stops drag — subsequent pointermove does not update position', async () => {
            const el = await make({ position: 50 });
            mockRect(el);
            // drag to 75%
            el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 300, pointerId: 1, bubbles: true }));
            expect(el.position).toBe(75);
            // release
            el.dispatchEvent(new PointerEvent('pointerup', { pointerId: 1, bubbles: true }));
            // move after release — position must not change
            el.dispatchEvent(new PointerEvent('pointermove', { clientX: 0, pointerId: 1, bubbles: true }));
            expect(el.position).toBe(75);
        });

        it('fires flint-image-comparer-change during drag', async () => {
            const el = await make({ position: 50 });
            mockRect(el);
            const spy = vi.fn();
            el.addEventListener('flint-image-comparer-change', spy);
            el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 300, pointerId: 1, bubbles: true }));
            expect(spy).toHaveBeenCalledOnce();
            expect(spy.mock.calls[0][0].detail.position).toBe(75);
        });

        it('does not update position or fire event when disabled and pointerdown', async () => {
            const el = await make({ disabled: true, position: 50 });
            mockRect(el);
            const spy = vi.fn();
            el.addEventListener('flint-image-comparer-change', spy);
            el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 300, pointerId: 1, bubbles: true }));
            expect(spy).not.toHaveBeenCalled();
            expect(el.position).toBe(50);
        });

        it('stops drag on pointermove when no button is held (stale drag state)', async () => {
            const el = await make({ position: 50 });
            mockRect(el);
            // start drag
            el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 200, pointerId: 1, bubbles: true }));
            expect(el.position).toBe(50);
            // simulate re-entry with no button held (buttons === 0)
            el.dispatchEvent(new PointerEvent('pointermove', { clientX: 100, buttons: 0, pointerId: 1, bubbles: true }));
            expect(el.position).toBe(50); // position must not change
        });

        it('clamps pointer position to 0 when pointer is at left edge', async () => {
            const el = await make({ position: 50 });
            mockRect(el);
            el.dispatchEvent(new PointerEvent('pointerdown', { clientX: -50, pointerId: 1, bubbles: true }));
            expect(el.position).toBe(0);
        });

        it('clamps pointer position to 100 when pointer is beyond right edge', async () => {
            const el = await make({ position: 50 });
            mockRect(el);
            el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 500, pointerId: 1, bubbles: true }));
            expect(el.position).toBe(100);
        });
    });

    /* ── custom handle slot ───────────────────────────────────── */

    describe('custom handle slot', () => {
        it('renders slotted handle content and assigns it to the handle slot', async () => {
            const el = await fixture<FlintImageComparer>(html`
                <flint-image-comparer>
                    <img slot="before" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="Before" />
                    <img slot="after" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="After" />
                    <span slot="handle" id="custom-handle">&#x21D4;</span>
                </flint-image-comparer>
            `);
            await el.updateComplete;
            const handleSlot = shadow(el).querySelector<HTMLSlotElement>('slot[name="handle"]')!;
            const assigned = handleSlot.assignedElements();
            expect(assigned).toHaveLength(1);
            expect((assigned[0] as HTMLElement).id).toBe('custom-handle');
        });

        it('hides default SVG icon when custom handle is slotted', async () => {
            // When a custom element fills the slot, the slot's fallback content
            // (the SVG) is not rendered — assigned nodes are non-empty.
            const el = await fixture<FlintImageComparer>(html`
                <flint-image-comparer>
                    <img slot="before" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="Before" />
                    <img slot="after" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="After" />
                    <span slot="handle">custom</span>
                </flint-image-comparer>
            `);
            await el.updateComplete;
            const handleSlot = shadow(el).querySelector<HTMLSlotElement>('slot[name="handle"]')!;
            expect(handleSlot.assignedElements().length).toBeGreaterThan(0);
        });
    });

    /* ── focus management ─────────────────────────────────────── */

    describe('focus management', () => {
        it('focuses the handle element after pointerdown', async () => {
            const el = await make();
            el.setPointerCapture = vi.fn();
            el.releasePointerCapture = vi.fn();
            vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
                left: 0, top: 0, right: 400, bottom: 300,
                width: 400, height: 300, x: 0, y: 0,
                toJSON: () => ({}),
            } as DOMRect);
            const h = handle(el);
            const focusSpy = vi.spyOn(h, 'focus');
            el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 200, pointerId: 1, bubbles: true }));
            expect(focusSpy).toHaveBeenCalled();
        });

        it('disabled handle has tabindex="-1"', async () => {
            const el = await make({ disabled: true });
            expect(handle(el).getAttribute('tabindex')).toBe('-1');
        });

        it('enabled handle has tabindex="0"', async () => {
            const el = await make({ disabled: false });
            expect(handle(el).getAttribute('tabindex')).toBe('0');
        });
    });

    /* ── aria-disabled ────────────────────────────────────────── */

    describe('aria-disabled', () => {
        it('handle has aria-disabled="true" when disabled', async () => {
            const el = await make({ disabled: true });
            expect(handle(el).getAttribute('aria-disabled')).toBe('true');
        });

        it('handle has aria-disabled="false" when not disabled', async () => {
            const el = await make({ disabled: false });
            expect(handle(el).getAttribute('aria-disabled')).toBe('false');
        });
    });

    /* ── cleanup ──────────────────────────────────────────────── */

    describe('cleanup', () => {
        it('removes listeners on disconnect', async () => {
            const el = await make({ position: 50 });
            el.remove();

            const spy = vi.fn();
            el.addEventListener('flint-image-comparer-change', spy);
            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
            expect(spy).not.toHaveBeenCalled();
        });
    });

    describe('accessibility', () => {
        it('should be accessible', async () => {
            const el = await fixture(html`
                <flint-image-comparer>
                    <img slot="before" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="Before" />
                    <img slot="after" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="After" />
                </flint-image-comparer>
            `);
            await expectAccessible(el);
        });
    });
});
