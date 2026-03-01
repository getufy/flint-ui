import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { UiTreeItem } from './ui-tree-item.js';

/**
 * A simple tree-view container that manages keyboard navigation, focus,
 * and item selection/expansion for nested `ui-tree-item` elements.
 *
 * **Controlled expansion** — provide `expandedItems` and update it via
 * `onExpandedItemsChange`:
 * ```js
 * tree.expandedItems = ['item-1'];
 * tree.onExpandedItemsChange = (ids) => { tree.expandedItems = ids; };
 * ```
 *
 * **Uncontrolled expansion** — set `defaultExpandedItems` once at mount:
 * ```js
 * tree.defaultExpandedItems = ['item-1', 'item-2'];
 * ```
 *
 * @slot - Place `ui-tree-item` elements here.
 *
 * @fires item-click            - When a tree item is activated (detail: { itemId })
 * @fires expanded-items-change - When the expanded set changes (detail: { expandedItems })
 */
@customElement('ui-simple-tree-view')
export class UiSimpleTreeView extends LitElement {
    static styles = css`
    :host {
      display: block;
      font-family: var(--ui-font-family, system-ui, sans-serif);
    }

    .tree-root {
      padding: 4px 0;
    }
  `;

    // ─── Props ────────────────────────────────────────────────────────────────

    /**
     * When `true`, disabled items can receive keyboard focus.
     * When `false` (default), keyboard navigation skips disabled items.
     */
    @property({ type: Boolean, attribute: 'disabled-items-focusable' })
    disabledItemsFocusable = false;

    /**
     * Callback invoked when a tree item is clicked or activated via keyboard.
     * Receives the `itemId` of the activated item.
     */
    @property({ attribute: false })
    onItemClick?: (itemId: string) => void;

    /**
     * **Controlled mode.** The set of item IDs that should be expanded.
     * When set, the component uses this as the source of truth.
     * You must update this prop (via `onExpandedItemsChange`) to apply user changes.
     * Set to `undefined` to switch back to uncontrolled mode.
     */
    @property({ attribute: false })
    expandedItems?: string[];

    /**
     * **Uncontrolled mode.** Item IDs to expand on initial mount.
     * Ignored once the component has mounted. Has no effect in controlled mode.
     */
    @property({ attribute: false })
    defaultExpandedItems: string[] = [];

    /**
     * Callback fired when the user toggles an item's expansion.
     * Receives the full new array of expanded item IDs.
     * In controlled mode, update `expandedItems` with the received value.
     */
    @property({ attribute: false })
    onExpandedItemsChange?: (itemIds: string[]) => void;

    /**
     * What interaction triggers expand/collapse.
     * - `'content'` (default): clicking anywhere on the item row
     * - `'iconContainer'`: clicking only the expand/collapse icon button
     */
    @property({ type: String, attribute: 'expansion-trigger' })
    expansionTrigger: 'content' | 'iconContainer' = 'content';

    // ─── Internal state ───────────────────────────────────────────────────────

    /** Tracks expanded IDs in uncontrolled mode. */
    private _internalExpandedItems = new Set<string>();
    /** Prevents `defaultExpandedItems` from being re-applied on slot re-renders. */
    private _expansionInitialized = false;

    private get _isControlled(): boolean {
        return this.expandedItems !== undefined;
    }

    // ─── Lifecycle ────────────────────────────────────────────────────────────

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('keydown', this._handleKeydown);
        this.addEventListener('ui-tree-item-click', this._handleItemClick as EventListener);
        this.addEventListener('ui-tree-item-toggle', this._handleUiToggle as EventListener);
        this.addEventListener('focusin', this._handleFocusIn as EventListener);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('keydown', this._handleKeydown);
        this.removeEventListener('ui-tree-item-click', this._handleItemClick as EventListener);
        this.removeEventListener('ui-tree-item-toggle', this._handleUiToggle as EventListener);
        this.removeEventListener('focusin', this._handleFocusIn as EventListener);
    }

    protected updated(_changedProperties: PropertyValues) {
        super.updated(_changedProperties);
        if (_changedProperties.has('disabledItemsFocusable')) {
            this._initRovingTabindex();
        }
        if (_changedProperties.has('expandedItems')) {
            this._syncExpansion();
        }
    }

    // ─── Item queries ─────────────────────────────────────────────────────────

    private _getAllItems(): UiTreeItem[] {
        return Array.from(this.querySelectorAll('ui-tree-item')) as UiTreeItem[];
    }

    /** Returns all items that are currently visible (no collapsed ancestor). */
    private _getVisibleItems(): UiTreeItem[] {
        return this._getAllItems().filter(item => this._isVisible(item));
    }

    private _isVisible(item: UiTreeItem): boolean {
        let parent = item.parentElement;
        while (parent && parent !== this) {
            if (parent.tagName === 'UI-TREE-ITEM' && !(parent as UiTreeItem).expanded) {
                return false;
            }
            parent = parent.parentElement;
        }
        return true;
    }

    /** Visible items that can receive focus based on `disabledItemsFocusable`. */
    private _getFocusableItems(): UiTreeItem[] {
        const visible = this._getVisibleItems();
        return this.disabledItemsFocusable
            ? visible
            : visible.filter(item => !item.disabled);
    }

    private _itemHasChildren(item: UiTreeItem): boolean {
        return Array.from(item.children).some(el => el.tagName === 'UI-TREE-ITEM');
    }

    // ─── Expansion management ─────────────────────────────────────────────────

    /**
     * Runs once on first slot population.
     * Seeds `_internalExpandedItems` from `defaultExpandedItems` in uncontrolled mode.
     */
    private _initExpansion() {
        if (this._expansionInitialized) return;
        this._expansionInitialized = true;
        if (!this._isControlled && this.defaultExpandedItems.length > 0) {
            this._internalExpandedItems = new Set(this.defaultExpandedItems);
        }
    }

    /**
     * Reconciles every item's `expanded` prop with the current expanded set
     * (controlled: `expandedItems`; uncontrolled: `_internalExpandedItems`).
     */
    private _syncExpansion() {
        const expandedSet = this._isControlled
            ? new Set(this.expandedItems!)
            : this._internalExpandedItems;

        this._getAllItems().forEach(item => {
            const shouldExpand = expandedSet.has(item.itemId);
            if (item.expanded !== shouldExpand) {
                item.expanded = shouldExpand;
            }
        });
    }

    /**
     * Central expansion dispatcher.
     * In controlled mode: fires callbacks but resets to the controlled state.
     * In uncontrolled mode: updates internal tracking and syncs items.
     */
    private _handleToggle(item: UiTreeItem, newExpanded: boolean) {
        if (this._isControlled) {
            const current = new Set(this.expandedItems!);
            if (newExpanded) current.add(item.itemId);
            else current.delete(item.itemId);
            const newItems = Array.from(current);
            this.onExpandedItemsChange?.(newItems);
            this.dispatchEvent(new CustomEvent('expanded-items-change', {
                detail: { expandedItems: newItems },
                bubbles: false,
            }));
            // Reset to the controlled state (the parent must update expandedItems to apply)
            this._syncExpansion();
        } else {
            if (newExpanded) this._internalExpandedItems.add(item.itemId);
            else this._internalExpandedItems.delete(item.itemId);
            this._syncExpansion();
        }
    }

    // ─── Focus management (roving tabindex) ─────────────────────────────────────

    private _initRovingTabindex() {
        const all = this._getAllItems();
        if (all.length === 0) return;

        const hasFocusable = all.some(i => i.getAttribute('tabindex') === '0');
        if (!hasFocusable) {
            const first = this.disabledItemsFocusable
                ? all[0]
                : all.find(i => !i.disabled);
            if (first) first.setAttribute('tabindex', '0');
        }
    }

    private _focusItem(item: UiTreeItem) {
        this._getAllItems().forEach(i => i.setAttribute('tabindex', '-1'));
        item.setAttribute('tabindex', '0');
        item.focus();
    }

    // ─── Event handlers ──────────────────────────────────────────────────────────

    private _handleFocusIn(e: FocusEvent) {
        const target = e.target as Element;
        if (target.tagName !== 'UI-TREE-ITEM') return;
        // Keep roving tabindex consistent: make sure the focused item has tabindex=0
        this._getAllItems().forEach(i => i.setAttribute('tabindex', '-1'));
        (target as UiTreeItem).setAttribute('tabindex', '0');
    }

    /** Handles the `ui-tree-item-toggle` event from the expand icon button. */
    private _handleUiToggle(e: Event) {
        const { itemId, expanded } = (e as CustomEvent).detail as { itemId: string; expanded: boolean };
        const item = this.getItemDOMElement(itemId);
        if (item) this._handleToggle(item, expanded);
    }

    /** Handles `ui-tree-item-click` (row click). Also triggers expansion in content mode. */
    private _handleItemClick(e: Event) {
        const { itemId } = (e as CustomEvent).detail as { itemId: string };

        // In content mode, clicking the row also toggles expansion for parent items
        if (this.expansionTrigger === 'content') {
            const item = this.getItemDOMElement(itemId);
            if (item && this._itemHasChildren(item)) {
                this._handleToggle(item, !item.expanded);
            }
        }

        this.onItemClick?.(itemId);
        this.dispatchEvent(new CustomEvent('item-click', {
            detail: { itemId },
            bubbles: false,
        }));
    }

    private _handleKeydown = (e: KeyboardEvent) => {
        const target = e.target as Element;
        if (target.tagName !== 'UI-TREE-ITEM') return;

        const focusedItem = target as UiTreeItem;
        const focusable = this._getFocusableItems();
        const idx = focusable.indexOf(focusedItem);

        switch (e.key) {
            case 'ArrowDown': {
                e.preventDefault();
                const next = focusable[idx + 1];
                if (next) this._focusItem(next);
                break;
            }
            case 'ArrowUp': {
                e.preventDefault();
                const prev = focusable[idx - 1];
                if (prev) this._focusItem(prev);
                break;
            }
            case 'ArrowRight': {
                e.preventDefault();
                if (focusedItem.disabled) break;
                if (!focusedItem.expanded && this._itemHasChildren(focusedItem)) {
                    // Expand the item
                    this._handleToggle(focusedItem, true);
                } else if (focusedItem.expanded) {
                    // Move focus to the first child
                    const focusableItems = this._getFocusableItems();
                    const focusableIdx = focusableItems.indexOf(focusedItem);
                    const firstChild = focusableItems[focusableIdx + 1];
                    if (firstChild) this._focusItem(firstChild);
                }
                break;
            }
            case 'ArrowLeft': {
                e.preventDefault();
                if (focusedItem.disabled) break;
                if (focusedItem.expanded) {
                    // Collapse the item
                    this._handleToggle(focusedItem, false);
                } else {
                    // Move focus to the parent item
                    const parent = focusedItem.parentElement;
                    if (parent && parent.tagName === 'UI-TREE-ITEM') {
                        this._focusItem(parent as UiTreeItem);
                    }
                }
                break;
            }
            case 'Home': {
                e.preventDefault();
                const first = focusable[0];
                if (first) this._focusItem(first);
                break;
            }
            case 'End': {
                e.preventDefault();
                const last = focusable[focusable.length - 1];
                if (last) this._focusItem(last);
                break;
            }
            case 'Enter':
            case ' ': {
                e.preventDefault();
                if (focusedItem.disabled) break;
                if (this._itemHasChildren(focusedItem)) {
                    this._handleToggle(focusedItem, !focusedItem.expanded);
                }
                this.onItemClick?.(focusedItem.itemId);
                this.dispatchEvent(new CustomEvent('item-click', {
                    detail: { itemId: focusedItem.itemId },
                    bubbles: false,
                }));
                break;
            }
            default: {
                if (e.key.length === 1) {
                    // First-character navigation
                    const char = e.key.toLowerCase();
                    const startIdx = idx < 0 ? 0 : idx + 1;
                    const ordered = [
                        ...focusable.slice(startIdx),
                        ...focusable.slice(0, startIdx),
                    ];
                    const match = ordered.find(item =>
                        item.label.toLowerCase().startsWith(char)
                    );
                    if (match) this._focusItem(match);
                }
            }
        }
    };

    // ─── Public API ──────────────────────────────────────────────────────────────

    /**
     * Returns the DOM element for the tree item with the given `itemId`,
     * or `null` if not found.
     */
    getItemDOMElement(itemId: string): UiTreeItem | null {
        const all = this._getAllItems();
        return all.find(item => item.itemId === itemId) ?? null;
    }

    // ─── Render ──────────────────────────────────────────────────────────────────

    private _onSlotChange() {
        this._initRovingTabindex();
        this._initExpansion();
        this._syncExpansion();
    }

    render() {
        return html`
      <div class="tree-root" role="tree">
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-simple-tree-view': UiSimpleTreeView;
    }
}
