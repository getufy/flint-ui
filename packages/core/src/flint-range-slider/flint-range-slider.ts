import { LitElement, unsafeCSS, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { live } from 'lit/directives/live.js';
import uiRangeSliderStyles from './flint-range-slider.css?inline';

/**
 * A range slider that lets users select a start and end value within a range.
 *
 * @prop {[number, number]} value          - Current [start, end] values.
 * @prop {number}           min            - Minimum bound (default: 0).
 * @prop {number}           max            - Maximum bound (default: 100).
 * @prop {number}           step           - Step increment (default: 1).
 * @prop {'sm'|'md'|'lg'}  size           - Visual size of track and thumbs (default: 'md').
 * @prop {boolean}          disabled       - Disables both thumbs.
 * @prop {string}           label          - Label text shown above the track.
 * @prop {boolean}          showValue      - Show the current [start, end] values.
 *
 * @fires flint-range-slider-change - When either thumb moves. detail: { value: [number, number] }
 *
 * @cssprop {length} --flint-range-slider-track-height   - Track thickness (default: 6px).
 * @cssprop {length} --flint-range-slider-thumb-size     - Thumb diameter (default: 20px).
 * @cssprop {color}  --flint-range-slider-track-color    - Unfilled track color.
 * @cssprop {color}  --flint-range-slider-fill-color     - Filled range color.
 * @cssprop {color}  --flint-range-slider-thumb-color    - Thumb background color.
 * @cssprop {color}  --flint-range-slider-thumb-border   - Thumb border color.
 */
@customElement('flint-range-slider')
export class FlintRangeSlider extends LitElement {
    static styles = unsafeCSS(uiRangeSliderStyles);

    // ─── Props ────────────────────────────────────────────────────────────────

    @property({ attribute: false })
    value: [number, number] = [25, 75];

    @property({ type: Number }) min = 0;
    @property({ type: Number }) max = 100;
    @property({ type: Number }) step = 1;
    @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: String }) label = '';
    @property({ type: Boolean, attribute: 'show-value' }) showValue = false;

    // ─── Internal state ───────────────────────────────────────────────────────

    @state() private _activeThumb: 'start' | 'end' = 'end';

    // ─── Lifecycle ────────────────────────────────────────────────────────────

    updated(changed: Map<string, unknown>) {
        // Guard against invalid step values that would break _snap/_pct.
        if (this.step <= 0) {
            this.step = 1;
        }

        // When min or max change, clamp the current value into the new bounds
        // so the thumbs don't end up outside the track.
        if (changed.has('min') || changed.has('max')) {
            const clampedStart = Math.max(this.min, Math.min(this.max, this._start));
            const clampedEnd = Math.max(this.min, Math.min(this.max, this._end));
            if (clampedStart !== this._start || clampedEnd !== this._end) {
                // Silent update — no change event, this is a bounds correction
                this.value = [clampedStart, clampedEnd];
            }
        }
    }

    // ─── Helpers ──────────────────────────────────────────────────────────────

    private get _start(): number { return this.value[0]; }
    private get _end(): number { return this.value[1]; }

    private _pct(v: number): number {
        return ((v - this.min) / (this.max - this.min)) * 100;
    }

    private _snap(v: number): number {
        const snapped = Math.round((v - this.min) / this.step) * this.step + this.min;
        return Math.max(this.min, Math.min(this.max, snapped));
    }

    // ─── Event handlers ───────────────────────────────────────────────────────

    private _handleStartInput(e: Event) {
        const input = e.target as HTMLInputElement;
        const raw = this._snap(Number(input.value));
        if (raw > this._end) {
            // Crossed over — swap; the dragged thumb becomes the new end
            this._activeThumb = 'end';
            this._emit([this._end, raw]);
        } else {
            this._emit([raw, this._end]);
        }
    }

    private _handleEndInput(e: Event) {
        const input = e.target as HTMLInputElement;
        const raw = this._snap(Number(input.value));
        if (raw < this._start) {
            // Crossed over — swap; the dragged thumb becomes the new start
            this._activeThumb = 'start';
            this._emit([raw, this._start]);
        } else {
            this._emit([this._start, raw]);
        }
    }

    private _emit(next: [number, number]) {
        this.value = [...next] as [number, number];
        this.dispatchEvent(new CustomEvent('flint-range-slider-change', {
            detail: { value: this.value },
            bubbles: true,
            composed: true,
        }));
    }

    // ─── Render ───────────────────────────────────────────────────────────────

    render() {
        const startPct = this._pct(this._start);
        const endPct = this._pct(this._end);

        const fillStyle = {
            left: `${startPct}%`,
            width: `${endPct - startPct}%`,
        };

        // Start thumb rises above end when last touched, or when at max
        // (at max the end thumb would permanently block it otherwise)
        const startOnTop = this._activeThumb === 'start' || this._start === this.max;

        return html`
      <div class="slider-wrapper">

        <div class="label-row">
          ${this.label ? html`
            <label class=${classMap({ 'disabled-label': this.disabled })}>
              ${this.label}
            </label>
          ` : nothing}
          ${this.showValue ? html`
            <span class="value-display">${this._start} – ${this._end}</span>
          ` : nothing}
        </div>

        <div class="track-container">
          <div class="track-base"></div>
          <div class="track-fill" style=${styleMap(fillStyle)}></div>

          <!-- Start thumb -->
          <input
            type="range"
            class=${classMap({ 'thumb-start': true, 'on-top': startOnTop })}
            .min=${this.min.toString()}
            .max=${this.max.toString()}
            .step=${this.step.toString()}
            .value=${live(this._start.toString())}
            ?disabled=${this.disabled}
            aria-label=${this.label ? `${this.label} start` : 'Range start'}
            aria-valuemin=${this.min}
            aria-valuemax=${this.max}
            aria-valuenow=${this._start}
            @input=${this._handleStartInput}
            @pointerdown=${() => { this._activeThumb = 'start'; }}
          >

          <!-- End thumb -->
          <input
            type="range"
            class="thumb-end"
            .min=${this.min.toString()}
            .max=${this.max.toString()}
            .step=${this.step.toString()}
            .value=${live(this._end.toString())}
            ?disabled=${this.disabled}
            aria-label=${this.label ? `${this.label} end` : 'Range end'}
            aria-valuemin=${this.min}
            aria-valuemax=${this.max}
            aria-valuenow=${this._end}
            @input=${this._handleEndInput}
            @pointerdown=${() => { this._activeThumb = 'end'; }}
          >
        </div>

      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-range-slider': FlintRangeSlider;
    }
}
