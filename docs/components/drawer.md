# Drawer

<Demo>

<ui-button onclick="this.nextElementSibling.open=true">Open Drawer</ui-button>
<ui-drawer>
  <div style="padding:24px;width:280px">
    <h3 style="margin:0 0 16px">Drawer Content</h3>
    <p style="margin:0;color:#374151">Click outside to close.</p>
  </div>
</ui-drawer>

</Demo>

Navigation drawers provide ergonomic access to destinations in a site or app.

- **Tag**: `<ui-drawer>`
- **Class**: `UiDrawer`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiDrawer } from 'storybook-lit';
```

### Usage

```html
<ui-drawer></ui-drawer>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `open` | `open` | `boolean` | `false` |  |
| `anchor` | `anchor` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'left'` |  |
| `variant` | `variant` | `'temporary' \| 'persistent' \| 'mini'` | `'temporary'` |  |
| `edge` | `edge` | `boolean` | `false` |  |
| `container` | `container` | `boolean` | `false` |  |
| `label` | `label` | `string` | `'Drawer'` | Accessible label for the drawer panel (used as aria-label on the panel). |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `ui-drawer-close` | — | Dispatched when the drawer requests to be closed (backdrop click or Escape). |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Drawer content. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-drawer-z-index` | `1200` |
| `--ui-drawer-bg` | `var(--ui-surface-1` |
| `--ui-drawer-width` | `250px` |
| `--ui-drawer-shadow` | — |
| `--ui-drawer-transition` | `.225s cubic-bezier(0, 0, .2, 1` |
| `--ui-drawer-height` | `auto` |
| `--ui-drawer-mini-width` | `72px` |
| `--ui-drawer-edge-width` | `16px` |
| `--ui-backdrop-color` | — |
| `--ui-border-color` | — |

---
