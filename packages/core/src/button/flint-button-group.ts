import { LitElement, unsafeCSS, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import uiButtonGroupStyles from './flint-button-group.css?inline';

@customElement('flint-button-group')
export class FlintButtonGroup extends LitElement {
    static styles = unsafeCSS(uiButtonGroupStyles);

    render() {
        return html`
      <slot></slot>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-button-group': FlintButtonGroup;
    }
}
