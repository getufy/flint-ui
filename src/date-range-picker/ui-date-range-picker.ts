import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../dialog/ui-dialog.js';
import './ui-single-input-date-range-field.js';
import './ui-date-range-calendar.js';
import {
    isoToDisplay,
    defaultShortcuts,
    type DateRange, EMPTY_RANGE,
    type Shortcut,
} from './date-range-helpers.js';

/**
 * A date range picker combining a segmented field and a dual-month calendar.
 *
 * Variants:
 * - `desktop`  — calendar in a popover (default)
 * - `mobile`   — calendar in a modal dialog with Cancel/OK
 * - `static`   — always-visible calendar, no field
 * - `auto`     — desktop on pointer:fine, mobile on pointer:coarse
 *
 * @fires range-change - { detail: { value: DateRange } } when range is committed
 */
@customElement('ui-date-range-picker')
export class UiDateRangePicker extends LitElement {
    static styles = css`
    :host {
      display: inline-block;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
    }

    /* ── Field wrapper ───────────────────────────────────────────────── */
    .field-label {
      display: block;
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--ui-text-color-muted, #6b7280);
      margin-bottom: 4px;
    }

    /* ── Mobile field ────────────────────────────────────────────────── */
    .mobile-field {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--ui-surface-background, #fff);
      border: 1.5px solid var(--ui-border-color, #d1d5db);
      border-radius: var(--ui-border-radius-md, 8px);
      padding: 10px 44px 10px 14px;
      font-size: 0.9375rem;
      color: var(--ui-text-color, #111827);
      position: relative;
      min-width: 260px;
      cursor: pointer;
      box-sizing: border-box;
      transition: border-color 0.15s;
    }
    .mobile-field:hover { border-color: var(--ui-primary-color, #3b82f6); }
    :host([disabled]) .mobile-field {
      background: var(--ui-disabled-bg, #f9fafb);
      color: var(--ui-text-color-muted, #9ca3af);
      cursor: not-allowed;
      border-color: var(--ui-border-color, #e5e7eb);
    }
    .mobile-field-placeholder { color: var(--ui-text-color-muted, #9ca3af); }
    .mobile-field-icon {
      position: absolute; right: 12px;
      font-size: 1rem; color: var(--ui-text-color-muted, #6b7280);
    }

    /* ── Popover ─────────────────────────────────────────────────────── */
    .popover-anchor { position: relative; display: inline-block; }

    .popover {
      position: absolute;
      top: calc(100% + 6px);
      left: 0;
      z-index: 1400;
      background: var(--ui-surface-background, #fff);
      border-radius: var(--ui-border-radius-xl, 12px);
      box-shadow: 0 8px 24px -4px rgba(0,0,0,.18), 0 2px 8px -2px rgba(0,0,0,.1);
      transform-origin: top left;
      transform: scale(0.94) translateY(-4px);
      opacity: 0;
      visibility: hidden;
      transition: transform 0.15s cubic-bezier(0.4,0,.2,1),
                  opacity 0.15s, visibility 0.15s;
      pointer-events: none;
      display: flex;
    }
    .popover.open {
      transform: scale(1) translateY(0);
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }

    /* ── Shortcuts panel ─────────────────────────────────────────────── */
    .shortcuts-panel {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 12px 8px;
      min-width: 148px;
      border-right: 1px solid var(--ui-border-color, #e5e7eb);
    }
    .shortcut-btn {
      text-align: left;
      font-family: inherit;
      font-size: 0.8125rem;
      padding: 8px 12px;
      border: none;
      background: transparent;
      cursor: pointer;
      border-radius: 6px;
      color: var(--ui-text-color, #374151);
      transition: background 0.12s, color 0.12s;
      white-space: nowrap;
    }
    .shortcut-btn:hover {
      background: rgba(59,130,246,.08);
      color: var(--ui-primary-color, #3b82f6);
    }
    .shortcut-btn.active {
      background: var(--ui-primary-color, #3b82f6);
      color: #fff;
    }

    /* ── Popover body ────────────────────────────────────────────────── */
    .popover-body {
      display: flex;
      flex-direction: column;
    }

    /* ── Popover actions ─────────────────────────────────────────────── */
    .popover-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding: 4px 12px 12px;
      border-top: 1px solid var(--ui-border-color, #f3f4f6);
    }
    .action-btn {
      font-family: inherit;
      font-size: 0.875rem;
      font-weight: 600;
      padding: 6px 14px;
      border: none; border-radius: 6px; cursor: pointer;
      transition: background 0.12s;
    }
    .action-btn.cancel {
      background: transparent;
      color: var(--ui-text-color-muted, #6b7280);
    }
    .action-btn.cancel:hover { background: rgba(0,0,0,.06); }
    .action-btn.ok {
      background: var(--ui-primary-color, #3b82f6);
      color: #fff;
    }
    .action-btn.ok:hover { background: var(--ui-primary-color-dark, #2563eb); }

    /* ── Click-away backdrop ─────────────────────────────────────────── */
    .click-away {
      display: none;
      position: fixed; inset: 0; z-index: 1399;
    }
    .click-away.open { display: block; }

    /* ── Static wrapper ──────────────────────────────────────────────── */
    .static-wrapper {
      display: inline-block;
      border-radius: var(--ui-border-radius-xl, 12px);
      box-shadow: 0 1px 4px rgba(0,0,0,.08), 0 0 0 1px var(--ui-border-color, #e5e7eb);
      overflow: hidden;
    }

    /* ── Helper text ─────────────────────────────────────────────────── */
    .helper-text {
      font-size: 0.75rem;
      margin-top: 4px;
      color: var(--ui-text-color-muted, #6b7280);
    }
    :host([error]) .helper-text { color: var(--ui-error-color, #ef4444); }
    :host([error]) ui-single-input-date-range-field { --ui-border-color: var(--ui-error-color, #ef4444); }
  `;

    // ── Props ─────────────────────────────────────────────────────────────────

    /** Selected range [startISO, endISO]. Empty strings mean unset. */
    @property({ type: Array }) value: DateRange = [...EMPTY_RANGE];

    /** Label shown above the field. */
    @property({ type: String }) label = 'Date Range';

    /** Variant: 'desktop' | 'mobile' | 'static' | 'auto'. */
    @property({ type: String }) variant: 'desktop' | 'mobile' | 'static' | 'auto' = 'desktop';

    /** Use a multi-input field (two separate fields) instead of single-input. Currently shows two simple text displays. */
    @property({ type: Boolean, attribute: 'multi-input' }) multiInput = false;

    /** Show shortcuts panel. */
    @property({ type: Boolean }) shortcuts = false;

    /** Custom shortcuts list. Defaults to built-in shortcuts when shortcuts=true. */
    @property({ type: Array }) shortcutItems: Shortcut[] = [];

    @property({ type: String }) min = '';
    @property({ type: String }) max = '';
    @property({ type: String }) name = '';

    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) readonly = false;
    @property({ type: Boolean, reflect: true }) error = false;
    @property({ type: String, attribute: 'helper-text' }) helperText = '';

    // ── State ─────────────────────────────────────────────────────────────────

    @state() private _open = false;
    @state() private _pendingValue: DateRange = [...EMPTY_RANGE];
    @state() private _activeShortcut = '';

    // ── Computed ──────────────────────────────────────────────────────────────

    private get _resolvedVariant(): 'desktop' | 'mobile' | 'static' {
        if (this.variant === 'auto') {
            return window.matchMedia('(pointer: coarse)').matches ? 'mobile' : 'desktop';
        }
        return this.variant as 'desktop' | 'mobile' | 'static';
    }

    private get _effectiveShortcuts(): Shortcut[] {
        return this.shortcutItems.length ? this.shortcutItems : defaultShortcuts();
    }

    // ── Open / close ──────────────────────────────────────────────────────────

    private _openPicker() {
        if (this.disabled || this.readonly || this._open) return;
        this._pendingValue = [...this.value];
        this._open = true;
    }

    private _closePicker() {
        this._open = false;
    }

    // ── Event handlers ────────────────────────────────────────────────────────

    private _handleCalendarSelect(e: CustomEvent) {
        const range = e.detail.value as DateRange;
        this._pendingValue = range;
        this._activeShortcut = '';

        const v = this._resolvedVariant;
        // Auto-commit on desktop once full range is selected
        if (v === 'desktop' && range[0] && range[1]) {
            this._commit(range);
        }
    }

    private _handleFieldRangeChange(e: CustomEvent) {
        const range = e.detail.value as DateRange;
        this._commit(range);
    }

    private async _handleShortcut(shortcut: Shortcut) {
        const range = shortcut.getValue();
        this._pendingValue = range;
        this._activeShortcut = shortcut.label;

        const v = this._resolvedVariant;
        // Desktop and static commit immediately; mobile waits for OK
        if (v === 'desktop' || v === 'static') {
            this._commit(range);
        }

        // Navigate the calendar to show the start month of the shortcut range
        if (range[0]) {
            await this.updateComplete;
            const cal = this.shadowRoot?.querySelector('ui-date-range-calendar') as { navigateTo?: (iso: string) => void } | null;
            cal?.navigateTo?.(range[0]);
        }
    }

    private _handleStaticSelect(e: CustomEvent) {
        const range = e.detail.value as DateRange;
        this._commit(range);
    }

    private _commit(range: DateRange) {
        const [ps, pe] = this.value;
        const [ns, ne] = range;
        if (ns === ps && ne === pe) { this._closePicker(); return; }
        this.value = range;
        this.dispatchEvent(new CustomEvent('range-change', {
            detail: { value: range }, bubbles: true, composed: true,
        }));
        if (range[0] && range[1]) this._closePicker();
    }

    private _handleMobileOk() {
        this._commit(this._pendingValue[0] && this._pendingValue[1]
            ? this._pendingValue
            : this.value);
    }

    private _handleMobileCancel() {
        this._pendingValue = [...this.value];
        this._activeShortcut = '';
        this._closePicker();
    }

    // ── Render helpers ────────────────────────────────────────────────────────

    private _formatRange(range: DateRange): string {
        const [s, e] = range;
        if (!s && !e) return '';
        const start = isoToDisplay(s) || '?';
        const end = isoToDisplay(e) || '?';
        return `${start} – ${end}`;
    }

    private _renderShortcuts() {
        if (!this.shortcuts) return nothing;
        return html`
      <div class="shortcuts-panel">
        ${this._effectiveShortcuts.map(sc => html`
          <button
            class="shortcut-btn ${this._activeShortcut === sc.label ? 'active' : ''}"
            @click=${() => this._handleShortcut(sc)}
          >${sc.label}</button>
        `)}
      </div>
    `;
    }

    private _renderCalendar(value: DateRange, onSelect: (e: CustomEvent) => void) {
        return html`
      <ui-date-range-calendar
        .value=${value}
        .min=${this.min}
        .max=${this.max}
        ?disabled=${this.disabled}
        @range-select=${onSelect}
      ></ui-date-range-calendar>
    `;
    }

    private _renderField() {
        return html`
      ${this.label ? html`<label class="field-label">${this.label}</label>` : nothing}
      <ui-single-input-date-range-field
        .value=${this.value}
        .min=${this.min}
        .max=${this.max}
        .name=${this.name}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        ?error=${this.error}
        @range-change=${this._handleFieldRangeChange}
        @focus=${this._openPicker}
      ></ui-single-input-date-range-field>
      ${this.helperText ? html`<p class="helper-text">${this.helperText}</p>` : nothing}
    `;
    }

    private _renderMobileField() {
        const formatted = this._formatRange(this.value);
        return html`
      ${this.label ? html`<label class="field-label">${this.label}</label>` : nothing}
      <div class="mobile-field"
        role="button"
        tabindex=${this.disabled ? -1 : 0}
        aria-label="Select date range"
        aria-haspopup="dialog"
        aria-expanded=${this._open}
        @click=${this._openPicker}
        @keydown=${(e: KeyboardEvent) => (e.key === 'Enter' || e.key === ' ') && this._openPicker()}
      >
        ${formatted
                ? html`<span>${formatted}</span>`
                : html`<span class="mobile-field-placeholder">Start date – End date</span>`}
        <span class="mobile-field-icon">📅</span>
      </div>
      ${this.helperText ? html`<p class="helper-text">${this.helperText}</p>` : nothing}
    `;
    }

    // ── Variant renders ───────────────────────────────────────────────────────

    private _renderDesktop() {
        const pending = this._pendingValue[0] || this._pendingValue[1]
            ? this._pendingValue
            : this.value;

        return html`
      <div>
        <div class="popover-anchor">
          ${this._renderField()}
          <div class="click-away ${this._open ? 'open' : ''}" @click=${this._closePicker}></div>
          <div class="popover ${this._open ? 'open' : ''}" role="dialog" aria-label="Date range picker">
            ${this._renderShortcuts()}
            <div class="popover-body">
              ${this._renderCalendar(pending, (e: CustomEvent) => this._handleCalendarSelect(e))}
            </div>
          </div>
        </div>
      </div>
    `;
    }

    private _renderMobile() {
        const pending = this._pendingValue[0] || this._pendingValue[1]
            ? this._pendingValue
            : this.value;

        return html`
      <div>
        ${this._renderMobileField()}
        <ui-dialog
          .open=${this._open}
          disable-backdrop-close
          @close=${this._closePicker}
          style="--ui-dialog-width:640px"
        >
          <ui-dialog-title>Select Date Range</ui-dialog-title>
          <ui-dialog-content style="padding:0 12px 4px;display:flex;">
            ${this._renderShortcuts()}
            ${this._renderCalendar(pending, (e: CustomEvent) => this._handleCalendarSelect(e))}
          </ui-dialog-content>
          <ui-dialog-actions>
            <button class="action-btn cancel" @click=${this._handleMobileCancel}>Cancel</button>
            <button class="action-btn ok"
              ?disabled=${!this._pendingValue[0] || !this._pendingValue[1]}
              @click=${this._handleMobileOk}>OK</button>
          </ui-dialog-actions>
        </ui-dialog>
      </div>
    `;
    }

    private _renderStatic() {
        return html`
      <div class="static-wrapper">
        ${this.shortcuts ? html`
          <div style="display:flex;">
            ${this._renderShortcuts()}
            ${this._renderCalendar(this.value, (e: CustomEvent) => this._handleStaticSelect(e))}
          </div>
        ` : this._renderCalendar(this.value, (e: CustomEvent) => this._handleStaticSelect(e))}
      </div>
    `;
    }

    render() {
        const v = this._resolvedVariant;
        if (v === 'static') return this._renderStatic();
        if (v === 'mobile') return this._renderMobile();
        return this._renderDesktop();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-date-range-picker': UiDateRangePicker;
    }
}
