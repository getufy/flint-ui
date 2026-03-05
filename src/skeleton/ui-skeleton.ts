import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

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
    static styles = css`
        :host {
            display: block;
        }

        .skeleton {
            display: block;
            background-color: var(--ui-skeleton-bg, #e0e0e0);
            position: relative;
            overflow: hidden;
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
            .skeleton {
                background-color: var(--ui-skeleton-bg-dark, rgba(255, 255, 255, 0.13));
            }
        }

        /* Explicit dark attribute support */
        :host([dark]) .skeleton {
            background-color: var(--ui-skeleton-bg-dark, rgba(255, 255, 255, 0.13));
        }

        .skeleton.pulse {
            animation: pulse var(--ui-skeleton-animation-duration, 1.5s) ease-in-out 0.5s infinite;
        }

        .skeleton.wave::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(
                90deg,
                transparent,
                var(--ui-skeleton-wave-color, rgba(255, 255, 255, 0.4)),
                transparent
            );
            animation: wave var(--ui-skeleton-animation-duration, 1.6s) linear infinite;
            transform: translateX(-100%);
        }

        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.4; }
            100% { opacity: 1; }
        }

        @keyframes wave {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }

        .text {
            border-radius: var(--ui-border-radius-sm, 3px);
        }

        .circular {
            border-radius: 50%;
        }

        .rectangular {
            border-radius: var(--ui-border-radius-md, 4px);
        }

        .rounded {
            border-radius: var(--ui-border-radius-lg, 8px);
        }

        /* Respect user reduced-motion preference */
        @media (prefers-reduced-motion: reduce) {
            .skeleton.pulse {
                animation: none;
            }

            .skeleton.wave::after {
                display: none;
            }
        }
    `;

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
