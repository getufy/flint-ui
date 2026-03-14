import { LitElement, unsafeCSS, html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { FlintTreeItem } from './flint-tree-item.js';
import uiRichTreeViewStyles from './flint-rich-tree-view.css?inline';
import './flint-tree-item.js';

export type RichTreeItem = Record<string, unknown>;

/**
 * Data source for lazy loading.
 *
 * @method getTreeItems   - Returns children for a given parent ID, or root items when `null`.
 * @method getChildrenCount - Returns the number of children for the item.
 *   Return a positive number if known, -1 if the item has children but the count is unknown,
 *   or 0 if the item has no children.
 */
export interface RichTreeViewDataSource {
    getTreeItems(parentId: string | null): Promise<RichTreeItem[]>;
    getChildrenCount(item: RichTreeItem): number;
}

/**
 * A data-driven tree view that renders its structure from an `items` array.
 *
 * Unlike `flint-simple-tree-view` (which uses a slot), `flint-rich-tree-view` renders
 * `flint-tree-item` elements internally from data.
 *
 * **Lazy loading:** Provide a `dataSource` to load children on demand.
 * Pass an empty `items` array to also load the root level lazily.
 *
 * @prop {RichTreeItem[]}                        items            - Array of item data objects.
 * @prop {RichTreeViewDataSource}                dataSource       - Optional lazy-load data source.
 * @prop {(item) => string}                      getItemId        - Extract unique ID (default: `item.id`).
 * @prop {(item) => string}                      getItemLabel     - Extract label (default: `item.label`).
 * @prop {(item) => RichTreeItem[] | undefined}  getItemChildren  - Extract children (default: `item.children`).
 * @prop {(item) => boolean}                     isItemDisabled   - Return true to disable an item.
 *
 * @fires item-click            - When a tree item is activated (detail: { itemId })
 * @fires expanded-items-change - When the expanded set changes (detail: { expandedItems })
 */
@customElement('flint-rich-tree-view')
export class FlintRichTreeView extends LitElement {
    static styles = unsafeCSS(uiRichTreeViewStyles);

    // ─── Data props ───────────────────────────────────────────────────────────

    /** Array of item data objects to render in the tree. */
    @property({ attribute: false })
    items: RichTreeItem[] = [];

    /**
     * Optional lazy-load data source. When provided, children are fetched
     * on demand when the user expands an item. If `items` is empty, root
     * items are also fetched on first render.
     */
    @property({ attribute: false })
    dataSource?: RichTreeViewDataSource;

    /** Returns the unique string ID for an item. Defaults to `item.id`. */
    @property({ attribute: false })
    getItemId: (item: RichTreeItem) => string = (item) => item['id'] as string;

    /** Returns the display label for an item. Defaults to `item.label`. */
    @property({ attribute: false })
    getItemLabel: (item: RichTreeItem) => string = (item) => item['label'] as string;

    /** Returns the children array for an item. Defaults to `item.children`. */
    @property({ attribute: false })
    getItemChildren: (item: RichTreeItem) => RichTreeItem[] | undefined = (item) =>
        item['children'] as RichTreeItem[] | undefined;

    /** Returns `true` if the given item should be disabled. */
    @property({ attribute: false })
    isItemDisabled: (item: RichTreeItem) => boolean = () => false;

    // ─── Behaviour props ──────────────────────────────────────────────────────

    /**
     * When `true`, disabled items can receive keyboard focus.
     * When `false` (default), keyboard navigation skips disabled items.
     */
    @property({ type: Boolean, attribute: 'disabled-items-focusable' })
    disabledItemsFocusable = false;

    /** Callback invoked when a tree item is clicked or activated via keyboard. */
    @property({ attribute: false })
    onItemClick?: (itemId: string) => void;

    /**
     * What interaction triggers expand/collapse.
     * - `'content'` (default): clicking anywhere on the item row
     * - `'iconContainer'`: clicking only the expand/collapse icon button
     */
    @property({ type: String, attribute: 'expansion-trigger' })
    expansionTrigger: 'content' | 'iconContainer' = 'content';

    /**
     * **Controlled mode.** The set of item IDs that should be expanded.
     * You must update this via `onExpandedItemsChange` to apply user changes.
     */
    @property({ attribute: false })
    expandedItems?: string[];

    /**
     * **Uncontrolled mode.** Item IDs to expand on initial mount.
     */
    @property({ attribute: false })
    defaultExpandedItems: string[] = [];

    /** Callback fired when the user toggles an item's expansion. */
    @property({ attribute: false })
    onExpandedItemsChange?: (itemIds: string[]) => void;

    // ─── Reordering props ─────────────────────────────────────────────────────

    /**
     * When `true`, enables drag-and-drop reordering of items.
     */
    @property({ type: Boolean, attribute: 'items-reordering' })
    itemsReordering = false;

    /**
     * Function that determines if a specific item can be reordered.
     * Receives the item ID and should return `true` if reorderable.
     */
    @property({ attribute: false })
    isItemReorderable?: (itemId: string) => boolean;

    /**
     * Function that determines if an item can be moved to a specific target position.
     * Receives context about the move and should return `true` if allowed.
     */
    @property({ attribute: false })
    canMoveItemToNewPosition?: (params: {
        itemId: string;
        targetId: string;
        position: 'before' | 'after' | 'inside';
    }) => boolean;

    /**
     * Whether to use a drag handle icon for reordering.
     * - `false` (default): Dragging from anywhere on the row triggers reordering.
     * - `true`: Only dragging from the handle icon triggers reordering.
     */
    @property({ type: Boolean, attribute: 'items-reordering-handle' })
    itemsReorderingHandle = false;

    /** Fired when an item's position changes via reordering. */
    @property({ attribute: false })
    onItemPositionChange?: (params: {
        itemId: string;
        newParentId: string | null;
        newIndex: number;
    }) => void;

    // ─── Internal state ───────────────────────────────────────────────────────

    /** Tracks expanded IDs in uncontrolled mode. */
    private _internalExpandedItems = new Set<string>();
    /** Prevents `defaultExpandedItems` from being re-applied on subsequent item changes. */
    private _expansionInitialized = false;
    /** Stores imperative disabled overrides from `setIsItemDisabled()`. */
    private _disabledOverrides = new Map<string, boolean>();

    /** Lazily loaded children keyed by parent ID (`null` = root). */
    private _lazyChildren = new Map<string | null, RichTreeItem[]>();
    /** IDs currently being fetched. */
    private _loading = new Set<string | null>();

    // ─── Reordering state ─────────────────────────────────────────────────────

    /**
     * Current ordered state of items when reordering is active.
     * Initialized from `items` on first drag.
     */
    @state() private _orderedItems: RichTreeItem[] | null = null;
    /** ID of the item currently being dragged. */
    @state() private _draggedItemId: string | null = null;
    /** ID of the item being dragged over. */
    @state() private _dropTargetId: string | null = null;
    /** Visual indicator of where the item will be dropped. */
    @state() private _dropPosition: 'before' | 'after' | 'inside' | null = null;

    private get _isControlled(): boolean {
        return this.expandedItems !== undefined;
    }

    // ─── Lifecycle ────────────────────────────────────────────────────────────

    connectedCallback() {
        super.connectedCallback();
        // Listen on shadowRoot so event.target is not retargeted (items are in shadow DOM)
        this.shadowRoot!.addEventListener('keydown', this._handleKeydown as EventListener);
        this.shadowRoot!.addEventListener('flint-tree-item-click', this._handleItemClick as EventListener);
        this.shadowRoot!.addEventListener('flint-tree-item-toggle', this._handleFlintToggle as EventListener);
        this.shadowRoot!.addEventListener('focusin', this._handleFocusIn as EventListener);

        // Drag & Drop
        this.shadowRoot!.addEventListener('dragstart', this._handleDragStart as EventListener);
        this.shadowRoot!.addEventListener('dragover', this._handleDragOver as EventListener);
        this.shadowRoot!.addEventListener('dragend', this._handleDragEnd as EventListener);
        this.shadowRoot!.addEventListener('drop', this._handleDrop as EventListener);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.shadowRoot!.removeEventListener('keydown', this._handleKeydown as EventListener);
        this.shadowRoot!.removeEventListener('flint-tree-item-click', this._handleItemClick as EventListener);
        this.shadowRoot!.removeEventListener('flint-tree-item-toggle', this._handleFlintToggle as EventListener);
        this.shadowRoot!.removeEventListener('focusin', this._handleFocusIn as EventListener);

        // Drag & Drop
        this.shadowRoot!.removeEventListener('dragstart', this._handleDragStart as EventListener);
        this.shadowRoot!.removeEventListener('dragover', this._handleDragOver as EventListener);
        this.shadowRoot!.removeEventListener('dragend', this._handleDragEnd as EventListener);
        this.shadowRoot!.removeEventListener('drop', this._handleDrop as EventListener);
    }

    protected willUpdate(_changedProperties: PropertyValues) {
        super.willUpdate(_changedProperties);

        // Reset lazy state when dataSource is replaced
        if (_changedProperties.has('dataSource')) {
            this._lazyChildren.clear();
            this._loading.clear();
        }

        // Trigger root lazy load when dataSource is present and items is empty
        if (this.dataSource && this.items.length === 0 &&
            !this._lazyChildren.has(null) && !this._loading.has(null)) {
            void this._loadChildren(null);
        }
    }

    protected updated(_changedProperties: PropertyValues) {
        super.updated(_changedProperties);

        if (_changedProperties.has('disabledItemsFocusable')) {
            this._initRovingTabindex();
        }
        if (_changedProperties.has('expandedItems')) {
            this._syncExpansion();
        }
        if (_changedProperties.has('items')) {
            if (!this._expansionInitialized) {
                this._initExpansion();
            } else {
                this._syncExpansion();
                this._initRovingTabindex();
            }
        }

        // Push draggable state into each item's inner row after every render.
        // We use setDraggable() because the native HTMLElement.draggable was being
        // shadowed by a Lit @property — the fix lives in flint-tree-item.ts.
        if (this.itemsReordering) {
            this._getAllItems().forEach(item => {
                const canDrag = this.isItemReorderable ? this.isItemReorderable(item.itemId) : true;
                // Pass handleOnly=true so only the handle icon is draggable, not the whole row.
                item.setDraggable(canDrag, this.itemsReorderingHandle);
            });
        }
    }

    // ─── Lazy loading ─────────────────────────────────────────────────────────

    private async _loadChildren(id: string | null) {
        if (!this.dataSource || this._loading.has(id) || this._lazyChildren.has(id)) return;
        this._loading.add(id);
        this.requestUpdate();
        try {
            const children = await this.dataSource.getTreeItems(id);
            this._lazyChildren.set(id, children);
        } catch (err) {
            // For root loads (id=null) cache an empty result to break the retry loop in updated().
            // For child loads, don't cache — the next expand click triggers a fresh attempt.
            if (id === null) this._lazyChildren.set(null, []);
            console.error('[flint-rich-tree-view] Failed to load children for', id, err);
        } finally {
            this._loading.delete(id);
            this.requestUpdate();
            await this.updateComplete;
            this._syncExpansion();
            this._initRovingTabindex();
        }
    }

    // ─── Item data helpers ────────────────────────────────────────────────────

    private _getEffectiveDisabled(item: RichTreeItem): boolean {
        const id = this.getItemId(item);
        if (this._disabledOverrides.has(id)) {
            return this._disabledOverrides.get(id)!;
        }
        return this.isItemDisabled(item);
    }

    private _findItemById(id: string, items: RichTreeItem[]): RichTreeItem | null {
        for (const item of items) {
            if (this.getItemId(item) === id) return item;
            const children = this.getItemChildren(item) ?? [];
            const found = this._findItemById(id, children);
            if (found) return found;
        }
        return null;
    }

    private _getEffectiveItems(): RichTreeItem[] {
        if (this.itemsReordering && this._orderedItems) {
            return this._orderedItems;
        }
        return this.items;
    }

    private _cloneItemsTree(items: RichTreeItem[]): RichTreeItem[] {
        return items.map(item => {
            const clone = { ...item };
            const children = this.getItemChildren(item);
            if (children) {
                // Try to identify which key holds the children array to preserve it in the clone
                const childrenKey = Object.keys(item).find(k => item[k] === children) || 'children';
                clone[childrenKey] = this._cloneItemsTree(children);
            }
            return clone;
        });
    }

    /** Find an item and its parent list/index within a tree structure. */
    private _findItemAndParentInTree(
        id: string,
        items: RichTreeItem[],
        parentId: string | null = null
    ): { item: RichTreeItem; parentList: RichTreeItem[]; index: number; parentId: string | null } | null {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (this.getItemId(item) === id) {
                return { item, parentList: items, index: i, parentId };
            }
            const children = this.getItemChildren(item) ?? [];
            const found = this._findItemAndParentInTree(id, children, this.getItemId(item));
            if (found) return found;
        }
        return null;
    }

    /**
     * FIX #2: Replaced the broken _isDescendantOf() with _isAncestorOf().
     *
     * Old code checked if `parentId` had `childId` as a DIRECT child only,
     * and the call-site had the arguments backwards (checking if the dragged
     * item is a descendant of the target, instead of the other way around).
     *
     * New code: returns true if `ancestorId` is an ancestor of `targetId`
     * anywhere in the subtree (deep, recursive check).
     */
    private _isAncestorOf(ancestorId: string, targetId: string, items: RichTreeItem[]): boolean {
        for (const item of items) {
            if (this.getItemId(item) === ancestorId) {
                // Found the ancestor — check if targetId exists anywhere in its subtree
                return !!this._findItemById(targetId, this.getItemChildren(item) ?? []);
            }
            if (this._isAncestorOf(ancestorId, targetId, this.getItemChildren(item) ?? [])) {
                return true;
            }
        }
        return false;
    }

    // ─── DOM helpers ──────────────────────────────────────────────────────────

    /** Items live in shadow DOM, so we query from shadowRoot. */
    private _getAllItems(): FlintTreeItem[] {
        return Array.from(this.shadowRoot!.querySelectorAll('flint-tree-item')) as FlintTreeItem[];
    }

    private _getVisibleItems(): FlintTreeItem[] {
        return this._getAllItems().filter(item => this._isVisible(item));
    }

    /**
     * An item is visible if no ancestor flint-tree-item is collapsed.
     * Traversal stops at null (shadow DOM root has no parentElement).
     */
    private _isVisible(item: FlintTreeItem): boolean {
        let parent = item.parentElement;
        while (parent !== null) {
            if (parent.tagName === 'FLINT-TREE-ITEM' && !(parent as FlintTreeItem).expanded) {
                return false;
            }
            parent = parent.parentElement;
        }
        return true;
    }

    private _getFocusableItems(): FlintTreeItem[] {
        const visible = this._getVisibleItems();
        return this.disabledItemsFocusable
            ? visible
            : visible.filter(item => !item.disabled);
    }

    private _itemHasChildren(item: FlintTreeItem): boolean {
        // hasChildren prop is set by us in _renderItem — covers both lazy and non-lazy
        if (item.hasChildren) return true;
        return Array.from(item.children).some(el => el.tagName === 'FLINT-TREE-ITEM');
    }

    // ─── Expansion management ─────────────────────────────────────────────────

    private _initExpansion() {
        if (this._expansionInitialized) return;
        this._expansionInitialized = true;
        if (!this._isControlled && this.defaultExpandedItems.length > 0) {
            this._internalExpandedItems = new Set(this.defaultExpandedItems);
        }
        this._syncExpansion();
        this._initRovingTabindex();
    }

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

    private _handleToggle(item: FlintTreeItem, newExpanded: boolean) {
        // Kick off lazy load before expansion so children appear immediately after fetch
        if (newExpanded && this.dataSource &&
            !this._lazyChildren.has(item.itemId) && !this._loading.has(item.itemId)) {
            void this._loadChildren(item.itemId);
        }

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
            this._syncExpansion();
        } else {
            if (newExpanded) this._internalExpandedItems.add(item.itemId);
            else this._internalExpandedItems.delete(item.itemId);
            this._syncExpansion();
        }
    }

    // ─── Focus management (roving tabindex) ───────────────────────────────────

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

    private _focusItem(item: FlintTreeItem) {
        this._getAllItems().forEach(i => i.setAttribute('tabindex', '-1'));
        item.setAttribute('tabindex', '0');
        item.focus();
    }

    // ─── Event handlers ───────────────────────────────────────────────────────

    /** Maintains roving tabindex as focus moves within the tree. */
    private _handleFocusIn = (e: FocusEvent) => {
        const target = e.target as Element;
        if (target.tagName !== 'FLINT-TREE-ITEM') return;
        this._getAllItems().forEach(i => i.setAttribute('tabindex', '-1'));
        (target as FlintTreeItem).setAttribute('tabindex', '0');
    };

    /** Handles the `flint-tree-item-toggle` event from the expand icon button. */
    private _handleFlintToggle = (e: Event) => {
        const { itemId, expanded } = (e as CustomEvent).detail as { itemId: string; expanded: boolean };
        const item = this.getItemDOMElement(itemId);
        if (item) this._handleToggle(item, expanded);
    };

    /** Handles `flint-tree-item-click` (row click). Also triggers expansion in content mode. */
    private _handleItemClick = (e: Event) => {
        const { itemId } = (e as CustomEvent).detail as { itemId: string };

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
    };

    private _handleKeydown = (e: KeyboardEvent) => {
        const target = e.target as Element;
        if (target.tagName !== 'FLINT-TREE-ITEM') return;

        const focusedItem = target as FlintTreeItem;
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
                    this._handleToggle(focusedItem, true);
                } else if (focusedItem.expanded) {
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
                    this._handleToggle(focusedItem, false);
                } else {
                    const parent = focusedItem.parentElement;
                    if (parent && parent.tagName === 'FLINT-TREE-ITEM') {
                        this._focusItem(parent as FlintTreeItem);
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

    // ─── Public API ───────────────────────────────────────────────────────────

    /**
     * Returns the data item with the given ID, or `null` if not found.
     * Performs a depth-first search through the items tree.
     */
    getItem(id: string): RichTreeItem | null {
        return this._findItemById(id, this._getEffectiveItems());
    }

    /**
     * Returns the DOM element for the tree item with the given ID, or `null`.
     */
    getItemDOMElement(id: string): FlintTreeItem | null {
        return this._getAllItems().find(item => item.itemId === id) ?? null;
    }

    /**
     * Returns the current items tree. Returns the reordered tree if reordering is active.
     */
    getItemTree(): RichTreeItem[] {
        return this._getEffectiveItems();
    }

    /**
     * Returns the ordered child IDs for an item, or root items if null.
     */
    getItemOrderedChildrenIds(itemId: string | null): string[] {
        const items = this._getEffectiveItems();
        if (itemId === null) {
            return items.map(i => this.getItemId(i));
        }
        const item = this._findItemById(itemId, items);
        if (!item) return [];
        const children = this.getItemChildren(item) ?? [];
        return children.map(i => this.getItemId(i));
    }

    /**
     * Imperatively toggle the disabled state of an item by ID.
     * Overrides the `isItemDisabled` prop result for that specific item.
     */
    setIsItemDisabled(id: string, disabled: boolean) {
        this._disabledOverrides.set(id, disabled);
        this.requestUpdate();
    }

    // ─── Rendering ────────────────────────────────────────────────────────────

    private _renderItem(item: RichTreeItem, depth = 0): TemplateResult {
        const id = this.getItemId(item);
        const label = this.getItemLabel(item);
        const disabled = this._getEffectiveDisabled(item);

        let children: RichTreeItem[] = [];
        let isLoading = false;
        let knownHasChildren = false;

        if (this.dataSource) {
            if (this._lazyChildren.has(id)) {
                children = this._lazyChildren.get(id)!;
                knownHasChildren = children.length > 0;
            } else {
                isLoading = this._loading.has(id);
                // getChildrenCount: 0 = no children, >0 or -1 = has children
                knownHasChildren = this.dataSource.getChildrenCount(item) !== 0;
            }
        } else {
            children = this.getItemChildren(item) ?? [];
            knownHasChildren = children.length > 0;
        }

        // Indentation for the loading indicator matches the child level
        const loadingPadding = (depth + 1) * 24 + 8;

        return html`
      <flint-tree-item
        item-id=${id}
        label=${label}
        ?disabled=${disabled}
        ?has-children=${knownHasChildren}
        ?show-drag-handle=${this.itemsReordering && this.itemsReorderingHandle}
      >
        ${isLoading ? html`
          <div class="lazy-indicator" style="padding-left:${loadingPadding}px">
            <span class="lazy-spinner"></span>
            <span>Loading…</span>
          </div>
        ` : nothing}
        ${children.map(child => this._renderItem(child, depth + 1))}
      </flint-tree-item>
    `;
    }

    render() {
        const items = this._getEffectiveItems();
        // When dataSource is set and items is empty, root items come from lazy cache
        const rootItems = (this.dataSource && items.length === 0)
            ? (this._lazyChildren.get(null) ?? [])
            : items;

        const rootLoading = this.dataSource !== undefined &&
            this.items.length === 0 &&
            this._loading.has(null);

        return html`
      <div class="tree-root" role="tree">
        ${rootLoading ? html`
          <div class="lazy-indicator lazy-root">
            <span class="lazy-spinner"></span>
            <span>Loading…</span>
          </div>
        ` : nothing}
        ${rootItems.map(item => this._renderItem(item))}
      </div>
    `;
    }

    // ─── Drag & Drop Handlers ─────────────────────────────────────────────────

    private _getTreeItemFromEvent(e: DragEvent): FlintTreeItem | null {
        // composedPath() is populated correctly in real browsers but is often
        // empty in jsdom (test environment) for events dispatched across shadow
        // boundaries. Fall back to e.target when the path yields nothing useful.
        const path = e.composedPath();
        for (const target of path) {
            if (target instanceof HTMLElement && target.tagName === 'FLINT-TREE-ITEM') {
                return target as FlintTreeItem;
            }
        }
        // Fallback: if the event was dispatched directly on the flint-tree-item host
        // (as done in tests), e.target IS the element we want.
        const t = e.target as HTMLElement | null;
        if (t && t.tagName === 'FLINT-TREE-ITEM') return t as unknown as FlintTreeItem;
        // Also check immediate parent in case event landed on a child element.
        const p = t?.closest?.('flint-tree-item') as FlintTreeItem | null;
        return p ?? null;
    }

    private _handleDragStart = (e: DragEvent) => {
        if (!this.itemsReordering) return;

        const treeItem = this._getTreeItemFromEvent(e);
        if (!treeItem) return;

        // FIX #4: Removed the early `break` on UI-TREE-ITEM that prevented
        // handle detection. Now scans the full composedPath() for data-drag-handle
        // without stopping at the tree item boundary.
        if (this.itemsReorderingHandle) {
            const path = e.composedPath();
            const isHandle = path.some(
                el => el instanceof HTMLElement && (el as HTMLElement).hasAttribute('data-drag-handle')
            );
            if (!isHandle) {
                e.preventDefault();
                return;
            }
        }

        if (this.isItemReorderable && !this.isItemReorderable(treeItem.itemId)) {
            e.preventDefault();
            return;
        }

        this._draggedItemId = treeItem.itemId;
        if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', treeItem.itemId);
        }

        // Initialize reordered state if not already done
        if (!this._orderedItems) {
            this._orderedItems = this._cloneItemsTree(this.items);
        }

        // Add dragging attribute to the item's DOM for visual feedback
        treeItem.setAttribute('dragging', '');
    };

    private _handleDragOver = (e: DragEvent) => {
        if (!this.itemsReordering || !this._draggedItemId) return;

        const treeItem = this._getTreeItemFromEvent(e);
        if (!treeItem) return;

        e.preventDefault();
        if (e.dataTransfer) {
            e.dataTransfer.dropEffect = 'move';
        }

        const targetId = treeItem.itemId;
        if (targetId === this._draggedItemId) {
            this._clearDropTarget();
            return;
        }

        // FIX #2: Was _isDescendantOf(draggedId, targetId) with inverted/shallow logic.
        // Now correctly asks: "is the dragged item an ancestor of the target?"
        // preventing a parent from being dropped into its own descendant.
        if (this._isAncestorOf(this._draggedItemId, targetId, this._getEffectiveItems())) {
            this._clearDropTarget();
            return;
        }

        // Determine drop position based on cursor Y relative to item height
        const rect = treeItem.getBoundingClientRect();
        const relativeY = e.clientY - rect.top;
        const height = rect.height;

        let position: 'before' | 'after' | 'inside' = 'inside';
        if (relativeY < height * 0.25) position = 'before';
        else if (relativeY > height * 0.75) position = 'after';

        // Check if movement is allowed
        if (this.canMoveItemToNewPosition && !this.canMoveItemToNewPosition({
            itemId: this._draggedItemId,
            targetId,
            position
        })) {
            this._clearDropTarget();
            return;
        }

        if (this._dropTargetId !== targetId || this._dropPosition !== position) {
            this._dropTargetId = targetId;
            this._dropPosition = position;
            this._updateItemDropStates();
        }
    };

    private _handleDragEnd = (e: DragEvent) => {
        const treeItem = this._getTreeItemFromEvent(e);
        if (treeItem) {
            treeItem.removeAttribute('dragging');
        }
        this._draggedItemId = null;
        this._clearDropTarget();
    };

    private _handleDrop = (e: DragEvent) => {
        if (!this.itemsReordering || !this._draggedItemId || !this._dropTargetId || !this._dropPosition) {
            return;
        }

        e.preventDefault();

        const itemId = this._draggedItemId;
        const targetId = this._dropTargetId;
        const position = this._dropPosition;

        this._moveItem(itemId, targetId, position);

        this._draggedItemId = null;
        this._clearDropTarget();
    };

    private _clearDropTarget() {
        this._dropTargetId = null;
        this._dropPosition = null;
        this._updateItemDropStates();
    }

    private _updateItemDropStates() {
        this._getAllItems().forEach(item => {
            if (item.itemId === this._dropTargetId) {
                item.dropPosition = this._dropPosition;
            } else {
                item.dropPosition = null;
            }
        });
    }

    private _moveItem(itemId: string, targetId: string, position: 'before' | 'after' | 'inside') {
        if (!this._orderedItems) return;

        const fromResult = this._findItemAndParentInTree(itemId, this._orderedItems);
        const toResult = this._findItemAndParentInTree(targetId, this._orderedItems);

        if (!fromResult || !toResult) return;

        // Snapshot the source list reference BEFORE splicing, so we can detect
        // same-list moves after the removal shifts indices.
        const sourceList = fromResult.parentList;

        // Remove from current position
        sourceList.splice(fromResult.index, 1);

        // Calculate new position
        let newParentId: string | null = null;
        let newIndex = 0;

        if (position === 'inside') {
            const targetItem = toResult.item;
            const children = this.getItemChildren(targetItem);
            const childrenKey = Object.keys(targetItem).find(k => targetItem[k] === children) || 'children';

            if (!targetItem[childrenKey]) targetItem[childrenKey] = [];
            const childrenArray = targetItem[childrenKey] as RichTreeItem[];
            childrenArray.push(fromResult.item);
            newParentId = targetId;
            newIndex = childrenArray.length - 1;
        } else {
            // FIX #3: Re-find the target AFTER the splice so the index reflects
            // the shifted state of the list. This is correct for both cross-parent
            // and same-list moves. The re-found index is the post-removal position,
            // which is exactly where we want to anchor before/after insertion.
            const currentToResult = this._findItemAndParentInTree(targetId, this._orderedItems);
            if (!currentToResult) return;

            const insertIndex = position === 'before'
                ? currentToResult.index
                : currentToResult.index + 1;

            currentToResult.parentList.splice(insertIndex, 0, fromResult.item);
            newParentId = currentToResult.parentId;
            newIndex = insertIndex;
        }

        this._orderedItems = [...this._orderedItems];
        this.onItemPositionChange?.({
            itemId,
            newParentId,
            newIndex
        });

        this.dispatchEvent(new CustomEvent('item-position-change', {
            detail: { itemId, newParentId, newIndex },
            bubbles: true,
            composed: true
        }));
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-rich-tree-view': FlintRichTreeView;
    }
}