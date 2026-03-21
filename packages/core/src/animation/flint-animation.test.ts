import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-animation.js';
import type { FlintAnimation } from './flint-animation.js';
import { expectAccessible } from '../test-utils/axe.js';

/* ── helpers ────────────────────────────────────────────────────────── */

interface MakeOpts {
    name?: string;
    duration?: number;
    easing?: string;
    iterations?: number;
    delay?: number;
    fill?: FillMode;
    direction?: PlaybackDirection;
    play?: boolean;
    playOnConnect?: boolean;
    keyframes?: Keyframe[] | null;
}

async function make(opts: MakeOpts = {}) {
    const el = await fixture<FlintAnimation>(html`
        <flint-animation
            .name=${opts.name ?? 'fade-in'}
            .duration=${opts.duration ?? 300}
            .easing=${opts.easing ?? 'ease'}
            .iterations=${opts.iterations ?? 1}
            .delay=${opts.delay ?? 0}
            .fill=${opts.fill ?? 'both'}
            .direction=${opts.direction ?? 'normal'}
            .play=${opts.play ?? false}
            .playOnConnect=${opts.playOnConnect ?? false}
            .keyframes=${opts.keyframes ?? null}
        >
            <div class="target">Hello</div>
        </flint-animation>
    `);
    await el.updateComplete;
    return el;
}

/**
 * Mock `Element.prototype.animate` in jsdom (which does not support
 * the Web Animations API).  Returns a minimal Animation-like object
 * with `cancel()`, `finish()`, and event listener support.
 */
function mockAnimate() {
    const listeners = new Map<string, Set<EventListenerOrEventListenerObject>>();
    const animation = {
        cancel: vi.fn(() => {
            const cbs = listeners.get('cancel');
            if (cbs) cbs.forEach((cb) => typeof cb === 'function' ? cb(new Event('cancel')) : cb.handleEvent(new Event('cancel')));
            // Clear all listeners on cancel — matches real Animation behavior
            // and prevents double-counting when _startAnimation() cancels then re-creates.
            listeners.clear();
        }),
        finish: vi.fn(),
        addEventListener: vi.fn((type: string, cb: EventListenerOrEventListenerObject) => {
            if (!listeners.has(type)) listeners.set(type, new Set());
            listeners.get(type)!.add(cb);
        }),
        removeEventListener: vi.fn(),
        /** Helper to simulate the animation finishing. */
        _simulateFinish() {
            const cbs = listeners.get('finish');
            if (cbs) cbs.forEach((cb) => typeof cb === 'function' ? cb(new Event('finish')) : cb.handleEvent(new Event('finish')));
        },
        /** Helper to simulate the animation being cancelled. */
        _simulateCancel() {
            const cbs = listeners.get('cancel');
            if (cbs) cbs.forEach((cb) => typeof cb === 'function' ? cb(new Event('cancel')) : cb.handleEvent(new Event('cancel')));
        },
    };

    const spy = vi.fn(() => animation);
    Element.prototype.animate = spy as unknown as typeof Element.prototype.animate;

    return { spy, animation };
}

/* ═══════════════════════════════════════════════════════════════════════════
   flint-animation — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-animation — rendering', () => {
    it('renders a slot in shadow DOM', async () => {
        const el = await make();
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('does not set inline display style (uses CSS instead)', async () => {
        const el = await make();
        // display: contents is now in the CSS file, not inline
        expect(el.style.display).toBe('');
    });

    it('projects slotted content', async () => {
        const el = await make();
        const slot = el.shadowRoot!.querySelector('slot')!;
        const assigned = slot.assignedElements({ flatten: true });
        expect(assigned.length).toBe(1);
        expect(assigned[0].classList.contains('target')).toBe(true);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-animation — property defaults
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-animation — property defaults', () => {
    it('name defaults to "fade-in"', async () => {
        const el = await fixture<FlintAnimation>(html`
            <flint-animation><div>X</div></flint-animation>
        `);
        expect(el.name).toBe('fade-in');
    });

    it('duration defaults to 300', async () => {
        const el = await fixture<FlintAnimation>(html`
            <flint-animation><div>X</div></flint-animation>
        `);
        expect(el.duration).toBe(300);
    });

    it('easing defaults to "ease"', async () => {
        const el = await fixture<FlintAnimation>(html`
            <flint-animation><div>X</div></flint-animation>
        `);
        expect(el.easing).toBe('ease');
    });

    it('iterations defaults to 1', async () => {
        const el = await fixture<FlintAnimation>(html`
            <flint-animation><div>X</div></flint-animation>
        `);
        expect(el.iterations).toBe(1);
    });

    it('delay defaults to 0', async () => {
        const el = await fixture<FlintAnimation>(html`
            <flint-animation><div>X</div></flint-animation>
        `);
        expect(el.delay).toBe(0);
    });

    it('fill defaults to "both"', async () => {
        const el = await fixture<FlintAnimation>(html`
            <flint-animation><div>X</div></flint-animation>
        `);
        expect(el.fill).toBe('both');
    });

    it('direction defaults to "normal"', async () => {
        const el = await fixture<FlintAnimation>(html`
            <flint-animation><div>X</div></flint-animation>
        `);
        expect(el.direction).toBe('normal');
    });

    it('play defaults to false', async () => {
        const el = await fixture<FlintAnimation>(html`
            <flint-animation><div>X</div></flint-animation>
        `);
        expect(el.play).toBe(false);
    });

    it('playOnConnect defaults to false', async () => {
        const el = await fixture<FlintAnimation>(html`
            <flint-animation><div>X</div></flint-animation>
        `);
        expect(el.playOnConnect).toBe(false);
    });

    it('keyframes defaults to null', async () => {
        const el = await fixture<FlintAnimation>(html`
            <flint-animation><div>X</div></flint-animation>
        `);
        expect(el.keyframes).toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-animation — presets
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-animation — presets', () => {
    it('FlintAnimation.presets returns an array of preset names', async () => {
        // Dynamically import the class to access the static getter
        const { FlintAnimation } = await import('./flint-animation.js');
        const presets = FlintAnimation.presets;
        expect(Array.isArray(presets)).toBe(true);
        expect(presets.length).toBeGreaterThan(0);
        expect(presets).toContain('fade-in');
        expect(presets).toContain('fade-out');
        expect(presets).toContain('slide-up');
        expect(presets).toContain('bounce');
        expect(presets).toContain('shake');
        expect(presets).toContain('pulse');
        expect(presets).toContain('spin');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-animation — play / cancel behaviour
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-animation — play / cancel behaviour', () => {
    it('play=true triggers element.animate() on the slotted target', async () => {
        const { spy } = mockAnimate();
        const el = await make({ play: true });
        await el.updateComplete;
        expect(spy).toHaveBeenCalled();
    });

    it('passes the correct options to element.animate()', async () => {
        const { spy } = mockAnimate();
        const el = await make({
            play: true,
            duration: 500,
            easing: 'linear',
            iterations: 3,
            delay: 100,
            fill: 'forwards',
            direction: 'reverse',
        });
        await el.updateComplete;
        expect(spy).toHaveBeenCalledWith(
            expect.any(Array),
            expect.objectContaining({
                duration: 500,
                easing: 'linear',
                iterations: 3,
                delay: 100,
                fill: 'forwards',
                direction: 'reverse',
            }),
        );
    });

    it('setting play=false cancels a running animation', async () => {
        const { animation } = mockAnimate();
        const el = await make({ play: true });
        await el.updateComplete;

        el.play = false;
        await el.updateComplete;
        expect(animation.cancel).toHaveBeenCalled();
    });

    it('playOnConnect triggers animation on first render', async () => {
        const { spy } = mockAnimate();
        const el = await make({ playOnConnect: true });
        await el.updateComplete;
        expect(spy).toHaveBeenCalled();
    });

    it('keyframes property overrides the name preset', async () => {
        const { spy } = mockAnimate();
        const customFrames: Keyframe[] = [
            { transform: 'rotate(0deg)' },
            { transform: 'rotate(180deg)' },
        ];
        const el = await make({ play: true, keyframes: customFrames });
        await el.updateComplete;
        expect(spy).toHaveBeenCalledWith(
            customFrames,
            expect.any(Object),
        );
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-animation — cancel() and restart() methods
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-animation — cancel() and restart() methods', () => {
    it('cancel() stops a running animation and sets play to false', async () => {
        const { animation } = mockAnimate();
        const el = await make({ play: true });
        await el.updateComplete;

        el.cancel();
        await el.updateComplete;
        expect(animation.cancel).toHaveBeenCalled();
        expect(el.play).toBe(false);
    });

    it('restart() replays the animation', async () => {
        const { spy } = mockAnimate();
        const el = await make({ play: true });
        await el.updateComplete;

        const callsBefore = spy.mock.calls.length;
        el.restart();
        await el.updateComplete;
        // restart sets play=false then play=true after updateComplete
        await el.updateComplete;
        expect(spy.mock.calls.length).toBeGreaterThan(callsBefore);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-animation — events
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-animation — events', () => {
    it('dispatches flint-animation-finish when animation finishes', async () => {
        const { animation } = mockAnimate();
        const el = await make({ play: true });
        await el.updateComplete;

        const handler = vi.fn();
        el.addEventListener('flint-animation-finish', handler);
        animation._simulateFinish();
        expect(handler).toHaveBeenCalledOnce();
    });

    it('dispatches flint-animation-cancel when animation is cancelled', async () => {
        const { animation } = mockAnimate();
        const el = await make({ play: true });
        await el.updateComplete;

        const handler = vi.fn();
        el.addEventListener('flint-animation-cancel', handler);
        animation._simulateCancel();
        expect(handler).toHaveBeenCalledOnce();
    });

    it('flint-animation-finish event bubbles and is composed', async () => {
        const { animation } = mockAnimate();
        const el = await make({ play: true });
        await el.updateComplete;

        let event: CustomEvent | null = null;
        el.addEventListener('flint-animation-finish', (e) => { event = e as CustomEvent; });
        animation._simulateFinish();
        expect(event).not.toBeNull();
        expect(event!.bubbles).toBe(true);
        expect(event!.composed).toBe(true);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-animation — disconnectedCallback
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-animation — disconnectedCallback', () => {
    it('cancels animation when element is removed from DOM', async () => {
        const { animation } = mockAnimate();
        const el = await make({ play: true });
        await el.updateComplete;

        animation.cancel.mockClear();
        el.remove();
        expect(animation.cancel).toHaveBeenCalled();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-animation — prefers-reduced-motion
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-animation — prefers-reduced-motion', () => {
    it('sets duration and delay to 0 when reduced motion is preferred', async () => {
        const originalMatchMedia = window.matchMedia;
        window.matchMedia = vi.fn().mockReturnValue({ matches: true }) as unknown as typeof window.matchMedia;

        const { spy } = mockAnimate();
        const el = await make({ play: true, duration: 500, delay: 200 });
        await el.updateComplete;

        expect(spy).toHaveBeenCalledWith(
            expect.any(Array),
            expect.objectContaining({ duration: 0, delay: 0 }),
        );

        window.matchMedia = originalMatchMedia;
    });
});

describe('flint-animation — accessibility', () => {
    it('should be accessible', async () => {
        const el = await fixture(html`
            <flint-animation>
                <div>Animated content</div>
            </flint-animation>
        `);
        await expectAccessible(el);
    });
});
