# Menu

<Demo html="<ui-button onclick=&quot;this.nextElementSibling.open=!this.nextElementSibling.open&quot;>Open Menu</ui-button><ui-menu>  <ui-menu-item>Profile</ui-menu-item>  <ui-menu-item>Settings</ui-menu-item>  <ui-menu-divider></ui-menu-divider>  <ui-menu-group label=&quot;Actions&quot;>    <ui-menu-item>Export</ui-menu-item>    <ui-menu-item disabled>Delete</ui-menu-item>  </ui-menu-group>  <ui-menu-divider></ui-menu-divider>  <ui-menu-item>Logout</ui-menu-item></ui-menu>" />

## `<ui-menu-item>`

A single option inside a `ui-menu`.

- **Tag**: `<ui-menu-item>`
- **Class**: `UiMenuItem`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiMenuItem } from 'storybook-lit';
```

### Usage

```html
<ui-menu-item></ui-menu-item>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `selected` | `selected` | `boolean` | `false` | Marks this item as the currently selected option. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the item — it becomes non-interactive. |
| `dense` | `dense` | `boolean` | `false` | Dense padding mode (for desktop-density menus). |
| `divider` | `divider` | `boolean` | `false` | Renders a hairline separator below this item. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `ui-menu-item-select` | — | Fired when the item is activated. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Item label text. |
| `icon` | Leading icon. |
| `end-icon` | Trailing icon or shortcut hint. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-border-color` | — |
| `--ui-text-color-muted` | — |
| `--ui-font-family` | — |
| `--ui-text-color` | — |
| `--ui-hover-color` | — |
| `--ui-active-color` | — |
| `--ui-primary-color` | — |
| `--ui-primary-color-light` | — |
| `--ui-primary-color-light-hover` | — |
| `--ui-surface-1` | — |
| `--ui-border-radius-md` | — |
| `--ui-shadow-md` | — |
| `--ui-shadow-lg` | — |

---

## `<ui-menu-divider>`

A hairline separator for grouping items in a menu.

- **Tag**: `<ui-menu-divider>`
- **Class**: `UiMenuDivider`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiMenuDivider } from 'storybook-lit';
```

### Usage

```html
<ui-menu-divider></ui-menu-divider>
```

---

## `<ui-menu-group>`

A labelled group of menu items. Wraps items in a `role="group"` for screen-reader announcements.

- **Tag**: `<ui-menu-group>`
- **Class**: `UiMenuGroup`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiMenuGroup } from 'storybook-lit';
```

### Usage

```html
<ui-menu-group></ui-menu-group>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | `string` | `''` | Visible heading rendered above the group items. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Group items (ui-menu-item elements). |

---

## `<ui-menu>`

A menu displays a list of choices on a temporary surface. Place it as a sibling to its anchor element inside a `position:relative` container.

- **Tag**: `<ui-menu>`
- **Class**: `UiMenu`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiMenu } from 'storybook-lit';
```

### Usage

```html
<ui-menu></ui-menu>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `open` | `open` | `boolean` | `false` | Whether the menu is open/visible. |
| `placement` | `placement` | `string` | `'bottom-start'` |  |
| `closeOnSelect` | `close-on-select` | `boolean` | `true` | When true, selecting an item automatically fires ui-menu-close. |
| `scrollable` | `scrollable` | `boolean` | `false` | When true, constrains height to --ui-menu-max-height (default 300px) and enables scrolling. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `ui-menu-close` | — | Fired when the menu requests to be closed (backdrop click, Escape, or item select). |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Menu content (ui-menu-item elements). |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-menu-z-index` | — |
| `--ui-menu-min-width` | — |
| `--ui-menu-max-height` | `300px` |

---
