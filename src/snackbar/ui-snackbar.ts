import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * Snackbars (also known as toasts) are used for brief notifications.
 * They appear temporarily and float above the UI.
 *
 * @slot action - The action to display inside the snackbar.
 * @slot - Optional content to display inside the snackbar, such as a message or a ui-alert.
 *
 * @csspart snackbar - The inner snackbar container.
 *
 * @cssprop --ui-snackbar-min-width     - Minimum width (default: 288px)
 * @cssprop --ui-snackbar-max-width     - Maximum width (default: 560px)
 * @cssprop --ui-snackbar-bg            - Background color for default variant (default: #313131)
 * @cssprop --ui-snackbar-color         - Text color (default: #fff)
 * @cssprop --ui-snackbar-z-index       - Stack order (default: 1400)
 * @cssprop --ui-snackbar-offset        - Distance from viewport edge (default: 24px)
 * @cssprop --ui-snackbar-bg-info       - Background for info variant (default: #0288d1)
 * @cssprop --ui-snackbar-bg-success    - Background for success variant (default: #2e7d32)
 * @cssprop --ui-snackbar-bg-warning    - Background for warning variant (default: #ed6c02)
 * @cssprop --ui-snackbar-bg-error      - Background for error variant (default: #d32f2f)
 *
 * @fires ui-snackbar-open  - Fired when the snackbar opens (bubbles, composed)
 * @fires ui-snackbar-close - Fired when the snackbar closes (bubbles, composed)
 */
@customElement('ui-snackbar')
export class UiSnackbar extends LitElement {
    static styles = css`
        :host {
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            position: fixed;
            z-index: var(--ui-snackbar-z-index, 1400);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Positions */
        :host([anchor-origin*="bottom"]) { bottom: var(--ui-snackbar-offset, 24px); }
        :host([anchor-origin*="top"])    { top: var(--ui-snackbar-offset, 24px); }
        :host([anchor-origin*="left"])   { left: var(--ui-snackbar-offset, 24px); }
        :host([anchor-origin*="right"])  { right: var(--ui-snackbar-offset, 24px); }
        :host([anchor-origin*="center"]) {
            left: 50%;
            transform: translateX(-50%);
        }

        .snackbar {
            background-color: var(--ui-snackbar-bg, #313131);
            color: var(--ui-snackbar-color, #fff);
            font-family: var(--ui-font-family, 'Inter', sans-serif);
            font-size: 0.875rem;
            line-height: 1.43;
            letter-spacing: 0.01071em;
            display: flex;
            align-items: center;
            padding: 6px 16px;
            border-radius: var(--ui-border-radius-md, 4px);
            box-shadow: var(--ui-shadow-lg, 0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12));
            min-width: var(--ui-snackbar-min-width, 288px);
            max-width: var(--ui-snackbar-max-width, 560px);
            pointer-events: auto;
            opacity: 0;
            transform: scale(0.85);
            transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
            visibility: hidden;
        }

        .snackbar.open {
            opacity: 1;
            transform: scale(1);
            visibility: visible;
        }

        /* Variants */
        :host([variant="info"])    .snackbar { background-color: var(--ui-snackbar-bg-info, #0288d1); }
        :host([variant="success"]) .snackbar { background-color: var(--ui-snackbar-bg-success, #2e7d32); }
        :host([variant="warning"]) .snackbar { background-color: var(--ui-snackbar-bg-warning, #ed6c02); }
        :host([variant="error"])   .snackbar { background-color: var(--ui-snackbar-bg-error, #d32f2f); }

        .message {
            padding: 8px 0;
            flex-grow: 1;
        }

        .action {
            display: flex;
            align-items: center;
            margin-left: 8px;
            margin-right: -8px;
            padding-left: 16px;
        }

        .action.hidden {
            display: none;
        }

        .close-btn {
            background: none;
            border: none;
            color: inherit;
            cursor: pointer;
            padding: 4px 8px;
            margin-left: 8px;
            margin-right: -8px;
            opacity: 0.8;
            display: flex;
            align-items: center;
            border-radius: 2px;
            line-height: 0;
        }

        .close-btn:hover { opacity: 1; }

        ::slotted(ui-alert) {
            margin-bottom: 0 !important;
            width: 100%;
            min-width: 288px;
        }
    `;

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
                this.dispatchEvent(new CustomEvent('ui-snackbar-open', { bubbles: true, composed: true }));
            } else {
                this._clearTimer();
                this.dispatchEvent(new CustomEvent('ui-snackbar-close', { bubbles: true, composed: true }));
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
        'ui-snackbar': UiSnackbar;
    }
}
