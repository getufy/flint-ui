import { LitElement, unsafeCSS, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
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
@customElement('flint-tooltip')
export class FlintTooltip extends LitElement {
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

    /**
     * When true, the tooltip popup uses `position: fixed` instead of `position: absolute`
     * so it can escape containers with `overflow: hidden` or `overflow: clip`.
     */
    @property({ type: Boolean }) hoist = false;

    @state() private _visible = false;
    @state() private _activePlacement: Placement = this.placement;

    private _tooltipId = `flint-tooltip-${instanceCounter++}`;
    private _openTimer: ReturnType<typeof setTimeout> | null = null;
    private _closeTimer: ReturnType<typeof setTimeout> | null = null;

    override disconnectedCallback(): void {
        super.disconnectedCallback();
        this._clearTimers();
        this._cleanupHoist();
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
                if (this.hoist) this._startHoist();
            }, this.openDelay);
        } else {
            this._applyAutoFlip();
            this._visible = true;
            if (this.hoist) this._startHoist();
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
                this._cleanupHoist();
            }, this.closeDelay);
        } else {
            this._visible = false;
            this._cleanupHoist();
        }
    }

    private _handleKeydown(e: KeyboardEvent): void {
        if (e.key === 'Escape' && this._visible) {
            this._clearTimers();
            this._visible = false;
            this._cleanupHoist();
        }
    }

    /* ── Hoist (fixed positioning) ─────────────────────────────────── */

    private _scrollHandler = () => this._handleReposition();
    private _resizeHandler = () => this._handleReposition();

    /** Recalculates fixed position based on trigger's bounding rect. */
    private _handleReposition(): void {
        const popup = this.shadowRoot?.querySelector('.tooltip-popup') as HTMLElement | null;
        if (!popup) return;

        const triggerWrapper = this.shadowRoot?.querySelector('.trigger-wrapper') as HTMLElement | null;
        if (!triggerWrapper) return;

        const rect = triggerWrapper.getBoundingClientRect();
        const placement = this._activePlacement;

        // Reset all positioning
        popup.style.removeProperty('top');
        popup.style.removeProperty('bottom');
        popup.style.removeProperty('left');
        popup.style.removeProperty('right');

        if (placement === 'top') {
            popup.style.setProperty('top', `${rect.top - 8}px`);
            popup.style.setProperty('left', `${rect.left + rect.width / 2}px`);
            popup.style.setProperty('transform', 'translateX(-50%) translateY(-100%)');
        } else if (placement === 'bottom') {
            popup.style.setProperty('top', `${rect.bottom + 8}px`);
            popup.style.setProperty('left', `${rect.left + rect.width / 2}px`);
            popup.style.setProperty('transform', 'translateX(-50%)');
        } else if (placement === 'left') {
            popup.style.setProperty('top', `${rect.top + rect.height / 2}px`);
            popup.style.setProperty('left', `${rect.left - 8}px`);
            popup.style.setProperty('transform', 'translateX(-100%) translateY(-50%)');
        } else if (placement === 'right') {
            popup.style.setProperty('top', `${rect.top + rect.height / 2}px`);
            popup.style.setProperty('left', `${rect.right + 8}px`);
            popup.style.setProperty('transform', 'translateY(-50%)');
        }
    }

    /** Starts listening for scroll/resize to keep the hoisted popup in position. */
    private _startHoist(): void {
        void this.updateComplete.then(() => {
            this._handleReposition();
            window.addEventListener('scroll', this._scrollHandler, true);
            window.addEventListener('resize', this._resizeHandler);
        });
    }

    /** Removes scroll/resize listeners and clears inline styles from the popup. */
    private _cleanupHoist(): void {
        window.removeEventListener('scroll', this._scrollHandler, true);
        window.removeEventListener('resize', this._resizeHandler);

        const popup = this.shadowRoot?.querySelector('.tooltip-popup') as HTMLElement | null;
        if (popup) {
            popup.style.removeProperty('top');
            popup.style.removeProperty('bottom');
            popup.style.removeProperty('left');
            popup.style.removeProperty('right');
            popup.style.removeProperty('transform');
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
            'hoisted': this.hoist,
        })}
        >
          ${this.label}
          ${this.arrow ? html`<div class="arrow"></div>` : nothing}
        </div>
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-tooltip': FlintTooltip;
    }
}
