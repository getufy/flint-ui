import { LitElement, unsafeCSS, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import uiDrawerStyles from './flint-drawer.css?inline';
import '../backdrop/flint-backdrop.js';

/**
 * Navigation drawers provide ergonomic access to destinations in a site or app.
 *
 * @slot - Drawer content.
 * @fires flint-drawer-close - Dispatched when the drawer requests to be closed (backdrop click or Escape).
 */
@customElement('flint-drawer')
export class FlintDrawer extends LitElement {
    static styles = unsafeCSS(uiDrawerStyles);

    /** Whether the drawer is open. */
    @property({ type: Boolean, reflect: true }) open = false;
    /** Side from which the drawer slides in. */
    @property({ type: String, reflect: true }) anchor: 'left' | 'right' | 'top' | 'bottom' = 'left';
    /** Drawer behavior mode. */
    @property({ type: String, reflect: true }) variant: 'temporary' | 'persistent' | 'mini' = 'temporary';
    /** Whether the drawer uses edge spacing. */
    @property({ type: Boolean, reflect: true }) edge = false;
    /** Whether the drawer is contained within its parent. */
    @property({ type: Boolean, reflect: true }) container = false;
    /** Accessible label for the drawer panel (used as aria-label on the panel). */
    @property({ type: String }) label = 'Drawer';

    /** Element that had focus before the drawer opened; restored on close. */
    private _lastFocused: HTMLElement | null = null;

    private _boundKeyDown = (e: KeyboardEvent) => {
        // FIX: respect other handlers that already consumed the Escape key
        if (e.defaultPrevented) return;
        if (this.open && e.key === 'Escape' && this.variant === 'temporary') {
            e.preventDefault();
            this._close();
        }
    };

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('keydown', this._boundKeyDown);
    }
    disconnectedCallback() {
        window.removeEventListener('keydown', this._boundKeyDown);
        super.disconnectedCallback();
    }

    updated(changed: PropertyValues) {
        if (!changed.has('open')) return;
        // Focus management only for temporary (overlay dialog behaviour)
        if (this.variant !== 'temporary') return;

        if (this.open) {
            this._lastFocused = document.activeElement as HTMLElement | null;
            // Move focus into the drawer so keyboard/AT users are oriented
            this.shadowRoot?.querySelector<HTMLElement>('.paper')?.focus();
        } else {
            // Return focus to the element that triggered the open
            this._lastFocused?.focus();
            this._lastFocused = null;
        }
    }

    private _close() {
        this.dispatchEvent(new CustomEvent('flint-drawer-close', { bubbles: true, composed: true }));
    }

    render() {
        const isTemporary = this.variant === 'temporary';
        // FIX: only show edge for temporary; persistent/mini are position:relative
        // and a fixed/absolute edge handle floats detached from the drawer panel.
        const showEdge = this.edge && !this.open && isTemporary;

        /*
         * aria-hidden logic:
         * - temporary/persistent: hidden from AT when closed (not visible)
         * - mini: ALWAYS accessible — icons remain visible when collapsed,
         *   so aria-hidden must never be "true" for mini regardless of open state.
         */
        const ariaHidden = this.variant === 'mini' ? 'false' : String(!this.open);

        return html`
            ${isTemporary ? html`
                <div
                    class="backdrop ${this.open ? 'open' : ''}"
                    @click=${this._close}
                    role="presentation"
                    aria-hidden="true"
                ></div>
            ` : ''}

            ${showEdge ? html`
                <div class="edge edge-${this.anchor}" @click=${() => { this.open = true; }}>
                    <div class="edge-handle"></div>
                </div>
            ` : ''}

            <div
                class="paper ${this.open ? 'open' : ''}"
                role=${isTemporary ? 'dialog' : 'complementary'}
                aria-modal=${isTemporary ? String(this.open) : 'false'}
                aria-label=${this.label}
                aria-hidden=${ariaHidden}
                tabindex="-1"
            >
                <slot></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap { 'flint-drawer': FlintDrawer; }
}
