import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import '../dialog/ui-dialog.js';

// ─── helpers ──────────────────────────────────────────────────────────────────

const DAYS_SHORT = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

function isoToDate(iso: string): Date | null {
    if (!iso) return null;
    const [y, m, d] = iso.split('-').map(Number);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d);
}
function dateToIso(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}
function isoToDisplay(iso: string): string {
    const d = isoToDate(iso);
    if (!d) return '';
    return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`;
}
function today(): string { return dateToIso(new Date()); }
function sameDay(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

interface CalendarDay {
    date: Date;
    iso: string;
    day: number;
    isCurrentMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
    isDisabled: boolean;
}

function buildMonthGrid(year: number, month: number, selected: string | null, min: string | null, max: string | null): CalendarDay[] {
    const cells: CalendarDay[] = [];
    const firstDay = new Date(year, month, 1);
    const todayIso = today();
    const todayDate = isoToDate(todayIso)!;
    const selectedDate = selected ? isoToDate(selected) : null;
    const minDate = min ? isoToDate(min) : null;
    const maxDate = max ? isoToDate(max) : null;

    // Leading days from previous month
    const startDow = firstDay.getDay(); // 0=sun
    for (let i = startDow - 1; i >= 0; i--) {
        const d = new Date(year, month, -i);
        const iso = dateToIso(d);
        cells.push({
            date: d, iso, day: d.getDate(), isCurrentMonth: false,
            isToday: sameDay(d, todayDate),
            isSelected: selectedDate ? sameDay(d, selectedDate) : false,
            isDisabled: (minDate ? d < minDate : false) || (maxDate ? d > maxDate : false)
        });
    }

    // Current month days
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(year, month, d);
        const iso = dateToIso(date);
        cells.push({
            date, iso, day: d, isCurrentMonth: true,
            isToday: sameDay(date, todayDate),
            isSelected: selectedDate ? sameDay(date, selectedDate) : false,
            isDisabled: (minDate ? date < minDate : false) || (maxDate ? date > maxDate : false)
        });
    }

    // Trailing days to fill the grid (always 6 rows)
    const remaining = 42 - cells.length;
    for (let d = 1; d <= remaining; d++) {
        const date = new Date(year, month + 1, d);
        const iso = dateToIso(date);
        cells.push({
            date, iso, day: d, isCurrentMonth: false,
            isToday: sameDay(date, todayDate),
            isSelected: selectedDate ? sameDay(date, selectedDate) : false,
            isDisabled: (minDate ? date < minDate : false) || (maxDate ? date > maxDate : false)
        });
    }
    return cells;
}

// ─── ui-date-picker-calendar ──────────────────────────────────────────────────

/**
 * A standalone calendar grid — the core date-selection view.
 * Used internally by ui-date-picker, but can also be used on its own.
 *
 * @fires date-select  - { detail: { value: string } } ISO date YYYY-MM-DD
 */
@customElement('ui-date-picker-calendar')
export class UiDatePickerCalendar extends LitElement {
    static styles = css`
    :host {
      display: inline-block;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      user-select: none;
    }

    .calendar {
      width: 296px;
      background: var(--ui-surface-background, #fff);
      border-radius: var(--ui-border-radius-xl, 12px);
      overflow: hidden;
    }

    /* Header */
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 8px 8px;
    }
    .header-label {
      font-size: 0.9375rem;
      font-weight: 600;
      color: var(--ui-text-color, #111827);
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 6px;
      transition: background 0.12s;
    }
    .header-label:hover { background: rgba(0,0,0,.04); }

    .nav-btn {
      display: flex; align-items: center; justify-content: center;
      width: 32px; height: 32px;
      border: none; background: transparent; cursor: pointer;
      border-radius: 50%; color: var(--ui-text-color-muted, #6b7280);
      font-size: 1rem; transition: background 0.12s;
    }
    .nav-btn:hover { background: rgba(0,0,0,.06); }
    .nav-btn:disabled { opacity: 0.3; cursor: default; }

    /* Day-of-week row */
    .dow-row {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      padding: 0 8px;
      margin-bottom: 4px;
    }
    .dow-cell {
      text-align: center;
      font-size: 0.6875rem;
      font-weight: 600;
      color: var(--ui-text-color-muted, #9ca3af);
      padding: 4px 0;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    /* Day grid */
    .day-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      padding: 0 8px 12px;
      gap: 2px 0;
    }

    .day-cell {
      display: flex; align-items: center; justify-content: center;
      height: 36px;
      width: 100%;
      border: none; background: transparent; cursor: pointer;
      border-radius: 50%;
      font-size: 0.8125rem;
      color: var(--ui-text-color, #374151);
      transition: background 0.1s, color 0.1s;
      position: relative;
    }
    .day-cell:hover:not(.disabled):not(.selected) { background: rgba(0,0,0,.06); }
    .day-cell.other-month { color: var(--ui-text-color-muted, #d1d5db); }
    .day-cell.today:not(.selected) {
      color: var(--ui-primary-color, #3b82f6);
      font-weight: 700;
    }
    .day-cell.today:not(.selected)::after {
      content: '';
      position: absolute;
      bottom: 4px;
      left: 50%; transform: translateX(-50%);
      width: 4px; height: 4px;
      border-radius: 50%;
      background: var(--ui-primary-color, #3b82f6);
    }
    .day-cell.selected {
      background: var(--ui-primary-color, #3b82f6);
      color: #fff;
      font-weight: 700;
    }
    .day-cell.selected:hover { background: var(--ui-primary-color-dark, #2563eb); }
    .day-cell.disabled {
      opacity: 0.35;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Year picker overlay */
    .year-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      padding: 12px;
      max-height: 220px;
      overflow-y: auto;
    }
    .year-btn {
      padding: 8px 4px;
      border: none; background: transparent; cursor: pointer;
      border-radius: 6px; font-size: 0.875rem;
      color: var(--ui-text-color, #374151);
      transition: background 0.12s;
    }
    .year-btn:hover { background: rgba(0,0,0,.06); }
    .year-btn.selected-year {
      background: var(--ui-primary-color, #3b82f6);
      color: #fff;
      font-weight: 700;
    }

    /* Month picker overlay */
    .month-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      padding: 12px;
    }
    .month-btn {
      padding: 10px 4px;
      border: none; background: transparent; cursor: pointer;
      border-radius: 6px; font-size: 0.8125rem;
      color: var(--ui-text-color, #374151);
      transition: background 0.12s;
    }
    .month-btn:hover { background: rgba(0,0,0,.06); }
    .month-btn.selected-month {
      background: var(--ui-primary-color, #3b82f6);
      color: #fff;
      font-weight: 700;
    }
  `;

    /** Currently selected value as ISO string (YYYY-MM-DD). */
    @property({ type: String }) value?: string;

    /** Minimum selectable date (ISO). */
    @property({ type: String }) min?: string;

    /** Maximum selectable date (ISO). */
    @property({ type: String }) max?: string;

    /** Disable all interaction. */
    @property({ type: Boolean }) disabled = false;

    @state() private _viewYear = new Date().getFullYear();
    @state() private _viewMonth = new Date().getMonth();
    @state() private _mode: 'day' | 'month' | 'year' = 'day';

    connectedCallback() {
        super.connectedCallback();
        // Sync view to the current value
        if (this.value) {
            const d = isoToDate(this.value);
            if (d) { this._viewYear = d.getFullYear(); this._viewMonth = d.getMonth(); }
        }
    }

    /** Navigate to the month/year of a given ISO date programmatically. */
    navigateTo(iso: string) {
        const d = isoToDate(iso);
        if (d) { this._viewYear = d.getFullYear(); this._viewMonth = d.getMonth(); }
    }

    private _prevMonth() {
        if (this._viewMonth === 0) { this._viewMonth = 11; this._viewYear--; }
        else this._viewMonth--;
    }
    private _nextMonth() {
        if (this._viewMonth === 11) { this._viewMonth = 0; this._viewYear++; }
        else this._viewMonth++;
    }

    private _selectDay(cell: CalendarDay) {
        if (cell.isDisabled || this.disabled) return;
        this.dispatchEvent(new CustomEvent('date-select', {
            detail: { value: cell.iso }, bubbles: true, composed: true
        }));
    }

    private _selectYear(year: number) {
        this._viewYear = year;
        this._mode = 'month';
    }

    private _selectMonth(month: number) {
        this._viewMonth = month;
        this._mode = 'day';
    }

    private _renderDayView() {
        const grid = buildMonthGrid(this._viewYear, this._viewMonth, this.value ?? null, this.min ?? null, this.max ?? null);
        return html`
      <div class="header">
        <button class="nav-btn" @click=${this._prevMonth} aria-label="Previous month">‹</button>
        <span class="header-label" @click=${() => this._mode = 'month'} role="button" tabindex="0"
          @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && (this._mode = 'month')}
        >
          ${MONTHS[this._viewMonth]} ${this._viewYear}
        </span>
        <button class="nav-btn" @click=${this._nextMonth} aria-label="Next month">›</button>
      </div>
      <div class="dow-row">${DAYS_SHORT.map(d => html`<span class="dow-cell">${d}</span>`)}</div>
      <div class="day-grid" role="grid" aria-label="Calendar">
        ${repeat(grid, c => c.iso, c => html`
          <button
            class=${classMap({
            'day-cell': true,
            'other-month': !c.isCurrentMonth,
            'today': c.isToday,
            'selected': c.isSelected,
            'disabled': c.isDisabled,
        })}
            aria-label=${c.date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            aria-selected=${c.isSelected}
            aria-disabled=${c.isDisabled}
            tabindex=${c.isCurrentMonth && !c.isDisabled ? 0 : -1}
            @click=${() => this._selectDay(c)}
          >${c.day}</button>
        `)}
      </div>
    `;
    }

    private _renderMonthView() {
        return html`
      <div class="header">
        <button class="nav-btn" @click=${() => this._viewYear--} aria-label="Previous year">‹</button>
        <span class="header-label" @click=${() => this._mode = 'year'} role="button" tabindex="0">${this._viewYear}</span>
        <button class="nav-btn" @click=${() => this._viewYear++} aria-label="Next year">›</button>
      </div>
      <div class="month-grid">
        ${MONTHS.map((m, i) => html`
          <button class=${classMap({ 'month-btn': true, 'selected-month': i === this._viewMonth })}
            @click=${() => this._selectMonth(i)}>${m.slice(0, 3)}</button>
        `)}
      </div>
    `;
    }

    private _renderYearView() {
        const currentYear = new Date().getFullYear();
        const years = Array.from({ length: 201 }, (_, i) => currentYear - 100 + i);
        return html`
      <div class="header">
        <span class="header-label" style="cursor:default">Select Year</span>
      </div>
      <div class="year-grid">
        ${years.map(y => html`
          <button class=${classMap({ 'year-btn': true, 'selected-year': y === this._viewYear })}
            @click=${() => this._selectYear(y)}>${y}</button>
        `)}
      </div>
    `;
    }

    render() {
        return html`
      <div class="calendar">
        ${this._mode === 'day' ? this._renderDayView()
                : this._mode === 'month' ? this._renderMonthView()
                    : this._renderYearView()}
      </div>
    `;
    }
}

// ─── ui-date-picker ───────────────────────────────────────────────────────────

/**
 * A date picker with a text field and a calendar popover/modal.
 *
 * Variants:
 * - 'desktop'  — calendar appears in a popover (default)
 * - 'mobile'   — calendar appears in a full dialog/modal
 * - 'static'   — calendar always visible, no field
 * - 'auto'     — desktop on pointer:fine, mobile on pointer:coarse
 *
 * @fires change - { detail: { value: string } } when the date changes
 */
@customElement('ui-date-picker')
export class UiDatePicker extends LitElement {
    static styles = css`
    :host {
      display: inline-block;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
    }

    /* ── Field ─────────────────────────────────────────────────────── */
    .field-wrapper {
      position: relative;
      display: inline-flex;
      align-items: center;
    }

    .field-label {
      display: block;
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--ui-text-color-muted, #6b7280);
      margin-bottom: 4px;
    }

    .field-input {
      font-family: inherit;
      font-size: 0.9375rem;
      color: var(--ui-text-color, #111827);
      background: var(--ui-surface-background, #fff);
      border: 1.5px solid var(--ui-border-color, #d1d5db);
      border-radius: var(--ui-border-radius-md, 8px);
      padding: 10px 44px 10px 14px;
      width: 180px;
      outline: none;
      transition: border-color 0.15s, box-shadow 0.15s;
      box-sizing: border-box;
      cursor: text;
    }
    .field-input::placeholder { color: var(--ui-text-color-muted, #9ca3af); }
    .field-input:focus {
      border-color: var(--ui-primary-color, #3b82f6);
      box-shadow: 0 0 0 3px rgba(59,130,246,.15);
    }
    :host([disabled]) .field-input {
      background: var(--ui-disabled-bg, #f9fafb);
      color: var(--ui-text-color-muted, #9ca3af);
      cursor: not-allowed;
      border-color: var(--ui-border-color, #e5e7eb);
    }
    :host([readonly]) .field-input { cursor: default; }

    .calendar-icon-btn {
      position: absolute;
      right: 10px;
      display: flex; align-items: center; justify-content: center;
      width: 28px; height: 28px;
      border: none; background: transparent; cursor: pointer;
      border-radius: 50%; color: var(--ui-text-color-muted, #6b7280);
      transition: background 0.12s, color 0.12s;
      font-size: 1rem;
    }
    .calendar-icon-btn:hover { background: rgba(0,0,0,.06); color: var(--ui-primary-color, #3b82f6); }
    :host([disabled]) .calendar-icon-btn { pointer-events: none; opacity: 0.4; }
    :host([readonly]) .calendar-icon-btn { pointer-events: none; }

    /* Error state */
    :host([error]) .field-input {
      border-color: var(--ui-error-color, #ef4444);
    }
    :host([error]) .field-input:focus {
      box-shadow: 0 0 0 3px rgba(239,68,68,.15);
    }
    .helper-text {
      font-size: 0.75rem;
      margin-top: 4px;
      color: var(--ui-text-color-muted, #6b7280);
    }
    :host([error]) .helper-text { color: var(--ui-error-color, #ef4444); }

    /* ── Desktop popover ───────────────────────────────────────────── */
    .popover-anchor {
      position: relative;
      display: inline-block;
    }

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
    }
    .popover.open {
      transform: scale(1) translateY(0);
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }

    /* Popover actions row */
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

    /* ── Static ─────────────────────────────────────────────────────── */
    .static-wrapper {
      display: inline-block;
      border-radius: var(--ui-border-radius-xl, 12px);
      box-shadow: 0 1px 4px rgba(0,0,0,.08), 0 0 0 1px var(--ui-border-color, #e5e7eb);
      overflow: hidden;
    }

    /* ── Click-away backdrop (desktop) ──────────────────────────────── */
    .click-away {
      display: none;
      position: fixed; inset: 0; z-index: 1399;
    }
    .click-away.open { display: block; }
  `;

    // ── Props ───────────────────────────────────────────────────────────────
    /** Selected date as ISO string (YYYY-MM-DD). */
    @property({ type: String }) value = '';

    /** Label shown above the field. */
    @property({ type: String }) label = 'Date';

    /** Placeholder shown in the empty field. */
    @property({ type: String }) placeholder = 'MM/DD/YYYY';

    /** Form field name attribute. */
    @property({ type: String }) name = '';

    /** Variant: 'desktop' | 'mobile' | 'static' | 'auto'. */
    @property({ type: String }) variant: 'desktop' | 'mobile' | 'static' | 'auto' = 'desktop';

    /** Minimum selectable date (ISO). */
    @property({ type: String }) min = '';

    /** Maximum selectable date (ISO). */
    @property({ type: String }) max = '';

    /** Disables the picker. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    /** Makes the field read-only (auto-opens a picker when clicked). */
    @property({ type: Boolean, reflect: true }) readonly = false;

    /** Shows error styling. */
    @property({ type: Boolean, reflect: true }) error = false;

    /** Helper/error text below the field. */
    @property({ type: String, attribute: 'helper-text' }) helperText = '';

    // ── State ───────────────────────────────────────────────────────────────
    @state() private _open = false;
    @state() private _pendingValue = ''; // value being edited before OK is clicked

    // ── Computed variant ────────────────────────────────────────────────────
    private get _resolvedVariant(): 'desktop' | 'mobile' | 'static' {
        if (this.variant === 'auto') {
            return window.matchMedia('(pointer: coarse)').matches ? 'mobile' : 'desktop';
        }
        return this.variant as 'desktop' | 'mobile' | 'static';
    }

    private _openPicker() {
        if (this.disabled || this._open) return;
        this._pendingValue = this.value;
        this._open = true;
    }

    private _closePicker() {
        this._open = false;
    }

    private _handleCalendarSelect(e: CustomEvent) {
        const iso = e.detail.value as string;
        const variant = this._resolvedVariant;

        if (variant === 'desktop') {
            // Immediate commit for desktop popover (no separate OK needed, but we keep pending for cancel)
            this._pendingValue = iso;
            this._commit(iso);
        } else if (variant === 'mobile') {
            // In mobile we stage the selection; OK commits it
            this._pendingValue = iso;
        }
    }

    private _handleStaticSelect(e: CustomEvent) {
        const iso = e.detail.value as string;
        this._commit(iso);
    }

    private _commit(iso: string) {
        if (iso === this.value) { this._closePicker(); return; }
        this.value = iso;
        this.dispatchEvent(new CustomEvent('change', {
            detail: { value: iso }, bubbles: true, composed: true
        }));
        this._closePicker();
    }

    private _handleMobileOk() {
        this._commit(this._pendingValue || this.value);
    }

    private _handleMobileCancel() {
        this._pendingValue = this.value;
        this._closePicker();
    }

    private _handleFieldInput(e: Event) {
        if (this.readonly) return;
        const v = (e.target as HTMLInputElement).value;
        // Try parsing MM/DD/YYYY
        const m = v.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
        if (m) {
            const iso = `${m[3]}-${m[1]}-${m[2]}`;
            if (!isNaN(new Date(iso).getTime())) {
                this._commit(iso);
            }
        }
    }

    // ── Field ───────────────────────────────────────────────────────────────
    private _renderField() {
        return html`
      ${this.label ? html`<label class="field-label" for="dp-input">${this.label}</label>` : nothing}
      <div class="field-wrapper">
        <input
          id="dp-input"
          class="field-input"
          type="text"
          .value=${isoToDisplay(this.value)}
          placeholder=${this.placeholder}
          name=${this.name || nothing}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          aria-label=${this.label || 'Date'}
          aria-haspopup="true"
          aria-expanded=${this._open}
          @input=${this._handleFieldInput}
          @focus=${() => { if (this.readonly) this._openPicker(); }}
        />
        <button
          class="calendar-icon-btn"
          aria-label="Open date picker"
          aria-haspopup="true"
          tabindex=${this.disabled ? -1 : 0}
          @click=${this._openPicker}
        >
          📅
        </button>
      </div>
      ${this.helperText ? html`<p class="helper-text">${this.helperText}</p>` : nothing}
    `;
    }


    // ── Desktop variant ─────────────────────────────────────────────────────
    private _renderDesktop() {
        return html`
      <div>
        <div class="popover-anchor">
          ${this._renderField()}
          <div class="click-away ${this._open ? 'open' : ''}" @click=${this._closePicker}></div>
          <div class="popover ${this._open ? 'open' : ''}" role="dialog" aria-label="Date picker">
            <ui-date-picker-calendar
              .value=${this.value}
              .min=${this.min}
              .max=${this.max}
              ?disabled=${this.disabled}
              @date-select=${this._handleCalendarSelect}
            ></ui-date-picker-calendar>
          </div>
        </div>
      </div>
    `;
    }

    // ── Mobile variant ──────────────────────────────────────────────────────
    private _renderMobile() {
        return html`
      <div>
        ${this._renderField()}
        <ui-dialog
          .open=${this._open}
          disable-backdrop-close
          @close=${this._closePicker}
          style="--ui-dialog-width:320px"
        >
          <ui-dialog-title>Select Date</ui-dialog-title>
          <ui-dialog-content style="padding:0 12px 4px;">
            <ui-date-picker-calendar
              .value=${this._pendingValue || this.value}
              .min=${this.min}
              .max=${this.max}
              ?disabled=${this.disabled}
              @date-select=${this._handleCalendarSelect}
            ></ui-date-picker-calendar>
          </ui-dialog-content>
          <ui-dialog-actions>
            <button class="action-btn cancel" @click=${this._handleMobileCancel}>Cancel</button>
            <button class="action-btn ok" @click=${this._handleMobileOk}>OK</button>
          </ui-dialog-actions>
        </ui-dialog>
      </div>
    `;
    }

    // ── Static variant ──────────────────────────────────────────────────────
    private _renderStatic() {
        return html`
      <div class="static-wrapper">
        <ui-date-picker-calendar
          .value=${this.value}
          .min=${this.min}
          .max=${this.max}
          ?disabled=${this.disabled}
          @date-select=${this._handleStaticSelect}
        ></ui-date-picker-calendar>
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
        'ui-date-picker': UiDatePicker;
        'ui-date-picker-calendar': UiDatePickerCalendar;
    }
}
