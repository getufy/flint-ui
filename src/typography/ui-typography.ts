import { LitElement, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { html as staticHtml, literal } from 'lit/static-html.js';

/**
 * Typography component for displaying text with consistent theme styles.
 *
 * @slot - The text content.
 */
@customElement('ui-typography')
export class UiTypography extends LitElement {
    static styles = css`
        :host {
            display: block;
            font-family: var(--ui-font-family, 'Inter', sans-serif);
            color: var(--ui-text-color, #111827);
        }

        .typography {
            margin: 0;
            padding: 0;
        }

        /* Variants */
        .h1 { font-size: 6rem;    font-weight: 300; letter-spacing: -1.5px; line-height: 1.167; }
        .h2 { font-size: 3.75rem; font-weight: 300; letter-spacing: -0.5px; line-height: 1.2;   }
        .h3 { font-size: 3rem;    font-weight: 400; line-height: 1.167; }
        .h4 { font-size: 2.125rem; font-weight: 400; letter-spacing: 0.25px; line-height: 1.235; }
        .h5 { font-size: 1.5rem;  font-weight: 400; line-height: 1.334; }
        .h6 { font-size: 1.25rem; font-weight: 500; letter-spacing: 0.15px; line-height: 1.6;   }
        .subtitle1 { font-size: 1rem;    font-weight: 400; letter-spacing: 0.15px; line-height: 1.75; }
        .subtitle2 { font-size: 0.875rem; font-weight: 500; letter-spacing: 0.1px;  line-height: 1.57; }
        .body1 { font-size: 1rem;    font-weight: 400; letter-spacing: 0.15px; line-height: 1.5;  }
        .body2 { font-size: 0.875rem; font-weight: 400; letter-spacing: 0.15px; line-height: 1.43; }
        .caption  { font-size: 0.75rem; font-weight: 400; letter-spacing: 0.4px; line-height: 1.66; }
        .overline { font-size: 0.75rem; font-weight: 400; letter-spacing: 1px;   line-height: 2.66; text-transform: uppercase; }

        /* Colors */
        :host([color="primary"])       .typography { color: var(--ui-primary-color, #3b82f6); }
        :host([color="secondary"])     .typography { color: var(--ui-secondary-color, #7c3aed); }
        :host([color="success"])       .typography { color: var(--ui-success-color, #16a34a); }
        :host([color="error"])         .typography { color: var(--ui-error-color, #dc2626); }
        :host([color="warning"])       .typography { color: var(--ui-warning-color, #d97706); }
        :host([color="info"])          .typography { color: var(--ui-info-color, #0891b2); }
        :host([color="textPrimary"])   .typography { color: var(--ui-text-color, #111827); }
        :host([color="textSecondary"]) .typography { color: var(--ui-text-color-muted, #6b7280); }
        :host([color="inherit"])       .typography { color: inherit; }

        /* Alignment */
        :host([align="left"])    .typography { text-align: left; }
        :host([align="center"])  .typography { text-align: center; }
        :host([align="right"])   .typography { text-align: right; }
        :host([align="justify"]) .typography { text-align: justify; }

        /* No wrapping */
        :host([noWrap]) .typography {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        /* Gutter bottom — matches MUI spacing */
        :host([gutterBottom]) .typography { margin-bottom: 0.35em; }

        /* Paragraph adds bottom margin */
        :host([paragraph]) .typography { margin-bottom: 16px; }
    `;

    /**
     * Variant of the typography.
     * @default 'body1'
     */
    @property({ type: String, reflect: true }) variant:
        | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
        | 'subtitle1' | 'subtitle2'
        | 'body1' | 'body2'
        | 'caption' | 'overline'
        | 'inherit' = 'body1';

    /**
     * The color of the text.
     * @default 'textPrimary'
     */
    @property({ type: String, reflect: true }) color:
        | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
        | 'textPrimary' | 'textSecondary' | 'inherit' = 'textPrimary';

    /** Override the rendered HTML tag. */
    @property({ type: String }) component?: string;

    /** Text alignment. */
    @property({ type: String, reflect: true }) align: 'left' | 'center' | 'right' | 'justify' = 'left';

    /** If true, text is truncated with an ellipsis. */
    @property({ type: Boolean, reflect: true }) noWrap = false;

    /** If true, adds a bottom margin. */
    @property({ type: Boolean, reflect: true }) gutterBottom = false;

    /** If true, adds paragraph margin bottom. */
    @property({ type: Boolean, reflect: true }) paragraph = false;

    private _literalTag() {
        const comp = this.component;
        if (comp) {
            const map: Record<string, ReturnType<typeof literal>> = {
                h1: literal`h1`, h2: literal`h2`, h3: literal`h3`,
                h4: literal`h4`, h5: literal`h5`, h6: literal`h6`,
                p: literal`p`, span: literal`span`, div: literal`div`,
            };
            return map[comp] ?? literal`p`;
        }
        const map: Record<string, ReturnType<typeof literal>> = {
            h1: literal`h1`, h2: literal`h2`, h3: literal`h3`,
            h4: literal`h4`, h5: literal`h5`, h6: literal`h6`,
            subtitle1: literal`h6`, subtitle2: literal`h6`,
            body1: literal`p`, body2: literal`p`,
            caption: literal`span`, overline: literal`span`,
            inherit: literal`p`,
        };
        return map[this.variant] ?? literal`p`;
    }

    render() {
        const tag = this._literalTag();
        const cls = `typography ${this.variant !== 'inherit' ? this.variant : ''}`;
        return staticHtml`<${tag} class="${cls}"><slot></slot></${tag}>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-typography': UiTypography;
    }
}
