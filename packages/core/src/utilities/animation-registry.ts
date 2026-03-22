/**
 * Animation registry for Flint UI components.
 *
 * Inspired by Shoelace's animation utilities, this module provides a way to
 * register default animations for component lifecycle events (show/hide) and
 * override them on a per-element basis.
 */

export interface ElementAnimation {
    keyframes: Keyframe[];
    rtlKeyframes?: Keyframe[];
    options?: KeyframeAnimationOptions;
}

/** Map of animation name → definition for global defaults */
const defaultAnimations = new Map<string, ElementAnimation | null>();

/** WeakMap of element → Map of animation name → definition for per-element overrides */
const elementAnimations = new WeakMap<Element, Map<string, ElementAnimation | null>>();

/** Set a default animation for all instances of a given animation name. */
export function setDefaultAnimation(name: string, animation: ElementAnimation | null): void {
    defaultAnimations.set(name, animation);
}

/** Set an animation override for a specific element. */
export function setAnimation(el: Element, name: string, animation: ElementAnimation | null): void {
    let map = elementAnimations.get(el);
    if (!map) {
        map = new Map<string, ElementAnimation | null>();
        elementAnimations.set(el, map);
    }
    map.set(name, animation);
}

/**
 * Get the animation for an element.
 * Resolution order: per-element override > global default > null.
 */
export function getAnimation(el: Element, name: string): ElementAnimation | null {
    const perElement = elementAnimations.get(el)?.get(name);
    if (perElement !== undefined) return perElement;
    return defaultAnimations.get(name) ?? null;
}

/**
 * Returns true if the user has enabled reduced motion.
 * Safe to call in environments where `matchMedia` is unavailable.
 */
function prefersReducedMotion(): boolean {
    try {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {
        return false;
    }
}

/**
 * Run an animation on an element using the Web Animations API.
 * Returns a Promise that resolves with the Animation when done.
 *
 * Respects `prefers-reduced-motion` by resolving immediately with a 0-duration animation.
 * Checks RTL direction and uses `rtlKeyframes` if available.
 */
export async function animateTo(
    el: HTMLElement,
    keyframes: Keyframe[],
    options?: KeyframeAnimationOptions,
): Promise<Animation | undefined> {
    // Guard: Web Animations API may not be available (e.g., jsdom)
    if (typeof el.animate !== 'function') {
        return undefined;
    }

    if (prefersReducedMotion()) {
        // Run instantly with zero duration so the final frame applies.
        const anim = el.animate(keyframes, { ...options, duration: 0, delay: 0 });
        anim.finish();
        return anim;
    }

    const anim = el.animate(keyframes, {
        ...options,
    });

    return new Promise<Animation>((resolve) => {
        anim.addEventListener('finish', () => resolve(anim), { once: true });
        anim.addEventListener('cancel', () => resolve(anim), { once: true });
    });
}

/** Stop all animations on an element. */
export async function stopAnimations(el: HTMLElement): Promise<void> {
    // Guard: Web Animations API may not be available (e.g., jsdom)
    if (typeof el.getAnimations !== 'function') {
        return;
    }

    for (const a of el.getAnimations()) {
        a.cancel();
    }
}

/**
 * Replace any `height: 'auto'` values in keyframes with a calculated pixel height.
 * Useful for animating to/from `auto` height (e.g., collapsible panels).
 */
export function shimKeyframesHeightAuto(
    keyframes: Keyframe[],
    calculatedHeight: string,
): Keyframe[] {
    return keyframes.map((keyframe) => ({
        ...keyframe,
        height: keyframe.height === 'auto' ? calculatedHeight : keyframe.height,
    }));
}

/**
 * Resolve the correct keyframes for an element, accounting for RTL direction.
 */
export function resolveKeyframes(el: Element, animation: ElementAnimation): Keyframe[] {
    const dir = getComputedStyle(el).direction;
    if (dir === 'rtl' && animation.rtlKeyframes) {
        return animation.rtlKeyframes;
    }
    return animation.keyframes;
}
