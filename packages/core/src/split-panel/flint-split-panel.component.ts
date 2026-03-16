import { html, css, nothing, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { FlintElement } from '../flint-element.js';

/* ── Types ─────────────────────────────────────────────────────────── */

/** Parameters passed to a custom snap function. */
export interface SnapFunctionParams {
    /** Current divider position in pixels from the start/top edge. */
    pos: number;
    /** Total container size in pixels. */
    size: number;
    /** The configured snap-threshold value. */
    snapThreshold: number;
}

/** Custom snap function — return the px position to snap to. */
export type SnapFunction = (params: SnapFunctionParams) => number;

/* ── Utility (exported for testing) ───────────────────────────────── */

/**
 * Parse a snap-attribute string into an array of pixel snap points.
 * Supports: `Npx`, `N%`, `repeat(Npx)`, `repeat(N%)` — space-separated.
 */
export function parseSnapPoints(snapStr: string, containerSize: number): number[] {
    const points: number[] = [];
    const tokens = _tokenize(snapStr);

    for (const token of tokens) {
        const repeatMatch = /^repeat\((\d+(?:\.\d+)?)(px|%)\)$/.exec(token);
        if (repeatMatch) {
            const val = parseFloat(repeatMatch[1]!);
            const stepPx = repeatMatch[2] === 'px' ? val : (val / 100) * containerSize;
            if (stepPx > 0) {
                for (let p = stepPx; p < containerSize; p += stepPx) {
                    points.push(p);
                }
            }
            continue;
        }
        const pxMatch = /^(\d+(?:\.\d+)?)px$/.exec(token);
        if (pxMatch) { points.push(parseFloat(pxMatch[1]!)); continue; }
        const pctMatch = /^(\d+(?:\.\d+)?)%$/.exec(token);
        if (pctMatch) { points.push((parseFloat(pctMatch[1]!) / 100) * containerSize); continue; }
    }

    return points;
}

function _tokenize(str: string): string[] {
    const tokens: string[] = [];
    let depth = 0;
    let current = '';
    for (const ch of str.trim()) {
        if (ch === '(') { depth++; current += ch; }
        else if (ch === ')') { depth--; current += ch; }
        else if (ch === ' ' && depth === 0) {
            if (current) { tokens.push(current); current = ''; }
        } else {
            current += ch;
        }
    }
    if (current) tokens.push(current);
    return tokens;
}

/* ── Component ─────────────────────────────────────────────────────── */

/**
 * `flint-split-panel` — Two adjacent panels separated by a draggable divider.
 *
 * @slot start   - Content for the start (left/top) panel.
 * @slot end     - Content for the end (right/bottom) panel.
 * @slot divider - Custom handle icon rendered inside the divider.
 *
 * @csspart start   - The start panel wrapper.
 * @csspart end     - The end panel wrapper.
 * @csspart panel   - Targets both start and end panel wrappers.
 * @csspart divider - The divider element.
 *
 * @cssprop --flint-split-panel-divider-width      - Width/height of the visible divider line (default: 4px).
 * @cssprop --flint-split-panel-divider-hit-area   - Invisible grab area around the divider (default: 12px).
 * @cssprop --flint-split-panel-divider-color      - Divider background color (default: --flint-border-color).
 * @cssprop --flint-split-panel-divider-hover-color - Divider color when hovered or focused.
 * @cssprop --flint-split-panel-min               - Minimum size of the primary panel (default: 0).
 * @cssprop --flint-split-panel-max               - Maximum size of the primary panel (default: 100%).
 *
 * @fires flint-split-panel-reposition - Emitted when the divider position changes.
 *   Detail: `{ position: number; positionInPixels: number }`.
 */
export class FlintSplitPanel extends FlintElement {
    static override styles = css`
        :host {
            display: flex;
            position: relative;
            overflow: clip;
            flex-direction: row;
        }
        :host([vertical]) {
            flex-direction: column;
        }

        /* ── Panels ──────────────────────────────────────────────── */
        .start,
        .end {
            overflow: auto;
            position: relative;
        }
        .start {
            flex: 0 0 auto;
        }
        .end {
            flex: 1 1 0;
            min-width: 0;
            min-height: 0;
        }

        /* ── Divider ─────────────────────────────────────────────── */
        .divider {
            position: relative;
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--flint-split-panel-divider-color, var(--flint-border-color, #e4e4e7));
            transition: background 150ms ease;
            z-index: 1;
            outline: none;
            user-select: none;
            -webkit-user-select: none;
        }
        :host(:not([vertical])) .divider {
            width: var(--flint-split-panel-divider-width, 4px);
            cursor: col-resize;
            touch-action: none;
        }
        :host([vertical]) .divider {
            height: var(--flint-split-panel-divider-width, 4px);
            cursor: row-resize;
            touch-action: none;
        }
        .divider:hover,
        .divider:focus-visible {
            background: var(
                --flint-split-panel-divider-hover-color,
                var(--flint-primary-color, #3b82f6)
            );
        }
        :host([disabled]) .divider {
            cursor: not-allowed;
            opacity: 0.5;
            pointer-events: none;
        }
        :host([disabled]) .divider:hover {
            background: var(--flint-split-panel-divider-color, var(--flint-border-color, #e4e4e7));
        }
        .divider:focus-visible {
            outline: 2px solid var(--flint-primary-color, #3b82f6);
            outline-offset: 2px;
        }

        /* Extended hit area via ::before pseudo-element */
        .divider::before {
            content: '';
            position: absolute;
            z-index: -1;
        }
        :host(:not([vertical])) .divider::before {
            top: 0;
            bottom: 0;
            left: calc(
                (var(--flint-split-panel-divider-hit-area, 12px) -
                    var(--flint-split-panel-divider-width, 4px)) / -2
            );
            right: calc(
                (var(--flint-split-panel-divider-hit-area, 12px) -
                    var(--flint-split-panel-divider-width, 4px)) / -2
            );
        }
        :host([vertical]) .divider::before {
            left: 0;
            right: 0;
            top: calc(
                (var(--flint-split-panel-divider-hit-area, 12px) -
                    var(--flint-split-panel-divider-width, 4px)) / -2
            );
            bottom: calc(
                (var(--flint-split-panel-divider-hit-area, 12px) -
                    var(--flint-split-panel-divider-width, 4px)) / -2
            );
        }
    `;

    /* ── Props ──────────────────────────────────────────────────── */

    /** Divider position as a percentage (0–100). Defaults to 50. */
    @property({ type: Number }) position = 50;

    /**
     * Divider position in pixels from the primary panel's edge.
     * Takes precedence over `position` when ≥ 0.
     */
    @property({ type: Number, attribute: 'position-in-pixels' }) positionInPixels = -1;

    /** Vertical layout — start/end panels are stacked top/bottom. */
    @property({ type: Boolean, reflect: true }) vertical = false;

    /** Prevent the divider from being repositioned. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    /**
     * Designates a primary panel that maintains its pixel size when the
     * host element is resized. The other panel grows or shrinks to fill.
     * If unset, both panels resize proportionally.
     */
    @property({ reflect: true }) primary?: 'start' | 'end';

    /**
     * Space-separated snap positions (`Npx`, `N%`, `repeat(Npx)`, `repeat(N%)`),
     * e.g. `"100px 50%"` or `"repeat(100px) 50%"`.
     * Can also be a `SnapFunction` for custom snapping logic.
     */
    @property() snap: string | SnapFunction = '';

    /** How close (px) the divider must be to a snap point before snapping. Default: 12. */
    @property({ type: Number, attribute: 'snap-threshold' }) snapThreshold = 12;

    /* ── Internal state ─────────────────────────────────────────── */

    /** Pixel position of the divider from start/top. -1 = not yet initialised. */
    private _positionPx = -1;
    /** Cached container dimension in px (width for horizontal, height for vertical). */
    private _cachedSize = 0;
    private _dragging = false;
    /** Set to true before writing back to @property fields internally, to skip updated() re-sync. */
    private _internalUpdate = false;
    private _resizeObserver?: ResizeObserver;

    /* ── Lifecycle ──────────────────────────────────────────────── */

    override connectedCallback() {
        super.connectedCallback();
        if (typeof ResizeObserver !== 'undefined') {
            this._resizeObserver = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    const newSize = this.vertical
                        ? entry.contentRect.height
                        : entry.contentRect.width;
                    this._handleContainerResize(newSize);
                }
            });
            this._resizeObserver.observe(this);
        }
    }

    override disconnectedCallback() {
        super.disconnectedCallback();
        this._resizeObserver?.disconnect();
        this._stopDrag();
    }

    override firstUpdated() {
        const size = this._getSize();
        this._cachedSize = size;

        if (this.positionInPixels >= 0) {
            this._positionPx = this.positionInPixels;
        } else {
            this._positionPx = (this.position / 100) * size;
        }

        this._clampPosition();
        // Only request another render if we have a real layout (no-op in jsdom/SSR)
        if (this._cachedSize > 0) {
            this.requestUpdate();
        }
    }

    override updated(changed: PropertyValues) {
        if (this._dragging || this._internalUpdate) return;

        if (changed.has('positionInPixels') && this.positionInPixels >= 0 && this._positionPx >= 0) {
            this._positionPx = this.positionInPixels;
            this._clampPosition();
            if (this._cachedSize > 0) this.requestUpdate();
        } else if (
            changed.has('position') &&
            !changed.has('positionInPixels') &&
            this._positionPx >= 0
        ) {
            this._positionPx = (this.position / 100) * this._cachedSize;
            this._clampPosition();
            if (this._cachedSize > 0) this.requestUpdate();
        }
    }

    /* ── Resize handling ────────────────────────────────────────── */

    private _handleContainerResize(newSize: number) {
        if (newSize <= 0) return;

        if (this._positionPx < 0) {
            // firstUpdated hasn't run yet — just cache the size
            this._cachedSize = newSize;
            return;
        }

        if (this.primary === 'start') {
            // Start panel keeps its pixel size; no change to _positionPx
        } else if (this.primary === 'end') {
            // End panel keeps its pixel size
            const endPx = this._cachedSize - this._positionPx;
            this._positionPx = newSize - endPx;
        } else {
            // No primary — maintain proportion
            if (this._cachedSize > 0) {
                const pct = this._positionPx / this._cachedSize;
                this._positionPx = pct * newSize;
            }
        }

        this._cachedSize = newSize;
        this._clampPosition();
        this.requestUpdate();
    }

    /* ── Position utilities ─────────────────────────────────────── */

    private _getSize(): number {
        if (typeof window === 'undefined') return 0;
        const rect = this.getBoundingClientRect();
        return this.vertical ? rect.height : rect.width;
    }

    /** Actual pixel size of the divider element. */
    private _getDividerSize(): number {
        const divider = this.shadowRoot?.querySelector('.divider') as HTMLElement | null;
        if (!divider) return 0;
        return this.vertical ? divider.offsetHeight : divider.offsetWidth;
    }

    private _clampPosition() {
        if (this._cachedSize <= 0) return;

        const styles = typeof window !== 'undefined' ? getComputedStyle(this) : undefined;
        const minPx = this._parseSizeToken(
            styles?.getPropertyValue('--flint-split-panel-min').trim() ?? '',
            0,
        );
        const maxPx = this._parseSizeToken(
            styles?.getPropertyValue('--flint-split-panel-max').trim() ?? '',
            this._cachedSize,
        );

        const upperBound = this._cachedSize - this._getDividerSize();
        this._positionPx = Math.max(minPx, Math.min(maxPx, this._positionPx));
        this._positionPx = Math.max(0, Math.min(upperBound, this._positionPx));

        // Sync public props — guard so updated() doesn't re-process these writes
        this._internalUpdate = true;
        this.position = this._cachedSize > 0 ? (this._positionPx / this._cachedSize) * 100 : 50;
        this.positionInPixels = this._positionPx;
        this._internalUpdate = false;
    }

    private _parseSizeToken(value: string, fallback: number): number {
        if (!value) return fallback;
        if (value === '0') return 0;
        if (value.endsWith('px')) return parseFloat(value);
        if (value.endsWith('%')) return (parseFloat(value) / 100) * this._cachedSize;
        return fallback;
    }

    private _applySnap(px: number): number {
        const { snap, snapThreshold } = this;
        if (!snap) return px;

        if (typeof snap === 'function') {
            return snap({ pos: px, size: this._cachedSize, snapThreshold });
        }

        const points = parseSnapPoints(snap, this._cachedSize);
        if (!points.length) return px;

        let nearest = px;
        let minDist = Infinity;
        for (const sp of points) {
            const dist = Math.abs(px - sp);
            if (dist < minDist) {
                minDist = dist;
                nearest = sp;
            }
        }

        return minDist <= snapThreshold ? nearest : px;
    }

    /* ── Pointer drag ───────────────────────────────────────────── */

    private _onDividerPointerDown = (e: PointerEvent): void => {
        if (this.disabled || e.button !== 0) return;
        e.preventDefault();
        this._dragging = true;
        // Capture on host so pointermove fires even outside the divider
        this.setPointerCapture(e.pointerId);
        this.addEventListener('pointermove', this._onPointerMove);
        this.addEventListener('pointerup', this._onPointerUp);
        this.addEventListener('pointercancel', this._onPointerUp);
    };

    private _onPointerMove = (e: PointerEvent): void => {
        if (!this._dragging) return;
        if (e.buttons === 0) { this._stopDrag(); return; }

        const rect = this.getBoundingClientRect();
        let px = this.vertical ? e.clientY - rect.top : e.clientX - rect.left;

        px = this._applySnap(px);
        px = this._clampPx(px);

        this._positionPx = px;
        this._internalUpdate = true;
        this.position = this._cachedSize > 0 ? (px / this._cachedSize) * 100 : 50;
        this.positionInPixels = px;
        this._internalUpdate = false;

        this._emitReposition();
        this.requestUpdate();
    };

    private _onPointerUp = (e: PointerEvent): void => {
        this.releasePointerCapture(e.pointerId);
        this._stopDrag();
    };

    private _stopDrag(): void {
        if (!this._dragging) return;
        this._dragging = false;
        this.removeEventListener('pointermove', this._onPointerMove);
        this.removeEventListener('pointerup', this._onPointerUp);
        this.removeEventListener('pointercancel', this._onPointerUp);
    }

    /* ── Keyboard ───────────────────────────────────────────────── */

    private _onKeyDown = (e: KeyboardEvent): void => {
        if (this.disabled) return;

        const step = e.shiftKey ? 10 : 1;
        let delta = 0;
        let absolute = false;
        let absolutePx = 0;

        if (!this.vertical) {
            if (e.key === 'ArrowLeft') delta = -step;
            else if (e.key === 'ArrowRight') delta = step;
            else if (e.key === 'Home') { absolute = true; absolutePx = 0; }
            else if (e.key === 'End') { absolute = true; absolutePx = this._cachedSize; }
        } else {
            if (e.key === 'ArrowUp') delta = -step;
            else if (e.key === 'ArrowDown') delta = step;
            else if (e.key === 'Home') { absolute = true; absolutePx = 0; }
            else if (e.key === 'End') { absolute = true; absolutePx = this._cachedSize; }
        }

        if (delta !== 0 || absolute) {
            e.preventDefault();
            this._moveTo(absolute ? absolutePx : this._positionPx + delta);
        }
    };

    private _moveTo(px: number): void {
        px = this._clampPx(px);
        this._positionPx = px;
        this._internalUpdate = true;
        this.position = this._cachedSize > 0 ? (px / this._cachedSize) * 100 : 50;
        this.positionInPixels = px;
        this._internalUpdate = false;
        this._emitReposition();
        this.requestUpdate();
    }

    private _clampPx(px: number): number {
        const styles = typeof window !== 'undefined' ? getComputedStyle(this) : undefined;
        const minPx = this._parseSizeToken(
            styles?.getPropertyValue('--flint-split-panel-min').trim() ?? '',
            0,
        );
        const maxPx = this._parseSizeToken(
            styles?.getPropertyValue('--flint-split-panel-max').trim() ?? '',
            this._cachedSize,
        );
        const upperBound = this._cachedSize - this._getDividerSize();
        return Math.max(0, Math.min(upperBound, Math.max(minPx, Math.min(maxPx, px))));
    }

    /* ── Event ──────────────────────────────────────────────────── */

    private _emitReposition(): void {
        this.dispatchEvent(
            new CustomEvent('flint-split-panel-reposition', {
                bubbles: true,
                composed: true,
                detail: { position: this.position, positionInPixels: this.positionInPixels },
            }),
        );
    }

    /* ── Render ─────────────────────────────────────────────────── */

    override render() {
        // Before firstUpdated, fall back to percentage so there's no flash of 0-size panel
        const posSize =
            this._positionPx >= 0 ? `${this._positionPx}px` : `${this.position}%`;
        const startStyle = this.vertical ? `height: ${posSize};` : `width: ${posSize};`;

        return html`
            <div class="start" part="panel start" style="${startStyle}" tabindex="0">
                <slot name="start"></slot>
            </div>

            <div
                class="divider"
                part="divider"
                role="separator"
                tabindex="${this.disabled ? -1 : 0}"
                aria-valuenow="${Math.round(this.position)}"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-orientation="${this.vertical ? 'vertical' : 'horizontal'}"
                aria-disabled="${this.disabled ? 'true' : nothing}"
                @pointerdown=${this._onDividerPointerDown}
                @keydown=${this._onKeyDown}
            >
                <slot name="divider"></slot>
            </div>

            <div class="end" part="panel end" tabindex="0">
                <slot name="end"></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-split-panel': FlintSplitPanel;
    }
}
