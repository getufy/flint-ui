# Drawer

<Demo label="Left (default)" html="<flint-button onclick=&quot;var d=this.nextElementSibling;d.open=true;d.addEventListener('flint-drawer-close',function(){d.open=false},{once:true})&quot;>Open Drawer</flint-button><flint-drawer>  <div style=&quot;padding:24px;width:280px&quot;>    <h3 style=&quot;margin:0 0 16px&quot;>Navigation</h3>    <flint-list>      <flint-list-item-button><flint-list-item-text primary=&quot;Home&quot;></flint-list-item-text></flint-list-item-button>      <flint-list-item-button><flint-list-item-text primary=&quot;Profile&quot;></flint-list-item-text></flint-list-item-button>      <flint-list-item-button><flint-list-item-text primary=&quot;Settings&quot;></flint-list-item-text></flint-list-item-button>    </flint-list>  </div></flint-drawer>" />

Navigation drawers provide ergonomic access to destinations in a site or app.

- **Tag**: `<flint-drawer>`
- **Class**: `FlintDrawer`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintDrawer } from 'flint-ui';
```

### Usage

```html
<flint-drawer></flint-drawer>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `open` | `open` | `boolean` | `false` | Controls whether the drawer is open or closed. |
| `anchor` | `anchor` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'left'` | Which edge of the viewport the drawer slides in from. |
| `variant` | `variant` | `'temporary' \| 'persistent' \| 'mini'` | `'temporary'` | Drawer behavior: temporary (overlay), persistent (push content), or mini (collapsed icon rail). |
| `edge` | `edge` | `boolean` | `false` | Shows a small edge handle when the temporary drawer is closed. |
| `container` | `container` | `boolean` | `false` | Scopes the drawer to its parent container instead of the viewport. |
| `label` | `label` | `string` | `'Drawer'` | Accessible label for the drawer panel (used as aria-label on the panel). |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-drawer-close` | — | Dispatched when the drawer requests to be closed (backdrop click or Escape). |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Drawer content. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-drawer-z-index` | `1200` |
| `--flint-drawer-bg` | `var(--flint-surface-1` |
| `--flint-drawer-width` | `250px` |
| `--flint-drawer-shadow` | — |
| `--flint-drawer-transition` | `.225s cubic-bezier(0, 0, .2, 1` |
| `--flint-drawer-height` | `auto` |
| `--flint-drawer-mini-width` | `72px` |
| `--flint-drawer-edge-width` | `16px` |
| `--flint-backdrop-color` | — |
| `--flint-border-color` | — |

---
