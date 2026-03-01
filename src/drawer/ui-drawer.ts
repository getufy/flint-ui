import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../backdrop/ui-backdrop.js';

/**
 * Navigation drawers provide ergonomic access to destinations in a site or app.
 *
 * @slot - Drawer content.
 * @fires ui-drawer-close - Dispatched when the drawer requests to be closed (backdrop click or Escape).
 */
@customElement('ui-drawer')
export class UiDrawer extends LitElement {
    static styles = css`
        :host {
            display: contents; /* transparent wrapper — doesn't affect layout */
            --ui-drawer-width: 250px;
            --ui-drawer-mini-width: 72px;
            --ui-drawer-height: auto;
            --ui-drawer-bg: var(--ui-surface-background, #ffffff);
            --ui-drawer-z-index: 1200;
            --ui-drawer-shadow: 0 8px 10px -5px rgba(0,0,0,.2), 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12);
        }

        /* ── Backdrop ───────────────────────────────────────────────────── */
        .backdrop {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,.5);
            z-index: calc(var(--ui-drawer-z-index) - 1);
            opacity: 0;
            transition: opacity .25s;
        }
        :host([container]) .backdrop { position: absolute; }
        .backdrop.visible { display: block; }
        .backdrop.open    { opacity: 1; }

        /* ── Paper ──────────────────────────────────────────────────────── */
        .paper {
            position: fixed;
            background: var(--ui-drawer-bg);
            z-index: var(--ui-drawer-z-index);
            display: flex;
            flex-direction: column;
            overflow-y: auto;
        }
        :host([container]) .paper { position: absolute; }

        /* Temporary – left (default) */
        :host(:not([variant])) .paper,
        :host([variant="temporary"]) .paper {
            top: 0; bottom: 0; left: 0;
            width: var(--ui-drawer-width);
            box-shadow: var(--ui-drawer-shadow);
            transform: translateX(-100%);
            transition: transform .225s cubic-bezier(0,.0,.2,1);
        }
        :host(:not([variant])[open]) .paper,
        :host([variant="temporary"][open]) .paper {
            transform: translateX(0);
        }

        /* Temporary – right */
        :host([variant="temporary"][anchor="right"]) .paper {
            left: auto; right: 0;
            transform: translateX(100%);
        }
        :host([variant="temporary"][anchor="right"][open]) .paper {
            transform: translateX(0);
        }

        /* Temporary – top */
        :host([variant="temporary"][anchor="top"]) .paper {
            top: 0; left: 0; right: 0; bottom: auto;
            width: auto;
            height: var(--ui-drawer-height);
            transform: translateY(-100%);
        }
        :host([variant="temporary"][anchor="top"][open]) .paper {
            transform: translateY(0);
        }

        /* Temporary – bottom */
        :host([variant="temporary"][anchor="bottom"]) .paper {
            top: auto; bottom: 0; left: 0; right: 0;
            width: auto;
            height: var(--ui-drawer-height);
            transform: translateY(100%);
        }
        :host([variant="temporary"][anchor="bottom"][open]) .paper {
            transform: translateY(0);
        }

        /* ── Persistent ─────────────────────────────────────────────────── */
        :host([variant="persistent"]) .paper {
            position: relative;
            transform: none;
            box-shadow: none;
            transition: none;
            border-right: 1px solid var(--ui-border-color, #e5e7eb);
        }
        :host([variant="persistent"][anchor="right"]) .paper {
            border-right: none;
            border-left: 1px solid var(--ui-border-color, #e5e7eb);
        }
        :host([variant="persistent"]) .paper:not(.open) {
            display: none;
        }

        /* ── Mini ───────────────────────────────────────────────────────── */
        :host([variant="mini"]) {
            display: flex; /* mini participates in flex layout of its parent */
        }
        :host([variant="mini"]) .paper {
            position: relative;
            transform: none;
            box-shadow: none;
            border-right: 1px solid var(--ui-border-color, #e5e7eb);
            width: var(--ui-drawer-mini-width);
            overflow-x: hidden;
            white-space: nowrap;
            transition: width .225s cubic-bezier(.4,0,.6,1);
            flex-shrink: 0;
        }
        :host([variant="mini"][anchor="right"]) .paper {
            border-right: none;
            border-left: 1px solid var(--ui-border-color, #e5e7eb);
        }
        :host([variant="mini"][open]) .paper {
            width: var(--ui-drawer-width);
        }
        /* Fade out labels when mini is collapsed */
        :host([variant="mini"]:not([open])) ::slotted([data-drawer-hide-mini]) {
            opacity: 0;
            pointer-events: none;
        }
        ::slotted([data-drawer-hide-mini]) { transition: opacity .18s; }

        /* ── Edge handle ─────────────────────────────────────────────────── */
        .edge {
            display: none;
            position: fixed;
            background: var(--ui-drawer-bg);
            border: 1px solid var(--ui-border-color, #e5e7eb);
            box-shadow: 0 1px 3px rgba(0,0,0,.12);
            cursor: pointer;
            z-index: var(--ui-drawer-z-index);
            align-items: center;
            justify-content: center;
        }
        :host([container]) .edge  { position: absolute; }
        :host([edge]) .edge        { display: flex; }

        .edge-left   { left:0; top:0; bottom:0; width:16px; border-radius:0 8px 8px 0; }
        .edge-right  { right:0; top:0; bottom:0; width:16px; border-radius:8px 0 0 8px; }
        .edge-top    { top:0; left:0; right:0; height:16px; border-radius:0 0 8px 8px; }
        .edge-bottom { bottom:0; left:0; right:0; height:16px; border-radius:8px 8px 0 0; }

        .edge-handle { width:4px; height:32px; background:#cbd5e1; border-radius:2px; }
        .edge-top .edge-handle, .edge-bottom .edge-handle { width:32px; height:4px; }
    `;

    @property({ type: Boolean, reflect: true }) open = false;
    @property({ type: String, reflect: true }) anchor: 'left' | 'right' | 'top' | 'bottom' = 'left';
    @property({ type: String, reflect: true }) variant: 'temporary' | 'persistent' | 'mini' = 'temporary';
    @property({ type: Boolean, reflect: true }) edge = false;
    @property({ type: Boolean, reflect: true }) container = false;

    private _boundKeyDown = (e: KeyboardEvent) => {
        if (this.open && e.key === 'Escape' && this.variant === 'temporary') this._close();
    };

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('keydown', this._boundKeyDown);
    }
    disconnectedCallback() {
        window.removeEventListener('keydown', this._boundKeyDown);
        super.disconnectedCallback();
    }

    private _close() {
        this.dispatchEvent(new CustomEvent('ui-drawer-close', { bubbles: true, composed: true }));
    }

    render() {
        const isTemporary = !this.variant || this.variant === 'temporary';
        const showEdge = this.edge && !this.open;

        return html`
            ${isTemporary ? html`
                <div
                    class="backdrop ${this.open ? 'visible open' : ''}"
                    @click=${this._close}
                ></div>
            ` : ''}

            ${showEdge ? html`
                <div class="edge edge-${this.anchor}" @click=${() => { this.open = true; }}>
                    <div class="edge-handle"></div>
                </div>
            ` : ''}

            <div
                class="paper ${this.open ? 'open' : ''}"
                role="complementary"
                aria-hidden=${!this.open}
            >
                <slot></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap { 'ui-drawer': UiDrawer; }
}
