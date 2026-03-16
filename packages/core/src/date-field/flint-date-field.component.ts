import { unsafeCSS, html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import uiDateFieldStyles from './flint-date-field.css?inline';

// ─── helpers ──────────────────────────────────────────────────────────────────

function clamp(v: number, min: number, max: number) { return Math.min(Math.max(v, min), max); }

function daysInMonth(month: number, year: number): number {
    if (month < 1 || month > 12) return 31;
    return new Date(year || 2000, month, 0).getDate();
}

function isoToSegments(iso: string): { m: number | null; d: number | null; y: number | null } {
    if (!iso) return { m: null, d: null, y: null };
    const match = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return { m: null, d: null, y: null };
    return { y: parseInt(match[1]!), m: parseInt(match[2]!), d: parseInt(match[3]!) };
}

function segmentsToIso(m: number | null, d: number | null, y: number | null): string {
    if (m === null || d === null || y === null) return '';
    return `${String(y).padStart(4, '0')}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

type Segment = 'month' | 'day' | 'year';
const SEGMENT_ORDER: Segment[] = ['month', 'day', 'year'];

// ─── flint-date-field ────────────────────────────────────────────────────────────

/**
 * A segmented keyboard-driven date input.
 * Each section (month, day, year) is independently editable via keyboard.
 *
 * Keyboard interaction:
 * - **Digits** — fill the focused segment, auto-advance when complete
 * - **ArrowUp / ArrowDown** — increment / decrement current segment
 * - **ArrowLeft / ArrowRight, Tab, /** — move between segments
 * - **Backspace / Delete** — clear the current segment
 * - **Escape / a** — clear all segments
 *
 * @fires flint-date-field-change - { detail: { value: string } } ISO date when all three segments are filled
 * @fires flint-date-field-clear  - Fired when all segments are cleared
 *
 * @attr {string}  value        - Controlled value (YYYY-MM-DD)
 * @attr {string}  label        - Field label
 * @attr {string}  name         - Form field name
 * @attr {boolean} disabled
 * @attr {boolean} readonly
 * @attr {boolean} error
 * @attr {string}  helper-text
 * @attr {string}  min          - Minimum value (YYYY-MM-DD)
 * @attr {string}  max          - Maximum value (YYYY-MM-DD)
 */
export class FlintDateField extends FlintElement {
    /** Opts the element into form participation via the Form-Associated Custom Elements API. */
    static formAssociated = true;
    static styles = unsafeCSS(uiDateFieldStyles);

    // ── Props ────────────────────────────────────────────────────────────────
    /** Controlled date value (ISO YYYY-MM-DD). Set to '' for uncontrolled. */
    @property({ type: String }) value = '';

    /** Field label. */
    @property({ type: String }) label = '';

    /** Form field name. Reflected so the browser picks it up for form data collection. */
    @property({ type: String, reflect: true }) name = '';

    /** Minimum allowed date (ISO). */
    @property({ type: String }) min = '';

    /** Maximum allowed date (ISO). */
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

    // Form-association internals — lets the element participate in HTMLFormElement / FormData
    private readonly _internals: ElementInternals = this.attachInternals();

    // ── Internal segment state ───────────────────────────────────────────────
    @state() private _month: number | null = null;
    @state() private _day: number | null = null;
    @state() private _year: number | null = null;
    @state() private _active: Segment | null = null;
    @state() private _focused = false;
    @state() private _buf = ''; // digit accumulation buffer for the active segment

    // Sync controlled value → segments before each render (willUpdate avoids a double-render cycle)
    willUpdate(changed: Map<string, unknown>) {
        if (changed.has('value')) {
            const { m, d, y } = isoToSegments(this.value);
            this._month = m; this._day = d; this._year = y;
        }
    }

    override updated() {
        // Keep the form value in sync after every render so FormData always
        // reflects the current segment state.
        this._syncFormValue();
    }


    // ── Public API ───────────────────────────────────────────────────────────

    /** Clears all three segments and fires 'flint-date-field-clear'. */
    clear() {
        this._month = null; this._day = null; this._year = null;
        this._buf = '';
        (this._internals as { setFormValue?(v: null): void }).setFormValue?.(null);
        this.dispatchEvent(new CustomEvent('flint-date-field-clear', { bubbles: true, composed: true }));
    }

    // ── Form value sync ──────────────────────────────────────────────────────

    private _syncFormValue() {
        const iso = segmentsToIso(this._month, this._day, this._year);
        // setFormValue is part of the FACE spec but may be absent in test environments
        // (e.g. jsdom 27). Cast to an optional signature so we fail gracefully.
        const formValue: string | null = iso || null;
        (this._internals as { setFormValue?(v: string | null): void }).setFormValue?.(formValue);
    }

    // ── Internal: segment navigation ─────────────────────────────────────────

    private _setActive(seg: Segment | null) {
        if (this.disabled || this.readonly) return;
        // Commit any single-digit buffer before leaving the current segment.
        // e.g. user typed "1" in month (ambiguous) and pressed Tab → treat as month=1.
        this._commitPartialBuffer();
        this._active = seg;
        this._buf = '';
    }

    private _commitPartialBuffer() {
        if (!this._buf || !this._active) return;
        const num = parseInt(this._buf);
        if (isNaN(num)) return;
        if (this._active === 'month' && num >= 1 && num <= 12) {
            this._month = num;
        } else if (this._active === 'day') {
            const maxD = daysInMonth(this._month ?? 1, this._year ?? 2000);
            if (num >= 1 && num <= maxD) this._day = num;
        }
        // year: don't commit partial — needs all 4 digits
    }

    private _nextSegment() {
        if (!this._active) { this._setActive('month'); return; }
        const idx = SEGMENT_ORDER.indexOf(this._active);
        if (idx < SEGMENT_ORDER.length - 1) this._setActive(SEGMENT_ORDER[idx + 1] ?? null);
    }

    private _prevSegment() {
        if (!this._active) return;
        const idx = SEGMENT_ORDER.indexOf(this._active);
        if (idx > 0) this._setActive(SEGMENT_ORDER[idx - 1] ?? null);
    }

    private _canGoNext() {
        if (!this._active) return true;
        return SEGMENT_ORDER.indexOf(this._active) < SEGMENT_ORDER.length - 1;
    }

    private _canGoPrev() {
        if (!this._active) return false;
        return SEGMENT_ORDER.indexOf(this._active) > 0;
    }

    // ── Internal: digit handling ─────────────────────────────────────────────

    private _handleDigit(d: number) {
        if (!this._active) this._setActive('month');
        const seg = this._active!;
        const buf = this._buf + String(d);

        if (seg === 'month') {
            if (buf.length === 1) {
                if (d >= 2 && d <= 9) {
                    // Single digit month (2-9) is unambiguous → commit and advance
                    this._month = d;
                    this._buf = '';
                    this._nextSegment();
                } else {
                    // d is 0 or 1 → might still need a second digit (01-09, 10-12)
                    this._buf = buf;
                }
            } else {
                // buf.length === 2
                const num = parseInt(buf);
                if (num >= 1 && num <= 12) {
                    this._month = num;
                    this._buf = '';
                    this._nextSegment();
                } else {
                    // Invalid combo (e.g. "00", "13+") → restart with current digit
                    this._buf = String(d);
                    if (d >= 2 && d <= 9) {
                        this._month = d; this._buf = ''; this._nextSegment();
                    }
                }
            }
        } else if (seg === 'day') {
            const maxD = daysInMonth(this._month ?? 1, this._year ?? 2000);
            if (buf.length === 1) {
                if (d >= 4 && d <= 9) {
                    // Single digit 4-9: any two-digit combo starting with this would be >39 → invalid → commit
                    this._day = d;
                    this._buf = '';
                    this._nextSegment();
                } else {
                    // d is 0,1,2,3 → could be start of 01-03, 10-19, 20-29, 30-31
                    this._buf = buf;
                }
            } else {
                const num = parseInt(buf);
                if (num >= 1 && num <= maxD) {
                    this._day = num;
                    this._buf = '';
                    this._nextSegment();
                } else {
                    // Invalid → restart
                    this._buf = String(d);
                    if (d >= 4 && d <= 9) {
                        this._day = d; this._buf = ''; this._nextSegment();
                    }
                }
            }
        } else {
            // year
            this._buf = buf.slice(-4); // keep last 4 digits
            if (this._buf.length === 4) {
                this._year = parseInt(this._buf);
                this._buf = '';
                this._checkAndEmit();
            }
        }
    }

    // ── Internal: increment / decrement ──────────────────────────────────────

    private _adjust(delta: number) {
        const seg = this._active;
        if (!seg) return;
        this._buf = ''; // clear any partial input

        if (seg === 'month') {
            const cur = this._month ?? (delta > 0 ? 0 : 13);
            this._month = clamp(cur + delta, 1, 12);
            // Clamp day if now invalid
            if (this._day !== null) {
                this._day = clamp(this._day, 1, daysInMonth(this._month, this._year ?? 2000));
            }
        } else if (seg === 'day') {
            const max = daysInMonth(this._month ?? 1, this._year ?? 2000);
            const cur = this._day ?? (delta > 0 ? 0 : max + 1);
            this._day = clamp(cur + delta, 1, max);
        } else {
            // year
            const cur = this._year ?? new Date().getFullYear();
            this._year = clamp(cur + delta, 1, 9999);
        }
        this._checkAndEmit();
    }

    // ── Internal: emit when a full date is ready ──────────────────────────────

    private _checkAndEmit() {
        const iso = segmentsToIso(this._month, this._day, this._year);
        if (iso && iso !== this.value) {
            this.value = iso;
            this.dispatchEvent(new CustomEvent('flint-date-field-change', {
                detail: { value: iso }, bubbles: true, composed: true
            }));
        }
    }

    // ── Internal: keyboard handler ────────────────────────────────────────────

    private _handleKeyDown(e: KeyboardEvent) {
        if (this.disabled || this.readonly) return;

        // Digits — stop propagation so Storybook / parent keydown handlers
        // don't intercept (Storybook maps digits to sidebar navigation shortcuts).
        if (e.key >= '0' && e.key <= '9') {
            e.preventDefault();
            e.stopPropagation();
            if (!this._active) this._setActive('month');
            this._handleDigit(parseInt(e.key));
            return;
        }

        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                e.stopPropagation();
                this._prevSegment();
                break;
            case 'ArrowRight':
            case '/':
                e.preventDefault();
                e.stopPropagation();
                this._nextSegment();
                break;
            case 'ArrowUp':
                e.preventDefault();
                e.stopPropagation();
                if (!this._active) this._setActive('month');
                this._adjust(1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                e.stopPropagation();
                if (!this._active) this._setActive('month');
                this._adjust(-1);
                break;
            case 'Tab':
                // Only intercept Tab when it moves to a sibling segment.
                // When on the last/first segment, let Tab bubble normally so
                // the browser can move focus out of the component.
                if (!e.shiftKey && this._canGoNext()) {
                    e.preventDefault();
                    e.stopPropagation();
                    this._nextSegment();
                } else if (e.shiftKey && this._canGoPrev()) {
                    e.preventDefault();
                    e.stopPropagation();
                    this._prevSegment();
                }
                break;
            case 'Backspace':
            case 'Delete':
                e.preventDefault();
                e.stopPropagation();
                this._buf = '';
                if (this._active === 'month') { this._month = null; }
                if (this._active === 'day') { this._day = null; }
                if (this._active === 'year') { this._year = null; }
                break;
            case 'Escape':
                e.preventDefault();
                e.stopPropagation();
                this.clear();
                break;
        }
    }

    private _handleFocus() {
        this._focused = true;
        if (!this._active) this._setActive('month');
    }

    private _handleBlur(e: FocusEvent) {
        // Only clear focus if truly leaving the component (not between segments)
        if (!this.shadowRoot?.contains(e.relatedTarget as Node)) {
            this._commitPartialBuffer(); // commit any pending single-digit entry before losing focus
            this._focused = false;
            this._active = null;
            this._buf = '';
        }
    }

    private _handleContainerClick(e: MouseEvent) {
        if (this.disabled || this.readonly) return;
        const target = e.target as HTMLElement;
        // If click landed on the segments wrapper (not a specific segment),
        // focus month
        if (target.classList.contains('segments')) {
            this._setActive('month');
            (this.shadowRoot?.querySelector('.segments') as HTMLElement)?.focus();
        }
    }

    // ── Rendering ─────────────────────────────────────────────────────────────

    private _segmentText(seg: Segment): { text: string; isPlaceholder: boolean } {
        // Show partial buffer while typing for current segment
        const isActive = this._active === seg && !this.disabled;

        if (seg === 'month') {
            // padEnd: show "1_" not "_1" — the typed digit comes first (natural reading order)
            if (isActive && this._buf) return { text: this._buf.padEnd(2, '_'), isPlaceholder: false };
            if (this._month !== null) return { text: String(this._month).padStart(2, '0'), isPlaceholder: false };
            return { text: 'MM', isPlaceholder: true };
        }
        if (seg === 'day') {
            if (isActive && this._buf) return { text: this._buf.padEnd(2, '_'), isPlaceholder: false };
            if (this._day !== null) return { text: String(this._day).padStart(2, '0'), isPlaceholder: false };
            return { text: 'DD', isPlaceholder: true };
        }
        // year
        if (isActive && this._buf) {
            return { text: this._buf.padEnd(4, '_'), isPlaceholder: false };
        }
        if (this._year !== null) return { text: String(this._year).padStart(4, '0'), isPlaceholder: false };
        return { text: 'YYYY', isPlaceholder: true };
    }

    private _hasValue() {
        return this._month !== null || this._day !== null || this._year !== null;
    }

    render() {
        const labelClasses = classMap({ 'field-label': true, focused: this._focused });
        const containerClasses = classMap({ 'field-container': true, focused: this._focused });

        const renderSeg = (seg: Segment, extraClass = '') => {
            const { text, isPlaceholder } = this._segmentText(seg);
            return html`<span
        class=${classMap({
                segment: true,
                [seg]: true,
                active: this._active === seg,
                placeholder: isPlaceholder,
                [`segment-${seg}`]: true,
                [extraClass]: !!extraClass,
            })}
        @click=${(e: MouseEvent) => {
                    e.stopPropagation();
                    this._setActive(seg);
                    (this.shadowRoot?.querySelector('.segments') as HTMLElement)?.focus();
                }}
      >${text}</span>`;
        };

        return html`
      ${this.label ? html`<label class=${labelClasses}>${this.label}</label>` : nothing}

      <div class=${containerClasses} @click=${this._handleContainerClick}>

        <div
          class="segments"
          role="group"
          aria-label=${this.label || 'Date'}
          tabindex=${this.disabled ? -1 : 0}
          @keydown=${this._handleKeyDown}
          @focus=${this._handleFocus}
          @blur=${this._handleBlur}
        >
          ${renderSeg('month')}
          <span class="separator">/</span>
          ${renderSeg('day')}
          <span class="separator">/</span>
          ${renderSeg('year', 'segment-year')}
        </div>

        <div class="field-actions">
          ${this._hasValue() && !this.disabled && !this.readonly ? html`
            <button class="icon-btn" aria-label="Clear date" tabindex="-1"
              @click=${(e: MouseEvent) => { e.stopPropagation(); this.clear(); }}>✕</button>
          ` : nothing}
        </div>
      </div>

      ${this.error && this.errorMessage
          ? html`<small class="helper error-text" role="alert">${this.errorMessage}</small>`
          : this.helperText
              ? html`<small class="helper">${this.helperText}</small>`
              : nothing}
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-date-field': FlintDateField;
    }
}
