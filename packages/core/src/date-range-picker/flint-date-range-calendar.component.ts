import { unsafeCSS, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { FlintElement } from '../flint-element.js';
import { LocalizeController } from '../utilities/localize.js';
import {
    DAYS_SHORT, MONTHS,
    isoToDate,
    buildRangeMonthGrid,
    type DateRange, EMPTY_RANGE,
    type RangeCalendarDay,
} from './date-range-helpers.js';
import uiDateRangeCalendarStyles from './flint-date-range-calendar.css?inline';

/**
 * A dual-month calendar for range selection.
 * Shows two months side-by-side (or stacked on narrow screens).
 *
 * @fires flint-date-range-picker-select - { detail: { value: DateRange } } on each click
 */
export class FlintDateRangeCalendar extends FlintElement {
    static styles = unsafeCSS(uiDateRangeCalendarStyles);

    private _localize = new LocalizeController(this);

    // ── Props ─────────────────────────────────────────────────────────────────

    /** Current selected range [startISO, endISO]. */
    @property({ type: Array }) value: DateRange = [...EMPTY_RANGE];

    /** Minimum selectable date (ISO YYYY-MM-DD). */
    @property({ type: String }) min = '';
    /** Maximum selectable date (ISO YYYY-MM-DD). */
    @property({ type: String }) max = '';
    /** Disables the calendar and prevents date selection. */
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
        this._hoverIso = '';
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
        this.dispatchEvent(new CustomEvent('flint-date-range-picker-select', {
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
            @click=${this._prevMonth} aria-label=${this._localize.term('previousMonth')}>‹</button>
          <span class="header-label">${MONTHS[month]} ${year}</span>
          <button class="nav-btn ${isLeft ? 'hidden' : ''}"
            @click=${this._nextMonth} aria-label=${this._localize.term('nextMonth')}>›</button>
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
        'flint-date-range-calendar': FlintDateRangeCalendar;
    }
}
