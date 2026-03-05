import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * ui-circular-progress: a circular progress indicator (spinner).
 */
@customElement('ui-circular-progress')
export class UiCircularProgress extends LitElement {
    static styles = css`
    :host {
      display: inline-block;
      --ui-circular-progress-size: 40px;
      --ui-circular-progress-color: var(--ui-primary-color, #3b82f6);
      --ui-circular-progress-thickness: 3.6;
    }

    .circular-root {
      width: var(--ui-circular-progress-size);
      height: var(--ui-circular-progress-size);
      display: inline-block;
      animation: rotate 1.4s linear infinite;
    }

    .circular-root.determinate {
      animation: none;
      transform: rotate(-90deg);
    }

    svg {
      display: block;
    }

    circle {
      stroke: var(--ui-circular-progress-color);
      stroke-linecap: round;
      transition: stroke-dashoffset 0.3s ease;
    }

    .indeterminate circle {
      animation: dash 1.4s ease-in-out infinite;
      stroke-dasharray: 80, 200;
      stroke-dashoffset: 0;
    }

    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes dash {
      0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35px;
      }
      100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124px;
      }
    }
  `;

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
