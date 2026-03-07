import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

/**
 * @tag ui-navigation-menu-link
 *
 * A direct navigation link item for menus without dropdown content.
 * Can be used instead of ui-navigation-menu-trigger for simple links.
 *
 * @slot default - Link text/content
 *
 * @csspart link - The link element
 *
 * @cssprop --ui-navigation-menu-link-padding - Link padding (default: 8px 12px)
 * @cssprop --ui-navigation-menu-link-font-size - Font size (default: 14px)
 * @cssprop --ui-navigation-menu-link-color - Text color (default: inherit)
 * @cssprop --ui-navigation-menu-link-text-decoration - Text decoration (default: none)
 * @cssprop --ui-navigation-menu-link-bg - Background (default: transparent)
 * @cssprop --ui-navigation-menu-link-hover-bg - Hover background (default: #f0f0f0)
 * @cssprop --ui-navigation-menu-link-border-radius - Border radius (default: 6px)
 */
export class UiNavigationMenuLink extends LitElement {
    static override styles = css`
        :host {
            display: inline-block;
            --ui-navigation-menu-link-padding: 8px 12px;
            --ui-navigation-menu-link-font-size: 14px;
            --ui-navigation-menu-link-color: inherit;
            --ui-navigation-menu-link-text-decoration: none;
            --ui-navigation-menu-link-bg: transparent;
            --ui-navigation-menu-link-hover-bg: #f0f0f0;
            --ui-navigation-menu-link-border-radius: 6px;
        }

        .link {
            display: inline-flex;
            align-items: center;
            padding: var(--ui-navigation-menu-link-padding);
            font-size: var(--ui-navigation-menu-link-font-size);
            color: var(--ui-navigation-menu-link-color);
            text-decoration: var(--ui-navigation-menu-link-text-decoration);
            background: var(--ui-navigation-menu-link-bg);
            border-radius: var(--ui-navigation-menu-link-border-radius);
            cursor: pointer;
            transition: background 0.2s, color 0.2s;
            font-family: inherit;
            font-weight: 500;
            border: none;
            white-space: nowrap;
            user-select: none;
        }

        .link:hover {
            background: var(--ui-navigation-menu-link-hover-bg);
        }

        .link:focus-visible {
            outline: 2px solid currentColor;
            outline-offset: 2px;
        }

        .link[disabled] {
            opacity: 0.5;
            cursor: not-allowed;
            pointer-events: none;
        }
    `;

    /** The link URL */
    @property({ type: String })
    href: string = '';

    /** The link target (e.g., '_blank') */
    @property({ type: String })
    target: string = '';

    /** Link title/tooltip */
    @property({ type: String })
    title: string = '';

    /** Whether the link is disabled */
    @property({ type: Boolean, reflect: true })
    disabled: boolean = false;

    override connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', this._handleClick);
        this.addEventListener('keydown', this._handleKeydown);
    }

    override disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('click', this._handleClick);
        this.removeEventListener('keydown', this._handleKeydown);
    }

    private _handleClick = (e: MouseEvent) => {
        if (this.disabled) {
            e.preventDefault();
            return;
        }

        if (this.href) {
            if (this.target) {
                window.open(this.href, this.target);
            } else {
                window.location.href = this.href;
            }
        }
    };

    private _handleKeydown = (e: KeyboardEvent) => {
        if (this.disabled) return;

        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this._handleClick(e as unknown as MouseEvent);
        }
    };

    override render() {
        return html`
            <a
                class="link"
                part="link"
                href=${this.href}
                target=${this.target}
                title=${this.title}
                role="menuitem"
                ?aria-disabled=${this.disabled}
            >
                <slot></slot>
            </a>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-navigation-menu-link': UiNavigationMenuLink;
    }
}
