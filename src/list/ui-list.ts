import { LitElement, unsafeCSS, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import uiListStyles from './ui-list.css?inline';
import uiListItemStyles from './ui-list-item.css?inline';
import uiListItemButtonStyles from './ui-list-item-button.css?inline';
import uiListItemIconStyles from './ui-list-item-icon.css?inline';
import uiListItemAvatarStyles from './ui-list-item-avatar.css?inline';
import uiListItemTextStyles from './ui-list-item-text.css?inline';
import uiListSubheaderStyles from './ui-list-subheader.css?inline';

/**
 * ui-list: A wrapper for list items.
 */
@customElement('ui-list')
export class UiList extends LitElement {
    static styles = unsafeCSS(uiListStyles);

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
    static styles = unsafeCSS(uiListItemStyles);

    render() {
        return html`<li role="listitem"><slot></slot></li>`;
    }
}

/**
 * ui-list-item-button: An action element inside a list item.
 */
@customElement('ui-list-item-button')
export class UiListItemButton extends LitElement {
    static styles = unsafeCSS(uiListItemButtonStyles);

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
    static styles = unsafeCSS(uiListItemIconStyles);

    render() {
        return html`<slot></slot>`;
    }
}

/**
 * ui-list-item-avatar: An avatar wrapper inside a list item.
 */
@customElement('ui-list-item-avatar')
export class UiListItemAvatar extends LitElement {
    static styles = unsafeCSS(uiListItemAvatarStyles);

    render() {
        return html`<slot></slot>`;
    }
}

/**
 * ui-list-item-text: A container for text content.
 */
@customElement('ui-list-item-text')
export class UiListItemText extends LitElement {
    static styles = unsafeCSS(uiListItemTextStyles);

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
    static styles = unsafeCSS(uiListSubheaderStyles);

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
