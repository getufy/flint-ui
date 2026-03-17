import { unsafeCSS, html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { FlintElement } from '../flint-element.js';
import { validateEnum } from '../utilities/dev-warnings.js';

export type IconSize = 'sm' | 'md' | 'lg';

/** Module-level SVG cache shared across all `flint-icon` instances. */
const _svgCache = new Map<string, string>();

/** Module-level icon resolver — returns a URL string (sync or async) for a given icon name. */
let _iconResolver: ((name: string) => string | Promise<string>) | null = null;

/**
 * Register a global icon resolver function.
 * The resolver receives an icon name and returns a URL string (sync or async).
 *
 * @example
 * ```ts
 * // Sync resolver — local SVG files
 * registerIconResolver((name) => `/icons/${name}.svg`);
 *
 * // Async resolver — dynamic import / CDN lookup
 * registerIconResolver(async (name) => {
 *   const mod = await import(`./icons/${name}.js`);
 *   return mod.default;
 * });
 *
 * // Sprite sheet
 * registerIconResolver((name) => `#icon-${name}`);
 * ```
 */
export function registerIconResolver(resolver: ((name: string) => string | Promise<string>) | null) {
  _iconResolver = resolver;
}

/**
 * Clear the global SVG cache.
 * Useful when switching icon sets at runtime.
 */
export function clearIconCache() {
  _svgCache.clear();
}

/** Dangerous SVG elements that must be stripped. */
const BLOCKED_ELEMENTS = new Set([
  'script', 'iframe', 'object', 'embed', 'applet',
  'form', 'input', 'textarea', 'select', 'button',
]);

/**
 * Sanitize an SVG string by stripping scripts, event handlers, and dangerous elements.
 * Returns the sanitized SVG string, or empty string if the content is not valid SVG.
 */
export function sanitizeSvg(raw: string): string {
  if (!raw.includes('<svg')) return '';

  // Use DOMParser to safely parse
  const parser = new DOMParser();
  const doc = parser.parseFromString(raw, 'text/html');
  const svgEl = doc.body.querySelector('svg');
  if (!svgEl) return '';

  // Remove blocked elements
  for (const tag of BLOCKED_ELEMENTS) {
    const nodes = svgEl.querySelectorAll(tag);
    for (let i = 0; i < nodes.length; i++) {
      nodes[i]!.remove();
    }
  }

  // Remove event handler attributes (on*) from all elements
  const allEls = svgEl.querySelectorAll('*');
  for (let i = 0; i < allEls.length; i++) {
    const el = allEls[i]!;
    const attrs = el.getAttributeNames();
    for (const attr of attrs) {
      if (attr.startsWith('on')) {
        el.removeAttribute(attr);
      }
    }
  }

  // Also strip on* from root <svg> itself
  const svgAttrs = svgEl.getAttributeNames();
  for (const attr of svgAttrs) {
    if (attr.startsWith('on')) {
      svgEl.removeAttribute(attr);
    }
  }

  return svgEl.outerHTML;
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
 * @csspart base - The outer container element.
 * @csspart svg  - The inner container wrapping the inline SVG or `<use>` element.
 *
 * @cssproperty --flint-icon-size  - Icon width and height. Defaults to `24px` (md).
 * @cssproperty --flint-icon-color - Icon fill/stroke color. Defaults to `currentColor`.
 *
 * @fires flint-load  - Emitted when the SVG has been successfully loaded and rendered.
 * @fires flint-error - Emitted when the SVG fails to load.
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

    .icon-base {
      display: inline-flex;
      align-items: center;
      justify-content: center;
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
      fill: currentColor;
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
  /** Tracks the current load task so stale responses are discarded. */
  private _loadId = 0;

  disconnectedCallback() {
    super.disconnectedCallback();
    this._abortController?.abort();
  }

  willUpdate(changed: import('lit').PropertyValues) {
    if (import.meta.env?.DEV) {
      validateEnum('flint-icon', 'size', this.size, ['sm', 'md', 'lg']);
    }

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

    const loadId = ++this._loadId;

    // Resolve URL — may be sync or async
    let url = '';
    if (this.src) {
      url = this.src;
    } else if (_iconResolver && this.name) {
      try {
        url = await _iconResolver(this.name);
      } catch {
        this._emitError();
        return;
      }
    }

    // Guard against stale async resolution
    if (loadId !== this._loadId) return;
    if (!url) return;

    // Sprite sheet reference (starts with #)
    if (url.startsWith('#')) {
      this._useHref = url;
      this._emitLoad();
      return;
    }

    // Check cache
    const cached = _svgCache.get(url);
    if (cached) {
      this._svgContent = cached;
      this._emitLoad();
      return;
    }

    // Fetch SVG
    this._abortController?.abort();
    this._abortController = new AbortController();

    try {
      const response = await fetch(url, { signal: this._abortController.signal });

      // Guard against stale fetch
      if (loadId !== this._loadId) return;

      if (!response.ok) {
        this._emitError();
        return;
      }

      const text = await response.text();

      // Guard against stale fetch
      if (loadId !== this._loadId) return;

      const sanitized = sanitizeSvg(text);
      if (sanitized) {
        _svgCache.set(url, sanitized);
        this._svgContent = sanitized;
        this._emitLoad();
      } else {
        this._emitError();
      }
    } catch {
      // Aborted or network error
      if (loadId === this._loadId) {
        this._emitError();
      }
    }
  }

  private _emitLoad() {
    this.dispatchEvent(new Event('flint-load', { bubbles: true, composed: true }));
  }

  private _emitError() {
    this.dispatchEvent(new Event('flint-error', { bubbles: true, composed: true }));
  }

  render() {
    const hasLabel = !!this.label;

    return html`
      <div
        class="icon-base"
        part="base"
        role=${hasLabel ? 'img' : nothing}
        aria-label=${hasLabel ? this.label : nothing}
        aria-hidden=${hasLabel ? nothing : 'true'}
      >
        <div class="icon-container" part="svg">
          ${this._useHref
            ? html`<svg><use href=${this._useHref}></use></svg>`
            : this._svgContent
              ? html`${unsafeSVG(this._svgContent)}`
              : nothing
          }
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'flint-icon': FlintIcon;
  }
}
