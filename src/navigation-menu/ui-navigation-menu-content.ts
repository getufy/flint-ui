import { LitElement, html, css, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

/**
 * @tag ui-navigation-menu-content
 *
 * Content panel for navigation menu items. Opens/closes based on trigger interaction.
 * Must have a matching ui-navigation-menu-trigger with the same contentId.
 *
 * @slot default - Menu content items
 *
 * @csspart root - The root content element
 * @csspart panel - The inner panel container
 *
 * @cssprop --ui-navigation-menu-content-bg - Background color (default: white)
 * @cssprop --ui-navigation-menu-content-border - Border style (default: 1px solid #e5e7eb)
 * @cssprop --ui-navigation-menu-content-border-radius - Border radius (default: 8px)
 * @cssprop --ui-navigation-menu-content-padding - Padding (default: 16px)
 * @cssprop --ui-navigation-menu-content-shadow - Box shadow (default: 0 4px 6px rgba(0,0,0,0.1))
 * @cssprop --ui-navigation-menu-content-gap - Gap between items (default: 12px)
 * @cssprop --ui-navigation-menu-content-min-width - Minimum width (default: 200px)
 * @cssprop --ui-navigation-menu-content-z-index - Z-index (default: 1000)
 */
export class UiNavigationMenuContent extends LitElement {
    static override styles = css`
        :host {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            z-index: var(--ui-navigation-menu-content-z-index, 1000);
            margin-top: 4px;
        }

        :host([open]) {
            display: block;
        }

        .panel {
            background: var(--ui-navigation-menu-content-bg, white);
            border: var(--ui-navigation-menu-content-border, 1px solid #e5e7eb);
            border-radius: var(--ui-navigation-menu-content-border-radius, 8px);
            padding: var(--ui-navigation-menu-content-padding, 16px);
            box-shadow: var(--ui-navigation-menu-content-shadow, 0 4px 6px rgba(0, 0, 0, 0.1));
            min-width: var(--ui-navigation-menu-content-min-width, 200px);
            animation: slideDown 0.2s ease-out;
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-8px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @media (prefers-reduced-motion: reduce) {
            .panel {
                animation: none;
            }
        }

        ::slotted(*) {
            display: block;
        }
    `;

    /** Unique identifier for this content panel */
    @property({ type: String })
    override id: string = '';

    /** Whether the content is open/visible */
    @property({ type: Boolean, reflect: true })
    open: boolean = false;

    /** The direction (ltr or rtl) */
    @property({ type: String })
    dir: 'ltr' | 'rtl' = 'ltr';

    /** Gap between items in the content */
    @property({ type: Number })
    gap: number = 12;

    override connectedCallback() {
        super.connectedCallback();
        this.addEventListener('keydown', this._handleKeydown as EventListener);
    }

    override disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('keydown', this._handleKeydown as EventListener);
    }

    override willUpdate(changedProperties: PropertyValues) {
        if (changedProperties.has('gap')) {
            this.style.setProperty('--ui-navigation-menu-content-gap', `${this.gap}px`);
        }
        if (changedProperties.has('dir')) {
            this.setAttribute('dir', this.dir);
        }
    }

    private _handleKeydown = (e: KeyboardEvent) => {
        switch (e.key) {
            case 'Escape':
                e.preventDefault();
                this._close();
                this._focusTrigger();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this._focusPreviousItem();
                break;
            case 'ArrowDown':
                e.preventDefault();
                this._focusNextItem();
                break;
            case 'Home':
                e.preventDefault();
                this._focusFirstItem();
                break;
            case 'End':
                e.preventDefault();
                this._focusLastItem();
                break;
        }
    };

    private _close = () => {
        this.open = false;
        this.dispatchEvent(
            new CustomEvent('ui-navigation-menu-content-toggle', {
                detail: { contentId: this.id, open: false },
                bubbles: true,
                composed: true,
            })
        );
    };

    private _focusTrigger = () => {
        const trigger = document.querySelector(
            `ui-navigation-menu-trigger[content-id="${this.id}"]`
        ) as HTMLElement;
        if (trigger) {
            trigger.focus();
        }
    };

    private _getAllItems = () => {
        return Array.from(this.querySelectorAll('[role="menuitem"]')) as HTMLElement[];
    };

    private _focusFirstItem = () => {
        const items = this._getAllItems();
        if (items.length > 0) {
            items[0].focus();
        }
    };

    private _focusLastItem = () => {
        const items = this._getAllItems();
        if (items.length > 0) {
            items[items.length - 1].focus();
        }
    };

    private _focusNextItem = () => {
        const items = this._getAllItems();
        const focused = this.ownerDocument.activeElement as HTMLElement;
        const currentIndex = items.indexOf(focused);
        if (currentIndex < items.length - 1) {
            items[currentIndex + 1].focus();
        }
    };

    private _focusPreviousItem = () => {
        const items = this._getAllItems();
        const focused = this.ownerDocument.activeElement as HTMLElement;
        const currentIndex = items.indexOf(focused);
        if (currentIndex > 0) {
            items[currentIndex - 1].focus();
        }
    };

    override render() {
        return html`
            <div class="panel" part="panel" role="menu">
                <slot></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-navigation-menu-content': UiNavigationMenuContent;
    }
}
