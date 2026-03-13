# Image List

## `<ui-image-list-item-bar>`

A title/subtitle bar for `ui-image-list-item`.

- **Tag**: `<ui-image-list-item-bar>`
- **Class**: `UiImageListItemBar`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiImageListItemBar } from 'storybook-lit';
```

### Usage

```html
<ui-image-list-item-bar></ui-image-list-item-bar>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `position` | `position` | `'bottom' \| 'top' \| 'below'` | `'bottom'` | Position hint for styling: 'bottom' (default overlay), 'top' (overlay), or 'below' (solid) |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Title text |
| `subtitle` | Subtitle text |
| `action` | An icon button or secondary action |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-image-bar-overlay-text` | `var(--ui-text-color-on-primary` |
| `--ui-font-family` | — |
| `--ui-surface-1` | — |
| `--ui-text-color` | — |
| `--ui-border-color` | — |
| `--ui-image-fit` | `cover` |

---

## `<ui-image-list-item>`

A single item inside a `ui-image-list`.

- **Tag**: `<ui-image-list-item>`
- **Class**: `UiImageListItem`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiImageListItem } from 'storybook-lit';
```

### Usage

```html
<ui-image-list-item></ui-image-list-item>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `rows` | `rows` | `number` | `1` | How many grid rows this item spans (quilted/woven only) |
| `cols` | `cols` | `number` | `1` | How many grid columns this item spans (quilted/woven only) |
| `barPosition` | `bar-position` | `'overlay' \| 'below'` | `'overlay'` | Position of the title bar: 'overlay' (default) or 'below' |
| `weave` | `weave` | `'odd' \| 'even'` | `'odd'` | Woven variant: 'odd' or 'even' identity for alternating height |
| `aspectRatio` | `aspect-ratio` | `string` | `'auto'` |  |
| `fit` | `fit` | `ImageFit` | `'cover'` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Place an `<img>` or any content here. |
| `bar` | Place a `ui-image-list-item-bar` element here. |

---

## `<ui-image-list>`

A container that displays images in an organized grid layout. Supports standard, quilted, woven, and masonry variants.

- **Tag**: `<ui-image-list>`
- **Class**: `UiImageList`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiImageList } from 'storybook-lit';
```

### Usage

```html
<ui-image-list></ui-image-list>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `variant` | `variant` | `ImageListVariant` | `'standard'` | Layout variant |
| `cols` | `cols` | `number` | `3` | Number of columns |
| `gap` | `gap` | `number` | `4` | Gap between items (in px) |
| `rowHeight` | `row-height` | `number` | `164` | Row height for non-masonry variants (in px). Ignored when autoRows=true. |
| `autoRows` | `auto-rows` | `boolean` | `false` | When true, row height is automatic (use with bar-position="below") |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Place `ui-image-list-item` elements here. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-image-list-gap` | `4px` |
| `--ui-image-list-row-height` | `164px` |

---
