import { LitElement, unsafeCSS, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import uiLinearProgressStyles from './flint-linear-progress.css?inline';

/**
 * flint-linear-progress: a horizontal progress bar.
 */
@customElement('flint-linear-progress')
export class FlintLinearProgress extends LitElement {
    static styles = unsafeCSS(uiLinearProgressStyles);

    /** Progress variant: determinate shows a specific value, indeterminate shows an animation. */
    @property({ type: String, reflect: true }) variant: 'determinate' | 'indeterminate' = 'indeterminate';
    /** Current progress value (0-100). */
    @property({ type: Number, reflect: true }) value = 0; // 0-100
    /** Height of the progress bar in pixels. */
    @property({ type: Number }) height = 4;
    /** Color theme of the progress bar. */
    @property({ type: String, reflect: true }) color: 'primary' | 'success' | 'error' | 'warning' = 'primary';
    /** Accessible label for the progress bar. */
    @property({ type: String }) label = '';

    private static readonly _colorMap: Record<string, string> = {
        primary: 'var(--flint-primary-color, #3b82f6)',
        success: 'var(--flint-success-color, #22c55e)',
        error: 'var(--flint-error-color, #ef4444)',
        warning: 'var(--flint-warning-color, #f59e0b)',
    };

    private get _safeValue(): number {
        return Math.min(100, Math.max(0, this.value));
    }

    render() {
        const isDeterminate = this.variant === 'determinate';
        const colorVal = FlintLinearProgress._colorMap[this.color] ?? FlintLinearProgress._colorMap['primary'];
        const inlineStyle = [
            `--flint-linear-progress-height: ${this.height}px`,
            `--flint-linear-progress-color: ${colorVal}`,
        ].join('; ');

        return html`
      <div
        class="root ${classMap({ determinate: isDeterminate, indeterminate: !isDeterminate })}"
        role="progressbar"
        aria-valuenow="${isDeterminate ? this._safeValue : nothing}"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="${this.label || nothing}"
        style="${inlineStyle}"
      >
        ${isDeterminate ? html`
          <div class="bar" style="transform: scaleX(${this._safeValue / 100})"></div>
        ` : html`
          <div class="bar bar1"></div>
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
