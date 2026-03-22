# List

<Demo html='<div style="width:100%;max-width:360px;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden"><flint-list>  <flint-list-subheader>Messages</flint-list-subheader>  <flint-list-item-button selected>    <flint-list-item-text primary="Inbox" secondary="5 new messages"></flint-list-item-text>  </flint-list-item-button>  <flint-list-item-button>    <flint-list-item-text primary="Drafts" secondary="2 drafts"></flint-list-item-text>  </flint-list-item-button>  <flint-list-item-button>    <flint-list-item-text primary="Sent" secondary="Last sent 2h ago"></flint-list-item-text>  </flint-list-item-button>  <flint-list-item-button disabled>    <flint-list-item-text primary="Spam" secondary="Disabled"></flint-list-item-text>  </flint-list-item-button></flint-list></div>' />

## `<flint-list>`

flint-list: A wrapper for list items.

- **Tag**: `<flint-list>`
- **Class**: `FlintList`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintList } from '@getufy/flint-ui';
```

### Usage

```html
<flint-list></flint-list>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `disablePadding` | `disable-padding` | `boolean` | `false` | Whether to disable the default padding on the list. |
| `dense` | `dense` | `boolean` | `false` | Whether to use compact spacing for list items. |

### CSS Parts

| Name | Description |
| --- | --- |
| `base` | The component's base wrapper element. |

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
| `--flint-surface-background` | — |

---

## `<flint-list-item>`

flint-list-item: A common list item.

- **Tag**: `<flint-list-item>`
- **Class**: `FlintListItem`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintListItem } from '@getufy/flint-ui';
```

### Usage

```html
<flint-list-item></flint-list-item>
```

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
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintListItemButton } from '@getufy/flint-ui';
```

### Usage

```html
<flint-list-item-button></flint-list-item-button>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `disabled` | `disabled` | `boolean` | `false` | Whether the list item button is disabled. |
| `selected` | `selected` | `boolean` | `false` | Whether the list item button is selected. |

---

## `<flint-list-item-icon>`

flint-list-item-icon: An icon wrapper inside a list item.

- **Tag**: `<flint-list-item-icon>`
- **Class**: `FlintListItemIcon`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintListItemIcon } from '@getufy/flint-ui';
```

### Usage

```html
<flint-list-item-icon></flint-list-item-icon>
```

---

## `<flint-list-item-avatar>`

flint-list-item-avatar: An avatar wrapper inside a list item.

- **Tag**: `<flint-list-item-avatar>`
- **Class**: `FlintListItemAvatar`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintListItemAvatar } from '@getufy/flint-ui';
```

### Usage

```html
<flint-list-item-avatar></flint-list-item-avatar>
```

---

## `<flint-list-item-text>`

flint-list-item-text: A container for text content.

- **Tag**: `<flint-list-item-text>`
- **Class**: `FlintListItemText`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintListItemText } from '@getufy/flint-ui';
```

### Usage

```html
<flint-list-item-text></flint-list-item-text>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `primary` | `primary` | `string` | `''` | Plain-text primary content; for rich content (HTML, icons), use the `primary` slot instead. |
| `secondary` | `secondary` | `string` | `''` | Plain-text secondary content; for rich content (HTML, icons), use the `secondary` slot instead. |

### Slots

| Name | Description |
| --- | --- |
| `primary` | Rich primary content; takes visual precedence over the `primary` prop. |
| `secondary` | Rich secondary content; takes visual precedence over the `secondary` prop. |

---

## `<flint-list-subheader>`

flint-list-subheader: A label for a nested list.

- **Tag**: `<flint-list-subheader>`
- **Class**: `FlintListSubheader`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintListSubheader } from '@getufy/flint-ui';
```

### Usage

```html
<flint-list-subheader></flint-list-subheader>
```

---
