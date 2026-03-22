import { unsafeCSS, html, nothing, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import { LocalizeController } from '../utilities/localize.js';
import uiLinearProgressStyles from './flint-linear-progress.css?inline';

/**
 * flint-linear-progress: a horizontal progress bar.
 *
 * @example
 * ```html
 * <!-- Animated bar (default) -->
 * <flint-linear-progress></flint-linear-progress>
 *
 * <!-- Static progress at 60% -->
 * <flint-linear-progress value="60"></flint-linear-progress>
 *
 * <!-- Explicitly animated (equivalent to default) -->
 * <flint-linear-progress indeterminate></flint-linear-progress>
 * ```
 * @csspart base - The component's base wrapper element.
 * @csspart indicator - The indicator element.
 */
export class FlintLinearProgress extends FlintElement {
    static styles = unsafeCSS(uiLinearProgressStyles);

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
    /** Current progress value (0 to max). */
    @property({ type: Number, reflect: true }) value = 0;
    /** Maximum value. The progress is calculated as value / max. @default 100 */
    @property({ type: Number, reflect: true }) max = 100;
    /**
     * Height of the progress bar in pixels.
     * @default 4
     */
    @property({ type: Number }) height = 4;
    /**
     * Color theme of the progress bar.
     * @default 'primary'
     */
    @property({ type: String, reflect: true }) color: 'primary' | 'success' | 'error' | 'warning' = 'primary';
    /** Accessible label for the progress bar. */
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
        const colorVal = FlintLinearProgress._colorMap[this.color] ?? FlintLinearProgress._colorMap['primary'];
        const inlineStyle = [
            `--flint-linear-progress-height: ${this.height}px`,
            `--flint-linear-progress-color: ${colorVal}`,
        ].join('; ');

        return html`
      <div
        class="root ${classMap({ determinate: isDeterminate, indeterminate: !isDeterminate })}"
        part="base"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="${this.max}"
        aria-valuenow="${isDeterminate ? this._clampedValue : nothing}"
        aria-label="${this.label || this._localize.term('progress')}"
        style="${inlineStyle}"
      >
        ${isDeterminate ? html`
          <div class="bar" part="indicator" style="transform: scaleX(${this._safeValue / 100})"></div>
        ` : html`
          <div class="bar bar1" part="indicator"></div>
          <div class="bar bar2"></div>
        `}
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-linear-progress': FlintLinearProgress;
    }
}
