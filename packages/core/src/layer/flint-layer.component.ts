import { html, css } from 'lit';
import { FlintElement } from '../flint-element.js';

/**
 * A contextual layer component that bumps surface/background colors
 * for nested card-in-card or panel-in-panel patterns [§38.1].
 *
 * Each nested `<flint-layer>` increments the surface color level,
 * creating visual depth without manually managing tokens.
 *
 * @example
 * ```html
 * <flint-layer>
 *   <!-- Uses --flint-surface-1 -->
 *   <flint-card>
 *     <flint-layer>
 *       <!-- Uses --flint-surface-2 -->
 *       <flint-card>Nested card</flint-card>
 *     </flint-layer>
 *   </flint-card>
 * </flint-layer>
 * ```
 *
 * @slot - Default slot for child content.
 */
export class FlintLayer extends FlintElement {
    static styles = css`
        :host {
            display: contents;
            --flint-surface-color: var(--flint-layer-surface, var(--flint-surface-1));
            --flint-layer-surface-next: var(--flint-surface-2);
        }

        /* When inside another flint-layer (CSS cascade via light DOM nesting in theme.css) */
        ::slotted(flint-layer) {
            --flint-layer-surface: var(--flint-layer-surface-next);
            --flint-layer-surface-next: var(--flint-surface-3);
        }
    `;

    render() {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-layer': FlintLayer;
    }
}
