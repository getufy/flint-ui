import { unsafeCSS, html } from 'lit';
import { FlintElement } from '../flint-element.js';
import uiButtonGroupStyles from './flint-button-group.css?inline';

export class FlintButtonGroup extends FlintElement {
    static styles = unsafeCSS(uiButtonGroupStyles);

    connectedCallback() {
        super.connectedCallback();
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'group');
        }
    }

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
