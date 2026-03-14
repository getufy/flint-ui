import { LitElement, unsafeCSS, html, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import uiTreeItemStyles from './flint-tree-item.css?inline';

/**
 * A single item inside a `flint-simple-tree-view` or `flint-rich-tree-view`.
 *
 * @slot - Place child `flint-tree-item` elements here to create a nested tree.
 *
 * @fires flint-tree-item-click  - Fired when the item is clicked (detail: { itemId })
 * @fires flint-tree-item-toggle - Fired when expanded state changes (detail: { itemId, expanded })
 */
@customElement('flint-tree-item')
export class FlintTreeItem extends LitElement {
  static styles = unsafeCSS(uiTreeItemStyles);

  /** Unique identifier for this item within the tree */
  @property({ type: String, attribute: 'item-id', reflect: true })
  itemId = '';

  /** Label text displayed for this item */
  @property({ type: String })
  label = '';

  /** Whether this item is disabled (non-interactive) */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Whether this item's children are visible */
  @property({ type: Boolean, reflect: true })
  expanded = false;

  /**
   * When `true`, forces the expand button to render even if no `flint-tree-item`
   * children are currently in the slot. Used by `flint-rich-tree-view` for lazy
   * loading so items known to have children show the toggle before data is fetched.
   */
  @property({ type: Boolean, attribute: 'has-children', reflect: true })
  hasChildren = false;

  /**
   * FIX: Removed the Lit @property declaration for `draggable`.
   * Declaring it as a Lit property shadows the native HTMLElement.draggable,
   * meaning the browser never sees draggable="true" on the host and won't
   * initiate a drag. We now forward draggable state directly to the inner
   * .item-row div via the `_isDraggable` state, keeping the host's native
   * draggable untouched (it stays false, which is fine — the row fires the
   * dragstart which bubbles up through the shadow root to the tree view).
   */
  @state() private _isDraggable = false;

  /**
   * Called by flint-rich-tree-view to set drag enabled state.
   * Uses a method + @state instead of a @property to avoid clobbering
   * the native `draggable` attribute on the host element.
   *
   * @param value       - Whether this item is draggable at all
   * @param handleOnly  - When true, only the drag handle icon initiates a drag,
   *                      not the whole row. The handle div gets draggable="true"
   *                      and the row stays non-draggable.
   */
  setDraggable(value: boolean, handleOnly = false) {
    this._isDraggable = value;
    this._handleOnly = handleOnly;
  }

  @state() private _handleOnly = false;

  /** Visual drop position indicator — reflected so CSS :host selectors match */
  @property({ type: String, attribute: 'drop-position', reflect: true })
  dropPosition: 'before' | 'after' | 'inside' | null = null;

  /** Whether to show a dedicated drag handle icon */
  @property({ type: Boolean, attribute: 'show-drag-handle' })
  showDragHandle = false;

  @state() private _hasSlottedChildren = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'treeitem');
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '-1');
    }
  }

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    if (this._hasSlottedChildren || this.hasChildren) {
      this.setAttribute('aria-expanded', String(this.expanded));
    } else {
      this.removeAttribute('aria-expanded');
    }
    this.setAttribute('aria-disabled', String(this.disabled));
  }

  private _onSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const assigned = slot.assignedElements({ flatten: true });
    const hasChildren = assigned.some(el => el.tagName === 'FLINT-TREE-ITEM');
    if (hasChildren !== this._hasSlottedChildren) {
      this._hasSlottedChildren = hasChildren;
    }
  }

  private _toggleExpand(e: MouseEvent) {
    e.stopPropagation();
    if (this.disabled) return;
    this.dispatchEvent(new CustomEvent('flint-tree-item-toggle', {
      detail: { itemId: this.itemId, expanded: !this.expanded },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleRowClick() {
    if (this.disabled) return;
    this.dispatchEvent(new CustomEvent('flint-tree-item-click', {
      detail: { itemId: this.itemId },
      bubbles: true,
      composed: true,
    }));
  }

  /** Computed indentation level based on nested depth */
  private get _level(): number {
    let level = 0;
    let parent = this.parentElement;
    while (parent) {
      if (parent.tagName === 'FLINT-TREE-ITEM') level++;
      else if (parent.tagName === 'FLINT-SIMPLE-TREE-VIEW') break;
      parent = parent.parentElement;
    }
    return level;
  }

  render() {
    const paddingLeft = this._level * 24 + 8;
    const showExpandBtn = this._hasSlottedChildren || this.hasChildren;

    return html`
      <div
        class=${classMap({ 'item-row': true, 'is-draggable': this._isDraggable && !this._handleOnly })}
        style="padding-left: ${paddingLeft}px"
        draggable=${(this._isDraggable && !this._handleOnly) ? 'true' : 'false'}
        @click=${this._handleRowClick}
      >
        ${this.showDragHandle ? html`
          <div
            class="drag-handle"
            data-drag-handle="true"
            draggable=${this._handleOnly ? 'true' : 'false'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="5" r="1" fill="currentColor"/>
              <circle cx="9" cy="12" r="1" fill="currentColor"/>
              <circle cx="9" cy="19" r="1" fill="currentColor"/>
              <circle cx="15" cy="5" r="1" fill="currentColor"/>
              <circle cx="15" cy="12" r="1" fill="currentColor"/>
              <circle cx="15" cy="19" r="1" fill="currentColor"/>
            </svg>
          </div>
        ` : nothing}

        ${showExpandBtn
        ? html`
              <button
                class=${classMap({ 'expand-btn': true, expanded: this.expanded })}
                tabindex="-1"
                aria-hidden="true"
                @click=${this._toggleExpand}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M3 1.5L7 5 3 8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            `
        : html`<span class="expand-placeholder"></span>`
      }

        <span class="item-label">${this.label}</span>
        ${this.label ? nothing : html`<slot name="label"></slot>`}
      </div>

      <div class="children-container" ?hidden=${!this.expanded} role="group">
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'flint-tree-item': FlintTreeItem;
  }
}