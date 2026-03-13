# App Bar

<Demo label="Regular" html="<div style=&quot;width:100%;max-width:600px&quot;><ui-app-bar title=&quot;My Application&quot; position=&quot;static&quot;>  <span slot=&quot;navigation&quot; style=&quot;font-size:20px;cursor:pointer&quot;>&#9776;</span>  <div slot=&quot;actions&quot;>    <ui-button variant=&quot;secondary&quot; size=&quot;small&quot;>Login</ui-button>  </div></ui-app-bar></div>" />

<Demo label="Dense" html="<div style=&quot;width:100%;max-width:600px&quot;><ui-app-bar title=&quot;Dense Bar&quot; position=&quot;static&quot; variant=&quot;dense&quot;>  <div slot=&quot;actions&quot;>    <ui-button variant=&quot;secondary&quot; size=&quot;small&quot;>Action</ui-button>  </div></ui-app-bar></div>" />

ui-app-bar: The top App bar provides content and actions related to the current screen.

- **Tag**: `<ui-app-bar>`
- **Class**: `UiAppBar`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiAppBar } from 'storybook-lit';
```

### Usage

```html
<ui-app-bar></ui-app-bar>
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
| `--ui-app-bar-height` | — |
| `--ui-app-bar-bg` | — |
| `--ui-app-bar-color` | — |
| `--ui-app-bar-shadow` | — |
| `--ui-primary-color` | — |
| `--ui-text-color-on-primary` | — |
| `--ui-shadow-md` | — |
| `--ui-surface-1` | — |
| `--ui-text-color` | — |
| `--ui-border-color` | — |
| `--ui-font-family` | — |

---
