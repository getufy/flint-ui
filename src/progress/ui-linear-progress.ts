import { LitElement, unsafeCSS, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import uiLinearProgressStyles from './ui-linear-progress.css?inline';

/**
 * ui-linear-progress: a horizontal progress bar.
 */
@customElement('ui-linear-progress')
export class UiLinearProgress extends LitElement {
    static styles = unsafeCSS(uiLinearProgressStyles);

    @property({ type: String, reflect: true }) variant: 'determinate' | 'indeterminate' = 'indeterminate';
    @property({ type: Number, reflect: true }) value = 0; // 0-100
    @property({ type: Number }) height = 4;
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
        const colorVal = UiLinearProgress._colorMap[this.color] ?? UiLinearProgress._colorMap['primary'];
        const inlineStyle = [
            `--ui-linear-progress-height: ${this.height}px`,
            `--ui-linear-progress-color: ${colorVal}`,
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
        'ui-linear-progress': UiLinearProgress;
    }
}
