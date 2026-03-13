# List

<Demo html="<div style=&quot;width:100%;max-width:360px;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden&quot;><ui-list>  <ui-list-subheader>Messages</ui-list-subheader>  <ui-list-item-button selected>    <ui-list-item-text primary=&quot;Inbox&quot; secondary=&quot;5 new messages&quot;></ui-list-item-text>  </ui-list-item-button>  <ui-list-item-button>    <ui-list-item-text primary=&quot;Drafts&quot; secondary=&quot;2 drafts&quot;></ui-list-item-text>  </ui-list-item-button>  <ui-list-item-button>    <ui-list-item-text primary=&quot;Sent&quot; secondary=&quot;Last sent 2h ago&quot;></ui-list-item-text>  </ui-list-item-button>  <ui-list-item-button disabled>    <ui-list-item-text primary=&quot;Spam&quot; secondary=&quot;Disabled&quot;></ui-list-item-text>  </ui-list-item-button></ui-list></div>" />

## `<ui-list>`

ui-list: A wrapper for list items.

- **Tag**: `<ui-list>`
- **Class**: `UiList`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiList } from 'storybook-lit';
```

### Usage

```html
<ui-list></ui-list>
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
| `--ui-list-item-padding` | `8px 16px` |
| `--ui-list-item-gap` | `16px` |
| `--ui-hover-color` | — |
| `--ui-active-color` | — |
| `--ui-primary-color` | — |
| `--ui-primary-color-light` | — |
| `--ui-text-color-muted` | — |
| `--ui-font-family` | — |
| `--ui-text-color` | — |
| `--ui-surface-background` | `white` |

---

## `<ui-list-item>`

ui-list-item: A common list item.

- **Tag**: `<ui-list-item>`
- **Class**: `UiListItem`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiListItem } from 'storybook-lit';
```

### Usage

```html
<ui-list-item></ui-list-item>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-list-item-padding` | `8px 16px` |
| `--ui-list-item-gap` | `16px` |

---

## `<ui-list-item-button>`

ui-list-item-button: An action element inside a list item.

- **Tag**: `<ui-list-item-button>`
- **Class**: `UiListItemButton`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiListItemButton } from 'storybook-lit';
```

### Usage

```html
<ui-list-item-button></ui-list-item-button>
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

## `<ui-list-item-icon>`

ui-list-item-icon: An icon wrapper inside a list item.

- **Tag**: `<ui-list-item-icon>`
- **Class**: `UiListItemIcon`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiListItemIcon } from 'storybook-lit';
```

### Usage

```html
<ui-list-item-icon></ui-list-item-icon>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---

## `<ui-list-item-avatar>`

ui-list-item-avatar: An avatar wrapper inside a list item.

- **Tag**: `<ui-list-item-avatar>`
- **Class**: `UiListItemAvatar`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiListItemAvatar } from 'storybook-lit';
```

### Usage

```html
<ui-list-item-avatar></ui-list-item-avatar>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---

## `<ui-list-item-text>`

ui-list-item-text: A container for text content.

- **Tag**: `<ui-list-item-text>`
- **Class**: `UiListItemText`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiListItemText } from 'storybook-lit';
```

### Usage

```html
<ui-list-item-text></ui-list-item-text>
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

## `<ui-list-subheader>`

ui-list-subheader: A label for a nested list.

- **Tag**: `<ui-list-subheader>`
- **Class**: `UiListSubheader`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiListSubheader } from 'storybook-lit';
```

### Usage

```html
<ui-list-subheader></ui-list-subheader>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---
