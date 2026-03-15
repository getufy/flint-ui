import { unsafeCSS, html } from 'lit';
import { FlintElement } from '../flint-element.js';
import uiCardContentStyles from './flint-card-content.css?inline';

export class FlintCardContent extends FlintElement {
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
