import { unsafeCSS, html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import uiTooltipStyles from './flint-tooltip.css?inline';

type Placement = 'top' | 'bottom' | 'left' | 'right';

const OPPOSITE: Record<Placement, Placement> = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
};

let instanceCounter = 0;

/**
 * flint-tooltip
 * A component that displays a text label when users hover over or focus on an element.
 */
export class FlintTooltip extends FlintElement {
    static override styles = unsafeCSS(uiTooltipStyles);

    /** Text content displayed inside the tooltip. */
    @property({ type: String }) label = '';
    /** Preferred placement of the tooltip relative to the trigger element. */
    @property({ type: String }) placement: Placement = 'top';
    /** Show a small arrow pointing toward the trigger element. */
    @property({ type: Boolean }) arrow = false;
    /** Disables the tooltip so it never appears. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    /** Delay in ms before showing the tooltip. */
    @property({ type: Number, attribute: 'open-delay' }) openDelay = 0;

    /** Delay in ms before hiding the tooltip. */
    @property({ type: Number, attribute: 'close-delay' }) closeDelay = 0;

    @state() private _visible = false;
    @state() private _activePlacement: Placement = this.placement;

    private _tooltipId = `flint-tooltip-${instanceCounter++}`;
    private _openTimer: ReturnType<typeof setTimeout> | null = null;
    private _closeTimer: ReturnType<typeof setTimeout> | null = null;

    override disconnectedCallback(): void {
        super.disconnectedCallback();
        this._clearTimers();
    }

    private _clearTimers(): void {
        if (this._openTimer !== null) {
            clearTimeout(this._openTimer);
            this._openTimer = null;
        }
        if (this._closeTimer !== null) {
            clearTimeout(this._closeTimer);
            this._closeTimer = null;
        }
    }

    private _show(): void {
        if (this.disabled || !this.label) return;
        if (this._closeTimer !== null) {
            clearTimeout(this._closeTimer);
            this._closeTimer = null;
        }
        if (this.openDelay > 0) {
            if (this._openTimer !== null) return;
            this._openTimer = setTimeout(() => {
                this._openTimer = null;
                this._applyAutoFlip();
                this._visible = true;
            }, this.openDelay);
        } else {
            this._applyAutoFlip();
            this._visible = true;
        }
    }

    private _hide(): void {
        if (this._openTimer !== null) {
            clearTimeout(this._openTimer);
            this._openTimer = null;
        }
        if (this.closeDelay > 0) {
            if (this._closeTimer !== null) return;
            this._closeTimer = setTimeout(() => {
                this._closeTimer = null;
                this._visible = false;
            }, this.closeDelay);
        } else {
            this._visible = false;
        }
    }

    private _handleKeydown(e: KeyboardEvent): void {
        if (e.key === 'Escape' && this._visible) {
            this._clearTimers();
            this._visible = false;
        }
    }

    /** Check if the tooltip fits within the viewport, flip if not. */
    private _applyAutoFlip(): void {
        const rect = this.getBoundingClientRect();
        const popup = this.shadowRoot?.querySelector('.tooltip-popup');
        if (!popup) {
            this._activePlacement = this.placement;
            return;
        }
        const popupRect = popup.getBoundingClientRect();
        const pw = popupRect.width || 100;
        const ph = popupRect.height || 30;
        const margin = 8;

        let fits = true;
        switch (this.placement) {
            case 'top':
                fits = rect.top - ph - margin >= 0;
                break;
            case 'bottom':
                fits = rect.bottom + ph + margin <= window.innerHeight;
                break;
            case 'left':
                fits = rect.left - pw - margin >= 0;
                break;
            case 'right':
                fits = rect.right + pw + margin <= window.innerWidth;
                break;
        }
        this._activePlacement = fits ? this.placement : OPPOSITE[this.placement];
    }

    override render() {
        const placement = this._visible ? this._activePlacement : this.placement;

        return html`
      <div
        class="tooltip-container"
        @mouseenter=${this._show}
        @mouseleave=${this._hide}
        @focusin=${this._show}
        @focusout=${this._hide}
        @keydown=${this._handleKeydown}
      >
        <span class="trigger-wrapper" aria-describedby=${this._tooltipId}>
          <slot></slot>
        </span>
        <div
          id=${this._tooltipId}
          role="tooltip"
          aria-hidden=${this._visible ? 'false' : 'true'}
          class=${classMap({
            'tooltip-popup': true,
            [placement]: true,
            'visible': this._visible,
        })}
        >
          ${this.label}
          ${this.arrow ? html`<div class="arrow"></div>` : nothing}
        </div>
      </div>
    `;
    }
}