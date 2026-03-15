import { unsafeCSS, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { FlintElement } from '../flint-element.js';
import styles from './flint-format-date.css?inline';

/* ─────────────────────────────────────────────────────────────────── */
/*  Helpers                                                             */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Parses a Date object or ISO 8601 string into a Date.
 * @param value - A `Date` instance or any string accepted by `new Date()`.
 * @returns A valid `Date` if parsing succeeds, or `null` for invalid/NaN dates.
 */
export function parseDate(value: Date | string): Date | null {
    let d: Date;
    if (value instanceof Date) {
        d = value;
    } else {
        d = new Date(value);
    }
    return isNaN(d.getTime()) ? null : d;
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-format-date                                                      */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Formats a date/time using the specified locale and options.
 * Localization is handled by the browser's `Intl.DateTimeFormat` API — no language packs required.
 *
 * @attr {Date|string} date        - The date/time to format. Defaults to the current date/time.
 * @attr weekday                   - The format for displaying the weekday.
 * @attr era                       - The format for displaying the era.
 * @attr year                      - The format for displaying the year.
 * @attr month                     - The format for displaying the month.
 * @attr day                       - The format for displaying the day.
 * @attr hour                      - The format for displaying the hour.
 * @attr minute                    - The format for displaying the minute.
 * @attr second                    - The format for displaying the second.
 * @attr {string} time-zone-name          - The format for displaying the time zone name.
 * @attr {string} time-zone               - The time zone to express the time in.
 * @attr {number} fractional-second-digits - Sub-second precision digits (1–3).
 * @attr {string} date-style              - Shorthand date style: 'full'|'long'|'medium'|'short'.
 * @attr {string} time-style              - Shorthand time style: 'full'|'long'|'medium'|'short'.
 * @attr {string} hour-format             - The hour format: 'auto' (browser default), '12', or '24'.
 * @attr {string} lang                    - BCP 47 language tag for formatting locale.
 *
 * @cssprop --flint-format-date-color      - Text color (default: `inherit`).
 * @cssprop --flint-format-date-font-size  - Font size (default: `inherit`).
 */
export class FlintFormatDate extends FlintElement {
    static styles = unsafeCSS(styles);

    /**
     * The date/time to format. Accepts a `Date` object or any string accepted by `new Date()`.
     * Defaults to the time at which the element is instantiated. The displayed value does **not**
     * auto-update while the element remains in the DOM — set a new `date` prop to refresh it.
     */
    @property()
    date: Date | string = new Date();

    /** The format for displaying the weekday. */
    @property()
    weekday: 'narrow' | 'short' | 'long' | undefined = undefined;

    /** The format for displaying the era. */
    @property()
    era: 'narrow' | 'short' | 'long' | undefined = undefined;

    /** The format for displaying the year. */
    @property()
    year: 'numeric' | '2-digit' | undefined = undefined;

    /** The format for displaying the month. */
    @property()
    month: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long' | undefined = undefined;

    /** The format for displaying the day. */
    @property()
    day: 'numeric' | '2-digit' | undefined = undefined;

    /** The format for displaying the hour. */
    @property()
    hour: 'numeric' | '2-digit' | undefined = undefined;

    /** The format for displaying the minute. */
    @property()
    minute: 'numeric' | '2-digit' | undefined = undefined;

    /** The format for displaying the second. */
    @property()
    second: 'numeric' | '2-digit' | undefined = undefined;

    /** The format for displaying the time zone name. */
    @property({ attribute: 'time-zone-name' })
    timeZoneName: 'short' | 'long' | 'shortOffset' | 'longOffset' | 'shortGeneric' | 'longGeneric' | undefined = undefined;

    /** The time zone to express the time in (e.g. "UTC", "America/New_York"). */
    @property({ attribute: 'time-zone' })
    timeZone: string | undefined = undefined;

    /** Number of fractional second digits to display (1–3). */
    @property({ attribute: 'fractional-second-digits', type: Number })
    fractionalSecondDigits: 1 | 2 | 3 | undefined = undefined;

    /**
     * Shorthand date format style. Cannot be combined with individual date field props
     * (year, month, day, weekday, era). Use `timeStyle` together with this for a full timestamp.
     */
    @property({ attribute: 'date-style' })
    dateStyle: 'full' | 'long' | 'medium' | 'short' | undefined = undefined;

    /**
     * Shorthand time format style. Cannot be combined with individual time field props
     * (hour, minute, second). Use `dateStyle` together with this for a full timestamp.
     */
    @property({ attribute: 'time-style' })
    timeStyle: 'full' | 'long' | 'medium' | 'short' | undefined = undefined;

    /**
     * The hour format to use. `'auto'` uses the browser/locale default.
     * `'12'` forces 12-hour time. `'24'` forces 24-hour time.
     */
    @property({ attribute: 'hour-format', reflect: true })
    hourFormat: 'auto' | '12' | '24' = 'auto';

    /** BCP 47 language tag for formatting locale (e.g. "en", "fr", "ru"). Inherits from the document when unset. */
    @property({ attribute: 'lang', reflect: true })
    override lang = '';

    private _parseDate(): Date | null {
        return parseDate(this.date);
    }

    private _formatDate(date: Date): string {
        const options: Intl.DateTimeFormatOptions = {};

        if (this.timeZone)     options.timeZone     = this.timeZone;
        if (this.timeZoneName) options.timeZoneName = this.timeZoneName;

        if (this.hourFormat === '12') options.hour12 = true;
        else if (this.hourFormat === '24') options.hour12 = false;

        // dateStyle/timeStyle are shorthands — cannot mix with individual date/time fields
        if (this.dateStyle || this.timeStyle) {
            if (this.dateStyle) options.dateStyle = this.dateStyle;
            if (this.timeStyle) options.timeStyle = this.timeStyle;
        } else {
            if (this.weekday)      options.weekday      = this.weekday;
            if (this.era)          options.era          = this.era;
            if (this.year)         options.year         = this.year;
            if (this.month)        options.month        = this.month;
            if (this.day)          options.day          = this.day;
            if (this.hour)         options.hour         = this.hour;
            if (this.minute)       options.minute       = this.minute;
            if (this.second)       options.second       = this.second;
            if (this.fractionalSecondDigits) options.fractionalSecondDigits = this.fractionalSecondDigits;

            // When no display fields are set, fall back to a localized numeric date
            const hasDisplayField = this.weekday || this.era || this.year || this.month ||
                this.day || this.hour || this.minute || this.second || this.fractionalSecondDigits;
            if (!hasDisplayField) {
                options.year  = 'numeric';
                options.month = 'numeric';
                options.day   = 'numeric';
            }
        }

        const locale = this.lang || document.documentElement.lang || navigator.language || 'en';
        try {
            return new Intl.DateTimeFormat(locale, options).format(date);
        } catch {
            return '';
        }
    }

    private _localeString(date: Date): string {
        const locale = this.lang || undefined;
        const opts: Intl.DateTimeFormatOptions | undefined = this.timeZone ? { timeZone: this.timeZone } : undefined;
        try {
            return date.toLocaleString(locale, opts);
        } catch {
            return date.toLocaleString();
        }
    }

    render() {
        const date = this._parseDate();
        const text = date ? this._formatDate(date) : '';
        const isoStr = date ? date.toISOString() : nothing;
        const localeStr = date ? this._localeString(date) : nothing;
        return html`
            <time
                datetime=${isoStr}
                title=${localeStr}
                aria-label=${localeStr}
            >${text}</time>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-format-date': FlintFormatDate;
    }
}
