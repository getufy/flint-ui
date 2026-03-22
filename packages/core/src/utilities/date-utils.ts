// ─── Shared date utilities ───────────────────────────────────────────────────
// Used by date-picker, date-range-picker, and date-field components.

export const DAYS_SHORT = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
export const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

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

export function isoToDisplay(iso: string, locale?: string): string {
    const d = isoToDate(iso);
    if (!d) return '';
    try {
        return new Intl.DateTimeFormat(locale || undefined, {
            year: 'numeric', month: '2-digit', day: '2-digit',
        }).format(d);
    } catch {
        return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`;
    }
}

export function daysInMonth(month: number, year: number): number {
    if (month < 1 || month > 12) return 31;
    return new Date(year || 2000, month, 0).getDate();
}
