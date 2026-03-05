import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * The Paper component is a container for displaying content on an elevated surface.
 * Shadow styles are influenced by real-world physical counterparts.
 *
 * Supported elevation values: 0, 1, 2, 3, 4, 6, 8, 12, 16, 24.
 * Other numeric values are accepted but produce no visible shadow.
 */
@customElement('ui-paper')
export class UiPaper extends LitElement {
    static styles = css`
        :host {
            display: block;
            box-sizing: border-box;
            background-color: var(--ui-surface-background, #ffffff);
            color: var(--ui-text-color, #111827);
            border-radius: var(--ui-border-radius-md, 8px);
            padding: var(--ui-paper-padding, 0);
            transition:
                box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1),
                border-color 250ms cubic-bezier(0.4, 0, 0.2, 1),
                background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid transparent;
        }

        :host([square]) {
            border-radius: 0;
        }

        :host([variant="outlined"]) {
            border: 1px solid var(--ui-border-color, rgba(0, 0, 0, 0.1));
            box-shadow: none !important;
        }

        :host([variant="flat"]) {
            border: none;
            box-shadow: none;
        }

        /* Elevation Styles */
        :host([variant="elevated"][elevation="0"])  { box-shadow: none; }
        :host([variant="elevated"][elevation="1"])  { box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); }
        :host([variant="elevated"][elevation="2"])  { box-shadow: 0 3px 6px rgba(0, 0, 0, 0.07); }
        :host([variant="elevated"][elevation="3"])  { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); }
        :host([variant="elevated"][elevation="4"])  { box-shadow: 0 8px 16px rgba(0, 0, 0, 0.09); }
        :host([variant="elevated"][elevation="6"])  { box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1); }
        :host([variant="elevated"][elevation="8"])  { box-shadow: 0 16px 32px rgba(0, 0, 0, 0.11); }
        :host([variant="elevated"][elevation="12"]) { box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12); }
        :host([variant="elevated"][elevation="16"]) { box-shadow: 0 24px 48px rgba(0, 0, 0, 0.13); }
        :host([variant="elevated"][elevation="24"]) { box-shadow: 0 32px 64px rgba(0, 0, 0, 0.15); }

        /* Dark Mode — per-elevation shadows */
        @media (prefers-color-scheme: dark) {
            :host {
                background-color: var(--ui-surface-background-flat, #1e1e1e);
            }
            :host([variant="elevated"][elevation="0"])  { box-shadow: none; }
            :host([variant="elevated"][elevation="1"])  { box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); }
            :host([variant="elevated"][elevation="2"])  { box-shadow: 0 3px 6px rgba(0, 0, 0, 0.35); }
            :host([variant="elevated"][elevation="3"])  { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4); }
            :host([variant="elevated"][elevation="4"])  { box-shadow: 0 8px 16px rgba(0, 0, 0, 0.45); }
            :host([variant="elevated"][elevation="6"])  { box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5); }
            :host([variant="elevated"][elevation="8"])  { box-shadow: 0 16px 32px rgba(0, 0, 0, 0.55); }
            :host([variant="elevated"][elevation="12"]) { box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6); }
            :host([variant="elevated"][elevation="16"]) { box-shadow: 0 24px 48px rgba(0, 0, 0, 0.65); }
            :host([variant="elevated"][elevation="24"]) { box-shadow: 0 32px 64px rgba(0, 0, 0, 0.7); }
        }
    `;

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
