import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-menu-item                                                        */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * A single option inside a `ui-menu`.
 *
 * @slot          - Item label text.
 * @slot icon     - Leading icon.
 * @slot end-icon - Trailing icon or shortcut hint.
 *
 * @fires ui-menu-item-select - Fired when the item is activated.
 *   detail: { value: string | null, label: string }
 */
@customElement('ui-menu-item')
export class UiMenuItem extends LitElement {
    static styles = css`
        :host {
            display: block;
            font-family: var(--ui-font-family, 'Inter', sans-serif);
        }

        .item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 8px 16px;
            min-height: 40px;
            cursor: pointer;
            user-select: none;
            font-size: 0.9375rem;
            color: var(--ui-text-color, #111827);
            background: transparent;
            border: none;
            width: 100%;
            text-align: left;
            box-sizing: border-box;
            transition: background 0.12s;
            position: relative;
            outline: none;
            border-radius: 0;
        }

        .item:hover  { background: rgba(0,0,0,.04); }
        .item:active { background: rgba(0,0,0,.08); }
        .item:focus-visible { background: rgba(0,0,0,.06); outline: 2px solid var(--ui-primary-color, #3b82f6); outline-offset: -2px; }

        :host([selected]) .item {
            background: var(--ui-primary-color-light, rgba(59,130,246,.12));
            color: var(--ui-primary-color, #3b82f6);
            font-weight: 600;
        }
        :host([selected]) .item:hover {
            background: var(--ui-primary-color-light, rgba(59,130,246,.18));
        }

        :host([disabled]) .item {
            opacity: 0.38;
            cursor: not-allowed;
            pointer-events: none;
        }

        /* Ensure [hidden] removes the element from layout inside Shadow DOM.
           The browser's UA [hidden]{display:none} doesn't pierce shadow roots in all
           environments, so we declare it explicitly here. */
        [hidden] { display: none !important; }

        .icon-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            flex-shrink: 0;
            color: var(--ui-text-color-muted, #6b7280);
        }
        :host([selected]) .icon-wrap { color: var(--ui-primary-color, #3b82f6); }


        .end-icon-wrap {
            display: flex;
            align-items: center;
            margin-left: auto;
            padding-left: 16px;
            color: var(--ui-text-color-muted, #6b7280);
            font-size: 0.75rem;
        }

        .label { flex: 1; line-height: 1.5; }

        /* Dense (desktop) */
        :host([dense]) .item { padding: 4px 16px; min-height: 32px; font-size: 0.875rem; }

        /* Divider below item */
        :host([divider]) {
            border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
            padding-bottom: 4px;
            margin-bottom: 4px;
        }
    `;

    /** Marks this item as the currently selected option. */
    @property({ type: Boolean, reflect: true }) selected = false;

    /** Disables the item — it becomes non-interactive. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    /** Dense padding mode (for desktop-density menus). */
    @property({ type: Boolean, reflect: true }) dense = false;

    /** Renders a hairline separator below this item. */
    @property({ type: Boolean, reflect: true }) divider = false;

    /**
     * The machine-readable value carried in the `ui-menu-item-select` event detail.
     * Falls back to the item's visible text if not set.
     */
    @property({ type: String, reflect: true }) value?: string;

    @state() private _hasIcon = false;
    @state() private _hasEndIcon = false;

    private _onIconSlotChange(e: Event) {
        const slot = e.target as HTMLSlotElement;
        this._hasIcon = slot.assignedNodes({ flatten: true }).length > 0;
    }

    private _onEndIconSlotChange(e: Event) {
        const slot = e.target as HTMLSlotElement;
        this._hasEndIcon = slot.assignedNodes({ flatten: true }).length > 0;
    }

    private _handleClick() {
        if (this.disabled) return;
        const label = this.textContent?.trim() ?? '';
        this.dispatchEvent(new CustomEvent('ui-menu-item-select', {
            bubbles: true,
            composed: true,
            detail: {
                // value prop takes priority; fall back to visible label text
                value: this.value ?? this.getAttribute('value') ?? label,
                label,
            }
        }));
    }

    render() {
        return html`
            <div
                class="item"
                role="menuitem"
                aria-disabled=${this.disabled ? 'true' : 'false'}
                tabindex=${this.disabled ? -1 : 0}
                @click=${this._handleClick}
                @keydown=${(e: KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this._handleClick();
                }
            }}
            >
                <span class="icon-wrap" ?hidden=${!this._hasIcon}>
                    <slot name="icon" @slotchange=${this._onIconSlotChange}></slot>
                </span>
                <span class="label"><slot></slot></span>
                <span class="end-icon-wrap" ?hidden=${!this._hasEndIcon}>
                    <slot name="end-icon" @slotchange=${this._onEndIconSlotChange}></slot>
                </span>
            </div>
        `;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-menu-divider                                                     */
/* ─────────────────────────────────────────────────────────────────── */

/** A hairline separator for grouping items in a menu. */
@customElement('ui-menu-divider')
export class UiMenuDivider extends LitElement {
    static styles = css`
        :host {
            display: block;
            height: 1px;
            background: var(--ui-border-color, #e5e7eb);
            margin: 4px 0;
        }
    `;
    render() { return html``; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-menu                                                             */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * A menu displays a list of choices on a temporary surface.
 * Place it as a sibling to its anchor element inside a `position:relative` container.
 *
 * @slot - Menu content (ui-menu-item elements).
 * @fires ui-menu-close - Fired when the menu requests to be closed (backdrop click, Escape, or item select).
 *
 * @example
 * <div style="position:relative;display:inline-block;">
 *   <ui-button @click=${() => menu.open = !menu.open}>Open</ui-button>
 *   <ui-menu .open=${open} @ui-menu-close=${() => open = false}>
 *     <ui-menu-item>Profile</ui-menu-item>
 *     <ui-menu-item>Logout</ui-menu-item>
 *   </ui-menu>
 * </div>
 */
@customElement('ui-menu')
export class UiMenu extends LitElement {
    static styles = css`
        :host {
            display: block;
            position: relative;
            --ui-menu-z-index: 1300;
            --ui-menu-min-width: 120px;
        }

        /* Invisible full-screen click-away layer */
        .backdrop {
            display: none;
            position: fixed;
            inset: 0;
            z-index: calc(var(--ui-menu-z-index) - 1);
        }
        .backdrop.open { display: block; }

        /* Menu surface */
        .menu-paper {
            position: absolute;
            background: var(--ui-surface-background, #fff);
            border-radius: var(--ui-border-radius-md, 8px);
            box-shadow: 0 4px 6px -1px rgba(0,0,0,.1), 0 10px 15px -3px rgba(0,0,0,.1);
            min-width: var(--ui-menu-min-width);
            z-index: var(--ui-menu-z-index);
            overflow: hidden;
            transform-origin: top left;

            /* Closed state */
            transform: scale(0.85);
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transition: transform 0.15s cubic-bezier(0.4,0,0.2,1),
                        opacity   0.15s cubic-bezier(0.4,0,0.2,1),
                        visibility 0.15s;
            padding: 4px 0;
        }

        /* Open state */
        .menu-paper.open {
            transform: scale(1);
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
        }

        /* Placement variants */
        .pos-bottom-start { top: 100%; left: 0;      transform-origin: top left;    }
        .pos-bottom-end   { top: 100%; right: 0;     transform-origin: top right;   }
        .pos-top-start    { bottom: 100%; left: 0;   transform-origin: bottom left; }
        .pos-top-end      { bottom: 100%; right: 0;  transform-origin: bottom right;}
        .pos-right-start  { left: 100%; top: 0;      transform-origin: top left;    }
        .pos-left-start   { right: 100%; top: 0;     transform-origin: top right;   }

        /* Scrollable list */
        .menu-paper.scrollable {
            max-height: var(--ui-menu-max-height, 300px);
            overflow-y: auto;
        }
    `;

    /** Whether the menu is open/visible. */
    @property({ type: Boolean, reflect: true }) open = false;

    /**
     * Menu placement relative to its anchor container.
     * 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'right-start' | 'left-start'
     */
    @property({ type: String, reflect: true }) placement = 'bottom-start';

    /** When true, selecting an item automatically fires ui-menu-close. */
    @property({ type: Boolean, attribute: 'close-on-select' }) closeOnSelect = true;

    /** When true, constrains height to --ui-menu-max-height (default 300px) and enables scrolling. */
    @property({ type: Boolean }) scrollable = false;

    // ── Keyboard handling ──────────────────────────────────────────────────
    private _boundKeyDown = (e: KeyboardEvent) => {
        if (this.open && e.key === 'Escape') {
            e.stopPropagation();
            this._close();
        }
    };

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('keydown', this._boundKeyDown);
    }

    disconnectedCallback() {
        super.disconnectedCallback(); // call super first
        window.removeEventListener('keydown', this._boundKeyDown);
    }

    // ── Event dispatch ─────────────────────────────────────────────────────
    private _close() {
        this.dispatchEvent(new CustomEvent('ui-menu-close', { bubbles: true, composed: true }));
    }

    private _handleItemSelect() {
        if (this.closeOnSelect) this._close();
    }

    // ── Render ─────────────────────────────────────────────────────────────
    render() {
        const paperClasses = classMap({
            'menu-paper': true,
            'open': this.open,
            [`pos-${this.placement}`]: !!this.placement,
            'scrollable': this.scrollable,
        });

        // BUG FIX: use classMap binding (not string interpolation) for backdrop too
        const backdropClasses = classMap({ backdrop: true, open: this.open });

        return html`
            <div class=${backdropClasses} @click=${this._close} aria-hidden="true"></div>
            <div
                class=${paperClasses}
                role="menu"
                aria-hidden=${this.open ? 'false' : 'true'}
                @ui-menu-item-select=${this._handleItemSelect}
            >
                <slot></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-menu': UiMenu;
        'ui-menu-item': UiMenuItem;
        'ui-menu-divider': UiMenuDivider;
    }
}
