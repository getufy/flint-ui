import { unsafeCSS, html } from 'lit';
import { FlintElement } from '../flint-element.js';
import uiCardActionAreaStyles from './flint-card-action-area.css?inline';

export class FlintCardActionArea extends FlintElement {
  static styles = unsafeCSS(uiCardActionAreaStyles);

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.click();
    }
  };

  render() {
    return html`
      <div class="action-area" part="action-area" @keydown=${this._handleKeyDown} tabindex="0" role="button">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'flint-card-action-area': FlintCardActionArea;
  }
}
