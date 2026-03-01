// ─── Date Range Picker — shared helpers ──────────────────────────────────────

export const DAYS_SHORT = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
export const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

// ── Date utilities ────────────────────────────────────────────────────────────

export function isoToDate(iso: string): Date | null {
    if (!iso) return null;
    const [y, m, d] = iso.split('-').map(Number);
    if (!y || !m || !d) return null;
    const date = new Date(y, m - 1, d);
    // Reject overflowed dates (e.g. Feb 30 → Mar 2)
    if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
    return date;
}

export function dateToIso(d: Date): string {
    const y = String(d.getFullYear()).padStart(4, '0');
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

export function todayIso(): string {
    return dateToIso(new Date());
}

export function sameDay(a: Date, b: Date): boolean {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

export function isBetween(d: Date, start: Date, end: Date): boolean {
    const t = d.getTime();
    const s = start.getTime();
    const e = end.getTime();
    const [lo, hi] = s <= e ? [s, e] : [e, s];
    return t > lo && t < hi;
}

export function isStartOrEnd(d: Date, start: Date | null, end: Date | null): boolean {
    return (start ? sameDay(d, start) : false) || (end ? sameDay(d, end) : false);
}

export function isoToDisplay(iso: string): string {
    const d = isoToDate(iso);
    if (!d) return '';
    return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`;
}

// ── DateRange type ────────────────────────────────────────────────────────────

/** [startIso, endIso] — either may be '' if not yet set. */
export type DateRange = [string, string];

export const EMPTY_RANGE: DateRange = ['', ''];

// ── Calendar grid cell ────────────────────────────────────────────────────────

export interface RangeCalendarDay {
    date: Date;
    iso: string;
    day: number;
    isCurrentMonth: boolean;
    isToday: boolean;
    isStart: boolean;
    isEnd: boolean;
    isInRange: boolean;
    isDisabled: boolean;
    isHoverRange: boolean;
}

export function buildRangeMonthGrid(
    year: number,
    month: number,
    startDate: Date | null,
    endDate: Date | null,
    hoverDate: Date | null,
    min: string | null,
    max: string | null,
): RangeCalendarDay[] {
    const cells: RangeCalendarDay[] = [];
    const firstDay = new Date(year, month, 1);
    const todayStr = todayIso();
    const todayDate = isoToDate(todayStr)!;
    const minDate = min ? isoToDate(min) : null;
    const maxDate = max ? isoToDate(max) : null;

    // Compute the effective hover end for in-range highlighting
    const hoverEnd = startDate && !endDate && hoverDate ? hoverDate : null;
    const rangeStart = startDate;
    const rangeEnd = endDate ?? hoverEnd;

    function makeCell(d: Date, isCurrentMonth: boolean): RangeCalendarDay {
        const iso = dateToIso(d);
        const isStart = startDate ? sameDay(d, startDate) : false;
        const isEnd = endDate ? sameDay(d, endDate) : false;
        const isHoverRange =
            !endDate && hoverEnd !== null
                ? (startDate ? sameDay(d, hoverEnd) : false) ||
                (startDate && !sameDay(d, startDate) ? isBetween(d, startDate, hoverEnd) : false)
                : false;
        const isInRange =
            rangeStart && rangeEnd
                ? isBetween(d, rangeStart, rangeEnd)
                : false;
        const isDisabled =
            (minDate ? d < minDate : false) || (maxDate ? d > maxDate : false);
        return {
            date: d,
            iso,
            day: d.getDate(),
            isCurrentMonth,
            isToday: sameDay(d, todayDate),
            isStart,
            isEnd,
            isInRange,
            isDisabled,
            isHoverRange,
        };
    }

    // Leading days from previous month
    const startDow = firstDay.getDay();
    for (let i = startDow - 1; i >= 0; i--) {
        cells.push(makeCell(new Date(year, month, -i), false));
    }

    // Current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
        cells.push(makeCell(new Date(year, month, d), true));
    }

    // Trailing days (always 6 rows = 42 cells)
    const remaining = 42 - cells.length;
    for (let d = 1; d <= remaining; d++) {
        cells.push(makeCell(new Date(year, month + 1, d), false));
    }

    return cells;
}

// ── Shortcuts ─────────────────────────────────────────────────────────────────

export interface Shortcut {
    label: string;
    getValue: () => DateRange;
}

export function defaultShortcuts(): Shortcut[] {
    return [
        {
            label: 'Today',
            getValue: () => {
                const t = todayIso();
                return [t, t];
            },
        },
        {
            label: 'Yesterday',
            getValue: () => {
                const d = new Date();
                d.setDate(d.getDate() - 1);
                const iso = dateToIso(d);
                return [iso, iso];
            },
        },
        {
            label: 'This Week',
            getValue: () => {
                const now = new Date();
                const start = new Date(now);
                start.setDate(now.getDate() - now.getDay());
                const end = new Date(start);
                end.setDate(start.getDate() + 6);
                return [dateToIso(start), dateToIso(end)];
            },
        },
        {
            label: 'Last 7 Days',
            getValue: () => {
                const end = new Date();
                const start = new Date();
                start.setDate(end.getDate() - 6);
                return [dateToIso(start), dateToIso(end)];
            },
        },
        {
            label: 'This Month',
            getValue: () => {
                const now = new Date();
                const start = new Date(now.getFullYear(), now.getMonth(), 1);
                const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                return [dateToIso(start), dateToIso(end)];
            },
        },
        {
            label: 'Last 30 Days',
            getValue: () => {
                const end = new Date();
                const start = new Date();
                start.setDate(end.getDate() - 29);
                return [dateToIso(start), dateToIso(end)];
            },
        },
    ];
}
