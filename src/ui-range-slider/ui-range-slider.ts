import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { live } from 'lit/directives/live.js';

/**
 * A range slider that lets users select a start and end value within a range.
 *
 * @prop {[number, number]} value          - Current [start, end] values.
 * @prop {number}           min            - Minimum bound (default: 0).
 * @prop {number}           max            - Maximum bound (default: 100).
 * @prop {number}           step           - Step increment (default: 1).
 * @prop {boolean}          disabled       - Disables both thumbs.
 * @prop {string}           label          - Label text shown above the track.
 * @prop {boolean}          showValue      - Show the current [start, end] values.
 *
 * @fires change - When either thumb moves. detail: { value: [number, number] }
 */
@customElement('ui-range-slider')
export class UiRangeSlider extends LitElement {
    static styles = css`
    :host {
      display: block;
      padding: 12px 0;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      color: var(--ui-text-color, #111827);
    }

    .slider-wrapper {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .label-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
    }

    .value-display {
      font-weight: 600;
      color: var(--ui-primary-color, #3b82f6);
    }

    .disabled-label {
      color: var(--ui-text-color-muted);
    }

    .track-container {
      position: relative;
      height: 28px;
      display: flex;
      align-items: center;
      margin: 4px 0;
    }

    .track-base {
      position: absolute;
      left: 0;
      right: 0;
      height: 6px;
      background: var(--ui-input-border-color, #d1d5db);
      border-radius: 3px;
      pointer-events: none;
    }

    .track-fill {
      position: absolute;
      height: 6px;
      background: var(--ui-primary-color, #3b82f6);
      border-radius: 3px;
      pointer-events: none;
      transition: left 0.05s, width 0.05s;
    }

    :host([disabled]) .track-fill {
      opacity: 0.5;
    }

    input[type='range'] {
      -webkit-appearance: none;
      appearance: none;
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
      height: 6px;
      background: transparent;
      outline: none;
      cursor: pointer;
      pointer-events: none;
      margin: 0;
    }

    input[type='range']:disabled {
      cursor: not-allowed;
    }

    input[type='range']::-webkit-slider-thumb {
      pointer-events: all;
    }
    input[type='range']::-moz-range-thumb {
      pointer-events: all;
    }

    input[type='range']::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--ui-surface-background, white);
      border: 2px solid var(--ui-primary-color, #3b82f6);
      box-shadow: var(--ui-shadow-sm);
      cursor: pointer;
      transition: transform 0.1s ease, box-shadow 0.1s ease;
    }

    input[type='range']:focus-visible::-webkit-slider-thumb {
      outline: 2px solid var(--ui-primary-color, #3b82f6);
      outline-offset: 4px;
    }

    input[type='range']:not(:disabled):hover::-webkit-slider-thumb {
      transform: scale(1.1);
      box-shadow: var(--ui-shadow-md);
    }

    input[type='range']:active::-webkit-slider-thumb {
      transform: scale(0.95);
    }

    input[type='range']:disabled::-webkit-slider-thumb {
      cursor: not-allowed;
      opacity: 0.5;
      border-color: var(--ui-input-border-color, #d1d5db);
    }

    input[type='range']::-moz-range-thumb {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--ui-surface-background, white);
      border: 2px solid var(--ui-primary-color, #3b82f6);
      box-shadow: var(--ui-shadow-sm);
      cursor: pointer;
    }

    input[type='range']:disabled::-moz-range-thumb {
      opacity: 0.5;
      border-color: var(--ui-input-border-color, #d1d5db);
    }

    input[type='range']::-moz-range-track {
      background: transparent;
    }

    input.thumb-start {
      z-index: 2;
    }

    input.thumb-end {
      z-index: 3;
    }

    input.thumb-start.on-top {
      z-index: 4;
    }
  `;

    // ─── Props ────────────────────────────────────────────────────────────────

    @property({ attribute: false })
    value: [number, number] = [25, 75];

    @property({ type: Number }) min = 0;
    @property({ type: Number }) max = 100;
    @property({ type: Number }) step = 1;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: String }) label = '';
    @property({ type: Boolean, attribute: 'show-value' }) showValue = false;

    // ─── Internal state ───────────────────────────────────────────────────────

    @state() private _activeThumb: 'start' | 'end' = 'end';

    // ─── Lifecycle ────────────────────────────────────────────────────────────

    updated(changed: Map<string, unknown>) {
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
        this.dispatchEvent(new CustomEvent('change', {
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
        'ui-range-slider': UiRangeSlider;
    }
}