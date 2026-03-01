import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import {
    DAYS_SHORT, MONTHS,
    isoToDate,
    buildRangeMonthGrid,
    type DateRange, EMPTY_RANGE,
    type RangeCalendarDay,
} from './date-range-helpers.js';

/**
 * A dual-month calendar for range selection.
 * Shows two months side-by-side (or stacked on narrow screens).
 *
 * @fires range-select - { detail: { value: DateRange } } on each click
 */
@customElement('ui-date-range-calendar')
export class UiDateRangeCalendar extends LitElement {
    static styles = css`
    :host {
      display: inline-block;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      user-select: none;
    }

    .calendars {
      display: flex;
      gap: 0;
    }

    .month-panel {
      width: 296px;
      background: var(--ui-surface-background, #fff);
      flex-shrink: 0;
    }

    .month-panel + .month-panel {
      border-left: 1px solid var(--ui-border-color, #e5e7eb);
    }

    /* ── Header ─────────────────────────────────────────────────────── */
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
      padding: 4px 8px;
      border-radius: 6px;
    }
    .nav-btn {
      display: flex; align-items: center; justify-content: center;
      width: 32px; height: 32px;
      border: none; background: transparent; cursor: pointer;
      border-radius: 50%; color: var(--ui-text-color-muted, #6b7280);
      font-size: 1rem; transition: background 0.12s;
    }
    .nav-btn:hover { background: rgba(0,0,0,.06); }
    .nav-btn.hidden { visibility: hidden; pointer-events: none; }

    /* ── Day-of-week row ─────────────────────────────────────────────── */
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

    /* ── Day grid ────────────────────────────────────────────────────── */
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
      transition: background 0.08s, color 0.08s;
      position: relative;
      z-index: 1;
    }

    /* In-range background stripe */
    .day-cell.in-range,
    .day-cell.hover-range {
      background: transparent;
      color: var(--ui-text-color, #374151);
    }
    .day-cell.in-range::before,
    .day-cell.hover-range::before {
      content: '';
      position: absolute;
      inset: 0 0;
      background: var(--ui-primary-light, rgba(59,130,246,.12));
      border-radius: 0;
      z-index: -1;
    }

    /* Start / End endpoints */
    .day-cell.range-start,
    .day-cell.range-end {
      background: var(--ui-primary-color, #3b82f6);
      color: #fff;
      font-weight: 700;
      border-radius: 50%;
    }
    .day-cell.range-start::before {
      content: '';
      position: absolute;
      inset: 0;
      right: -50%;
      background: var(--ui-primary-light, rgba(59,130,246,.12));
      border-radius: 0;
      z-index: -1;
    }
    .day-cell.range-end::before {
      content: '';
      position: absolute;
      inset: 0;
      left: -50%;
      background: var(--ui-primary-light, rgba(59,130,246,.12));
      border-radius: 0;
      z-index: -1;
    }

    /* Same day start=end */
    .day-cell.range-start.range-end::before { display: none; }

    .day-cell.range-start:hover { background: var(--ui-primary-color-dark, #2563eb); }
    .day-cell.range-end:hover { background: var(--ui-primary-color-dark, #2563eb); }

    .day-cell:hover:not(.range-start):not(.range-end):not(.disabled) {
      background: rgba(0,0,0,.06);
    }
    .day-cell.other-month { color: var(--ui-text-color-muted, #d1d5db); }
    .day-cell.today:not(.range-start):not(.range-end) {
      color: var(--ui-primary-color, #3b82f6);
      font-weight: 700;
    }
    .day-cell.today:not(.range-start):not(.range-end)::after {
      content: '';
      position: absolute;
      bottom: 4px; left: 50%; transform: translateX(-50%);
      width: 4px; height: 4px;
      border-radius: 50%;
      background: var(--ui-primary-color, #3b82f6);
    }
    .day-cell.disabled {
      opacity: 0.35;
      cursor: not-allowed;
      pointer-events: none;
    }
  `;

    // ── Props ─────────────────────────────────────────────────────────────────

    /** Current selected range [startISO, endISO]. */
    @property({ type: Array }) value: DateRange = [...EMPTY_RANGE];

    @property({ type: String }) min = '';
    @property({ type: String }) max = '';
    @property({ type: Boolean }) disabled = false;

    // ── State ─────────────────────────────────────────────────────────────────

    @state() private _leftYear = new Date().getFullYear();
    @state() private _leftMonth = new Date().getMonth();
    @state() private _hoverIso = '';

    connectedCallback() {
        super.connectedCallback();
        const [start] = this.value;
        if (start) {
            const d = isoToDate(start);
            if (d) { this._leftYear = d.getFullYear(); this._leftMonth = d.getMonth(); }
        }
    }

    /** Navigate the calendar view to the month containing the given ISO date. */
    navigateTo(iso: string) {
        const d = isoToDate(iso);
        if (d) { this._leftYear = d.getFullYear(); this._leftMonth = d.getMonth(); }
    }

    private get _rightYear() {
        return this._leftMonth === 11 ? this._leftYear + 1 : this._leftYear;
    }
    private get _rightMonth() {
        return this._leftMonth === 11 ? 0 : this._leftMonth + 1;
    }

    private _prevMonth() {
        if (this._leftMonth === 0) { this._leftMonth = 11; this._leftYear--; }
        else this._leftMonth--;
    }
    private _nextMonth() {
        if (this._leftMonth === 11) { this._leftMonth = 0; this._leftYear++; }
        else this._leftMonth++;
    }

    // ── Selection logic ───────────────────────────────────────────────────────

    private _handleCellClick(cell: RangeCalendarDay) {
        if (cell.isDisabled || this.disabled) return;
        const [start, end] = this.value;

        let newRange: DateRange;
        if (!start || (start && end)) {
            // Start a new range
            newRange = [cell.iso, ''];
        } else {
            // Complete the range
            const startDate = isoToDate(start)!;
            const clickDate = cell.date;
            if (clickDate < startDate) {
                // Clicked before current start — swap
                newRange = [cell.iso, start];
            } else {
                newRange = [start, cell.iso];
            }
        }

        this.value = newRange;
        this.dispatchEvent(new CustomEvent('range-select', {
            detail: { value: newRange }, bubbles: true, composed: true,
        }));
    }

    private _handleCellHover(cell: RangeCalendarDay) {
        const [, end] = this.value;
        if (!end) this._hoverIso = cell.iso;
    }

    private _handleMouseLeave() {
        this._hoverIso = '';
    }

    // ── Month panel render ────────────────────────────────────────────────────

    private _renderMonthPanel(year: number, month: number, isLeft: boolean) {
        const [startISO, endISO] = this.value;
        const startDate = isoToDate(startISO);
        const endDate = isoToDate(endISO);
        const hoverDate = this._hoverIso ? isoToDate(this._hoverIso) : null;

        const grid = buildRangeMonthGrid(
            year, month, startDate, endDate, hoverDate,
            this.min || null, this.max || null,
        );

        return html`
      <div class="month-panel">
        <div class="header">
          <button class="nav-btn ${!isLeft ? 'hidden' : ''}"
            @click=${this._prevMonth} aria-label="Previous month">‹</button>
          <span class="header-label">${MONTHS[month]} ${year}</span>
          <button class="nav-btn ${isLeft ? 'hidden' : ''}"
            @click=${this._nextMonth} aria-label="Next month">›</button>
        </div>

        <div class="dow-row">
          ${DAYS_SHORT.map(d => html`<span class="dow-cell">${d}</span>`)}
        </div>

        <div class="day-grid" role="grid" aria-label="${MONTHS[month]} ${year}"
          @mouseleave=${this._handleMouseLeave}>
          ${repeat(grid, c => c.iso + '_' + (isLeft ? 'L' : 'R'), c => this._renderCell(c))}
        </div>
      </div>
    `;
    }

    private _renderCell(c: RangeCalendarDay) {
        return html`
      <button
        class=${classMap({
            'day-cell': true,
            'other-month': !c.isCurrentMonth,
            'today': c.isToday,
            'range-start': c.isStart,
            'range-end': c.isEnd,
            'in-range': c.isInRange,
            'hover-range': c.isHoverRange,
            'disabled': c.isDisabled,
        })}
        aria-label=${c.date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        aria-pressed=${c.isStart || c.isEnd}
        aria-disabled=${c.isDisabled}
        tabindex=${c.isCurrentMonth && !c.isDisabled ? 0 : -1}
        @click=${() => this._handleCellClick(c)}
        @mouseover=${() => this._handleCellHover(c)}
      >${c.day}</button>
    `;
    }

    render() {
        return html`
      <div class="calendars">
        ${this._renderMonthPanel(this._leftYear, this._leftMonth, true)}
        ${this._renderMonthPanel(this._rightYear, this._rightMonth, false)}
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-date-range-calendar': UiDateRangeCalendar;
    }
}
