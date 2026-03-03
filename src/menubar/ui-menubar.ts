import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-menubar-shortcut                                               */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Displays a keyboard shortcut hint inside a menu item.
 * @slot - Shortcut text, e.g. `⌘T` or `Ctrl+N`.
 */
@customElement('ui-menubar-shortcut')
export class UiMenubarShortcut extends LitElement {
    static styles = css`
        :host {
            display: inline-flex;
            align-items: center;
            margin-left: auto;
            padding-left: 16px;
            font-size: 0.6875rem;
            letter-spacing: 0.05em;
            color: var(--ui-text-color-muted, #6b7280);
            font-family: var(--ui-font-family, system-ui, sans-serif);
        }
    `;
    render() { return html`<slot></slot>`; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-menubar-separator                                              */
/* ─────────────────────────────────────────────────────────────────── */

/** A hairline separator between menu groups. */
@customElement('ui-menubar-separator')
export class UiMenubarSeparator extends LitElement {
    static styles = css`
        :host {
            display: block;
            height: 1px;
            background: var(--ui-border-color, #e5e7eb);
            margin: 4px -4px;
        }
        :host([hidden]) { display: none !important; }
    `;
    render() { return html``; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-menubar-group                                                  */
/* ─────────────────────────────────────────────────────────────────── */

/** Groups related menu items. Optional `heading` shows a label. */
@customElement('ui-menubar-group')
export class UiMenubarGroup extends LitElement {
    @property({ reflect: true }) heading = '';

    static styles = css`
        :host { display: block; }
        .heading {
            padding: 6px 8px 4px;
            font-size: 0.6875rem;
            font-weight: 600;
            color: var(--ui-text-color-muted, #6b7280);
            font-family: var(--ui-font-family, system-ui, sans-serif);
            user-select: none;
        }
    `;
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
/*  ui-menubar-item                                                   */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * A single interactive option inside a menubar dropdown.
 *
 * @slot - Item label text plus optional `<ui-menubar-shortcut>`.
 * @fires ui-menubar-item-select - Fired on activation. detail: `{ value: string }`
 */
@customElement('ui-menubar-item')
export class UiMenubarItem extends LitElement {
    @property({ reflect: true, type: Boolean }) disabled = false;
    @property({ reflect: true, type: Boolean }) highlighted = false;
    @property({ reflect: true, type: Boolean }) inset = false;

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

        :host([inset]) .item {
            padding-left: 32px;
        }

        :host([highlighted]) .item {
            background: var(--ui-menubar-highlight-bg, rgba(0, 0, 0, 0.06));
        }

        :host([disabled]) .item {
            opacity: 0.5;
            pointer-events: none;
            cursor: default;
        }
    `;

    /** Activate the item — fires select event. */
    select() {
        if (this.disabled) return;
        this.dispatchEvent(new CustomEvent('ui-menubar-item-select', {
            bubbles: true, composed: true,
            detail: { value: this.textContent?.trim() ?? '' },
        }));
    }

    render() {
        return html`<div class="item" role="menuitem" aria-disabled=${this.disabled}><slot></slot></div>`;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-menubar-checkbox-item                                          */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * A toggleable checkbox menu item.
 *
 * @fires ui-menubar-checkbox-change - detail: `{ checked: boolean, value: string }`
 */
@customElement('ui-menubar-checkbox-item')
export class UiMenubarCheckboxItem extends LitElement {
    @property({ reflect: true, type: Boolean }) checked = false;
    @property({ reflect: true, type: Boolean }) disabled = false;
    @property({ reflect: true, type: Boolean }) highlighted = false;

    static styles = css`
        :host { display: block; }
        :host([hidden]) { display: none !important; }

        .item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 6px 8px 6px 32px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.875rem;
            line-height: 1.25rem;
            color: var(--ui-text-color, #111827);
            font-family: var(--ui-font-family, system-ui, sans-serif);
            outline: none;
            user-select: none;
            transition: background 0.1s;
            position: relative;
        }

        :host([highlighted]) .item {
            background: var(--ui-menubar-highlight-bg, rgba(0, 0, 0, 0.06));
        }

        :host([disabled]) .item {
            opacity: 0.5;
            pointer-events: none;
        }

        .check {
            position: absolute;
            left: 8px;
            top: 50%;
            transform: translateY(-50%);
            width: 16px;
            height: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    `;

    toggle() {
        if (this.disabled) return;
        this.checked = !this.checked;
        this.dispatchEvent(new CustomEvent('ui-menubar-checkbox-change', {
            bubbles: true, composed: true,
            detail: { checked: this.checked, value: this.textContent?.trim() ?? '' },
        }));
    }

    render() {
        return html`
            <div class="item" role="menuitemcheckbox" aria-checked=${this.checked} aria-disabled=${this.disabled}>
                <span class="check">
                    ${this.checked ? html`<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.5 3.5L5.5 9.5L2.5 6.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>` : nothing}
                </span>
                <slot></slot>
            </div>
        `;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-menubar-radio-item                                             */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * A radio option inside a `<ui-menubar-radio-group>`.
 */
@customElement('ui-menubar-radio-item')
export class UiMenubarRadioItem extends LitElement {
    @property({ reflect: true }) value = '';
    @property({ reflect: true, type: Boolean }) checked = false;
    @property({ reflect: true, type: Boolean }) disabled = false;
    @property({ reflect: true, type: Boolean }) highlighted = false;

    static styles = css`
        :host { display: block; }
        :host([hidden]) { display: none !important; }

        .item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 6px 8px 6px 32px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.875rem;
            line-height: 1.25rem;
            color: var(--ui-text-color, #111827);
            font-family: var(--ui-font-family, system-ui, sans-serif);
            outline: none;
            user-select: none;
            transition: background 0.1s;
            position: relative;
        }

        :host([highlighted]) .item {
            background: var(--ui-menubar-highlight-bg, rgba(0, 0, 0, 0.06));
        }

        :host([disabled]) .item {
            opacity: 0.5;
            pointer-events: none;
        }

        .dot {
            position: absolute;
            left: 8px;
            top: 50%;
            transform: translateY(-50%);
            width: 16px;
            height: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    `;

    select() {
        if (this.disabled) return;
        this.dispatchEvent(new CustomEvent('_menubar-radio-select', {
            bubbles: true, composed: true,
            detail: { value: this.value },
        }));
    }

    render() {
        return html`
            <div class="item" role="menuitemradio" aria-checked=${this.checked} aria-disabled=${this.disabled}>
                <span class="dot">
                    ${this.checked ? html`<svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="currentColor"></circle></svg>` : nothing}
                </span>
                <slot></slot>
            </div>
        `;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-menubar-radio-group                                            */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Manages single-select radio items.
 *
 * @fires ui-menubar-radio-change - detail: `{ value: string }`
 */
@customElement('ui-menubar-radio-group')
export class UiMenubarRadioGroup extends LitElement {
    @property({ reflect: true }) value = '';

    static styles = css`
        :host { display: block; }
    `;

    private _handleRadioSelect = (e: Event) => {
        const ce = e as CustomEvent<{ value: string }>;
        ce.stopPropagation();
        this.value = ce.detail.value;
        this._syncChecked();
        this.dispatchEvent(new CustomEvent('ui-menubar-radio-change', {
            bubbles: true, composed: true,
            detail: { value: this.value },
        }));
    };

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('_menubar-radio-select', this._handleRadioSelect);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('_menubar-radio-select', this._handleRadioSelect);
    }

    override updated(changed: PropertyValues) {
        if (changed.has('value')) {
            this._syncChecked();
        }
    }

    private _syncChecked() {
        const items = this.querySelectorAll<UiMenubarRadioItem>('ui-menubar-radio-item');
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
/*  ui-menubar-sub-content                                            */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * The dropdown panel of a sub-menu. Positioned to the right of the trigger.
 */
@customElement('ui-menubar-sub-content')
export class UiMenubarSubContent extends LitElement {
    @property({ reflect: true, type: Boolean }) open = false;

    static styles = css`
        :host {
            display: none;
            position: absolute;
            left: 100%;
            top: -4px;
            z-index: 1001;
        }
        :host([open]) {
            display: block;
        }
        .panel {
            min-width: 180px;
            background: var(--ui-menubar-content-bg, #fff);
            border: 1px solid var(--ui-border-color, #e5e7eb);
            border-radius: 6px;
            padding: 4px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
            animation: menubar-sub-in 0.12s ease-out;
        }
        @keyframes menubar-sub-in {
            from { opacity: 0; transform: translateX(-4px); }
            to   { opacity: 1; transform: translateX(0); }
        }
    `;

    render() {
        return html`<div class="panel" role="menu"><slot></slot></div>`;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-menubar-sub-trigger                                            */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Trigger for a sub-menu. Shows an arrow indicator.
 */
@customElement('ui-menubar-sub-trigger')
export class UiMenubarSubTrigger extends LitElement {
    @property({ reflect: true, type: Boolean }) highlighted = false;
    @property({ reflect: true, type: Boolean }) disabled = false;
    @property({ reflect: true, type: Boolean }) inset = false;

    static styles = css`
        :host { display: block; }

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

        :host([inset]) .item {
            padding-left: 32px;
        }

        :host([highlighted]) .item {
            background: var(--ui-menubar-highlight-bg, rgba(0, 0, 0, 0.06));
        }

        :host([disabled]) .item {
            opacity: 0.5;
            pointer-events: none;
        }

        .arrow {
            margin-left: auto;
            width: 14px;
            height: 14px;
            color: var(--ui-text-color-muted, #6b7280);
        }
    `;

    render() {
        return html`
            <div class="item" role="menuitem" aria-haspopup="true" aria-disabled=${this.disabled}>
                <slot></slot>
                <svg class="arrow" viewBox="0 0 14 14" fill="none">
                    <path d="M5 3L9 7L5 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </div>
        `;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-menubar-sub                                                    */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Wraps a sub-trigger and sub-content pair.
 * Opens on hover/focus and ArrowRight; closes on ArrowLeft or blur.
 */
@customElement('ui-menubar-sub')
export class UiMenubarSub extends LitElement {
    private _open = false;
    private _openTimer: ReturnType<typeof setTimeout> | null = null;
    private _closeTimer: ReturnType<typeof setTimeout> | null = null;

    static styles = css`
        :host {
            display: block;
            position: relative;
        }
    `;

    get open() { return this._open; }

    show() {
        if (this._closeTimer) { clearTimeout(this._closeTimer); this._closeTimer = null; }
        this._openTimer = setTimeout(() => {
            this._open = true;
            this._syncContent();
            const trigger = this.querySelector<UiMenubarSubTrigger>(':scope > ui-menubar-sub-trigger');
            if (trigger) trigger.highlighted = true;
        }, 80);
    }

    hide() {
        if (this._openTimer) { clearTimeout(this._openTimer); this._openTimer = null; }
        this._closeTimer = setTimeout(() => {
            this._open = false;
            this._syncContent();
            const trigger = this.querySelector<UiMenubarSubTrigger>(':scope > ui-menubar-sub-trigger');
            if (trigger) trigger.highlighted = false;
        }, 60);
    }

    hideImmediate() {
        if (this._openTimer) { clearTimeout(this._openTimer); this._openTimer = null; }
        if (this._closeTimer) { clearTimeout(this._closeTimer); this._closeTimer = null; }
        this._open = false;
        this._syncContent();
        const trigger = this.querySelector<UiMenubarSubTrigger>(':scope > ui-menubar-sub-trigger');
        if (trigger) trigger.highlighted = false;
    }

    private _syncContent() {
        const content = this.querySelector<UiMenubarSubContent>(':scope > ui-menubar-sub-content');
        if (content) content.open = this._open;
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
/*  ui-menubar-content                                                */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * The dropdown content panel for a menubar menu.
 * Positioned absolutely below the trigger.
 */
@customElement('ui-menubar-content')
export class UiMenubarContent extends LitElement {
    @property({ reflect: true, type: Boolean }) open = false;

    /** Currently highlighted item index for keyboard nav */
    private _highlightIndex = -1;

    static styles = css`
        :host {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            z-index: 1000;
            padding-top: 4px;
        }
        :host([open]) {
            display: block;
        }
        .panel {
            min-width: 200px;
            background: var(--ui-menubar-content-bg, #fff);
            border: 1px solid var(--ui-border-color, #e5e7eb);
            border-radius: 6px;
            padding: 4px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
            animation: menubar-in 0.12s ease-out;
        }
        @keyframes menubar-in {
            from { opacity: 0; transform: translateY(-4px); }
            to   { opacity: 1; transform: translateY(0); }
        }
    `;

    /** Get all navigable items (items, checkbox items, radio items, sub-triggers). */
    private _getNavigableItems(): HTMLElement[] {
        const selectors = [
            'ui-menubar-item:not([disabled]):not([hidden])',
            'ui-menubar-checkbox-item:not([disabled]):not([hidden])',
            'ui-menubar-radio-item:not([disabled]):not([hidden])',
            'ui-menubar-sub-trigger:not([disabled]):not([hidden])',
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
        if (items.length === 0) return;

        switch (e.key) {
            case 'ArrowDown': {
                e.preventDefault();
                this._highlightItem(this._highlightIndex + 1);
                break;
            }
            case 'ArrowUp': {
                e.preventDefault();
                this._highlightItem(this._highlightIndex - 1);
                break;
            }
            case 'Home': {
                e.preventDefault();
                this._highlightItem(0);
                break;
            }
            case 'End': {
                e.preventDefault();
                this._highlightItem(items.length - 1);
                break;
            }
            case 'Enter':
            case ' ': {
                e.preventDefault();
                if (this._highlightIndex >= 0 && this._highlightIndex < items.length) {
                    const target = items[this._highlightIndex];
                    if (target.tagName === 'UI-MENUBAR-ITEM') {
                        (target as UiMenubarItem).select();
                        // Close the menu after selection
                        this._requestClose();
                    } else if (target.tagName === 'UI-MENUBAR-CHECKBOX-ITEM') {
                        (target as UiMenubarCheckboxItem).toggle();
                    } else if (target.tagName === 'UI-MENUBAR-RADIO-ITEM') {
                        (target as UiMenubarRadioItem).select();
                    } else if (target.tagName === 'UI-MENUBAR-SUB-TRIGGER') {
                        const sub = target.closest('ui-menubar-sub') as UiMenubarSub | null;
                        if (sub) sub.show();
                    }
                }
                break;
            }
            case 'ArrowRight': {
                // Open sub-menu if highlighted item is a sub-trigger
                if (this._highlightIndex >= 0 && this._highlightIndex < items.length) {
                    const target = items[this._highlightIndex];
                    if (target.tagName === 'UI-MENUBAR-SUB-TRIGGER') {
                        e.preventDefault();
                        const sub = target.closest('ui-menubar-sub') as UiMenubarSub | null;
                        if (sub) {
                            sub.show();
                            // Highlight first item in sub-content
                            setTimeout(() => {
                                const subContent = sub.querySelector<UiMenubarSubContent>('ui-menubar-sub-content');
                                if (subContent) {
                                    const subItems = Array.from(subContent.querySelectorAll<HTMLElement>(
                                        'ui-menubar-item:not([disabled]),ui-menubar-checkbox-item:not([disabled]),ui-menubar-radio-item:not([disabled]),ui-menubar-sub-trigger:not([disabled])'
                                    ));
                                    if (subItems.length > 0) {
                                        (subItems[0] as HTMLElement & { highlighted: boolean }).highlighted = true;
                                    }
                                }
                            }, 100);
                        }
                        return; // Don't propagate to menubar for menu switching
                    }
                }
                break;
            }
            case 'ArrowLeft': {
                // Close sub-menu if we're in one
                const activeSub = this.querySelector<UiMenubarSub>('ui-menubar-sub[open]') ??
                    Array.from(this.querySelectorAll<UiMenubarSub>('ui-menubar-sub')).find(s => s.open);
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
        }
    }

    private _requestClose() {
        this.dispatchEvent(new CustomEvent('_menubar-request-close', {
            bubbles: true, composed: true,
        }));
    }

    resetHighlight() {
        this._clearHighlight();
    }

    /** Handle clicks on items inside the content. */
    private _handleClick = (e: Event) => {
        const target = e.target as HTMLElement;
        const item = target.closest('ui-menubar-item') as UiMenubarItem | null;
        if (item && !item.disabled) {
            item.select();
            this._requestClose();
            return;
        }
        const cbItem = target.closest('ui-menubar-checkbox-item') as UiMenubarCheckboxItem | null;
        if (cbItem && !cbItem.disabled) {
            cbItem.toggle();
            return; // Don't close on checkbox toggle
        }
        const radioItem = target.closest('ui-menubar-radio-item') as UiMenubarRadioItem | null;
        if (radioItem && !radioItem.disabled) {
            radioItem.select();
            return; // Don't close on radio select
        }
    };

    private _handleMouseOver = (e: Event) => {
        const target = e.target as HTMLElement;
        const navigable = target.closest('ui-menubar-item, ui-menubar-checkbox-item, ui-menubar-radio-item, ui-menubar-sub-trigger') as HTMLElement & { highlighted: boolean; disabled: boolean } | null;
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
/*  ui-menubar-trigger                                                */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * The trigger button for a menubar menu.
 * @slot - Trigger label text.
 */
@customElement('ui-menubar-trigger')
export class UiMenubarTrigger extends LitElement {
    @property({ reflect: true, type: Boolean }) active = false;

    static styles = css`
        :host {
            display: inline-flex;
        }

        .trigger {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 4px 10px;
            border: none;
            background: transparent;
            border-radius: 4px;
            font-size: 0.875rem;
            font-weight: 500;
            line-height: 1.5;
            color: var(--ui-text-color, #111827);
            font-family: var(--ui-font-family, system-ui, sans-serif);
            cursor: pointer;
            outline: none;
            user-select: none;
            white-space: nowrap;
            transition: background 0.1s;
        }

        .trigger:hover,
        :host([active]) .trigger {
            background: var(--ui-menubar-trigger-hover-bg, rgba(0, 0, 0, 0.06));
        }

        .trigger:focus-visible {
            outline: 2px solid var(--ui-primary-color, #3b82f6);
            outline-offset: -2px;
        }
    `;

    render() {
        return html`
            <button class="trigger"
                role="menuitem"
                aria-haspopup="true"
                aria-expanded=${this.active}
                tabindex=${this.active ? '0' : '-1'}>
                <slot></slot>
            </button>
        `;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-menubar-menu                                                   */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Wraps a trigger and content pair for a single menu in the menubar.
 */
@customElement('ui-menubar-menu')
export class UiMenubarMenu extends LitElement {
    static styles = css`
        :host {
            display: inline-block;
            position: relative;
        }
    `;

    get trigger(): UiMenubarTrigger | null {
        return this.querySelector<UiMenubarTrigger>(':scope > ui-menubar-trigger');
    }

    get content(): UiMenubarContent | null {
        return this.querySelector<UiMenubarContent>(':scope > ui-menubar-content');
    }

    open() {
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
            this.querySelectorAll<UiMenubarSub>('ui-menubar-sub').forEach(sub => sub.hideImmediate());
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
/*  ui-menubar                                                        */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * A visually persistent horizontal menu bar, common in desktop applications.
 * Hosts one or more `<ui-menubar-menu>` children.
 *
 * @slot - One or more `<ui-menubar-menu>` elements.
 *
 * @fires ui-menubar-item-select  - Bubbles from items.
 * @fires ui-menubar-checkbox-change - Bubbles from checkbox items.
 * @fires ui-menubar-radio-change - Bubbles from radio groups.
 *
 * @csspart bar - The menubar container.
 */
@customElement('ui-menubar')
export class UiMenubar extends LitElement {
    /** Which menu (by index) is currently open. -1 = all closed. */
    private _activeIndex = -1;

    static styles = css`
        :host {
            display: inline-flex;
            align-items: center;
            background: var(--ui-menubar-bg, #fff);
            border: 1px solid var(--ui-border-color, #e5e7eb);
            border-radius: 6px;
            padding: 3px;
            gap: 2px;
            font-family: var(--ui-font-family, system-ui, sans-serif);
        }
    `;

    private _getMenus(): UiMenubarMenu[] {
        return Array.from(this.querySelectorAll<UiMenubarMenu>(':scope > ui-menubar-menu'));
    }

    /** Open a menu by index and close others. */
    private _openMenu(index: number) {
        const menus = this._getMenus();
        menus.forEach((menu, i) => {
            if (i === index) menu.open();
            else menu.close();
        });
        this._activeIndex = index;
    }

    /** Close all menus. */
    closeAll() {
        const menus = this._getMenus();
        menus.forEach(menu => menu.close());
        this._activeIndex = -1;
    }

    /** Navigate to the next or previous menu. */
    private _navigate(delta: number) {
        const menus = this._getMenus();
        if (menus.length === 0) return;
        const newIndex = ((this._activeIndex + delta) % menus.length + menus.length) % menus.length;
        this._openMenu(newIndex);
    }

    /** Handle trigger clicks */
    private _handleTriggerClick = (e: Event) => {
        const trigger = (e.target as HTMLElement).closest?.('ui-menubar-trigger');
        if (!trigger) return;

        const menu = trigger.closest('ui-menubar-menu') as UiMenubarMenu | null;
        if (!menu) return;

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

        const trigger = (e.target as HTMLElement).closest?.('ui-menubar-trigger');
        if (!trigger) return;

        const menu = trigger.closest('ui-menubar-menu') as UiMenubarMenu | null;
        if (!menu) return;

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
                // If inside a sub-menu, let the sub handle it first
                const activeContent = menus[this._activeIndex]?.content;
                if (activeContent) {
                    // Check if the highlighted item is a sub-trigger
                    const items = Array.from(activeContent.querySelectorAll<HTMLElement>(
                        'ui-menubar-item, ui-menubar-checkbox-item, ui-menubar-radio-item, ui-menubar-sub-trigger'
                    ));
                    const highlighted = items.find(i => (i as HTMLElement & { highlighted: boolean }).highlighted);
                    if (highlighted?.tagName === 'UI-MENUBAR-SUB-TRIGGER') {
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
                    const openSub = Array.from(activeContent2.querySelectorAll<UiMenubarSub>('ui-menubar-sub')).find(s => s.open);
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
                    // Open the first menu
                    e.preventDefault();
                    this._openMenu(0);
                    const firstContent = menus[0]?.content;
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
                    const focused = this.querySelector<UiMenubarTrigger>('ui-menubar-trigger[tabindex="0"]');
                    if (focused) {
                        const menu = focused.closest('ui-menubar-menu') as UiMenubarMenu | null;
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

    /** Ensure first trigger has tabindex=0 for roving tabindex */
    private _initTabindex() {
        const menus = this._getMenus();
        menus.forEach((menu, i) => {
            const trigger = menu.trigger;
            if (trigger) {
                const btn = trigger.shadowRoot?.querySelector('button');
                if (btn) btn.tabIndex = i === 0 ? 0 : -1;
            }
        });
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', this._handleTriggerClick);
        this.addEventListener('mouseover', this._handleTriggerMouseEnter);
        this.addEventListener('keydown', this._handleKeyDown);
        this.addEventListener('_menubar-request-close', this._handleRequestClose);
        document.addEventListener('click', this._handleOutsideClick, true);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('click', this._handleTriggerClick);
        this.removeEventListener('mouseover', this._handleTriggerMouseEnter);
        this.removeEventListener('keydown', this._handleKeyDown);
        this.removeEventListener('_menubar-request-close', this._handleRequestClose);
        document.removeEventListener('click', this._handleOutsideClick, true);
    }

    private _onSlotChange = () => { this._initTabindex(); };

    override firstUpdated() {
        this._initTabindex();
    }

    render() {
        return html`
            <div part="bar" role="menubar" aria-label="Menu bar">
                <slot @slotchange=${this._onSlotChange}></slot>
            </div>
        `;
    }
}
