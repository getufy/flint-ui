import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type ContainerMaxWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;

@customElement('ui-container')
export class UiContainer extends LitElement {
    static styles = css`
    :host {
      display: block;
    }

    .container {
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      box-sizing: border-box;
      padding-left: var(--ui-container-padding, 16px);
      padding-right: var(--ui-container-padding, 16px);
    }

    @media (min-width: 600px) {
      .container {
        padding-left: var(--ui-container-padding-sm, 24px);
        padding-right: var(--ui-container-padding-sm, 24px);
      }
    }

    .disable-gutters {
      padding-left: 0;
      padding-right: 0;
    }

    /* Max Widths */
    .max-width-xs { max-width: var(--ui-container-xs, 444px); }
    .max-width-sm { max-width: var(--ui-container-sm, 600px); }
    .max-width-md { max-width: var(--ui-container-md, 900px); }
    .max-width-lg { max-width: var(--ui-container-lg, 1200px); }
    .max-width-xl { max-width: var(--ui-container-xl, 1536px); }

    /* Fixed behavior: step through breakpoints */
    .fixed { max-width: var(--ui-container-xs, 444px); }
    @media (min-width: 600px) {
      .fixed { max-width: var(--ui-container-sm, 600px); }
    }
    @media (min-width: 900px) {
      .fixed { max-width: var(--ui-container-md, 900px); }
    }
    @media (min-width: 1200px) {
      .fixed { max-width: var(--ui-container-lg, 1200px); }
    }
    @media (min-width: 1536px) {
      .fixed { max-width: var(--ui-container-xl, 1536px); }
    }

    /* Cap fixed containers at their maxWidth (higher specificity = 2 classes) */
    @media (min-width: 600px) {
      .fixed.max-width-xs { max-width: var(--ui-container-xs, 444px); }
    }
    @media (min-width: 900px) {
      .fixed.max-width-sm { max-width: var(--ui-container-sm, 600px); }
    }
    @media (min-width: 1200px) {
      .fixed.max-width-md { max-width: var(--ui-container-md, 900px); }
    }
    @media (min-width: 1536px) {
      .fixed.max-width-lg { max-width: var(--ui-container-lg, 1200px); }
    }
  `;

    /**
     * Determine the max-width of the container.
     * The container width grows with the size of the screen.
     * Set to `false` to disable `maxWidth`.
     */
    @property({
        attribute: 'max-width',
        reflect: true,
        converter: {
            fromAttribute: (value: string | null): ContainerMaxWidth =>
                value === null || value === 'false' ? false : value as ContainerMaxWidth,
            toAttribute: (value: ContainerMaxWidth): string | null =>
                value === false ? null : value,
        },
    }) maxWidth: ContainerMaxWidth = 'lg';

    /**
     * If `true`, the left and right padding is removed.
     */
    @property({ type: Boolean, attribute: 'disable-gutters', reflect: true }) disableGutters = false;

    /**
     * Set the max-width to match the min-width of the current breakpoint.
     * This logic is handled via CSS media queries.
     */
    @property({ type: Boolean, reflect: true }) fixed = false;

    render() {
        return html`
      <div class=${classMap({
            container: true,
            [`max-width-${this.maxWidth}`]: this.maxWidth !== false,
            'disable-gutters': this.disableGutters,
            fixed: this.fixed
        })}>
        <slot></slot>
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-container': UiContainer;
    }
}
