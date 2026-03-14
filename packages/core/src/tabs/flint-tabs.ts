/**
 * @fileoverview Accessible tab components for LitElement.
 *
 * Usage:
 * ```html
 * <flint-tabs value="tab1">
 *   <flint-tab-list>
 *     <flint-tab value="tab1">Label 1</flint-tab>
 *     <flint-tab value="tab2">Label 2</flint-tab>
 *   </flint-tab-list>
 *   <flint-tab-panel value="tab1">Content 1</flint-tab-panel>
 *   <flint-tab-panel value="tab2">Content 2</flint-tab-panel>
 * </flint-tabs>
 * ```
 *
 * Components:
 * - flint-tabs: Root container, manages state and coordinates children
 * - flint-tab-list: Holds tabs, renders scroll buttons, manages keyboard navigation
 * - flint-tab: Individual tab button/link with icon support
 * - flint-tab-panel: Content container, hidden/shown based on active tab
 *
 * Events:
 * - flint-tab-change: Fired on flint-tabs when active tab changes {detail: {value}}
 *
 * CSS Variables:
 * --flint-tab-inactive-color, --flint-tab-active-color, --flint-tab-indicator-color,
 * --flint-tab-indicator-height, --flint-tab-indicator-width, --flint-tab-padding-y,
 * --flint-tab-padding-x, --flint-tab-font-size, --flint-tab-border-color
 */
import { LitElement, unsafeCSS, html, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import uiTabStyles from './flint-tab.css?inline';
import uiTabPanelStyles from './flint-tab-panel.css?inline';
import uiTabListStyles from './flint-tab-list.css?inline';
import uiTabsStyles from './flint-tabs.css?inline';

/* ── SVG helpers ── */
const svgPath = (d: string) =>
    html`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${d}"/></svg>`;
const iconLeft = () => svgPath('M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z');
const iconRight = () => svgPath('M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z');
const iconUp = () => svgPath('M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z');
const iconDown = () => svgPath('M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z');

/* ================================================================== */
/* FlintTab                                                                */
/* ================================================================== */
@customElement('flint-tab')
export class FlintTab extends LitElement {
    static styles = unsafeCSS(uiTabStyles);

    /** Unique identifier for this tab. */
    @property({ reflect: true }) value = '';
    /** Whether the tab is disabled. */
    @property({ type: Boolean, reflect: true }) disabled = false;
    /** Whether the tab is currently selected. */
    @property({ type: Boolean, reflect: true }) selected = false;
    /** Position of the icon slot relative to the label. */
    @property({ attribute: 'icon-position', reflect: true })
    iconPosition: 'top' | 'bottom' | 'start' | 'end' = 'start';
    /** URL to navigate to, renders the tab as a link. */
    @property() href = '';
    /** Whether the tab stretches to fill available width. */
    @property({ type: Boolean, reflect: true, attribute: 'full-width' }) fullWidth = false;

    /** @internal – called by FlintTabs */
    setTabIndex(n: number) {
        const el = this.shadowRoot?.querySelector<HTMLElement>('button,a');
        if (el) el.tabIndex = n;
    }

    focusInner() {
        this.shadowRoot?.querySelector<HTMLElement>('button,a')?.focus();
    }

    private _fire() {
        if (this.disabled) return;
        this.dispatchEvent(new CustomEvent('flint-tab-click', {
            detail: { value: this.value }, bubbles: true, composed: true,
        }));
    }

    private _inner() {
        return html`
            <span class="icon-slot"><slot name="icon"></slot></span>
            <slot></slot>`;
    }

    render() {
        const cls = classMap({ tab: true, [`icon-${this.iconPosition}`]: true });
        if (this.href) {
            return html`<a class=${cls} href=${this.href}
                role="tab"
                aria-selected=${this.selected ? 'true' : 'false'}
                aria-disabled=${this.disabled ? 'true' : 'false'}
                tabindex=${this.selected ? '0' : '-1'}
                @click=${this._fire}>${this._inner()}</a>`;
        }
        return html`<button class=${cls}
            role="tab"
            ?disabled=${this.disabled}
            aria-selected=${this.selected ? 'true' : 'false'}
            tabindex=${this.selected ? '0' : '-1'}
            @click=${this._fire}>${this._inner()}</button>`;
    }
}

/* ================================================================== */
/* FlintTabPanel                                                           */
/* ================================================================== */
@customElement('flint-tab-panel')
export class FlintTabPanel extends LitElement {
    static styles = unsafeCSS(uiTabPanelStyles);
    /** Identifier linking this panel to its corresponding tab. */
    @property({ reflect: true }) value = '';
    render() { return html`<div class="panel" role="tabpanel"><slot></slot></div>`; }
}

/* ================================================================== */
/* FlintTabList                                                            */
/* ================================================================== */
@customElement('flint-tab-list')
export class FlintTabList extends LitElement {
    static styles = unsafeCSS(uiTabListStyles);

    /** Layout direction of the tab list. */
    @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';
    /** Display variant controlling tab sizing and scrollability. */
    @property({ reflect: true }) variant: 'standard' | 'fullWidth' | 'scrollable' = 'standard';
    /** Whether to center the tabs within the tab list. */
    @property({ type: Boolean, reflect: true }) centered = false;
    /** Whether to show scroll buttons in scrollable mode. */
    @property({ attribute: 'scroll-buttons' }) scrollButtons: 'auto' | 'false' = 'auto';
    /** Accessible label for the tab list. */
    @property({ attribute: 'aria-label' }) override ariaLabel = '';

    @state() private _canBack = false;
    @state() private _canFwd = false;

    @query('.scroll-area') private _area!: HTMLDivElement;
    @query('.tabs-row') private _row!: HTMLDivElement;
    @query('.indicator') private _ind!: HTMLDivElement;
    @query('slot') private _slot!: HTMLSlotElement;

    private _ro?: ResizeObserver;

    connectedCallback() { super.connectedCallback(); }

    firstUpdated() {
        if (typeof ResizeObserver !== 'undefined') {
            this._ro = new ResizeObserver(() => { this._checkScroll(); this.syncIndicator(); });
            this._ro.observe(this._area);
        }
        this._area.addEventListener('scroll', () => this._checkScroll(), { passive: true });
        this._checkScroll();
        requestAnimationFrame(() => this.syncIndicator());
    }

    disconnectedCallback() { this._ro?.disconnect(); super.disconnectedCallback(); }

    private _tabs(): FlintTab[] {
        if (!this._slot) return [];
        return this._slot.assignedElements({ flatten: true })
            .filter(el => el.tagName === 'FLINT-TAB') as FlintTab[];
    }

    private _checkScroll() {
        const el = this._area;
        if (!el) return;
        if (this.orientation === 'horizontal') {
            this._canBack = el.scrollLeft > 1;
            this._canFwd = el.scrollLeft < el.scrollWidth - el.clientWidth - 1;
        } else {
            this._canBack = el.scrollTop > 1;
            this._canFwd = el.scrollTop < el.scrollHeight - el.clientHeight - 1;
        }
    }

    syncIndicator() {
        const active = this._tabs().find(t => t.selected);
        if (!active || !this._ind || !this._row) return;
        const rowRect = this._row.getBoundingClientRect();
        const tabRect = active.getBoundingClientRect();
        if (!tabRect.width && !tabRect.height) return;

        if (this.orientation === 'horizontal') {
            this._ind.style.left = `${tabRect.left - rowRect.left}px`;
            this._ind.style.width = `${tabRect.width}px`;
            this._ind.style.top = '';
            this._ind.style.height = '';
        } else {
            this._ind.style.top = `${tabRect.top - rowRect.top}px`;
            this._ind.style.height = `${tabRect.height}px`;
            this._ind.style.left = '';
            this._ind.style.width = '';
        }
        this._ind.style.opacity = '1';
    }

    private _scroll(delta: number) {
        if (this.orientation === 'horizontal') {
            this._area.scrollBy({ left: delta, behavior: 'smooth' });
        } else {
            this._area.scrollBy({ top: delta, behavior: 'smooth' });
        }
    }

    /** Keyboard navigation across tabs */
    private _onKey(e: KeyboardEvent) {
        const horiz = this.orientation === 'horizontal';
        const prev = horiz ? 'ArrowLeft' : 'ArrowUp';
        const next = horiz ? 'ArrowRight' : 'ArrowDown';
        if (![prev, next, 'Home', 'End'].includes(e.key)) return;

        e.preventDefault();
        const tabs = this._tabs().filter(t => !t.disabled);
        // Check if tab has focus inside its shadow DOM
        const cur = tabs.findIndex(t => t.shadowRoot?.activeElement != null || t === document.activeElement);
        let idx = cur < 0 ? 0 : cur;

        if (e.key === prev) idx = (idx - 1 + tabs.length) % tabs.length;
        if (e.key === next) idx = (idx + 1) % tabs.length;
        if (e.key === 'Home') idx = 0;
        if (e.key === 'End') idx = tabs.length - 1;

        tabs[idx]?.focusInner();
        // Scroll focused tab into view
        if (typeof tabs[idx].scrollIntoView === 'function') {
            tabs[idx].scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
        tabs[idx]?.dispatchEvent(new CustomEvent('flint-tab-click', {
            detail: { value: tabs[idx].value }, bubbles: true, composed: true,
        }));
    }

    private _onSlotChange() {
        this._checkScroll();
        requestAnimationFrame(() => this.syncIndicator());
    }

    render() {
        const showBtns = this.variant === 'scrollable' && this.scrollButtons !== 'false';
        const isVert = this.orientation === 'vertical';

        const backBtn = showBtns ? html`
            <button class="scroll-btn" aria-label="Scroll back"
                ?disabled=${!this._canBack}
                @click=${() => this._scroll(-200)}>
                ${isVert ? iconUp() : iconLeft()}
            </button>` : nothing;

        const fwdBtn = showBtns ? html`
            <button class="scroll-btn" aria-label="Scroll forward"
                ?disabled=${!this._canFwd}
                @click=${() => this._scroll(200)}>
                ${isVert ? iconDown() : iconRight()}
            </button>` : nothing;

        return html`
            <div class="container">
                ${backBtn}
                <div class="scroll-area" @keydown=${this._onKey}>
                    <div class="tabs-row" role="tablist" aria-label=${this.ariaLabel || nothing}>
                        <slot @slotchange=${this._onSlotChange}></slot>
                        <div class="indicator"></div>
                    </div>
                </div>
                ${fwdBtn}
            </div>`;
    }
}

/* ================================================================== */
/* FlintTabs                                                               */
/* ================================================================== */
@customElement('flint-tabs')
export class FlintTabs extends LitElement {
    static styles = unsafeCSS(uiTabsStyles);

    /** The currently active tab value. */
    @property({ reflect: true }) value = '';
    /** Layout direction of the tabs. */
    @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';
    /** Display variant controlling tab sizing and scrollability. */
    @property() variant: 'standard' | 'fullWidth' | 'scrollable' = 'standard';
    /** Whether to center the tabs. */
    @property({ type: Boolean }) centered = false;
    /** Whether to show scroll buttons in scrollable mode. */
    @property({ attribute: 'scroll-buttons' }) scrollButtons: 'auto' | 'false' = 'auto';
    /** 'primary' | 'secondary' | 'inherit' | any CSS color */
    @property({ attribute: 'text-color' }) textColor = 'primary';
    /** 'primary' | 'secondary' | any CSS color */
    @property({ attribute: 'indicator-color' }) indicatorColor = 'primary';
    /** Uncontrolled mode: initial value if `value` not set */
    @property({ attribute: 'default-value' }) defaultValue = '';

    private _firstUpdate = true;

    willUpdate() {
        if (this._firstUpdate && this.defaultValue && !this.value) {
            this.value = this.defaultValue;
        }
        if (this._firstUpdate) this._firstUpdate = false;
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('flint-tab-click', this._onTabClick as EventListener);
    }
    disconnectedCallback() {
        this.removeEventListener('flint-tab-click', this._onTabClick as EventListener);
        super.disconnectedCallback();
    }

    private _resolveColor(c: string) {
        if (c === 'primary') return 'var(--flint-primary-color, #3b82f6)';
        if (c === 'secondary') return 'var(--flint-accent-color, #8b5cf6)';
        if (c === 'inherit') return 'currentColor';
        return c;
    }

    private _syncAll() {
        const tabList = this.querySelector<FlintTabList>('flint-tab-list');
        const tabs = Array.from(this.querySelectorAll<FlintTab>('flint-tab'));
        const panels = Array.from(this.querySelectorAll<FlintTabPanel>('flint-tab-panel'));

        // If no value set, pick first enabled tab
        let active = this.value;
        if (!active) {
            const first = tabs.find(t => !t.disabled);
            if (first) {
                active = first.value;
                this.value = first.value; // persist auto-selected value
            }
        }

        // Configure tab list
        if (tabList) {
            tabList.orientation = this.orientation;
            tabList.variant = this.variant;
            tabList.centered = this.centered;
            tabList.scrollButtons = this.scrollButtons;
            tabList.style.setProperty('--flint-tabs-ind-color', this._resolveColor(this.indicatorColor));
        }

        const activeClr = this._resolveColor(this.textColor);
        const inactiveClr = this.textColor === 'inherit' ? 'currentColor' : 'var(--flint-text-color-muted, #6b7280)';

        // Sync tabs
        tabs.forEach(tab => {
            tab.selected = tab.value === active;
            tab.fullWidth = this.variant === 'fullWidth';
            tab.style.setProperty('--flint-tab-active', activeClr);
            tab.style.setProperty('--flint-tab-inactive', inactiveClr);
            tab.setAttribute('id', `tab-${tab.value}`);
            tab.setAttribute('aria-controls', `panel-${tab.value}`);
            // tabindex is handled inside FlintTab via `selected` prop
        });

        // Sync panels
        panels.forEach(panel => {
            panel.setAttribute('id', `panel-${panel.value}`);
            panel.setAttribute('aria-labelledby', `tab-${panel.value}`);
            if (panel.value === active) panel.removeAttribute('hidden');
            else panel.setAttribute('hidden', '');
        });

        // Update indicator after DOM settles
        requestAnimationFrame(() => tabList?.syncIndicator());
    }

    private _onTabClick = (e: CustomEvent) => {
        this.value = e.detail.value;
        this.dispatchEvent(new CustomEvent('flint-tab-change', {
            detail: { value: e.detail.value }, bubbles: true, composed: true,
        }));
        this._syncAll();
    };

    updated(changed: Map<string, unknown>) {
        const keys = ['value', 'orientation', 'variant', 'centered', 'scrollButtons', 'textColor', 'indicatorColor'];
        if (keys.some(k => changed.has(k))) this._syncAll();
    }

    render() {
        return html`
            <div class="root">
                <slot @slotchange=${() => this._syncAll()}></slot>
            </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-tab': FlintTab;
        'flint-tab-list': FlintTabList;
        'flint-tab-panel': FlintTabPanel;
        'flint-tabs': FlintTabs;
    }
}
