import { LitElement, unsafeCSS, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import uiCircularProgressStyles from './ui-circular-progress.css?inline';

/**
 * ui-circular-progress: a circular progress indicator (spinner).
 */
@customElement('ui-circular-progress')
export class UiCircularProgress extends LitElement {
    static styles = unsafeCSS(uiCircularProgressStyles);

    @property({ type: String, reflect: true }) variant: 'determinate' | 'indeterminate' = 'indeterminate';
    @property({ type: Number, reflect: true }) value = 0; // percentage for determinate 0-100
    @property({ type: Number }) size = 40;
    @property({ type: Number }) thickness = 3.6;
    @property({ type: String, reflect: true }) color: 'primary' | 'success' | 'error' | 'warning' = 'primary';
    @property({ type: String }) label = '';

    private static readonly _colorMap: Record<string, string> = {
        primary: '#3b82f6',
        success: '#22c55e',
        error: '#ef4444',
        warning: '#f59e0b',
    };

    private get _safeValue(): number {
        return Math.min(100, Math.max(0, this.value));
    }

    render() {
        const isDeterminate = this.variant === 'determinate';

        // Radius shrinks by half the stroke-width so the stroke stays within the viewBox
        const radius = 20 - this.thickness / 2;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (this._safeValue / 100) * circumference;
        const colorVal = UiCircularProgress._colorMap[this.color] ?? UiCircularProgress._colorMap['primary'];

        return html`
      <div
        class="circular-root ${classMap({ determinate: isDeterminate, indeterminate: !isDeterminate })}"
        style="--ui-circular-progress-size: ${this.size}px; --ui-circular-progress-thickness: ${this.thickness}; --ui-circular-progress-color: ${colorVal}"
        role="progressbar"
        aria-valuenow="${isDeterminate ? this._safeValue : nothing}"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="${this.label || nothing}"
      >
        <svg viewBox="22 22 44 44">
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
        'ui-circular-progress': UiCircularProgress;
    }
}
