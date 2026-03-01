import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * Snackbars (also known as toasts) are used for brief notifications.
 * They appear temporarily and float above the UI.
 * 
 * @slot action - The action to display inside the snackbar.
 * @slot - Optional content to display inside the snackbar, such as a message or a ui-alert.
 */
@customElement('ui-snackbar')
export class UiSnackbar extends LitElement {
    static styles = css`
        :host {
            display: block;
            pointer-events: none;
            position: fixed;
            z-index: 1400;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Positions */
        :host([anchor-origin*="bottom"]) { bottom: 24px; }
        :host([anchor-origin*="top"]) { top: 24px; }
        :host([anchor-origin*="left"]) { left: 24px; }
        :host([anchor-origin*="right"]) { right: 24px; }
        :host([anchor-origin*="center"]) { 
            left: 50%;
            transform: translateX(-50%);
        }

        .snackbar {
            background-color: var(--ui-surface-background-flat, #313131);
            color: var(--ui-text-color-on-primary, #fff);
            font-family: var(--ui-font-family, 'Inter', sans-serif);
            font-size: 0.875rem;
            line-height: 1.43;
            letter-spacing: 0.01071em;
            display: flex;
            align-items: center;
            padding: 6px 16px;
            border-radius: var(--ui-border-radius-md, 4px);
            box-shadow: var(--ui-shadow-lg, 0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12));
            min-width: 288px;
            max-width: 560px;
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

        ::slotted(ui-alert) {
            margin-bottom: 0 !important;
            width: 100%;
            min-width: 288px;
        }
    `;

    /**
     * Whether the snackbar is open.
     */
    @property({ type: Boolean, reflect: true }) open = false;

    /**
     * The message to display.
     */
    @property({ type: String }) message = '';

    /**
     * The duration in milliseconds before the snackbar automatically closes.
     * Set to 0 to disable auto-close.
     */
    @property({ type: Number }) autoHideDuration = 5000;

    /**
     * The anchor origin of the snackbar.
     * Format: 'vertical-horizontal' (e.g., 'bottom-center', 'top-right')
     */
    @property({ type: String, attribute: 'anchor-origin' }) anchorOrigin:
        'top-left' | 'top-center' | 'top-right' |
        'bottom-left' | 'bottom-center' | 'bottom-right' = 'bottom-center';

    private _timer: ReturnType<typeof setTimeout> | null = null;

    updated(changedProperties: Map<string | number | symbol, unknown>) {
        if (changedProperties.has('open')) {
            if (this.open) {
                this._startTimer();
            } else {
                this._clearTimer();
            }
        }
    }

    private _startTimer() {
        this._clearTimer();
        if (this.autoHideDuration > 0) {
            this._timer = setTimeout(() => {
                this.close();
            }, this.autoHideDuration);
        }
    }

    private _clearTimer() {
        if (this._timer) {
            clearTimeout(this._timer);
            this._timer = null;
        }
    }

    /**
     * Closes the snackbar.
     */
    close() {
        this.open = false;
        this.dispatchEvent(new CustomEvent('ui-snackbar-close', {
            bubbles: true,
            composed: true
        }));
    }

    render() {
        const classes = {
            snackbar: true,
            open: this.open
        };

        return html`
            <div class=${classMap(classes)} role="presentation">
                <div class="message">
                    <slot>${this.message}</slot>
                </div>
                <div class="action">
                    <slot name="action"></slot>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-snackbar': UiSnackbar;
    }
}
