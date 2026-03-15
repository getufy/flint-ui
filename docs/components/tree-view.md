# Tree View

<Demo label="Simple Tree View" html="<div style=&quot;width:100%;max-width:300px;border:1px solid #e5e7eb;border-radius:8px;padding:8px&quot;><flint-simple-tree-view>  <flint-tree-item item-id=&quot;1&quot; label=&quot;Documents&quot;>    <flint-tree-item item-id=&quot;1-1&quot; label=&quot;Resume.pdf&quot;></flint-tree-item>    <flint-tree-item item-id=&quot;1-2&quot; label=&quot;Cover Letter.pdf&quot;></flint-tree-item>  </flint-tree-item>  <flint-tree-item item-id=&quot;2&quot; label=&quot;Images&quot;>    <flint-tree-item item-id=&quot;2-1&quot; label=&quot;photo.jpg&quot;></flint-tree-item>    <flint-tree-item item-id=&quot;2-2&quot; label=&quot;screenshot.png&quot;></flint-tree-item>    <flint-tree-item item-id=&quot;2-3&quot; label=&quot;icon.svg&quot;></flint-tree-item>  </flint-tree-item>  <flint-tree-item item-id=&quot;3&quot; label=&quot;Notes.txt&quot;></flint-tree-item></flint-simple-tree-view></div>" />

<Demo label="Rich Tree View" html="<div style=&quot;width:100%;max-width:300px;border:1px solid #e5e7eb;border-radius:8px;padding:8px&quot;><flint-rich-tree-view data-props='{&quot;items&quot;:[{&quot;id&quot;:&quot;src&quot;,&quot;label&quot;:&quot;src&quot;,&quot;children&quot;:[{&quot;id&quot;:&quot;components&quot;,&quot;label&quot;:&quot;components&quot;,&quot;children&quot;:[{&quot;id&quot;:&quot;app&quot;,&quot;label&quot;:&quot;App.tsx&quot;},{&quot;id&quot;:&quot;header&quot;,&quot;label&quot;:&quot;Header.tsx&quot;},{&quot;id&quot;:&quot;footer&quot;,&quot;label&quot;:&quot;Footer.tsx&quot;}]},{&quot;id&quot;:&quot;utils&quot;,&quot;label&quot;:&quot;utils&quot;,&quot;children&quot;:[{&quot;id&quot;:&quot;helpers&quot;,&quot;label&quot;:&quot;helpers.ts&quot;},{&quot;id&quot;:&quot;constants&quot;,&quot;label&quot;:&quot;constants.ts&quot;}]},{&quot;id&quot;:&quot;index&quot;,&quot;label&quot;:&quot;index.ts&quot;}]},{&quot;id&quot;:&quot;public&quot;,&quot;label&quot;:&quot;public&quot;,&quot;children&quot;:[{&quot;id&quot;:&quot;favicon&quot;,&quot;label&quot;:&quot;favicon.ico&quot;},{&quot;id&quot;:&quot;robots&quot;,&quot;label&quot;:&quot;robots.txt&quot;}]},{&quot;id&quot;:&quot;pkg&quot;,&quot;label&quot;:&quot;package.json&quot;},{&quot;id&quot;:&quot;readme&quot;,&quot;label&quot;:&quot;README.md&quot;}],&quot;defaultExpandedItems&quot;:[&quot;src&quot;,&quot;components&quot;]}'></flint-rich-tree-view></div>" />

<Demo label="Rich Tree View with Drag & Drop Reordering" html="<div style=&quot;width:100%;max-width:300px;border:1px solid #e5e7eb;border-radius:8px;padding:8px&quot;><flint-rich-tree-view items-reordering items-reordering-handle data-props='{&quot;items&quot;:[{&quot;id&quot;:&quot;todo&quot;,&quot;label&quot;:&quot;To Do&quot;,&quot;children&quot;:[{&quot;id&quot;:&quot;t1&quot;,&quot;label&quot;:&quot;Design homepage&quot;},{&quot;id&quot;:&quot;t2&quot;,&quot;label&quot;:&quot;Write tests&quot;},{&quot;id&quot;:&quot;t3&quot;,&quot;label&quot;:&quot;Fix bug #42&quot;}]},{&quot;id&quot;:&quot;progress&quot;,&quot;label&quot;:&quot;In Progress&quot;,&quot;children&quot;:[{&quot;id&quot;:&quot;p1&quot;,&quot;label&quot;:&quot;API integration&quot;},{&quot;id&quot;:&quot;p2&quot;,&quot;label&quot;:&quot;Code review&quot;}]},{&quot;id&quot;:&quot;done&quot;,&quot;label&quot;:&quot;Done&quot;,&quot;children&quot;:[{&quot;id&quot;:&quot;d1&quot;,&quot;label&quot;:&quot;Setup project&quot;},{&quot;id&quot;:&quot;d2&quot;,&quot;label&quot;:&quot;Create database schema&quot;}]}],&quot;defaultExpandedItems&quot;:[&quot;todo&quot;,&quot;progress&quot;,&quot;done&quot;]}'></flint-rich-tree-view></div>" />

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
| `disabledItemsFocusable` | `disabled-items-focusable` | `boolean` | `false` | When `true`, disabled items can receive keyboard focus. |
| `expansionTrigger` | `expansion-trigger` | `'content' \| 'iconContainer'` | `'content'` | What interaction triggers expand/collapse. |
| `itemsReordering` | `items-reordering` | `boolean` | `false` | When `true`, enables drag-and-drop reordering of items. |
| `itemsReorderingHandle` | `items-reordering-handle` | `boolean` | `false` | Whether to use a drag handle icon for reordering. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-tree-view-error` | `{ message, id, error }` | When a lazy-loading dataSource call fails (detail: { message, id, error }) |
| `flint-tree-view-expanded-items-change` | `{ expandedItems }` | When the expanded set changes (detail: { expandedItems }) |
| `flint-tree-view-item-position-change` | — |  |
| `flint-tree-view-item-click` | `{ itemId }` | When a tree item is activated (detail: { itemId }) |

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
| `expansionTrigger` | `expansion-trigger` | `'content' \| 'iconContainer'` | `'content'` | What interaction triggers expand/collapse. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-tree-view-expanded-items-change` | `{ expandedItems }` | When the expanded set changes (detail: { expandedItems }) |
| `flint-tree-view-item-click` | `{ itemId }` | When a tree item is activated (detail: { itemId }) |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Place `flint-tree-item` elements here. |

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
| `dropPosition` | `drop-position` | `'before' \| 'after' \| 'inside' \| null` | `null` | Visual drop position indicator — reflected so CSS :host selectors match |
| `showDragHandle` | `show-drag-handle` | `boolean` | `false` | Whether to show a dedicated drag handle icon |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-tree-item-toggle` | `{ itemId, expanded }` | Fired when expanded state changes (detail: { itemId, expanded }) |
| `flint-tree-item-click` | `{ itemId }` | Fired when the item is clicked (detail: { itemId }) |

### Slots

| Name | Description |
| --- | --- |
| `lead` | Leading icon or content. |
| `(default)` | Item label text. |

### Methods

| Method | Description |
| --- | --- |
| `setDraggable(value: boolean, handleOnly: unknown): void` | Called by flint-rich-tree-view to set drag enabled state. |

---
