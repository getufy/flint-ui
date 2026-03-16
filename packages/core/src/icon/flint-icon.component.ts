import { unsafeCSS, html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { FlintElement } from '../flint-element.js';

export type IconSize = 'sm' | 'md' | 'lg';

/** Module-level SVG cache shared across all `flint-icon` instances. */
const _svgCache = new Map<string, string>();

/** Module-level icon resolver — returns a URL string for a given icon name. */
let _iconResolver: ((name: string) => string) | null = null;

/**
 * Register a global icon resolver function.
 * The resolver receives an icon name and returns a URL string.
 *
 * For SVG files: `registerIconResolver((name) => \`/icons/\${name}.svg\`)`
 * For sprite sheets: `registerIconResolver((name) => \`#icon-\${name}\`)`
 */
export function registerIconResolver(resolver: (name: string) => string) {
  _iconResolver = resolver;
}

const sizeMap: Record<IconSize, string> = {
  sm: '16px',
  md: '24px',
  lg: '32px',
};

/**
 * An icon component with a resolver pattern for swappable icon sets.
 *
 * @attr {string} name   - Icon name resolved via `registerIconResolver()`.
 * @attr {string} src    - Direct URL to an SVG file (overrides resolver).
 * @attr {IconSize} size - Size variant: `'sm'` (16px), `'md'` (24px), `'lg'` (32px).
 * @attr {string} label  - Accessible label. When set, `role="img"` is applied; otherwise `aria-hidden="true"`.
 *
 * @csspart svg - The container wrapping the inline SVG or `<use>` element.
 *
 * @example
 * ```html
 * <flint-icon name="home"></flint-icon>
 * <flint-icon name="arrow-left" size="lg"></flint-icon>
 * <flint-icon src="/my-icon.svg" label="Custom icon"></flint-icon>
 * ```
 */
export class FlintIcon extends FlintElement {
  static styles = unsafeCSS(`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      line-height: 0;
    }

    .icon-container {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--flint-icon-size, 24px);
      height: var(--flint-icon-size, 24px);
      color: var(--flint-icon-color, currentColor);
    }

    .icon-container svg {
      width: 100%;
      height: 100%;
    }
  `);

  /** Icon name resolved through the registered icon resolver. */
  @property({ type: String, reflect: true }) name = '';

  /** Direct URL to an SVG file. Overrides the resolver. */
  @property({ type: String }) src = '';

  /** Size variant. */
  @property({ type: String, reflect: true }) size: IconSize = 'md';

  /** Accessible label. When set, applies `role="img"`; otherwise `aria-hidden="true"`. */
  @property({ type: String }) label = '';

  @state() private _svgContent = '';
  @state() private _useHref = '';

  private _abortController: AbortController | null = null;

  disconnectedCallback() {
    super.disconnectedCallback();
    this._abortController?.abort();
  }

  willUpdate(changed: import('lit').PropertyValues) {
    if (changed.has('name') || changed.has('src') || changed.has('size')) {
      // Update CSS custom property for size
      const dim = sizeMap[this.size] || sizeMap.md;
      this.style.setProperty('--flint-icon-size', dim);
    }

    if (changed.has('name') || changed.has('src')) {
      void this._loadIcon();
    }
  }

  private async _loadIcon() {
    this._svgContent = '';
    this._useHref = '';

    const url = this.src || (_iconResolver && this.name ? _iconResolver(this.name) : '');
    if (!url) return;

    // Sprite sheet reference (starts with #)
    if (url.startsWith('#')) {
      this._useHref = url;
      return;
    }

    // Check cache
    const cached = _svgCache.get(url);
    if (cached) {
      this._svgContent = cached;
      return;
    }

    // Fetch SVG
    this._abortController?.abort();
    this._abortController = new AbortController();

    try {
      const response = await fetch(url, { signal: this._abortController.signal });
      if (!response.ok) return;
      const text = await response.text();
      // Basic sanitization: only accept content that looks like SVG
      if (text.includes('<svg')) {
        _svgCache.set(url, text);
        this._svgContent = text;
      }
    } catch {
      // Aborted or network error — silently ignore
    }
  }

  render() {
    const hasLabel = !!this.label;

    return html`
      <div
        class="icon-container"
        part="svg"
        role=${hasLabel ? 'img' : nothing}
        aria-label=${hasLabel ? this.label : nothing}
        aria-hidden=${hasLabel ? nothing : 'true'}
      >
        ${this._useHref
          ? html`<svg><use href=${this._useHref}></use></svg>`
          : this._svgContent
            ? html`${unsafeSVG(this._svgContent)}`
            : nothing
        }
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'flint-icon': FlintIcon;
  }
}
