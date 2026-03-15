# Image List

<Demo html='<flint-image-list cols="3" gap="8" style="width:100%;max-width:500px">  <flint-image-list-item><div style="width:100%;height:120px;background:#dbeafe;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#1e40af;font-weight:600">1</div></flint-image-list-item>  <flint-image-list-item><div style="width:100%;height:120px;background:#e0e7ff;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#3730a3;font-weight:600">2</div></flint-image-list-item>  <flint-image-list-item><div style="width:100%;height:120px;background:#ede9fe;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#5b21b6;font-weight:600">3</div></flint-image-list-item>  <flint-image-list-item><div style="width:100%;height:120px;background:#fce7f3;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#9d174d;font-weight:600">4</div></flint-image-list-item>  <flint-image-list-item><div style="width:100%;height:120px;background:#fef3c7;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#92400e;font-weight:600">5</div></flint-image-list-item>  <flint-image-list-item><div style="width:100%;height:120px;background:#d1fae5;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#065f46;font-weight:600">6</div></flint-image-list-item></flint-image-list>' />

## `<flint-image-list-item-bar>`

A title/subtitle bar for `flint-image-list-item`.

- **Tag**: `<flint-image-list-item-bar>`
- **Class**: `FlintImageListItemBar`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintImageListItemBar } from '@getufy/flint-ui';
```

### Usage

```html
<flint-image-list-item-bar></flint-image-list-item-bar>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `position` | `position` | `'bottom' \| 'top' \| 'below'` | `'bottom'` | Position hint for styling: 'bottom' (default overlay), 'top' (overlay), or 'below' (solid) |

### Slots

| Name | Description |
| --- | --- |
| `title` | Title text. |
| `subtitle` | Subtitle text. |
| `(default)` | Action content. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-image-bar-overlay-text` | `var(--flint-text-color-on-primary` |
| `--flint-font-family` | — |
| `--flint-surface-1` | — |
| `--flint-text-color` | — |
| `--flint-border-color` | — |
| `--flint-image-fit` | `cover` |

---

## `<flint-image-list-item>`

A single item inside a `flint-image-list`.

- **Tag**: `<flint-image-list-item>`
- **Class**: `FlintImageListItem`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintImageListItem } from '@getufy/flint-ui';
```

### Usage

```html
<flint-image-list-item></flint-image-list-item>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `rows` | `rows` | `number` | `1` | How many grid rows this item spans (quilted/woven only) |
| `cols` | `cols` | `number` | `1` | How many grid columns this item spans (quilted/woven only) |
| `barPosition` | `bar-position` | `'overlay' \| 'below'` | `'overlay'` | Position of the title bar: 'overlay' (default) or 'below' |
| `weave` | `weave` | `'odd' \| 'even'` | `'odd'` | Woven variant: 'odd' or 'even' identity for alternating height |
| `aspectRatio` | `aspect-ratio` | `string` | `'auto'` | CSS aspect-ratio for the cell (e.g. "1/1", "4/3", "3/4", "16/9", "9/16"). |
| `fit` | `fit` | `ImageFit` | `'cover'` | How the image fills the cell: 'cover' (default, crops to fill) |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Place an `&lt;img&gt;` or any content here. |
| `bar` | Place a `flint-image-list-item-bar` element here. |

---

## `<flint-image-list>`

A container that displays images in an organized grid layout.
Supports standard, quilted, woven, and masonry variants.

- **Tag**: `<flint-image-list>`
- **Class**: `FlintImageList`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintImageList } from '@getufy/flint-ui';
```

### Usage

```html
<flint-image-list></flint-image-list>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `variant` | `variant` | `ImageListVariant` | `'standard'` | Layout variant |
| `cols` | `cols` | `number` | `3` | Number of columns |
| `gap` | `gap` | `number` | `4` | Gap between items (in px) |
| `rowHeight` | `rowHeight` | `number` | `164` | Row height for non-masonry variants (in px). Ignored when autoRows=true. |
| `autoRows` | `autoRows` | `boolean` | `false` | When true, row height is automatic (use with bar-position="below") |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Place `flint-image-list-item` elements here. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-image-list-gap` | `4px` |
| `--flint-image-list-row-height` | `164px` |

---
