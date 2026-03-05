import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 * The Link component allows you to easily customize anchor elements
 * with theme colors and typography styles.
 *
 * @slot - Link text or content.
 * @fires click - Native click event.
 */
@customElement('ui-link')
export class UiLink extends LitElement {
    static styles = css`
        :host {
            display: inline;
            --ui-link-color: var(--ui-primary-color, #3b82f6);
            --ui-link-color-hover: var(--ui-primary-color-dark, #2563eb);
            --ui-link-color-visited: var(--ui-secondary-color, #7c3aed);
        }

        a {
            color: var(--ui-link-color);
            font-family: var(--ui-font-family, 'Inter', sans-serif);
            font-size: inherit;
            font-weight: inherit;
            line-height: inherit;
            cursor: pointer;
            display: inline;
            transition: color 0.15s ease, opacity 0.15s ease;
        }

        /* Color variants */
        :host([color="inherit"]) a { color: inherit; }
        :host([color="primary"])  a { color: var(--ui-primary-color, #3b82f6); }
        :host([color="secondary"]) a { color: var(--ui-secondary-color, #7c3aed); }
        :host([color="success"])  a { color: var(--ui-success-color, #16a34a); }
        :host([color="error"])    a { color: var(--ui-error-color, #dc2626); }
        :host([color="warning"])  a { color: var(--ui-warning-color, #d97706); }
        :host([color="info"])     a { color: var(--ui-info-color, #0891b2); }
        :host([color="textPrimary"]) a   { color: var(--ui-text-color, #111827); }
        :host([color="textSecondary"]) a { color: var(--ui-text-color-muted, #6b7280); }

        /* Underline variants */
        :host([underline="none"])   a { text-decoration: none; }
        :host([underline="hover"])  a { text-decoration: none; }
        :host([underline="hover"])  a:hover { text-decoration: underline; }
        :host([underline="always"]) a { text-decoration: underline; }
        :host([underline="always"]) a:hover { text-decoration: underline; }

        /* Default underline (always) */
        a { text-decoration: underline; }

        /* Hover states */
        a:hover { opacity: 0.8; }

        /* Visited */
        a:visited {
            color: var(--ui-link-color-visited);
        }
        :host([color="inherit"]) a:visited { color: inherit; }

        /* Typography variants */
        :host([variant="h1"]) a { font-size: 6rem;   font-weight: 300; letter-spacing: -1.5px; line-height: 1.167; }
        :host([variant="h2"]) a { font-size: 3.75rem; font-weight: 300; letter-spacing: -0.5px; line-height: 1.2; }
        :host([variant="h3"]) a { font-size: 3rem;   font-weight: 400; line-height: 1.167; }
        :host([variant="h4"]) a { font-size: 2.125rem; font-weight: 400; letter-spacing: 0.25px; line-height: 1.235; }
        :host([variant="h5"]) a { font-size: 1.5rem;  font-weight: 400; line-height: 1.334; }
        :host([variant="h6"]) a { font-size: 1.25rem; font-weight: 500; letter-spacing: 0.15px; line-height: 1.6; }
        :host([variant="subtitle1"]) a { font-size: 1rem;    font-weight: 400; letter-spacing: 0.15px; line-height: 1.75; }
        :host([variant="subtitle2"]) a { font-size: 0.875rem; font-weight: 500; letter-spacing: 0.1px;  line-height: 1.57; }
        :host([variant="body1"]) a { font-size: 1rem;    font-weight: 400; letter-spacing: 0.15px; line-height: 1.5; }
        :host([variant="body2"]) a { font-size: 0.875rem; font-weight: 400; letter-spacing: 0.15px; line-height: 1.43; }
        :host([variant="caption"]) a { font-size: 0.75rem;  font-weight: 400; letter-spacing: 0.4px;  line-height: 1.66; }
        :host([variant="overline"]) a { font-size: 0.75rem;  font-weight: 400; letter-spacing: 1px;   line-height: 2.66; text-transform: uppercase; }

        /* Disabled */
        :host([disabled]) a {
            opacity: 0.38;
            cursor: not-allowed;
            pointer-events: none;
        }
    `;

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
                href=${ifDefined(this.disabled ? undefined : this.href || undefined)}
                target=${ifDefined(this.target !== '_self' ? this.target : undefined)}
                rel=${ifDefined(this._computedRel())}
                aria-label=${ifDefined(this.label)}
                download=${ifDefined(this.download)}
                aria-disabled=${this.disabled}
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
        'ui-link': UiLink;
    }
}
