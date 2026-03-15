import { html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { FlintNavigationMenuContent } from './flint-navigation-menu-content.js';
import { FlintElement } from '../flint-element.js';

/**
 * @tag flint-navigation-menu
 *
 * A navigation menu component that supports hierarchical menus with triggers and content panels.
 * Based on Radix UI Navigation Menu.
 *
 * @slot default - The menu content (NavigationMenuList)
 *
 * @csspart root - The root container
 *
 * @cssprop --flint-navigation-menu-padding - Padding of menu (default: 0)
 * @cssprop --flint-navigation-menu-gap - Gap between items (default: 8px)
 * @cssprop --flint-navigation-menu-bg - Background color (default: transparent)
 * @cssprop --flint-navigation-menu-border - Border style (default: none)
 * @cssprop --flint-navigation-menu-border-radius - Border radius (default: 0)
 */
export class FlintNavigationMenu extends FlintElement {
    static override styles = css`
        :host {
            display: block;
            position: relative;
            --flint-navigation-menu-padding: 0;
            --flint-navigation-menu-gap: 8px;
            --flint-navigation-menu-bg: transparent;
            --flint-navigation-menu-border: none;
            --flint-navigation-menu-border-radius: 0;
        }

        .menu {
            padding: var(--flint-navigation-menu-padding);
            background: var(--flint-navigation-menu-bg);
            border: var(--flint-navigation-menu-border);
            border-radius: var(--flint-navigation-menu-border-radius);
        }
    `;

    /** The direction of the menu (ltr or rtl) */
    @property({ type: String, reflect: true })
    dir: 'ltr' | 'rtl' = 'ltr';

    /** Currently open content item (only one can be open at a time) */
    @state()
    private _openContentId: string | null = null;

    // Arrow field so add/remove use the same reference (fixes memory leak)
    private _handleContentToggle = (e: CustomEvent) => {
        const detail = e.detail as { contentId: string; open: boolean };
        if (detail.open) {
            this._closeAllContent();
            this._openContentId = detail.contentId;
        } else {
            if (this._openContentId === detail.contentId) {
                this._openContentId = null;
            }
        }
    };

    private _closeAllContent = () => {
        this.querySelectorAll('flint-navigation-menu-content').forEach((content) => {
            (content as FlintNavigationMenuContent).open = false;
        });
    };

    // Arrow field so add/remove use the same reference (fixes memory leak)
    private _handleDocumentClick = (e: Event) => {
        const target = e.target as HTMLElement;
        if (!this.contains(target)) {
            this._closeAllContent();
            this._openContentId = null;
        }
    };

    override connectedCallback() {
        super.connectedCallback();
        // Both trigger-click and content-toggle events carry { contentId, open }
        this.addEventListener('flint-navigation-menu-trigger-click', this._handleContentToggle as EventListener);
        this.addEventListener('flint-navigation-menu-content-toggle', this._handleContentToggle as EventListener);
        // pointerdown fires before click, so programmatic openContent() called from an
        // outside button's onclick handler won't be immediately cancelled by this listener.
        document.addEventListener('pointerdown', this._handleDocumentClick);
    }

    override disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('flint-navigation-menu-trigger-click', this._handleContentToggle as EventListener);
        this.removeEventListener('flint-navigation-menu-content-toggle', this._handleContentToggle as EventListener);
        document.removeEventListener('pointerdown', this._handleDocumentClick);
    }

    /** Get the currently open content item ID */
    get openContentId() {
        return this._openContentId;
    }

    /** Manually open a content item by ID. No-ops silently if the ID doesn't match any content element. */
    openContent(contentId: string) {
        this._closeAllContent();
        this._openContentId = contentId;
        const content = this.querySelector(
            `flint-navigation-menu-content[id="${contentId}"]`
        ) as FlintNavigationMenuContent | null;
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
        'flint-navigation-menu': FlintNavigationMenu;
    }
}
