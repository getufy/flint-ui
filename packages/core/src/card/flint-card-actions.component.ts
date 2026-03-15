import { unsafeCSS, html } from 'lit';
import { FlintElement } from '../flint-element.js';
import uiCardActionsStyles from './flint-card-actions.css?inline';

export class FlintCardActions extends FlintElement {
    static styles = unsafeCSS(uiCardActionsStyles);

    render() {
        return html`
      <slot></slot>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-card-actions': FlintCardActions;
    }
}
