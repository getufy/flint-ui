import { LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';
import { styleMap } from 'lit/directives/style-map.js';
import uiBoxStyles from './ui-box.css?inline';

const ALLOWED_TAGS = new Set([
    'div', 'span', 'section', 'article', 'header', 'footer', 'main',
    'aside', 'nav', 'ul', 'ol', 'li', 'p', 'form', 'fieldset',
    'label', 'figure', 'figcaption', 'address', 'blockquote',
    'details', 'summary', 'dialog',
]);

@customElement('ui-box')
export class UiBox extends LitElement {
    static styles = unsafeCSS(uiBoxStyles);

    /** The component tag to render */
    @property({ type: String }) component = 'div';

    /* CSS Utility Properties */
    @property({ type: String }) m?: string;
    @property({ type: String }) mt?: string;
    @property({ type: String }) mr?: string;
    @property({ type: String }) mb?: string;
    @property({ type: String }) ml?: string;
    @property({ type: String }) mx?: string;
    @property({ type: String }) my?: string;

    @property({ type: String }) p?: string;
    @property({ type: String }) pt?: string;
    @property({ type: String }) pr?: string;
    @property({ type: String }) pb?: string;
    @property({ type: String }) pl?: string;
    @property({ type: String }) px?: string;
    @property({ type: String }) py?: string;

    @property({ type: String }) display?: string;
    @property({ type: String }) flexDirection?: string;
    @property({ type: String }) alignItems?: string;
    @property({ type: String }) justifyContent?: string;
    @property({ type: String }) flexWrap?: string;
    @property({ type: String }) flexBasis?: string;
    @property({ type: String }) flexGrow?: string;
    @property({ type: String }) flexShrink?: string;
    @property({ type: String }) gap?: string;

    @property({ type: String }) bgcolor?: string;
    @property({ type: String }) color?: string;
    @property({ type: String }) border?: string;
    @property({ type: String }) borderRadius?: string;
    @property({ type: String }) boxShadow?: string;
    @property({ type: String }) width?: string;
    @property({ type: String }) height?: string;

    private get _safeComponent(): string {
        if (!ALLOWED_TAGS.has(this.component)) {
            console.warn(`[ui-box] Unknown component tag "${this.component}", falling back to "div".`);
            return 'div';
        }
        return this.component;
    }

    private _getStyles() {
        const styles: Record<string, string | number> = {};

        // Margin: shorthand → semi-specific → specific (CSS cascade order)
        if (this.m) styles['margin'] = this.m;
        if (this.mx) { styles['marginLeft'] = this.mx; styles['marginRight'] = this.mx; }
        if (this.my) { styles['marginTop'] = this.my; styles['marginBottom'] = this.my; }
        if (this.mt) styles['marginTop'] = this.mt;
        if (this.mr) styles['marginRight'] = this.mr;
        if (this.mb) styles['marginBottom'] = this.mb;
        if (this.ml) styles['marginLeft'] = this.ml;

        // Padding: shorthand → semi-specific → specific
        if (this.p) styles['padding'] = this.p;
        if (this.px) { styles['paddingLeft'] = this.px; styles['paddingRight'] = this.px; }
        if (this.py) { styles['paddingTop'] = this.py; styles['paddingBottom'] = this.py; }
        if (this.pt) styles['paddingTop'] = this.pt;
        if (this.pr) styles['paddingRight'] = this.pr;
        if (this.pb) styles['paddingBottom'] = this.pb;
        if (this.pl) styles['paddingLeft'] = this.pl;

        if (this.display) styles['display'] = this.display;
        if (this.flexDirection) styles['flexDirection'] = this.flexDirection;
        if (this.alignItems) styles['alignItems'] = this.alignItems;
        if (this.justifyContent) styles['justifyContent'] = this.justifyContent;
        if (this.flexWrap) styles['flexWrap'] = this.flexWrap;
        if (this.flexBasis) styles['flexBasis'] = this.flexBasis;
        if (this.flexGrow) styles['flexGrow'] = this.flexGrow;
        if (this.flexShrink) styles['flexShrink'] = this.flexShrink;
        if (this.gap) styles['gap'] = this.gap;

        // Theme-aware color mapping
        if (this.bgcolor) {
            styles['backgroundColor'] = this.bgcolor === 'primary' ? 'var(--ui-primary-color)'
                : this.bgcolor === 'secondary' ? 'var(--ui-secondary-color)'
                : this.bgcolor;
        }
        if (this.color) {
            styles['color'] = this.color === 'primary' ? 'var(--ui-primary-color)'
                : this.color === 'secondary' ? 'var(--ui-secondary-color)'
                : this.color;
        }

        if (this.border) styles['border'] = this.border;
        if (this.borderRadius) styles['borderRadius'] = this.borderRadius;
        if (this.boxShadow) styles['boxShadow'] = this.boxShadow;
        if (this.width) styles['width'] = this.width;
        if (this.height) styles['height'] = this.height;

        return styles;
    }

    render() {
        const tagName = unsafeStatic(this._safeComponent);
        /* eslint-disable lit/binding-positions, lit/no-invalid-html */
        return html`
      <${tagName} style=${styleMap(this._getStyles())}>
        <slot></slot>
      </${tagName}>
    `;
        /* eslint-enable lit/binding-positions, lit/no-invalid-html */
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-box': UiBox;
    }
}
