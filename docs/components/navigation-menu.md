# Navigation Menu

<Demo html="<ui-navigation-menu>  <ui-navigation-menu-list>    <ui-navigation-menu-item>      <ui-navigation-menu-link href=&quot;#&quot;>Home</ui-navigation-menu-link>    </ui-navigation-menu-item>    <ui-navigation-menu-item>      <ui-navigation-menu-trigger content-id=&quot;nav-docs&quot;>Documentation</ui-navigation-menu-trigger>      <ui-navigation-menu-content id=&quot;nav-docs&quot;>        <div style=&quot;padding:12px;display:flex;flex-direction:column;gap:4px&quot;>          <ui-navigation-menu-link href=&quot;#&quot;>Getting Started</ui-navigation-menu-link>          <ui-navigation-menu-link href=&quot;#&quot;>Components</ui-navigation-menu-link>          <ui-navigation-menu-link href=&quot;#&quot;>API Reference</ui-navigation-menu-link>        </div>      </ui-navigation-menu-content>    </ui-navigation-menu-item>    <ui-navigation-menu-item>      <ui-navigation-menu-link href=&quot;#&quot;>About</ui-navigation-menu-link>    </ui-navigation-menu-item>    <ui-navigation-menu-item>      <ui-navigation-menu-link href=&quot;#&quot;>Contact</ui-navigation-menu-link>    </ui-navigation-menu-item>  </ui-navigation-menu-list></ui-navigation-menu>" />

## `<ui-navigation-menu-content>`

- **Tag**: `<ui-navigation-menu-content>`
- **Class**: `UiNavigationMenuContent`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiNavigationMenuContent } from 'storybook-lit';
```

### Usage

```html
<ui-navigation-menu-content></ui-navigation-menu-content>
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
| `ui-navigation-menu-content-toggle` | `{ contentId: this.id, open: false }` |  |

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

## `<ui-navigation-menu-item>`

- **Tag**: `<ui-navigation-menu-item>`
- **Class**: `UiNavigationMenuItem`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiNavigationMenuItem } from 'storybook-lit';
```

### Usage

```html
<ui-navigation-menu-item></ui-navigation-menu-item>
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
| `ui-navigation-menu-trigger-click` | `{ contentId, open: true }` |  |
| `ui-navigation-menu-content-toggle` | `{ contentId, open: false }` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |
| `default` | Item content (NavigationMenuTrigger and NavigationMenuContent) |

---

## `<ui-navigation-menu-link>`

- **Tag**: `<ui-navigation-menu-link>`
- **Class**: `UiNavigationMenuLink`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiNavigationMenuLink } from 'storybook-lit';
```

### Usage

```html
<ui-navigation-menu-link></ui-navigation-menu-link>
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

## `<ui-navigation-menu-list>`

- **Tag**: `<ui-navigation-menu-list>`
- **Class**: `UiNavigationMenuList`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiNavigationMenuList } from 'storybook-lit';
```

### Usage

```html
<ui-navigation-menu-list></ui-navigation-menu-list>
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

## `<ui-navigation-menu-trigger>`

- **Tag**: `<ui-navigation-menu-trigger>`
- **Class**: `UiNavigationMenuTrigger`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiNavigationMenuTrigger } from 'storybook-lit';
```

### Usage

```html
<ui-navigation-menu-trigger></ui-navigation-menu-trigger>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `contentId` | `content-id` | `string` | `''` | The ID of the associated content element |
| `disabled` | `disabled` | `boolean` | `false` | Whether the trigger is disabled |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `ui-navigation-menu-trigger-click` | — | Fired when trigger is clicked |

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

## `<ui-navigation-menu>`

- **Tag**: `<ui-navigation-menu>`
- **Class**: `UiNavigationMenu`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiNavigationMenu } from 'storybook-lit';
```

### Usage

```html
<ui-navigation-menu></ui-navigation-menu>
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
