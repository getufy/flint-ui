import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { UiNavigationMenuContent } from './ui-navigation-menu-content.js';
import type { UiNavigationMenuTrigger } from './ui-navigation-menu-trigger.js';

/**
 * @tag ui-navigation-menu-item
 *
 * Individual menu item container. Groups a trigger and its associated content.
 * Coordinates hover open/close with configurable delays.
 *
 * @slot default - Item content (NavigationMenuTrigger and NavigationMenuContent)
 *
 * @csspart root - The root item element
 *
 * @cssprop --ui-navigation-menu-item-padding - Item padding (default: 0)
 */
@customElement('ui-navigation-menu-item')
export class UiNavigationMenuItem extends LitElement {
    static override styles = css`
        :host {
            display: flex;
            position: relative;
            --ui-navigation-menu-item-padding: 0;
        }

        .item {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            padding: var(--ui-navigation-menu-item-padding);
            position: relative;
            width: 100%;
        }
    `;

    /** Unique identifier for this menu item */
    @property({ type: String })
    itemId: string = '';

    /** Whether this item is disabled */
    @property({ type: Boolean, reflect: true })
    disabled: boolean = false;

    /** Delay in ms before opening on hover */
    @property({ type: Number, attribute: 'open-delay' })
    openDelay: number = 100;

    /** Delay in ms before closing after mouse leaves */
    @property({ type: Number, attribute: 'close-delay' })
    closeDelay: number = 150;

    private _openTimer: ReturnType<typeof setTimeout> | null = null;
    private _closeTimer: ReturnType<typeof setTimeout> | null = null;

    override connectedCallback() {
        super.connectedCallback();
        this.addEventListener('mouseenter', this._handleMouseEnter);
        this.addEventListener('mouseleave', this._handleMouseLeave);
        this.shadowRoot!.addEventListener('slotchange', this._syncChildren);
    }

    override disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('mouseenter', this._handleMouseEnter);
        this.removeEventListener('mouseleave', this._handleMouseLeave);
        this.shadowRoot!.removeEventListener('slotchange', this._syncChildren);
        this._clearTimers();
    }

    override updated(changed: Map<PropertyKey, unknown>) {
        if (changed.has('disabled')) {
            this._syncChildren();
        }
    }

    private _handleMouseEnter = () => {
        if (this.disabled) return;
        this._cancelClose();
        this._openTimer = setTimeout(() => {
            this._openTimer = null;
            this._openContent();
        }, this.openDelay);
    };

    private _handleMouseLeave = () => {
        this._cancelOpen();
        this._closeTimer = setTimeout(() => {
            this._closeTimer = null;
            this._closeContent();
        }, this.closeDelay);
    };

    private _cancelOpen() {
        if (this._openTimer !== null) {
            clearTimeout(this._openTimer);
            this._openTimer = null;
        }
    }

    private _cancelClose() {
        if (this._closeTimer !== null) {
            clearTimeout(this._closeTimer);
            this._closeTimer = null;
        }
    }

    private _clearTimers() {
        this._cancelOpen();
        this._cancelClose();
    }

    private _openContent() {
        const trigger = this.querySelector('ui-navigation-menu-trigger') as UiNavigationMenuTrigger | null;
        if (!trigger || trigger.disabled) return;
        const contentId = trigger.contentId;
        if (!contentId) return;
        const content = this.querySelector(`[id="${contentId}"]`) as UiNavigationMenuContent | null;
        if (!content) return;
        // Fire the standard trigger event so ui-navigation-menu can coordinate one-at-a-time
        trigger.dispatchEvent(
            new CustomEvent('ui-navigation-menu-trigger-click', {
                detail: { contentId, open: true },
                bubbles: true,
                composed: true,
            })
        );
        content.open = true;
    }

    private _closeContent() {
        const trigger = this.querySelector('ui-navigation-menu-trigger') as UiNavigationMenuTrigger | null;
        if (!trigger) return;
        const contentId = trigger.contentId;
        if (!contentId) return;
        const content = this.querySelector(`[id="${contentId}"]`) as UiNavigationMenuContent | null;
        if (!content || !content.open) return;
        content.open = false;
        content.dispatchEvent(
            new CustomEvent('ui-navigation-menu-content-toggle', {
                detail: { contentId, open: false },
                bubbles: true,
                composed: true,
            })
        );
    }

    private _syncChildren = () => {
        const triggers = this.querySelectorAll('ui-navigation-menu-trigger') as NodeListOf<UiNavigationMenuTrigger>;
        const links = this.querySelectorAll('ui-navigation-menu-link') as NodeListOf<HTMLElement & { disabled: boolean }>;
        triggers.forEach((el) => {
            if (el.closest('ui-navigation-menu-item') === this) {
                el.disabled = this.disabled;
            }
        });
        links.forEach((el) => {
            if (el.closest('ui-navigation-menu-item') === this) {
                el.disabled = this.disabled;
            }
        });
    };

    override render() {
        return html`
            <div class="item" part="root" role="none">
                <slot></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-navigation-menu-item': UiNavigationMenuItem;
    }
}
