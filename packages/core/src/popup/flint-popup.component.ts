import { unsafeCSS, html, nothing, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import {
    computePosition,
    autoUpdate,
    offset,
    flip,
    shift,
    size,
    arrow,
    type Placement,
    type Strategy,
    type Middleware,
} from '@floating-ui/dom';
import { FlintElement } from '../flint-element.js';
import styles from './flint-popup.css?inline';

/**
 * flint-popup
 *
 * A low-level positioning utility wrapping Floating UI.
 * Provides declarative positioning for tooltips, dropdowns, selects, hover cards,
 * and any overlay that needs to stay anchored to a reference element.
 *
 * When `active` is false, all Floating UI listeners are torn down for performance.
 *
 * @slot - The popup content to be positioned.
 * @slot anchor - The reference element the popup is positioned relative to.
 *
 * @fires flint-reposition - Fired after the popup is repositioned. `detail: { placement }`.
 *
 * @csspart popup - The popup container element.
 * @csspart arrow - The arrow element (rendered when `arrow` is true).
 * @csspart hover-bridge - The transparent hover bridge element.
 *
 * @cssprop [--flint-popup-arrow-size=8px] - Width and height of the arrow.
 * @cssprop [--flint-popup-arrow-color=inherit] - Background color of the arrow.
 * @cssprop [--auto-size-available-width] - Set by auto-size middleware; available width.
 * @cssprop [--auto-size-available-height] - Set by auto-size middleware; available height.
 */
export class FlintPopup extends FlintElement {
    static override styles = unsafeCSS(styles);

    private _cleanup: (() => void) | null = null;
    private _anchorEl: Element | null = null;

    /** Activates positioning. When false, Floating UI listeners are torn down. */
    @property({ type: Boolean, reflect: true }) active = false;

    /**
     * The anchor element. Pass a CSS selector string (resolved from ownerDocument),
     * an Element reference, or leave empty to use the element in the `anchor` slot.
     */
    @property({ attribute: false }) anchor: string | Element = '';

    /** Preferred placement of the popup relative to its anchor. */
    @property({ reflect: true }) placement: Placement = 'top';

    /** CSS positioning strategy. Use `'fixed'` to escape overflow containers. */
    @property() strategy: Strategy = 'absolute';

    /** Distance from the anchor on the main axis (px). */
    @property({ type: Number }) distance = 0;

    /** Offset along the cross axis (px). */
    @property({ type: Number }) skidding = 0;

    /** Flip the popup when it would overflow the boundary. */
    @property({ type: Boolean }) flip = false;

    /** Space-separated fallback placements when flipping (e.g. `"bottom-start bottom-end"`). */
    @property({ attribute: 'flip-fallback-placements' }) flipFallbackPlacements = '';

    /** Boundary element(s) for the flip middleware. */
    @property({ attribute: false }) flipBoundary: Element | Element[] | undefined;

    /** Padding from the flip boundary (px). */
    @property({ type: Number, attribute: 'flip-padding' }) flipPadding = 0;

    /** Shift the popup to stay within the boundary. */
    @property({ type: Boolean }) shift = false;

    /** Boundary element(s) for the shift middleware. */
    @property({ attribute: false }) shiftBoundary: Element | Element[] | undefined;

    /** Padding from the shift boundary (px). */
    @property({ type: Number, attribute: 'shift-padding' }) shiftPadding = 0;

    /** Constrain popup dimensions to available space: `'horizontal'`, `'vertical'`, or `'both'`. */
    @property({ attribute: 'auto-size' }) autoSize: '' | 'horizontal' | 'vertical' | 'both' = '';

    /** Boundary element(s) for auto-size. */
    @property({ attribute: false }) autoSizeBoundary: Element | Element[] | undefined;

    /** Padding from the auto-size boundary (px). */
    @property({ type: Number, attribute: 'auto-size-padding' }) autoSizePadding = 0;

    /** Sync popup width, height, or both to match the anchor element. */
    @property() sync: '' | 'width' | 'height' | 'both' = '';

    /** Show the built-in arrow pointing toward the anchor. */
    @property({ type: Boolean }) arrow = false;

    /** Arrow padding from the edges of the popup (px). */
    @property({ type: Number, attribute: 'arrow-padding' }) arrowPadding = 4;

    /** Render a transparent bridge between anchor and popup for safe hover transitions. */
    @property({ type: Boolean, attribute: 'hover-bridge' }) hoverBridge = false;

    /** The current resolved placement (may differ from `placement` after flipping). */
    @state() private _currentPlacement: Placement = this.placement;

    override disconnectedCallback() {
        super.disconnectedCallback();
        this._stop();
    }

    override async updated(changed: PropertyValues) {
        if (changed.has('active') || changed.has('anchor')) {
            if (this.active) {
                this._start();
            } else {
                this._stop();
            }
        } else if (this.active) {
            await this.reposition();
        }
    }

    /** Force a reposition of the popup. */
    async reposition() {
        if (!this.active) return;

        const anchorEl = this._getAnchorElement();
        const popup = this.shadowRoot?.querySelector<HTMLElement>('.popup');
        if (!anchorEl || !popup) return;

        const middleware = this._buildMiddleware(popup);

        const { x, y, placement, middlewareData } = await computePosition(
            anchorEl,
            popup,
            { placement: this.placement, strategy: this.strategy, middleware },
        );

        this._currentPlacement = placement;
        popup.setAttribute('data-current-placement', placement);
        popup.style.left = `${x}px`;
        popup.style.top = `${y}px`;

        // Position arrow
        const arrowEl = this.shadowRoot?.querySelector<HTMLElement>('.popup__arrow');
        if (this.arrow && arrowEl && middlewareData.arrow) {
            const { x: ax, y: ay } = middlewareData.arrow;
            const side = placement.split('-')[0] as 'top' | 'right' | 'bottom' | 'left';
            const staticSide = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[side];

            arrowEl.style.top = '';
            arrowEl.style.right = '';
            arrowEl.style.bottom = '';
            arrowEl.style.left = '';

            if (ax != null) arrowEl.style.left = `${ax}px`;
            if (ay != null) arrowEl.style.top = `${ay}px`;
            arrowEl.style.setProperty(staticSide, 'calc(var(--flint-popup-arrow-size, 8px) / -2)');
        }

        this.dispatchEvent(new CustomEvent('flint-reposition', {
            bubbles: true,
            composed: true,
            detail: { placement },
        }));
    }

    /* ── Private ──────────────────────────────────────────────────────── */

    private _buildMiddleware(popup: HTMLElement): Middleware[] {
        const mw: Middleware[] = [];

        if (this.distance || this.skidding) {
            mw.push(offset({ mainAxis: this.distance, crossAxis: this.skidding }));
        }

        if (this.flip) {
            mw.push(flip({
                boundary: this.flipBoundary,
                fallbackPlacements: this.flipFallbackPlacements
                    ? (this.flipFallbackPlacements.split(' ').filter(Boolean) as Placement[])
                    : undefined,
                padding: this.flipPadding,
            }));
        }

        if (this.shift) {
            mw.push(shift({
                boundary: this.shiftBoundary,
                padding: this.shiftPadding,
            }));
        }

        if (this.sync || this.autoSize) {
            mw.push(size({
                boundary: this.autoSizeBoundary,
                padding: this.autoSizePadding,
                apply: ({ availableWidth, availableHeight, rects }) => {
                    if (this.sync === 'width' || this.sync === 'both') {
                        popup.style.width = `${rects.reference.width}px`;
                    }
                    if (this.sync === 'height' || this.sync === 'both') {
                        popup.style.height = `${rects.reference.height}px`;
                    }
                    if (this.autoSize === 'horizontal' || this.autoSize === 'both') {
                        popup.style.setProperty('--auto-size-available-width', `${availableWidth}px`);
                    }
                    if (this.autoSize === 'vertical' || this.autoSize === 'both') {
                        popup.style.setProperty('--auto-size-available-height', `${availableHeight}px`);
                    }
                },
            }));
        }

        const arrowEl = this.shadowRoot?.querySelector<HTMLElement>('.popup__arrow');
        if (this.arrow && arrowEl) {
            mw.push(arrow({ element: arrowEl, padding: this.arrowPadding }));
        }

        return mw;
    }

    private _getAnchorElement(): Element | null {
        if (this.anchor instanceof Element) return this.anchor;
        if (typeof this.anchor === 'string' && this.anchor) {
            return this.ownerDocument.querySelector(this.anchor);
        }
        return this._anchorEl;
    }

    private _handleAnchorSlotChange(e: Event) {
        const slot = e.target as HTMLSlotElement;
        this._anchorEl = slot.assignedElements({ flatten: true })[0] ?? null;
        if (this.active) this._start();
    }

    private _start() {
        this._stop();
        if (!this.active) return;

        const anchorEl = this._getAnchorElement();
        const popup = this.shadowRoot?.querySelector<HTMLElement>('.popup');
        if (!anchorEl || !popup) return;

        this._cleanup = autoUpdate(anchorEl, popup, () => {
            void this.reposition();
        });
    }

    private _stop() {
        if (this._cleanup) {
            this._cleanup();
            this._cleanup = null;
        }
    }

    override render() {
        const side = this._currentPlacement.split('-')[0] as string;
        const gap = Math.max(this.distance, 2);

        return html`
            <slot name="anchor" @slotchange=${this._handleAnchorSlotChange}></slot>

            <div
                part="popup"
                class=${classMap({
                    popup: true,
                    'popup--active': this.active,
                    'popup--fixed': this.strategy === 'fixed',
                })}
            >
                <slot></slot>
                ${this.arrow ? html`<div part="arrow" class="popup__arrow"></div>` : nothing}
                ${this.hoverBridge && this.active ? html`
                    <div
                        part="hover-bridge"
                        class="popup__hover-bridge"
                        style=${side === 'top'
                            ? `bottom:0;left:0;right:0;height:${gap}px;transform:translateY(100%)`
                            : side === 'bottom'
                            ? `top:0;left:0;right:0;height:${gap}px;transform:translateY(-100%)`
                            : side === 'left'
                            ? `right:0;top:0;bottom:0;width:${gap}px;transform:translateX(100%)`
                            : `left:0;top:0;bottom:0;width:${gap}px;transform:translateX(-100%)`
                        }
                    ></div>
                ` : nothing}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-popup': FlintPopup;
    }
}
