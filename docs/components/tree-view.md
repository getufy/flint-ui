# Tree View

<Demo label="Simple Tree View" html='<div style="width:100%;max-width:300px;border:1px solid #e5e7eb;border-radius:8px;padding:8px"><flint-simple-tree-view>  <flint-tree-item item-id="1" label="Documents">    <flint-tree-item item-id="1-1" label="Resume.pdf"></flint-tree-item>    <flint-tree-item item-id="1-2" label="Cover Letter.pdf"></flint-tree-item>  </flint-tree-item>  <flint-tree-item item-id="2" label="Images">    <flint-tree-item item-id="2-1" label="photo.jpg"></flint-tree-item>    <flint-tree-item item-id="2-2" label="screenshot.png"></flint-tree-item>    <flint-tree-item item-id="2-3" label="icon.svg"></flint-tree-item>  </flint-tree-item>  <flint-tree-item item-id="3" label="Notes.txt"></flint-tree-item></flint-simple-tree-view></div>' />

<Demo label="Rich Tree View" html='<div style="width:100%;max-width:300px;border:1px solid #e5e7eb;border-radius:8px;padding:8px"><flint-rich-tree-view data-props=&#39;{"items":[{"id":"src","label":"src","children":[{"id":"components","label":"components","children":[{"id":"app","label":"App.tsx"},{"id":"header","label":"Header.tsx"},{"id":"footer","label":"Footer.tsx"}]},{"id":"utils","label":"utils","children":[{"id":"helpers","label":"helpers.ts"},{"id":"constants","label":"constants.ts"}]},{"id":"index","label":"index.ts"}]},{"id":"public","label":"public","children":[{"id":"favicon","label":"favicon.ico"},{"id":"robots","label":"robots.txt"}]},{"id":"pkg","label":"package.json"},{"id":"readme","label":"README.md"}],"defaultExpandedItems":["src","components"]}&#39;></flint-rich-tree-view></div>' />

<Demo label="Rich Tree View with Drag & Drop Reordering" html='<div style="width:100%;max-width:300px;border:1px solid #e5e7eb;border-radius:8px;padding:8px"><flint-rich-tree-view items-reordering items-reordering-handle data-props=&#39;{"items":[{"id":"todo","label":"To Do","children":[{"id":"t1","label":"Design homepage"},{"id":"t2","label":"Write tests"},{"id":"t3","label":"Fix bug #42"}]},{"id":"progress","label":"In Progress","children":[{"id":"p1","label":"API integration"},{"id":"p2","label":"Code review"}]},{"id":"done","label":"Done","children":[{"id":"d1","label":"Setup project"},{"id":"d2","label":"Create database schema"}]}],"defaultExpandedItems":["todo","progress","done"]}&#39;></flint-rich-tree-view></div>' />

## `<flint-rich-tree-view>`

A data-driven tree view that renders its structure from an `items` array.

- **Tag**: `<flint-rich-tree-view>`
- **Class**: `FlintRichTreeView`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintRichTreeView } from '@getufy/flint-ui';
```

### Usage

```html
<flint-rich-tree-view></flint-rich-tree-view>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `items` | `items` | `RichTreeItem[]` | `[]` | Array of item data objects. |
| `dataSource` | `dataSource` | `RichTreeViewDataSource` | — | Optional lazy-load data source. |
| `getItemId` | `getItemId` | `(item) =&gt; string` | — | Extract unique ID (default: `item.id`). |
| `getItemLabel` | `getItemLabel` | `(item) =&gt; string` | — | Extract label (default: `item.label`). |
| `getItemChildren` | `getItemChildren` | `(item) =&gt; RichTreeItem[] \| undefined` | — | Extract children (default: `item.children`). |
| `isItemDisabled` | `isItemDisabled` | `(item) =&gt; boolean` | — | Return true to disable an item. |
| `disabledItemsFocusable` | `disabled-items-focusable` | `boolean` | `false` | When `true`, disabled items can receive keyboard focus. |
| `onItemClick` | `onItemClick` | `(itemId: string) =&gt; void \| undefined` | — | Callback invoked when a tree item is clicked or activated via keyboard. |
| `expansionTrigger` | `expansion-trigger` | `'content' \| 'iconContainer'` | `'content'` | What interaction triggers expand/collapse. |
| `expandedItems` | `expandedItems` | `string[] \| undefined` | — | **Controlled mode.** The set of item IDs that should be expanded. |
| `defaultExpandedItems` | `defaultExpandedItems` | `string[]` | `[]` | **Uncontrolled mode.** Item IDs to expand on initial mount. |
| `onExpandedItemsChange` | `onExpandedItemsChange` | `(itemIds: string[]) =&gt; void \| undefined` | — | Callback fired when the user toggles an item's expansion. |
| `itemsReordering` | `items-reordering` | `boolean` | `false` | When `true`, enables drag-and-drop reordering of items. |
| `isItemReorderable` | `isItemReorderable` | `(itemId: string) =&gt; boolean \| undefined` | — | Function that determines if a specific item can be reordered. |
| `canMoveItemToNewPosition` | `canMoveItemToNewPosition` | `(params: &#123;         itemId: string;         targetId: string;         position: 'before' \| 'after' \| 'inside';     &#125;) =&gt; boolean \| undefined` | — | Function that determines if an item can be moved to a specific target position. |
| `itemsReorderingHandle` | `items-reordering-handle` | `boolean` | `false` | Whether to use a drag handle icon for reordering. |
| `onItemPositionChange` | `onItemPositionChange` | `(params: &#123;         itemId: string;         newParentId: string \| null;         newIndex: number;     &#125;) =&gt; void \| undefined` | — | Fired when an item's position changes via reordering. |
| `selectionMode` | `selection-mode` | `'none' \| 'single' \| 'multiple'` | `'none'` | Selection mode: |
| `selectedItems` | `selectedItems` | `string[] \| undefined` | — | Controlled mode. The set of selected item IDs. |
| `defaultSelectedItems` | `defaultSelectedItems` | `string[]` | `[]` | Uncontrolled mode. Item IDs selected on initial mount. |
| `onSelectedItemsChange` | `onSelectedItemsChange` | `(itemIds: string[]) =&gt; void \| undefined` | — | Callback fired when the selection changes. |
| `selectionPropagation` | `selection-propagation` | `boolean` | `false` | When true (and selectionMode='multiple'), selecting a parent item |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-tree-view-error` | `&#123; message, id, error &#125;` | When a lazy-loading dataSource call fails (detail: &#123; message, id, error &#125;) |
| `flint-selection-change` | `&#123; selectedItems &#125;` | When the selected set changes (detail: &#123; selectedItems &#125;) |
| `flint-tree-view-expanded-items-change` | `&#123; expandedItems &#125;` | When the expanded set changes (detail: &#123; expandedItems &#125;) |
| `flint-tree-view-item-position-change` | — |  |
| `flint-tree-view-item-click` | `&#123; itemId &#125;` | When a tree item is activated (detail: &#123; itemId &#125;) |

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
| `--flint-border-color` | — |
| `--flint-text-color-muted` | — |

### Methods

| Method | Description |
| --- | --- |
| `getItem(id: string): RichTreeItem \| null` | Returns the data item with the given ID, or `null` if not found. |
| `getItemDOMElement(id: string): FlintTreeItem \| null` | Returns the DOM element for the tree item with the given ID, or `null`. |
| `getItemTree(): RichTreeItem[]` | Returns the current items tree. Returns the reordered tree if reordering is active. |
| `getItemOrderedChildrenIds(itemId: string \| null): string[]` | Returns the ordered child IDs for an item, or root items if null. |
| `setIsItemDisabled(id: string, disabled: boolean): void` | Imperatively toggle the disabled state of an item by ID. |

---

## `<flint-simple-tree-view>`

A simple tree-view container that manages keyboard navigation, focus,
and item selection/expansion for nested `flint-tree-item` elements.

- **Tag**: `<flint-simple-tree-view>`
- **Class**: `FlintSimpleTreeView`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintSimpleTreeView } from '@getufy/flint-ui';
```

### Usage

```html
<flint-simple-tree-view></flint-simple-tree-view>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `disabledItemsFocusable` | `disabled-items-focusable` | `boolean` | `false` | When `true`, disabled items can receive keyboard focus. |
| `onItemClick` | `onItemClick` | `(itemId: string) =&gt; void \| undefined` | — | Callback invoked when a tree item is clicked or activated via keyboard. |
| `expandedItems` | `expandedItems` | `string[] \| undefined` | — | **Controlled mode.** The set of item IDs that should be expanded. |
| `defaultExpandedItems` | `defaultExpandedItems` | `string[]` | `[]` | **Uncontrolled mode.** Item IDs to expand on initial mount. |
| `onExpandedItemsChange` | `onExpandedItemsChange` | `(itemIds: string[]) =&gt; void \| undefined` | — | Callback fired when the user toggles an item's expansion. |
| `expansionTrigger` | `expansion-trigger` | `'content' \| 'iconContainer'` | `'content'` | What interaction triggers expand/collapse. |
| `selectionMode` | `selection-mode` | `'none' \| 'single' \| 'multiple'` | `'none'` | Selection mode: |
| `selectedItems` | `selectedItems` | `string[] \| undefined` | — | Controlled mode. The set of selected item IDs. |
| `defaultSelectedItems` | `defaultSelectedItems` | `string[]` | `[]` | Uncontrolled mode. Item IDs selected on initial mount. |
| `onSelectedItemsChange` | `onSelectedItemsChange` | `(itemIds: string[]) =&gt; void \| undefined` | — | Callback fired when the selection changes. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-selection-change` | `&#123; selectedItems &#125;` | When the selected set changes (detail: &#123; selectedItems &#125;) |
| `flint-tree-view-expanded-items-change` | `&#123; expandedItems &#125;` | When the expanded set changes (detail: &#123; expandedItems &#125;) |
| `flint-tree-view-item-click` | `&#123; itemId &#125;` | When a tree item is activated (detail: &#123; itemId &#125;) |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Place `flint-tree-item` elements here. |

### CSS Parts

| Name | Description |
| --- | --- |
| `base` | The component's base wrapper element. |

### Methods

| Method | Description |
| --- | --- |
| `getItemDOMElement(itemId: string): FlintTreeItem \| null` | Returns the DOM element for the tree item with the given `itemId`, |

---

## `<flint-tree-item>`

A single item inside a `flint-simple-tree-view` or `flint-rich-tree-view`.

- **Tag**: `<flint-tree-item>`
- **Class**: `FlintTreeItem`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintTreeItem } from '@getufy/flint-ui';
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
| `hasChildren` | `has-children` | `boolean` | `false` | When `true`, forces the expand button to render even if no `flint-tree-item` |
| `selected` | `selected` | `boolean` | `false` | Whether this item is visually selected. Managed by the parent tree-view. |
| `indeterminate` | `indeterminate` | `boolean` | `false` | Whether the checkbox is in an indeterminate state (some but not all children selected). |
| `dropPosition` | `drop-position` | `'before' \| 'after' \| 'inside' \| null` | `null` | Visual drop position indicator — reflected so CSS :host selectors match |
| `showDragHandle` | `show-drag-handle` | `boolean` | `false` | Whether to show a dedicated drag handle icon |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-tree-item-click` | `&#123; itemId, ctrlKey, shiftKey &#125;` | Fired when the item is clicked (detail: &#123; itemId, ctrlKey, shiftKey &#125;) |
| `flint-tree-item-toggle` | `&#123; itemId, expanded &#125;` | Fired when expanded state changes (detail: &#123; itemId, expanded &#125;) |

### Slots

| Name | Description |
| --- | --- |
| `lead` | Leading icon or content. |
| `(default)` | Item label text. |

### CSS Parts

| Name | Description |
| --- | --- |
| `base` | The component's base wrapper element. |
| `children` | The children element. |
| `label` | The label element. |
| `checkbox` | The selection checkbox element. |

### Methods

| Method | Description |
| --- | --- |
| `setShowCheckbox(value: boolean): void` |  |
| `setDraggable(value: boolean, handleOnly: unknown): void` | Called by flint-rich-tree-view to set drag enabled state. |

---
