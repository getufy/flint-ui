# Tree View

<Demo label="Simple Tree View" html="<div style=&quot;width:100%;max-width:300px;border:1px solid #e5e7eb;border-radius:8px;padding:8px&quot;><ui-simple-tree-view>  <ui-tree-item item-id=&quot;1&quot; label=&quot;Documents&quot;>    <ui-tree-item item-id=&quot;1-1&quot; label=&quot;Resume.pdf&quot;></ui-tree-item>    <ui-tree-item item-id=&quot;1-2&quot; label=&quot;Cover Letter.pdf&quot;></ui-tree-item>  </ui-tree-item>  <ui-tree-item item-id=&quot;2&quot; label=&quot;Images&quot;>    <ui-tree-item item-id=&quot;2-1&quot; label=&quot;photo.jpg&quot;></ui-tree-item>    <ui-tree-item item-id=&quot;2-2&quot; label=&quot;screenshot.png&quot;></ui-tree-item>    <ui-tree-item item-id=&quot;2-3&quot; label=&quot;icon.svg&quot;></ui-tree-item>  </ui-tree-item>  <ui-tree-item item-id=&quot;3&quot; label=&quot;Notes.txt&quot;></ui-tree-item></ui-simple-tree-view></div>" />

<Demo label="Rich Tree View" html="<div style=&quot;width:100%;max-width:300px;border:1px solid #e5e7eb;border-radius:8px;padding:8px&quot;><ui-rich-tree-view data-props='{&quot;items&quot;:[{&quot;id&quot;:&quot;src&quot;,&quot;label&quot;:&quot;src&quot;,&quot;children&quot;:[{&quot;id&quot;:&quot;components&quot;,&quot;label&quot;:&quot;components&quot;,&quot;children&quot;:[{&quot;id&quot;:&quot;app&quot;,&quot;label&quot;:&quot;App.tsx&quot;},{&quot;id&quot;:&quot;header&quot;,&quot;label&quot;:&quot;Header.tsx&quot;},{&quot;id&quot;:&quot;footer&quot;,&quot;label&quot;:&quot;Footer.tsx&quot;}]},{&quot;id&quot;:&quot;utils&quot;,&quot;label&quot;:&quot;utils&quot;,&quot;children&quot;:[{&quot;id&quot;:&quot;helpers&quot;,&quot;label&quot;:&quot;helpers.ts&quot;},{&quot;id&quot;:&quot;constants&quot;,&quot;label&quot;:&quot;constants.ts&quot;}]},{&quot;id&quot;:&quot;index&quot;,&quot;label&quot;:&quot;index.ts&quot;}]},{&quot;id&quot;:&quot;public&quot;,&quot;label&quot;:&quot;public&quot;,&quot;children&quot;:[{&quot;id&quot;:&quot;favicon&quot;,&quot;label&quot;:&quot;favicon.ico&quot;},{&quot;id&quot;:&quot;robots&quot;,&quot;label&quot;:&quot;robots.txt&quot;}]},{&quot;id&quot;:&quot;pkg&quot;,&quot;label&quot;:&quot;package.json&quot;},{&quot;id&quot;:&quot;readme&quot;,&quot;label&quot;:&quot;README.md&quot;}],&quot;defaultExpandedItems&quot;:[&quot;src&quot;,&quot;components&quot;]}'></ui-rich-tree-view></div>" />

<Demo label="Rich Tree View with Drag & Drop Reordering" html="<div style=&quot;width:100%;max-width:300px;border:1px solid #e5e7eb;border-radius:8px;padding:8px&quot;><ui-rich-tree-view items-reordering items-reordering-handle data-props='{&quot;items&quot;:[{&quot;id&quot;:&quot;todo&quot;,&quot;label&quot;:&quot;To Do&quot;,&quot;children&quot;:[{&quot;id&quot;:&quot;t1&quot;,&quot;label&quot;:&quot;Design homepage&quot;},{&quot;id&quot;:&quot;t2&quot;,&quot;label&quot;:&quot;Write tests&quot;},{&quot;id&quot;:&quot;t3&quot;,&quot;label&quot;:&quot;Fix bug #42&quot;}]},{&quot;id&quot;:&quot;progress&quot;,&quot;label&quot;:&quot;In Progress&quot;,&quot;children&quot;:[{&quot;id&quot;:&quot;p1&quot;,&quot;label&quot;:&quot;API integration&quot;},{&quot;id&quot;:&quot;p2&quot;,&quot;label&quot;:&quot;Code review&quot;}]},{&quot;id&quot;:&quot;done&quot;,&quot;label&quot;:&quot;Done&quot;,&quot;children&quot;:[{&quot;id&quot;:&quot;d1&quot;,&quot;label&quot;:&quot;Setup project&quot;},{&quot;id&quot;:&quot;d2&quot;,&quot;label&quot;:&quot;Create database schema&quot;}]}],&quot;defaultExpandedItems&quot;:[&quot;todo&quot;,&quot;progress&quot;,&quot;done&quot;]}'></ui-rich-tree-view></div>" />

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
