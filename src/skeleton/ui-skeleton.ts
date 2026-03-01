import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * Skeletons display a placeholder preview of content before data gets loaded.
 */
@customElement('ui-skeleton')
export class UiSkeleton extends LitElement {
    static styles = css`
        :host {
            display: block;
        }

        .skeleton {
            display: block;
            background-color: var(--ui-skeleton-bg, rgba(0, 0, 0, 0.11));
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
            animation: pulse 1.5s ease-in-out 0.5s infinite;
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
                rgba(255, 255, 255, 0.4),
                transparent
            );
            animation: wave 1.6s linear infinite;
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

        .circular {
            border-radius: 50%;
        }

        .rectangular {
            border-radius: var(--ui-border-radius-md, 4px);
        }

        .rounded {
            border-radius: var(--ui-border-radius-lg, 8px);
        }
    `;

    /**
     * If true, applies dark-theme styles regardless of OS preference.
     */
    @property({ type: Boolean, reflect: true }) dark = false;

    /**
     * The animation type.
     */
    @property({ type: String }) animation: 'pulse' | 'wave' | 'none' = 'pulse';

    /**
     * The shape of the skeleton.
     */
    @property({ type: String }) variant: 'text' | 'circular' | 'rectangular' | 'rounded' = 'text';

    /**
     * The width of the skeleton.
     */
    @property({ type: String }) width = '';

    /**
     * The height of the skeleton.
     */
    @property({ type: String }) height = '';

    render() {
        const styles = {
            width: this.width || (this.variant === 'text' ? '100%' : ''),
            height: this.height || (this.variant === 'text' ? '0.8em' : ''),
            marginTop: this.variant === 'text' ? '0.3em' : '',
            marginBottom: this.variant === 'text' ? '0.3em' : ''
        };

        return html`
            <span 
                class="skeleton ${this.animation} ${this.variant}" 
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
