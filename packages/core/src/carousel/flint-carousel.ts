import { LitElement, unsafeCSS, html, css, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import uiCarouselContentStyles from './flint-carousel-content.css?inline';
import uiCarouselItemStyles from './flint-carousel-item.css?inline';
import uiCarouselStyles from './flint-carousel.css?inline';

/* ── Shared nav-button styles ─────────────────────────────────────────────── */
const navButtonStyles = css`
  :host {
    display: inline-flex;
  }
  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--flint-carousel-nav-button-size, 36px);
    height: var(--flint-carousel-nav-button-size, 36px);
    border-radius: 50%;
    border: 1px solid var(--flint-border-color, #e5e7eb);
    background: var(--flint-surface-background, #ffffff);
    color: var(--flint-text-color, #111827);
    cursor: pointer;
    padding: 0;
    transition: background 0.2s, border-color 0.2s;
    box-shadow: var(--flint-shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05));
  }
  button:hover:not(:disabled) {
    background: var(--flint-surface-background-flat, #f3f4f6);
    border-color: var(--flint-input-border-color, #d1d5db);
  }
  button:focus-visible {
    outline: 2px solid var(--flint-primary-color, #2563eb);
    outline-offset: 2px;
  }
  button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

/* ═══════════════════════════════════════════════════════════════════════════
   FlintCarouselContent
═══════════════════════════════════════════════════════════════════════════ */
@customElement('flint-carousel-content')
export class FlintCarouselContent extends LitElement {
  static styles = unsafeCSS(uiCarouselContentStyles);

  /** Zero-based index of the first visible slide. */
  @property({ type: Number }) index = 0;
  /** Number of slides visible at once. */
  @property({ type: Number, attribute: 'items-per-view' }) itemsPerView = 1;
  /** Slide direction axis. */
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  updated(changed: PropertyValues) {
    if (changed.has('itemsPerView')) {
      this.style.setProperty(
        '--flint-carousel-items-per-view',
        String(this.itemsPerView),
      );
    }
  }

  render() {
    const n = this.itemsPerView;
    const gap = 'var(--flint-carousel-gap, 0px)';
    // Step per item = (item_width + gap) = (viewport + gap) / n
    const step = `calc((100% + ${gap}) / ${n})`;
    const offset = `calc(-${this.index} * ${step})`;
    const transform =
      this.orientation === 'vertical'
        ? `translateY(${offset})`
        : `translateX(${offset})`;

    return html`
      <div
        class="track"
        style="transform: ${transform}"
        aria-live="polite"
        aria-atomic="false"
      >
        <slot></slot>
      </div>
    `;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   FlintCarouselItem
═══════════════════════════════════════════════════════════════════════════ */
@customElement('flint-carousel-item')
export class FlintCarouselItem extends LitElement {
  static styles = unsafeCSS(uiCarouselItemStyles);

  render() {
    return html`
      <div class="item" role="group" aria-roledescription="slide">
        <slot></slot>
      </div>
    `;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   FlintCarouselPrevious
═══════════════════════════════════════════════════════════════════════════ */
@customElement('flint-carousel-previous')
export class FlintCarouselPrevious extends LitElement {
  static styles = navButtonStyles;

  /** Whether the previous button is disabled. */
  @property({ type: Boolean, reflect: true }) disabled = false;
  /** Slide direction axis, inherited from the parent carousel. */
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  private readonly _handleClick = () => {
    (this.closest('flint-carousel') as FlintCarousel | null)?.previous();
  };

  render() {
    const icon =
      this.orientation === 'vertical'
        ? html`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="18 15 12 9 6 15"></polyline></svg>`
        : html`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"></polyline></svg>`;

    return html`
      <button
        type="button"
        part="button"
        ?disabled=${this.disabled}
        aria-label="Go to previous slide"
        @click=${this._handleClick}
      >
        <slot>${icon}</slot>
      </button>
    `;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   FlintCarouselNext
═══════════════════════════════════════════════════════════════════════════ */
@customElement('flint-carousel-next')
export class FlintCarouselNext extends LitElement {
  static styles = navButtonStyles;

  /** Whether the next button is disabled. */
  @property({ type: Boolean, reflect: true }) disabled = false;
  /** Slide direction axis, inherited from the parent carousel. */
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  private readonly _handleClick = () => {
    (this.closest('flint-carousel') as FlintCarousel | null)?.next();
  };

  render() {
    const icon =
      this.orientation === 'vertical'
        ? html`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>`
        : html`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>`;

    return html`
      <button
        type="button"
        part="button"
        ?disabled=${this.disabled}
        aria-label="Go to next slide"
        @click=${this._handleClick}
      >
        <slot>${icon}</slot>
      </button>
    `;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   FlintCarousel
═══════════════════════════════════════════════════════════════════════════ */
/**
 * Carousel: a slideshow component for cycling through content.
 *
 * @fires flint-carousel-change - Fired when the active slide changes.
 */
@customElement('flint-carousel')
export class FlintCarousel extends LitElement {
  static styles = unsafeCSS(uiCarouselStyles);

  /** When true, navigation wraps from last slide back to first and vice versa. */
  @property({ type: Boolean }) loop = false;

  /** Slide direction axis. */
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  /** Auto-advance interval in milliseconds. Set to 0 to disable. */
  @property({ type: Number }) autoplay = 0;

  /** Number of slides visible simultaneously. */
  @property({ type: Number, attribute: 'items-per-view' }) itemsPerView = 1;

  /** Accessible label for the carousel region. */
  @property() label = 'Carousel';

  private _currentIndex = 0;
  private _total = 0;

  private _observer: MutationObserver | null = null;
  private _autoplayTimer: ReturnType<typeof setInterval> | null = null;

  private readonly _handleKeydown = (e: KeyboardEvent) => {
    const isVertical = this.orientation === 'vertical';
    const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';
    const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';
    if (e.key === prevKey) {
      e.preventDefault();
      this.previous();
    } else if (e.key === nextKey) {
      e.preventDefault();
      this.next();
    }
  };

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer?.disconnect();
    this._observer = null;
    this._stopAutoplay();
  }

  firstUpdated() {
    this._countItems();
    this._syncNavigation();

    const content = this.querySelector('flint-carousel-content');
    if (content) {
      this._observer = new MutationObserver(() => {
        this._countItems();
        this._syncNavigation();
      });
      this._observer.observe(content, { childList: true });
    }

    if (this.autoplay > 0) {
      this._startAutoplay();
    }
  }

  updated(changed: PropertyValues) {
    if (changed.has('autoplay')) {
      this._stopAutoplay();
      if (this.autoplay > 0) this._startAutoplay();
    }
    if (changed.has('orientation') || changed.has('loop') || changed.has('itemsPerView')) {
      this._syncNavigation();
    }
  }

  private _countItems() {
    const content = this.querySelector('flint-carousel-content');
    const total = content
      ? content.querySelectorAll('flint-carousel-item').length
      : 0;
    if (total !== this._total) {
      this._total = total;
      this._currentIndex = Math.min(
        this._currentIndex,
        Math.max(0, total - 1),
      );
    }
  }

  private _syncNavigation() {
    const content = this.querySelector(
      'flint-carousel-content',
    ) as FlintCarouselContent | null;
    const prev = this.querySelector(
      'flint-carousel-previous',
    ) as FlintCarouselPrevious | null;
    const next = this.querySelector(
      'flint-carousel-next',
    ) as FlintCarouselNext | null;

    const lastIndex = Math.max(0, this._total - this.itemsPerView);

    if (content) {
      content.index = this._currentIndex;
      content.orientation = this.orientation;
      content.itemsPerView = this.itemsPerView;
    }
    if (prev) {
      prev.disabled = !this.loop && this._currentIndex === 0;
      prev.orientation = this.orientation;
    }
    if (next) {
      next.disabled =
        !this.loop && (this._total === 0 || this._currentIndex >= lastIndex);
      next.orientation = this.orientation;
    }
  }

  private _fireChange() {
    this.dispatchEvent(
      new CustomEvent('flint-carousel-change', {
        detail: { index: this._currentIndex, total: this._total },
        bubbles: true,
        composed: true,
      }),
    );
  }

  /** Advance to the next slide. */
  next() {
    if (this._total === 0) return;
    const lastIndex = Math.max(0, this._total - this.itemsPerView);
    if (!this.loop && this._currentIndex >= lastIndex) return;
    this._currentIndex = this.loop
      ? (this._currentIndex + 1) % this._total
      : this._currentIndex + 1;
    this._syncNavigation();
    this._fireChange();
  }

  /** Go to the previous slide. */
  previous() {
    if (this._total === 0) return;
    if (!this.loop && this._currentIndex <= 0) return;
    this._currentIndex = this.loop
      ? (this._currentIndex - 1 + this._total) % this._total
      : this._currentIndex - 1;
    this._syncNavigation();
    this._fireChange();
  }

  /** Jump to a specific slide (0-based index). */
  goTo(index: number) {
    if (index < 0 || index >= this._total || index === this._currentIndex)
      return;
    this._currentIndex = index;
    this._syncNavigation();
    this._fireChange();
  }

  /** Current slide index (read-only). */
  get currentIndex() {
    return this._currentIndex;
  }

  /** Total number of slides (read-only). */
  get total() {
    return this._total;
  }

  private _startAutoplay() {
    this._stopAutoplay();
    this._autoplayTimer = setInterval(() => {
      const lastIndex = Math.max(0, this._total - this.itemsPerView);
      if (this.loop || this._currentIndex < lastIndex) {
        this.next();
      } else {
        this._stopAutoplay();
      }
    }, this.autoplay);
  }

  private _stopAutoplay() {
    if (this._autoplayTimer !== null) {
      clearInterval(this._autoplayTimer);
      this._autoplayTimer = null;
    }
  }

  render() {
    return html`
      <div
        class="carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="${this.label}"
        tabindex="0"
        @keydown=${this._handleKeydown}
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'flint-carousel': FlintCarousel;
    'flint-carousel-content': FlintCarouselContent;
    'flint-carousel-item': FlintCarouselItem;
    'flint-carousel-next': FlintCarouselNext;
    'flint-carousel-previous': FlintCarouselPrevious;
  }
}
