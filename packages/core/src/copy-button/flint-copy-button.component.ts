import { unsafeCSS, html, nothing, svg } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import type { Placement } from '../types.js';
import styles from './flint-copy-button.css?inline';

type CopyState = 'idle' | 'success' | 'error';

let instanceCounter = 0;

const copyIcon = svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5.5" y="5.5" width="8" height="8" rx="1.5"></rect><path d="M10.5 5.5V3a1.5 1.5 0 0 0-1.5-1.5H3A1.5 1.5 0 0 0 1.5 3v6A1.5 1.5 0 0 0 3 10.5h2.5"></path></svg>`;
const successIcon = svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3.5 8.5 6.5 11.5 12.5 4.5"></polyline></svg>`;
const errorIcon = svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="4" x2="12" y2="12"></line><line x1="12" y1="4" x2="4" y2="12"></line></svg>`;

/**
 * Copy Button: copies text to the clipboard with visual feedback.
 *
 * @fires flint-copy - Fired after a successful copy operation. detail: `{ value: string }`
 * @fires flint-copy-error - Fired when the copy operation fails. detail: `{ reason: string }`
 */
export class FlintCopyButton extends FlintElement {
    static override styles = unsafeCSS(styles);

    /** The text value to copy. */
    @property({ type: String }) value = '';

    /**
     * An id referencing another element to copy from.
     * - `from="el"` copies `textContent`
     * - `from="el[attr]"` copies an attribute value
     * - `from="el.prop"` copies a property value
     */
    @property({ type: String }) from = '';

    /** Disables the copy button. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    /** Label shown in the tooltip (idle state). */
    @property({ type: String, attribute: 'copy-label' }) copyLabel = 'Copy';

    /** Label shown in the tooltip after successful copy. */
    @property({ type: String, attribute: 'success-label' }) successLabel = 'Copied!';

    /** Label shown in the tooltip on copy error. */
    @property({ type: String, attribute: 'error-label' }) errorLabel = 'Error';

    /** Duration (ms) to show feedback before returning to idle. */
    @property({ type: Number, attribute: 'feedback-duration' }) feedbackDuration = 1000;

    /** Tooltip placement. */
    @property({ type: String, attribute: 'tooltip-placement' }) tooltipPlacement: Placement = 'top';

    private _state: CopyState = 'idle';
    private _feedbackTimer: ReturnType<typeof setTimeout> | null = null;
    private _showTooltip = false;
    private _tooltipId = `flint-copy-tooltip-${instanceCounter++}`;

    override disconnectedCallback(): void {
        super.disconnectedCallback();
        if (this._feedbackTimer !== null) {
            clearTimeout(this._feedbackTimer);
            this._feedbackTimer = null;
        }
    }

    /** Resolves the text to copy from the `from` attribute. */
    private _resolveFromValue(): string | null {
        // from="el[attr]"  — copy attribute value
        const attrMatch = this.from.match(/^(.+)\[(.+)\]$/);
        if (attrMatch) {
            const el = document.getElementById(attrMatch[1]!);
            return el ? el.getAttribute(attrMatch[2]!) : null;
        }

        // from="el.prop" — copy property value
        const propMatch = this.from.match(/^(.+)\.(.+)$/);
        if (propMatch) {
            const el = document.getElementById(propMatch[1]!);
            if (!el) return null;
            const val = (el as unknown as Record<string, unknown>)[propMatch[2]!];
            return val != null ? String(val) : null;
        }

        // from="el" — copy textContent
        const el = document.getElementById(this.from);
        return el ? el.textContent : null;
    }

    /** Returns the text to be copied. `from` takes precedence over `value`. */
    private _getTextToCopy(): string {
        if (this.from) {
            return this._resolveFromValue() ?? '';
        }
        return this.value;
    }

    private async _handleClick(): Promise<void> {
        if (this.disabled) return;

        const text = this._getTextToCopy();

        if (!text) {
            this._showFeedback('error');
            this.dispatchEvent(new CustomEvent('flint-copy-error', {
                detail: { reason: 'empty' },
                bubbles: true,
                composed: true,
            }));
            return;
        }

        try {
            await navigator.clipboard.writeText(text);
            this._showFeedback('success');
            this.dispatchEvent(new CustomEvent('flint-copy', {
                detail: { value: text },
                bubbles: true,
                composed: true,
            }));
        } catch {
            this._showFeedback('error');
            this.dispatchEvent(new CustomEvent('flint-copy-error', {
                detail: { reason: 'clipboard' },
                bubbles: true,
                composed: true,
            }));
        }
    }

    private _showFeedback(state: CopyState): void {
        if (this._feedbackTimer !== null) {
            clearTimeout(this._feedbackTimer);
        }
        this._state = state;
        this._showTooltip = true;
        this.requestUpdate();

        this._feedbackTimer = setTimeout(() => {
            this._state = 'idle';
            this._showTooltip = false;
            this._feedbackTimer = null;
            this.requestUpdate();
        }, this.feedbackDuration);
    }

    private _handleMouseEnter(): void {
        if (this._state === 'idle') {
            this._showTooltip = true;
            this.requestUpdate();
        }
    }

    private _handleMouseLeave(): void {
        if (this._state === 'idle') {
            this._showTooltip = false;
            this.requestUpdate();
        }
    }

    private _handleFocus(): void {
        if (this._state === 'idle') {
            this._showTooltip = true;
            this.requestUpdate();
        }
    }

    private _handleBlur(): void {
        if (this._state === 'idle') {
            this._showTooltip = false;
            this.requestUpdate();
        }
    }

    private _renderIcon() {
        switch (this._state) {
            case 'success':
                return html`<span class="icon icon--success" part="success-icon"><slot name="success-icon">${successIcon}</slot></span>`;
            case 'error':
                return html`<span class="icon icon--error" part="error-icon"><slot name="error-icon">${errorIcon}</slot></span>`;
            default:
                return html`<span class="icon" part="copy-icon"><slot name="copy-icon">${copyIcon}</slot></span>`;
        }
    }

    private _getTooltipLabel(): string {
        switch (this._state) {
            case 'success': return this.successLabel;
            case 'error': return this.errorLabel;
            default: return this.copyLabel;
        }
    }

    override render() {
        const label = this._getTooltipLabel();

        return html`
            <button
                class="copy-button"
                part="button"
                aria-label=${label || nothing}
                aria-describedby=${this._showTooltip && label ? this._tooltipId : nothing}
                ?disabled=${this.disabled}
                @click=${this._handleClick}
                @mouseenter=${this._handleMouseEnter}
                @mouseleave=${this._handleMouseLeave}
                @focus=${this._handleFocus}
                @blur=${this._handleBlur}
            >
                ${this._renderIcon()}
                ${label ? html`
                    <span
                        id=${this._tooltipId}
                        class=${classMap({
                            tooltip: true,
                            'tooltip--visible': this._showTooltip,
                            [`tooltip--${this.tooltipPlacement}`]: true,
                        })}
                        role="tooltip"
                    >${label}</span>
                ` : nothing}
            </button>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-copy-button': FlintCopyButton;
    }
}
