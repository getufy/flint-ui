import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

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
     * Falls back to the item's visible label text if not set.
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

    /** Returns only the default-slot label text, excluding icon slots. */
    private _getLabelText(): string {
        const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
        return slot?.assignedNodes({ flatten: true })
            .map(n => n.textContent ?? '')
            .join('')
            .trim() ?? '';
    }

    private _handleClick() {
        if (this.disabled) return;
        const label = this._getLabelText();
        this.dispatchEvent(new CustomEvent('ui-menu-item-select', {
            bubbles: true,
            composed: true,
            detail: {
                value: this.value !== undefined ? this.value : label,
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
/*  ui-menu-group                                                       */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * A labelled group of menu items. Wraps items in a `role="group"` for
 * screen-reader announcements.
 *
 * @slot - Group items (ui-menu-item elements).
 */
@customElement('ui-menu-group')
export class UiMenuGroup extends LitElement {
    static styles = css`
        :host { display: block; }

        .group-label {
            padding: 6px 16px 2px;
            font-size: 0.6875rem;
            font-weight: 600;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: var(--ui-text-color-muted, #6b7280);
            user-select: none;
        }
    `;

    /** Visible heading rendered above the group items. */
    @property({ type: String }) label = '';

    render() {
        return html`
            <div role="group" aria-label=${ifDefined(this.label || undefined)}>
                ${this.label ? html`<div class="group-label">${this.label}</div>` : ''}
                <slot></slot>
            </div>
        `;
    }
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

    /** Accessible label for the menu surface (aria-label on role="menu"). */
    @property({ type: String }) label?: string;

    // ── Keyboard handling ──────────────────────────────────────────────────

    /** Escape key on window closes the menu from anywhere. */
    private _boundKeyDown = (e: KeyboardEvent) => {
        if (this.open && e.key === 'Escape') {
            e.stopPropagation();
            this._close();
        }
    };

    /** Arrow / Home / End / first-char navigation within the menu. */
    private _boundNavKeyDown = (e: KeyboardEvent) => {
        if (!this.open) return;
        this._handleNavKeyDown(e);
    };

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('keydown', this._boundKeyDown);
        this.addEventListener('keydown', this._boundNavKeyDown);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('keydown', this._boundKeyDown);
        this.removeEventListener('keydown', this._boundNavKeyDown);
    }

    // ── Focus management ───────────────────────────────────────────────────

    updated(changed: PropertyValues) {
        if (changed.has('open') && this.open) {
            // Focus first enabled item after the paint so the menu is visible
            setTimeout(() => {
                const items = this._getEnabledItems();
                if (items.length) this._focusItem(items[0]);
            }, 0);
        }
    }

    // ── Navigation helpers ─────────────────────────────────────────────────

    private _getEnabledItems(): UiMenuItem[] {
        return Array.from(this.querySelectorAll<UiMenuItem>('ui-menu-item'))
            .filter(item => !item.disabled);
    }

    private _focusItem(item: UiMenuItem) {
        // Prefer the inner .item div; fall back to the host if shadow not yet rendered.
        const target = item.shadowRoot?.querySelector<HTMLElement>('.item') ?? item;
        if (typeof target.focus === 'function') {
            target.focus();
            if (typeof target.scrollIntoView === 'function') {
                target.scrollIntoView({ block: 'nearest' });
            }
        }
    }

    private _handleNavKeyDown(e: KeyboardEvent) {
        const items = this._getEnabledItems();
        if (!items.length) return;

        // Detect currently focused item: check inner shadow activeElement first,
        // then fall back to document.activeElement (shadow-DOM retargets to host).
        const current = items.findIndex(item =>
            item.shadowRoot?.activeElement != null || document.activeElement === item
        );

        switch (e.key) {
            case 'ArrowDown': {
                e.preventDefault();
                const next = current < 0 || current >= items.length - 1 ? 0 : current + 1;
                this._focusItem(items[next]);
                break;
            }
            case 'ArrowUp': {
                e.preventDefault();
                const prev = current <= 0 ? items.length - 1 : current - 1;
                this._focusItem(items[prev]);
                break;
            }
            case 'Home':
                e.preventDefault();
                this._focusItem(items[0]);
                break;
            case 'End':
                e.preventDefault();
                this._focusItem(items[items.length - 1]);
                break;
            default: {
                // First-character jump — only single printable chars
                if (e.key.length === 1) {
                    const char = e.key.toLowerCase();
                    const startIndex = current < 0 ? 0 : (current + 1) % items.length;
                    const rotated = [...items.slice(startIndex), ...items.slice(0, startIndex)];
                    const match = rotated.find(item => {
                        const slot = item.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
                        const text = slot?.assignedNodes({ flatten: true })
                            .map(n => n.textContent ?? '')
                            .join('')
                            .trim()
                            .toLowerCase() ?? '';
                        return text.startsWith(char);
                    });
                    if (match) this._focusItem(match);
                }
            }
        }
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

        const backdropClasses = classMap({ backdrop: true, open: this.open });

        return html`
            <div class=${backdropClasses} @click=${this._close} aria-hidden="true"></div>
            <div
                class=${paperClasses}
                role="menu"
                aria-label=${ifDefined(this.label)}
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
        'ui-menu-group': UiMenuGroup;
    }
}
