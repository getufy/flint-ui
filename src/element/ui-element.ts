import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ui-element')
export class UiElement extends LitElement {
    static styles = css`
    :host {
      display: block;
      padding: 16px;
      color: var(--ui-element-text-color, black);
      background-color: var(--ui-element-bg-color, white);
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      font-family: sans-serif;
    }
    h1 {
      margin-top: 0;
    }
    button {
      background-color: #0056b3;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
    button:hover {
      background-color: #004494;
    }
  `;

    @property({ type: String })
    name = 'World';

    @property({ type: Number })
    count = 0;

    render() {
        return html`
      <h1>Hello, ${this.name}!</h1>
      <button @click=${this._onClick} part="button">
        Click Count: ${this.count}
      </button>
      <slot></slot>
    `;
    }

    private _onClick() {
        this.count++;
        this.dispatchEvent(new CustomEvent('count-changed', {
            detail: this.count,
            bubbles: true,
            composed: true
        }));
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-element': UiElement;
    }
}
