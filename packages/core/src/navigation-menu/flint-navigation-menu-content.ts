import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * @tag flint-navigation-menu-content
 *
 * Content panel for navigation menu items. Opens/closes based on trigger interaction.
 * Must have a matching flint-navigation-menu-trigger with the same contentId.
 *
 * @slot default - Menu content items
 *
 * @csspart root - The root content element
 * @csspart panel - The inner panel container
 *
 * @cssprop --flint-navigation-menu-content-bg - Background color (default: white)
 * @cssprop --flint-navigation-menu-content-border - Border style (default: 1px solid #e5e7eb)
 * @cssprop --flint-navigation-menu-content-border-radius - Border radius (default: 8px)
 * @cssprop --flint-navigation-menu-content-padding - Padding (default: 16px)
 * @cssprop --flint-navigation-menu-content-shadow - Box shadow (default: 0 4px 6px rgba(0,0,0,0.1))
 * @cssprop --flint-navigation-menu-content-gap - Gap between items (default: 12px)
 * @cssprop --flint-navigation-menu-content-min-width - Minimum width (default: 200px)
 * @cssprop --flint-navigation-menu-content-z-index - Z-index (default: 1000)
 *
 * @fires flint-navigation-menu-content-toggle - Fired when the content panel opens or closes.
 */
@customElement('flint-navigation-menu-content')
export class FlintNavigationMenuContent extends LitElement {
    static override styles = css`
        :host {
            display: none;
            position: absolute;
            top: calc(100% + 6px);
            inset-inline-start: 0;
            z-index: var(--flint-navigation-menu-content-z-index, 1000);
        }

        :host([open]) {
            display: block;
            animation: slideDown 0.15s ease-out;
        }

        .panel {
            background: var(--flint-navigation-menu-content-bg, var(--flint-surface-1, #ffffff));
            border: var(--flint-navigation-menu-content-border, 1px solid var(--flint-border-color, #e5e7eb));
            border-radius: var(--flint-navigation-menu-content-border-radius, 8px);
            padding: var(--flint-navigation-menu-content-padding, 12px);
            box-shadow: var(
                --flint-navigation-menu-content-shadow,
                0 4px 6px -1px rgba(0, 0, 0, 0.1),
                0 2px 4px -2px rgba(0, 0, 0, 0.06)
            );
            min-width: var(--flint-navigation-menu-content-min-width, 200px);
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-6px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @media (prefers-reduced-motion: reduce) {
            :host([open]) {
                animation: none;
            }
        }

        ::slotted(*) {
            display: block;
        }

        ::slotted(flint-navigation-menu-link) {
            display: block;
            width: 100%;
            box-sizing: border-box;
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
            this.style.setProperty('--flint-navigation-menu-content-gap', `${this.gap}px`);
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
            case 'Tab':
                // Close on Tab so focus moves naturally — do NOT preventDefault
                this._close();
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
            new CustomEvent('flint-navigation-menu-content-toggle', {
                detail: { contentId: this.id, open: false },
                bubbles: true,
                composed: true,
            })
        );
    };

    private _focusTrigger = () => {
        const menu = this.closest('flint-navigation-menu');
        if (menu) {
            const trigger = menu.querySelector(
                `flint-navigation-menu-trigger[content-id="${this.id}"]`
            ) as HTMLElement | null;
            if (trigger) {
                trigger.focus();
                return;
            }
        }
        // Fallback: document-level search
        const trigger = document.querySelector(
            `flint-navigation-menu-trigger[content-id="${this.id}"]`
        ) as HTMLElement | null;
        if (trigger) trigger.focus();
    };

    private _getAllItems = () => {
        // flint-navigation-menu-link has role="menuitem" inside its shadow DOM;
        // query host elements directly so focus() works on the custom element host
        return Array.from(
            this.querySelectorAll('flint-navigation-menu-link, [role="menuitem"]')
        ) as HTMLElement[];
    };

    private _focusFirstItem = () => {
        const items = this._getAllItems();
        if (items.length > 0) items[0].focus();
    };

    private _focusLastItem = () => {
        const items = this._getAllItems();
        if (items.length > 0) items[items.length - 1].focus();
    };

    private _findFocusedIndex = (items: HTMLElement[]) => {
        const active = this.ownerDocument.activeElement as HTMLElement;
        // Active element might be the host itself, or inside its shadow DOM (browser behaviour:
        // document.activeElement is the host, jsdom may return the actual focused inner element)
        return items.findIndex(
            (item) => item === active || item.shadowRoot?.contains(active)
        );
    };

    private _focusNextItem = () => {
        const items = this._getAllItems();
        if (items.length === 0) return;
        const currentIndex = this._findFocusedIndex(items);
        // Wrap: if at last item (or not found), go to first
        const nextIndex = currentIndex >= items.length - 1 ? 0 : currentIndex + 1;
        items[nextIndex].focus();
    };

    private _focusPreviousItem = () => {
        const items = this._getAllItems();
        if (items.length === 0) return;
        const currentIndex = this._findFocusedIndex(items);
        // Wrap: if at first item (or not found), go to last
        const prevIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
        items[prevIndex].focus();
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
        'flint-navigation-menu-content': FlintNavigationMenuContent;
    }
}
