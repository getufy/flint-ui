import { LitElement, unsafeCSS, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import uiCardContentStyles from './ui-card-content.css?inline';

@customElement('ui-card-content')
export class UiCardContent extends LitElement {
    static styles = unsafeCSS(uiCardContentStyles);

    render() {
        return html`
      <slot></slot>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-card-content': UiCardContent;
    }
}
