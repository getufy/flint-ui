# Tree View

<Demo label="Simple Tree View" html="<div style=&quot;width:100%;max-width:300px;border:1px solid #e5e7eb;border-radius:8px;padding:8px&quot;><flint-simple-tree-view>  <flint-tree-item item-id=&quot;1&quot; label=&quot;Documents&quot;>    <flint-tree-item item-id=&quot;1-1&quot; label=&quot;Resume.pdf&quot;></flint-tree-item>    <flint-tree-item item-id=&quot;1-2&quot; label=&quot;Cover Letter.pdf&quot;></flint-tree-item>  </flint-tree-item>  <flint-tree-item item-id=&quot;2&quot; label=&quot;Images&quot;>    <flint-tree-item item-id=&quot;2-1&quot; label=&quot;photo.jpg&quot;></flint-tree-item>    <flint-tree-item item-id=&quot;2-2&quot; label=&quot;screenshot.png&quot;></flint-tree-item>    <flint-tree-item item-id=&quot;2-3&quot; label=&quot;icon.svg&quot;></flint-tree-item>  </flint-tree-item>  <flint-tree-item item-id=&quot;3&quot; label=&quot;Notes.txt&quot;></flint-tree-item></flint-simple-tree-view></div>" />

<Demo label="Rich Tree View" html="<div style=&quot;width:100%;max-width:300px;border:1px solid #e5e7eb;border-radius:8px;padding:8px&quot;><flint-rich-tree-view data-props='{&quot;items&quot;:[{&quot;id&quot;:&quot;src&quot;,&quot;label&quot;:&quot;src&quot;,&quot;children&quot;:[{&quot;id&quot;:&quot;components&quot;,&quot;label&quot;:&quot;components&quot;,&quot;children&quot;:[{&quot;id&quot;:&quot;app&quot;,&quot;label&quot;:&quot;App.tsx&quot;},{&quot;id&quot;:&quot;header&quot;,&quot;label&quot;:&quot;Header.tsx&quot;},{&quot;id&quot;:&quot;footer&quot;,&quot;label&quot;:&quot;Footer.tsx&quot;}]},{&quot;id&quot;:&quot;utils&quot;,&quot;label&quot;:&quot;utils&quot;,&quot;children&quot;:[{&quot;id&quot;:&quot;helpers&quot;,&quot;label&quot;:&quot;helpers.ts&quot;},{&quot;id&quot;:&quot;constants&quot;,&quot;label&quot;:&quot;constants.ts&quot;}]},{&quot;id&quot;:&quot;index&quot;,&quot;label&quot;:&quot;index.ts&quot;}]},{&quot;id&quot;:&quot;public&quot;,&quot;label&quot;:&quot;public&quot;,&quot;children&quot;:[{&quot;id&quot;:&quot;favicon&quot;,&quot;label&quot;:&quot;favicon.ico&quot;},{&quot;id&quot;:&quot;robots&quot;,&quot;label&quot;:&quot;robots.txt&quot;}]},{&quot;id&quot;:&quot;pkg&quot;,&quot;label&quot;:&quot;package.json&quot;},{&quot;id&quot;:&quot;readme&quot;,&quot;label&quot;:&quot;README.md&quot;}],&quot;defaultExpandedItems&quot;:[&quot;src&quot;,&quot;components&quot;]}'></flint-rich-tree-view></div>" />

<Demo label="Rich Tree View with Drag & Drop Reordering" html="<div style=&quot;width:100%;max-width:300px;border:1px solid #e5e7eb;border-radius:8px;padding:8px&quot;><flint-rich-tree-view items-reordering items-reordering-handle data-props='{&quot;items&quot;:[{&quot;id&quot;:&quot;todo&quot;,&quot;label&quot;:&quot;To Do&quot;,&quot;children&quot;:[{&quot;id&quot;:&quot;t1&quot;,&quot;label&quot;:&quot;Design homepage&quot;},{&quot;id&quot;:&quot;t2&quot;,&quot;label&quot;:&quot;Write tests&quot;},{&quot;id&quot;:&quot;t3&quot;,&quot;label&quot;:&quot;Fix bug #42&quot;}]},{&quot;id&quot;:&quot;progress&quot;,&quot;label&quot;:&quot;In Progress&quot;,&quot;children&quot;:[{&quot;id&quot;:&quot;p1&quot;,&quot;label&quot;:&quot;API integration&quot;},{&quot;id&quot;:&quot;p2&quot;,&quot;label&quot;:&quot;Code review&quot;}]},{&quot;id&quot;:&quot;done&quot;,&quot;label&quot;:&quot;Done&quot;,&quot;children&quot;:[{&quot;id&quot;:&quot;d1&quot;,&quot;label&quot;:&quot;Setup project&quot;},{&quot;id&quot;:&quot;d2&quot;,&quot;label&quot;:&quot;Create database schema&quot;}]}],&quot;defaultExpandedItems&quot;:[&quot;todo&quot;,&quot;progress&quot;,&quot;done&quot;]}'></flint-rich-tree-view></div>" />

## `<flint-rich-tree-view>`

- **Tag**: `<flint-rich-tree-view>`
- **Class**: `FlintRichTreeView`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintRichTreeView } from 'flint-ui';
```

### Usage

```html
<flint-rich-tree-view></flint-rich-tree-view>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `items` | `items` | `RichTreeItem[]` | `[]` | Array of item data objects to render in the tree. |
| `dataSource` | `data-source` | `RichTreeViewDataSource` | — | Optional lazy-load data source. When provided, children are fetched on demand when the user expands an item. If `items` is empty, root items are also fetched on first render. |
| `getItemId` | `get-item-id` | `number` | — | Returns the unique string ID for an item. Defaults to `item.id`. |
| `getItemLabel` | `get-item-label` | `number` | — | Returns the display label for an item. Defaults to `item.label`. |
| `getItemChildren` | `get-item-children` | `number` | — | Returns the children array for an item. Defaults to `item.children`. |
| `isItemDisabled` | `is-item-disabled` | `number` | — | Returns `true` if the given item should be disabled. |
| `disabledItemsFocusable` | `disabled-items-focusable` | `boolean` | `false` | When `true`, disabled items can receive keyboard focus. When `false` (default), keyboard navigation skips disabled items. |
| `onItemClick` | `on-item-click` | `number` | — | Callback invoked when a tree item is clicked or activated via keyboard. |
| `expansionTrigger` | `expansion-trigger` | `'content' \| 'iconContainer'` | `'content'` | What interaction triggers expand/collapse. - `'content'` (default): clicking anywhere on the item row - `'iconContainer'`: clicking only the expand/collapse icon button |
| `expandedItems` | `expanded-items` | `string[]` | — | **Controlled mode.** The set of item IDs that should be expanded. You must update this via `onExpandedItemsChange` to apply user changes. |
| `defaultExpandedItems` | `default-expanded-items` | `string[]` | `[]` | **Uncontrolled mode.** Item IDs to expand on initial mount. |
| `onExpandedItemsChange` | `on-expanded-items-change` | `number` | — | Callback fired when the user toggles an item's expansion. |
| `itemsReordering` | `items-reordering` | `boolean` | `false` | When `true`, enables drag-and-drop reordering of items. |
| `isItemReorderable` | `is-item-reorderable` | `number` | — | Function that determines if a specific item can be reordered. Receives the item ID and should return `true` if reorderable. |
| `canMoveItemToNewPosition` | `can-move-item-to-new-position` | `(params: {         itemId: string` | — | Function that determines if an item can be moved to a specific target position. Receives context about the move and should return `true` if allowed. |
| `itemsReorderingHandle` | `items-reordering-handle` | `boolean` | `false` | Whether to use a drag handle icon for reordering. - `false` (default): Dragging from anywhere on the row triggers reordering. - `true`: Only dragging from the handle icon triggers reordering. |
| `onItemPositionChange` | `on-item-position-change` | `(params: {         itemId: string` | — | Fired when an item's position changes via reordering. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-tree-view-error` | `{ message: `Failed to load children for ${id }` |  |
| `flint-tree-view-expanded-items-change` | `{ expandedItems: newItems }` |  |
| `flint-tree-view-item-click` | `{ itemId }` |  |
| `flint-tree-view-item-position-change` | `{ itemId, newParentId, newIndex }` |  |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-font-family` | — |
| `--flint-text-color` | — |
| `--flint-primary-color` | — |
| `--flint-border-radius-sm` | — |
| `--flint-hover-color` | — |
| `--flint-active-color` | — |
| `--flint-primary-color-light` | — |
| `--flint-text-color-muted` | — |

### Methods

| Method | Description |
| --- | --- |
| `getItemTree(): RichTreeItem[]` | Returns the current items tree. Returns the reordered tree if reordering is active. |
| `getItemOrderedChildrenIds(itemId: string \| null): string[]` | Returns the ordered child IDs for an item, or root items if null. |
| `setIsItemDisabled(id: string, disabled: boolean)` | Imperatively toggle the disabled state of an item by ID. Overrides the `isItemDisabled` prop result for that specific item. |

---

## `<flint-simple-tree-view>`

A simple tree-view container that manages keyboard navigation, focus, and item selection/expansion for nested `flint-tree-item` elements.

- **Tag**: `<flint-simple-tree-view>`
- **Class**: `FlintSimpleTreeView`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintSimpleTreeView } from 'flint-ui';
```

### Usage

```html
<flint-simple-tree-view></flint-simple-tree-view>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `disabledItemsFocusable` | `disabled-items-focusable` | `boolean` | `false` | When `true`, disabled items can receive keyboard focus. When `false` (default), keyboard navigation skips disabled items. |
| `onItemClick` | `on-item-click` | `number` | — | Callback invoked when a tree item is clicked or activated via keyboard. Receives the `itemId` of the activated item. |
| `expandedItems` | `expanded-items` | `string[]` | — | **Controlled mode.** The set of item IDs that should be expanded. When set, the component uses this as the source of truth. You must update this prop (via `onExpandedItemsChange`) to apply user changes. Set to `undefined` to switch back to uncontrolled mode. |
| `defaultExpandedItems` | `default-expanded-items` | `string[]` | `[]` | **Uncontrolled mode.** Item IDs to expand on initial mount. Ignored once the component has mounted. Has no effect in controlled mode. |
| `onExpandedItemsChange` | `on-expanded-items-change` | `number` | — | Callback fired when the user toggles an item's expansion. Receives the full new array of expanded item IDs. In controlled mode, update `expandedItems` with the received value. |
| `expansionTrigger` | `expansion-trigger` | `'content' \| 'iconContainer'` | `'content'` | What interaction triggers expand/collapse. - `'content'` (default): clicking anywhere on the item row - `'iconContainer'`: clicking only the expand/collapse icon button |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-tree-view-item-click` | — | When a tree item is activated (detail: { itemId }) |
| `flint-tree-view-expanded-items-change` | — | When the expanded set changes (detail: { expandedItems }) |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Place `flint-tree-item` elements here. |

---

## `<flint-tree-item>`

A single item inside a `flint-simple-tree-view` or `flint-rich-tree-view`.

- **Tag**: `<flint-tree-item>`
- **Class**: `FlintTreeItem`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintTreeItem } from 'flint-ui';
```

### Usage

```html
<flint-tree-item></flint-tree-item>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `itemId` | `item-id` | `string` | `''` | Unique identifier for this item within the tree |
| `label` | `label` | `string` | `''` | Label text displayed for this item |
| `disabled` | `disabled` | `boolean` | `false` | Whether this item is disabled (non-interactive) |
| `expanded` | `expanded` | `boolean` | `false` | Whether this item's children are visible |
| `hasChildren` | `has-children` | `boolean` | `false` | When `true`, forces the expand button to render even if no `flint-tree-item` children are currently in the slot. Used by `flint-rich-tree-view` for lazy loading so items known to have children show the toggle before data is fetched. |
| `dropPosition` | `drop-position` | `'before' \| 'after' \| 'inside' \| null` | `null` | FIX: Removed the Lit @property declaration for `draggable`. Declaring it as a Lit property shadows the native HTMLElement.draggable, meaning the browser never sees draggable="true" on the host and won't initiate a drag. We now forward draggable state directly to the inner .item-row div via the `_isDraggable` state, keeping the host's native draggable untouched (it stays false, which is fine — the row fires the dragstart which bubbles up through the shadow root to the tree view). / /** Called by flint-rich-tree-view to set drag enabled state. Uses a method + @state instead of a @property to avoid clobbering the native `draggable` attribute on the host element. not the whole row. The handle div gets draggable="true" and the row stays non-draggable. / setDraggable(value: boolean, handleOnly = false) { this._isDraggable = value; this._handleOnly = handleOnly; } /** Visual drop position indicator — reflected so CSS :host selectors match |
| `showDragHandle` | `show-drag-handle` | `boolean` | `false` | Whether to show a dedicated drag handle icon |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-tree-item-click` | — | Fired when the item is clicked (detail: { itemId }) |
| `flint-tree-item-toggle` | — | Fired when expanded state changes (detail: { itemId, expanded }) |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Place child `flint-tree-item` elements here to create a nested tree. |
| `label` |  |

### Methods

| Method | Description |
| --- | --- |
| `setDraggable(value: boolean, handleOnly = false)` | Called by flint-rich-tree-view to set drag enabled state. Uses a method + @state instead of a @property to avoid clobbering the native `draggable` attribute on the host element. not the whole row. The handle div gets draggable="true" and the row stays non-draggable. |

---
