import { unsafeCSS, html } from 'lit';
import { property } from 'lit/decorators.js';
import { FlintElement } from '../flint-element.js';
import styles from './flint-image-comparer.css?inline';

/**
 * `flint-image-comparer` — Compare two images side-by-side with a draggable slider.
 *
 * @slot before - The before image (`<img>` or `<svg>`).
 * @slot after  - The after image (`<img>` or `<svg>`).
 * @slot handle - Custom handle content (replaces the default arrows icon).
 *
 * @csspart base    - The component's base wrapper.
 * @csspart before  - The container that wraps the before image.
 * @csspart after   - The container that wraps the after image.
 * @csspart divider - The divider line that separates the images.
 * @csspart handle  - The draggable handle.
 *
 * @cssprop --flint-image-comparer-divider-width        - Width of the divider line.
 * @cssprop --flint-image-comparer-divider-color        - Color of the divider line.
 * @cssprop --flint-image-comparer-handle-size           - Diameter of the handle circle.
 * @cssprop --flint-image-comparer-handle-bg             - Handle background color.
 * @cssprop --flint-image-comparer-handle-border-color   - Handle border color.
 * @cssprop --flint-image-comparer-handle-icon-color     - Handle icon color.
 * @cssprop --flint-image-comparer-border-radius         - Border radius of the component.
 * @cssprop --flint-image-comparer-aspect-ratio          - Aspect ratio of the component (default: 16 / 9).
 *
 * @fires flint-image-comparer-change - Fired when the position changes. Detail: `{ position: number }`.
 */
export class FlintImageComparer extends FlintElement {
    static override styles = unsafeCSS(styles);

    /** The position of the divider as a percentage (0–100). */
    @property({ type: Number }) position = 50;

    /** Whether the comparer is disabled. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    private _dragging = false;

    override connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('pointerdown', this._onPointerDown);
        this.addEventListener('keydown', this._onKeyDown);
    }

    override disconnectedCallback(): void {
        super.disconnectedCallback();
        this.removeEventListener('pointerdown', this._onPointerDown);
        this.removeEventListener('keydown', this._onKeyDown);
        this._stopDrag();
    }

    private _clamp(value: number): number {
        return Math.min(100, Math.max(0, value));
    }

    private _setPosition(pos: number): void {
        const clamped = this._clamp(pos);
        if (clamped !== this.position) {
            this.position = clamped;
            this.dispatchEvent(
                new CustomEvent('flint-image-comparer-change', {
                    detail: { position: clamped },
                    bubbles: true,
                    composed: true,
                }),
            );
        }
    }

    private _getPositionFromPointer(e: PointerEvent): number {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        return (x / rect.width) * 100;
    }

    /* ── Pointer drag ─────────────────────────────────────────── */

    private _onPointerDown = (e: PointerEvent): void => {
        if (this.disabled) return;
        e.preventDefault();
        this._dragging = true;
        this.setPointerCapture(e.pointerId);
        this._setPosition(this._getPositionFromPointer(e));

        // Focus the handle so keyboard nav works after click
        this.shadowRoot?.querySelector<HTMLElement>('.handle')?.focus();

        this.addEventListener('pointermove', this._onPointerMove);
        this.addEventListener('pointerup', this._onPointerUp);
        this.addEventListener('pointercancel', this._onPointerUp);
    };

    private _onPointerMove = (e: PointerEvent): void => {
        if (!this._dragging) return;
        if (e.buttons === 0) {
            this._stopDrag();
            return;
        }
        this._setPosition(this._getPositionFromPointer(e));
    };

    private _onPointerUp = (e: PointerEvent): void => {
        this.releasePointerCapture(e.pointerId);
        this._stopDrag();
    };

    private _stopDrag(): void {
        this._dragging = false;
        this.removeEventListener('pointermove', this._onPointerMove);
        this.removeEventListener('pointerup', this._onPointerUp);
        this.removeEventListener('pointercancel', this._onPointerUp);
    }

    /* ── Keyboard ─────────────────────────────────────────────── */

    private _onKeyDown = (e: KeyboardEvent): void => {
        if (this.disabled) return;

        const step = e.shiftKey ? 10 : 1;
        let handled = true;

        switch (e.key) {
            case 'ArrowLeft':
                this._setPosition(this.position - step);
                break;
            case 'ArrowRight':
                this._setPosition(this.position + step);
                break;
            case 'Home':
                this._setPosition(0);
                break;
            case 'End':
                this._setPosition(100);
                break;
            default:
                handled = false;
        }

        if (handled) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    /* ── Render ────────────────────────────────────────────────── */

    override render() {
        const pos = this._clamp(this.position);

        return html`
            <div class="base" part="base">
                <div class="after" part="after">
                    <slot name="after"></slot>
                </div>

                <div
                    class="before"
                    part="before"
                    style="clip-path: inset(0 ${100 - pos}% 0 0)"
                >
                    <slot name="before"></slot>
                </div>

                <div
                    class="divider"
                    part="divider"
                    style="left: ${pos}%"
                ></div>

                <div
                    class="handle"
                    part="handle"
                    role="slider"
                    tabindex="${this.disabled ? -1 : 0}"
                    aria-label="Image comparison slider"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow="${pos}"
                    aria-disabled="${this.disabled ? 'true' : 'false'}"
                    style="left: ${pos}%"
                >
                    <slot name="handle">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M15 18l6-6-6-6M9 6l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
                        </svg>
                    </slot>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-image-comparer': FlintImageComparer;
    }
}
