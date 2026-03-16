import { unsafeCSS, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';
import { styleMap } from 'lit/directives/style-map.js';
import { FlintElement } from '../flint-element.js';
import uiBoxStyles from './flint-box.css?inline';

const ALLOWED_TAGS = new Set([
    'div', 'span', 'section', 'article', 'header', 'footer', 'main',
    'aside', 'nav', 'ul', 'ol', 'li', 'p', 'form', 'fieldset',
    'label', 'figure', 'figcaption', 'address', 'blockquote',
    'details', 'summary', 'dialog',
]);

/**
 * @fires flint-box-warning - Dispatched when an unknown component tag is used and falls back to div.
 */
export class FlintBox extends FlintElement {
    static styles = unsafeCSS(uiBoxStyles);

    /** The component tag to render */
    @property({ type: String }) component = 'div';

    /* CSS Utility Properties */

    /** Margin on all sides. */
    @property({ type: String }) m?: string;
    /** Margin top. */
    @property({ type: String }) mt?: string;
    /** Margin right. */
    @property({ type: String }) mr?: string;
    /** Margin bottom. */
    @property({ type: String }) mb?: string;
    /** Margin left. */
    @property({ type: String }) ml?: string;
    /** Margin on the horizontal (left and right) axis. */
    @property({ type: String }) mx?: string;
    /** Margin on the vertical (top and bottom) axis. */
    @property({ type: String }) my?: string;

    /** Padding on all sides. */
    @property({ type: String }) p?: string;
    /** Padding top. */
    @property({ type: String }) pt?: string;
    /** Padding right. */
    @property({ type: String }) pr?: string;
    /** Padding bottom. */
    @property({ type: String }) pb?: string;
    /** Padding left. */
    @property({ type: String }) pl?: string;
    /** Padding on the horizontal (left and right) axis. */
    @property({ type: String }) px?: string;
    /** Padding on the vertical (top and bottom) axis. */
    @property({ type: String }) py?: string;

    /** CSS display value. */
    @property({ type: String }) display?: string;
    /** CSS flex-direction value. */
    @property({ type: String }) flexDirection?: string;
    /** CSS align-items value. */
    @property({ type: String }) alignItems?: string;
    /** CSS justify-content value. */
    @property({ type: String }) justifyContent?: string;
    /** CSS flex-wrap value. */
    @property({ type: String }) flexWrap?: string;
    /** CSS flex-basis value. */
    @property({ type: String }) flexBasis?: string;
    /** CSS flex-grow value. */
    @property({ type: String }) flexGrow?: string;
    /** CSS flex-shrink value. */
    @property({ type: String }) flexShrink?: string;
    /** CSS gap between flex or grid items. */
    @property({ type: String }) gap?: string;

    /** Background color. Supports theme tokens 'primary' and 'secondary'. */
    @property({ type: String }) bgcolor?: string;
    /** Text color. Supports theme tokens 'primary' and 'secondary'. */
    @property({ type: String }) color?: string;
    /** CSS border shorthand value. */
    @property({ type: String }) border?: string;
    /** CSS border-radius value. */
    @property({ type: String }) borderRadius?: string;
    /** CSS box-shadow value. */
    @property({ type: String }) boxShadow?: string;
    /** CSS width value. */
    @property({ type: String }) width?: string;
    /** CSS height value. */
    @property({ type: String }) height?: string;

    private _safeTag = 'div';

    protected willUpdate(changedProperties: PropertyValues) {
        if (changedProperties.has('component')) {
            if (!ALLOWED_TAGS.has(this.component)) {
                this._safeTag = 'div';
                this.dispatchEvent(new CustomEvent('flint-box-warning', {
                    bubbles: true,
                    composed: true,
                    detail: { message: `Unknown component tag "${this.component}", falling back to "div".` },
                }));
            } else {
                this._safeTag = this.component;
            }
        }
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
            styles['backgroundColor'] = this.bgcolor === 'primary' ? 'var(--flint-primary-color)'
                : this.bgcolor === 'secondary' ? 'var(--flint-secondary-color)'
                : this.bgcolor;
        }
        if (this.color) {
            styles['color'] = this.color === 'primary' ? 'var(--flint-primary-color)'
                : this.color === 'secondary' ? 'var(--flint-secondary-color)'
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
        const tagName = unsafeStatic(this._safeTag);
        /* eslint-disable lit/binding-positions, lit/no-invalid-html */
        return html`
      <${tagName} part="base" style=${styleMap(this._getStyles())}>
        <slot></slot>
      </${tagName}>
    `;
        /* eslint-enable lit/binding-positions, lit/no-invalid-html */
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-box': FlintBox;
    }
}
