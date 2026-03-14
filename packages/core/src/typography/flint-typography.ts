import { LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { html as staticHtml, literal } from 'lit/static-html.js';
import uiTypographyStyles from './flint-typography.css?inline';

/**
 * Typography component for displaying text with consistent theme styles.
 *
 * @slot - The text content.
 */
@customElement('flint-typography')
export class FlintTypography extends LitElement {
    static styles = unsafeCSS(uiTypographyStyles);

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
        'flint-typography': FlintTypography;
    }
}
