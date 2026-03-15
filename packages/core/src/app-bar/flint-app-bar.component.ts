import { unsafeCSS, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import uiAppBarStyles from './flint-app-bar.css?inline';

/**
 * flint-app-bar: The top App bar provides content and actions related to the current screen.
 *
 * @slot navigation - Left section, e.g. menu button.
 * @slot title - Center section next to the title prop.
 * @slot actions - Right section, e.g. action buttons.
 */
export class FlintAppBar extends FlintElement {
  static styles = unsafeCSS(uiAppBarStyles);

  /** Title text displayed in the center of the app bar. */
  @property({ type: String }) title = '';
  /** CSS positioning behavior of the app bar. */
  @property({ type: String, reflect: true }) position: 'static' | 'fixed' | 'absolute' | 'sticky' = 'static';
  /** Visual style variant of the app bar. */
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
    'flint-app-bar': FlintAppBar;
  }
}
