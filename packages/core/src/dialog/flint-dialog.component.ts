import { unsafeCSS, html, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import { FlintBackdrop } from '../backdrop/flint-backdrop.component.js';
import uiDialogStyles from './flint-dialog.css?inline';
import uiDialogTitleStyles from './flint-dialog-title.css?inline';
import uiDialogContentStyles from './flint-dialog-content.css?inline';
import uiDialogContentTextStyles from './flint-dialog-content-text.css?inline';
import uiDialogActionsStyles from './flint-dialog-actions.css?inline';

// Tracks open dialogs in activation order so only the topmost handles Escape.
const _openDialogs: FlintDialog[] = [];

/**
 * flint-dialog: a modal dialog component.
 *
 * @fires flint-dialog-close - Dispatched when the dialog requests to be closed (backdrop click or
 *               an explicit call to `requestClose()`). The host is responsible for
 *               setting `open = false` in response. detail: `{ open: false }`
 * @fires confirm - Dispatched by confirmation dialogs when the user clicked "confirm".
 * @fires cancel  - Dispatched by confirmation dialogs when the user clicked "cancel".
 *
 * @slot - Default slot for dialog content (title, content, actions sub-components).
 */
export class FlintDialog extends FlintElement {
  static styles = unsafeCSS(uiDialogStyles);
  static dependencies = { 'flint-backdrop': FlintBackdrop as unknown as typeof FlintElement };

  /** Controls the open / closed state of the dialog. */
  @property({ type: Boolean, reflect: true }) open = false;

  /**
   * Initial open state for uncontrolled usage.
   * Has no effect after the element has connected to the DOM.
   */
  @property({ type: Boolean, attribute: 'default-open' }) defaultOpen = false;

  private _firstUpdate = true;
  private _lastFocused: HTMLElement | null = null;

  /** Animation style: 'scale' (default), 'slide-up', or 'slide-down'. */
  @property({ type: String }) transition: 'scale' | 'slide-up' | 'slide-down' = 'scale';

  /**
   * When true, clicking the backdrop will NOT close the dialog.
   * Useful for confirmation dialogs where the user must make a deliberate choice.
   */
  @property({ type: Boolean, attribute: 'disable-backdrop-close' }) disableBackdropClose = false;

  override willUpdate(changed: PropertyValues) {
    if (this._firstUpdate) {
      this._firstUpdate = false;
      if (this.defaultOpen && !this.open) {
        this.open = true;
      }
    }
    void changed;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this._handleKeyDown);
  }

  override updated(changed: PropertyValues<this>) {
    super.updated(changed);
    if (changed.has('open')) {
      if (this.open) {
        if (!_openDialogs.includes(this)) _openDialogs.push(this);
        this._lastFocused = document.activeElement as HTMLElement | null;
        void this.updateComplete.then(() => {
          this.shadowRoot?.querySelector<HTMLElement>('.dialog-panel')?.focus();
        });
      } else {
        const idx = _openDialogs.indexOf(this);
        if (idx !== -1) _openDialogs.splice(idx, 1);
        this._lastFocused?.focus();
        this._lastFocused = null;
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this._handleKeyDown);
    const idx = _openDialogs.indexOf(this);
    if (idx !== -1) _openDialogs.splice(idx, 1);
    this._lastFocused = null;
  }

  private readonly _handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.open && _openDialogs[_openDialogs.length - 1] === this) {
      this.requestClose();
    }
  };

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

  render() {
    const panelClasses = classMap({
      'dialog-panel': true,
      open: this.open,
      [`transition-${this.transition}`]: this.transition !== 'scale',
    });

    return html`
      <flint-backdrop .open=${this.open} @flint-backdrop-close=${this._handleBackdropClose}>
        <div
          class=${panelClasses}
          tabindex="-1"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          @click=${(e: Event) => e.stopPropagation()}
        >
          <slot></slot>
        </div>
      </flint-backdrop>
    `;
  }
}

/**
 * flint-dialog-title: heading area of a dialog.
 * Automatically assigned id="dialog-title" for aria-labelledby.
 */
export class FlintDialogTitle extends FlintElement {
  static styles = unsafeCSS(uiDialogTitleStyles);

  render() {
    return html`<h2 id="dialog-title" style="margin:0;font-size:inherit;font-weight:inherit;"><slot></slot></h2>`;
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
