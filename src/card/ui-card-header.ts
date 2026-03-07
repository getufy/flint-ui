import { LitElement, unsafeCSS, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import uiCardHeaderStyles from './ui-card-header.css?inline';

@customElement('ui-card-header')
export class UiCardHeader extends LitElement {
    static styles = unsafeCSS(uiCardHeaderStyles);

    @property({ type: String })
    title = '';

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
        'ui-card-header': UiCardHeader;
    }
}
