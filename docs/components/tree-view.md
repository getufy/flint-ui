# Tree View

<Demo>

<div style="width:100%;max-width:300px;border:1px solid #e5e7eb;border-radius:8px;padding:8px">
<ui-simple-tree-view>
  <ui-tree-item item-id="1" label="Documents">
    <ui-tree-item item-id="1-1" label="Resume.pdf"></ui-tree-item>
    <ui-tree-item item-id="1-2" label="Cover Letter.pdf"></ui-tree-item>
  </ui-tree-item>
  <ui-tree-item item-id="2" label="Images">
    <ui-tree-item item-id="2-1" label="photo.jpg"></ui-tree-item>
    <ui-tree-item item-id="2-2" label="screenshot.png"></ui-tree-item>
    <ui-tree-item item-id="2-3" label="icon.svg"></ui-tree-item>
  </ui-tree-item>
  <ui-tree-item item-id="3" label="Notes.txt"></ui-tree-item>
</ui-simple-tree-view>
</div>

</Demo>

## `<ui-rich-tree-view>`

- **Tag**: `<ui-rich-tree-view>`
- **Class**: `UiRichTreeView`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiRichTreeView } from 'storybook-lit';
```

### Usage

```html
<ui-rich-tree-view></ui-rich-tree-view>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `items` | `items` | `RichTreeItem[]` | `[]` | Array of item data objects to render in the tree. |
| `getItemId` | `get-item-id` | `(item: RichTreeItem)` | `> string = (item) => item['id'] as string` | Returns the unique string ID for an item. Defaults to `item.id`. |
| `getItemLabel` | `get-item-label` | `(item: RichTreeItem)` | `> string = (item) => item['label'] as string` | Returns the display label for an item. Defaults to `item.label`. |
| `getItemChildren` | `get-item-children` | `(item: RichTreeItem)` | `> RichTreeItem[] \| undefined = (item) =>         item['children'] as RichTreeItem[] \| undefined` | Returns the children array for an item. Defaults to `item.children`. |
| `isItemDisabled` | `is-item-disabled` | `(item: RichTreeItem)` | `> boolean = () => false` | Returns `true` if the given item should be disabled. |
| `disabledItemsFocusable` | `disabled-items-focusable` | `boolean` | `false` |  |
| `onItemClick` | `on-item-click` | `: (itemId: string)` | `> void` | Callback invoked when a tree item is clicked or activated via keyboard. |
| `expansionTrigger` | `expansion-trigger` | `'content' \| 'iconContainer'` | `'content'` |  |
| `defaultExpandedItems` | `default-expanded-items` | `string[]` | `[]` | * **Uncontrolled mode.** Item IDs to expand on initial mount. |
| `onExpandedItemsChange` | `on-expanded-items-change` | `: (itemIds: string[])` | `> void` | Callback fired when the user toggles an item's expansion. |
| `itemsReordering` | `items-reordering` | `boolean` | `false` | * When `true`, enables drag-and-drop reordering of items. |
| `isItemReorderable` | `is-item-reorderable` | `: (itemId: string)` | `> boolean` |  |
| `itemsReorderingHandle` | `items-reordering-handle` | `boolean` | `false` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `expanded-items-change` | `{ expandedItems: newItems }` |  |
| `item-click` | `{ itemId }` |  |
| `item-position-change` | `{ itemId, newParentId, newIndex }` |  |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-font-family` | — |
| `--ui-text-color` | — |
| `--ui-primary-color` | — |
| `--ui-border-radius-sm` | — |
| `--ui-hover-color` | — |
| `--ui-active-color` | — |
| `--ui-primary-color-light` | — |
| `--ui-text-color-muted` | — |

### Methods

| Method | Description |
| --- | --- |
| `getItemTree(): RichTreeItem[]` | * Returns the current items tree. Returns the reordered tree if reordering is active. |
| `getItemOrderedChildrenIds(itemId: string \| null): string[]` | * Returns the ordered child IDs for an item, or root items if null. |
| `setIsItemDisabled(id: string, disabled: boolean)` |  |
| `forEach(item => {             if (item.itemId === this._dropTargetId)` |  |

---

## `<ui-simple-tree-view>`

A simple tree-view container that manages keyboard navigation, focus, and item selection/expansion for nested `ui-tree-item` elements.

- **Tag**: `<ui-simple-tree-view>`
- **Class**: `UiSimpleTreeView`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiSimpleTreeView } from 'storybook-lit';
```

### Usage

```html
<ui-simple-tree-view></ui-simple-tree-view>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `disabledItemsFocusable` | `disabled-items-focusable` | `boolean` | `false` |  |
| `onItemClick` | `on-item-click` | `: (itemId: string)` | `> void` |  |
| `defaultExpandedItems` | `default-expanded-items` | `string[]` | `[]` |  |
| `onExpandedItemsChange` | `on-expanded-items-change` | `: (itemIds: string[])` | `> void` |  |
| `expansionTrigger` | `expansion-trigger` | `'content' \| 'iconContainer'` | `'content'` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `item-click` | — | When a tree item is activated (detail: { itemId }) |
| `expanded-items-change` | — | When the expanded set changes (detail: { expandedItems }) |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Place `ui-tree-item` elements here. |

---

## `<ui-tree-item>`

A single item inside a `ui-simple-tree-view` or `ui-rich-tree-view`.

- **Tag**: `<ui-tree-item>`
- **Class**: `UiTreeItem`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiTreeItem } from 'storybook-lit';
```

### Usage

```html
<ui-tree-item></ui-tree-item>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `itemId` | `item-id` | `string` | `''` | Unique identifier for this item within the tree |
| `label` | `label` | `string` | `''` | Label text displayed for this item |
| `disabled` | `disabled` | `boolean` | `false` | Whether this item is disabled (non-interactive) |
| `expanded` | `expanded` | `boolean` | `false` | Whether this item's children are visible |
| `hasChildren` | `has-children` | `boolean` | `false` |  |
| `dropPosition` | `drop-position` | `'before' \| 'after' \| 'inside' \| null` | `null` | Visual drop position indicator — reflected so CSS :host selectors match |
| `showDragHandle` | `show-drag-handle` | `boolean` | `false` | Whether to show a dedicated drag handle icon |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `ui-tree-item-click` | — | Fired when the item is clicked (detail: { itemId }) |
| `ui-tree-item-toggle` | — | Fired when expanded state changes (detail: { itemId, expanded }) |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Place child `ui-tree-item` elements here to create a nested tree. |
| `label` |  |

### Methods

| Method | Description |
| --- | --- |
| `setDraggable(value: boolean, handleOnly = false)` |  |

---
