import { LitElement, unsafeCSS, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import uiButtonGroupStyles from './ui-button-group.css?inline';

@customElement('ui-button-group')
export class UiButtonGroup extends LitElement {
    static styles = unsafeCSS(uiButtonGroupStyles);

    render() {
        return html`
      <slot></slot>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-button-group': UiButtonGroup;
    }
}
