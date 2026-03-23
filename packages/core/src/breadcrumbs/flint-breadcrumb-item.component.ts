import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { FlintElement } from '../flint-element.js';

/**
 * A breadcrumb item for use inside `<flint-breadcrumbs>`.
 * Renders as a plain text span or an anchor link when `href` is provided.
 *
 * @slot - Item content (text or rich content).
 */
export class FlintBreadcrumbItem extends FlintElement {
    /** When provided, renders the item as an anchor link. */
    @property({ type: String }) href?: string;

    render() {
        if (this.href) {
            return html`<a href=${this.href} part="link"><slot></slot></a>`;
        }
        return html`<span part="text"><slot></slot></span>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-breadcrumb-item': FlintBreadcrumbItem;
    }
}
