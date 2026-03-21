import { unsafeCSS, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import uiContainerStyles from './flint-container.css?inline';

export type ContainerMaxWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;

const VALID_MAX_WIDTHS = new Set<string>(['xs', 'sm', 'md', 'lg', 'xl']);

export class FlintContainer extends FlintElement {
    static styles = unsafeCSS(uiContainerStyles);

    /**
     * Determine the max-width of the container.
     * The container width grows with the size of the screen.
     * Set to `false` to disable `maxWidth`.
     */
    @property({
        attribute: 'max-width',
        reflect: true,
        converter: {
            fromAttribute: (value: string | null): ContainerMaxWidth => {
                if (value === null || value === 'false') return false;
                return VALID_MAX_WIDTHS.has(value) ? value as ContainerMaxWidth : 'lg';
            },
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
        })} part="base">
        <slot></slot>
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-container': FlintContainer;
    }
}
