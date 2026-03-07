import { LitElement, unsafeCSS, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import uiSkeletonStyles from './ui-skeleton.css?inline';

/**
 * Skeletons display a placeholder preview of content before data gets loaded.
 *
 * @csspart skeleton - The inner skeleton span element.
 * @cssprop --ui-skeleton-bg - Background color in light mode (default: rgba(0,0,0,0.11)).
 * @cssprop --ui-skeleton-bg-dark - Background color in dark mode (default: rgba(255,255,255,0.13)).
 * @cssprop --ui-skeleton-wave-color - Shimmer color for wave animation (default: rgba(255,255,255,0.4)).
 * @cssprop --ui-skeleton-animation-duration - Duration for pulse/wave animations (default: 1.5s).
 */
@customElement('ui-skeleton')
export class UiSkeleton extends LitElement {
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
    @property({ type: String, reflect: true }) variant: 'text' | 'circular' | 'rectangular' | 'rounded' = 'text';

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

    connectedCallback() {
        super.connectedCallback();
        if (!this.hasAttribute('role')) this.setAttribute('role', 'status');
        this._syncLabel();
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

    render() {
        const isText = this.variant === 'text';
        const animClass = this.animation !== 'none' ? this.animation : '';

        const styles = {
            width: this.width || (isText ? '100%' : ''),
            height: this.height || (isText ? '0.8em' : ''),
            marginTop: isText ? '0.3em' : '',
            marginBottom: isText ? '0.3em' : ''
        };

        return html`
            <span
                part="skeleton"
                class="skeleton ${animClass} ${this.variant}"
                style=${styleMap(styles)}
                aria-hidden="true"
            ></span>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-skeleton': UiSkeleton;
    }
}
