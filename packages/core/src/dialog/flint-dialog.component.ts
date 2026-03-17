import { unsafeCSS, html, nothing, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import { FlintBackdrop } from '../backdrop/flint-backdrop.component.js';
import uiDialogStyles from './flint-dialog.css?inline';
import uiDialogTitleStyles from './flint-dialog-title.css?inline';
import uiDialogContentStyles from './flint-dialog-content.css?inline';
import uiDialogContentTextStyles from './flint-dialog-content-text.css?inline';
import uiDialogActionsStyles from './flint-dialog-actions.css?inline';
import { getAnimation, animateTo, stopAnimations, resolveKeyframes } from '../utilities/animation-registry.js';
import { handleFocusTrapKeyDown, getFocusableElements } from '../utilities/focus-trap.js';
import { lockBodyScroll, unlockBodyScroll } from '../utilities/scroll-lock.js';
import '../utilities/animation-presets.js';

// Tracks open dialogs in activation order so only the topmost handles Escape.
const _openDialogs: FlintDialog[] = [];

/**
 * flint-dialog: a modal dialog component.
 *
 * @fires flint-dialog-open - Dispatched after the dialog open animation completes. detail: `{ open: boolean }`
 * @fires flint-dialog-close - Dispatched when the dialog requests to be closed. detail: `{ open: boolean }`
 * @fires confirm - Dispatched by confirmation dialogs when the user clicked "confirm".
 * @fires cancel  - Dispatched by confirmation dialogs when the user clicked "cancel".
 *
 * @slot - Default slot for dialog content (title, content, actions sub-components).
 *
 * @csspart panel - The dialog panel container.
 */
export type DialogSize = 'sm' | 'md' | 'lg' | 'full';

export class FlintDialog extends FlintElement {
  static styles = unsafeCSS(uiDialogStyles);
  static dependencies = { 'flint-backdrop': FlintBackdrop as unknown as typeof FlintElement };

  /** Current open state (controlled). When set, the component reflects this state and does not manage its own state. */
  @property({ type: Boolean, reflect: true }) open = false;

  /** Initial open state (uncontrolled). Only used on first render; ignored after mount. */
  @property({ type: Boolean, attribute: 'default-open' }) defaultOpen = false;

  /**
   * Size variant of the dialog panel.
   * - `sm`: max-width ~400px
   * - `md`: max-width ~600px (default)
   * - `lg`: max-width ~800px
   * - `full`: fullscreen, no border-radius
   * @default 'md'
   */
  @property({ type: String, reflect: true }) size: DialogSize = 'md';

  private _firstUpdate = true;
  private _lastFocused: HTMLElement | null = null;

  /**
   * Internal visual state — decoupled from `open` so close animations
   * can play before the CSS `.open` class is removed.
   */
  @state() private _visuallyOpen = false;

  /** Resolved accessible name from the slotted `<flint-dialog-title>`. */
  @state() private _titleLabel = '';

  /** Whether the content area is scrolled from the top. */
  @state() private _hasScrollTop = false;

  /** Whether the content area has more content below the visible area. */
  @state() private _hasScrollBottom = false;

  /**
   * Animation style for open/close.
   * @default 'scale'
   */
  @property({ type: String }) transition: 'scale' | 'slide-up' | 'slide-down' = 'scale';

  /**
   * When true, clicking the backdrop will NOT close the dialog.
   * Useful for confirmation dialogs where the user must make a deliberate choice.
   */
  @property({ type: Boolean, attribute: 'disable-backdrop-close' }) disableBackdropClose = false;

  /**
   * CSS selector for the element to focus when the dialog opens.
   * If the selector matches an element with a shadow root, focuses the first
   * focusable element within that shadow root (e.g. `flint-input` → inner `<input>`).
   * Falls back to the first focusable element in the dialog, then the panel itself.
   */
  @property({ type: String, attribute: 'initial-focus' }) initialFocus = '';

  override willUpdate(changed: PropertyValues) {
    if (this._firstUpdate) {
      this._firstUpdate = false;
      if (this.defaultOpen && !this.open) {
        this.open = true;
      }
    }
    // Batch _visuallyOpen into the current render cycle when opening
    if (changed.has('open') && this.open) {
      this._visuallyOpen = true;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', this._handleKeyDown);
    }
  }

  override updated(changed: PropertyValues<this>) {
    super.updated(changed);
    if (changed.has('open')) {
      if (this.open) {
        if (!_openDialogs.includes(this)) _openDialogs.push(this);
        this._lastFocused = typeof document !== 'undefined' ? document.activeElement as HTMLElement | null : null;
        lockBodyScroll(this);
        void this._runOpenAnimation().catch(() => {
          // If the open animation fails, remove from the stack so Escape
          // doesn't target this dialog and other dialogs still work correctly.
          const idx = _openDialogs.indexOf(this);
          if (idx !== -1) _openDialogs.splice(idx, 1);
        });
      } else {
        const idx = _openDialogs.indexOf(this);
        if (idx !== -1) _openDialogs.splice(idx, 1);
        // Run close animation FIRST, then remove .open class and restore focus.
        void this._runCloseAnimation()
          .catch(() => {
            // Animation failed — fall through to cleanup below.
          })
          .then(() => {
            if (!this.isConnected) return;
            this._visuallyOpen = false;
            unlockBodyScroll(this);
            this._lastFocused?.focus();
            this._lastFocused = null;
          });
      }
    }
  }

  /**
   * Run the open animation using the registry if available, then focus the panel.
   * Panel and overlay animate in parallel.
   */
  private async _runOpenAnimation() {
    const panel = this.shadowRoot?.querySelector<HTMLElement>('.dialog-panel');
    const overlay = this.shadowRoot?.querySelector<HTMLElement>('flint-backdrop');

    const panelAnim = getAnimation(this, 'dialog.show');
    const overlayAnim = getAnimation(this, 'dialog.overlay.show');

    const promises: Promise<unknown>[] = [];

    if (panelAnim && panel) {
      await stopAnimations(panel);
      const keyframes = resolveKeyframes(this, panelAnim);
      promises.push(animateTo(panel, keyframes, panelAnim.options));
    }

    if (overlayAnim && overlay) {
      await stopAnimations(overlay);
      const keyframes = resolveKeyframes(this, overlayAnim);
      promises.push(animateTo(overlay, keyframes, overlayAnim.options));
    }

    await Promise.all(promises);
    if (!this.isConnected) return;
    this._focusInitialElement(panel);
    this.dispatchEvent(new CustomEvent('flint-dialog-open', { bubbles: true, composed: true, detail: { open: true } }));
  }

  /**
   * Run the close animation using the registry if available.
   * Panel and overlay animate in parallel.
   */
  private async _runCloseAnimation() {
    const panel = this.shadowRoot?.querySelector<HTMLElement>('.dialog-panel');
    const overlay = this.shadowRoot?.querySelector<HTMLElement>('flint-backdrop');

    const panelAnim = getAnimation(this, 'dialog.hide');
    const overlayAnim = getAnimation(this, 'dialog.overlay.hide');

    const promises: Promise<unknown>[] = [];

    if (panelAnim && panel) {
      await stopAnimations(panel);
      const keyframes = resolveKeyframes(this, panelAnim);
      promises.push(animateTo(panel, keyframes, panelAnim.options));
    }

    if (overlayAnim && overlay) {
      await stopAnimations(overlay);
      const keyframes = resolveKeyframes(this, overlayAnim);
      promises.push(animateTo(overlay, keyframes, overlayAnim.options));
    }

    await Promise.all(promises);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', this._handleKeyDown);
    }
    const idx = _openDialogs.indexOf(this);
    if (idx !== -1) _openDialogs.splice(idx, 1);
    unlockBodyScroll(this);
    this._lastFocused = null;
    this._scrollObserverCleanup?.();
    this._scrollObserverCleanup = null;
  }

  private readonly _handleKeyDown = (e: KeyboardEvent) => {
    // Only the topmost dialog should handle keyboard events
    if (!this.open || _openDialogs[_openDialogs.length - 1] !== this) return;

    if (e.key === 'Escape') {
      this.requestClose();
      return;
    }

    // Trap Tab / Shift+Tab within the dialog panel
    if (e.key === 'Tab') {
      handleFocusTrapKeyDown(e, this);
    }
  };

  /**
   * Focus the appropriate element after the dialog opens.
   * Priority: initialFocus selector → first focusable child → panel fallback.
   */
  private _focusInitialElement(panel: HTMLElement | null | undefined) {
    // 1. Try initialFocus selector
    if (this.initialFocus) {
      const target = this.querySelector<HTMLElement>(this.initialFocus);
      if (target) {
        // If the target is a web component with a shadow root, focus into it
        if (target.shadowRoot) {
          const inner = getFocusableElements(target.shadowRoot);
          if (inner.length > 0) { inner[0]!.focus(); return; }
        }
        target.focus();
        return;
      }
    }

    // 2. Try first focusable element in the dialog (pierces shadow DOM of slotted content)
    const focusable = getFocusableElements(this);
    if (focusable.length > 0) {
      focusable[0]!.focus();
      return;
    }

    // 3. Fallback to the panel container
    panel?.focus();
  }

  /** Programmatically request the dialog to close (fires the 'flint-dialog-close' event). */
  requestClose() {
    this.dispatchEvent(new CustomEvent('flint-dialog-close', { bubbles: true, composed: true, detail: { open: false } }));
  }

  private _handleBackdropClose(e: Event) {
    // Prevent the backdrop's own 'flint-backdrop-close' event from escaping the shadow root —
    // the dialog will re-dispatch its own fresh 'flint-dialog-close' event from the host.
    e.stopPropagation();
    if (!this.disableBackdropClose) {
      this.requestClose();
    }
  }

  private _handleSlotChange() {
    const title = this.querySelector('flint-dialog-title');
    this._titleLabel = title?.textContent?.trim() ?? '';
    this._observeContentScroll();
  }

  private _scrollObserverCleanup: (() => void) | null = null;

  private _observeContentScroll() {
    // Clean up previous listener if any
    this._scrollObserverCleanup?.();
    this._scrollObserverCleanup = null;

    const contentEl = this.querySelector('flint-dialog-content');
    if (!contentEl?.shadowRoot) return;

    const handleScroll = () => {
      const el = contentEl.shadowRoot?.host as HTMLElement;
      if (!el) return;
      this._hasScrollTop = el.scrollTop > 0;
      this._hasScrollBottom = el.scrollTop + el.clientHeight < el.scrollHeight - 1;
    };

    contentEl.addEventListener('scroll', handleScroll);
    // Check initial state after render
    void this.updateComplete.then(handleScroll);

    this._scrollObserverCleanup = () => {
      contentEl.removeEventListener('scroll', handleScroll);
    };
  }

  render() {
    const panelClasses = classMap({
      'dialog-panel': true,
      open: this._visuallyOpen,
      [`transition-${this.transition}`]: this.transition !== 'scale',
      'has-scroll-top': this._hasScrollTop,
      'has-scroll-bottom': this._hasScrollBottom,
    });

    return html`
      <flint-backdrop .open=${this._visuallyOpen} @flint-backdrop-close=${this._handleBackdropClose}>
        <div
          class=${panelClasses}
          part="panel"
          tabindex="-1"
          role="dialog"
          aria-modal="true"
          aria-label=${this._titleLabel || nothing}
          @click=${(e: Event) => e.stopPropagation()}
        >
          <slot @slotchange=${this._handleSlotChange}></slot>
        </div>
      </flint-backdrop>
    `;
  }
}

/**
 * flint-dialog-title: heading area of a dialog.
 * The parent `<flint-dialog>` reads this element's text content via slotchange
 * to set `aria-label` on the dialog panel.
 */
export class FlintDialogTitle extends FlintElement {
  static styles = unsafeCSS(uiDialogTitleStyles);

  render() {
    return html`<h2 style="margin:0;font-size:inherit;font-weight:inherit;"><slot></slot></h2>`;
  }
}

/**
 * flint-dialog-content: scrollable content area of a dialog.
 */
export class FlintDialogContent extends FlintElement {
  static styles = unsafeCSS(uiDialogContentStyles);

  render() {
    return html`<slot></slot>`;
  }
}

/**
 * flint-dialog-content-text: body text inside a dialog content area.
 */
export class FlintDialogContentText extends FlintElement {
  static styles = unsafeCSS(uiDialogContentTextStyles);

  render() {
    return html`<slot></slot>`;
  }
}

/**
 * flint-dialog-actions: footer button row for a dialog.
 * Use the `align` prop to control button alignment.
 */
export class FlintDialogActions extends FlintElement {
  static styles = unsafeCSS(uiDialogActionsStyles);

  /** Alignment of action buttons: 'end' (default), 'start', 'center', 'space-between'. */
  @property({ type: String, reflect: true }) align: 'start' | 'center' | 'end' | 'space-between' = 'end';

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'flint-dialog': FlintDialog;
    'flint-dialog-title': FlintDialogTitle;
    'flint-dialog-content': FlintDialogContent;
    'flint-dialog-content-text': FlintDialogContentText;
    'flint-dialog-actions': FlintDialogActions;
  }
}
