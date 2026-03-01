import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-command-shortcut                                                 */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Displays a keyboard shortcut hint inside a command item.
 * Slot the shortcut string (e.g. `⌘P`) as default slot content.
 *
 * @slot - Shortcut text, e.g. `⌘P` or `Ctrl+K`.
 */
@customElement('ui-command-shortcut')
export class UiCommandShortcut extends LitElement {
    static styles = css`
        :host {
            display: inline-flex;
            align-items: center;
            margin-left: auto;
            padding-left: 8px;
            font-size: 0.6875rem;
            letter-spacing: 0.05em;
            color: var(--ui-text-color-muted, #6b7280);
            font-family: var(--ui-font-family, system-ui, sans-serif);
        }
    `;
    render() { return html`<slot></slot>`; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-command-separator                                                */
/* ─────────────────────────────────────────────────────────────────── */

/** A hairline separator between command groups. */
@customElement('ui-command-separator')
export class UiCommandSeparator extends LitElement {
    static styles = css`
        :host {
            display: block;
            height: 1px;
            background: var(--ui-border-color, #e5e7eb);
            margin: 4px 0;
        }
        :host([hidden]) { display: none !important; }
    `;
    render() { return html``; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-command-item                                                     */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * A single interactive option inside a command menu.
 *
 * @slot          - Item label text.
 * @slot icon     - Leading icon (16×16).
 * @slot shortcut - Trailing shortcut hint; prefer `<ui-command-shortcut>`.
 *
 * @fires ui-command-item-select - Fired when the item is activated.
 *   detail: `{ value: string }`
 *
 * @attr {string}  value       - Search value used for filtering. Defaults to text content.
 * @attr {boolean} disabled    - Makes the item non-interactive.
 * @attr {boolean} highlighted - Set by parent to show keyboard focus.
 */
@customElement('ui-command-item')
export class UiCommandItem extends LitElement {
    static styles = css`
        :host { display: block; }
        :host([hidden]) { display: none !important; }

        .item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 6px 8px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.875rem;
            line-height: 1.25rem;
            color: var(--ui-text-color, #111827);
            font-family: var(--ui-font-family, system-ui, sans-serif);
            outline: none;
            user-select: none;
            transition: background 0.1s;
        }

        :host([highlighted]) .item {
            background: var(--ui-command-highlight-bg, rgba(0, 0, 0, 0.06));
            color: var(--ui-command-highlight-color, var(--ui-text-color, #111827));
        }

        .item:hover {
            background: var(--ui-hover-bg, rgba(0, 0, 0, 0.04));
        }

        :host([highlighted]) .item:hover {
            background: var(--ui-command-highlight-bg, rgba(0, 0, 0, 0.06));
        }

        :host([disabled]) .item {
            opacity: 0.38;
            cursor: not-allowed;
            pointer-events: none;
        }

        .icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 16px;
            height: 16px;
            flex-shrink: 0;
            color: var(--ui-text-color-muted, #6b7280);
        }

        .label { flex: 1; }

        [hidden] { display: none !important; }
    `;

    /** Machine-readable value used for filter matching. Falls back to textContent. */
    @property({ type: String, reflect: true }) value = '';

    /** Disables the item — non-interactive and skipped in keyboard nav. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    /** Set by parent `ui-command` to indicate keyboard focus. */
    @property({ type: Boolean, reflect: true }) highlighted = false;

    @state() private _hasIcon = false;

    private _onIconSlotChange(e: Event) {
        const slot = e.target as HTMLSlotElement;
        this._hasIcon = slot.assignedNodes({ flatten: true }).length > 0;
    }

    /** Scroll this item into view (nearest ancestor scroll container). */
    scrollIntoViewIfNeeded() {
        if (typeof this.scrollIntoView === 'function') {
            this.scrollIntoView({ block: 'nearest' });
        }
    }

    private _handleClick() {
        if (this.disabled) return;
        this.dispatchEvent(new CustomEvent('ui-command-item-select', {
            bubbles: true,
            composed: true,
            detail: { value: this.value || this.textContent?.trim() || '' },
        }));
    }

    render() {
        return html`
            <div
                class="item"
                role="option"
                aria-selected=${this.highlighted ? 'true' : 'false'}
                aria-disabled=${this.disabled ? 'true' : 'false'}
                tabindex="-1"
                @click=${this._handleClick}
            >
                <span class="icon" ?hidden=${!this._hasIcon}>
                    <slot name="icon" @slotchange=${this._onIconSlotChange}></slot>
                </span>
                <span class="label"><slot></slot></span>
                <slot name="shortcut"></slot>
            </div>
        `;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-command-empty                                                    */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Empty state message shown when no command items match the current query.
 * Managed automatically by the parent `ui-command` element.
 *
 * @slot - Message text, e.g. "No results found."
 */
@customElement('ui-command-empty')
export class UiCommandEmpty extends LitElement {
    static styles = css`
        :host {
            display: block;
            padding: 24px 8px;
            text-align: center;
            font-size: 0.875rem;
            color: var(--ui-text-color-muted, #6b7280);
            font-family: var(--ui-font-family, system-ui, sans-serif);
        }
        :host([hidden]) { display: none !important; }
    `;
    render() { return html`<slot></slot>`; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-command-group                                                    */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * A labeled group of command items. The parent `ui-command` automatically
 * hides the whole group when all its items are filtered out.
 *
 * @slot - `ui-command-item` elements.
 * @attr {string} heading - Group label shown above the items.
 */
@customElement('ui-command-group')
export class UiCommandGroup extends LitElement {
    static styles = css`
        :host {
            display: block;
            font-family: var(--ui-font-family, system-ui, sans-serif);
        }
        :host([hidden]) { display: none !important; }

        .heading {
            padding: 6px 8px 2px;
            font-size: 0.6875rem;
            font-weight: 600;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            color: var(--ui-text-color-muted, #6b7280);
        }

        .heading:empty { display: none; }
    `;

    /** Label rendered above the group items. */
    @property({ type: String, reflect: true }) heading = '';

    render() {
        return html`
            <div class="heading">${this.heading}</div>
            <slot></slot>
        `;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-command-list                                                     */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Scrollable list container for command items and groups.
 *
 * @slot - `ui-command-group`, `ui-command-item`, `ui-command-empty`, `ui-command-separator`.
 */
@customElement('ui-command-list')
export class UiCommandList extends LitElement {
    static styles = css`
        :host {
            display: block;
            overflow-y: auto;
            max-height: var(--ui-command-list-max-height, 300px);
        }

        .list {
            padding: 4px;
            outline: none;
        }

        .list:focus-visible {
            outline: 2px solid var(--ui-primary-color, #3b82f6);
            outline-offset: -2px;
        }
    `;

    render() {
        return html`
            <div class="list" role="listbox" tabindex="0" aria-label="Command results">
                <slot></slot>
            </div>
        `;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-command-input                                                    */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Search input for the command menu. Dispatches `_cmd-filter` events that
 * the parent `ui-command` intercepts to apply filtering.
 *
 * @attr {string} placeholder - Input placeholder text.
 * @attr {string} value       - Current input value (reflected).
 */
@customElement('ui-command-input')
export class UiCommandInput extends LitElement {
    static styles = css`
        :host {
            display: block;
            font-family: var(--ui-font-family, system-ui, sans-serif);
        }

        .input-wrap {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 10px 12px;
            border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
        }

        .search-icon {
            flex-shrink: 0;
            color: var(--ui-text-color-muted, #6b7280);
            display: flex;
            align-items: center;
        }

        input {
            flex: 1;
            border: none;
            outline: none;
            background: transparent;
            font-size: 0.9375rem;
            color: var(--ui-text-color, #111827);
            font-family: inherit;
            min-width: 0;
        }

        input::placeholder {
            color: var(--ui-text-color-muted, #6b7280);
        }

        /* Hide the native clear button added by type="search" in WebKit. */
        input[type="search"]::-webkit-search-cancel-button { display: none; }
        input[type="search"]::-webkit-search-decoration      { display: none; }
    `;

    /** Placeholder text shown when input is empty. */
    @property({ type: String }) placeholder = 'Type a command or search...';

    /** Current input value. */
    @property({ type: String, reflect: true }) value = '';

    private _handleInput(e: Event) {
        const input = e.target as HTMLInputElement;
        this.value = input.value;
        this.dispatchEvent(new CustomEvent('_cmd-filter', {
            bubbles: true,
            composed: true,
            detail: { query: input.value },
        }));
    }

    /** Focus the inner input element. */
    focus() {
        this.shadowRoot?.querySelector('input')?.focus();
    }

    /** Reset the input value and broadcast an empty filter. */
    reset() {
        const input = this.shadowRoot?.querySelector('input') as HTMLInputElement | null;
        if (input) input.value = '';
        this.value = '';
        this.dispatchEvent(new CustomEvent('_cmd-filter', {
            bubbles: true,
            composed: true,
            detail: { query: '' },
        }));
    }

    render() {
        return html`
            <div class="input-wrap">
                <span class="search-icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2"
                         stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </span>
                <input
                    type="search"
                    .value=${this.value}
                    placeholder=${this.placeholder}
                    aria-label="Search commands"
                    @input=${this._handleInput}
                    autocomplete="off"
                    spellcheck="false"
                />
            </div>
        `;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-command                                                          */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Root command menu component. Manages search filtering and keyboard navigation.
 *
 * Compose it with `ui-command-input`, `ui-command-list`, `ui-command-group`,
 * `ui-command-item`, `ui-command-separator`, and `ui-command-empty`.
 *
 * @slot - Command menu content.
 *
 * @fires ui-command-item-select - Bubbles up from activated items.
 *   detail: `{ value: string }`
 *
 * @csspart command - The root wrapper div.
 *
 * @example
 * <ui-command>
 *   <ui-command-input placeholder="Search..."></ui-command-input>
 *   <ui-command-list>
 *     <ui-command-empty>No results found.</ui-command-empty>
 *     <ui-command-group heading="Suggestions">
 *       <ui-command-item value="calendar">Calendar</ui-command-item>
 *     </ui-command-group>
 *   </ui-command-list>
 * </ui-command>
 */
@customElement('ui-command')
export class UiCommand extends LitElement {
    static styles = css`
        :host {
            display: block;
            font-family: var(--ui-font-family, system-ui, sans-serif);
            background: var(--ui-surface-background, #fff);
            border-radius: var(--ui-border-radius-md, 8px);
            overflow: hidden;
        }

        .command {
            display: flex;
            flex-direction: column;
        }
    `;

    private _query = '';
    private _highlightedItem: UiCommandItem | null = null;

    /* ── Event handlers (arrow functions = auto-bound, safe to add/remove) ── */

    private _handleFilter = (e: Event) => {
        this._applyFilter((e as CustomEvent<{ query: string }>).detail.query);
    };

    private _handleKeyDown = (e: KeyboardEvent) => {
        const visible = this._getNavigableItems();
        if (visible.length === 0) return;

        const idx = this._highlightedItem ? visible.indexOf(this._highlightedItem) : -1;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this._setHighlight(visible[(idx + 1) % visible.length]);
                break;
            case 'ArrowUp':
                e.preventDefault();
                this._setHighlight(visible[(idx - 1 + visible.length) % visible.length]);
                break;
            case 'Enter':
                e.preventDefault();
                if (this._highlightedItem) this._activateItem(this._highlightedItem);
                break;
            case 'Home':
                e.preventDefault();
                this._setHighlight(visible[0]);
                break;
            case 'End':
                e.preventDefault();
                this._setHighlight(visible[visible.length - 1]);
                break;
        }
    };

    /* ── Lifecycle ─────────────────────────────────────────────────────────── */

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('_cmd-filter', this._handleFilter);
        this.addEventListener('keydown', this._handleKeyDown);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('_cmd-filter', this._handleFilter);
        this.removeEventListener('keydown', this._handleKeyDown);
    }

    /* ── Private helpers ───────────────────────────────────────────────────── */

    /** Items that can receive keyboard highlight (visible + not disabled). */
    private _getNavigableItems(): UiCommandItem[] {
        return [...this.querySelectorAll('ui-command-item')].filter(
            (el) => !el.hidden && !(el as UiCommandItem).disabled
        ) as UiCommandItem[];
    }

    private _setHighlight(item: UiCommandItem | null) {
        if (this._highlightedItem) this._highlightedItem.highlighted = false;
        this._highlightedItem = item;
        if (item) {
            item.highlighted = true;
            item.scrollIntoViewIfNeeded();
        }
    }

    private _activateItem(item: UiCommandItem) {
        item.dispatchEvent(new CustomEvent('ui-command-item-select', {
            bubbles: true,
            composed: true,
            detail: { value: item.value || item.textContent?.trim() || '' },
        }));
    }

    private _applyFilter(query: string) {
        this._query = query;
        const q = query.toLowerCase();

        /* 1. Show/hide individual items. */
        const allItems = [...this.querySelectorAll('ui-command-item')] as UiCommandItem[];
        let visibleCount = 0;

        for (const item of allItems) {
            const text = (item.value || item.textContent || '').toLowerCase().trim();
            const matches = q === '' || text.includes(q);
            item.hidden = !matches;
            if (matches) visibleCount++;
        }

        /* 2. Hide groups where all child items are hidden (or the group has no items). */
        const groups = [...this.querySelectorAll('ui-command-group')] as UiCommandGroup[];
        for (const group of groups) {
            const groupItems = [...group.querySelectorAll('ui-command-item')] as UiCommandItem[];
            group.hidden = groupItems.length === 0 || groupItems.every((i) => i.hidden);
        }

        /* 3. Toggle empty-state element. */
        const empty = this.querySelector('ui-command-empty') as UiCommandEmpty | null;
        if (empty) empty.hidden = visibleCount > 0;

        /* 4. Hide orphaned separators — only shown when visible content exists on both sides. */
        const listEl = this.querySelector('ui-command-list');
        if (listEl) {
            const listChildren = [...listEl.children] as HTMLElement[];
            const isVisibleContent = (el: HTMLElement) =>
                el.tagName.toLowerCase() !== 'ui-command-separator' &&
                el.tagName.toLowerCase() !== 'ui-command-empty' &&
                !el.hidden;
            for (const child of listChildren) {
                if (child.tagName.toLowerCase() !== 'ui-command-separator') continue;
                const idx = listChildren.indexOf(child);
                const hasBefore = listChildren.slice(0, idx).some(isVisibleContent);
                const hasAfter  = listChildren.slice(idx + 1).some(isVisibleContent);
                child.hidden = !hasBefore || !hasAfter;
            }
        }

        /* 5. Move keyboard highlight to first navigable item. */
        this._setHighlight(this._getNavigableItems()[0] ?? null);
    }

    /* ── Slot change — initialise state once children are assigned ─────────── */

    private _onSlotChange() {
        this._applyFilter(this._query);
    }

    /* ── Public API ────────────────────────────────────────────────────────── */

    /** Reset search query and restore all items. */
    reset() {
        const input = this.querySelector('ui-command-input') as UiCommandInput | null;
        if (input) {
            input.reset(); // fires _cmd-filter → _applyFilter('') handles the rest
        } else {
            this._applyFilter('');
        }
    }

    render() {
        return html`
            <div class="command" part="command">
                <slot @slotchange=${this._onSlotChange}></slot>
            </div>
        `;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-command-dialog                                                   */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Modal dialog wrapper for a command menu. Opens with a smooth backdrop + scale
 * animation. Pressing `Escape` or clicking the backdrop fires `ui-command-dialog-close`.
 *
 * @slot - Place a `ui-command` element here.
 *
 * @fires ui-command-dialog-close - Fired when the dialog should close.
 *   The host is responsible for setting `open = false` in response.
 *
 * @attr {boolean} open - Controls dialog visibility.
 *
 * @example
 * <ui-command-dialog .open=${open} @ui-command-dialog-close=${() => open = false}>
 *   <ui-command>
 *     <ui-command-input></ui-command-input>
 *     <ui-command-list>...</ui-command-list>
 *   </ui-command>
 * </ui-command-dialog>
 */
@customElement('ui-command-dialog')
export class UiCommandDialog extends LitElement {
    static styles = css`
        :host { display: block; }

        .backdrop {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: var(--ui-command-z-index, 1400);
            display: flex;
            align-items: flex-start;
            justify-content: center;
            padding-top: 12vh;

            opacity: 0;
            pointer-events: none;
            transition: opacity 0.18s ease;
        }

        .backdrop.open {
            opacity: 1;
            pointer-events: auto;
        }

        .panel {
            width: 100%;
            max-width: var(--ui-command-dialog-width, 512px);
            background: var(--ui-surface-background, #fff);
            border-radius: var(--ui-border-radius-md, 8px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15),
                        0 10px 10px -5px rgba(0, 0, 0, 0.06);
            overflow: hidden;

            transform: scale(0.94) translateY(-8px);
            transition: transform 0.18s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .backdrop.open .panel {
            transform: scale(1) translateY(0);
        }
    `;

    /** Controls the open/closed state of the dialog. */
    @property({ type: Boolean, reflect: true }) open = false;

    /* ── Escape key handling (window-level) ───────────────────────────────── */

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
        super.disconnectedCallback();
        window.removeEventListener('keydown', this._boundKeyDown);
    }

    /* ── Open/close side-effects ──────────────────────────────────────────── */

    updated(changed: PropertyValues) {
        if (!changed.has('open')) return;

        if (this.open) {
            requestAnimationFrame(() => {
                (this.querySelector('ui-command-input') as UiCommandInput | null)?.focus();
            });
        } else {
            /* Reset command state when the dialog is dismissed. */
            (this.querySelector('ui-command') as UiCommand | null)?.reset();
        }
    }

    private _close() {
        this.dispatchEvent(new CustomEvent('ui-command-dialog-close', {
            bubbles: true,
            composed: true,
        }));
    }

    private _handleBackdropClick(e: MouseEvent) {
        if (e.target === e.currentTarget) this._close();
    }

    render() {
        return html`
            <div
                class=${classMap({ backdrop: true, open: this.open })}
                aria-hidden=${this.open ? 'false' : 'true'}
                @click=${this._handleBackdropClick}
            >
                <div
                    class="panel"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Command menu"
                >
                    <slot></slot>
                </div>
            </div>
        `;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  Global element registry                                             */
/* ─────────────────────────────────────────────────────────────────── */

declare global {
    interface HTMLElementTagNameMap {
        'ui-command': UiCommand;
        'ui-command-input': UiCommandInput;
        'ui-command-list': UiCommandList;
        'ui-command-empty': UiCommandEmpty;
        'ui-command-group': UiCommandGroup;
        'ui-command-item': UiCommandItem;
        'ui-command-separator': UiCommandSeparator;
        'ui-command-shortcut': UiCommandShortcut;
        'ui-command-dialog': UiCommandDialog;
    }
}
