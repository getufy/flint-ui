import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

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
 * @cssprop --ui-navigation-menu-link-active-bg - Background when active (default: #eff6ff)
 * @cssprop --ui-navigation-menu-link-active-color - Color when active (default: #1d4ed8)
 */
@customElement('ui-navigation-menu-link')
export class UiNavigationMenuLink extends LitElement {
    static override styles = css`
        :host {
            display: flex;
            --ui-navigation-menu-link-padding: 8px 14px;
            --ui-navigation-menu-link-font-size: 14px;
            --ui-navigation-menu-link-color: var(--ui-text-color, #111827);
            --ui-navigation-menu-link-text-decoration: none;
            --ui-navigation-menu-link-bg: transparent;
            --ui-navigation-menu-link-hover-bg: #f3f4f6;
            --ui-navigation-menu-link-border-radius: 6px;
            --ui-navigation-menu-link-active-bg: #eff6ff;
            --ui-navigation-menu-link-active-color: var(--ui-primary-color, #3b82f6);
        }

        .link {
            display: flex;
            align-items: center;
            height: 36px;
            flex: 1;
            padding: var(--ui-navigation-menu-link-padding);
            font-size: var(--ui-navigation-menu-link-font-size);
            font-weight: 500;
            font-family: inherit;
            color: var(--ui-navigation-menu-link-color);
            text-decoration: var(--ui-navigation-menu-link-text-decoration);
            background: var(--ui-navigation-menu-link-bg);
            border-radius: var(--ui-navigation-menu-link-border-radius);
            cursor: pointer;
            transition: background 0.15s ease, color 0.15s ease;
            border: none;
            white-space: nowrap;
            user-select: none;
            outline: none;
        }

        .link:hover {
            background: var(--ui-navigation-menu-link-hover-bg);
        }

        .link:focus-visible {
            outline: 2px solid var(--ui-primary-color, #3b82f6);
            outline-offset: 2px;
        }

        .link[disabled] {
            opacity: 0.5;
            cursor: not-allowed;
            pointer-events: none;
        }

        .link--active {
            background: var(--ui-navigation-menu-link-active-bg);
            color: var(--ui-navigation-menu-link-active-color);
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

    /**
     * Whether this link represents the current page.
     * Sets aria-current="page" and applies active styles.
     */
    @property({ type: Boolean, reflect: true })
    active: boolean = false;

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
        // Close the parent navigation menu when a link is activated
        const menu = this.closest('ui-navigation-menu') as (HTMLElement & { closeAll?: () => void }) | null;
        menu?.closeAll?.();
    };

    private _handleKeydown = (e: KeyboardEvent) => {
        if (this.disabled) return;

        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const a = this.shadowRoot?.querySelector('a') as HTMLAnchorElement | null;
            a?.click();
        }
    };

    /** Delegate focus to the inner anchor element */
    override focus(options?: FocusOptions) {
        const a = this.shadowRoot?.querySelector('a') as HTMLElement | undefined;
        if (a) a.focus(options);
        else super.focus(options);
    }

    override render() {
        return html`
            <a
                class="link ${this.active ? 'link--active' : ''}"
                part="link"
                href=${this.href}
                target=${this.target}
                title=${this.title}
                role="menuitem"
                aria-disabled=${this.disabled ? 'true' : 'false'}
                aria-current=${this.active ? 'page' : nothing}
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
