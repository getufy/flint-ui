# Item

<Demo html="<div style=&quot;width:100%;max-width:400px&quot;><flint-item-group>  <flint-item-header>Settings</flint-item-header>  <flint-item>    <flint-item-content>      <flint-item-title>Profile</flint-item-title>      <flint-item-description>Update your personal information</flint-item-description>    </flint-item-content>  </flint-item>  <flint-item-separator></flint-item-separator>  <flint-item>    <flint-item-content>      <flint-item-title>Notifications</flint-item-title>      <flint-item-description>Manage your notification preferences</flint-item-description>    </flint-item-content>  </flint-item>  <flint-item-separator></flint-item-separator>  <flint-item>    <flint-item-content>      <flint-item-title>Security</flint-item-title>      <flint-item-description>Password and two-factor authentication</flint-item-description>    </flint-item-content>  </flint-item></flint-item-group></div>" />

## `<flint-item-title>`

Displays the title of an item.

- **Tag**: `<flint-item-title>`
- **Class**: `FlintItemTitle`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintItemTitle } from '@getufy/flint-ui';
```

### Usage

```html
<flint-item-title></flint-item-title>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Title text. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-text-color-muted` | — |
| `--flint-font-family` | — |
| `--flint-text-color` | — |

---

## `<flint-item-description>`

Displays the description of an item.

- **Tag**: `<flint-item-description>`
- **Class**: `FlintItemDescription`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintItemDescription } from '@getufy/flint-ui';
```

### Usage

```html
<flint-item-description></flint-item-description>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Description text. |

---

## `<flint-item-media>`

Media container for an item (icon, avatar, or image).

- **Tag**: `<flint-item-media>`
- **Class**: `FlintItemMedia`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintItemMedia } from '@getufy/flint-ui';
```

### Usage

```html
<flint-item-media></flint-item-media>
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
| `--flint-item-media-icon-bg` | — |
| `--flint-item-media-icon-color` | — |

---

## `<flint-item-content>`

Flex-column wrapper for an item's title and description.

- **Tag**: `<flint-item-content>`
- **Class**: `FlintItemContent`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintItemContent } from '@getufy/flint-ui';
```

### Usage

```html
<flint-item-content></flint-item-content>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Accepts `flint-item-title`, `flint-item-description`, or any content. |

---

## `<flint-item-actions>`

Container for action buttons or other interactive elements.
Aligns itself to the trailing edge of the item row.

- **Tag**: `<flint-item-actions>`
- **Class**: `FlintItemActions`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintItemActions } from '@getufy/flint-ui';
```

### Usage

```html
<flint-item-actions></flint-item-actions>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Buttons, icons, or any interactive elements. |

---

## `<flint-item-header>`

Full-bleed header that spans the top of the item, cancelling the
item's padding so media (images) appear flush with the border.
Always place as the first child of `flint-item`.

- **Tag**: `<flint-item-header>`
- **Class**: `FlintItemHeader`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintItemHeader } from '@getufy/flint-ui';
```

### Usage

```html
<flint-item-header></flint-item-header>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Header content, typically an image or decorative element. |

---

## `<flint-item-footer>`

Full-bleed footer that spans the bottom of the item, cancelling the
item's padding so the footer appears flush with the border.
Always place as the last child of `flint-item`.

- **Tag**: `<flint-item-footer>`
- **Class**: `FlintItemFooter`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintItemFooter } from '@getufy/flint-ui';
```

### Usage

```html
<flint-item-footer></flint-item-footer>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Footer content: metadata, links, supplementary actions. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-item-footer-bg` | `transparent` |

---

## `<flint-item-separator>`

Visual separator between items in a group.

- **Tag**: `<flint-item-separator>`
- **Class**: `FlintItemSeparator`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintItemSeparator } from '@getufy/flint-ui';
```

### Usage

```html
<flint-item-separator></flint-item-separator>
```

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-border-color` | — |

---

## `<flint-item-group>`

Container for grouping related items together.

- **Tag**: `<flint-item-group>`
- **Class**: `FlintItemGroup`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintItemGroup } from '@getufy/flint-ui';
```

### Usage

```html
<flint-item-group></flint-item-group>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Accepts `flint-item`, `flint-item-separator`, and any other elements. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-item-group-gap` | — |

---

## `<flint-item>`

Root container for displaying content with media, title,
description, and actions. A versatile flex row that adapts to
icons, avatars, images, and action buttons.

- **Tag**: `<flint-item>`
- **Class**: `FlintItem`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintItem } from '@getufy/flint-ui';
```

### Usage

```html
<flint-item></flint-item>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `variant` | `variant` | `'default' \| 'outline' \| 'muted'` | `'default'` | Visual style of the item. |
| `size` | `size` | `'default' \| 'sm' \| 'xs'` | `'default'` | Size preset controlling padding and gap. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Accepts `flint-item-header`, `flint-item-media`, `flint-item-content`, `flint-item-actions`, `flint-item-footer`, and any other elements. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-item-padding` | — |
| `--flint-item-gap` | — |
| `--flint-item-media-icon-bg` | — |
| `--flint-item-media-icon-color` | — |
| `--flint-border-color` | — |
| `--flint-muted-bg` | — |
| `--flint-item-footer-bg` | `transparent` |
| `--flint-item-group-gap` | `4px` |

---
