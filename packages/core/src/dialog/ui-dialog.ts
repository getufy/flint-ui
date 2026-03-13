import { LitElement, unsafeCSS, html, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import uiDialogStyles from './ui-dialog.css?inline';
import uiDialogTitleStyles from './ui-dialog-title.css?inline';
import uiDialogContentStyles from './ui-dialog-content.css?inline';
import uiDialogContentTextStyles from './ui-dialog-content-text.css?inline';
import uiDialogActionsStyles from './ui-dialog-actions.css?inline';
import '../backdrop/ui-backdrop';

// Tracks open dialogs in activation order so only the topmost handles Escape.
const _openDialogs: UiDialog[] = [];

/**
 * ui-dialog: a modal dialog component.
 *
 * @fires close - Dispatched when the dialog requests to be closed (backdrop click or
 *               an explicit call to `requestClose()`). The host is responsible for
 *               setting `open = false` in response.
 * @fires confirm - Dispatched by confirmation dialogs when the user clicked "confirm".
 * @fires cancel  - Dispatched by confirmation dialogs when the user clicked "cancel".
 *
 * @slot - Default slot for dialog content (title, content, actions sub-components).
 */
@customElement('ui-dialog')
export class UiDialog extends LitElement {
  static styles = unsafeCSS(uiDialogStyles);

  /** Controls the open / closed state of the dialog. */
  @property({ type: Boolean, reflect: true }) open = false;

  /** Animation style: 'scale' (default), 'slide-up', or 'slide-down'. */
  @property({ type: String }) transition: 'scale' | 'slide-up' | 'slide-down' = 'scale';

  /**
   * When true, clicking the backdrop will NOT close the dialog.
   * Useful for confirmation dialogs where the user must make a deliberate choice.
   */
  @property({ type: Boolean, attribute: 'disable-backdrop-close' }) disableBackdropClose = false;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this._handleKeyDown);
  }

  override updated(changed: PropertyValues<this>) {
    super.updated(changed);
    if (changed.has('open')) {
      if (this.open) {
        if (!_openDialogs.includes(this)) _openDialogs.push(this);
      } else {
        const idx = _openDialogs.indexOf(this);
        if (idx !== -1) _openDialogs.splice(idx, 1);
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this._handleKeyDown);
    const idx = _openDialogs.indexOf(this);
    if (idx !== -1) _openDialogs.splice(idx, 1);
  }

  private readonly _handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.open && _openDialogs[_openDialogs.length - 1] === this) {
      this.requestClose();
    }
  };

  /** Programmatically request the dialog to close (fires the 'close' event). */
  requestClose() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  private _handleBackdropClose(e: Event) {
    // Prevent the backdrop's own 'close' event from escaping the shadow root —
    // the dialog will re-dispatch its own fresh 'close' event from the host.
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
      <ui-backdrop .open=${this.open} @close=${this._handleBackdropClose}>
        <div
          class=${panelClasses}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          @click=${(e: Event) => e.stopPropagation()}
        >
          <slot></slot>
        </div>
      </ui-backdrop>
    `;
  }
}

/**
 * ui-dialog-title: heading area of a dialog.
 * Automatically assigned id="dialog-title" for aria-labelledby.
 */
@customElement('ui-dialog-title')
export class UiDialogTitle extends LitElement {
  static styles = unsafeCSS(uiDialogTitleStyles);

  render() {
    return html`<h2 id="dialog-title" style="margin:0;font-size:inherit;font-weight:inherit;"><slot></slot></h2>`;
  }
}

/**
 * ui-dialog-content: scrollable content area of a dialog.
 */
@customElement('ui-dialog-content')
export class UiDialogContent extends LitElement {
  static styles = unsafeCSS(uiDialogContentStyles);

  render() {
    return html`<slot></slot>`;
  }
}

/**
 * ui-dialog-content-text: body text inside a dialog content area.
 */
@customElement('ui-dialog-content-text')
export class UiDialogContentText extends LitElement {
  static styles = unsafeCSS(uiDialogContentTextStyles);

  render() {
    return html`<slot></slot>`;
  }
}

/**
 * ui-dialog-actions: footer button row for a dialog.
 * Use the `align` prop to control button alignment.
 */
@customElement('ui-dialog-actions')
export class UiDialogActions extends LitElement {
  static styles = unsafeCSS(uiDialogActionsStyles);

  /** Alignment of action buttons: 'end' (default), 'start', 'center', 'space-between'. */
  @property({ type: String, reflect: true }) align: 'start' | 'center' | 'end' | 'space-between' = 'end';

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-dialog': UiDialog;
    'ui-dialog-title': UiDialogTitle;
    'ui-dialog-content': UiDialogContent;
    'ui-dialog-content-text': UiDialogContentText;
    'ui-dialog-actions': UiDialogActions;
  }
}
