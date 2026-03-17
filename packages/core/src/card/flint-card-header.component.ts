import { unsafeCSS, html } from 'lit';
import { property } from 'lit/decorators.js';
import { FlintElement } from '../flint-element.js';
import uiCardHeaderStyles from './flint-card-header.css?inline';

/**
 * Card Header: the header section of a card.
 *
 * @slot avatar - Avatar or icon element.
 * @slot action - Action element like an icon button.
 * @slot - Header text content.
 */
export class FlintCardHeader extends FlintElement {
    static styles = unsafeCSS(uiCardHeaderStyles);

    /** Plain text title. For rich content (icons, links), use the default slot instead. */
    @property({ type: String })
    title = '';

    /** Plain text subtitle. For rich content, use the `subtitle` named slot instead. */
    @property({ type: String })
    subtitle = '';

    render() {
        return html`
      <div class="header" part="header">
        <slot name="avatar"></slot>
        <div class="content" part="content">
          ${this.title ? html`<h3 class="title" part="title">${this.title}</h3>` : ''}
          ${this.subtitle ? html`<p class="subtitle" part="subtitle">${this.subtitle}</p>` : ''}
          <slot></slot>
        </div>
        <slot name="action"></slot>
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-card-header': FlintCardHeader;
    }
}
