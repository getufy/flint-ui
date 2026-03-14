import { LitElement, unsafeCSS, html, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import uiMenuItemStyles from './flint-menu-item.css?inline';
import uiMenuDividerStyles from './flint-menu-divider.css?inline';
import uiMenuGroupStyles from './flint-menu-group.css?inline';
import uiMenuStyles from './flint-menu.css?inline';

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-menu-item                                                        */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * A single option inside a `flint-menu`.
 *
 * @slot          - Item label text.
 * @slot icon     - Leading icon.
 * @slot end-icon - Trailing icon or shortcut hint.
 *
 * @fires flint-menu-item-select - Fired when the item is activated.
 *   detail: { value: string | null, label: string }
 */
@customElement('flint-menu-item')
export class FlintMenuItem extends LitElement {
    static styles = unsafeCSS(uiMenuItemStyles);

    /** Marks this item as the currently selected option. */
    @property({ type: Boolean, reflect: true }) selected = false;

    /** Disables the item — it becomes non-interactive. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    /** Dense padding mode (for desktop-density menus). */
    @property({ type: Boolean, reflect: true }) dense = false;

    /** Renders a hairline separator below this item. */
    @property({ type: Boolean, reflect: true }) divider = false;

    /**
     * The machine-readable value carried in the `flint-menu-item-select` event detail.
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
        this.dispatchEvent(new CustomEvent('flint-menu-item-select', {
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
/*  flint-menu-divider                                                     */
/* ─────────────────────────────────────────────────────────────────── */

/** A hairline separator for grouping items in a menu. */
@customElement('flint-menu-divider')
export class FlintMenuDivider extends LitElement {
    static styles = unsafeCSS(uiMenuDividerStyles);
    render() { return html``; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-menu-group                                                       */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * A labelled group of menu items. Wraps items in a `role="group"` for
 * screen-reader announcements.
 *
 * @slot - Group items (flint-menu-item elements).
 */
@customElement('flint-menu-group')
export class FlintMenuGroup extends LitElement {
    static styles = unsafeCSS(uiMenuGroupStyles);

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
/*  flint-menu                                                             */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * A menu displays a list of choices on a temporary surface.
 * Place it as a sibling to its anchor element inside a `position:relative` container.
 *
 * @slot - Menu content (flint-menu-item elements).
 * @fires flint-menu-close - Fired when the menu requests to be closed (backdrop click, Escape, or item select).
 *
 * @example
 * <div style="position:relative;display:inline-block;">
 *   <flint-button @click=${() => menu.open = !menu.open}>Open</flint-button>
 *   <flint-menu .open=${open} @flint-menu-close=${() => open = false}>
 *     <flint-menu-item>Profile</flint-menu-item>
 *     <flint-menu-item>Logout</flint-menu-item>
 *   </flint-menu>
 * </div>
 */
@customElement('flint-menu')
export class FlintMenu extends LitElement {
    static styles = unsafeCSS(uiMenuStyles);

    /** Whether the menu is open/visible. */
    @property({ type: Boolean, reflect: true }) open = false;

    /**
     * Menu placement relative to its anchor container.
     * 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'right-start' | 'left-start'
     */
    @property({ type: String, reflect: true }) placement = 'bottom-start';

    /** When true, selecting an item automatically fires flint-menu-close. */
    @property({ type: Boolean, attribute: 'close-on-select' }) closeOnSelect = true;

    /** When true, constrains height to --flint-menu-max-height (default 300px) and enables scrolling. */
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

    private _getEnabledItems(): FlintMenuItem[] {
        return Array.from(this.querySelectorAll<FlintMenuItem>('flint-menu-item'))
            .filter(item => !item.disabled);
    }

    private _focusItem(item: FlintMenuItem) {
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
        this.dispatchEvent(new CustomEvent('flint-menu-close', { bubbles: true, composed: true }));
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
                @flint-menu-item-select=${this._handleItemSelect}
            >
                <slot></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-menu': FlintMenu;
        'flint-menu-item': FlintMenuItem;
        'flint-menu-divider': FlintMenuDivider;
        'flint-menu-group': FlintMenuGroup;
    }
}
