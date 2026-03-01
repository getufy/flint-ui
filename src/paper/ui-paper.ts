import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * The Paper component is a container for displaying content on an elevated surface.
 * surface components and shadow styles are heavily influenced by their real-world physical counterparts.
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
            transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid transparent;
        }

        :host([square]) {
            border-radius: 0;
        }

        :host([variant="outlined"]) {
            border: 1px solid var(--ui-border-color, rgba(0, 0, 0, 0.1));
            box-shadow: none !important;
        }

        .paper {
            padding: var(--ui-paper-padding, 0);
            border-radius: inherit;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
        }

        /* Elevation Styles - Moved to Host for better visibility and reliability */
        :host([variant="elevated"][elevation="0"]) { box-shadow: none; }
        :host([variant="elevated"][elevation="1"]) { box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); }
        :host([variant="elevated"][elevation="2"]) { box-shadow: 0 3px 6px rgba(0, 0, 0, 0.07); }
        :host([variant="elevated"][elevation="3"]) { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); }
        :host([variant="elevated"][elevation="4"]) { box-shadow: 0 8px 16px rgba(0, 0, 0, 0.09); }
        :host([variant="elevated"][elevation="6"]) { box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1); }
        :host([variant="elevated"][elevation="8"]) { box-shadow: 0 16px 32px rgba(0, 0, 0, 0.11); }
        :host([variant="elevated"][elevation="12"]) { box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12); }
        :host([variant="elevated"][elevation="16"]) { box-shadow: 0 24px 48px rgba(0, 0, 0, 0.13); }
        :host([variant="elevated"][elevation="24"]) { box-shadow: 0 32px 64px rgba(0, 0, 0, 0.15); }

        /* Dark Mode */
        @media (prefers-color-scheme: dark) {
            :host {
                background-color: var(--ui-surface-background-flat, #1e1e1e);
            }
            :host([variant="elevated"]) {
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
            }
        }
    `;

    /**
     * Shadow depth from 0-24.
     */
    @property({ type: Number, reflect: true }) elevation = 1;

    /**
     * If true, the paper will have square corners.
     */
    @property({ type: Boolean, reflect: true }) square = false;

    /**
     * The variant of the paper.
     */
    @property({ type: String, reflect: true }) variant: 'elevated' | 'outlined' = 'elevated';

    render() {
        return html`
            <div class="paper" role="region">
                <slot></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-paper': UiPaper;
    }
}
