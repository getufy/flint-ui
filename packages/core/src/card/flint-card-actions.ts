import { LitElement, unsafeCSS, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import uiCardActionsStyles from './flint-card-actions.css?inline';

@customElement('flint-card-actions')
export class FlintCardActions extends LitElement {
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
