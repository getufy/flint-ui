import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * ui-app-bar: The top App bar provides content and actions related to the current screen.
 */
@customElement('ui-app-bar')
export class UiAppBar extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
      --ui-app-bar-height: 64px;
      --ui-app-bar-bg: var(--ui-primary-color, #3b82f6);
      --ui-app-bar-color: var(--ui-text-color-on-primary, #ffffff);
      --ui-app-bar-shadow: var(--ui-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
      z-index: 1100;
    }

    :host([position="fixed"]) {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
    }

    :host([position="absolute"]) {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }

    :host([position="sticky"]) {
      position: sticky;
      top: 0;
    }

    header {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      width: 100%;
      height: var(--ui-app-bar-height);
      padding: 0 16px;
      background-color: var(--ui-app-bar-bg);
      color: var(--ui-app-bar-color);
      box-shadow: var(--ui-app-bar-shadow);
      position: relative;
    }

    header.variant-outlined {
      background-color: var(--ui-surface-background, #ffffff);
      color: var(--ui-text-color, #111827);
      border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
      box-shadow: none;
    }

    .title {
      flex-grow: 1;
      min-width: 0;
      margin: 0 16px;
      font-family: var(--ui-font-family, sans-serif);
      font-size: 1.25rem;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .left-section, .right-section {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      gap: 8px;
    }
  `;

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
