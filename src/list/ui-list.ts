import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * ui-list: A wrapper for list items.
 */
@customElement('ui-list')
export class UiList extends LitElement {
    static styles = css`
    :host {
      display: block;
      padding: 8px 0;
      margin: 0;
      list-style: none;
      background-color: var(--ui-surface-background, white);
    }
    :host([disable-padding]) {
      padding: 0;
    }
    :host([dense]) {
      --ui-list-item-padding: 4px 16px;
      --ui-list-item-gap: 8px;
    }
  `;

    @property({ type: Boolean, reflect: true, attribute: 'disable-padding' }) disablePadding = false;
    @property({ type: Boolean, reflect: true }) dense = false;

    render() {
        return html`<ul role="list" style="margin: 0; padding: 0; list-style: none;"><slot></slot></ul>`;
    }
}

/**
 * ui-list-item: A common list item.
 */
@customElement('ui-list-item')
export class UiListItem extends LitElement {
    static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
    }
    li {
      display: flex;
      align-items: center;
      padding: var(--ui-list-item-padding, 8px 16px);
      gap: var(--ui-list-item-gap, 16px);
      list-style: none;
    }
  `;

    render() {
        return html`<li role="listitem"><slot></slot></li>`;
    }
}

/**
 * ui-list-item-button: An action element inside a list item.
 */
@customElement('ui-list-item-button')
export class UiListItemButton extends LitElement {
    static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
    }
    li {
      display: flex;
      align-items: center;
      padding: var(--ui-list-item-padding, 8px 16px);
      gap: var(--ui-list-item-gap, 16px);
      cursor: pointer;
      transition: background-color 0.2s ease;
      user-select: none;
      list-style: none;
      outline: none;
    }
    li:hover {
      background-color: var(--ui-hover-color, rgba(0, 0, 0, 0.04));
    }
    li:active {
      background-color: var(--ui-active-color, rgba(0, 0, 0, 0.08));
    }
    li:focus-visible {
      background-color: var(--ui-hover-color, rgba(0, 0, 0, 0.04));
      box-shadow: inset 0 0 0 2px var(--ui-primary-color, #3b82f6);
    }
    :host([selected]) li {
      background-color: var(--ui-selected-color, rgba(59, 130, 246, 0.1));
      color: var(--ui-primary-color, #3b82f6);
    }
    :host([disabled]) li {
      opacity: 0.5;
      cursor: default;
      pointer-events: none;
    }
  `;

    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) selected = false;

    private _handleKeydown = (e: KeyboardEvent) => {
        if (this.disabled) return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    };

    render() {
        return html`
      <li
        role="button"
        tabindex=${this.disabled ? '-1' : '0'}
        aria-disabled=${this.disabled ? 'true' : nothing}
        aria-current=${this.selected ? 'true' : nothing}
        @keydown=${this._handleKeydown}
      ><slot></slot></li>
    `;
    }
}

/**
 * ui-list-item-icon: An icon wrapper inside a list item.
 */
@customElement('ui-list-item-icon')
export class UiListItemIcon extends LitElement {
    static styles = css`
    :host {
      display: inline-flex;
      min-width: 40px;
      color: var(--ui-text-color-muted, #6b7280);
      flex-shrink: 0;
    }
    ::slotted(*) {
        width: 24px;
        height: 24px;
    }
  `;

    render() {
        return html`<slot></slot>`;
    }
}

/**
 * ui-list-item-avatar: An avatar wrapper inside a list item.
 */
@customElement('ui-list-item-avatar')
export class UiListItemAvatar extends LitElement {
    static styles = css`
    :host {
      display: inline-flex;
      min-width: 56px;
      flex-shrink: 0;
    }
  `;

    render() {
        return html`<slot></slot>`;
    }
}

/**
 * ui-list-item-text: A container for text content.
 */
@customElement('ui-list-item-text')
export class UiListItemText extends LitElement {
    static styles = css`
    :host {
      flex: 1 1 auto;
      margin-top: 4px;
      margin-bottom: 4px;
    }
    .primary {
      display: block;
      font-family: var(--ui-font-family, sans-serif);
      font-size: 1rem;
      color: var(--ui-text-color, #111827);
      line-height: 1.5;
    }
    .secondary {
      display: block;
      font-family: var(--ui-font-family, sans-serif);
      font-size: 0.875rem;
      color: var(--ui-text-color-muted, #6b7280);
      line-height: 1.43;
    }
  `;

    @property({ type: String }) primary = '';
    @property({ type: String }) secondary = '';

    @state() private _hasSecondarySlot = false;

    private _onSecondarySlotChange(e: Event) {
        const slot = e.target as HTMLSlotElement;
        this._hasSecondarySlot = slot.assignedNodes({ flatten: true }).length > 0;
    }

    render() {
        const showSecondary = !!this.secondary || this._hasSecondarySlot;
        return html`
      <span class="primary">${this.primary}<slot name="primary"></slot></span>
      <span class="secondary" style=${showSecondary ? '' : 'display:none'}>
        ${this.secondary}<slot name="secondary" @slotchange=${this._onSecondarySlotChange}></slot>
      </span>
    `;
    }
}

/**
 * ui-list-subheader: A label for a nested list.
 */
@customElement('ui-list-subheader')
export class UiListSubheader extends LitElement {
    static styles = css`
    :host {
      display: block;
      padding: 16px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--ui-text-color-muted, #6b7280);
      font-family: var(--ui-font-family, sans-serif);
      line-height: 1;
    }
  `;

    render() {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-list': UiList;
        'ui-list-item': UiListItem;
        'ui-list-item-button': UiListItemButton;
        'ui-list-item-icon': UiListItemIcon;
        'ui-list-item-avatar': UiListItemAvatar;
        'ui-list-item-text': UiListItemText;
        'ui-list-subheader': UiListSubheader;
    }
}
