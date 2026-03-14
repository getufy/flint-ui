# Navigation Menu

<Demo html="<flint-navigation-menu>  <flint-navigation-menu-list>    <flint-navigation-menu-item>      <flint-navigation-menu-link href=&quot;#&quot;>Home</flint-navigation-menu-link>    </flint-navigation-menu-item>    <flint-navigation-menu-item>      <flint-navigation-menu-trigger content-id=&quot;nav-docs&quot;>Documentation</flint-navigation-menu-trigger>      <flint-navigation-menu-content id=&quot;nav-docs&quot;>        <flint-navigation-menu-link href=&quot;#&quot;>Getting Started</flint-navigation-menu-link>        <flint-navigation-menu-link href=&quot;#&quot;>Components</flint-navigation-menu-link>        <flint-navigation-menu-link href=&quot;#&quot;>API Reference</flint-navigation-menu-link>      </flint-navigation-menu-content>    </flint-navigation-menu-item>    <flint-navigation-menu-item>      <flint-navigation-menu-link href=&quot;#&quot;>About</flint-navigation-menu-link>    </flint-navigation-menu-item>    <flint-navigation-menu-item>      <flint-navigation-menu-link href=&quot;#&quot;>Contact</flint-navigation-menu-link>    </flint-navigation-menu-item>  </flint-navigation-menu-list></flint-navigation-menu>" />

## `<flint-navigation-menu-content>`

- **Tag**: `<flint-navigation-menu-content>`
- **Class**: `FlintNavigationMenuContent`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintNavigationMenuContent } from 'flint-ui';
```

### Usage

```html
<flint-navigation-menu-content></flint-navigation-menu-content>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `id` | `id` | `string` | `''` | Unique identifier for this content panel |
| `open` | `open` | `boolean` | `false` | Whether the content is open/visible |
| `dir` | `dir` | `'ltr' \| 'rtl'` | `'ltr'` | The direction (ltr or rtl) |
| `gap` | `gap` | `number` | `12` | Gap between items in the content |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-navigation-menu-content-toggle` | `{ contentId: this.id, open: false }` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### Methods

| Method | Description |
| --- | --- |
| `host([open])` |  |
| `media(prefers-reduced-motion: reduce)` |  |
| `slotted(*)` |  |

---

## `<flint-navigation-menu-item>`

- **Tag**: `<flint-navigation-menu-item>`
- **Class**: `FlintNavigationMenuItem`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintNavigationMenuItem } from 'flint-ui';
```

### Usage

```html
<flint-navigation-menu-item></flint-navigation-menu-item>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `itemId` | `item-id` | `string` | `''` | Unique identifier for this menu item |
| `disabled` | `disabled` | `boolean` | `false` | Whether this item is disabled |
| `openDelay` | `open-delay` | `number` | `100` | Delay in ms before opening on hover |
| `closeDelay` | `close-delay` | `number` | `150` | Delay in ms before closing after mouse leaves |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-navigation-menu-trigger-click` | `{ contentId, open: true }` |  |
| `flint-navigation-menu-content-toggle` | `{ contentId, open: false }` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |
| `default` | Item content (NavigationMenuTrigger and NavigationMenuContent) |

---

## `<flint-navigation-menu-link>`

- **Tag**: `<flint-navigation-menu-link>`
- **Class**: `FlintNavigationMenuLink`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintNavigationMenuLink } from 'flint-ui';
```

### Usage

```html
<flint-navigation-menu-link></flint-navigation-menu-link>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `href` | `href` | `string` | `''` | The link URL |
| `target` | `target` | `string` | `''` | The link target (e.g., '_blank') |
| `title` | `title` | `string` | `''` | Link title/tooltip |
| `disabled` | `disabled` | `boolean` | `false` | Whether the link is disabled |
| `active` | `active` | `boolean` | `false` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### Methods

| Method | Description |
| --- | --- |
| `focus(options?: FocusOptions)` | Delegate focus to the inner anchor element |

---

## `<flint-navigation-menu-list>`

- **Tag**: `<flint-navigation-menu-list>`
- **Class**: `FlintNavigationMenuList`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintNavigationMenuList } from 'flint-ui';
```

### Usage

```html
<flint-navigation-menu-list></flint-navigation-menu-list>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `gap` | `gap` | `number` | `4` | Gap between menu items |
| `direction` | `direction` | `'row' \| 'column'` | `'row'` | Flex direction for the list |
| `ariaLabel` | `aria-label` | `string` | `'Main navigation'` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |
| `default` | Menu items (NavigationMenuItem elements) |

---

## `<flint-navigation-menu-trigger>`

- **Tag**: `<flint-navigation-menu-trigger>`
- **Class**: `FlintNavigationMenuTrigger`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintNavigationMenuTrigger } from 'flint-ui';
```

### Usage

```html
<flint-navigation-menu-trigger></flint-navigation-menu-trigger>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `contentId` | `content-id` | `string` | `''` | The ID of the associated content element |
| `disabled` | `disabled` | `boolean` | `false` | Whether the trigger is disabled |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-navigation-menu-trigger-click` | — | Fired when trigger is clicked |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |
| `default` | Trigger label/content |

### Methods

| Method | Description |
| --- | --- |
| `not(:disabled)` |  |

---

## `<flint-navigation-menu>`

- **Tag**: `<flint-navigation-menu>`
- **Class**: `FlintNavigationMenu`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintNavigationMenu } from 'flint-ui';
```

### Usage

```html
<flint-navigation-menu></flint-navigation-menu>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `dir` | `dir` | `'ltr' \| 'rtl'` | `'ltr'` | The direction of the menu (ltr or rtl) |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |
| `default` | The menu content (NavigationMenuList) |

### Methods

| Method | Description |
| --- | --- |
| `openContentId()` |  |
| `openContent(contentId: string)` | Manually open a content item by ID |
| `closeAll()` | Close all open content |

---
