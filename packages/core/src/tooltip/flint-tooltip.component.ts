import { unsafeCSS, html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import { FlintPopup } from '../popup/flint-popup.component.js';
import { getAnimation, animateTo, stopAnimations, resolveKeyframes } from '../utilities/animation-registry.js';
import type { Placement } from '../types.js';
import '../utilities/animation-presets.js';
import uiTooltipStyles from './flint-tooltip.css?inline';

let instanceCounter = 0;

/**
 * flint-tooltip
 * A component that displays a text label when users hover over or focus on an element.
 *
 * @fires flint-tooltip-show - Dispatched when the tooltip becomes visible.
 * @fires flint-tooltip-hide - Dispatched when the tooltip is dismissed.
 * @csspart base - The component's base wrapper element.
 * @csspart body - The body element.
 */
export class FlintTooltip extends FlintElement {
    static override styles = unsafeCSS(uiTooltipStyles);

    static override dependencies: Record<string, typeof FlintElement> = {
        'flint-popup': FlintPopup,
    };

    /** Text content displayed inside the tooltip. */
    @property({ type: String }) label = '';
    /**
     * Preferred placement of the tooltip relative to the trigger element.
     * @default 'top'
     */
    @property({ type: String }) placement: Placement = 'top';
    /** Show a small arrow pointing toward the trigger element. */
    @property({ type: Boolean }) arrow = false;
    /** Disables the tooltip so it never appears. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    /** Delay in ms before showing the tooltip. */
    @property({ type: Number, attribute: 'open-delay' }) openDelay = 0;

    /** Delay in ms before hiding the tooltip. */
    @property({ type: Number, attribute: 'close-delay' }) closeDelay = 0;

    /** Distance in pixels between the tooltip and the trigger element. */
    @property({ type: Number }) distance = 8;

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

    private _show = (): void => {
        if (this.disabled || !this.label) return;
        if (this._closeTimer !== null) {
            clearTimeout(this._closeTimer);
            this._closeTimer = null;
        }
        if (this.openDelay > 0) {
            if (this._openTimer !== null) return;
            this._openTimer = setTimeout(() => {
                this._openTimer = null;
                this._activePlacement = this.placement;
                this._visible = true;
                void this._runShowAnimation();
                this.dispatchEvent(new CustomEvent('flint-tooltip-show', { bubbles: true, composed: true }));
            }, this.openDelay);
        } else {
            this._activePlacement = this.placement;
            this._visible = true;
            void this._runShowAnimation();
            this.dispatchEvent(new CustomEvent('flint-tooltip-show', { bubbles: true, composed: true }));
        }
    };

    private _hide = (): void => {
        if (this._openTimer !== null) {
            clearTimeout(this._openTimer);
            this._openTimer = null;
        }
        if (this.closeDelay > 0) {
            if (this._closeTimer !== null) return;
            this._closeTimer = setTimeout(() => {
                this._closeTimer = null;
                void this._runHideAnimation().then(() => {
                    if (!this.isConnected) return;
                    this._visible = false;
                    this.dispatchEvent(new CustomEvent('flint-tooltip-hide', { bubbles: true, composed: true }));
                });
            }, this.closeDelay);
        } else {
            void this._runHideAnimation().then(() => {
                if (!this.isConnected) return;
                this._visible = false;
                this.dispatchEvent(new CustomEvent('flint-tooltip-hide', { bubbles: true, composed: true }));
            });
        }
    };

    private _handleKeydown = (e: KeyboardEvent): void => {
        if (e.key === 'Escape' && this._visible) {
            this._clearTimers();
            void this._runHideAnimation().then(() => {
                if (!this.isConnected) return;
                this._visible = false;
            });
        }
    };

    private _handleReposition = (e: Event): void => {
        const detail = (e as CustomEvent).detail;
        if (detail?.placement) {
            this._activePlacement = detail.placement.split('-')[0] as Placement;
        }
    };

    private async _runShowAnimation() {
        const popup = this.shadowRoot?.querySelector<HTMLElement>('.tooltip-popup');
        if (!popup) return;
        const animation = getAnimation(this, 'tooltip.show');
        if (!animation) return;
        await stopAnimations(popup);
        const keyframes = resolveKeyframes(this, animation);
        await animateTo(popup, keyframes, animation.options);
    }

    private async _runHideAnimation() {
        const popup = this.shadowRoot?.querySelector<HTMLElement>('.tooltip-popup');
        if (!popup) return;
        const animation = getAnimation(this, 'tooltip.hide');
        if (!animation) return;
        await stopAnimations(popup);
        const keyframes = resolveKeyframes(this, animation);
        await animateTo(popup, keyframes, animation.options);
    }

    override render() {
        const placement = this._visible ? this._activePlacement : this.placement;

        return html`
      <div
        class="tooltip-container"
        part="base"
        @mouseenter=${this._show}
        @mouseleave=${this._hide}
        @focusin=${this._show}
        @focusout=${this._hide}
        @keydown=${this._handleKeydown}
      >
        <flint-popup
          .active=${this._visible}
          placement=${this.placement}
          .strategy=${this.hoist ? 'fixed' as const : 'absolute' as const}
          .distance=${this.distance}
          flip
          @flint-reposition=${this._handleReposition}
        >
          <span slot="anchor" class="trigger-wrapper" aria-describedby=${this._tooltipId}>
            <slot></slot>
          </span>
          <div
            id=${this._tooltipId}
            part="body"
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
        </flint-popup>
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-tooltip': FlintTooltip;
    }
}
