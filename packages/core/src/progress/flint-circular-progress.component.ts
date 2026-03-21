import { unsafeCSS, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import uiCircularProgressStyles from './flint-circular-progress.css?inline';

/**
 * flint-circular-progress: a circular progress indicator (spinner).
 */
export class FlintCircularProgress extends FlintElement {
    static styles = unsafeCSS(uiCircularProgressStyles);

    /**
     * Progress mode: determinate shows a specific value, indeterminate shows an animation.
     * @default 'indeterminate'
     */
    @property({ type: String, reflect: true }) mode: 'determinate' | 'indeterminate' = 'indeterminate';
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
        aria-label="${this.label || 'Progress'}"
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
