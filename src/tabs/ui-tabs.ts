import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/* ── SVG helpers ── */
const svgPath = (d: string) =>
    html`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${d}"/></svg>`;
const iconLeft = () => svgPath('M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z');
const iconRight = () => svgPath('M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z');
const iconUp = () => svgPath('M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z');
const iconDown = () => svgPath('M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z');

/* ================================================================== */
/* UiTab                                                                */
/* ================================================================== */
@customElement('ui-tab')
export class UiTab extends LitElement {
    static styles = css`
        :host { display: inline-flex; position: relative; background: var(--ui-surface-background, #fff); }
        :host([full-width]) { flex: 1; }

        .tab {
            display: inline-flex; align-items: center; justify-content: center;
            gap: 6px; padding: 10px 16px; min-height: 48px;
            border: none; background: none; cursor: pointer;
            font-family: var(--ui-font-family,'Inter',sans-serif);
            font-size: .875rem; font-weight: 500; line-height: 1.25;
            color: var(--ui-tab-inactive, #6b7280);
            white-space: nowrap; border-radius: 0; outline: none;
            transition: color .2s, background .15s;
            box-sizing: border-box; width: 100%;
            text-decoration: none; -webkit-tap-highlight-color: transparent;
        }
        .tab:hover:not(:disabled):not([aria-disabled="true"]) {
            color: var(--ui-tab-active, #3b82f6);
            background: rgba(59,130,246,.04);
        }
        .tab:focus-visible {
            outline: 2px solid var(--ui-tab-active, #3b82f6);
            outline-offset: -2px;
        }
        :host([selected]) .tab { color: var(--ui-tab-active, #3b82f6); font-weight: 600; }
        .tab:disabled { color: rgba(0,0,0,.26); cursor: not-allowed; }

        /* icon positions */
        .icon-top    { flex-direction: column; min-height: 72px; }
        .icon-bottom { flex-direction: column-reverse; min-height: 72px; }
        .icon-start  { flex-direction: row; }
        .icon-end    { flex-direction: row-reverse; }

        .icon-slot { display: contents; line-height: 0; }
    `;

    @property({ reflect: true }) value = '';
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) selected = false;
    @property({ attribute: 'icon-position', reflect: true })
    iconPosition: 'top' | 'bottom' | 'start' | 'end' = 'start';
    @property() href = '';
    @property({ type: Boolean, reflect: true, attribute: 'full-width' }) fullWidth = false;

    /** @internal – called by UiTabs */
    setTabIndex(n: number) {
        const el = this.shadowRoot?.querySelector<HTMLElement>('button,a');
        if (el) el.tabIndex = n;
    }

    focusInner() {
        this.shadowRoot?.querySelector<HTMLElement>('button,a')?.focus();
    }

    private _fire() {
        if (this.disabled) return;
        this.dispatchEvent(new CustomEvent('ui-tab-click', {
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
/* UiTabPanel                                                           */
/* ================================================================== */
@customElement('ui-tab-panel')
export class UiTabPanel extends LitElement {
    static styles = css`
        :host         { display: block; background: var(--ui-surface-background, #fff); }
        :host([hidden]){ display: none !important; }
        .panel        { padding: 24px; font-family: var(--ui-font-family,'Inter',sans-serif);
                        font-size: .875rem; color: #374151; line-height: 1.6; }
    `;
    @property({ reflect: true }) value = '';
    render() { return html`<div class="panel" role="tabpanel"><slot></slot></div>`; }
}

/* ================================================================== */
/* UiTabList                                                            */
/* ================================================================== */
@customElement('ui-tab-list')
export class UiTabList extends LitElement {
    static styles = css`
        :host { display: block; position: relative; background: var(--ui-surface-background, #fff); }
        /* In vertical mode the host must fill the height that flex-stretching gives it
           so .scroll-area has a bounded height and overflow:auto actually fires. */
        :host([orientation="vertical"]) { height: 100%; }
        :host([orientation="vertical"]) .container { height: 100%; }

        .container {
            display: flex; align-items: center; position: relative;
            border-bottom: 1px solid #e5e7eb;
        }
        :host([orientation="vertical"]) .container {
            flex-direction: column; border-bottom: none;
            border-right: 1px solid #e5e7eb; align-items: stretch;
        }

        /* scroll buttons */
        .scroll-btn {
            flex-shrink: 0; display: flex; align-items: center; justify-content: center;
            border: none; background: none; cursor: pointer; color: #6b7280;
            border-radius: 4px; padding: 0;
            transition: color .15s, background .15s;
        }
        /* Horizontal: fixed square on left/right of the scroll area */
        :host(:not([orientation="vertical"])) .scroll-btn { width: 40px; height: 40px; }
        /* Vertical: full-width bar on top/bottom — centres the chevron across the sidebar */
        :host([orientation="vertical"]) .scroll-btn     { width: 100%; height: 40px; }
        .scroll-btn:hover:not(:disabled) { color: #374151; background: rgba(0,0,0,.05); }
        .scroll-btn:disabled { opacity: .38; cursor: default; }

        /* scroll area – axis-locked so scroll events don't bleed to the page */
        .scroll-area {
            flex: 1; position: relative; min-height: 0;
            scrollbar-width: none; -ms-overflow-style: none;
        }
        .scroll-area::-webkit-scrollbar { display: none; }
        :host(:not([orientation="vertical"])) .scroll-area {
            overflow-x: auto; overflow-y: hidden;
        }
        :host([orientation="vertical"]) .scroll-area {
            overflow-y: auto; overflow-x: hidden;
        }

        /* tabs row */
        .tabs-row {
            display: flex; position: relative;
            min-width: max-content;
        }
        :host([orientation="vertical"]) .tabs-row {
            flex-direction: column; min-width: unset; min-height: max-content;
        }
        :host([variant="fullWidth"]) .tabs-row  { min-width: 100%; }
        :host([variant="fullWidth"]) ::slotted(ui-tab) { flex: 1; }
        :host([centered]) .tabs-row { justify-content: center; min-width: 100%; }

        /* indicator */
        .indicator {
            position: absolute; pointer-events: none; opacity: 0;
            background: var(--ui-tabs-ind-color, #3b82f6); border-radius: 3px;
            transition:
                left   .25s cubic-bezier(.4,0,.2,1),
                width  .25s cubic-bezier(.4,0,.2,1),
                top    .25s cubic-bezier(.4,0,.2,1),
                height .25s cubic-bezier(.4,0,.2,1),
                opacity .15s;
        }
        :host(:not([orientation="vertical"])) .indicator { bottom: 0; height: 3px; }
        :host([orientation="vertical"])       .indicator { right: 0;  width: 3px; }
    `;

    @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';
    @property({ reflect: true }) variant: 'standard' | 'fullWidth' | 'scrollable' = 'standard';
    @property({ type: Boolean, reflect: true }) centered = false;
    @property({ attribute: 'scroll-buttons' }) scrollButtons: 'auto' | 'false' = 'auto';

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

    private _tabs(): UiTab[] {
        if (!this._slot) return [];
        return this._slot.assignedElements({ flatten: true })
            .filter(el => el.tagName === 'UI-TAB') as UiTab[];
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
        const cur = tabs.findIndex(t => t.contains(document.activeElement) || t === document.activeElement);
        let idx = cur < 0 ? 0 : cur;

        if (e.key === prev) idx = (idx - 1 + tabs.length) % tabs.length;
        if (e.key === next) idx = (idx + 1) % tabs.length;
        if (e.key === 'Home') idx = 0;
        if (e.key === 'End') idx = tabs.length - 1;

        tabs[idx]?.focusInner();
        tabs[idx]?.dispatchEvent(new CustomEvent('ui-tab-click', {
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
                    <div class="tabs-row" role="tablist">
                        <slot @slotchange=${this._onSlotChange}></slot>
                        <div class="indicator"></div>
                    </div>
                </div>
                ${fwdBtn}
            </div>`;
    }
}

/* ================================================================== */
/* UiTabs                                                               */
/* ================================================================== */
@customElement('ui-tabs')
export class UiTabs extends LitElement {
    static styles = css`
        :host { display: block; font-family: var(--ui-font-family,'Inter',sans-serif);
                background: var(--ui-surface-background, #fff); }
        /* Vertical: stretch the root div so panels fill available height */
        :host([orientation="vertical"]) .root {
            display: flex; flex-direction: row;
            height: 100%; min-height: inherit;
        }
        .root { display: block; }
    `;

    @property({ reflect: true }) value = '';
    @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';
    @property() variant: 'standard' | 'fullWidth' | 'scrollable' = 'standard';
    @property({ type: Boolean }) centered = false;
    @property({ attribute: 'scroll-buttons' }) scrollButtons: 'auto' | 'false' = 'auto';
    /** 'primary' | 'secondary' | 'inherit' | any CSS color */
    @property({ attribute: 'text-color' }) textColor = 'primary';
    /** 'primary' | 'secondary' | any CSS color */
    @property({ attribute: 'indicator-color' }) indicatorColor = 'primary';

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('ui-tab-click', this._onTabClick as EventListener);
    }
    disconnectedCallback() {
        this.removeEventListener('ui-tab-click', this._onTabClick as EventListener);
        super.disconnectedCallback();
    }

    private _resolveColor(c: string) {
        if (c === 'primary') return '#3b82f6';
        if (c === 'secondary') return '#8b5cf6';
        if (c === 'inherit') return 'currentColor';
        return c;
    }

    private _syncAll() {
        const tabList = this.querySelector<UiTabList>('ui-tab-list');
        const tabs = Array.from(this.querySelectorAll<UiTab>('ui-tab'));
        const panels = Array.from(this.querySelectorAll<UiTabPanel>('ui-tab-panel'));

        // If no value set, pick first enabled tab
        let active = this.value;
        if (!active) {
            const first = tabs.find(t => !t.disabled);
            if (first) active = first.value;
        }

        // Configure tab list
        if (tabList) {
            tabList.orientation = this.orientation;
            tabList.variant = this.variant;
            tabList.centered = this.centered;
            tabList.scrollButtons = this.scrollButtons;
            tabList.style.setProperty('--ui-tabs-ind-color', this._resolveColor(this.indicatorColor));
        }

        const activeClr = this._resolveColor(this.textColor);
        const inactiveClr = this.textColor === 'inherit' ? 'currentColor' : '#6b7280';

        // Sync tabs
        tabs.forEach(tab => {
            tab.selected = tab.value === active;
            tab.fullWidth = this.variant === 'fullWidth';
            tab.style.setProperty('--ui-tab-active', activeClr);
            tab.style.setProperty('--ui-tab-inactive', inactiveClr);
            tab.setAttribute('id', `tab-${tab.value}`);
            tab.setAttribute('aria-controls', `panel-${tab.value}`);
            // tabindex is handled inside UiTab via `selected` prop
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
        this.dispatchEvent(new CustomEvent('ui-tab-change', {
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
        'ui-tab': UiTab;
        'ui-tab-list': UiTabList;
        'ui-tab-panel': UiTabPanel;
        'ui-tabs': UiTabs;
    }
}
