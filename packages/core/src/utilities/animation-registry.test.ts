import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
    setDefaultAnimation,
    setAnimation,
    getAnimation,
    animateTo,
    stopAnimations,
    shimKeyframesHeightAuto,
    resolveKeyframes,
} from './animation-registry.js';
import type { ElementAnimation } from './animation-registry.js';

// ── Mock HTMLElement.prototype.animate (not available in jsdom) ──────────────

let mockAnimate: ReturnType<typeof vi.fn>;
let mockGetAnimations: ReturnType<typeof vi.fn>;

beforeEach(() => {
    const mockAnimation = {
        finish: vi.fn(),
        cancel: vi.fn(),
        addEventListener: vi.fn((_event: string, cb: () => void) => cb()),
    };

    mockAnimate = vi.fn(() => mockAnimation);
    mockGetAnimations = vi.fn(() => []);

    HTMLElement.prototype.animate = mockAnimate;
    HTMLElement.prototype.getAnimations = mockGetAnimations;
});

afterEach(() => {
    vi.restoreAllMocks();
});

// ── setDefaultAnimation / getAnimation ──────────────────────────────────────

describe('animation registry', () => {
    it('setDefaultAnimation stores and getAnimation retrieves', () => {
        const anim: ElementAnimation = {
            keyframes: [{ opacity: 0 }, { opacity: 1 }],
            options: { duration: 200 },
        };
        setDefaultAnimation('test.show', anim);

        const el = document.createElement('div');
        const result = getAnimation(el, 'test.show');
        expect(result).toBe(anim);

        // Clean up
        setDefaultAnimation('test.show', null);
    });

    it('getAnimation returns null for unregistered names', () => {
        const el = document.createElement('div');
        expect(getAnimation(el, 'nonexistent.animation')).toBeNull();
    });

    it('null animation disables it (returns null)', () => {
        setDefaultAnimation('test.disabled', null);
        const el = document.createElement('div');
        expect(getAnimation(el, 'test.disabled')).toBeNull();

        // Clean up
        setDefaultAnimation('test.disabled', null);
    });
});

// ── Per-element overrides ───────────────────────────────────────────────────

describe('per-element overrides', () => {
    it('per-element override takes precedence over default', () => {
        const defaultAnim: ElementAnimation = {
            keyframes: [{ opacity: 0 }, { opacity: 1 }],
            options: { duration: 200 },
        };
        const overrideAnim: ElementAnimation = {
            keyframes: [{ opacity: 0 }, { opacity: 0.5 }],
            options: { duration: 100 },
        };
        setDefaultAnimation('test.override', defaultAnim);

        const el = document.createElement('div');
        setAnimation(el, 'test.override', overrideAnim);

        expect(getAnimation(el, 'test.override')).toBe(overrideAnim);

        // Another element still gets the default
        const el2 = document.createElement('div');
        expect(getAnimation(el2, 'test.override')).toBe(defaultAnim);

        // Clean up
        setDefaultAnimation('test.override', null);
    });

    it('per-element null override disables animation for that element', () => {
        const defaultAnim: ElementAnimation = {
            keyframes: [{ opacity: 0 }, { opacity: 1 }],
            options: { duration: 200 },
        };
        setDefaultAnimation('test.null-override', defaultAnim);

        const el = document.createElement('div');
        setAnimation(el, 'test.null-override', null);

        expect(getAnimation(el, 'test.null-override')).toBeNull();

        // Clean up
        setDefaultAnimation('test.null-override', null);
    });

    it('multiple per-element overrides on the same element work', () => {
        const el = document.createElement('div');
        const animA: ElementAnimation = {
            keyframes: [{ opacity: 0 }, { opacity: 1 }],
        };
        const animB: ElementAnimation = {
            keyframes: [{ transform: 'scale(0)' }, { transform: 'scale(1)' }],
        };

        setAnimation(el, 'a', animA);
        setAnimation(el, 'b', animB);

        expect(getAnimation(el, 'a')).toBe(animA);
        expect(getAnimation(el, 'b')).toBe(animB);
    });
});

// ── animateTo ───────────────────────────────────────────────────────────────

describe('animateTo', () => {
    it('calls element.animate() with keyframes and options', async () => {
        const el = document.createElement('div');
        document.body.appendChild(el);

        const keyframes = [{ opacity: 0 }, { opacity: 1 }];
        const options = { duration: 200, easing: 'ease-out' };

        await animateTo(el, keyframes, options);

        expect(mockAnimate).toHaveBeenCalledWith(keyframes, {
            duration: 200,
            easing: 'ease-out',
        });

        el.remove();
    });

    it('calls element.animate() without options', async () => {
        const el = document.createElement('div');
        document.body.appendChild(el);

        const keyframes = [{ opacity: 0 }, { opacity: 1 }];
        await animateTo(el, keyframes);

        expect(mockAnimate).toHaveBeenCalledWith(keyframes, {});

        el.remove();
    });
});

// ── stopAnimations ──────────────────────────────────────────────────────────

describe('stopAnimations', () => {
    it('calls cancel() on all running animations', async () => {
        const cancelSpy1 = vi.fn();
        const cancelSpy2 = vi.fn();
        mockGetAnimations.mockReturnValue([
            { cancel: cancelSpy1 },
            { cancel: cancelSpy2 },
        ]);

        const el = document.createElement('div');
        document.body.appendChild(el);

        await stopAnimations(el);

        expect(cancelSpy1).toHaveBeenCalledOnce();
        expect(cancelSpy2).toHaveBeenCalledOnce();

        el.remove();
    });

    it('resolves without error when no animations are running', async () => {
        mockGetAnimations.mockReturnValue([]);
        const el = document.createElement('div');
        document.body.appendChild(el);

        // Should not throw
        await stopAnimations(el);

        el.remove();
    });
});

// ── shimKeyframesHeightAuto ─────────────────────────────────────────────────

describe('shimKeyframesHeightAuto', () => {
    it('replaces height: auto with the calculated height', () => {
        const keyframes = [
            { height: '0px', opacity: 0 },
            { height: 'auto', opacity: 1 },
        ];
        const result = shimKeyframesHeightAuto(keyframes, '200px');

        expect(result[0].height).toBe('0px');
        expect(result[1].height).toBe('200px');
    });

    it('does not modify keyframes without height: auto', () => {
        const keyframes = [
            { height: '0px', opacity: 0 },
            { height: '100px', opacity: 1 },
        ];
        const result = shimKeyframesHeightAuto(keyframes, '200px');

        expect(result[0].height).toBe('0px');
        expect(result[1].height).toBe('100px');
    });

    it('does not mutate the original keyframes', () => {
        const keyframes = [{ height: 'auto' }];
        const result = shimKeyframesHeightAuto(keyframes, '50px');

        expect(keyframes[0].height).toBe('auto');
        expect(result[0].height).toBe('50px');
    });
});

// ── resolveKeyframes (RTL) ──────────────────────────────────────────────────

describe('resolveKeyframes', () => {
    it('returns keyframes for LTR elements', () => {
        const el = document.createElement('div');
        document.body.appendChild(el);

        const anim: ElementAnimation = {
            keyframes: [{ transform: 'translateX(-100%)' }, { transform: 'translateX(0)' }],
            rtlKeyframes: [{ transform: 'translateX(100%)' }, { transform: 'translateX(0)' }],
        };

        const result = resolveKeyframes(el, anim);
        expect(result).toBe(anim.keyframes);

        el.remove();
    });

    it('returns rtlKeyframes when dir="rtl" and rtlKeyframes are provided', () => {
        const el = document.createElement('div');
        el.dir = 'rtl';
        document.body.appendChild(el);

        const anim: ElementAnimation = {
            keyframes: [{ transform: 'translateX(-100%)' }, { transform: 'translateX(0)' }],
            rtlKeyframes: [{ transform: 'translateX(100%)' }, { transform: 'translateX(0)' }],
        };

        const result = resolveKeyframes(el, anim);
        expect(result).toBe(anim.rtlKeyframes);

        el.remove();
    });

    it('returns keyframes when dir="rtl" but no rtlKeyframes are defined', () => {
        const el = document.createElement('div');
        el.dir = 'rtl';
        document.body.appendChild(el);

        const anim: ElementAnimation = {
            keyframes: [{ opacity: 0 }, { opacity: 1 }],
        };

        const result = resolveKeyframes(el, anim);
        expect(result).toBe(anim.keyframes);

        el.remove();
    });
});

// ── prefers-reduced-motion ──────────────────────────────────────────────────

describe('prefers-reduced-motion', () => {
    it('animateTo function exists and is callable', () => {
        expect(typeof animateTo).toBe('function');
    });

    it('stopAnimations function exists and is callable', () => {
        expect(typeof stopAnimations).toBe('function');
    });
});
