import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { FlintNavigationMenuContent } from './flint-navigation-menu-content.js';

/**
 * @tag flint-navigation-menu-trigger
 *
 * A trigger button that opens/closes associated navigation menu content.
 * Must be accompanied by a flint-navigation-menu-content sibling.
 *
 * @slot default - Trigger label/content
 *
 * @csspart button - The trigger button element
 * @csspart icon - The indicator icon
 *
 * @cssprop --flint-navigation-menu-trigger-padding - Button padding (default: 8px 12px)
 * @cssprop --flint-navigation-menu-trigger-font-size - Font size (default: 14px)
 * @cssprop --flint-navigation-menu-trigger-color - Text color (default: inherit)
 * @cssprop --flint-navigation-menu-trigger-bg - Background (default: transparent)
 * @cssprop --flint-navigation-menu-trigger-hover-bg - Hover background (default: #f0f0f0)
 * @cssprop --flint-navigation-menu-trigger-border-radius - Border radius (default: 6px)
 *
 * @fires flint-navigation-menu-trigger-click - Fired when trigger is clicked
 */
@customElement('flint-navigation-menu-trigger')
export class FlintNavigationMenuTrigger extends LitElement {
    static override styles = css`
        :host {
            display: flex;
            --flint-navigation-menu-trigger-padding: 8px 14px;
            --flint-navigation-menu-trigger-font-size: 14px;
            --flint-navigation-menu-trigger-color: var(--flint-text-color, #111827);
            --flint-navigation-menu-trigger-bg: transparent;
            --flint-navigation-menu-trigger-hover-bg: var(--flint-hover-color, rgba(0, 0, 0, 0.04));
            --flint-navigation-menu-trigger-active-bg: var(--flint-hover-color, rgba(0, 0, 0, 0.04));
            --flint-navigation-menu-trigger-border-radius: 6px;
        }

        .trigger {
            display: flex;
            align-items: center;
            gap: 4px;
            height: 36px;
            flex: 1;
            padding: var(--flint-navigation-menu-trigger-padding);
            font-size: var(--flint-navigation-menu-trigger-font-size);
            font-weight: 500;
            font-family: inherit;
            color: var(--flint-navigation-menu-trigger-color);
            background: var(--flint-navigation-menu-trigger-bg);
            border: none;
            border-radius: var(--flint-navigation-menu-trigger-border-radius);
            cursor: pointer;
            transition: background 0.15s ease, color 0.15s ease;
            outline: none;
            white-space: nowrap;
            user-select: none;
        }

        .trigger:hover:not(:disabled) {
            background: var(--flint-navigation-menu-trigger-hover-bg);
        }

        .trigger:focus-visible {
            outline: 2px solid var(--flint-primary-color, #3b82f6);
            outline-offset: 2px;
        }

        .trigger:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            pointer-events: none;
        }

        .trigger[aria-expanded="true"] {
            background: var(--flint-navigation-menu-trigger-active-bg);
        }

        .icon {
            width: 14px;
            height: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0.7;
            transition: transform 0.2s ease;
            flex-shrink: 0;
        }

        .trigger[aria-expanded="true"] .icon {
            transform: rotate(180deg);
        }
    `;

    /** The ID of the associated content element */
    @property({ type: String, reflect: true, attribute: 'content-id' })
    contentId: string = '';

    /** Whether the trigger is disabled */
    @property({ type: Boolean, reflect: true })
    disabled: boolean = false;

    /** Whether the associated content is open */
    @state()
    private _isOpen = false;

    private _contentObserver: MutationObserver | null = null;

    override connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', this._handleClick);
        this.addEventListener('keydown', this._handleKeydown);
    }

    override disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('click', this._handleClick);
        this.removeEventListener('keydown', this._handleKeydown);
        this._contentObserver?.disconnect();
        this._contentObserver = null;
    }

    override firstUpdated() {
        this._observeContent();
    }

    override updated(changed: PropertyValues) {
        if (changed.has('contentId')) {
            this._observeContent();
        }
    }

    /** Watch content's open attribute so _isOpen stays in sync when closed externally */
    private _observeContent() {
        this._contentObserver?.disconnect();
        const content = this._getContent();
        if (!content) return;
        this._contentObserver = new MutationObserver(() => {
            const open = content.hasAttribute('open');
            if (this._isOpen !== open) {
                this._isOpen = open;
            }
        });
        this._contentObserver.observe(content, { attributes: true, attributeFilter: ['open'] });
    }

    private _handleClick = () => {
        if (this.disabled) return;
        this._toggle();
    };

    private _handleKeydown = (e: KeyboardEvent) => {
        if (this.disabled) return;

        switch (e.key) {
            case 'Enter':
            case ' ':
                e.preventDefault();
                this._toggle();
                break;
            case 'ArrowDown':
                e.preventDefault();
                this._focusFirstContentItem();
                break;
        }
    };

    private _toggle = () => {
        this._isOpen = !this._isOpen;
        this._emitEvents();
        this._syncContent();
    };

    private _emitEvents = () => {
        const detail = { contentId: this.contentId, open: this._isOpen };
        // Fire the public trigger event
        this.dispatchEvent(
            new CustomEvent('flint-navigation-menu-trigger-click', {
                detail,
                bubbles: true,
                composed: true,
            })
        );
    };

    private _syncContent = () => {
        const content = this._getContent() as FlintNavigationMenuContent | null;
        if (content) {
            content.open = this._isOpen;
        }
    };

    /** Find content relative to the nearest menu root (shadow-DOM-safe) */
    private _getContent = () => {
        if (!this.contentId) return null;
        const item = this.closest('flint-navigation-menu-item');
        if (item) {
            const found = item.querySelector(`[id="${this.contentId}"]`);
            if (found) return found;
        }
        const menu = this.closest('flint-navigation-menu');
        if (menu) {
            const found = menu.querySelector(`[id="${this.contentId}"]`);
            if (found) return found;
        }
        // Check parent element (sibling usage without full menu wrapper)
        const parent = this.parentElement;
        if (parent) {
            const found = parent.querySelector(`[id="${this.contentId}"]`);
            if (found) return found;
        }
        return document.getElementById(this.contentId);
    };

    private _focusFirstContentItem = () => {
        const content = this._getContent();
        if (content) {
            const firstItem = content.querySelector('[role="menuitem"]') as HTMLElement;
            if (firstItem) {
                firstItem.focus();
            }
        }
    };

    override render() {
        return html`
            <button
                class="trigger"
                part="button"
                ?disabled=${this.disabled}
                aria-expanded=${this._isOpen ? 'true' : 'false'}
                aria-haspopup="true"
                aria-controls=${this.contentId}
            >
                <slot></slot>
                <span class="icon" part="icon">
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <polyline points="1 4 6 9 11 4"></polyline>
                    </svg>
                </span>
            </button>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-navigation-menu-trigger': FlintNavigationMenuTrigger;
    }
}
