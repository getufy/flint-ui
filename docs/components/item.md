# Item

<Demo>

<div style="width:100%;max-width:400px">
<ui-item-group>
  <ui-item>
    <ui-item-content>
      <ui-item-title>Item Title</ui-item-title>
      <ui-item-description>A short description of this item.</ui-item-description>
    </ui-item-content>
  </ui-item>
  <ui-item-separator></ui-item-separator>
  <ui-item>
    <ui-item-content>
      <ui-item-title>Another Item</ui-item-title>
      <ui-item-description>Another description here.</ui-item-description>
    </ui-item-content>
  </ui-item>
</ui-item-group>
</div>

</Demo>

## `<ui-item-title>`

Displays the title of an item.

- **Tag**: `<ui-item-title>`
- **Class**: `UiItemTitle`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiItemTitle } from 'storybook-lit';
```

### Usage

```html
<ui-item-title></ui-item-title>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Title text. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-text-color-muted` | — |
| `--ui-font-family` | — |
| `--ui-border-color` | — |
| `--ui-text-color` | — |
| `--ui-muted-bg` | `var(--ui-muted-background` |

---

## `<ui-item-description>`

Displays the description of an item.

- **Tag**: `<ui-item-description>`
- **Class**: `UiItemDescription`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiItemDescription } from 'storybook-lit';
```

### Usage

```html
<ui-item-description></ui-item-description>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Description text. |

---

## `<ui-item-media>`

Media container for an item (icon, avatar, or image).

- **Tag**: `<ui-item-media>`
- **Class**: `UiItemMedia`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiItemMedia } from 'storybook-lit';
```

### Usage

```html
<ui-item-media></ui-item-media>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `variant` | `variant` | `'default' \| 'icon' \| 'image'` | `'default'` | Visual treatment for the media container. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Media content: SVG icon, avatar element, or image. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-item-media-icon-bg` | `var(--ui-surface-2` |
| `--ui-item-media-icon-color` | `var(--ui-text-color-muted` |

---

## `<ui-item-content>`

Flex-column wrapper for an item's title and description.

- **Tag**: `<ui-item-content>`
- **Class**: `UiItemContent`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiItemContent } from 'storybook-lit';
```

### Usage

```html
<ui-item-content></ui-item-content>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Accepts `ui-item-title`, `ui-item-description`, or any content. |

---

## `<ui-item-actions>`

Container for action buttons or other interactive elements. Aligns itself to the trailing edge of the item row.

- **Tag**: `<ui-item-actions>`
- **Class**: `UiItemActions`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiItemActions } from 'storybook-lit';
```

### Usage

```html
<ui-item-actions></ui-item-actions>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Buttons, icons, or any interactive elements. |

---

## `<ui-item-header>`

Full-bleed header that spans the top of the item, cancelling the item's padding so media (images) appear flush with the border. Always place as the first child of `ui-item`.

- **Tag**: `<ui-item-header>`
- **Class**: `UiItemHeader`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiItemHeader } from 'storybook-lit';
```

### Usage

```html
<ui-item-header></ui-item-header>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Header content, typically an image or decorative element. |

---

## `<ui-item-footer>`

Full-bleed footer that spans the bottom of the item, cancelling the item's padding so the footer appears flush with the border. Always place as the last child of `ui-item`.

- **Tag**: `<ui-item-footer>`
- **Class**: `UiItemFooter`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiItemFooter } from 'storybook-lit';
```

### Usage

```html
<ui-item-footer></ui-item-footer>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Footer content: metadata, links, supplementary actions. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-item-footer-bg` | `transparent` |

---

## `<ui-item-separator>`

Visual separator between items in a group.

- **Tag**: `<ui-item-separator>`
- **Class**: `UiItemSeparator`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiItemSeparator } from 'storybook-lit';
```

### Usage

```html
<ui-item-separator></ui-item-separator>
```

---

## `<ui-item-group>`

Container for grouping related items together.

- **Tag**: `<ui-item-group>`
- **Class**: `UiItemGroup`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiItemGroup } from 'storybook-lit';
```

### Usage

```html
<ui-item-group></ui-item-group>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Accepts `ui-item`, `ui-item-separator`, and any other elements. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-item-group-gap` | `4px` |

---

## `<ui-item>`

Root container for displaying content with media, title, description, and actions. A versatile flex row that adapts to icons, avatars, images, and action buttons.

- **Tag**: `<ui-item>`
- **Class**: `UiItem`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiItem } from 'storybook-lit';
```

### Usage

```html
<ui-item></ui-item>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `variant` | `variant` | `'default' \| 'outline' \| 'muted'` | `'default'` |  |
| `size` | `size` | `'default' \| 'sm' \| 'xs'` | `'default'` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Accepts `ui-item-header`, `ui-item-media`, `ui-item-content`, |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-item-padding` | `16px` |
| `--ui-item-footer-bg` | `transparent` |
| `--ui-item-group-gap` | `4px` |
| `--ui-item-media-icon-bg` | `var(--ui-surface-2` |
| `--ui-item-media-icon-color` | `var(--ui-text-color-muted` |
| `--ui-item-gap` | — |

---
