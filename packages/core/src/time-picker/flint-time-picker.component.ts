import { unsafeCSS, html, svg, css, nothing, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { FlintElement } from '../flint-element.js';
import { FlintDialog, FlintDialogTitle, FlintDialogContent, FlintDialogActions } from '../dialog/flint-dialog.component.js';
import uiTimeFieldStyles from './flint-time-field.css?inline';
import uiDigitalClockStyles from './flint-digital-clock.css?inline';
import uiMultiSectionDigitalClockStyles from './flint-multi-section-digital-clock.css?inline';
import uiTimeClockStyles from './flint-time-clock.css?inline';
import uiStaticTimePickerStyles from './flint-static-time-picker.css?inline';
import uiTimePickerStyles from './flint-time-picker.css?inline';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function padZ(n: number) { return String(n).padStart(2, '0'); }

function parseTime(v: string): { h: number; m: number; s: number } | null {
    if (!v) return null;
    const p = v.split(':').map(Number);
    if (p.length < 2 || p.some(isNaN)) return null;
    return { h: p[0]!, m: p[1]!, s: p[2] ?? 0 };
}

function buildTime(h: number, m: number, s = 0) { return `${padZ(h)}:${padZ(m)}:${padZ(s)}`; }

function to12(h: number): { hour: number; ampm: 'AM' | 'PM' } {
    return { hour: h % 12 || 12, ampm: h < 12 ? 'AM' : 'PM' };
}
function to24(hour: number, ampm: string) {
    if (ampm === 'AM') return hour === 12 ? 0 : hour;
    return hour === 12 ? 12 : hour + 12;
}

function displayTime(v: string, ampm: boolean, withSec = false) {
    const t = parseTime(v);
    if (!t) return '';
    const h = ampm ? to12(t.h).hour : t.h;
    const suf = ampm ? ` ${to12(t.h).ampm}` : '';
    return `${padZ(h)}:${padZ(t.m)}${withSec ? ':' + padZ(t.s) : ''}${suf}`;
}

// Position on clock face: value/total of a full circle, r=radius, cx/cy=centre
function clockXY(value: number, total: number, r: number, cx = 140, cy = 140) {
    const a = (value / total - 0.25) * Math.PI * 2;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

// Angle (0° = 12-o'clock, clockwise) from a point relative to the centre
function clockAngle(mx: number, my: number, cx = 140, cy = 140) {
    let a = Math.atan2(my - cy, mx - cx) * 180 / Math.PI + 90;
    if (a < 0) a += 360;
    return a;
}

type TimeView = 'hours' | 'minutes' | 'seconds';

// ─── flint-time-field ────────────────────────────────────────────────────────────
/**
 * Time Field: a segmented time input with keyboard navigation.
 *
 * @fires flint-time-field-change - Fired when the time value changes. detail: `{ value: string }`
 * @fires flint-time-picker-clear - Fired when the clear button is clicked.
 */
export class FlintTimeField extends FlintElement {
    static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
    static styles = unsafeCSS(uiTimeFieldStyles);

    /** Time value in HH:MM:SS format. */
    @property({ type: String }) value = '';
    /** Field label text. */
    @property({ type: String }) label = '';
    /** Whether to use 12-hour (AM/PM) format instead of 24-hour. */
    @property({ type: Boolean }) ampm = true;
    /** Whether to show a seconds segment. */
    @property({ type: Boolean }) seconds = false;
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

    @state() private _h: number | null = null;
    @state() private _m: number | null = null;
    @state() private _s: number | null = null;
    @state() private _mer: 'AM' | 'PM' = 'AM';
    @state() private _active: 'hour' | 'minute' | 'second' | 'meridiem' | null = null;
    @state() private _focused = false;
    @state() private _buf = '';

    private get _segs(): Array<'hour' | 'minute' | 'second' | 'meridiem'> {
        const s: Array<'hour' | 'minute' | 'second' | 'meridiem'> = ['hour', 'minute'];
        if (this.seconds) s.push('second');
        if (this.ampm) s.push('meridiem');
        return s;
    }

    willUpdate(ch: Map<string, unknown>) {
        if (ch.has('value') && this.value) {
            const t = parseTime(this.value);
            if (t) {
                const { hour, ampm } = to12(t.h);
                this._h = this.ampm ? hour : t.h;
                this._m = t.m; this._s = t.s;
                this._mer = ampm;
            }
        }
    }

    clear() {
        this._h = null; this._m = null; this._s = null; this._buf = '';
        this.dispatchEvent(new CustomEvent('flint-time-picker-clear', { bubbles: true, composed: true }));
    }

    private _emit() {
        if (this._h === null || this._m === null) return;
        const h = this.ampm ? to24(this._h, this._mer) : this._h;
        const v = buildTime(h, this._m, this._s ?? 0);
        if (v === this.value) return;
        this.value = v;
        this.dispatchEvent(new CustomEvent('flint-time-field-change', { detail: { value: v }, bubbles: true, composed: true }));
    }

    private _commitBuf() {
        if (!this._buf || !this._active) return;
        const n = parseInt(this._buf);
        if (isNaN(n)) return;
        const maxH = this.ampm ? 12 : 23;
        if (this._active === 'hour' && n >= (this.ampm ? 1 : 0) && n <= maxH) this._h = n;
        else if (this._active === 'minute' && n >= 0 && n <= 59) this._m = n;
        else if (this._active === 'second' && n >= 0 && n <= 59) this._s = n;
        this._emit();
    }

    private _setActive(seg: typeof this._active) {
        this._commitBuf();
        this._active = seg; this._buf = '';
    }

    private _next() {
        const s = this._segs; const i = s.indexOf(this._active as 'hour' | 'minute' | 'second' | 'meridiem');
        if (i < s.length - 1) this._setActive(s[i + 1] ?? null);
    }
    private _prev() {
        const s = this._segs; const i = s.indexOf(this._active as 'hour' | 'minute' | 'second' | 'meridiem');
        if (i > 0) this._setActive(s[i - 1] ?? null);
    }
    private _canNext() { const s = this._segs; return s.indexOf(this._active as 'hour' | 'minute' | 'second' | 'meridiem') < s.length - 1; }
    private _canPrev() { const s = this._segs; return s.indexOf(this._active as 'hour' | 'minute' | 'second' | 'meridiem') > 0; }

    private _digit(d: number) {
        if (!this._active) this._setActive('hour');
        if (this._active === 'meridiem') return;
        const buf = this._buf + d;
        const maxH = this.ampm ? 12 : 23;

        if (this._active === 'hour') {
            if (buf.length === 1) {
                const threshold = this.ampm ? 2 : 3;
                if (d >= threshold) { this._h = d; this._buf = ''; this._next(); }
                else this._buf = buf;
            } else {
                const n = parseInt(buf);
                if (n >= (this.ampm ? 1 : 0) && n <= maxH) { this._h = n; this._buf = ''; this._next(); }
                else { this._buf = String(d); if (d >= (this.ampm ? 2 : 3)) { this._h = d; this._buf = ''; this._next(); } }
            }
        } else if (this._active === 'minute' || this._active === 'second') {
            if (buf.length === 1) {
                if (d >= 6) { this[this._active === 'minute' ? '_m' : '_s'] = d; this._buf = ''; this._next(); }
                else this._buf = buf;
            } else {
                const n = parseInt(buf);
                if (n >= 0 && n <= 59) {
                    this[this._active === 'minute' ? '_m' : '_s'] = n; this._buf = ''; this._next();
                } else { this._buf = String(d); if (d >= 6) { this[this._active === 'minute' ? '_m' : '_s'] = d; this._buf = ''; this._next(); } }
            }
        }
        this._emit();
    }

    private _adjust(delta: number) {
        this._buf = '';
        const maxH = this.ampm ? 12 : 23;
        const minH = this.ampm ? 1 : 0;
        if (this._active === 'hour') this._h = Math.min(maxH, Math.max(minH, (this._h ?? (delta > 0 ? minH - 1 : maxH + 1)) + delta));
        else if (this._active === 'minute') this._m = (((this._m ?? (delta > 0 ? -1 : 60)) + delta) + 60) % 60;
        else if (this._active === 'second') this._s = (((this._s ?? (delta > 0 ? -1 : 60)) + delta) + 60) % 60;
        else if (this._active === 'meridiem') this._mer = this._mer === 'AM' ? 'PM' : 'AM';
        this._emit();
    }

    private _onKey(e: KeyboardEvent) {
        if (this.disabled || this.readonly) return;
        if (e.key >= '0' && e.key <= '9') { e.preventDefault(); e.stopPropagation(); if (!this._active) this._setActive('hour'); this._digit(+e.key); return; }
        if ((e.key === 'a' || e.key === 'A') && this.ampm && !e.metaKey) { e.preventDefault(); e.stopPropagation(); this._mer = 'AM'; this._emit(); return; }
        if ((e.key === 'p' || e.key === 'P') && this.ampm && !e.metaKey) { e.preventDefault(); e.stopPropagation(); this._mer = 'PM'; this._emit(); return; }
        switch (e.key) {
            case 'ArrowLeft': e.preventDefault(); e.stopPropagation(); this._prev(); break;
            case 'ArrowRight': case ':': e.preventDefault(); e.stopPropagation(); this._next(); break;
            case 'ArrowUp': e.preventDefault(); e.stopPropagation(); if (!this._active) this._setActive('hour'); this._adjust(1); break;
            case 'ArrowDown': e.preventDefault(); e.stopPropagation(); if (!this._active) this._setActive('hour'); this._adjust(-1); break;
            case 'Tab':
                if (!e.shiftKey && this._canNext()) { e.preventDefault(); e.stopPropagation(); this._next(); }
                else if (e.shiftKey && this._canPrev()) { e.preventDefault(); e.stopPropagation(); this._prev(); }
                break;
            case 'Backspace': case 'Delete':
                e.preventDefault(); e.stopPropagation(); this._buf = '';
                if (this._active === 'hour') this._h = null; else if (this._active === 'minute') this._m = null; else if (this._active === 'second') this._s = null;
                break;
            case 'Escape': e.preventDefault(); e.stopPropagation(); this.clear(); break;
        }
    }

    private _segText(seg: 'hour' | 'minute' | 'second' | 'meridiem'): { text: string; ph: boolean } {
        const active = this._active === seg;
        if (seg === 'meridiem') return { text: this._mer, ph: false };
        if (active && this._buf) {
            const maxW = seg === 'hour' ? (this.ampm ? 2 : 2) : 2;
            return { text: this._buf.padEnd(maxW, '_'), ph: false };
        }
        if (seg === 'hour') return this._h !== null ? { text: padZ(this._h), ph: false } : { text: 'HH', ph: true };
        if (seg === 'minute') return this._m !== null ? { text: padZ(this._m), ph: false } : { text: 'MM', ph: true };
        return this._s !== null ? { text: padZ(this._s), ph: false } : { text: 'SS', ph: true };
    }

    render() {
        const hasVal = this._h !== null || this._m !== null;
        return html`
      ${this.label ? html`<label class="label ${this._focused ? 'focused' : ''}">${this.label}</label>` : nothing}
      <div class="container ${this._focused ? 'focused' : ''}">
        <div class="segments" tabindex=${this.disabled ? -1 : 0} role="group" aria-label=${this.label || 'Time'}
          @keydown=${this._onKey}
          @focus=${() => { this._focused = true; if (!this._active) this._setActive('hour'); }}
          @blur=${(e: FocusEvent) => { if (!this.shadowRoot?.contains(e.relatedTarget as Node)) { this._focused = false; this._active = null; this._buf = ''; } }}
        >
          ${this._segs.map((seg, i) => {
            const { text, ph } = this._segText(seg);
            const sep = i > 0 && seg !== 'meridiem' ? html`<span class="sep">:</span>` : (seg === 'meridiem' ? html`<span class="sep"> </span>` : nothing);
            return html`${sep}<span
              class=${classMap({ seg: true, active: this._active === seg, placeholder: ph, meridiem: seg === 'meridiem' })}
              @click=${(e: MouseEvent) => { e.stopPropagation(); this._setActive(seg); (this.shadowRoot?.querySelector('.segments') as HTMLElement)?.focus(); }}
            >${text}</span>`;
        })}
        </div>
        ${hasVal && !this.disabled ? html`<button class="icon-btn" tabindex="-1" aria-label="Clear" @click=${(e: MouseEvent) => { e.stopPropagation(); this.clear(); }}>✕</button>` : nothing}
      </div>
      ${this.error && this.errorMessage
          ? html`<small class="helper error-text" role="alert">${this.errorMessage}</small>`
          : this.helperText
              ? html`<small class="helper">${this.helperText}</small>`
              : nothing}
    `;
    }
}

// ─── flint-digital-clock ─────────────────────────────────────────────────────────
/**
 * Digital Clock: a scrollable time-slot picker.
 *
 * @fires flint-digital-clock-change - Fired when a time slot is selected. detail: `{ value: string }`
 */
export class FlintDigitalClock extends FlintElement {
    static styles = unsafeCSS(uiDigitalClockStyles);

    /** Time value in HH:MM:SS format. */
    @property({ type: String }) value = '';
    /** Step interval in minutes between selectable times. */
    @property({ type: Number }) step = 30;
    /** Whether to use 12-hour (AM/PM) format instead of 24-hour. */
    @property({ type: Boolean }) ampm = true;

    private _items(): string[] {
        const out: string[] = [];
        for (let m = 0; m < 24 * 60; m += this.step) {
            const h = Math.floor(m / 60), min = m % 60;
            out.push(buildTime(h, min));
        }
        return out;
    }

    private _label(v: string) { return displayTime(v, this.ampm); }

    private _select(v: string) {
        this.dispatchEvent(new CustomEvent('flint-digital-clock-change', { detail: { value: v }, bubbles: true, composed: true }));
    }

    private _onItemKeyDown(e: KeyboardEvent, v: string) {
        const items = this._items();
        const idx = items.indexOf(v);
        let target = -1;
        if (e.key === 'ArrowDown') { e.preventDefault(); target = Math.min(idx + 1, items.length - 1); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); target = Math.max(idx - 1, 0); }
        else if (e.key === 'Home') { e.preventDefault(); target = 0; }
        else if (e.key === 'End') { e.preventDefault(); target = items.length - 1; }
        else return;
        if (target >= 0 && target !== idx) {
            this._select(items[target]!);
            void this.updateComplete.then(() => {
                const btn = this.shadowRoot?.querySelectorAll<HTMLButtonElement>('.item')[target];
                btn?.focus();
                if (btn && typeof btn.scrollIntoView === 'function') btn.scrollIntoView({ block: 'nearest' });
            });
        }
    }

    updated() {
        const sel = this.shadowRoot?.querySelector('.selected') as HTMLElement;
        if (sel && typeof sel.scrollIntoView === 'function') {
            sel.scrollIntoView({ block: 'center' });
        }
    }

    render() {
        const items = this._items();
        return html`
      <div class="clock" role="listbox" aria-label="Select time">
        ${repeat(items, v => v, v => html`
          <button class=${classMap({ item: true, selected: v === this.value })}
            role="option" aria-selected=${v === this.value ? 'true' : nothing}
            @click=${() => this._select(v)}
            @keydown=${(e: KeyboardEvent) => this._onItemKeyDown(e, v)}
          >${this._label(v)}</button>
        `)}
      </div>
    `;
    }
}

// ─── flint-multi-section-digital-clock ──────────────────────────────────────────
/**
 * Multi Section Digital Clock: hours, minutes, and optional seconds columns.
 *
 * @fires flint-multi-section-digital-clock-change - Fired when the time value changes. detail: `{ value: string }`
 */
export class FlintMultiSectionDigitalClock extends FlintElement {
    static styles = unsafeCSS(uiMultiSectionDigitalClockStyles);

    /** Time value in HH:MM:SS format. */
    @property({ type: String }) value = '';
    /** Whether to use 12-hour (AM/PM) format instead of 24-hour. */
    @property({ type: Boolean }) ampm = true;
    /** Whether to show a seconds column. */
    @property({ type: Boolean }) seconds = false;

    private _t() { return parseTime(this.value) ?? { h: 0, m: 0, s: 0 }; }

    private _set(h: number, m: number, s: number) {
        const v = buildTime(h, m, s);
        this.dispatchEvent(new CustomEvent('flint-multi-section-digital-clock-change', { detail: { value: v }, bubbles: true, composed: true }));
    }

    private _colKeyDown(e: KeyboardEvent, seg: 'h' | 'm' | 's' | 'mer') {
        if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
        e.preventDefault();
        const t = this._t();
        const delta = e.key === 'ArrowDown' ? 1 : -1;
        if (seg === 'h') {
            if (this.ampm) {
                const { hour, ampm } = to12(t.h);
                const newH = ((hour - 1 + delta + 12) % 12) + 1; // cycles 1-12
                this._set(to24(newH, ampm), t.m, t.s);
            } else {
                this._set(((t.h + delta) + 24) % 24, t.m, t.s);
            }
        } else if (seg === 'm') {
            this._set(t.h, ((t.m + delta) + 60) % 60, t.s);
        } else if (seg === 's') {
            this._set(t.h, t.m, ((t.s + delta) + 60) % 60);
        } else if (seg === 'mer') {
            const { hour, ampm } = to12(t.h);
            this._set(to24(hour, ampm === 'AM' ? 'PM' : 'AM'), t.m, t.s);
        }
    }

    private _col(seg: 'h' | 'm' | 's' | 'mer') {
        const t = this._t();
        const cur12 = to12(t.h);

        if (seg === 'mer') {
            return html`
        <div class="col" @keydown=${(e: KeyboardEvent) => this._colKeyDown(e, 'mer')}>
          <div class="col-header">AM/PM</div>
          ${(['AM', 'PM'] as const).map((v: 'AM' | 'PM') => html`
            <button class=${classMap({ item: true, sel: cur12.ampm === v })}
              @click=${() => this._set(to24(cur12.hour, v), t.m, t.s)}>${v}</button>
          `)}
          <div class="col-spacer"></div>
        </div>
      `;
        }

        const hours12 = Array.from({ length: 12 }, (_, i) => i + 1);
        const hours24 = Array.from({ length: 24 }, (_, i) => i);
        const mins = Array.from({ length: 60 }, (_, i) => i);

        if (seg === 'h') {
            const items = this.ampm ? hours12 : hours24;
            const curH = this.ampm ? cur12.hour : t.h;
            return html`
        <div class="col" @keydown=${(e: KeyboardEvent) => this._colKeyDown(e, 'h')}>
          <div class="col-header">Hr</div>
          ${items.map(v => html`
            <button class=${classMap({ item: true, sel: curH === v })}
              @click=${() => { const h = this.ampm ? to24(v, cur12.ampm) : v; this._set(h, t.m, t.s); }}>${padZ(v)}</button>
          `)}
          <div class="col-spacer"></div>
        </div>
      `;
        }
        if (seg === 'm') return html`
      <div class="col" @keydown=${(e: KeyboardEvent) => this._colKeyDown(e, 'm')}>
        <div class="col-header">Min</div>
        ${mins.map(v => html`
          <button class=${classMap({ item: true, sel: t.m === v })}
            @click=${() => this._set(t.h, v, t.s)}>${padZ(v)}</button>
        `)}
        <div class="col-spacer"></div>
      </div>
    `;
        return html`
      <div class="col" @keydown=${(e: KeyboardEvent) => this._colKeyDown(e, 's')}>
        <div class="col-header">Sec</div>
        ${mins.map(v => html`
          <button class=${classMap({ item: true, sel: t.s === v })}
            @click=${() => this._set(t.h, t.m, v)}>${padZ(v)}</button>
        `)}
        <div class="col-spacer"></div>
      </div>
    `;
    }

    updated() {
        this.shadowRoot?.querySelectorAll('.col').forEach(col => {
            const sel = col.querySelector('.sel') as HTMLElement;
            if (sel && typeof sel.scrollIntoView === 'function') {
                sel.scrollIntoView({ block: 'center' });
            }
        });
    }

    render() {
        return html`
      <div class="msdc">
        ${this._col('h')}
        ${this._col('m')}
        ${this.seconds ? this._col('s') : nothing}
        ${this.ampm ? this._col('mer') : nothing}
      </div>
    `;
    }
}

// ─── flint-time-clock ────────────────────────────────────────────────────────────
/**
 * Time Clock: an analog clock face for selecting hours, minutes, and seconds.
 *
 * @fires flint-time-clock-change - Fired when the time value changes. detail: `{ value: string }`
 * @fires flint-time-clock-view-change - Fired when the clock face view switches.
 */
export class FlintTimeClock extends FlintElement {
    static styles = unsafeCSS(uiTimeClockStyles);

    /** Time value in HH:MM:SS format. */
    @property({ type: String }) value = '';
    /** Whether to use 12-hour (AM/PM) format instead of 24-hour. */
    @property({ type: Boolean }) ampm = true;
    /** Whether to show a seconds face on the clock. */
    @property({ type: Boolean }) seconds = false;
    /** Currently active clock face view. */
    @property({ type: String }) view: TimeView = 'hours';

    @state() private _isDragging = false;
    @state() private _liveValue = '';

    private get _t() { return parseTime(this.value) ?? { h: 0, m: 0, s: 0 }; }

    // During drag use the live (unconfirmed) value for rendering so the hand follows the pointer immediately.
    private get _renderT() {
        const val = (this._isDragging && this._liveValue) ? this._liveValue : this.value;
        return parseTime(val) ?? { h: 0, m: 0, s: 0 };
    }

    private _emit(h: number, m: number, s: number) {
        const v = buildTime(h, m, s);
        this.dispatchEvent(new CustomEvent('flint-time-clock-change', { detail: { value: v }, bubbles: true, composed: true }));
    }

    private _switchView(v: TimeView) {
        this.view = v;
        this.dispatchEvent(new CustomEvent('flint-time-clock-view-change', { detail: { view: v }, bubbles: true, composed: true }));
    }

    private _getSvgCoords(e: PointerEvent): { mx: number; my: number } {
        const svgEl = this.shadowRoot!.querySelector('svg')!;
        const rect = svgEl.getBoundingClientRect();
        return {
            mx: (e.clientX - rect.left) * (280 / rect.width),
            my: (e.clientY - rect.top) * (280 / rect.height),
        };
    }

    private _calcValue(mx: number, my: number): string {
        const CX = 140, CY = 140;
        const angle = clockAngle(mx, my, CX, CY);
        const t = this._t; // use committed value for non-edited segments
        if (this.view === 'hours') {
            const dist = Math.sqrt((mx - CX) ** 2 + (my - CY) ** 2);
            const isInner = !this.ampm && dist < 82;
            let h = Math.round(angle / 30) % 12;
            if (isInner) {
                h = h === 0 ? 0 : h + 12;
            } else {
                h = h || 12;
                if (this.ampm) h = to24(h, to12(t.h).ampm);
            }
            return buildTime(h, t.m, t.s);
        } else if (this.view === 'minutes') {
            const m = Math.round(angle / 6) % 60;
            return buildTime(t.h, m, t.s);
        } else {
            const s = Math.round(angle / 6) % 60;
            return buildTime(t.h, t.m, s);
        }
    }

    private _onClockKeyDown(e: KeyboardEvent) {
        const t = this._t;
        let delta: number;
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); delta = 1; }
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); delta = -1; }
        else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (this.view === 'hours') this._switchView('minutes');
            else if (this.view === 'minutes' && this.seconds) this._switchView('seconds');
            return;
        } else return;

        if (this.view === 'hours') {
            if (this.ampm) {
                const { hour, ampm } = to12(t.h);
                const newH = ((hour - 1 + delta + 12) % 12) + 1;
                this._emit(to24(newH, ampm), t.m, t.s);
            } else {
                this._emit(((t.h + delta) + 24) % 24, t.m, t.s);
            }
        } else if (this.view === 'minutes') {
            this._emit(t.h, ((t.m + delta) + 60) % 60, t.s);
        } else {
            this._emit(t.h, t.m, ((t.s + delta) + 60) % 60);
        }
    }

    private _onPointerDown = (e: PointerEvent) => {
        e.preventDefault();
        (e.currentTarget as SVGSVGElement).setPointerCapture(e.pointerId);
        this._isDragging = true;
        const { mx, my } = this._getSvgCoords(e);
        this._liveValue = this._calcValue(mx, my);
        const p = parseTime(this._liveValue);
        if (p) this._emit(p.h, p.m, p.s);
    };

    private _onPointerMove = (e: PointerEvent) => {
        if (!this._isDragging) return;
        const { mx, my } = this._getSvgCoords(e);
        this._liveValue = this._calcValue(mx, my);
        const p = parseTime(this._liveValue);
        if (p) this._emit(p.h, p.m, p.s);
    };

    private _onPointerUp = (e: PointerEvent) => {
        if (!this._isDragging) return;
        this._isDragging = false;
        const { mx, my } = this._getSvgCoords(e);
        const v = this._calcValue(mx, my);
        this._liveValue = '';
        const p = parseTime(v);
        if (p) this._emit(p.h, p.m, p.s);
        // Advance view after pointer is released
        if (this.view === 'hours') {
            this._switchView('minutes');
        } else if (this.view === 'minutes' && this.seconds) {
            this._switchView('seconds');
        }
    };

    private _renderFace() {
        const CX = 140, CY = 140;
        const t = this._renderT;

        // FIX 2: Correct hand angle for 24h dual-ring mode.
        // Inner ring hours (0 and 13-23) must map to the same angular positions as 0 and 1-11.
        // Outer ring hours (1-12) map to positions 1-12 on the outer ring.
        let handAngle: number, handLen: number;
        if (this.view === 'hours') {
            let hPos: number;
            if (this.ampm) {
                hPos = to12(t.h).hour; // always 1-12
            } else {
                // FIX 2a: Inner ring = h is 0 or 13-23; map to clock position via % 12
                // Outer ring = h is 1-12; use directly
                hPos = (t.h === 0 || t.h > 12) ? t.h % 12 : t.h;
            }
            handAngle = (hPos / 12) * 360;
            // FIX 2b: Short hand only for inner ring hours (0 and 13-23)
            handLen = this.ampm ? 100 : (t.h === 0 || t.h > 12 ? 64 : 100);
        } else if (this.view === 'minutes') {
            handAngle = (t.m / 60) * 360; handLen = 100;
        } else {
            handAngle = (t.s / 60) * 360; handLen = 100;
        }

        const deg2rad = (d: number) => (d - 90) * Math.PI / 180;
        const hx = CX + handLen * Math.cos(deg2rad(handAngle));
        const hy = CY + handLen * Math.sin(deg2rad(handAngle));

        // Numbers
        const nums: Array<{ val: number; label: string; r: number; inner?: boolean }> = [];
        if (this.view === 'hours') {
            if (this.ampm) {
                for (let i = 1; i <= 12; i++) nums.push({ val: i, label: String(i), r: 100 });
            } else {
                // Outer ring: 1-12
                for (let i = 1; i <= 12; i++) nums.push({ val: i, label: String(i), r: 100 });
                // Inner ring: 13-23 and 0 (displayed as 00)
                for (let i = 13; i <= 24; i++) nums.push({ val: i % 24, label: i === 24 ? '00' : String(i), r: 64, inner: true });
            }
        } else {
            for (let i = 0; i < 12; i++) {
                const v = i * 5;
                nums.push({ val: v, label: padZ(v), r: 100 });
            }
        }

        // Hours use 12 positions (1-12); minutes/seconds use 60 positions (0,5,10,...,55)
        const total = this.view === 'hours' ? 12 : 60;

        return html`
      <svg width="280" height="280" viewBox="0 0 280 280" tabindex="0"
        class=${this._isDragging ? 'dragging' : ''}
        @pointerdown=${this._onPointerDown}
        @pointermove=${this._onPointerMove}
        @pointerup=${this._onPointerUp}
        @keydown=${this._onClockKeyDown}>
        <circle cx=${CX} cy=${CY} r="125" class="face"></circle>
        ${this.view === 'hours' && !this.ampm ? svg`<circle cx=${CX} cy=${CY} r="82" class="face-inner"></circle>` : nothing}
        <line x1=${CX} y1=${CY} x2=${hx} y2=${hy} class="hand"></line>
        <circle cx=${hx} cy=${hy} r="17" class="hand-tip"></circle>
        <circle cx=${CX} cy=${CY} r="4" class="hand-center"></circle>
        ${nums.map(n => {
            // Hours: inner ring vals (0,13-23) → clock position via %12; outer ring vals (1-12) used directly.
            // Minutes/seconds: vals (0,5,10,...,55) used directly with total=60.
            const clockPos = n.inner ? n.val % 12 : n.val;
            const pos = clockXY(clockPos, total, n.r, CX, CY);

            const isSel = this.view === 'hours'
                ? (this.ampm ? to12(t.h).hour === n.val : t.h === n.val)
                : (this.view === 'minutes' ? t.m === n.val : t.s === n.val);
            return svg`
          <circle cx=${pos.x} cy=${pos.y} r="17" class=${classMap({ 'num-bg': true, selected: isSel })}></circle>
          <text x=${pos.x} y=${pos.y} dominant-baseline="central" class=${classMap({ num: true, selected: isSel, 'inner-label': !!n.inner })}>${n.label}</text>
        `;
        })}
      </svg>
    `;
    }

    render() {
        const t = this._t;
        const { hour, ampm: mer } = to12(t.h);
        const dispH = this.ampm ? padZ(hour) : padZ(t.h);
        return html`
      <div class="clock-wrap">
        <div class="clock-header">
          <span class=${classMap({ 'clock-seg': true, active: this.view === 'hours' })} @click=${() => this._switchView('hours')}>${dispH}</span>
          <span class="clock-sep">:</span>
          <span class=${classMap({ 'clock-seg': true, active: this.view === 'minutes' })} @click=${() => this._switchView('minutes')}>${padZ(t.m)}</span>
          ${this.seconds ? html`<span class="clock-sep">:</span><span class=${classMap({ 'clock-seg': true, active: this.view === 'seconds' })} @click=${() => this._switchView('seconds')}>${padZ(t.s)}</span>` : nothing}
          ${this.ampm ? html`<span class="clock-mer">${mer}</span>` : nothing}
        </div>
        ${this.ampm ? html`
          <div class="am-pm">
            <button class=${classMap({ 'am-pm-btn': true, sel: mer === 'AM' })} @click=${() => { const tt = this._t; this._emit(to24(to12(tt.h).hour, 'AM'), tt.m, tt.s); }}>AM</button>
            <button class=${classMap({ 'am-pm-btn': true, sel: mer === 'PM' })} @click=${() => { const tt = this._t; this._emit(to24(to12(tt.h).hour, 'PM'), tt.m, tt.s); }}>PM</button>
          </div>
        ` : nothing}
        ${this._renderFace()}
      </div>
    `;
    }
}

// ─── Shared field+popover/dialog pattern ──────────────────────────────────────

const FIELD_SHARED = css`
  :host { display:inline-block; font-family:var(--flint-font-family,'Inter',sans-serif); }
  .popover-anchor { position:relative; display:inline-block; }
  .click-away { display:none; position:fixed; inset:0; z-index:1399; }
  .click-away.open { display:block; }
  .popover {
    position:absolute; top:calc(100% + 6px); left:0; z-index:1400;
    background:var(--flint-surface-background,#fff);
    border-radius:var(--flint-border-radius-xl,12px);
    box-shadow:0 8px 24px -4px rgba(0,0,0,.18), 0 2px 8px -2px rgba(0,0,0,.1);
    transform-origin:top left; transform:scale(.94) translateY(-4px);
    opacity:0; visibility:hidden; pointer-events:none;
    transition:transform .15s cubic-bezier(.4,0,.2,1), opacity .15s, visibility .15s;
  }
  .popover.open { transform:scale(1) translateY(0); opacity:1; visibility:visible; pointer-events:auto; }
  .actions {
    display:flex; justify-content:flex-end; gap:8px;
    padding:8px 12px 12px; border-top:1px solid var(--flint-border-color,#f3f4f6);
  }
  .btn { font-family:inherit; font-size:.875rem; font-weight:600; padding:6px 14px;
    border:none; border-radius:6px; cursor:pointer; transition:background .12s; }
  .btn-cancel { background:transparent; color:var(--flint-text-color-muted,#4b5563); }
  .btn-cancel:hover { background:var(--flint-hover-color, rgba(0,0,0,.06)); }
  .btn-ok { background:var(--flint-primary-color,#2563eb); color:var(--flint-text-color-on-primary, #fff); }
  .btn-ok:hover { background:var(--flint-primary-color-hover,#2563eb); }
`;

// ─── flint-desktop-time-picker ───────────────────────────────────────────────────
/**
 * Desktop Time Picker: a time field with a dropdown clock.
 *
 * @fires flint-desktop-time-picker-change - Fired when the time value changes. detail: `{ value: string }`
 */
export class FlintDesktopTimePicker extends FlintElement {
    static styles = [FIELD_SHARED];

    /** Time value in HH:MM:SS format. */
    @property({ type: String }) value = '';
    /** Field label text. */
    @property({ type: String }) label = 'Time';
    /** Whether to use 12-hour (AM/PM) format instead of 24-hour. */
    @property({ type: Boolean }) ampm = true;
    /** Whether to show a seconds segment. */
    @property({ type: Boolean }) seconds = false;
    /** Disables the picker and prevents interaction. */
    @property({ type: Boolean, reflect: true }) disabled = false;
    /** Makes the field read-only (visible but not editable). */
    @property({ type: Boolean, reflect: true }) readonly = false;
    /** Displays the field in an error state. */
    @property({ type: Boolean, reflect: true }) error = false;
    /** Helper text shown below the field. */
    @property({ type: String, attribute: 'helper-text' }) helperText = '';
    /** Error message displayed below the field when in error state. */
    @property({ type: String, attribute: 'error-message' }) errorMessage = '';

    @state() private _open = false;

    private _commit(v: string) {
        this.value = v;
        this.dispatchEvent(new CustomEvent('flint-desktop-time-picker-change', { detail: { value: v }, bubbles: true, composed: true }));
        this._open = false;
    }

    render() {
        return html`
      <div class="popover-anchor">
        <flint-time-field .value=${this.value} .label=${this.label} .ampm=${this.ampm} ?seconds=${this.seconds}
          ?disabled=${this.disabled} ?readonly=${this.readonly} ?error=${this.error} helper-text=${this.helperText} error-message=${this.errorMessage}
          @flint-time-field-change=${(e: CustomEvent) => this._commit(e.detail.value)}
          @focus=${() => { if (!this.disabled && !this.readonly) this._open = true; }}
        ></flint-time-field>
        <div class="click-away ${this._open ? 'open' : ''}" @click=${() => this._open = false}></div>
        <div class="popover ${this._open ? 'open' : ''}" role="dialog" aria-label="Time picker">
          <flint-multi-section-digital-clock .value=${this.value || buildTime(12, 0)} .ampm=${this.ampm} ?seconds=${this.seconds}
            @flint-multi-section-digital-clock-change=${(e: CustomEvent) => { this.value = e.detail.value; }}
          ></flint-multi-section-digital-clock>
          <div class="actions">
            <button class="btn btn-cancel" @click=${() => this._open = false}>Cancel</button>
            <button class="btn btn-ok" @click=${() => this._commit(this.value || buildTime(12, 0))}>OK</button>
          </div>
        </div>
      </div>
    `;
    }
}

// ─── flint-mobile-time-picker ────────────────────────────────────────────────────
/**
 * Mobile Time Picker: a time field with a modal clock dialog.
 *
 * @fires flint-mobile-time-picker-change - Fired when the time value changes. detail: `{ value: string }`
 */
export class FlintMobileTimePicker extends FlintElement {
    static styles = [FIELD_SHARED];
    static dependencies = {
        'flint-dialog': FlintDialog as unknown as typeof FlintElement,
        'flint-dialog-title': FlintDialogTitle as unknown as typeof FlintElement,
        'flint-dialog-content': FlintDialogContent as unknown as typeof FlintElement,
        'flint-dialog-actions': FlintDialogActions as unknown as typeof FlintElement,
    };

    /** Time value in HH:MM:SS format. */
    @property({ type: String }) value = '';
    /** Field label text. */
    @property({ type: String }) label = 'Time';
    /** Whether to use 12-hour (AM/PM) format instead of 24-hour. */
    @property({ type: Boolean }) ampm = true;
    /** Whether to show a seconds segment. */
    @property({ type: Boolean }) seconds = false;
    /** Disables the picker and prevents interaction. */
    @property({ type: Boolean, reflect: true }) disabled = false;
    /** Displays the picker in an error state. */
    @property({ type: Boolean, reflect: true }) error = false;
    /** Helper text shown below the field. */
    @property({ type: String, attribute: 'helper-text' }) helperText = '';
    /** Error message displayed below the field when in error state. */
    @property({ type: String, attribute: 'error-message' }) errorMessage = '';

    @state() private _open = false;
    @state() private _pending = '';
    @state() private _view: TimeView = 'hours';

    render() {
        return html`
      <flint-time-field .value=${this.value} .label=${this.label} .ampm=${this.ampm} ?seconds=${this.seconds}
        ?disabled=${this.disabled} ?error=${this.error} helper-text=${this.helperText} error-message=${this.errorMessage} readonly
        @focus=${() => { if (!this.disabled) { this._pending = this.value; this._view = 'hours'; this._open = true; } }}
        @flint-time-field-change=${(e: CustomEvent) => { this.value = e.detail.value; this.dispatchEvent(new CustomEvent('flint-mobile-time-picker-change', { detail: e.detail, bubbles: true, composed: true })); }}
      ></flint-time-field>
      <flint-dialog .open=${this._open} disable-backdrop-close @flint-dialog-close=${() => this._open = false} style="--flint-dialog-width:320px">
        <flint-dialog-title>Select Time</flint-dialog-title>
        <flint-dialog-content style="padding:12px;display:flex;justify-content:center;">
          <flint-time-clock .value=${this._pending || this.value || buildTime(12, 0)} .ampm=${this.ampm} ?seconds=${this.seconds} .view=${this._view}
            @flint-time-clock-change=${(e: CustomEvent) => { this._pending = e.detail.value; }}
            @flint-time-clock-view-change=${(e: CustomEvent) => { this._view = e.detail.view; }}
          ></flint-time-clock>
        </flint-dialog-content>
        <flint-dialog-actions>
          <button class="btn btn-cancel" @click=${() => { this._pending = this.value; this._open = false; }}>Cancel</button>
          <button class="btn btn-ok" @click=${() => { const v = this._pending || this.value; this.value = v; this.dispatchEvent(new CustomEvent('flint-mobile-time-picker-change', { detail: { value: v }, bubbles: true, composed: true })); this._open = false; }}>OK</button>
        </flint-dialog-actions>
      </flint-dialog>
    `;
    }
}

// ─── flint-static-time-picker ────────────────────────────────────────────────────
/**
 * Static Time Picker: an always-visible inline clock.
 *
 * @fires flint-static-time-picker-change - Fired when the time value changes. detail: `{ value: string }`
 */
export class FlintStaticTimePicker extends FlintElement {
    static styles = unsafeCSS(uiStaticTimePickerStyles);

    /** Time value in HH:MM:SS format. */
    @property({ type: String }) value = '';
    /** Whether to use 12-hour (AM/PM) format instead of 24-hour. */
    @property({ type: Boolean }) ampm = true;
    /** Whether to show a seconds section. */
    @property({ type: Boolean }) seconds = false;

    render() {
        return html`
      <div class="surface">
        <flint-multi-section-digital-clock .value=${this.value || buildTime(12, 0)} .ampm=${this.ampm} ?seconds=${this.seconds}
          @flint-multi-section-digital-clock-change=${(e: CustomEvent) => {
                this.value = e.detail.value;
                this.dispatchEvent(new CustomEvent('flint-static-time-picker-change', { detail: e.detail, bubbles: true, composed: true }));
            }}
        ></flint-multi-section-digital-clock>
      </div>
    `;
    }
}

// ─── flint-time-picker ───────────────────────────────────────────────────────────
/**
 * Time Picker: a configurable time input supporting desktop, mobile, and static variants.
 *
 * @fires flint-time-picker-change - Fired when the time value changes. detail: `{ value: string }`
 */
export class FlintTimePicker extends FlintElement {
    static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
    static styles = unsafeCSS(uiTimePickerStyles);

    /** Time value in HH:MM:SS format. */
    @property({ type: String }) value = '';
    /** Field label text. */
    @property({ type: String }) label = 'Time';
    /** Picker variant controlling the UI style. */
    @property({ type: String }) variant: 'desktop' | 'mobile' | 'static' | 'auto' = 'desktop';
    /** Whether to use 12-hour (AM/PM) format instead of 24-hour. */
    @property({ type: Boolean }) ampm = true;
    /** Whether to show a seconds segment. */
    @property({ type: Boolean }) seconds = false;
    /** Disables the picker and prevents interaction. */
    @property({ type: Boolean, reflect: true }) disabled = false;
    /** Displays the picker in an error state. */
    @property({ type: Boolean, reflect: true }) error = false;
    /** Helper text shown below the field. */
    @property({ type: String, attribute: 'helper-text' }) helperText = '';
    /** Error message displayed below the field when in error state. */
    @property({ type: String, attribute: 'error-message' }) errorMessage = '';

    private get _v() {
        if (this.variant === 'auto')
            return window.matchMedia('(pointer:coarse)').matches ? 'mobile' : 'desktop';
        return this.variant;
    }

    private _onChange(e: CustomEvent) {
        this.value = e.detail.value;
        this.dispatchEvent(new CustomEvent('flint-time-picker-change', { detail: e.detail, bubbles: true, composed: true }));
    }

    render() {
        const v = this._v;
        if (v === 'static') return html`<flint-static-time-picker .value=${this.value} .ampm=${this.ampm} ?seconds=${this.seconds} @flint-static-time-picker-change=${this._onChange}></flint-static-time-picker>`;
        if (v === 'mobile') return html`<flint-mobile-time-picker .value=${this.value} .label=${this.label} .ampm=${this.ampm} ?seconds=${this.seconds} ?disabled=${this.disabled} ?error=${this.error} helper-text=${this.helperText} error-message=${this.errorMessage} @flint-mobile-time-picker-change=${this._onChange}></flint-mobile-time-picker>`;
        return html`<flint-desktop-time-picker .value=${this.value} .label=${this.label} .ampm=${this.ampm} ?seconds=${this.seconds} ?disabled=${this.disabled} ?error=${this.error} helper-text=${this.helperText} error-message=${this.errorMessage} @flint-desktop-time-picker-change=${this._onChange}></flint-desktop-time-picker>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-time-field': FlintTimeField;
        'flint-digital-clock': FlintDigitalClock;
        'flint-multi-section-digital-clock': FlintMultiSectionDigitalClock;
        'flint-time-clock': FlintTimeClock;
        'flint-desktop-time-picker': FlintDesktopTimePicker;
        'flint-mobile-time-picker': FlintMobileTimePicker;
        'flint-static-time-picker': FlintStaticTimePicker;
        'flint-time-picker': FlintTimePicker;
    }
}
