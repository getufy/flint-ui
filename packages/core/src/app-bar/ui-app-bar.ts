import { LitElement, unsafeCSS, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import uiAppBarStyles from './ui-app-bar.css?inline';

/**
 * ui-app-bar: The top App bar provides content and actions related to the current screen.
 */
@customElement('ui-app-bar')
export class UiAppBar extends LitElement {
  static styles = unsafeCSS(uiAppBarStyles);

  @property({ type: String }) title = '';
  @property({ type: String, reflect: true }) position: 'static' | 'fixed' | 'absolute' | 'sticky' = 'static';
  @property({ type: String, reflect: true }) variant: 'regular' | 'outlined' = 'regular';

  render() {
    return html`
      <header class="${classMap({
      'variant-outlined': this.variant === 'outlined',
    })}">
        <div class="left-section">
          <slot name="navigation"></slot>
        </div>
        
        <div class="title">
          ${this.title}<slot name="title"></slot>
        </div>

        <div class="right-section">
          <slot name="actions"></slot>
        </div>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-app-bar': UiAppBar;
  }
}
