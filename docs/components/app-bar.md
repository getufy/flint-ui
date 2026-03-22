# App Bar

<Demo label="Regular" html='<div style="width:100%;max-width:600px"><flint-app-bar title="My Application" position="static">  <span slot="navigation" style="font-size:20px;cursor:pointer">&#9776;</span>  <div slot="actions">    <flint-button appearance="outlined" color="neutral" size="sm">Login</flint-button>  </div></flint-app-bar></div>' />

<Demo label="Dense" html='<div style="width:100%;max-width:600px"><flint-app-bar title="Dense Bar" position="static" variant="dense">  <div slot="actions">    <flint-button appearance="outlined" color="neutral" size="sm">Action</flint-button>  </div></flint-app-bar></div>' />

flint-app-bar: The top App bar provides content and actions related to the current screen.

- **Tag**: `<flint-app-bar>`
- **Class**: `FlintAppBar`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintAppBar } from '@getufy/flint-ui';
```

### Usage

```html
<flint-app-bar></flint-app-bar>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `title` | `title` | `string` | `''` | Title text displayed in the center of the app bar. |
| `position` | `position` | `'static' \| 'fixed' \| 'absolute' \| 'sticky'` | `'static'` | CSS positioning behavior of the app bar. |
| `variant` | `variant` | `'regular' \| 'outlined'` | `'regular'` | Visual style variant of the app bar. |

### Slots

| Name | Description |
| --- | --- |
| `navigation` | Left section, e.g. menu button (alias: `start-content`). |
| `start-content` | Alias for `navigation` slot. |
| `title` | Center section next to the title prop. |
| `actions` | Right section, e.g. action buttons (alias: `end-content`). |
| `end-content` | Alias for `actions` slot. |

### CSS Parts

| Name | Description |
| --- | --- |
| `actions` | The actions container. |
| `base` | The component's base wrapper element. |
| `navigation` | The navigation container. |
| `title` | The title element. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-app-bar-height` | — |
| `--flint-app-bar-bg` | — |
| `--flint-app-bar-color` | — |
| `--flint-app-bar-shadow` | — |
| `--flint-primary-color` | — |
| `--flint-text-color-on-primary` | — |
| `--flint-shadow-md` | — |
| `--flint-z-app-bar` | `1100` |
| `--flint-surface-1` | — |
| `--flint-text-color` | — |
| `--flint-border-color` | — |
| `--flint-font-family` | — |

---
