import { LitElement, unsafeCSS, html, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import uiSnackbarStyles from './flint-snackbar.css?inline';

/**
 * Snackbars (also known as toasts) are used for brief notifications.
 * They appear temporarily and float above the UI.
 *
 * @slot action - The action to display inside the snackbar.
 * @slot - Optional content to display inside the snackbar, such as a message or a flint-alert.
 *
 * @csspart snackbar - The inner snackbar container.
 *
 * @cssprop --flint-snackbar-min-width     - Minimum width (default: 288px)
 * @cssprop --flint-snackbar-max-width     - Maximum width (default: 560px)
 * @cssprop --flint-snackbar-bg            - Background color for default variant (default: #313131)
 * @cssprop --flint-snackbar-color         - Text color (default: #fff)
 * @cssprop --flint-snackbar-z-index       - Stack order (default: 1400)
 * @cssprop --flint-snackbar-offset        - Distance from viewport edge (default: 24px)
 * @cssprop --flint-snackbar-bg-info       - Background for info variant (default: #0288d1)
 * @cssprop --flint-snackbar-bg-success    - Background for success variant (default: #2e7d32)
 * @cssprop --flint-snackbar-bg-warning    - Background for warning variant (default: #ed6c02)
 * @cssprop --flint-snackbar-bg-error      - Background for error variant (default: #d32f2f)
 *
 * @fires flint-snackbar-open  - Fired when the snackbar opens (bubbles, composed)
 * @fires flint-snackbar-close - Fired when the snackbar closes (bubbles, composed)
 */
@customElement('flint-snackbar')
export class FlintSnackbar extends LitElement {
    static styles = unsafeCSS(uiSnackbarStyles);

    /** Whether the snackbar is open. */
    @property({ type: Boolean, reflect: true }) open = false;

    /** The message to display (slot fallback). */
    @property({ type: String }) message = '';

    /**
     * Duration in milliseconds before the snackbar auto-closes.
     * Set to 0 to disable auto-close.
     */
    @property({ type: Number, attribute: 'auto-hide-duration' }) autoHideDuration = 5000;

    /**
     * Position of the snackbar.
     * Format: 'vertical-horizontal' e.g. 'bottom-center', 'top-right'
     */
    @property({ type: String, attribute: 'anchor-origin', reflect: true }) anchorOrigin:
        'top-left' | 'top-center' | 'top-right' |
        'bottom-left' | 'bottom-center' | 'bottom-right' = 'bottom-center';

    /** Pause the auto-hide timer while the user hovers over the snackbar. */
    @property({ type: Boolean, attribute: 'pause-on-hover' }) pauseOnHover = true;

    /** Show a dismiss (✕) button. */
    @property({ type: Boolean, reflect: true }) closable = false;

    /** Visual style variant. */
    @property({ type: String, reflect: true }) variant:
        'default' | 'info' | 'success' | 'warning' | 'error' = 'default';

    @state() private _hasAction = false;

    private _timer: ReturnType<typeof setTimeout> | null = null;
    private _remainingTime = 0;
    private _timerStartedAt = 0;

    updated(changed: PropertyValues) {
        if (changed.has('open')) {
            if (this.open) {
                this._remainingTime = this.autoHideDuration;
                this._startTimer(this._remainingTime);
                this.dispatchEvent(new CustomEvent('flint-snackbar-open', { bubbles: true, composed: true }));
            } else {
                this._clearTimer();
                this.dispatchEvent(new CustomEvent('flint-snackbar-close', { bubbles: true, composed: true }));
            }
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._clearTimer();
    }

    private _startTimer(duration: number) {
        this._clearTimer();
        if (duration > 0) {
            this._timerStartedAt = Date.now();
            this._timer = setTimeout(() => this.close(), duration);
        }
    }

    private _clearTimer() {
        if (this._timer) {
            clearTimeout(this._timer);
            this._timer = null;
        }
    }

    private _handleMouseEnter() {
        if (!this.pauseOnHover || !this.open || this._timer === null) return;
        // Snapshot remaining time at hover start so fake-timer tests work correctly
        const elapsed = Date.now() - this._timerStartedAt;
        this._remainingTime = Math.max(0, this._remainingTime - elapsed);
        this._clearTimer();
    }

    private _handleMouseLeave() {
        if (!this.pauseOnHover || !this.open) return;
        this._startTimer(this._remainingTime);
    }

    private _handleActionSlotChange(e: Event) {
        const slot = e.target as HTMLSlotElement;
        this._hasAction = slot.assignedNodes({ flatten: true }).length > 0;
    }

    /** Closes the snackbar. */
    close() {
        this.open = false;
    }

    render() {
        const classes = { snackbar: true, open: this.open };
        const actionClasses = { action: true, hidden: !this._hasAction };

        return html`
            <div
                class=${classMap(classes)}
                part="snackbar"
                role="status"
                aria-live="polite"
                aria-atomic="true"
                @mouseenter=${this._handleMouseEnter}
                @mouseleave=${this._handleMouseLeave}
            >
                <div class="message">
                    <slot>${this.message}</slot>
                </div>
                <div class=${classMap(actionClasses)}>
                    <slot name="action" @slotchange=${this._handleActionSlotChange}></slot>
                </div>
                ${this.closable ? html`
                    <button class="close-btn" aria-label="Close" @click=${() => this.close()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                ` : ''}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-snackbar': FlintSnackbar;
    }
}
