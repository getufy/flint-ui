# Menu

<Demo html="<div style=&quot;position:relative;display:inline-block&quot;><flint-button onclick=&quot;var m=this.nextElementSibling;m.open=!m.open;if(m.open)m.addEventListener('flint-menu-close',function(){m.open=false},{once:true})&quot;>Open Menu</flint-button><flint-menu>  <flint-menu-item>Profile</flint-menu-item>  <flint-menu-item>Settings</flint-menu-item>  <flint-menu-divider></flint-menu-divider>  <flint-menu-group label=&quot;Actions&quot;>    <flint-menu-item>Export</flint-menu-item>    <flint-menu-item disabled>Delete</flint-menu-item>  </flint-menu-group>  <flint-menu-divider></flint-menu-divider>  <flint-menu-item>Logout</flint-menu-item></flint-menu></div>" />

## `<flint-menu-item>`

A single option inside a `flint-menu`.

- **Tag**: `<flint-menu-item>`
- **Class**: `FlintMenuItem`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintMenuItem } from 'flint-ui';
```

### Usage

```html
<flint-menu-item></flint-menu-item>
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
| `flint-menu-item-select` | — | Fired when the item is activated. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Item label text. |
| `icon` | Leading icon. |
| `end-icon` | Trailing icon or shortcut hint. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-border-color` | — |
| `--flint-text-color-muted` | — |
| `--flint-font-family` | — |
| `--flint-text-color` | — |
| `--flint-hover-color` | — |
| `--flint-active-color` | — |
| `--flint-primary-color` | — |
| `--flint-primary-color-light` | — |
| `--flint-primary-color-light-hover` | — |
| `--flint-surface-1` | — |
| `--flint-border-radius-md` | — |
| `--flint-shadow-md` | — |
| `--flint-shadow-lg` | — |

---

## `<flint-menu-divider>`

A hairline separator for grouping items in a menu.

- **Tag**: `<flint-menu-divider>`
- **Class**: `FlintMenuDivider`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintMenuDivider } from 'flint-ui';
```

### Usage

```html
<flint-menu-divider></flint-menu-divider>
```

---

## `<flint-menu-group>`

A labelled group of menu items. Wraps items in a `role="group"` for screen-reader announcements.

- **Tag**: `<flint-menu-group>`
- **Class**: `FlintMenuGroup`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintMenuGroup } from 'flint-ui';
```

### Usage

```html
<flint-menu-group></flint-menu-group>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | `string` | `''` | Visible heading rendered above the group items. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Group items (flint-menu-item elements). |

---

## `<flint-menu>`

A menu displays a list of choices on a temporary surface. Place it as a sibling to its anchor element inside a `position:relative` container.

- **Tag**: `<flint-menu>`
- **Class**: `FlintMenu`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintMenu } from 'flint-ui';
```

### Usage

```html
<flint-menu></flint-menu>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `open` | `open` | `boolean` | `false` | Whether the menu is open/visible. |
| `placement` | `placement` | `string` | `'bottom-start'` | Menu placement relative to its anchor (e.g. bottom-start, bottom-end, top-start). |
| `closeOnSelect` | `close-on-select` | `boolean` | `true` | When true, selecting an item automatically fires flint-menu-close. |
| `scrollable` | `scrollable` | `boolean` | `false` | When true, constrains height to --flint-menu-max-height (default 300px) and enables scrolling. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-menu-close` | — | Fired when the menu requests to be closed (backdrop click, Escape, or item select). |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Menu content (flint-menu-item elements). |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-menu-z-index` | — |
| `--flint-menu-min-width` | — |
| `--flint-menu-max-height` | `300px` |

---
