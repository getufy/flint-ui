import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import '../backdrop/ui-backdrop';

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
  static styles = css`
    :host {
      display: block;
    }

    .dialog-panel {
      position: relative;
      background-color: var(--ui-surface-background, white);
      border-radius: var(--ui-border-radius-xl, 12px);
      box-shadow: var(--ui-shadow-xl, 0 20px 25px -5px rgba(0, 0, 0, 0.1));
      max-width: 90vw;
      max-height: var(--ui-dialog-max-height, 90vh); /* ← bounds the panel so content scrolls */
      width: var(--ui-dialog-width, 444px);
      display: flex;
      flex-direction: column;
      overflow: hidden; /* clip panel; inner ui-dialog-content scrolls independently */

      /* Base state: hidden (scale transition) */
      opacity: 0;
      transform: scale(0.9);
      transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1),
                  transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none;
    }

    .dialog-panel.open {
      opacity: 1;
      transform: scale(1);
      pointer-events: auto;
    }

    /* Slide-up: start below, animate to centre */
    .dialog-panel.transition-slide-up {
      transform: translateY(40px);
    }
    .dialog-panel.transition-slide-up.open {
      transform: translateY(0);
    }

    /* Slide-down: start above, animate to centre */
    .dialog-panel.transition-slide-down {
      transform: translateY(-40px);
    }
    .dialog-panel.transition-slide-down.open {
      transform: translateY(0);
    }
  `;

  /** Controls the open / closed state of the dialog. */
  @property({ type: Boolean, reflect: true }) open = false;

  /** Animation style: 'scale' (default), 'slide-up', or 'slide-down'. */
  @property({ type: String }) transition: 'scale' | 'slide-up' | 'slide-down' = 'scale';

  /**
   * When true, clicking the backdrop will NOT close the dialog.
   * Useful for confirmation dialogs where the user must make a deliberate choice.
   */
  @property({ type: Boolean, attribute: 'disable-backdrop-close' }) disableBackdropClose = false;

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
          aria-describedby="dialog-description"
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
  static styles = css`
    :host {
      display: block;
      padding: 20px 24px 12px;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--ui-text-color, #111827);
    }
  `;

  render() {
    return html`<h2 id="dialog-title" style="margin:0;font-size:inherit;font-weight:inherit;"><slot></slot></h2>`;
  }
}

/**
 * ui-dialog-content: scrollable content area of a dialog.
 */
@customElement('ui-dialog-content')
export class UiDialogContent extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 0 24px 20px 24px;
      flex: 1 1 auto;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

/**
 * ui-dialog-content-text: body text inside a dialog content area.
 */
@customElement('ui-dialog-content-text')
export class UiDialogContentText extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      font-size: 0.9375rem;
      line-height: 1.6;
      color: var(--ui-text-color-muted, #6b7280);
      margin-bottom: 8px;
    }
  `;

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
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 8px 16px 16px;
      gap: 8px;
      border-top: 1px solid var(--ui-border-color, #f3f4f6);
    }

    :host([align="start"]) { justify-content: flex-start; }
    :host([align="center"]) { justify-content: center; }
    :host([align="space-between"]) { justify-content: space-between; }
  `;

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
