import { unsafeCSS, html, nothing, LitElement, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { live } from 'lit/directives/live.js';
import { FlintElement } from '../flint-element.js';
import type { Size } from '../types.js';
import uiRangeSliderStyles from './flint-range-slider.css?inline';

export interface FlintRangeSliderChangeDetail { value: [number, number]; }

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
 * @csspart base - The component's base wrapper element.
 * @csspart fill - The fill element.
 * @csspart track - The track element.
 */
export class FlintRangeSlider extends FlintElement {
    static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
    static styles = unsafeCSS(uiRangeSliderStyles);

    // ─── Props ────────────────────────────────────────────────────────────────

    @property({ attribute: false })
    value: [number, number] = [25, 75];

    /** Minimum allowed value. */
    @property({ type: Number }) min = 0;
    /** Maximum allowed value. */
    @property({ type: Number }) max = 100;
    /** Step increment between values. */
    @property({ type: Number }) step = 1;
    /** Visual size of the track and thumbs. */
    @property({ type: String, reflect: true }) size: Size = 'md';
    /** Whether the slider is disabled. */
    @property({ type: Boolean, reflect: true }) disabled = false;
    /** Label text displayed above the slider. */
    @property({ type: String }) label = '';
    /** Whether to display the current start and end values. */
    @property({ type: Boolean, attribute: 'show-value' }) showValue = false;

    // ─── Internal state ───────────────────────────────────────────────────────

    /** Which physical thumb (0 or 1) was last interacted with — controls z-index. */
    @state() private _activeIndex: 0 | 1 = 1;

    /**
     * Physical thumb positions. These can temporarily cross during a drag
     * (i.e. _thumbValues[0] > _thumbValues[1]) and are normalized on pointer-up.
     */
    private _thumbValues: [number, number] = [25, 75];

    /** True while the user is pointer-dragging a thumb. */
    private _dragging = false;

    /** Removes the current pointerup/pointercancel listeners, if any. */
    private _dragCleanup: (() => void) | null = null;

    // ─── Lifecycle ────────────────────────────────────────────────────────────

    willUpdate(changed: PropertyValues) {
        if (this.step <= 0) this.step = 1;

        // Sync physical thumb positions from the public value when not dragging.
        // During a drag the physical positions intentionally diverge from the
        // sorted public value (the inputs may be crossed), so we skip the sync.
        if (!this._dragging && (changed.has('value') || changed.has('min') || changed.has('max'))) {
            this._thumbValues = [
                Math.max(this.min, Math.min(this.max, this.value[0])),
                Math.max(this.min, Math.min(this.max, this.value[1])),
            ];

            // If bounds clamped the value, update it silently (no change event).
            if (changed.has('min') || changed.has('max')) {
                const [c0, c1] = this._thumbValues;
                if (c0 !== this.value[0] || c1 !== this.value[1]) {
                    this.value = [c0, c1];
                }
            }
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._dragCleanup?.();
    }

    // ─── Helpers ──────────────────────────────────────────────────────────────

    private _pct(v: number): number {
        const range = this.max - this.min;
        return range === 0 ? 0 : ((v - this.min) / range) * 100;
    }

    private _snap(v: number): number {
        const snapped = Math.round((v - this.min) / this.step) * this.step + this.min;
        return Math.max(this.min, Math.min(this.max, snapped));
    }

    // ─── Event handlers ───────────────────────────────────────────────────────

    private _handleInput(index: 0 | 1, e: Event) {
        const raw = this._snap(Number((e.target as HTMLInputElement).value));
        this._thumbValues = index === 0
            ? [raw, this._thumbValues[1]]
            : [this._thumbValues[0], raw];
        this._emitChange();
    }

    private _handlePointerDown(index: 0 | 1) {
        this._activeIndex = index;
        this._dragging = true;

        // Clean up any previous drag listeners.
        this._dragCleanup?.();

        const onDragEnd = () => {
            this._dragging = false;
            this._dragCleanup = null;
            window.removeEventListener('pointerup', onDragEnd);
            window.removeEventListener('pointercancel', onDragEnd);

            // Normalize: ensure index 0 ≤ index 1 so z-index logic stays correct.
            if (this._thumbValues[0] > this._thumbValues[1]) {
                this._thumbValues = [this._thumbValues[1], this._thumbValues[0]];
                this._activeIndex = this._activeIndex === 0 ? 1 : 0;
                this.requestUpdate();
            }
        };

        window.addEventListener('pointerup', onDragEnd);
        window.addEventListener('pointercancel', onDragEnd);

        this._dragCleanup = () => {
            window.removeEventListener('pointerup', onDragEnd);
            window.removeEventListener('pointercancel', onDragEnd);
            this._dragging = false;
            this._dragCleanup = null;
        };
    }

    private _emitChange() {
        const sorted: [number, number] = [
            Math.min(this._thumbValues[0], this._thumbValues[1]),
            Math.max(this._thumbValues[0], this._thumbValues[1]),
        ];
        this.value = sorted;
        this.dispatchEvent(new CustomEvent<FlintRangeSliderChangeDetail>('flint-range-slider-change', {
            detail: { value: sorted },
            bubbles: true,
            composed: true,
        }));
    }

    // ─── Render ───────────────────────────────────────────────────────────────

    render() {
        const lo = Math.min(this._thumbValues[0], this._thumbValues[1]);
        const hi = Math.max(this._thumbValues[0], this._thumbValues[1]);

        const fillStyle = {
            left: `${this._pct(lo)}%`,
            width: `${this._pct(hi) - this._pct(lo)}%`,
        };

        // Thumb 0 rises above thumb 1 when last touched, or when it sits at max
        // (otherwise the end thumb would permanently block it at the right edge).
        const thumb0OnTop = this._activeIndex === 0 || this._thumbValues[0] === this.max;

        return html`
      <div class="slider-wrapper" part="base">

        <div class="label-row">
          ${this.label ? html`
            <label class=${classMap({ 'disabled-label': this.disabled })}>
              ${this.label}
            </label>
          ` : nothing}
          ${this.showValue ? html`
            <span class="value-display">${lo} – ${hi}</span>
          ` : nothing}
        </div>

        <div class="track-container" part="track">
          <div class="track-base"></div>
          <div class="track-fill" part="fill" style=${styleMap(fillStyle)}></div>

          <!-- Thumb 0 (start) -->
          <input
            type="range"
            class=${classMap({ 'thumb-start': true, 'on-top': thumb0OnTop })}
            .min=${this.min.toString()}
            .max=${this.max.toString()}
            .step=${this.step.toString()}
            .value=${live(this._thumbValues[0].toString())}
            ?disabled=${this.disabled}
            aria-label=${this.label ? `${this.label} start` : 'Range start'}
            aria-valuemin=${this.min}
            aria-valuemax=${this.max}
            aria-valuenow=${this._thumbValues[0]}
            @input=${(e: Event) => this._handleInput(0, e)}
            @pointerdown=${() => { this._handlePointerDown(0); }}
          >

          <!-- Thumb 1 (end) -->
          <input
            type="range"
            class="thumb-end"
            .min=${this.min.toString()}
            .max=${this.max.toString()}
            .step=${this.step.toString()}
            .value=${live(this._thumbValues[1].toString())}
            ?disabled=${this.disabled}
            aria-label=${this.label ? `${this.label} end` : 'Range end'}
            aria-valuemin=${this.min}
            aria-valuemax=${this.max}
            aria-valuenow=${this._thumbValues[1]}
            @input=${(e: Event) => this._handleInput(1, e)}
            @pointerdown=${() => { this._handlePointerDown(1); }}
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
