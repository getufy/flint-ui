import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { UiNavigationMenuContent } from './ui-navigation-menu-content.js';

/**
 * @tag ui-navigation-menu
 *
 * A navigation menu component that supports hierarchical menus with triggers and content panels.
 * Based on Radix UI Navigation Menu.
 *
 * @slot default - The menu content (NavigationMenuList)
 *
 * @csspart root - The root container
 *
 * @cssprop --ui-navigation-menu-padding - Padding of menu (default: 0)
 * @cssprop --ui-navigation-menu-gap - Gap between items (default: 8px)
 * @cssprop --ui-navigation-menu-bg - Background color (default: transparent)
 * @cssprop --ui-navigation-menu-border - Border style (default: none)
 */
export class UiNavigationMenu extends LitElement {
    static override styles = css`
        :host {
            display: block;
            --ui-navigation-menu-padding: 0;
            --ui-navigation-menu-gap: 8px;
            --ui-navigation-menu-bg: transparent;
            --ui-navigation-menu-border: none;
        }

        .menu {
            padding: var(--ui-navigation-menu-padding);
            background: var(--ui-navigation-menu-bg);
            border: var(--ui-navigation-menu-border);
        }
    `;

    /** The direction of the menu (ltr or rtl) */
    @property({ type: String, reflect: true })
    dir: 'ltr' | 'rtl' = 'ltr';

    /** Currently open content item (only one can be open at a time) */
    @state()
    private _openContentId: string | null = null;

    private _handleContentToggle = (e: CustomEvent) => {
        const detail = e.detail as { contentId: string; open: boolean };
        if (detail.open) {
            // Close any currently open content
            this._closeAllContent();
            this._openContentId = detail.contentId;
        } else {
            this._openContentId = null;
        }
    };

    private _closeAllContent = () => {
        this.querySelectorAll('ui-navigation-menu-content').forEach((content) => {
            (content as UiNavigationMenuContent).open = false;
        });
    };

    override connectedCallback() {
        super.connectedCallback();
        this.addEventListener('ui-navigation-menu-content-toggle', this._handleContentToggle as EventListener);
        document.addEventListener('click', this._handleDocumentClick.bind(this) as EventListener);
    }

    override disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('ui-navigation-menu-content-toggle', this._handleContentToggle as EventListener);
        document.removeEventListener('click', this._handleDocumentClick.bind(this) as EventListener);
    }

    private _handleDocumentClick = (e: Event) => {
        const target = e.target as HTMLElement;
        if (!this.contains(target)) {
            this._closeAllContent();
        }
    };

    /** Get the currently open content item ID */
    get openContentId() {
        return this._openContentId;
    }

    /** Manually open a content item by ID */
    openContent(contentId: string) {
        this._closeAllContent();
        this._openContentId = contentId;
        const content = this.querySelector(
            `ui-navigation-menu-content[id="${contentId}"]`
        ) as UiNavigationMenuContent | null;
        if (content) {
            content.open = true;
        }
    }

    /** Close all open content */
    closeAll() {
        this._closeAllContent();
        this._openContentId = null;
    }

    override render() {
        return html`
            <div class="menu" part="root">
                <slot></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-navigation-menu': UiNavigationMenu;
    }
}
