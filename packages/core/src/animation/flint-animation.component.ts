import { unsafeCSS, html, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { FlintElement } from '../flint-element.js';
import uiAnimationStyles from './flint-animation.css?inline';

/** Built-in animation presets using the Web Animations API keyframe format. */
const ANIMATION_PRESETS: Record<string, Keyframe[]> = {
    'fade-in': [
        { opacity: 0 },
        { opacity: 1 },
    ],
    'fade-out': [
        { opacity: 1 },
        { opacity: 0 },
    ],
    'slide-up': [
        { opacity: 0, transform: 'translateY(20px)' },
        { opacity: 1, transform: 'translateY(0)' },
    ],
    'slide-down': [
        { opacity: 0, transform: 'translateY(-20px)' },
        { opacity: 1, transform: 'translateY(0)' },
    ],
    'slide-left': [
        { opacity: 0, transform: 'translateX(20px)' },
        { opacity: 1, transform: 'translateX(0)' },
    ],
    'slide-right': [
        { opacity: 0, transform: 'translateX(-20px)' },
        { opacity: 1, transform: 'translateX(0)' },
    ],
    'scale-in': [
        { opacity: 0, transform: 'scale(0.8)' },
        { opacity: 1, transform: 'scale(1)' },
    ],
    'scale-out': [
        { opacity: 1, transform: 'scale(1)' },
        { opacity: 0, transform: 'scale(0.8)' },
    ],
    bounce: [
        { transform: 'translateY(0)' },
        { transform: 'translateY(-15px)' },
        { transform: 'translateY(0)' },
        { transform: 'translateY(-7px)' },
        { transform: 'translateY(0)' },
    ],
    shake: [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-8px)' },
        { transform: 'translateX(8px)' },
        { transform: 'translateX(-8px)' },
        { transform: 'translateX(8px)' },
        { transform: 'translateX(0)' },
    ],
    pulse: [
        { transform: 'scale(1)' },
        { transform: 'scale(1.05)' },
        { transform: 'scale(1)' },
    ],
    spin: [
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(360deg)' },
    ],
};

/**
 * flint-animation: a declarative wrapper that applies Web Animations API
 * animations to its slotted content.
 *
 * @fires flint-animation-finish - Dispatched when the animation finishes.
 * @fires flint-animation-cancel - Dispatched when the animation is cancelled.
 *
 * @slot - Content to animate.
 */
export class FlintAnimation extends FlintElement {
    static styles = unsafeCSS(uiAnimationStyles);

    /**
     * Animation preset name (e.g., 'fade-in', 'slide-up', 'bounce') or
     * 'custom' when providing keyframes via the `keyframes` property.
     */
    @property({ type: String }) name = 'fade-in';

    /** Duration in milliseconds. */
    @property({ type: Number }) duration = 300;

    /** CSS easing function. */
    @property({ type: String }) easing = 'ease';

    /** Number of iterations. Use `Infinity` for infinite looping. */
    @property({ type: Number }) iterations = 1;

    /** Delay before the animation starts, in milliseconds. */
    @property({ type: Number }) delay = 0;

    /** Animation fill mode. */
    @property({ type: String }) fill: FillMode = 'both';

    /** Animation direction. */
    @property({ type: String }) direction: PlaybackDirection = 'normal';

    /** Set to true to trigger/play the animation. */
    @property({ type: Boolean }) play = false;

    /** Whether to play the animation automatically on first render. */
    @property({ type: Boolean, attribute: 'play-on-connect' }) playOnConnect = false;

    /**
     * Custom keyframes. When provided, overrides the `name` preset.
     * Use via JavaScript property binding (not HTML attribute).
     */
    @property({ attribute: false }) keyframes: Keyframe[] | null = null;

    private _animation: Animation | null = null;

    firstUpdated() {
        if (this.playOnConnect || this.play) {
            this._startAnimation();
        }
    }

    updated(changed: PropertyValues) {
        if (changed.has('play')) {
            if (this.play) {
                this._startAnimation();
            } else {
                this._cancelAnimation();
            }
        }
    }

    private _getTarget(): HTMLElement | null {
        const slot = this.shadowRoot?.querySelector('slot');
        if (!slot) return null;
        const nodes = slot.assignedElements({ flatten: true });
        return (nodes[0] as HTMLElement) ?? null;
    }

    private _prefersReducedMotion(): boolean {
        return typeof window !== 'undefined' &&
               window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    }

    private _startAnimation() {
        this._cancelAnimation();

        const target = this._getTarget();
        if (!target) return;

        const frames = this.keyframes ?? ANIMATION_PRESETS[this.name];
        if (!frames) return;

        const reducedMotion = this._prefersReducedMotion();

        this._animation = target.animate(frames, {
            duration: reducedMotion ? 0 : this.duration,
            easing: this.easing,
            iterations: this.iterations,
            delay: reducedMotion ? 0 : this.delay,
            fill: this.fill,
            direction: this.direction,
        });

        this._animation.addEventListener('finish', () => {
            this.dispatchEvent(new CustomEvent('flint-animation-finish', {
                bubbles: true,
                composed: true,
            }));
        });

        this._animation.addEventListener('cancel', () => {
            this.dispatchEvent(new CustomEvent('flint-animation-cancel', {
                bubbles: true,
                composed: true,
            }));
        });
    }

    private _cancelAnimation() {
        if (this._animation) {
            this._animation.cancel();
            this._animation = null;
        }
    }

    /** Programmatically cancel the running animation. */
    cancel() {
        this._cancelAnimation();
        this.play = false;
    }

    /** Restart the animation from the beginning. */
    async restart() {
        this.play = false;
        await this.updateComplete;
        this.play = true;
    }

    /** Returns the list of available preset names. */
    static get presets(): string[] {
        return Object.keys(ANIMATION_PRESETS);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._cancelAnimation();
    }

    render() {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-animation': FlintAnimation;
    }
}
