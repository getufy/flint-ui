import { LitElement, unsafeCSS, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import uiCardActionsStyles from './ui-card-actions.css?inline';

@customElement('ui-card-actions')
export class UiCardActions extends LitElement {
    static styles = unsafeCSS(uiCardActionsStyles);

    render() {
        return html`
      <slot></slot>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-card-actions': UiCardActions;
    }
}
