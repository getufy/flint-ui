import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import '../dialog/ui-dialog.js';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function padZ(n: number) { return String(n).padStart(2, '0'); }

function parseTime(v: string): { h: number; m: number; s: number } | null {
    if (!v) return null;
    const p = v.split(':').map(Number);
    if (p.length < 2 || p.some(isNaN)) return null;
    return { h: p[0], m: p[1], s: p[2] ?? 0 };
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

// ─── ui-time-field ────────────────────────────────────────────────────────────
@customElement('ui-time-field')
export class UiTimeField extends LitElement {
    static styles = css`
    :host { display: inline-block; font-family: var(--ui-font-family,'Inter',sans-serif); }
    .label { display:block; font-size:.75rem; font-weight:500; color:var(--ui-text-color-muted,#6b7280); margin-bottom:5px; }
    .label.focused { color:var(--ui-primary-color,#3b82f6); }
    :host([error]) .label { color:var(--ui-error-color,#ef4444); }
    .container {
      display:inline-flex; align-items:center; gap:4px;
      background:var(--ui-surface-background,#fff);
      border:1.5px solid var(--ui-border-color,#d1d5db);
      border-radius:var(--ui-border-radius-md,8px);
      padding:0 10px; height:44px; min-width:160px;
      cursor:text; box-sizing:border-box; transition:border-color .15s,box-shadow .15s;
    }
    .container.focused { border-color:var(--ui-primary-color,#3b82f6); box-shadow:0 0 0 3px rgba(59,130,246,.15); }
    :host([error]) .container { border-color:var(--ui-error-color,#ef4444); }
    :host([disabled]) .container { background:var(--ui-disabled-bg,#f9fafb); border-color:#e5e7eb; cursor:not-allowed; }
    .segments { display:flex; align-items:center; flex:1; gap:1px; outline:none; min-height:100%; }
    .seg {
      display:inline-flex; align-items:center; justify-content:center;
      border-radius:3px; padding:2px 4px; font-size:.9375rem;
      font-variant-numeric:tabular-nums; color:var(--ui-text-color,#111827);
      min-width:2ch; line-height:1; cursor:text; user-select:none; transition:background .1s;
    }
    .seg.active { background:var(--ui-primary-color,#3b82f6); color:#fff; }
    .seg.placeholder { color:var(--ui-text-color-muted,#9ca3af); }
    .seg.meridiem { min-width:3ch; }
    .sep { color:var(--ui-text-color-muted,#6b7280); font-size:.9375rem; pointer-events:none; }
    .icon-btn {
      display:flex; align-items:center; justify-content:center; width:24px; height:24px;
      border:none; background:transparent; cursor:pointer; border-radius:50%;
      color:var(--ui-text-color-muted,#6b7280); font-size:.875rem; margin-left:auto;
      transition:background .12s;
    }
    .icon-btn:hover { background:rgba(0,0,0,.06); }
    .helper { display:block; font-size:.75rem; margin-top:5px; color:var(--ui-text-color-muted,#6b7280); }
    :host([error]) .helper { color:var(--ui-error-color,#ef4444); }
  `;

    @property({ type: String }) value = '';
    @property({ type: String }) label = '';
    @property({ type: Boolean }) ampm = true;
    @property({ type: Boolean }) seconds = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) readonly = false;
    @property({ type: Boolean, reflect: true }) error = false;
    @property({ type: String, attribute: 'helper-text' }) helperText = '';

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
        this.dispatchEvent(new CustomEvent('clear', { bubbles: true, composed: true }));
    }

    private _emit() {
        if (this._h === null || this._m === null) return;
        const h = this.ampm ? to24(this._h, this._mer) : this._h;
        const v = buildTime(h, this._m, this._s ?? 0);
        if (v === this.value) return;
        this.value = v;
        this.dispatchEvent(new CustomEvent('change', { detail: { value: v }, bubbles: true, composed: true }));
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
        if (i < s.length - 1) this._setActive(s[i + 1]);
    }
    private _prev() {
        const s = this._segs; const i = s.indexOf(this._active as 'hour' | 'minute' | 'second' | 'meridiem');
        if (i > 0) this._setActive(s[i - 1]);
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
      ${this.helperText ? html`<small class="helper">${this.helperText}</small>` : nothing}
    `;
    }
}

// ─── ui-digital-clock ─────────────────────────────────────────────────────────
@customElement('ui-digital-clock')
export class UiDigitalClock extends LitElement {
    static styles = css`
    :host { display:block; font-family:var(--ui-font-family,'Inter',sans-serif); }
    .clock {
      overflow-y:auto; max-height:var(--ui-digital-clock-height,300px);
      padding:4px 0; scrollbar-width:thin;
    }
    .item {
      display:flex; align-items:center; justify-content:center;
      padding:10px 16px; font-size:.9375rem; color:var(--ui-text-color,#374151);
      cursor:pointer; border:none; background:transparent; width:100%;
      box-sizing:border-box; transition:background .1s; font-family:inherit;
      border-radius:0; font-variant-numeric:tabular-nums;
    }
    .item:hover { background:rgba(0,0,0,.05); }
    .item.selected {
      background:var(--ui-primary-color,#3b82f6); color:#fff; font-weight:600; border-radius:6px;
    }
  `;

    @property({ type: String }) value = '';
    @property({ type: Number }) step = 30;
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
            role="option" aria-selected=${v === this.value}
            @click=${() => {
                this.dispatchEvent(new CustomEvent('change', { detail: { value: v }, bubbles: true, composed: true }));
            }}
          >${this._label(v)}</button>
        `)}
      </div>
    `;
    }
}

// ─── ui-multi-section-digital-clock ──────────────────────────────────────────
@customElement('ui-multi-section-digital-clock')
export class UiMultiSectionDigitalClock extends LitElement {
    static styles = css`
    :host { display:inline-block; font-family:var(--ui-font-family,'Inter',sans-serif); }
    .msdc { display:flex; gap:0; border-radius:var(--ui-border-radius-xl,12px); overflow:hidden; }
    .col {
      display:flex; flex-direction:column; overflow-y:auto; width:72px;
      max-height:var(--ui-msdc-height,240px); position:relative; scrollbar-width:none;
    }
    .col::-webkit-scrollbar { display:none; }
    .col + .col { border-left:1px solid var(--ui-border-color,#f3f4f6); }
    .col-header {
      position:sticky; top:0; background:var(--ui-surface-background,#fff);
      font-size:.65rem; font-weight:700; text-transform:uppercase;
      letter-spacing:.06em; color:var(--ui-text-color-muted,#9ca3af);
      text-align:center; padding:6px 0 4px; border-bottom:1px solid var(--ui-border-color,#f3f4f6);
      z-index:1;
    }
    .item {
      display:flex; align-items:center; justify-content:center;
      padding:8px 4px; font-size:.9375rem; font-variant-numeric:tabular-nums;
      color:var(--ui-text-color,#374151); cursor:pointer; border:none;
      background:transparent; font-family:inherit; width:100%; line-height:1; transition:background .1s;
    }
    .item:hover { background:rgba(0,0,0,.05); }
    .item.sel { background:var(--ui-primary-color,#3b82f6); color:#fff; font-weight:700; border-radius:6px; }
    .col-spacer { min-height:80px; }
  `;

    @property({ type: String }) value = '';
    @property({ type: Boolean }) ampm = true;
    @property({ type: Boolean }) seconds = false;

    private _t() { return parseTime(this.value) ?? { h: 0, m: 0, s: 0 }; }

    private _set(h: number, m: number, s: number) {
        const v = buildTime(h, m, s);
        this.dispatchEvent(new CustomEvent('change', { detail: { value: v }, bubbles: true, composed: true }));
    }

    private _col(seg: 'h' | 'm' | 's' | 'mer') {
        const t = this._t();
        const cur12 = to12(t.h);

        if (seg === 'mer') {
            return html`
        <div class="col">
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
        <div class="col">
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
      <div class="col">
        <div class="col-header">Min</div>
        ${mins.map(v => html`
          <button class=${classMap({ item: true, sel: t.m === v })}
            @click=${() => this._set(t.h, v, t.s)}>${padZ(v)}</button>
        `)}
        <div class="col-spacer"></div>
      </div>
    `;
        return html`
      <div class="col">
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

// ─── ui-time-clock ────────────────────────────────────────────────────────────
@customElement('ui-time-clock')
export class UiTimeClock extends LitElement {
    static styles = css`
    :host { display:inline-block; user-select:none; }
    .clock-wrap { display:flex; flex-direction:column; align-items:center; gap:12px; }
    .clock-header {
      display:flex; gap:4px; font-size:2rem; font-weight:700;
      font-family:var(--ui-font-family,'Inter',sans-serif); color:var(--ui-text-color,#111827);
    }
    .clock-seg { padding:4px 10px; border-radius:8px; cursor:pointer; transition:background .12s, color .12s; }
    .clock-seg.active { background:var(--ui-primary-color,#3b82f6); color:#fff; border-radius:8px; }
    .clock-seg:hover:not(.active) { background:rgba(0,0,0,.06); }
    .clock-sep { color:var(--ui-text-color-muted,#6b7280); }
    svg { touch-action:none; cursor:pointer; }
    .face { fill:var(--ui-surface-variant,#f1f5f9); }
    .face-inner { fill:rgba(0,0,0,.02); stroke:rgba(0,0,0,.06); stroke-width:1; stroke-dasharray:4 4; }
    .track { fill:none; stroke:var(--ui-border-color,#e2e8f0); stroke-width:2; }
    .hand { stroke:var(--ui-primary-color,#3b82f6); stroke-width:2; stroke-linecap:round; }
    .hand-center { fill:var(--ui-primary-color,#3b82f6); }
    .hand-tip { fill:var(--ui-primary-color,#3b82f6); }
    .num { font-size:13px; font-family:var(--ui-font-family,'Inter',sans-serif); fill:var(--ui-text-color,#374151); dominant-baseline:central; text-anchor:middle; cursor:pointer; }
    .num.inner-label { font-size:11px; fill:var(--ui-text-color-muted,#6b7280); }
    .num.selected { fill:#fff; }
    .num-bg { fill:transparent; cursor:pointer; }
    .num-bg.selected { fill:var(--ui-primary-color,#3b82f6); }
    .tick { stroke:var(--ui-text-color-muted,#cbd5e1); stroke-width:1; }
    .tick.major { stroke-width:2; }
    .inner-ring-track { fill:none; stroke:var(--ui-primary-color,#3b82f6); stroke-width:1.5; stroke-opacity:0.2; }
    .inner-tick { stroke:var(--ui-primary-color,#3b82f6); stroke-width:1.5; stroke-opacity:0.35; stroke-linecap:round; }
    .am-pm { display:flex; gap:8px; }
    .am-pm-btn {
      padding:4px 16px; border:1.5px solid var(--ui-border-color,#d1d5db);
      border-radius:20px; cursor:pointer; font-size:.875rem; font-family:inherit;
      background:transparent; color:var(--ui-text-color,#374151); transition:all .12s;
    }
    .am-pm-btn.sel { background:var(--ui-primary-color,#3b82f6); color:#fff; border-color:var(--ui-primary-color,#3b82f6); }
  `;

    @property({ type: String }) value = '';
    @property({ type: Boolean }) ampm = true;
    @property({ type: Boolean }) seconds = false;
    @property({ type: String }) view: TimeView = 'hours';

    private get _t() { return parseTime(this.value) ?? { h: 0, m: 0, s: 0 }; }

    private _emit(h: number, m: number, s: number) {
        const v = buildTime(h, m, s);
        this.dispatchEvent(new CustomEvent('change', { detail: { value: v }, bubbles: true, composed: true }));
    }

    private _switchView(v: TimeView) {
        this.view = v;
        this.dispatchEvent(new CustomEvent('view-change', { detail: { view: v }, bubbles: true, composed: true }));
    }

    private _handleClick(e: MouseEvent) {
        const svgEl = this.shadowRoot!.querySelector('svg')!;
        const rect = svgEl.getBoundingClientRect();
        const scaleX = 280 / rect.width, scaleY = 280 / rect.height;
        const mx = (e.clientX - rect.left) * scaleX;
        const my = (e.clientY - rect.top) * scaleY;
        const CX = 140, CY = 140;
        const angle = clockAngle(mx, my, CX, CY);
        const t = this._t;

        if (this.view === 'hours') {
            const dist = Math.sqrt((mx - CX) ** 2 + (my - CY) ** 2);
            // FIX 1 (click): Inner ring threshold at r=82; outer ring is 1-12, inner is 0 and 13-23
            const isInner = !this.ampm && dist < 82;
            let h = Math.round(angle / 30) % 12;
            if (isInner) {
                // Inner ring: positions 0-11 map to hours 13-23 and 0
                // Position 0 on inner ring = 00 (midnight), positions 1-11 = 13-23
                h = h === 0 ? 0 : h + 12;
            } else {
                h = h || 12;
                if (this.ampm) h = to24(h, to12(t.h).ampm);
            }
            this._emit(h, t.m, t.s);
            this._switchView('minutes');
        } else if (this.view === 'minutes') {
            const m = Math.round(angle / 6) % 60;
            this._emit(t.h, m, t.s);
            if (this.seconds) this._switchView('seconds');
        } else {
            const s = Math.round(angle / 6) % 60;
            this._emit(t.h, t.m, s);
        }
    }

    private _renderFace() {
        const CX = 140, CY = 140;
        const t = this._t;

        // FIX 2: Correct hand angle for 24h dual-ring mode.
        // Inner ring hours (0 and 13-23) must map to the same angular positions as 0 and 1-11.
        // Outer ring hours (1-12) map to positions 1-12 on the outer ring.
        let handAngle = 0, handLen = 100;
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

        const total = 12; // Always 12 positions on the clock face

        return html`
      <svg width="280" height="280" viewBox="0 0 280 280" @click=${this._handleClick}>
        <circle cx=${CX} cy=${CY} r="125" class="face"/>
        ${this.view === 'hours' && !this.ampm ? html`<circle cx=${CX} cy=${CY} r="82" class="face-inner"></circle>` : nothing}
        <!-- hand -->
        <line x1=${CX} y1=${CY} x2=${hx} y2=${hy} class="hand"/>
        <circle cx=${hx} cy=${hy} r="18" class="hand-tip"/>
        <circle cx=${CX} cy=${CY} r="4" class="hand-center"/>
        <!-- numbers -->
        ${nums.map(n => {
            // FIX 3: Correct position for inner ring numbers.
            // Inner ring vals are 0 and 13-23. They must occupy clock positions 0 and 1-11.
            // Use val % 12 uniformly — this maps 0→0, 13→1, 14→2, ..., 23→11.
            const clockPos = n.inner ? n.val % 12 : n.val;
            const pos = clockXY(clockPos, total, n.r, CX, CY);

            const isSel = this.view === 'hours'
                ? (this.ampm ? to12(t.h).hour === n.val : t.h === n.val)
                : (this.view === 'minutes' ? t.m === n.val : t.s === n.val);
            return html`
          <circle cx=${pos.x} cy=${pos.y} r="17" class=${classMap({ 'num-bg': true, selected: isSel })}></circle>
          <text x=${pos.x} y=${pos.y} class=${classMap({ num: true, selected: isSel, 'inner-label': !!n.inner })}>${n.label}</text>
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
          ${this.ampm ? html`<span class="clock-sep" style="font-size:1rem;align-self:flex-end;margin-bottom:6px;">${mer}</span>` : nothing}
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
  :host { display:inline-block; font-family:var(--ui-font-family,'Inter',sans-serif); }
  .popover-anchor { position:relative; display:inline-block; }
  .click-away { display:none; position:fixed; inset:0; z-index:1399; }
  .click-away.open { display:block; }
  .popover {
    position:absolute; top:calc(100% + 6px); left:0; z-index:1400;
    background:var(--ui-surface-background,#fff);
    border-radius:var(--ui-border-radius-xl,12px);
    box-shadow:0 8px 24px -4px rgba(0,0,0,.18), 0 2px 8px -2px rgba(0,0,0,.1);
    transform-origin:top left; transform:scale(.94) translateY(-4px);
    opacity:0; visibility:hidden; pointer-events:none;
    transition:transform .15s cubic-bezier(.4,0,.2,1), opacity .15s, visibility .15s;
  }
  .popover.open { transform:scale(1) translateY(0); opacity:1; visibility:visible; pointer-events:auto; }
  .actions {
    display:flex; justify-content:flex-end; gap:8px;
    padding:8px 12px 12px; border-top:1px solid var(--ui-border-color,#f3f4f6);
  }
  .btn { font-family:inherit; font-size:.875rem; font-weight:600; padding:6px 14px;
    border:none; border-radius:6px; cursor:pointer; transition:background .12s; }
  .btn-cancel { background:transparent; color:var(--ui-text-color-muted,#6b7280); }
  .btn-cancel:hover { background:rgba(0,0,0,.06); }
  .btn-ok { background:var(--ui-primary-color,#3b82f6); color:#fff; }
  .btn-ok:hover { background:var(--ui-primary-color-dark,#2563eb); }
`;

// ─── ui-desktop-time-picker ───────────────────────────────────────────────────
@customElement('ui-desktop-time-picker')
export class UiDesktopTimePicker extends LitElement {
    static styles = [FIELD_SHARED];

    @property({ type: String }) value = '';
    @property({ type: String }) label = 'Time';
    @property({ type: Boolean }) ampm = true;
    @property({ type: Boolean }) seconds = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) readonly = false;
    @property({ type: Boolean, reflect: true }) error = false;
    @property({ type: String, attribute: 'helper-text' }) helperText = '';

    @state() private _open = false;

    private _commit(v: string) {
        this.value = v;
        this.dispatchEvent(new CustomEvent('change', { detail: { value: v }, bubbles: true, composed: true }));
        this._open = false;
    }

    render() {
        return html`
      <div class="popover-anchor">
        <ui-time-field .value=${this.value} .label=${this.label} ?ampm=${this.ampm} ?seconds=${this.seconds}
          ?disabled=${this.disabled} ?readonly=${this.readonly} ?error=${this.error} helper-text=${this.helperText}
          @change=${(e: CustomEvent) => this._commit(e.detail.value)}
          @focus=${() => { if (!this.disabled && !this.readonly) this._open = true; }}
        ></ui-time-field>
        <div class="click-away ${this._open ? 'open' : ''}" @click=${() => this._open = false}></div>
        <div class="popover ${this._open ? 'open' : ''}" role="dialog" aria-label="Time picker">
          <ui-multi-section-digital-clock .value=${this.value || buildTime(12, 0)} ?ampm=${this.ampm} ?seconds=${this.seconds}
            @change=${(e: CustomEvent) => { this.value = e.detail.value; }}
          ></ui-multi-section-digital-clock>
          <div class="actions">
            <button class="btn btn-cancel" @click=${() => this._open = false}>Cancel</button>
            <button class="btn btn-ok" @click=${() => this._commit(this.value || buildTime(12, 0))}>OK</button>
          </div>
        </div>
      </div>
    `;
    }
}

// ─── ui-mobile-time-picker ────────────────────────────────────────────────────
@customElement('ui-mobile-time-picker')
export class UiMobileTimePicker extends LitElement {
    static styles = [FIELD_SHARED];

    @property({ type: String }) value = '';
    @property({ type: String }) label = 'Time';
    @property({ type: Boolean }) ampm = true;
    @property({ type: Boolean }) seconds = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) error = false;
    @property({ type: String, attribute: 'helper-text' }) helperText = '';

    @state() private _open = false;
    @state() private _pending = '';
    @state() private _view: TimeView = 'hours';

    render() {
        return html`
      <ui-time-field .value=${this.value} .label=${this.label} ?ampm=${this.ampm} ?seconds=${this.seconds}
        ?disabled=${this.disabled} ?error=${this.error} helper-text=${this.helperText} readonly
        @focus=${() => { if (!this.disabled) { this._pending = this.value; this._view = 'hours'; this._open = true; } }}
        @change=${(e: CustomEvent) => { this.value = e.detail.value; this.dispatchEvent(new CustomEvent('change', { detail: e.detail, bubbles: true, composed: true })); }}
      ></ui-time-field>
      <ui-dialog .open=${this._open} disable-backdrop-close @close=${() => this._open = false} style="--ui-dialog-width:320px">
        <ui-dialog-title>Select Time</ui-dialog-title>
        <ui-dialog-content style="padding:12px;display:flex;justify-content:center;">
          <ui-time-clock .value=${this._pending || this.value || buildTime(12, 0)} ?ampm=${this.ampm} ?seconds=${this.seconds} .view=${this._view}
            @change=${(e: CustomEvent) => { this._pending = e.detail.value; }}
            @view-change=${(e: CustomEvent) => { this._view = e.detail.view; }}
          ></ui-time-clock>
        </ui-dialog-content>
        <ui-dialog-actions>
          <button class="btn btn-cancel" @click=${() => { this._pending = this.value; this._open = false; }}>Cancel</button>
          <button class="btn btn-ok" @click=${() => { const v = this._pending || this.value; this.value = v; this.dispatchEvent(new CustomEvent('change', { detail: { value: v }, bubbles: true, composed: true })); this._open = false; }}>OK</button>
        </ui-dialog-actions>
      </ui-dialog>
    `;
    }
}

// ─── ui-static-time-picker ────────────────────────────────────────────────────
@customElement('ui-static-time-picker')
export class UiStaticTimePicker extends LitElement {
    static styles = css`
    :host { display:inline-block; font-family:var(--ui-font-family,'Inter',sans-serif); }
    .surface {
      border-radius:var(--ui-border-radius-xl,12px);
      box-shadow:0 1px 4px rgba(0,0,0,.08),0 0 0 1px var(--ui-border-color,#e5e7eb);
      overflow:hidden; display:inline-block;
    }
  `;

    @property({ type: String }) value = '';
    @property({ type: Boolean }) ampm = true;
    @property({ type: Boolean }) seconds = false;

    render() {
        return html`
      <div class="surface">
        <ui-multi-section-digital-clock .value=${this.value || buildTime(12, 0)} ?ampm=${this.ampm} ?seconds=${this.seconds}
          @change=${(e: CustomEvent) => {
                this.value = e.detail.value;
                this.dispatchEvent(new CustomEvent('change', { detail: e.detail, bubbles: true, composed: true }));
            }}
        ></ui-multi-section-digital-clock>
      </div>
    `;
    }
}

// ─── ui-time-picker ───────────────────────────────────────────────────────────
@customElement('ui-time-picker')
export class UiTimePicker extends LitElement {
    static styles = css`:host { display:inline-block; }`;

    @property({ type: String }) value = '';
    @property({ type: String }) label = 'Time';
    @property({ type: String }) variant: 'desktop' | 'mobile' | 'static' | 'auto' = 'desktop';
    @property({ type: Boolean }) ampm = true;
    @property({ type: Boolean }) seconds = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) error = false;
    @property({ type: String, attribute: 'helper-text' }) helperText = '';

    private get _v() {
        if (this.variant === 'auto')
            return window.matchMedia('(pointer:coarse)').matches ? 'mobile' : 'desktop';
        return this.variant;
    }

    private _onChange(e: CustomEvent) {
        this.value = e.detail.value;
        this.dispatchEvent(new CustomEvent('change', { detail: e.detail, bubbles: true, composed: true }));
    }

    render() {
        const v = this._v;
        if (v === 'static') return html`<ui-static-time-picker .value=${this.value} ?ampm=${this.ampm} ?seconds=${this.seconds} @change=${this._onChange}></ui-static-time-picker>`;
        if (v === 'mobile') return html`<ui-mobile-time-picker .value=${this.value} .label=${this.label} ?ampm=${this.ampm} ?seconds=${this.seconds} ?disabled=${this.disabled} ?error=${this.error} helper-text=${this.helperText} @change=${this._onChange}></ui-mobile-time-picker>`;
        return html`<ui-desktop-time-picker .value=${this.value} .label=${this.label} ?ampm=${this.ampm} ?seconds=${this.seconds} ?disabled=${this.disabled} ?error=${this.error} helper-text=${this.helperText} @change=${this._onChange}></ui-desktop-time-picker>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-time-field': UiTimeField;
        'ui-digital-clock': UiDigitalClock;
        'ui-multi-section-digital-clock': UiMultiSectionDigitalClock;
        'ui-time-clock': UiTimeClock;
        'ui-desktop-time-picker': UiDesktopTimePicker;
        'ui-mobile-time-picker': UiMobileTimePicker;
        'ui-static-time-picker': UiStaticTimePicker;
        'ui-time-picker': UiTimePicker;
    }
}