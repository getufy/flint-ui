import { unsafeCSS, html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import uiListStyles from './flint-list.css?inline';
import uiListItemStyles from './flint-list-item.css?inline';
import uiListItemButtonStyles from './flint-list-item-button.css?inline';
import uiListItemIconStyles from './flint-list-item-icon.css?inline';
import uiListItemAvatarStyles from './flint-list-item-avatar.css?inline';
import uiListItemTextStyles from './flint-list-item-text.css?inline';
import uiListSubheaderStyles from './flint-list-subheader.css?inline';
import { FlintElement } from '../flint-element.js';

/**
 * flint-list: A wrapper for list items.
 * @csspart base - The component's base wrapper element.
 */
export class FlintList extends FlintElement {
    static styles = unsafeCSS(uiListStyles);

    /** Whether to disable the default padding on the list. */
    @property({ type: Boolean, reflect: true, attribute: 'disable-padding' }) disablePadding = false;
    /** Whether to use compact spacing for list items. */
    @property({ type: Boolean, reflect: true }) dense = false;

    render() {
        return html`<ul role="list" part="base"><slot></slot></ul>`;
    }
}

/**
 * flint-list-item: A common list item.
 */
export class FlintListItem extends FlintElement {
    static styles = unsafeCSS(uiListItemStyles);

    render() {
        return html`<li role="listitem" part="base"><slot></slot></li>`;
    }
}

/**
 * flint-list-item-button: An action element inside a list item.
 */
export class FlintListItemButton extends FlintElement {
    static styles = unsafeCSS(uiListItemButtonStyles);

    /** Whether the list item button is disabled. */
    @property({ type: Boolean, reflect: true }) disabled = false;
    /** Whether the list item button is selected. */
    @property({ type: Boolean, reflect: true }) selected = false;

    override connectedCallback() {
        super.connectedCallback();
        // Host acts as a listitem so ul[role="list"] sees a valid child,
        // while the inner element carries the button semantics.
        if (this._internals) this._internals.role = 'listitem';
    }

    private _handleKeydown = (e: KeyboardEvent) => {
        if (this.disabled) return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    };

    private _handleClick = (e: MouseEvent) => {
        if (this.disabled) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    render() {
        return html`
      <div
        role="button"
        part="base"
        tabindex=${this.disabled ? '-1' : '0'}
        aria-disabled=${this.disabled ? 'true' : nothing}
        aria-current=${this.selected ? 'true' : nothing}
        @keydown=${this._handleKeydown}
        @click=${this._handleClick}
      ><slot></slot></div>
    `;
    }
}

/**
 * flint-list-item-icon: An icon wrapper inside a list item.
 */
export class FlintListItemIcon extends FlintElement {
    static styles = unsafeCSS(uiListItemIconStyles);

    render() {
        return html`<slot></slot>`;
    }
}

/**
 * flint-list-item-avatar: An avatar wrapper inside a list item.
 */
export class FlintListItemAvatar extends FlintElement {
    static styles = unsafeCSS(uiListItemAvatarStyles);

    render() {
        return html`<slot></slot>`;
    }
}

/**
 * flint-list-item-text: A container for text content.
 *
 * @slot primary - Rich primary content; takes visual precedence over the `primary` prop.
 * @slot secondary - Rich secondary content; takes visual precedence over the `secondary` prop.
 */
export class FlintListItemText extends FlintElement {
    static styles = unsafeCSS(uiListItemTextStyles);

    /** Plain-text primary content; for rich content (HTML, icons), use the `primary` slot instead. */
    @property({ type: String }) primary = '';
    /** Plain-text secondary content; for rich content (HTML, icons), use the `secondary` slot instead. */
    @property({ type: String }) secondary = '';

    @state() private _hasSecondarySlot = false;

    private _onSecondarySlotChange = (e: Event) => {
        const slot = e.target as HTMLSlotElement;
        this._hasSecondarySlot = slot.assignedNodes({ flatten: true }).length > 0;
    };

    render() {
        const showSecondary = !!this.secondary || this._hasSecondarySlot;
        return html`
      <span class="primary" part="primary">${this.primary}<slot name="primary"></slot></span>
      <span class="secondary" part="secondary" style=${showSecondary ? '' : 'display:none'}>
        ${this.secondary}<slot name="secondary" @slotchange=${this._onSecondarySlotChange}></slot>
      </span>
    `;
    }
}

/**
 * flint-list-subheader: A label for a nested list.
 */
export class FlintListSubheader extends FlintElement {
    static styles = unsafeCSS(uiListSubheaderStyles);

    render() {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-list': FlintList;
        'flint-list-item': FlintListItem;
        'flint-list-item-button': FlintListItemButton;
        'flint-list-item-icon': FlintListItemIcon;
        'flint-list-item-avatar': FlintListItemAvatar;
        'flint-list-item-text': FlintListItemText;
        'flint-list-subheader': FlintListSubheader;
    }
}
