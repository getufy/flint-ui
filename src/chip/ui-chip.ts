import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

@customElement('ui-chip')
export class UiChip extends LitElement {
    static styles = css`
    :host {
      display: inline-block;
      vertical-align: middle;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
    }

    .chip {
      display: inline-flex;
      align-items: center;
      height: 32px;
      padding: 0 12px;
      border-radius: 16px;
      font-size: 14px;
      font-weight: 500;
      white-space: nowrap;
      transition: all 0.2s ease;
      background-color: var(--ui-surface-background-flat, #f3f4f6);
      color: var(--ui-text-color, #111827);
      border: 1px solid transparent;
      user-select: none;
      gap: 8px;
      outline: none;
      overflow: hidden;
    }

    .chip.clickable {
      cursor: pointer;
    }

    .chip.clickable:hover:not(.disabled) {
      background-color: var(--ui-hover-color, #e5e7eb);
    }

    .chip.clickable:active:not(.disabled) {
      background-color: var(--ui-active-color, #d1d5db);
    }

    .chip.outlined {
      background-color: transparent;
      border-color: var(--ui-input-border-color, #d1d5db);
    }

    .chip.primary:not(.outlined) {
      background-color: var(--ui-primary-color, #3b82f6);
      color: white;
    }

    .chip.secondary:not(.outlined) {
      background-color: var(--ui-secondary-color, #6b7280);
      color: white;
    }

    .chip.outlined.primary {
      color: var(--ui-primary-color, #3b82f6);
      border-color: var(--ui-primary-color, #3b82f6);
    }

    .chip.outlined.secondary {
      color: var(--ui-secondary-color, #6b7280);
      border-color: var(--ui-secondary-color, #6b7280);
    }

    .chip.primary.clickable:hover:not(.disabled) {
      filter: brightness(0.9);
      box-shadow: var(--ui-shadow-sm);
    }

    .chip.secondary.clickable:hover:not(.disabled) {
      filter: brightness(0.9);
      box-shadow: var(--ui-shadow-sm);
    }

    .chip.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .chip:focus-visible {
      outline: 2px solid var(--ui-primary-color, #3b82f6);
      outline-offset: 2px;
    }

    .delete-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      margin-right: -4px;
      cursor: pointer;
      color: inherit;
      opacity: 0.7;
      transition: opacity 0.2s, background-color 0.2s;
      outline: none;
    }

    .delete-icon:hover {
      opacity: 1;
      background-color: rgba(0, 0, 0, 0.1);
    }

    .delete-icon:focus-visible {
      opacity: 1;
      outline: 2px solid currentColor;
      outline-offset: 1px;
    }

    .chip.disabled .delete-icon {
      cursor: not-allowed;
      pointer-events: none;
    }

    ::slotted([slot="avatar"]) {
      --ui-avatar-size: 24px;
      width: 24px;
      height: 24px;
      margin-left: -8px;
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;
    }

    ::slotted([slot="icon"]) {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      margin-left: -4px;
      flex-shrink: 0;
      line-height: 1;
    }
  `;

    @property({ type: String }) label = '';
    @property({ type: String }) variant: 'filled' | 'outlined' = 'filled';
    @property({ type: String }) color: 'default' | 'primary' | 'secondary' = 'default';
    @property({ type: Boolean }) clickable = false;
    @property({ type: Boolean }) deletable = false;
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
        this.dispatchEvent(new CustomEvent('delete', {
            bubbles: true,
            composed: true
        }));
    }

    private _handleDeleteKeyDown(e: KeyboardEvent) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        e.stopPropagation();
        if (!this.disabled) {
            this.dispatchEvent(new CustomEvent('delete', {
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
            secondary: this.color === 'secondary'
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
        'ui-chip': UiChip;
    }
}
