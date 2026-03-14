import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import uiScrollAreaStyles from './flint-scroll-area.css?inline';
import uiScrollBarStyles from './flint-scroll-bar.css?inline';

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-scroll-bar                                                       */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Custom overlay scrollbar. Place inside `flint-scroll-area` with
 * `slot="scrollbar"` for an explicit horizontal or second-axis bar.
 *
 * The parent `flint-scroll-area` calls `setThumb()` and `setVisible()` to
 * keep this element in sync with the viewport's scroll position.
 *
 * @slot  — none (fully shadow DOM)
 *
 * @attr {'vertical'|'horizontal'} orientation - Axis this bar controls.
 *
 * @cssprop --flint-scrollbar-size              - Bar track width/height (default: `8px`)
 * @cssprop --flint-scrollbar-thumb-color       - Thumb fill (default: `rgba(0,0,0,.35)`)
 * @cssprop --flint-scrollbar-thumb-hover-color - Thumb fill on hover/drag
 * @cssprop --flint-scrollbar-thumb-radius      - Thumb border radius (default: `9999px`)
 * @cssprop --flint-scrollbar-track-color       - Track background (default: `transparent`)
 */
@customElement('flint-scroll-bar')
export class FlintScrollBar extends LitElement {
    static styles = unsafeCSS(uiScrollBarStyles);

    /** Which axis this scrollbar controls. Reflects to attribute. */
    @property({ reflect: true }) orientation: 'vertical' | 'horizontal' = 'vertical';

    /** Thumb leading-edge position as percentage of track (0–100). */
    @state() _thumbPos = 0;

    /** Thumb size as percentage of track (0–100). */
    @state() _thumbSize = 100;

    @state() private _dragging = false;

    private _dragStart = 0;
    private _scrollStart = 0;

    /** Push updated thumb geometry from the parent scroll area. */
    setThumb(pos: number, size: number) {
        this._thumbPos = pos;
        this._thumbSize = size;
    }

    /** Show or hide the scrollbar (parent controls visibility). */
    setVisible(visible: boolean) {
        this.toggleAttribute('data-visible', visible);
    }

    private get _area(): FlintScrollArea | null {
        return this.closest('flint-scroll-area') as FlintScrollArea | null;
    }

    private _onPointerDown(e: PointerEvent) {
        e.preventDefault();
        this._dragging = true;
        this._dragStart = this.orientation === 'vertical' ? e.clientY : e.clientX;
        this._scrollStart = this._area?._getScrollPos(this.orientation) ?? 0;
        (e.currentTarget as Element).setPointerCapture(e.pointerId);
    }

    private _onPointerMove(e: PointerEvent) {
        if (!this._dragging) return;
        const area = this._area;
        if (!area) return;
        const delta =
            this.orientation === 'vertical'
                ? e.clientY - this._dragStart
                : e.clientX - this._dragStart;
        const trackSize =
            this.orientation === 'vertical' ? this.offsetHeight : this.offsetWidth;
        if (trackSize === 0) return;
        const scrollRange = area._getScrollRange(this.orientation);
        area._setScrollPos(
            this.orientation,
            this._scrollStart + (delta / trackSize) * scrollRange,
        );
    }

    private _onPointerUp(e: PointerEvent) {
        if (this._dragging) {
            this._dragging = false;
            (e.currentTarget as Element).releasePointerCapture(e.pointerId);
        }
    }

    render() {
        const isVert = this.orientation === 'vertical';
        const thumbStyle = isVert
            ? `height: ${this._thumbSize}%; top: ${this._thumbPos}%;`
            : `width: ${this._thumbSize}%; left: ${this._thumbPos}%;`;

        return html`
            <div
                class="track"
                role="scrollbar"
                aria-orientation=${this.orientation}
                aria-valuenow=${Math.round(this._thumbPos)}
                aria-valuemin="0"
                aria-valuemax="100"
                @pointerdown=${this._onPointerDown}
                @pointermove=${this._onPointerMove}
                @pointerup=${this._onPointerUp}
                @pointercancel=${this._onPointerUp}
            >
                <div
                    class="thumb ${this._dragging ? 'thumb--dragging' : ''}"
                    style=${thumbStyle}
                ></div>
            </div>
        `;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-scroll-area                                                      */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Augments native scroll with custom, cross-browser overlay scrollbars.
 * Native scrollbars are hidden; lightweight custom thumbs are rendered in
 * shadow DOM and synced to the viewport via scroll + ResizeObserver events.
 *
 * @slot           - Scrollable content.
 * @slot scrollbar - Optional explicit `flint-scroll-bar` elements (e.g. horizontal).
 *
 * @attr {'auto'|'always'|'scroll'|'hover'} type
 *   - `'hover'`  (default) — visible on hover when content overflows
 *   - `'auto'`             — always visible when content overflows
 *   - `'always'`           — always visible regardless of overflow
 *   - `'scroll'`           — visible while scrolling, hidden after ~600 ms
 * @attr {'ltr'|'rtl'} dir - Text direction. RTL flips the vertical bar to the left.
 *
 * @method scrollTo(options)       - Delegates to the inner viewport.
 * @method scrollBy(options)       - Delegates to the inner viewport.
 *
 * @cssprop --flint-scrollbar-size              - Bar width/height (default: `8px`)
 * @cssprop --flint-scrollbar-thumb-color       - Thumb fill (default: `rgba(0,0,0,.35)`)
 * @cssprop --flint-scrollbar-thumb-hover-color - Thumb hover/drag fill
 * @cssprop --flint-scrollbar-thumb-radius      - Thumb border radius (default: `9999px`)
 * @cssprop --flint-scrollbar-track-color       - Track background (default: `transparent`)
 */
@customElement('flint-scroll-area')
export class FlintScrollArea extends LitElement {
    static styles = unsafeCSS(uiScrollAreaStyles);

    /**
     * Controls when the scrollbars appear.
     * - `'hover'`  (default) — on hover, when content overflows
     * - `'auto'`             — when content overflows
     * - `'always'`           — always
     * - `'scroll'`           — briefly while scrolling
     */
    @property({ reflect: true }) type: 'auto' | 'always' | 'scroll' | 'hover' = 'hover';

    /** Text direction. `'rtl'` flips the vertical bar to the left side. */
    @property({ reflect: true }) dir: 'ltr' | 'rtl' = 'ltr';

    @query('.viewport') _viewport!: HTMLDivElement;
    @query('.scrollbar--y') private _scrollbarY!: HTMLDivElement;
    @query('.scrollbar--x') private _scrollbarX!: HTMLDivElement;

    @state() private _thumbYPos = 0;
    @state() private _thumbYSize = 100;
    @state() private _thumbXPos = 0;
    @state() private _thumbXSize = 100;
    @state() private _hasOverflowY = false;
    @state() private _hasOverflowX = false;
    @state() private _isScrolling = false;

    private _resizeObserver?: ResizeObserver;
    private _hideTimer: ReturnType<typeof setTimeout> | null = null;

    // Internal Y-thumb drag state (not @state — managed via requestUpdate)
    private _draggingY = false;
    private _dragYStart = 0;
    private _scrollYStart = 0;

    // Internal X-thumb drag state
    private _draggingX = false;
    private _dragXStart = 0;
    private _scrollXStart = 0;

    override firstUpdated() {
        if (typeof ResizeObserver !== 'undefined') {
            this._resizeObserver = new ResizeObserver(() => {
                this._updateOverflow();
                this._syncScrollBars();
            });
            this._resizeObserver.observe(this._viewport);
        }
        this._updateOverflow();
        this._syncScrollBars();
    }

    override disconnectedCallback() {
        super.disconnectedCallback();
        this._resizeObserver?.disconnect();
        if (this._hideTimer) clearTimeout(this._hideTimer);
    }

    /** Scroll the viewport to a position. */
    override scrollTo(options?: ScrollToOptions): void;
    override scrollTo(x: number, y: number): void;
    override scrollTo(optionsOrX?: ScrollToOptions | number, y?: number) {
        if (typeof this._viewport?.scrollTo === 'function') {
            if (typeof optionsOrX === 'number') {
                this._viewport.scrollTo(optionsOrX, y ?? 0);
            } else {
                this._viewport.scrollTo(optionsOrX);
            }
        }
    }

    /** Scroll the viewport by a relative amount. */
    override scrollBy(options?: ScrollToOptions): void;
    override scrollBy(x: number, y: number): void;
    override scrollBy(optionsOrX?: ScrollToOptions | number, y?: number) {
        if (typeof this._viewport?.scrollBy === 'function') {
            if (typeof optionsOrX === 'number') {
                this._viewport.scrollBy(optionsOrX, y ?? 0);
            } else {
                this._viewport.scrollBy(optionsOrX);
            }
        }
    }

    // ── Scroll pos / range helpers (called by FlintScrollBar drag) ────────

    _getScrollPos(orientation: 'vertical' | 'horizontal'): number {
        if (!this._viewport) return 0;
        return orientation === 'vertical'
            ? this._viewport.scrollTop
            : this._viewport.scrollLeft;
    }

    _getScrollRange(orientation: 'vertical' | 'horizontal'): number {
        if (!this._viewport) return 0;
        return orientation === 'vertical'
            ? this._viewport.scrollHeight - this._viewport.clientHeight
            : this._viewport.scrollWidth - this._viewport.clientWidth;
    }

    _setScrollPos(orientation: 'vertical' | 'horizontal', pos: number) {
        if (!this._viewport) return;
        const range = this._getScrollRange(orientation);
        const clamped = Math.max(0, Math.min(pos, range));
        if (orientation === 'vertical') {
            this._viewport.scrollTop = clamped;
        } else {
            this._viewport.scrollLeft = clamped;
        }
    }

    // ── Internal helpers ───────────────────────────────────────────────

    private _onScroll() {
        this._updateOverflow();
        this._syncScrollBars();
        if (this.type === 'scroll') {
            this._isScrolling = true;
            if (this._hideTimer) clearTimeout(this._hideTimer);
            this._hideTimer = setTimeout(() => {
                this._isScrolling = false;
            }, 600);
        }
    }

    private _updateOverflow() {
        const vp = this._viewport;
        if (!vp) return;
        this._hasOverflowY = vp.scrollHeight > vp.clientHeight + 1;
        this._hasOverflowX = vp.scrollWidth > vp.clientWidth + 1;
    }

    private _computeThumb(orientation: 'vertical' | 'horizontal') {
        const vp = this._viewport;
        if (!vp) return { pos: 0, size: 100 };

        const scrollSize =
            orientation === 'vertical' ? vp.scrollHeight : vp.scrollWidth;
        const viewportSize =
            orientation === 'vertical' ? vp.clientHeight : vp.clientWidth;
        const scrollPos = this._getScrollPos(orientation);
        const scrollRange = this._getScrollRange(orientation);

        if (scrollSize <= viewportSize || scrollRange <= 0) {
            return { pos: 0, size: 100 };
        }

        const thumbSizePct = Math.max(10, (viewportSize / scrollSize) * 100);
        const thumbPosPct = (scrollPos / scrollRange) * (100 - thumbSizePct);
        return { pos: thumbPosPct, size: thumbSizePct };
    }

    private _syncScrollBars() {
        const { pos: yPos, size: ySize } = this._computeThumb('vertical');
        const { pos: xPos, size: xSize } = this._computeThumb('horizontal');

        this._thumbYPos = yPos;
        this._thumbYSize = ySize;
        this._thumbXPos = xPos;
        this._thumbXSize = xSize;

        // Sync any slotted flint-scroll-bar elements
        this.querySelectorAll('flint-scroll-bar').forEach(el => {
            if ((el as Element).closest('flint-scroll-area') !== this) return;
            const bar = el as FlintScrollBar;
            if (bar.orientation === 'vertical') {
                bar.setThumb(yPos, ySize);
                bar.setVisible(this._shouldShowBar('vertical'));
            } else {
                bar.setThumb(xPos, xSize);
                bar.setVisible(this._shouldShowBar('horizontal'));
            }
        });
    }

    private _shouldShowBar(orientation: 'vertical' | 'horizontal'): boolean {
        const hasOverflow =
            orientation === 'vertical' ? this._hasOverflowY : this._hasOverflowX;
        switch (this.type) {
            case 'always': return true;
            case 'auto':   return hasOverflow;
            case 'scroll': return this._isScrolling && hasOverflow;
            case 'hover':  return hasOverflow; // CSS :hover triggers show
            default:       return hasOverflow;
        }
    }

    private _scrollbarClasses(orientation: 'vertical' | 'horizontal'): string {
        const axis = orientation === 'vertical' ? 'y' : 'x';
        const visible = this._shouldShowBar(orientation) ? 'scrollbar--visible' : '';
        const active = this._isScrolling ? 'scrollbar--active' : '';
        return `scrollbar scrollbar--${axis} ${visible} ${active}`.trim();
    }

    // ── Internal Y-thumb drag ──────────────────────────────────────────

    private _onThumbYDown(e: PointerEvent) {
        e.preventDefault();
        this._draggingY = true;
        this._dragYStart = e.clientY;
        this._scrollYStart = this._getScrollPos('vertical');
        (e.currentTarget as Element).setPointerCapture(e.pointerId);
        this.requestUpdate();
    }

    private _onThumbYMove(e: PointerEvent) {
        if (!this._draggingY) return;
        const trackH = this._scrollbarY?.offsetHeight ?? 0;
        if (trackH === 0) return;
        const delta = e.clientY - this._dragYStart;
        this._setScrollPos(
            'vertical',
            this._scrollYStart + (delta / trackH) * this._getScrollRange('vertical'),
        );
    }

    private _onThumbYUp(e: PointerEvent) {
        if (this._draggingY) {
            this._draggingY = false;
            (e.currentTarget as Element).releasePointerCapture(e.pointerId);
            this.requestUpdate();
        }
    }

    // ── Internal X-thumb drag ──────────────────────────────────────────

    private _onThumbXDown(e: PointerEvent) {
        e.preventDefault();
        this._draggingX = true;
        this._dragXStart = e.clientX;
        this._scrollXStart = this._getScrollPos('horizontal');
        (e.currentTarget as Element).setPointerCapture(e.pointerId);
        this.requestUpdate();
    }

    private _onThumbXMove(e: PointerEvent) {
        if (!this._draggingX) return;
        const trackW = this._scrollbarX?.offsetWidth ?? 0;
        if (trackW === 0) return;
        const delta = e.clientX - this._dragXStart;
        this._setScrollPos(
            'horizontal',
            this._scrollXStart + (delta / trackW) * this._getScrollRange('horizontal'),
        );
    }

    private _onThumbXUp(e: PointerEvent) {
        if (this._draggingX) {
            this._draggingX = false;
            (e.currentTarget as Element).releasePointerCapture(e.pointerId);
            this.requestUpdate();
        }
    }

    // ── Slot change ────────────────────────────────────────────────────

    private _onSlotChange() {
        if (this._resizeObserver) {
            const slot = this.shadowRoot!.querySelector(
                'slot:not([name])',
            ) as HTMLSlotElement | null;
            slot?.assignedElements({ flatten: true }).forEach(el => {
                this._resizeObserver!.observe(el);
            });
        }
        this._updateOverflow();
        this._syncScrollBars();
    }

    render() {
        const thumbYStyle = `height: ${this._thumbYSize}%; top: ${this._thumbYPos}%;`;
        const thumbXStyle = `width: ${this._thumbXSize}%; left: ${this._thumbXPos}%;`;

        return html`
            <div class="root">
                <div class="viewport" dir=${this.dir} @scroll=${this._onScroll}>
                    <slot @slotchange=${this._onSlotChange}></slot>
                </div>

                <!-- built-in vertical scrollbar -->
                <div
                    class=${this._scrollbarClasses('vertical')}
                    role="scrollbar"
                    aria-orientation="vertical"
                    aria-valuenow=${Math.round(this._thumbYPos)}
                    aria-valuemin="0"
                    aria-valuemax="100"
                >
                    <div
                        class="thumb thumb--y ${this._draggingY ? 'thumb--dragging' : ''}"
                        style=${thumbYStyle}
                        @pointerdown=${this._onThumbYDown}
                        @pointermove=${this._onThumbYMove}
                        @pointerup=${this._onThumbYUp}
                        @pointercancel=${this._onThumbYUp}
                    ></div>
                </div>

                <!-- built-in horizontal scrollbar -->
                <div
                    class=${this._scrollbarClasses('horizontal')}
                    role="scrollbar"
                    aria-orientation="horizontal"
                    aria-valuenow=${Math.round(this._thumbXPos)}
                    aria-valuemin="0"
                    aria-valuemax="100"
                >
                    <div
                        class="thumb thumb--x ${this._draggingX ? 'thumb--dragging' : ''}"
                        style=${thumbXStyle}
                        @pointerdown=${this._onThumbXDown}
                        @pointermove=${this._onThumbXMove}
                        @pointerup=${this._onThumbXUp}
                        @pointercancel=${this._onThumbXUp}
                    ></div>
                </div>

                <!-- slot for user-provided flint-scroll-bar elements -->
                <slot
                    name="scrollbar"
                    @slotchange=${() => this._syncScrollBars()}
                ></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-scroll-area': FlintScrollArea;
        'flint-scroll-bar': FlintScrollBar;
    }
}
