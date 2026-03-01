import { LitElement, html, css } from 'lit';
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

    @property({ type: String }) variant: 'determinate' | 'indeterminate' = 'indeterminate';
    @property({ type: Number }) value = 0; // percentage for determinate 0-100
    @property({ type: Number }) size = 40;
    @property({ type: Number }) thickness = 3.6;

    render() {
        const isDeterminate = this.variant === 'determinate';

        // For determinate, calculate stroke-dasharray based on value
        // Circumference of a circle with radius 20 is 2 * PI * 20 = 125.66
        const radius = 20;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (this.value / 100) * circumference;

        return html`
      <div 
        class="circular-root ${classMap({ determinate: isDeterminate, indeterminate: !isDeterminate })}"
        style="--ui-circular-progress-size: ${this.size}px; --ui-circular-progress-thickness: ${this.thickness}"
        role="progressbar"
        aria-valuenow="${isDeterminate ? this.value : undefined}"
        aria-valuemin="0"
        aria-valuemax="100"
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
