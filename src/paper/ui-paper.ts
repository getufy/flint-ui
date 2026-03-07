import { LitElement, unsafeCSS, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import uiPaperStyles from './ui-paper.css?inline';

/**
 * The Paper component is a container for displaying content on an elevated surface.
 * Shadow styles are influenced by real-world physical counterparts.
 *
 * Supported elevation values: 0, 1, 2, 3, 4, 6, 8, 12, 16, 24.
 * Other numeric values are accepted but produce no visible shadow.
 */
@customElement('ui-paper')
export class UiPaper extends LitElement {
    static styles = unsafeCSS(uiPaperStyles);

    /**
     * Shadow depth. Supported values: 0, 1, 2, 3, 4, 6, 8, 12, 16, 24.
     * Other numeric values are accepted but produce no visible shadow.
     */
    @property({ type: Number, reflect: true }) elevation = 1;

    /**
     * If true, the paper will have square corners (border-radius: 0).
     */
    @property({ type: Boolean, reflect: true }) square = false;

    /**
     * Visual variant.
     * - `elevated`: raises the surface with a box-shadow (default)
     * - `outlined`: flat surface with a visible border and no shadow
     * - `flat`: flat surface with no shadow and no border
     */
    @property({ type: String, reflect: true }) variant: 'elevated' | 'outlined' | 'flat' = 'elevated';

    render() {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-paper': UiPaper;
    }
}
