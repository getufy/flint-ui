import { unsafeCSS, html, nothing, LitElement, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { FlintElement } from '../flint-element.js';
import { FormAssociated } from '../mixins/form-associated.js';
import { FormControlController } from '../controllers/form-control.js';
import { FlintDialog, FlintDialogTitle, FlintDialogContent, FlintDialogActions } from '../dialog/flint-dialog.component.js';
import { LocalizeController } from '../utilities/localize.js';
import uiDatePickerCalendarStyles from './flint-date-picker-calendar.css?inline';
import uiDatePickerStyles from './flint-date-picker.css?inline';

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

// ─── flint-date-picker-calendar ──────────────────────────────────────────────────

/**
 * A standalone calendar grid — the core date-selection view.
 * Used internally by flint-date-picker, but can also be used on its own.
 *
 * @fires flint-date-picker-select  - { detail: { value: string } } ISO date YYYY-MM-DD
 */
export class FlintDatePickerCalendar extends FlintElement {
    static styles = unsafeCSS(uiDatePickerCalendarStyles);

    private _localize = new LocalizeController(this);

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
        this.dispatchEvent(new CustomEvent('flint-date-picker-select', {
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
        <button class="nav-btn" @click=${this._prevMonth} aria-label=${this._localize.term('previousMonth')}>‹</button>
        <span class="header-label" @click=${() => this._mode = 'month'} role="button" tabindex="0"
          @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && (this._mode = 'month')}
        >
          ${MONTHS[this._viewMonth]} ${this._viewYear}
        </span>
        <button class="nav-btn" @click=${this._nextMonth} aria-label=${this._localize.term('nextMonth')}>›</button>
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
            aria-selected=${c.isSelected ? 'true' : nothing}
            aria-disabled=${c.isDisabled ? 'true' : nothing}
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
      <div class="calendar" part="calendar">
        ${this._mode === 'day' ? this._renderDayView()
                : this._mode === 'month' ? this._renderMonthView()
                    : this._renderYearView()}
      </div>
    `;
    }
}

// ─── flint-date-picker ───────────────────────────────────────────────────────────

/**
 * A date picker with a text field and a calendar popover/modal.
 *
 * Variants:
 * - 'desktop'  — calendar appears in a popover (default)
 * - 'mobile'   — calendar appears in a full dialog/modal
 * - 'static'   — calendar always visible, no field
 * - 'auto'     — desktop on pointer:fine, mobile on pointer:coarse
 *
 * @fires flint-date-picker-change - Fired when the date changes. detail: `{ value: string }`
 */
export class FlintDatePicker extends FormAssociated(FlintElement) {
    static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
    static styles = unsafeCSS(uiDatePickerStyles);
    private _localize = new LocalizeController(this);
    static dependencies = {
        'flint-dialog': FlintDialog as unknown as typeof FlintElement,
        'flint-dialog-title': FlintDialogTitle as unknown as typeof FlintElement,
        'flint-dialog-content': FlintDialogContent as unknown as typeof FlintElement,
        'flint-dialog-actions': FlintDialogActions as unknown as typeof FlintElement,
    };

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

    /** Error message displayed below the field when in error state. */
    @property({ type: String, attribute: 'error-message' }) errorMessage = '';

    /** Marks the date picker as required for form validation. */
    @property({ type: Boolean, reflect: true }) required = false;

    /** Initial value for uncontrolled usage (ISO string). */
    @property({ type: String, attribute: 'default-value' }) defaultValue = '';

    /**
     * When true, the calendar popover uses `position: fixed` instead of `position: absolute`
     * so it can escape containers with `overflow: hidden` or `overflow: clip`.
     * Only applies to the 'desktop' variant.
     */
    @property({ type: Boolean }) hoist = false;

    private _formControl = new FormControlController(this);

    // ── State ───────────────────────────────────────────────────────────────
    @state() private _open = false;
    @state() private _pendingValue = ''; // value being edited before OK is clicked

    protected override willUpdate(changed: PropertyValues) {
        super.willUpdate(changed);
        if (this._firstUpdate) {
            this._firstUpdate = false;
            if (this.defaultValue && !this.value) {
                this.value = this.defaultValue;
            }
        }
    }

    protected override updated(changed: PropertyValues) {
        super.updated(changed);
        if (changed.has('value') || changed.has('name') || changed.has('required')) {
            this._updateFormValue();
        }
    }

    private _updateFormValue() {
        this._initFormValue(this.value || null);
        this._initFormValidity(this.required, !this.value, 'Please select a date.');
        this._formControl.updateDataAttributes();
    }

    formResetCallback() {
        this.value = this.defaultValue;
        this._updateFormValue();
        this._formControl.reset();
    }

    // ── Computed variant ────────────────────────────────────────────────────
    private get _resolvedVariant(): 'desktop' | 'mobile' | 'static' {
        if (this.variant === 'auto') {
            return window.matchMedia('(pointer: coarse)').matches ? 'mobile' : 'desktop';
        }
        return this.variant as 'desktop' | 'mobile' | 'static';
    }

    /* ── Hoist (fixed positioning) ─────────────────────────────────── */

    private _scrollHandler = () => this._handleReposition();
    private _resizeHandler = () => this._handleReposition();

    /** Recalculates fixed position for the popover based on the field's bounding rect. */
    private _handleReposition(): void {
        const popover = this.shadowRoot?.querySelector('.popover') as HTMLElement | null;
        const fieldWrapper = this.shadowRoot?.querySelector('.field-wrapper') as HTMLElement | null;
        if (!popover || !fieldWrapper) return;

        const rect = fieldWrapper.getBoundingClientRect();
        popover.style.setProperty('position', 'fixed');
        popover.style.setProperty('top', `${rect.bottom + 6}px`);
        popover.style.setProperty('left', `${rect.left}px`);
        popover.style.setProperty('width', 'auto');
    }

    /** Starts listening for scroll/resize to keep the hoisted popover in position. */
    private _startHoist(): void {
        void this.updateComplete.then(() => {
            this._handleReposition();
            window.addEventListener('scroll', this._scrollHandler, true);
            window.addEventListener('resize', this._resizeHandler);
        });
    }

    /** Removes scroll/resize listeners and clears inline styles from the popover. */
    private _cleanupHoist(): void {
        window.removeEventListener('scroll', this._scrollHandler, true);
        window.removeEventListener('resize', this._resizeHandler);

        const popover = this.shadowRoot?.querySelector('.popover') as HTMLElement | null;
        if (popover) {
            popover.style.removeProperty('position');
            popover.style.removeProperty('top');
            popover.style.removeProperty('left');
            popover.style.removeProperty('width');
        }
    }

    private _openPicker() {
        if (this.disabled || this._open) return;
        this._pendingValue = this.value;
        this._open = true;
        if (this.hoist && this._resolvedVariant === 'desktop') {
            this._startHoist();
        }
    }

    private _closePicker() {
        this._open = false;
        this._cleanupHoist();
    }

    private _handleCalendarSelect(e: CustomEvent) {
        const iso = e.detail.value as string;
        // Always stage the value; commit immediately for desktop (mobile needs OK)
        this._pendingValue = iso;
        if (this._resolvedVariant !== 'mobile') {
            this._commit(iso);
        }
    }

    private _handleStaticSelect(e: CustomEvent) {
        const iso = e.detail.value as string;
        this._commit(iso);
    }

    private _commit(iso: string) {
        if (iso === this.value) { this._closePicker(); return; }
        this.value = iso;
        this.dispatchEvent(new CustomEvent('flint-date-picker-change', {
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
            if (isNaN(new Date(iso).getTime())) return;
            if (this.min && iso < this.min) return;
            if (this.max && iso > this.max) return;
            this._commit(iso);
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
          aria-expanded=${this._open ? 'true' : nothing}
          @input=${this._handleFieldInput}
          @focus=${() => { if (this.readonly) this._openPicker(); }}
        />
        <button
          class="calendar-icon-btn"
          aria-label=${this._localize.term('openDatePicker')}
          aria-haspopup="true"
          tabindex=${this.disabled ? -1 : 0}
          @click=${this._openPicker}
        >
          📅
        </button>
      </div>
      ${this.error && this.errorMessage
          ? html`<p class="helper-text error-text" role="alert">${this.errorMessage}</p>`
          : this.helperText
              ? html`<p class="helper-text">${this.helperText}</p>`
              : nothing}
    `;
    }


    // ── Desktop variant ─────────────────────────────────────────────────────
    private _renderDesktop() {
        return html`
      <div>
        <div class="popover-anchor">
          ${this._renderField()}
          <div class="click-away ${this._open ? 'open' : ''}" @click=${this._closePicker}></div>
          <div class="popover ${this._open ? 'open' : ''} ${this.hoist ? 'hoisted' : ''}" part="popover" role="dialog" aria-label="Date picker">
            <flint-date-picker-calendar
              .value=${this.value}
              .min=${this.min}
              .max=${this.max}
              ?disabled=${this.disabled}
              @flint-date-picker-select=${this._handleCalendarSelect}
            ></flint-date-picker-calendar>
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
        <flint-dialog
          .open=${this._open}
          disable-backdrop-close
          @flint-dialog-close=${this._closePicker}
          style="--flint-dialog-width:320px"
        >
          <flint-dialog-title>${this._localize.term('selectDate')}</flint-dialog-title>
          <flint-dialog-content style="padding:0 12px 4px;">
            <flint-date-picker-calendar
              .value=${this._pendingValue || this.value}
              .min=${this.min}
              .max=${this.max}
              ?disabled=${this.disabled}
              @flint-date-picker-select=${this._handleCalendarSelect}
            ></flint-date-picker-calendar>
          </flint-dialog-content>
          <flint-dialog-actions>
            <button class="action-btn cancel" @click=${this._handleMobileCancel}>${this._localize.term('cancel')}</button>
            <button class="action-btn ok" @click=${this._handleMobileOk}>${this._localize.term('ok')}</button>
          </flint-dialog-actions>
        </flint-dialog>
      </div>
    `;
    }

    // ── Static variant ──────────────────────────────────────────────────────
    private _renderStatic() {
        return html`
      <div class="static-wrapper">
        <flint-date-picker-calendar
          .value=${this.value}
          .min=${this.min}
          .max=${this.max}
          ?disabled=${this.disabled}
          @flint-date-picker-select=${this._handleStaticSelect}
        ></flint-date-picker-calendar>
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
        'flint-date-picker': FlintDatePicker;
        'flint-date-picker-calendar': FlintDatePickerCalendar;
    }
}