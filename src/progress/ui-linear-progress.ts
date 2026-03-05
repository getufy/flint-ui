import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * ui-linear-progress: a horizontal progress bar.
 */
@customElement('ui-linear-progress')
export class UiLinearProgress extends LitElement {
    static styles = css`
    :host {
      display: block;
      width: 100%;
      --ui-linear-progress-height: 4px;
      --ui-linear-progress-color: var(--ui-primary-color, #3b82f6);
      --ui-linear-progress-bg: rgba(59, 130, 246, 0.15);
    }

    .root {
      position: relative;
      overflow: hidden;
      height: var(--ui-linear-progress-height);
      background-color: var(--ui-linear-progress-bg);
      border-radius: calc(var(--ui-linear-progress-height) / 2);
    }

    .bar {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      transition: transform 0.4s linear;
      transform-origin: left;
      background-color: var(--ui-linear-progress-color);
      border-radius: inherit;
    }

    .indeterminate .bar1 {
      width: auto;
      animation: indeterminate1 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    }

    .indeterminate .bar2 {
      width: auto;
      animation: indeterminate2 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
      animation-delay: 1.15s;
    }

    @keyframes indeterminate1 {
      0% {
        left: -35%;
        right: 100%;
      }
      60% {
        left: 100%;
        right: -90%;
      }
      100% {
        left: 100%;
        right: -90%;
      }
    }

    @keyframes indeterminate2 {
      0% {
        left: -200%;
        right: 100%;
      }
      60% {
        left: 107%;
        right: -8%;
      }
      100% {
        left: 107%;
        right: -8%;
      }
    }
  `;

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
