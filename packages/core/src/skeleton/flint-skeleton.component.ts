import { unsafeCSS, html, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { FlintElement } from '../flint-element.js';
import uiSkeletonStyles from './flint-skeleton.css?inline';

/**
 * Skeletons display a placeholder preview of content before data gets loaded.
 *
 * @csspart skeleton - The inner skeleton span element.
 * @cssprop --flint-skeleton-bg - Background color in light mode (default: rgba(0,0,0,0.11)).
 * @cssprop --flint-skeleton-bg-dark - Background color in dark mode (default: rgba(255,255,255,0.13)).
 * @cssprop --flint-skeleton-wave-color - Shimmer color for wave animation (default: rgba(255,255,255,0.4)).
 * @cssprop --flint-skeleton-animation-duration - Duration for pulse/wave animations (default: 1.5s).
 */
export class FlintSkeleton extends FlintElement {
    static styles = unsafeCSS(uiSkeletonStyles);

    /**
     * If true, applies dark-theme styles regardless of OS preference.
     */
    @property({ type: Boolean, reflect: true }) dark = false;

    /**
     * The animation type.
     */
    @property({ type: String, reflect: true }) animation: 'pulse' | 'wave' | 'none' = 'pulse';

    /**
     * The shape of the skeleton.
     */
    @property({ type: String, reflect: true }) shape: 'text' | 'circular' | 'rectangular' | 'rounded' = 'text';

    /**
     * @deprecated Use `shape` instead. Will be removed in a future version.
     */
    @property({ type: String }) variant: 'text' | 'circular' | 'rectangular' | 'rounded' = 'text';

    /**
     * The width of the skeleton. Accepts any CSS length value (e.g. '200px', '50%').
     */
    @property({ type: String }) width = '';

    /**
     * The height of the skeleton. Accepts any CSS length value.
     */
    @property({ type: String }) height = '';

    /**
     * Accessible label announced by screen readers. Set to '' to silence.
     */
    @property({ type: String }) label = 'Loading...';

    private _variantWarned = false;

    connectedCallback() {
        super.connectedCallback();
        if (!this.hasAttribute('role')) this.setAttribute('role', 'status');
        this._syncLabel();
    }

    willUpdate(changed: PropertyValues) {
        if (changed.has('variant') && this.variant !== 'text' && this.shape === 'text') {
            this.shape = this.variant;
            if (!this._variantWarned) {
                this._variantWarned = true;
                console.warn(
                    'flint-skeleton: `variant` is deprecated. Use `shape` instead.'
                );
            }
        }
    }

    updated(changed: PropertyValues) {
        if (changed.has('label')) this._syncLabel();
    }

    private _syncLabel() {
        if (this.label) {
            this.setAttribute('aria-label', this.label);
        } else {
            this.removeAttribute('aria-label');
        }
    }

    private _cssLength(value: string): string {
        if (!value) return '';
        return isNaN(Number(value)) ? value : `${value}px`;
    }

    render() {
        const isText = this.shape === 'text';
        const animClass = this.animation !== 'none' ? this.animation : '';

        const styles = {
            display: 'block',
            backgroundColor: 'var(--flint-skeleton-bg, var(--flint-surface-3, rgba(0, 0, 0, 0.11)))',
            position: 'relative' as const,
            overflow: 'hidden',
            width: this._cssLength(this.width) || (isText ? '100%' : ''),
            height: this._cssLength(this.height) || (isText ? '0.8em' : ''),
            marginTop: isText ? '0.3em' : '',
            marginBottom: isText ? '0.3em' : ''
        };

        return html`
            <span
                part="skeleton"
                class="skeleton ${animClass} ${this.shape}"
                style=${styleMap(styles)}
                aria-hidden="true"
            ></span>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-skeleton': FlintSkeleton;
    }
}
