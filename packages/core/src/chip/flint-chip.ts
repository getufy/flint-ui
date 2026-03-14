import { LitElement, unsafeCSS, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import uiChipStyles from './flint-chip.css?inline';

/**
 * Chip: a compact element representing an input, attribute, or action.
 *
 * @fires flint-chip-delete - Fired when the chip's delete icon is clicked.
 */
@customElement('flint-chip')
export class FlintChip extends LitElement {
    static styles = unsafeCSS(uiChipStyles);

    /** Text content displayed inside the chip. */
    @property({ type: String }) label = '';
    /** Visual style variant of the chip. */
    @property({ type: String }) variant: 'filled' | 'outlined' = 'filled';
    /** Color theme applied to the chip. */
    @property({ type: String }) color: 'default' | 'primary' | 'secondary' = 'default';
    /** Size of the chip. */
    @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
    /** Whether the chip responds to click interactions. */
    @property({ type: Boolean }) clickable = false;
    /** Whether the chip shows a delete icon. */
    @property({ type: Boolean }) deletable = false;
    /** Disables the chip and prevents interaction. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    private _handleClick(e: Event) {
        // Always stop the native shadow-DOM click from also bubbling to the host,
        // preventing the handler from firing twice (once natively, once re-dispatched).
        e.stopPropagation();
        if (this.disabled || !this.clickable) return;
        this.dispatchEvent(new CustomEvent('click', {
            bubbles: true,
            composed: true
        }));
    }

    private _handleKeyDown(e: KeyboardEvent) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        if (!this.disabled && this.clickable) {
            this.dispatchEvent(new CustomEvent('click', {
                bubbles: true,
                composed: true
            }));
        }
    }

    private _handleDelete(e: Event) {
        e.stopPropagation();
        if (this.disabled) return;
        this.dispatchEvent(new CustomEvent('flint-chip-delete', {
            bubbles: true,
            composed: true
        }));
    }

    private _handleDeleteKeyDown(e: KeyboardEvent) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        e.stopPropagation();
        if (!this.disabled) {
            this.dispatchEvent(new CustomEvent('flint-chip-delete', {
                bubbles: true,
                composed: true
            }));
        }
    }

    render() {
        const classes = {
            chip: true,
            clickable: this.clickable,
            disabled: this.disabled,
            outlined: this.variant === 'outlined',
            primary: this.color === 'primary',
            secondary: this.color === 'secondary',
            'size-sm': this.size === 'sm',
            'size-lg': this.size === 'lg',
        };

        return html`
      <div
        class=${classMap(classes)}
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
        role=${ifDefined(this.clickable ? 'button' : undefined)}
        tabindex=${this.clickable && !this.disabled ? '0' : '-1'}
        aria-disabled=${this.disabled ? 'true' : 'false'}
      >
        <slot name="avatar"></slot>
        <slot name="icon"></slot>
        <span class="label">${this.label}</span>
        ${this.deletable ? html`
          <span
            class="delete-icon"
            @click=${this._handleDelete}
            @keydown=${this._handleDeleteKeyDown}
            tabindex=${this.disabled ? '-1' : '0'}
            role="button"
            aria-label="Remove ${this.label}"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
            </svg>
          </span>
        ` : ''}
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-chip': FlintChip;
    }
}
