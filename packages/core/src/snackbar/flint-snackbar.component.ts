import { unsafeCSS, html, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import { LocalizeController } from '../utilities/localize.js';
import { runOverlayAnimation } from '../utilities/animation-registry.js';
import '../utilities/animation-presets.js';
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
 * @fires flint-snackbar-open  - Fired when the snackbar opens (bubbles, composed). detail: `{ open: true }`
 * @fires flint-snackbar-close - Fired when the snackbar closes (bubbles, composed). detail: `{ open: false }`
 */
export class FlintSnackbar extends FlintElement {
    static styles = unsafeCSS(uiSnackbarStyles);

    private _localize = new LocalizeController(this);

    /** Whether the snackbar is open. */
    @property({ type: Boolean, reflect: true }) open = false;

    /**
     * Initial open state for uncontrolled usage.
     * Has no effect after the element has connected to the DOM.
     */
    @property({ type: Boolean, attribute: 'default-open' }) defaultOpen = false;

    /** The message to display (slot fallback). */
    @property({ type: String }) message = '';

    /**
     * Duration in milliseconds before the snackbar auto-closes.
     * Set to 0 to disable auto-close.
     * @default 5000
     */
    @property({ type: Number, attribute: 'auto-hide-duration' }) autoHideDuration = 5000;

    /**
     * Position of the snackbar.
     * Format: 'vertical-horizontal' e.g. 'bottom-center', 'top-right'.
     * @default 'bottom-center'
     */
    @property({ type: String, attribute: 'anchor-origin', reflect: true }) anchorOrigin:
        'top-left' | 'top-center' | 'top-right' |
        'bottom-left' | 'bottom-center' | 'bottom-right' = 'bottom-center';

    /**
     * Pause the auto-hide timer while the user hovers over the snackbar.
     * @default true
     */
    @property({ type: Boolean, attribute: 'pause-on-hover' }) pauseOnHover = true;

    /** Show a dismiss (✕) button. */
    @property({ type: Boolean, reflect: true }) closable = false;

    /**
     * Visual style variant.
     * @default 'default'
     */
    @property({ type: String, reflect: true }) variant:
        'default' | 'info' | 'success' | 'warning' | 'error' = 'default';

    private _firstUpdate = true;

    @state() private _visuallyOpen = false;
    @state() private _hasAction = false;

    private _timer: ReturnType<typeof setTimeout> | null = null;
    private _remainingTime = 0;
    private _timerStartedAt = 0;

    override willUpdate(changed: PropertyValues) {
        if (this._firstUpdate) {
            this._firstUpdate = false;
            if (this.defaultOpen && !this.open) {
                this.open = true;
            }
        }
        // Batch _visuallyOpen into the current render cycle when opening
        if (changed.has('open') && this.open) {
            this._visuallyOpen = true;
        }
    }

    updated(changed: PropertyValues) {
        if (changed.has('open')) {
            if (this.open) {
                this._remainingTime = this.autoHideDuration;
                this._startTimer(this._remainingTime);
                void this._runOpenAnimation();
                this.emit('flint-snackbar-open', { open: true });
            } else {
                this._clearTimer();
                void this._runCloseAnimation().then(() => {
                    this._visuallyOpen = false;
                });
                this.emit('flint-snackbar-close', { open: false });
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

    private async _runOpenAnimation() {
        await runOverlayAnimation(this, this.shadowRoot?.querySelector<HTMLElement>('.snackbar'), 'snackbar.show');
    }

    private async _runCloseAnimation() {
        await runOverlayAnimation(this, this.shadowRoot?.querySelector<HTMLElement>('.snackbar'), 'snackbar.hide');
    }

    private _handleMouseEnter = () => {
        if (!this.pauseOnHover || !this.open || this._timer === null) return;
        // Snapshot remaining time at hover start so fake-timer tests work correctly
        const elapsed = Date.now() - this._timerStartedAt;
        this._remainingTime = Math.max(0, this._remainingTime - elapsed);
        this._clearTimer();
    };

    private _handleMouseLeave = () => {
        if (!this.pauseOnHover || !this.open) return;
        this._startTimer(this._remainingTime);
    };

    private _handleActionSlotChange = (e: Event) => {
        const slot = e.target as HTMLSlotElement;
        this._hasAction = slot.assignedNodes({ flatten: true }).length > 0;
    };

    /** Closes the snackbar. */
    close() {
        this.open = false;
    }

    render() {
        const classes = { snackbar: true, open: this._visuallyOpen };
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
                    <button class="close-btn" aria-label=${this._localize.term('close')} @click=${() => this.close()}>
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
