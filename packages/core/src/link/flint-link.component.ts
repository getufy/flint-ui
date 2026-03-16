import { unsafeCSS, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { FlintElement } from '../flint-element.js';
import uiLinkStyles from './flint-link.css?inline';

/**
 * The Link component allows you to easily customize anchor elements
 * with theme colors and typography styles.
 *
 * @slot - Link text or content.
 * Native click events propagate from the shadow DOM anchor element.
 */
export class FlintLink extends FlintElement {
    static styles = unsafeCSS(uiLinkStyles);

    /** The URL of the link. */
    @property({ type: String }) href = '';

    /** Where to open the link. */
    @property({ type: String }) target: '_self' | '_blank' | '_parent' | '_top' = '_self';

    /** Specifies the relationship of the target object. */
    @property({ type: String }) rel = '';

    /**
     * The color of the link.
     * @default 'primary'
     */
    @property({ type: String, reflect: true }) color:
        | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
        | 'textPrimary' | 'textSecondary' | 'inherit' = 'primary';

    /**
     * Controls the underline behavior.
     * @default 'always'
     */
    @property({ type: String, reflect: true }) underline: 'none' | 'hover' | 'always' = 'always';

    /**
     * Applies typography variant styles.
     * @default 'inherit'
     */
    @property({ type: String, reflect: true }) variant:
        | 'inherit' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
        | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline' = 'inherit';

    /** If true, the link is disabled. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    /** The download attribute. */
    @property({ type: String }) download?: string;

    /** The ARIA label. */
    @property({ type: String }) label?: string;

    private _computedRel(): string | undefined {
        if (this.target === '_blank') {
            const base = this.rel || '';
            const parts = new Set(base.split(' ').filter(Boolean));
            parts.add('noopener');
            parts.add('noreferrer');
            return Array.from(parts).join(' ');
        }
        return this.rel || undefined;
    }

    private _handleClick(e: MouseEvent) {
        if (this.disabled) {
            e.preventDefault();
        }
    }

    render() {
        return html`
            <a
                class="link"
                part="base"
                href=${ifDefined(this.disabled ? undefined : this.href || undefined)}
                target=${ifDefined(this.target !== '_self' ? this.target : undefined)}
                rel=${ifDefined(this._computedRel())}
                aria-label=${ifDefined(this.label)}
                download=${ifDefined(this.download)}
                aria-disabled=${this.disabled ? 'true' : nothing}
                tabindex=${this.disabled ? '-1' : '0'}
                @click=${this._handleClick}
            >
                <slot></slot>
            </a>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-link': FlintLink;
    }
}
