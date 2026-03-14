import { LitElement, unsafeCSS, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import uiCardContentStyles from './flint-card-content.css?inline';

@customElement('flint-card-content')
export class FlintCardContent extends LitElement {
    static styles = unsafeCSS(uiCardContentStyles);

    render() {
        return html`
      <slot></slot>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-card-content': FlintCardContent;
    }
}
