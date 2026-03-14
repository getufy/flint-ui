import { LitElement, unsafeCSS, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import uiCardActionAreaStyles from './flint-card-action-area.css?inline';

@customElement('flint-card-action-area')
export class FlintCardActionArea extends LitElement {
  static styles = unsafeCSS(uiCardActionAreaStyles);

  render() {
    return html`
      <div class="action-area" part="action-area" @keydown=${this._handleKeyDown} tabindex="0" role="button">
        <slot></slot>
      </div>
    `;
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.click();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'flint-card-action-area': FlintCardActionArea;
  }
}
