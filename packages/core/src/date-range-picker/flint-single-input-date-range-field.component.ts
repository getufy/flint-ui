import { unsafeCSS, html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import {
    isoToDate,
    type DateRange, EMPTY_RANGE,
} from './date-range-helpers.js';
import uiSingleInputDateRangeFieldStyles from './flint-single-input-date-range-field.css?inline';

type Segment = 'start-month' | 'start-day' | 'start-year' | 'end-month' | 'end-day' | 'end-year';
const SEGMENT_ORDER: Segment[] = ['start-month', 'start-day', 'start-year', 'end-month', 'end-day', 'end-year'];

function clamp(v: number, min: number, max: number) { return Math.min(Math.max(v, min), max); }

function daysInMonth(month: number, year: number): number {
    if (month < 1 || month > 12) return 31;
    return new Date(year || 2000, month, 0).getDate();
}

/**
 * A single-input field for entering a date range (start → end).
 * Renders as "MM/DD/YYYY – MM/DD/YYYY" with six independently editable segments.
 *
 * @fires flint-date-range-picker-change - { detail: { value: DateRange } } when both dates are complete
 * @fires flint-date-range-picker-clear  - fired when all segments are cleared
 */
export class FlintSingleInputDateRangeField extends FlintElement {
    static styles = unsafeCSS(uiSingleInputDateRangeFieldStyles);

    // ── Props ─────────────────────────────────────────────────────────────────

    /** Controlled range value [startISO, endISO]. */
    @property({ type: Array }) value: DateRange = [...EMPTY_RANGE];

    /** Field label text. */
    @property({ type: String }) label = '';
    /** Form field name used for hidden inputs. */
    @property({ type: String }) name = '';
    /** Minimum allowed date (ISO YYYY-MM-DD). */
    @property({ type: String }) min = '';
    /** Maximum allowed date (ISO YYYY-MM-DD). */
    @property({ type: String }) max = '';

    /** Disables the field and prevents interaction. */
    @property({ type: Boolean, reflect: true }) disabled = false;
    /** Makes the field read-only (visible but not editable). */
    @property({ type: Boolean, reflect: true }) readonly = false;
    /** Displays the field in an error state. */
    @property({ type: Boolean, reflect: true }) error = false;
    /** Helper text shown below the field. */
    @property({ type: String, attribute: 'helper-text' }) helperText = '';
    /** Error message displayed below the field when in error state. */
    @property({ type: String, attribute: 'error-message' }) errorMessage = '';

    // ── Internal segment state ────────────────────────────────────────────────

    @state() private _sm: number | null = null; // start month
    @state() private _sd: number | null = null; // start day
    @state() private _sy: number | null = null; // start year
    @state() private _em: number | null = null; // end month
    @state() private _ed: number | null = null; // end day
    @state() private _ey: number | null = null; // end year

    @state() private _active: Segment | null = null;
    @state() private _focused = false;
    @state() private _buf = '';

    willUpdate(changed: Map<string, unknown>) {
        if (changed.has('value')) {
            const [start, end] = this.value;
            if (start) {
                const d = isoToDate(start);
                if (d) { this._sm = d.getMonth() + 1; this._sd = d.getDate(); this._sy = d.getFullYear(); }
            } else { this._sm = null; this._sd = null; this._sy = null; }
            if (end) {
                const d = isoToDate(end);
                if (d) { this._em = d.getMonth() + 1; this._ed = d.getDate(); this._ey = d.getFullYear(); }
            } else { this._em = null; this._ed = null; this._ey = null; }
        }
    }

    // ── Public API ────────────────────────────────────────────────────────────

    setRange(range: DateRange) {
        this.value = range;
        this.requestUpdate('value', null);
    }

    clear() {
        this._sm = null; this._sd = null; this._sy = null;
        this._em = null; this._ed = null; this._ey = null;
        this._buf = '';
        this.value = [...EMPTY_RANGE];
        this.dispatchEvent(new CustomEvent('flint-date-range-picker-clear', { bubbles: true, composed: true }));
    }

    // ── Segment helpers ───────────────────────────────────────────────────────

    private _canGoNext() {
        if (!this._active) return true;
        return SEGMENT_ORDER.indexOf(this._active) < SEGMENT_ORDER.length - 1;
    }
    private _canGoPrev() {
        if (!this._active) return false;
        return SEGMENT_ORDER.indexOf(this._active) > 0;
    }

    private _commitPartialBuffer() {
        if (!this._buf || !this._active) return;
        const num = parseInt(this._buf);
        if (isNaN(num)) return;
        const seg = this._active;
        if (seg === 'start-month' || seg === 'end-month') {
            if (num >= 1 && num <= 12) this._setMonthSeg(seg, num);
        } else if (seg === 'start-day') {
            const max = daysInMonth(this._sm ?? 1, this._sy ?? 2000);
            if (num >= 1 && num <= max) this._sd = num;
        } else if (seg === 'end-day') {
            const max = daysInMonth(this._em ?? 1, this._ey ?? 2000);
            if (num >= 1 && num <= max) this._ed = num;
        }
    }

    private _setMonthSeg(seg: Segment, v: number) {
        if (seg === 'start-month') this._sm = v;
        else this._em = v;
    }

    private _setActive(seg: Segment | null) {
        if (this.disabled) return;
        this._commitPartialBuffer();
        this._active = seg;
        this._buf = '';
    }

    private _nextSegment() {
        if (!this._active) { this._setActive(SEGMENT_ORDER[0] ?? null); return; }
        const idx = SEGMENT_ORDER.indexOf(this._active);
        if (idx < SEGMENT_ORDER.length - 1) this._setActive(SEGMENT_ORDER[idx + 1] ?? null);
    }

    private _prevSegment() {
        if (!this._active) return;
        const idx = SEGMENT_ORDER.indexOf(this._active);
        if (idx > 0) this._setActive(SEGMENT_ORDER[idx - 1] ?? null);
    }

    // ── Digit input ───────────────────────────────────────────────────────────

    private _handleDigit(d: number) {
        if (!this._active) this._setActive(SEGMENT_ORDER[0] ?? null);
        const seg = this._active!;
        const buf = this._buf + String(d);

        if (seg === 'start-month' || seg === 'end-month') {
            if (buf.length === 1) {
                if (d >= 2 && d <= 9) {
                    this._setMonthSeg(seg, d);
                    this._buf = '';
                    this._nextSegment();
                } else { this._buf = buf; }
            } else {
                const num = parseInt(buf);
                if (num >= 1 && num <= 12) {
                    this._setMonthSeg(seg, num);
                    this._buf = '';
                    this._nextSegment();
                } else {
                    this._buf = String(d);
                    if (d >= 2 && d <= 9) { this._setMonthSeg(seg, d); this._buf = ''; this._nextSegment(); }
                }
            }
        } else if (seg === 'start-day' || seg === 'end-day') {
            const month = seg === 'start-day' ? (this._sm ?? 1) : (this._em ?? 1);
            const year = seg === 'start-day' ? (this._sy ?? 2000) : (this._ey ?? 2000);
            const maxD = daysInMonth(month, year);
            if (buf.length === 1) {
                if (d >= 4 && d <= 9) {
                    if (seg === 'start-day') this._sd = d; else this._ed = d;
                    this._buf = '';
                    this._nextSegment();
                } else { this._buf = buf; }
            } else {
                const num = parseInt(buf);
                if (num >= 1 && num <= maxD) {
                    if (seg === 'start-day') this._sd = num; else this._ed = num;
                    this._buf = '';
                    this._nextSegment();
                } else {
                    this._buf = String(d);
                    if (d >= 4 && d <= 9) {
                        if (seg === 'start-day') this._sd = d; else this._ed = d;
                        this._buf = ''; this._nextSegment();
                    }
                }
            }
        } else if (seg === 'start-year' || seg === 'end-year') {
            this._buf = buf.slice(-4);
            if (this._buf.length === 4) {
                const year = parseInt(this._buf);
                if (seg === 'start-year') this._sy = year; else this._ey = year;
                this._buf = '';
                this._checkAndEmit();
                this._nextSegment();
            }
        }
    }

    private _adjust(delta: number) {
        const seg = this._active;
        if (!seg) return;
        this._buf = '';

        if (seg === 'start-month') {
            this._sm = clamp((this._sm ?? (delta > 0 ? 0 : 13)) + delta, 1, 12);
        } else if (seg === 'end-month') {
            this._em = clamp((this._em ?? (delta > 0 ? 0 : 13)) + delta, 1, 12);
        } else if (seg === 'start-day') {
            const max = daysInMonth(this._sm ?? 1, this._sy ?? 2000);
            this._sd = clamp((this._sd ?? (delta > 0 ? 0 : max + 1)) + delta, 1, max);
        } else if (seg === 'end-day') {
            const max = daysInMonth(this._em ?? 1, this._ey ?? 2000);
            this._ed = clamp((this._ed ?? (delta > 0 ? 0 : max + 1)) + delta, 1, max);
        } else if (seg === 'start-year') {
            this._sy = clamp((this._sy ?? new Date().getFullYear()) + delta, 1, 9999);
        } else if (seg === 'end-year') {
            this._ey = clamp((this._ey ?? new Date().getFullYear()) + delta, 1, 9999);
        }
        this._checkAndEmit();
    }

    private _checkAndEmit() {
        const startIso = this._sm !== null && this._sd !== null && this._sy !== null
            ? `${String(this._sy).padStart(4, '0')}-${String(this._sm).padStart(2, '0')}-${String(this._sd).padStart(2, '0')}`
            : '';
        const endIso = this._em !== null && this._ed !== null && this._ey !== null
            ? `${String(this._ey).padStart(4, '0')}-${String(this._em).padStart(2, '0')}-${String(this._ed).padStart(2, '0')}`
            : '';
        const next: DateRange = [startIso, endIso];
        const [ps, pe] = this.value;
        if (next[0] !== ps || next[1] !== pe) {
            this.value = next;
            this.dispatchEvent(new CustomEvent('flint-date-range-picker-change', {
                detail: { value: next }, bubbles: true, composed: true,
            }));
        }
    }

    // ── Keyboard ──────────────────────────────────────────────────────────────

    private _handleKeyDown(e: KeyboardEvent) {
        if (this.disabled || this.readonly) return;

        if (e.key >= '0' && e.key <= '9') {
            e.preventDefault(); e.stopPropagation();
            if (!this._active) this._setActive(SEGMENT_ORDER[0] ?? null);
            this._handleDigit(parseInt(e.key));
            return;
        }

        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault(); e.stopPropagation();
                this._prevSegment();
                break;
            case 'ArrowRight':
            case '/':
                e.preventDefault(); e.stopPropagation();
                this._nextSegment();
                break;
            case 'ArrowUp':
                e.preventDefault(); e.stopPropagation();
                if (!this._active) this._setActive(SEGMENT_ORDER[0] ?? null);
                this._adjust(1);
                break;
            case 'ArrowDown':
                e.preventDefault(); e.stopPropagation();
                if (!this._active) this._setActive(SEGMENT_ORDER[0] ?? null);
                this._adjust(-1);
                break;
            case 'Tab':
                if (!e.shiftKey && this._canGoNext()) {
                    e.preventDefault(); e.stopPropagation();
                    this._nextSegment();
                } else if (e.shiftKey && this._canGoPrev()) {
                    e.preventDefault(); e.stopPropagation();
                    this._prevSegment();
                }
                break;
            case 'Backspace':
            case 'Delete':
                e.preventDefault(); e.stopPropagation();
                this._buf = '';
                switch (this._active) {
                    case 'start-month': this._sm = null; break;
                    case 'start-day':   this._sd = null; break;
                    case 'start-year':  this._sy = null; break;
                    case 'end-month':   this._em = null; break;
                    case 'end-day':     this._ed = null; break;
                    case 'end-year':    this._ey = null; break;
                }
                break;
            case 'Escape':
                e.preventDefault(); e.stopPropagation();
                this.clear();
                break;
        }
    }

    private _handleFocus() {
        this._focused = true;
        if (!this._active) this._setActive(SEGMENT_ORDER[0] ?? null);
    }

    private _handleBlur(e: FocusEvent) {
        if (!this.shadowRoot?.contains(e.relatedTarget as Node)) {
            this._focused = false;
            this._active = null;
            this._buf = '';
        }
    }

    // ── Render helpers ────────────────────────────────────────────────────────

    private _segText(seg: Segment): { text: string; isPlaceholder: boolean } {
        const isActive = this._active === seg && !this.disabled;

        const monthVal = (seg === 'start-month') ? this._sm : this._em;
        const dayVal   = (seg === 'start-day')   ? this._sd : this._ed;
        const yearVal  = (seg === 'start-year')  ? this._sy : this._ey;

        if (seg === 'start-month' || seg === 'end-month') {
            if (isActive && this._buf) return { text: this._buf.padEnd(2, '_'), isPlaceholder: false };
            if (monthVal !== null) return { text: String(monthVal).padStart(2, '0'), isPlaceholder: false };
            return { text: 'MM', isPlaceholder: true };
        }
        if (seg === 'start-day' || seg === 'end-day') {
            if (isActive && this._buf) return { text: this._buf.padEnd(2, '_'), isPlaceholder: false };
            if (dayVal !== null) return { text: String(dayVal).padStart(2, '0'), isPlaceholder: false };
            return { text: 'DD', isPlaceholder: true };
        }
        // year
        if (isActive && this._buf) return { text: this._buf.padEnd(4, '_'), isPlaceholder: false };
        if (yearVal !== null) return { text: String(yearVal).padStart(4, '0'), isPlaceholder: false };
        return { text: 'YYYY', isPlaceholder: true };
    }

    private _hasAnyValue() {
        return [this._sm, this._sd, this._sy, this._em, this._ed, this._ey].some(v => v !== null);
    }

    private _renderSeg(seg: Segment) {
        const { text, isPlaceholder } = this._segText(seg);
        const isYear = seg === 'start-year' || seg === 'end-year';
        return html`<span
      class=${classMap({
            segment: true,
            active: this._active === seg,
            placeholder: isPlaceholder,
            'segment-year': isYear,
        })}
      @click=${(e: MouseEvent) => {
                e.stopPropagation();
                this._setActive(seg);
                (this.shadowRoot?.querySelector('.segments') as HTMLElement)?.focus();
            }}
    >${text}</span>`;
    }

    render() {
        const labelCls = classMap({ 'field-label': true, focused: this._focused });
        const containerCls = classMap({ 'field-container': true, focused: this._focused });

        return html`
      ${this.label ? html`<label class=${labelCls}>${this.label}</label>` : nothing}

      <div class=${containerCls} part="base">
        <div
          class="segments"
          role="group"
          aria-label=${this.label || 'Date range'}
          tabindex=${this.disabled ? -1 : 0}
          @keydown=${this._handleKeyDown}
          @focus=${this._handleFocus}
          @blur=${this._handleBlur}
        >
          ${this._renderSeg('start-month')}
          <span class="separator">/</span>
          ${this._renderSeg('start-day')}
          <span class="separator">/</span>
          ${this._renderSeg('start-year')}

          <span class="range-dash">–</span>

          ${this._renderSeg('end-month')}
          <span class="separator">/</span>
          ${this._renderSeg('end-day')}
          <span class="separator">/</span>
          ${this._renderSeg('end-year')}
        </div>

        <div class="field-actions">
          ${this._hasAnyValue() && !this.disabled && !this.readonly ? html`
            <button class="icon-btn" aria-label="Clear range" tabindex="-1"
              @click=${(e: MouseEvent) => { e.stopPropagation(); this.clear(); }}>✕</button>
          ` : nothing}
        </div>
      </div>

      ${this.error && this.errorMessage
          ? html`<small class="helper error-text" role="alert">${this.errorMessage}</small>`
          : this.helperText
              ? html`<small class="helper">${this.helperText}</small>`
              : nothing}

      ${this.name ? html`
        <input type="hidden" name="${this.name}-start" .value=${this.value[0]}>
        <input type="hidden" name="${this.name}-end" .value=${this.value[1]}>
      ` : nothing}
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-single-input-date-range-field': FlintSingleInputDateRangeField;
    }
}
