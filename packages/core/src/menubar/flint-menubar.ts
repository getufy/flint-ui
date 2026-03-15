import { LitElement, unsafeCSS, html, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import uiMenubarShortcutStyles from './flint-menubar-shortcut.css?inline';
import uiMenubarSeparatorStyles from './flint-menubar-separator.css?inline';
import uiMenubarGroupStyles from './flint-menubar-group.css?inline';
import uiMenubarItemStyles from './flint-menubar-item.css?inline';
import uiMenubarCheckboxItemStyles from './flint-menubar-checkbox-item.css?inline';
import uiMenubarRadioItemStyles from './flint-menubar-radio-item.css?inline';
import uiMenubarRadioGroupStyles from './flint-menubar-radio-group.css?inline';
import uiMenubarSubContentStyles from './flint-menubar-sub-content.css?inline';
import uiMenubarSubTriggerStyles from './flint-menubar-sub-trigger.css?inline';
import uiMenubarSubStyles from './flint-menubar-sub.css?inline';
import uiMenubarContentStyles from './flint-menubar-content.css?inline';
import uiMenubarTriggerStyles from './flint-menubar-trigger.css?inline';
import uiMenubarMenuStyles from './flint-menubar-menu.css?inline';
import uiMenubarStyles from './flint-menubar.css?inline';

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-menubar-shortcut                                               */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Displays a keyboard shortcut hint inside a menu item.
 * @slot - Shortcut text, e.g. `⌘T` or `Ctrl+N`.
 */
@customElement('flint-menubar-shortcut')
export class FlintMenubarShortcut extends LitElement {
    static styles = unsafeCSS(uiMenubarShortcutStyles);
    render() { return html`<slot></slot>`; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-menubar-separator                                              */
/* ─────────────────────────────────────────────────────────────────── */

/** A hairline separator between menu groups. */
@customElement('flint-menubar-separator')
export class FlintMenubarSeparator extends LitElement {
    static styles = unsafeCSS(uiMenubarSeparatorStyles);
    render() { return html``; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-menubar-group                                                  */
/* ─────────────────────────────────────────────────────────────────── */

/** Groups related menu items. Optional `heading` shows a label. */
@customElement('flint-menubar-group')
export class FlintMenubarGroup extends LitElement {
    /** Label text displayed above the group. */
    @property({ reflect: true }) heading = '';

    static styles = unsafeCSS(uiMenubarGroupStyles);
    render() {
        return html`
            ${this.heading ? html`<div class="heading" role="presentation">${this.heading}</div>` : nothing}
            <div role="group" aria-label=${this.heading || nothing}>
                <slot></slot>
            </div>
        `;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-menubar-item                                                   */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * A single interactive option inside a menubar dropdown.
 *
 * @slot - Item label text plus optional `<flint-menubar-shortcut>`.
 * @fires flint-menubar-item-select - Fired on activation. detail: `{ value: string }`
 */
@customElement('flint-menubar-item')
export class FlintMenubarItem extends LitElement {
    /** Whether the item is non-interactive. */
    @property({ reflect: true, type: Boolean }) disabled = false;
    /** Whether the item is visually highlighted (e.g. via keyboard or hover). */
    @property({ reflect: true, type: Boolean }) highlighted = false;
    /** Whether the item label is inset to align with checkbox/radio items. */
    @property({ reflect: true, type: Boolean }) inset = false;
    /** Explicit value for the select event. Falls back to label text (excludes shortcut). */
    @property({ reflect: true }) value = '';

    static styles = unsafeCSS(uiMenubarItemStyles);

    connectedCallback() {
        super.connectedCallback();
        if (!this.hasAttribute('role')) this.setAttribute('role', 'menuitem');
    }

    /** Returns label text from direct text nodes only (excludes shortcut element content). */
    private _labelText(): string {
        return Array.from(this.childNodes)
            .filter(n => n.nodeType === Node.TEXT_NODE)
            .map(n => n.textContent ?? '')
            .join('')
            .trim();
    }

    /** Activate the item — fires select event. */
    select() {
        if (this.disabled) return;
        this.dispatchEvent(new CustomEvent('flint-menubar-item-select', {
            bubbles: true, composed: true,
            detail: { value: this.value || this._labelText() },
        }));
    }

    render() {
        return html`<div class="item" role="menuitem" aria-disabled=${this.disabled ? 'true' : nothing}><slot></slot></div>`;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-menubar-checkbox-item                                          */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * A toggleable checkbox menu item.
 *
 * @fires flint-menubar-checkbox-change - detail: `{ checked: boolean, value: string }`
 */
@customElement('flint-menubar-checkbox-item')
export class FlintMenubarCheckboxItem extends LitElement {
    /** Whether the checkbox item is currently checked. */
    @property({ reflect: true, type: Boolean }) checked = false;
    /** Whether the item is non-interactive. */
    @property({ reflect: true, type: Boolean }) disabled = false;
    /** Whether the item is visually highlighted (e.g. via keyboard or hover). */
    @property({ reflect: true, type: Boolean }) highlighted = false;
    /** Explicit value for the change event. Falls back to label text (excludes shortcut). */
    @property({ reflect: true }) value = '';

    static styles = unsafeCSS(uiMenubarCheckboxItemStyles);

    connectedCallback() {
        super.connectedCallback();
        if (!this.hasAttribute('role')) this.setAttribute('role', 'menuitemcheckbox');
    }

    private _labelText(): string {
        return Array.from(this.childNodes)
            .filter(n => n.nodeType === Node.TEXT_NODE)
            .map(n => n.textContent ?? '')
            .join('')
            .trim();
    }

    toggle() {
        if (this.disabled) return;
        this.checked = !this.checked;
        this.dispatchEvent(new CustomEvent('flint-menubar-checkbox-change', {
            bubbles: true, composed: true,
            detail: { checked: this.checked, value: this.value || this._labelText() },
        }));
    }

    render() {
        return html`
            <div class="item" role="menuitemcheckbox" aria-checked=${this.checked ? 'true' : 'false'} aria-disabled=${this.disabled ? 'true' : nothing}>
                <span class="check">
                    ${this.checked ? html`<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.5 3.5L5.5 9.5L2.5 6.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>` : nothing}
                </span>
                <slot></slot>
            </div>
        `;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-menubar-radio-item                                             */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * A radio option inside a `<flint-menubar-radio-group>`.
 */
@customElement('flint-menubar-radio-item')
export class FlintMenubarRadioItem extends LitElement {
    /** Value identifying this radio option within its group. */
    @property({ reflect: true }) value = '';
    /** Whether this radio item is currently selected. */
    @property({ reflect: true, type: Boolean }) checked = false;
    /** Whether the item is non-interactive. */
    @property({ reflect: true, type: Boolean }) disabled = false;
    /** Whether the item is visually highlighted (e.g. via keyboard or hover). */
    @property({ reflect: true, type: Boolean }) highlighted = false;

    static styles = unsafeCSS(uiMenubarRadioItemStyles);

    connectedCallback() {
        super.connectedCallback();
        if (!this.hasAttribute('role')) this.setAttribute('role', 'menuitemradio');
    }

    select() {
        if (this.disabled) return;
        this.dispatchEvent(new CustomEvent('flint-menubar-radio-select', {
            bubbles: true, composed: true,
            detail: { value: this.value },
        }));
    }

    render() {
        return html`
            <div class="item" role="menuitemradio" aria-checked=${this.checked ? 'true' : 'false'} aria-disabled=${this.disabled ? 'true' : nothing}>
                <span class="dot">
                    ${this.checked ? html`<svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="currentColor"></circle></svg>` : nothing}
                </span>
                <slot></slot>
            </div>
        `;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-menubar-radio-group                                            */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Manages single-select radio items.
 *
 * @fires flint-menubar-radio-change - detail: `{ value: string }`
 */
@customElement('flint-menubar-radio-group')
export class FlintMenubarRadioGroup extends LitElement {
    /** The value of the currently selected radio item. */
    @property({ reflect: true }) value = '';

    static styles = unsafeCSS(uiMenubarRadioGroupStyles);

    private _handleRadioSelect = (e: Event) => {
        const ce = e as CustomEvent<{ value: string }>;
        ce.stopPropagation();
        this.value = ce.detail.value;
        this._syncChecked();
        this.dispatchEvent(new CustomEvent('flint-menubar-radio-change', {
            bubbles: true, composed: true,
            detail: { value: this.value },
        }));
    };

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('flint-menubar-radio-select', this._handleRadioSelect);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('flint-menubar-radio-select', this._handleRadioSelect);
    }

    override updated(changed: PropertyValues) {
        if (changed.has('value')) {
            this._syncChecked();
        }
    }

    private _syncChecked() {
        const items = this.querySelectorAll<FlintMenubarRadioItem>('flint-menubar-radio-item');
        items.forEach(item => {
            item.checked = item.value === this.value;
        });
    }

    private _onSlotChange = () => { this._syncChecked(); };

    render() {
        return html`<div role="group"><slot @slotchange=${this._onSlotChange}></slot></div>`;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-menubar-sub-content                                            */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * The dropdown panel of a sub-menu. Positioned to the right of the trigger.
 * Auto-flips left when the panel would overflow the viewport edge.
 */
@customElement('flint-menubar-sub-content')
export class FlintMenubarSubContent extends LitElement {
    /** Whether the sub-menu dropdown panel is visible. */
    @property({ reflect: true, type: Boolean }) open = false;

    static styles = unsafeCSS(uiMenubarSubContentStyles);

    override updated(changed: PropertyValues) {
        if (changed.has('open') && this.open) {
            // Flip left if overflowing viewport right edge
            requestAnimationFrame(() => {
                const rect = this.getBoundingClientRect();
                if (rect.right > window.innerWidth) {
                    this.style.left = 'auto';
                    this.style.right = '100%';
                } else {
                    this.style.left = '';
                    this.style.right = '';
                }
            });
        }
    }

    render() {
        return html`<div class="panel" role="menu"><slot></slot></div>`;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-menubar-sub-trigger                                            */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Trigger for a sub-menu. Shows an arrow indicator.
 */
@customElement('flint-menubar-sub-trigger')
export class FlintMenubarSubTrigger extends LitElement {
    /** Whether the trigger is visually highlighted (e.g. via keyboard or hover). */
    @property({ reflect: true, type: Boolean }) highlighted = false;
    /** Whether the trigger is non-interactive. */
    @property({ reflect: true, type: Boolean }) disabled = false;
    /** Whether the trigger label is inset to align with checkbox/radio items. */
    @property({ reflect: true, type: Boolean }) inset = false;
    /** Set by the parent `flint-menubar-sub` to reflect open state for aria-expanded. */
    @property({ reflect: true, type: Boolean }) expanded = false;

    static styles = unsafeCSS(uiMenubarSubTriggerStyles);

    connectedCallback() {
        super.connectedCallback();
        if (!this.hasAttribute('role')) this.setAttribute('role', 'menuitem');
    }

    render() {
        return html`
            <div class="item"
                role="menuitem"
                aria-haspopup="menu"
                aria-expanded=${this.expanded ? 'true' : 'false'}
                aria-disabled=${this.disabled ? 'true' : nothing}>
                <slot></slot>
                <svg class="arrow" viewBox="0 0 14 14" fill="none">
                    <path d="M5 3L9 7L5 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </div>
        `;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-menubar-sub                                                    */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Wraps a sub-trigger and sub-content pair.
 * Opens on hover/focus and ArrowRight; closes on ArrowLeft or blur.
 */
@customElement('flint-menubar-sub')
export class FlintMenubarSub extends LitElement {
    private _open = false;
    private _openTimer: ReturnType<typeof setTimeout> | null = null;
    private _closeTimer: ReturnType<typeof setTimeout> | null = null;

    static styles = unsafeCSS(uiMenubarSubStyles);

    get open() { return this._open; }

    show() {
        if (this._closeTimer) { clearTimeout(this._closeTimer); this._closeTimer = null; }
        this._openTimer = setTimeout(() => {
            this._open = true;
            this._syncState();
        }, 80);
    }

    /** Opens the sub-menu immediately without the hover delay. Use for keyboard interactions. */
    showImmediate() {
        if (this._openTimer) { clearTimeout(this._openTimer); this._openTimer = null; }
        if (this._closeTimer) { clearTimeout(this._closeTimer); this._closeTimer = null; }
        this._open = true;
        this._syncState();
    }

    hide() {
        if (this._openTimer) { clearTimeout(this._openTimer); this._openTimer = null; }
        this._closeTimer = setTimeout(() => {
            this._open = false;
            this._syncState();
        }, 60);
    }

    hideImmediate() {
        if (this._openTimer) { clearTimeout(this._openTimer); this._openTimer = null; }
        if (this._closeTimer) { clearTimeout(this._closeTimer); this._closeTimer = null; }
        this._open = false;
        this._syncState();
    }

    private _syncState() {
        const content = this.querySelector<FlintMenubarSubContent>(':scope > flint-menubar-sub-content');
        if (content) content.open = this._open;
        const trigger = this.querySelector<FlintMenubarSubTrigger>(':scope > flint-menubar-sub-trigger');
        if (trigger) {
            trigger.highlighted = this._open;
            trigger.expanded = this._open;
        }
    }

    private _handleMouseEnter = () => { this.show(); };
    private _handleMouseLeave = () => { this.hide(); };

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('mouseenter', this._handleMouseEnter);
        this.addEventListener('mouseleave', this._handleMouseLeave);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('mouseenter', this._handleMouseEnter);
        this.removeEventListener('mouseleave', this._handleMouseLeave);
        if (this._openTimer) clearTimeout(this._openTimer);
        if (this._closeTimer) clearTimeout(this._closeTimer);
    }

    render() {
        return html`<slot></slot>`;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-menubar-content                                                */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * The dropdown content panel for a menubar menu.
 * Positioned absolutely below the trigger.
 */
@customElement('flint-menubar-content')
export class FlintMenubarContent extends LitElement {
    /** Whether the content dropdown panel is visible. */
    @property({ reflect: true, type: Boolean }) open = false;

    /** Currently highlighted item index for keyboard nav */
    private _highlightIndex = -1;

    static styles = unsafeCSS(uiMenubarContentStyles);

    /** Get all navigable items (items, checkbox items, radio items, sub-triggers). */
    private _getNavigableItems(): HTMLElement[] {
        const selectors = [
            'flint-menubar-item:not([disabled]):not([hidden])',
            'flint-menubar-checkbox-item:not([disabled]):not([hidden])',
            'flint-menubar-radio-item:not([disabled]):not([hidden])',
            'flint-menubar-sub-trigger:not([disabled]):not([hidden])',
        ].join(',');
        return Array.from(this.querySelectorAll<HTMLElement>(selectors));
    }

    private _clearHighlight() {
        const items = this._getNavigableItems();
        items.forEach(item => (item as HTMLElement & { highlighted: boolean }).highlighted = false);
        this._highlightIndex = -1;
    }

    private _highlightItem(index: number) {
        const items = this._getNavigableItems();
        if (items.length === 0) return;
        this._clearHighlight();
        this._highlightIndex = ((index % items.length) + items.length) % items.length;
        const target = items[this._highlightIndex] as HTMLElement & { highlighted: boolean };
        target.highlighted = true;
    }

    /** Handle keyboard navigation inside the content panel. */
    handleKeyDown(e: KeyboardEvent) {
        const items = this._getNavigableItems();

        switch (e.key) {
            case 'ArrowDown': {
                e.preventDefault();
                if (items.length === 0) return;
                this._highlightItem(this._highlightIndex + 1);
                break;
            }
            case 'ArrowUp': {
                e.preventDefault();
                if (items.length === 0) return;
                this._highlightItem(this._highlightIndex - 1);
                break;
            }
            case 'Home': {
                e.preventDefault();
                if (items.length === 0) return;
                this._highlightItem(0);
                break;
            }
            case 'End': {
                e.preventDefault();
                if (items.length === 0) return;
                this._highlightItem(items.length - 1);
                break;
            }
            case 'Enter':
            case ' ': {
                e.preventDefault();
                if (this._highlightIndex >= 0 && this._highlightIndex < items.length) {
                    const target = items[this._highlightIndex];
                    if (target.tagName === 'FLINT-MENUBAR-ITEM') {
                        (target as FlintMenubarItem).select();
                        // Close the menu after selection
                        this._requestClose();
                    } else if (target.tagName === 'FLINT-MENUBAR-CHECKBOX-ITEM') {
                        (target as FlintMenubarCheckboxItem).toggle();
                    } else if (target.tagName === 'FLINT-MENUBAR-RADIO-ITEM') {
                        (target as FlintMenubarRadioItem).select();
                    } else if (target.tagName === 'FLINT-MENUBAR-SUB-TRIGGER') {
                        const sub = target.closest('flint-menubar-sub') as FlintMenubarSub | null;
                        if (sub) sub.showImmediate();
                    }
                }
                break;
            }
            case 'ArrowRight': {
                // Open sub-menu if highlighted item is a sub-trigger
                if (this._highlightIndex >= 0 && this._highlightIndex < items.length) {
                    const target = items[this._highlightIndex];
                    if (target.tagName === 'FLINT-MENUBAR-SUB-TRIGGER') {
                        e.preventDefault();
                        const sub = target.closest('flint-menubar-sub') as FlintMenubarSub | null;
                        if (sub) {
                            sub.showImmediate();
                            // Highlight first item in sub-content immediately
                            const subContent = sub.querySelector<FlintMenubarSubContent>('flint-menubar-sub-content');
                            if (subContent) {
                                const subItems = Array.from(subContent.querySelectorAll<HTMLElement>(
                                    'flint-menubar-item:not([disabled]),flint-menubar-checkbox-item:not([disabled]),flint-menubar-radio-item:not([disabled]),flint-menubar-sub-trigger:not([disabled])'
                                ));
                                if (subItems.length > 0) {
                                    (subItems[0] as HTMLElement & { highlighted: boolean }).highlighted = true;
                                }
                            }
                        }
                        return; // Don't propagate to menubar for menu switching
                    }
                }
                break;
            }
            case 'ArrowLeft': {
                // Close sub-menu if one is open
                const activeSub = Array.from(this.querySelectorAll<FlintMenubarSub>('flint-menubar-sub'))
                    .find(s => s.open);
                if (activeSub) {
                    e.preventDefault();
                    activeSub.hideImmediate();
                    return; // Don't propagate
                }
                break;
            }
            case 'Escape': {
                e.preventDefault();
                this._requestClose();
                break;
            }
            default: {
                // Typeahead: jump to first item starting with the pressed character
                if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
                    if (items.length === 0) return;
                    e.preventDefault();
                    const char = e.key.toLowerCase();
                    const start = this._highlightIndex >= 0 ? this._highlightIndex + 1 : 0;
                    for (let i = 0; i < items.length; i++) {
                        const idx = (start + i) % items.length;
                        const text = items[idx].textContent?.trim().toLowerCase() ?? '';
                        if (text.startsWith(char)) {
                            this._highlightItem(idx);
                            break;
                        }
                    }
                }
            }
        }
    }

    private _requestClose() {
        this.dispatchEvent(new CustomEvent('flint-menubar-request-close', {
            bubbles: true, composed: true,
            detail: { open: false },
        }));
    }

    resetHighlight() {
        this._clearHighlight();
    }

    /** Handle clicks on items inside the content. */
    private _handleClick = (e: Event) => {
        const target = e.target as HTMLElement;
        const item = target.closest('flint-menubar-item') as FlintMenubarItem | null;
        if (item && !item.disabled) {
            item.select();
            this._requestClose();
            return;
        }
        const cbItem = target.closest('flint-menubar-checkbox-item') as FlintMenubarCheckboxItem | null;
        if (cbItem && !cbItem.disabled) {
            cbItem.toggle();
            return; // Don't close on checkbox toggle
        }
        const radioItem = target.closest('flint-menubar-radio-item') as FlintMenubarRadioItem | null;
        if (radioItem && !radioItem.disabled) {
            radioItem.select();
            return; // Don't close on radio select
        }
    };

    private _handleMouseOver = (e: Event) => {
        const target = e.target as HTMLElement;
        const navigable = target.closest('flint-menubar-item, flint-menubar-checkbox-item, flint-menubar-radio-item, flint-menubar-sub-trigger') as HTMLElement & { highlighted: boolean; disabled: boolean } | null;
        if (navigable && !navigable.disabled) {
            this._clearHighlight();
            navigable.highlighted = true;
            const items = this._getNavigableItems();
            this._highlightIndex = items.indexOf(navigable);
        }
    };

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', this._handleClick);
        this.addEventListener('mouseover', this._handleMouseOver);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('click', this._handleClick);
        this.removeEventListener('mouseover', this._handleMouseOver);
    }

    render() {
        return html`<div class="panel" role="menu"><slot></slot></div>`;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-menubar-trigger                                                */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * The trigger button for a menubar menu.
 * @slot - Trigger label text.
 */
@customElement('flint-menubar-trigger')
export class FlintMenubarTrigger extends LitElement {
    /** Whether the trigger's associated menu is currently open. */
    @property({ reflect: true, type: Boolean }) active = false;
    /** Whether the trigger is non-interactive. */
    @property({ reflect: true, type: Boolean }) disabled = false;

    /**
     * Managed by the parent `flint-menubar` to implement roving tabindex.
     * Do not set directly.
     */
    @state() private _focusable = false;

    setFocusable(v: boolean) {
        this._focusable = v;
    }

    static styles = unsafeCSS(uiMenubarTriggerStyles);

    connectedCallback() {
        super.connectedCallback();
        if (!this.hasAttribute('role')) this.setAttribute('role', 'menuitem');
    }

    render() {
        return html`
            <button class="trigger"
                role="menuitem"
                aria-haspopup="true"
                aria-expanded=${this.active ? 'true' : 'false'}
                ?disabled=${this.disabled}
                tabindex=${this._focusable ? '0' : '-1'}>
                <slot></slot>
            </button>
        `;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-menubar-menu                                                   */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Wraps a trigger and content pair for a single menu in the menubar.
 */
@customElement('flint-menubar-menu')
export class FlintMenubarMenu extends LitElement {
    /** Disables this menu: the trigger is non-interactive and keyboard nav skips it. */
    @property({ reflect: true, type: Boolean }) disabled = false;

    static styles = unsafeCSS(uiMenubarMenuStyles);

    connectedCallback() {
        super.connectedCallback();
        if (!this.hasAttribute('role')) this.setAttribute('role', 'none');
    }

    get trigger(): FlintMenubarTrigger | null {
        return this.querySelector<FlintMenubarTrigger>(':scope > flint-menubar-trigger');
    }

    get content(): FlintMenubarContent | null {
        return this.querySelector<FlintMenubarContent>(':scope > flint-menubar-content');
    }

    override updated(changed: PropertyValues) {
        if (changed.has('disabled')) {
            const t = this.trigger;
            if (t) t.disabled = this.disabled;
        }
    }

    open() {
        if (this.disabled) return;
        const trigger = this.trigger;
        const content = this.content;
        if (trigger) trigger.active = true;
        if (content) { content.open = true; content.resetHighlight(); }
    }

    close() {
        const trigger = this.trigger;
        const content = this.content;
        if (trigger) trigger.active = false;
        if (content) {
            content.open = false;
            content.resetHighlight();
            // Close any open sub-menus
            this.querySelectorAll<FlintMenubarSub>('flint-menubar-sub').forEach(sub => sub.hideImmediate());
        }
    }

    get isOpen(): boolean {
        return this.content?.open ?? false;
    }

    render() {
        return html`<slot></slot>`;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-menubar                                                        */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * A visually persistent horizontal menu bar, common in desktop applications.
 * Hosts one or more `<flint-menubar-menu>` children.
 *
 * @slot - One or more `<flint-menubar-menu>` elements.
 *
 * @fires flint-menubar-item-select  - Bubbles from items.
 * @fires flint-menubar-checkbox-change - Bubbles from checkbox items.
 * @fires flint-menubar-radio-change - Bubbles from radio groups.
 *
 * @csspart bar - The menubar container.
 */
@customElement('flint-menubar')
export class FlintMenubar extends LitElement {
    /** Which menu (by index) is currently open. -1 = all closed. */
    private _activeIndex = -1;

    /** Accessible label for the menubar region. Defaults to "Menu bar". */
    @property({ reflect: true }) label = '';

    static styles = unsafeCSS(uiMenubarStyles);

    /** Index of the currently open menu, or -1 if all closed. */
    get activeIndex(): number { return this._activeIndex; }

    private _getMenus(): FlintMenubarMenu[] {
        return Array.from(this.querySelectorAll<FlintMenubarMenu>(':scope > flint-menubar-menu'));
    }

    /**
     * Updates the roving tabindex so exactly one trigger button is reachable via Tab.
     * The focusable trigger is the active (open) one, or the first non-disabled one when all closed.
     */
    private _updateTabFocus() {
        const menus = this._getMenus();
        const firstEnabled = menus.findIndex(m => !m.disabled);
        menus.forEach((menu, i) => {
            const trigger = menu.trigger;
            if (trigger) {
                trigger.setFocusable(
                    this._activeIndex === -1
                        ? i === firstEnabled
                        : i === this._activeIndex
                );
            }
        });
    }

    /** Open a menu by index and close others. Skips disabled menus. */
    private _openMenu(index: number) {
        const menus = this._getMenus();
        if (menus[index]?.disabled) return;
        menus.forEach((menu, i) => {
            if (i === index) menu.open();
            else menu.close();
        });
        this._activeIndex = index;
        this._updateTabFocus();
    }

    /** Close all menus. */
    closeAll() {
        const menus = this._getMenus();
        menus.forEach(menu => menu.close());
        this._activeIndex = -1;
        this._updateTabFocus();
    }

    /** Navigate to the next or previous menu, skipping disabled menus. */
    private _navigate(delta: number) {
        const menus = this._getMenus();
        if (menus.length === 0) return;
        let newIndex = this._activeIndex;
        for (let i = 0; i < menus.length; i++) {
            newIndex = ((newIndex + delta) % menus.length + menus.length) % menus.length;
            if (!menus[newIndex].disabled) break;
        }
        if (!menus[newIndex].disabled) this._openMenu(newIndex);
    }

    /** Handle trigger clicks */
    private _handleTriggerClick = (e: Event) => {
        const trigger = (e.target as HTMLElement).closest?.('flint-menubar-trigger');
        if (!trigger) return;

        const menu = trigger.closest('flint-menubar-menu') as FlintMenubarMenu | null;
        if (!menu || menu.disabled) return;

        const menus = this._getMenus();
        const index = menus.indexOf(menu);
        if (index === -1) return;

        if (this._activeIndex === index) {
            this.closeAll();
        } else {
            this._openMenu(index);
        }
    };

    /** Handle hover over triggers when a menu is already open */
    private _handleTriggerMouseEnter = (e: Event) => {
        if (this._activeIndex === -1) return; // No menu open; ignore hover

        const trigger = (e.target as HTMLElement).closest?.('flint-menubar-trigger');
        if (!trigger) return;

        const menu = trigger.closest('flint-menubar-menu') as FlintMenubarMenu | null;
        if (!menu || menu.disabled) return;

        const menus = this._getMenus();
        const index = menus.indexOf(menu);
        if (index !== -1 && index !== this._activeIndex) {
            this._openMenu(index);
        }
    };

    /** Handle keyboard navigation */
    private _handleKeyDown = (e: KeyboardEvent) => {
        const menus = this._getMenus();

        switch (e.key) {
            case 'ArrowRight': {
                if (this._activeIndex === -1) return;
                // If highlighted item is a sub-trigger, let the content handle it first
                const activeContent = menus[this._activeIndex]?.content;
                if (activeContent) {
                    const items = Array.from(activeContent.querySelectorAll<HTMLElement>(
                        'flint-menubar-item, flint-menubar-checkbox-item, flint-menubar-radio-item, flint-menubar-sub-trigger'
                    ));
                    const highlighted = items.find(i => (i as HTMLElement & { highlighted: boolean }).highlighted);
                    if (highlighted?.tagName === 'FLINT-MENUBAR-SUB-TRIGGER') {
                        activeContent.handleKeyDown(e);
                        return;
                    }
                }
                e.preventDefault();
                this._navigate(1);
                break;
            }
            case 'ArrowLeft': {
                if (this._activeIndex === -1) return;
                // Check if inside a sub-menu first
                const activeContent2 = menus[this._activeIndex]?.content;
                if (activeContent2) {
                    const openSub = Array.from(activeContent2.querySelectorAll<FlintMenubarSub>('flint-menubar-sub'))
                        .find(s => s.open);
                    if (openSub) {
                        activeContent2.handleKeyDown(e);
                        return;
                    }
                }
                e.preventDefault();
                this._navigate(-1);
                break;
            }
            case 'ArrowDown': {
                if (this._activeIndex === -1) {
                    // Open the first non-disabled menu
                    e.preventDefault();
                    const firstEnabled = menus.findIndex(m => !m.disabled);
                    if (firstEnabled === -1) return;
                    this._openMenu(firstEnabled);
                    const firstContent = menus[firstEnabled]?.content;
                    if (firstContent) firstContent.handleKeyDown(e);
                } else {
                    const content = menus[this._activeIndex]?.content;
                    if (content) content.handleKeyDown(e);
                }
                break;
            }
            case 'ArrowUp':
            case 'Home':
            case 'End':
            case 'Enter':
            case ' ': {
                if (this._activeIndex >= 0) {
                    const content = menus[this._activeIndex]?.content;
                    if (content) content.handleKeyDown(e);
                } else if (e.key === 'Enter' || e.key === ' ') {
                    // Open the focused menu
                    e.preventDefault();
                    const focused = this.querySelector<FlintMenubarTrigger>('flint-menubar-trigger[tabindex="0"]');
                    if (focused) {
                        const menu = focused.closest('flint-menubar-menu') as FlintMenubarMenu | null;
                        if (menu) {
                            const idx = menus.indexOf(menu);
                            if (idx !== -1) this._openMenu(idx);
                        }
                    }
                }
                break;
            }
            case 'Escape': {
                if (this._activeIndex >= 0) {
                    e.preventDefault();
                    const prevIndex = this._activeIndex;
                    this.closeAll();
                    // Return focus to the trigger
                    const trigger = menus[prevIndex]?.trigger;
                    const btn = trigger?.shadowRoot?.querySelector('button');
                    if (btn) btn.focus();
                }
                break;
            }
            case 'Tab': {
                // Close open menu but let Tab move focus naturally
                if (this._activeIndex >= 0) {
                    this.closeAll();
                }
                break;
            }
            default: {
                // Typeahead — delegate printable characters to the active content
                if (this._activeIndex >= 0 && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
                    const content = menus[this._activeIndex]?.content;
                    if (content) content.handleKeyDown(e);
                }
            }
        }
    };

    /** Close on request from content panel */
    private _handleRequestClose = () => {
        const prevIndex = this._activeIndex;
        this.closeAll();
        // Return focus to the trigger
        const menus = this._getMenus();
        const trigger = menus[prevIndex]?.trigger;
        const btn = trigger?.shadowRoot?.querySelector('button');
        if (btn) btn.focus();
    };

    /** Close on outside click */
    private _handleOutsideClick = (e: MouseEvent) => {
        if (this._activeIndex === -1) return;
        const path = e.composedPath();
        if (!path.includes(this)) {
            this.closeAll();
        }
    };

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', this._handleTriggerClick);
        this.addEventListener('mouseover', this._handleTriggerMouseEnter);
        this.addEventListener('keydown', this._handleKeyDown);
        this.addEventListener('flint-menubar-request-close', this._handleRequestClose);
        document.addEventListener('click', this._handleOutsideClick, true);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('click', this._handleTriggerClick);
        this.removeEventListener('mouseover', this._handleTriggerMouseEnter);
        this.removeEventListener('keydown', this._handleKeyDown);
        this.removeEventListener('flint-menubar-request-close', this._handleRequestClose);
        document.removeEventListener('click', this._handleOutsideClick, true);
    }

    private _onSlotChange = () => { this._updateTabFocus(); };

    override firstUpdated() {
        this._updateTabFocus();
    }

    render() {
        return html`
            <div part="bar" role="menubar" aria-label=${this.label || 'Menu bar'}>
                <slot @slotchange=${this._onSlotChange}></slot>
            </div>
        `;
    }
}
