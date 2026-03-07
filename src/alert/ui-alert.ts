import { LitElement, unsafeCSS, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import uiAlertStyles from './ui-alert.css?inline';

/**
 * Alerts display brief messages for the user without interrupting their use of the app.
 * 
 * @slot - The message content of the alert.
 * @slot icon - Optional icon to display instead of the default severity icon.
 */
@customElement('ui-alert')
export class UiAlert extends LitElement {
    static styles = unsafeCSS(uiAlertStyles);

    /**
     * The severity level of the alert.
     */
    @property({ type: String }) severity: 'info' | 'success' | 'warning' | 'error' = 'info';

    /**
     * An optional title for the alert.
     */
    @property({ type: String }) title = '';

    /**
     * Whether the alert can be dismissed by the user.
     */
    @property({ type: Boolean }) dismissible = false;

    private _closeTimer?: ReturnType<typeof setTimeout>;

    disconnectedCallback() {
        super.disconnectedCallback();
        clearTimeout(this._closeTimer);
    }

    private _handleClose() {
        this.dispatchEvent(new CustomEvent('ui-alert-close', {
            bubbles: true,
            composed: true,
            detail: { severity: this.severity }
        }));

        // Typical behavior for a simple alert is to remove it from the DOM
        this.style.opacity = '0';
        this.style.transform = 'translateY(-4px)';
        this.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

        this._closeTimer = setTimeout(() => {
            this.remove();
        }, 200);
    }

    private _getIcon() {
        switch (this.severity) {
            case 'success':
                return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
            case 'warning':
                return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
            case 'error':
                return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
            default: // info
                return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
        }
    }

    render() {
        return html`
            <div class="alert ${classMap({ [this.severity]: true })}" role="alert">
                <div class="icon">
                    <slot name="icon">${this._getIcon()}</slot>
                </div>
                <div class="content">
                    ${this.title ? html`<div class="title">${this.title}</div>` : ''}
                    <div class="message">
                        <slot></slot>
                    </div>
                </div>
                ${this.dismissible ? html`
                    <button class="close-button" @click=${this._handleClose} aria-label="Close">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px;">
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
        'ui-alert': UiAlert;
    }
}
