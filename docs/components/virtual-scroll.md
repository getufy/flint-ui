# Virtual Scroll

A generic virtual scrolling container [§38.1].

- **Tag**: `<flint-virtual-scroll>`
- **Class**: `FlintVirtualScroll`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintVirtualScroll } from '@getufy/flint-ui';
```

### Usage

```html
<flint-virtual-scroll></flint-virtual-scroll>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `items` | `items` | `T[]` | `[]` | Array of data items to render. |
| `itemHeight` | `item-height` | `number` | `40` | Fixed height of each item in pixels. Used for position calculations. |
| `overscan` | `overscan` | `number` | `5` | Number of extra items to render above and below the visible area. |
| `renderItem` | `renderItem` | `RenderItemFn&lt;T&gt;` | — | Render function for a single item. Receives the item and its index. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Fallback content shown when items is empty. |

---
