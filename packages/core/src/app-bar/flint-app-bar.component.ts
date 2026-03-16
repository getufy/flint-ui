import { unsafeCSS, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import uiAppBarStyles from './flint-app-bar.css?inline';

/**
 * flint-app-bar: The top App bar provides content and actions related to the current screen.
 *
 * @slot navigation - Left section, e.g. menu button (alias: `start-content`).
 * @slot start-content - Alias for `navigation` slot.
 * @slot title - Center section next to the title prop.
 * @slot actions - Right section, e.g. action buttons (alias: `end-content`).
 * @slot end-content - Alias for `actions` slot.
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
    })}" part="base">
        <div class="left-section" part="navigation">
          <slot name="navigation"></slot>
          <slot name="start-content"></slot>
        </div>

        <div class="title" part="title">
          ${this.title}<slot name="title"></slot>
        </div>

        <div class="right-section" part="actions">
          <slot name="actions"></slot>
          <slot name="end-content"></slot>
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
