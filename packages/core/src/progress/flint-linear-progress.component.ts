import { unsafeCSS, html, nothing, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import uiLinearProgressStyles from './flint-linear-progress.css?inline';

/**
 * flint-linear-progress: a horizontal progress bar.
 */
export class FlintLinearProgress extends FlintElement {
    static styles = unsafeCSS(uiLinearProgressStyles);

    /**
     * Progress mode: determinate shows a specific value, indeterminate shows an animation.
     * @default 'indeterminate'
     */
    @property({ type: String, reflect: true }) mode: 'determinate' | 'indeterminate' = 'indeterminate';
    /**
     * @deprecated Use `mode` instead. Will be removed in a future release.
     */
    @property({ type: String }) variant: 'determinate' | 'indeterminate' = 'indeterminate';

    private _variantWarned = false;

    /** Current progress value (0-100). */
    @property({ type: Number, reflect: true }) value = 0;
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

    private static readonly _colorMap: Record<string, string> = {
        primary: 'var(--flint-primary-color, #2563eb)',
        success: 'var(--flint-success-color, #15803d)',
        error: 'var(--flint-error-color, #dc2626)',
        warning: 'var(--flint-warning-color, #92400e)',
    };

    protected override willUpdate(changed: PropertyValues<this>): void {
        const modeExplicitlySet = changed.has('mode' as keyof this) && this.mode !== 'indeterminate';
        if (changed.has('variant' as keyof this) && this.variant !== 'indeterminate' && !modeExplicitlySet) {
            this.mode = this.variant;
            if (!this._variantWarned) {
                this._variantWarned = true;
                console.warn(
                    '<flint-linear-progress>: The "variant" property is deprecated. Use "mode" instead.',
                );
            }
        }
    }

    private get _safeValue(): number {
        return Math.min(100, Math.max(0, this.value));
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
        aria-valuemax="100"
        aria-valuenow="${isDeterminate ? this._safeValue : nothing}"
        aria-label="${this.label || 'Progress'}"
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
