import { LitElement, unsafeCSS, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './flint-relative-time.css?inline';

/* ─────────────────────────────────────────────────────────────────── */
/*  Helpers                                                             */
/* ─────────────────────────────────────────────────────────────────── */

const UNITS: { unit: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
    { unit: 'year',   seconds: 31_536_000 },
    { unit: 'month',  seconds: 2_592_000  },
    { unit: 'day',    seconds: 86_400     },
    { unit: 'hour',   seconds: 3_600      },
    { unit: 'minute', seconds: 60         },
    { unit: 'second', seconds: 1          },
];

export function pickUnit(absDiffSeconds: number): { unit: Intl.RelativeTimeFormatUnit; seconds: number } {
    for (const entry of UNITS) {
        if (absDiffSeconds >= entry.seconds) return entry;
    }
    return UNITS[UNITS.length - 1];
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-relative-time                                                    */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Displays a localized time phrase relative to the current date and time.
 * Uses the browser's `Intl.RelativeTimeFormat` API — no language packs needed.
 *
 * @attr {Date|string|number} date - The date to calculate from. Accepts a Date object,
 *   ISO 8601 string, or Unix timestamp in milliseconds. Defaults to now.
 * @attr {'long'|'short'|'narrow'} format  - Formatting style (default: `'long'`).
 * @attr {'always'|'auto'} numeric - When `auto`, values like "yesterday" are used where possible (default: `'auto'`).
 * @attr {boolean} sync        - Keep the displayed value up to date as time passes.
 *
 * @cssprop --flint-relative-time-color      - Text color (default: `inherit`).
 * @cssprop --flint-relative-time-font-size  - Font size (default: `inherit`).
 */
@customElement('flint-relative-time')
export class FlintRelativeTime extends LitElement {
    static styles = unsafeCSS(styles);

    /** The date to calculate time from. Accepts a Date, ISO string, or Unix ms timestamp. Defaults to the current date/time. */
    @property()
    date: Date | string | number = new Date();

    /** The formatting style to use. */
    @property({ reflect: true })
    format: 'long' | 'short' | 'narrow' = 'long';

    /**
     * When `auto`, values such as "yesterday" and "tomorrow" will be shown when
     * possible. When `always`, values such as "1 day ago" and "in 1 day" are used.
     */
    @property({ reflect: true })
    numeric: 'always' | 'auto' = 'auto';

    /** Keep the displayed value up to date as time passes. */
    @property({ type: Boolean, reflect: true })
    sync = false;

    /** BCP 47 language tag for formatting (e.g. "en", "de", "ja"). Inherits from the document when unset. */
    @property({ attribute: 'lang', reflect: true })
    override lang = '';

    private _timer: ReturnType<typeof setTimeout> | null = null;

    updated(changed: Map<string, unknown>) {
        if (changed.has('sync') || changed.has('date') || changed.has('format') || changed.has('numeric')) {
            if (this.sync) {
                this._scheduleSync();
            } else {
                this._clearTimer();
            }
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._clearTimer();
    }

    private _clearTimer() {
        if (this._timer !== null) {
            clearTimeout(this._timer);
            this._timer = null;
        }
    }

    private _scheduleSync() {
        this._clearTimer();
        if (!this.sync) return;
        const ms = this._msUntilNextChange();
        this._timer = setTimeout(() => {
            this.requestUpdate();
            this._scheduleSync();
        }, ms);
    }

    /** Returns how many ms to wait before the displayed value will change. */
    private _msUntilNextChange(): number {
        const date = this._parseDate();
        if (!date) return 60_000;
        const absDiff = Math.abs((date.getTime() - Date.now()) / 1000);
        if (absDiff < 60) return 1_000;
        if (absDiff < 3_600) return 60_000;
        return 3_600_000;
    }

    private _parseDate(): Date | null {
        let d: Date;
        if (this.date instanceof Date) {
            d = this.date;
        } else if (typeof this.date === 'number') {
            d = new Date(this.date);
        } else {
            d = new Date(this.date);
        }
        return !isNaN(d.getTime()) ? d : null;
    }

    private _formatText(date: Date): string {
        const diffSeconds = (date.getTime() - Date.now()) / 1000;
        const absDiff = Math.abs(diffSeconds);
        const { unit, seconds } = pickUnit(absDiff);
        const value = Math.round(diffSeconds / seconds);

        const lang = this.lang || document.documentElement.lang || navigator.language || 'en';
        try {
            const rtf = new Intl.RelativeTimeFormat(lang, {
                numeric: this.numeric,
                style: this.format,
            });
            return rtf.format(value, unit);
        } catch {
            return '';
        }
    }

    render() {
        const date = this._parseDate();
        const text = date ? this._formatText(date) : '';
        const localeStr = date ? date.toLocaleString() : nothing;
        return html`
            <time
                datetime=${date ? date.toISOString() : nothing}
                title=${localeStr}
                aria-label=${localeStr}
            >${text}</time>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-relative-time': FlintRelativeTime;
    }
}
