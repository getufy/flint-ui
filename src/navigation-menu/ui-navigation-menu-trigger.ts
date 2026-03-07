import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';

/**
 * @tag ui-navigation-menu-trigger
 *
 * A trigger button that opens/closes associated navigation menu content.
 * Must be accompanied by a ui-navigation-menu-content sibling.
 *
 * @slot default - Trigger label/content
 *
 * @csspart button - The trigger button element
 * @csspart icon - The indicator icon
 *
 * @cssprop --ui-navigation-menu-trigger-padding - Button padding (default: 8px 12px)
 * @cssprop --ui-navigation-menu-trigger-font-size - Font size (default: 14px)
 * @cssprop --ui-navigation-menu-trigger-color - Text color (default: inherit)
 * @cssprop --ui-navigation-menu-trigger-bg - Background (default: transparent)
 * @cssprop --ui-navigation-menu-trigger-hover-bg - Hover background (default: #f0f0f0)
 * @cssprop --ui-navigation-menu-trigger-border-radius - Border radius (default: 6px)
 *
 * @fires ui-navigation-menu-trigger-click - Fired when trigger is clicked
 */
export class UiNavigationMenuTrigger extends LitElement {
    static override styles = css`
        :host {
            display: inline-block;
            --ui-navigation-menu-trigger-padding: 8px 12px;
            --ui-navigation-menu-trigger-font-size: 14px;
            --ui-navigation-menu-trigger-color: inherit;
            --ui-navigation-menu-trigger-bg: transparent;
            --ui-navigation-menu-trigger-hover-bg: #f0f0f0;
            --ui-navigation-menu-trigger-border-radius: 6px;
        }

        .trigger {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: var(--ui-navigation-menu-trigger-padding);
            font-size: var(--ui-navigation-menu-trigger-font-size);
            color: var(--ui-navigation-menu-trigger-color);
            background: var(--ui-navigation-menu-trigger-bg);
            border: none;
            border-radius: var(--ui-navigation-menu-trigger-border-radius);
            cursor: pointer;
            transition: background 0.2s, color 0.2s;
            font-family: inherit;
            font-weight: 500;
        }

        .trigger:hover:not(:disabled) {
            background: var(--ui-navigation-menu-trigger-hover-bg);
        }

        .trigger:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .trigger[aria-expanded="true"] {
            background: var(--ui-navigation-menu-trigger-hover-bg);
        }

        .icon {
            width: 16px;
            height: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s;
        }

        .trigger[aria-expanded="true"] .icon {
            transform: rotate(180deg);
        }
    `;

    /** The ID of the associated content element */
    @property({ type: String })
    contentId: string = '';

    /** Whether the trigger is disabled */
    @property({ type: Boolean, reflect: true })
    disabled: boolean = false;

    /** Whether the associated content is open */
    @state()
    private _isOpen = false;

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
        this._emitToggleEvent();
        this._syncContent();
    };

    private _emitToggleEvent = () => {
        const content = this._getContent();
        if (content) {
            this.dispatchEvent(
                new CustomEvent('ui-navigation-menu-trigger-click', {
                    detail: { contentId: this.contentId, open: this._isOpen },
                    bubbles: true,
                    composed: true,
                })
            );
        }
    };

    private _syncContent = () => {
        const content = this._getContent();
        if (content) {
            (content as any).open = this._isOpen;
        }
    };

    private _getContent = () => {
        if (!this.contentId) return null;
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
                aria-expanded=${this._isOpen}
                aria-haspopup="true"
                aria-controls=${this.contentId}
            >
                <slot></slot>
                <span class="icon" part="icon">
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </span>
            </button>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-navigation-menu-trigger': UiNavigationMenuTrigger;
    }
}
