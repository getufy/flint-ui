import { unsafeCSS, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { FlintElement } from '../flint-element.js';
import { LocalizeController } from '../utilities/localize.js';
import {
    DAYS_SHORT, MONTHS,
    isoToDate, dateToIso,
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
    /** BCP 47 locale for month/day names (e.g. "en-US", "fr"). Uses browser default when unset. */
    @property({ type: String }) locale = '';

    // ── State ─────────────────────────────────────────────────────────────────

    @state() private _leftYear = new Date().getFullYear();
    @state() private _leftMonth = new Date().getMonth();
    @state() private _hoverIso = '';
    @state() private _focusedIso = '';

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

    // ── Keyboard navigation ────────────────────────────────────────────────────

    private _handleGridKeyDown(e: KeyboardEvent) {
        if (this.disabled) return;

        let delta = 0;
        let handled = false;

        switch (e.key) {
            case 'ArrowLeft':  delta = -1; handled = true; break;
            case 'ArrowRight': delta = 1;  handled = true; break;
            case 'ArrowUp':    delta = -7; handled = true; break;
            case 'ArrowDown':  delta = 7;  handled = true; break;
            case 'Home': {
                // Move to start of week (Sunday)
                const d = this._getFocusedDate();
                if (d) { delta = -d.getDay(); handled = true; }
                break;
            }
            case 'End': {
                // Move to end of week (Saturday)
                const d = this._getFocusedDate();
                if (d) { delta = 6 - d.getDay(); handled = true; }
                break;
            }
            case 'PageUp': {
                // Move back one month
                const d = this._getFocusedDate();
                if (d) {
                    const target = new Date(d.getFullYear(), d.getMonth() - 1, d.getDate());
                    this._navigateToFocused(target);
                    handled = true;
                }
                break;
            }
            case 'PageDown': {
                // Move forward one month
                const d = this._getFocusedDate();
                if (d) {
                    const target = new Date(d.getFullYear(), d.getMonth() + 1, d.getDate());
                    this._navigateToFocused(target);
                    handled = true;
                }
                break;
            }
            case 'Enter':
            case ' ': {
                const d = this._getFocusedDate();
                if (d) {
                    const iso = dateToIso(d);
                    const minDate = this.min ? isoToDate(this.min) : null;
                    const maxDate = this.max ? isoToDate(this.max) : null;
                    const isDisabled = (minDate ? d < minDate : false) || (maxDate ? d > maxDate : false);
                    if (!isDisabled) {
                        this._handleCellClick({ date: d, iso, day: d.getDate(), isCurrentMonth: true, isToday: false, isStart: false, isEnd: false, isInRange: false, isDisabled: false, isHoverRange: false });
                    }
                }
                handled = true;
                break;
            }
        }

        if (handled) {
            e.preventDefault();
            e.stopPropagation();
        }

        if (delta !== 0) {
            const d = this._getFocusedDate();
            if (d) {
                const target = new Date(d.getFullYear(), d.getMonth(), d.getDate() + delta);
                this._navigateToFocused(target);
            }
        }
    }

    private _getFocusedDate(): Date | null {
        if (this._focusedIso) return isoToDate(this._focusedIso);
        // Default to today or first of visible month
        return new Date(this._leftYear, this._leftMonth, 1);
    }

    private _navigateToFocused(target: Date) {
        const iso = dateToIso(target);
        this._focusedIso = iso;

        // Ensure the target month is visible
        const targetMonth = target.getMonth();
        const targetYear = target.getFullYear();
        const leftVisible = targetYear === this._leftYear && targetMonth === this._leftMonth;
        const rightVisible = targetYear === this._rightYear && targetMonth === this._rightMonth;
        if (!leftVisible && !rightVisible) {
            this._leftYear = targetYear;
            this._leftMonth = targetMonth;
        }

        // Focus the cell after the next render
        void this.updateComplete.then(() => {
            const btn = this.shadowRoot?.querySelector(`.day-cell[data-iso="${iso}"]`) as HTMLElement | null;
            btn?.focus();
        });
    }

    // ── i18n helpers ───────────────────────────────────────────────────────────

    private get _resolvedLocale(): string | undefined {
        return this.locale || undefined;
    }

    private _monthName(month: number): string {
        try {
            const d = new Date(2000, month, 1);
            return new Intl.DateTimeFormat(this._resolvedLocale, { month: 'long' }).format(d);
        } catch {
            return MONTHS[month] ?? '';
        }
    }

    private _dayOfWeekShort(dayIndex: number): string {
        try {
            // Jan 4 2026 is a Sunday (day 0)
            const d = new Date(2026, 0, 4 + dayIndex);
            return new Intl.DateTimeFormat(this._resolvedLocale, { weekday: 'short' }).format(d);
        } catch {
            return DAYS_SHORT[dayIndex] ?? '';
        }
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

        const monthLabel = this._monthName(month);
        const dowLabels = Array.from({ length: 7 }, (_, i) => this._dayOfWeekShort(i));

        return html`
      <div class="month-panel">
        <div class="header">
          <button class="nav-btn ${!isLeft ? 'hidden' : ''}"
            @click=${this._prevMonth} aria-label=${this._localize.term('previousMonth')}>‹</button>
          <span class="header-label">${monthLabel} ${year}</span>
          <button class="nav-btn ${isLeft ? 'hidden' : ''}"
            @click=${this._nextMonth} aria-label=${this._localize.term('nextMonth')}>›</button>
        </div>

        <div class="dow-row">
          ${dowLabels.map(d => html`<span class="dow-cell">${d}</span>`)}
        </div>

        <div class="day-grid" role="grid" aria-label="${monthLabel} ${year}"
          @mouseleave=${this._handleMouseLeave}
          @keydown=${this._handleGridKeyDown}>
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
        data-iso=${c.iso}
        aria-label=${c.date.toLocaleDateString(this._resolvedLocale, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        aria-pressed=${c.isStart || c.isEnd}
        aria-disabled=${c.isDisabled}
        tabindex=${c.isCurrentMonth && !c.isDisabled ? 0 : -1}
        @click=${() => this._handleCellClick(c)}
        @focus=${() => { this._focusedIso = c.iso; }}
        @mouseover=${() => this._handleCellHover(c)}
      >${c.day}</button>
    `;
    }

    render() {
        return html`
      <div class="calendars" part="base">
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
