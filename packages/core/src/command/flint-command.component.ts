import { unsafeCSS, html, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import uiCommandShortcutStyles from './flint-command-shortcut.css?inline';
import uiCommandSeparatorStyles from './flint-command-separator.css?inline';
import uiCommandItemStyles from './flint-command-item.css?inline';
import uiCommandEmptyStyles from './flint-command-empty.css?inline';
import uiCommandGroupStyles from './flint-command-group.css?inline';
import uiCommandListStyles from './flint-command-list.css?inline';
import uiCommandInputStyles from './flint-command-input.css?inline';
import uiCommandStyles from './flint-command.css?inline';
import uiCommandDialogStyles from './flint-command-dialog.css?inline';
import { FlintElement } from '../flint-element.js';
import { LocalizeController } from '../utilities/localize.js';

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-command-shortcut                                                 */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Displays a keyboard shortcut hint inside a command item.
 * Slot the shortcut string (e.g. `⌘P`) as default slot content.
 *
 * @slot - Shortcut text, e.g. `⌘P` or `Ctrl+K`.
 */
export class FlintCommandShortcut extends FlintElement {
    static styles = unsafeCSS(uiCommandShortcutStyles);
    render() { return html`<slot></slot>`; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-command-separator                                                */
/* ─────────────────────────────────────────────────────────────────── */

/** A hairline separator between command groups. */
export class FlintCommandSeparator extends FlintElement {
    static styles = unsafeCSS(uiCommandSeparatorStyles);
    render() { return html``; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-command-item                                                     */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * A single interactive option inside a command menu.
 *
 * @slot          - Item label text.
 * @slot icon     - Leading icon (16×16).
 * @slot shortcut - Trailing shortcut hint; prefer `<flint-command-shortcut>`.
 *
 * @fires flint-command-item-select - Fired when the item is activated.
 *   detail: `{ value: string }`
 *
 * @attr {string}  value       - Search value used for filtering. Defaults to text content.
 * @attr {boolean} disabled    - Makes the item non-interactive.
 * @attr {boolean} highlighted - Set by parent to show keyboard focus.
 */
export class FlintCommandItem extends FlintElement {
    static styles = unsafeCSS(uiCommandItemStyles);

    /** Machine-readable value used for filter matching. Falls back to textContent. */
    @property({ type: String, reflect: true }) value = '';

    /** Disables the item — non-interactive and skipped in keyboard nav. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    /** Set by parent `flint-command` to indicate keyboard focus. */
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
        this.dispatchEvent(new CustomEvent('flint-command-item-select', {
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
/*  flint-command-empty                                                    */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Empty state message shown when no command items match the current query.
 * Managed automatically by the parent `flint-command` element.
 *
 * @slot - Message text, e.g. "No results found."
 */
export class FlintCommandEmpty extends FlintElement {
    static styles = unsafeCSS(uiCommandEmptyStyles);
    render() { return html`<slot></slot>`; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-command-group                                                    */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * A labeled group of command items. The parent `flint-command` automatically
 * hides the whole group when all its items are filtered out.
 *
 * @slot - `flint-command-item` elements.
 * @attr {string} heading - Group label shown above the items.
 */
export class FlintCommandGroup extends FlintElement {
    static styles = unsafeCSS(uiCommandGroupStyles);

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
/*  flint-command-list                                                     */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Scrollable list container for command items and groups.
 *
 * @slot - `flint-command-group`, `flint-command-item`, `flint-command-empty`, `flint-command-separator`.
 */
export class FlintCommandList extends FlintElement {
    static styles = unsafeCSS(uiCommandListStyles);

    private _localize = new LocalizeController(this);

    render() {
        return html`
            <div class="list" role="listbox" tabindex="0" aria-label=${this._localize.term('commandResults')}>
                <slot></slot>
            </div>
        `;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-command-input                                                    */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Search input for the command menu. Dispatches `_cmd-filter` events that
 * the parent `flint-command` intercepts to apply filtering.
 *
 * @attr {string} placeholder - Input placeholder text.
 * @attr {string} value       - Current input value (reflected).
 */
export class FlintCommandInput extends FlintElement {
    static styles = unsafeCSS(uiCommandInputStyles);

    private _localize = new LocalizeController(this);

    /** Placeholder text shown when input is empty. */
    @property({ type: String }) placeholder = '';

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
                    placeholder=${this.placeholder || this._localize.term('typeCommandOrSearch')}
                    aria-label=${this._localize.term('searchCommands')}
                    @input=${this._handleInput}
                    autocomplete="off"
                    spellcheck="false"
                />
            </div>
        `;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-command                                                          */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Root command menu component. Manages search filtering and keyboard navigation.
 *
 * Compose it with `flint-command-input`, `flint-command-list`, `flint-command-group`,
 * `flint-command-item`, `flint-command-separator`, and `flint-command-empty`.
 *
 * @slot - Command menu content.
 *
 * @fires flint-command-item-select - Bubbles up from activated items.
 *   detail: `{ value: string }`
 *
 * @csspart command - The root wrapper div.
 *
 * @example
 * <flint-command>
 *   <flint-command-input placeholder="Search..."></flint-command-input>
 *   <flint-command-list>
 *     <flint-command-empty>No results found.</flint-command-empty>
 *     <flint-command-group heading="Suggestions">
 *       <flint-command-item value="calendar">Calendar</flint-command-item>
 *     </flint-command-group>
 *   </flint-command-list>
 * </flint-command>
 */
export class FlintCommand extends FlintElement {
    static styles = unsafeCSS(uiCommandStyles);

    private _query = '';
    private _highlightedItem: FlintCommandItem | null = null;

    /* ── Event handlers (arrow functions = auto-bound, safe to add/remove) ── */

    private _handleFilter = (e: Event) => {
        this._applyFilter((e as CustomEvent<{ query: string }>).detail.query);
    };

    /**
     * Sync keyboard highlight with mouse hover so arrow-key navigation always
     * continues from the item the pointer last touched.
     */
    private _handleMouseOver = (e: MouseEvent) => {
        const target = e.target as Element;
        if (target.tagName?.toLowerCase() !== 'flint-command-item') return;
        const item = target as FlintCommandItem;
        if (!item.disabled && !item.hidden) {
            this._setHighlight(item, false);
        }
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
        this.addEventListener('mouseover', this._handleMouseOver);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('_cmd-filter', this._handleFilter);
        this.removeEventListener('keydown', this._handleKeyDown);
        this.removeEventListener('mouseover', this._handleMouseOver);
    }

    /* ── Private helpers ───────────────────────────────────────────────────── */

    /** Items that can receive keyboard highlight (visible + not disabled). */
    private _getNavigableItems(): FlintCommandItem[] {
        return [...this.querySelectorAll('flint-command-item')].filter(
            (el) => !el.hidden && !(el as FlintCommandItem).disabled
        ) as FlintCommandItem[];
    }

    private _setHighlight(item: FlintCommandItem | null, scrollIntoView = true) {
        if (this._highlightedItem) this._highlightedItem.highlighted = false;
        this._highlightedItem = item;
        if (item) {
            item.highlighted = true;
            if (scrollIntoView) {
                item.scrollIntoViewIfNeeded();
            }
        }
    }

    private _activateItem(item: FlintCommandItem) {
        item.dispatchEvent(new CustomEvent('flint-command-item-select', {
            bubbles: true,
            composed: true,
            detail: { value: item.value || item.textContent?.trim() || '' },
        }));
    }

    private _applyFilter(query: string) {
        this._query = query;
        const q = query.toLowerCase();

        /* 1. Show/hide individual items. */
        const allItems = [...this.querySelectorAll('flint-command-item')] as FlintCommandItem[];
        let visibleCount = 0;

        for (const item of allItems) {
            const text = (item.value || item.textContent || '').toLowerCase().trim();
            const matches = q === '' || text.includes(q);
            item.hidden = !matches;
            if (matches) visibleCount++;
        }

        /* 2. Hide groups where all child items are hidden (or the group has no items). */
        const groups = [...this.querySelectorAll('flint-command-group')] as FlintCommandGroup[];
        for (const group of groups) {
            const groupItems = [...group.querySelectorAll('flint-command-item')] as FlintCommandItem[];
            group.hidden = groupItems.length === 0 || groupItems.every((i) => i.hidden);
        }

        /* 3. Toggle empty-state element. */
        const empty = this.querySelector('flint-command-empty') as FlintCommandEmpty | null;
        if (empty) empty.hidden = visibleCount > 0;

        /* 4. Hide orphaned separators — only shown when visible content exists on both sides. */
        const listEl = this.querySelector('flint-command-list');
        if (listEl) {
            const listChildren = [...listEl.children] as HTMLElement[];
            const isVisibleContent = (el: HTMLElement) =>
                el.tagName.toLowerCase() !== 'flint-command-separator' &&
                el.tagName.toLowerCase() !== 'flint-command-empty' &&
                !el.hidden;
            for (const child of listChildren) {
                if (child.tagName.toLowerCase() !== 'flint-command-separator') continue;
                const idx = listChildren.indexOf(child);
                const hasBefore = listChildren.slice(0, idx).some(isVisibleContent);
                const hasAfter  = listChildren.slice(idx + 1).some(isVisibleContent);
                child.hidden = !hasBefore || !hasAfter;
            }
        }

        /* 5. Move keyboard highlight to first navigable item (without scrolling on initial load). */
        this._setHighlight(this._getNavigableItems()[0] ?? null, false);
    }

    /* ── Slot change — initialise state once children are assigned ─────────── */

    private _onSlotChange() {
        this._applyFilter(this._query);
    }

    /* ── Public API ────────────────────────────────────────────────────────── */

    /** Reset search query and restore all items. */
    reset() {
        const input = this.querySelector('flint-command-input') as FlintCommandInput | null;
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
/*  flint-command-dialog                                                   */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Modal dialog wrapper for a command menu. Opens with a smooth backdrop + scale
 * animation. Pressing `Escape` or clicking the backdrop fires `flint-command-dialog-close`.
 *
 * @slot - Place a `flint-command` element here.
 *
 * @fires flint-command-dialog-close - Fired when the dialog should close. detail: `{ open: false }`
 *   The host is responsible for setting `open = false` in response.
 *
 * @attr {boolean} open - Controls dialog visibility.
 *
 * @example
 * <flint-command-dialog .open=${open} @flint-command-dialog-close=${() => open = false}>
 *   <flint-command>
 *     <flint-command-input></flint-command-input>
 *     <flint-command-list>...</flint-command-list>
 *   </flint-command>
 * </flint-command-dialog>
 */
export class FlintCommandDialog extends FlintElement {
    static styles = unsafeCSS(uiCommandDialogStyles);

    private _localize = new LocalizeController(this);

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
                (this.querySelector('flint-command-input') as FlintCommandInput | null)?.focus();
            });
        } else {
            /* Reset command state when the dialog is dismissed. */
            (this.querySelector('flint-command') as FlintCommand | null)?.reset();
        }
    }

    private _close() {
        this.dispatchEvent(new CustomEvent('flint-command-dialog-close', {
            bubbles: true,
            composed: true,
            detail: { open: false },
        }));
    }

    private _handleBackdropClick(e: MouseEvent) {
        if (e.target === e.currentTarget) this._close();
    }

    render() {
        return html`
            <div
                class=${classMap({ backdrop: true, open: this.open })}
                ?inert=${!this.open}
                @click=${this._handleBackdropClick}
            >
                <div
                    class="panel"
                    role="dialog"
                    aria-modal="true"
                    aria-label=${this._localize.term('commandMenu')}
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
        'flint-command': FlintCommand;
        'flint-command-input': FlintCommandInput;
        'flint-command-list': FlintCommandList;
        'flint-command-empty': FlintCommandEmpty;
        'flint-command-group': FlintCommandGroup;
        'flint-command-item': FlintCommandItem;
        'flint-command-separator': FlintCommandSeparator;
        'flint-command-shortcut': FlintCommandShortcut;
        'flint-command-dialog': FlintCommandDialog;
    }
}
