# Navigation Menu

<Demo html='<flint-navigation-menu>  <flint-navigation-menu-list>    <flint-navigation-menu-item>      <flint-navigation-menu-link href="#">Home</flint-navigation-menu-link>    </flint-navigation-menu-item>    <flint-navigation-menu-item>      <flint-navigation-menu-trigger content-id="nav-docs">Documentation</flint-navigation-menu-trigger>      <flint-navigation-menu-content id="nav-docs">        <flint-navigation-menu-link href="#">Getting Started</flint-navigation-menu-link>        <flint-navigation-menu-link href="#">Components</flint-navigation-menu-link>        <flint-navigation-menu-link href="#">API Reference</flint-navigation-menu-link>      </flint-navigation-menu-content>    </flint-navigation-menu-item>    <flint-navigation-menu-item>      <flint-navigation-menu-link href="#">About</flint-navigation-menu-link>    </flint-navigation-menu-item>    <flint-navigation-menu-item>      <flint-navigation-menu-link href="#">Contact</flint-navigation-menu-link>    </flint-navigation-menu-item>  </flint-navigation-menu-list></flint-navigation-menu>' />

## `<flint-navigation-menu-content>`

- **Tag**: `<flint-navigation-menu-content>`
- **Class**: `FlintNavigationMenuContent`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintNavigationMenuContent } from '@getufy/flint-ui';
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
| `flint-navigation-menu-content-toggle` | `&#123; contentId: string, open: boolean &#125;` | Fired when the content panel opens or closes. detail: `&#123; contentId: string, open: boolean &#125;` |

### Slots

| Name | Description |
| --- | --- |
| `default` | Menu content items |

### CSS Parts

| Name | Description |
| --- | --- |
| `root` | The root content element |
| `panel` | The inner panel container |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-navigation-menu-content-bg` | — |
| `--flint-navigation-menu-content-border` | — |
| `--flint-navigation-menu-content-border-radius` | — |
| `--flint-navigation-menu-content-padding` | — |
| `--flint-navigation-menu-content-shadow` | — |
| `--flint-navigation-menu-content-gap` | — |
| `--flint-navigation-menu-content-min-width` | — |
| `--flint-navigation-menu-content-z-index` | — |

---

## `<flint-navigation-menu-item>`

- **Tag**: `<flint-navigation-menu-item>`
- **Class**: `FlintNavigationMenuItem`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintNavigationMenuItem } from '@getufy/flint-ui';
```

### Usage

```html
<flint-navigation-menu-item></flint-navigation-menu-item>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `itemId` | `itemId` | `string` | `''` | Unique identifier for this menu item |
| `disabled` | `disabled` | `boolean` | `false` | Whether this item is disabled |
| `openDelay` | `open-delay` | `number` | `100` | Delay in ms before opening on hover |
| `closeDelay` | `close-delay` | `number` | `150` | Delay in ms before closing after mouse leaves |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-navigation-menu-trigger-click` | `&#123; contentId: string, open: boolean &#125;` | Fired when the item's trigger is clicked. detail: `&#123; contentId: string, open: boolean &#125;` |
| `flint-navigation-menu-content-toggle` | `&#123; contentId: string, open: boolean &#125;` | Fired when content visibility changes. detail: `&#123; contentId: string, open: boolean &#125;` |

### Slots

| Name | Description |
| --- | --- |
| `default` | Item content (NavigationMenuTrigger and NavigationMenuContent) |

### CSS Parts

| Name | Description |
| --- | --- |
| `root` | The root item element |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-navigation-menu-item-padding` | — |

---

## `<flint-navigation-menu-link>`

- **Tag**: `<flint-navigation-menu-link>`
- **Class**: `FlintNavigationMenuLink`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintNavigationMenuLink } from '@getufy/flint-ui';
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
| `active` | `active` | `boolean` | `false` | Whether this link represents the current page. |

### Slots

| Name | Description |
| --- | --- |
| `default` | Link text/content |

### CSS Parts

| Name | Description |
| --- | --- |
| `link` | The link element |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-navigation-menu-link-padding` | — |
| `--flint-navigation-menu-link-font-size` | — |
| `--flint-navigation-menu-link-color` | — |
| `--flint-navigation-menu-link-text-decoration` | — |
| `--flint-navigation-menu-link-bg` | — |
| `--flint-navigation-menu-link-hover-bg` | — |
| `--flint-navigation-menu-link-border-radius` | — |
| `--flint-navigation-menu-link-active-bg` | — |
| `--flint-navigation-menu-link-active-color` | — |

---

## `<flint-navigation-menu-list>`

- **Tag**: `<flint-navigation-menu-list>`
- **Class**: `FlintNavigationMenuList`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintNavigationMenuList } from '@getufy/flint-ui';
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
| `ariaLabel` | `aria-label` | `string` | `'Main navigation'` | Accessible label for the navigation landmark. |

### Slots

| Name | Description |
| --- | --- |
| `default` | Menu items (NavigationMenuItem elements) |

### CSS Parts

| Name | Description |
| --- | --- |
| `root` | The root list element |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-navigation-menu-list-gap` | — |
| `--flint-navigation-menu-list-direction` | — |

---

## `<flint-navigation-menu-trigger>`

- **Tag**: `<flint-navigation-menu-trigger>`
- **Class**: `FlintNavigationMenuTrigger`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintNavigationMenuTrigger } from '@getufy/flint-ui';
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
| `default` | Trigger label/content |

### CSS Parts

| Name | Description |
| --- | --- |
| `button` | The trigger button element |
| `icon` | The indicator icon |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-navigation-menu-trigger-padding` | — |
| `--flint-navigation-menu-trigger-font-size` | — |
| `--flint-navigation-menu-trigger-color` | — |
| `--flint-navigation-menu-trigger-bg` | — |
| `--flint-navigation-menu-trigger-hover-bg` | — |
| `--flint-navigation-menu-trigger-border-radius` | — |

---

## `<flint-navigation-menu>`

- **Tag**: `<flint-navigation-menu>`
- **Class**: `FlintNavigationMenu`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintNavigationMenu } from '@getufy/flint-ui';
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
| `default` | The menu content (NavigationMenuList) |

### CSS Parts

| Name | Description |
| --- | --- |
| `root` | The root container |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-navigation-menu-padding` | — |
| `--flint-navigation-menu-gap` | — |
| `--flint-navigation-menu-bg` | — |
| `--flint-navigation-menu-border` | — |
| `--flint-navigation-menu-border-radius` | — |

### Methods

| Method | Description |
| --- | --- |
| `openContent(contentId: string): void` | Manually open a content item by ID. No-ops silently if the ID doesn't match any content element. |
| `closeAll(): void` | Close all open content |

---
