import { unsafeCSS, html, nothing, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import { LocalizeController } from '../utilities/localize.js';
import uiCircularProgressStyles from './flint-circular-progress.css?inline';

/**
 * flint-circular-progress: a circular progress indicator (spinner).
 *
 * @example
 * ```html
 * <!-- Animated spinner (default) -->
 * <flint-circular-progress></flint-circular-progress>
 *
 * <!-- Static progress at 75% -->
 * <flint-circular-progress value="75"></flint-circular-progress>
 *
 * <!-- Explicitly animated (equivalent to default) -->
 * <flint-circular-progress indeterminate></flint-circular-progress>
 * ```
 * @csspart base - The component's base wrapper element.
 * @csspart svg - The svg element.
 */
export class FlintCircularProgress extends FlintElement {
    static styles = unsafeCSS(uiCircularProgressStyles);

    private _localize = new LocalizeController(this);

    /**
     * Progress mode: determinate shows a specific value, indeterminate shows a looping animation.
     *
     * Tip: You can also use the `indeterminate` boolean attribute for a simpler API.
     * Setting `value` without `indeterminate` automatically switches to determinate mode.
     * @default 'indeterminate'
     */
    @property({ type: String, reflect: true }) mode: 'determinate' | 'indeterminate' = 'indeterminate';

    /**
     * When true, shows a looping animation instead of a specific progress value.
     * This is a convenient alternative to `mode="indeterminate"`.
     *
     * When omitted or false, the component shows a static progress bar based on `value`.
     */
    @property({ type: Boolean, reflect: true }) indeterminate = false;
    /** Current progress value (0 to max) for determinate mode. */
    @property({ type: Number, reflect: true }) value = 0;
    /** Maximum value. The progress is calculated as value / max. @default 100 */
    @property({ type: Number, reflect: true }) max = 100;
    /**
     * Diameter of the circular indicator in pixels.
     * @default 40
     */
    @property({ type: Number }) size = 40;
    /**
     * Stroke width of the circle in pixels.
     * @default 3.6
     */
    @property({ type: Number }) thickness = 3.6;
    /**
     * Color theme of the progress indicator.
     * @default 'primary'
     */
    @property({ type: String, reflect: true }) color: 'primary' | 'success' | 'error' | 'warning' = 'primary';
    /** Accessible label for the progress indicator. */
    @property({ type: String }) label = '';

    override willUpdate(changed: PropertyValues) {
        // indeterminate boolean → mode sync (skip first render where old value is undefined)
        if (changed.has('indeterminate') && changed.get('indeterminate') !== undefined) {
            this.mode = this.indeterminate ? 'indeterminate' : 'determinate';
        }
        // Auto-switch: setting value > 0 implies determinate when mode is still default
        // and indeterminate was not explicitly set by the user.
        else if (changed.has('value') && this.value > 0 && this.mode === 'indeterminate' && !this.indeterminate) {
            if (!changed.has('mode') || changed.get('mode') === undefined) {
                this.mode = 'determinate';
            }
        }
    }

    private static readonly _colorMap: Record<string, string> = {
        primary: 'var(--flint-primary-color, #2563eb)',
        success: 'var(--flint-success-color, #15803d)',
        error: 'var(--flint-error-color, #dc2626)',
        warning: 'var(--flint-warning-color, #92400e)',
    };

    private get _safeValue(): number {
        const safeMax = Math.max(1, this.max);
        return Math.min(100, Math.max(0, (this.value / safeMax) * 100));
    }

    private get _clampedValue(): number {
        return Math.min(this.max, Math.max(0, this.value));
    }

    render() {
        const isDeterminate = this.mode === 'determinate';

        // Radius shrinks by half the stroke-width so the stroke stays within the viewBox
        const radius = 20 - this.thickness / 2;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (this._safeValue / 100) * circumference;
        const colorVal = FlintCircularProgress._colorMap[this.color] ?? FlintCircularProgress._colorMap['primary'];

        return html`
      <div
        class="circular-root ${classMap({ determinate: isDeterminate, indeterminate: !isDeterminate })}"
        part="base"
        style="--flint-circular-progress-size: ${this.size}px; --flint-circular-progress-thickness: ${this.thickness}; --flint-circular-progress-color: ${colorVal}"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="${this.max}"
        aria-valuenow="${isDeterminate ? this._clampedValue : nothing}"
        aria-label="${this.label || this._localize.term('progress')}"
      >
        <svg viewBox="22 22 44 44" part="svg">
          <circle
            class="circle"
            cx="44"
            cy="44"
            r="${radius}"
            fill="none"
            stroke-width="${this.thickness}"
            style="${isDeterminate ? `stroke-dasharray: ${circumference}; stroke-dashoffset: ${offset}px` : ''}"
          ></circle>
        </svg>
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-circular-progress': FlintCircularProgress;
    }
}
