# App Bar

<Demo label="Regular" html="<div style=&quot;width:100%;max-width:600px&quot;><flint-app-bar title=&quot;My Application&quot; position=&quot;static&quot;>  <span slot=&quot;navigation&quot; style=&quot;font-size:20px;cursor:pointer&quot;>&#9776;</span>  <div slot=&quot;actions&quot;>    <flint-button variant=&quot;secondary&quot; size=&quot;small&quot;>Login</flint-button>  </div></flint-app-bar></div>" />

<Demo label="Dense" html="<div style=&quot;width:100%;max-width:600px&quot;><flint-app-bar title=&quot;Dense Bar&quot; position=&quot;static&quot; variant=&quot;dense&quot;>  <div slot=&quot;actions&quot;>    <flint-button variant=&quot;secondary&quot; size=&quot;small&quot;>Action</flint-button>  </div></flint-app-bar></div>" />

flint-app-bar: The top App bar provides content and actions related to the current screen.

- **Tag**: `<flint-app-bar>`
- **Class**: `FlintAppBar`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintAppBar } from 'flint-ui';
```

### Usage

```html
<flint-app-bar></flint-app-bar>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `title` | `title` | `string` | `''` |  |
| `position` | `position` | `'static' \| 'fixed' \| 'absolute' \| 'sticky'` | `'static'` |  |
| `variant` | `variant` | `'regular' \| 'outlined'` | `'regular'` |  |

### Slots

| Name | Description |
| --- | --- |
| `navigation` |  |
| `title` |  |
| `actions` |  |

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
| `--flint-surface-1` | — |
| `--flint-text-color` | — |
| `--flint-border-color` | — |
| `--flint-font-family` | — |

---

## Accessibility

- **ARIA**: renders a `<header>` landmark.
- **Screen reader**: announces as banner landmark.
