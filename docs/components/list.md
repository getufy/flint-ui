# List

<Demo html="<div style=&quot;width:100%;max-width:360px;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden&quot;><flint-list>  <flint-list-subheader>Messages</flint-list-subheader>  <flint-list-item-button selected>    <flint-list-item-text primary=&quot;Inbox&quot; secondary=&quot;5 new messages&quot;></flint-list-item-text>  </flint-list-item-button>  <flint-list-item-button>    <flint-list-item-text primary=&quot;Drafts&quot; secondary=&quot;2 drafts&quot;></flint-list-item-text>  </flint-list-item-button>  <flint-list-item-button>    <flint-list-item-text primary=&quot;Sent&quot; secondary=&quot;Last sent 2h ago&quot;></flint-list-item-text>  </flint-list-item-button>  <flint-list-item-button disabled>    <flint-list-item-text primary=&quot;Spam&quot; secondary=&quot;Disabled&quot;></flint-list-item-text>  </flint-list-item-button></flint-list></div>" />

## `<flint-list>`

flint-list: A wrapper for list items.

- **Tag**: `<flint-list>`
- **Class**: `FlintList`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintList } from 'flint-ui';
```

### Usage

```html
<flint-list></flint-list>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `disablePadding` | `disable-padding` | `boolean` | `false` |  |
| `dense` | `dense` | `boolean` | `false` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-list-item-padding` | `8px 16px` |
| `--flint-list-item-gap` | `16px` |
| `--flint-hover-color` | — |
| `--flint-active-color` | — |
| `--flint-primary-color` | — |
| `--flint-primary-color-light` | — |
| `--flint-text-color-muted` | — |
| `--flint-font-family` | — |
| `--flint-text-color` | — |
| `--flint-surface-background` | `white` |

---

## `<flint-list-item>`

flint-list-item: A common list item.

- **Tag**: `<flint-list-item>`
- **Class**: `FlintListItem`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintListItem } from 'flint-ui';
```

### Usage

```html
<flint-list-item></flint-list-item>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-list-item-padding` | `8px 16px` |
| `--flint-list-item-gap` | `16px` |

---

## `<flint-list-item-button>`

flint-list-item-button: An action element inside a list item.

- **Tag**: `<flint-list-item-button>`
- **Class**: `FlintListItemButton`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintListItemButton } from 'flint-ui';
```

### Usage

```html
<flint-list-item-button></flint-list-item-button>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `selected` | `selected` | `boolean` | `false` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---

## `<flint-list-item-icon>`

flint-list-item-icon: An icon wrapper inside a list item.

- **Tag**: `<flint-list-item-icon>`
- **Class**: `FlintListItemIcon`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintListItemIcon } from 'flint-ui';
```

### Usage

```html
<flint-list-item-icon></flint-list-item-icon>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---

## `<flint-list-item-avatar>`

flint-list-item-avatar: An avatar wrapper inside a list item.

- **Tag**: `<flint-list-item-avatar>`
- **Class**: `FlintListItemAvatar`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintListItemAvatar } from 'flint-ui';
```

### Usage

```html
<flint-list-item-avatar></flint-list-item-avatar>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---

## `<flint-list-item-text>`

flint-list-item-text: A container for text content.

- **Tag**: `<flint-list-item-text>`
- **Class**: `FlintListItemText`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintListItemText } from 'flint-ui';
```

### Usage

```html
<flint-list-item-text></flint-list-item-text>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `primary` | `primary` | `string` | `''` |  |
| `secondary` | `secondary` | `string` | `''` |  |

### Slots

| Name | Description |
| --- | --- |
| `primary` |  |
| `secondary` |  |

---

## `<flint-list-subheader>`

flint-list-subheader: A label for a nested list.

- **Tag**: `<flint-list-subheader>`
- **Class**: `FlintListSubheader`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintListSubheader } from 'flint-ui';
```

### Usage

```html
<flint-list-subheader></flint-list-subheader>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---
